import { useState } from "react";
import { ShoppingCart, Plus, Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.ventas;
const mockOrdenes = [
  { id: "OVL-2024-0001", cliente: "Distribuidora Local SA", producto: "Cisco", cantidad: 500, precio: 15, total: 7500, fecha: "2024-01-16", estado: "pendiente" },
  { id: "OVL-2024-0002", cliente: "Café Regional", producto: "Pasilla", cantidad: 200, precio: 20, total: 4000, fecha: "2024-01-15", estado: "aprobado" },
];

export default function OrdenVentaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <PageHeader 
        title="Orden de Venta Local" 
        subtitle="Autorización de ventas locales" 
        icon={ShoppingCart} 
        iconBg={colors.bg} 
        iconColor={colors.icon} 
        actions={[{ label: "Nueva Orden", onClick: () => setIsModalOpen(true), icon: Plus }]} 
      />
      
      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-amber-600 mb-0">5</p>
            <p className="text-sm text-neutral-600 mb-0">Pendientes</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-green-600 mb-0">28</p>
            <p className="text-sm text-neutral-600 mb-0">Aprobadas (Mes)</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-coffee-700 mb-0">$45,800</p>
            <p className="text-sm text-neutral-600 mb-0">Valor Total</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-red-600 mb-0">2</p>
            <p className="text-sm text-neutral-600 mb-0">Rechazadas</p>
          </Card.Body>
        </Card>
      </div>

      {/* Buscador */}
      <Card className="mb-6">
        <Card.Body className="p-4">
          <InputGroup>
            <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
            <Form.Control 
              type="text" 
              placeholder="Buscar orden..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </InputGroup>
        </Card.Body>
      </Card>

      {/* Tabla de Órdenes */}
      <Card>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>No. Orden</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th className="text-end">Cantidad (kg)</th>
              <th className="text-end">Precio/kg</th>
              <th className="text-end">Total</th>
              <th>Fecha</th>
              <th className="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {mockOrdenes
              .filter(o => 
                o.cliente.toLowerCase().includes(searchTerm.toLowerCase()) || 
                o.id.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((o) => (
                <tr key={o.id}>
                  <td className="font-medium text-danger">{o.id}</td>
                  <td>{o.cliente}</td>
                  <td>{o.producto}</td>
                  <td className="text-end">{o.cantidad}</td>
                  <td className="text-end">${o.precio}</td>
                  <td className="text-end font-semibold">${o.total.toLocaleString()}</td>
                  <td>{o.fecha}</td>
                  <td className="text-center">
                    <Badge bg={o.estado === "aprobado" ? "success" : "warning"}>
                      {o.estado.charAt(0).toUpperCase() + o.estado.slice(1)}
                    </Badge>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card>

      {/* Modal para Nueva Orden */}
      <Modal show={isModalOpen} onHide={handleCloseModal} size="lg">
        <Form onSubmit={(e) => { e.preventDefault(); handleCloseModal(); }}>
          <Modal.Header closeButton>
            <Modal.Title>Nueva Orden de Venta</Modal.Title>
          </Modal.Header>
          <Modal.Body className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Group>
                <Form.Label>Cliente</Form.Label>
                <Form.Control type="text" placeholder="Nombre del cliente" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Producto</Form.Label>
                <Form.Select required>
                  <option value="">Seleccione...</option>
                  <option value="cisco">Cisco</option>
                  <option value="pasilla">Pasilla</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Cantidad (kg)</Form.Label>
                <Form.Control type="number" placeholder="0" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Precio por kg ($)</Form.Label>
                <Form.Control type="number" step="0.01" placeholder="0.00" required />
              </Form.Group>
            </div>
            <Form.Group>
              <Form.Label>Observaciones</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Notas adicionales..." />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Crear Orden
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
