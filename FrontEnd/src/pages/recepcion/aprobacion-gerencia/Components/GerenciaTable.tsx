import { Loader2 } from "lucide-react";
import { Table, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import type { MuestraGerencia } from "../Containers/AprobacionGerenciaPage";

export interface GerenciaTableProps {
  muestras: MuestraGerencia[];
  loading: boolean;
  hasRowActions: boolean;
  onOpenEvaluation: (m: MuestraGerencia) => void;
}

export default function GerenciaTable({ muestras, loading, hasRowActions, onOpenEvaluation }: GerenciaTableProps) {
  return (
    <div className="table-responsive">
      <Table hover className="table text-nowrap table-bordered mb-0">
        <thead>
          <tr>
            {hasRowActions && <th scope="col" className="text-center">Acción</th>}
            <th scope="col">Identificador</th>
            <th scope="col">Ingreso / Remisión</th>
            <th scope="col">Proveedor</th>
            <th scope="col" className="text-center">Calidad Sugerida</th>
            <th scope="col" className="text-end">Volumen</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={hasRowActions ? 6 : 5} className="text-center py-5 text-muted">
                <Loader2 className="w-6 h-6 animate-spin d-inline-block me-2" /> Consultando pendientes...
              </td>
            </tr>
          ) : muestras.length === 0 ? (
            <tr>
              <td colSpan={hasRowActions ? 6 : 5} className="text-center py-5 text-muted">
                Bandeja limpia. No hay muestras pendientes de autorización.
              </td>
            </tr>
          ) : (
            muestras.map((m) => (
              <tr key={m.id_analisis_calidad}>
                {hasRowActions && (
                  <td className="text-center">
                    <OverlayTrigger placement="top" overlay={<Tooltip>Evaluar Muestra</Tooltip>}>
                      <button
                        type="button"
                        className="btn btn-icon btn-sm btn-primary-light btn-wave rounded-pill"
                        onClick={() => onOpenEvaluation(m)}
                      >
                        <i className="fe fe-eye"></i>
                      </button>
                    </OverlayTrigger>
                  </td>
                )}
                <td>
                  <div className="d-flex flex-column">
                    <span className="fw-bold text-primary">{m.numero_analisis}</span>
                    <span className="fs-11 text-muted">{new Date(m.fecha_analisis).toLocaleDateString()}</span>
                  </div>
                </td>
                <td>
                  <div className="d-flex flex-column">
                    <span className="fw-semibold text-dark">{m.numero_entrada}</span>
                    <span className="fs-11 text-muted">Rem: {m.remision}</span>
                  </div>
                </td>
                <td className="text-muted">{m.proveedor_nombre}</td>
                <td className="text-center">
                  <Badge bg="info-transparent" className="rounded-pill px-3">{m.calidad_nombre}</Badge>
                </td>
                <td className="text-end fw-semibold text-dark">
                  {m.cantidad_qq.toFixed(2)} <span className="fs-11 text-muted fw-normal">QQ</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

