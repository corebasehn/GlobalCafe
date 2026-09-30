import { useState, useRef, KeyboardEvent } from "react";
import { Search, Loader2, Printer, GitCompare, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { Modal, Button, Form, InputGroup, Table, Badge } from "react-bootstrap";
import { buscarAnalisisApi } from "../../../../api/analisis.api";

interface Props {
  show: boolean;
  onClose: () => void;
}

interface GrupoComparativo {
  id_detalle: number;
  numero_entrada: string;
  remision: string;
  proveedor_nombre: string;
  cantidad_qq: number;
  placa_cabezal?: string;
  previa?: any;
  general?: any;
  otros: any[];
}

export default function ModalComparativoAnalisis({ show, onClose }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [buscado, setBuscado] = useState(false);
  const [grupos, setGrupos] = useState<GrupoComparativo[]>([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<GrupoComparativo | null>(null);
  const [esCopia, setEsCopia] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const agruparAnalisis = (analisisList: any[]): GrupoComparativo[] => {
    const mapa = new Map<number, GrupoComparativo>();

    analisisList.forEach((ana) => {
      const det = ana.detalle_recepcion;
      const idDet = det?.id_detalle_recepcion || ana.id_detalle_recepcion || 0;

      if (!mapa.has(idDet)) {
        mapa.set(idDet, {
          id_detalle: idDet,
          numero_entrada: det?.recepcion?.numero_entrada ?? "—",
          remision: det?.remision ?? "—",
          proveedor_nombre: det?.proveedor?.nombre ?? "—",
          cantidad_qq: Number(det?.cantidad_qq || 0),
          placa_cabezal: det?.recepcion?.placa_cabezal?.placa ?? det?.placa_cabezal?.placa ?? "",
          previa: undefined,
          general: undefined,
          otros: [],
        });
      }

      const g = mapa.get(idDet)!;
      const tipo = (ana.tipo_analisis || "").toLowerCase();

      if (tipo.includes("previa")) {
        if (!g.previa || new Date(ana.fecha_analisis) > new Date(g.previa.fecha_analisis)) {
          g.previa = ana;
        }
      } else if (tipo.includes("general")) {
        if (!g.general || new Date(ana.fecha_analisis) > new Date(g.general.fecha_analisis)) {
          g.general = ana;
        }
      } else {
        g.otros.push(ana);
      }
    });

    // Si algún grupo tiene otros análisis sin clasificación previa/general
    mapa.forEach((g) => {
      if (!g.previa && g.otros.length > 0) {
        g.previa = g.otros.shift();
      }
      if (!g.general && g.otros.length > 0) {
        g.general = g.otros.shift();
      }
    });

    return Array.from(mapa.values());
  };

  const handleBuscar = async () => {
    const q = inputValue.trim();
    if (q.length < 2) return;
    setLoading(true);
    setBuscado(true);
    setGrupoSeleccionado(null);
    try {
      const data = await buscarAnalisisApi(q);
      const agrp = agruparAnalisis(data);
      setGrupos(agrp);
      if (agrp.length === 1) {
        setGrupoSeleccionado(agrp[0]);
      }
    } catch {
      setGrupos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleBuscar();
  };

  const handleClose = () => {
    setInputValue("");
    setGrupos([]);
    setGrupoSeleccionado(null);
    setBuscado(false);
    onClose();
  };

  // Cálculos de variación delta
  const calcDelta = (vPrevia: any, vGeneral: any) => {
    if (vPrevia == null || vGeneral == null) return null;
    const numP = Number(vPrevia);
    const numG = Number(vGeneral);
    if (isNaN(numP) || isNaN(numG)) return null;
    const diff = Number((numG - numP).toFixed(2));
    const sign = diff > 0 ? `+${diff}` : `${diff}`;
    return { diff, sign };
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-6 d-flex align-items-center gap-2">
          <GitCompare size={18} className="text-primary" />
          <span>Reporte Comparativo de Análisis (Previa vs General)</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        {/* Barra de búsqueda */}
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
            Buscando análisis para comparativo...
          </div>
        ) : buscado && grupos.length === 0 ? (
          <div className="text-center py-5 text-muted">
            No se encontraron análisis de calidad para la búsqueda ingresada.
          </div>
        ) : !grupoSeleccionado && grupos.length > 0 ? (
          /* Lista de remisiones encontradas para seleccionar */
          <div>
            <p className="text-muted small mb-3">
              Seleccione la remisión o ingreso para ver el reporte comparativo:
            </p>
            <Table responsive hover size="sm" className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th>No. Ingreso</th>
                  <th>Remisión</th>
                  <th>Proveedor / Finca</th>
                  <th className="text-center">Muestra Previa</th>
                  <th className="text-center">Muestra General</th>
                  <th className="text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {grupos.map((g) => (
                  <tr key={g.id_detalle}>
                    <td className="fw-bold text-coffee-700">{g.numero_entrada}</td>
                    <td>{g.remision}</td>
                    <td>{g.proveedor_nombre}</td>
                    <td className="text-center">
                      {g.previa ? (
                        <Badge bg="info-transparent" className="d-inline-flex align-items-center gap-1">
                          <CheckCircle2 size={12} /> {g.previa.numero_analisis}
                        </Badge>
                      ) : (
                        <Badge bg="secondary-transparent">Sin Previa</Badge>
                      )}
                    </td>
                    <td className="text-center">
                      {g.general ? (
                        <Badge bg="success-transparent" className="d-inline-flex align-items-center gap-1">
                          <CheckCircle2 size={12} /> {g.general.numero_analisis}
                        </Badge>
                      ) : (
                        <Badge bg="warning-transparent" className="d-inline-flex align-items-center gap-1">
                          <AlertCircle size={12} /> Pendiente
                        </Badge>
                      )}
                    </td>
                    <td className="text-center">
                      <Button
                        size="sm"
                        variant="outline-primary"
                        className="d-inline-flex align-items-center gap-1"
                        onClick={() => setGrupoSeleccionado(g)}
                      >
                        <GitCompare size={13} /> Ver Comparativo
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : grupoSeleccionado ? (
          /* Vista del reporte comparativo */
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <div className="d-flex align-items-center gap-2">
                {grupos.length > 1 && (
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => setGrupoSeleccionado(null)}
                    className="d-inline-flex align-items-center gap-1"
                  >
                    <ArrowLeft size={14} /> Volver a lista
                  </Button>
                )}
                <span className="fw-semibold text-dark">
                  Comparativo de Ingreso: <span className="text-coffee-700 font-monospace">{grupoSeleccionado.numero_entrada}</span> | Remisión: {grupoSeleccionado.remision}
                </span>
              </div>

              <div className="d-flex align-items-center gap-3">
                <Form.Check
                  type="switch"
                  id="switch-copia-comparativo"
                  label={<span className="small text-muted">Marca "COPIA"</span>}
                  checked={esCopia}
                  onChange={(e) => setEsCopia(e.target.checked)}
                />
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => window.print()}
                  className="d-inline-flex align-items-center gap-1"
                >
                  <Printer size={14} /> Imprimir Reporte Comparativo
                </Button>
              </div>
            </div>

            {/* Aviso si falta alguna de las dos boletas */}
            {(!grupoSeleccionado.previa || !grupoSeleccionado.general) && (
              <div className="alert alert-warning py-2 px-3 small mb-3 d-flex align-items-center gap-2">
                <AlertCircle size={16} />
                <span>
                  {!grupoSeleccionado.general
                    ? "Atención: La Muestra General aún no ha sido registrada para esta carga. El reporte muestra los datos de la Muestra Previa disponible."
                    : "Atención: La Muestra Previa no fue registrada o fue omitida. El reporte muestra la Muestra General."}
                </span>
              </div>
            )}

            {/* CONTENEDOR IMPRIMIBLE */}
            <div id="print-comparativo" className="comparativo-print-container">
              <style>{`
                @media print {
                  @page { margin: 0.6cm; size: letter portrait; }
                  html, body {
                    height: auto !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    background: white !important;
                  }
                  body * { visibility: hidden; }
                  * { transform: none !important; }
                  #print-comparativo {
                    position: absolute !important;
                    left: 0 !important;
                    top: 0 !important;
                    width: 100% !important;
                    visibility: visible !important;
                    font-family: Arial, sans-serif !important;
                    font-size: 11px !important;
                    background: white !important;
                    color: black !important;
                  }
                  #print-comparativo * { visibility: visible !important; }
                }
              `}</style>

              <div
                style={{
                  fontFamily: "Arial, sans-serif",
                  padding: "20px",
                  border: "2px solid black",
                  backgroundColor: "white",
                  color: "black",
                  fontSize: "12px",
                  position: "relative",
                }}
              >
                {/* Badge de Copia */}
                {esCopia && (
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      backgroundColor: "#c00",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      padding: "2px 8px",
                      borderRadius: "3px",
                    }}
                  >
                    COPIA
                  </div>
                )}

                {/* Encabezado Principal */}
                <div style={{ textAlign: "center", borderBottom: "2px solid black", paddingBottom: "10px", marginBottom: "14px" }}>
                  <p style={{ fontSize: "18px", fontWeight: "bold", margin: "0 0 2px" }}>GLOBAL COFFEE GROUP</p>
                  <p style={{ fontSize: "13px", fontWeight: "700", margin: "0 0 2px", letterSpacing: "0.04em" }}>
                    REPORTE COMPARATIVO DE CALIDAD (PREVIA VS GENERAL)
                  </p>
                  <p style={{ fontSize: "10px", color: "#555", margin: 0 }}>
                    Control de Calidad y Rendimientos de Café
                  </p>
                </div>

                {/* Ficha General de la Carga */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "6px 12px",
                    borderBottom: "1px solid #000",
                    paddingBottom: "10px",
                    marginBottom: "12px",
                    fontSize: "11px",
                  }}
                >
                  <div>
                    <strong>N° Entrada:</strong> {grupoSeleccionado.numero_entrada}
                  </div>
                  <div>
                    <strong>N° Remisión:</strong> {grupoSeleccionado.remision}
                  </div>
                  <div style={{ gridColumn: "span 2" }}>
                    <strong>Proveedor / Finca:</strong> {grupoSeleccionado.proveedor_nombre}
                  </div>
                  <div>
                    <strong>Volumen:</strong> {grupoSeleccionado.cantidad_qq.toFixed(2)} QQ
                  </div>
                  {grupoSeleccionado.placa_cabezal && (
                    <div>
                      <strong>Placa Cabezal:</strong> {grupoSeleccionado.placa_cabezal}
                    </div>
                  )}
                  <div style={{ gridColumn: "span 2", textAlign: "right", color: "#555" }}>
                    <strong>Fecha Emisión:</strong> {new Date().toLocaleString()}
                  </div>
                </div>

                {/* TABLA RESUMEN COMPARATIVO DE PARÁMETROS CRÍTICOS */}
                <div style={{ marginBottom: "14px" }}>
                  <p style={{ fontWeight: "bold", fontSize: "12px", margin: "0 0 6px", textTransform: "uppercase" }}>
                    1. Comparación de Parámetros Físicos y Rendimiento
                  </p>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", border: "1px solid black" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#f2f2f2", borderBottom: "1px solid black" }}>
                        <th style={{ padding: "5px 8px", textAlign: "left", borderRight: "1px solid #ccc" }}>Parámetro</th>
                        <th style={{ padding: "5px 8px", textAlign: "center", borderRight: "1px solid #ccc", width: "25%" }}>
                          MUESTRA PREVIA ({grupoSeleccionado.previa?.numero_analisis || "N/A"})
                        </th>
                        <th style={{ padding: "5px 8px", textAlign: "center", borderRight: "1px solid #ccc", width: "25%" }}>
                          MUESTRA GENERAL ({grupoSeleccionado.general?.numero_analisis || "N/A"})
                        </th>
                        <th style={{ padding: "5px 8px", textAlign: "center", width: "18%" }}>Variación (Δ)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Calidad */}
                      <tr style={{ borderBottom: "1px solid #ddd" }}>
                        <td style={{ padding: "4px 8px", fontWeight: "bold", borderRight: "1px solid #ccc" }}>Calidad Asignada</td>
                        <td style={{ padding: "4px 8px", textAlign: "center", borderRight: "1px solid #ccc" }}>
                          {grupoSeleccionado.previa?.calidad?.nombre || "—"}
                        </td>
                        <td style={{ padding: "4px 8px", textAlign: "center", borderRight: "1px solid #ccc" }}>
                          {grupoSeleccionado.general?.calidad?.nombre || "—"}
                        </td>
                        <td style={{ padding: "4px 8px", textAlign: "center", fontStyle: "italic", color: "#555" }}>
                          {grupoSeleccionado.previa?.calidad?.nombre === grupoSeleccionado.general?.calidad?.nombre
                            ? "Sin cambio"
                            : grupoSeleccionado.previa && grupoSeleccionado.general
                            ? "Modificada"
                            : "—"}
                        </td>
                      </tr>

                      {/* Humedad */}
                      {(() => {
                        const delta = calcDelta(grupoSeleccionado.previa?.humedad, grupoSeleccionado.general?.humedad);
                        return (
                          <tr style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{ padding: "4px 8px", fontWeight: "bold", borderRight: "1px solid #ccc" }}>Humedad (%)</td>
                            <td style={{ padding: "4px 8px", textAlign: "center", borderRight: "1px solid #ccc" }}>
                              {grupoSeleccionado.previa?.humedad != null ? `${grupoSeleccionado.previa.humedad}%` : "—"}
                            </td>
                            <td style={{ padding: "4px 8px", textAlign: "center", borderRight: "1px solid #ccc" }}>
                              {grupoSeleccionado.general?.humedad != null ? `${grupoSeleccionado.general.humedad}%` : "—"}
                            </td>
                            <td style={{ padding: "4px 8px", textAlign: "center", fontWeight: "bold" }}>
                              {delta ? `${delta.sign}%` : "—"}
                            </td>
                          </tr>
                        );
                      })()}

                      {/* Daño */}
                      {(() => {
                        const delta = calcDelta(grupoSeleccionado.previa?.dano, grupoSeleccionado.general?.dano);
                        return (
                          <tr style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{ padding: "4px 8px", fontWeight: "bold", borderRight: "1px solid #ccc" }}>Daño Total (%)</td>
                            <td style={{ padding: "4px 8px", textAlign: "center", borderRight: "1px solid #ccc" }}>
                              {grupoSeleccionado.previa?.dano != null ? `${grupoSeleccionado.previa.dano}%` : "—"}
                            </td>
                            <td style={{ padding: "4px 8px", textAlign: "center", borderRight: "1px solid #ccc" }}>
                              {grupoSeleccionado.general?.dano != null ? `${grupoSeleccionado.general.dano}%` : "—"}
                            </td>
                            <td style={{ padding: "4px 8px", textAlign: "center", fontWeight: "bold" }}>
                              {delta ? `${delta.sign}%` : "—"}
                            </td>
                          </tr>
                        );
                      })()}

                      {/* Primer Rendimiento */}
                      <tr style={{ borderBottom: "1px solid #ddd" }}>
                        <td style={{ padding: "4px 8px", borderRight: "1px solid #ccc" }}>Primer Rendimiento (g/lb)</td>
                        <td style={{ padding: "4px 8px", textAlign: "center", borderRight: "1px solid #ccc" }}>
                          {grupoSeleccionado.previa?.primer_rendimiento != null ? grupoSeleccionado.previa.primer_rendimiento : "—"}
                        </td>
                        <td style={{ padding: "4px 8px", textAlign: "center", borderRight: "1px solid #ccc" }}>
                          {grupoSeleccionado.general?.primer_rendimiento != null ? grupoSeleccionado.general.primer_rendimiento : "—"}
                        </td>
                        <td style={{ padding: "4px 8px", textAlign: "center" }}>
                          {calcDelta(grupoSeleccionado.previa?.primer_rendimiento, grupoSeleccionado.general?.primer_rendimiento)?.sign || "—"}
                        </td>
                      </tr>

                      {/* Segundo Rendimiento */}
                      <tr style={{ borderBottom: "1px solid #ddd" }}>
                        <td style={{ padding: "4px 8px", borderRight: "1px solid #ccc" }}>Segundo Rendimiento (g/lb)</td>
                        <td style={{ padding: "4px 8px", textAlign: "center", borderRight: "1px solid #ccc" }}>
                          {grupoSeleccionado.previa?.segundo_rendimiento != null ? grupoSeleccionado.previa.segundo_rendimiento : "—"}
                        </td>
                        <td style={{ padding: "4px 8px", textAlign: "center", borderRight: "1px solid #ccc" }}>
                          {grupoSeleccionado.general?.segundo_rendimiento != null ? grupoSeleccionado.general.segundo_rendimiento : "—"}
                        </td>
                        <td style={{ padding: "4px 8px", textAlign: "center" }}>
                          {calcDelta(grupoSeleccionado.previa?.segundo_rendimiento, grupoSeleccionado.general?.segundo_rendimiento)?.sign || "—"}
                        </td>
                      </tr>

                      {/* Catador y Fecha */}
                      <tr>
                        <td style={{ padding: "4px 8px", borderRight: "1px solid #ccc" }}>Catador Responsable</td>
                        <td style={{ padding: "4px 8px", textAlign: "center", borderRight: "1px solid #ccc" }}>
                          {grupoSeleccionado.previa?.catador?.nombre || "—"}
                          {grupoSeleccionado.previa?.fecha_analisis && (
                            <div style={{ fontSize: "9px", color: "#666" }}>
                              {new Date(grupoSeleccionado.previa.fecha_analisis).toLocaleString()}
                            </div>
                          )}
                        </td>
                        <td style={{ padding: "4px 8px", textAlign: "center", borderRight: "1px solid #ccc" }}>
                          {grupoSeleccionado.general?.catador?.nombre || "—"}
                          {grupoSeleccionado.general?.fecha_analisis && (
                            <div style={{ fontSize: "9px", color: "#666" }}>
                              {new Date(grupoSeleccionado.general.fecha_analisis).toLocaleString()}
                            </div>
                          )}
                        </td>
                        <td style={{ padding: "4px 8px", textAlign: "center", fontStyle: "italic", fontSize: "10px", color: "#555" }}>
                          —
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* DETALLE LADO A LADO: DEFECTOS, ZARANDAS Y TAZA */}
                <p style={{ fontWeight: "bold", fontSize: "12px", margin: "14px 0 6px", textTransform: "uppercase" }}>
                  2. Desglose Detallado de Boletas (Lado a Lado)
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                  {/* COLUMNA IZQUIERDA: BOLETA MUESTRA PREVIA */}
                  <div style={{ border: "1px solid black", padding: "10px", backgroundColor: "#fafafa" }}>
                    <div style={{ borderBottom: "1px solid black", paddingBottom: "4px", marginBottom: "8px", textAlign: "center" }}>
                      <p style={{ fontWeight: "bold", fontSize: "12px", margin: 0 }}>BOLETA DE MUESTRA PREVIA</p>
                      <p style={{ fontSize: "10px", color: "#666", margin: 0 }}>
                        {grupoSeleccionado.previa?.numero_analisis || "Sin Registro"}
                      </p>
                    </div>

                    {grupoSeleccionado.previa ? (
                      <>
                        {/* Defectos Previa */}
                        <p style={{ fontWeight: "bold", margin: "4px 0 2px", fontSize: "11px", borderBottom: "1px dashed #999" }}>
                          Defectos Físicos
                        </p>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10px", marginBottom: "8px" }}>
                          <tbody>
                            {grupoSeleccionado.previa.analisis_defectos?.length > 0 ? (
                              grupoSeleccionado.previa.analisis_defectos.map((d: any) => (
                                <tr key={d.id_analisis_defectos} style={{ borderBottom: "1px dotted #ccc" }}>
                                  <td style={{ padding: "1px 0" }}>{d.defecto?.nombre}</td>
                                  <td style={{ padding: "1px 0", textAlign: "right", fontWeight: "bold" }}>{d.cantidad}</td>
                                </tr>
                              ))
                            ) : (
                              <tr><td colSpan={2} style={{ textAlign: "center", color: "#888", fontStyle: "italic", padding: "2px 0" }}>Sin defectos reportados</td></tr>
                            )}
                          </tbody>
                        </table>

                        {/* Zarandas Previa */}
                        <p style={{ fontWeight: "bold", margin: "4px 0 2px", fontSize: "11px", borderBottom: "1px dashed #999" }}>
                          Zarandas / Mallas
                        </p>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10px", marginBottom: "8px" }}>
                          <tbody>
                            {grupoSeleccionado.previa.analisis_zarandas?.length > 0 ? (
                              grupoSeleccionado.previa.analisis_zarandas.map((z: any) => (
                                <tr key={z.id_analisis_zarandas} style={{ borderBottom: "1px dotted #ccc" }}>
                                  <td style={{ padding: "1px 0" }}>{z.zaranda?.nombre}</td>
                                  <td style={{ padding: "1px 0", textAlign: "right", fontWeight: "bold" }}>{z.cantidad}%</td>
                                </tr>
                              ))
                            ) : (
                              <tr><td colSpan={2} style={{ textAlign: "center", color: "#888", fontStyle: "italic", padding: "2px 0" }}>Sin zarandas</td></tr>
                            )}
                          </tbody>
                        </table>

                        {/* Taza Previa */}
                        <p style={{ fontWeight: "bold", margin: "4px 0 2px", fontSize: "11px", borderBottom: "1px dashed #999" }}>
                          Atributos de Taza
                        </p>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10px", marginBottom: "8px" }}>
                          <tbody>
                            {grupoSeleccionado.previa.analisis_tazas?.length > 0 ? (
                              grupoSeleccionado.previa.analisis_tazas.map((t: any) => (
                                <tr key={t.id_analisis_tazas} style={{ borderBottom: "1px dotted #ccc" }}>
                                  <td style={{ padding: "1px 0" }}>{t.taza?.nombre}</td>
                                  <td style={{ padding: "1px 0", textAlign: "right", fontWeight: "bold" }}>{t.cantidad} pts</td>
                                </tr>
                              ))
                            ) : (
                              <tr><td colSpan={2} style={{ textAlign: "center", color: "#888", fontStyle: "italic", padding: "2px 0" }}>Sin taza</td></tr>
                            )}
                          </tbody>
                        </table>

                        {/* Observaciones Previa */}
                        <div style={{ marginTop: "6px", fontSize: "10px" }}>
                          <strong>Observaciones:</strong>
                          <div style={{ fontStyle: "italic", color: "#333", marginTop: "2px" }}>
                            {grupoSeleccionado.previa.observaciones || "Ninguna."}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div style={{ textAlign: "center", padding: "20px 0", color: "#999", fontStyle: "italic" }}>
                        Muestra Previa no registrada
                      </div>
                    )}
                  </div>

                  {/* COLUMNA DERECHA: BOLETA MUESTRA GENERAL */}
                  <div style={{ border: "1px solid black", padding: "10px", backgroundColor: "#fafafa" }}>
                    <div style={{ borderBottom: "1px solid black", paddingBottom: "4px", marginBottom: "8px", textAlign: "center" }}>
                      <p style={{ fontWeight: "bold", fontSize: "12px", margin: 0 }}>BOLETA DE MUESTRA GENERAL</p>
                      <p style={{ fontSize: "10px", color: "#666", margin: 0 }}>
                        {grupoSeleccionado.general?.numero_analisis || "Sin Registro"}
                      </p>
                    </div>

                    {grupoSeleccionado.general ? (
                      <>
                        {/* Defectos General */}
                        <p style={{ fontWeight: "bold", margin: "4px 0 2px", fontSize: "11px", borderBottom: "1px dashed #999" }}>
                          Defectos Físicos
                        </p>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10px", marginBottom: "8px" }}>
                          <tbody>
                            {grupoSeleccionado.general.analisis_defectos?.length > 0 ? (
                              grupoSeleccionado.general.analisis_defectos.map((d: any) => (
                                <tr key={d.id_analisis_defectos} style={{ borderBottom: "1px dotted #ccc" }}>
                                  <td style={{ padding: "1px 0" }}>{d.defecto?.nombre}</td>
                                  <td style={{ padding: "1px 0", textAlign: "right", fontWeight: "bold" }}>{d.cantidad}</td>
                                </tr>
                              ))
                            ) : (
                              <tr><td colSpan={2} style={{ textAlign: "center", color: "#888", fontStyle: "italic", padding: "2px 0" }}>Sin defectos reportados</td></tr>
                            )}
                          </tbody>
                        </table>

                        {/* Zarandas General */}
                        <p style={{ fontWeight: "bold", margin: "4px 0 2px", fontSize: "11px", borderBottom: "1px dashed #999" }}>
                          Zarandas / Mallas
                        </p>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10px", marginBottom: "8px" }}>
                          <tbody>
                            {grupoSeleccionado.general.analisis_zarandas?.length > 0 ? (
                              grupoSeleccionado.general.analisis_zarandas.map((z: any) => (
                                <tr key={z.id_analisis_zarandas} style={{ borderBottom: "1px dotted #ccc" }}>
                                  <td style={{ padding: "1px 0" }}>{z.zaranda?.nombre}</td>
                                  <td style={{ padding: "1px 0", textAlign: "right", fontWeight: "bold" }}>{z.cantidad}%</td>
                                </tr>
                              ))
                            ) : (
                              <tr><td colSpan={2} style={{ textAlign: "center", color: "#888", fontStyle: "italic", padding: "2px 0" }}>Sin zarandas</td></tr>
                            )}
                          </tbody>
                        </table>

                        {/* Taza General */}
                        <p style={{ fontWeight: "bold", margin: "4px 0 2px", fontSize: "11px", borderBottom: "1px dashed #999" }}>
                          Atributos de Taza
                        </p>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10px", marginBottom: "8px" }}>
                          <tbody>
                            {grupoSeleccionado.general.analisis_tazas?.length > 0 ? (
                              grupoSeleccionado.general.analisis_tazas.map((t: any) => (
                                <tr key={t.id_analisis_tazas} style={{ borderBottom: "1px dotted #ccc" }}>
                                  <td style={{ padding: "1px 0" }}>{t.taza?.nombre}</td>
                                  <td style={{ padding: "1px 0", textAlign: "right", fontWeight: "bold" }}>{t.cantidad} pts</td>
                                </tr>
                              ))
                            ) : (
                              <tr><td colSpan={2} style={{ textAlign: "center", color: "#888", fontStyle: "italic", padding: "2px 0" }}>Sin taza</td></tr>
                            )}
                          </tbody>
                        </table>

                        {/* Observaciones General */}
                        <div style={{ marginTop: "6px", fontSize: "10px" }}>
                          <strong>Observaciones:</strong>
                          <div style={{ fontStyle: "italic", color: "#333", marginTop: "2px" }}>
                            {grupoSeleccionado.general.observaciones || "Ninguna."}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div style={{ textAlign: "center", padding: "20px 0", color: "#999", fontStyle: "italic" }}>
                        Muestra General pendiente de toma/análisis
                      </div>
                    )}
                  </div>
                </div>

                {/* Firmas al pie */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "24px",
                    marginTop: "24px",
                    paddingTop: "12px",
                    borderTop: "1px solid black",
                    textAlign: "center",
                    fontSize: "10px",
                  }}
                >
                  <div>
                    <div style={{ borderBottom: "1px solid black", height: "30px", marginBottom: "4px" }} />
                    <strong>Catador Muestra Previa</strong>
                    <div style={{ color: "#555" }}>{grupoSeleccionado.previa?.catador?.nombre || "—"}</div>
                  </div>
                  <div>
                    <div style={{ borderBottom: "1px solid black", height: "30px", marginBottom: "4px" }} />
                    <strong>Catador Muestra General</strong>
                    <div style={{ color: "#555" }}>{grupoSeleccionado.general?.catador?.nombre || "—"}</div>
                  </div>
                  <div>
                    <div style={{ borderBottom: "1px solid black", height: "30px", marginBottom: "4px" }} />
                    <strong>Gerencia / Control Calidad</strong>
                    <div style={{ color: "#555" }}>Aprobación y Certificación</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-5 text-muted small">
            Ingrese un No. Ingreso o Remisión Física y presione Enter o "Buscar" para generar el reporte comparativo.
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
