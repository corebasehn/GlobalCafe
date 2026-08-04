import { useState } from "react";
import { Save } from "lucide-react";
import { Card, Button, Form } from 'react-bootstrap';
import toast from "react-hot-toast";

export default function ConsecutivosConfig() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    prefijoRemisiones: "R-",
    prefijoLotes: "L-",
    prefijoContratos: "C-",
    prefijoContenedores: "C-"
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success("Prefijos de consecutivos actualizados");
    } catch (error) {
      toast.error("Error al guardar prefijos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="custom-card">
      <Card.Header>
        <Card.Title>
          <span className="border-start border-3 border-success me-2"></span>
          CONSECUTIVOS
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSave}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-muted fs-12">Prefijo Remisiones</Form.Label>
            <Form.Control 
              type="text" 
              value={formData.prefijoRemisiones} 
              onChange={(e) => setFormData({...formData, prefijoRemisiones: e.target.value})}
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-muted fs-12">Prefijo Lotes</Form.Label>
            <Form.Control 
              type="text" 
              value={formData.prefijoLotes} 
              onChange={(e) => setFormData({...formData, prefijoLotes: e.target.value})}
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-muted fs-12">Prefijo Contratos</Form.Label>
            <Form.Control 
              type="text" 
              value={formData.prefijoContratos} 
              onChange={(e) => setFormData({...formData, prefijoContratos: e.target.value})}
              required 
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold text-muted fs-12">Prefijo Contenedores</Form.Label>
            <Form.Control 
              type="text" 
              value={formData.prefijoContenedores} 
              onChange={(e) => setFormData({...formData, prefijoContenedores: e.target.value})}
              required 
            />
          </Form.Group>
          <div className="d-grid">
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

