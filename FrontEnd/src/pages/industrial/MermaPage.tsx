import { useState } from "react";
import { Recycle, Search, ArrowRight } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.industrial;

const mockMermas = [
  { id: "MR-2024-0001", proceso: "TR-2024-0001", tipo: "Cisco", peso: 854, destino: "Venta Local", estado: "pendiente" },
  { id: "MR-2024-0002", proceso: "TR-2024-0001", tipo: "Pasilla", peso: 244, destino: "Reproceso", estado: "asignado" },
  { id: "MR-2024-0003", proceso: "TR-2024-0002", tipo: "Cisco", peso: 1281, destino: "Venta Local", estado: "asignado" },
];

export default function MermaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <PageHeader title="Merma / Remanente" subtitle="Gestión de subproductos y reasignación" icon={Recycle} iconBg={colors.bg} iconColor={colors.icon} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-amber-600 mb-0">2,379</p>
            <p className="text-sm text-neutral-600 mb-0">Total Merma (kg)</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-coffee-700 mb-0">2,135</p>
            <p className="text-sm text-neutral-600 mb-0">Cisco (kg)</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-neutral-600 mb-0">244</p>
            <p className="text-sm text-neutral-600 mb-0">Pasilla (kg)</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-green-600 mb-0">1</p>
            <p className="text-sm text-neutral-600 mb-0">Pendiente Asignar</p>
          </Card.Body>
        </Card>
      </div>

      <Card className="mb-6">
        <Card.Body className="p-4">
          <InputGroup>
            <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
            <Form.Control 
              placeholder="Buscar merma..." 
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
              <th>ID Merma</th>
              <th>Proceso</th>
              <th>Tipo</th>
              <th className="text-end">Peso (kg)</th>
              <th>Destino</th>
              <th className="text-center">Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockMermas
              .filter(m => m.id.toLowerCase().includes(searchTerm.toLowerCase()) || m.proceso.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((m) => (
                <tr key={m.id}>
                  <td className="font-medium text-orange-700">{m.id}</td>
                  <td>{m.proceso}</td>
                  <td>{m.tipo}</td>
                  <td className="text-end">{m.peso.toLocaleString()}</td>
                  <td>{m.destino}</td>
                  <td className="text-center">
                    <Badge bg={m.estado === "asignado" ? "success" : "warning"}>
                      {m.estado.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="text-center">
                    {m.estado === "pendiente" && (
                      <Button variant="outline-primary" size="sm" onClick={() => setIsModalOpen(true)} className="flex items-center gap-1 mx-auto">
                        Asignar <ArrowRight className="w-3 h-3" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card>

      <Modal show={isModalOpen} onHide={handleCloseModal} size="lg">
        <Form onSubmit={(e) => { e.preventDefault(); handleCloseModal(); }}>
          <Modal.Header closeButton>
            <Modal.Title>Asignar Destino</Modal.Title>
          </Modal.Header>
          <Modal.Body className="space-y-4">
            <Form.Group>
              <Form.Label>Destino</Form.Label>
              <Form.Select required>
                <option value="">Seleccione destino</option>
                <option value="venta">Venta Local</option>
                <option value="reproceso">Reproceso</option>
                <option value="desecho">Desecho</option>
              </Form.Select>
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
            <Button variant="primary" type="submit">
              Asignar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
