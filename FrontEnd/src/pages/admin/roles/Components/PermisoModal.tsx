import { Modal, Form, Button } from 'react-bootstrap';

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
    <Modal show={show} onHide={onClose} size="lg">
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Editar Permiso" : "Nuevo Permiso"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Form.Group>
              <Form.Label>Módulo</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ej: Recepción" 
                value={formData.modulo} 
                onChange={(e) => onChange({...formData, modulo: e.target.value})} 
                required 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Código</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ej: VER_REMISIONES" 
                value={formData.codigo} 
                onChange={(e) => onChange({...formData, codigo: e.target.value.toUpperCase().replace(/\s+/g, '_')})} 
                required 
              />
            </Form.Group>
          </div>
          <Form.Group>
            <Form.Label>Acción</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Ej: Ver remisiones" 
              value={formData.accion} 
              onChange={(e) => onChange({...formData, accion: e.target.value})} 
              required 
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Descripción breve..." 
              value={formData.descripcion} 
              onChange={(e) => onChange({...formData, descripcion: e.target.value})} 
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center justify-between w-full">
            <div>
              {editingId && (
                <button 
                  type="button" 
                  onClick={onDelete} 
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                >
                  Eliminar
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" type="button" onClick={onClose}>Cancelar</Button>
              <Button variant="primary" type="submit">
                {editingId ? "Guardar" : "Crear"}
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
