import { FC, Fragment, useState } from 'react';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { Card, Col, Nav, Row, Tab, FormGroup, Form, Button } from "react-bootstrap";
import { useAuth } from '../../auth/useAuth';
import { cambiarClaveApi } from '../../api/auth.api';
import toast from 'react-hot-toast';
import { Loader2, ShieldCheck, Key } from 'lucide-react';

const Profile: FC = () => {
  const { profile } = useAuth();
  
  // State para cambio de clave
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    claveActual: '',
    claveNueva: '',
    confirmarClave: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCambiarClave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.claveNueva !== formData.confirmarClave) {
      toast.error("La nueva contraseña y la confirmación no coinciden");
      return;
    }

    if (formData.claveNueva.length < 6) {
      toast.error("La nueva contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);
      await cambiarClaveApi({
        claveActual: formData.claveActual,
        claveNueva: formData.claveNueva
      });
      toast.success("Contraseña actualizada correctamente");
      setFormData({ claveActual: '', claveNueva: '', confirmarClave: '' });
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error al cambiar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Pageheader title="MI PERFIL" heading="Usuario" active="Perfil" />
      
      <Row>
        <Col lg={12} md={12}>
          <Tab.Container id="profile-tabs" defaultActiveKey="AccountSettings">
            <Card className="custom-card customs-cards">
              <Card.Body className=" d-md-flex bg-white">
                <div className="main-img-user profile-user mb-4 mb-md-0 me-4">
                  <div className="avatar avatar-xxl rounded-circle bg-primary-transparent text-primary d-flex align-items-center justify-content-center fs-32 fw-bold">
                    {profile?.nombre?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </div>
                <div className="my-md-auto mt-4 prof-details">
                  <h4 className="fw-semibold mb-1 pb-0">
                    {profile?.nombre || "Usuario del Sistema"}
                  </h4>
                  <p className="text-muted mb-0">
                    <span className="fw-semibold me-2">Usuario:</span>
                    <span className="badge bg-light text-dark">@{profile?.usuario}</span>
                  </p>
                </div>
              </Card.Body>
              <Card.Footer>
                <Nav variant="pills" className="nav profile-tabs main-nav-line tabs-menu profile-nav-line bg-white mb-0 border-0 br-5">
                  <Nav.Item>
                    <Nav.Link eventKey="AccountSettings" className="mb-2 mt-2">
                      <ShieldCheck className="w-4 h-4 me-2 inline-block" />
                      Configuración de Seguridad
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Footer>
            </Card>

            <Tab.Content>
              <Tab.Pane eventKey="AccountSettings">
                <Row className="row-sm">
                  <Col xl={12}>
                    <Card className="custom-card">
                      <Card.Header>
                        <Card.Title>Cambiar Contraseña</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Form className="form-horizontal" onSubmit={handleCambiarClave}>
                          <div className="mb-4 main-content-label text-muted fs-12 text-uppercase">
                            Actualiza tus credenciales de acceso
                          </div>
                          
                          <FormGroup className="mb-3">
                            <Row className="align-items-center">
                              <Col md={3}>
                                <Form.Label className="form-label fw-semibold">Contraseña Actual</Form.Label>
                              </Col>
                              <Col md={6}>
                                <Form.Control
                                  type="password"
                                  name="claveActual"
                                  placeholder="Introduce tu clave actual"
                                  value={formData.claveActual}
                                  onChange={handleInputChange}
                                  required
                                />
                              </Col>
                            </Row>
                          </FormGroup>

                          <hr className="my-4 border-light" />

                          <FormGroup className="mb-3">
                            <Row className="align-items-center">
                              <Col md={3}>
                                <Form.Label className="form-label fw-semibold">Nueva Contraseña</Form.Label>
                              </Col>
                              <Col md={6}>
                                <Form.Control
                                  type="password"
                                  name="claveNueva"
                                  placeholder="Mínimo 6 caracteres"
                                  value={formData.claveNueva}
                                  onChange={handleInputChange}
                                  required
                                />
                              </Col>
                            </Row>
                          </FormGroup>

                          <FormGroup className="mb-4">
                            <Row className="align-items-center">
                              <Col md={3}>
                                <Form.Label className="form-label fw-semibold">Confirmar Nueva Contraseña</Form.Label>
                              </Col>
                              <Col md={6}>
                                <Form.Control
                                  type="password"
                                  name="confirmarClave"
                                  placeholder="Repite la nueva contraseña"
                                  value={formData.confirmarClave}
                                  onChange={handleInputChange}
                                  required
                                />
                              </Col>
                            </Row>
                          </FormGroup>

                          <Row>
                            <Col md={9} className="offset-md-3">
                              <Button 
                                variant="primary" 
                                type="submit" 
                                className="btn-wave d-flex align-items-center gap-2"
                                disabled={loading}
                              >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
                                Actualizar Contraseña
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Profile;
