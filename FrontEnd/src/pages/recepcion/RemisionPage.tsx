import React, { useState, useEffect } from "react";
import { ClipboardList, Plus, Search, Loader2, Trash2, ChevronRight, ChevronDown, MoreVertical, Edit, Printer } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";
import { useAuth } from "../../auth/useAuth";
import toast from "react-hot-toast";

// APIs
import { 
  getCosechasApi, getPlacasCabezalApi, getPlacasFurgonApi, getTransportesApi,
  getConductoresApi, getMunicipiosApi, getProveedoresApi, 
  Cosecha, PlacaCabezal, PlacaFurgon, Conductor, Municipio, Proveedor, Transporte
} from "../../api/catalogs.api";
import { getReceptionsApi, createReceptionApi, updateReceptionApi, deleteReceptionApi, registrarImpresionApi, Recepcion, CreateReceptionRequest } from "../../api/reception.api";

const colors = moduleColors.recepcion;

// Interfaz para tipar correctamente nuestro formulario
interface RemisionFormData {
  id_cosecha: string;
  tipo_vehiculo: string;
  id_placa_cabezal: string;
  id_placa_furgon: string;
  id_transporte: string;
  id_conductor: string;
  id_municipio: string;
  marchamo: string;
  observaciones: string;
  detalles: {
    id_detalle_recepcion?: number;
    id_proveedor: string;
    cantidad_sacos: string;
    cantidad_qq: string;
    remision: string;
    observaciones: string;
    is_editable?: boolean;
  }[];
}

const initialState: RemisionFormData = {
  id_cosecha: "",
  tipo_vehiculo: "Camión Rígido",
  id_placa_cabezal: "",
  id_placa_furgon: "",
  id_transporte: "", 
  id_conductor: "",
  id_municipio: "",
  marchamo: "",
  observaciones: "", 
  detalles: [{
    id_proveedor: "",
    cantidad_sacos: "",
    cantidad_qq: "",
    remision: "",
    observaciones: "", 
    is_editable: true
  }]
};

export default function RemisionPage() {
  const { hasPermission } = useAuth();
  const hasRowActions = hasPermission("EDITAR_RECEPCION") || hasPermission("IMPRIMIR_RECEPCION") || hasPermission("ANULAR_RECEPCION");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Catálogos para los Dropdowns
  const [cosechas, setCosechas] = useState<Cosecha[]>([]);
  const [placasCabezal, setPlacasCabezal] = useState<PlacaCabezal[]>([]);
  const [placasFurgon, setPlacasFurgon] = useState<PlacaFurgon[]>([]);
  const [conductores, setConductores] = useState<Conductor[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [transportes, setTransportes] = useState<Transporte[]>([]);
  
  // Datos principales de la tabla
  const [recepciones, setRecepciones] = useState<Recepcion[]>([]);
  const [formData, setFormData] = useState(initialState);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  
  // Estados para Anular (Eliminar)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [receptionToDelete, setReceptionToDelete] = useState<Recepcion | null>(null);
  
  // Estados para Imprimir Boleta
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [receptionToPrint, setReceptionToPrint] = useState<Recepcion | null>(null);

  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  const handleClosePrintModal = () => setIsPrintModalOpen(false);

  // Efecto para cerrar el Dropdown al dar clic fuera
  useEffect(() => {
    const handleClickOutside = () => setActionMenuOpen(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [cos, pc, pf, cond, mun, prov, trans, recs] = await Promise.all([
        getCosechasApi(),
        getPlacasCabezalApi(),
        getPlacasFurgonApi(),
        getConductoresApi(),
        getMunicipiosApi(),
        getProveedoresApi(),
        getTransportesApi(),
        getReceptionsApi()
      ]);
      setCosechas(cos);
      setPlacasCabezal(pc);
      setPlacasFurgon(pf);
      setConductores(cond);
      setMunicipios(mun);
      setProveedores(prov);
      setTransportes(trans);
      setRecepciones(recs);

      // Pre-seleccionar la cosecha actual por defecto
      const cosechaActual = cos.find(c => c.cosecha_actual);
      if (cosechaActual) {
        setFormData(prev => ({ ...prev, id_cosecha: cosechaActual.id_cosecha.toString() }));
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los datos del servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setEditingId(null);
    setFormData(initialState);
    const cosechaActual = cosechas.find(c => c.cosecha_actual);
    if (cosechaActual) {
      setFormData(prev => ({ ...prev, id_cosecha: cosechaActual.id_cosecha.toString() }));
    }
    setIsModalOpen(true);
  };

  const handleEdit = (recepcion: Recepcion) => {
    setEditingId(recepcion.id_recepcion);
    const conductorInfo = conductores.find(c => c.id_conductor === recepcion.id_conductor);
    const id_transporte = conductorInfo ? conductorInfo.id_transporte.toString() : "";

    setFormData({
      id_cosecha: recepcion.id_cosecha.toString(),
      tipo_vehiculo: recepcion.tipo_vehiculo,
      id_placa_cabezal: recepcion.id_placa_cabezal.toString(),
      id_placa_furgon: recepcion.id_placa_furgon ? recepcion.id_placa_furgon.toString() : "",
      id_transporte,
      id_conductor: recepcion.id_conductor.toString(),
      id_municipio: recepcion.id_municipio.toString(),
      marchamo: recepcion.marchamo || "",
      observaciones: recepcion.observaciones || "",
      detalles: recepcion.detalles.filter(d => d.estado).map(d => ({
        id_detalle_recepcion: d.id_detalle_recepcion,
        id_proveedor: d.id_proveedor.toString(),
        cantidad_sacos: d.cantidad_sacos.toString(),
        cantidad_qq: d.cantidad_qq.toString(),
        remision: d.remision,
        observaciones: d.observaciones || "",
        is_editable: d.estado_transaccion?.nombre === "Pendiente de Muestrear"
      }))
    });
    
    setIsModalOpen(true);
  };

  const toggleRow = (id: number) => {
    setExpandedRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
  };

  const handleDeleteClick = (recepcion: Recepcion) => {
    setReceptionToDelete(recepcion);
    setActionMenuOpen(null);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!receptionToDelete) return;
    try {
      setSubmitting(true);
      await deleteReceptionApi(receptionToDelete.id_recepcion);
      toast.success("Ingreso anulado exitosamente");
      setIsDeleteModalOpen(false);
      loadData();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error al anular el ingreso");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrintClick = (recepcion: Recepcion) => {
    setReceptionToPrint(recepcion);
    setActionMenuOpen(null);
    setIsPrintModalOpen(true);
  };

  const confirmPrint = async () => {
    window.print(); 
    if (receptionToPrint) {
      try {
        await registrarImpresionApi(receptionToPrint.id_recepcion);
        loadData(); 
      } catch (error) {
        console.error("Error al registrar impresión:", error);
      }
    }
  };

  const handleDetalleChange = (index: number, field: string, value: string) => {
    const nuevosDetalles = [...formData.detalles];
    nuevosDetalles[index] = { ...nuevosDetalles[index], [field]: value };
    setFormData({ ...formData, detalles: nuevosDetalles });
  };

  const addDetalle = () => {
    setFormData({
      ...formData,
      detalles: [...formData.detalles, { id_proveedor: "", cantidad_sacos: "", cantidad_qq: "", remision: "", observaciones: "", is_editable: true }]
    });
  };

  const removeDetalle = (index: number) => {
    setFormData({ ...formData, detalles: formData.detalles.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload: CreateReceptionRequest = {
        id_cosecha: Number(formData.id_cosecha),
        tipo_vehiculo: formData.tipo_vehiculo,
        id_placa_cabezal: Number(formData.id_placa_cabezal),
        id_placa_furgon: formData.id_placa_furgon ? Number(formData.id_placa_furgon) : undefined,
        id_conductor: Number(formData.id_conductor),
        id_municipio: Number(formData.id_municipio),
        marchamo: formData.marchamo || undefined,
        observaciones: formData.observaciones || undefined,
        detalles: formData.detalles.map(d => ({
          id_detalle_recepcion: d.id_detalle_recepcion,
          id_proveedor: Number(d.id_proveedor),
          cantidad_sacos: Number(d.cantidad_sacos),
          cantidad_qq: Number(d.cantidad_qq),
          remision: d.remision,
          observaciones: d.observaciones || undefined
        }))
      };

      if (editingId) {
        await updateReceptionApi(editingId, payload);
        toast.success("Remisión actualizada correctamente");
      } else {
        await createReceptionApi(payload);
        toast.success("Remisión registrada en portería correctamente");
      }

      setIsModalOpen(false);
      loadData(); 
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error al registrar la remisión");
    } finally {
      setSubmitting(false);
    }
  };

  const recepcionesActivas = recepciones.filter(r => 
    r.detalles?.some(d => d.estado && d.estado_transaccion?.nombre === "Pendiente de Muestrear")
  );

  const filteredRecepciones = recepcionesActivas.filter(r => {
    const detallesActivos = r.detalles?.filter(d => d.estado) || [];
    const provNames = detallesActivos.map(d => proveedores.find(p => p.id_proveedor === d.id_proveedor)?.nombre || "");
    const conductorObj = conductores.find(c => c.id_conductor === r.id_conductor);
    const transporteName = transportes.find(t => t.id_transporte === conductorObj?.id_transporte)?.nombre || "";
    const term = searchTerm.toLowerCase();
    return r.numero_entrada.toLowerCase().includes(term) || transporteName.toLowerCase().includes(term) || provNames.some(name => name.toLowerCase().includes(term));
  });

  return (
    <div>
      <PageHeader 
        title="Ingreso de Remisión" 
        subtitle="Registro de vehículos y carga en portería" 
        icon={ClipboardList} 
        iconBg={colors.bg} 
        iconColor={colors.icon} 
        actions={hasPermission("CREAR_RECEPCION") ? [{ label: "Nueva Remisión", onClick: handleOpenModal, icon: Plus }] : []} 
      />

      <Card className="mb-6">
        <Card.Body className="p-4">
          <InputGroup>
            <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
            <Form.Control 
              placeholder="Buscar por número de entrada o proveedor..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </InputGroup>
        </Card.Body>
      </Card>

      <Card>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th style={{ width: '40px' }} />
              {hasRowActions && <th className="text-center" style={{ width: '80px' }}>Acciones</th>}
              <th>No. Entrada</th>
              <th>Fecha / Hora</th>
              <th>Transporte</th>
              <th>Placas</th>
              <th>Conductor</th>
              <th className="text-center">Sacos</th>
              <th className="text-end">Quintales</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={hasRowActions ? 9 : 8} className="text-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin inline-block text-neutral-400 mr-2" /> Cargando remisiones...
                </td>
              </tr>
            ) : filteredRecepciones.length === 0 ? (
              <tr>
                <td colSpan={hasRowActions ? 9 : 8} className="text-center py-8 text-neutral-500">
                  No hay ingresos pendientes de muestrear
                </td>
              </tr>
            ) : (
              filteredRecepciones.map((r) => {
                const detallesActivos = r.detalles?.filter(d => d.estado) || [];
                const totalSacos = detallesActivos.reduce((sum, d) => sum + d.cantidad_sacos, 0);
                const totalQq = detallesActivos.reduce((sum, d) => sum + Number(d.cantidad_qq), 0);
                const cabezal = placasCabezal.find(p => p.id_placa_cabezal === r.id_placa_cabezal)?.placa || "N/A";
                const furgon = r.id_placa_furgon ? placasFurgon.find(p => p.id_placa_furgon === r.id_placa_furgon)?.placa : null;
                const conductorObj = conductores.find(c => c.id_conductor === r.id_conductor);
                const conductor = conductorObj?.nombre || "N/A";
                const transporteName = transportes.find(t => t.id_transporte === conductorObj?.id_transporte)?.nombre || "N/A";
                const isExpanded = expandedRows.includes(r.id_recepcion);
                const activeDetails = r.detalles?.filter(d => d.estado) || [];
                const canModify = activeDetails.length > 0 && activeDetails.every(d => d.estado_transaccion?.nombre === "Pendiente de Muestrear");
                
                return (
                  <React.Fragment key={r.id_recepcion}>
                    <tr className={isExpanded ? "table-warning bg-opacity-10" : ""}>
                      <td>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="p-1 text-neutral-500"
                          onClick={() => toggleRow(r.id_recepcion)}
                        >
                          {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                        </Button>
                      </td>
                      {hasRowActions && (
                        <td className="text-center">
                          <div className="position-relative">
                            <Button 
                              variant="light" 
                              size="sm" 
                              className="p-1 rounded-lg"
                              onClick={(e) => { e.stopPropagation(); setActionMenuOpen(actionMenuOpen === r.id_recepcion ? null : r.id_recepcion); }}
                            >
                              <MoreVertical className="w-5 h-5 text-neutral-600" />
                            </Button>
                            {actionMenuOpen === r.id_recepcion && (
                              <Card 
                                className="position-absolute shadow-lg z-3 py-1" 
                                style={{ top: '100%', left: 0, minWidth: '160px', cursor: 'default' }}
                                onClick={e => e.stopPropagation()}
                              >
                                {hasPermission("EDITAR_RECEPCION") && (
                                  <Button 
                                    variant="link" 
                                    className={`w-100 text-start px-3 py-2 text-dark text-decoration-none d-flex align-items-center gap-2 ${canModify ? 'hover-bg-light' : 'opacity-50 text-muted cursor-not-allowed'}`}
                                    disabled={!canModify}
                                    title={!canModify ? "No se puede editar porque ya hay cargas en proceso" : ""}
                                    onClick={() => { handleEdit(r); setActionMenuOpen(null); }}
                                  >
                                    <Edit className="w-4 h-4"/> Editar Viaje
                                  </Button>
                                )}
                                {hasPermission("IMPRIMIR_RECEPCION") && (
                                  <Button 
                                    variant="link" 
                                    className="w-100 text-start px-3 py-2 text-dark text-decoration-none d-flex align-items-center gap-2 hover-bg-light"
                                    onClick={() => { handlePrintClick(r); setActionMenuOpen(null); }}
                                  >
                                    <Printer className="w-4 h-4"/> Imprimir Boleta
                                  </Button>
                                )}
                                {hasPermission("ANULAR_RECEPCION") && (
                                  <>
                                    <div className="border-top my-1"></div>
                                    <Button 
                                      variant="link" 
                                      className={`w-100 text-start px-3 py-2 text-danger text-decoration-none d-flex align-items-center gap-2 ${canModify ? 'hover-bg-danger-subtle' : 'opacity-50 text-muted cursor-not-allowed'}`}
                                      disabled={!canModify}
                                      onClick={() => { handleDeleteClick(r); setActionMenuOpen(null); }}
                                    >
                                      <Trash2 className="w-4 h-4"/> Anular Ingreso
                                    </Button>
                                  </>
                                )}
                              </Card>
                            )}
                          </div>
                        </td>
                      )}
                      <td className="font-bold text-coffee-700">{r.numero_entrada}</td>
                      <td>
                        {new Date(r.fecha_entrada).toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td>{transporteName}</td>
                      <td>
                        <div className="text-sm">Cab: <span className="font-medium">{cabezal}</span></div>
                        {furgon && <div className="text-sm text-neutral-500">Fur: <span className="font-medium">{furgon}</span></div>}
                      </td>
                      <td>{conductor}</td>
                      <td className="text-center">{totalSacos}</td>
                      <td className="text-end font-semibold">{totalQq.toFixed(2)} QQ</td>
                    </tr>

                    {isExpanded && (
                      <tr>
                        <td colSpan={hasRowActions ? 9 : 8} className="p-0 border-bottom">
                          <div className="px-4 py-3 bg-light bg-opacity-50">
                            <Card className="shadow-sm">
                              <Table responsive hover size="sm" className="mb-0">
                                <thead className="bg-light">
                                  <tr>
                                    <th>Remisión Física</th>
                                    <th>Productor / Finca</th>
                                    <th className="text-center">Sacos</th>
                                    <th className="text-end">Quintales</th>
                                    <th className="text-center">Estado de Carga</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {detallesActivos.map((d) => (
                                    <tr key={d.id_detalle_recepcion}>
                                      <td className="font-medium text-neutral-700">{d.remision}</td>
                                      <td>{proveedores.find(p => p.id_proveedor === d.id_proveedor)?.nombre}</td>
                                      <td className="text-center">{d.cantidad_sacos}</td>
                                      <td className="text-end">{Number(d.cantidad_qq).toFixed(2)} QQ</td>
                                      <td className="text-center">
                                        <Badge bg="warning" className="text-dark">{d.estado_transaccion?.nombre}</Badge>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </Card>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </Table>
      </Card>

      <Modal show={isModalOpen} onHide={handleCloseModal} size="lg">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{editingId ? "Editar Remisión" : "Nueva Remisión (Ingreso a Portería)"}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="space-y-6">
            
            {/* Sección 1: Datos del Viaje */}
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
              <h3 className="font-bold text-neutral-900 mb-4 d-flex align-items-center gap-2 fs-6">
                <span className="bg-amber-100 text-amber-800 w-6 h-6 rounded-circle d-inline-flex align-items-center justify-center text-xs">1</span>
                Datos del Viaje y Transporte
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Form.Group>
                  <Form.Label>Cosecha</Form.Label>
                  <Form.Select value={formData.id_cosecha} onChange={(e) => setFormData({...formData, id_cosecha: e.target.value})} required>
                    {cosechas.map(c => <option key={c.id_cosecha} value={c.id_cosecha.toString()}>{c.cosecha}</option>)}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Municipio de Origen</Form.Label>
                  <Form.Select value={formData.id_municipio} onChange={(e) => setFormData({...formData, id_municipio: e.target.value})} required>
                    <option value="">Seleccione un municipio</option>
                    {municipios.map(m => <option key={m.id_municipio} value={m.id_municipio.toString()}>{`${m.nombre}${((m as any).departamento?.nombre) ? `, ${(m as any).departamento.nombre}` : ''}`}</option>)}
                  </Form.Select>
                </Form.Group>
                
                <Form.Group>
                  <Form.Label>Empresa de Transporte</Form.Label>
                  <Form.Select value={formData.id_transporte} onChange={(e) => setFormData({...formData, id_transporte: e.target.value, id_conductor: ""})} required>
                    <option value="">Seleccione transporte</option>
                    {transportes.map(t => <option key={t.id_transporte} value={t.id_transporte.toString()}>{t.nombre}</option>)}
                  </Form.Select>
                </Form.Group>
                
                <Form.Group>
                  <Form.Label>Conductor</Form.Label>
                  <Form.Select value={formData.id_conductor} onChange={(e) => setFormData({...formData, id_conductor: e.target.value})} required disabled={!formData.id_transporte}>
                    <option value="">Seleccione un conductor</option>
                    {conductores.filter(c => c.id_transporte.toString() === formData.id_transporte).map(c => <option key={c.id_conductor} value={c.id_conductor.toString()}>{c.nombre}</option>)}
                  </Form.Select>
                </Form.Group>
                
                <Form.Group>
                  <Form.Label>Tipo de Vehículo</Form.Label>
                  <Form.Select 
                    value={formData.tipo_vehiculo} 
                    onChange={(e) => setFormData({
                      ...formData, 
                      tipo_vehiculo: e.target.value,
                      id_placa_furgon: e.target.value === "Rastra" ? formData.id_placa_furgon : ""
                    })} 
                    required 
                  >
                    <option value="Camión Rígido">Camión Rígido</option>
                    <option value="Rastra">Rastra (Cabezal y Furgón)</option>
                    <option value="Pick-up">Pick-up / Vehículo Liviano</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Placa Cabezal (Tractor o Vehículo)</Form.Label>
                  <Form.Select value={formData.id_placa_cabezal} onChange={(e) => setFormData({...formData, id_placa_cabezal: e.target.value})} required>
                    <option value="">Seleccione placa</option>
                    {placasCabezal.map(p => <option key={p.id_placa_cabezal} value={p.id_placa_cabezal.toString()}>{p.placa}</option>)}
                  </Form.Select>
                </Form.Group>
                
                <Form.Group>
                  <Form.Label>Placa Furgón (Tráiler)</Form.Label>
                  <Form.Select 
                    value={formData.id_placa_furgon} 
                    onChange={(e) => setFormData({...formData, id_placa_furgon: e.target.value})} 
                    disabled={formData.tipo_vehiculo !== "Rastra"}
                  >
                    <option value="">Sin furgón</option>
                    {placasFurgon.map(p => <option key={p.id_placa_furgon} value={p.id_placa_furgon.toString()}>{p.placa}</option>)}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="md:col-span-2">
                  <Form.Label>Número de Marchamo (Opcional)</Form.Label>
                  <Form.Control value={formData.marchamo} onChange={(e) => setFormData({...formData, marchamo: e.target.value})} placeholder="Si trae sello de seguridad..." />
                </Form.Group>
              </div>
            </div>

            {/* Sección 2: Datos de la Carga */}
            <div className="space-y-4">
              <h3 className="font-bold text-neutral-900 mb-4 d-flex align-items-center gap-2 fs-6">
                <span className="bg-amber-100 text-amber-800 w-6 h-6 rounded-circle d-inline-flex align-items-center justify-center text-xs">2</span>
                Datos de la Carga (Café por Proveedor)
              </h3>
              
              {formData.detalles.map((detalle, index) => {
                const isReadOnly = detalle.is_editable === false;
                return (
                  <div key={index} className={`bg-neutral-50 p-4 rounded-xl border border-neutral-200 position-relative ${isReadOnly ? 'opacity-75' : ''} mb-3`}>
                    {index > 0 && !isReadOnly && (
                      <Button variant="link" onClick={() => removeDetalle(index)} className="position-absolute top-0 end-0 mt-2 me-2 text-danger p-1" title="Eliminar carga">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    )}
                    {isReadOnly && (
                      <div className="position-absolute top-0 end-0 mt-2 me-2">
                        <Badge bg="warning" className="text-dark">No editable (En Proceso)</Badge>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Form.Group className="md:col-span-2">
                        <Form.Label>Proveedor / Finca {index + 1}</Form.Label>
                        <Form.Select value={detalle.id_proveedor} onChange={(e) => handleDetalleChange(index, "id_proveedor", e.target.value)} required disabled={isReadOnly}>
                          <option value="">Busque y seleccione al proveedor</option>
                          {proveedores.map(p => <option key={p.id_proveedor} value={p.id_proveedor.toString()}>{p.nombre}</option>)}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Documento de Remisión</Form.Label>
                        <Form.Control value={detalle.remision} onChange={(e) => handleDetalleChange(index, "remision", e.target.value)} placeholder="No. de Guía o Remisión Física" required disabled={isReadOnly} />
                      </Form.Group>
                      <div className="d-none d-md-block"></div>
                      
                      <Form.Group>
                        <Form.Label>Cantidad de Sacos (Declarados)</Form.Label>
                        <Form.Control type="number" value={detalle.cantidad_sacos} onChange={(e) => handleDetalleChange(index, "cantidad_sacos", e.target.value)} placeholder="0" required disabled={isReadOnly} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Peso Estimado (Quintales)</Form.Label>
                        <Form.Control type="number" step="0.01" value={detalle.cantidad_qq} onChange={(e) => handleDetalleChange(index, "cantidad_qq", e.target.value)} placeholder="0.00" required disabled={isReadOnly} />
                      </Form.Group>
                      
                      <Form.Group className="md:col-span-2">
                        <Form.Label>Observaciones de esta carga</Form.Label>
                        <Form.Control value={detalle.observaciones} onChange={(e) => handleDetalleChange(index, "observaciones", e.target.value)} placeholder="Humedad estimada, daños visibles..." disabled={isReadOnly} />
                      </Form.Group>
                    </div>
                  </div>
                )
              })}

              <Button variant="outline-primary" size="sm" onClick={addDetalle} className="d-flex align-items-center gap-2">
                <Plus className="w-4 h-4" /> Añadir otra remisión a este viaje
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal} disabled={submitting}>Cancelar</Button>
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? <Loader2 className="w-4 h-4 animate-spin me-2"/> : null}
              {editingId ? "Guardar Cambios" : "Registrar Ingreso"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={isDeleteModalOpen} onHide={handleCloseDeleteModal} size="sm">
        <Modal.Header closeButton>
          <Modal.Title className="fs-6">Anular Ingreso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-neutral-600 mb-0">
            ¿Está seguro que desea anular el ingreso <span className="fw-bold text-dark">{receptionToDelete?.numero_entrada}</span>? 
            Esta acción cancelará permanentemente todas las cargas asociadas a este viaje.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal} disabled={submitting}>Cancelar</Button>
          <Button variant="danger" onClick={confirmDelete} disabled={submitting}>
            {submitting ? <Loader2 className="w-3 h-3 animate-spin me-2"/> : null} Sí, Anular
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isPrintModalOpen} onHide={handleClosePrintModal} size="lg">
        {receptionToPrint && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Imprimir Boleta de Ingreso</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <style>{`
                @media print {
                  @page { margin: 0; size: 21.59cm 13.97cm; }
                  html, body {
                    width: 21.59cm !important;
                    height: 13.97cm !important;
                    overflow: hidden !important;
                    margin: 0 !important;
                    padding: 0 !important;
                  }
                  body * { visibility: hidden; }
                  #print-area, #print-area * { visibility: visible; }
                  #print-area {
                    position: absolute;
                    left: 0; top: 0;
                    width: 21.59cm; height: 13.97cm;
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 11pt;
                    font-weight: bold;
                    color: black;
                  }
                  .print-field { position: absolute; }
                  .coord-numero { top: 1.0cm; left: 14.5cm; } 
                  .coord-fecha  { top: 1.5cm; left: 14.5cm; }
                  .coord-reimpresion { top: 2.0cm; left: 14.5cm; font-size: 14pt; border: 2px solid black; padding: 2px; }
                  .coord-transp { top: 3.0cm; left: 1.5cm; }
                  .coord-conduc { top: 3.5cm; left: 1.5cm; }
                  .coord-placas { top: 4.0cm; left: 1.5cm; }
                  .coord-origen   { top: 3.0cm; left: 11.5cm; }
                  .coord-marchamo { top: 3.5cm; left: 11.5cm; }
                  .coord-tabla  { top: 5.5cm; left: 1.5cm; width: 18cm; }
                }
              `}</style>

              <div className="bg-amber-50 p-4 rounded-xl border-2 border-dashed border-amber-200 text-neutral-800 mb-4">
                <p className="text-sm text-amber-700 mb-0 font-medium d-flex align-items-center gap-2">
                  <Printer className="w-4 h-4" /> 
                  Revise los datos. Al imprimir, el sistema usará las coordenadas para el formato preimpreso.
                </p>
              </div>
              
              <div id="print-area">
                <div className="print-field coord-numero">N° Ingreso: {receptionToPrint.numero_entrada}</div>
                <div className="print-field coord-fecha">Fecha: {new Date(receptionToPrint.fecha_entrada).toLocaleString()}</div>
                {receptionToPrint.cantidad_impresiones > 0 && (
                  <div className="print-field coord-reimpresion">*** REIMPRESIÓN ***</div>
                )}
                
                {(() => {
                  const cond = conductores.find(c => c.id_conductor === receptionToPrint.id_conductor);
                  const transp = transportes.find(t => t.id_transporte === cond?.id_transporte);
                  const cab = placasCabezal.find(p => p.id_placa_cabezal === receptionToPrint.id_placa_cabezal)?.placa;
                  const fur = receptionToPrint.id_placa_furgon ? placasFurgon.find(p => p.id_placa_furgon === receptionToPrint.id_placa_furgon)?.placa : "";
                  const muni = municipios.find(m => m.id_municipio === receptionToPrint.id_municipio);
                  const depto = muni ? (muni as any).departamento?.nombre : "";
                  const origen = muni ? (depto ? `${muni.nombre}, ${depto}` : muni.nombre) : "N/A";
                  
                  return (
                    <>
                      <div className="print-field coord-transp">Transporte: {transp?.nombre || "N/A"}</div>
                      <div className="print-field coord-conduc">Conductor: {cond?.nombre || "N/A"}</div>
                      <div className="print-field coord-placas">Placas: {cab} {fur ? ` / ${fur}` : ""}</div>
                      <div className="print-field coord-origen">Origen del café: {origen || "N/A"}</div>
                      <div className="print-field coord-marchamo">Marchamos: {receptionToPrint.marchamo || "N/A"}</div>
                    </>
                  );
                })()}

                <table className="print-field coord-tabla w-100 text-start">
                  <thead className="border-bottom border-dark">
                    <tr>
                      <th className="pb-1">Remisión</th>
                      <th className="pb-1">Proveedor</th>
                      <th className="pb-1 text-center">Sacos</th>
                      <th className="pb-1 text-end">QQ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receptionToPrint.detalles.map(d => (
                      <tr key={d.id_detalle_recepcion}>
                        <td>{d.remision}</td>
                        <td>{proveedores.find(p => p.id_proveedor === d.id_proveedor)?.nombre}</td>
                        <td className="text-center">{d.cantidad_sacos}</td>
                        <td className="text-end">{Number(d.cantidad_qq).toFixed(2)} QQ</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClosePrintModal}>Cancelar</Button>
              <Button variant="primary" onClick={confirmPrint} className="d-flex align-items-center gap-2">
                <Printer className="w-4 h-4"/> Imprimir Formato
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
