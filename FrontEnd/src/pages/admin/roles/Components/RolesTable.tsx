import { Edit, Loader2 } from "lucide-react";
import { Table, Badge, Button } from 'react-bootstrap';
import type { Role } from "../../../../api/roles.api";

interface RolesTableProps {
  roles: Role[];
  loading: boolean;
  onEdit: (role: Role) => void;
}

export default function RolesTable({ roles, loading, onEdit }: RolesTableProps) {
  return (
    <div className="table-responsive">
      <Table hover className="table text-nowrap table-bordered mb-0">
        <thead>
          <tr>
            <th scope="col">Rol</th>
            <th scope="col">Descripción</th>
            <th scope="col" className="text-center">Usuarios</th>
            <th scope="col" className="text-center">Permisos</th>
            <th scope="col" className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-5 text-muted">
                <Loader2 className="w-6 h-6 animate-spin d-inline-block me-2" /> Cargando roles...
              </td>
            </tr>
          ) : roles.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-5 text-muted">
                No se encontraron roles
              </td>
            </tr>
          ) : (
            roles.map((r) => (
              <tr key={r.id}>
                <td className="fw-semibold">{r.nombre}</td>
                <td className="text-muted">{r.descripcion}</td>
                <td className="text-center"><Badge bg="info-transparent" className="rounded-pill">{r.usuarios}</Badge></td>
                <td className="text-center"><Badge bg="secondary-transparent" className="rounded-pill">{r.permisos}</Badge></td>
                <td className="text-center">
                  <Button 
                    variant=""
                    size="sm"
                    onClick={() => onEdit(r)} 
                    className="btn btn-icon btn-sm btn-info-light btn-wave"
                    disabled={r.es_rol_sistema}
                    title="Editar Rol"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

