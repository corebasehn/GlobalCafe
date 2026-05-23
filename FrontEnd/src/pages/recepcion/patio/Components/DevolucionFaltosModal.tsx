import { Printer, CheckCircle, XCircle } from "lucide-react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
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

  if (showPrint && decision === "DEVOLVER") {
    return (
      <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Boleta de Devolución</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

          <div id="print-boleta" className="p-8 border-2 border-black bg-white text-black">
            <div className="text-center mb-6 border-bottom border-dark pb-3">
              <h1 className="h3 fw-bold mb-0">GLOBAL COFFEE GROUP</h1>
              <h2 className="h5 text-danger fw-bold mt-2">BOLETA DE DEVOLUCIÓN DE CARGA (FALTOS)</h2>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-6">
                <p className="mb-1"><strong>N° Ingreso:</strong> {item.recepcion.numero_entrada}</p>
                <p className="mb-1"><strong>Remisión:</strong> {item.remision}</p>
                <p className="mb-1"><strong>Fecha:</strong> {new Date().toLocaleString()}</p>
              </div>
              <div className="col-6">
                <p className="mb-1"><strong>Proveedor:</strong> {item.proveedor.nombre}</p>
                <p className="mb-1"><strong>Sacos Devueltos:</strong> {item.cantidad_sacos}</p>
                <p className="mb-1"><strong>Transporte:</strong> {item.recepcion.placa_cabezal.placa}</p>
              </div>
            </div>

            <div className="mb-5">
              <h3 className="h6 fw-bold border-bottom border-dark pb-1">Motivo de Devolución</h3>
              <div className="p-3 bg-light border border-dark rounded">
                <p className="mb-1"><strong>Reporte Patio:</strong> {item.observaciones}</p>
                <hr className="my-2 border-dark" />
                <p className="mb-0"><strong>Veredicto Gerencia:</strong> {obs || "No se especificaron detalles adicionales"}</p>
              </div>
            </div>

            <div className="row mt-5 pt-5 text-center">
              <div className="col-6">
                <div className="border-top border-dark pt-2 mx-4">
                  Firma Autorizada (Gerencia)
                </div>
              </div>
              <div className="col-6">
                <div className="border-top border-dark pt-2 mx-4">
                  Firma Transportista / Motorista
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cerrar</Button>
          <Button variant="primary" onClick={() => window.print()}>
            <Printer size={16} className="me-2" /> Imprimir Boleta
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="text-coffee-800">Decisión de Gerencia: Sacos Faltos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="secondary">
          <div className="flex justify-between font-bold">
            <span>{item.recepcion.numero_entrada}</span>
            <span className="text-danger">{item.cantidad_sacos} Sacos</span>
          </div>
          <p className="text-xs mb-0 mt-1">{item.proveedor.nombre}</p>
        </Alert>

        <div className="mb-4">
          <label className="form-label font-bold small text-neutral-500 uppercase">Reporte de Patio:</label>
          <div className="p-3 bg-neutral-100 rounded italic text-sm">
            "{item.observaciones}"
          </div>
        </div>

        <div className="row g-2 mb-4">
          <div className="col-6">
            <Button 
              variant={decision === "APROBAR" ? "success" : "outline-success"} 
              className="w-100 py-3 flex flex-col items-center gap-2"
              onClick={() => setDecision("APROBAR")}
            >
              <CheckCircle size={24} />
              <span className="font-bold">Aprobar Descarga</span>
            </Button>
          </div>
          <div className="col-6">
            <Button 
              variant={decision === "DEVOLVER" ? "danger" : "outline-danger"} 
              className="w-100 py-3 flex flex-col items-center gap-2"
              onClick={() => setDecision("DEVOLVER")}
            >
              <XCircle size={24} />
              <span className="font-bold">Devolver Carga</span>
            </Button>
          </div>
        </div>

        <Form.Group>
          <Form.Label className="font-bold small text-neutral-500 uppercase">Observaciones / Instrucciones:</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="Ingrese el detalle de su decisión..."
            value={obs}
            onChange={(e) => setObs(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button 
          variant="primary" 
          disabled={!decision || submitting} 
          onClick={handleConfirm}
        >
          {submitting ? "Procesando..." : "Confirmar Decisión"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
