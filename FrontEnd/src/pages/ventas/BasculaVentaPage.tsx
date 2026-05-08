import { Scale, Save } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Form } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.ventas;
const mockPesajes = [
  { id: "PVL-2024-0001", orden: "OVL-2024-0001", producto: "Cisco", pesoOrden: 500, pesoReal: 502, fecha: "2024-01-16", estado: "completado" },
  { id: "PVL-2024-0002", orden: "OVL-2024-0002", producto: "Pasilla", pesoOrden: 200, pesoReal: 198, fecha: "2024-01-15", estado: "completado" },
];

export default function BasculaVentaPage() {
  return (
    <div>
      <PageHeader title="Báscula Venta Local" subtitle="Validación de peso para ventas" icon={Scale} iconBg={colors.bg} iconColor={colors.icon} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <Card.Header><Card.Title as="h5" className="mb-0">Pesaje Actual</Card.Title></Card.Header>
          <Card.Body>
            <Form.Group className="mb-4">
              <Form.Label>Seleccionar Orden</Form.Label>
              <Form.Select defaultValue="OVL-2024-0001">
                <option value="OVL-2024-0001">OVL-2024-0001 - Cisco 500kg</option>
              </Form.Select>
            </Form.Group>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-neutral-50 rounded-xl"><p className="text-4xl font-bold text-neutral-900">500</p><p className="text-sm text-neutral-600 mt-1">Peso Orden (kg)</p></div>
              <div className="p-4 bg-neutral-50 rounded-xl"><p className="text-4xl font-bold text-neutral-900">502</p><p className="text-sm text-neutral-600 mt-1">Peso Real (kg)</p></div>
              <div className="p-4 bg-green-50 rounded-xl"><p className="text-4xl font-bold text-green-700">+2</p><p className="text-sm text-green-600 mt-1">Diferencia (kg)</p></div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline-secondary" className="flex-1">Capturar Peso</Button>
              <Button variant="primary" className="flex-1 flex items-center justify-center gap-2"><Save className="w-4 h-4" /> Guardar</Button>
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header><Card.Title as="h5" className="mb-0">Estadísticas Hoy</Card.Title></Card.Header>
          <Card.Body className="space-y-3">
            <div className="flex justify-between"><span className="text-neutral-600">Pesajes realizados</span><span className="font-bold">8</span></div>
            <div className="flex justify-between"><span className="text-neutral-600">Total despachado</span><span className="font-bold">2,450 kg</span></div>
          </Card.Body>
        </Card>
      </div>
      <Card>
        <Table responsive hover className="mb-0">
          <thead><tr><th>ID Pesaje</th><th>Orden</th><th>Producto</th><th className="text-right">Peso Orden</th><th className="text-right">Peso Real</th><th>Fecha</th><th className="text-center">Estado</th></tr></thead>
          <tbody>
            {mockPesajes.map((p) => (<tr key={p.id}><td className="font-medium text-red-700">{p.id}</td><td>{p.orden}</td><td>{p.producto}</td><td className="text-right">{p.pesoOrden} kg</td><td className="text-right">{p.pesoReal} kg</td><td>{p.fecha}</td><td className="text-center"><Badge bg="success">Completado</Badge></td></tr>))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
