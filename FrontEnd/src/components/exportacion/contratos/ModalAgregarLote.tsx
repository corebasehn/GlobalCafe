import { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { PatternFormat } from "react-number-format";
import Select from "react-select";
import { Save } from "lucide-react";
import {
  CERTIFICACIONES_DISPONIBLES, CALIDADES_DISPONIBLES, TIPOS_EMPAQUE,
  type Lote, type Certificacion, type TipoEmpaque,
} from "../../../pages/exportacion/contratos/mockData";

type Props = {
  show: boolean;
  existingLotes: { no_lote: string; no_partida: string; contratoId: string }[];
  onHide: () => void;
  onSubmit: (lote: Lote) => void;
};

const EMPTY_FORM = {
  no_lote: "",
  no_partida: "",
  calidad: "",
  certificaciones: [] as Certificacion[],
  cooperativa: "",
  defectos_maximos: "",
  peso_neto_qq: "",
  cantidad_sacos: "",
  tipo_empaque: "" as TipoEmpaque | "",
  marca_sacos: "",
};

const PARTIDA_PATTERN = /^13-\d{3}-\d{3}$/;

export default function ModalAgregarLote({ show, existingLotes, onHide, onSubmit }: Readonly<Props>) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setFieldErrors({});
    onHide();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!form.no_lote.trim()) errors.no_lote = "Campo requerido.";
    if (!PARTIDA_PATTERN.test(form.no_partida)) errors.no_partida = "Formato inválido. Use 13-XXX-XXX.";
    if (!form.calidad) errors.calidad = "Seleccione una calidad.";
    if (!form.cooperativa.trim()) errors.cooperativa = "Campo requerido.";
    if (form.defectos_maximos === "" || Number(form.defectos_maximos) < 0) errors.defectos_maximos = "Ingrese un valor válido.";
    if (!form.peso_neto_qq || Number(form.peso_neto_qq) <= 0) errors.peso_neto_qq = "Debe ser mayor a 0.";
    if (!form.cantidad_sacos || Number(form.cantidad_sacos) <= 0) errors.cantidad_sacos = "Debe ser mayor a 0.";
    if (!form.tipo_empaque) errors.tipo_empaque = "Seleccione un tipo de empaque.";

    // Validación crítica: la combinación (No. Lote, No. Partida) debe ser única en todo el sistema, sin importar el contrato.
    if (!errors.no_lote && !errors.no_partida) {
      const duplicado = existingLotes.find(
        (l) => l.no_lote === form.no_lote.trim() && l.no_partida === form.no_partida
      );
      if (duplicado) {
        errors.no_lote = `Ya existe un lote con este No. de Lote y Partida en el contrato ${duplicado.contratoId}.`;
        errors.no_partida = " ";
      }
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    onSubmit({
      no_lote: form.no_lote.trim(),
      no_partida: form.no_partida,
      calidad: form.calidad,
      certificaciones: form.certificaciones,
      cooperativa: form.cooperativa.trim(),
      defectos_maximos: Number(form.defectos_maximos),
      peso_neto_qq: Number(form.peso_neto_qq),
      cantidad_sacos: Number(form.cantidad_sacos),
      tipo_empaque: form.tipo_empaque as TipoEmpaque,
      marca_sacos: form.marca_sacos.trim(),
      estado: "Pendiente",
    });
    handleClose();
  };

  const calidadOptions = CALIDADES_DISPONIBLES.map((c) => ({ value: c, label: c }));
  const certificacionOptions = CERTIFICACIONES_DISPONIBLES.map((c) => ({ value: c, label: c }));
  const tipoEmpaqueOptions = TIPOS_EMPAQUE.map((t) => ({ value: t, label: t }));

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Lote</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">No. Lote <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text" inputMode="numeric" placeholder="Ej. 150"
                  isInvalid={!!fieldErrors.no_lote}
                  value={form.no_lote}
                  onChange={(e) => setForm((f) => ({ ...f, no_lote: e.target.value.replace(/\D/g, "") }))}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.no_lote}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">No. Partida <span className="text-danger">*</span></Form.Label>
                <PatternFormat
                  format="13-###-###"
                  mask="_"
                  placeholder="13-___-___"
                  allowEmptyFormatting
                  className={`form-control${fieldErrors.no_partida ? " is-invalid" : ""}`}
                  value={form.no_partida}
                  onValueChange={(values) => setForm((f) => ({ ...f, no_partida: values.formattedValue }))}
                />
                {fieldErrors.no_partida?.trim() && (
                  <div className="invalid-feedback d-block">{fieldErrors.no_partida}</div>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Calidad <span className="text-danger">*</span></Form.Label>
                <Select
                  classNamePrefix="Select2"
                  placeholder="Busque o seleccione..."
                  isSearchable
                  options={calidadOptions}
                  value={form.calidad ? { value: form.calidad, label: form.calidad } : null}
                  onChange={(opt) => setForm((f) => ({ ...f, calidad: opt?.value || "" }))}
                  styles={{ control: (base) => ({ ...base, borderColor: fieldErrors.calidad ? "#dc3545" : base.borderColor }) }}
                />
                {fieldErrors.calidad && <div className="text-danger" style={{ fontSize: "0.7rem" }}>{fieldErrors.calidad}</div>}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Certificaciones</Form.Label>
                <Select
                  classNamePrefix="Select2"
                  placeholder="Seleccione una o varias..."
                  isMulti
                  options={certificacionOptions}
                  value={certificacionOptions.filter((o) => form.certificaciones.includes(o.value as Certificacion))}
                  onChange={(opts) => setForm((f) => ({ ...f, certificaciones: opts.map((o) => o.value as Certificacion) }))}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Cooperativa / Productor <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text" placeholder="Nombre de la cooperativa o productor"
                  isInvalid={!!fieldErrors.cooperativa}
                  value={form.cooperativa}
                  onChange={(e) => setForm((f) => ({ ...f, cooperativa: e.target.value }))}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.cooperativa}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Defectos Máximos <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="number" placeholder="0"
                  isInvalid={!!fieldErrors.defectos_maximos}
                  value={form.defectos_maximos}
                  onWheel={(e) => e.currentTarget.blur()}
                  onChange={(e) => setForm((f) => ({ ...f, defectos_maximos: e.target.value }))}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.defectos_maximos}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Peso Neto Objetivo (QQ) <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="number" step="0.01" placeholder="0.00"
                  isInvalid={!!fieldErrors.peso_neto_qq}
                  value={form.peso_neto_qq}
                  onWheel={(e) => e.currentTarget.blur()}
                  onChange={(e) => setForm((f) => ({ ...f, peso_neto_qq: e.target.value }))}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.peso_neto_qq}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Cantidad de Sacos Objetivo <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="number" placeholder="0"
                  isInvalid={!!fieldErrors.cantidad_sacos}
                  value={form.cantidad_sacos}
                  onWheel={(e) => e.currentTarget.blur()}
                  onChange={(e) => setForm((f) => ({ ...f, cantidad_sacos: e.target.value }))}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.cantidad_sacos}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Tipo de Empaque <span className="text-danger">*</span></Form.Label>
                <Select
                  classNamePrefix="Select2"
                  placeholder="Seleccione..."
                  options={tipoEmpaqueOptions}
                  value={form.tipo_empaque ? { value: form.tipo_empaque, label: form.tipo_empaque } : null}
                  onChange={(opt) => setForm((f) => ({ ...f, tipo_empaque: (opt?.value as TipoEmpaque) || "" }))}
                  styles={{ control: (base) => ({ ...base, borderColor: fieldErrors.tipo_empaque ? "#dc3545" : base.borderColor }) }}
                />
                {fieldErrors.tipo_empaque && <div className="text-danger" style={{ fontSize: "0.7rem" }}>{fieldErrors.tipo_empaque}</div>}
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label className="fw-medium">Marca de Sacos</Form.Label>
                <Form.Control
                  as="textarea" rows={2}
                  placeholder="Texto libre tipo etiqueta de exportación (marca, contraseñas, país de origen, etc.)"
                  value={form.marca_sacos}
                  onChange={(e) => setForm((f) => ({ ...f, marca_sacos: e.target.value }))}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" type="submit" className="d-flex align-items-center gap-2">
            <Save className="w-4 h-4" /> Agregar Lote
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
