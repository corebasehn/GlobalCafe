import { Save } from "lucide-react";
import { Card, Button, Form } from 'react-bootstrap';

export default function NotificacionesConfig() {
  return (
    <Card>
      <Card.Header><Card.Title as="h5" className="mb-0">Configuración de Notificaciones</Card.Title></Card.Header>
      <Card.Body className="space-y-4">
        <Form.Check type="checkbox" label="Notificar nuevas remisiones" defaultChecked />
        <Form.Check type="checkbox" label="Notificar aprobaciones pendientes" defaultChecked />
        <Form.Check type="checkbox" label="Notificar contenedores por despachar" defaultChecked />
        <Form.Check type="checkbox" label="Notificaciones por email" />
        <Button variant="primary" className="flex items-center gap-2"><Save className="w-4 h-4" /> Guardar Cambios</Button>
      </Card.Body>
    </Card>
  );
}
