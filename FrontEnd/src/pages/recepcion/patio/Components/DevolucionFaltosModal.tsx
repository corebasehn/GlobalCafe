import { Printer, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Modal, Button, Form, Alert, Row, Col, Badge } from "react-bootstrap";
import { useState } from "react";

export interface DevolucionFaltosModalProps {
  show: boolean;
  item: any | null;
  onClose: () => void;
  onConfirm: (decision: "APROBAR" | "DEVOLVER", obs: string) => void;
  submitting: boolean;
}

export default function DevolucionFaltosModal({ show, item, onClose, onConfirm, submitting }: DevolucionFaltosModalProps) {
  const [obs, setObs] = useState("");
  const [decision, setDecision] = useState<"APROBAR" | "DEVOLVER" | null>(null);
  const [showPrint, setShowPrint] = useState(false);

  if (!item) return null;

  const handleConfirm = () => {
    if (!decision) return;
    onConfirm(decision, obs);
    if (decision === "DEVOLVER") {
      setShowPrint(true);
    }
  };

  const resetAndClose = () => {
    setObs("");
    setDecision(null);
    setShowPrint(false);
    onClose();
  };

  if (showPrint && decision === "DEVOLVER") {
    return (
      <Modal show={show} onHide={resetAndClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-18 text-danger fw-bold">Boleta de Devolución</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <style>{`
            @media print {
              @page { margin: 0; size: letter portrait; }
              body * { visibility: hidden; }
              #print-boleta {
                position: fixed;
                left: 0;
                top: 0;
                width: 100%;
                visibility: visible;
                padding: 2cm;
              }
              #print-boleta * { visibility: visible; }
            }
          `}</style>

          <div id="print-boleta" className="p-5 border border-dark rounded bg-white text-dark shadow-sm">
            <div className="text-center mb-4 border-bottom border-dark pb-3">
              <h4 className="fw-bold mb-1">GLOBAL COFFEE GROUP</h4>
              <h6 className="text-danger fw-bold mb-0">BOLETA DE DEVOLUCIÓN DE CARGA (FALTOS)</h6>
            </div>

            <Row className="g-3 mb-4 fs-13">
              <Col xs={6}>
                <p className="mb-1"><strong>N° Ingreso:</strong> {item.recepcion.numero_entrada}</p>
                <p className="mb-1"><strong>Remisión:</strong> {item.remision}</p>
                <p className="mb-1"><strong>Fecha:</strong> {new Date().toLocaleString()}</p>
              </Col>
              <Col xs={6}>
                <p className="mb-1"><strong>Proveedor:</strong> {item.proveedor.nombre}</p>
                <p className="mb-1"><strong>Sacos Devueltos:</strong> {item.cantidad_sacos}</p>
                <p className="mb-1"><strong>Transporte:</strong> {item.recepcion.placa_cabezal.placa}</p>
              </Col>
            </Row>

            <div className="mb-4">
              <h6 className="fw-bold border-bottom border-dark pb-2 mb-3 fs-13 text-uppercase">Motivo de Devolución</h6>
              <div className="p-3 bg-light border border-dark rounded fs-13">
                <p className="mb-1 text-muted"><strong>Reporte Patio:</strong></p>
                <p className="mb-3 italic">"{item.observaciones}"</p>
                <hr className="my-2 border-dark" />
                <p className="mb-1 text-muted mt-2"><strong>Veredicto Gerencia:</strong></p>
                <p className="mb-0">{obs || "No se especificaron detalles adicionales"}</p>
              </div>
            </div>

            <Row className="mt-5 pt-5 text-center fs-12">
              <Col xs={6}>
                <div className="border-top border-dark pt-2 mx-4 fw-semibold text-uppercase">
                  Firma Autorizada (Gerencia)
                </div>
              </Col>
              <Col xs={6}>
                <div className="border-top border-dark pt-2 mx-4 fw-semibold text-uppercase">
                  Firma Transportista / Motorista
                </div>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn-wave" onClick={resetAndClose}>Cerrar</Button>
          <Button variant="primary" className="btn-wave d-flex align-items-center gap-2" onClick={() => window.print()}>
            <Printer size={16} /> Imprimir Boleta
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={resetAndClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-18">Decisión de Gerencia: <span className="text-primary">Sacos Faltos</span></Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Alert variant="secondary" className="border-0 shadow-none bg-primary-transparent">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="fw-bold fs-14 text-primary">{item.recepcion.numero_entrada}</span>
            <Badge bg="danger-transparent" className="rounded-pill px-3 fs-12">{item.cantidad_sacos} Sacos Faltos</Badge>
          </div>
          <p className="fs-12 text-muted mb-0">{item.proveedor.nombre}</p>
        </Alert>

        <div className="mb-4">
          <label className="fw-semibold text-muted fs-11 text-uppercase mb-2 d-block">Reporte de Patio:</label>
          <div className="p-3 bg-light rounded border fs-12 text-muted fst-italic">
            "{item.observaciones}"
          </div>
        </div>

        <Row className="g-3 mb-4">
          <Col xs={6}>
            <Button 
              variant={decision === "APROBAR" ? "success" : "outline-success"} 
              className={`w-100 py-3 btn-wave d-flex flex-column align-items-center gap-2 border-2 ${decision === 'APROBAR' ? '' : 'border-dashed'}`}
              onClick={() => setDecision("APROBAR")}
            >
              <CheckCircle size={28} />
              <span className="fw-bold fs-13">Aprobar Descarga</span>
            </Button>
          </Col>
          <Col xs={6}>
            <Button 
              variant={decision === "DEVOLVER" ? "danger" : "outline-danger"} 
              className={`w-100 py-3 btn-wave d-flex flex-column align-items-center gap-2 border-2 ${decision === 'DEVOLVER' ? '' : 'border-dashed'}`}
              onClick={() => setDecision("DEVOLVER")}
            >
              <XCircle size={28} />
              <span className="fw-bold fs-13">Devolver Carga</span>
            </Button>
          </Col>
        </Row>

        <Form.Group>
          <Form.Label className="fw-semibold text-muted fs-11 text-uppercase mb-1">Observaciones / Instrucciones:</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="Ingrese el detalle de su veredicto..."
            className="fs-13 bg-light"
            value={obs}
            onChange={(e) => setObs(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="btn-wave" onClick={resetAndClose}>Cancelar</Button>
        <Button 
          variant="primary" 
          className="btn-wave px-4 d-flex align-items-center gap-2"
          disabled={!decision || submitting} 
          onClick={handleConfirm}
        >
          {submitting ? <Loader2 size={16} className="animate-spin" /> : <i className="fe fe-check-circle"></i>}
          <span>{submitting ? "Procesando..." : "Confirmar Decisión"}</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

