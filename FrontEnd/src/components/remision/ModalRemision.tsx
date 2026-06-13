import React from "react";
import { Plus, Loader2, Trash2 } from "lucide-react";
import { Button, Modal, Form, Row, Col, Badge } from "react-bootstrap";
import Select, { SingleValue } from "react-select";
import { Cosecha, PlacaCabezal, PlacaFurgon, Conductor, Municipio, Proveedor, Transporte, TipoCafe, TipoRemision, TipoEmpaque } from "../../api/catalogs.api";
import { RemisionFormData, RemisionDetalleForm } from "./types";

type SelectOption = { value: string; label: string };

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
  tiposCafe: TipoCafe[];
  tiposRemision: TipoRemision[];
  tiposEmpaque: TipoEmpaque[];
  onHide: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormChange: (data: RemisionFormData) => void;
  onDetalleChange: (index: number, field: string, value: string) => void;
  onAddDetalle: () => void;
  onRemoveDetalle: (index: number) => void;
};

const badgeStyle = { width: "1.5rem", height: "1.5rem", fontSize: "0.75rem" } as const;

const TIPO_VEHICULO_OPTIONS: SelectOption[] = [
  { value: "Camión Rígido", label: "Camión Rígido" },
  { value: "Rastra", label: "Rastra (Cabezal y Furgón)" },
  { value: "Pick-up", label: "Pick-up / Vehículo Liviano" },
];

const findOpt = (options: SelectOption[], value: string) =>
  options.find(o => o.value === value) ?? null;

export default function ModalRemision({
  show, editingId, formData, submitting,
  cosechas, municipios, transportes, conductores,
  placasCabezal, placasFurgon, proveedores,
  tiposCafe, tiposRemision, tiposEmpaque,
  onHide, onSubmit, onFormChange,
  onDetalleChange, onAddDetalle, onRemoveDetalle,
}: Readonly<Props>) {
  const set = (field: keyof RemisionFormData, value: string) =>
    onFormChange({ ...formData, [field]: value });

  const filteredConductores = conductores.filter(
    c => c.id_transporte.toString() === formData.id_transporte
  );

  const cosechaOptions = cosechas.map(c => ({ value: c.id_cosecha.toString(), label: c.cosecha }));
  const municipioOptions = municipios.map(m => ({
    value: m.id_municipio.toString(),
    label: `${m.nombre}${(m as any).departamento?.nombre ? `, ${(m as any).departamento.nombre}` : ""}`,
  }));
  const transporteOptions = transportes.map(t => ({ value: t.id_transporte.toString(), label: t.nombre }));
  const conductorOptions = filteredConductores.map(c => ({ value: c.id_conductor.toString(), label: c.nombre }));
  const placaCabezalOptions = placasCabezal.map(p => ({ value: p.id_placa_cabezal.toString(), label: p.placa }));
  const placaFurgonOptions = placasFurgon.map(p => ({ value: p.id_placa_furgon.toString(), label: p.placa }));
  const proveedorOptions = proveedores.map(p => ({ value: p.id_proveedor.toString(), label: p.nombre }));
  const tipoCafeOptions = tiposCafe.map(t => ({ value: t.id_tipo_cafe.toString(), label: t.tipo_cafe }));
  const tipoRemisionOptions = tiposRemision.map(t => ({ value: t.id_tipo_remision.toString(), label: t.tipo_remision }));
  const tipoEmpaqueOptions = tiposEmpaque.map(t => ({ value: t.id_tipo_empaque.toString(), label: t.tipo_empaque }));

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
                  <Select
                    options={cosechaOptions}
                    value={findOpt(cosechaOptions, formData.id_cosecha)}
                    onChange={(opt: SingleValue<SelectOption>) => set("id_cosecha", opt?.value ?? "")}
                    placeholder="Seleccione cosecha"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Municipio de Origen</Form.Label>
                  <Select
                    options={municipioOptions}
                    value={findOpt(municipioOptions, formData.id_municipio)}
                    onChange={(opt: SingleValue<SelectOption>) => set("id_municipio", opt?.value ?? "")}
                    placeholder="Seleccione un municipio"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Empresa de Transporte</Form.Label>
                  <Select
                    options={transporteOptions}
                    value={findOpt(transporteOptions, formData.id_transporte)}
                    onChange={(opt: SingleValue<SelectOption>) =>
                      onFormChange({ ...formData, id_transporte: opt?.value ?? "", id_conductor: "" })
                    }
                    placeholder="Seleccione transporte"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Conductor</Form.Label>
                  <Select
                    options={conductorOptions}
                    value={findOpt(conductorOptions, formData.id_conductor)}
                    onChange={(opt: SingleValue<SelectOption>) => set("id_conductor", opt?.value ?? "")}
                    placeholder="Seleccione un conductor"
                    isDisabled={!formData.id_transporte}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Tipo de Vehículo</Form.Label>
                  <Select
                    options={TIPO_VEHICULO_OPTIONS}
                    value={findOpt(TIPO_VEHICULO_OPTIONS, formData.tipo_vehiculo)}
                    onChange={(opt: SingleValue<SelectOption>) =>
                      onFormChange({
                        ...formData,
                        tipo_vehiculo: opt?.value ?? "",
                        id_placa_furgon: opt?.value === "Rastra" ? formData.id_placa_furgon : "",
                      })
                    }
                    placeholder="Seleccione tipo"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Placa Cabezal (Tractor o Vehículo)</Form.Label>
                  <Select
                    options={placaCabezalOptions}
                    value={findOpt(placaCabezalOptions, formData.id_placa_cabezal)}
                    onChange={(opt: SingleValue<SelectOption>) => set("id_placa_cabezal", opt?.value ?? "")}
                    placeholder="Seleccione placa"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Placa Furgón (Tráiler)</Form.Label>
                  <Select
                    options={placaFurgonOptions}
                    value={findOpt(placaFurgonOptions, formData.id_placa_furgon)}
                    onChange={(opt: SingleValue<SelectOption>) => set("id_placa_furgon", opt?.value ?? "")}
                    placeholder="Sin furgón"
                    isDisabled={formData.tipo_vehiculo !== "Rastra"}
                    isClearable
                  />
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
                      <Badge bg="warning-transparent"  className="text-dark">No editable (En Proceso)</Badge>
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
                        <Select
                          options={proveedorOptions}
                          value={findOpt(proveedorOptions, detalle.id_proveedor)}
                          onChange={(opt: SingleValue<SelectOption>) =>
                            onDetalleChange(index, "id_proveedor", opt?.value ?? "")
                          }
                          placeholder="Busque y seleccione al proveedor"
                          isDisabled={isReadOnly}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
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
                        <Form.Label>Tipo de Remisión</Form.Label>
                        <Select
                          options={tipoRemisionOptions}
                          value={findOpt(tipoRemisionOptions, detalle.id_tipo_remision)}
                          onChange={(opt: SingleValue<SelectOption>) =>
                            onDetalleChange(index, "id_tipo_remision", opt?.value ?? "")
                          }
                          placeholder="Seleccione tipo"
                          isDisabled={isReadOnly}
                          isClearable
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Tipo de Café</Form.Label>
                        <Select
                          options={tipoCafeOptions}
                          value={findOpt(tipoCafeOptions, detalle.id_tipo_cafe)}
                          onChange={(opt: SingleValue<SelectOption>) =>
                            onDetalleChange(index, "id_tipo_cafe", opt?.value ?? "")
                          }
                          placeholder="Seleccione tipo"
                          isDisabled={isReadOnly}
                          isClearable
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Tipo de Empaque</Form.Label>
                        <Select
                          options={tipoEmpaqueOptions}
                          value={findOpt(tipoEmpaqueOptions, detalle.id_tipo_empaque)}
                          onChange={(opt: SingleValue<SelectOption>) =>
                            onDetalleChange(index, "id_tipo_empaque", opt?.value ?? "")
                          }
                          placeholder="Seleccione tipo"
                          isDisabled={isReadOnly}
                          isClearable
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
