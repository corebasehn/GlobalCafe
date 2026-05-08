import { useState, useEffect } from "react";
import { CheckSquare, Search, Eye, Loader2, CheckCircle, RefreshCcw, XCircle, FileText, Printer } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/useAuth";

// APIs
import { getAnalisisPendientesApi, veredictoGerenciaApi, VeredictoGerenciaRequest } from "../../api/analisis.api";

const colors = moduleColors.recepcion;

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
      <PageHeader title="Aprobación de Gerencia" subtitle="Evaluación y Autorización de Muestras Previas" icon={CheckSquare} iconBg={colors.bg} iconColor={colors.icon} />

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
                      <Button variant="primary" size="sm" onClick={() => handleOpenEvaluation(m)} className="flex items-center gap-1 mx-auto">
                        <Eye className="w-4 h-4"/> Evaluar
                      </Button>
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
            <Modal.Body className="space-y-6">
              
              {/* Tarjeta Resumen de Resultados */}
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                <h3 className="font-bold text-neutral-800 border-b border-neutral-200 pb-2 mb-4 flex items-center gap-2"><FileText className="w-4 h-4"/> Resultados del Laboratorio</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                  <div><p className="text-neutral-500 mb-0">Catador</p><p className="font-medium mb-0">{selectedMuestra.catador_nombre}</p></div>
                  <div><p className="text-neutral-500 mb-0">Calidad Perfilada</p><p className="font-medium text-coffee-700 mb-0">{selectedMuestra.calidad_nombre}</p></div>
                  <div><p className="text-neutral-500 mb-0">Humedad</p><p className="font-medium mb-0">{selectedMuestra.humedad}%</p></div>
                  <div><p className="text-neutral-500 mb-0">Daño</p><p className="font-medium mb-0">{selectedMuestra.dano}%</p></div>
                  <div><p className="text-neutral-500 mb-0">Primer Rend.</p><p className="font-medium mb-0">{selectedMuestra.primer_rendimiento || "N/A"}</p></div>
                  <div><p className="text-neutral-500 mb-0">Segundo Rend.</p><p className="font-medium mb-0">{selectedMuestra.segundo_rendimiento || "N/A"}</p></div>
                </div>

                {/* Tablas resumen de atributos */}
                <div className="grid grid-cols-3 gap-6 text-sm mb-4 bg-white p-3 rounded-lg border border-neutral-200">
                  <div>
                    <h4 className="font-bold text-center border-b pb-1 mb-2 text-neutral-700">Defectos</h4>
                    {selectedMuestra.analisis_defectos.length ? selectedMuestra.analisis_defectos.map(d => <div key={d.id_defecto} className="flex justify-between border-b border-neutral-100 py-0.5"><span className="text-neutral-600 truncate mr-2">{d.defecto.nombre}</span><span className="font-medium">{d.cantidad}</span></div>) : <p className="text-center text-xs text-neutral-400 italic mb-0">Ninguno</p>}
                  </div>
                  <div>
                    <h4 className="font-bold text-center border-b pb-1 mb-2 text-neutral-700">Zarandas</h4>
                    {selectedMuestra.analisis_zarandas.length ? selectedMuestra.analisis_zarandas.map(z => <div key={z.id_zaranda} className="flex justify-between border-b border-neutral-100 py-0.5"><span className="text-neutral-600 truncate mr-2">{z.zaranda.nombre}</span><span className="font-medium">{z.cantidad}</span></div>) : <p className="text-center text-xs text-neutral-400 italic mb-0">Ninguna</p>}
                  </div>
                  <div>
                    <h4 className="font-bold text-center border-b pb-1 mb-2 text-neutral-700">Atributos Taza</h4>
                    {selectedMuestra.analisis_tazas.length ? selectedMuestra.analisis_tazas.map(t => <div key={t.id_tazas} className="flex justify-between border-b border-neutral-100 py-0.5"><span className="text-neutral-600 truncate mr-2">{t.taza.nombre}</span><span className="font-medium">{t.cantidad}</span></div>) : <p className="text-center text-xs text-neutral-400 italic mb-0">Ninguno</p>}
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-neutral-500 block mb-1">Notas del Catador:</span>
                  <p className="bg-white p-2 rounded border border-neutral-200 text-neutral-700 whitespace-pre-wrap mb-0">{selectedMuestra.observaciones_laboratorio}</p>
                </div>
              </div>

              {/* Formulario de Decisión */}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">{getVeredictoIcon()} Veredicto de Gerencia</h3>
                <div className="grid grid-cols-1 gap-4">
                  <Form.Group>
                    <Form.Label>Decisión a Tomar</Form.Label>
                    <Form.Select 
                      value={formData.veredicto} 
                      onChange={e => setFormData({...formData, veredicto: e.target.value as any})} 
                      required
                    >
                      <option value="APROBAR">Aprobar Muestra (Autorizar Descarga)</option>
                      <option value="SEGUNDA_MUESTRA">Solicitar otro analisis de calidad(Regresa a Muestreo)</option>
                      <option value="DEVOLUCION">Rechazar Carga (Devolución a Productor)</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>{formData.veredicto === "DEVOLUCION" ? "Motivo de la Devolución (Obligatorio)" : "Comentarios u Observaciones de Gerencia"}</Form.Label>
                    <Form.Control 
                      as="textarea"
                      rows={2}
                      placeholder={formData.veredicto === "DEVOLUCION" ? "Especifique claramente por qué se rechaza el café para el reporte..." : "Instrucciones adicionales para la bodega o el proveedor..."} 
                      value={formData.observaciones} 
                      onChange={e => setFormData({...formData, observaciones: e.target.value})} 
                      required={formData.veredicto === "DEVOLUCION"}
                    />
                  </Form.Group>
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
