import { useState } from "react";
import { CheckCircle, Search, ThumbsUp, ThumbsDown } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.comercial;

const mockAprobaciones = [
  { id: "AC-2024-0001", contrato: "CV-2024-0001", cliente: "Starbucks Corp", muestra: "MPE-2024-0001", fechaEnvio: "2024-01-16", estado: "pendiente" },
  { id: "AC-2024-0002", contrato: "CV-2024-0002", cliente: "Nestle AG", muestra: "MPE-2024-0002", fechaEnvio: "2024-01-14", estado: "aprobado" },
  { id: "AC-2024-0003", contrato: "CV-2024-0003", cliente: "Lavazza SpA", muestra: "MPE-2024-0003", fechaEnvio: "2024-01-12", estado: "rechazado" },
];

export default function AprobacionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<typeof mockAprobaciones[0] | null>(null);

  const handleCloseModal = () => setSelectedItem(null);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "aprobado": return "success";
      case "pendiente": return "warning";
      case "rechazado": return "danger";
      default: return "secondary";
    }
  };

  return (
    <div>
      <PageHeader title="Aprobación Cliente" subtitle="Gestión de aprobaciones de muestras" icon={CheckCircle} iconBg={colors.bg} iconColor={colors.icon} />

      {/* Estadísticas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-amber-600 mb-0">4</p>
            <p className="text-sm text-neutral-600 mb-0">Pendientes</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-green-600 mb-0">18</p>
            <p className="text-sm text-neutral-600 mb-0">Aprobados</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-red-600 mb-0">2</p>
            <p className="text-sm text-neutral-600 mb-0">Rechazados</p>
          </Card.Body>
        </Card>
      </div>

      {/* Buscador */}
      <Card className="mb-6">
        <Card.Body className="p-4">
          <InputGroup>
            <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
            <Form.Control 
              placeholder="Buscar..." 
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
              <th>ID</th>
              <th>Contrato</th>
              <th>Cliente</th>
              <th>Muestra</th>
              <th>Fecha Envío</th>
              <th className="text-center">Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockAprobaciones
              .filter(a => 
                a.cliente.toLowerCase().includes(searchTerm.toLowerCase()) || 
                a.id.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((a) => (
                <tr key={a.id}>
                  <td className="font-medium text-primary">{a.id}</td>
                  <td>{a.contrato}</td>
                  <td>{a.cliente}</td>
                  <td>{a.muestra}</td>
                  <td>{a.fechaEnvio}</td>
                  <td className="text-center">
                    <Badge bg={getStatusVariant(a.estado)}>
                      {a.estado.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="text-center">
                    {a.estado === "pendiente" && (
                      <div className="flex items-center justify-center gap-2">
                        <Button 
                          variant="light" 
                          size="sm" 
                          className="p-1 text-success border"
                          onClick={() => setSelectedItem(a)}
                        >
                          <ThumbsUp className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="light" 
                          size="sm" 
                          className="p-1 text-danger border"
                        >
                          <ThumbsDown className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card>

      {/* Modal de Aprobación */}
      <Modal show={!!selectedItem} onHide={handleCloseModal}>
        <Form onSubmit={(e) => { e.preventDefault(); handleCloseModal(); }}>
          <Modal.Header closeButton>
            <Modal.Title>Registrar Aprobación</Modal.Title>
          </Modal.Header>
          <Modal.Body className="space-y-4">
            <Form.Group>
              <Form.Label>Comentarios del Cliente</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Observaciones..." />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha de Aprobación</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="success" type="submit">
              Registrar Aprobación
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
