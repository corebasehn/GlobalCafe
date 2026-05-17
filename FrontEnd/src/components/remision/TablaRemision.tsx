import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Edit, FileSpreadsheet, Loader2, MoreVertical, Printer, Trash2 } from "lucide-react";
import { Button, Card, Pagination, Table } from "react-bootstrap";
import * as XLSX from "xlsx";
import { Recepcion } from "../../api/reception.api";
import { Conductor, PlacaCabezal, PlacaFurgon, Proveedor, Transporte } from "../../api/catalogs.api";
import TablaDetalleRemision from "./TablaDetalleRemision";

const PAGE_SIZE = 15;

type Props = {
  loading: boolean;
  filteredRecepciones: Recepcion[];
  hasRowActions: boolean;
  hasPermission: (p: string) => boolean;
  placasCabezal: PlacaCabezal[];
  placasFurgon: PlacaFurgon[];
  conductores: Conductor[];
  transportes: Transporte[];
  proveedores: Proveedor[];
  onEdit: (r: Recepcion) => void;
  onPrint: (r: Recepcion) => void;
  onDelete: (r: Recepcion) => void;
};

export default function TablaRemision({
  loading,
  filteredRecepciones,
  hasRowActions,
  hasPermission,
  placasCabezal,
  placasFurgon,
  conductores,
  transportes,
  proveedores,
  onEdit,
  onPrint,
  onDelete,
}: Readonly<Props>) {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredRecepciones.length]);

  useEffect(() => {
    const close = () => { setActionMenuOpen(null); setMenuPos(null); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const totalPages = Math.max(1, Math.ceil(filteredRecepciones.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filteredRecepciones.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const totalSacos = filteredRecepciones.reduce((sum, r) =>
    sum + (r.detalles?.filter(d => d.estado).reduce((s, d) => s + d.cantidad_sacos, 0) ?? 0), 0);
  const totalQq = filteredRecepciones.reduce((sum, r) =>
    sum + (r.detalles?.filter(d => d.estado).reduce((s, d) => s + Number(d.cantidad_qq), 0) ?? 0), 0);

  const toggleRow = (id: number) =>
    setExpandedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);

  const colSpan = hasRowActions ? 9 : 8;

  const exportarExcel = () => {
    const filas: Record<string, unknown>[] = [];

    filteredRecepciones.forEach(r => {
      const detallesActivos = r.detalles?.filter(d => d.estado) || [];
      const cabezal = placasCabezal.find(p => p.id_placa_cabezal === r.id_placa_cabezal)?.placa || "N/A";
      const furgon = r.id_placa_furgon ? placasFurgon.find(p => p.id_placa_furgon === r.id_placa_furgon)?.placa || "" : "";
      const conductorObj = conductores.find(c => c.id_conductor === r.id_conductor);
      const conductor = conductorObj?.nombre || "N/A";
      const transporte = transportes.find(t => t.id_transporte === conductorObj?.id_transporte)?.nombre || "N/A";

      if (detallesActivos.length === 0) {
        filas.push({
          "N° Entrada": r.numero_entrada,
          "Fecha y Hora": new Date(r.fecha_entrada).toLocaleString(),
          "Transporte": transporte,
          "Placa Cabezal": cabezal,
          "Placa Furgón": furgon,
          "Conductor": conductor,
          "Remisión Física": "",
          "Proveedor / Finca": "",
          "Sacos": 0,
          "Quintales (QQ)": 0,
          "Estado de Carga": "",
        });
      } else {
        detallesActivos.forEach((d, idx) => {
          filas.push({
            "N° Entrada": idx === 0 ? r.numero_entrada : "",
            "Fecha y Hora": idx === 0 ? new Date(r.fecha_entrada).toLocaleString() : "",
            "Transporte": idx === 0 ? transporte : "",
            "Placa Cabezal": idx === 0 ? cabezal : "",
            "Placa Furgón": idx === 0 ? furgon : "",
            "Conductor": idx === 0 ? conductor : "",
            "Remisión Física": d.remision,
            "Proveedor / Finca": proveedores.find(p => p.id_proveedor === d.id_proveedor)?.nombre || "N/A",
            "Sacos": d.cantidad_sacos,
            "Quintales (QQ)": Number(Number(d.cantidad_qq).toFixed(2)),
            "Estado de Carga": d.estado_transaccion?.nombre || "",
          });
        });
      }
    });

    const ws = XLSX.utils.json_to_sheet(filas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Remisiones");
    XLSX.writeFile(wb, `Remisiones_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <Card>
      {!loading && filteredRecepciones.length > 0 && (
        <Card.Header className="d-flex justify-content-end py-2 bg-white border-bottom">
          <Button variant="outline-success" size="sm" onClick={exportarExcel} className="d-flex align-items-center gap-1">
            <FileSpreadsheet className="w-4 h-4" /> Exportar Excel
          </Button>
        </Card.Header>
      )}
      <Table responsive hover className="mb-0">
        <thead>
          <tr>
            <th style={{ width: "40px" }} />
            {hasRowActions && <th className="text-center" style={{ width: "80px" }}>Acciones</th>}
            <th>N° Entrada</th>
            <th>Fecha y hora</th>
            <th>Transporte</th>
            <th>Placas</th>
            <th>Conductor</th>
            <th className="text-center">Sacos</th>
            <th className="text-end">Quintales</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={colSpan} className="text-center py-8">
                <Loader2 className="w-6 h-6 animate-spin inline-block text-neutral-400 mr-2" /> Cargando remisiones...
              </td>
            </tr>
          ) : filteredRecepciones.length === 0 ? (
            <tr>
              <td colSpan={colSpan} className="text-center py-8 text-neutral-500">
                No hay ingresos pendientes de muestrear
              </td>
            </tr>
          ) : (
            paginated.map((r) => {
              const detallesActivos = r.detalles?.filter(d => d.estado) || [];
              const rowSacos = detallesActivos.reduce((s, d) => s + d.cantidad_sacos, 0);
              const rowQq = detallesActivos.reduce((s, d) => s + Number(d.cantidad_qq), 0);
              const cabezal = placasCabezal.find(p => p.id_placa_cabezal === r.id_placa_cabezal)?.placa || "N/A";
              const furgon = r.id_placa_furgon ? placasFurgon.find(p => p.id_placa_furgon === r.id_placa_furgon)?.placa : null;
              const conductorObj = conductores.find(c => c.id_conductor === r.id_conductor);
              const conductor = conductorObj?.nombre || "N/A";
              const transporte = transportes.find(t => t.id_transporte === conductorObj?.id_transporte)?.nombre || "N/A";
              const isExpanded = expandedRows.includes(r.id_recepcion);
              const canModify = detallesActivos.length > 0 && detallesActivos.every(d => d.estado_transaccion?.nombre === "Pendiente de Muestrear");

              return (
                <React.Fragment key={r.id_recepcion}>
                  <tr className={isExpanded ? "table-warning bg-opacity-10" : ""}>
                    <td>
                      <Button variant="link" size="sm" className="p-1 text-neutral-500" onClick={() => toggleRow(r.id_recepcion)}>
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </Button>
                    </td>

                    {hasRowActions && (
                      <td className="text-center">
                        <Button
                          variant="light"
                          size="sm"
                          className="p-1 rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (actionMenuOpen === r.id_recepcion) {
                              setActionMenuOpen(null); setMenuPos(null);
                            } else {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const menuWidth = 180;
                              setActionMenuOpen(r.id_recepcion);
                              setMenuPos({ top: rect.bottom + 4, left: Math.min(rect.right + 3, window.innerWidth - menuWidth - 8) });
                            }
                          }}
                        >
                          <MoreVertical className="w-5 h-5 text-neutral-600" />
                        </Button>

                        {actionMenuOpen === r.id_recepcion && menuPos && (
                          <div
                            className="card shadow-lg py-1"
                            style={{ position: "fixed", top: menuPos.top, left: menuPos.left, width: "180px", zIndex: 9999 }}
                            onClick={e => e.stopPropagation()}
                          >
                            {hasPermission("EDITAR_RECEPCION") && (
                              <button
                                className={`dropdown-item d-flex align-items-center gap-2 ${!canModify ? "disabled text-muted" : ""}`}
                                disabled={!canModify}
                                title={!canModify ? "No se puede editar porque ya hay cargas en proceso" : ""}
                                onClick={() => { onEdit(r); setActionMenuOpen(null); setMenuPos(null); }}
                              >
                                <Edit className="w-4 h-4" /> Editar Viaje
                              </button>
                            )}
                            {hasPermission("IMPRIMIR_RECEPCION") && (
                              <button
                                className="dropdown-item d-flex align-items-center gap-2"
                                onClick={() => { onPrint(r); setActionMenuOpen(null); setMenuPos(null); }}
                              >
                                <Printer className="w-4 h-4" /> Imprimir Boleta
                              </button>
                            )}
                            {hasPermission("ANULAR_RECEPCION") && (
                              <>
                                <div className="dropdown-divider" />
                                <button
                                  className={`dropdown-item d-flex align-items-center gap-2 text-danger ${!canModify ? "disabled text-muted" : ""}`}
                                  disabled={!canModify}
                                  onClick={() => { onDelete(r); setMenuPos(null); }}
                                >
                                  <Trash2 className="w-4 h-4" /> Anular Ingreso
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </td>
                    )}

                    <td className="font-bold text-coffee-700">{r.numero_entrada}</td>
                    <td>{new Date(r.fecha_entrada).toLocaleString(undefined, { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}</td>
                    <td>{transporte}</td>
                    <td>
                      <div className="text-sm">Cab: <span className="font-medium">{cabezal}</span></div>
                      {furgon && <div className="text-sm text-neutral-500">Fur: <span className="font-medium">{furgon}</span></div>}
                    </td>
                    <td>{conductor}</td>
                    <td className="text-center">{rowSacos}</td>
                    <td className="text-end font-semibold">{rowQq.toFixed(2)} QQ</td>
                  </tr>

                  {isExpanded && (
                    <tr>
                      <td colSpan={colSpan} className="p-0 border-bottom">
                        <TablaDetalleRemision detalles={detallesActivos} proveedores={proveedores} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })
          )}
        </tbody>

        {!loading && filteredRecepciones.length > 0 && (
          <tfoot className="table-light border-top border-2">
            <tr>
              <td colSpan={hasRowActions ? 7 : 6} className="text-end fw-bold text-neutral-600 py-2">
                Total ({filteredRecepciones.length} {filteredRecepciones.length === 1 ? "ingreso" : "ingresos"}):
              </td>
              <td className="text-center fw-bold">{totalSacos.toLocaleString()}</td>
              <td className="text-end fw-bold">{totalQq.toFixed(2)} QQ</td>
            </tr>
          </tfoot>
        )}
      </Table>

      {!loading && filteredRecepciones.length > 0 && (
        <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top">
          <span className="text-muted small">
            {totalPages > 1 ? `Página ${safePage} de ${totalPages} — ` : ""}{filteredRecepciones.length} {filteredRecepciones.length === 1 ? "registro" : "registros"}
          </span>

          {totalPages > 1 && (
            <Pagination size="sm" className="mb-0">
              <Pagination.First onClick={() => setCurrentPage(1)} disabled={safePage === 1} />
              <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={safePage === 1} />
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - safePage) <= 2)
                .reduce<(number | string)[]>((acc, p, idx, arr) => {
                  if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) =>
                  p === "..."
                    ? <Pagination.Ellipsis key={`e-${idx}`} disabled />
                    : <Pagination.Item key={p} active={p === safePage} onClick={() => setCurrentPage(p as number)}>{p}</Pagination.Item>
                )}
              <Pagination.Next onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages} />
              <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={safePage === totalPages} />
            </Pagination>
          )}
        </div>
      )}
    </Card>
  );
}
