import React, { useEffect, useState } from "react";
import { Loader2, Scale, ChevronRight, ChevronDown, MoreVertical, Truck, ShieldCheck, FileSpreadsheet } from "lucide-react";
import { Card, Table, Badge, Button, Dropdown, Pagination } from "react-bootstrap";
import * as XLSX from "xlsx";
export type ModalMode = "ENTRADA" | "SALIDA" | "SALIDA_CABEZAL" | "ENTRADA_CABEZAL";

export interface BasculaTableProps {
  recepciones: any[];
  loading: boolean;
  expandedRows: number[];
  onToggleRow: (id: number) => void;
  onOpenModal: (recepcion: any, carga: any, mode: ModalMode) => void;
}

const PAGE_SIZE = 15;

function getBadgeVariant(estado: string) {
  if (estado === "Muestra Aprobada" || estado === "Pesada Abierta") return "info-transparent";
  if (estado === "Pesaje Completado" || estado === "En Bodega") return "success-transparent";
  if (estado.includes("Rechazada") || estado === "Devolución") return "danger-transparent";
  if (estado.includes("Pendiente")) return "warning-transparent";
  return "secondary-transparent";
}

export default function BasculaTable({ recepciones, loading, expandedRows, onToggleRow, onOpenModal }: BasculaTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [recepciones.length]);

  const totalPages = Math.max(1, Math.ceil(recepciones.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = recepciones.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const exportarExcel = () => {
    const filas: Record<string, unknown>[] = [];
    recepciones.forEach(r => {
      const transporteName = r.conductor?.transporte?.nombre || "N/A";
      const conductorName = r.conductor?.nombre || "N/A";
      const cabezal = r.placa_cabezal?.placa || "N/A";
      const furgon = r.placa_furgon?.placa || "";
      const detalles: any[] = r.detalles || [];
      if (detalles.length === 0) {
        filas.push({
          "N° Entrada": r.numero_entrada,
          "Fecha y Hora": new Date(r.fecha_entrada).toLocaleString(),
          "Transporte": transporteName,
          "Placa Cabezal": cabezal,
          "Placa Furgón": furgon,
          "Conductor": conductorName,
          "Remisión": "",
          "Proveedor / Finca": "",
          "Sacos": 0,
          "Pesada Entrada (LB)": "",
          "Pesada Salida (LB)": "",
          "Cafe Neto (LB)": "",
          "Estado": "",
        });
      } else {
        detalles.forEach((carga, idx) => {
          filas.push({
            "N° Entrada": idx === 0 ? r.numero_entrada : "",
            "Fecha y Hora": idx === 0 ? new Date(r.fecha_entrada).toLocaleString() : "",
            "Transporte": idx === 0 ? transporteName : "",
            "Placa Cabezal": idx === 0 ? cabezal : "",
            "Placa Furgón": idx === 0 ? furgon : "",
            "Conductor": idx === 0 ? conductorName : "",
            "Remisión": carga.remision,
            "Proveedor / Finca": carga.proveedor?.nombre || "",
            "Sacos": carga.cantidad_sacos,
            "Pesada Entrada (LB)": carga.pesada_entrada ? Number(carga.pesada_entrada) : "",
            "Pesada Salida (LB)": carga.pesada_salida ? Number(carga.pesada_salida) : "",
            "Cafe Neto (LB)": carga.peso_neto ? Number(carga.peso_neto) : "",
            "Estado": carga.estado_transaccion?.nombre || "",
          });
        });
      }
    });
    const ws = XLSX.utils.json_to_sheet(filas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bascula");
    XLSX.writeFile(wb, `Bascula_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <Card>
      {!loading && recepciones.length > 0 && (
        <Card.Header className="d-flex justify-content-end py-2 bg-white border-bottom">
          <Button variant="outline-success" size="sm" onClick={exportarExcel} className="d-flex align-items-center gap-1">
            <FileSpreadsheet className="w-4 h-4" /> Exportar Excel
          </Button>
        </Card.Header>
      )}
      <Table responsive hover className="mb-0">
        <thead>
          <tr>
            <th style={{ width: "40px" }}></th>
            <th>No. Entrada</th>
            <th>Fecha / Hora</th>
            <th>Transporte</th>
            <th>Placas</th>
            <th>Conductor</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center py-8">
                <Loader2 className="w-6 h-6 animate-spin inline-block text-neutral-400 mr-2" /> Cargando vehículos en báscula...
              </td>
            </tr>
          ) : recepciones.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-8 text-neutral-500">
                No hay vehículos en patio en espera de pesaje.
              </td>
            </tr>
          ) : (
            paginated.map((r) => {
              const isExpanded = expandedRows.includes(r.id_recepcion);
              const transporteName = r.conductor?.transporte?.nombre || "N/A";
              const conductorName = r.conductor?.nombre || "N/A";
              const cabezal = r.placa_cabezal?.placa || "N/A";
              const furgon = r.placa_furgon?.placa;
              const detalles: any[] = r.detalles || [];

              const isVehicleOnScale = detalles.some((d: any) =>
                ["Pesada Abierta", "Sin Cabezal"].includes(d.estado_transaccion?.nombre || "")
              );

              const sumSacos = detalles.reduce((s, d) => s + (d.cantidad_sacos || 0), 0);
              const sumEntrada = detalles.reduce((s, d) => s + (Number(d.pesada_entrada) || 0), 0);
              const sumSalida = detalles.reduce((s, d) => s + (Number(d.pesada_salida) || 0), 0);
              const sumNeto = detalles.reduce((s, d) => s + (Number(d.peso_neto) || 0), 0);

              return (
                <React.Fragment key={r.id_recepcion}>
                  <tr className={isExpanded ? "table-warning bg-opacity-10" : ""}>
                    <td>
                      <Button
                        variant="link"
                        size="sm"
                        className="p-1 text-neutral-500"
                        onClick={() => onToggleRow(r.id_recepcion)}
                      >
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </Button>
                    </td>
                    <td className="font-bold text-coffee-700">{r.numero_entrada}</td>
                    <td>{new Date(r.fecha_entrada).toLocaleString()}</td>
                    <td>{transporteName}</td>
                    <td>
                      <div className="text-sm">Cab: <span className="font-medium">{cabezal}</span></div>
                      {furgon && <div className="text-sm text-neutral-500">Fur: <span className="font-medium">{furgon}</span></div>}
                    </td>
                    <td>{conductorName}</td>
                  </tr>

                  {isExpanded && (
                    <tr>
                      <td colSpan={6} className="p-0 border-bottom">
                        <div className="px-4 py-3 bg-light bg-opacity-50">
                          <Card className="shadow-sm">
                            <Table responsive hover size="sm" className="mb-0">
                              <thead className="bg-light">
                                <tr>
                                  <th className="text-center" style={{ width: "80px" }}>Acciones</th>
                                  <th>Remisión</th>
                                  <th>Proveedor / Finca</th>
                                  <th className="text-center">Sacos</th>
                                  <th className="text-end">Pesada Entrada (Bruto)</th>
                                  <th className="text-end">Pesada Salida (Tara)</th>
                                  <th className="text-end">Cafe Neto</th>
                                  <th className="text-center">Estado</th>
                                </tr>
                              </thead>
                              <tbody>
                                {detalles.map((carga: any) => {
                                  const estadoNombre = carga.estado_transaccion?.nombre || "";
                                  const isMuestraAprobada = estadoNombre === "Muestra Aprobada";
                                  const isEntrada = isMuestraAprobada && !isVehicleOnScale;
                                  const isBloqueadoPorBascula = isMuestraAprobada && isVehicleOnScale;
                                  const isSalida = estadoNombre === "Pesada Abierta" || 
                                                  estadoNombre === "Muestra General Recibida" ||
                                                  estadoNombre === "Muestra General Pendiente de Aprobacion";
                                  const hasNotaPatio = carga.notas_patio && carga.notas_patio.length > 0;
                                  
                                  const isSinCabezal = estadoNombre === "Sin Cabezal";
                                  const isPendienteFaltos = estadoNombre === "Pendiente de Aprobación por Faltos";
                                  const isPendiente = estadoNombre.includes("Pendiente") && !isPendienteFaltos;
                                  const isRechazada = estadoNombre.includes("Rechazada") || estadoNombre === "Devolución";
                                  const isCompletado = estadoNombre === "Pesaje Completado" || estadoNombre === "En Bodega" || estadoNombre === "Pesada Cerrada";

                                  let rowClasses = "";
                                  if (isSalida || isSinCabezal) rowClasses = "table-primary bg-opacity-10";
                                  if (isPendiente || isPendienteFaltos) rowClasses = "table-warning bg-opacity-10";
                                  if (isRechazada) rowClasses = "table-danger bg-opacity-10";
                                  if (isCompletado) rowClasses = "opacity-50";

                                  return (
                                    <tr key={carga.id_detalle_recepcion} className={rowClasses}>
                                      <td className="text-center" style={{ verticalAlign: "middle" }}>
                                        {(isEntrada || isSalida || isSinCabezal) ? (
                                          <Dropdown onClick={(e) => e.stopPropagation()}>
                                            <Dropdown.Toggle
                                              as={Button}
                                              variant="light"
                                              size="sm"
                                              className="p-1 border-0"
                                              id={`menu-basc-${carga.id_detalle_recepcion}`}
                                              bsPrefix="btn"
                                            >
                                              <MoreVertical size={18} className="text-secondary" />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu renderOnMount popperConfig={{ strategy: "fixed" }}>
                                              {isEntrada && (
                                                <Dropdown.Item onClick={() => onOpenModal(r, carga, "ENTRADA")} className="d-flex align-items-center gap-2">
                                                  <Scale size={15} className="text-primary" /> Pesar Entrada (Bruto)
                                                </Dropdown.Item>
                                              )}
                                              {isSalida && (
                                                <>
                                                  {hasNotaPatio ? (
                                                    <Dropdown.Item onClick={() => onOpenModal(r, carga, "SALIDA")} className="d-flex align-items-center gap-2">
                                                      <Scale size={15} className="text-success" /> Pesar Salida (Tara)
                                                    </Dropdown.Item>
                                                  ) : (
                                                    <Dropdown.Item className="text-muted d-flex align-items-center gap-2" disabled>
                                                      <Loader2 size={15} className="animate-spin" /> Esperando Nota de Patio
                                                    </Dropdown.Item>
                                                  )}
                                                  <Dropdown.Divider />
                                                  <Dropdown.Item onClick={() => onOpenModal(r, carga, "SALIDA_CABEZAL")} className="d-flex align-items-center gap-2">
                                                    <Truck size={15} className="text-warning" /> Destarse (Salida Cabezal)
                                                  </Dropdown.Item>
                                                </>
                                              )}
                                              {isSinCabezal && (
                                                <Dropdown.Item onClick={() => onOpenModal(r, carga, "ENTRADA_CABEZAL")} className="d-flex align-items-center gap-2">
                                                  <Truck size={15} className="text-primary" /> Reenganchar (Entrada Cabezal)
                                                </Dropdown.Item>
                                              )}
                                            </Dropdown.Menu>
                                          </Dropdown>
                                        ) : (
                                          <div className="text-center">
                                            {isPendienteFaltos && <Badge bg="danger" className="flex items-center gap-1 mx-auto w-fit"><ShieldCheck size={12}/> Gerencia</Badge>}
                                            {isPendiente && <div  className="spinner-border text-warning" role="status"><span  className="visually-hidden">Loading...</span></div>}

                                            {isRechazada && <Badge bg="danger">Rechazada</Badge>}
                                            {isCompletado && <span className="text-xs text-muted font-bold uppercase">Procesado</span>}
                                            {isBloqueadoPorBascula && <Badge bg="warning" className="text-dark" title="Otra carga de este vehículo está en báscula">En Fila</Badge>}
                                          </div>
                                        )}
                                      </td>
                                      <td className="font-medium text-neutral-700">{carga.remision}</td>
                                      <td>{carga.proveedor?.nombre}</td>
                                      <td className="text-center">{carga.cantidad_sacos}</td>
                                      <td className="text-end font-monospace">{carga.pesada_entrada ? Number(carga.pesada_entrada).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "---"} LB</td>
                                      <td className="text-end font-monospace">{carga.pesada_salida ? Number(carga.pesada_salida).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "---"} LB</td>
                                      <td className="text-end font-monospace font-bold text-coffee-800">{carga.peso_neto ? Number(carga.peso_neto).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "---"} LB</td>
                                      <td className="text-center">
                                        <Badge bg={getBadgeVariant(estadoNombre)}>
                                          {estadoNombre}
                                        </Badge>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                              <tfoot className="table-light border-top border-2">
                                <tr>
                                  <td colSpan={3} className="text-end fw-bold text-neutral-600 py-1">
                                    Total ({detalles.length} {detalles.length === 1 ? "carga" : "cargas"}):
                                  </td>
                                  <td className="text-center fw-bold">{sumSacos.toLocaleString()}</td>
                                  <td className="text-end fw-bold font-monospace">
                                    {sumEntrada > 0 ? sumEntrada.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "---"} LB
                                  </td>
                                  <td className="text-end fw-bold font-monospace">
                                    {sumSalida > 0 ? sumSalida.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "---"} LB
                                  </td>
                                  <td className="text-end fw-bold font-monospace text-coffee-800">
                                    {sumNeto > 0 ? sumNeto.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "---"} LB
                                  </td>
                                  <td />
                                </tr>
                              </tfoot>
                            </Table>
                          </Card>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })
          )}
        </tbody>
      </Table>

      {!loading && recepciones.length > 0 && (
        <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top">
          <span className="text-muted small">
            {totalPages > 1 ? `Página ${safePage} de ${totalPages} — ` : ""}{recepciones.length} {recepciones.length === 1 ? "registro" : "registros"}
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
