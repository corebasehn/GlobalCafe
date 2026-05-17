import { HandCoins, Loader2 } from "lucide-react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { CargaPendiente, MuestreoFormData } from "./types";

type Props = {
  show: boolean;
  carga: CargaPendiente | null;
  formData: MuestreoFormData;
  submitting: boolean;
  onHide: () => void;
  onFormChange: (data: MuestreoFormData) => void;
  onConfirmar: () => void;
};

export default function ModalConfirmarMuestra({
  show, carga, formData, submitting, onHide, onFormChange, onConfirmar,
}: Readonly<Props>) {
  if (!carga) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <style>{`
        @media print {
          @page { margin: 0; size: 10cm 5cm; }
          body * { visibility: hidden; }
          #print-label, #print-label * { visibility: visible; }
          #print-label {
            position: absolute;
            left: 0; top: 0;
            width: 10cm; height: 5cm;
            padding: 0.5cm;
            font-family: sans-serif;
            color: black;
          }
        }
      `}</style>

      <Modal.Header closeButton>
        <Modal.Title>Confirmar Toma de Muestra</Modal.Title>
      </Modal.Header>

      <Modal.Body className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm mb-4">
          <h2 className="font-bold text-neutral-900 mb-4 d-flex align-items-center gap-2 fs-6">
            Información de la Carga a Muestrear:
          </h2 >
          <Row className="g-2 text-blue-900">
            <Col xs={4}><p className="mb-0"><strong>Ingreso:</strong> {carga.numero_entrada}</p></Col>
            <Col xs={4}><p className="mb-0"><strong>Remisión:</strong> {carga.remision}</p></Col>
            <Col xs={4}><p className="mb-0"><strong>Sacos:</strong> {carga.cantidad_sacos}</p></Col>
            <Col xs={12}><p className="mb-0"><strong>Proveedor:</strong> {carga.proveedor_nombre}</p></Col>
          </Row>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Tipo de Análisis Solicitado</Form.Label>
          <Form.Select
            value={formData.tipo_analisis}
            onChange={(e) => onFormChange({ ...formData, tipo_analisis: e.target.value })}
          >
            <option value="Muestra Previa">Muestra Previa (Camión sin descargar)</option>
            <option value="Muestra General">Muestra General (Durante/Post descarga)</option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Observaciones del Muestreador (Opcional)</Form.Label>
          <Form.Control
            placeholder="Ej. Sacos rotos, café mojado..."
            value={formData.observaciones}
            onChange={(e) => onFormChange({ ...formData, observaciones: e.target.value })}
          />
        </Form.Group>

        <div className="d-none">
          <div
            id="print-label"
            className="border border-2 border-dark rounded bg-white d-flex flex-column justify-content-between p-3"
            style={{ height: "5cm" }}
          >
            <div className="text-center border-bottom border-2 border-dark pb-1 mb-1">
              <h1 className="fw-bold fs-5 mb-0">GLOBAL COFFEE GROUP</h1>
              <h2 className="fs-6 fw-bold text-uppercase mb-0">{formData.tipo_analisis}</h2>
            </div>
            <div className="fs-6 flex-grow-1 d-flex flex-column justify-content-center">
              <p className="mb-1"><strong>ING:</strong> {carga.numero_entrada} | <strong>REM:</strong> {carga.remision}</p>
              <p className="text-truncate mb-1"><strong>PROV:</strong> {carga.proveedor_nombre}</p>
              <p className="mb-1"><strong>SACOS:</strong> {carga.cantidad_sacos} | <strong>QQ:</strong> {carga.cantidad_qq}</p>
              <p className="mb-0"><strong>FECHA:</strong> {new Date().toLocaleString()}</p>
            </div>
            <div className="text-center border-top border-dashed border-dark pt-1" style={{ fontSize: "10px" }}>
              Pegar esta etiqueta en la bolsa de muestra
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={submitting}>Cancelar</Button>
        <Button variant="primary" onClick={onConfirmar} disabled={submitting} className="d-flex align-items-center gap-2">
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <HandCoins className="w-4 h-4" />}
          Confirmar Muestra
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
