import { Table, Badge, Button } from 'react-bootstrap';
import { Package, Truck, User } from "lucide-react";
import { RecepcionPatio } from "../../../../api/patio.api";

interface PatioPendingTableProps {
  data: RecepcionPatio[];
  onAction: (item: RecepcionPatio) => void;
}

export default function PatioPendingTable({ data, onAction }: PatioPendingTableProps) {
  return (
    <Table responsive hover className="mb-0">
      <thead>
        <tr>
          <th>Ingreso</th>
          <th>Proveedor / Remisión</th>
          <th>Transporte</th>
          <th className="text-center">Sacos Remisión</th>
          <th className="text-center">Estado</th>
          <th className="text-center">Acción</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center py-4 text-neutral-500">
              No hay vehículos pendientes de descarga en patio
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item.id_detalle_recepcion}>
              <td>
                <div className="flex flex-col">
                  <span className="font-bold text-coffee-700">{item.recepcion.numero_entrada}</span>
                  <span className="text-xs text-neutral-500">
                    Entrada: {new Date(item.fecha_entrada_bascula!).toLocaleString()}
                  </span>
                </div>
              </td>
              <td>
                <div className="flex flex-col">
                  <span className="font-medium">{item.proveedor.nombre}</span>
                  <span className="text-xs text-coffee-600 font-bold">Rem: {item.remision}</span>
                </div>
              </td>
              <td>
                <div className="flex flex-col text-xs">
                  <span className="flex items-center gap-1"><Truck size={12}/> {item.recepcion.placa_cabezal.placa}</span>
                  <span className="flex items-center gap-1"><User size={12}/> {item.recepcion.conductor.nombre}</span>
                </div>
              </td>
              <td className="text-center">
                <Badge bg="secondary" className="text-lg">{item.cantidad_sacos}</Badge>
              </td>
              <td className="text-center">
                <Badge bg="info">{item.estado_transaccion?.nombre || "En Patio"}</Badge>
              </td>
              <td className="text-center">
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="flex items-center gap-2 mx-auto"
                  onClick={() => onAction(item)}
                >
                  <Package size={16} /> Crear Nota
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
