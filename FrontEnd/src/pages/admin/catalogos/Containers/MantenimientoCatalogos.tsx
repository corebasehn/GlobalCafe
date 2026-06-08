import { useState, useEffect, Fragment } from "react";
import { Card, Row, Col } from 'react-bootstrap';
import toast from "react-hot-toast";

// APIs
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
} from "../../../../api/catalogs.api";

// Components
import CatalogosHeader from "../Components/CatalogosHeader";
import CatalogosTable from "../Components/CatalogosTable";
import CatalogosModal from "../Components/CatalogosModal";

type TabType = "proveedores" | "transportes" | "conductores" | "placas-cabezal" | "placas-furgon" | "cosechas" | "departamentos" | "municipios" | "catadores" | "calidades" | "defectos" | "zarandas" | "tazas" | "bodegas" | "estibas";

export default function MantenimientoCatalogos() {
  const [activeTab, setActiveTab] = useState<TabType>("proveedores");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Catalog Data
  const [data, setData] = useState<{
    proveedores: Proveedor[];
    conductores: Conductor[];
    placasCabezal: PlacaCabezal[];
    placasFurgon: PlacaFurgon[];
    cosechas: Cosecha[];
    municipios: Municipio[];
    transportes: Transporte[];
    departamentos: Departamento[];
    catadores: Catador[];
    calidades: Calidad[];
    defectos: Defecto[];
    zarandas: Zaranda[];
    tazas: Taza[];
    bodegas: Bodega[];
    estibas: Estiba[];
  }>({
    proveedores: [], conductores: [], placasCabezal: [], placasFurgon: [],
    cosechas: [], municipios: [], transportes: [], departamentos: [],
    catadores: [], calidades: [], defectos: [], zarandas: [],
    tazas: [], bodegas: [], estibas: []
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [provs, conds, pCabezal, pFurgon, cos, muns, trans, deptos, cat, cal, def, zar, taz, bods, ests] = await Promise.all([
        getProveedoresApi(), getConductoresApi(), getPlacasCabezalApi(), getPlacasFurgonApi(),
        getCosechasApi(), getMunicipiosApi(), getTransportesApi(), getDepartamentosApi(),
        getCatadoresApi(), getCalidadesApi(), getDefectosApi(), getZarandasApi(),
        getTazasApi(), getBodegasApi(), getEstibasApi()
      ]);

      setData({
        proveedores: provs, conductores: conds, placasCabezal: pCabezal, placasFurgon: pFurgon,
        cosechas: cos, municipios: muns, transportes: trans, departamentos: deptos,
        catadores: cat, calidades: cal, defectos: def, zarandas: zar,
        tazas: taz, bodegas: bods, estibas: ests
      });
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

  const handleEdit = (item: any, idField: string) => {
    setEditingId(item[idField]);
    setFormData({ ...item });
    setIsModalOpen(true);
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
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({});
      loadData();
    } catch (error: any) {
      console.error("Error al guardar:", error);
      toast.error(error.response?.data?.message || "Ocurrió un error al intentar guardar");
    }
  };

  const getActiveData = () => {
    switch (activeTab) {
      case "proveedores": return data.proveedores;
      case "transportes": return data.transportes;
      case "conductores": return data.conductores;
      case "placas-cabezal": return data.placasCabezal;
      case "placas-furgon": return data.placasFurgon;
      case "cosechas": return data.cosechas;
      case "departamentos": return data.departamentos;
      case "municipios": return data.municipios;
      case "catadores": return data.catadores;
      case "calidades": return data.calidades;
      case "defectos": return data.defectos;
      case "zarandas": return data.zarandas;
      case "tazas": return data.tazas;
      case "bodegas": return data.bodegas;
      case "estibas": return data.estibas;
      default: return [];
    }
  };

  return (
    <Fragment>
      <CatalogosHeader 
        activeTab={activeTab}
        tabs={tabs}
        searchTerm={searchTerm}
        onTabChange={(tab) => { setActiveTab(tab); setSearchTerm(""); }}
        onSearchChange={setSearchTerm}
        onAdd={() => { setEditingId(null); setFormData({}); setIsModalOpen(true); }}
      />

      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header>
              <Card.Title>
                <span className="border-start border-3 border-success me-2"></span>
                {tabs.find(t => t.id === activeTab)?.label.toUpperCase()}
              </Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <CatalogosTable 
                activeTab={activeTab}
                loading={loading}
                data={getActiveData()}
                searchTerm={searchTerm}
                onEdit={handleEdit}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <CatalogosModal 
        show={isModalOpen}
        activeTab={activeTab}
        editingId={editingId}
        formData={formData}
        catalogs={{
          municipios: data.municipios,
          departamentos: data.departamentos,
          transportes: data.transportes,
          bodegas: data.bodegas
        }}
        onClose={() => { setIsModalOpen(false); setEditingId(null); setFormData({}); }}
        onChange={setFormData}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
}

