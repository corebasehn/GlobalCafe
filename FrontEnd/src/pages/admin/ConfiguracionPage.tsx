import { Settings, Save } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Button, Form } from 'react-bootstrap';

export default function ConfiguracionPage() {
  return (
    <div>
      <PageHeader title="Configuración" subtitle="Parámetros del sistema" icon={Settings} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
}
