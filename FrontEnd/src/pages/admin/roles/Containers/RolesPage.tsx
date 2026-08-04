import { useState, useEffect, Fragment } from "react";
import { Shield, Plus } from "lucide-react";
import Pageheader from "../../../../layout/layoutcomponent/pageheader";
import { Card, Row, Col, Button } from 'react-bootstrap';
import toast from "react-hot-toast";

// APIs
import { 
  getRolesApi, 
  getPermissionsApi, 
  getRoleByIdApi, 
  createRoleApi, 
  updateRoleApi, 
  createPermissionApi, 
  updatePermissionApi, 
  deletePermissionApi, 
  type Role, 
  type PermissionGroup, 
  type Permission 
} from "../../../../api/roles.api";

// Components
import RolesTable from "../Components/RolesTable";
import PermisosCard from "../Components/PermisosCard";
import RoleModal from "../Components/RoleModal";
import PermisoModal from "../Components/PermisoModal";

export default function RolesPage() {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<PermissionGroup[]>([]);
  
  // Role Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    permisos: [] as number[],
  });

  // Permission Modal states
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [editingPermissionId, setEditingPermissionId] = useState<number | null>(null);
  const [permissionFormData, setPermissionFormData] = useState({
    codigo: "",
    modulo: "",
    accion: "",
    descripcion: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [rolesData, permsData] = await Promise.all([
        getRolesApi(),
        getPermissionsApi()
      ]);
      setRoles(rolesData);
      setPermissions(permsData);
    } catch (error) {
      console.error("Error cargando datos:", error);
      toast.error("Error al cargar roles y permisos");
    } finally {
      setLoading(false);
    }
  };

  // Role Handlers
  const handleEditRole = async (role: Role) => {
    try {
      const fullRole = await getRoleByIdApi(role.id);
      setEditingId(fullRole.id);
      setFormData({
        codigo: fullRole.codigo,
        nombre: fullRole.nombre,
        descripcion: fullRole.descripcion || "",
        permisos: fullRole.permisosIds || [],
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error cargando detalle del rol:", error);
      toast.error("Error al cargar los detalles del rol");
    }
  };

  const handleCloseRoleModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ codigo: "", nombre: "", descripcion: "", permisos: [] });
  };

  const handleTogglePermission = (id: number) => {
    setFormData(prev => ({
      ...prev,
      permisos: prev.permisos.includes(id)
        ? prev.permisos.filter(p => p !== id)
        : [...prev.permisos, id]
    }));
  };

  const handleRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateRoleApi(editingId, formData);
        toast.success("Rol actualizado exitosamente");
      } else {
        await createRoleApi(formData);
        toast.success("Rol creado exitosamente");
      }
      handleCloseRoleModal();
      loadData();
    } catch (error: any) {
      console.error("Error guardando rol:", error);
      toast.error(error.response?.data?.message || "Error al guardar el rol");
    }
  };

  // Permission Handlers
  const handleEditPermission = (perm: Permission, modulo: string) => {
    setEditingPermissionId(perm.id);
    setPermissionFormData({
      codigo: perm.codigo,
      modulo: modulo,
      accion: perm.accion,
      descripcion: perm.descripcion || "",
    });
    setIsPermissionModalOpen(true);
  };

  const handleClosePermissionModal = () => {
    setIsPermissionModalOpen(false);
    setEditingPermissionId(null);
    setPermissionFormData({ codigo: "", modulo: "", accion: "", descripcion: "" });
  };

  const handleDeletePermission = async () => {
    if (!editingPermissionId) return;
    if (!window.confirm(`¿Está seguro de que desea eliminar este permiso? Esto podría afectar a los roles que lo tienen asignado.`)) return;
    try {
      await deletePermissionApi(editingPermissionId);
      toast.success("Permiso eliminado exitosamente");
      handleClosePermissionModal();
      loadData();
    } catch (error: any) {
      console.error("Error eliminando permiso:", error);
      toast.error(error.response?.data?.message || "Error al eliminar el permiso");
    }
  };

  const handlePermissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPermissionId) {
        await updatePermissionApi(editingPermissionId, permissionFormData);
        toast.success("Permiso actualizado exitosamente");
      } else {
        await createPermissionApi(permissionFormData);
        toast.success("Permiso creado exitosamente");
      }
      handleClosePermissionModal();
      loadData();
    } catch (error: any) {
      console.error("Error guardando permiso:", error);
      toast.error(error.response?.data?.message || "Error al guardar el permiso");
    }
  };

  return (
    <Fragment>
      <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
        <Pageheader title="Roles y Permisos" heading="Administración" active="Roles y Permisos" />
        <div className="ms-md-1 ms-0">
          <Button 
            variant="primary" 
            className="btn-wave"
            onClick={() => { setEditingId(null); setFormData({ codigo: "", nombre: "", descripcion: "", permisos: [] }); setIsModalOpen(true); }}
          >
            <Plus className="w-4 h-4 me-1 inline-block" /> Nuevo Rol
          </Button>
        </div>
      </div>

      <Row>
        <Col xl={8}>
          <Card className="custom-card">
            <Card.Header>
              <Card.Title>
                <span className="border-start border-3 border-success me-2"></span>
                Roles del Sistema
              </Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <RolesTable 
                roles={roles}
                loading={loading}
                onEdit={handleEditRole}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4}>
          <PermisosCard 
            permissions={permissions}
            onAddPermission={() => setIsPermissionModalOpen(true)}
            onEditPermission={handleEditPermission}
          />
        </Col>
      </Row>

      <RoleModal 
        show={isModalOpen}
        editingId={editingId}
        formData={formData}
        permissions={permissions}
        onClose={handleCloseRoleModal}
        onChange={setFormData}
        onTogglePermission={handleTogglePermission}
        onSubmit={handleRoleSubmit}
      />

      <PermisoModal 
        show={isPermissionModalOpen}
        editingId={editingPermissionId}
        formData={permissionFormData}
        onClose={handleClosePermissionModal}
        onChange={setPermissionFormData}
        onDelete={handleDeletePermission}
        onSubmit={handlePermissionSubmit}
      />
    </Fragment>
  );
}

