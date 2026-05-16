import { useState, useEffect } from "react";
import { Search, Loader2, CheckCircle, RefreshCcw, XCircle, FileText, Printer } from "lucide-react";
import Pageheader from "../../layout/layoutcomponent/pageheader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import toast from "react-hot-toast";
import { useAuth } from "../../auth/useAuth";

// APIs
import { getAnalisisPendientesApi, veredictoGerenciaApi, VeredictoGerenciaRequest } from "../../api/analisis.api";

interface MuestraGerencia {
  id_analisis_calidad: number;
  numero_analisis: string;
  fecha_analisis: string;
  catador_nombre: string;
  calidad_nombre: string;
  humedad: number;
  dano: number;
  primer_rendimiento: number;
  segundo_rendimiento: number;
  observaciones_laboratorio: string;
  analisis_defectos: any[];
  analisis_zarandas: any[];
  analisis_tazas: any[];
  numero_entrada: string;
  remision: string;
  proveedor_nombre: string;
  cantidad_qq: number;
}

export default function AprobacionGerenciaPage() {
  const { hasPermission } = useAuth();
  const hasRowActions = hasPermission("APROBAR_MUESTRA");

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [muestras, setMuestras] = useState<MuestraGerencia[]>([]);
  const [selectedMuestra, setSelectedMuestra] = useState<MuestraGerencia | null>(null);

  // Estado para manejar la impresión del reporte de devolución
  const [printData, setPrintData] = useState<{muestra: MuestraGerencia, motivo: string} | null>(null);

  const [formData, setFormData] = useState<VeredictoGerenciaRequest>({
    veredicto: "APROBAR",
    observaciones: ""
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // El backend ya filtra y devuelve solo los que están en 'Muestra Previa Pendiente de Aprobacion'
      const data = await getAnalisisPendientesApi();
      
      const mapeadas: MuestraGerencia[] = data.map((ana: any) => ({
        id_analisis_calidad: ana.id_analisis_calidad,
        numero_analisis: ana.numero_analisis,
        fecha_analisis: ana.fecha_analisis,
        catador_nombre: ana.catador?.nombre || "N/A",
        calidad_nombre: ana.calidad?.nombre || "N/A",
        humedad: ana.humedad,
        dano: ana.dano,
        primer_rendimiento: ana.primer_rendimiento,
        segundo_rendimiento: ana.segundo_rendimiento,
        observaciones_laboratorio: ana.observaciones || "Ninguna",
        analisis_defectos: ana.analisis_defectos || [],
        analisis_zarandas: ana.analisis_zarandas || [],
        analisis_tazas: ana.analisis_tazas || [],
        numero_entrada: ana.detalle_recepcion?.recepcion?.numero_entrada || "N/A",
        remision: ana.detalle_recepcion?.remision || "N/A",
        proveedor_nombre: ana.detalle_recepcion?.proveedor?.nombre || "N/A",
        cantidad_qq: Number(ana.detalle_recepcion?.cantidad_qq || 0)
      }));

      setMuestras(mapeadas);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar la bandeja de aprobaciones");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEvaluation = (muestra: MuestraGerencia) => {
    setSelectedMuestra(muestra);
    setFormData({ veredicto: "APROBAR", observaciones: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMuestra) return;

    // Validación obligatoria para devoluciones
    if (formData.veredicto === "DEVOLUCION" && !formData.observaciones?.trim()) {
      toast.error("Debe especificar detalladamente el motivo de la devolución de la carga.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await veredictoGerenciaApi(selectedMuestra.id_analisis_calidad, formData);
      
      toast.success(`Muestra evaluada correctamente. Nuevo estado: ${res.estado}`);
      
      if (formData.veredicto === "DEVOLUCION") {
        setPrintData({ muestra: selectedMuestra, motivo: formData.observaciones?.trim() || "N/A"});
      }

      setSelectedMuestra(null);
      loadData();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error al registrar el veredicto");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredMuestras = muestras.filter(m => 
    m.numero_entrada.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.remision.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.proveedor_nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getVeredictoIcon = () => {
    if (formData.veredicto === "APROBAR") return <CheckCircle className="w-5 h-5 text-emerald-600"/>;
    if (formData.veredicto === "SEGUNDA_MUESTRA") return <RefreshCcw className="w-5 h-5 text-amber-600"/>;
    return <XCircle className="w-5 h-5 text-red-600"/>;
  };

  const handleCloseModal = () => setSelectedMuestra(null);
  const handleClosePrintModal = () => setPrintData(null);

  return (
    <div>
      <Pageheader title="Aprobación de Gerencia" heading="Recepción" active="Aprobación de Gerencia" />

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
              {hasRowActions && <th className="text-center">Acción</th>}
              <th>Identificador</th>
              <th>Ingreso / Remisión</th>
              <th>Proveedor</th>
              <th className="text-center">Calidad Sugerida</th>
              <th className="text-end">Volumen</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={hasRowActions ? 6 : 5} className="text-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin inline-block text-neutral-400 mr-2"/> Consultando pendientes...
                </td>
              </tr>
            ) : filteredMuestras.length === 0 ? (
              <tr>
                <td colSpan={hasRowActions ? 6 : 5} className="text-center py-8 text-neutral-500">
                  Bandeja limpia. No hay muestras pendientes de autorización.
                </td>
              </tr>
            ) : (
              filteredMuestras.map((m) => (
                <tr key={m.id_analisis_calidad}>
                  {hasRowActions && (
                    <td className="text-center">
                      <div className="d-flex justify-content-center">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Evaluar Muestra</Tooltip>}>
                          <a href="#!" className="btn btn-icon btn-sm btn-info-light rounded-pill" onClick={(e) => { e.preventDefault(); handleOpenEvaluation(m); }}>
                            <i className="fe fe-eye"></i>
                          </a>
                        </OverlayTrigger>
                      </div>
                    </td>
                  )}
                  <td>
                    <div className="flex flex-col">
                      <span className="font-bold text-coffee-700">{m.numero_analisis}</span>
                      <span className="text-xs text-neutral-500">{new Date(m.fecha_analisis).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-medium text-neutral-700">{m.numero_entrada}</span>
                      <span className="text-xs text-neutral-500">Rem: {m.remision}</span>
                    </div>
                  </td>
                  <td>{m.proveedor_nombre}</td>
                  <td className="text-center"><Badge bg="info">{m.calidad_nombre}</Badge></td>
                  <td className="text-end font-medium">{m.cantidad_qq.toFixed(2)} QQ</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      {/* Modal de Evaluación */}
      <Modal show={!!selectedMuestra} onHide={handleCloseModal} size="lg">
        {selectedMuestra && (
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Evaluación de Muestra del Laboratorio</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-3">

              {/* ── Resultados del Laboratorio ── */}
              <div className="border rounded mb-3">
                <div className="bg-light px-3 py-2 border-bottom d-flex align-items-center gap-2">
                  <FileText size={14} className="text-muted" />
                  <span className="fw-semibold" style={{ fontSize: '0.875rem' }}>Resultados del Laboratorio</span>
                </div>
                <div className="p-3">

                  {/* Métricas */}
                  <Row className="g-2 mb-3">
                    <Col xs={6} md={4}>
                      <p className="text-muted mb-0" style={{ fontSize: '0.72rem' }}>Catador</p>
                      <p className="fw-medium mb-0" style={{ fontSize: '0.85rem' }}>{selectedMuestra.catador_nombre}</p>
                    </Col>
                    <Col xs={6} md={4}>
                      <p className="text-muted mb-0" style={{ fontSize: '0.72rem' }}>Calidad Perfilada</p>
                      <Badge bg="info">{selectedMuestra.calidad_nombre}</Badge>
                    </Col>
                    <Col xs={6} md={4}>
                      <p className="text-muted mb-0" style={{ fontSize: '0.72rem' }}>Humedad</p>
                      <p className="fw-medium mb-0" style={{ fontSize: '0.85rem' }}>{selectedMuestra.humedad}%</p>
                    </Col>
                    <Col xs={6} md={4}>
                      <p className="text-muted mb-0" style={{ fontSize: '0.72rem' }}>Daño</p>
                      <p className="fw-medium mb-0" style={{ fontSize: '0.85rem' }}>{selectedMuestra.dano}%</p>
                    </Col>
                    <Col xs={6} md={4}>
                      <p className="text-muted mb-0" style={{ fontSize: '0.72rem' }}>Primer Rend.</p>
                      <p className="fw-medium mb-0" style={{ fontSize: '0.85rem' }}>{selectedMuestra.primer_rendimiento || 'N/A'}</p>
                    </Col>
                    <Col xs={6} md={4}>
                      <p className="text-muted mb-0" style={{ fontSize: '0.72rem' }}>Segundo Rend.</p>
                      <p className="fw-medium mb-0" style={{ fontSize: '0.85rem' }}>{selectedMuestra.segundo_rendimiento || 'N/A'}</p>
                    </Col>
                  </Row>

                  {/* Tablas Defectos / Zarandas / Tazas */}
                  <Row className="g-2 mb-3">
                    {[
                      { title: 'Defectos', items: selectedMuestra.analisis_defectos, keyProp: 'id_defecto', nameFn: (x: any) => x.defecto.nombre },
                      { title: 'Zarandas', items: selectedMuestra.analisis_zarandas, keyProp: 'id_zaranda', nameFn: (x: any) => x.zaranda.nombre },
                      { title: 'Atrib. Taza', items: selectedMuestra.analisis_tazas, keyProp: 'id_tazas', nameFn: (x: any) => x.taza.nombre },
                    ].map(({ title, items, keyProp, nameFn }) => (
                      <Col xs={4} key={title}>
                        <Table size="sm" bordered className="mb-0" style={{ fontSize: '0.78rem' }}>
                          <thead className="table-light">
                            <tr><th colSpan={2} className="text-center py-1">{title}</th></tr>
                          </thead>
                          <tbody>
                            {items.length
                              ? items.map((item: any) => (
                                  <tr key={item[keyProp]}>
                                    <td className="text-muted">{nameFn(item)}</td>
                                    <td className="text-end fw-medium">{item.cantidad}</td>
                                  </tr>
                                ))
                              : <tr><td colSpan={2} className="text-center fst-italic text-muted">—</td></tr>
                            }
                          </tbody>
                        </Table>
                      </Col>
                    ))}
                  </Row>

                  {/* Notas */}
                  <Form.Group>
                    <Form.Label className="text-muted mb-1" style={{ fontSize: '0.72rem' }}>Notas del Catador</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      readOnly
                      value={selectedMuestra.observaciones_laboratorio}
                      className="bg-light"
                      style={{ fontSize: '0.85rem', resize: 'none' }}
                    />
                  </Form.Group>
                </div>
              </div>

              {/* ── Veredicto de Gerencia ── */}
              <div className="border border-primary rounded">
                <div className="bg-primary bg-opacity-10 px-3 py-2 border-bottom d-flex align-items-center gap-2">
                  {getVeredictoIcon()}
                  <span className="fw-semibold" style={{ fontSize: '0.875rem' }}>Veredicto de Gerencia</span>
                </div>
                <div className="p-3">
                  <Row className="g-3">
                    <Col md={5}>
                      <Form.Group>
                        <Form.Label className="fw-medium mb-1" style={{ fontSize: '0.82rem' }}>Decisión</Form.Label>
                        <Form.Select
                          size="sm"
                          value={formData.veredicto}
                          onChange={e => setFormData({ ...formData, veredicto: e.target.value as any })}
                          required
                        >
                          <option value="APROBAR">✅ Aprobar (Autorizar Descarga)</option>
                          <option value="SEGUNDA_MUESTRA">🔄 Segunda Muestra (Regresa a Muestreo)</option>
                          <option value="DEVOLUCION">❌ Rechazar (Devolución al Productor)</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={7}>
                      <Form.Group>
                        <Form.Label className="fw-medium mb-1" style={{ fontSize: '0.82rem' }}>
                          {formData.veredicto === 'DEVOLUCION' ? 'Motivo de Devolución (Obligatorio)' : 'Observaciones de Gerencia'}
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          size="sm"
                          rows={3}
                          placeholder={formData.veredicto === 'DEVOLUCION' ? 'Especifique claramente el motivo del rechazo...' : 'Instrucciones adicionales para la bodega o el proveedor...'}
                          value={formData.observaciones}
                          onChange={e => setFormData({ ...formData, observaciones: e.target.value })}
                          required={formData.veredicto === 'DEVOLUCION'}
                          style={{ resize: 'none' }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </div>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal} disabled={submitting}>Cancelar</Button>
              <Button variant="primary" type="submit" disabled={submitting} className="flex items-center gap-2">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin"/> : getVeredictoIcon()} Confirmar Veredicto
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Modal>

      {/* Modal para Imprimir Reporte de Devolución */}
      <Modal show={!!printData} onHide={handleClosePrintModal} size="lg">
        {printData && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Reporte de Devolución Generado</Modal.Title>
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
                  #print-devolucion { 
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
                  #print-devolucion * { visibility: visible !important; }
                }
              `}</style>
              
              <div className="bg-red-50 p-4 rounded-xl border-2 border-dashed border-red-200 text-neutral-800 mb-4">
                <p className="text-sm text-red-700 mb-0 font-medium flex items-center gap-2">
                  <Printer className="w-4 h-4" /> 
                  Se ha generado el reporte de rechazo. Imprímalo como respaldo para el transportista.
                </p>
              </div>

              <div id="print-devolucion" className="p-8 border-2 border-black rounded-lg bg-white text-black">
                <div className="text-center border-b-2 border-black pb-4 mb-4">
                  <h1 className="text-2xl font-bold">GLOBAL COFFEE GROUP</h1>
                  <h2 className="text-lg uppercase mt-1 font-semibold text-red-600">REPORTE DE DEVOLUCIÓN DE CAFÉ</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <p className="mb-0"><strong>N° Ingreso:</strong> {printData.muestra.numero_entrada}</p>
                  <p className="mb-0"><strong>N° Remisión:</strong> {printData.muestra.remision}</p>
                  <p className="col-span-2 mb-0"><strong>Proveedor / Finca:</strong> {printData.muestra.proveedor_nombre}</p>
                  <p className="mb-0"><strong>Fecha/Hora Rechazo:</strong> {new Date().toLocaleString()}</p>
                  <p className="mb-0"><strong>Volumen Aprox:</strong> {printData.muestra.cantidad_qq.toFixed(2)} QQ</p>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-bold border-b border-black mb-2 text-sm">Motivo de la Devolución (Veredicto de Gerencia)</h3>
                  <p className="text-sm mt-2 whitespace-pre-wrap">{printData.motivo}</p>
                </div>

                <div className="mt-16 grid grid-cols-2 gap-8 text-center text-sm">
                  <div><div className="border-t border-black pt-2">Firma Gerencia / Catador</div></div>
                  <div><div className="border-t border-black pt-2">Firma Transportista / Productor</div></div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClosePrintModal}>Cerrar</Button>
              <Button variant="primary" onClick={() => window.print()} className="flex items-center gap-2">
                <Printer className="w-4 h-4"/> Imprimir Reporte
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
