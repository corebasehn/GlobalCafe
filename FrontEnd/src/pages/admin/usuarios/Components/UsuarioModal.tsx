import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import type { Role } from "../../../../api/roles.api";

interface UsuarioModalProps {
  show: boolean;
  editingId: number | null;
  formData: any;
  roles: Role[];
  onClose: () => void;
  onChange: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function UsuarioModal({
  show,
  editingId,
  formData,
  roles,
  onClose,
  onChange,
  onSubmit
}: UsuarioModalProps) {
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Editar Usuario" : "Nuevo Usuario"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 py-4">
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label className="fw-semibold">Usuario</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="nombre.apellido" 
                  value={formData.username} 
                  onChange={(e) => onChange({...formData, username: e.target.value})} 
                  required 
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label className="fw-semibold">Nombre Completo</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Nombre y apellido" 
                  value={formData.nombre} 
                  onChange={(e) => onChange({...formData, nombre: e.target.value})} 
                  required 
                />
              </Form.Group>
            </Col>
            <Col md={12} className="mb-3">
              <Form.Group>
                <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="ejemplo@globalcafe.hn" 
                  value={formData.email} 
                  onChange={(e) => onChange({...formData, email: e.target.value})} 
                />
                <Form.Text className="text-muted">Opcional. Si se deja vacío, el sistema generará uno automático.</Form.Text>
              </Form.Group>
            </Col>
            <Col md={12} className="mb-4">
              <Form.Group>
                <Form.Label className="fw-semibold">Rol del Usuario</Form.Label>
                <Form.Select 
                  value={formData.rol} 
                  onChange={(e) => onChange({...formData, rol: e.target.value})} 
                  required
                >
                  <option value="">Seleccione un rol de la lista...</option>
                  {roles.map(r => (<option key={r.codigo} value={r.codigo}>{r.nombre}</option>))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label className="fw-semibold">Contraseña</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder={editingId ? "Dejar en blanco para mantener" : "••••••••"} 
                  value={formData.password} 
                  onChange={(e) => onChange({...formData, password: e.target.value})} 
                  required={!editingId} 
                />
                {editingId && <Form.Text className="text-muted">Solo llene si desea cambiar la clave actual.</Form.Text>}
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label className="fw-semibold">Confirmar Contraseña</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder={editingId ? "Dejar en blanco para mantener" : "••••••••"} 
                  value={formData.confirmPassword} 
                  onChange={(e) => onChange({...formData, confirmPassword: e.target.value})} 
                  required={!editingId} 
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" type="submit" className="px-4">
            {editingId ? "Guardar Cambios" : "Crear Usuario"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
