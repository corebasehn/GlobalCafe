import React, { useState } from "react";
import { Plus, Loader2, Trash2 } from "lucide-react";
import { Button, Modal, Form, Row, Col, Badge } from "react-bootstrap";
import Select, { SingleValue } from "react-select";
import {
  Cosecha,
  PlacaCabezal,
  PlacaFurgon,
  Conductor,
  Municipio,
  Proveedor,
  Transporte,
  TipoCafe,
  TipoRemision,
  TipoEmpaque,
  Departamento,
} from "../../api/catalogs.api";
import { RemisionFormData, RemisionDetalleForm } from "./types";
import ModalCreacionRapidaCatalogo, { CatalogoTipo } from "./ModalCreacionRapidaCatalogo";

type SelectOption = { value: string; label: string };

type Props = {
  show: boolean;
  editingId: number | null;
  formData: RemisionFormData;
  submitting: boolean;
  cosechas: Cosecha[];
  municipios: Municipio[];
  departamentos?: Departamento[];
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
  onCatalogCreated?: (tipo: CatalogoTipo, nuevoItem: any) => void;
};

const badgeStyle = { width: "1.5rem", height: "1.5rem", fontSize: "0.75rem" } as const;

const DEFAULT_TIPO_VEHICULO_OPTIONS: SelectOption[] = [
  { value: "Camión Rígido", label: "Camión Rígido" },
  { value: "Rastra", label: "Rastra (Cabezal y Furgón)" },
  { value: "Pick-up", label: "Pick-up / Vehículo Liviano" },
];

const findOpt = (options: SelectOption[], value: string) =>
  options.find((o) => o.value === value) ?? null;

export default function ModalRemision({
  show,
  editingId,
  formData,
  submitting,
  cosechas,
  municipios,
  departamentos = [],
  transportes,
  conductores,
  placasCabezal,
  placasFurgon,
  proveedores,
  tiposCafe,
  tiposRemision,
  tiposEmpaque,
  onHide,
  onSubmit,
  onFormChange,
  onDetalleChange,
  onAddDetalle,
  onRemoveDetalle,
  onCatalogCreated,
}: Readonly<Props>) {
  const [tipoVehiculoOptions, setTipoVehiculoOptions] = useState<SelectOption[]>(DEFAULT_TIPO_VEHICULO_OPTIONS);
  const [quickModal, setQuickModal] = useState<{
    show: boolean;
    tipo: CatalogoTipo | null;
    detalleIndex?: number;
  }>({
    show: false,
    tipo: null,
  });

  const set = (field: keyof RemisionFormData, value: string) =>
    onFormChange({ ...formData, [field]: value });

  const filteredConductores = conductores.filter(
    (c) => c.id_transporte.toString() === formData.id_transporte
  );

  const cosechaOptions = cosechas.map((c) => ({ value: c.id_cosecha.toString(), label: c.cosecha }));
  const municipioOptions = municipios.map((m) => ({
    value: m.id_municipio.toString(),
    label: `${m.nombre}${(m as any).departamento?.nombre ? `, ${(m as any).departamento.nombre}` : ""}`,
  }));
  const transporteOptions = transportes.map((t) => ({ value: t.id_transporte.toString(), label: t.nombre }));
  const conductorOptions = filteredConductores.map((c) => ({ value: c.id_conductor.toString(), label: c.nombre }));
  const placaCabezalOptions = placasCabezal.map((p) => ({ value: p.id_placa_cabezal.toString(), label: p.placa }));
  const placaFurgonOptions = placasFurgon.map((p) => ({ value: p.id_placa_furgon.toString(), label: p.placa }));
  const proveedorOptions = proveedores.map((p) => ({ value: p.id_proveedor.toString(), label: p.nombre }));
  const tipoCafeOptions = tiposCafe.map((t) => ({ value: t.id_tipo_cafe.toString(), label: t.tipo_cafe }));
  const tipoRemisionOptions = tiposRemision.map((t) => ({ value: t.id_tipo_remision.toString(), label: t.tipo_remision }));
  const tipoEmpaqueOptions = tiposEmpaque.map((t) => ({ value: t.id_tipo_empaque.toString(), label: t.tipo_empaque }));

  const handleOpenQuickCreate = (tipo: CatalogoTipo, detalleIndex?: number) => {
    setQuickModal({
      show: true,
      tipo,
      detalleIndex,
    });
  };

  const handleQuickCreateSuccess = (tipo: CatalogoTipo, nuevoItem: any) => {
    onCatalogCreated?.(tipo, nuevoItem);

    switch (tipo) {
      case "municipio":
        set("id_municipio", nuevoItem.id_municipio.toString());
        break;
      case "transporte":
        onFormChange({
          ...formData,
          id_transporte: nuevoItem.id_transporte.toString(),
          id_conductor: "",
        });
        break;
      case "conductor":
        onFormChange({
          ...formData,
          id_transporte: nuevoItem.id_transporte ? nuevoItem.id_transporte.toString() : formData.id_transporte,
          id_conductor: nuevoItem.id_conductor.toString(),
        });
        break;
      case "tipo_vehiculo":
        setTipoVehiculoOptions((prev) => {
          if (prev.some((o) => o.value === nuevoItem.value)) return prev;
          return [...prev, nuevoItem];
        });
        set("tipo_vehiculo", nuevoItem.value);
        break;
      case "placa_cabezal":
        set("id_placa_cabezal", nuevoItem.id_placa_cabezal.toString());
        break;
      case "placa_furgon":
        set("id_placa_furgon", nuevoItem.id_placa_furgon.toString());
        break;
      case "proveedor":
        if (quickModal.detalleIndex !== undefined) {
          onDetalleChange(quickModal.detalleIndex, "id_proveedor", nuevoItem.id_proveedor.toString());
        }
        break;
      case "tipo_cafe":
        if (quickModal.detalleIndex !== undefined) {
          onDetalleChange(quickModal.detalleIndex, "id_tipo_cafe", nuevoItem.id_tipo_cafe.toString());
        }
        break;
      case "tipo_empaque":
        if (quickModal.detalleIndex !== undefined) {
          onDetalleChange(quickModal.detalleIndex, "id_tipo_empaque", nuevoItem.id_tipo_empaque.toString());
        }
        break;
    }
  };

  const renderLabelWithPlus = (
    label: string,
    catalogType: CatalogoTipo,
    tooltip: string,
    detalleIndex?: number,
    disabled?: boolean
  ) => (
    <div className="d-flex justify-content-between align-items-center mb-1">
      <Form.Label className="mb-0 fw-semibold fs-13 text-dark">{label}</Form.Label>
      {!disabled && (
        <button
          type="button"
          className="btn btn-link p-0 text-primary text-decoration-none d-inline-flex align-items-center gap-1 fw-semibold fs-12 border-0 bg-transparent shadow-none"
          title={tooltip}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOpenQuickCreate(catalogType, detalleIndex);
          }}
          style={{ cursor: "pointer" }}
        >
          <span
            className="d-inline-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle border border-primary-subtle"
            style={{ width: "18px", height: "18px" }}
          >
            <Plus size={12} strokeWidth={2.5} />
          </span>
          <span className="ms-1">Nuevo</span>
        </button>
      )}
    </div>
  );

  return (
    <>
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
                >
                  1
                </span>
                Datos del Viaje y Transporte
              </h3>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold fs-13 text-dark">Cosecha</Form.Label>
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
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <Form.Label className="mb-0 fw-semibold fs-13 text-dark">Tipo de Remisión</Form.Label>
                      {formData.id_tipo_remision === "1" || findOpt(tipoRemisionOptions, formData.id_tipo_remision)?.label.toLowerCase().includes("int") ? (
                        <Badge bg="info-subtle" className="text-info border border-info-subtle fw-semibold">
                          Correlativo: INT-XXXXX
                        </Badge>
                      ) : (
                        <Badge bg="primary-subtle" className="text-primary border border-primary-subtle fw-semibold">
                          Correlativo: EXT-XXXXX
                        </Badge>
                      )}
                    </div>
                    <Select
                      options={tipoRemisionOptions}
                      value={findOpt(tipoRemisionOptions, formData.id_tipo_remision)}
                      onChange={(opt: SingleValue<SelectOption>) => {
                        const newTipo = opt?.value ?? "";
                        onFormChange({
                          ...formData,
                          id_tipo_remision: newTipo,
                          detalles: formData.detalles.map((d) => ({
                            ...d,
                            id_tipo_remision: newTipo,
                          })),
                        });
                      }}
                      placeholder="Seleccione tipo (Interno / Externo)"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    {renderLabelWithPlus("Municipio de Origen", "municipio", "Crear nuevo municipio")}
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
                    {renderLabelWithPlus("Empresa de Transporte", "transporte", "Crear nueva empresa de transporte")}
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
                    {renderLabelWithPlus("Conductor", "conductor", "Crear nuevo conductor", undefined, !formData.id_transporte)}
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
                    {renderLabelWithPlus("Tipo de Vehículo", "tipo_vehiculo", "Agregar nuevo tipo de vehículo")}
                    <Select
                      options={tipoVehiculoOptions}
                      value={findOpt(tipoVehiculoOptions, formData.tipo_vehiculo)}
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
                    {renderLabelWithPlus("Placa Cabezal (Tractor o Vehículo)", "placa_cabezal", "Crear nueva placa cabezal")}
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
                    {renderLabelWithPlus(
                      "Placa Furgón (Tráiler)",
                      "placa_furgon",
                      "Crear nueva placa furgón",
                      undefined,
                      formData.tipo_vehiculo !== "Rastra"
                    )}
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
                    <Form.Label className="fw-semibold fs-13 text-dark">Número de Marchamo (Opcional)</Form.Label>
                    <Form.Control
                      value={formData.marchamo}
                      onChange={(e) => set("marchamo", e.target.value)}
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
                    className={`bg-neutral-50 p-4 rounded-xl border border-neutral-200 position-relative ${
                      isReadOnly ? "opacity-75" : ""
                    } mb-3`}
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
                        <Badge bg="warning-transparent" className="text-dark">
                          No editable (En Proceso)
                        </Badge>
                      </div>
                    )}
                    <Row className="g-3">
                      <Col xs={12}>
                        <h3 className="font-bold text-neutral-900 mb-0 d-flex align-items-center gap-2 fs-6">
                          <span
                            className="bg-primary text-white border border-primary rounded-circle d-inline-flex align-items-center justify-content-center fw-bold"
                            style={badgeStyle}
                          >
                            2
                          </span>
                          Datos de la Carga (Café por Proveedor)
                        </h3>
                      </Col>

                      <Col xs={12}>
                        <Form.Group>
                          {renderLabelWithPlus(
                            `Proveedor / Finca ${index + 1}`,
                            "proveedor",
                            "Crear nuevo proveedor / finca",
                            index,
                            isReadOnly
                          )}
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
                          <Form.Label className="fw-semibold fs-13 text-dark">Documento de Remisión</Form.Label>
                          <Form.Control
                            value={detalle.remision}
                            onChange={(e) => onDetalleChange(index, "remision", e.target.value)}
                            placeholder="No. de Guía o Remisión Física"
                            required
                            disabled={isReadOnly}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold fs-13 text-dark">Tipo de Remisión</Form.Label>
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
                          {renderLabelWithPlus(
                            "Tipo de Café",
                            "tipo_cafe",
                            "Crear nuevo tipo de café",
                            index,
                            isReadOnly
                          )}
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
                          {renderLabelWithPlus(
                            "Tipo de Empaque",
                            "tipo_empaque",
                            "Crear nuevo tipo de empaque",
                            index,
                            isReadOnly
                          )}
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
                          <Form.Label className="fw-semibold fs-13 text-dark">Cantidad de Sacos (Declarados)</Form.Label>
                          <Form.Control
                            type="number"
                            value={detalle.cantidad_sacos}
                            onChange={(e) => onDetalleChange(index, "cantidad_sacos", e.target.value)}
                            onWheel={(e) => e.currentTarget.blur()}
                            placeholder="0"
                            required
                            disabled={isReadOnly}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold fs-13 text-dark">Peso Estimado (Quintales)</Form.Label>
                          <Form.Control
                            type="number"
                            step="0.01"
                            value={detalle.cantidad_qq}
                            onChange={(e) => onDetalleChange(index, "cantidad_qq", e.target.value)}
                            onWheel={(e) => e.currentTarget.blur()}
                            placeholder="0.00"
                            required
                            disabled={isReadOnly}
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label className="fw-semibold fs-13 text-dark">Observaciones de esta carga</Form.Label>
                          <Form.Control
                            value={detalle.observaciones}
                            onChange={(e) => onDetalleChange(index, "observaciones", e.target.value)}
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
            <Button variant="secondary" onClick={onHide} disabled={submitting}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting && <Loader2 className="w-4 h-4 animate-spin me-2" />}
              {editingId ? "Guardar Cambios" : "Registrar Ingreso"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal de Creación Rápida de Catálogos */}
      <ModalCreacionRapidaCatalogo
        show={quickModal.show}
        tipo={quickModal.tipo}
        onHide={() => setQuickModal({ show: false, tipo: null })}
        departamentos={departamentos}
        municipios={municipios}
        transportes={transportes}
        defaultContext={{
          id_transporte: formData.id_transporte,
          id_municipio: formData.id_municipio,
        }}
        onSuccess={handleQuickCreateSuccess}
      />
    </>
  );
}
