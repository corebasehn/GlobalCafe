import { useState } from "react";
import { Database, Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Form, InputGroup } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.comercial;

const mockInventario = [
  { id: "INV-PS-001", ubicacion: "Bodega A", calidad: "Excelso", sacos: 1200, peso: 73200, humedad: 11.5, origen: "Huila" },
  { id: "INV-PS-002", ubicacion: "Bodega A", calidad: "Supremo", sacos: 800, peso: 48800, humedad: 11.2, origen: "Nariño" },
  { id: "INV-PS-003", ubicacion: "Bodega B", calidad: "Excelso", sacos: 1500, peso: 91500, humedad: 11.8, origen: "Antioquia" },
];

export default function InventarioPergaminoPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const totalSacos = mockInventario.reduce((acc, i) => acc + i.sacos, 0);
  const totalPeso = mockInventario.reduce((acc, i) => acc + i.peso, 0);

  return (
    <div>
      <PageHeader title="Inventario Pergamino Seco" subtitle="Control de inventario de café pergamino" icon={Database} iconBg={colors.bg} iconColor={colors.icon} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-purple-700 mb-0">{totalSacos.toLocaleString()}</p>
            <p className="text-sm text-neutral-600 mb-0">Total Sacos</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-purple-700 mb-0">{(totalPeso/1000).toFixed(1)}t</p>
            <p className="text-sm text-neutral-600 mb-0">Total Toneladas</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-green-600 mb-0">11.5%</p>
            <p className="text-sm text-neutral-600 mb-0">Humedad Promedio</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-coffee-700 mb-0">3</p>
            <p className="text-sm text-neutral-600 mb-0">Orígenes</p>
          </Card.Body>
        </Card>
      </div>

      <Card className="mb-6">
        <Card.Body className="p-4">
          <InputGroup>
            <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
            <Form.Control 
              placeholder="Buscar en inventario..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </InputGroup>
        </Card.Body>
      </Card>

      <Card>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>ID Inventario</th>
              <th>Ubicación</th>
              <th>Calidad</th>
              <th>Origen</th>
              <th className="text-center">Sacos</th>
              <th className="text-end">Peso (kg)</th>
              <th className="text-center">Humedad</th>
            </tr>
          </thead>
          <tbody>
            {mockInventario
              .filter(inv => inv.id.toLowerCase().includes(searchTerm.toLowerCase()) || inv.origen.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((inv) => (
                <tr key={inv.id}>
                  <td className="font-medium text-primary">{inv.id}</td>
                  <td><Badge bg="info">{inv.ubicacion}</Badge></td>
                  <td>{inv.calidad}</td>
                  <td>{inv.origen}</td>
                  <td className="text-center">{inv.sacos.toLocaleString()}</td>
                  <td className="text-end">{inv.peso.toLocaleString()}</td>
                  <td className="text-center">{inv.humedad}%</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
