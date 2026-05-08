import { useState, useEffect } from "react";
import { Database, Plus, Edit, Loader2, Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import toast from "react-hot-toast";

// Importamos las funciones y tipos que creaste en el Paso 1 y 2
import {
  getCosechasApi, getProveedoresApi, getConductoresApi, 
  getPlacasCabezalApi, getPlacasFurgonApi, getMunicipiosApi, getTransportesApi, getDepartamentosApi,
  createProveedorApi, updateProveedorApi,
  createConductorApi, updateConductorApi,
  createPlacaCabezalApi, updatePlacaCabezalApi,
  createPlacaFurgonApi, updatePlacaFurgonApi,
  createCosechaApi, updateCosechaApi,
  createMunicipioApi, updateMunicipioApi,
  createTransporteApi, updateTransporteApi,
  createDepartamentoApi, updateDepartamentoApi,
  getCatadoresApi, createCatadorApi, updateCatadorApi,
  getCalidadesApi, createCalidadApi, updateCalidadApi,
  getDefectosApi, createDefectoApi, updateDefectoApi,
  getZarandasApi, createZarandaApi, updateZarandaApi,
  getTazasApi, createTazaApi, updateTazaApi,
  getBodegasApi, createBodegaApi, updateBodegaApi,
  getEstibasApi, createEstibaApi, updateEstibaApi,
  Cosecha, Proveedor, Conductor, PlacaCabezal, PlacaFurgon, Municipio, Transporte, Departamento,
  Catador, Calidad, Defecto, Zaranda, Taza, Bodega, Estiba
} from "../../api/catalogs.api";

type TabType = "proveedores" | "transportes" | "conductores" | "placas-cabezal" | "placas-furgon" | "cosechas" | "departamentos" | "municipios" | "catadores" | "calidades" | "defectos" | "zarandas" | "tazas" | "bodegas" | "estibas";

export default function MantenimientoCatalogos() {
  const [activeTab, setActiveTab] = useState<TabType>("proveedores");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados para almacenar los datos
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [conductores, setConductores] = useState<Conductor[]>([]);
  const [placasCabezal, setPlacasCabezal] = useState<PlacaCabezal[]>([]);
  const [placasFurgon, setPlacasFurgon] = useState<PlacaFurgon[]>([]);
  const [cosechas, setCosechas] = useState<Cosecha[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [transportes, setTransportes] = useState<Transporte[]>([]);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [catadores, setCatadores] = useState<Catador[]>([]);
  const [calidades, setCalidades] = useState<Calidad[]>([]);
  const [defectos, setDefectos] = useState<Defecto[]>([]);
  const [zarandas, setZarandas] = useState<Zaranda[]>([]);
  const [tazas, setTazas] = useState<Taza[]>([]);
  const [bodegas, setBodegas] = useState<Bodega[]>([]);
  const [estibas, setEstibas] = useState<Estiba[]>([]);

  // Estados para el Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Cargamos todos los catálogos en paralelo para mayor velocidad
      const [provs, conds, pCabezal, pFurgon, cos, muns, trans, deptos, cat, cal, def, zar, taz, bods, ests] = await Promise.all([
        getProveedoresApi(),
        getConductoresApi(),
        getPlacasCabezalApi(),
        getPlacasFurgonApi(),
        getCosechasApi(),
        getMunicipiosApi(),
        getTransportesApi(),
        getDepartamentosApi(),
        getCatadoresApi(),
        getCalidadesApi(),
        getDefectosApi(),
        getZarandasApi(),
        getTazasApi(),
        getBodegasApi(),
        getEstibasApi()
      ]);

      setProveedores(provs);
      setConductores(conds);
      setPlacasCabezal(pCabezal);
      setPlacasFurgon(pFurgon);
      setCosechas(cos);
      setMunicipios(muns);
      setTransportes(trans);
      setDepartamentos(deptos);
      setCatadores(cat);
      setCalidades(cal);
      setDefectos(def);
      setZarandas(zar);
      setTazas(taz);
      setBodegas(bods);
      setEstibas(ests);
    } catch (error) {
      console.error("Error cargando catálogos:", error);
      toast.error("Error al cargar los catálogos del servidor");
    } finally {
      setLoading(false);
    }
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: "proveedores", label: "Proveedores" },
    { id: "transportes", label: "Transportistas" },
    { id: "conductores", label: "Conductores" },
    { id: "placas-cabezal", label: "Placas Cabezales" },
    { id: "placas-furgon", label: "Placas Furgones" },
    { id: "cosechas", label: "Cosechas" },
    { id: "departamentos", label: "Departamentos" },
    { id: "municipios", label: "Municipios" },
    { id: "catadores", label: "Catadores" },
    { id: "calidades", label: "Calidades" },
    { id: "defectos", label: "Defectos" },
    { id: "zarandas", label: "Mallas / Zarandas" },
    { id: "tazas", label: "Atributos de Taza" },
    { id: "bodegas", label: "Bodegas" },
    { id: "estibas", label: "Estibas" },
  ];

  // Todas las pestañas permiten crear y editar ahora
  const canEditTab = true;

  const handleCreate = () => {
    setEditingId(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (item: any, idField: string) => {
    setEditingId(item[idField]);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activeTab === "proveedores") {
        const payload = { nombre: formData.nombre, rtn: formData.rtn, id_municipio: Number(formData.id_municipio), direccion: formData.direccion, telefono: formData.telefono };
        if (editingId) await updateProveedorApi(editingId, { ...payload, estado: formData.estado });
        else await createProveedorApi(payload);
      } 
      else if (activeTab === "transportes") {
        const payload = { nombre: formData.nombre, rtn: formData.rtn, id_municipio: Number(formData.id_municipio), direccion: formData.direccion, contacto: formData.contacto, telefono: formData.telefono };
        if (editingId) await updateTransporteApi(editingId, { ...payload, estado: formData.estado });
        else await createTransporteApi(payload);
      }
      else if (activeTab === "conductores") {
        const payload = { nombre: formData.nombre, dni: formData.dni, licencia: formData.licencia, id_municipio: Number(formData.id_municipio), id_transporte: Number(formData.id_transporte), telefono: formData.telefono };
        if (editingId) await updateConductorApi(editingId, { ...payload, estado: formData.estado });
        else await createConductorApi(payload);
      } 
      else if (activeTab === "placas-cabezal") {
        if (editingId) await updatePlacaCabezalApi(editingId, { placa: formData.placa, estado: formData.estado });
        else await createPlacaCabezalApi({ placa: formData.placa });
      } 
      else if (activeTab === "placas-furgon") {
        if (editingId) await updatePlacaFurgonApi(editingId, { placa: formData.placa, estado: formData.estado });
        else await createPlacaFurgonApi({ placa: formData.placa });
      }
      else if (activeTab === "cosechas") {
        const payload = { cosecha: formData.cosecha, cosecha_actual: formData.cosecha_actual || false };
        if (editingId) await updateCosechaApi(editingId, { ...payload, estado: formData.estado });
        else await createCosechaApi(payload);
      }
      else if (activeTab === "municipios") {
        const payload = { nombre: formData.nombre, id_departamento: Number(formData.id_departamento) };
        if (editingId) await updateMunicipioApi(editingId, { ...payload, estado: formData.estado });
        else await createMunicipioApi(payload);
      }
      else if (activeTab === "departamentos") {
        const payload = { nombre: formData.nombre };
        if (editingId) await updateDepartamentoApi(editingId, { ...payload, estado: formData.estado });
        else await createDepartamentoApi(payload);
      }
      else if (activeTab === "catadores") {
        if (editingId) await updateCatadorApi(editingId, { nombre: formData.nombre, estado: formData.estado });
        else await createCatadorApi({ nombre: formData.nombre });
      }
      else if (activeTab === "calidades") {
        if (editingId) await updateCalidadApi(editingId, { nombre: formData.nombre, estado: formData.estado });
        else await createCalidadApi({ nombre: formData.nombre });
      }
      else if (activeTab === "defectos") {
        if (editingId) await updateDefectoApi(editingId, { nombre: formData.nombre, estado: formData.estado });
        else await createDefectoApi({ nombre: formData.nombre });
      }
      else if (activeTab === "zarandas") {
        if (editingId) await updateZarandaApi(editingId, { nombre: formData.nombre, estado: formData.estado });
        else await createZarandaApi({ nombre: formData.nombre });
      }
      else if (activeTab === "tazas") {
        if (editingId) await updateTazaApi(editingId, { nombre: formData.nombre, estado: formData.estado });
        else await createTazaApi({ nombre: formData.nombre });
      }
      else if (activeTab === "bodegas") {
        const payload = { nombre: formData.nombre, externa: formData.externa || false };
        if (editingId) await updateBodegaApi(editingId, { ...payload, estado: formData.estado });
        else await createBodegaApi(payload);
      }
      else if (activeTab === "estibas") {
        const payload = { nombre: formData.nombre, id_bodega: Number(formData.id_bodega) };
        if (editingId) await updateEstibaApi(editingId, { ...payload, estado: formData.estado });
        else await createEstibaApi(payload);
      }

      toast.success("Registro guardado exitosamente");
      handleCloseModal();
      loadData(); // Recargamos para ver los cambios
    } catch (error: any) {
      console.error("Error al guardar:", error);
      toast.error(error.response?.data?.message || "Ocurrió un error al intentar guardar");
    }
  };

  const renderTableContent = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={10} className="text-center py-8 text-neutral-500">
            <Loader2 className="w-6 h-6 animate-spin inline-block mr-2" /> Cargando datos...
          </td>
        </tr>
      );
    }

    const term = searchTerm.toLowerCase();

    switch (activeTab) {
      case "proveedores":
        return proveedores.filter(p => p.nombre.toLowerCase().includes(term) || p.rtn?.toLowerCase().includes(term)).map((p) => (
          <tr key={p.id_proveedor}>
            <td className="font-medium">{p.nombre}</td>
            <td>{p.rtn || "N/A"}</td>
            <td>{p.telefono || "N/A"}</td>
            <td className="text-center">
              <Badge bg={p.estado ? "success" : "danger"}>
                {p.estado ? "Activo" : "Inactivo"}
              </Badge>
            </td>
            {canEditTab && (
              <td className="text-center">
                <button onClick={() => handleEdit(p, "id_proveedor")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar">
                  <Edit className="w-4 h-4 text-neutral-600" />
                </button>
              </td>
            )}
          </tr>
        ));
      case "transportes":
        return transportes.filter(t => t.nombre.toLowerCase().includes(term) || t.rtn?.toLowerCase().includes(term)).map((t) => (
          <tr key={t.id_transporte}>
            <td className="font-medium">{t.nombre}</td>
            <td>{t.rtn || "N/A"}</td>
            <td>{t.telefono || "N/A"}</td>
            <td className="text-center">
              <Badge bg={t.estado ? "success" : "danger"}>
                {t.estado ? "Activo" : "Inactivo"}
              </Badge>
            </td>
            {canEditTab && (
              <td className="text-center">
                <button onClick={() => handleEdit(t, "id_transporte")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar">
                  <Edit className="w-4 h-4 text-neutral-600" />
                </button>
              </td>
            )}
          </tr>
        ));
      case "conductores":
        return conductores.filter(c => c.nombre.toLowerCase().includes(term) || c.dni?.toLowerCase().includes(term) || c.licencia?.toLowerCase().includes(term)).map((c) => (
          <tr key={c.id_conductor}>
            <td className="font-medium">{c.nombre}</td>
            <td>{c.dni || "N/A"}</td>
            <td>{c.licencia || "N/A"}</td>
            <td>{c.telefono || "N/A"}</td>
            <td className="text-center">
              <Badge bg={c.estado ? "success" : "danger"}>
                {c.estado ? "Activo" : "Inactivo"}
              </Badge>
            </td>
            {canEditTab && (
              <td className="text-center">
                <button onClick={() => handleEdit(c, "id_conductor")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar">
                  <Edit className="w-4 h-4 text-neutral-600" />
                </button>
              </td>
            )}
          </tr>
        ));
      case "placas-cabezal":
        return placasCabezal.filter(p => p.placa.toLowerCase().includes(term)).map((p) => (
          <tr key={p.id_placa_cabezal}>
            <td className="font-medium">{p.placa}</td>
            <td className="text-center">
              <Badge bg={p.estado ? "success" : "danger"}>
                {p.estado ? "Activo" : "Inactivo"}
              </Badge>
            </td>
            {canEditTab && (
              <td className="text-center">
                <button onClick={() => handleEdit(p, "id_placa_cabezal")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar">
                  <Edit className="w-4 h-4 text-neutral-600" />
                </button>
              </td>
            )}
          </tr>
        ));
      case "placas-furgon":
        return placasFurgon.filter(p => p.placa.toLowerCase().includes(term)).map((p) => (
          <tr key={p.id_placa_furgon}>
            <td className="font-medium">{p.placa}</td>
            <td className="text-center">
              <Badge bg={p.estado ? "success" : "danger"}>
                {p.estado ? "Activo" : "Inactivo"}
              </Badge>
            </td>
            {canEditTab && (
              <td className="text-center">
                <button onClick={() => handleEdit(p, "id_placa_furgon")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar">
                  <Edit className="w-4 h-4 text-neutral-600" />
                </button>
              </td>
            )}
          </tr>
        ));
      case "cosechas":
        return cosechas.filter(c => c.cosecha.toLowerCase().includes(term)).map((c) => (
          <tr key={c.id_cosecha}>
            <td className="font-medium">{c.cosecha}</td>
            <td className="text-center">
              {c.cosecha_actual ? <Badge bg="info">Cosecha Actual</Badge> : ""}
            </td>
            <td className="text-center">
              <Badge bg={c.estado ? "success" : "danger"}>
                {c.estado ? "Activo" : "Inactivo"}
              </Badge>
            </td>
            {canEditTab && (
              <td className="text-center">
                <button onClick={() => handleEdit(c, "id_cosecha")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar">
                  <Edit className="w-4 h-4 text-neutral-600" />
                </button>
              </td>
            )}
          </tr>
        ));
      case "departamentos":
        return departamentos.filter(d => d.nombre.toLowerCase().includes(term)).map((d) => (
          <tr key={d.id_departamento}>
            <td className="font-medium">{d.nombre}</td>
            <td className="text-center">
              <Badge bg={d.estado ? "success" : "danger"}>
                {d.estado ? "Activo" : "Inactivo"}
              </Badge>
            </td>
            {canEditTab && (
              <td className="text-center">
                <button onClick={() => handleEdit(d, "id_departamento")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar">
                  <Edit className="w-4 h-4 text-neutral-600" />
                </button>
              </td>
            )}
          </tr>
        ));
      case "municipios":
        return municipios.filter(m => m.nombre.toLowerCase().includes(term) || m.departamento?.nombre.toLowerCase().includes(term)).map((m) => (
          <tr key={m.id_municipio}>
            <td className="font-medium">{m.nombre}</td>
            <td>{m.departamento?.nombre || "N/A"}</td>
            <td className="text-center">
              <Badge bg={m.estado ? "success" : "danger"}>
                {m.estado ? "Activo" : "Inactivo"}
              </Badge>
            </td>
            {canEditTab && (
              <td className="text-center">
                <button onClick={() => handleEdit(m, "id_municipio")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar">
                  <Edit className="w-4 h-4 text-neutral-600" />
                </button>
              </td>
            )}
          </tr>
        ));
      case "catadores":
        return catadores.filter(c => c.nombre.toLowerCase().includes(term)).map((c) => <tr key={c.id_catador}><td className="font-medium">{c.nombre}</td><td className="text-center"><Badge bg={c.estado ? "success" : "danger"}>{c.estado ? "Activo" : "Inactivo"}</Badge></td>{canEditTab && <td className="text-center"><button onClick={() => handleEdit(c, "id_catador")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar"><Edit className="w-4 h-4 text-neutral-600" /></button></td>}</tr>);
      case "calidades":
        return calidades.filter(c => c.nombre.toLowerCase().includes(term)).map((c) => <tr key={c.id_calidad}><td className="font-medium">{c.nombre}</td><td className="text-center"><Badge bg={c.estado ? "success" : "danger"}>{c.estado ? "Activo" : "Inactivo"}</Badge></td>{canEditTab && <td className="text-center"><button onClick={() => handleEdit(c, "id_calidad")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar"><Edit className="w-4 h-4 text-neutral-600" /></button></td>}</tr>);
      case "defectos":
        return defectos.filter(d => d.nombre.toLowerCase().includes(term)).map((d) => <tr key={d.id_defecto}><td className="font-medium">{d.nombre}</td><td className="text-center"><Badge bg={d.estado ? "success" : "danger"}>{d.estado ? "Activo" : "Inactivo"}</Badge></td>{canEditTab && <td className="text-center"><button onClick={() => handleEdit(d, "id_defecto")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar"><Edit className="w-4 h-4 text-neutral-600" /></button></td>}</tr>);
      case "zarandas":
        return zarandas.filter(z => z.nombre.toLowerCase().includes(term)).map((z) => <tr key={z.id_zaranda}><td className="font-medium">{z.nombre}</td><td className="text-center"><Badge bg={z.estado ? "success" : "danger"}>{z.estado ? "Activo" : "Inactivo"}</Badge></td>{canEditTab && <td className="text-center"><button onClick={() => handleEdit(z, "id_zaranda")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar"><Edit className="w-4 h-4 text-neutral-600" /></button></td>}</tr>);
      case "tazas":
        return tazas.filter(t => t.nombre.toLowerCase().includes(term)).map((t) => <tr key={t.id_tazas}><td className="font-medium">{t.nombre}</td><td className="text-center"><Badge bg={t.estado ? "success" : "danger"}>{t.estado ? "Activo" : "Inactivo"}</Badge></td>{canEditTab && <td className="text-center"><button onClick={() => handleEdit(t, "id_tazas")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar"><Edit className="w-4 h-4 text-neutral-600" /></button></td>}</tr>);
      case "bodegas":
        return bodegas.filter(b => b.nombre.toLowerCase().includes(term)).map((b) => (
          <tr key={b.id_bodega}>
            <td className="font-medium">{b.nombre}</td>
            <td className="text-center">
              <Badge bg={b.externa ? "warning" : "info"}>
                {b.externa ? "Externa" : "Interna"}
              </Badge>
            </td>
            <td className="text-center">
              <Badge bg={b.estado ? "success" : "danger"}>
                {b.estado ? "Activo" : "Inactivo"}
              </Badge>
            </td>
            {canEditTab && (
              <td className="text-center">
                <button onClick={() => handleEdit(b, "id_bodega")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar">
                  <Edit className="w-4 h-4 text-neutral-600" />
                </button>
              </td>
            )}
          </tr>
        ));
      case "estibas":
        return estibas.filter(e => e.nombre.toLowerCase().includes(term) || e.bodega?.nombre.toLowerCase().includes(term)).map((e) => (
          <tr key={e.id_estibas}>
            <td className="font-medium">{e.nombre}</td>
            <td>{e.bodega?.nombre || "N/A"}</td>
            <td className="text-center">
              <Badge bg={e.estado ? "success" : "danger"}>
                {e.estado ? "Activo" : "Inactivo"}
              </Badge>
            </td>
            {canEditTab && (
              <td className="text-center">
                <button onClick={() => handleEdit(e, "id_estibas")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar">
                  <Edit className="w-4 h-4 text-neutral-600" />
                </button>
              </td>
            )}
          </tr>
        ));
    }
  };

  // Dibuja los inputs del modal dependiendo de la pestaña activa
  const renderModalForm = () => {
    const modalContent = {
      "proveedores": (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Group><Form.Label>Nombre del Proveedor</Form.Label><Form.Control type="text" value={formData.nombre || ""} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required /></Form.Group>
          <Form.Group><Form.Label>RTN (Opcional)</Form.Label><Form.Control type="text" value={formData.rtn || ""} onChange={(e) => setFormData({...formData, rtn: e.target.value})} /></Form.Group>
          <Form.Group><Form.Label>Municipio</Form.Label><Form.Select value={formData.id_municipio || ""} onChange={(e) => setFormData({...formData, id_municipio: e.target.value})} required><option value="">Seleccione un municipio</option>{municipios.map(m => <option key={m.id_municipio} value={m.id_municipio}>{`${m.nombre}${((m as any).departamento?.nombre) ? `- ${(m as any).departamento.nombre}` : ''}`}</option>)}</Form.Select></Form.Group>
          <Form.Group><Form.Label>Teléfono (Opcional)</Form.Label><Form.Control type="text" value={formData.telefono || ""} onChange={(e) => setFormData({...formData, telefono: e.target.value})} /></Form.Group>
          <div className="md:col-span-2">
            <Form.Group><Form.Label>Dirección (Opcional)</Form.Label><Form.Control type="text" value={formData.direccion || ""} onChange={(e) => setFormData({...formData, direccion: e.target.value})} /></Form.Group>
          </div>
        </div>
      ),
      "transportes": (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Group><Form.Label>Nombre de la Empresa</Form.Label><Form.Control type="text" value={formData.nombre || ""} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required /></Form.Group>
          <Form.Group><Form.Label>RTN (Opcional)</Form.Label><Form.Control type="text" value={formData.rtn || ""} onChange={(e) => setFormData({...formData, rtn: e.target.value})} /></Form.Group>
          <Form.Group><Form.Label>Municipio</Form.Label><Form.Select value={formData.id_municipio || ""} onChange={(e) => setFormData({...formData, id_municipio: e.target.value})} required><option value="">Seleccione un municipio</option>{municipios.map(m => <option key={m.id_municipio} value={m.id_municipio}>{m.nombre}</option>)}</Form.Select></Form.Group>
          <Form.Group><Form.Label>Contacto Principal</Form.Label><Form.Control type="text" value={formData.contacto || ""} onChange={(e) => setFormData({...formData, contacto: e.target.value})} /></Form.Group>
          <Form.Group><Form.Label>Teléfono (Opcional)</Form.Label><Form.Control type="text" value={formData.telefono || ""} onChange={(e) => setFormData({...formData, telefono: e.target.value})} /></Form.Group>
          <div className="md:col-span-2">
            <Form.Group><Form.Label>Dirección (Opcional)</Form.Label><Form.Control type="text" value={formData.direccion || ""} onChange={(e) => setFormData({...formData, direccion: e.target.value})} /></Form.Group>
          </div>
        </div>
      ),
      "conductores": (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Group><Form.Label>Nombre del Conductor</Form.Label><Form.Control type="text" value={formData.nombre || ""} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required /></Form.Group>
          <Form.Group><Form.Label>DNI (Opcional)</Form.Label><Form.Control type="text" value={formData.dni || ""} onChange={(e) => setFormData({...formData, dni: e.target.value})} /></Form.Group>
          <Form.Group><Form.Label>Licencia (Opcional)</Form.Label><Form.Control type="text" value={formData.licencia || ""} onChange={(e) => setFormData({...formData, licencia: e.target.value})} /></Form.Group>
          <Form.Group><Form.Label>Empresa de Transporte</Form.Label><Form.Select value={formData.id_transporte || ""} onChange={(e) => setFormData({...formData, id_transporte: e.target.value})} required><option value="">Seleccione transporte</option>{transportes.map(t => <option key={t.id_transporte} value={t.id_transporte}>{t.nombre}</option>)}</Form.Select></Form.Group>
          <Form.Group><Form.Label>Municipio</Form.Label><Form.Select value={formData.id_municipio || ""} onChange={(e) => setFormData({...formData, id_municipio: e.target.value})} required><option value="">Seleccione municipio</option>{municipios.map(m => <option key={m.id_municipio} value={m.id_municipio}>{m.nombre}</option>)}</Form.Select></Form.Group>
          <Form.Group><Form.Label>Teléfono (Opcional)</Form.Label><Form.Control type="text" value={formData.telefono || ""} onChange={(e) => setFormData({...formData, telefono: e.target.value})} /></Form.Group>
        </div>
      ),
      "placas-cabezal": (
        <div className="space-y-4">
          <Form.Group><Form.Label>Número de Placa (Cabezal)</Form.Label><Form.Control type="text" value={formData.placa || ""} onChange={(e) => setFormData({...formData, placa: e.target.value})} required /></Form.Group>
        </div>
      ),
      "placas-furgon": (
        <div className="space-y-4">
          <Form.Group><Form.Label>Número de Placa (Furgón)</Form.Label><Form.Control type="text" value={formData.placa || ""} onChange={(e) => setFormData({...formData, placa: e.target.value})} required /></Form.Group>
        </div>
      ),
      "cosechas": (
        <div className="space-y-4">
          <Form.Group><Form.Label>Periodo de Cosecha</Form.Label><Form.Control type="text" placeholder="Ej: 2024-2025" value={formData.cosecha || ""} onChange={(e) => setFormData({...formData, cosecha: e.target.value})} required /></Form.Group>
          <Form.Check type="checkbox" label="Establecer como Cosecha Actual" checked={formData.cosecha_actual ?? false} onChange={(e) => setFormData({...formData, cosecha_actual: e.target.checked})} className="mt-4" />
        </div>
      ),
      "departamentos": (
        <div className="space-y-4">
          <Form.Group><Form.Label>Nombre del Departamento</Form.Label><Form.Control type="text" value={formData.nombre || ""} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required /></Form.Group>
        </div>
      ),
      "municipios": (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Group><Form.Label>Nombre del Municipio</Form.Label><Form.Control type="text" value={formData.nombre || ""} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required /></Form.Group>
          <Form.Group><Form.Label>Departamento</Form.Label><Form.Select value={formData.id_departamento || ""} onChange={(e) => setFormData({...formData, id_departamento: e.target.value})} required><option value="">Seleccione departamento</option>{departamentos.map(d => <option key={d.id_departamento} value={d.id_departamento}>{d.nombre}</option>)}</Form.Select></Form.Group>
        </div>
      ),
      "catadores": (
        <div className="space-y-4">
          <Form.Group><Form.Label>Nombre del Catador</Form.Label><Form.Control type="text" value={formData.nombre || ""} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required /></Form.Group>
        </div>
      ),
      "calidades": (
        <div className="space-y-4">
          <Form.Group><Form.Label>Descripción de Calidad</Form.Label><Form.Control type="text" placeholder="Ej: Estrictamente Altura (SHG)" value={formData.nombre || ""} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required /></Form.Group>
        </div>
      ),
      "defectos": (
        <div className="space-y-4">
          <Form.Group><Form.Label>Nombre del Defecto</Form.Label><Form.Control type="text" placeholder="Ej: Grano Negro" value={formData.nombre || ""} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required /></Form.Group>
        </div>
      ),
      "zarandas": (
        <div className="space-y-4">
          <Form.Group><Form.Label>Malla / Zaranda</Form.Label><Form.Control type="text" placeholder="Ej: Malla 18" value={formData.nombre || ""} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required /></Form.Group>
        </div>
      ),
      "tazas": (
        <div className="space-y-4">
          <Form.Group><Form.Label>Atributo de Taza</Form.Label><Form.Control type="text" placeholder="Ej: Acidez, Cuerpo..." value={formData.nombre || ""} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required /></Form.Group>
        </div>
      ),
      "bodegas": (
        <div className="space-y-4">
          <Form.Group><Form.Label>Nombre de la Bodega</Form.Label><Form.Control type="text" placeholder="Ej: Bodega Principal" value={formData.nombre || ""} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required /></Form.Group>
          <Form.Check type="checkbox" label="Es Bodega Externa (Alquilada/Fuera del beneficio)" checked={formData.externa ?? false} onChange={(e) => setFormData({...formData, externa: e.target.checked})} className="mt-4" />
        </div>
      ),
      "estibas": (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Group><Form.Label>Nombre de la Estiba / Lote Físico</Form.Label><Form.Control type="text" placeholder="Ej: Estiba A-1" value={formData.nombre || ""} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required /></Form.Group>
          <Form.Group><Form.Label>Bodega a la que pertenece</Form.Label><Form.Select value={formData.id_bodega || ""} onChange={(e) => setFormData({...formData, id_bodega: e.target.value})} required><option value="">Seleccione una bodega</option>{bodegas.map(b => <option key={b.id_bodega} value={b.id_bodega}>{b.nombre}</option>)}</Form.Select></Form.Group>
        </div>
      ),
    };

    return (
      <div className="space-y-4">
        {modalContent[activeTab as keyof typeof modalContent]}
        
        {/* Checkbox de estado solo al editar */}
        {editingId && (
          <Form.Check type="checkbox" label="Registro Activo" checked={formData.estado ?? true} onChange={(e) => setFormData({...formData, estado: e.target.checked})} className="mt-4" />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Catálogos Operativos" 
        subtitle="Mantenimiento general de catálogos del sistema" 
        icon={Database} 
        actions={canEditTab ? [{ label: `Nuevo ${tabs.find(t => t.id === activeTab)?.label.replace("es", "")}`, onClick: handleCreate, icon: Plus }] : []} 
      />

      {/* Selector de Catálogo y Buscador */}
      <Card className="mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:max-w-sm">
            <Form.Select 
              value={activeTab} 
              onChange={(e) => { setActiveTab(e.target.value as TabType); setSearchTerm(""); }} 
            >
              {tabs.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </Form.Select>
          </div>
          <div className="w-full sm:max-w-md">
            <InputGroup>
              <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
              <Form.Control type="text" placeholder={`Buscar en ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </InputGroup>
          </div>
        </div>
      </Card>

      {/* Tabla Dinámica */}
      <Card>
        <Card.Header className="px-4 pt-4"><Card.Title as="h3" className="text-lg font-semibold text-neutral-900">{tabs.find(t => t.id === activeTab)?.label}</Card.Title></Card.Header>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>Descripción principal</th>
              {(activeTab === "proveedores" || activeTab === "transportes") && <th>RTN</th>}
              {activeTab === "conductores" && <th>DNI</th>}
              {activeTab === "conductores" && <th>Licencia</th>}
              {["proveedores", "conductores", "transportes"].includes(activeTab) && <th>Teléfono</th>}
              {activeTab === "municipios" && <th>Departamento</th>}
              {activeTab === "cosechas" && <th className="text-center">Status</th>}
              {activeTab === "bodegas" && <th className="text-center">Tipo</th>}
              {activeTab === "estibas" && <th>Bodega</th>}
              <th className="text-center">Estado</th>
              {canEditTab && <th className="text-center">Acciones</th>}
            </tr>
          </thead>
          <tbody>{renderTableContent()}</tbody>
        </Table>
      </Card>

      {/* Modal para Crear/Editar */}
      <Modal show={isModalOpen} onHide={handleCloseModal} size="lg">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton><Modal.Title>{editingId ? "Editar Registro" : "Nuevo Registro"}</Modal.Title></Modal.Header>
          <Modal.Body className="space-y-4">{renderModalForm()}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={handleCloseModal}>Cancelar</Button>
            <Button variant="primary" type="submit">{editingId ? "Guardar Cambios" : "Crear Registro"}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}