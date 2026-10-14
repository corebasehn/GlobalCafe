import { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { Save } from "lucide-react";
import { CLIENTES_DISPONIBLES, COSECHAS_DISPONIBLES, CALIDADES_DISPONIBLES, type Contrato } from "../../../pages/exportacion/contratos/mockData";

type Props = {
  show: boolean;
  existingIds: string[];
  onHide: () => void;
  onCreate: (contrato: Contrato) => void;
};

const EMPTY_FORM = {
  id: "",
  cliente: "",
  aviso_venta: "",
  cosecha: "",
  calidad_pactada: "",
  cantidad_sacos_pactada: "",
  precio_pactado: "",
  destino: "",
};

export default function ModalNuevoContrato({ show, existingIds, onHide, onCreate }: Readonly<Props>) {
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

    if (!form.id.trim()) errors.id = "Ingrese el número de contrato tal como lo emite el cliente.";
    else if (existingIds.includes(form.id.trim())) errors.id = "Ya existe un contrato con este número.";
    if (!form.cliente) errors.cliente = "Seleccione un cliente.";
    if (!form.cosecha) errors.cosecha = "Seleccione una cosecha.";
    if (!form.cantidad_sacos_pactada || Number(form.cantidad_sacos_pactada) <= 0) errors.cantidad_sacos_pactada = "Debe ser mayor a 0.";
    if (!form.destino.trim()) errors.destino = "Campo requerido.";

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    onCreate({
      id: form.id.trim(),
      cliente: form.cliente,
      aviso_venta: form.aviso_venta.trim(),
      cosecha: form.cosecha,
      calidad_pactada: form.calidad_pactada,
      cantidad_sacos_pactada: Number(form.cantidad_sacos_pactada),
      precio_pactado: Number(form.precio_pactado) || 0,
      destino: form.destino.trim(),
      estado: "Creado",
      fecha_creacion: new Date().toISOString().slice(0, 10),
      lotes: [],
    });
    handleClose();
  };

  const clienteOptions = CLIENTES_DISPONIBLES.map((c) => ({ value: c, label: c }));
  const cosechaOptions = COSECHAS_DISPONIBLES.map((c) => ({ value: c, label: c }));
  const calidadOptions = CALIDADES_DISPONIBLES.map((c) => ({ value: c, label: c }));

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Contrato</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">No. Contrato <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder='Ej. "P41008", "NPHN-36529", "C-10141", "85967"'
                  isInvalid={!!fieldErrors.id}
                  value={form.id}
                  onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
                />
                <Form.Text className="text-muted">
                  Formato de texto libre: cada cliente usa su propia numeración, no se aplica máscara fija.
                </Form.Text>
                <Form.Control.Feedback type="invalid">{fieldErrors.id}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Cliente <span className="text-danger">*</span></Form.Label>
                <Select
                  classNamePrefix="Select2"
                  placeholder="Seleccione cliente..."
                  options={clienteOptions}
                  value={form.cliente ? { value: form.cliente, label: form.cliente } : null}
                  onChange={(opt) => setForm((f) => ({ ...f, cliente: opt?.value || "" }))}
                  styles={{ control: (base) => ({ ...base, borderColor: fieldErrors.cliente ? "#dc3545" : base.borderColor }) }}
                />
                {fieldErrors.cliente && <div className="text-danger" style={{ fontSize: "0.7rem" }}>{fieldErrors.cliente}</div>}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Aviso de Venta (ref. cosecha)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. AV-2024-0142"
                  value={form.aviso_venta}
                  onChange={(e) => setForm((f) => ({ ...f, aviso_venta: e.target.value }))}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Cosecha <span className="text-danger">*</span></Form.Label>
                <Select
                  classNamePrefix="Select2"
                  placeholder="Seleccione cosecha..."
                  options={cosechaOptions}
                  value={form.cosecha ? { value: form.cosecha, label: form.cosecha } : null}
                  onChange={(opt) => setForm((f) => ({ ...f, cosecha: opt?.value || "" }))}
                  styles={{ control: (base) => ({ ...base, borderColor: fieldErrors.cosecha ? "#dc3545" : base.borderColor }) }}
                />
                {fieldErrors.cosecha && <div className="text-danger" style={{ fontSize: "0.7rem" }}>{fieldErrors.cosecha}</div>}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Calidad Pactada</Form.Label>
                <Select
                  classNamePrefix="Select2"
                  placeholder="Seleccione calidad..."
                  options={calidadOptions}
                  value={form.calidad_pactada ? { value: form.calidad_pactada, label: form.calidad_pactada } : null}
                  onChange={(opt) => setForm((f) => ({ ...f, calidad_pactada: opt?.value || "" }))}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Cantidad de Sacos <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0"
                  isInvalid={!!fieldErrors.cantidad_sacos_pactada}
                  value={form.cantidad_sacos_pactada}
                  onWheel={(e) => e.currentTarget.blur()}
                  onChange={(e) => setForm((f) => ({ ...f, cantidad_sacos_pactada: e.target.value }))}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.cantidad_sacos_pactada}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Precio Pactado (US$/saco)</Form.Label>
                <Form.Control
                  type="number" step="0.01" placeholder="0.00"
                  value={form.precio_pactado}
                  onWheel={(e) => e.currentTarget.blur()}
                  onChange={(e) => setForm((f) => ({ ...f, precio_pactado: e.target.value }))}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">Destino <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ciudad, país"
                  isInvalid={!!fieldErrors.destino}
                  value={form.destino}
                  onChange={(e) => setForm((f) => ({ ...f, destino: e.target.value }))}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.destino}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" type="submit" className="d-flex align-items-center gap-2">
            <Save className="w-4 h-4" /> Crear Contrato
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
