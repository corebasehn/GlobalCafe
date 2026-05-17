import { Loader2 } from "lucide-react";
import { Card, Table, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import type { MuestraGerencia } from "../Containers/AprobacionGerenciaPage";

export interface GerenciaTableProps {
  muestras: MuestraGerencia[];
  loading: boolean;
  hasRowActions: boolean;
  onOpenEvaluation: (m: MuestraGerencia) => void;
}

export default function GerenciaTable({ muestras, loading, hasRowActions, onOpenEvaluation }: GerenciaTableProps) {
  return (
    <Card>
      <Table responsive hover className="mb-0">
        <thead>
          <tr>
            {hasRowActions && <th className="text-center">Acción</th>}
            <th>Identificador</th>
            <th>Ingreso / Remisión</th>
            <th>Proveedor</th>
            <th className="text-center">Calidad Sugerida</th>
            <th className="text-end">Volumen</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={hasRowActions ? 6 : 5} className="text-center py-8">
                <Loader2 className="w-6 h-6 animate-spin inline-block text-neutral-400 mr-2" /> Consultando pendientes...
              </td>
            </tr>
          ) : muestras.length === 0 ? (
            <tr>
              <td colSpan={hasRowActions ? 6 : 5} className="text-center py-8 text-neutral-500">
                Bandeja limpia. No hay muestras pendientes de autorización.
              </td>
            </tr>
          ) : (
            muestras.map((m) => (
              <tr key={m.id_analisis_calidad}>
                {hasRowActions && (
                  <td className="text-center">
                    <div className="d-flex justify-content-center">
                      <OverlayTrigger placement="top" overlay={<Tooltip>Evaluar Muestra</Tooltip>}>
                        <a
                          href="#!"
                          className="btn btn-icon btn-sm btn-info-light rounded-pill"
                          onClick={(e) => { e.preventDefault(); onOpenEvaluation(m); }}
                        >
                          <i className="fe fe-eye"></i>
                        </a>
                      </OverlayTrigger>
                    </div>
                  </td>
                )}
                <td>
                  <div className="flex flex-col">
                    <span className="font-bold text-coffee-700">{m.numero_analisis}</span>
                    <span className="text-xs text-neutral-500">{new Date(m.fecha_analisis).toLocaleDateString()}</span>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    <span className="font-medium text-neutral-700">{m.numero_entrada}</span>
                    <span className="text-xs text-neutral-500">Rem: {m.remision}</span>
                  </div>
                </td>
                <td>{m.proveedor_nombre}</td>
                <td className="text-center"><Badge bg="info">{m.calidad_nombre}</Badge></td>
                <td className="text-end font-medium">{m.cantidad_qq.toFixed(2)} QQ</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Card>
  );
}
