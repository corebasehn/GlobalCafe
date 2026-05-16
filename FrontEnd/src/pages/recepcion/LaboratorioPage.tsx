import { useState, useEffect } from "react";
import { TestTube, Search, Beaker, Save, Loader2, Printer, MoreVertical } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup, Dropdown, Row, Col } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/useAuth";

// APIs
import { getReceptionsApi, DetalleRecepcion } from "../../api/reception.api";
import { getProveedoresApi, getCatadoresApi, getCalidadesApi, getDefectosApi, getZarandasApi, getTazasApi } from "../../api/catalogs.api";
import { createAnalisisApi, getAnalisisPendientesApi, CreateAnalisisRequest } from "../../api/analisis.api";
import Pageheader from "../../layout/layoutcomponent/pageheader";

const colors = moduleColors.recepcion;

interface MuestraPendiente extends DetalleRecepcion {
  numero_entrada: string;
  proveedor_nombre: string;
  analisis?: any; // Añadido para la impresión
}

export default function LaboratorioPage() {
  const { hasPermission } = useAuth();
  const hasRowActions = hasPermission("CREAR_MUESTRA") || hasPermission("IMPRIMIR_MUESTRA");

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [muestras, setMuestras] = useState<MuestraPendiente[]>([]);
  const [selectedMuestra, setSelectedMuestra] = useState<MuestraPendiente | null>(null);
  const [muestraToPrint, setMuestraToPrint] = useState<MuestraPendiente | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  // Catálogos
  const [catadores, setCatadores] = useState<any[]>([]);
  const [calidades, setCalidades] = useState<any[]>([]);
  const [defectos, setDefectos] = useState<any[]>([]);
  const [zarandas, setZarandas] = useState<any[]>([]);
  const [tazas, setTazas] = useState<any[]>([]);

  const handleCloseModal = () => { setSelectedMuestra(null); setFieldErrors({}); }
  const handleClosePrintModal = () => setMuestraToPrint(null);

  // Estado del Formulario
  const [formData, setFormData] = useState({
    id_catador: "",
    id_calidad: "",
    humedad: "",
    dano: "",
    primer_rendimiento: "",
    segundo_rendimiento: "",
    observaciones: "",
    defectos: {} as Record<number, string>,
    zarandas: {} as Record<number, string>,
    tazas: {} as Record<number, string>,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [recepciones, provs, cat, cal, def, zar, taz, analisisPendientes] = await Promise.all([
        getReceptionsApi(), getProveedoresApi(), getCatadoresApi(), getCalidadesApi(), getDefectosApi(), getZarandasApi(), getTazasApi(), getAnalisisPendientesApi()
      ]);

      setCatadores(cat); setCalidades(cal); setDefectos(def); setZarandas(zar); setTazas(taz);

      const pendientes: MuestraPendiente[] = [];
      recepciones.forEach(rec => {
        if (!rec.estado) return;
        rec.detalles.forEach(det => {
          // Filtramos solo los que están "Muestreado" (La bolsa ya llegó al laboratorio físico)
          if (det.estado && det.estado_transaccion?.nombre === "Muestreado") {
            pendientes.push({
              ...det,
              numero_entrada: rec.numero_entrada,
              proveedor_nombre: provs.find(p => p.id_proveedor === det.id_proveedor)?.nombre || "N/A"
            });
          }
        });
      });

      // Añadimos las que están pendientes de aprobación de Gerencia
      analisisPendientes.forEach(ana => {
        const det = ana.detalle_recepcion;
        if (det && det.estado_transaccion?.nombre === "Muestra Previa Pendiente de Aprobacion") {
           pendientes.push({
             ...det,
             numero_entrada: det.recepcion?.numero_entrada || "N/A",
             proveedor_nombre: det.proveedor?.nombre || "N/A",
             analisis: ana
           });
        }
      });

      setMuestras(pendientes);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los datos del laboratorio");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (muestra: MuestraPendiente) => {
    setSelectedMuestra(muestra);
    setFieldErrors({});
    setFormData({
      id_catador: "", id_calidad: "", humedad: "", dano: "", primer_rendimiento: "", segundo_rendimiento: "", observaciones: "",
      defectos: {}, zarandas: {}, tazas: {}
    });
  };

  const handlePrintClick = (muestra: MuestraPendiente) => {
    setMuestraToPrint(muestra);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMuestra) return;

    // Validar campos requeridos vacíos
    const newErrors: Record<string, string> = { ...fieldErrors };
    if (!formData.id_catador) newErrors._catador = "required";
    if (!formData.id_calidad) newErrors._calidad = "required";
    if (formData.humedad === "") newErrors.humedad = "Campo requerido";
    if (formData.dano === "") newErrors.dano = "Campo requerido";
    if (formData.primer_rendimiento === "") newErrors.primer_rendimiento = "Campo requerido";
    if (formData.segundo_rendimiento === "") newErrors.segundo_rendimiento = "Campo requerido";
    setFieldErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(v => v !== "");
    if (hasErrors) { toast.error("Completa todos los campos requeridos."); return; }

    try {
      setSubmitting(true);

      // Mapeamos los objetos Record a arreglos limpios para Prisma (solo los que tengan cantidad > 0)
      const payload: CreateAnalisisRequest = {
        id_detalle_recepcion: selectedMuestra.id_detalle_recepcion,
        tipo_analisis: "Muestra Previa",
        id_catador: Number(formData.id_catador),
        id_calidad: formData.id_calidad ? Number(formData.id_calidad) : undefined,
        humedad: formData.humedad ? Number(formData.humedad) : undefined,
        dano: formData.dano ? Number(formData.dano) : undefined,
        primer_rendimiento: formData.primer_rendimiento ? Number(formData.primer_rendimiento) : undefined,
        segundo_rendimiento: formData.segundo_rendimiento ? Number(formData.segundo_rendimiento) : undefined,
        observaciones: formData.observaciones || undefined,
        defectos: Object.entries(formData.defectos).map(([id, val]) => ({ id_defecto: Number(id), cantidad: Number(val) })).filter(d => d.cantidad > 0),
        zarandas: Object.entries(formData.zarandas).map(([id, val]) => ({ id_zaranda: Number(id), cantidad: Number(val) })).filter(z => z.cantidad > 0),
        tazas: Object.entries(formData.tazas).map(([id, val]) => ({ id_tazas: Number(id), cantidad: Number(val) })).filter(t => t.cantidad > 0)
      };

      await createAnalisisApi(payload);
      toast.success("Análisis guardado exitosamente. Pasando a Gerencia.");

      setSelectedMuestra(null);
      loadData();
    } catch (error: any) {
      const serverMsg = error.response?.data?.message || error.response?.data?.prismaCode || error.message || 'Error al guardar el análisis';
      console.error('[handleSubmit error]', { status: error.response?.status, data: error.response?.data });
      toast.error(serverMsg, { duration: 10000 });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredMuestras = muestras.filter(m => 
    m.numero_entrada.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.remision.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.proveedor_nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* <PageHeader title="Laboratorio" subtitle="Bandeja de Catación y Análisis Físico" icon={TestTube} iconBg={colors.bg} iconColor={colors.icon} /> */}
    <Pageheader title="Laboratorio" heading="Recepción" active="Laboratorio" />
      <Card className="mb-6">
        <Card.Body className="p-4">
          <InputGroup>
            <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
            <Form.Control 
              placeholder="Buscar por ingreso, remisión o proveedor..." 
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
              {hasRowActions && <th className="text-center" style={{ width: '100px' }}>Acción</th>}
              <th>No. Ingreso</th>
              <th>Remisión Física</th>
              <th>Proveedor / Productor</th>
              <th className="text-end">Volumen</th>
              <th className="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={hasRowActions ? 6 : 5} className="text-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin inline-block text-neutral-400 mr-2"/> Cargando bandeja de laboratorio...
                </td>
              </tr>
            ) : filteredMuestras.length === 0 ? (
              <tr>
                <td colSpan={hasRowActions ? 6 : 5} className="text-center py-8 text-neutral-500">
                  Laboratorio limpio. No hay muestras en espera de catación.
                </td>
              </tr>
            ) : (
              filteredMuestras.map((m) => {
                const isMuestreado = m.estado_transaccion?.nombre === "Muestreado";
                const isPendienteAprobacion = m.estado_transaccion?.nombre === "Muestra Previa Pendiente de Aprobacion";
                
                return (
                  <tr key={m.id_detalle_recepcion}>
                    {hasRowActions && (
                      <td className="text-center" style={{ verticalAlign: 'middle' }}>
                        <Dropdown onClick={(e) => e.stopPropagation()}>
                          <Dropdown.Toggle
                            as={Button}
                            variant="light"
                            size="sm"
                            className="p-1 border-0"
                            id={`menu-${m.id_detalle_recepcion}`}
                            bsPrefix="btn"
                          >
                            <MoreVertical size={18} className="text-secondary" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu renderOnMount popperConfig={{ strategy: 'fixed' }}>
                            {hasPermission("CREAR_MUESTRA") && (
                              <Dropdown.Item
                                disabled={!isMuestreado}
                                onClick={() => handleOpenModal(m)}
                                className="d-flex align-items-center gap-2"
                              >
                                <Beaker size={15} /> Crear Análisis
                              </Dropdown.Item>
                            )}
                            {hasPermission("IMPRIMIR_MUESTRA") && (
                              <Dropdown.Item
                                disabled={!isPendienteAprobacion}
                                onClick={() => handlePrintClick(m)}
                                className="d-flex align-items-center gap-2"
                              >
                                <Printer size={15} /> Imprimir Boleta
                              </Dropdown.Item>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    )}
                    <td className="font-medium text-neutral-600">{m.numero_entrada}</td>
                    <td className="font-bold text-coffee-700">{m.remision}</td>
                    <td>{m.proveedor_nombre}</td>
                    <td className="text-end">{Number(m.cantidad_qq).toFixed(2)} QQ</td>
                    <td className="text-center">
                      <Badge bg={isMuestreado ? "warning" : "info"}>
                        {isMuestreado ? "EN LABORATORIO" : "ESPERANDO APROBACIÓN"}
                      </Badge>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </Table>
      </Card>

      {/* Modal Formulario de Catación */}
      <Modal show={!!selectedMuestra} onHide={handleCloseModal} size="xl" scrollable>
        {selectedMuestra && (
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton className="border-bottom">
              <div>
                <Modal.Title className="fs-5 fw-bold">Ingreso de Resultados de Catación</Modal.Title>
                <small className="text-muted">{selectedMuestra.numero_entrada} — {selectedMuestra.remision} — {selectedMuestra.proveedor_nombre}</small>
              </div>
            </Modal.Header>
            <Modal.Body className="p-4" style={{ backgroundColor: '#f8f9fa', maxHeight: '70vh', overflowY: 'auto' }}>

              {/* 1. Datos Generales */}
              <div className="bg-white rounded border p-3 mb-3">
                <p className="fw-semibold text-muted mb-3 fs-6 border-bottom pb-2">Información General y Rendimiento</p>
                <Row className="g-3">
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label className="small fw-medium">Catador Respons. <span className="text-danger">*</span></Form.Label>
                      <Form.Select size="sm" value={formData.id_catador} isInvalid={!!fieldErrors._catador} onChange={(e) => { setFormData({...formData, id_catador: e.target.value}); setFieldErrors(fe => ({...fe, _catador: ""})); }} required>
                        <option value="">Seleccione...</option>
                        {catadores.map(c => <option key={c.id_catador} value={c.id_catador.toString()}>{c.nombre}</option>)}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid" style={{ fontSize: '0.7rem' }}>Seleccione un catador</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label className="small fw-medium">Grado de Calidad <span className="text-danger">*</span></Form.Label>
                      <Form.Select size="sm" value={formData.id_calidad} isInvalid={!!fieldErrors._calidad} onChange={(e) => { setFormData({...formData, id_calidad: e.target.value}); setFieldErrors(fe => ({...fe, _calidad: ""})); }} required>
                        <option value="">Seleccione...</option>
                        {calidades.map(c => <option key={c.id_calidad} value={c.id_calidad.toString()}>{c.nombre}</option>)}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid" style={{ fontSize: '0.7rem' }}>Seleccione un grado</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label className="small fw-medium">Humedad % <span className="text-danger">*</span></Form.Label>
                      <Form.Control size="sm" type="number" step="0.01" placeholder="0.00"
                        isInvalid={!!fieldErrors.humedad}
                        value={formData.humedad}
                        onChange={(e) => {
                          const v = parseFloat(e.target.value);
                          setFormData(f => ({...f, humedad: e.target.value}));
                          if (e.target.value === "") setFieldErrors(fe => ({...fe, humedad: "Campo requerido"}));
                          else if (isNaN(v) || v < 0 || v > 100) setFieldErrors(fe => ({...fe, humedad: "Debe estar entre 0 y 100"}));
                          else setFieldErrors(fe => ({...fe, humedad: ""}));
                        }} />
                      <Form.Control.Feedback type="invalid" style={{ fontSize: '0.7rem' }}>{fieldErrors.humedad}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label className="small fw-medium">Daño Total % <span className="text-danger">*</span></Form.Label>
                      <Form.Control size="sm" type="number" step="0.01" placeholder="0.00"
                        isInvalid={!!fieldErrors.dano}
                        value={formData.dano}
                        onChange={(e) => {
                          const v = parseFloat(e.target.value);
                          setFormData(f => ({...f, dano: e.target.value}));
                          if (e.target.value === "") setFieldErrors(fe => ({...fe, dano: "Campo requerido"}));
                          else if (isNaN(v) || v < 0 || v > 100) setFieldErrors(fe => ({...fe, dano: "Debe estar entre 0 y 100"}));
                          else setFieldErrors(fe => ({...fe, dano: ""}));
                        }} />
                      <Form.Control.Feedback type="invalid" style={{ fontSize: '0.7rem' }}>{fieldErrors.dano}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label className="small fw-medium">1er Rendimiento <span className="text-danger">*</span></Form.Label>
                      <Form.Control size="sm" type="number" step="0.01" placeholder="0.00"
                        isInvalid={!!fieldErrors.primer_rendimiento}
                        value={formData.primer_rendimiento}
                        onChange={(e) => {
                          const v = parseFloat(e.target.value);
                          setFormData(f => ({...f, primer_rendimiento: e.target.value}));
                          if (e.target.value === "") setFieldErrors(fe => ({...fe, primer_rendimiento: "Campo requerido"}));
                          else if (isNaN(v) || v <= 0) setFieldErrors(fe => ({...fe, primer_rendimiento: "Debe ser mayor a 0"}));
                          else setFieldErrors(fe => ({...fe, primer_rendimiento: ""}));
                        }} />
                      <Form.Control.Feedback type="invalid" style={{ fontSize: '0.7rem' }}>{fieldErrors.primer_rendimiento}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label className="small fw-medium">2do Rendimiento <span className="text-danger">*</span></Form.Label>
                      <Form.Control size="sm" type="number" step="0.01" placeholder="0.00"
                        isInvalid={!!fieldErrors.segundo_rendimiento}
                        value={formData.segundo_rendimiento}
                        onChange={(e) => {
                          const v = parseFloat(e.target.value);
                          setFormData(f => ({...f, segundo_rendimiento: e.target.value}));
                          if (e.target.value === "") setFieldErrors(fe => ({...fe, segundo_rendimiento: "Campo requerido"}));
                          else if (isNaN(v) || v <= 0) setFieldErrors(fe => ({...fe, segundo_rendimiento: "Debe ser mayor a 0"}));
                          else setFieldErrors(fe => ({...fe, segundo_rendimiento: ""}));
                        }} />
                      <Form.Control.Feedback type="invalid" style={{ fontSize: '0.7rem' }}>{fieldErrors.segundo_rendimiento}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              {/* 2. Defectos Físicos */}
              {defectos.length > 0 && (
                <div className="bg-white rounded border p-3 mb-3">
                  <p className="fw-semibold text-muted mb-3 fs-6 border-bottom pb-2">Defectos Físicos <span className="text-muted fw-normal">(gramos)</span></p>
                  <Row className="g-2">
                    {defectos.map(def => (
                      <Col xs={6} sm={4} md={3} key={def.id_defecto}>
                        <Form.Group>
                          <Form.Label className="small text-truncate d-block mb-1" title={def.nombre}>{def.nombre}</Form.Label>
                          <Form.Control size="sm" type="number" step="0.01" placeholder="0"
                            value={formData.defectos[def.id_defecto] || ""}
                            onChange={(e) => setFormData({...formData, defectos: {...formData.defectos, [def.id_defecto]: e.target.value}})} />
                        </Form.Group>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}

              {/* 3. Mallas / Zarandas */}
              {zarandas.length > 0 && (
                <div className="bg-white rounded border p-3 mb-3">
                  <p className="fw-semibold text-muted mb-3 fs-6 border-bottom pb-2">Mallas / Zarandas <span className="text-muted fw-normal">(porcentaje)</span></p>
                  <Row className="g-2">
                    {zarandas.map(zar => (
                      <Col xs={6} sm={4} md={3} key={zar.id_zaranda}>
                        <Form.Group>
                          <Form.Label className="small text-truncate d-block mb-1" title={zar.nombre}>{zar.nombre}</Form.Label>
                          <Form.Control size="sm" type="number" step="0.01" placeholder="0"
                            value={formData.zarandas[zar.id_zaranda] || ""}
                            onChange={(e) => setFormData({...formData, zarandas: {...formData.zarandas, [zar.id_zaranda]: e.target.value}})} />
                        </Form.Group>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}

              {/* 4. Atributos de Taza */}
              {tazas.length > 0 && (
                <div className="bg-white rounded border p-3 mb-3">
                  <p className="fw-semibold text-muted mb-3 fs-6 border-bottom pb-2">Atributos de Taza <span className="text-muted fw-normal">(puntos)</span></p>
                  <Row className="g-2">
                    {tazas.map(taza => (
                      <Col xs={6} sm={4} md={3} key={taza.id_tazas}>
                        <Form.Group>
                          <Form.Label className="small text-truncate d-block mb-1" title={taza.nombre}>{taza.nombre}</Form.Label>
                          <Form.Control size="sm" type="number" step="0.01" placeholder="0"
                            value={formData.tazas[taza.id_tazas] || ""}
                            onChange={(e) => setFormData({...formData, tazas: {...formData.tazas, [taza.id_tazas]: e.target.value}})} />
                        </Form.Group>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}

              {/* 5. Observaciones */}
              <div className="bg-white rounded border p-3">
                <Form.Group>
                  <Form.Label className="small fw-semibold text-muted">Observaciones Finales del Laboratorio</Form.Label>
                  <Form.Control
                    as="textarea" rows={2} size="sm"
                    placeholder="Notas sobre olor, color o recomendaciones para gerencia..."
                    value={formData.observaciones}
                    onChange={(e) => setFormData({...formData, observaciones: e.target.value})} />
                </Form.Group>
              </div>

            </Modal.Body>
            <Modal.Footer className="border-top">
              <Button variant="outline-secondary" size="sm" onClick={handleCloseModal} disabled={submitting}>Cancelar</Button>
              <Button variant="primary" size="sm" type="submit" disabled={submitting} className="d-flex align-items-center gap-2">
                {submitting ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Guardar Resultados
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Modal>

      {/* Modal para Imprimir Boleta */}
      <Modal show={!!muestraToPrint} onHide={handleClosePrintModal} size="lg">
        {muestraToPrint && muestraToPrint.analisis && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Imprimir Boleta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <style>{`
                @media print {
                  @page { margin: 0; size: letter portrait; }
                  html, body {
                    height: 100vh !important;
                    overflow: hidden !important;
                    margin: 0 !important;
                    padding: 0 !important;
                  }
                  body * { visibility: hidden; }
                  * { transform: none !important; }
                  #print-boleta { 
                    position: fixed !important; 
                    left: 0.5cm !important; 
                    top: 0.5cm !important; 
                    margin: 0 !important;
                    padding: 1cm !important;
                    width: calc(100% - 1cm) !important;
                    visibility: visible !important;
                    font-family: sans-serif;  
                    border: none !important;
                    border: 2px solid black !important;
                    box-sizing: border-box !important;
                  }
                  #print-boleta * { visibility: visible !important; }
                }
              `}</style>
              
              <div className="bg-amber-50 p-4 rounded-xl border-2 border-dashed border-amber-200 text-neutral-800 mb-4">
                <p className="text-sm text-amber-700 mb-0 font-medium flex items-center gap-2">
                  <Printer className="w-4 h-4" /> 
                  Vista previa de la boleta a imprimir.
                </p>
              </div>

              <div id="print-boleta" style={{ fontFamily: 'Arial, sans-serif', padding: '28px', border: '2px solid black', backgroundColor: 'white', color: 'black', fontSize: '13px' }}>

                {/* Encabezado */}
                <div style={{ textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '12px', marginBottom: '16px' }}>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 2px' }}>GLOBAL COFFEE GROUP</p>
                  <p style={{ fontSize: '13px', fontWeight: '600', margin: 0, letterSpacing: '0.05em' }}>BOLETA DE MUESTRA PREVIA</p>
                </div>

                {/* Datos de la muestra — cuadrícula 2 columnas */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '6px', columnGap: '24px', marginBottom: '16px' }}>
                  <p style={{ margin: 0 }}><strong>N° Entrada:</strong> {muestraToPrint.numero_entrada}</p>
                  <p style={{ margin: 0 }}><strong>N° Remisión:</strong> {muestraToPrint.remision}</p>
                  <p style={{ margin: 0, gridColumn: 'span 2' }}><strong>Proveedor:</strong> {muestraToPrint.proveedor_nombre}</p>
                  <p style={{ margin: 0 }}><strong>Fecha/Hora:</strong> {new Date(muestraToPrint.analisis.fecha_analisis).toLocaleString()}</p>
                  <p style={{ margin: 0 }}><strong>Catador:</strong> {muestraToPrint.analisis.catador?.nombre || "—"}</p>
                  <p style={{ margin: 0 }}><strong>Humedad:</strong> {muestraToPrint.analisis.humedad}%</p>
                  <p style={{ margin: 0 }}><strong>Daño:</strong> {muestraToPrint.analisis.dano}%</p>
                  <p style={{ margin: 0 }}><strong>Calidad:</strong> {muestraToPrint.analisis.calidad?.nombre || "N/A"}</p>
                  <p style={{ margin: 0 }}><strong>Rendimiento 1:</strong> {muestraToPrint.analisis.primer_rendimiento ?? "N/A"}</p>
                  <p style={{ margin: 0 }}><strong>Rendimiento 2:</strong> {muestraToPrint.analisis.segundo_rendimiento ?? "N/A"}</p>
                </div>

                {/* Sección de 3 columnas: Defectos / Zarandas / Taza */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 16px', marginBottom: '16px' }}>
                  {/* Defectos Físicos */}
                  <div>
                    <p style={{ fontWeight: 'bold', borderBottom: '1px solid black', paddingBottom: '4px', marginBottom: '6px', textAlign: 'center', margin: '0 0 6px' }}>Defectos Físicos</p>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        {muestraToPrint.analisis.analisis_defectos?.length > 0
                          ? muestraToPrint.analisis.analisis_defectos.map((d: any) => (
                              <tr key={d.id_analisis_defectos}>
                                <td style={{ padding: '2px 0' }}>{d.defecto?.nombre}</td>
                                <td style={{ padding: '2px 0', textAlign: 'right' }}>{d.cantidad}</td>
                              </tr>
                            ))
                          : <tr><td colSpan={2} style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', padding: '4px 0' }}>Sin defectos</td></tr>
                        }
                      </tbody>
                    </table>
                  </div>

                  {/* Zarandas / Mallas */}
                  <div>
                    <p style={{ fontWeight: 'bold', borderBottom: '1px solid black', paddingBottom: '4px', marginBottom: '6px', textAlign: 'center', margin: '0 0 6px' }}>Zarandas / Mallas</p>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        {muestraToPrint.analisis.analisis_zarandas?.length > 0
                          ? muestraToPrint.analisis.analisis_zarandas.map((z: any) => (
                              <tr key={z.id_analisis_zarandas}>
                                <td style={{ padding: '2px 0' }}>{z.zaranda?.nombre}</td>
                                <td style={{ padding: '2px 0', textAlign: 'right' }}>{z.cantidad}</td>
                              </tr>
                            ))
                          : <tr><td colSpan={2} style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', padding: '4px 0' }}>Sin zarandas</td></tr>
                        }
                      </tbody>
                    </table>
                  </div>

                  {/* Atributos de Taza */}
                  <div>
                    <p style={{ fontWeight: 'bold', borderBottom: '1px solid black', paddingBottom: '4px', marginBottom: '6px', textAlign: 'center', margin: '0 0 6px' }}>Atributos de Taza</p>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        {muestraToPrint.analisis.analisis_tazas?.length > 0
                          ? muestraToPrint.analisis.analisis_tazas.map((t: any) => (
                              <tr key={t.id_analisis_tazas}>
                                <td style={{ padding: '2px 0' }}>{t.taza?.nombre}</td>
                                <td style={{ padding: '2px 0', textAlign: 'right' }}>{t.cantidad}</td>
                              </tr>
                            ))
                          : <tr><td colSpan={2} style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', padding: '4px 0' }}>Sin atributos</td></tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Observaciones */}
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontWeight: 'bold', margin: '0 0 4px' }}>Observaciones:</p>
                  <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{muestraToPrint.analisis.observaciones || "Ninguna."}</p>
                </div>

                {/* Separador punteado + pie */}
                <div style={{ borderTop: '2px dashed black', paddingTop: '12px', textAlign: 'center' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '15px', margin: 0, letterSpacing: '0.02em' }}>PENDIENTE DE APROBACIÓN DE GERENCIA</p>
                </div>

              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClosePrintModal}>Cerrar</Button>
              <Button variant="primary" onClick={() => window.print()} className="flex items-center gap-2">
                <Printer className="w-4 h-4"/> Imprimir Boleta
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
