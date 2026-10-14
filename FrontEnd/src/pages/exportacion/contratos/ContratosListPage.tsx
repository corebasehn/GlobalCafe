import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Plus, Search, Eye, X } from "lucide-react";
import { Card, Table, Badge, Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import Select from "react-select";
import PageHeader from "../../../components/layout/PageHeader";
import ModalNuevoContrato from "../../../components/exportacion/contratos/ModalNuevoContrato";
import { moduleColors } from "../../../config/colors.config";
import { mockContratos, CLIENTES_DISPONIBLES, COSECHAS_DISPONIBLES, type Contrato, type EstadoContrato } from "./mockData";
import { getEstadoContratoVariant } from "./estadoContrato";

const colors = moduleColors.exportacion;
const ESTADOS: EstadoContrato[] = ["Creado", "Enviado a Cliente", "Confirmado"];

type SelectOption = { value: string; label: string };

export default function ContratosListPage() {
  const navigate = useNavigate();

  const [contratos, setContratos] = useState<Contrato[]>(mockContratos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroCliente, setFiltroCliente] = useState<string>("");
  const [filtroEstado, setFiltroEstado] = useState<string>("");
  const [filtroCosecha, setFiltroCosecha] = useState<string>("");
  const [filtroDesde, setFiltroDesde] = useState<string>("");
  const [filtroHasta, setFiltroHasta] = useState<string>("");

  const clienteOptions: SelectOption[] = CLIENTES_DISPONIBLES.map((c) => ({ value: c, label: c }));
  const estadoOptions: SelectOption[] = ESTADOS.map((e) => ({ value: e, label: e }));
  const cosechaOptions: SelectOption[] = COSECHAS_DISPONIBLES.map((c) => ({ value: c, label: c }));

  const hayFiltrosActivos = !!(filtroCliente || filtroEstado || filtroCosecha || filtroDesde || filtroHasta || searchTerm);

  const limpiarFiltros = () => {
    setSearchTerm("");
    setFiltroCliente("");
    setFiltroEstado("");
    setFiltroCosecha("");
    setFiltroDesde("");
    setFiltroHasta("");
  };

  const contratosFiltrados = useMemo(() => {
    return contratos.filter((c) => {
      const term = searchTerm.trim().toLowerCase();
      if (term && !c.id.toLowerCase().includes(term) && !c.cliente.toLowerCase().includes(term)) return false;
      if (filtroCliente && c.cliente !== filtroCliente) return false;
      if (filtroEstado && c.estado !== filtroEstado) return false;
      if (filtroCosecha && c.cosecha !== filtroCosecha) return false;
      if (filtroDesde && c.fecha_creacion < filtroDesde) return false;
      if (filtroHasta && c.fecha_creacion > filtroHasta) return false;
      return true;
    });
  }, [contratos, searchTerm, filtroCliente, filtroEstado, filtroCosecha, filtroDesde, filtroHasta]);

  return (
    <div>
      <PageHeader
        title="Contratos"
        subtitle="Gestión de contratos de exportación de café"
        icon={FileText}
        iconBg={colors.bg}
        iconColor={colors.icon}
        actions={[{ label: "Nuevo Contrato", onClick: () => setIsModalOpen(true), icon: Plus }]}
      />

      <Card className="mb-3">
        <Card.Body className="p-4">
          <InputGroup>
            <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
            <Form.Control
              placeholder="Buscar por No. Contrato o Cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Card.Body>
      </Card>

      <Card className="mb-6">
        <Card.Body className="p-4">
          <Row className="g-3 align-items-end">
            <Col md={3}>
              <Form.Group>
                <Form.Label className="small fw-medium mb-1">Cliente</Form.Label>
                <Select
                  classNamePrefix="Select2"
                  placeholder="Todos"
                  isClearable
                  options={clienteOptions}
                  value={filtroCliente ? { value: filtroCliente, label: filtroCliente } : null}
                  onChange={(opt) => setFiltroCliente(opt?.value || "")}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label className="small fw-medium mb-1">Estado</Form.Label>
                <Select
                  classNamePrefix="Select2"
                  placeholder="Todos"
                  isClearable
                  options={estadoOptions}
                  value={filtroEstado ? { value: filtroEstado, label: filtroEstado } : null}
                  onChange={(opt) => setFiltroEstado(opt?.value || "")}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label className="small fw-medium mb-1">Cosecha</Form.Label>
                <Select
                  classNamePrefix="Select2"
                  placeholder="Todas"
                  isClearable
                  options={cosechaOptions}
                  value={filtroCosecha ? { value: filtroCosecha, label: filtroCosecha } : null}
                  onChange={(opt) => setFiltroCosecha(opt?.value || "")}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label className="small fw-medium mb-1">Fecha desde</Form.Label>
                <Form.Control type="date" size="sm" value={filtroDesde} onChange={(e) => setFiltroDesde(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label className="small fw-medium mb-1">Fecha hasta</Form.Label>
                <Form.Control type="date" size="sm" value={filtroHasta} onChange={(e) => setFiltroHasta(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={1}>
              {hayFiltrosActivos && (
                <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1" onClick={limpiarFiltros}>
                  <X className="w-4 h-4" /> Limpiar
                </Button>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>No. Contrato</th>
              <th>Cliente</th>
              <th>Aviso de Venta</th>
              <th>Calidad Pactada</th>
              <th className="text-end">Sacos</th>
              <th>Destino</th>
              <th className="text-center">Estado</th>
              <th>Fecha Creación</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contratos.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-neutral-500">
                  No hay contratos registrados todavía. Crea el primero con el botón "Nuevo Contrato".
                </td>
              </tr>
            ) : contratosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-neutral-500">
                  No se encontraron contratos con los filtros aplicados.
                </td>
              </tr>
            ) : (
              contratosFiltrados.map((contrato) => (
                <tr
                  key={contrato.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/exportacion/contratos/${encodeURIComponent(contrato.id)}`)}
                >
                  <td className="fw-bold" style={{ color: colors.icon }}>{contrato.id}</td>
                  <td>{contrato.cliente}</td>
                  <td>{contrato.aviso_venta || "—"}</td>
                  <td>{contrato.calidad_pactada || "—"}</td>
                  <td className="text-end">{contrato.cantidad_sacos_pactada.toLocaleString()}</td>
                  <td>{contrato.destino}</td>
                  <td className="text-center">
                    <Badge bg={getEstadoContratoVariant(contrato.estado)}>{contrato.estado}</Badge>
                  </td>
                  <td>{contrato.fecha_creacion}</td>
                  <td className="text-center">
                    <Button
                      variant="light"
                      size="sm"
                      className="d-flex align-items-center gap-1"
                      onClick={(e) => { e.stopPropagation(); navigate(`/exportacion/contratos/${encodeURIComponent(contrato.id)}`); }}
                    >
                      <Eye className="w-4 h-4" /> Ver
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      <ModalNuevoContrato
        show={isModalOpen}
        existingIds={contratos.map((c) => c.id)}
        onHide={() => setIsModalOpen(false)}
        onCreate={(nuevo) => {
          mockContratos.unshift(nuevo); // persiste en la "base de datos" en memoria para que el detalle lo encuentre
          setContratos((prev) => [nuevo, ...prev]);
        }}
      />
    </div>
  );
}
