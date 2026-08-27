import { useState, KeyboardEvent } from "react";
import { Search, Loader2, Printer, ChevronRight, ChevronDown } from "lucide-react";
import { Modal, Button, Form, InputGroup, Table, Badge } from "react-bootstrap";
import { buscarPesadasApi } from "../../../../api/reception.api";

interface Props {
  show: boolean;
  onClose: () => void;
}

function getBadgeVariant(estado: string) {
  if (estado === "Pesada Abierta") return "info-transparent";
  if (estado === "Pesaje Completado" || estado === "En Bodega" || estado === "Pesada Cerrada") return "success-transparent";
  if (estado.includes("Rechazada") || estado === "Devolución") return "danger-transparent";
  return "secondary-transparent";
}

export default function ModalReimpresionPesadasIngreso({ show, onClose }: Props) {
  const base = import.meta.env.BASE_URL;

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [recepciones, setRecepciones] = useState<any[]>([]);
  const [buscado, setBuscado] = useState(false);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleBuscar = async () => {
    const q = inputValue.trim();
    if (q.length < 2) return;
    setLoading(true);
    setBuscado(true);
    setExpandedRows([]);
    try {
      const data = await buscarPesadasApi(q);
      setRecepciones(data);
    } catch {
      setRecepciones([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleBuscar();
  };

  const handleClose = () => {
    setInputValue("");
    setRecepciones([]);
    setBuscado(false);
    setExpandedRows([]);
    onClose();
  };

  const handleReimprimir = (carga: any) => {
    const tipo = carga.pesada_salida != null ? "segunda" : "primera";
    window.open(`${base}print/boleta-pesada/${carga.id_detalle_recepcion}/${tipo}?copia=true`, "_blank");
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-6 d-flex align-items-center gap-2">
          <Printer size={18} className="text-primary" />
          Reimpresión de Pesadas
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <InputGroup className="mb-4">
          <InputGroup.Text className="bg-light border-end-0 text-muted">
            <Search size={15} />
          </InputGroup.Text>
          <Form.Control
            placeholder="Buscar por No. Ingreso, Remisión, Placa Cabezal o Furgón..."
            className="bg-light border-start-0 ps-0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="primary"
            onClick={handleBuscar}
            disabled={loading || inputValue.trim().length < 2}
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : "Buscar"}
          </Button>
        </InputGroup>

        {loading ? (
          <div className="text-center py-5">
            <Loader2 className="w-5 h-5 animate-spin inline-block text-neutral-400 me-2" />
            Buscando...
          </div>
        ) : buscado && recepciones.length === 0 ? (
          <div className="text-center py-5 text-muted">
            No se encontraron pesadas para la búsqueda ingresada.
          </div>
        ) : recepciones.length > 0 ? (
          <Table responsive hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th style={{ width: 40 }} />
                <th>No. Entrada</th>
                <th>Fecha / Hora</th>
                <th>Transporte</th>
                <th>Placa Cabezal</th>
                <th>Placa Furgón</th>
                <th className="text-center">Cargas</th>
              </tr>
            </thead>
            <tbody>
              {recepciones.map((r) => {
                const isExpanded = expandedRows.includes(r.id_recepcion);
                const detalles: any[] = r.detalles || [];
                const cabezal = r.placa_cabezal?.placa ?? "—";
                const furgon = r.placa_furgon?.placa ?? "—";
                const transporte = r.conductor?.transporte?.nombre ?? "—";

                return (
                  <>
                    <tr
                      key={r.id_recepcion}
                      className={isExpanded ? "table-warning bg-opacity-10" : ""}
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleRow(r.id_recepcion)}
                    >
                      <td>
                        <Button variant="link" size="sm" className="p-1 text-neutral-500" tabIndex={-1}>
                          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </Button>
                      </td>
                      <td className="fw-bold text-coffee-700">{r.numero_entrada}</td>
                      <td>{new Date(r.fecha_entrada).toLocaleString()}</td>
                      <td>{transporte}</td>
                      <td>{cabezal}</td>
                      <td>{furgon}</td>
                      <td className="text-center">
                        <Badge bg="secondary-transparent">{detalles.length}</Badge>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr key={`det-${r.id_recepcion}`}>
                        <td colSpan={7} className="p-0 border-bottom">
                          <div className="px-4 py-3 bg-light bg-opacity-50">
                            <Table responsive hover size="sm" className="mb-0">
                              <thead className="bg-light">
                                <tr>
                                  <th>Remisión</th>
                                  <th>Proveedor / Finca</th>
                                  <th className="text-end">Pesada Entrada</th>
                                  <th className="text-end">Pesada Salida</th>
                                  <th className="text-center">Estado</th>
                                  <th className="text-center">Tipo Boleta</th>
                                  <th className="text-center">Acción</th>
                                </tr>
                              </thead>
                              <tbody>
                                {detalles.map((carga: any) => {
                                  const tieneSalida = carga.pesada_salida != null;
                                  const estadoNombre = carga.estado_transaccion?.nombre ?? "—";

                                  return (
                                    <tr key={carga.id_detalle_recepcion}>
                                      <td className="fw-medium">{carga.remision}</td>
                                      <td>{carga.proveedor?.nombre ?? "—"}</td>
                                      <td className="text-end font-monospace">
                                        {carga.pesada_entrada
                                          ? Number(carga.pesada_entrada).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " LB"
                                          : "—"}
                                      </td>
                                      <td className="text-end font-monospace">
                                        {tieneSalida
                                          ? Number(carga.pesada_salida).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " LB"
                                          : "—"}
                                      </td>
                                      <td className="text-center">
                                        <Badge bg={getBadgeVariant(estadoNombre)}>
                                          {estadoNombre}
                                        </Badge>
                                      </td>
                                      <td className="text-center">
                                        <Badge bg={tieneSalida ? "success-transparent" : "primary-transparent"}>
                                          {tieneSalida ? "2da Pesada" : "1ra Pesada"}
                                        </Badge>
                                      </td>
                                      <td className="text-center">
                                        <Button
                                          size="sm"
                                          variant="outline-primary"
                                          className="d-inline-flex align-items-center gap-1"
                                          onClick={(e) => { e.stopPropagation(); handleReimprimir(carga); }}
                                        >
                                          <Printer size={13} /> Reimprimir
                                        </Button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <div className="text-center py-5 text-muted small">
            Ingrese un No. Ingreso, Remisión, Placa Cabezal o Furgón y presione Enter o "Buscar".
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}
