import { Save } from "lucide-react";
import { Card, Button, Form } from 'react-bootstrap';

export default function ConsecutivosConfig() {
  return (
    <Card>
      <Card.Header><Card.Title as="h5" className="mb-0">Consecutivos</Card.Title></Card.Header>
      <Card.Body className="space-y-4">
        <Form.Group><Form.Label>Prefijo Remisiones</Form.Label><Form.Control type="text" defaultValue="R-2024-" /></Form.Group>
        <Form.Group><Form.Label>Prefijo Lotes</Form.Label><Form.Control type="text" defaultValue="L-2024-" /></Form.Group>
        <Form.Group><Form.Label>Prefijo Contratos</Form.Label><Form.Control type="text" defaultValue="CV-2024-" /></Form.Group>
        <Form.Group><Form.Label>Prefijo Contenedores</Form.Label><Form.Control type="text" defaultValue="CONT-" /></Form.Group>
        <Button variant="primary" className="flex items-center gap-2"><Save className="w-4 h-4" /> Guardar Cambios</Button>
      </Card.Body>
    </Card>
  );
}
