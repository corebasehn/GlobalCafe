import { useState, useEffect } from "react";
import { Users, Plus, Search } from "lucide-react";
import PageHeader from "../../../../components/layout/PageHeader";
import { Card, Form, InputGroup } from 'react-bootstrap';
import toast from "react-hot-toast";

// APIs
import { getUsersApi, createUserApi, updateUserApi, deleteUserApi, type User } from "../../../../api/users.api";
import { getRolesApi, type Role } from "../../../../api/roles.api";

// Components
import UsuariosTable from "../Components/UsuariosTable";
import UsuarioModal from "../Components/UsuarioModal";
import ConfirmActionModal from "../Components/ConfirmActionModal";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    nombre: "",
    email: "",
    rol: "",
    password: "",
    confirmPassword: ""
  });

  // Delete/Reactivate states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isReactivateModalOpen, setIsReactivateModalOpen] = useState(false);
  const [userToReactivate, setUserToReactivate] = useState<User | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsersApi();
      setUsuarios(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      toast.error("No se pudieron cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  const loadRoles = async () => {
    try {
      const data = await getRolesApi();
      setRoles(data);
    } catch (error) {
      console.error("Error cargando roles:", error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setFormData({
      username: user.username,
      nombre: user.nombre,
      email: user.email || "",
      rol: user.rolCodigo || "",
      password: "",
      confirmPassword: ""
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      username: "",
      nombre: "",
      email: "",
      rol: "",
      password: "",
      confirmPassword: ""
    });
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await deleteUserApi(userToDelete.id);
      toast.success("Usuario desactivado exitosamente");
      loadUsers();
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error: any) {
      console.error("Error eliminando usuario:", error);
      toast.error(error.response?.data?.message || "Error al desactivar el usuario");
    }
  };

  const handleReactivate = (user: User) => {
    setUserToReactivate(user);
    setIsReactivateModalOpen(true);
  };

  const confirmReactivate = async () => {
    if (!userToReactivate) return;
    try {
      await updateUserApi(userToReactivate.id, { activo: true });
      toast.success("Usuario reactivado exitosamente");
      loadUsers();
      setIsReactivateModalOpen(false);
      setUserToReactivate(null);
    } catch (error) {
      console.error("Error reactivando usuario:", error);
      toast.error("Error al reactivar el usuario");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (!editingId && !formData.password) {
      toast.error("La contraseña es obligatoria para nuevos usuarios");
      return;
    }
    
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, username, ...rest } = formData;
      const payload = { ...rest, usuario: username };
      
      if (editingId) {
        if (!payload.password) delete (payload as any).password;
        // @ts-ignore
        await updateUserApi(editingId, payload as any);
        toast.success("Usuario actualizado exitosamente");
      } else {
        await createUserApi(payload as any);
        toast.success("Usuario creado exitosamente");
      }
      
      handleCloseModal();
      loadUsers();
    } catch (error: any) {
      console.error("Error guardando usuario:", error);
      toast.error(error.response?.data?.message || "Error al guardar el usuario");
    }
  };

  return (
    <div>
      <PageHeader 
        title="Gestión de Usuarios" 
        subtitle="Administración de usuarios del sistema" 
        icon={Users} 
        actions={[{ label: "Nuevo Usuario", onClick: () => { setEditingId(null); setIsModalOpen(true); }, icon: Plus }]} 
      />
      
      <Card className="mb-6">
        <Card.Body className="p-4">
          <InputGroup>
            <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
            <Form.Control 
              type="text" 
              placeholder="Buscar usuario..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </InputGroup>
        </Card.Body>
      </Card>

      <Card>
        <UsuariosTable 
          usuarios={usuarios}
          loading={loading}
          searchTerm={searchTerm}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReactivate={handleReactivate}
        />
      </Card>

      <UsuarioModal 
        show={isModalOpen}
        editingId={editingId}
        formData={formData}
        roles={roles}
        onClose={handleCloseModal}
        onChange={setFormData}
        onSubmit={handleSubmit}
      />

      <ConfirmActionModal 
        show={isDeleteModalOpen}
        title="Confirmar Acción"
        message={<p className="mb-0">¿Está seguro que desea desactivar al usuario <span className="font-bold text-neutral-900">{userToDelete?.username}</span>?</p>}
        variant="danger"
        actionLabel="Desactivar"
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />

      <ConfirmActionModal 
        show={isReactivateModalOpen}
        title="Confirmar Reactivación"
        message={<p className="mb-0">¿Está seguro que desea reactivar al usuario <span className="font-bold text-neutral-900">{userToReactivate?.username}</span>?</p>}
        variant="success"
        actionLabel="Reactivar"
        onClose={() => setIsReactivateModalOpen(false)}
        onConfirm={confirmReactivate}
      />
    </div>
  );
}
