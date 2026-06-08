import { Printer } from "lucide-react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import type { MuestraGerencia } from "../Containers/AprobacionGerenciaPage";

export interface DevolucionModalProps {
  printData: { muestra: MuestraGerencia; motivo: string } | null;
  onClose: () => void;
}

export default function DevolucionModal({ printData, onClose }: DevolucionModalProps) {
  return (
    <Modal show={!!printData} onHide={onClose} size="lg" centered>
      {printData && (
        <>
          <Modal.Header closeButton>
            <Modal.Title className="fs-18">Reporte de Devolución Generado</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <style>{`
              @media print {
                @page { margin: 0; size: letter portrait; }
                html, body {
                  height: 100vh !important;
                  overflow: hidden !important;
                  margin: 0 !important;
                  padding: 0 !important;
                }
                body * { visibility: hidden; }
                * { transform: none !important; }
                #print-devolucion {
                  position: fixed !important;
                  left: 0.5cm !important;
                  top: 0.5cm !important;
                  margin: 0 !important;
                  padding: 1cm !important;
                  width: calc(100% - 1cm) !important;
                  visibility: visible !important;
                  font-family: sans-serif;
                  border: none !important;
                  border: 2px solid black !important;
                  box-sizing: border-box !important;
                }
                #print-devolucion * { visibility: visible !important; }
              }
            `}</style>

            <div className="alert alert-danger-light d-flex align-items-center gap-2 mb-4">
              <Printer className="w-4 h-4" />
              <span className="fw-semibold fs-13">Se ha generado el reporte de rechazo. Imprímalo como respaldo para el transportista.</span>
            </div>

            <div id="print-devolucion" className="p-5 border border-dark rounded bg-white text-dark shadow-sm">
              <div className="text-center border-bottom border-dark pb-3 mb-4">
                <h4 className="fw-bold mb-1">GLOBAL COFFEE GROUP</h4>
                <h6 className="text-danger fw-bold mb-0">REPORTE DE DEVOLUCIÓN DE CAFÉ</h6>
              </div>

              <Row className="mb-4 fs-13">
                <Col md={6} className="mb-2"><strong>N° Ingreso:</strong> {printData.muestra.numero_entrada}</Col>
                <Col md={6} className="mb-2"><strong>N° Remisión:</strong> {printData.muestra.remision}</Col>
                <Col md={12} className="mb-2"><strong>Proveedor / Finca:</strong> {printData.muestra.proveedor_nombre}</Col>
                <Col md={6} className="mb-2"><strong>Fecha/Hora Rechazo:</strong> {new Date().toLocaleString()}</Col>
                <Col md={6} className="mb-2"><strong>Volumen Aprox:</strong> {printData.muestra.cantidad_qq.toFixed(2)} QQ</Col>
              </Row>

              <div className="mb-5">
                <h6 className="fw-bold border-bottom border-dark pb-2 mb-3 fs-13">Motivo de la Devolución (Veredicto de Gerencia)</h6>
                <p className="fs-13 text-justify whitespace-pre-wrap">{printData.motivo}</p>
              </div>

              <Row className="mt-5 pt-4 text-center fs-12">
                <Col xs={6}>
                  <div className="border-top border-dark pt-2 mx-4">Firma Gerencia / Catador</div>
                </Col>
                <Col xs={6}>
                  <div className="border-top border-dark pt-2 mx-4">Firma Transportista / Productor</div>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="btn-wave" onClick={onClose}>Cerrar</Button>
            <Button variant="primary" className="btn-wave d-flex align-items-center gap-2" onClick={() => window.print()}>
              <Printer className="w-4 h-4" /> Imprimir Reporte
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}

