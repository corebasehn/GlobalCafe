import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Coffee, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../../auth/useAuth";
import toast from "react-hot-toast";
import { Card, Form, InputGroup, Button } from 'react-bootstrap';

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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'rgb(192, 114, 46)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="relative  max-w-sm">
        {/* Logo & Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl mb-3 backdrop-blur-sm">
            <Coffee className="w-7 h-7 text-amber-200" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Global Café</h1>
          <p className="text-amber-100">Sistema Integral de Gestión</p>
        </div>

        {/* Login Card */}
        <Card className="rounded-3xl shadow-2xl p-6 border-0" style={{ backgroundColor: 'rgb(192, 114, 46)' }}>
          <h2 className="text-lg font-semibold text-white mb-5 text-center">
            Iniciar Sesión
          </h2>

          <Form onSubmit={handleSubmit} className="space-y-4">
            <Form.Group className="mb-3">
              <Form.Label className="block text-xs font-medium text-white/80 mb-1.5">
                Usuario
              </Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11 px-4 bg-white border border-transparent rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all"
                placeholder="Ingrese su usuario"
                autoComplete="username"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="block text-xs font-medium text-white/80 mb-1.5">
                Contraseña
              </Form.Label>
              <InputGroup className="input-group">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 px-4 bg-white border border-transparent rounded-l-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all border-r-0"
                  style={{ height: '44px' }}
                  placeholder="Ingrese su contraseña"
                  autoComplete="current-password"
                />
                <InputGroup.Text
                  onClick={() => setShowPassword(!showPassword)}
                  className="h-11 px-4 bg-white border border-transparent rounded-r-xl text-gray-500 cursor-pointer"
                  style={{ height: '44px', borderLeft: 'none' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed border-0 shadow-lg mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Ingresando...
                </>
              ) : (
                "Ingresar"
              )}
            </Button>
          </Form>

          <p className="text-center text-xs text-white mt-5">
            ¿Olvidó su contraseña?{" "}
            <a href="#" className="text-white hover:underline font-medium">
              Contacte al administrador
            </a>
          </p>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-coffee-400 mt-6">
          © 2026 CoreBase. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
