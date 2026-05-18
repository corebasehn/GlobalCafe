import { Save } from "lucide-react";
import { Card, Button, Form } from 'react-bootstrap';

export default function EmpresaConfig() {
  return (
    <Card>
      <Card.Header><Card.Title as="h5" className="mb-0">Información de la Empresa</Card.Title></Card.Header>
      <Card.Body className="space-y-4">
        <Form.Group><Form.Label>Nombre de la Empresa</Form.Label><Form.Control type="text" defaultValue="Global Café S.A." /></Form.Group>
        <Form.Group><Form.Label>NIT / RUC</Form.Label><Form.Control type="text" defaultValue="900.123.456-7" /></Form.Group>
        <Form.Group><Form.Label>Dirección</Form.Label><Form.Control type="text" defaultValue="Km 5 Vía al Puerto" /></Form.Group>
        <Form.Group><Form.Label>Teléfono</Form.Label><Form.Control type="text" defaultValue="+57 1 234 5678" /></Form.Group>
        <Form.Group><Form.Label>Email</Form.Label><Form.Control type="email" defaultValue="info@globalcafe.com" /></Form.Group>
        <Button variant="primary" className="flex items-center gap-2"><Save className="w-4 h-4" /> Guardar Cambios</Button>
      </Card.Body>
    </Card>
  );
}
