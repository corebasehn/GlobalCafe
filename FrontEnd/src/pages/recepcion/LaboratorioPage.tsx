import { useState, useEffect } from "react";
import { TestTube, Search, Beaker, Save, Loader2, Printer, MoreVertical } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/useAuth";

// APIs
import { getReceptionsApi, DetalleRecepcion } from "../../api/reception.api";
import { getProveedoresApi, getCatadoresApi, getCalidadesApi, getDefectosApi, getZarandasApi, getTazasApi } from "../../api/catalogs.api";
import { createAnalisisApi, getAnalisisPendientesApi, CreateAnalisisRequest } from "../../api/analisis.api";

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
  
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  
  // Catálogos
  const [catadores, setCatadores] = useState<any[]>([]);
  const [calidades, setCalidades] = useState<any[]>([]);
  const [defectos, setDefectos] = useState<any[]>([]);
  const [zarandas, setZarandas] = useState<any[]>([]);
  const [tazas, setTazas] = useState<any[]>([]);

  const handleCloseModal = () => setSelectedMuestra(null);
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
    setFormData({
      id_catador: "", id_calidad: "", humedad: "", dano: "", primer_rendimiento: "", segundo_rendimiento: "", observaciones: "",
      defectos: {}, zarandas: {}, tazas: {}
    });
  };

  const handlePrintClick = (muestra: MuestraPendiente) => {
    setMuestraToPrint(muestra);
    setActionMenuOpen(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMuestra) return;

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
      console.error(error);
      toast.error(error.response?.data?.message || "Error al guardar el análisis");
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
      <PageHeader title="Laboratorio" subtitle="Bandeja de Catación y Análisis Físico" icon={TestTube} iconBg={colors.bg} iconColor={colors.icon} />

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
                      <td className="text-center">
                        <div className="position-relative">
                          <Button 
                            variant="light" 
                            size="sm" 
                            className="p-1 rounded-lg"
                            onClick={(e) => { e.stopPropagation(); setActionMenuOpen(actionMenuOpen === m.id_detalle_recepcion ? null : m.id_detalle_recepcion); }}
                          >
                            <MoreVertical className="w-5 h-5 text-neutral-600" />
                          </Button>
                          {actionMenuOpen === m.id_detalle_recepcion && (
                            <Card 
                              className="position-absolute shadow-lg z-3 py-1" 
                              style={{ top: '100%', left: 0, minWidth: '180px', cursor: 'default' }}
                              onClick={e => e.stopPropagation()}
                            >
                              {hasPermission("CREAR_MUESTRA") && (
                                <Button 
                                  variant="link" 
                                  className={`w-100 text-start px-3 py-2 text-dark text-decoration-none d-flex align-items-center gap-2 ${isMuestreado ? 'hover-bg-light' : 'opacity-50 text-muted cursor-not-allowed'}`}
                                  disabled={!isMuestreado}
                                  onClick={() => { if(isMuestreado) { handleOpenModal(m); setActionMenuOpen(null); } }}
                                >
                                  <Beaker className="w-4 h-4"/> Crear Análisis
                                </Button>
                              )}
                              {hasPermission("IMPRIMIR_MUESTRA") && (
                                <Button 
                                  variant="link" 
                                  className={`w-100 text-start px-3 py-2 text-dark text-decoration-none d-flex align-items-center gap-2 ${isPendienteAprobacion ? 'hover-bg-light' : 'opacity-50 text-muted cursor-not-allowed'}`}
                                  disabled={!isPendienteAprobacion}
                                  onClick={() => { if(isPendienteAprobacion) handlePrintClick(m); }}
                                >
                                  <Printer className="w-4 h-4"/> Imprimir Boleta
                                </Button>
                              )}
                            </Card>
                          )}
                        </div>
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

      {/* Modal Masivo del Formulario de Catación */}
      <Modal show={!!selectedMuestra} onHide={handleCloseModal} size="lg">
        {selectedMuestra && (
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Ingreso de Resultados de Catación</Modal.Title>
            </Modal.Header>
            <Modal.Body className="space-y-6">
              
              {/* 1. Datos Generales */}
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                <h3 className="font-bold text-neutral-900 mb-4 border-bottom pb-2 fs-6">Información General y Rendimiento</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Form.Group>
                    <Form.Label>Catador Responsable</Form.Label>
                    <Form.Select 
                      value={formData.id_catador} 
                      onChange={(e) => setFormData({...formData, id_catador: e.target.value})} 
                      required
                    >
                      <option value="">Seleccione catador</option>
                      {catadores.map(c => <option key={c.id_catador} value={c.id_catador.toString()}>{c.nombre}</option>)}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Grado de Calidad</Form.Label>
                    <Form.Select 
                      value={formData.id_calidad} 
                      onChange={(e) => setFormData({...formData, id_calidad: e.target.value})}
                    >
                      <option value="">Seleccione calidad</option>
                      {calidades.map(c => <option key={c.id_calidad} value={c.id_calidad.toString()}>{c.nombre}</option>)}
                    </Form.Select>
                  </Form.Group>
                  <div className="d-none d-md-block"></div>
                  <Form.Group>
                    <Form.Label>Humedad (%)</Form.Label>
                    <Form.Control type="number" step="0.01" placeholder="0.00" value={formData.humedad} onChange={(e) => setFormData({...formData, humedad: e.target.value})} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Daño Total (%)</Form.Label>
                    <Form.Control type="number" step="0.01" placeholder="0.00" value={formData.dano} onChange={(e) => setFormData({...formData, dano: e.target.value})} />
                  </Form.Group>
                  <div className="d-none d-md-block"></div>
                  <Form.Group>
                    <Form.Label>Primer Rendimiento</Form.Label>
                    <Form.Control type="number" step="0.01" placeholder="0.00" value={formData.primer_rendimiento} onChange={(e) => setFormData({...formData, primer_rendimiento: e.target.value})} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Segundo Rendimiento</Form.Label>
                    <Form.Control type="number" step="0.01" placeholder="0.00" value={formData.segundo_rendimiento} onChange={(e) => setFormData({...formData, segundo_rendimiento: e.target.value})} />
                  </Form.Group>
                </div>
              </div>

              {/* 2. Defectos Físicos */}
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                <h3 className="font-bold text-neutral-900 mb-4 border-bottom pb-2 fs-6">Análisis de Defectos Físicos (Gramos / Porcentaje)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {defectos.map(def => (
                    <Form.Group key={def.id_defecto}>
                      <Form.Label className="text-truncate d-block" title={def.nombre}>{def.nombre}</Form.Label>
                      <Form.Control 
                        type="number" 
                        step="0.01" 
                        placeholder="0" 
                        value={formData.defectos[def.id_defecto] || ""} 
                        onChange={(e) => setFormData({...formData, defectos: {...formData.defectos, [def.id_defecto]: e.target.value}})} 
                      />
                    </Form.Group>
                  ))}
                </div>
              </div>

              {/* 3. Mallas / Zarandas */}
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                <h3 className="font-bold text-neutral-900 mb-4 border-bottom pb-2 fs-6">Análisis de Tamaño (Mallas / Zarandas)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {zarandas.map(zar => (
                    <Form.Group key={zar.id_zaranda}>
                      <Form.Label className="text-truncate d-block" title={zar.nombre}>{zar.nombre}</Form.Label>
                      <Form.Control 
                        type="number" 
                        step="0.01" 
                        placeholder="0" 
                        value={formData.zarandas[zar.id_zaranda] || ""} 
                        onChange={(e) => setFormData({...formData, zarandas: {...formData.zarandas, [zar.id_zaranda]: e.target.value}})} 
                      />
                    </Form.Group>
                  ))}
                </div>
              </div>

              {/* 4. Atributos de Taza */}
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                <h3 className="font-bold text-neutral-900 mb-4 border-bottom pb-2 fs-6">Catación y Atributos de Taza (Puntos)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {tazas.map(taza => (
                    <Form.Group key={taza.id_tazas}>
                      <Form.Label className="text-truncate d-block" title={taza.nombre}>{taza.nombre}</Form.Label>
                      <Form.Control 
                        type="number" 
                        step="0.01" 
                        placeholder="0" 
                        value={formData.tazas[taza.id_tazas] || ""} 
                        onChange={(e) => setFormData({...formData, tazas: {...formData.tazas, [taza.id_tazas]: e.target.value}})} 
                      />
                    </Form.Group>
                  ))}
                </div>
              </div>

              <Form.Group className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                <Form.Label className="fw-bold">Observaciones Finales del Laboratorio</Form.Label>
                <Form.Control 
                  as="textarea"
                  rows={2}
                  placeholder="Notas sobre olor, color o recomendaciones para gerencia..." 
                  value={formData.observaciones} 
                  onChange={(e) => setFormData({...formData, observaciones: e.target.value})} 
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal} disabled={submitting}>Cancelar</Button>
              <Button variant="primary" type="submit" disabled={submitting} className="flex items-center gap-2">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4"/>} Guardar Resultados
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

              <div id="print-boleta" className="p-8 border-2 border-black rounded-lg bg-white text-black">
                <div className="text-center border-b-2 border-black pb-4 mb-4">
                  <h1 className="text-2xl font-bold">GLOBAL COFFEE GROUP</h1>
                  <h2 className="text-lg uppercase mb-0">BOLETA DE MUESTRA PREVIA</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <p className="mb-0"><strong>N° Entrada:</strong> {muestraToPrint.numero_entrada}</p>
                  <p className="mb-0"><strong>N° Remisión:</strong> {muestraToPrint.remision}</p>
                  <p className="col-span-2 mb-0"><strong>Proveedor:</strong> {muestraToPrint.proveedor_nombre}</p>
                  <p className="mb-0"><strong>Fecha/Hora:</strong> {new Date(muestraToPrint.analisis.fecha_analisis).toLocaleString()}</p>
                  <p className="mb-0"><strong>Catador:</strong> {muestraToPrint.analisis.catador?.nombre || ""}</p>
                  <p className="mb-0"><strong>Humedad:</strong> {muestraToPrint.analisis.humedad}%</p>
                  <p className="mb-0"><strong>Daño:</strong> {muestraToPrint.analisis.dano}%</p>
                  <p className="mb-0"><strong>Calidad:</strong> {muestraToPrint.analisis.calidad?.nombre || "N/A"}</p>
                  <p className="mb-0"><strong>Rendimiento 1:</strong> {muestraToPrint.analisis.primer_rendimiento || "N/A"}</p>
                  <p className="mb-0"><strong>Rendimiento 2:</strong> {muestraToPrint.analisis.segundo_rendimiento || "N/A"}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-6 mb-4 text-sm">
                  <div>
                    <h3 className="font-bold border-bottom border-black mb-2 text-center pb-1">Defectos Físicos</h3>
                    <table className="w-100">
                      <tbody>
                        {muestraToPrint.analisis.analisis_defectos?.length > 0 ? muestraToPrint.analisis.analisis_defectos.map((d: any) => (
                          <tr key={d.id_analisis_defectos}><td className="py-0.5">{d.defecto?.nombre}</td><td className="py-0.5 text-end">{d.cantidad}</td></tr>
                        )) : <tr><td colSpan={2} className="text-center text-muted text-xs font-italic py-1">Sin defectos</td></tr>}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <h3 className="font-bold border-bottom border-black mb-2 text-center pb-1">Zarandas / Mallas</h3>
                    <table className="w-100">
                      <tbody>
                        {muestraToPrint.analisis.analisis_zarandas?.length > 0 ? muestraToPrint.analisis.analisis_zarandas.map((z: any) => (
                          <tr key={z.id_analisis_zarandas}><td className="py-0.5">{z.zaranda?.nombre}</td><td className="py-0.5 text-end">{z.cantidad}</td></tr>
                        )) : <tr><td colSpan={2} className="text-center text-muted text-xs font-italic py-1">Sin zarandas</td></tr>}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <h3 className="font-bold border-bottom border-black mb-2 text-center pb-1">Atributos de Taza</h3>
                    <table className="w-100">
                      <tbody>
                        {muestraToPrint.analisis.analisis_tazas?.length > 0 ? muestraToPrint.analisis.analisis_tazas.map((t: any) => (
                          <tr key={t.id_analisis_tazas}><td className="py-0.5">{t.taza?.nombre}</td><td className="py-0.5 text-end">{t.cantidad}</td></tr>
                        )) : <tr><td colSpan={2} className="text-center text-muted text-xs font-italic py-1">Sin atributos</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mb-4 text-sm">
                  <strong>Observaciones:</strong>
                  <p className="mt-1 whitespace-pre-wrap mb-0">{muestraToPrint.analisis.observaciones || "Ninguna."}</p>
                </div>

                <p className="text-center font-bold text-lg mt-6 border-top border-2 border-dashed border-black pt-4">PENDIENTE DE APROBACIÓN DE GERENCIA</p>
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
