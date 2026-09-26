import { useState, useEffect } from "react";
import { FileText, Search, Printer, Download, CheckCircle, Clock } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup, Tabs, Tab, Spinner } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";
import { getPendientesLiquidarApi, getNotasPesoApi, crearNotaPesoApi, getNotaPesoByIdApi, NotaDePeso } from "../../api/nota-peso.api";
import { toast } from "react-toastify";

const colors = moduleColors.recepcion;

export default function NotaPesoPage() {
  const [activeTab, setActiveTab] = useState("pendientes");
  const [pendientes, setPendientes] = useState<any[]>([]);
  const [notasEmitidas, setNotasEmitidas] = useState<NotaDePeso[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNota, setSelectedNota] = useState<NotaDePeso | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [liquidarModal, setLiquidarModal] = useState<{
    show: boolean;
    detalle: any | null;
  }>({ show: false, detalle: null });

  // Campos editables del modal de liquidación
  const [formHumedad, setFormHumedad] = useState<number>(0);
  const [formDano, setFormDano] = useState<number>(0);
  const [formOtros, setFormOtros] = useState<number>(0);
  const [formObservaciones, setFormObservaciones] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "pendientes") {
        const data = await getPendientesLiquidarApi();
        setPendientes(data);
      } else {
        const data = await getNotasPesoApi();
        setNotasEmitidas(data);
      }
    } catch (error) {
      toast.error("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenLiquidar = (detalle: any) => {
    const humedadInicial = detalle.analisis_calidad?.[0]?.humedad != null
      ? Number(detalle.analisis_calidad[0].humedad)
      : 0;
    const danoInicial = detalle.analisis_calidad?.[0]?.dano != null
      ? Number(detalle.analisis_calidad[0].dano)
      : 0;

    setFormHumedad(humedadInicial);
    setFormDano(danoInicial);
    setFormOtros(0);
    setFormObservaciones("");
    setLiquidarModal({ show: true, detalle });
  };

  const handleLiquidar = async () => {
    if (!liquidarModal.detalle) return;
    
    setProcessing(true);
    try {
      const payload = {
        humedad: Number(formHumedad),
        dano: Number(formDano),
        otros_descuentos: Number(formOtros),
        observaciones: formObservaciones.trim() || undefined,
      };

      const nuevaNota = await crearNotaPesoApi(liquidarModal.detalle.id_detalle_recepcion, payload);
      toast.success(`Nota de Peso ${nuevaNota.numero_nota_peso} generada exitosamente`);
      setLiquidarModal({ show: false, detalle: null });
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error al generar la liquidación");
    } finally {
      setProcessing(false);
    }
  };

  const handleVerDetalle = async (id: number) => {
    try {
      const nota = await getNotaPesoByIdApi(id);
      setSelectedNota(nota);
      setShowModal(true);
    } catch (error) {
      toast.error("Error al cargar el detalle de la nota");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Cálculos en vivo para el modal de liquidación
  const calcPesoNetoLB = Number(liquidarModal.detalle?.peso_neto || 0);
  const calcPesoBrutoQQ = calcPesoNetoLB / 100;
  const calcSacos = Number(liquidarModal.detalle?.cantidad_sacos || 0);
  const taraUnitariaLB = liquidarModal.detalle?.tipo_empaque?.tara != null
    ? Number(liquidarModal.detalle.tipo_empaque.tara)
    : 0.5;
  const calcTaraQQ = (calcSacos * taraUnitariaLB) / 100;
  const calcSubtotalQQ = Math.max(0, calcPesoBrutoQQ - calcTaraQQ);

  const calcDescHumedadQQ = formHumedad > 12 ? calcSubtotalQQ * ((formHumedad - 12) / 100) : 0;
  const calcDescDanoQQ = calcSubtotalQQ * (formDano / 100);
  const calcDescOtrosQQ = calcSubtotalQQ * (formOtros / 100);
  const calcTotalDescQQ = calcDescHumedadQQ + calcDescDanoQQ + calcDescOtrosQQ;
  const calcPesoNetoFinalQQ = Math.max(0, calcSubtotalQQ - calcTotalDescQQ);

  return (
    <div className="pb-5">
      <PageHeader title="Nota de Peso" subtitle="Liquidación de entregas de café" icon={FileText} iconBg={colors.bg} iconColor={colors.icon} />

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || "pendientes")} className="mb-4 custom-tabs">
        <Tab eventKey="pendientes" title={<span><Clock className="w-4 h-4 inline mr-2" /> Pendientes de Liquidar</span>}>
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0"><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
                <Form.Control 
                  className="border-start-0 ps-0"
                  placeholder="Buscar por proveedor o remisión..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </InputGroup>
            </div>
            
            {loading ? (
              <div className="text-center p-5"><Spinner animation="border" variant="primary" /></div>
            ) : (
              <Table responsive hover className="mb-0 align-middle">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-4 py-3">Ingreso / Remisión</th>
                    <th>Proveedor</th>
                    <th>Cosecha</th>
                    <th className="text-end">Sacos</th>
                    <th className="text-end">Peso Neto (LB)</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pendientes.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-5 text-neutral-500">No hay entregas pendientes de liquidación</td></tr>
                  ) : (
                    pendientes
                      .filter(p => p.proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || p.remision.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((p) => (
                        <tr key={p.id_detalle_recepcion}>
                          <td className="px-4">
                            <div className="font-semibold text-coffee-700">{p.recepcion.numero_entrada}</div>
                            <div className="text-xs text-neutral-500">Rem: {p.remision}</div>
                          </td>
                          <td>{p.proveedor.nombre}</td>
                          <td><Badge bg="light" className="text-neutral-700 border">{p.recepcion.cosecha.cosecha}</Badge></td>
                          <td className="text-end font-medium">{p.cantidad_sacos}</td>
                          <td className="text-end font-bold text-amber-700">{Number(p.peso_neto).toLocaleString()} LB</td>
                          <td className="text-center">
                            <Button 
                              variant="primary" 
                              size="sm" 
                              className="px-3"
                              disabled={processing}
                              onClick={() => handleOpenLiquidar(p)}
                            >
                              Liquidar
                            </Button>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </Table>
            )}
          </Card>
        </Tab>
        
        <Tab eventKey="emitidas" title={<span><CheckCircle className="w-4 h-4 inline mr-2" /> Historial de Notas</span>}>
          <Card className="border-0 shadow-sm overflow-hidden">
             <div className="p-4 border-b">
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0"><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
                <Form.Control 
                  className="border-start-0 ps-0"
                  placeholder="Buscar por No. Nota o Proveedor..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </InputGroup>
            </div>

            {loading ? (
              <div className="text-center p-5"><Spinner animation="border" variant="primary" /></div>
            ) : (
              <Table responsive hover className="mb-0 align-middle">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-4 py-3">No. Nota</th>
                    <th>Fecha</th>
                    <th>Proveedor</th>
                    <th className="text-end">Peso Neto (QQ)</th>
                    <th className="text-center">Estado</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {notasEmitidas.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-5 text-neutral-500">No se han emitido notas de peso</td></tr>
                  ) : (
                    notasEmitidas
                      .filter(n => n.numero_nota_peso.toLowerCase().includes(searchTerm.toLowerCase()) || n.detalle_recepcion.proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((nota) => (
                        <tr key={nota.id_nota_peso}>
                          <td className="px-4 font-bold text-coffee-800">{nota.numero_nota_peso}</td>
                          <td>{new Date(nota.fecha_nota_peso).toLocaleDateString()}</td>
                          <td>{nota.detalle_recepcion.proveedor.nombre}</td>
                          <td className="text-end font-bold">{Number(nota.detalles[0]?.peso_neto || 0).toFixed(2)} QQ</td>
                          <td className="text-center"><Badge bg="success">EMITIDA</Badge></td>
                          <td className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Button variant="outline-secondary" size="sm" onClick={() => handleVerDetalle(nota.id_nota_peso)}>
                                <FileText className="w-4 h-4" />
                              </Button>
                              <Button variant="outline-primary" size="sm">
                                <Printer className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </Table>
            )}
          </Card>
        </Tab>
      </Tabs>

      {/* MODAL DE LIQUIDACIÓN CON PARÁMETROS EDITABLES */}
      <Modal 
        show={liquidarModal.show} 
        onHide={() => !processing && setLiquidarModal({ show: false, detalle: null })} 
        centered 
        size="lg"
      >
        <Modal.Header closeButton={!processing} className="border-bottom">
          <Modal.Title className="d-flex align-items-center gap-2 fs-16 fw-bold text-coffee-800">
            <FileText className="w-5 h-5 text-amber-600" />
            Liquidación de Entrega de Café
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {liquidarModal.detalle && (
            <div>
              {/* DATOS DE LA ENTREGA */}
              <div className="bg-light p-3 rounded mb-3 border">
                <div className="row g-2 text-sm">
                  <div className="col-sm-6">
                    <span className="text-muted small d-block">Proveedor</span>
                    <strong className="text-dark">{liquidarModal.detalle.proveedor?.nombre}</strong>
                  </div>
                  <div className="col-sm-3">
                    <span className="text-muted small d-block">Entrada / Remisión</span>
                    <strong>{liquidarModal.detalle.recepcion?.numero_entrada}</strong>
                    <span className="text-muted small ms-1">({liquidarModal.detalle.remision})</span>
                  </div>
                  <div className="col-sm-3">
                    <span className="text-muted small d-block">Cosecha</span>
                    <Badge bg="light" className="text-dark border">{liquidarModal.detalle.recepcion?.cosecha?.cosecha}</Badge>
                  </div>
                  <div className="col-sm-3">
                    <span className="text-muted small d-block">Sacos</span>
                    <strong className="text-coffee-700">{calcSacos} sacos</strong>
                  </div>
                  <div className="col-sm-3">
                    <span className="text-muted small d-block">Peso Báscula (LB)</span>
                    <strong>{calcPesoNetoLB.toLocaleString()} LB</strong>
                  </div>
                  <div className="col-sm-3">
                    <span className="text-muted small d-block">Peso Bruto (QQ)</span>
                    <strong>{calcPesoBrutoQQ.toFixed(2)} QQ</strong>
                  </div>
                  <div className="col-sm-3">
                    <span className="text-muted small d-block">Tara Sacos ({taraUnitariaLB} LB/saco)</span>
                    <strong className="text-danger">-{calcTaraQQ.toFixed(3)} QQ</strong>
                  </div>
                </div>
              </div>

              {/* CAMPOS EDITABLES */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold mb-0 text-dark fs-14">Parámetros de Calidad y Descuentos</h6>
                  <span className="badge bg-amber-50 text-amber-800 border border-amber-200 small">
                    Pre-llenado de muestra de laboratorio (editable)
                  </span>
                </div>

                <div className="row g-3">
                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        % Humedad
                      </Form.Label>
                      <InputGroup size="sm">
                        <Form.Control
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          value={formHumedad}
                          onChange={(e) => setFormHumedad(parseFloat(e.target.value) || 0)}
                          disabled={processing}
                        />
                        <InputGroup.Text>%</InputGroup.Text>
                      </InputGroup>
                      <Form.Text className="text-muted fs-11">
                        {formHumedad > 12 ? (
                          <span className="text-danger fw-semibold">
                            Desc. {(formHumedad - 12).toFixed(2)}% ({calcDescHumedadQQ.toFixed(2)} QQ)
                          </span>
                        ) : (
                          "Sin castigo (<= 12%)"
                        )}
                      </Form.Text>
                    </Form.Group>
                  </div>

                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        % Daño
                      </Form.Label>
                      <InputGroup size="sm">
                        <Form.Control
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          value={formDano}
                          onChange={(e) => setFormDano(parseFloat(e.target.value) || 0)}
                          disabled={processing}
                        />
                        <InputGroup.Text>%</InputGroup.Text>
                      </InputGroup>
                      <Form.Text className="text-muted fs-11">
                        {calcDescDanoQQ > 0 ? (
                          <span className="text-danger fw-semibold">
                            Desc: -{calcDescDanoQQ.toFixed(2)} QQ
                          </span>
                        ) : (
                          "Sin descuento"
                        )}
                      </Form.Text>
                    </Form.Group>
                  </div>

                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        % Otros Descuentos
                      </Form.Label>
                      <InputGroup size="sm">
                        <Form.Control
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          value={formOtros}
                          onChange={(e) => setFormOtros(parseFloat(e.target.value) || 0)}
                          disabled={processing}
                        />
                        <InputGroup.Text>%</InputGroup.Text>
                      </InputGroup>
                      <Form.Text className="text-muted fs-11">
                        {calcDescOtrosQQ > 0 ? (
                          <span className="text-danger fw-semibold">
                            Desc: -{calcDescOtrosQQ.toFixed(2)} QQ
                          </span>
                        ) : (
                          "Descuentos adicionales"
                        )}
                      </Form.Text>
                    </Form.Group>
                  </div>

                  <div className="col-12">
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        Observaciones (Opcional)
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Ej. Descuento acordado, observaciones de liquidación..."
                        value={formObservaciones}
                        onChange={(e) => setFormObservaciones(e.target.value)}
                        disabled={processing}
                        className="fs-13"
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>

              {/* RESUMEN DE CÁLCULO EN VIVO */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded">
                <div className="row align-items-center">
                  <div className="col-md-7 text-sm">
                    <div className="d-flex justify-content-between py-1 border-bottom border-amber-200">
                      <span className="text-muted">Subtotal antes de descuentos:</span>
                      <strong>{calcSubtotalQQ.toFixed(2)} QQ</strong>
                    </div>
                    <div className="d-flex justify-content-between py-1 border-bottom border-amber-200 text-danger">
                      <span>Total Descuentos (Humedad + Daño + Otros):</span>
                      <strong>-{calcTotalDescQQ.toFixed(2)} QQ</strong>
                    </div>
                  </div>
                  <div className="col-md-5 text-center mt-2 mt-md-0">
                    <span className="text-xs uppercase text-coffee-800 fw-bold d-block">Peso Neto Final Liquidado</span>
                    <span className="fs-22 fw-black text-coffee-800">
                      {calcPesoNetoFinalQQ.toFixed(2)} <span className="fs-14 fw-semibold">QQ</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-top">
          <Button 
            variant="light" 
            onClick={() => setLiquidarModal({ show: false, detalle: null })} 
            disabled={processing}
          >
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleLiquidar} 
            disabled={processing}
            className="d-flex align-items-center gap-2"
          >
            {processing ? (
              <>
                <Spinner animation="border" size="sm" />
                Liquidando...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Confirmar y Generar Nota
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL DE IMPRESIÓN (ESTILO @FormatoNotaPeso.png) */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" className="modal-print">
        {selectedNota && (
          <>
            <Modal.Header closeButton className="d-print-none">
              <Modal.Title>Previsualización de Nota de Peso</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
              <div className="p-5 bg-white" id="nota-peso-format">
                {/* ENCABEZADO */}
                <div className="flex justify-between items-start mb-6">
                   <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-neutral-100 rounded flex items-center justify-center text-xs text-neutral-400">LOGO</div>
                      <div>
                        <h2 className="text-xl font-bold mb-0">GLOBAL COFFEE GROUP</h2>
                        <p className="text-xs text-neutral-600 mb-0">VILLANUEVA, CORTES, HONDURAS, C.A.</p>
                        <p className="text-xs text-neutral-600 mb-0">Sucursal: {selectedNota.detalle_recepcion.recepcion.sucursal.nombre}</p>
                        <p className="text-xs text-neutral-600 mb-0">Tel: {selectedNota.detalle_recepcion.recepcion.sucursal.telefono}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <h3 className="text-lg font-bold text-neutral-800 border-b-2 border-neutral-800 pb-1 mb-2">NOTA DE PESO</h3>
                      <div className="text-sm">
                        <span className="font-bold">NP #:</span> <span className="text-red-600 font-mono text-lg">{selectedNota.numero_nota_peso.split('-')[1]}</span>
                      </div>
                   </div>
                </div>

                {/* INFO GENERAL */}
                <div className="grid grid-cols-3 gap-4 border-y border-neutral-300 py-3 mb-6 text-sm">
                  <div>
                    <span className="text-neutral-500 uppercase text-[10px] font-bold block">Cosecha</span>
                    <span className="font-medium">{selectedNota.detalle_recepcion.recepcion.cosecha.cosecha}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 uppercase text-[10px] font-bold block">Fecha</span>
                    <span className="font-medium">{new Date(selectedNota.fecha_nota_peso).toLocaleDateString('es-HN')}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 uppercase text-[10px] font-bold block">Ingreso #</span>
                    <span className="font-medium">{selectedNota.detalle_recepcion.recepcion.numero_entrada}</span>
                  </div>
                </div>

                <div className="mb-6">
                   <div className="flex justify-between border-b pb-1 mb-2">
                      <span className="text-sm font-bold">PROVEEDOR: <span className="font-normal">{selectedNota.detalle_recepcion.proveedor.nombre}</span></span>
                      <span className="text-sm font-bold">RTN/ID: <span className="font-normal">{selectedNota.detalle_recepcion.proveedor.rtn || 'N/A'}</span></span>
                   </div>
                   <div className="text-sm font-bold">REMISION #: <span className="font-normal">{selectedNota.detalle_recepcion.remision}</span></div>
                </div>

                {/* TABLA DE PRODUCTO */}
                <div className="mb-4">
                  <div className="bg-neutral-800 text-white px-3 py-1 text-xs font-bold mb-1">PRODUCTO: PERGAMINO SECO LAVADO</div>
                  <Table bordered size="sm" className="text-center text-[11px] mb-0 table-nota">
                    <thead className="bg-neutral-100">
                      <tr>
                        <th className="py-2">Dev/Sacos</th>
                        <th>Peso Bruto</th>
                        <th>Tara</th>
                        <th>Humedad</th>
                        <th>% Daño</th>
                        <th>% Otros</th>
                        <th>Peso Neto</th>
                        <th>Costo</th>
                        <th>Importe</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 font-bold">{selectedNota.detalles[0].cantidad_sacos}</td>
                        <td>{Number(selectedNota.detalles[0].peso_bruto).toFixed(2)}</td>
                        <td>{Number(selectedNota.detalles[0].tara).toFixed(3)}</td>
                        <td>{Number(selectedNota.detalles[0].porcentaje_descuento_humedad || 0).toFixed(2)}%</td>
                        <td>{Number(selectedNota.detalles[0].porcentaje_descuento_dano || 0).toFixed(2)}%</td>
                        <td>{Number(selectedNota.detalles[0].porcentaje_descuento_peso || 0).toFixed(2)}%</td>
                        <td className="font-bold bg-neutral-50">{Number(selectedNota.detalles[0].peso_neto).toFixed(2)}</td>
                        <td>*0.00*</td>
                        <td>*0.00*</td>
                      </tr>
                      <tr className="bg-neutral-50 font-bold">
                        <td colSpan={6} className="text-right py-2 pe-3 uppercase">Total Netos =&gt;</td>
                        <td className="text-coffee-800 text-[13px]">[[ {Number(selectedNota.detalles[0].peso_neto).toFixed(2)} ]]</td>
                        <td colSpan={2}></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                {/* OBSERVACIONES Y FIRMAS */}
                <div className="grid grid-cols-2 gap-10 mt-10">
                   <div className="text-[10px] text-neutral-600 italic">
                     Obs: NP#: {selectedNota.numero_nota_peso} {selectedNota.observaciones ? `- ${selectedNota.observaciones} ` : ''}- MUESTRA # {selectedNota.detalle_recepcion.analisis_calidad[0]?.numero_analisis || 'S/N'} REMISION # {selectedNota.detalle_recepcion.remision}<br/>
                     FURGON {selectedNota.detalle_recepcion.recepcion.placa_furgon?.placa || 'S/N'}
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="text-center pt-8 border-t border-neutral-400">
                        <span className="text-[10px] uppercase block">Recibido de Conformidad</span>
                      </div>
                      <div className="text-center pt-8 border-t border-neutral-400">
                        <span className="text-[10px] uppercase block">Entrega de Conformidad</span>
                      </div>
                   </div>
                </div>

                <div className="mt-10 pt-5 text-center text-neutral-300 select-none">
                  <h1 className="text-6xl font-black opacity-10 rotate-[-15deg]">ORIGINAL</h1>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="d-print-none">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
              <Button variant="outline-primary" className="flex items-center gap-2">
                <Download className="w-4 h-4" /> Descargar PDF
              </Button>
              <Button variant="primary" className="flex items-center gap-2" onClick={handlePrint}>
                <Printer className="w-4 h-4" /> Imprimir
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .modal-print, .modal-print * { visibility: visible; }
          .modal-print { position: absolute; left: 0; top: 0; width: 100%; }
          .d-print-none { display: none !important; }
        }
        .table-nota th, .table-nota td { border: 1px solid #dee2e6 !important; }
        .custom-tabs .nav-link { color: #666; font-weight: 500; }
        .custom-tabs .nav-link.active { color: #8b4513; border-bottom: 2px solid #8b4513; }
      `}</style>
    </div>
  );
}
