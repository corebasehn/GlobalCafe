import { useEffect, useState } from "react";
import { Loader2, Beaker, Printer, MoreVertical, FileSpreadsheet } from "lucide-react";
import { Card, Table, Badge, Button, Dropdown, Pagination } from "react-bootstrap";
import * as XLSX from "xlsx";
import type { MuestraPendiente } from "../Containers/LaboratorioPage";

const PAGE_SIZE = 15;

interface LabTableProps {
  muestras: MuestraPendiente[];
  loading: boolean;
  hasRowActions: boolean;
  hasPermission: (permission: string) => boolean;
  onOpenModal: (m: MuestraPendiente) => void;
  onPrintClick: (m: MuestraPendiente) => void;
  searchTerm: string;
}

export default function LabTable({ muestras, loading, hasRowActions, hasPermission, onOpenModal, onPrintClick, searchTerm }: LabTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [muestras.length]);

  const totalPages = Math.max(1, Math.ceil(muestras.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = muestras.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const totalQq = muestras.reduce((sum, m) => sum + Number(m.cantidad_qq), 0);

  const exportarExcel = () => {
    const filas = muestras.map(m => ({
      "N° Ingreso": m.numero_entrada,
      "Remisión Física": m.remision,
      "Proveedor / Finca": m.proveedor_nombre,      "Tipo Análisis": m.analisis?.tipo_analisis ||
        (m.estado_transaccion?.nombre === "Muestra General Recibida" ||
         m.estado_transaccion?.nombre === "Muestra General Pendiente de Aprobacion"
          ? "GENERAL" : "PREVIA"),      "Quintales (QQ)": Number(Number(m.cantidad_qq).toFixed(2)),
      "Estado": m.estado_transaccion?.nombre || "",
    }));
    const ws = XLSX.utils.json_to_sheet(filas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Laboratorio");
    XLSX.writeFile(wb, `Laboratorio_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <Card>
      {!loading && muestras.length > 0 && (
        <Card.Header className="d-flex justify-content-end py-2 bg-white border-bottom">
          <Button variant="outline-success" size="sm" onClick={exportarExcel} className="d-flex align-items-center gap-1">
            <FileSpreadsheet className="w-4 h-4" /> Exportar Excel
          </Button>
        </Card.Header>
      )}
      <Table responsive hover className="mb-0">
        <thead>
          <tr>
            {hasRowActions && <th className="text-center" style={{ width: "100px" }}>Acción</th>}
            <th>No. Ingreso</th>
            <th>Remisión Física</th>
            <th>Proveedor / Productor</th>
            <th className="text-center">Tipo Análisis</th>
            <th className="text-end">Volumen</th>
            <th className="text-center">Estado</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={hasRowActions ? 7 : 6} className="text-center py-8">
                <Loader2 className="w-6 h-6 animate-spin inline-block text-neutral-400 mr-2" />
                Cargando bandeja de laboratorio...
              </td>
            </tr>
          ) : muestras.length === 0 ? (
            <tr>
              <td colSpan={hasRowActions ? 7 : 6} className="text-center py-8 text-neutral-500">
                {searchTerm.trim().length === 0
                  ? "Ingrese un No. Ingreso o Remisi\u00f3n F\u00edsica para buscar."
                  : "No se encontraron resultados para la b\u00fasqueda."}
              </td>
            </tr>
          ) : (
            muestras.map((m) => {
              const estadoNombre = m.estado_transaccion?.nombre || "";
              const isMuestreado = estadoNombre === "Muestreado";
              const isGeneralRecibida = estadoNombre === "Muestra General Recibida";
              const isPendienteAprobacionPrevia = estadoNombre === "Muestra Previa Pendiente de Aprobacion";
              const isPendienteAprobacionGeneral = estadoNombre === "Muestra General Pendiente de Aprobacion";

              const tipoAnalisis: string =
                m.analisis?.tipo_analisis ||
                (isGeneralRecibida || isPendienteAprobacionGeneral ? "GENERAL" : "PREVIA");

              // Puede crear análisis si es muestra previa (Muestreado) o muestra general (Recibida de Patio)
              const canCreateAnalysis = isMuestreado || isGeneralRecibida;
              const isEnRevision = isPendienteAprobacionPrevia || isPendienteAprobacionGeneral;

              return (
                <tr key={m.id_detalle_recepcion}>
                  {hasRowActions && (
                    <td className="text-center" style={{ verticalAlign: "middle" }}>
                      <Dropdown onClick={(e) => e.stopPropagation()}>
                        <Dropdown.Toggle
                          as={Button}
                          variant="light"
                          size="sm"
                          className="p-1 border-0"
                          id={`menu-${m.id_detalle_recepcion}`}
                          bsPrefix="btn"
                        >
                          <MoreVertical size={18} className="text-secondary" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu renderOnMount popperConfig={{ strategy: "fixed" }}>
                          {hasPermission("CREAR_MUESTRA") && (
                            <Dropdown.Item
                              disabled={!canCreateAnalysis}
                              onClick={() => onOpenModal(m)}
                              className="d-flex align-items-center gap-2"
                            >
                              <Beaker size={15} /> Crear Análisis
                            </Dropdown.Item>
                          )}
                          {hasPermission("IMPRIMIR_MUESTRA") && (
                            <Dropdown.Item
                              disabled={!isEnRevision}
                              onClick={() => onPrintClick(m)}
                              className="d-flex align-items-center gap-2"
                            >
                              <Printer size={15} /> Imprimir Boleta
                            </Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  )}
                  <td className="font-medium text-neutral-600">{m.numero_entrada}</td>
                  <td className="font-bold text-coffee-700">{m.remision}</td>
                  <td>{m.proveedor_nombre}</td>
                  <td className="text-center">
                    <Badge bg={tipoAnalisis === "GENERAL" ? "dark-transparent" : "light-transparent"}>
                      {tipoAnalisis}
                    </Badge>
                  </td>
                  <td className="text-end">{Number(m.cantidad_qq).toFixed(2)} QQ</td>
                  <td className="text-center">
                    <Badge bg={canCreateAnalysis ? "warning-transparent" : "info-transparent"}>
                      {canCreateAnalysis 
                        ? (isGeneralRecibida ? "MUESTRA GENERAL" : "EN LABORATORIO") 
                        : "ESPERANDO APROBACIÓN"}
                    </Badge>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>

        {!loading && muestras.length > 0 && (
          <tfoot className="table-light border-top border-2">
            <tr>
              <td colSpan={hasRowActions ? 5 : 4} className="text-end fw-bold text-neutral-600 py-2">
                Total ({muestras.length} {muestras.length === 1 ? "muestra" : "muestras"}):
              </td>
              <td className="text-end fw-bold">{totalQq.toFixed(2)} QQ</td>
              <td />
            </tr>
          </tfoot>
        )}
      </Table>

      {!loading && muestras.length > 0 && (
        <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top">
          <span className="text-muted small">
            {totalPages > 1 ? `Página ${safePage} de ${totalPages} — ` : ""}{muestras.length} {muestras.length === 1 ? "registro" : "registros"}
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
