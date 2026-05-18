import { Plus } from "lucide-react";
import { Card, Badge } from 'react-bootstrap';
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
    <Card>
      <Card.Header>
        <div className="flex items-center justify-between">
          <Card.Title as="h3" className="text-lg font-semibold text-neutral-900 mb-0">Permisos por Módulo</Card.Title>
          <button 
            type="button" 
            onClick={onAddPermission} 
            className="p-1 hover:bg-neutral-100 rounded-md transition-colors" 
            title="Nuevo Permiso"
          >
            <Plus className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
      </Card.Header>
      <Card.Body className="space-y-4">
        {permissions.map((m) => (
          <div key={m.modulo}>
            <h4 className="font-medium text-sm text-neutral-900 mb-2">{m.modulo}</h4>
            <div className="flex flex-wrap gap-1">
              {m.permisos.map((p) => (
                <span 
                  key={p.id} 
                  title={p.descripcion} 
                  onClick={() => onEditPermission(p, m.modulo)} 
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <Badge bg="secondary">{p.accion}</Badge>
                </span>
              ))}
            </div>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}
