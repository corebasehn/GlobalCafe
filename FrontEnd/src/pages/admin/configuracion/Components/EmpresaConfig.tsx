import { useState, useEffect } from "react";
import { Save, Loader2, Globe, Phone, MapPin, Building2, BadgeCheck } from "lucide-react";
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import toast from "react-hot-toast";
import { getEmpresaConfigApi, updateEmpresaConfigApi, type Empresa } from "../../../../api/empresa.api";

export default function EmpresaConfig() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<Partial<Empresa>>({
    nombre: "",
    razon_social: "",
    rtn: "",
    registro_sanitario: "",
    direccion: "",
    telefono: "",
    telefono_secundario: "",
    correo: "",
    pais: "",
    ciudad: "",
    sitio_web: "",
    eslogan: ""
  });

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setFetching(true);
      const data = await getEmpresaConfigApi();
      setFormData(data);
    } catch (error) {
      console.error("Error al cargar configuración:", error);
      toast.error("No se pudo cargar la información de la empresa");
    } finally {
      setFetching(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Eliminamos campos técnicos antes de enviar
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id_empresa, ...payload } = formData as any;
      await updateEmpresaConfigApi(payload);
      toast.success("Información de la empresa actualizada correctamente");
    } catch (error: any) {
      console.error("Error al actualizar:", error);
      toast.error(error.response?.data?.message || "Error al actualizar la información");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Card className="custom-card">
        <Card.Body className="text-center py-5">
          <Loader2 className="w-8 h-8 animate-spin d-inline-block text-primary" />
          <p className="mt-2 text-muted">Cargando información...</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="custom-card">
      <Card.Header>
        <Card.Title>
          <span className="border-start border-3 border-success me-2"></span>
          INFORMACIÓN DE LA EMPRESA
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSave}>
          <h6 className="fw-semibold mb-3 fs-13 d-flex align-items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" /> Identidad Legal
          </h6>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-muted fs-12">Nombre Comercial</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.nombre || ""} 
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  required 
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-muted fs-12">Razón Social (Nombre Legal)</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.razon_social || ""} 
                  onChange={(e) => setFormData({...formData, razon_social: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-muted fs-12">RTN / Identificación Fiscal</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.rtn || ""} 
                  onChange={(e) => setFormData({...formData, rtn: e.target.value})}
                  required 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-muted fs-12">Registro Sanitario</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.registro_sanitario || ""} 
                  onChange={(e) => setFormData({...formData, registro_sanitario: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>

          <hr className="my-4 border-light" />

          <h6 className="fw-semibold mb-3 fs-13 d-flex align-items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> Ubicación y Contacto
          </h6>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-muted fs-12">País</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.pais || ""} 
                  onChange={(e) => setFormData({...formData, pais: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-muted fs-12">Ciudad</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.ciudad || ""} 
                  onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-muted fs-12">Dirección Completa</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.direccion || ""} 
                  onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                  required 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-muted fs-12">Teléfono Principal</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.telefono || ""} 
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  required 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-muted fs-12">Teléfono Secundario</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.telefono_secundario || ""} 
                  onChange={(e) => setFormData({...formData, telefono_secundario: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-muted fs-12">Email Corporativo</Form.Label>
                <Form.Control 
                  type="email" 
                  value={formData.correo || ""} 
                  onChange={(e) => setFormData({...formData, correo: e.target.value})}
                  required 
                />
              </Form.Group>
            </Col>
          </Row>

          <hr className="my-4 border-light" />

          <h6 className="fw-semibold mb-3 fs-13 d-flex align-items-center gap-2">
            <Globe className="w-4 h-4 text-primary" /> Presencia Digital
          </h6>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-muted fs-12">Sitio Web</Form.Label>
                <Form.Control 
                  type="url" 
                  placeholder="https://..."
                  value={formData.sitio_web || ""} 
                  onChange={(e) => setFormData({...formData, sitio_web: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold text-muted fs-12 d-flex align-items-center gap-1">
                   Eslogan <BadgeCheck className="w-3 h-3 text-success" />
                </Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.eslogan || ""} 
                  onChange={(e) => setFormData({...formData, eslogan: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-grid pt-2">
            <Button 
              variant="primary" 
              type="submit" 
              className="btn-wave d-flex align-items-center justify-content-center gap-2 py-2"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 
              {loading ? "Guardando cambios..." : "Guardar Configuración"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}



