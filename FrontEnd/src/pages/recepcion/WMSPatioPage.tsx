import { useState } from "react";
import { Warehouse, Search, MapPin, Package } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup, ProgressBar } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.recepcion;

const mockUbicaciones = [
  { id: "UB-A01", sector: "A", fila: "01", capacidad: 500, ocupado: 350, lotes: 3 },
  { id: "UB-A02", sector: "A", fila: "02", capacidad: 500, ocupado: 500, lotes: 4 },
  { id: "UB-B01", sector: "B", fila: "01", capacidad: 600, ocupado: 200, lotes: 2 },
  { id: "UB-B02", sector: "B", fila: "02", capacidad: 600, ocupado: 0, lotes: 0 },
];

const mockInventario = [
  { id: "INV-0001", ubicacion: "UB-A01", remision: "R-2024-0001", proveedor: "Finca El Paraíso", sacos: 150, peso: 6700, fechaIngreso: "2024-01-15" },
  { id: "INV-0002", ubicacion: "UB-A01", remision: "R-2024-0002", proveedor: "Cooperativa Café Alto", sacos: 200, peso: 9000, fechaIngreso: "2024-01-15" },
  { id: "INV-0003", ubicacion: "UB-A02", remision: "R-2024-0003", proveedor: "Hacienda Santa Rosa", sacos: 180, peso: 8100, fechaIngreso: "2024-01-14" },
];

export default function WMSPatioPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCloseModal = () => setIsModalOpen(false);

  const getOcupacionColor = (porcentaje: number) => {
    if (porcentaje >= 90) return "danger";
    if (porcentaje >= 70) return "warning";
    if (porcentaje > 0) return "success";
    return "secondary";
  };

  return (
    <div>
      <PageHeader 
        title="WMS Patio" 
        subtitle="Gestión de almacenamiento de pergamino" 
        icon={Warehouse} 
        iconBg={colors.bg} 
        iconColor={colors.icon} 
        actions={[{ label: "Asignar Ubicación", onClick: () => setIsModalOpen(true), icon: MapPin }]} 
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {mockUbicaciones.map((ub) => {
          const porcentaje = Math.round((ub.ocupado / ub.capacidad) * 100);
          return (
            <Card key={ub.id} className="cursor-pointer shadow-sm hover:shadow-md transition-shadow">
              <Card.Body className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg">{ub.id}</span>
                  <Badge bg={getOcupacionColor(porcentaje)}>{porcentaje}%</Badge>
                </div>
                <ProgressBar 
                  variant={getOcupacionColor(porcentaje)} 
                  now={porcentaje} 
                  className="mb-3" 
                  style={{ height: '8px' }} 
                />
                <div className="flex justify-between text-xs text-neutral-600">
                  <span>{ub.ocupado} / {ub.capacidad} sacos</span>
                  <span>{ub.lotes} lotes</span>
                </div>
              </Card.Body>
            </Card>
          );
        })}
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
        <Card.Header className="bg-transparent py-3">
          <Card.Title as="h5" className="mb-0">Inventario en Patio</Card.Title>
        </Card.Header>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ubicación</th>
              <th>Remisión</th>
              <th>Proveedor</th>
              <th className="text-center">Sacos</th>
              <th className="text-end">Peso (kg)</th>
              <th>Fecha Ingreso</th>
            </tr>
          </thead>
          <tbody>
            {mockInventario
              .filter(inv => inv.proveedor.toLowerCase().includes(searchTerm.toLowerCase()) || inv.remision.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((inv) => (
                <tr key={inv.id}>
                  <td className="font-medium text-coffee-700">{inv.id}</td>
                  <td><Badge bg="info">{inv.ubicacion}</Badge></td>
                  <td>{inv.remision}</td>
                  <td>{inv.proveedor}</td>
                  <td className="text-center">{inv.sacos}</td>
                  <td className="text-end">{inv.peso.toLocaleString()}</td>
                  <td>{inv.fechaIngreso}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card>

      <Modal show={isModalOpen} onHide={handleCloseModal} size="lg">
        <Form onSubmit={(e) => { e.preventDefault(); handleCloseModal(); }}>
          <Modal.Header closeButton>
            <Modal.Title>Asignar Ubicación</Modal.Title>
          </Modal.Header>
          <Modal.Body className="space-y-4">
            <Form.Group>
              <Form.Label>Remisión</Form.Label>
              <Form.Select required>
                <option value="">Seleccione remisión</option>
                <option value="R-2024-0004">R-2024-0004 - Finca Los Alpes</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Ubicación Destino</Form.Label>
              <Form.Select required>
                <option value="">Seleccione ubicación</option>
                {mockUbicaciones
                  .filter(u => (u.ocupado / u.capacidad) < 1)
                  .map(u => (
                    <option key={u.id} value={u.id}>
                      {u.id} - Disponible: {u.capacidad - u.ocupado} sacos
                    </option>
                  ))
                }
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Cantidad de Sacos</Form.Label>
              <Form.Control type="number" placeholder="0" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Observaciones</Form.Label>
              <Form.Control type="text" placeholder="Notas adicionales..." />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" className="flex items-center gap-2">
              <Package className="w-4 h-4" /> Asignar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
