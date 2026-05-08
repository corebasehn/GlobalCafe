import { useState } from "react";
import { Package, Plus, Calculator } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.industrial;

const mockOrdenes = [
  { id: "OS-2024-0001", lote: "L-2024-0150", fecha: "2024-01-15", sacosEntrada: 500, pesoEntrada: 30500, factor: 0.82, sacosEstimados: 410, estado: "pendiente" },
  { id: "OS-2024-0002", lote: "L-2024-0148", fecha: "2024-01-14", sacosEntrada: 600, pesoEntrada: 36600, factor: 0.81, sacosEstimados: 486, estado: "en_proceso" },
];

export default function OrdenSacosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <PageHeader 
        title="Orden de Sacos" 
        subtitle="Cálculo inverso de insumos" 
        icon={Package} 
        iconBg={colors.bg} 
        iconColor={colors.icon} 
        actions={[{ label: "Nueva Orden", onClick: () => setIsModalOpen(true), icon: Plus }]} 
      />

      <Card className="mb-6">
        <Card.Body className="p-4">
          <Form onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <Form.Group>
                <Form.Label>Sacos de Entrada</Form.Label>
                <Form.Control type="number" placeholder="0" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Peso Total (kg)</Form.Label>
                <Form.Control type="number" placeholder="0" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Factor de Rendimiento</Form.Label>
                <Form.Control type="number" step="0.01" defaultValue="0.82" />
              </Form.Group>
              <Button variant="primary" className="flex items-center gap-2 justify-center h-11">
                <Calculator className="w-4 h-4" /> Calcular
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>No. Orden</th>
              <th>Lote</th>
              <th>Fecha</th>
              <th className="text-center">Sacos Entrada</th>
              <th className="text-end">Peso Entrada</th>
              <th className="text-center">Factor</th>
              <th className="text-center">Sacos Estimados</th>
              <th className="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {mockOrdenes.map((o) => (
              <tr key={o.id}>
                <td className="font-medium text-orange-700">{o.id}</td>
                <td>{o.lote}</td>
                <td>{o.fecha}</td>
                <td className="text-center">{o.sacosEntrada}</td>
                <td className="text-end">{o.pesoEntrada.toLocaleString()} kg</td>
                <td className="text-center">{o.factor}</td>
                <td className="text-center font-semibold">{o.sacosEstimados}</td>
                <td className="text-center">
                  <Badge bg={o.estado === "en_proceso" ? "info" : "warning"}>
                    {o.estado.replace('_', ' ').toUpperCase()}
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
            <Modal.Title>Nueva Orden de Sacos</Modal.Title>
          </Modal.Header>
          <Modal.Body className="space-y-4">
            <Form.Group>
              <Form.Label>Lote</Form.Label>
              <Form.Select required>
                <option value="">Seleccione lote</option>
                <option value="L-2024-0150">L-2024-0150</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Sacos de Entrada</Form.Label>
              <Form.Control type="number" placeholder="0" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Factor de Rendimiento</Form.Label>
              <Form.Control type="number" step="0.01" defaultValue="0.82" required />
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
