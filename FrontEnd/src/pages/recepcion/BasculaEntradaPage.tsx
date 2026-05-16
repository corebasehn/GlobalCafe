import React, { useState, useEffect } from "react";
import { Scale, Search, Loader2, Weight, Save, ChevronRight, ChevronDown, MoreVertical, Truck } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup, Dropdown, Row, Col } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";
import toast from "react-hot-toast";

// APIs
import { getPendientesBasculaApi, registrarPesadaEntradaApi, registrarPesadaSalidaApi, registrarSalidaCabezalApi, registrarEntradaCabezalApi } from "../../api/reception.api";
import { getBodegasApi, Bodega, getPlacasCabezalApi, PlacaCabezal } from "../../api/catalogs.api";
import Pageheader from "../../layout/layoutcomponent/pageheader";

const colors = moduleColors.recepcion;

export default function BasculaEntradaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [recepciones, setRecepciones] = useState<any[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [bodegas, setBodegas] = useState<Bodega[]>([]);
  const [placasCabezal, setPlacasCabezal] = useState<PlacaCabezal[]>([]);

  
  // Estado del Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"ENTRADA" | "SALIDA" | "SALIDA_CABEZAL" | "ENTRADA_CABEZAL">("ENTRADA");
  const [selectedRecepcion, setSelectedRecepcion] = useState<any | null>(null);
  const [selectedCarga, setSelectedCarga] = useState<any | null>(null);
  const [pesoInput, setPesoInput] = useState("");
  const [bodegaSearch, setBodegaSearch] = useState("");
  const [placaInput, setPlacaInput] = useState("");

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [data, bods, placas] = await Promise.all([
        getPendientesBasculaApi(),
        getBodegasApi(),
        getPlacasCabezalApi()
      ]);
      setRecepciones(data);
      setBodegas(bods);
      setPlacasCabezal(placas);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los vehículos en báscula");
    } finally {
      setLoading(false);
    }
  };

  const toggleRow = (id: number) => {
    setExpandedRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
  };

  const handleOpenModal = (recepcion: any, carga: any, mode: "ENTRADA" | "SALIDA" | "SALIDA_CABEZAL" | "ENTRADA_CABEZAL") => {
    setSelectedRecepcion(recepcion);
    setSelectedCarga(carga);
    setModalMode(mode);
    setPesoInput("");
    setBodegaSearch("");
    if (mode === "SALIDA_CABEZAL") {
      // Encontrar la placa actual: la última placa entrante si hubo cambios previos, o la placa original del viaje
      let currentCabezal = recepcion.id_placa_cabezal?.toString() || "";
      if (carga?.cambios_cabezal && carga.cambios_cabezal.length > 0) {
        const completedChanges = carga.cambios_cabezal.filter((c: any) => c.id_placa_cabezal_entrante != null);
        if (completedChanges.length > 0) {
          currentCabezal = completedChanges[completedChanges.length - 1].id_placa_cabezal_entrante.toString();
        }
      }
      setPlacaInput(currentCabezal);
    } else {
      setPlacaInput("");
    }
    setIsModalOpen(true);
  };

  const handleSubmitPeso = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCarga) return;

    const peso = Number(pesoInput);
    if (isNaN(peso) || peso <= 0) {
      toast.error("Por favor ingrese un peso válido mayor a cero.");
      return;
    }

    // Validaciones de sentido lógico de peso
    if (modalMode !== "ENTRADA" && selectedCarga.pesada_entrada && peso >= Number(selectedCarga.pesada_entrada)) {
      toast.error("El peso capturado no puede ser mayor o igual al Peso Bruto de la carga completa.");
      return;
    }

    if ((modalMode === "SALIDA_CABEZAL" || modalMode === "ENTRADA_CABEZAL") && !placaInput) {
      toast.error("Por favor, seleccione la placa del cabezal a registrar.");
      return;
    }

    try {
      setSubmitting(true);
      if (modalMode === "ENTRADA") {
        if (!bodegaSearch) {
          toast.error("Por favor, seleccione una bodega válida de la lista.");
          setSubmitting(false);
          return;
        }
        await registrarPesadaEntradaApi(selectedCarga.id_detalle_recepcion, peso, Number(bodegaSearch));
        toast.success("Peso Bruto registrado. El vehículo puede ir a descargar a bodega.");
      } else if (modalMode === "SALIDA_CABEZAL") {
        await registrarSalidaCabezalApi(selectedCarga.id_detalle_recepcion, Number(placaInput), peso);
        toast.success("Destarse de cabezal registrado. La carga queda 'Sin Cabezal'.");
      } else if (modalMode === "ENTRADA_CABEZAL") {
        await registrarEntradaCabezalApi(selectedCarga.id_detalle_recepcion, Number(placaInput), peso);
        toast.success("Nuevo cabezal enganchado. Peso Bruto corregido automáticamente.");
      } else {
        await registrarPesadaSalidaApi(selectedCarga.id_detalle_recepcion, peso);
        toast.success("Tara registrada. Pesaje completado correctamente.");
      }
      
      setIsModalOpen(false);
      loadData(); // Refrescar la tabla
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error al registrar el peso en el sistema.");
    } finally {
      setSubmitting(false);
    }
  };

  // Filtro de búsqueda
  const filteredRecepciones = recepciones.filter(r => {
    const term = searchTerm.toLowerCase();
    return (
      r.numero_entrada?.toLowerCase().includes(term) ||
      r.placa_cabezal?.placa?.toLowerCase().includes(term) ||
      r.placa_furgon?.placa?.toLowerCase().includes(term) ||
      r.detalles?.some((d: any) => d.remision?.toLowerCase().includes(term)) ||
      r.detalles?.some((d: any) => d.proveedor?.nombre?.toLowerCase().includes(term))
    );
  });

  const getBadgeVariant = (estado: string) => {
    if (estado === "Muestra Aprobada" || estado === "Pesada Abierta") return "info";
    if (estado === "Pesaje Completado" || estado === "En Bodega") return "success";
    if (estado.includes("Rechazada") || estado === "Devolución") return "danger";
    if (estado.includes("Pendiente")) return "warning";
    return "secondary";
  };

  return (
    <div>
      {/* <PageHeader title="Báscula de Entrada" subtitle="Control de Pesaje Bruto y Tara" icon={Scale} iconBg={colors.bg} iconColor={colors.icon} /> */}
      <Pageheader title="Báscula de Entrada" heading="Recepción" active="Báscula de Entrada" />
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
              <th style={{ width: '40px' }}></th>
              <th>No. Entrada</th>
              <th>Fecha / Hora</th>
              <th>Transporte</th>
              <th>Placas</th>
              <th>Conductor</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin inline-block text-neutral-400 mr-2"/> Cargando vehículos en báscula...
                </td>
              </tr>
            ) : filteredRecepciones.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-neutral-500">
                  No hay vehículos en patio en espera de pesaje.
                </td>
              </tr>
            ) : (
              filteredRecepciones.map((r) => {
                const isExpanded = expandedRows.includes(r.id_recepcion);
                const transporteName = r.conductor?.transporte?.nombre || "N/A";
                const conductorName = r.conductor?.nombre || "N/A";
                const cabezal = r.placa_cabezal?.placa || "N/A";
                const furgon = r.placa_furgon?.placa;

                // Verificar si el vehículo ya tiene alguna carga en proceso de pesaje
                const isVehicleOnScale = r.detalles?.some((d: any) => 
                  ['Pesada Abierta', 'Sin Cabezal'].includes(d.estado_transaccion?.nombre || '')
                );

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
                      <td className="font-bold text-coffee-700">{r.numero_entrada}</td>
                      <td>{new Date(r.fecha_entrada).toLocaleString()}</td>
                      <td>{transporteName}</td>
                      <td>
                        <div className="text-sm">Cab: <span className="font-medium">{cabezal}</span></div>
                        {furgon && <div className="text-sm text-neutral-500">Fur: <span className="font-medium">{furgon}</span></div>}
                      </td>
                      <td>{conductorName}</td>
                    </tr>

                    {isExpanded && (
                      <tr>
                        <td colSpan={6} className="p-0 border-bottom">
                          <div className="px-4 py-3 bg-light bg-opacity-50">
                            <Card className="shadow-sm">
                              <Table responsive hover size="sm" className="mb-0">
                                <thead className="bg-light">
                                  <tr>
                                    <th className="text-center" style={{ width: '80px' }}>Acciones</th>
                                    <th>Remisión</th>
                                    <th>Proveedor / Finca</th>
                                    <th className="text-center">Sacos</th>
                                    <th className="text-end">Pesada Entrada (Bruto)</th>
                                    <th className="text-end">Pesada Salida (Tara)</th>
                                    <th className="text-end">Cafe Neto</th>
                                    <th className="text-center">Estado</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {r.detalles.map((carga: any) => {
                                    const estadoNombre = carga.estado_transaccion?.nombre || "";
                                    const isMuestraAprobada = estadoNombre === "Muestra Aprobada";
                                    
                                    const isEntrada = isMuestraAprobada && !isVehicleOnScale;
                                    const isBloqueadoPorBascula = isMuestraAprobada && isVehicleOnScale;
                                    const isSalida = estadoNombre === "Pesada Abierta";
                                    const isSinCabezal = estadoNombre === "Sin Cabezal";
                                    const isPendiente = estadoNombre.includes("Pendiente");
                                    const isRechazada = estadoNombre.includes("Rechazada") || estadoNombre === "Devolución";
                                    const isCompletado = estadoNombre === "Pesaje Completado" || estadoNombre === "En Bodega";

                                    let rowClasses = "";
                                    if (isSalida || isSinCabezal) rowClasses = "table-primary bg-opacity-10";
                                    if (isPendiente) rowClasses = "table-warning bg-opacity-10";
                                    if (isRechazada) rowClasses = "table-danger bg-opacity-10";
                                    if (isCompletado) rowClasses = "opacity-50";

                                    return (
                                      <tr key={carga.id_detalle_recepcion} className={rowClasses}>
                                        <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                          {(isEntrada || isSalida || isSinCabezal) ? (
                                            <Dropdown onClick={(e) => e.stopPropagation()}>
                                              <Dropdown.Toggle
                                                as={Button}
                                                variant="light"
                                                size="sm"
                                                className="p-1 border-0"
                                                id={`menu-basc-${carga.id_detalle_recepcion}`}
                                                bsPrefix="btn"
                                              >
                                                <MoreVertical size={18} className="text-secondary" />
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu renderOnMount popperConfig={{ strategy: 'fixed' }}>
                                                {isEntrada && (
                                                  <Dropdown.Item onClick={() => handleOpenModal(r, carga, "ENTRADA")} className="d-flex align-items-center gap-2">
                                                    <Scale size={15} className="text-primary" /> Pesar Entrada (Bruto)
                                                  </Dropdown.Item>
                                                )}
                                                {isSalida && (
                                                  <>
                                                    <Dropdown.Item onClick={() => handleOpenModal(r, carga, "SALIDA")} className="d-flex align-items-center gap-2">
                                                      <Scale size={15} className="text-success" /> Pesar Salida (Tara)
                                                    </Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item onClick={() => handleOpenModal(r, carga, "SALIDA_CABEZAL")} className="d-flex align-items-center gap-2">
                                                      <Truck size={15} className="text-warning" /> Destarse (Salida Cabezal)
                                                    </Dropdown.Item>
                                                  </>
                                                )}
                                                {isSinCabezal && (
                                                  <Dropdown.Item onClick={() => handleOpenModal(r, carga, "ENTRADA_CABEZAL")} className="d-flex align-items-center gap-2">
                                                    <Truck size={15} className="text-primary" /> Reenganchar (Entrada Cabezal)
                                                  </Dropdown.Item>
                                                )}
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          ) : (
                                            <div className="text-center">
                                              {isPendiente && <Badge bg="warning" className="text-dark"><Loader2 className="w-3 h-3 animate-spin me-1"/> Esperando</Badge>}
                                              {isRechazada && <Badge bg="danger">Rechazada</Badge>}
                                              {isCompletado && <span className="text-xs text-muted font-bold uppercase">Procesado</span>}
                                              {isBloqueadoPorBascula && <Badge bg="warning" className="text-dark" title="Otra carga de este vehículo está en báscula">En Fila</Badge>}
                                            </div>
                                          )}
                                        </td>
                                        <td className="font-medium text-neutral-700">{carga.remision}</td>
                                        <td>{carga.proveedor?.nombre}</td>
                                        <td className="text-center">{carga.cantidad_sacos}</td>
                                        <td className="text-end font-monospace">{carga.pesada_entrada ? Number(carga.pesada_entrada).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : "---"} LB</td>
                                        <td className="text-end font-monospace">{carga.pesada_salida ? Number(carga.pesada_salida).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : "---"} LB</td>
                                        <td className="text-end font-monospace font-bold text-coffee-800">{carga.peso_neto ? Number(carga.peso_neto).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : "---"} LB</td>
                                        <td className="text-center">
                                          <Badge bg={getBadgeVariant(estadoNombre)}>
                                            {estadoNombre}
                                          </Badge>
                                        </td>
                                      </tr>
                                    );
                                  })}
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

      <Modal show={isModalOpen} onHide={handleCloseModal}>
        {selectedRecepcion && selectedCarga && (
          <Form onSubmit={handleSubmitPeso}>
            <Modal.Header closeButton>
              <Modal.Title className="fs-5">
                {modalMode === "ENTRADA" ? "Pesada de Entrada (Vehículo Lleno)" : 
                 modalMode === "SALIDA" ? "Pesada de Salida (Vehículo Vacío)" :
                 modalMode === "SALIDA_CABEZAL" ? "Destarse - Registrar Salida de Cabezal" : 
                 "Reenganchar - Registrar Entrada de Cabezal"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">

              {/* Resumen de la carga */}
              <div className="bg-light rounded border p-3 mb-4">
                <Row className="g-2 text-sm">
                  <Col xs={5} className="text-muted fw-medium">Ingreso / Remisión:</Col>
                  <Col xs={7} className="fw-bold text-end">{selectedRecepcion.numero_entrada} / {selectedCarga.remision}</Col>
                  <Col xs={5} className="text-muted fw-medium">Proveedor:</Col>
                  <Col xs={7} className="fw-semibold text-end text-truncate">{selectedCarga.proveedor?.nombre}</Col>
                  <Col xs={5} className="text-muted fw-medium">Sacos Declarados:</Col>
                  <Col xs={7} className="fw-semibold text-end">{selectedCarga.cantidad_sacos}</Col>
                </Row>
                {modalMode !== "ENTRADA" && selectedCarga.pesada_entrada && (
                  <Row className="mt-2 pt-2 border-top g-0 align-items-center text-primary">
                    <Col className="fw-semibold">Peso Bruto de Referencia:</Col>
                    <Col xs="auto" className="font-monospace fw-bold">
                      {Number(selectedCarga.pesada_entrada).toLocaleString('en-US', { minimumFractionDigits: 2 })} LB
                    </Col>
                  </Row>
                )}
              </div>

              {/* Lectura de báscula */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Lectura del Indicador de la Báscula</Form.Label>
                <InputGroup size="lg">
                  <InputGroup.Text>
                    <Weight size={20} />
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0.01"
                    autoFocus
                    required
                    value={pesoInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || Number(val) >= 0) setPesoInput(val);
                    }}
                    className="text-end font-monospace fw-bold fs-3"
                    placeholder="0.00"
                    style={{ MozAppearance: 'textfield' } as React.CSSProperties}
                    onWheel={(e) => e.currentTarget.blur()}
                  />
                  <InputGroup.Text className="fw-bold">LB</InputGroup.Text>
                </InputGroup>
              </Form.Group>

              {/* Selector de Bodega (Solo en ENTRADA) */}
              {modalMode === "ENTRADA" && (
                <Form.Group className="pt-3 border-top">
                  <Form.Label className="fw-bold">Bodega de Descarga</Form.Label>
                  <Form.Select value={bodegaSearch} onChange={(e) => setBodegaSearch(e.target.value)} required>
                    <option value="">Seleccione a qué bodega física debe dirigirse...</option>
                    {bodegas.map(b => (
                      <option key={b.id_bodega} value={b.id_bodega.toString()}>{b.nombre}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )}

              {/* Selector de Placa (Solo en CAMBIOS DE CABEZAL) */}
              {(modalMode === "SALIDA_CABEZAL" || modalMode === "ENTRADA_CABEZAL") && (
                <Form.Group className="pt-3 border-top">
                  <Form.Label className="fw-bold">
                    {modalMode === "SALIDA_CABEZAL" ? "Placa del Cabezal que SALE" : "Placa del Cabezal que ENTRA"}
                  </Form.Label>
                  <Form.Select
                    value={placaInput}
                    onChange={(e) => setPlacaInput(e.target.value)}
                    required
                    disabled={modalMode === "SALIDA_CABEZAL"}
                  >
                    <option value="">Seleccione la placa...</option>
                    {placasCabezal.map(p => (
                      <option key={p.id_placa_cabezal} value={p.id_placa_cabezal.toString()}>{p.placa}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )}

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal} disabled={submitting}>Cancelar</Button>
              <Button variant="primary" type="submit" disabled={submitting} className="flex items-center gap-2">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4"/>} Capturar Peso
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Modal>
    </div>
  );
}
