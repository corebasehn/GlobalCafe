import { Plus } from "lucide-react";
import { Card, Badge, Button } from 'react-bootstrap';
import type { PermissionGroup, Permission } from "../../../../api/roles.api";

interface PermisosCardProps {
  permissions: PermissionGroup[];
  onAddPermission: () => void;
  onEditPermission: (perm: Permission, modulo: string) => void;
}

export default function PermisosCard({
  permissions,
  onAddPermission,
  onEditPermission
}: PermisosCardProps) {
  return (
    <Card className="custom-card">
      <Card.Header className="justify-content-between">
        <Card.Title className="fw-semibold">
          <span className="border-start border-3 border-success me-2"></span>
          Permisos por Módulo
        </Card.Title>
        <Button 
          variant="" 
          onClick={onAddPermission} 
          className="btn btn-icon btn-sm btn-primary-light btn-wave"
          title="Nuevo Permiso"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </Card.Header>
      <Card.Body>
        {permissions.map((m) => (
          <div key={m.modulo} className="mb-4">
            <h5 className="fw-semibold fs-14 mb-2">{m.modulo}</h5>
            <div className="d-flex flex-wrap gap-1">
              {m.permisos.map((p) => (
                <span 
                  key={p.id} 
                  title={p.descripcion} 
                  onClick={() => onEditPermission(p, m.modulo)} 
                  className="cursor-pointer"
                >
                  <Badge bg="danger-transparent" className="rounded-1 fw-medium">
                    {p.accion}
                  </Badge>
                </span>
              ))}
            </div>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}

