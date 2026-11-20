import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Badge, Form } from "react-bootstrap";
import {
  Printer,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Settings,
  Scale,
  Truck,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  imprimirMatricialPesada,
  imprimirMatricialPaseSalida,
  obtenerImpresorasDisponibles,
  guardarImpresoraConfig,
} from "../../../../api/printer.api";

export interface ModalElegirImpresionPesadaProps {
  show: boolean;
  tipo: "primera" | "segunda" | "pase_salida";
  idDetalle: number | null;
  recepcion?: any | null;
  carga?: any | null;
  onClose: () => void;
}

export default function ModalElegirImpresionPesada({
  show,
  tipo,
  idDetalle,
  recepcion,
  carga,
  onClose,
}: ModalElegirImpresionPesadaProps) {
  const base = import.meta.env.BASE_URL;
  const [imprimiendo, setImprimiendo] = useState(false);
  const [listaImpresoras, setListaImpresoras] = useState<string[]>([]);
  const [impresoraSeleccionada, setImpresoraSeleccionada] = useState<string>("");
  const [agenteOnline, setAgenteOnline] = useState<boolean>(false);

  useEffect(() => {
    if (!show) return;
    obtenerImpresorasDisponibles().then((res) => {
      setAgenteOnline(res.online);
      setListaImpresoras(res.impresoras);
      if (res.activa) {
        setImpresoraSeleccionada(res.activa);
      }
    });
  }, [show]);

  if (!show || !idDetalle) return null;

  const handleChangeImpresora = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nueva = e.target.value;
    setImpresoraSeleccionada(nueva);
    await guardarImpresoraConfig(nueva);
    toast.success(`Impresora matricial: ${nueva}`);
  };

  const handleImprimirMatricial = async () => {
    if (!idDetalle) return;
    setImprimiendo(true);
    try {
      const res =
        tipo === "pase_salida"
          ? await imprimirMatricialPaseSalida(idDetalle)
          : await imprimirMatricialPesada(idDetalle, tipo, false);

      if (res.success) {
        toast.success(`🖨️ ${res.message}`);
        onClose();
      } else {
        toast.error(res.message);
      }
    } finally {
      setImprimiendo(false);
    }
  };

  const handleImprimirNavegador = () => {
    if (!idDetalle) return;
    const url =
      tipo === "pase_salida"
        ? `${base}print/pase-salida/${idDetalle}`
        : `${base}print/boleta-pesada/${idDetalle}/${tipo}`;
    window.open(url, "_blank");
    onClose();
  };

  const titulo =
    tipo === "primera"
      ? "Imprimir Boleta de 1ª Pesada (Peso Bruto)"
      : tipo === "segunda"
        ? "Imprimir Boleta de 2ª Pesada (Tara y Neto)"
        : "Imprimir Pase de Salida de Báscula";

  const noEntrada = recepcion?.numero_entrada ?? carga?.recepcion?.numero_entrada ?? "—";
  const remision = carga?.remision ?? "—";
  const proveedor = carga?.proveedor?.nombre ?? "—";
  const placaCabezal = recepcion?.placa_cabezal?.placa ?? carga?.placa_cabezal?.placa ?? "—";
  const placaFurgon = recepcion?.placa_furgon?.placa ?? carga?.placa_furgon?.placa ?? "";
  const placaCompleta = placaFurgon ? `${placaCabezal} / ${placaFurgon}` : placaCabezal;

  return (
    <Modal show={show} onHide={onClose} backdrop="static" centered size="lg" style={{ zIndex: 1065 }}>
      <Modal.Header closeButton>
        <Modal.Title className="fs-6 d-flex align-items-center gap-2">
          {tipo === "pase_salida" ? (
            <Truck size={18} className="text-warning" />
          ) : (
            <Scale size={18} className="text-primary" />
          )}
          <span>{titulo}</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        {/* Resumen del registro */}
        <Card className="border bg-light bg-opacity-50 mb-3 shadow-none">
          <Card.Body className="p-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-1">
              <div>
                <span className="text-muted small me-2">No. Entrada:</span>
                <span className="fw-bold font-monospace me-3">{noEntrada}</span>
                <span className="text-muted small me-2">Remisión:</span>
                <span className="fw-bold text-dark">{remision}</span>
              </div>
              <Badge bg="success-transparent">Registro Guardado</Badge>
            </div>
            <div className="text-muted small d-flex flex-wrap gap-3">
              <div>
                <strong>Proveedor:</strong> {proveedor}
              </div>
              <div>
                <strong>Placa:</strong> {placaCompleta}
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Configuración del Agente Matricial */}
        <div className="bg-light border rounded-3 p-3 mb-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
            <div className="d-flex align-items-center gap-2">
              <Settings size={15} className="text-secondary" />
              <span className="fw-semibold small">Impresora Matricial (Agente Local):</span>
            </div>
            {agenteOnline ? (
              <Badge bg="success" className="d-flex align-items-center gap-1">
                <CheckCircle2 style={{ width: 12, height: 12 }} /> Agente en Línea
              </Badge>
            ) : (
              <Badge bg="warning" text="dark" className="d-flex align-items-center gap-1">
                <AlertCircle style={{ width: 12, height: 12 }} /> Agente no detectado (:4000)
              </Badge>
            )}
          </div>

          <Form.Select
            size="sm"
            value={impresoraSeleccionada}
            onChange={handleChangeImpresora}
            disabled={!agenteOnline || listaImpresoras.length === 0}
          >
            {listaImpresoras.length === 0 ? (
              <option value="">
                {agenteOnline
                  ? "(Buscando impresoras instaladas...)"
                  : "(Agente no detectado en esta PC - use Impresora Láser / Navegador)"}
              </option>
            ) : (
              listaImpresoras.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))
            )}
          </Form.Select>
        </div>

        <p className="text-muted small mb-3">
          Seleccione dónde desea imprimir el comprobante:
        </p>

        {/* Dos opciones claras de impresión */}
        <div className="d-flex flex-column gap-3">
          <Card className="border border-primary-subtle shadow-none">
            <Card.Body className="p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="p-2 rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center"
                  style={{ width: "42px", height: "42px" }}
                >
                  <Printer size={20} />
                </div>
                <div>
                  <div className="fw-bold text-dark">Impresora Matricial (Directo ESC/P)</div>
                  <div className="text-muted small">
                    Envía la boleta directo al formulario continuo en{" "}
                    <strong>{impresoraSeleccionada || "Epson FX-890II"}</strong>.
                  </div>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                className="d-flex align-items-center gap-2 px-3"
                disabled={imprimiendo || !agenteOnline}
                onClick={handleImprimirMatricial}
              >
                {imprimiendo ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Enviando...
                  </>
                ) : (
                  <>
                    <Printer size={14} /> Imprimir en Matricial
                  </>
                )}
              </Button>
            </Card.Body>
          </Card>

          <Card className="border border-secondary-subtle shadow-none">
            <Card.Body className="p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="p-2 rounded-circle bg-secondary bg-opacity-10 text-secondary d-flex align-items-center justify-content-center"
                  style={{ width: "42px", height: "42px" }}
                >
                  <ExternalLink size={20} />
                </div>
                <div>
                  <div className="fw-bold text-dark">Impresora Láser / Navegador (Vista Web)</div>
                  <div className="text-muted small">
                    Abre la boleta en una nueva pestaña para enviarla a su impresora láser o PDF.
                  </div>
                </div>
              </div>
              <Button
                variant="outline-dark"
                size="sm"
                className="d-flex align-items-center gap-2 px-3"
                disabled={imprimiendo}
                onClick={handleImprimirNavegador}
              >
                <ExternalLink size={14} /> Imprimir en Láser / Web
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={imprimiendo}>
          Cerrar / Omitir Impresión
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
