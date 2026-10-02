import { useState, useEffect } from "react";
import { Card, Button, Table, Badge, Form, InputGroup, Row, Col, Nav, Spinner, Dropdown } from "react-bootstrap";
import { Plus, Search, RefreshCw, Scale, Printer, ArrowDownCircle, ArrowUpCircle, CheckCircle2, AlertCircle, FileText, Truck, MoreVertical } from "lucide-react";
import toast from "react-hot-toast";
import Pageheader from "../../../../layout/layoutcomponent/pageheader";
import { getOtrosMovimientosApi } from "../../../../api/reception.api";
import {
  getPlacasCabezalApi,
  getPlacasFurgonApi,
  getConductoresApi,
  getProveedoresApi,
  PlacaCabezal,
  PlacaFurgon,
  Conductor,
  Proveedor,
} from "../../../../api/catalogs.api";

// Componentes
import ModalNuevoMovimiento from "../Components/ModalNuevoMovimiento";
import ModalPesajeOtroMovimiento, { TipoPesada } from "../Components/ModalPesajeOtroMovimiento";

type FilterTab = "TODOS" | "PENDIENTE_1RA" | "EN_CARGA" | "FINALIZADOS";

export default function OtrosMovimientosPage() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("TODOS");
  const [movimientos, setMovimientos] = useState<any[]>([]);

  // Catálogos para el modal
  const [placasCabezal, setPlacasCabezal] = useState<PlacaCabezal[]>([]);
  const [placasFurgon, setPlacasFurgon] = useState<PlacaFurgon[]>([]);
  const [conductores, setConductores] = useState<Conductor[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);

  // Estados de Modales
  const [showModalNuevo, setShowModalNuevo] = useState(false);
  const [modalPesajeData, setModalPesajeData] = useState<{
    show: boolean;
    tipo: TipoPesada;
    movimiento: any;
  }>({
    show: false,
    tipo: "PRIMERA_PESADA",
    movimiento: null,
  });

  const base = import.meta.env.BASE_URL;

  const handlePrintRecepcion = (idRecepcion: number) => {
    if (!idRecepcion) return;
    window.open(`${base}print/boleta-recepcion/${idRecepcion}`, "_blank");
  };

  const handlePrintTicket = (idDetalle: number, tipo: "primera" | "segunda") => {
    if (!idDetalle) return;
    window.open(`${base}print/boleta-otro-movimiento/${idDetalle}/${tipo}`, "_blank");
  };

  const handlePrintPaseSalida = (idDetalle: number) => {
    if (!idDetalle) return;
    window.open(`${base}print/pase-salida/${idDetalle}`, "_blank");
  };

  useEffect(() => {
    loadData();
    loadCatalogs();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getOtrosMovimientosApi();
      setMovimientos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los movimientos de casulla");
    } finally {
      setLoading(false);
    }
  };

  const loadCatalogs = async () => {
    try {
      const [placasC, placasF, conds, provs] = await Promise.all([
        getPlacasCabezalApi(),
        getPlacasFurgonApi(),
        getConductoresApi(),
        getProveedoresApi(),
      ]);
      setPlacasCabezal(placasC);
      setPlacasFurgon(placasF);
      setConductores(conds);
      setProveedores(provs);
    } catch (error) {
      console.error("Error cargando catálogos", error);
    }
  };

  // Clasificación por estado
  const getEstadoMovimiento = (mov: any) => {
    const det = mov.detalles && mov.detalles.length > 0 ? mov.detalles[0] : null;
    if (!det || !det.pesada_entrada) {
      return {
        key: "PENDIENTE_1RA",
        label: "Pendiente 1ra Pesada (Tara)",
        bg: "warning",
        text: "dark",
        icon: <ArrowDownCircle size={14} className="me-1" />,
      };
    }
    if (det.pesada_entrada && !det.pesada_salida) {
      return {
        key: "EN_CARGA",
        label: "En Carga (Espera 2da Pesada)",
        bg: "primary",
        text: "white",
        icon: <ArrowUpCircle size={14} className="me-1" />,
      };
    }
    return {
      key: "FINALIZADOS",
      label: "Pesaje Cerrado",
      bg: "success",
      text: "white",
      icon: <CheckCircle2 size={14} className="me-1" />,
    };
  };

  // Filtrado
  const filteredMovimientos = movimientos.filter((m) => {
    const estado = getEstadoMovimiento(m);
    if (activeTab === "PENDIENTE_1RA" && estado.key !== "PENDIENTE_1RA") return false;
    if (activeTab === "EN_CARGA" && estado.key !== "EN_CARGA") return false;
    if (activeTab === "FINALIZADOS" && estado.key !== "FINALIZADOS") return false;

    if (searchTerm.trim().length > 0) {
      const term = searchTerm.toLowerCase();
      const numEntrada = m.numero_entrada?.toLowerCase() || "";
      const placa = m.placa_cabezal?.placa?.toLowerCase() || "";
      const conductor = m.conductor?.nombre?.toLowerCase() || "";
      const cliente = m.detalles?.[0]?.proveedor?.nombre?.toLowerCase() || "";
      return numEntrada.includes(term) || placa.includes(term) || conductor.includes(term) || cliente.includes(term);
    }

    return true;
  });

  // Métricas
  const totalHoy = movimientos.length;
  const countPendiente1ra = movimientos.filter((m) => getEstadoMovimiento(m).key === "PENDIENTE_1RA").length;
  const countEnCarga = movimientos.filter((m) => getEstadoMovimiento(m).key === "EN_CARGA").length;
  const countFinalizados = movimientos.filter((m) => getEstadoMovimiento(m).key === "FINALIZADOS").length;

  const handleOpenPesaje = (mov: any, tipo: TipoPesada) => {
    setModalPesajeData({
      show: true,
      tipo,
      movimiento: mov,
    });
  };

  return (
    <div>
      <Pageheader
        title="Pesada Otros Movimientos"
        heading="Recepción"
        active="Pesada Otros Movimientos"
      />

      {/* Tarjetas de Resumen / Métricas */}
      <Row className="g-3 mb-4">
        <Col sm={6} lg={3}>
          <Card className="custom-card shadow-sm border-0">
            <Card.Body className="d-flex align-items-center justify-content-between p-3">
              <div>
                <span className="text-muted d-block small mb-1">Total Movimientos</span>
                <h4 className="fw-bold mb-0 text-dark">{totalHoy}</h4>
              </div>
              <div className="bg-primary-subtle p-3 rounded-circle text-primary">
                <Scale size={24} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={3}>
          <Card className="custom-card shadow-sm border-0 cursor-pointer" onClick={() => setActiveTab("PENDIENTE_1RA")}>
            <Card.Body className="d-flex align-items-center justify-content-between p-3">
              <div>
                <span className="text-muted d-block small mb-1">Pendiente 1ra Pesada (Tara)</span>
                <h4 className="fw-bold mb-0 text-warning">{countPendiente1ra}</h4>
              </div>
              <div className="bg-warning-subtle p-3 rounded-circle text-warning">
                <ArrowDownCircle size={24} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={3}>
          <Card className="custom-card shadow-sm border-0 cursor-pointer" onClick={() => setActiveTab("EN_CARGA")}>
            <Card.Body className="d-flex align-items-center justify-content-between p-3">
              <div>
                <span className="text-muted d-block small mb-1">En Carga (Espera Bruto)</span>
                <h4 className="fw-bold mb-0 text-primary">{countEnCarga}</h4>
              </div>
              <div className="bg-primary-subtle p-3 rounded-circle text-primary">
                <ArrowUpCircle size={24} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={3}>
          <Card className="custom-card shadow-sm border-0 cursor-pointer" onClick={() => setActiveTab("FINALIZADOS")}>
            <Card.Body className="d-flex align-items-center justify-content-between p-3">
              <div>
                <span className="text-muted d-block small mb-1">Pesajes Finalizados</span>
                <h4 className="fw-bold mb-0 text-success">{countFinalizados}</h4>
              </div>
              <div className="bg-success-subtle p-3 rounded-circle text-success">
                <CheckCircle2 size={24} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Panel Principal */}
      <Card className="custom-card shadow-sm border-0">
        <Card.Header className="d-flex flex-wrap justify-content-between align-items-center gap-3 bg-white py-3 border-bottom">
          <div>
            <h6 className="card-title mb-0 fw-bold fs-6">Control de Báscula - Pesada de Casulla</h6>
            <small className="text-muted">
              Flujo vehicular invertido: 1° Tara (Vacío) &rarr; Carga &rarr; 2° Bruto (Lleno).
            </small>
          </div>
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" size="sm" onClick={loadData} disabled={loading}>
              <RefreshCw size={15} className={`me-1 ${loading ? "spin" : ""}`} /> Actualizar
            </Button>
            <Button variant="primary" size="sm" onClick={() => setShowModalNuevo(true)}>
              <Plus size={16} className="me-1" /> Nuevo Movimiento
            </Button>
          </div>
        </Card.Header>

        <Card.Body className="p-3">
          {/* Barra de Filtros y Búsqueda */}
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
            <Nav variant="pills" activeKey={activeTab} onSelect={(k) => setActiveTab(k as FilterTab)}>
              <Nav.Item>
                <Nav.Link eventKey="TODOS" className="py-1 px-3">
                  Todos <Badge bg="light" text="dark" className="ms-1">{totalHoy}</Badge>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="PENDIENTE_1RA" className="py-1 px-3">
                  1ra Pesada (Tara) <Badge bg="warning" text="dark" className="ms-1">{countPendiente1ra}</Badge>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="EN_CARGA" className="py-1 px-3">
                  En Carga (Espera Bruto) <Badge bg="primary" className="ms-1">{countEnCarga}</Badge>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="FINALIZADOS" className="py-1 px-3">
                  Finalizados <Badge bg="success" className="ms-1">{countFinalizados}</Badge>
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <div style={{ maxWidth: "320px", width: "100%" }}>
              <InputGroup size="sm">
                <InputGroup.Text className="bg-light">
                  <Search size={15} className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Buscar por placa, conductor o N°..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </div>
          </div>

          {/* Tabla de Movimientos */}
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-muted">Cargando registros de casulla...</p>
            </div>
          ) : filteredMovimientos.length === 0 ? (
            <div className="text-center py-5 border rounded bg-light">
              <AlertCircle size={40} className="text-muted mb-2" />
              <h6>No se encontraron movimientos</h6>
              <p className="text-muted small mb-3">
                {searchTerm
                  ? "No hay resultados para el término de búsqueda ingresado."
                  : "No hay movimientos registrados en esta pestaña."}
              </p>
              <Button variant="primary" size="sm" onClick={() => setShowModalNuevo(true)}>
                <Plus size={15} className="me-1" /> Registrar Primer Movimiento
              </Button>
            </div>
          ) : (
            <div className="table-responsive" style={{ overflow: "visible", minHeight: "260px" }}>
              <Table hover className="align-middle mb-0 text-nowrap">
                <thead className="table-light">
                  <tr>
                    <th className="text-center" style={{ width: "170px" }}>Acciones</th>
                    <th>N° Movimiento</th>
                    <th>Vehículo / Placa</th>
                    <th>Conductor / Transporte</th>
                    <th>Cliente / Destino</th>
                    <th className="text-end">1ra Pesada (Tara)</th>
                    <th className="text-end">2da Pesada (Bruto)</th>
                    <th className="text-end">Peso Neto</th>
                    <th className="text-center">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMovimientos.map((m) => {
                    const det = m.detalles?.[0];
                    const estado = getEstadoMovimiento(m);
                    const tara = det?.pesada_entrada ? Number(det.pesada_entrada) : null;
                    const bruto = det?.pesada_salida ? Number(det.pesada_salida) : null;
                    const neto = det?.peso_neto ? Number(det.peso_neto) : (bruto && tara ? bruto - tara : null);

                    return (
                      <tr key={m.id_recepcion}>
                        <td className="text-center">
                          <Dropdown align="start" onClick={(e) => e.stopPropagation()}>
                            <Dropdown.Toggle
                              variant={!tara ? "warning" : (!bruto ? "success" : "outline-primary")}
                              size="sm"
                              className="d-inline-flex align-items-center gap-1 shadow-sm fw-semibold"
                              style={!tara ? { color: "#000", borderColor: "#d39e00" } : undefined}
                            >
                              <MoreVertical size={14} /> Acciones
                            </Dropdown.Toggle>

                            <Dropdown.Menu
                              renderOnMount
                              popperConfig={{ strategy: "fixed" }}
                              className="shadow-lg border-0 fs-13"
                              style={{ zIndex: 1060 }}
                            >
                              {/* 1. Acción de Pesaje */}
                              {!tara && (
                                <Dropdown.Item
                                  onClick={() => handleOpenPesaje(m, "PRIMERA_PESADA")}
                                  className="d-flex align-items-center gap-2 fw-semibold text-warning"
                                >
                                  <Scale size={15} /> Pesar 1ra Pesada (Tara)
                                </Dropdown.Item>
                              )}

                              {tara && !bruto && (
                                <Dropdown.Item
                                  onClick={() => handleOpenPesaje(m, "SEGUNDA_PESADA")}
                                  className="d-flex align-items-center gap-2 fw-semibold text-success"
                                >
                                  <Scale size={15} /> Pesar 2da Pesada (Bruto)
                                </Dropdown.Item>
                              )}

                              {bruto && (
                                <Dropdown.Item disabled className="text-muted d-flex align-items-center gap-2">
                                  <CheckCircle2 size={15} className="text-success" /> Pesaje Cerrado
                                </Dropdown.Item>
                              )}

                              <Dropdown.Divider />

                              {/* 2. Tres Opciones de Impresión */}
                              <Dropdown.Item
                                onClick={() => handlePrintRecepcion(m.id_recepcion)}
                                className="d-flex align-items-center gap-2"
                              >
                                <FileText size={15} className="text-info" /> Boleta de Ingreso / Recepción
                              </Dropdown.Item>

                              <Dropdown.Item
                                disabled={!tara || !det?.id_detalle_recepcion}
                                onClick={() => handlePrintTicket(det?.id_detalle_recepcion, bruto ? "segunda" : "primera")}
                                className="d-flex align-items-center gap-2"
                              >
                                <Printer size={15} className="text-primary" />
                                {bruto ? "Ticket (Pesada Cerrada)" : "Ticket 1ra Pesada (Tara)"}
                              </Dropdown.Item>

                              <Dropdown.Item
                                disabled={!bruto || !det?.id_detalle_recepcion}
                                onClick={() => handlePrintPaseSalida(det?.id_detalle_recepcion)}
                                className="d-flex align-items-center gap-2"
                              >
                                <Truck size={15} className="text-success" /> Pase de Salida
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td>
                          <strong className="text-primary">{m.numero_entrada}</strong>
                          <div className="text-muted small">
                            {new Date(m.fecha_entrada).toLocaleDateString()} {new Date(m.fecha_entrada).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>
                        <td>
                          <div className="fw-semibold text-dark">{m.placa_cabezal?.placa || "S/P"}</div>
                          <small className="text-muted">
                            {m.tipo_vehiculo} {m.placa_furgon ? `| Furgón: ${m.placa_furgon.placa}` : ""}
                          </small>
                        </td>
                        <td>
                          <div className="text-dark">{m.conductor?.nombre || "N/A"}</div>
                          <small className="text-muted">{m.conductor?.transporte?.nombre || "Particular"}</small>
                        </td>
                        <td>
                          <div className="text-dark">{det?.proveedor?.nombre || "General"}</div>
                          {det?.remision && <small className="text-muted">Ref: {det.remision}</small>}
                        </td>
                        <td className="text-end">
                          {tara ? (
                            <span className="fw-semibold text-dark">{tara.toLocaleString()} LB</span>
                          ) : (
                            <span className="text-muted">--</span>
                          )}
                        </td>
                        <td className="text-end">
                          {bruto ? (
                            <span className="fw-semibold text-dark">{bruto.toLocaleString()} LB</span>
                          ) : (
                            <span className="text-muted">--</span>
                          )}
                        </td>
                        <td className="text-end">
                          {neto !== null ? (
                            <div>
                              <strong className="text-success">{neto.toLocaleString()} LB</strong>
                              <div className="small text-muted">{(neto / 100).toFixed(2)} QQ</div>
                            </div>
                          ) : (
                            <span className="text-muted">--</span>
                          )}
                        </td>
                        <td className="text-center">
                          <Badge
                            bg={estado.bg}
                            text={estado.text}
                            style={{ color: estado.key === "PENDIENTE_1RA" ? "#000" : undefined }}
                            className="d-inline-flex align-items-center py-2 px-2 fw-semibold"
                          >
                            {estado.icon}
                            <span style={{ color: estado.key === "PENDIENTE_1RA" ? "#000" : undefined }}>
                              {estado.label}
                            </span>
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Modales */}
      <ModalNuevoMovimiento
        show={showModalNuevo}
        onHide={() => setShowModalNuevo(false)}
        onSuccess={loadData}
        placasCabezal={placasCabezal}
        placasFurgon={placasFurgon}
        conductores={conductores}
        proveedores={proveedores}
      />

      <ModalPesajeOtroMovimiento
        show={modalPesajeData.show}
        tipo={modalPesajeData.tipo}
        movimiento={modalPesajeData.movimiento}
        onHide={() => setModalPesajeData((prev) => ({ ...prev, show: false }))}
        onSuccess={loadData}
      />
    </div>
  );
}
