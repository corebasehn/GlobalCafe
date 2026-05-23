import React from "react";
import { Loader2, Scale, ChevronRight, ChevronDown, MoreVertical, Truck, ShieldCheck } from "lucide-react";
import { Card, Table, Badge, Button, Dropdown } from "react-bootstrap";

export type ModalMode = "ENTRADA" | "SALIDA" | "SALIDA_CABEZAL" | "ENTRADA_CABEZAL";

export interface BasculaTableProps {
  recepciones: any[];
  loading: boolean;
  expandedRows: number[];
  onToggleRow: (id: number) => void;
  onOpenModal: (recepcion: any, carga: any, mode: ModalMode) => void;
}

function getBadgeVariant(estado: string) {
  if (estado === "Muestra Aprobada" || estado === "Pesada Abierta") return "info";
  if (estado === "Pesaje Completado" || estado === "En Bodega") return "success";
  if (estado.includes("Rechazada") || estado === "Devolución") return "danger";
  if (estado.includes("Pendiente")) return "warning";
  return "secondary";
}

export default function BasculaTable({ recepciones, loading, expandedRows, onToggleRow, onOpenModal }: BasculaTableProps) {
  return (
    <Card>
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
            recepciones.map((r) => {
              const isExpanded = expandedRows.includes(r.id_recepcion);
              const transporteName = r.conductor?.transporte?.nombre || "N/A";
              const conductorName = r.conductor?.nombre || "N/A";
              const cabezal = r.placa_cabezal?.placa || "N/A";
              const furgon = r.placa_furgon?.placa;

              const isVehicleOnScale = r.detalles?.some((d: any) =>
                ["Pesada Abierta", "Sin Cabezal"].includes(d.estado_transaccion?.nombre || "")
              );

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
                                {r.detalles.map((carga: any) => {
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
                                            {isPendiente && <Badge bg="warning" className="text-dark"><Loader2 className="w-3 h-3 animate-spin me-1" /> Esperando</Badge>}
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
    </Card>
  );
}
