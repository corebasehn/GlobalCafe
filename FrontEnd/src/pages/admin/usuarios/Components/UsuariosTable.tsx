import { Edit, Trash2, RotateCcw, Loader2, MoreVertical } from "lucide-react";
import { Table, Badge, Dropdown } from 'react-bootstrap';
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
    <div className="table-responsive">
      <Table hover className="table text-nowrap table-bordered mb-0">
        <thead>
          <tr>
            <th scope="col" className="text-center">Acciones</th>
            <th scope="col">Usuario</th>
            <th scope="col">Nombre</th>
            <th scope="col">Rol</th>
            <th scope="col" className="text-center">Estado</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-5 text-muted">
                <Loader2 className="w-6 h-6 animate-spin d-inline-block me-2" /> Cargando usuarios...
              </td>
            </tr>
          ) : filteredUsers.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-5 text-muted">
                No se encontraron usuarios
              </td>
            </tr>
          ) : (
            filteredUsers.map((u) => (
              <tr key={u.id}>
                <td className="text-center">
                  <Dropdown className="dropdown-center">
                    <Dropdown.Toggle 
                      variant="" 
                      className="btn btn-icon btn-sm btn-light btn-wave no-caret"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu 
                      className="dropdown-menu-end shadow-sm border-0"
                      popperConfig={{ strategy: 'fixed' }}
                    >
                      {u.estado ? (
                        <>
                          <Dropdown.Item 
                            onClick={() => onEdit(u)}
                            className="d-flex align-items-center gap-2 py-2"
                          >
                            <Edit className="w-4 h-4 text-info" /> 
                            <span>Editar Usuario</span>
                          </Dropdown.Item>
                          <Dropdown.Item 
                            onClick={() => onDelete(u)}
                            className="d-flex align-items-center gap-2 py-2 text-danger"
                          >
                            <Trash2 className="w-4 h-4" /> 
                            <span>Desactivar</span>
                          </Dropdown.Item>
                        </>
                      ) : (
                        <Dropdown.Item 
                          onClick={() => onReactivate(u)}
                          className="d-flex align-items-center gap-2 py-2 text-success"
                        >
                          <RotateCcw className="w-4 h-4" /> 
                          <span>Reactivar</span>
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td className="fw-semibold">{u.username}</td>
                <td className="text-muted">{u.nombre || "-"}</td>
                <td><Badge bg="info-transparent" className="rounded-pill">{u.rol}</Badge></td>
                <td className="text-center">
                  <Badge bg={u.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">
                    {u.estado ? "Activo" : "Inactivo"}
                  </Badge>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}


