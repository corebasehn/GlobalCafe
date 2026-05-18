import { Save } from "lucide-react";
import { Card, Button, Form } from 'react-bootstrap';

export default function OperacionConfig() {
  return (
    <Card>
      <Card.Header><Card.Title as="h5" className="mb-0">Parámetros de Operación</Card.Title></Card.Header>
      <Card.Body className="space-y-4">
        <Form.Group><Form.Label>Factor de Rendimiento por Defecto</Form.Label><Form.Control type="number" step="0.01" defaultValue="0.82" /></Form.Group>
        <Form.Group><Form.Label>Tolerancia Báscula (%)</Form.Label><Form.Control type="number" step="0.1" defaultValue="0.5" /></Form.Group>
        <Form.Group><Form.Label>Humedad Máxima Aceptable (%)</Form.Label><Form.Control type="number" step="0.1" defaultValue="12.5" /></Form.Group>
        <Form.Group><Form.Label>Defectos Máximos (%)</Form.Label><Form.Control type="number" defaultValue="5" /></Form.Group>
        <Form.Group>
          <Form.Label>Moneda Principal</Form.Label>
          <Form.Select defaultValue="USD">
            <option value="USD">Dólar (USD)</option>
            <option value="COP">Peso Colombiano (COP)</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" className="flex items-center gap-2"><Save className="w-4 h-4" /> Guardar Cambios</Button>
      </Card.Body>
    </Card>
  );
}
