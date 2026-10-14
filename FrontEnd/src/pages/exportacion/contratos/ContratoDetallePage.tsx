import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileText, Plus, Save, Send, PackageSearch } from "lucide-react";
import { Card, Table, Badge, Button, Form, Row, Col } from "react-bootstrap";
import toast from "react-hot-toast";
import PageHeader from "../../../components/layout/PageHeader";
import ModalAgregarLote from "../../../components/exportacion/contratos/ModalAgregarLote";
import { moduleColors } from "../../../config/colors.config";
import { mockContratos, type Lote } from "./mockData";
import { getEstadoContratoVariant } from "./estadoContrato";

const colors = moduleColors.exportacion;

export default function ContratoDetallePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const contratoId = decodeURIComponent(id || "");
  const index = mockContratos.findIndex((c) => c.id === contratoId);

  const [, forceRender] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(() => ({
    destino: mockContratos[index]?.destino ?? "",
    precio_pactado: mockContratos[index]?.precio_pactado?.toString() ?? "",
    cantidad_sacos_pactada: mockContratos[index]?.cantidad_sacos_pactada?.toString() ?? "",
  }));

  const contrato = index >= 0 ? mockContratos[index] : null;

  const existingLotes = useMemo(
    () => mockContratos.flatMap((c) => c.lotes.map((l) => ({ no_lote: l.no_lote, no_partida: l.no_partida, contratoId: c.id }))),
    [contrato?.lotes.length]
  );

  if (!contrato) {
    return (
      <div>
        <Button variant="link" className="ps-0 d-flex align-items-center gap-1" onClick={() => navigate("/exportacion/contratos")}>
          <ArrowLeft className="w-4 h-4" /> Volver a Contratos
        </Button>
        <Card className="mt-3">
          <Card.Body className="text-center py-8 text-neutral-500">
            No se encontró el contrato "{contratoId}".
          </Card.Body>
        </Card>
      </div>
    );
  }

  const esEditable = contrato.estado === "Creado";

  const handleGuardarCabecera = () => {
    const precio = Number(editForm.precio_pactado);
    const sacos = Number(editForm.cantidad_sacos_pactada);
    if (!editForm.destino.trim() || Number.isNaN(precio) || precio < 0 || Number.isNaN(sacos) || sacos <= 0) {
      toast.error("Revisa los datos: destino, precio y cantidad de sacos deben ser válidos.");
      return;
    }
    contrato.destino = editForm.destino.trim();
    contrato.precio_pactado = precio;
    contrato.cantidad_sacos_pactada = sacos;
    toast.success("Cambios guardados.");
    forceRender((n) => n + 1);
  };

  const handleEnviarCliente = () => {
    contrato.estado = "Enviado a Cliente";
    toast.success(`Contrato ${contrato.id} enviado al cliente.`);
    forceRender((n) => n + 1);
  };

  const handleAgregarLote = (lote: Lote) => {
    contrato.lotes.push(lote);
    toast.success(`Lote ${lote.no_lote} agregado al contrato.`);
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <Button variant="link" className="ps-0 d-flex align-items-center gap-1" onClick={() => navigate("/exportacion/contratos")}>
        <ArrowLeft className="w-4 h-4" /> Volver a Contratos
      </Button>

      <PageHeader
        title={contrato.id}
        subtitle={`Cliente: ${contrato.cliente}`}
        icon={FileText}
        iconBg={colors.bg}
        iconColor={colors.icon}
        actions={esEditable ? [{ label: "Enviar contrato al cliente", onClick: handleEnviarCliente, icon: Send }] : []}
      />

      <Card className="mb-6">
        <Card.Body className="p-4">
          <Row className="g-3">
            <Col md={3}>
              <div className="text-neutral-500 small">Aviso de Venta</div>
              <div className="fw-medium">{contrato.aviso_venta || "—"}</div>
            </Col>
            <Col md={3}>
              <div className="text-neutral-500 small">Estado</div>
              <Badge bg={getEstadoContratoVariant(contrato.estado)}>{contrato.estado}</Badge>
            </Col>
            <Col md={3}>
              <div className="text-neutral-500 small">Cosecha</div>
              <div className="fw-medium">{contrato.cosecha}</div>
            </Col>
            <Col md={3}>
              <div className="text-neutral-500 small">Fecha de Creación</div>
              <div className="fw-medium">{contrato.fecha_creacion}</div>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label className="small fw-medium">Destino</Form.Label>
                <Form.Control
                  type="text"
                  disabled={!esEditable}
                  value={esEditable ? editForm.destino : contrato.destino}
                  onChange={(e) => setEditForm((f) => ({ ...f, destino: e.target.value }))}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="small fw-medium">Precio Pactado (US$/saco)</Form.Label>
                <Form.Control
                  type="number" step="0.01"
                  disabled={!esEditable}
                  onWheel={(e) => e.currentTarget.blur()}
                  value={esEditable ? editForm.precio_pactado : contrato.precio_pactado}
                  onChange={(e) => setEditForm((f) => ({ ...f, precio_pactado: e.target.value }))}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="small fw-medium">Cantidad de Sacos Pactada</Form.Label>
                <Form.Control
                  type="number"
                  disabled={!esEditable}
                  onWheel={(e) => e.currentTarget.blur()}
                  value={esEditable ? editForm.cantidad_sacos_pactada : contrato.cantidad_sacos_pactada}
                  onChange={(e) => setEditForm((f) => ({ ...f, cantidad_sacos_pactada: e.target.value }))}
                />
              </Form.Group>
            </Col>

            {esEditable && (
              <Col md={12}>
                <Button variant="outline-primary" size="sm" className="d-flex align-items-center gap-2" onClick={handleGuardarCabecera}>
                  <Save className="w-4 h-4" /> Guardar Cambios
                </Button>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="fs-5 fw-bold text-neutral-900 d-flex align-items-center gap-2 mb-0">
          <PackageSearch className="w-5 h-5" style={{ color: colors.icon }} /> Lotes de este contrato
        </h3>
        <Button variant="primary" size="sm" className="d-flex align-items-center gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" /> Agregar Lote
        </Button>
      </div>

      <Card>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>No. Lote</th>
              <th>No. Partida</th>
              <th>Calidad</th>
              <th>Certificaciones</th>
              <th>Cooperativa</th>
              <th className="text-end">Defectos Máx.</th>
              <th className="text-end">Peso Neto (QQ)</th>
              <th>Tipo de Empaque</th>
              <th className="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {contrato.lotes.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-neutral-500">
                  Este contrato aún no tiene lotes asociados. Usa "+ Agregar Lote" para crear el primero.
                </td>
              </tr>
            ) : (
              contrato.lotes.map((lote) => (
                <tr key={`${lote.no_lote}-${lote.no_partida}`}>
                  <td className="fw-medium">{lote.no_lote}</td>
                  <td>{lote.no_partida}</td>
                  <td>{lote.calidad}</td>
                  <td>
                    <div className="d-flex flex-wrap gap-1">
                      {lote.certificaciones.length === 0
                        ? <span className="text-neutral-400">—</span>
                        : lote.certificaciones.map((cert) => (
                          <Badge key={cert} bg="light" text="dark" className="border rounded-pill px-2">{cert}</Badge>
                        ))}
                    </div>
                  </td>
                  <td>{lote.cooperativa}</td>
                  <td className="text-end">{lote.defectos_maximos}</td>
                  <td className="text-end">{lote.peso_neto_qq.toFixed(2)}</td>
                  <td>{lote.tipo_empaque}</td>
                  <td className="text-center">
                    <Badge bg={lote.estado === "Listo para Embarque" ? "success" : lote.estado === "En Empaque" ? "info" : "secondary"}>
                      {lote.estado}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      <ModalAgregarLote
        show={isModalOpen}
        existingLotes={existingLotes}
        onHide={() => setIsModalOpen(false)}
        onSubmit={handleAgregarLote}
      />
    </div>
  );
}
