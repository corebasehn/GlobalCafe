import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, InputGroup, Alert } from "react-bootstrap";
import { Weight, Zap, Loader2, Save, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import {
  registrarPrimeraPesadaOtroMovimientoApi,
  registrarSegundaPesadaOtroMovimientoApi,
} from "../../../../api/reception.api";

const AGENT_URL = "http://127.0.0.1:4000";

export type TipoPesada = "PRIMERA_PESADA" | "SEGUNDA_PESADA";

interface Props {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
  tipo: TipoPesada;
  movimiento: any;
}

export default function ModalPesajeOtroMovimiento({
  show,
  onHide,
  onSuccess,
  tipo,
  movimiento,
}: Props) {
  const [pesoInput, setPesoInput] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [capturingScale, setCapturingScale] = useState(false);

  useEffect(() => {
    if (show) {
      setPesoInput("");
      setObservaciones("");
    }
  }, [show, tipo, movimiento]);

  if (!movimiento) return null;

  const detalle = movimiento.detalles && movimiento.detalles.length > 0 ? movimiento.detalles[0] : null;
  const taraPrevia = detalle && detalle.pesada_entrada ? Number(detalle.pesada_entrada) : null;
  const pesoActual = Number(pesoInput) || 0;

  // Cálculo en vivo para segunda pesada
  const pesoNetoCalculado = tipo === "SEGUNDA_PESADA" && taraPrevia ? pesoActual - taraPrevia : 0;
  const esValido = tipo === "PRIMERA_PESADA" ? pesoActual > 0 : pesoActual > (taraPrevia || 0);

  // Captura automática de báscula camionera (Agente local .exe en puerto 4000)
  const handleCapturarBascula = async () => {
    setCapturingScale(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(`${AGENT_URL}/peso`, { signal: controller.signal });
      clearTimeout(timeoutId);
      const data = await response.json();

      if (data.estado === "exito") {
        setPesoInput(data.peso.toString());
        toast.success(`Peso capturado de báscula: ${Number(data.peso).toLocaleString()} LB`);
      } else {
        toast.error(`Error de la báscula: ${data.mensaje}`);
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === "AbortError") {
        toast.error("La báscula tardó demasiado en responder (8s). Verifique que el .exe esté abierto y la báscula conectada.");
      } else {
        toast.error("No se pudo conectar con el Agente de Báscula. Verifique que el .exe esté abierto en esta PC.");
      }
    } finally {
      setCapturingScale(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!detalle) {
      toast.error("No se encontró el detalle de la carga");
      return;
    }

    if (tipo === "PRIMERA_PESADA") {
      if (pesoActual <= 0) {
        toast.error("Ingrese un peso válido para la tara (vehículo vacío)");
        return;
      }
      try {
        setSubmitting(true);
        await registrarPrimeraPesadaOtroMovimientoApi(
          detalle.id_detalle_recepcion,
          pesoActual,
          observaciones.trim() || undefined
        );
        toast.success("1ra Pesada (Tara) guardada exitosamente. El camión puede pasar a cargar.");
        onHide();
        onSuccess();
      } catch (error: any) {
        console.error(error);
        toast.error(error.response?.data?.message || "Error al registrar la primera pesada");
      } finally {
        setSubmitting(false);
      }
    } else {
      if (pesoActual <= (taraPrevia || 0)) {
        toast.error("El peso bruto (cargado) debe ser mayor que la tara del vehículo vacío");
        return;
      }
      try {
        setSubmitting(true);
        await registrarSegundaPesadaOtroMovimientoApi(
          detalle.id_detalle_recepcion,
          pesoActual,
          observaciones.trim() || undefined
        );
        toast.success(`Pesaje completado. Peso Neto de Casulla: ${pesoNetoCalculado.toLocaleString()} LB`);
        onHide();
        onSuccess();
      } catch (error: any) {
        console.error(error);
        toast.error(error.response?.data?.message || "Error al registrar la segunda pesada");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const modalTitle = tipo === "PRIMERA_PESADA"
    ? "Pesada de Entrada (Vehículo Vacío)"
    : "Pesada de Salida (Vehículo Cargado)";

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton className="border-bottom-0 pb-0">
          <Modal.Title className="fs-5 fw-bold text-dark">
            {modalTitle}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4 pt-3">
          {/* Tarjeta de Resumen de la Carga */}
          <div className="bg-light rounded border p-3 mb-4 mt-2">
            <Row className="g-2 text-sm">
              <Col xs={5} className="text-muted fw-medium">Ingreso / Remisión:</Col>
              <Col xs={7} className="fw-bold text-end">
                {movimiento.numero_entrada} {detalle?.remision && detalle?.remision !== movimiento.numero_entrada ? `/ ${detalle.remision}` : ""}
              </Col>

              <Col xs={5} className="text-muted fw-medium">Cliente / Proveedor:</Col>
              <Col xs={7} className="fw-semibold text-end text-truncate">
                {detalle?.proveedor?.nombre || "General"}
              </Col>

              <Col xs={5} className="text-muted fw-medium">Vehículo:</Col>
              <Col xs={7} className="fw-semibold text-end">
                {movimiento.tipo_vehiculo} - {movimiento.placa_cabezal?.placa}
              </Col>

              <Col xs={5} className="text-muted fw-medium">Conductor:</Col>
              <Col xs={7} className="fw-semibold text-end text-truncate">
                {movimiento.conductor?.nombre || "N/A"}
              </Col>
            </Row>

            {/* Referencia de Tara previa en caso de 2da pesada */}
            {tipo === "SEGUNDA_PESADA" && taraPrevia && (
              <Row className="mt-2 pt-2 border-top g-0 align-items-center" style={{ color: "#63391d" }}>
                <Col className="fw-semibold">Peso Tara de Referencia:</Col>
                <Col xs="auto" className="font-monospace fw-bold fs-6">
                  {taraPrevia.toLocaleString("en-US", { minimumFractionDigits: 2 })} LB
                </Col>
              </Row>
            )}
          </div>

          {/* Lectura del Indicador de la Báscula */}
          <Form.Group className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Form.Label className="fw-bold mb-0">Lectura del Indicador de la Báscula</Form.Label>
              <Button
                variant="outline-secondary"
                size="sm"
                className="d-flex align-items-center gap-1 fw-semibold"
                style={{ borderColor: "#63391d", color: "#63391d" }}
                onClick={handleCapturarBascula}
                disabled={capturingScale || submitting}
              >
                {capturingScale ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Zap size={14} style={{ color: "#63391d" }} />
                )}
                Capturar de Báscula
              </Button>
            </div>

            <InputGroup size="lg">
              <InputGroup.Text className="bg-light border-end-0">
                <Weight size={20} className="text-secondary" />
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
                className="text-end font-monospace fw-bold fs-3 border-start-0 border-end-0"
                placeholder="0.00"
                style={{ MozAppearance: "textfield" } as React.CSSProperties}
                onWheel={(e) => e.currentTarget.blur()}
              />
              <InputGroup.Text className="fw-bold bg-light">LB</InputGroup.Text>
            </InputGroup>
            <Form.Text className="text-muted">
              Presione el botón para capturar automáticamente o escriba el peso manualmente.
            </Form.Text>
          </Form.Group>

          {/* Cálculo dinámico en vivo para 2da pesada */}
          {tipo === "SEGUNDA_PESADA" && taraPrevia && (
            <div
              className={`p-3 rounded border text-center mb-4 ${
                pesoNetoCalculado > 0 ? "bg-success-subtle border-success" : "bg-danger-subtle border-danger"
              }`}
            >
              <div className="small text-muted mb-1">Cálculo de Peso Neto Estimado:</div>
              <div className="d-flex justify-content-center align-items-center gap-2">
                <span>{pesoActual.toLocaleString()} LB (Bruto)</span>
                <span>-</span>
                <span>{taraPrevia.toLocaleString()} LB (Tara)</span>
                <ArrowRight size={16} />
                <strong className={`fs-5 ${pesoNetoCalculado > 0 ? "text-success" : "text-danger"}`}>
                  {pesoNetoCalculado.toLocaleString()} LB Neto
                </strong>
              </div>
              {pesoNetoCalculado > 0 && (
                <div className="small text-muted mt-1">
                  Equivalente a: <strong>{(pesoNetoCalculado / 100).toFixed(2)} QQ</strong>
                </div>
              )}
            </div>
          )}

          {/* Observaciones */}
          <Form.Group className="pt-3 border-top mb-1">
            <Form.Label className="fw-bold">Observaciones</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={
                tipo === "PRIMERA_PESADA"
                  ? "Ingrese observaciones sobre la entrada del vehículo..."
                  : "Ingrese observaciones sobre la salida del vehículo..."
              }
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              maxLength={500}
            />
            <Form.Text className="text-muted">
              {observaciones.length}/500 caracteres
            </Form.Text>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="border-top-0 pt-0 d-flex justify-content-end gap-2 pb-4 px-4">
          <Button
            style={{
              backgroundColor: "#f74d6e",
              borderColor: "#f74d6e",
              color: "#fff",
              fontWeight: 600,
              padding: "8px 24px",
              borderRadius: "6px",
            }}
            onClick={onHide}
            disabled={submitting}
          >
            Cancelar
          </Button>
          <Button
            style={{
              backgroundColor: "#63391d",
              borderColor: "#63391d",
              color: "#fff",
              fontWeight: 600,
              padding: "8px 24px",
              borderRadius: "6px",
            }}
            type="submit"
            disabled={submitting || !esValido}
            className="d-flex align-items-center gap-2"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Capturar Peso
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
