import { Table, Badge, Button } from 'react-bootstrap';
import { ShieldCheck } from "lucide-react";

interface FaltosTableProps {
  data: any[];
  onDecide: (item: any) => void;
}

export default function FaltosTable({ data, onDecide }: FaltosTableProps) {
  return (
    <div className="table-responsive">
      <Table hover className="table text-nowrap table-bordered mb-0">
        <thead>
          <tr>
            <th scope="col" className="text-center">Acción</th>
            <th scope="col">Ingreso / Fecha</th>
            <th scope="col">Proveedor / Remisión</th>
            <th scope="col" className="text-center">Sacos Faltos</th>
            <th scope="col">Motivo Reportado</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-5 text-muted">
                No hay reportes de sacos faltos pendientes de decisión
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id_detalle_recepcion}>
                <td className="text-center">
                  <Button 
                    variant="primary-light" 
                    size="sm" 
                    className="btn-wave d-inline-flex align-items-center gap-2"
                    onClick={() => onDecide(item)}
                  >
                    <ShieldCheck size={14} /> Decidir
                  </Button>
                </td>
                <td>
                  <div className="d-flex flex-column">
                    <span className="fw-bold text-primary">{item.recepcion.numero_entrada}</span>
                    <span className="fs-11 text-muted">
                      {new Date(item.fecha_creacion).toLocaleString()}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="d-flex flex-column">
                    <span className="fw-semibold text-dark">{item.proveedor.nombre}</span>
                    <Badge bg="warning-transparent" className="rounded-pill mt-1 w-fit">
                      {item.remision}
                    </Badge>
                  </div>
                </td>
                <td className="text-center">
                  <span className="fs-15 fw-bold text-danger">{item.cantidad_sacos}</span>
                  <span className="fs-11 text-muted ms-1">sacos</span>
                </td>
                <td style={{ maxWidth: '300px' }} className="text-wrap">
                  <p className="fs-12 mb-0 italic text-muted">"{item.observaciones}"</p>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

