import { useState, useEffect, Fragment } from "react";
import { Search, Loader2, SkipForward, RotateCcw, ChevronRight, ChevronDown, AlertTriangle, FlaskConical, FlaskRound } from "lucide-react";
import Pageheader from "../../../../layout/layoutcomponent/pageheader";
import { Card, Form, InputGroup, Table, Badge, Button, Spinner, Modal, Tabs, Tab } from "react-bootstrap";
import toast from "react-hot-toast";
import { useAuth } from "../../../../auth/useAuth";
import { getExternosOmitirAnalisisApi, getExternosOmitidosApi, actualizarOmitirAnalisisApi } from "../../../../api/reception.api";

type Confirmacion = { idDetalle: number; remision: string; proveedor: string; omitirActual: boolean } | null;
type TabKey = "pendientes" | "omitidos";

export default function OmitirAnalisisPage() {
  const { hasPermission } = useAuth();
  const canOmitir = hasPermission("OMITIR_ANALISIS");

  const [activeTab, setActiveTab] = useState<TabKey>("pendientes");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [recepciones, setRecepciones] = useState<any[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [procesando, setProcesando] = useState<number | null>(null);
  const [confirmacion, setConfirmacion] = useState<Confirmacion>(null);

  useEffect(() => {
    loadData(activeTab);
    setSearchTerm("");
    setExpandedRows([]);
  }, [activeTab]);

  const loadData = async (tab: TabKey) => {
    try {
      setLoading(true);
      const data = tab === "pendientes"
        ? await getExternosOmitirAnalisisApi()
        : await getExternosOmitidosApi();
      setRecepciones(data);
    } catch {
      toast.error("Error al cargar los ingresos externos");
    } finally {
      setLoading(false);
    }
  };

  const toggleRow = (id: number) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleToggleOmitir = (d: any) => {
    setConfirmacion({
      idDetalle: d.id_detalle_recepcion,
      remision: d.remision,
      proveedor: d.proveedor?.nombre ?? "—",
      omitirActual: !!d.omitir_analisis,
    });
  };

  const handleConfirmar = async () => {
    if (!confirmacion) return;
    const { idDetalle, omitirActual } = confirmacion;
    const nuevoValor = !omitirActual;
    setConfirmacion(null);
    setProcesando(idDetalle);
    try {
      await actualizarOmitirAnalisisApi(idDetalle, nuevoValor);
      toast.success(nuevoValor ? "Análisis omitido correctamente" : "Análisis revertido — requerirá muestreo");
      await loadData(activeTab);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error al actualizar el análisis");
    } finally {
      setProcesando(null);
    }
  };

  const filtered = recepciones.filter(r => {
    const term = searchTerm.toLowerCase();
    return (
      r.numero_entrada?.toLowerCase().includes(term) ||
      r.conductor?.transporte?.nombre?.toLowerCase().includes(term) ||
      r.detalles?.some((d: any) =>
        d.remision?.toLowerCase().includes(term) ||
        d.proveedor?.nombre?.toLowerCase().includes(term)
      )
    );
  });

  const emptyMessage = activeTab === "pendientes"
    ? "No hay ingresos externos pendientes de análisis."
    : "No hay ingresos con análisis omitido.";

  const renderTabla = () => (
    <>
      <Table responsive hover className="mb-0">
        <thead>
          <tr>
            <th style={{ width: 40 }} />
            <th>No. Entrada</th>
            <th>Fecha / Hora</th>
            <th>Transporte</th>
            <th>Placas</th>
            <th>Conductor</th>
            <th className="text-center">Cargas</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="text-center py-5">
                <Loader2 className="w-5 h-5 animate-spin inline-block text-neutral-400 me-2" />
                Cargando ingresos externos...
              </td>
            </tr>
          ) : filtered.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-5 text-muted">
                {searchTerm ? "No se encontraron resultados." : emptyMessage}
              </td>
            </tr>
          ) : (
            filtered.map((r) => {
              const isExpanded = expandedRows.includes(r.id_recepcion);
              const detalles: any[] = (r.detalles || []).filter((d: any) => d.estado);
              const cabezal = r.placa_cabezal?.placa ?? "—";
              const furgon = r.placa_furgon?.placa;
              const transporteName = r.conductor?.transporte?.nombre ?? "—";
              const conductorName = r.conductor?.nombre ?? "—";

              return (
                <Fragment key={r.id_recepcion}>
                  <tr className={isExpanded ? "table-warning bg-opacity-10" : ""}>
                    <td>
                      <Button
                        variant="link"
                        size="sm"
                        className="p-1 text-neutral-500"
                        onClick={() => toggleRow(r.id_recepcion)}
                      >
                        {isExpanded
                          ? <ChevronDown className="w-5 h-5" />
                          : <ChevronRight className="w-5 h-5" />}
                      </Button>
                    </td>
                    <td className="fw-bold text-coffee-700">{r.numero_entrada}</td>
                    <td>{new Date(r.fecha_entrada).toLocaleString()}</td>
                    <td>{transporteName}</td>
                    <td>
                      <div className="text-sm">Cab: <span className="fw-medium">{cabezal}</span></div>
                      {furgon && <div className="text-sm text-muted">Fur: <span className="fw-medium">{furgon}</span></div>}
                    </td>
                    <td>{conductorName}</td>
                    <td className="text-center">
                      <Badge bg="secondary-transparent">{detalles.length}</Badge>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr>
                      <td colSpan={7} className="p-0 border-bottom">
                        <div className="px-4 py-3 bg-light bg-opacity-50">
                          <Card className="shadow-sm">
                            <Table responsive hover size="sm" className="mb-0">
                              <thead className="bg-light">
                                <tr>
                                  <th>Remisión</th>
                                  <th>Proveedor / Finca</th>
                                  <th className="text-center">Sacos</th>
                                  <th className="text-center">Estado</th>
                                  <th className="text-center">Análisis</th>
                                  <th className="text-center">Acción</th>
                                </tr>
                              </thead>
                              <tbody>
                                {detalles.map((d: any) => {
                                  const omite = !!d.omitir_analisis;
                                  const enProceso = procesando === d.id_detalle_recepcion;

                                  return (
                                    <tr key={d.id_detalle_recepcion} className={omite ? "table-success bg-opacity-25" : ""}>
                                      <td className="fw-medium">{d.remision}</td>
                                      <td>{d.proveedor?.nombre ?? "—"}</td>
                                      <td className="text-center">{d.cantidad_sacos}</td>
                                      <td className="text-center">
                                        <Badge bg={omite ? "success-transparent" : "warning-transparent"}>
                                          {d.estado_transaccion?.nombre ?? "—"}
                                        </Badge>
                                      </td>
                                      <td className="text-center">
                                        {omite ? (
                                          <Badge bg="success-transparent">Omitido</Badge>
                                        ) : (
                                          <Badge bg="secondary-transparent">Requerido</Badge>
                                        )}
                                      </td>
                                      <td className="text-center">
                                        <Button
                                          size="sm"
                                          variant={omite ? "outline-warning" : "outline-success"}
                                          className="d-inline-flex align-items-center gap-1"
                                          disabled={enProceso}
                                          onClick={() => handleToggleOmitir(d)}
                                        >
                                          {enProceso ? (
                                            <Spinner size="sm" />
                                          ) : omite ? (
                                            <><RotateCcw size={13} /> Revertir</>
                                          ) : (
                                            <><SkipForward size={13} /> Omitir análisis</>
                                          )}
                                        </Button>
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
                </Fragment>
              );
            })
          )}
        </tbody>
      </Table>

      {!loading && filtered.length > 0 && (
        <div className="px-3 py-2 border-top text-muted small">
          {filtered.length} {filtered.length === 1 ? "ingreso" : "ingresos"}
        </div>
      )}
    </>
  );

  return (
    <Fragment>
      <Pageheader
        title="Omitir Análisis de Calidad"
        heading="Recepción"
        active="Externos sin Análisis"
      />

      <Card className="custom-card mb-4">
        <Card.Body>
          <InputGroup style={{ maxWidth: "500px" }}>
            <InputGroup.Text className="bg-light border-end-0 text-muted">
              <Search className="w-4 h-4" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Buscar por ingreso, transporte, remisión o proveedor..."
              className="bg-light border-start-0 ps-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Card.Body>
      </Card>

      <Card className="custom-card">
        <Card.Body className="p-0">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => k && setActiveTab(k as TabKey)}
            className="px-4 pt-3 border-bottom-0 custom-tabs-container"
          >
            <Tab
              eventKey="pendientes"
              title={
                <div className="d-flex align-items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-primary" />
                  <span>Realizar Análisis</span>
                  {!loading && recepciones.length > 0 && activeTab === "pendientes" && (
                    <Badge bg="danger-transparent" className="rounded-pill">{recepciones.length}</Badge>
                  )}
                </div>
              }
            >
              <div className="p-0 border-top">
                {renderTabla()}
              </div>
            </Tab>

            <Tab
              eventKey="omitidos"
              title={
                <div className="d-flex align-items-center gap-2">
                  <FlaskRound className="w-4 h-4 text-success" />
                  <span>Análisis Omitidos</span>
                  {!loading && recepciones.length > 0 && activeTab === "omitidos" && (
                    <Badge bg="success-transparent" className="rounded-pill">{recepciones.length}</Badge>
                  )}
                </div>
              }
            >
              <div className="p-0 border-top">
                {renderTabla()}
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      {/* Modal de confirmación */}
      <Modal show={!!confirmacion} onHide={() => setConfirmacion(null)} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title className="fs-6 d-flex align-items-center gap-2">
            <AlertTriangle size={18} className={confirmacion?.omitirActual ? "text-warning" : "text-primary"} />
            {confirmacion?.omitirActual ? "Revertir análisis" : "Omitir análisis"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {confirmacion?.omitirActual ? (
            <p className="mb-0">
              ¿Desea <strong>revertir</strong> la omisión de la remisión{" "}
              <span className="fw-bold text-dark">{confirmacion.remision}</span> de{" "}
              <span className="fw-bold">{confirmacion.proveedor}</span>?
              <br />
              <span className="text-muted small">La carga volverá a requerir muestreo de calidad.</span>
            </p>
          ) : (
            <p className="mb-0">
              ¿Desea <strong>omitir el análisis</strong> de la remisión{" "}
              <span className="fw-bold text-dark">{confirmacion?.remision}</span> de{" "}
              <span className="fw-bold">{confirmacion?.proveedor}</span>?
              <br />
              <span className="text-muted small">La carga pasará directo a báscula sin pasar por laboratorio.</span>
            </p>
          )}
        </Modal.Body>
        <Modal.Footer className="gap-2">
          <Button variant="secondary" size="sm" onClick={() => setConfirmacion(null)}>
            Cancelar
          </Button>
          <Button
            size="sm"
            variant={confirmacion?.omitirActual ? "warning" : "success"}
            onClick={handleConfirmar}
          >
            {confirmacion?.omitirActual
              ? <><RotateCcw size={13} className="me-1" />Sí, revertir</>
              : <><SkipForward size={13} className="me-1" />Sí, omitir</>
            }
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}
