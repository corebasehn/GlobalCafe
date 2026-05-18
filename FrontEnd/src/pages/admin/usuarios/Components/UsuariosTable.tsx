import { Edit, Trash2, RotateCcw, Loader2 } from "lucide-react";
import { Table, Badge } from 'react-bootstrap';
import type { User } from "../../../../api/users.api";

interface UsuariosTableProps {
  usuarios: User[];
  loading: boolean;
  searchTerm: string;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onReactivate: (user: User) => void;
}

export default function UsuariosTable({
  usuarios,
  loading,
  searchTerm,
  onEdit,
  onDelete,
  onReactivate
}: UsuariosTableProps) {
  const filteredUsers = usuarios.filter(u => 
    u.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Table responsive hover className="mb-0">
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Nombre</th>
          <th>Rol</th>
          <th className="text-center">Estado</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={5} className="text-center py-8 text-neutral-500">
              <Loader2 className="w-6 h-6 animate-spin inline-block mr-2" /> Cargando usuarios...
            </td>
          </tr>
        ) : filteredUsers.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center py-8 text-neutral-500">
              No se encontraron usuarios
            </td>
          </tr>
        ) : (
          filteredUsers.map((u) => (
            <tr key={u.id}>
              <td className="font-medium">{u.username}</td>
              <td>{u.nombre || "-"}</td>
              <td><Badge bg="info">{u.rol}</Badge></td>
              <td className="text-center">
                <Badge bg={u.estado ? "success" : "secondary"}>
                  {u.estado ? "Activo" : "Inactivo"}
                </Badge>
              </td>
              <td className="text-center">
                <div className="flex items-center justify-center gap-1">
                  {u.estado ? (
                    <>
                      <button 
                        onClick={() => onEdit(u)} 
                        className="p-1.5 rounded-lg hover:bg-neutral-100"
                        title="Editar Usuario"
                      >
                        <Edit className="w-4 h-4 text-neutral-600" />
                      </button>
                      <button 
                        onClick={() => onDelete(u)} 
                        className="p-1.5 rounded-lg hover:bg-red-50"
                        title="Desactivar Usuario"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => onReactivate(u)} 
                      className="p-1.5 rounded-lg hover:bg-green-50" 
                      title="Reactivar Usuario"
                    >
                      <RotateCcw className="w-4 h-4 text-green-600" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
