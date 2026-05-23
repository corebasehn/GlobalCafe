import { Form, InputGroup, Button } from 'react-bootstrap';
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

interface LoginFormProps {
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
}

export default function LoginForm({
  loading,
  onSubmit,
  username,
  setUsername,
  password,
  setPassword
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form onSubmit={onSubmit}>
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
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
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
  );
}
