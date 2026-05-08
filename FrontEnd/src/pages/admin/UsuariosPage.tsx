import { useState, useEffect } from "react";
import { Users, Plus, Search, Edit, Trash2, Loader2, RotateCcw } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { getUsersApi, createUserApi, updateUserApi, deleteUserApi, type User } from "../../api/users.api";
import { getRolesApi, type Role } from "../../api/roles.api";
import toast from "react-hot-toast";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isReactivateModalOpen, setIsReactivateModalOpen] = useState(false);
  const [userToReactivate, setUserToReactivate] = useState<User | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    nombre: "",
    email: "",
    rol: "",
    password: "",
    confirmPassword: ""
  });

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
      email: "", // El backend no devuelve email en findAll, lo dejamos vacío
      rol: user.rolCodigo || "",
      password: "", // Contraseña vacía al editar
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

    // Si es crear, la contraseña es obligatoria
    if (!editingId && !formData.password) {
      toast.error("La contraseña es obligatoria para nuevos usuarios");
      return;
    }
    
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, username, ...rest } = formData;
      
      // Mapeamos 'username' del formulario a 'usuario' que espera el backend
      const payload = { ...rest, usuario: username };
      
      if (editingId) {
        // Si la contraseña está vacía, la quitamos del payload para no sobrescribirla
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
      // Mostrar el mensaje del backend si existe (ej: "El usuario ya existe")
      toast.error(error.response?.data?.message || "Error al guardar el usuario");
    }
  };

  return (
    <div>
      <PageHeader title="Gestión de Usuarios" subtitle="Administración de usuarios del sistema" icon={Users} actions={[{ label: "Nuevo Usuario", onClick: () => { setEditingId(null); setIsModalOpen(true); }, icon: Plus }]} />
      <Card className="mb-6">
        <Card.Body className="p-4">
          <InputGroup>
            <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
            <Form.Control type="text" placeholder="Buscar usuario..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </InputGroup>
        </Card.Body>
      </Card>
      <Card>
        <Table responsive hover className="mb-0">
          <thead><tr><th>Usuario</th><th>Nombre</th><th>Rol</th><th className="text-center">Estado</th><th className="text-center">Acciones</th></tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8 text-neutral-500"><Loader2 className="w-6 h-6 animate-spin inline-block mr-2" /> Cargando usuarios...</td></tr>
            ) : usuarios.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8 text-neutral-500">No se encontraron usuarios</td></tr>
            ) : (
              usuarios.filter(u => u.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) || u.username.toLowerCase().includes(searchTerm.toLowerCase())).map((u) => (
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
                          <button onClick={() => handleEdit(u)} className="p-1.5 rounded-lg hover:bg-neutral-100"><Edit className="w-4 h-4 text-neutral-600" /></button>
                          <button onClick={() => handleDelete(u)} className="p-1.5 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-600" /></button>
                        </>
                      ) : (
                        <button onClick={() => handleReactivate(u)} className="p-1.5 rounded-lg hover:bg-green-50" title="Reactivar Usuario"><RotateCcw className="w-4 h-4 text-green-600" /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>
      <Modal show={isModalOpen} onHide={handleCloseModal} size="lg">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton><Modal.Title>{editingId ? "Editar Usuario" : "Nuevo Usuario"}</Modal.Title></Modal.Header>
          <Modal.Body className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Group><Form.Label>Usuario</Form.Label><Form.Control type="text" placeholder="nombre.apellido" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} required /></Form.Group>
            <Form.Group><Form.Label>Nombre Completo</Form.Label><Form.Control type="text" placeholder="Nombre y apellido" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required /></Form.Group>
            <Form.Group>
              <Form.Label>Rol</Form.Label>
              <Form.Select value={formData.rol} onChange={(e) => setFormData({...formData, rol: e.target.value})} required>
                <option value="">Seleccione un rol</option>
                {roles.map(r => (<option key={r.codigo} value={r.codigo}>{r.nombre}</option>))}
              </Form.Select>
            </Form.Group>
            <Form.Group><Form.Label>Contraseña</Form.Label><Form.Control type="password" placeholder={editingId ? "Dejar en blanco para mantener" : "••••••••"} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required={!editingId} /></Form.Group>
            <Form.Group><Form.Label>Confirmar Contraseña</Form.Label><Form.Control type="password" placeholder={editingId ? "Dejar en blanco para mantener" : "••••••••"} value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} required={!editingId} /></Form.Group>
          </div>
          </Modal.Body>
          <Modal.Footer><Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button><Button variant="primary" type="submit">{editingId ? "Guardar Cambios" : "Crear Usuario"}</Button></Modal.Footer>
        </Form>
      </Modal>

      <Modal show={isDeleteModalOpen} onHide={() => setIsDeleteModalOpen(false)} size="sm">
        <Modal.Header closeButton><Modal.Title>Confirmar Acción</Modal.Title></Modal.Header>
        <Modal.Body>
          <p className="text-neutral-600 mb-0">¿Está seguro que desea desactivar al usuario <span className="font-bold text-neutral-900">{userToDelete?.username}</span>?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmDelete}>Desactivar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isReactivateModalOpen} onHide={() => setIsReactivateModalOpen(false)} size="sm">
        <Modal.Header closeButton><Modal.Title>Confirmar Reactivación</Modal.Title></Modal.Header>
        <Modal.Body>
          <p className="text-neutral-600 mb-0">¿Está seguro que desea reactivar al usuario <span className="font-bold text-neutral-900">{userToReactivate?.username}</span>?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsReactivateModalOpen(false)}>Cancelar</Button>
          <Button variant="success" onClick={confirmReactivate}>Reactivar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
