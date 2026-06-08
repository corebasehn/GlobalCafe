import { useState, useMemo } from 'react';
import { Modal, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { Search } from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPermissions = useMemo(() => {
    if (!searchTerm.trim()) return permissions;

    const term = searchTerm.toLowerCase();
    return permissions.map(group => {
      const moduleMatches = group.modulo.toLowerCase().includes(term);
      const filteredPerms = group.permisos.filter(p => 
        p.accion.toLowerCase().includes(term) || 
        (p.descripcion && p.descripcion.toLowerCase().includes(term))
      );

      if (moduleMatches || filteredPerms.length > 0) {
        return {
          ...group,
          // Si el módulo coincide, mostramos todos sus permisos, de lo contrario solo los filtrados
          permisos: moduleMatches ? group.permisos : filteredPerms
        };
      }
      return null;
    }).filter(Boolean) as PermissionGroup[];
  }, [permissions, searchTerm]);

  const handleClose = () => {
    setSearchTerm("");
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="fs-18">{editingId ? "Editar Rol" : "Nuevo Rol"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Código del Rol</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Ej: ROL_SUPERVISOR" 
                  value={formData.codigo} 
                  onChange={(e) => onChange({...formData, codigo: e.target.value.toUpperCase()})} 
                  required 
                  disabled={!!editingId} 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Nombre del Rol</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Ej: Supervisor de Calidad" 
                  value={formData.nombre} 
                  onChange={(e) => onChange({...formData, nombre: e.target.value})} 
                  required 
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Descripción</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Descripción del rol..." 
              value={formData.descripcion} 
              onChange={(e) => onChange({...formData, descripcion: e.target.value})} 
            />
          </Form.Group>
          <div className="mb-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <label className="fw-semibold mb-0">Permisos</label>
              <div style={{ width: '250px' }}>
                <InputGroup size="sm">
                  <InputGroup.Text className="bg-light border-end-0">
                    <Search className="w-4 h-4 text-muted" />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Buscar permiso o módulo..."
                    className="bg-light border-start-0 ps-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </div>
            </div>
            
            <div className="border rounded p-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {filteredPermissions.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  No se encontraron permisos que coincidan con "{searchTerm}"
                </div>
              ) : (
                filteredPermissions.map((m) => (
                  <div key={m.modulo} className="mb-3">
                    <h6 className="fw-bold fs-13 mb-2 text-primary">{m.modulo}</h6>
                    <div className="d-flex flex-wrap gap-3">
                      {m.permisos.map((p) => (
                        <Form.Check 
                          key={p.id} 
                          type="checkbox" 
                          label={p.accion} 
                          title={p.descripcion} 
                          id={`perm-${p.id}`}
                          checked={formData.permisos.includes(p.id)} 
                          onChange={() => onTogglePermission(p.id)} 
                          className="me-2"
                        />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn-wave" type="button" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" className="btn-wave" type="submit">
            {editingId ? "Guardar Cambios" : "Crear Rol"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}


