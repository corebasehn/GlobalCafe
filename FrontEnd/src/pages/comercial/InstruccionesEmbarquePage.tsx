import { useState } from "react";
import { Ship, Plus, Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.comercial;

const mockSI = [
  { id: "SI-2024-0001", contrato: "CV-2024-0001", lote: "L-2024-0150", naviera: "Maersk", buque: "Emma Maersk", eta: "2024-02-01", estado: "aprobado" },
  { id: "SI-2024-0002", contrato: "CV-2024-0002", lote: "L-2024-0151", naviera: "MSC", buque: "MSC Oscar", eta: "2024-02-05", estado: "pendiente" },
];

export default function InstruccionesEmbarquePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <PageHeader 
        title="Instrucciones de Embarque" 
        subtitle="Shipping Instructions (SI)" 
        icon={Ship} 
        iconBg={colors.bg} 
        iconColor={colors.icon} 
        actions={[{ label: "Nueva SI", onClick: () => setIsModalOpen(true), icon: Plus }]} 
      />

      <Card className="mb-6">
        <Card.Body className="p-4">
          <InputGroup>
            <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
            <Form.Control 
              placeholder="Buscar SI..." 
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
              <th>No. SI</th>
              <th>Contrato</th>
              <th>Lote</th>
              <th>Naviera</th>
              <th>Buque</th>
              <th>ETA</th>
              <th className="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {mockSI
              .filter(si => si.id.toLowerCase().includes(searchTerm.toLowerCase()) || si.contrato.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((si) => (
                <tr key={si.id}>
                  <td className="font-medium text-primary">{si.id}</td>
                  <td>{si.contrato}</td>
                  <td>{si.lote}</td>
                  <td>{si.naviera}</td>
                  <td>{si.buque}</td>
                  <td>{si.eta}</td>
                  <td className="text-center">
                    <Badge bg={si.estado === "aprobado" ? "success" : "warning"}>
                      {si.estado.toUpperCase()}
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
            <Modal.Title>Nueva Instrucción de Embarque</Modal.Title>
          </Modal.Header>
          <Modal.Body className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Group>
                <Form.Label>Contrato</Form.Label>
                <Form.Select required>
                  <option value="">Seleccione contrato</option>
                  <option value="CV-2024-0001">CV-2024-0001</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Lote</Form.Label>
                <Form.Select required>
                  <option value="">Seleccione lote</option>
                  <option value="L-2024-0150">L-2024-0150</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Naviera</Form.Label>
                <Form.Select required>
                  <option value="">Seleccione naviera</option>
                  <option value="maersk">Maersk</option>
                  <option value="msc">MSC</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Nombre del Buque</Form.Label>
                <Form.Control type="text" placeholder="Nombre" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Puerto de Embarque</Form.Label>
                <Form.Control type="text" placeholder="Puerto" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Puerto de Destino</Form.Label>
                <Form.Control type="text" placeholder="Puerto" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>ETD</Form.Label>
                <Form.Control type="date" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>ETA</Form.Label>
                <Form.Control type="date" required />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Crear SI
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
