import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";
import toast from "react-hot-toast";
import type { MuestraPendiente } from "../Containers/LaboratorioPage";
import type { CreateAnalisisRequest } from "../../../../api/analisis.api";
import type { Catador, Calidad, Defecto, Zaranda, Taza } from "../../../../api/catalogs.api";

interface CatacionModalProps {
  muestra: MuestraPendiente | null;
  catadores: Catador[];
  calidades: Calidad[];
  defectos: Defecto[];
  zarandas: Zaranda[];
  tazas: Taza[];
  submitting: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateAnalisisRequest) => Promise<void>;
}

interface FormData {
  id_catador: string;
  id_calidad: string;
  humedad: string;
  dano: string;
  primer_rendimiento: string;
  segundo_rendimiento: string;
  observaciones: string;
  defectos: Record<number, string>;
  zarandas: Record<number, string>;
  tazas: Record<number, string>;
}

const EMPTY_FORM: FormData = {
  id_catador: "",
  id_calidad: "",
  humedad: "",
  dano: "",
  primer_rendimiento: "",
  segundo_rendimiento: "",
  observaciones: "",
  defectos: {},
  zarandas: {},
  tazas: {},
};

export default function CatacionModal({ muestra, catadores, calidades, defectos, zarandas, tazas, submitting, onClose, onSubmit }: CatacionModalProps) {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleClose = () => {
    setFormData(EMPTY_FORM);
    setFieldErrors({});
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!muestra) return;

    const newErrors: Record<string, string> = { ...fieldErrors };
    if (!formData.id_catador) newErrors._catador = "required";
    if (!formData.id_calidad) newErrors._calidad = "required";
    if (formData.humedad === "") newErrors.humedad = "Campo requerido";
    if (formData.dano === "") newErrors.dano = "Campo requerido";
    if (formData.primer_rendimiento === "") newErrors.primer_rendimiento = "Campo requerido";
    if (formData.segundo_rendimiento === "") newErrors.segundo_rendimiento = "Campo requerido";
    setFieldErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((v) => v !== "");
    if (hasErrors) {
      toast.error("Completa todos los campos requeridos.");
      return;
    }

    const payload: CreateAnalisisRequest = {
      id_detalle_recepcion: muestra.id_detalle_recepcion,
      tipo_analisis: "Muestra Previa",
      id_catador: Number(formData.id_catador),
      id_calidad: formData.id_calidad ? Number(formData.id_calidad) : undefined,
      humedad: formData.humedad ? Number(formData.humedad) : undefined,
      dano: formData.dano ? Number(formData.dano) : undefined,
      primer_rendimiento: formData.primer_rendimiento ? Number(formData.primer_rendimiento) : undefined,
      segundo_rendimiento: formData.segundo_rendimiento ? Number(formData.segundo_rendimiento) : undefined,
      observaciones: formData.observaciones || undefined,
      defectos: Object.entries(formData.defectos)
        .map(([id, val]) => ({ id_defecto: Number(id), cantidad: Number(val) }))
        .filter((d) => d.cantidad > 0),
      zarandas: Object.entries(formData.zarandas)
        .map(([id, val]) => ({ id_zaranda: Number(id), cantidad: Number(val) }))
        .filter((z) => z.cantidad > 0),
      tazas: Object.entries(formData.tazas)
        .map(([id, val]) => ({ id_tazas: Number(id), cantidad: Number(val) }))
        .filter((t) => t.cantidad > 0),
    };

    await onSubmit(payload);
  };

  return (
    <Modal show={!!muestra} onHide={handleClose} size="xl" scrollable>
      {muestra && (
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton className="border-bottom">
            <div>
              <Modal.Title className="fs-5 fw-bold">Ingreso de Resultados de Catación</Modal.Title>
              <small className="text-muted">
                {muestra.numero_entrada} — {muestra.remision} — {muestra.proveedor_nombre}
              </small>
            </div>
          </Modal.Header>

          <Modal.Body className="p-4" style={{ maxHeight: "70vh" , overflowY: "auto" }}>

            {/* 1. Datos Generales */}
            <div className="bg-white rounded border p-3 mb-3">
              <p className="fw-semibold text-muted mb-3 fs-6 border-bottom pb-2">Información General y Rendimiento</p>
              <Row className="g-3">
                <Col md={2}>
                  <Form.Group>
                    <Form.Label className="small fw-medium">Catador Respons. <span className="text-danger">*</span></Form.Label>
                    <Select
                      classNamePrefix="Select2"
                      placeholder="Seleccione..."
                      options={catadores.map(c => ({ value: c.id_catador.toString(), label: c.nombre }))}
                      value={formData.id_catador ? { value: formData.id_catador, label: catadores.find(c => c.id_catador.toString() === formData.id_catador)?.nombre || "" } : null}
                      onChange={(opt) => { setFormData(prev => ({ ...prev, id_catador: opt?.value || "" })); setFieldErrors(fe => ({ ...fe, _catador: "" })); }}
                      styles={{
                        control: (base) => ({ ...base, borderColor: fieldErrors._catador ? "#dc3545" : base.borderColor }),
                        menu: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                    />
                    {fieldErrors._catador && <div className="text-danger" style={{ fontSize: "0.7rem" }}>Seleccione un catador</div>}
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label className="small fw-medium">Grado de Calidad <span className="text-danger">*</span></Form.Label>
                    <Select
                      classNamePrefix="Select2"
                      placeholder="Seleccione..."
                      options={calidades.map(c => ({ value: c.id_calidad.toString(), label: c.nombre }))}
                      value={formData.id_calidad ? { value: formData.id_calidad, label: calidades.find(c => c.id_calidad.toString() === formData.id_calidad)?.nombre || "" } : null}
                      onChange={(opt) => { setFormData(prev => ({ ...prev, id_calidad: opt?.value || "" })); setFieldErrors(fe => ({ ...fe, _calidad: "" })); }}
                      styles={{
                        control: (base) => ({ ...base, borderColor: fieldErrors._calidad ? "#dc3545" : base.borderColor }),
                        menu: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                    />
                    {fieldErrors._calidad && <div className="text-danger" style={{ fontSize: "0.7rem" }}>Seleccione un grado</div>}
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label className="small fw-medium">Humedad % <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      size="sm" type="number" step="0.01" placeholder="0.00"
                      isInvalid={!!fieldErrors.humedad}
                      value={formData.humedad}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        setFormData((f) => ({ ...f, humedad: e.target.value }));
                        if (e.target.value === "") setFieldErrors((fe) => ({ ...fe, humedad: "Campo requerido" }));
                        else if (isNaN(v) || v < 0 || v > 100) setFieldErrors((fe) => ({ ...fe, humedad: "Debe estar entre 0 y 100" }));
                        else setFieldErrors((fe) => ({ ...fe, humedad: "" }));
                      }}
                    />
                    <Form.Control.Feedback type="invalid" style={{ fontSize: "0.7rem" }}>{fieldErrors.humedad}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label className="small fw-medium">Daño Total % <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      size="sm" type="number" step="0.01" placeholder="0.00"
                      isInvalid={!!fieldErrors.dano}
                      value={formData.dano}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        setFormData((f) => ({ ...f, dano: e.target.value }));
                        if (e.target.value === "") setFieldErrors((fe) => ({ ...fe, dano: "Campo requerido" }));
                        else if (isNaN(v) || v < 0 || v > 100) setFieldErrors((fe) => ({ ...fe, dano: "Debe estar entre 0 y 100" }));
                        else setFieldErrors((fe) => ({ ...fe, dano: "" }));
                      }}
                    />
                    <Form.Control.Feedback type="invalid" style={{ fontSize: "0.7rem" }}>{fieldErrors.dano}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label className="small fw-medium">1er Rendimiento <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      size="sm" type="number" step="0.01" placeholder="0.00"
                      isInvalid={!!fieldErrors.primer_rendimiento}
                      value={formData.primer_rendimiento}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        setFormData((f) => ({ ...f, primer_rendimiento: e.target.value }));
                        if (e.target.value === "") setFieldErrors((fe) => ({ ...fe, primer_rendimiento: "Campo requerido" }));
                        else if (isNaN(v) || v <= 0) setFieldErrors((fe) => ({ ...fe, primer_rendimiento: "Debe ser mayor a 0" }));
                        else setFieldErrors((fe) => ({ ...fe, primer_rendimiento: "" }));
                      }}
                    />
                    <Form.Control.Feedback type="invalid" style={{ fontSize: "0.7rem" }}>{fieldErrors.primer_rendimiento}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label className="small fw-medium">2do Rendimiento <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      size="sm" type="number" step="0.01" placeholder="0.00"
                      isInvalid={!!fieldErrors.segundo_rendimiento}
                      value={formData.segundo_rendimiento}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        setFormData((f) => ({ ...f, segundo_rendimiento: e.target.value }));
                        if (e.target.value === "") setFieldErrors((fe) => ({ ...fe, segundo_rendimiento: "Campo requerido" }));
                        else if (isNaN(v) || v <= 0) setFieldErrors((fe) => ({ ...fe, segundo_rendimiento: "Debe ser mayor a 0" }));
                        else setFieldErrors((fe) => ({ ...fe, segundo_rendimiento: "" }));
                      }}
                    />
                    <Form.Control.Feedback type="invalid" style={{ fontSize: "0.7rem" }}>{fieldErrors.segundo_rendimiento}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </div>

            {/* 2. Defectos Físicos */}
            {defectos.length > 0 && (
              <div className="bg-white rounded border p-3 mb-3">
                <p className="fw-semibold text-muted mb-3 fs-6 border-bottom pb-2">
                  Defectos Físicos <span className="text-muted fw-normal">(gramos)</span>
                </p>
                <Row className="g-2">
                  {defectos.map((def) => (
                    <Col xs={6} sm={4} md={3} key={def.id_defecto}>
                      <Form.Group>
                        <Form.Label className="small text-truncate d-block mb-1" title={def.nombre}>{def.nombre}</Form.Label>
                        <Form.Control
                          size="sm" type="number" step="0.01" placeholder="0"
                          value={formData.defectos[def.id_defecto] || ""}
                          onChange={(e) => setFormData({ ...formData, defectos: { ...formData.defectos, [def.id_defecto]: e.target.value } })}
                        />
                      </Form.Group>
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {/* 3. Mallas / Zarandas */}
            {zarandas.length > 0 && (
              <div className="bg-white rounded border p-3 mb-3">
                <p className="fw-semibold text-muted mb-3 fs-6 border-bottom pb-2">
                  Mallas / Zarandas <span className="text-muted fw-normal">(porcentaje)</span>
                </p>
                <Row className="g-2">
                  {zarandas.map((zar) => (
                    <Col xs={6} sm={4} md={3} key={zar.id_zaranda}>
                      <Form.Group>
                        <Form.Label className="small text-truncate d-block mb-1" title={zar.nombre}>{zar.nombre}</Form.Label>
                        <Form.Control
                          size="sm" type="number" step="0.01" placeholder="0"
                          value={formData.zarandas[zar.id_zaranda] || ""}
                          onChange={(e) => setFormData({ ...formData, zarandas: { ...formData.zarandas, [zar.id_zaranda]: e.target.value } })}
                        />
                      </Form.Group>
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {/* 4. Atributos de Taza */}
            {tazas.length > 0 && (
              <div className="bg-white rounded border p-3 mb-3">
                <p className="fw-semibold text-muted mb-3 fs-6 border-bottom pb-2">
                  Atributos de Taza <span className="text-muted fw-normal">(puntos)</span>
                </p>
                <Row className="g-2">
                  {tazas.map((taza) => (
                    <Col xs={6} sm={4} md={3} key={taza.id_tazas}>
                      <Form.Group>
                        <Form.Label className="small text-truncate d-block mb-1" title={taza.nombre}>{taza.nombre}</Form.Label>
                        <Form.Control
                          size="sm" type="number" step="0.01" placeholder="0"
                          value={formData.tazas[taza.id_tazas] || ""}
                          onChange={(e) => setFormData({ ...formData, tazas: { ...formData.tazas, [taza.id_tazas]: e.target.value } })}
                        />
                      </Form.Group>
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {/* 5. Observaciones */}
            <div className="bg-white rounded border p-3">
              <Form.Group>
                <Form.Label className="small fw-semibold text-muted">Observaciones Finales del Laboratorio</Form.Label>
                <Form.Control
                  as="textarea" rows={2} size="sm"
                  placeholder="Notas sobre olor, color o recomendaciones para gerencia..."
                  value={formData.observaciones}
                  onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                />
              </Form.Group>
            </div>

          </Modal.Body>

          <Modal.Footer className="border-top">
            <Button variant="outline-secondary" size="sm" onClick={handleClose} disabled={submitting}>Cancelar</Button>
            <Button variant="primary" size="sm" type="submit" disabled={submitting} className="d-flex align-items-center gap-2">
              {submitting ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Guardar Resultados
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Modal>
  );
}
