import { useState } from "react";
import { PackageCheck, Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Form, InputGroup } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.industrial;

const mockProductos = [
  { id: "PT-2024-0001", lote: "L-2024-0150", fecha: "2024-01-15", sacos: 410, peso: 25010, calidad: "Excelso EP", destino: "Exportación", ubicacion: "Bodega Oro A" },
  { id: "PT-2024-0002", lote: "L-2024-0148", fecha: "2024-01-14", sacos: 486, peso: 29646, calidad: "Supremo", destino: "Exportación", ubicacion: "Bodega Oro B" },
];

export default function ProductoTerminadoPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <PageHeader title="Producto Terminado" subtitle="Inventario de café oro exportable" icon={PackageCheck} iconBg={colors.bg} iconColor={colors.icon} />

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-success mb-0">896</p>
            <p className="text-sm text-neutral-600 mb-0">Sacos Disponibles</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-success mb-0">54.6t</p>
            <p className="text-sm text-neutral-600 mb-0">Toneladas</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-coffee-700 mb-0">2</p>
            <p className="text-sm text-neutral-600 mb-0">Lotes</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-warning mb-0">410</p>
            <p className="text-sm text-neutral-600 mb-0">Comprometidos</p>
          </Card.Body>
        </Card>
      </div>

      {/* Buscador */}
      <Card className="mb-6">
        <Card.Body className="p-4">
          <InputGroup>
            <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
            <Form.Control 
              placeholder="Buscar producto..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </InputGroup>
        </Card.Body>
      </Card>

      {/* Tabla */}
      <Card>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>ID Producto</th>
              <th>Lote</th>
              <th>Fecha</th>
              <th className="text-center">Sacos</th>
              <th className="text-end">Peso (kg)</th>
              <th>Calidad</th>
              <th>Destino</th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {mockProductos
              .filter(p => p.id.toLowerCase().includes(searchTerm.toLowerCase()) || p.lote.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((p) => (
                <tr key={p.id}>
                  <td className="font-medium text-orange-700">{p.id}</td>
                  <td>{p.lote}</td>
                  <td>{p.fecha}</td>
                  <td className="text-center">{p.sacos}</td>
                  <td className="text-end">{p.peso.toLocaleString()}</td>
                  <td>{p.calidad}</td>
                  <td><Badge bg="success">{p.destino}</Badge></td>
                  <td>{p.ubicacion}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
