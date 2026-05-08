import { useState } from "react";
import { FileSignature, Plus, Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.comercial;

const mockContratos = [
  { id: "CV-2024-0001", cliente: "Starbucks Corp", fecha: "2024-01-10", cantidad: 5000, precio: 220, destino: "Seattle, USA", estado: "aprobado" },
  { id: "CV-2024-0002", cliente: "Nestle AG", fecha: "2024-01-12", cantidad: 8000, precio: 215, destino: "Vevey, Suiza", estado: "pendiente" },
  { id: "CV-2024-0003", cliente: "Lavazza SpA", fecha: "2024-01-08", cantidad: 3500, precio: 225, destino: "Turin, Italia", estado: "en_proceso" },
];

export default function ContratosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCloseModal = () => setIsModalOpen(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "aprobado": return "success";
      case "pendiente": return "warning";
      case "en_proceso": return "info";
      default: return "secondary";
    }
  };

  return (
    <div>
      <PageHeader 
        title="Contratos de Venta" 
        subtitle="Gestión de contratos con clientes" 
        icon={FileSignature} 
        iconBg={colors.bg} 
        iconColor={colors.icon} 
        actions={[{ label: "Nuevo Contrato", onClick: () => setIsModalOpen(true), icon: Plus }]} 
      />

      <Card className="mb-6">
        <Card.Body className="p-4">
          <InputGroup>
            <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
            <Form.Control 
              placeholder="Buscar contrato..." 
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
              <th>No. Contrato</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th className="text-end">Cantidad (sacos)</th>
              <th className="text-end">Precio/saco</th>
              <th>Destino</th>
              <th className="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {mockContratos
              .filter(c => c.cliente.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((contrato) => (
                <tr key={contrato.id}>
                  <td className="font-medium text-primary">{contrato.id}</td>
                  <td>{contrato.cliente}</td>
                  <td>{contrato.fecha}</td>
                  <td className="text-end">{contrato.cantidad.toLocaleString()}</td>
                  <td className="text-end">${contrato.precio}</td>
                  <td>{contrato.destino}</td>
                  <td className="text-center">
                    <Badge bg={getStatusVariant(contrato.estado)}>
                      {contrato.estado.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card>

      <Modal show={isModalOpen} onHide={handleCloseModal} size="lg">
        <Form onSubmit={(e) => { e.preventDefault(); handleCloseModal(); }}>
          <Modal.Header closeButton>
            <Modal.Title>Nuevo Contrato</Modal.Title>
          </Modal.Header>
          <Modal.Body className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Group>
                <Form.Label>Cliente</Form.Label>
                <Form.Select required>
                  <option value="">Seleccione cliente</option>
                  <option value="1">Starbucks Corp</option>
                  <option value="2">Nestle AG</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Cantidad (sacos)</Form.Label>
                <Form.Control type="number" placeholder="0" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Precio por Saco ($)</Form.Label>
                <Form.Control type="number" step="0.01" placeholder="0.00" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha de Entrega</Form.Label>
                <Form.Control type="date" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Puerto de Destino</Form.Label>
                <Form.Control type="text" placeholder="Nombre del puerto" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>País Destino</Form.Label>
                <Form.Control type="text" placeholder="País" required />
              </Form.Group>
            </div>
            <Form.Group>
              <Form.Label>Términos Especiales</Form.Label>
              <Form.Control as="textarea" rows={2} placeholder="Condiciones adicionales..." />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Crear Contrato
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
