import { useState, useEffect, useMemo } from "react";
import {
  CalendarRange,
  Search,
  FileSpreadsheet,
  GitCompare,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Printer,
  Maximize2,
  Minimize2,
} from "lucide-react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  Table,
  Badge,
  Pagination,
  ButtonGroup,
} from "react-bootstrap";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { getComparativoFechasApi } from "../../../../api/analisis.api";
import type { GrupoComparativo } from "./ModalComparativoAnalisis";

const PAGE_SIZE = 15;

interface Props {
  show: boolean;
  onClose: () => void;
  onVerReporteIndividual: (grupo: GrupoComparativo) => void;
}

export default function ModalComparativoFechas({
  show,
  onClose,
  onVerReporteIndividual,
}: Readonly<Props>) {
  // Rango de fechas por defecto: últimos 7 días hasta hoy
  const hoyStr = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const hace7diasStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().slice(0, 10);
  }, []);

  const [fechaInicio, setFechaInicio] = useState(hace7diasStr);
  const [fechaFin, setFechaFin] = useState(hoyStr);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<"TODOS" | "COMPLETOS" | "SOLO_PREVIA" | "SOLO_GENERAL">("TODOS");
  const [grupos, setGrupos] = useState<GrupoComparativo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMaximized, setIsMaximized] = useState(false);

  // Agrupar los análisis en parejas Previa / General por cada carga
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
          tipo_cafe: det?.tipo_cafe?.tipo_cafe ?? "—",
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

    // Reconciliar análisis sin clasificar
    mapa.forEach((g) => {
      if (!g.previa && g.otros.length > 0) g.previa = g.otros.shift();
      if (!g.general && g.otros.length > 0) g.general = g.otros.shift();
    });

    return Array.from(mapa.values());
  };

  const cargarDatos = async () => {
    if (!fechaInicio || !fechaFin) {
      toast.error("Seleccione ambas fechas para consultar.");
      return;
    }
    try {
      setLoading(true);
      setCurrentPage(1);
      const data = await getComparativoFechasApi(fechaInicio, fechaFin);
      const agrp = agruparAnalisis(data);
      setGrupos(agrp);
      if (agrp.length === 0) {
        toast("No se encontraron análisis en el rango de fechas seleccionado.", { icon: "ℹ️" });
      }
    } catch (err: any) {
      console.error("[ModalComparativoFechas] Error:", err);
      toast.error(err.response?.data?.message || "Error al cargar comparativo por fechas.");
      setGrupos([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos cuando se abre el modal
  useEffect(() => {
    if (show) {
      cargarDatos();
    }
  }, [show]);

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

  // Filtrado de la lista en memoria
  const gruposFiltrados = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return grupos.filter((g) => {
      // Filtro de estado
      if (filtroEstado === "COMPLETOS" && (!g.previa || !g.general)) return false;
      if (filtroEstado === "SOLO_PREVIA" && (!g.previa || g.general)) return false;
      if (filtroEstado === "SOLO_GENERAL" && (!g.general || g.previa)) return false;

      // Filtro de texto
      if (!term) return true;
      return (
        g.numero_entrada.toLowerCase().includes(term) ||
        g.remision.toLowerCase().includes(term) ||
        g.proveedor_nombre.toLowerCase().includes(term) ||
        (g.tipo_cafe && g.tipo_cafe.toLowerCase().includes(term)) ||
        (g.placa_cabezal && g.placa_cabezal.toLowerCase().includes(term)) ||
        (g.previa?.numero_analisis && g.previa.numero_analisis.toLowerCase().includes(term)) ||
        (g.general?.numero_analisis && g.general.numero_analisis.toLowerCase().includes(term)) ||
        (g.previa?.calidad?.nombre && g.previa.calidad.nombre.toLowerCase().includes(term)) ||
        (g.general?.calidad?.nombre && g.general.calidad.nombre.toLowerCase().includes(term)) ||
        (g.previa?.catador?.nombre && g.previa.catador.nombre.toLowerCase().includes(term)) ||
        (g.general?.catador?.nombre && g.general.catador.nombre.toLowerCase().includes(term))
      );
    });
  }, [grupos, searchTerm, filtroEstado]);

  // Contadores para métricas rápidas
  const cntTotal = grupos.length;
  const cntCompletos = grupos.filter((g) => g.previa && g.general).length;
  const cntSoloPrevia = grupos.filter((g) => g.previa && !g.general).length;
  const cntSoloGeneral = grupos.filter((g) => !g.previa && g.general).length;
  const totalQq = useMemo(() => gruposFiltrados.reduce((s, g) => s + g.cantidad_qq, 0), [gruposFiltrados]);

  // Paginación
  const totalPages = Math.max(1, Math.ceil(gruposFiltrados.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return gruposFiltrados.slice(start, start + PAGE_SIZE);
  }, [gruposFiltrados, safePage]);

  // Exportar matriz a Excel
  const exportarExcel = () => {
    if (gruposFiltrados.length === 0) {
      toast.error("No hay registros para exportar.");
      return;
    }

    const filas = gruposFiltrados.map((g) => {
      const deltaHumedad = calcDelta(g.previa?.humedad, g.general?.humedad);
      const deltaDano = calcDelta(g.previa?.dano, g.general?.dano);
      const deltaRend1 = calcDelta(g.previa?.primer_rendimiento, g.general?.primer_rendimiento);
      const deltaRend2 = calcDelta(g.previa?.segundo_rendimiento, g.general?.segundo_rendimiento);

      let cambioCalidad = "—";
      if (g.previa?.calidad?.nombre && g.general?.calidad?.nombre) {
        cambioCalidad =
          g.previa.calidad.nombre === g.general.calidad.nombre
            ? "Sin cambio"
            : `De ${g.previa.calidad.nombre} a ${g.general.calidad.nombre}`;
      }

      return {
        "No. Ingreso": g.numero_entrada,
        "Remisión Física": g.remision,
        "Tipo de Café": g.tipo_cafe || "—",
        "Proveedor / Finca": g.proveedor_nombre,
        "Volumen (QQ)": Number(g.cantidad_qq.toFixed(2)),
        "Placa Cabezal": g.placa_cabezal || "—",
        // Previa
        "Previa - No. Análisis": g.previa?.numero_analisis || "N/A",
        "Previa - Fecha": g.previa?.fecha_analisis ? new Date(g.previa.fecha_analisis).toLocaleString() : "—",
        "Previa - Calidad": g.previa?.calidad?.nombre || "—",
        "Previa - Humedad (%)": g.previa?.humedad ?? "—",
        "Previa - Daño (%)": g.previa?.dano ?? "—",
        "Previa - Primer Rendimiento": g.previa?.primer_rendimiento ?? "—",
        "Previa - Segundo Rendimiento": g.previa?.segundo_rendimiento ?? "—",
        "Previa - Catador": g.previa?.catador?.nombre || "—",
        // General
        "General - No. Análisis": g.general?.numero_analisis || "N/A",
        "General - Fecha": g.general?.fecha_analisis ? new Date(g.general.fecha_analisis).toLocaleString() : "—",
        "General - Calidad": g.general?.calidad?.nombre || "—",
        "General - Humedad (%)": g.general?.humedad ?? "—",
        "General - Daño (%)": g.general?.dano ?? "—",
        "General - Primer Rendimiento": g.general?.primer_rendimiento ?? "—",
        "General - Segundo Rendimiento": g.general?.segundo_rendimiento ?? "—",
        "General - Catador": g.general?.catador?.nombre || "—",
        // Variaciones
        "Δ Humedad (%)": deltaHumedad ? `${deltaHumedad.sign}%` : "—",
        "Δ Daño (%)": deltaDano ? `${deltaDano.sign}%` : "—",
        "Δ Rendimiento 1": deltaRend1 ? deltaRend1.sign : "—",
        "Δ Rendimiento 2": deltaRend2 ? deltaRend2.sign : "—",
        "Cambio de Calidad": cambioCalidad,
      };
    });

    const ws = XLSX.utils.json_to_sheet(filas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Comparativo Calidad");
    XLSX.writeFile(wb, `Comparativo_Calidad_${fechaInicio}_al_${fechaFin}.xlsx`);
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      fullscreen={isMaximized ? true : undefined}
      dialogClassName={isMaximized ? "" : "modal-96w"}
      size={isMaximized ? undefined : "xl"}
      scrollable
    >
      <style>{`
        .modal-96w {
          max-width: 96vw !important;
          width: 96vw !important;
        }
      `}</style>
      <Modal.Header className="bg-light border-bottom d-flex align-items-center justify-content-between py-2 px-3">
        <div className="d-flex align-items-center gap-2">
          <CalendarRange className="text-primary" size={20} />
          <div>
            <Modal.Title className="fs-6 fw-bold mb-0">
              Reporte Comparativo de Calidad por Rango de Fechas
            </Modal.Title>
            <small className="text-muted">
              Evaluación consolidada de Muestra Previa vs Muestra General
            </small>
          </div>
        </div>
        <div className="d-flex align-items-center gap-1">
          <Button
            variant="light"
            size="sm"
            className="p-1 text-muted border-0 d-flex align-items-center justify-content-center"
            style={{ width: "30px", height: "30px" }}
            onClick={() => setIsMaximized(!isMaximized)}
            title={isMaximized ? "Restaurar tamaño normal" : "Maximizar pantalla completa"}
          >
            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </Button>
          <button
            type="button"
            className="btn-close ms-1"
            aria-label="Cerrar"
            onClick={onClose}
          />
        </div>
      </Modal.Header>

      <Modal.Body className="p-3">
        {/* BARRA SUPERIOR: SELECTOR DE FECHAS Y ACCIONES */}
        <div className="bg-white p-3 rounded border mb-3 shadow-sm">
          <Row className="g-2 align-items-end">
            <Col xs={12} sm={6} md={3}>
              <Form.Label className="small fw-semibold text-muted mb-1">Fecha Desde:</Form.Label>
              <Form.Control
                type="date"
                size="sm"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Form.Label className="small fw-semibold text-muted mb-1">Fecha Hasta:</Form.Label>
              <Form.Control
                type="date"
                size="sm"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </Col>
            <Col xs={6} md={2}>
              <Button
                variant="primary"
                size="sm"
                className="w-100 d-flex align-items-center justify-content-center gap-1"
                onClick={cargarDatos}
                disabled={loading}
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                Consultar
              </Button>
            </Col>
            <Col xs={6} md={4} className="text-md-end">
              <Button
                variant="success"
                size="sm"
                className="d-inline-flex align-items-center gap-1 shadow-sm text-white fw-medium"
                onClick={exportarExcel}
                disabled={loading || gruposFiltrados.length === 0}
              >
                <FileSpreadsheet size={15} /> Exportar Excel ({gruposFiltrados.length})
              </Button>
            </Col>
          </Row>

          {/* FILTROS RÁPIDOS Y BUSCADOR */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3 pt-3 border-top">
            <ButtonGroup size="sm">
              <Button
                variant={filtroEstado === "TODOS" ? "primary" : "outline-secondary"}
                onClick={() => setFiltroEstado("TODOS")}
              >
                Todos ({cntTotal})
              </Button>
              <Button
                variant={filtroEstado === "COMPLETOS" ? "success" : "outline-secondary"}
                onClick={() => setFiltroEstado("COMPLETOS")}
              >
                Completos ({cntCompletos})
              </Button>
              <Button
                variant={filtroEstado === "SOLO_PREVIA" ? "info" : "outline-secondary"}
                onClick={() => setFiltroEstado("SOLO_PREVIA")}
              >
                Solo Previa ({cntSoloPrevia})
              </Button>
              <Button
                variant={filtroEstado === "SOLO_GENERAL" ? "warning" : "outline-secondary"}
                onClick={() => setFiltroEstado("SOLO_GENERAL")}
              >
                Solo General ({cntSoloGeneral})
              </Button>
            </ButtonGroup>

            <div style={{ minWidth: "260px" }}>
              <InputGroup size="sm">
                <InputGroup.Text><Search size={14} className="text-muted" /></InputGroup.Text>
                <Form.Control
                  placeholder="Filtrar por ingreso, remisión, proveedor, café..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button variant="outline-secondary" onClick={() => setSearchTerm("")}>
                    ✕
                  </Button>
                )}
              </InputGroup>
            </div>
          </div>
        </div>

        {/* TABLA PRINCIPAL DE DATOS COMPARATIVOS */}
        <div className="table-responsive bg-white rounded border shadow-sm">
          <Table hover bordered size="sm" className="mb-0 text-nowrap" style={{ fontSize: "11px" }}>
            <thead className="bg-light align-middle text-center">
              <tr>
                <th colSpan={5} className="bg-light border-end">Datos de la Carga</th>
                <th colSpan={6} className="bg-info-subtle text-info-emphasis border-end">Muestra Previa</th>
                <th colSpan={6} className="bg-success-subtle text-success-emphasis border-end">Muestra General</th>
                <th colSpan={5} className="bg-warning-subtle text-warning-emphasis border-end">Variación (Δ)</th>
                <th rowSpan={2} className="bg-light align-middle" style={{ width: "80px" }}>Acción</th>
              </tr>
              <tr style={{ fontSize: "10.5px" }}>
                {/* Carga */}
                <th>No. Ingreso</th>
                <th>Remisión</th>
                <th>Tipo Café</th>
                <th>Proveedor / Finca</th>
                <th className="border-end text-end">Volumen</th>
                {/* Previa */}
                <th>Análisis</th>
                <th>Calidad</th>
                <th>Hum %</th>
                <th>Daño %</th>
                <th>Rend 1</th>
                <th className="border-end">Rend 2</th>
                {/* General */}
                <th>Análisis</th>
                <th>Calidad</th>
                <th>Hum %</th>
                <th>Daño %</th>
                <th>Rend 1</th>
                <th className="border-end">Rend 2</th>
                {/* Variaciones */}
                <th>Δ Hum %</th>
                <th>Δ Daño %</th>
                <th>Δ Rend 1</th>
                <th>Δ Rend 2</th>
                <th className="border-end">Calidad</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={23} className="text-center py-5">
                    <Loader2 className="w-6 h-6 animate-spin inline-block text-neutral-400 me-2" />
                    Cargando comparativo por fechas...
                  </td>
                </tr>
              ) : gruposFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={23} className="text-center py-5 text-muted">
                    No se encontraron registros para los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                paginated.map((g) => {
                  const deltaHumedad = calcDelta(g.previa?.humedad, g.general?.humedad);
                  const deltaDano = calcDelta(g.previa?.dano, g.general?.dano);
                  const deltaRend1 = calcDelta(g.previa?.primer_rendimiento, g.general?.primer_rendimiento);
                  const deltaRend2 = calcDelta(g.previa?.segundo_rendimiento, g.general?.segundo_rendimiento);

                  const calidadCambio =
                    g.previa?.calidad?.nombre && g.general?.calidad?.nombre
                      ? g.previa.calidad.nombre === g.general.calidad.nombre
                        ? "IGUAL"
                        : "CAMBIO"
                      : "—";

                  return (
                    <tr key={g.id_detalle}>
                      {/* Carga */}
                      <td className="fw-bold text-coffee-700">{g.numero_entrada}</td>
                      <td>{g.remision}</td>
                      <td>
                        <Badge bg="secondary-transparent" className="text-secondary fw-semibold">
                          {g.tipo_cafe || "—"}
                        </Badge>
                      </td>
                      <td className="text-truncate" style={{ maxWidth: "160px" }} title={g.proveedor_nombre}>
                        {g.proveedor_nombre}
                      </td>
                      <td className="text-end fw-semibold border-end">{g.cantidad_qq.toFixed(2)} QQ</td>

                      {/* Muestra Previa */}
                      <td className="text-center font-monospace">
                        {g.previa ? (
                          <span className="badge bg-info-transparent text-info border">
                            {g.previa.numero_analisis}
                          </span>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td className="text-center">{g.previa?.calidad?.nombre || "—"}</td>
                      <td className="text-center">{g.previa?.humedad != null ? `${g.previa.humedad}%` : "—"}</td>
                      <td className="text-center">{g.previa?.dano != null ? `${g.previa.dano}%` : "—"}</td>
                      <td className="text-center">{g.previa?.primer_rendimiento ?? "—"}</td>
                      <td className="text-center border-end">{g.previa?.segundo_rendimiento ?? "—"}</td>

                      {/* Muestra General */}
                      <td className="text-center font-monospace">
                        {g.general ? (
                          <span className="badge bg-success-transparent text-success border">
                            {g.general.numero_analisis}
                          </span>
                        ) : (
                          <span className="badge bg-warning-transparent text-warning">Pendiente</span>
                        )}
                      </td>
                      <td className="text-center">{g.general?.calidad?.nombre || "—"}</td>
                      <td className="text-center">{g.general?.humedad != null ? `${g.general.humedad}%` : "—"}</td>
                      <td className="text-center">{g.general?.dano != null ? `${g.general.dano}%` : "—"}</td>
                      <td className="text-center">{g.general?.primer_rendimiento ?? "—"}</td>
                      <td className="text-center border-end">{g.general?.segundo_rendimiento ?? "—"}</td>

                      {/* Variaciones (Δ) */}
                      <td className="text-center fw-bold">
                        {deltaHumedad ? (
                          <span className={deltaHumedad.diff > 0 ? "text-danger" : deltaHumedad.diff < 0 ? "text-success" : "text-muted"}>
                            {deltaHumedad.sign}%
                          </span>
                        ) : "—"}
                      </td>
                      <td className="text-center fw-bold">
                        {deltaDano ? (
                          <span className={deltaDano.diff > 0 ? "text-danger" : deltaDano.diff < 0 ? "text-success" : "text-muted"}>
                            {deltaDano.sign}%
                          </span>
                        ) : "—"}
                      </td>
                      <td className="text-center">
                        {deltaRend1 ? (
                          <span className={deltaRend1.diff > 0 ? "text-success fw-bold" : deltaRend1.diff < 0 ? "text-danger fw-bold" : "text-muted"}>
                            {deltaRend1.sign}
                          </span>
                        ) : "—"}
                      </td>
                      <td className="text-center">
                        {deltaRend2 ? (
                          <span className={deltaRend2.diff > 0 ? "text-success fw-bold" : deltaRend2.diff < 0 ? "text-danger fw-bold" : "text-muted"}>
                            {deltaRend2.sign}
                          </span>
                        ) : "—"}
                      </td>
                      <td className="text-center border-end">
                        {calidadCambio === "IGUAL" ? (
                          <Badge bg="success-transparent" className="text-success">Sin cambio</Badge>
                        ) : calidadCambio === "CAMBIO" ? (
                          <Badge bg="warning-transparent" className="text-warning">Modificada</Badge>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>

                      {/* Acción */}
                      <td className="text-center">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          className="p-1 px-2 d-inline-flex align-items-center gap-1"
                          style={{ fontSize: "11px" }}
                          onClick={() => onVerReporteIndividual(g)}
                          title="Ver / Imprimir reporte individual de esta carga"
                        >
                          <GitCompare size={12} /> Reporte
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>

            {!loading && gruposFiltrados.length > 0 && (
              <tfoot className="table-light border-top border-2 fw-bold">
                <tr>
                  <td colSpan={4} className="text-end text-muted">
                    Total ({gruposFiltrados.length} {gruposFiltrados.length === 1 ? "carga" : "cargas"}):
                  </td>
                  <td className="text-end border-end">{totalQq.toFixed(2)} QQ</td>
                  <td colSpan={18} />
                </tr>
              </tfoot>
            )}
          </Table>
        </div>

        {/* PAGINACIÓN */}
        {!loading && totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center mt-3 pt-2">
            <span className="text-muted small">
              Página {safePage} de {totalPages} — Mostrando {paginated.length} de {gruposFiltrados.length} registros
            </span>
            <Pagination size="sm" className="mb-0">
              <Pagination.First onClick={() => setCurrentPage(1)} disabled={safePage === 1} />
              <Pagination.Prev onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={safePage === 1} />
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 2)
                .reduce<(number | string)[]>((acc, p, idx, arr) => {
                  if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) =>
                  p === "..." ? (
                    <Pagination.Ellipsis key={`el-${idx}`} disabled />
                  ) : (
                    <Pagination.Item
                      key={p}
                      active={p === safePage}
                      onClick={() => setCurrentPage(p as number)}
                    >
                      {p}
                    </Pagination.Item>
                  )
                )}
              <Pagination.Next onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages} />
              <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={safePage === totalPages} />
            </Pagination>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="bg-light py-2 d-flex justify-content-between align-items-center">
        <Button
          variant="success"
          size="sm"
          className="d-inline-flex align-items-center gap-1 shadow-sm text-white fw-medium"
          onClick={exportarExcel}
          disabled={loading || gruposFiltrados.length === 0}
        >
          <FileSpreadsheet size={15} /> Exportar Excel ({gruposFiltrados.length})
        </Button>
        <Button variant="secondary" size="sm" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
