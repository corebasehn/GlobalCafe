import { useState } from "react";
import { Boxes, Plus, Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.comercial;

const mockLotes = [
  { id: "L-2024-0150", contrato: "CV-2024-0001", fecha: "2024-01-15", sacos: 500, peso: 30500, calidad: "Excelso", estado: "aprobado" },
  { id: "L-2024-0151", contrato: "CV-2024-0002", fecha: "2024-01-16", sacos: 800, peso: 48800, calidad: "Supremo", estado: "en_proceso" },
];

export default function LotesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <PageHeader 
        title="Generación de Lotes" 
        subtitle="Creación y gestión de lotes de café" 
        icon={Boxes} 
        iconBg={colors.bg} 
        iconColor={colors.icon} 
        actions={[{ label: "Nuevo Lote", onClick: () => setIsModalOpen(true), icon: Plus }]} 
      />

      <Card className="mb-6">
        <Card.Body className="p-4">
          <InputGroup>
            <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
            <Form.Control 
              placeholder="Buscar lote..." 
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
              <th>No. Lote</th>
              <th>Contrato</th>
              <th>Fecha</th>
              <th className="text-center">Sacos</th>
              <th className="text-end">Peso (kg)</th>
              <th>Calidad</th>
              <th className="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {mockLotes
              .filter(l => l.id.toLowerCase().includes(searchTerm.toLowerCase()) || l.contrato.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((l) => (
                <tr key={l.id}>
                  <td className="font-medium text-primary">{l.id}</td>
                  <td>{l.contrato}</td>
                  <td>{l.fecha}</td>
                  <td className="text-center">{l.sacos}</td>
                  <td className="text-end">{l.peso.toLocaleString()}</td>
                  <td>{l.calidad}</td>
                  <td className="text-center">
                    <Badge bg={l.estado === "aprobado" ? "success" : "info"}>
                      {l.estado.toUpperCase()}
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
            <Modal.Title>Generar Nuevo Lote</Modal.Title>
          </Modal.Header>
          <Modal.Body className="space-y-4">
            <Form.Group>
              <Form.Label>Contrato</Form.Label>
              <Form.Select required>
                <option value="">Seleccione contrato</option>
                <option value="CV-2024-0001">CV-2024-0001 - Starbucks</option>
              </Form.Select>
            </Form.Group>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Group>
                <Form.Label>Cantidad de Sacos</Form.Label>
                <Form.Control type="number" placeholder="0" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Calidad</Form.Label>
                <Form.Select required>
                  <option value="">Seleccione</option>
                  <option value="excelso">Excelso</option>
                  <option value="supremo">Supremo</option>
                </Form.Select>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Generar Lote
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
