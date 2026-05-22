import React from "react";
import { CheckCircle, RefreshCcw, XCircle, FileText, Loader2 } from "lucide-react";
import { Modal, Form, Button, Row, Col, Table, Badge } from "react-bootstrap";
import Select from "react-select";
import type { MuestraGerencia } from "../Containers/AprobacionGerenciaPage";
import type { VeredictoGerenciaRequest } from "../../../../api/analisis.api";

const VEREDICTO_OPTIONS = [
  { value: "APROBAR",         label: "✅ Aprobar (Autorizar Descarga)" },
  { value: "SEGUNDA_MUESTRA", label: "🔄 Segunda Muestra (Regresa a Muestreo)" },
  { value: "DEVOLUCION",      label: "❌ Rechazar (Devolución al Productor)" },
];

export interface EvaluacionModalProps {
  muestra: MuestraGerencia | null;
  formData: VeredictoGerenciaRequest;
  submitting: boolean;
  onClose: () => void;
  onFormChange: (data: VeredictoGerenciaRequest) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function getVeredictoIcon(veredicto: string) {
  if (veredicto === "APROBAR") return <CheckCircle className="w-5 h-5 text-emerald-600" />;
  if (veredicto === "SEGUNDA_MUESTRA") return <RefreshCcw className="w-5 h-5 text-amber-600" />;
  return <XCircle className="w-5 h-5 text-red-600" />;
}

export default function EvaluacionModal({ muestra, formData, submitting, onClose, onFormChange, onSubmit }: EvaluacionModalProps) {
  return (
    <Modal show={!!muestra} onHide={onClose} size="lg">
      {muestra && (
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Evaluación de Muestra del Laboratorio</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-3">

            {/* ── Resultados del Laboratorio ── */}
            <div className="border rounded mb-3">
              <div className="bg-light px-3 py-2 border-bottom d-flex align-items-center gap-2">
                <FileText size={14} className="text-muted" />
                <span className="fw-semibold" style={{ fontSize: "0.875rem" }}>Resultados del Laboratorio</span>
              </div>
              <div className="p-3">

                {/* Métricas */}
                <Row className="g-2 mb-3">
                  <Col xs={6} md={4}>
                    <p className="text-muted mb-0" style={{ fontSize: "0.72rem" }}>Catador</p>
                    <p className="fw-medium mb-0" style={{ fontSize: "0.85rem" }}>{muestra.catador_nombre}</p>
                  </Col>
                  <Col xs={6} md={4}>
                    <p className="text-muted mb-0" style={{ fontSize: "0.72rem" }}>Calidad Perfilada</p>
                    <Badge bg="info-transparent">{muestra.calidad_nombre}</Badge>
                  </Col>
                  <Col xs={6} md={4}>
                    <p className="text-muted mb-0" style={{ fontSize: "0.72rem" }}>Humedad</p>
                    <p className="fw-medium mb-0" style={{ fontSize: "0.85rem" }}>{muestra.humedad}%</p>
                  </Col>
                  <Col xs={6} md={4}>
                    <p className="text-muted mb-0" style={{ fontSize: "0.72rem" }}>Daño</p>
                    <p className="fw-medium mb-0" style={{ fontSize: "0.85rem" }}>{muestra.dano}%</p>
                  </Col>
                  <Col xs={6} md={4}>
                    <p className="text-muted mb-0" style={{ fontSize: "0.72rem" }}>Primer Rend.</p>
                    <p className="fw-medium mb-0" style={{ fontSize: "0.85rem" }}>{muestra.primer_rendimiento || "N/A"}</p>
                  </Col>
                  <Col xs={6} md={4}>
                    <p className="text-muted mb-0" style={{ fontSize: "0.72rem" }}>Segundo Rend.</p>
                    <p className="fw-medium mb-0" style={{ fontSize: "0.85rem" }}>{muestra.segundo_rendimiento || "N/A"}</p>
                  </Col>
                </Row>

                {/* Tablas Defectos / Zarandas / Tazas */}
                <Row className="g-2 mb-3">
                  {[
                    { title: "Defectos",    items: muestra.analisis_defectos, keyProp: "id_defecto", nameFn: (x: any) => x.defecto.nombre },
                    { title: "Zarandas",    items: muestra.analisis_zarandas, keyProp: "id_zaranda", nameFn: (x: any) => x.zaranda.nombre },
                    { title: "Atrib. Taza", items: muestra.analisis_tazas,    keyProp: "id_tazas",   nameFn: (x: any) => x.taza.nombre },
                  ].map(({ title, items, keyProp, nameFn }) => (
                    <Col xs={4} key={title}>
                      <Table size="sm" bordered className="mb-0" style={{ fontSize: "0.78rem" }}>
                        <thead className="table-light">
                          <tr><th colSpan={2} className="text-center py-1">{title}</th></tr>
                        </thead>
                        <tbody>
                          {items.length
                            ? items.map((item: any) => (
                                <tr key={item[keyProp]}>
                                  <td className="text-muted">{nameFn(item)}</td>
                                  <td className="text-end fw-medium">{item.cantidad}</td>
                                </tr>
                              ))
                            : <tr><td colSpan={2} className="text-center fst-italic text-muted">—</td></tr>
                          }
                        </tbody>
                      </Table>
                    </Col>
                  ))}
                </Row>

                {/* Notas del catador */}
                <Form.Group>
                  <Form.Label className="text-muted mb-1" style={{ fontSize: "0.72rem" }}>Notas del Catador</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    readOnly
                    value={muestra.observaciones_laboratorio}
                    className="bg-light"
                    style={{ fontSize: "0.85rem", resize: "none" }}
                  />
                </Form.Group>
              </div>
            </div>

            {/* ── Veredicto de Gerencia ── */}
            <div className="border border-primary rounded">
              <div className="bg-primary bg-opacity-10 px-3 py-2 border-bottom d-flex align-items-center gap-2">
                {getVeredictoIcon(formData.veredicto)}
                <span className="fw-semibold" style={{ fontSize: "0.875rem" }}>Veredicto de Gerencia</span>
              </div>
              <div className="p-3">
                <Row className="g-3">
                  <Col md={5}>
                    <Form.Group>
                      <Form.Label className="fw-medium mb-1" style={{ fontSize: "0.82rem" }}>Decisión</Form.Label>
                      <Select
                        classNamePrefix="Select2"
                        options={VEREDICTO_OPTIONS}
                        value={VEREDICTO_OPTIONS.find(o => o.value === formData.veredicto) ?? null}
                        onChange={(opt) => opt && onFormChange({ ...formData, veredicto: opt.value as VeredictoGerenciaRequest["veredicto"] })}
                        isSearchable={false}
                        styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={7}>
                    <Form.Group>
                      <Form.Label className="fw-medium mb-1" style={{ fontSize: "0.82rem" }}>
                        {formData.veredicto === "DEVOLUCION" ? "Motivo de Devolución (Obligatorio)" : "Observaciones de Gerencia"}
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        size="sm"
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
            <Button variant="secondary" onClick={onClose} disabled={submitting}>Cancelar</Button>
            <Button variant="primary" type="submit" disabled={submitting} className="flex items-center gap-2">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : getVeredictoIcon(formData.veredicto)} Confirmar Veredicto
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Modal>
  );
}
