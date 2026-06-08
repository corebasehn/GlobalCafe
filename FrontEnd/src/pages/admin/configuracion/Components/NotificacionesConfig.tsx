import { useState } from "react";
import { Save } from "lucide-react";
import { Card, Button, Form } from 'react-bootstrap';
import toast from "react-hot-toast";

export default function NotificacionesConfig() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    notificarNuevasRemisiones: true,
    notificarAprobaciones: true,
    notificarContenedores: true,
    notificarEmail: false
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success("Configuración de notificaciones actualizada");
    } catch (error) {
      toast.error("Error al guardar configuración");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="custom-card">
      <Card.Header>
        <Card.Title>
          <span className="border-start border-3 border-success me-2"></span>
          CONFIGURACIÓN DE NOTIFICACIONES
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSave}>
          <Form.Check 
            type="checkbox" 
            label="Notificar nuevas remisiones" 
            className="mb-3 fw-semibold text-muted fs-13"
            checked={formData.notificarNuevasRemisiones}
            onChange={(e) => setFormData({...formData, notificarNuevasRemisiones: e.target.checked})}
          />
          <Form.Check 
            type="checkbox" 
            label="Notificar aprobaciones pendientes" 
            className="mb-3 fw-semibold text-muted fs-13"
            checked={formData.notificarAprobaciones}
            onChange={(e) => setFormData({...formData, notificarAprobaciones: e.target.checked})}
          />
          <Form.Check 
            type="checkbox" 
            label="Notificar contenedores por despachar" 
            className="mb-3 fw-semibold text-muted fs-13"
            checked={formData.notificarContenedores}
            onChange={(e) => setFormData({...formData, notificarContenedores: e.target.checked})}
          />
          <Form.Check 
            type="checkbox" 
            label="Notificaciones por email" 
            className="mb-4 fw-semibold text-muted fs-13"
            checked={formData.notificarEmail}
            onChange={(e) => setFormData({...formData, notificarEmail: e.target.checked})}
          />
          <div className="d-grid mt-auto">
            <Button 
              variant="primary" 
              type="submit" 
              className="btn-wave d-flex align-items-center justify-content-center gap-2"
              disabled={loading}
            >
              <Save className="w-4 h-4" /> {loading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

