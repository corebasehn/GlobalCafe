import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

interface PermisoModalProps {
  show: boolean;
  editingId: number | null;
  formData: any;
  onClose: () => void;
  onChange: (data: any) => void;
  onDelete: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function PermisoModal({
  show,
  editingId,
  formData,
  onClose,
  onChange,
  onDelete,
  onSubmit
}: PermisoModalProps) {
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="fs-18">{editingId ? "Editar Permiso" : "Nuevo Permiso"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Módulo</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Ej: Recepción" 
                  value={formData.modulo} 
                  onChange={(e) => onChange({...formData, modulo: e.target.value})} 
                  required 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Código</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Ej: VER_REMISIONES" 
                  value={formData.codigo} 
                  onChange={(e) => onChange({...formData, codigo: e.target.value.toUpperCase().replace(/\s+/g, '_')})} 
                  required 
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Acción</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Ej: Ver remisiones" 
              value={formData.accion} 
              onChange={(e) => onChange({...formData, accion: e.target.value})} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Descripción</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Descripción breve..." 
              value={formData.descripcion} 
              onChange={(e) => onChange({...formData, descripcion: e.target.value})} 
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <div>
            {editingId && (
              <Button 
                variant="danger-light" 
                className="btn-wave"
                onClick={onDelete}
              >
                Eliminar
              </Button>
            )}
          </div>
          <div className="d-flex gap-2">
            <Button variant="secondary" className="btn-wave" type="button" onClick={onClose}>Cancelar</Button>
            <Button variant="primary" className="btn-wave" type="submit">
              {editingId ? "Guardar" : "Crear"}
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

