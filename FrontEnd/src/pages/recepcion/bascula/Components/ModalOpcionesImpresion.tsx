import React, { useState } from "react";
import { Modal, Button, Card, Badge, Form } from "react-bootstrap";
import { Printer, Scale, Truck, CheckCircle2, AlertCircle, FileText } from "lucide-react";

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

  if (!carga) return null;

  const idDetalle = carga.id_detalle_recepcion;
  const rec = recepcion || carga.recepcion;

  const noEntrada = rec?.numero_entrada ?? "—";
  const remision = carga.remision ?? "—";
  const proveedor = carga.proveedor?.nombre ?? "—";
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

  const handlePrintBoleta = (tipo: "primera" | "segunda") => {
    if (!idDetalle) return;
    const copiaParam = esCopia ? "?copia=true" : "";
    window.open(`${base}print/boleta-pesada/${idDetalle}/${tipo}${copiaParam}`, "_blank");
  };

  const handlePrintPaseSalida = () => {
    if (!idDetalle) return;
    window.open(`${base}print/pase-salida/${idDetalle}`, "_blank");
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

            <div className="text-muted small d-flex flex-wrap gap-x-4 gap-y-1">
              <div>
                <strong>Proveedor:</strong> {proveedor}
              </div>
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

        {/* Toggle para marca de COPIA */}
        <div className="d-flex justify-content-between align-items-center mb-3 px-1">
          <span className="small text-muted fw-semibold">Seleccione el documento que desea reimprimir:</span>
          <Form.Check
            type="switch"
            id="switch-copia-modal"
            label={<span className="small text-muted">Imprimir con marca "COPIA"</span>}
            checked={esCopia}
            onChange={(e) => setEsCopia(e.target.checked)}
          />
        </div>

        {/* Listado de Tipos de Impresión */}
        <div className="d-flex flex-column gap-3">
          {/* 1. Boleta de Primera Pesada (Peso Bruto) */}
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

              <div>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="d-flex align-items-center gap-1"
                  disabled={!tieneEntrada}
                  onClick={() => handlePrintBoleta("primera")}
                >
                  <Printer size={14} /> Imprimir 1ª Pesada
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* 2. Boleta de Segunda Pesada (Tara / Neto) */}
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

              <div>
                <Button
                  variant="outline-success"
                  size="sm"
                  className="d-flex align-items-center gap-1"
                  disabled={!tieneSalida}
                  onClick={() => handlePrintBoleta("segunda")}
                >
                  <Printer size={14} /> Imprimir 2ª Pesada
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* 3. Pase de Salida del Vehículo */}
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

              <div>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="d-flex align-items-center gap-1"
                  disabled={!tienePaseSalida && !tieneEntrada}
                  onClick={handlePrintPaseSalida}
                >
                  <FileText size={14} /> Imprimir Pase de Salida
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
