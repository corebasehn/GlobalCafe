import { Edit, Loader2 } from "lucide-react";
import { Table, Badge } from 'react-bootstrap';
import type { Role } from "../../../../api/roles.api";

interface RolesTableProps {
  roles: Role[];
  loading: boolean;
  onEdit: (role: Role) => void;
}

export default function RolesTable({ roles, loading, onEdit }: RolesTableProps) {
  return (
    <Table responsive hover className="mb-0">
      <thead>
        <tr>
          <th>Rol</th>
          <th>Descripción</th>
          <th className="text-center">Usuarios</th>
          <th className="text-center">Permisos</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={5} className="text-center py-8 text-neutral-500">
              <Loader2 className="w-6 h-6 animate-spin inline-block mr-2" /> Cargando roles...
            </td>
          </tr>
        ) : roles.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center py-8 text-neutral-500">
              No se encontraron roles
            </td>
          </tr>
        ) : (
          roles.map((r) => (
            <tr key={r.id}>
              <td className="font-medium">{r.nombre}</td>
              <td className="text-neutral-600">{r.descripcion}</td>
              <td className="text-center"><Badge bg="info">{r.usuarios}</Badge></td>
              <td className="text-center"><Badge bg="secondary">{r.permisos}</Badge></td>
              <td className="text-center">
                <button 
                  onClick={() => onEdit(r)} 
                  className="p-1.5 rounded-lg hover:bg-neutral-100" 
                  disabled={r.es_rol_sistema}
                  title="Editar Rol"
                >
                  <Edit className="w-4 h-4 text-neutral-600" />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
