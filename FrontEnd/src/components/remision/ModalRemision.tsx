import React from "react";
import { Plus, Loader2, Trash2 } from "lucide-react";
import { Button, Modal, Form, Row, Col, Badge } from "react-bootstrap";
import { Cosecha, PlacaCabezal, PlacaFurgon, Conductor, Municipio, Proveedor, Transporte } from "../../api/catalogs.api";
import { RemisionFormData, RemisionDetalleForm } from "./types";

type Props = {
  show: boolean;
  editingId: number | null;
  formData: RemisionFormData;
  submitting: boolean;
  cosechas: Cosecha[];
  municipios: Municipio[];
  transportes: Transporte[];
  conductores: Conductor[];
  placasCabezal: PlacaCabezal[];
  placasFurgon: PlacaFurgon[];
  proveedores: Proveedor[];
  onHide: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormChange: (data: RemisionFormData) => void;
  onDetalleChange: (index: number, field: string, value: string) => void;
  onAddDetalle: () => void;
  onRemoveDetalle: (index: number) => void;
};

const badgeStyle = { width: "1.5rem", height: "1.5rem", fontSize: "0.75rem" } as const;

export default function ModalRemision({
  show, editingId, formData, submitting,
  cosechas, municipios, transportes, conductores,
  placasCabezal, placasFurgon, proveedores,
  onHide, onSubmit, onFormChange,
  onDetalleChange, onAddDetalle, onRemoveDetalle,
}: Readonly<Props>) {
  const set = (field: keyof RemisionFormData, value: string) =>
    onFormChange({ ...formData, [field]: value });

  const filteredConductores = conductores.filter(
    c => c.id_transporte.toString() === formData.id_transporte
  );

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? "Editar Remisión" : "Nueva Remisión (Ingreso a Portería)"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="space-y-6">

          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
            <h3 className="font-bold text-neutral-900 mb-4 d-flex align-items-center gap-2 fs-6">
              <span
                className="bg-primary text-white border border-primary rounded-circle d-inline-flex align-items-center justify-content-center fw-bold"
                style={badgeStyle}
              >1</span>
              Datos del Viaje y Transporte
            </h3>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Cosecha</Form.Label>
                  <Form.Select value={formData.id_cosecha} onChange={e => set("id_cosecha", e.target.value)} required>
                    {cosechas.map(c => (
                      <option key={c.id_cosecha} value={c.id_cosecha.toString()}>{c.cosecha}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Municipio de Origen</Form.Label>
                  <Form.Select value={formData.id_municipio} onChange={e => set("id_municipio", e.target.value)} required>
                    <option value="">Seleccione un municipio</option>
                    {municipios.map(m => (
                      <option key={m.id_municipio} value={m.id_municipio.toString()}>
                        {`${m.nombre}${(m as any).departamento?.nombre ? `, ${(m as any).departamento.nombre}` : ""}`}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Empresa de Transporte</Form.Label>
                  <Form.Select
                    value={formData.id_transporte}
                    onChange={e => onFormChange({ ...formData, id_transporte: e.target.value, id_conductor: "" })}
                    required
                  >
                    <option value="">Seleccione transporte</option>
                    {transportes.map(t => (
                      <option key={t.id_transporte} value={t.id_transporte.toString()}>{t.nombre}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Conductor</Form.Label>
                  <Form.Select
                    value={formData.id_conductor}
                    onChange={e => set("id_conductor", e.target.value)}
                    required
                    disabled={!formData.id_transporte}
                  >
                    <option value="">Seleccione un conductor</option>
                    {filteredConductores.map(c => (
                      <option key={c.id_conductor} value={c.id_conductor.toString()}>{c.nombre}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Tipo de Vehículo</Form.Label>
                  <Form.Select
                    value={formData.tipo_vehiculo}
                    onChange={e => onFormChange({
                      ...formData,
                      tipo_vehiculo: e.target.value,
                      id_placa_furgon: e.target.value === "Rastra" ? formData.id_placa_furgon : "",
                    })}
                    required
                  >
                    <option value="Camión Rígido">Camión Rígido</option>
                    <option value="Rastra">Rastra (Cabezal y Furgón)</option>
                    <option value="Pick-up">Pick-up / Vehículo Liviano</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Placa Cabezal (Tractor o Vehículo)</Form.Label>
                  <Form.Select value={formData.id_placa_cabezal} onChange={e => set("id_placa_cabezal", e.target.value)} required>
                    <option value="">Seleccione placa</option>
                    {placasCabezal.map(p => (
                      <option key={p.id_placa_cabezal} value={p.id_placa_cabezal.toString()}>{p.placa}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Placa Furgón (Tráiler)</Form.Label>
                  <Form.Select
                    value={formData.id_placa_furgon}
                    onChange={e => set("id_placa_furgon", e.target.value)}
                    disabled={formData.tipo_vehiculo !== "Rastra"}
                  >
                    <option value="">Sin furgón</option>
                    {placasFurgon.map(p => (
                      <option key={p.id_placa_furgon} value={p.id_placa_furgon.toString()}>{p.placa}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Número de Marchamo (Opcional)</Form.Label>
                  <Form.Control
                    value={formData.marchamo}
                    onChange={e => set("marchamo", e.target.value)}
                    placeholder="Si trae sello de seguridad..."
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>

          <div className="space-y-4 pt-4">
            {formData.detalles.map((detalle: RemisionDetalleForm, index: number) => {
              const isReadOnly = detalle.is_editable === false;
              return (
                <div
                  key={index}
                  className={`bg-neutral-50 p-4 rounded-xl border border-neutral-200 position-relative ${isReadOnly ? "opacity-75" : ""} mb-3`}
                >
                  {index > 0 && !isReadOnly && (
                    <Button
                      variant="link"
                      onClick={() => onRemoveDetalle(index)}
                      className="position-absolute top-0 end-0 mt-2 me-2 text-danger p-1"
                      title="Eliminar carga"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  )}
                  {isReadOnly && (
                    <div className="position-absolute top-0 end-0 mt-2 me-2">
                      <Badge bg="warning" className="text-dark">No editable (En Proceso)</Badge>
                    </div>
                  )}
                  <Row className="g-3">
                    <Col xs={12}>
                      <h3 className="font-bold text-neutral-900 mb-0 d-flex align-items-center gap-2 fs-6">
                        <span
                          className="bg-primary text-white border border-primary rounded-circle d-inline-flex align-items-center justify-content-center fw-bold"
                          style={badgeStyle}
                        >2</span>
                        Datos de la Carga (Café por Proveedor)
                      </h3>
                    </Col>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label>Proveedor / Finca {index + 1}</Form.Label>
                        <Form.Select
                          value={detalle.id_proveedor}
                          onChange={e => onDetalleChange(index, "id_proveedor", e.target.value)}
                          required
                          disabled={isReadOnly}
                        >
                          <option value="">Busque y seleccione al proveedor</option>
                          {proveedores.map(p => (
                            <option key={p.id_proveedor} value={p.id_proveedor.toString()}>{p.nombre}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label>Documento de Remisión</Form.Label>
                        <Form.Control
                          value={detalle.remision}
                          onChange={e => onDetalleChange(index, "remision", e.target.value)}
                          placeholder="No. de Guía o Remisión Física"
                          required
                          disabled={isReadOnly}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Cantidad de Sacos (Declarados)</Form.Label>
                        <Form.Control
                          type="number"
                          value={detalle.cantidad_sacos}
                          onChange={e => onDetalleChange(index, "cantidad_sacos", e.target.value)}
                          placeholder="0"
                          required
                          disabled={isReadOnly}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Peso Estimado (Quintales)</Form.Label>
                        <Form.Control
                          type="number"
                          step="0.01"
                          value={detalle.cantidad_qq}
                          onChange={e => onDetalleChange(index, "cantidad_qq", e.target.value)}
                          placeholder="0.00"
                          required
                          disabled={isReadOnly}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label>Observaciones de esta carga</Form.Label>
                        <Form.Control
                          value={detalle.observaciones}
                          onChange={e => onDetalleChange(index, "observaciones", e.target.value)}
                          placeholder="Humedad estimada, daños visibles..."
                          disabled={isReadOnly}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              );
            })}

            <Button variant="outline-primary" size="sm" onClick={onAddDetalle} className="d-flex align-items-center gap-2">
              <Plus className="w-4 h-4" /> Añadir otra remisión a este viaje
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={submitting}>Cancelar</Button>
          <Button variant="primary" type="submit" disabled={submitting}>
            {submitting && <Loader2 className="w-4 h-4 animate-spin me-2" />}
            {editingId ? "Guardar Cambios" : "Registrar Ingreso"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
