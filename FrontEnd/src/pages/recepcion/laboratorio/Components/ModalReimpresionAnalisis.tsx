import { useState, useRef, KeyboardEvent } from "react";
import { Search, Loader2, Printer } from "lucide-react";
import { Modal, Button, Form, InputGroup, Table, Badge } from "react-bootstrap";
import { buscarAnalisisApi } from "../../../../api/analisis.api";
import BoletaModal from "./BoletaModal";
import type { MuestraPendiente } from "../Containers/LaboratorioPage";

interface Props {
  show: boolean;
  onClose: () => void;
}

function mapAnalisisToMuestra(ana: any): MuestraPendiente {
  const det = ana.detalle_recepcion;
  return {
    ...det,
    numero_entrada: det?.recepcion?.numero_entrada ?? "N/A",
    proveedor_nombre: det?.proveedor?.nombre ?? "N/A",
    analisis: {
      id_analisis: ana.id_analisis_calidad,
      fecha_analisis: ana.fecha_analisis,
      tipo_analisis: ana.tipo_analisis,
      humedad: ana.humedad,
      dano: ana.dano,
      primer_rendimiento: ana.primer_rendimiento,
      segundo_rendimiento: ana.segundo_rendimiento,
      observaciones: ana.observaciones,
      catador: ana.catador,
      calidad: ana.calidad,
      analisis_defectos: ana.analisis_defectos,
      analisis_zarandas: ana.analisis_zarandas,
      analisis_tazas: ana.analisis_tazas,
    },
  };
}

export default function ModalReimpresionAnalisis({ show, onClose }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState<any[]>([]);
  const [buscado, setBuscado] = useState(false);
  const [muestraImprimir, setMuestraImprimir] = useState<MuestraPendiente | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBuscar = async () => {
    const q = inputValue.trim();
    if (q.length < 2) return;
    setLoading(true);
    setBuscado(true);
    try {
      const data = await buscarAnalisisApi(q);
      setResultados(data);
    } catch {
      setResultados([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleBuscar();
  };

  const handleClose = () => {
    setInputValue("");
    setResultados([]);
    setBuscado(false);
    onClose();
  };

  const handleReimprimir = (ana: any) => {
    setMuestraImprimir(mapAnalisisToMuestra(ana));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-6 d-flex align-items-center gap-2">
            <Printer size={18} className="text-primary" />
            Reimpresión de Análisis
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputGroup className="mb-4">
            <InputGroup.Text className="bg-light border-end-0 text-muted">
              <Search size={15} />
            </InputGroup.Text>
            <Form.Control
              ref={inputRef}
              placeholder="Buscar por No. Ingreso o Remisión Física..."
              className="bg-light border-start-0 ps-0"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button variant="primary" onClick={handleBuscar} disabled={loading || inputValue.trim().length < 2}>
              {loading ? <Loader2 size={14} className="animate-spin" /> : "Buscar"}
            </Button>
          </InputGroup>

          {loading ? (
            <div className="text-center py-5">
              <Loader2 className="w-5 h-5 animate-spin inline-block text-neutral-400 me-2" />
              Buscando...
            </div>
          ) : buscado && resultados.length === 0 ? (
            <div className="text-center py-5 text-muted">
              No se encontraron análisis para la búsqueda ingresada.
            </div>
          ) : resultados.length > 0 ? (
            <Table responsive hover size="sm" className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th>No. Análisis</th>
                  <th>No. Ingreso</th>
                  <th>Remisión</th>
                  <th>Proveedor / Finca</th>
                  <th className="text-center">Tipo</th>
                  <th>Catador</th>
                  <th>Fecha Análisis</th>
                  <th className="text-center">Estado</th>
                  <th className="text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((ana) => (
                  <tr key={ana.id_analisis_calidad}>
                    <td className="fw-medium">{ana.numero_analisis}</td>
                    <td className="fw-bold text-coffee-700">
                      {ana.detalle_recepcion?.recepcion?.numero_entrada ?? "—"}
                    </td>
                    <td>{ana.detalle_recepcion?.remision ?? "—"}</td>
                    <td>{ana.detalle_recepcion?.proveedor?.nombre ?? "—"}</td>
                    <td className="text-center">
                      <Badge bg="primary-transparent">{ana.tipo_analisis}</Badge>
                    </td>
                    <td>{ana.catador?.nombre ?? "—"}</td>
                    <td>{new Date(ana.fecha_analisis).toLocaleString()}</td>
                    <td className="text-center">
                      <Badge bg="secondary-transparent">
                        {ana.estado_transaccion?.nombre ?? "—"}
                      </Badge>
                    </td>
                    <td className="text-center">
                      <Button
                        size="sm"
                        variant="outline-primary"
                        className="d-inline-flex align-items-center gap-1"
                        onClick={() => handleReimprimir(ana)}
                      >
                        <Printer size={13} /> Reimprimir
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center py-5 text-muted small">
              Ingrese un No. Ingreso o Remisión Física y presione Enter o "Buscar".
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      {/* Boleta de reimpresión con badge COPIA */}
      <BoletaModal
        muestra={muestraImprimir}
        onClose={() => setMuestraImprimir(null)}
        esCopia
      />
    </>
  );
}
