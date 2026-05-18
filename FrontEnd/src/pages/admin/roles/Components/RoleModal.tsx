import { Modal, Form, Button } from 'react-bootstrap';
import type { PermissionGroup } from "../../../../api/roles.api";

interface RoleModalProps {
  show: boolean;
  editingId: number | null;
  formData: any;
  permissions: PermissionGroup[];
  onClose: () => void;
  onChange: (data: any) => void;
  onTogglePermission: (id: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function RoleModal({
  show,
  editingId,
  formData,
  permissions,
  onClose,
  onChange,
  onTogglePermission,
  onSubmit
}: RoleModalProps) {
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Editar Rol" : "Nuevo Rol"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Form.Group>
              <Form.Label>Código del Rol</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ej: ROL_SUPERVISOR" 
                value={formData.codigo} 
                onChange={(e) => onChange({...formData, codigo: e.target.value.toUpperCase()})} 
                required 
                disabled={!!editingId} 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre del Rol</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ej: Supervisor de Calidad" 
                value={formData.nombre} 
                onChange={(e) => onChange({...formData, nombre: e.target.value})} 
                required 
              />
            </Form.Group>
          </div>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Descripción del rol..." 
              value={formData.descripcion} 
              onChange={(e) => onChange({...formData, descripcion: e.target.value})} 
            />
          </Form.Group>
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">Permisos</label>
            <div className="border rounded-xl p-4 max-h-60 overflow-y-auto space-y-3">
              {permissions.map((m) => (
                <div key={m.modulo}>
                  <h5 className="font-medium text-sm mb-1">{m.modulo}</h5>
                  <div className="flex flex-wrap gap-2">
                    {m.permisos.map((p) => (
                      <Form.Check 
                        key={p.id} 
                        type="checkbox" 
                        label={p.accion} 
                        title={p.descripcion} 
                        checked={formData.permisos.includes(p.id)} 
                        onChange={() => onTogglePermission(p.id)} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" type="submit">
            {editingId ? "Guardar Cambios" : "Crear Rol"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
