import { Loader2, Beaker, Printer, MoreVertical } from "lucide-react";
import { Card, Table, Badge, Button, Dropdown } from "react-bootstrap";
import type { MuestraPendiente } from "../Containers/LaboratorioPage";

interface LabTableProps {
  muestras: MuestraPendiente[];
  loading: boolean;
  hasRowActions: boolean;
  hasPermission: (permission: string) => boolean;
  onOpenModal: (m: MuestraPendiente) => void;
  onPrintClick: (m: MuestraPendiente) => void;
}

export default function LabTable({ muestras, loading, hasRowActions, hasPermission, onOpenModal, onPrintClick }: LabTableProps) {
  return (
    <Card>
      <Table responsive hover className="mb-0">
        <thead>
          <tr>
            {hasRowActions && <th className="text-center" style={{ width: "100px" }}>Acción</th>}
            <th>No. Ingreso</th>
            <th>Remisión Física</th>
            <th>Proveedor / Productor</th>
            <th className="text-end">Volumen</th>
            <th className="text-center">Estado</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={hasRowActions ? 6 : 5} className="text-center py-8">
                <Loader2 className="w-6 h-6 animate-spin inline-block text-neutral-400 mr-2" />
                Cargando bandeja de laboratorio...
              </td>
            </tr>
          ) : muestras.length === 0 ? (
            <tr>
              <td colSpan={hasRowActions ? 6 : 5} className="text-center py-8 text-neutral-500">
                Laboratorio limpio. No hay muestras en espera de catación.
              </td>
            </tr>
          ) : (
            muestras.map((m) => {
              const estadoNombre = m.estado_transaccion?.nombre || "";
              const isMuestreado = estadoNombre === "Muestreado";
              const isGeneralRecibida = estadoNombre === "Muestra General Recibida";
              const isPendienteAprobacionPrevia = estadoNombre === "Muestra Previa Pendiente de Aprobacion";
              const isPendienteAprobacionGeneral = estadoNombre === "Muestra General Pendiente de Aprobacion";

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
                  <td className="text-end">{Number(m.cantidad_qq).toFixed(2)} QQ</td>
                  <td className="text-center">
                    <Badge bg={canCreateAnalysis ? "warning" : "info"}>
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
      </Table>
    </Card>
  );
}
