import React, { useState } from "react";
import { Modal, Button, Form, Alert, Row, Col, Badge } from "react-bootstrap";
import { FileText, Printer, Truck, CheckCircle } from "lucide-react";

export interface ModalPaseSalidaObservacionesProps {
  show: boolean;
  data: {
    recepcion: any;
    detalle: any;
  } | null;
  submitting: boolean;
  onClose: () => void;
  onConfirm: (observaciones: string) => void;
}

export default function ModalPaseSalidaObservaciones({
  show,
  data,
  submitting,
  onClose,
  onConfirm,
}: ModalPaseSalidaObservacionesProps) {
  const [obs, setObs] = useState("");

  if (!data) return null;

  const { recepcion, detalle } = data;

  const handleConfirm = () => {
    onConfirm(obs.trim());
  };

  const handleSkip = () => {
    onConfirm("");
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" centered size="lg">
      <Modal.Header closeButton className="bg-warning-subtle text-warning-emphasis">
        <Modal.Title className="fs-16 fw-bold d-flex align-items-center gap-2">
          <FileText className="w-5 h-5 text-warning" />
          <span>Observaciones para Pase de Salida</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Alert variant="warning" className="d-flex align-items-start gap-2 mb-3">
          <Truck className="w-5 h-5 flex-shrink-0 mt-1" />
          <div className="fs-13">
            <strong>¡Pesaje del vehículo completado!</strong>
            <p className="mb-0 text-muted">
              Todas las cargas de este ingreso han cerrado su pesada y el vehículo está completamente vacío. A continuación se generará el <strong>Pase de Salida</strong>.
            </p>
          </div>
        </Alert>

        {/* Resumen del Ingreso y Unidad */}
        <div className="bg-light p-3 rounded border mb-3">
          <Row className="g-2 text-sm">
            <Col sm={4}>
              <span className="text-muted small d-block">N° Ingreso</span>
              <strong className="text-primary">{recepcion?.numero_entrada || "—"}</strong>
            </Col>
            <Col sm={4}>
              <span className="text-muted small d-block">Última Remisión Pesada</span>
              <strong>{detalle?.remision || "—"}</strong>
            </Col>
            <Col sm={4}>
              <span className="text-muted small d-block">Estado</span>
              <Badge bg="success-transparent" className="text-success fw-semibold">
                <CheckCircle className="w-3 h-3 me-1 d-inline" /> Pesada Cerrada
              </Badge>
            </Col>
            <Col sm={4}>
              <span className="text-muted small d-block">Conductor</span>
              <span className="fw-medium">{recepcion?.conductor?.nombre || "—"}</span>
            </Col>
            <Col sm={4}>
              <span className="text-muted small d-block">Placa Cabezal</span>
              <span className="font-monospace fw-semibold">{recepcion?.placa_cabezal?.placa || "—"}</span>
            </Col>
            <Col sm={4}>
              <span className="text-muted small d-block">Placa Furgón</span>
              <span className="font-monospace text-muted">{recepcion?.placa_furgon?.placa || "Sin Furgón"}</span>
            </Col>
          </Row>
        </div>

        {/* Campo de observaciones */}
        <Form.Group className="mb-2">
          <Form.Label className="fw-bold fs-13 text-dark">
            Observaciones que se imprimirán en el Pase de Salida:
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            autoFocus
            maxLength={350}
            className="fs-13 bg-white"
            placeholder="Ingrese observaciones sobre la salida del vehículo (ej: vehículo sale vacío sin novedades, se devolvieron 10 sacos, etc.)..."
            value={obs}
            onChange={(e) => setObs(e.target.value)}
          />
          <div className="d-flex justify-content-between align-items-center mt-1 text-muted small">
            <span>Esta observación se guardará directamente en la boleta del pase de salida.</span>
            <span>{obs.length} / 350</span>
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button
          variant="outline-secondary"
          size="sm"
          disabled={submitting}
          onClick={handleSkip}
        >
          Omitir Observaciones e Imprimir
        </Button>
        <Button
          variant="primary"
          className="d-flex align-items-center gap-2 px-4"
          disabled={submitting}
          onClick={handleConfirm}
        >
          <Printer size={16} />
          <span>{submitting ? "Guardando..." : "Guardar e Imprimir Pase de Salida"}</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
