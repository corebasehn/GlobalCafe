import { useState } from "react";
import { Save } from "lucide-react";
import { Card, Button, Form } from 'react-bootstrap';
import toast from "react-hot-toast";

export default function OperacionConfig() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    factorRendimiento: 0.82,
    toleranciaBascula: 0.5,
    humedadMaxima: 12.5,
    defectosMaximos: 5.0,
    moneda: "HNL"
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success("Parámetros de operación actualizados");
    } catch (error) {
      toast.error("Error al guardar parámetros");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="custom-card">
      <Card.Header>
        <Card.Title>
          <span className="border-start border-3 border-success me-2"></span>
          PARÁMETROS DE OPERACIÓN
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSave}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-muted fs-12">Factor de Rendimiento por Defecto</Form.Label>
            <Form.Control 
              type="number" 
              step="0.01" 
              value={formData.factorRendimiento} 
              onChange={(e) => setFormData({...formData, factorRendimiento: parseFloat(e.target.value)})}
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-muted fs-12">Tolerancia Báscula (%)</Form.Label>
            <Form.Control 
              type="number" 
              step="0.1" 
              value={formData.toleranciaBascula} 
              onChange={(e) => setFormData({...formData, toleranciaBascula: parseFloat(e.target.value)})}
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-muted fs-12">Humedad Máxima Aceptable (%)</Form.Label>
            <Form.Control 
              type="number" 
              step="0.1" 
              value={formData.humedadMaxima} 
              onChange={(e) => setFormData({...formData, humedadMaxima: parseFloat(e.target.value)})}
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-muted fs-12">Defectos Máximos (%)</Form.Label>
            <Form.Control 
              type="number" 
              step="0.1"
              value={formData.defectosMaximos} 
              onChange={(e) => setFormData({...formData, defectosMaximos: parseFloat(e.target.value)})}
              required 
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold text-muted fs-12">Moneda Principal</Form.Label>
            <Form.Select 
              value={formData.moneda} 
              onChange={(e) => setFormData({...formData, moneda: e.target.value})}
            >
              <option value="HNL">Lempira (HNL)</option>
              <option value="USD">Dólar (USD)</option>
            </Form.Select>
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

