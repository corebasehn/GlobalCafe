import React from "react";
import { CheckCircle, RefreshCcw, XCircle, FileText, Loader2 } from "lucide-react";
import { Modal, Form, Button, Row, Col, Table, Badge } from "react-bootstrap";
import type { MuestraGerencia } from "../Containers/AprobacionGerenciaPage";
import type { VeredictoGerenciaRequest } from "../../../../api/analisis.api";

export interface EvaluacionModalProps {
  muestra: MuestraGerencia | null;
  formData: VeredictoGerenciaRequest;
  submitting: boolean;
  onClose: () => void;
  onFormChange: (data: VeredictoGerenciaRequest) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function getVeredictoIcon(veredicto: string) {
  if (veredicto === "APROBAR") return <CheckCircle className="w-5 h-5 text-success" />;
  if (veredicto === "SEGUNDA_MUESTRA") return <RefreshCcw className="w-5 h-5 text-warning" />;
  return <XCircle className="w-5 h-5 text-danger" />;
}

export default function EvaluacionModal({ muestra, formData, submitting, onClose, onFormChange, onSubmit }: EvaluacionModalProps) {
  return (
    <Modal show={!!muestra} onHide={onClose} size="lg" centered>
      {muestra && (
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title className="fs-18">Evaluación de Muestra del Laboratorio</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">

            {/* ── Resultados del Laboratorio ── */}
            <div className="card custom-card border shadow-none mb-4">
              <div className="card-header bg-light py-2 px-3">
                <div className="card-title fs-13 d-flex align-items-center gap-2">
                  <FileText size={16} className="text-muted" />
                  <span>RESULTADOS DEL LABORATORIO</span>
                </div>
              </div>
              <div className="card-body p-3">

                {/* Métricas */}
                <Row className="g-3 mb-4">
                  <Col xs={6} md={4}>
                    <label className="fw-semibold text-muted fs-11 d-block mb-1">Catador</label>
                    <span className="fw-bold text-dark fs-13">{muestra.catador_nombre}</span>
                  </Col>
                  <Col xs={6} md={4}>
                    <label className="fw-semibold text-muted fs-11 d-block mb-1">Calidad Perfilada</label>
                    <Badge bg="info-transparent" className="rounded-pill px-3">{muestra.calidad_nombre}</Badge>
                  </Col>
                  <Col xs={6} md={4}>
                    <label className="fw-semibold text-muted fs-11 d-block mb-1">Humedad</label>
                    <span className="fw-bold text-dark fs-14">{muestra.humedad}%</span>
                  </Col>
                  <Col xs={6} md={4}>
                    <label className="fw-semibold text-muted fs-11 d-block mb-1">Daño</label>
                    <span className="fw-bold text-dark fs-14">{muestra.dano}%</span>
                  </Col>
                  <Col xs={6} md={4}>
                    <label className="fw-semibold text-muted fs-11 d-block mb-1">Primer Rend.</label>
                    <span className="fw-bold text-dark fs-14">{muestra.primer_rendimiento || "N/A"}</span>
                  </Col>
                  <Col xs={6} md={4}>
                    <label className="fw-semibold text-muted fs-11 d-block mb-1">Segundo Rend.</label>
                    <span className="fw-bold text-dark fs-14">{muestra.segundo_rendimiento || "N/A"}</span>
                  </Col>
                </Row>

                {/* Tablas Defectos / Zarandas / Tazas */}
                <Row className="g-3 mb-4">
                  {[
                    { title: "Defectos",    items: muestra.analisis_defectos, keyProp: "id_defecto", nameFn: (x: any) => x.defecto.nombre },
                    { title: "Zarandas",    items: muestra.analisis_zarandas, keyProp: "id_zaranda", nameFn: (x: any) => x.zaranda.nombre },
                    { title: "Atrib. Taza", items: muestra.analisis_tazas,    keyProp: "id_tazas",   nameFn: (x: any) => x.taza.nombre },
                  ].map(({ title, items, keyProp, nameFn }) => (
                    <Col md={4} key={title}>
                      <div className="table-responsive border rounded">
                        <Table size="sm" className="mb-0 fs-12">
                          <thead className="table-light">
                            <tr><th colSpan={2} className="text-center py-1 fw-bold">{title.toUpperCase()}</th></tr>
                          </thead>
                          <tbody>
                            {items.length
                              ? items.map((item: any) => (
                                  <tr key={item[keyProp]}>
                                    <td className="text-muted">{nameFn(item)}</td>
                                    <td className="text-end fw-bold">{item.cantidad}</td>
                                  </tr>
                                ))
                              : <tr><td colSpan={2} className="text-center fst-italic text-muted py-2">—</td></tr>
                            }
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  ))}
                </Row>

                {/* Notas del catador */}
                <Form.Group>
                  <Form.Label className="fw-semibold text-muted fs-11 mb-1">Notas del Catador</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    readOnly
                    value={muestra.observaciones_laboratorio}
                    className="bg-light border-0 fs-13"
                    style={{ resize: "none" }}
                  />
                </Form.Group>
              </div>
            </div>

            {/* ── Veredicto de Gerencia ── */}
            <div className="card custom-card border border-primary border-opacity-50 shadow-none">
              <div className="card-header bg-primary-transparent py-2 px-3">
                <div className="card-title fs-13 d-flex align-items-center gap-2">
                  {getVeredictoIcon(formData.veredicto)}
                  <span>VEREDICTO DE GERENCIA</span>
                </div>
              </div>
              <div className="card-body p-3">
                <Row className="g-3">
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold text-muted fs-11 mb-1">Decisión del Gerente</Form.Label>
                      <Form.Select
                        value={formData.veredicto}
                        className="bg-light"
                        onChange={(e) => onFormChange({ ...formData, veredicto: e.target.value as VeredictoGerenciaRequest["veredicto"] })}
                        required
                      >
                        <option value="APROBAR">✅ Aprobar (Autorizar Descarga)</option>
                        <option value="SEGUNDA_MUESTRA">🔄 Segunda Muestra (Regresa a Muestreo)</option>
                        <option value="DEVOLUCION">❌ Rechazar (Devolución al Productor)</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="fw-semibold text-muted fs-11 mb-1">
                        {formData.veredicto === "DEVOLUCION" ? "MOTIVO DE DEVOLUCIÓN (OBLIGATORIO)" : "OBSERVACIONES ADICIONALES"}
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder={formData.veredicto === "DEVOLUCION" ? "Especifique claramente el motivo del rechazo..." : "Instrucciones adicionales para la bodega o el proveedor..."}
                        value={formData.observaciones}
                        onChange={(e) => onFormChange({ ...formData, observaciones: e.target.value })}
                        required={formData.veredicto === "DEVOLUCION"}
                        style={{ resize: "none" }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="btn-wave" onClick={onClose} disabled={submitting}>Cancelar</Button>
            <Button 
              variant="primary" 
              type="submit" 
              disabled={submitting} 
              className="btn-wave d-flex align-items-center gap-2 px-4"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <i className="fe fe-check-circle"></i>} 
              Confirmar Veredicto
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Modal>
  );
}

