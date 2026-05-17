import { Badge, Card, Table } from "react-bootstrap";
import { DetalleRecepcion } from "../../api/reception.api";
import { Proveedor } from "../../api/catalogs.api";

type Props = {
  detalles: DetalleRecepcion[];
  proveedores: Proveedor[];
};

export default function TablaDetalleRemision({ detalles, proveedores }: Readonly<Props>) {
  return (
    <div className="px-4 py-3 bg-light bg-opacity-50">
      <Card className="shadow-sm">
        <Table responsive hover size="sm" className="mb-0">
          <thead className="bg-light">
            <tr>
              <th>Remisión Física</th>
              <th>Productor / Finca</th>
              <th className="text-center">Sacos</th>
              <th className="text-end">Quintales</th>
              <th className="text-center">Estado de Carga</th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((d) => (
              <tr key={d.id_detalle_recepcion}>
                <td className="font-medium text-neutral-700">{d.remision}</td>
                <td>{proveedores.find(p => p.id_proveedor === d.id_proveedor)?.nombre}</td>
                <td className="text-center">{d.cantidad_sacos}</td>
                <td className="text-end">{Number(d.cantidad_qq).toFixed(2)} QQ</td>
                <td className="text-center">
                  {d.estado_transaccion?.nombre === "Muestreado" ? (
                    <Badge bg="success">{d.estado_transaccion.nombre}</Badge>
                  ) : (
                    <Badge bg="warning" className="text-dark">{d.estado_transaccion?.nombre}</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
