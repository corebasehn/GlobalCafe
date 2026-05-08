import { useState } from "react";
import { BarChart3, Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Form, InputGroup } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.ventas;
const mockKardex = [
  { id: "KX-001", producto: "Cisco", cosecha: "2024-A", entradas: 2135, salidas: 1500, stock: 635, unidad: "kg" },
  { id: "KX-002", producto: "Pasilla", cosecha: "2024-A", entradas: 850, salidas: 600, stock: 250, unidad: "kg" },
  { id: "KX-003", producto: "Café Segunda", cosecha: "2024-A", entradas: 500, salidas: 200, stock: 300, unidad: "kg" },
];

export default function KardexPage() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <PageHeader title="Kardex Subproductos" subtitle="Control de inventario por cosecha" icon={BarChart3} iconBg={colors.bg} iconColor={colors.icon} />
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card><Card.Body className="p-4 text-center"><p className="text-3xl font-bold text-red-600">3</p><p className="text-sm text-neutral-600">Productos</p></Card.Body></Card>
        <Card><Card.Body className="p-4 text-center"><p className="text-3xl font-bold text-green-600">3,485</p><p className="text-sm text-neutral-600">Total Entradas (kg)</p></Card.Body></Card>
        <Card><Card.Body className="p-4 text-center"><p className="text-3xl font-bold text-amber-600">2,300</p><p className="text-sm text-neutral-600">Total Salidas (kg)</p></Card.Body></Card>
        <Card><Card.Body className="p-4 text-center"><p className="text-3xl font-bold text-coffee-700">1,185</p><p className="text-sm text-neutral-600">Stock Actual (kg)</p></Card.Body></Card>
      </div>
      <Card className="mb-6">
        <Card.Body className="p-4">
          <InputGroup>
            <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
            <Form.Control type="text" placeholder="Buscar producto..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </InputGroup>
        </Card.Body>
      </Card>
      <Card>
        <Table responsive hover className="mb-0">
          <thead><tr><th>ID</th><th>Producto</th><th>Cosecha</th><th className="text-right">Entradas</th><th className="text-right">Salidas</th><th className="text-right">Stock</th><th>Unidad</th></tr></thead>
          <tbody>
            {mockKardex.map((k) => (<tr key={k.id}><td className="font-medium text-red-700">{k.id}</td><td><Badge bg="secondary">{k.producto}</Badge></td><td>{k.cosecha}</td><td className="text-right text-green-600">+{k.entradas.toLocaleString()}</td><td className="text-right text-red-600">-{k.salidas.toLocaleString()}</td><td className="text-right font-bold">{k.stock.toLocaleString()}</td><td>{k.unidad}</td></tr>))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
