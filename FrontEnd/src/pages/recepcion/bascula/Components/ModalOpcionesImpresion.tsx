import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Badge, Form } from "react-bootstrap";
import { Printer, Scale, Truck, CheckCircle2, FileText, XCircle, Loader2, ExternalLink, Settings } from "lucide-react";
import toast from "react-hot-toast";
import {
  imprimirMatricialPesada,
  imprimirMatricialRecepcion,
  imprimirMatricialPaseSalida,
  imprimirMatricialDevolucion,
  obtenerImpresorasDisponibles,
  guardarImpresoraConfig,
} from "../../../../api/printer.api";

export interface ModalOpcionesImpresionProps {
  show: boolean;
  onClose: () => void;
  carga: any | null;
  recepcion?: any | null;
}

function fmtPeso(val: any) {
  if (val == null || val === "" || isNaN(Number(val))) return "—";
  return Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " LB";
}

export default function ModalOpcionesImpresion({
  show,
  onClose,
  carga,
  recepcion,
}: ModalOpcionesImpresionProps) {
  const base = import.meta.env.BASE_URL;
  const [esCopia, setEsCopia] = useState(true);
  const [modoMatricial, setModoMatricial] = useState(true);
  const [imprimiendo, setImprimiendo] = useState<string | null>(null);
  const [listaImpresoras, setListaImpresoras] = useState<string[]>([]);
  const [impresoraSeleccionada, setImpresoraSeleccionada] = useState<string>("");
  const [agenteOnline, setAgenteOnline] = useState<boolean>(false);

  useEffect(() => {
    if (!show) return;
    obtenerImpresorasDisponibles().then((res) => {
      setAgenteOnline(res.online);
      setListaImpresoras(res.impresoras);
      if (res.activa) {
        setImpresoraSeleccionada(res.activa);
      }
    });
  }, [show]);

  const handleChangeImpresora = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nueva = e.target.value;
    setImpresoraSeleccionada(nueva);
    await guardarImpresoraConfig(nueva);
    toast.success(`Impresora matricial: ${nueva}`);
  };

  if (!carga) return null;

  const idDetalle = carga.id_detalle_recepcion;
  const rec = recepcion || carga.recepcion;
  const idRecepcion = rec?.id_recepcion || carga.id_recepcion;

  const noEntrada = rec?.numero_entrada ?? "—";
  const remision = carga.remision ?? "—";
  const proveedor = carga.proveedor?.nombre ?? "—";
  const tipoCafe = carga.tipo_cafe?.tipo_cafe;
  const placaCabezal = rec?.placa_cabezal?.placa ?? carga.placa_cabezal?.placa ?? "—";
  const placaFurgon = rec?.placa_furgon?.placa ?? carga.placa_furgon?.placa ?? "";
  const estadoNombre = carga.estado_transaccion?.nombre ?? "—";

  // Verificaciones de estado
  const tieneEntrada = carga.pesada_entrada != null;
  const tieneSalida = carga.pesada_salida != null;
  const esDestarse = estadoNombre === "Sin Cabezal";
  const esCerrado =
    estadoNombre === "Pesaje Completado" ||
    estadoNombre === "Pesada Cerrada" ||
    estadoNombre === "En Bodega";

  const tienePaseSalida = tieneSalida || esDestarse || esCerrado;

  // Detección de devolución directa o por sacos faltos autorizados por Gerencia
  const devFaltoDeRecepcion = rec?.detalles?.find(
    (d: any) =>
      d.remision === `${remision}-F` ||
      (d.remision?.startsWith(remision) && d.remision?.endsWith("-F"))
  );
  const devolucionData = carga.devolucion || devFaltoDeRecepcion;
  const tieneDevolucionFaltos = Boolean(devolucionData);
  const idDetalleDevolucion = devolucionData?.id_detalle_recepcion || idDetalle;

  const esDevolucion =
    estadoNombre.toLowerCase().includes("rechazada") ||
    estadoNombre.toLowerCase().includes("devoluci") ||
    carga.estado_transaccion?.nombre?.toLowerCase().includes("rechazada") ||
    carga.estado_transaccion?.nombre?.toLowerCase().includes("devoluci");

  const puedeImprimirDevolucion = esDevolucion || tieneDevolucionFaltos;

  const handlePrintBoletaRecepcion = async (forzarWeb: boolean = false) => {
    if (!idRecepcion) return;
    if (modoMatricial && !forzarWeb) {
      setImprimiendo("recepcion");
      try {
        const res = await imprimirMatricialRecepcion(idRecepcion, esCopia);
        if (res.success) {
          toast.success(`🖨️ ${res.message}`);
          return;
        }
        toast.error(res.message);
        if (res.fallbackNeeded) {
          toast("Abriendo vista previa en navegador...", { icon: "📄" });
        } else {
          return;
        }
      } finally {
        setImprimiendo(null);
      }
    }
    const copiaParam = esCopia ? "?copia=true" : "";
    window.open(`${base}print/boleta-recepcion/${idRecepcion}${copiaParam}`, "_blank");
  };

  const handlePrintBoleta = async (tipo: "primera" | "segunda", forzarWeb: boolean = false) => {
    if (!idDetalle) return;
    if (modoMatricial && !forzarWeb) {
      setImprimiendo(tipo);
      try {
        const res = await imprimirMatricialPesada(idDetalle, tipo, esCopia);
        if (res.success) {
          toast.success(`🖨️ ${res.message}`);
          return;
        }
        toast.error(res.message);
        if (res.fallbackNeeded) {
          toast("Abriendo vista previa en navegador...", { icon: "📄" });
        } else {
          return;
        }
      } finally {
        setImprimiendo(null);
      }
    }
    const copiaParam = esCopia ? "?copia=true" : "";
    window.open(`${base}print/boleta-pesada/${idDetalle}/${tipo}${copiaParam}`, "_blank");
  };

  const handlePrintPaseSalida = async (forzarWeb: boolean = false) => {
    if (!idDetalle) return;
    if (modoMatricial && !forzarWeb) {
      setImprimiendo("salida");
      try {
        const res = await imprimirMatricialPaseSalida(idDetalle);
        if (res.success) {
          toast.success(`🖨️ ${res.message}`);
          return;
        }
        toast.error(res.message);
        if (res.fallbackNeeded) {
          toast("Abriendo vista previa en navegador...", { icon: "📄" });
        } else {
          return;
        }
      } finally {
        setImprimiendo(null);
      }
    }
    window.open(`${base}print/pase-salida/${idDetalle}`, "_blank");
  };

  const handlePrintBoletaDevolucion = async (forzarWeb: boolean = false) => {
    if (!idDetalleDevolucion) return;
    if (modoMatricial && !forzarWeb) {
      setImprimiendo("devolucion");
      try {
        const res = await imprimirMatricialDevolucion(idDetalleDevolucion, esCopia);
        if (res.success) {
          toast.success(`🖨️ ${res.message}`);
          return;
        }
        toast.error(res.message);
        if (res.fallbackNeeded) {
          toast("Abriendo vista previa en navegador...", { icon: "📄" });
        } else {
          return;
        }
      } finally {
        setImprimiendo(null);
      }
    }
    const copiaParam = esCopia ? "?copia=true" : "";
    window.open(`${base}print/boleta-devolucion/${idDetalleDevolucion}${copiaParam}`, "_blank");
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      size="lg"
      centered
      style={{ zIndex: 1060 }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-6 d-flex align-items-center gap-2">
          <Printer size={18} className="text-primary" />
          <span>Opciones de Impresión / Reimpresión de Báscula</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        {/* Ficha Resumen de Carga */}
        <Card className="border bg-light bg-opacity-50 mb-4 shadow-none">
          <Card.Body className="p-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
              <div>
                <span className="text-muted small me-2">No. Entrada:</span>
                <span className="fw-bold text-coffee-700 font-monospace me-3">{noEntrada}</span>
                <span className="text-muted small me-2">Remisión:</span>
                <span className="fw-bold text-dark">{remision}</span>
              </div>
              <div>
                <span className="text-muted small me-2">Estado:</span>
                <Badge bg="secondary-transparent">{estadoNombre}</Badge>
              </div>
            </div>

            <div className="text-muted small d-flex flex-wrap gap-3">
              <div>
                <strong>Proveedor:</strong> {proveedor}
              </div>
              {tipoCafe && (
                <div>
                  <strong>Tipo Café:</strong> {tipoCafe}
                </div>
              )}
              <div>
                <strong>Cabezal:</strong> {placaCabezal}
              </div>
              {placaFurgon && (
                <div>
                  <strong>Furgón:</strong> {placaFurgon}
                </div>
              )}
            </div>
          </Card.Body>
        </Card>

        {/* Toggles para modo Matricial, selector de impresora y marca de COPIA */}
        <div className="bg-light p-2 rounded mb-3 border d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <Form.Check
              type="switch"
              id="switch-matricial-modal"
              label={
                <span className="small fw-bold text-success d-flex align-items-center gap-1">
                  🖨️ Impresión Matricial Directa
                </span>
              }
              checked={modoMatricial}
              onChange={(e) => setModoMatricial(e.target.checked)}
            />

            {modoMatricial && agenteOnline && listaImpresoras.length > 0 && (
              <div className="d-flex align-items-center gap-1">
                <span className="text-muted small">Impresora:</span>
                <Form.Select
                  size="sm"
                  style={{ width: "auto", minWidth: "170px", maxWidth: "250px", fontSize: "0.82rem" }}
                  value={impresoraSeleccionada}
                  onChange={handleChangeImpresora}
                >
                  {listaImpresoras.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </Form.Select>
              </div>
            )}

            {modoMatricial && !agenteOnline && (
              <span className="badge bg-warning text-dark small" title="El agente local no está activo en 127.0.0.1:4000">
                Agente matricial local no detectado
              </span>
            )}
          </div>

          <Form.Check
            type="switch"
            id="switch-copia-modal"
            label={<span className="small text-muted">Imprimir con marca "COPIA"</span>}
            checked={esCopia}
            onChange={(e) => setEsCopia(e.target.checked)}
          />
        </div>

        {/* Listado Ordenado de Impresiones */}
        <div className="d-flex flex-column gap-3">
          
          {/* 1. Boleta de Recepción / Remisión (PRIMERA EN EL ORDEN) */}
          <Card className="border border-info-subtle">
            <Card.Body className="p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="p-2 rounded-circle bg-info bg-opacity-10 text-info d-flex align-items-center justify-content-center"
                  style={{ width: "42px", height: "42px" }}
                >
                  <FileText size={20} />
                </div>
                <div>
                  <div className="fw-bold text-dark d-flex align-items-center gap-2">
                    Boleta de Recepción / Remisión
                    <Badge bg="info-transparent">Ingreso Portería</Badge>
                  </div>
                  <div className="text-muted small mt-1">
                    Comprobante de ingreso en portería con todas las remisiones declaradas y datos del transporte.
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <Button
                  variant="outline-info"
                  size="sm"
                  className="d-flex align-items-center gap-1"
                  disabled={!idRecepcion || imprimiendo === "recepcion"}
                  onClick={() => handlePrintBoletaRecepcion(false)}
                >
                  {imprimiendo === "recepcion" ? (
                    <><Loader2 size={14} className="spinner-border spinner-border-sm" /> Enviando...</>
                  ) : (
                    <><Printer size={14} /> Imprimir Remisión</>
                  )}
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  title="Abrir vista previa web en el navegador"
                  disabled={!idRecepcion}
                  onClick={() => handlePrintBoletaRecepcion(true)}
                >
                  <ExternalLink size={13} />
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* 2. Boleta de 1ª Pesada (Peso Bruto) */}
          <Card
            className={`border transition-all ${
              tieneEntrada ? "border-primary-subtle" : "border-muted opacity-60"
            }`}
          >
            <Card.Body className="p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="p-2 rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center"
                  style={{ width: "42px", height: "42px" }}
                >
                  <Scale size={20} />
                </div>
                <div>
                  <div className="fw-bold text-dark d-flex align-items-center gap-2">
                    Boleta de 1ª Pesada (Peso Bruto)
                    {tieneEntrada ? (
                      <Badge bg="primary-transparent">Disponible</Badge>
                    ) : (
                      <Badge bg="secondary-transparent">Sin Registrar</Badge>
                    )}
                  </div>
                  <div className="text-muted small mt-1">
                    {tieneEntrada ? (
                      <>
                        Peso Bruto: <strong className="text-dark font-monospace">{fmtPeso(carga.pesada_entrada)}</strong>
                        {carga.bodega?.nombre && <span className="ms-2">| Bodega: {carga.bodega.nombre}</span>}
                      </>
                    ) : (
                      "Pendiente de registrar peso bruto de entrada en báscula."
                    )}
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="d-flex align-items-center gap-1"
                  disabled={!tieneEntrada || imprimiendo === "primera"}
                  onClick={() => handlePrintBoleta("primera", false)}
                >
                  {imprimiendo === "primera" ? (
                    <><Loader2 size={14} className="spinner-border spinner-border-sm" /> Enviando...</>
                  ) : (
                    <><Printer size={14} /> Imprimir 1ª Pesada</>
                  )}
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  title="Abrir vista previa web en el navegador"
                  disabled={!tieneEntrada}
                  onClick={() => handlePrintBoleta("primera", true)}
                >
                  <ExternalLink size={13} />
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* 3. Boleta de Segunda Pesada (Tara y Neto) */}
          <Card
            className={`border transition-all ${
              tieneSalida ? "border-success-subtle" : "border-muted opacity-60"
            }`}
          >
            <Card.Body className="p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="p-2 rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center"
                  style={{ width: "42px", height: "42px" }}
                >
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="fw-bold text-dark d-flex align-items-center gap-2">
                    Boleta de 2ª Pesada (Tara y Neto)
                    {tieneSalida ? (
                      <Badge bg="success-transparent">Pesada Cerrada</Badge>
                    ) : (
                      <Badge bg="warning-transparent">Pendiente de Salida</Badge>
                    )}
                  </div>
                  <div className="text-muted small mt-1">
                    {tieneSalida ? (
                      <>
                        Tara: <strong className="text-dark font-monospace">{fmtPeso(carga.pesada_salida)}</strong>
                        <span className="mx-2">|</span>
                        Neto: <strong className="text-success font-monospace">{fmtPeso(carga.peso_neto)}</strong>
                        {carga.cantidad_sacos != null && (
                          <span className="ms-2">({carga.cantidad_sacos} sacos)</span>
                        )}
                      </>
                    ) : (
                      "Aún no se ha registrado la pesada de salida (tara) de este vehículo."
                    )}
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <Button
                  variant="outline-success"
                  size="sm"
                  className="d-flex align-items-center gap-1"
                  disabled={!tieneSalida || imprimiendo === "segunda"}
                  onClick={() => handlePrintBoleta("segunda", false)}
                >
                  {imprimiendo === "segunda" ? (
                    <><Loader2 size={14} className="spinner-border spinner-border-sm" /> Enviando...</>
                  ) : (
                    <><Printer size={14} /> Imprimir 2ª Pesada</>
                  )}
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  title="Abrir vista previa web en el navegador"
                  disabled={!tieneSalida}
                  onClick={() => handlePrintBoleta("segunda", true)}
                >
                  <ExternalLink size={13} />
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* 4. Pase de Salida del Vehículo */}
          <Card
            className={`border transition-all ${
              tienePaseSalida ? "border-warning-subtle" : "border-muted opacity-60"
            }`}
          >
            <Card.Body className="p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="p-2 rounded-circle bg-warning bg-opacity-10 text-warning d-flex align-items-center justify-content-center"
                  style={{ width: "42px", height: "42px" }}
                >
                  <Truck size={20} />
                </div>
                <div>
                  <div className="fw-bold text-dark d-flex align-items-center gap-2">
                    Pase de Salida de Báscula
                    {tienePaseSalida ? (
                      <Badge bg="secondary-transparent">Autorizado</Badge>
                    ) : (
                      <Badge bg="secondary-transparent">En Tránsito</Badge>
                    )}
                  </div>
                  <div className="text-muted small mt-1">
                    {esDestarse
                      ? "Pase de salida por destarse de cabezal (furgón desacoplado)."
                      : tieneSalida
                      ? "Pase de salida final del vehículo y furgón tras completar el pesaje."
                      : "Comprobante de salida de garita y báscula."}
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="d-flex align-items-center gap-1"
                  disabled={(!tienePaseSalida && !tieneEntrada) || imprimiendo === "salida"}
                  onClick={() => handlePrintPaseSalida(false)}
                >
                  {imprimiendo === "salida" ? (
                    <><Loader2 size={14} className="spinner-border spinner-border-sm" /> Enviando...</>
                  ) : (
                    <><Printer size={14} /> Imprimir Pase de Salida</>
                  )}
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  title="Abrir vista previa web en el navegador"
                  disabled={!tienePaseSalida && !tieneEntrada}
                  onClick={() => handlePrintPaseSalida(true)}
                >
                  <ExternalLink size={13} />
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* 5. Boleta de Devolución de Café */}
          <Card
            className={`border transition-all ${
              puedeImprimirDevolucion ? "border-danger-subtle bg-danger-subtle bg-opacity-10" : "border-muted opacity-60"
            }`}
          >
            <Card.Body className="p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className={`p-2 rounded-circle d-flex align-items-center justify-content-center ${
                    puedeImprimirDevolucion ? "bg-danger bg-opacity-10 text-danger" : "bg-secondary bg-opacity-10 text-muted"
                  }`}
                  style={{ width: "42px", height: "42px" }}
                >
                  <XCircle size={20} />
                </div>
                <div>
                  <div className="fw-bold text-dark d-flex align-items-center gap-2">
                    Boleta de Devolución de Café
                    {tieneDevolucionFaltos ? (
                      <Badge bg="danger-transparent">
                        Devolución de Faltos ({devolucionData.cantidad_sacos} {devolucionData.cantidad_sacos === 1 ? "saco" : "sacos"})
                      </Badge>
                    ) : esDevolucion ? (
                      <Badge bg="danger-transparent">Devolución / Rechazo</Badge>
                    ) : (
                      <Badge bg="secondary-transparent">No Aplica (Carga Aceptada)</Badge>
                    )}
                  </div>
                  <div className="text-muted small mt-1">
                    {tieneDevolucionFaltos ? (
                      <>
                        Comprobante de devolución de {devolucionData.cantidad_sacos} saco(s) falto(s) autorizado por Gerencia ({devolucionData.remision}).
                      </>
                    ) : esDevolucion ? (
                      "Carga con dictamen de rechazo o devolución de Gerencia. Imprimir comprobante para el transportista."
                    ) : (
                      "Comprobante emitido únicamente cuando una carga o sus faltos son devueltos por Gerencia."
                    )}
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="d-flex align-items-center gap-1"
                  disabled={!idDetalleDevolucion || !puedeImprimirDevolucion || imprimiendo === "devolucion"}
                  onClick={() => handlePrintBoletaDevolucion(false)}
                >
                  {imprimiendo === "devolucion" ? (
                    <><Loader2 size={14} className="spinner-border spinner-border-sm" /> Enviando...</>
                  ) : (
                    <><Printer size={14} /> Imprimir Boleta Devolución</>
                  )}
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  title="Abrir vista previa web en el navegador"
                  disabled={!idDetalleDevolucion || !puedeImprimirDevolucion}
                  onClick={() => handlePrintBoletaDevolucion(true)}
                >
                  <ExternalLink size={13} />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
