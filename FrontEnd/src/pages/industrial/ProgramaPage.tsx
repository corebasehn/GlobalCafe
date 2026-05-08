import { useState } from "react";
import { Calendar, Plus } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.industrial;

const mockProgramas = [
  { id: "PP-2024-W03", semana: "Sem 3", fechaInicio: "2024-01-15", lotes: 5, sacosPlaneados: 2500, sacosCompletados: 1800, estado: "en_proceso" },
  { id: "PP-2024-W02", semana: "Sem 2", fechaInicio: "2024-01-08", lotes: 6, sacosPlaneados: 3000, sacosCompletados: 3000, estado: "completado" },
];

export default function ProgramaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <PageHeader 
        title="Programa de Producción" 
        subtitle="Planificación semanal de trilla" 
        icon={Calendar} 
        iconBg={colors.bg} 
        iconColor={colors.icon} 
        actions={[{ label: "Nuevo Programa", onClick: () => setIsModalOpen(true), icon: Plus }]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-orange-600 mb-0">2,500</p>
            <p className="text-sm text-neutral-600 mb-0">Sacos Planeados</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-green-600 mb-0">1,800</p>
            <p className="text-sm text-neutral-600 mb-0">Completados</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-warning mb-0">72%</p>
            <p className="text-sm text-neutral-600 mb-0">Avance</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-coffee-700 mb-0">5</p>
            <p className="text-sm text-neutral-600 mb-0">Lotes en Proceso</p>
          </Card.Body>
        </Card>
      </div>

      <Card>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>Programa</th>
              <th>Semana</th>
              <th>Fecha Inicio</th>
              <th className="text-center">Lotes</th>
              <th className="text-end">Planeados</th>
              <th className="text-end">Completados</th>
              <th className="text-center">Avance</th>
              <th className="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {mockProgramas.map((p) => (
              <tr key={p.id}>
                <td className="font-medium text-orange-700">{p.id}</td>
                <td>{p.semana}</td>
                <td>{p.fechaInicio}</td>
                <td className="text-center">{p.lotes}</td>
                <td className="text-end">{p.sacosPlaneados.toLocaleString()}</td>
                <td className="text-end">{p.sacosCompletados.toLocaleString()}</td>
                <td className="text-center">{Math.round((p.sacosCompletados/p.sacosPlaneados)*100)}%</td>
                <td className="text-center">
                  <Badge bg={p.estado === "completado" ? "success" : "info"}>
                    {p.estado.replace('_', ' ').toUpperCase()}
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
            <Modal.Title>Nuevo Programa Semanal</Modal.Title>
          </Modal.Header>
          <Modal.Body className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Group>
                <Form.Label>Semana</Form.Label>
                <Form.Control type="text" placeholder="Ej: Semana 4" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha Inicio</Form.Label>
                <Form.Control type="date" required />
              </Form.Group>
            </div>
            <Form.Group>
              <Form.Label>Lotes a Incluir</Form.Label>
              <Form.Select required>
                <option value="">Seleccione lotes</option>
                <option value="L-2024-0150">L-2024-0150</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Crear Programa
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
