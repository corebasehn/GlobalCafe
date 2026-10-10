import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { Loader2, PlusCircle, Save } from "lucide-react";
import toast from "react-hot-toast";
import {
  Departamento,
  Municipio,
  Transporte,
  createMunicipioApi,
  createTransporteApi,
  createConductorApi,
  createPlacaCabezalApi,
  createPlacaFurgonApi,
  createProveedorApi,
  createTipoCafeApi,
  createTipoEmpaqueApi,
} from "../../api/catalogs.api";

export type CatalogoTipo =
  | "municipio"
  | "transporte"
  | "conductor"
  | "tipo_vehiculo"
  | "placa_cabezal"
  | "placa_furgon"
  | "proveedor"
  | "tipo_cafe"
  | "tipo_empaque";

interface Props {
  show: boolean;
  tipo: CatalogoTipo | null;
  onHide: () => void;
  departamentos: Departamento[];
  municipios: Municipio[];
  transportes: Transporte[];
  defaultContext?: {
    id_transporte?: string;
    id_municipio?: string;
  };
  onSuccess: (tipo: CatalogoTipo, nuevoItem: any) => void;
}

export default function ModalCreacionRapidaCatalogo({
  show,
  tipo,
  onHide,
  departamentos,
  municipios,
  transportes,
  defaultContext,
  onSuccess,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (show && tipo) {
      // Valores por defecto al abrir
      const initial: any = {};
      if (tipo === "conductor" && defaultContext?.id_transporte) {
        initial.id_transporte = Number(defaultContext.id_transporte);
      }
      if (defaultContext?.id_municipio && (tipo === "proveedor" || tipo === "transporte" || tipo === "conductor")) {
        initial.id_municipio = Number(defaultContext.id_municipio);
      } else if (municipios.length > 0 && (tipo === "proveedor" || tipo === "transporte" || tipo === "conductor")) {
        initial.id_municipio = municipios[0].id_municipio;
      }
      if (departamentos.length > 0 && tipo === "municipio") {
        initial.id_departamento = departamentos[0].id_departamento;
      }
      if (tipo === "tipo_empaque") {
        initial.tara = 1.0;
      }
      setFormData(initial);
    } else {
      setFormData({});
    }
  }, [show, tipo, defaultContext, departamentos, municipios]);

  if (!show || !tipo) return null;

  const getTitulo = () => {
    switch (tipo) {
      case "municipio": return "Nuevo Municipio";
      case "transporte": return "Nueva Empresa de Transporte";
      case "conductor": return "Nuevo Conductor";
      case "tipo_vehiculo": return "Nuevo Tipo de Vehículo";
      case "placa_cabezal": return "Nueva Placa Cabezal";
      case "placa_furgon": return "Nueva Placa Furgón";
      case "proveedor": return "Nuevo Proveedor / Finca";
      case "tipo_cafe": return "Nuevo Tipo de Café";
      case "tipo_empaque": return "Nuevo Tipo de Empaque";
      default: return "Nuevo Registro";
    }
  };

  const departamentoOptions = departamentos.map((d) => ({
    value: d.id_departamento,
    label: d.nombre,
  }));

  const municipioOptions = municipios.map((m) => ({
    value: m.id_municipio,
    label: `${m.nombre}${m.departamento?.nombre ? ` (${m.departamento.nombre})` : ""}`,
  }));

  const transporteOptions = transportes.map((t) => ({
    value: t.id_transporte,
    label: t.nombre,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let createdItem: any = null;

      switch (tipo) {
        case "municipio": {
          if (!formData.nombre?.trim() || !formData.id_departamento) {
            toast.error("Complete el nombre del municipio y departamento");
            setSubmitting(false);
            return;
          }
          createdItem = await createMunicipioApi({
            nombre: formData.nombre.trim(),
            id_departamento: Number(formData.id_departamento),
          });
          toast.success(`Municipio "${createdItem.nombre}" creado exitosamente`);
          break;
        }

        case "transporte": {
          if (!formData.nombre?.trim() || !formData.id_municipio) {
            toast.error("Complete el nombre de la empresa y municipio");
            setSubmitting(false);
            return;
          }
          createdItem = await createTransporteApi({
            nombre: formData.nombre.trim(),
            rtn: formData.rtn?.trim() || undefined,
            id_municipio: Number(formData.id_municipio),
            contacto: formData.contacto?.trim() || undefined,
            telefono: formData.telefono?.trim() || undefined,
            direccion: formData.direccion?.trim() || undefined,
          });
          toast.success(`Empresa "${createdItem.nombre}" creada exitosamente`);
          break;
        }

        case "conductor": {
          if (!formData.nombre?.trim() || !formData.id_transporte || !formData.id_municipio) {
            toast.error("Complete el nombre del conductor, transporte y municipio");
            setSubmitting(false);
            return;
          }
          createdItem = await createConductorApi({
            nombre: formData.nombre.trim(),
            id_transporte: Number(formData.id_transporte),
            id_municipio: Number(formData.id_municipio),
            dni: formData.dni?.trim() || undefined,
            licencia: formData.licencia?.trim() || undefined,
            telefono: formData.telefono?.trim() || undefined,
          });
          toast.success(`Conductor "${createdItem.nombre}" creado exitosamente`);
          break;
        }

        case "tipo_vehiculo": {
          if (!formData.nombre?.trim()) {
            toast.error("Ingrese el nombre del tipo de vehículo");
            setSubmitting(false);
            return;
          }
          const nombreVehiculo = formData.nombre.trim();
          createdItem = { value: nombreVehiculo, label: nombreVehiculo };
          toast.success(`Tipo de vehículo "${nombreVehiculo}" agregado`);
          break;
        }

        case "placa_cabezal": {
          if (!formData.placa?.trim()) {
            toast.error("Ingrese el número de placa cabezal");
            setSubmitting(false);
            return;
          }
          const placaNormalizada = formData.placa.trim().toUpperCase();
          createdItem = await createPlacaCabezalApi({ placa: placaNormalizada });
          toast.success(`Placa cabezal "${createdItem.placa}" creada exitosamente`);
          break;
        }

        case "placa_furgon": {
          if (!formData.placa?.trim()) {
            toast.error("Ingrese el número de placa de furgón");
            setSubmitting(false);
            return;
          }
          const placaNormalizada = formData.placa.trim().toUpperCase();
          createdItem = await createPlacaFurgonApi({ placa: placaNormalizada });
          toast.success(`Placa furgón "${createdItem.placa}" creada exitosamente`);
          break;
        }

        case "proveedor": {
          if (!formData.nombre?.trim() || !formData.id_municipio) {
            toast.error("Complete el nombre del proveedor y municipio");
            setSubmitting(false);
            return;
          }
          createdItem = await createProveedorApi({
            nombre: formData.nombre.trim(),
            rtn: formData.rtn?.trim() || undefined,
            id_municipio: Number(formData.id_municipio),
            telefono: formData.telefono?.trim() || undefined,
            direccion: formData.direccion?.trim() || undefined,
          });
          toast.success(`Proveedor "${createdItem.nombre}" creado exitosamente`);
          break;
        }

        case "tipo_cafe": {
          if (!formData.tipo_cafe?.trim()) {
            toast.error("Ingrese la descripción del tipo de café");
            setSubmitting(false);
            return;
          }
          createdItem = await createTipoCafeApi({
            tipo_cafe: formData.tipo_cafe.trim(),
          });
          toast.success(`Tipo de café "${createdItem.tipo_cafe}" creado exitosamente`);
          break;
        }

        case "tipo_empaque": {
          if (!formData.tipo_empaque?.trim() || formData.tara === undefined || formData.tara === "") {
            toast.error("Ingrese la descripción y tara del tipo de empaque");
            setSubmitting(false);
            return;
          }
          createdItem = await createTipoEmpaqueApi({
            tipo_empaque: formData.tipo_empaque.trim(),
            tara: Number(formData.tara),
          });
          toast.success(`Tipo de empaque "${createdItem.tipo_empaque}" creado exitosamente`);
          break;
        }
      }

      onSuccess(tipo, createdItem);
      onHide();
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.message || "Error al crear el registro en el catálogo";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      style={{ zIndex: 1070 }}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton className="border-bottom-0 pb-1">
          <Modal.Title className="fs-6 fw-bold d-flex align-items-center gap-2">
            <PlusCircle size={18} className="text-primary" />
            {getTitulo()}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="py-3 px-4">
          {tipo === "municipio" && (
            <Row className="g-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Nombre del Municipio <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    required
                    autoFocus
                    placeholder="Ej: Danlí, El Paraíso, Trojes..."
                    value={formData.nombre || ""}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Departamento <span className="text-danger">*</span></Form.Label>
                  <Select
                    options={departamentoOptions}
                    placeholder="Seleccione departamento..."
                    value={departamentoOptions.find((d) => d.value === formData.id_departamento) || null}
                    onChange={(sel: any) => setFormData({ ...formData, id_departamento: sel?.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          )}

          {tipo === "transporte" && (
            <Row className="g-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Nombre de la Empresa <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    required
                    autoFocus
                    placeholder="Ej: Transportes del Oriente S.A."
                    value={formData.nombre || ""}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">RTN (Opcional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="0801..."
                    value={formData.rtn || ""}
                    onChange={(e) => setFormData({ ...formData, rtn: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="2234-5678"
                    value={formData.telefono || ""}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Municipio <span className="text-danger">*</span></Form.Label>
                  <Select
                    options={municipioOptions}
                    placeholder="Seleccione municipio..."
                    value={municipioOptions.find((m) => m.value === formData.id_municipio) || null}
                    onChange={(sel: any) => setFormData({ ...formData, id_municipio: sel?.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Contacto Principal</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre del contacto"
                    value={formData.contacto || ""}
                    onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Barrio, calle, etc."
                    value={formData.direccion || ""}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
          )}

          {tipo === "conductor" && (
            <Row className="g-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Nombre Completo <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    required
                    autoFocus
                    placeholder="Ej: Juan Pérez"
                    value={formData.nombre || ""}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Empresa de Transporte <span className="text-danger">*</span></Form.Label>
                  <Select
                    options={transporteOptions}
                    placeholder="Seleccione empresa de transporte..."
                    value={transporteOptions.find((t) => t.value === formData.id_transporte) || null}
                    onChange={(sel: any) => setFormData({ ...formData, id_transporte: sel?.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">DNI / Identidad</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="0801-1990-12345"
                    value={formData.dni || ""}
                    onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Licencia</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Pesada / Liviana"
                    value={formData.licencia || ""}
                    onChange={(e) => setFormData({ ...formData, licencia: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Municipio <span className="text-danger">*</span></Form.Label>
                  <Select
                    options={municipioOptions}
                    placeholder="Seleccione municipio..."
                    value={municipioOptions.find((m) => m.value === formData.id_municipio) || null}
                    onChange={(sel: any) => setFormData({ ...formData, id_municipio: sel?.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="9999-9999"
                    value={formData.telefono || ""}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
          )}

          {tipo === "tipo_vehiculo" && (
            <Row className="g-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Nombre del Tipo de Vehículo <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    required
                    autoFocus
                    placeholder="Ej: Volqueta, Camión 3.5T, Camioneta..."
                    value={formData.nombre || ""}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                  <Form.Text className="text-muted">
                    Se agregará a las opciones de vehículos disponibles para esta y próximas remisiones.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          )}

          {(tipo === "placa_cabezal" || tipo === "placa_furgon") && (
            <Row className="g-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    Número de Placa {tipo === "placa_cabezal" ? "Cabezal" : "Furgón"} <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    autoFocus
                    placeholder="Ej: AAB1234, TR001..."
                    style={{ textTransform: "uppercase" }}
                    value={formData.placa || ""}
                    onChange={(e) => setFormData({ ...formData, placa: e.target.value.toUpperCase() })}
                  />
                </Form.Group>
              </Col>
            </Row>
          )}

          {tipo === "proveedor" && (
            <Row className="g-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Nombre del Proveedor / Finca <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    required
                    autoFocus
                    placeholder="Ej: Finca Las Delicias / Cooperativa..."
                    value={formData.nombre || ""}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">RTN (Opcional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="0801..."
                    value={formData.rtn || ""}
                    onChange={(e) => setFormData({ ...formData, rtn: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="9999-9999"
                    value={formData.telefono || ""}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Municipio <span className="text-danger">*</span></Form.Label>
                  <Select
                    options={municipioOptions}
                    placeholder="Seleccione municipio..."
                    value={municipioOptions.find((m) => m.value === formData.id_municipio) || null}
                    onChange={(sel: any) => setFormData({ ...formData, id_municipio: sel?.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Aldea, sector, punto de referencia..."
                    value={formData.direccion || ""}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
          )}

          {tipo === "tipo_cafe" && (
            <Row className="g-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Descripción del Tipo de Café <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    required
                    autoFocus
                    placeholder="Ej: Café Pergamino Seco, Café Cereza, Café Uva..."
                    value={formData.tipo_cafe || ""}
                    onChange={(e) => setFormData({ ...formData, tipo_cafe: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
          )}

          {tipo === "tipo_empaque" && (
            <Row className="g-3">
              <Col md={8}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Descripción del Tipo de Empaque <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    required
                    autoFocus
                    placeholder="Ej: Saco de Yute, Saco Plástico, Bolsa GrainPro..."
                    value={formData.tipo_empaque || ""}
                    onChange={(e) => setFormData({ ...formData, tipo_empaque: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Tara (LB) <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.tara !== undefined ? formData.tara : 1.0}
                    onChange={(e) => setFormData({ ...formData, tara: e.target.value })}
                    onWheel={(e) => e.currentTarget.blur()}
                  />
                </Form.Group>
              </Col>
            </Row>
          )}
        </Modal.Body>

        <Modal.Footer className="border-top-0 pt-0 pb-3 px-4">
          <Button variant="secondary" size="sm" onClick={onHide} disabled={submitting}>
            Cancelar
          </Button>
          <Button variant="primary" size="sm" type="submit" disabled={submitting} className="d-flex align-items-center gap-1">
            {submitting ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Guardar y Seleccionar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
