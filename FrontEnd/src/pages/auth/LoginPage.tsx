import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Coffee, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../../auth/useAuth";
import toast from "react-hot-toast";
import { Container, Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error("Por favor ingrese usuario y contraseña");
      return;
    }

    setLoading(true);
    try {
      await login({ usuario: username, password });
      toast.success("¡Bienvenido!");
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="d-flex align-items-center justify-content-center position-relative overflow-hidden" 
      style={{ 
        minHeight: '100vh', 
        // backgroundColor: 'linear-gradient(135deg, #815d3f 0%, #6c3817 100%)',
        background: 'linear-gradient(135deg, #815d3f 0%, #6c3817 60%)',
      }}
    >
      {/* Background Pattern */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100" 
        style={{ 
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none'
        }}
      />

      <Container className="position-relative" style={{ zIndex: 1 }}>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={5} xl={4}>
            

            {/* Login Card */}
            <Card 
              className="border-0 shadow-lg" 
              style={{ 
                borderRadius: '24px',
                overflow: 'hidden'
              }}
            >
              <Card.Body className="p-4 p-sm-5">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h2 className="h4 fw-semibold mb-0" style={{ color: 'rgb(161, 95, 38)' }}>
                    Iniciar Sesión
                  </h2>
                  <img 
                    src="/src/assets/images/brand-logos/Logo-Global-Coffee-Group.jpeg" 
                    alt="Global Café Logo" 
                    style={{ height: '70px', width: 'auto' }}
                  />
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium small">
                      Usuario
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Ingrese su usuario"
                      autoComplete="username"
                      className="border-2"
                      style={{ 
                        borderRadius: '12px',
                        borderColor: '#dee2e6'
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-medium small">
                      Contraseña
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingrese su contraseña"
                        autoComplete="current-password"
                        className="border-2"
                        style={{ 
                          borderRadius: '12px 0 0 12px',
                          borderColor: '#dee2e6',
                          borderRight: 'none'
                        }}
                      />
                      <InputGroup.Text
                        onClick={() => setShowPassword(!showPassword)}
                        className="border-2 border-start-0 bg-white"
                        style={{ 
                          borderRadius: '0 12px 12px 0',
                          borderColor: '#dee2e6',
                          cursor: 'pointer'
                        }}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="fw-medium border-0 shadow-sm"
                      style={{ 
                        backgroundColor: '#6c3817',
                        borderRadius: '12px',
                        padding: '12px'
                      }}
                    >
                      {loading ? (
                        <span className="d-flex align-items-center justify-content-center gap-2">
                          <Loader2 size={20} className="spinner-border spinner-border-sm" />
                          Ingresando...
                        </span>
                      ) : (
                        "Ingresar"
                      )}
                    </Button>
                  </div>
                </Form>

                <div className="text-center mt-4">
                  <p className="small text-muted mb-0">
                    ¿Olvidó su contraseña?{" "}
                    <a 
                      href="#" 
                      className="text-decoration-none fw-medium"
                      style={{ color: 'rgb(192, 114, 46)' }}
                    >
                      Contacte al administrador
                    </a>
                  </p>
                </div>
              </Card.Body>
            </Card>

            {/* Footer */}
            <p className="text-center text-white-50 small mt-4 mb-0">
              © 2026 CoreBase. Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
      
      {/* Custom animation for spinner */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spinner-border-sm {
          animation: spin 1s linear infinite;
          display: inline-block;
        }
        input::-ms-reveal,
        input::-ms-clear {
          display: none;
        }
      `}</style>
    </div>
  );
}
