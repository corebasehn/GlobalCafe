import { useState } from "react";
import { Modal, Button, Form, Row, Col, Alert, InputGroup } from "react-bootstrap";
import { Truck, Scale } from "lucide-react";
import toast from "react-hot-toast";
import { createOtroMovimientoApi, CreateOtroMovimientoRequest } from "../../../../api/reception.api";
import { PlacaCabezal, PlacaFurgon, Conductor, Proveedor, TipoMovimiento } from "../../../../api/catalogs.api";

interface Props {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
  placasCabezal: PlacaCabezal[];
  placasFurgon: PlacaFurgon[];
  conductores: Conductor[];
  proveedores: Proveedor[];
  tiposMovimiento?: TipoMovimiento[];
}

export default function ModalNuevoMovimiento({
  show,
  onHide,
  onSuccess,
  placasCabezal,
  placasFurgon,
  conductores,
  proveedores,
  tiposMovimiento = [],
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [idTipoMovimiento, setIdTipoMovimiento] = useState<number | "">("");
  const [tipoVehiculo, setTipoVehiculo] = useState("Camión");
  const [idPlacaCabezal, setIdPlacaCabezal] = useState<number | "">("");
  const [idPlacaFurgon, setIdPlacaFurgon] = useState<number | "">("");
  const [idConductor, setIdConductor] = useState<number | "">("");
  const [idProveedor, setIdProveedor] = useState<number | "">("");
  const [remision, setRemision] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [pesarInmediatamente, setPesarInmediatamente] = useState(false);
  const [pesoTaraInicial, setPesoTaraInicial] = useState("");

  // Filtrar tipos de movimiento excluyendo café (id 1 o código CAFE) y solo activos
  const tiposDisponibles = (tiposMovimiento || []).filter(
    (t) => t.id !== 1 && t.codigo !== "CAFE" && (t.activo ?? t.estado ?? true)
  );

  const tipoSeleccionado =
    tiposDisponibles.find((t) => t.id === Number(idTipoMovimiento)) ||
    tiposDisponibles.find((t) => t.id === 2 || t.codigo === "CASULLA") ||
    tiposDisponibles[0];

  const esBrutoPrimero = tipoSeleccionado?.sentido_pesaje === "BRUTO_PRIMERO";

  const resetForm = () => {
    setIdTipoMovimiento("");
    setTipoVehiculo("Camión");
    setIdPlacaCabezal("");
    setIdPlacaFurgon("");
    setIdConductor("");
    setIdProveedor("");
    setRemision("");
    setObservaciones("");
    setPesarInmediatamente(false);
    setPesoTaraInicial("");
  };

  const handleClose = () => {
    resetForm();
    onHide();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idPlacaCabezal) {
      toast.error("Seleccione la placa del cabezal");
      return;
    }
    if (!idConductor) {
      toast.error("Seleccione el conductor");
      return;
    }

    if (pesarInmediatamente && (!pesoTaraInicial || Number(pesoTaraInicial) <= 0)) {
      toast.error(`Ingrese un peso válido para la 1ra pesada (${esBrutoPrimero ? "Bruto" : "Tara"}) del equipo`);
      return;
    }

    try {
      setSubmitting(true);
      const selectedId = Number(idTipoMovimiento || tipoSeleccionado?.id || 2);
      const payload: CreateOtroMovimientoRequest = {
        tipo_vehiculo: tipoVehiculo,
        id_placa_cabezal: Number(idPlacaCabezal),
        id_placa_furgon: idPlacaFurgon ? Number(idPlacaFurgon) : undefined,
        id_conductor: Number(idConductor),
        id_proveedor: idProveedor ? Number(idProveedor) : undefined,
        remision: remision.trim() || undefined,
        observaciones: observaciones.trim() || undefined,
        id_tipo_movimiento: selectedId,
        peso_tara_inicial: pesarInmediatamente && pesoTaraInicial ? Number(pesoTaraInicial) : undefined,
      };

      await createOtroMovimientoApi(payload);
      toast.success(`Movimiento de ${tipoSeleccionado?.nombre || "pesaje"} registrado correctamente`);
      handleClose();
      onSuccess();
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.message || "Error al registrar el movimiento";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static" centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="d-flex align-items-center gap-2 fs-6">
          <Truck size={20} />
          Nuevo Movimiento - {tipoSeleccionado?.nombre || "Pesaje"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="p-4">
          <Alert variant="info" className="d-flex align-items-center gap-2 py-2 mb-3">
            <Scale size={20} className="flex-shrink-0" />
            <small>
              {esBrutoPrimero ? (
                <span>
                  <strong>Flujo estándar:</strong> El vehículo ingresa cargado (1ra Pesada: <strong>Bruto</strong>), descarga en planta y se pesa vacío al salir (2da Pesada: <strong>Tara</strong>).
                </span>
              ) : (
                <span>
                  <strong>Flujo invertido:</strong> El camión ingresa vacío (1ra Pesada: <strong>Tara</strong>), carga en planta y se pesa cargado al salir (2da Pesada: <strong>Bruto</strong>).
                </span>
              )}
            </small>
          </Alert>

          <Row className="g-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label className="fw-semibold">Tipo de Movimiento *</Form.Label>
                <Form.Select
                  value={idTipoMovimiento || (tipoSeleccionado?.id ?? "")}
                  onChange={(e) => setIdTipoMovimiento(e.target.value ? Number(e.target.value) : "")}
                  required
                >
                  {tiposDisponibles.map((tm) => (
                    <option key={tm.id} value={tm.id}>
                      {tm.nombre} ({tm.codigo}) — {tm.sentido_pesaje === "BRUTO_PRIMERO" ? "1° Bruto (Cargado) → 2° Tara (Vacío)" : "1° Tara (Vacío) → 2° Bruto (Cargado)"}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Tipo de Vehículo *</Form.Label>
                <Form.Select
                  value={tipoVehiculo}
                  onChange={(e) => setTipoVehiculo(e.target.value)}
                  required
                >
                  <option value="Camión">Camión</option>
                  <option value="Rastra">Rastra / Furgón</option>
                  <option value="Volqueta">Volqueta</option>
                  <option value="Pick-up">Pick-up</option>
                  <option value="Otro">Otro</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Placa Cabezal *</Form.Label>
                <Form.Select
                  value={idPlacaCabezal}
                  onChange={(e) => setIdPlacaCabezal(e.target.value ? Number(e.target.value) : "")}
                  required
                >
                  <option value="">-- Seleccionar Placa --</option>
                  {placasCabezal.filter(p => p.estado).map((p) => (
                    <option key={p.id_placa_cabezal} value={p.id_placa_cabezal}>
                      {p.placa}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Placa Furgón / Remolque (Opcional)</Form.Label>
                <Form.Select
                  value={idPlacaFurgon}
                  onChange={(e) => setIdPlacaFurgon(e.target.value ? Number(e.target.value) : "")}
                >
                  <option value="">-- Ninguno / No Aplica --</option>
                  {placasFurgon.filter(p => p.estado).map((p) => (
                    <option key={p.id_placa_furgon} value={p.id_placa_furgon}>
                      {p.placa}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Conductor *</Form.Label>
                <Form.Select
                  value={idConductor}
                  onChange={(e) => setIdConductor(e.target.value ? Number(e.target.value) : "")}
                  required
                >
                  <option value="">-- Seleccionar Conductor --</option>
                  {conductores.filter(c => c.estado).map((c) => (
                    <option key={c.id_conductor} value={c.id_conductor}>
                      {c.nombre} {c.dni ? `(${c.dni})` : ""}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Cliente / Comprador / Destino</Form.Label>
                <Form.Select
                  value={idProveedor}
                  onChange={(e) => setIdProveedor(e.target.value ? Number(e.target.value) : "")}
                >
                  <option value="">-- General / No especificado --</option>
                  {proveedores.filter(pr => pr.estado).map((pr) => (
                    <option key={pr.id_proveedor} value={pr.id_proveedor}>
                      {pr.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">No. Documento / Remisión Externa</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: CAS-001 o Boleta manual"
                  value={remision}
                  onChange={(e) => setRemision(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  Observaciones / Destino de {tipoSeleccionado?.nombre || "la Carga"}
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder={`Notas adicionales sobre el movimiento o entrega de ${tipoSeleccionado?.nombre?.toLowerCase() || "la carga"}...`}
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <div className="p-3 border rounded bg-light mt-2">
                <Form.Check
                  type="switch"
                  id="switch-pesar-ahora"
                  label={<strong>¿El camión está en báscula ahora? (Registrar 1ra Pesada / {esBrutoPrimero ? "Bruto" : "Tara"})</strong>}
                  checked={pesarInmediatamente}
                  onChange={(e) => setPesarInmediatamente(e.target.checked)}
                />
                {pesarInmediatamente && (
                  <div className="mt-3">
                    <Form.Label className="fw-semibold text-primary">
                      Peso {esBrutoPrimero ? "Bruto Inicial del Vehículo Cargado" : "Tara del Equipo Vacío"} (LB) *
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="number"
                        step="any"
                        placeholder="Ej: 14500"
                        value={pesoTaraInicial}
                        onChange={(e) => setPesoTaraInicial(e.target.value)}
                        autoFocus
                        required={pesarInmediatamente}
                      />
                      <InputGroup.Text>Libras (LB)</InputGroup.Text>
                    </InputGroup>
                    <Form.Text className="text-muted">
                      Se guardará como la 1ra pesada ({esBrutoPrimero ? "Bruto" : "Tara"}). Al salir, se pesará {esBrutoPrimero ? "vacío (Tara)" : "cargado (Bruto)"} para calcular el peso neto.
                    </Form.Text>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="outline-secondary" onClick={handleClose} disabled={submitting}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={submitting}>
            {submitting ? "Guardando..." : "Crear Movimiento"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
