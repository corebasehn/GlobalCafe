import { Table, Badge, Button } from 'react-bootstrap';
import { ShieldCheck, Truck, AlertTriangle } from "lucide-react";

interface FaltosTableProps {
  data: any[];
  onDecide: (item: any) => void;
}

export default function FaltosTable({ data, onDecide }: FaltosTableProps) {
  return (
    <Table responsive hover className="mb-0">
      <thead>
        <tr>
          <th>Ingreso / Fecha</th>
          <th>Proveedor / Remisión</th>
          <th className="text-center">Sacos Faltos</th>
          <th>Motivo Reportado</th>
          <th className="text-center">Acción</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center py-4 text-neutral-500">
              No hay reportes de sacos faltos pendientes de decisión
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item.id_detalle_recepcion}>
              <td>
                <div className="flex flex-col">
                  <span className="font-bold text-coffee-700">{item.recepcion.numero_entrada}</span>
                  <span className="text-xs text-neutral-500">
                    {new Date(item.fecha_creacion).toLocaleString()}
                  </span>
                </div>
              </td>
              <td>
                <div className="flex flex-col">
                  <span className="font-medium">{item.proveedor.nombre}</span>
                  <Badge bg="warning" className="w-fit text-black mt-1">
                    {item.remision}
                  </Badge>
                </div>
              </td>
              <td className="text-center">
                <span className="text-lg font-bold text-danger-700">{item.cantidad_sacos}</span>
              </td>
              <td style={{ maxWidth: '250px' }}>
                <p className="text-xs mb-0 italic">"{item.observaciones}"</p>
              </td>
              <td className="text-center">
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="flex items-center gap-2 mx-auto"
                  onClick={() => onDecide(item)}
                >
                  <ShieldCheck size={16} /> Decidir
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
