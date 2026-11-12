import { useState, useEffect, useRef, forwardRef } from "react";
import { createPortal } from "react-dom";
import { FileText, Search, Printer, Download, CheckCircle, Clock } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup, Tabs, Tab, Spinner, Pagination } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";
import { getPendientesLiquidarApi, getNotasPesoApi, crearNotaPesoApi, getNotaPesoByIdApi, NotaDePeso } from "../../api/nota-peso.api";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logoGlobal from "../../assets/images/brand-logos/LogoGlobalColor.png";

const colors = moduleColors.recepcion;

interface NotaPesoDocumentoProps {
  nota: NotaDePeso;
  id?: string;
}

const NotaPesoDocumento = forwardRef<HTMLDivElement, NotaPesoDocumentoProps>(
  ({ nota, id }, ref) => {
    const detalle = nota.detalles?.[0];
    const recepcion = nota.detalle_recepcion?.recepcion;
    const proveedor = nota.detalle_recepcion?.proveedor;
    const tipoCafe = nota.detalle_recepcion?.tipo_cafe?.tipo_cafe;
    const analisis = nota.detalle_recepcion?.analisis_calidad?.[0];

    return (
      <div
        ref={ref}
        id={id}
        style={{
          padding: "28px 32px",
          backgroundColor: "#ffffff",
          color: "#111827",
          fontFamily: "Arial, Helvetica, sans-serif",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {/* ENCABEZADO */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <img
              src={logoGlobal}
              alt="Global Coffee Group"
              style={{
                width: "92px",
                height: "auto",
                maxHeight: "85px",
                objectFit: "contain",
                display: "block",
                flexShrink: 0,
              }}
            />
            <div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  margin: "0 0 3px 0",
                  color: "#3b1e08",
                  letterSpacing: "0.03em",
                }}
              >
                VILLANUEVA, CORTES
              </p>
              <p style={{ fontSize: "11px", color: "#374151", margin: "0 0 1px 0", lineHeight: 1.35 }}>
                Sector Dos Caminos, Carretera Villanueva CA-5
              </p>
              <p style={{ fontSize: "11px", color: "#374151", margin: "0 0 1px 0", lineHeight: 1.35 }}>
                KM. 16, 200 mts al este, PBX: 2670-0500
              </p>
              <p style={{ fontSize: "11.5px", color: "#111827", margin: 0, fontWeight: 700, lineHeight: 1.35 }}>
                RTN: 05019019113492
              </p>
            </div>
          </div>

          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#1f2937",
                borderBottom: "2px solid #1f2937",
                paddingBottom: "4px",
                margin: "0 0 8px 0",
              }}
            >
              NOTA DE PESO
            </h3>
            <div style={{ fontSize: "13px", whiteSpace: "nowrap" }}>
              <span style={{ fontWeight: 700 }}>NP #:</span>{" "}
              <span
                style={{
                  color: "#dc2626",
                  fontFamily: "monospace",
                  fontSize: "17px",
                  fontWeight: 700,
                }}
              >
                {nota.numero_nota_peso}
              </span>
            </div>
          </div>
        </div>

        {/* INFO GENERAL */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "12px",
            borderTop: "1px solid #d1d5db",
            borderBottom: "1px solid #d1d5db",
            padding: "10px 0",
            marginBottom: "18px",
            fontSize: "13px",
          }}
        >
          <div>
            <span style={{ color: "#6b7280", textTransform: "uppercase", fontSize: "10px", fontWeight: 700, display: "block" }}>
              Cosecha
            </span>
            <span style={{ fontWeight: 500 }}>{recepcion?.cosecha?.cosecha || "—"}</span>
          </div>
          <div>
            <span style={{ color: "#6b7280", textTransform: "uppercase", fontSize: "10px", fontWeight: 700, display: "block" }}>
              Fecha
            </span>
            <span style={{ fontWeight: 500 }}>
              {new Date(nota.fecha_nota_peso).toLocaleDateString("es-HN")}
            </span>
          </div>
          <div>
            <span style={{ color: "#6b7280", textTransform: "uppercase", fontSize: "10px", fontWeight: 700, display: "block" }}>
              Tipo de Café
            </span>
            <span style={{ fontWeight: 500 }}>{tipoCafe || "—"}</span>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ color: "#6b7280", textTransform: "uppercase", fontSize: "10px", fontWeight: 700, display: "block" }}>
              Ingreso #
            </span>
            <span style={{ fontWeight: 500, whiteSpace: "nowrap" }}>
              {recepcion?.numero_entrada || "—"}
            </span>
          </div>
        </div>

        {/* PROVEEDOR / REMISION */}
        <div style={{ marginBottom: "18px", fontSize: "13px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: "4px",
              marginBottom: "6px",
            }}
          >
            <span style={{ fontWeight: 700 }}>
              PROVEEDOR: <span style={{ fontWeight: 400 }}>{proveedor?.nombre || "—"}</span>
            </span>
            <span style={{ fontWeight: 700, whiteSpace: "nowrap" }}>
              RTN/ID: <span style={{ fontWeight: 400 }}>{proveedor?.rtn || "N/A"}</span>
            </span>
          </div>
          <div style={{ fontWeight: 700 }}>
            REMISION #: <span style={{ fontWeight: 400 }}>{nota.detalle_recepcion?.remision || "—"}</span>
          </div>
        </div>

        {/* TABLA DE PRODUCTO */}
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              backgroundColor: "#262626",
              color: "#ffffff",
              padding: "5px 12px",
              fontSize: "12px",
              fontWeight: 700,
              marginBottom: "4px",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust: "exact",
            }}
          >
            PRODUCTO: {tipoCafe?.toUpperCase() || "PERGAMINO SECO LAVADO"}
          </div>
          <Table
            bordered
            size="sm"
            className="text-center mb-0 table-nota"
            style={{ fontSize: "11.5px", width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f3f4f6" }}>
                <th style={{ padding: "7px 4px", whiteSpace: "nowrap" }}>Dev/Sacos</th>
                <th style={{ padding: "7px 4px", whiteSpace: "nowrap" }}>Peso Bruto</th>
                <th style={{ padding: "7px 4px", whiteSpace: "nowrap" }}>Tara</th>
                <th style={{ padding: "7px 4px", whiteSpace: "nowrap" }}>Humedad</th>
                <th style={{ padding: "7px 4px", whiteSpace: "nowrap" }}>% Daño</th>
                <th style={{ padding: "7px 4px", whiteSpace: "nowrap" }}>% Otros</th>
                <th style={{ padding: "7px 4px", whiteSpace: "nowrap" }}>Peso Neto</th>
                <th style={{ padding: "7px 4px", whiteSpace: "nowrap" }}>Costo</th>
                <th style={{ padding: "7px 4px", whiteSpace: "nowrap" }}>Importe</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px 4px", fontWeight: 700 }}>{detalle?.cantidad_sacos ?? 0}</td>
                <td style={{ padding: "10px 4px" }}>{Number(detalle?.peso_bruto || 0).toFixed(2)}</td>
                <td style={{ padding: "10px 4px" }}>{Number(detalle?.tara || 0).toFixed(2)}</td>
                <td style={{ padding: "10px 4px" }}>{Number(detalle?.porcentaje_descuento_humedad || 0).toFixed(2)}%</td>
                <td style={{ padding: "10px 4px" }}>{Number(detalle?.porcentaje_descuento_dano || 0).toFixed(2)}%</td>
                <td style={{ padding: "10px 4px" }}>{Number(detalle?.porcentaje_descuento_peso || 0).toFixed(2)}%</td>
                <td style={{ padding: "10px 4px", fontWeight: 700, backgroundColor: "#f9fafb" }}>
                  {Number(detalle?.peso_neto || 0).toFixed(2)}
                </td>
                <td style={{ padding: "10px 4px" }}>*0.00*</td>
                <td style={{ padding: "10px 4px" }}>*0.00*</td>
              </tr>
              <tr style={{ backgroundColor: "#f9fafb", fontWeight: 700 }}>
                <td colSpan={6} style={{ textAlign: "right", padding: "8px 12px", textTransform: "uppercase" }}>
                  Total Netos =&gt;
                </td>
                <td style={{ color: "#5c2d16", fontSize: "13px", whiteSpace: "nowrap", padding: "8px 6px" }}>
                  [[ {Number(detalle?.peso_neto || 0).toFixed(2)} ]]
                </td>
                <td colSpan={2}></td>
              </tr>
            </tbody>
          </Table>
        </div>

        {/* OBSERVACIONES Y FIRMAS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr",
            gap: "32px",
            marginTop: "36px",
            alignItems: "end",
          }}
        >
          <div style={{ fontSize: "10.5px", color: "#4b5563", fontStyle: "italic", lineHeight: 1.5 }}>
            Obs: NP#: {nota.numero_nota_peso} {nota.observaciones ? `- ${nota.observaciones} ` : ""}- MUESTRA #{" "}
            {analisis?.numero_analisis || "S/N"} REMISION # {nota.detalle_recepcion?.remision || "S/N"}
            <br />
            FURGON {recepcion?.placa_furgon?.placa || "S/N"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
            <div style={{ textAlign: "center", paddingTop: "28px", borderTop: "1px solid #9ca3af" }}>
              <span style={{ fontSize: "10px", textTransform: "uppercase", display: "block" }}>
                Recibido de Conformidad
              </span>
            </div>
            <div style={{ textAlign: "center", paddingTop: "28px", borderTop: "1px solid #9ca3af" }}>
              <span style={{ fontSize: "10px", textTransform: "uppercase", display: "block" }}>
                Entrega de Conformidad
              </span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "36px", paddingTop: "12px", textAlign: "center", userSelect: "none" }}>
          <div
            style={{
              fontSize: "54px",
              fontWeight: 900,
              color: "#000000",
              opacity: 0.08,
              transform: "rotate(-15deg)",
              letterSpacing: "0.08em",
              display: "inline-block",
            }}
          >
            ORIGINAL
          </div>
        </div>
      </div>
    );
  }
);
NotaPesoDocumento.displayName = "NotaPesoDocumento";

export default function NotaPesoPage() {
  const [activeTab, setActiveTab] = useState("pendientes");
  const [pendientes, setPendientes] = useState<any[]>([]);
  const [notasEmitidas, setNotasEmitidas] = useState<NotaDePeso[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagePendientes, setPagePendientes] = useState(1);
  const [pageNotas, setPageNotas] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    setPagePendientes(1);
    setPageNotas(1);
  }, [searchTerm]);
  const [selectedNota, setSelectedNota] = useState<NotaDePeso | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [directPrintNota, setDirectPrintNota] = useState<NotaDePeso | null>(null);
  const [printingId, setPrintingId] = useState<number | null>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const pdfTargetRef = useRef<HTMLDivElement>(null);
  const [processing, setProcessing] = useState(false);
  const [liquidarModal, setLiquidarModal] = useState<{
    show: boolean;
    detalle: any | null;
  }>({ show: false, detalle: null });

  // Campos editables del modal de liquidación
  const [formHumedad, setFormHumedad] = useState<number>(0);
  const [formDano, setFormDano] = useState<number>(0);
  const [formOtros, setFormOtros] = useState<number>(0);
  const [formObservaciones, setFormObservaciones] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "pendientes") {
        const data = await getPendientesLiquidarApi();
        setPendientes(data);
      } else {
        const data = await getNotasPesoApi();
        setNotasEmitidas(data);
      }
    } catch (error) {
      toast.error("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenLiquidar = (detalle: any) => {
    const analisisGeneral = detalle.analisis_calidad?.find(
      (a: any) => a.tipo_analisis === "Muestra General" || a.tipo_analisis?.toLowerCase().includes("general")
    ) || detalle.analisis_calidad?.[0];

    const humedadInicial = analisisGeneral?.humedad != null
      ? Number(analisisGeneral.humedad)
      : 0;
    const danoInicial = analisisGeneral?.dano != null
      ? Number(analisisGeneral.dano)
      : 0;

    setFormHumedad(humedadInicial);
    setFormDano(danoInicial);
    setFormOtros(0);
    setFormObservaciones("");
    setLiquidarModal({ show: true, detalle });
  };

  const handleLiquidar = async () => {
    if (!liquidarModal.detalle) return;
    
    setProcessing(true);
    try {
      const payload = {
        humedad: Number(formHumedad),
        dano: Number(formDano),
        otros_descuentos: Number(formOtros),
        observaciones: formObservaciones.trim() || undefined,
      };

      const nuevaNota = await crearNotaPesoApi(liquidarModal.detalle.id_detalle_recepcion, payload);
      toast.success(`Nota de Peso ${nuevaNota.numero_nota_peso} generada exitosamente`);
      setLiquidarModal({ show: false, detalle: null });
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error al generar la liquidación");
    } finally {
      setProcessing(false);
    }
  };

  const handleVerDetalle = async (id: number) => {
    try {
      const nota = await getNotaPesoByIdApi(id);
      setSelectedNota(nota);
      setShowModal(true);
    } catch (error) {
      toast.error("Error al cargar el detalle de la nota");
    }
  };

  const handleImprimirDirecto = async (id: number) => {
    setPrintingId(id);
    try {
      const nota = await getNotaPesoByIdApi(id);
      setDirectPrintNota(nota);
    } catch (error) {
      toast.error("Error al cargar la nota para imprimir");
    } finally {
      setPrintingId(null);
    }
  };

  useEffect(() => {
    if (!directPrintNota) return;

    const handleAfterPrint = () => {
      setDirectPrintNota(null);
    };

    window.addEventListener("afterprint", handleAfterPrint);
    const timer = window.setTimeout(() => {
      window.print();
    }, 60);

    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
      window.clearTimeout(timer);
    };
  }, [directPrintNota]);

  const handlePrint = () => {
    window.print();
  };

  const handleDescargarPdf = async () => {
    if (!selectedNota || !pdfTargetRef.current) return;
    setDownloadingPdf(true);
    try {
      const canvas = await html2canvas(pdfTargetRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        onclone: (clonedDoc) => {
          const clonedEl = clonedDoc.getElementById("nota-peso-pdf-source");
          if (clonedEl) {
            clonedEl.style.width = "760px";
            clonedEl.style.maxWidth = "760px";
            clonedEl.style.padding = "24px 28px";
          }
        },
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "letter",
        compress: true,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin * 2;

      let renderWidth = maxWidth;
      let renderHeight = (canvas.height * renderWidth) / canvas.width;
      if (renderHeight > maxHeight) {
        renderHeight = maxHeight;
        renderWidth = (canvas.width * renderHeight) / canvas.height;
      }

      const x = (pageWidth - renderWidth) / 2;
      pdf.addImage(imgData, "JPEG", x, margin, renderWidth, renderHeight, undefined, "FAST");
      const fileName = `${selectedNota.numero_nota_peso || `Nota_Peso_${selectedNota.id_nota_peso}`}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      toast.error("Error al generar el PDF");
    } finally {
      setDownloadingPdf(false);
    }
  };

  // Cálculos en vivo para el modal de liquidación
  const calcPesoNetoLB = Number(liquidarModal.detalle?.peso_neto || 0);
  const calcPesoBrutoQQ = calcPesoNetoLB / 100;
  const calcSacos = Number(liquidarModal.detalle?.cantidad_sacos || 0);
  const taraUnitariaLB = liquidarModal.detalle?.tipo_empaque?.tara != null
    ? Number(liquidarModal.detalle.tipo_empaque.tara)
    : 0.5;
  const calcTaraLB = Math.round(calcSacos * taraUnitariaLB);
  const calcTaraQQ = calcTaraLB / 100;
  const calcSubtotalQQ = Math.max(0, calcPesoBrutoQQ - calcTaraQQ);

  const calcDescHumedadQQ = formHumedad > 12 ? calcSubtotalQQ * ((formHumedad - 12) / 100) : 0;
  const calcDescDanoQQ = calcSubtotalQQ * (formDano / 100);
  const calcDescOtrosQQ = calcSubtotalQQ * (formOtros / 100);
  const calcTotalDescQQ = calcDescHumedadQQ + calcDescDanoQQ + calcDescOtrosQQ;
  const calcPesoNetoFinalQQ = Math.max(0, calcSubtotalQQ - calcTotalDescQQ);

  // Filtrado y paginación para Pendientes de Liquidar
  const filteredPendientes = pendientes.filter((p) => {
    // Excluir otros movimientos (ej. CAS-...)
    const esOtroMovimiento = p.recepcion?.id_tipo_movimiento && p.recepcion.id_tipo_movimiento !== 1;
    const esCasulla = p.recepcion?.numero_entrada?.startsWith("CAS-");
    if (esOtroMovimiento || esCasulla) return false;

    const term = searchTerm.toLowerCase();
    const proveedor = p.proveedor?.nombre?.toLowerCase() || "";
    const remision = p.remision?.toLowerCase() || "";
    const entrada = p.recepcion?.numero_entrada?.toLowerCase() || "";
    const tipoCafe = p.tipo_cafe?.tipo_cafe?.toLowerCase() || "";
    return proveedor.includes(term) || remision.includes(term) || entrada.includes(term) || tipoCafe.includes(term);
  });

  const totalPagesPendientes = Math.ceil(filteredPendientes.length / PAGE_SIZE) || 1;
  const safePagePendientes = Math.min(Math.max(1, pagePendientes), totalPagesPendientes);
  const paginatedPendientes = filteredPendientes.slice(
    (safePagePendientes - 1) * PAGE_SIZE,
    safePagePendientes * PAGE_SIZE
  );

  // Filtrado y paginación para Historial de Notas
  const filteredNotas = notasEmitidas.filter((n) => {
    const term = searchTerm.toLowerCase();
    const noNota = n.numero_nota_peso?.toLowerCase() || "";
    const proveedor = n.detalle_recepcion?.proveedor?.nombre?.toLowerCase() || "";
    const entrada = n.detalle_recepcion?.recepcion?.numero_entrada?.toLowerCase() || "";
    const remision = n.detalle_recepcion?.remision?.toLowerCase() || "";
    const tipoCafe = n.detalle_recepcion?.tipo_cafe?.tipo_cafe?.toLowerCase() || "";
    return (
      noNota.includes(term) ||
      proveedor.includes(term) ||
      entrada.includes(term) ||
      remision.includes(term) ||
      tipoCafe.includes(term)
    );
  });

  const totalPagesNotas = Math.ceil(filteredNotas.length / PAGE_SIZE) || 1;
  const safePageNotas = Math.min(Math.max(1, pageNotas), totalPagesNotas);
  const paginatedNotas = filteredNotas.slice(
    (safePageNotas - 1) * PAGE_SIZE,
    safePageNotas * PAGE_SIZE
  );

  return (
    <div className="pb-5">
      <PageHeader title="Nota de Peso" subtitle="Liquidación de entregas de café" icon={FileText} iconBg={colors.bg} iconColor={colors.icon} />

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || "pendientes")} className="mb-4 custom-tabs">
        <Tab eventKey="pendientes" title={<span><Clock className="w-4 h-4 inline mr-2" /> Pendientes de Liquidar</span>}>
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0"><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
                <Form.Control 
                  className="border-start-0 ps-0"
                  placeholder="Buscar por entrada, remisión o proveedor..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </InputGroup>
            </div>
            
            {loading ? (
              <div className="text-center p-5"><Spinner animation="border" variant="primary" /></div>
            ) : (
              <Table responsive hover className="mb-0 align-middle">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-4 py-3">Ingreso / Remisión</th>
                    <th>Proveedor</th>
                    <th>Tipo de Café</th>
                    <th>Cosecha</th>
                    <th className="text-end">Sacos</th>
                    <th className="text-end">Peso Neto (LB)</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPendientes.length === 0 ? (
                    <tr><td colSpan={7} className="text-center py-5 text-neutral-500">No hay entregas pendientes de liquidación</td></tr>
                  ) : (
                    paginatedPendientes.map((p) => (
                      <tr key={p.id_detalle_recepcion}>
                        <td className="px-4">
                          <div className="font-semibold text-coffee-700">{p.recepcion.numero_entrada}</div>
                          <div className="text-xs text-neutral-500">Rem: {p.remision}</div>
                        </td>
                        <td>{p.proveedor.nombre}</td>
                        <td>
                          <Badge bg="secondary-transparent" className="text-secondary fw-semibold">
                            {p.tipo_cafe?.tipo_cafe || "—"}
                          </Badge>
                        </td>
                        <td>
                          <Badge bg="light" text="dark" className="border text-dark fw-semibold" style={{ color: "#212529" }}>
                            {p.recepcion?.cosecha?.cosecha || "—"}
                          </Badge>
                        </td>
                        <td className="text-end font-medium">{p.cantidad_sacos}</td>
                        <td className="text-end font-bold text-amber-700">{Number(p.peso_neto).toLocaleString()} LB</td>
                        <td className="text-center">
                          {(() => {
                            const tieneMuestraGeneral = p.analisis_calidad?.some(
                              (a: any) => a.tipo_analisis === "Muestra General" || a.tipo_analisis?.toLowerCase().includes("general")
                            );
                            const puedeLiquidar = Boolean(p.omitir_analisis || tieneMuestraGeneral);

                            if (!puedeLiquidar) {
                              return (
                                <Badge bg="danger-transparent" className="text-danger fw-semibold fs-11 py-1 px-2 border border-danger-subtle">
                                  Pendiente de crear muestra general
                                </Badge>
                              );
                            }

                            return (
                              <Button 
                                variant="primary" 
                                size="sm" 
                                className="px-3"
                                disabled={processing}
                                onClick={() => handleOpenLiquidar(p)}
                              >
                                Liquidar
                              </Button>
                            );
                          })()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            )}

            {!loading && filteredPendientes.length > 0 && (
              <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top">
                <span className="text-muted small">
                  {totalPagesPendientes > 1 ? `Página ${safePagePendientes} de ${totalPagesPendientes} — ` : ""}
                  {filteredPendientes.length} {filteredPendientes.length === 1 ? "registro" : "registros"}
                </span>

                {totalPagesPendientes > 1 && (
                  <Pagination size="sm" className="mb-0">
                    <Pagination.First onClick={() => setPagePendientes(1)} disabled={safePagePendientes === 1} />
                    <Pagination.Prev onClick={() => setPagePendientes((p) => Math.max(1, p - 1))} disabled={safePagePendientes === 1} />
                    {Array.from({ length: totalPagesPendientes }, (_, i) => i + 1)
                      .filter((p) => p === 1 || p === totalPagesPendientes || Math.abs(p - safePagePendientes) <= 2)
                      .reduce<(number | string)[]>((acc, p, idx, arr) => {
                        if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push("...");
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((p, idx) =>
                        p === "..." ? (
                          <Pagination.Ellipsis key={`e-${idx}`} disabled />
                        ) : (
                          <Pagination.Item
                            key={p}
                            active={p === safePagePendientes}
                            onClick={() => setPagePendientes(p as number)}
                          >
                            {p}
                          </Pagination.Item>
                        )
                      )}
                    <Pagination.Next
                      onClick={() => setPagePendientes((p) => Math.min(totalPagesPendientes, p + 1))}
                      disabled={safePagePendientes === totalPagesPendientes}
                    />
                    <Pagination.Last
                      onClick={() => setPagePendientes(totalPagesPendientes)}
                      disabled={safePagePendientes === totalPagesPendientes}
                    />
                  </Pagination>
                )}
              </div>
            )}
          </Card>
        </Tab>
        
        <Tab eventKey="emitidas" title={<span><CheckCircle className="w-4 h-4 inline mr-2" /> Historial de Notas</span>}>
          <Card className="border-0 shadow-sm overflow-hidden">
             <div className="p-4 border-b">
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0"><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
                <Form.Control 
                  className="border-start-0 ps-0"
                  placeholder="Buscar por No. Nota, Entrada, Remisión o Proveedor..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </InputGroup>
            </div>

            {loading ? (
              <div className="text-center p-5"><Spinner animation="border" variant="primary" /></div>
            ) : (
              <Table responsive hover className="mb-0 align-middle">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-4 py-3">No. Nota</th>
                    <th>Ingreso / Remisión</th>
                    <th>Fecha</th>
                    <th>Proveedor</th>
                    <th>Tipo de Café</th>
                    <th className="text-end">Peso Neto (QQ)</th>
                    <th className="text-center">Estado</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNotas.length === 0 ? (
                    <tr><td colSpan={8} className="text-center py-5 text-neutral-500">No se han emitido notas de peso</td></tr>
                  ) : (
                    paginatedNotas.map((nota) => (
                      <tr key={nota.id_nota_peso}>
                        <td className="px-4 font-bold text-coffee-800">{nota.numero_nota_peso}</td>
                        <td>
                          <div className="font-semibold text-coffee-700">
                            {nota.detalle_recepcion?.recepcion?.numero_entrada || "-"}
                          </div>
                          <div className="text-xs text-neutral-500">
                            Rem: {nota.detalle_recepcion?.remision || "-"}
                          </div>
                        </td>
                        <td>{new Date(nota.fecha_nota_peso).toLocaleDateString()}</td>
                        <td>{nota.detalle_recepcion?.proveedor?.nombre || "-"}</td>
                        <td>
                          <Badge bg="secondary-transparent" className="text-secondary fw-semibold">
                            {nota.detalle_recepcion?.tipo_cafe?.tipo_cafe || "—"}
                          </Badge>
                        </td>
                        <td className="text-end font-bold">{Number(nota.detalles[0]?.peso_neto || 0).toFixed(2)} QQ</td>
                        <td className="text-center"><Badge bg="success">EMITIDA</Badge></td>
                        <td className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              title="Ver detalle"
                              onClick={() => handleVerDetalle(nota.id_nota_peso)}
                            >
                              <FileText className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              title="Imprimir Nota de Peso"
                              disabled={printingId === nota.id_nota_peso}
                              onClick={() => handleImprimirDirecto(nota.id_nota_peso)}
                            >
                              {printingId === nota.id_nota_peso ? (
                                <Spinner animation="border" size="sm" />
                              ) : (
                                <Printer className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            )}

            {!loading && filteredNotas.length > 0 && (
              <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top">
                <span className="text-muted small">
                  {totalPagesNotas > 1 ? `Página ${safePageNotas} de ${totalPagesNotas} — ` : ""}
                  {filteredNotas.length} {filteredNotas.length === 1 ? "registro" : "registros"}
                </span>

                {totalPagesNotas > 1 && (
                  <Pagination size="sm" className="mb-0">
                    <Pagination.First onClick={() => setPageNotas(1)} disabled={safePageNotas === 1} />
                    <Pagination.Prev onClick={() => setPageNotas((p) => Math.max(1, p - 1))} disabled={safePageNotas === 1} />
                    {Array.from({ length: totalPagesNotas }, (_, i) => i + 1)
                      .filter((p) => p === 1 || p === totalPagesNotas || Math.abs(p - safePageNotas) <= 2)
                      .reduce<(number | string)[]>((acc, p, idx, arr) => {
                        if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push("...");
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((p, idx) =>
                        p === "..." ? (
                          <Pagination.Ellipsis key={`e-${idx}`} disabled />
                        ) : (
                          <Pagination.Item
                            key={p}
                            active={p === safePageNotas}
                            onClick={() => setPageNotas(p as number)}
                          >
                            {p}
                          </Pagination.Item>
                        )
                      )}
                    <Pagination.Next
                      onClick={() => setPageNotas((p) => Math.min(totalPagesNotas, p + 1))}
                      disabled={safePageNotas === totalPagesNotas}
                    />
                    <Pagination.Last
                      onClick={() => setPageNotas(totalPagesNotas)}
                      disabled={safePageNotas === totalPagesNotas}
                    />
                  </Pagination>
                )}
              </div>
            )}
          </Card>
        </Tab>
      </Tabs>

      {/* MODAL DE LIQUIDACIÓN CON PARÁMETROS EDITABLES */}
      <Modal 
        show={liquidarModal.show} 
        onHide={() => !processing && setLiquidarModal({ show: false, detalle: null })} 
        centered 
        size="lg"
      >
        <Modal.Header closeButton={!processing} className="border-bottom">
          <Modal.Title className="d-flex align-items-center gap-2 fs-16 fw-bold text-coffee-800">
            <FileText className="w-5 h-5 text-amber-600" />
            Liquidación de Entrega de Café
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {liquidarModal.detalle && (
            <div>
              {/* DATOS DE LA ENTREGA */}
              <div className="bg-light p-3 rounded mb-3 border">
                <div className="row g-2 text-sm">
                  <div className="col-sm-4">
                    <span className="text-muted small d-block">Proveedor</span>
                    <strong className="text-dark">{liquidarModal.detalle.proveedor?.nombre}</strong>
                  </div>
                  <div className="col-sm-3">
                    <span className="text-muted small d-block">Entrada / Remisión</span>
                    <strong>{liquidarModal.detalle.recepcion?.numero_entrada}</strong>
                    <span className="text-muted small ms-1">({liquidarModal.detalle.remision})</span>
                  </div>
                  <div className="col-sm-2">
                    <span className="text-muted small d-block">Cosecha</span>
                    <Badge bg="light" text="dark" className="text-dark border fw-semibold" style={{ color: "#212529" }}>
                      {liquidarModal.detalle.recepcion?.cosecha?.cosecha || "—"}
                    </Badge>
                  </div>
                  <div className="col-sm-3">
                    <span className="text-muted small d-block">Tipo de Café</span>
                    <Badge bg="secondary-transparent" className="text-secondary fw-semibold">
                      {liquidarModal.detalle.tipo_cafe?.tipo_cafe || "—"}
                    </Badge>
                  </div>
                  <div className="col-sm-3">
                    <span className="text-muted small d-block">Sacos</span>
                    <strong className="text-coffee-700">{calcSacos} sacos</strong>
                  </div>
                  <div className="col-sm-3">
                    <span className="text-muted small d-block">Peso Báscula (LB)</span>
                    <strong>{calcPesoNetoLB.toLocaleString()} LB</strong>
                  </div>
                  <div className="col-sm-3">
                    <span className="text-muted small d-block">Peso Bruto (QQ)</span>
                    <strong>{calcPesoBrutoQQ.toFixed(2)} QQ</strong>
                  </div>
                  <div className="col-sm-3">
                    <span className="text-muted small d-block">Tara Sacos ({taraUnitariaLB} LB/saco)</span>
                    <strong className="text-danger">-{calcTaraQQ.toFixed(2)} QQ ({calcTaraLB} LB)</strong>
                  </div>
                </div>
              </div>

              {/* CAMPOS EDITABLES */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold mb-0 text-dark fs-14">Parámetros de Calidad y Descuentos</h6>
                  <span className="badge bg-amber-50 text-amber-800 border border-amber-200 small">
                    Pre-llenado de muestra de laboratorio (editable)
                  </span>
                </div>

                <div className="row g-3">
                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        % Humedad
                      </Form.Label>
                      <InputGroup size="sm">
                        <Form.Control
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          value={formHumedad}
                          onChange={(e) => setFormHumedad(parseFloat(e.target.value) || 0)}
                          disabled={processing}
                        />
                        <InputGroup.Text>%</InputGroup.Text>
                      </InputGroup>
                      <Form.Text className="text-muted fs-11">
                        {formHumedad > 12 ? (
                          <span className="text-danger fw-semibold">
                            Desc. {(formHumedad - 12).toFixed(2)}% ({calcDescHumedadQQ.toFixed(2)} QQ)
                          </span>
                        ) : (
                          "Sin castigo (<= 12%)"
                        )}
                      </Form.Text>
                    </Form.Group>
                  </div>

                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        % Daño
                      </Form.Label>
                      <InputGroup size="sm">
                        <Form.Control
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          value={formDano}
                          onChange={(e) => setFormDano(parseFloat(e.target.value) || 0)}
                          disabled={processing}
                        />
                        <InputGroup.Text>%</InputGroup.Text>
                      </InputGroup>
                      <Form.Text className="text-muted fs-11">
                        {calcDescDanoQQ > 0 ? (
                          <span className="text-danger fw-semibold">
                            Desc: -{calcDescDanoQQ.toFixed(2)} QQ
                          </span>
                        ) : (
                          "Sin descuento"
                        )}
                      </Form.Text>
                    </Form.Group>
                  </div>

                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        % Otros Descuentos
                      </Form.Label>
                      <InputGroup size="sm">
                        <Form.Control
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          value={formOtros}
                          onChange={(e) => setFormOtros(parseFloat(e.target.value) || 0)}
                          disabled={processing}
                        />
                        <InputGroup.Text>%</InputGroup.Text>
                      </InputGroup>
                      <Form.Text className="text-muted fs-11">
                        {calcDescOtrosQQ > 0 ? (
                          <span className="text-danger fw-semibold">
                            Desc: -{calcDescOtrosQQ.toFixed(2)} QQ
                          </span>
                        ) : (
                          "Descuentos adicionales"
                        )}
                      </Form.Text>
                    </Form.Group>
                  </div>

                  <div className="col-12">
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        Observaciones (Opcional)
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Ej. Descuento acordado, observaciones de liquidación..."
                        value={formObservaciones}
                        onChange={(e) => setFormObservaciones(e.target.value)}
                        disabled={processing}
                        className="fs-13"
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>

              {/* RESUMEN DE CÁLCULO EN VIVO */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded">
                <div className="row align-items-center">
                  <div className="col-md-7 text-sm">
                    <div className="d-flex justify-content-between py-1 border-bottom border-amber-200">
                      <span className="text-muted">Subtotal antes de descuentos:</span>
                      <strong>{calcSubtotalQQ.toFixed(2)} QQ</strong>
                    </div>
                    <div className="d-flex justify-content-between py-1 border-bottom border-amber-200 text-danger">
                      <span>Total Descuentos (Humedad + Daño + Otros):</span>
                      <strong>-{calcTotalDescQQ.toFixed(2)} QQ</strong>
                    </div>
                  </div>
                  <div className="col-md-5 text-center mt-2 mt-md-0">
                    <span className="text-xs uppercase text-coffee-800 fw-bold d-block">Peso Neto Final Liquidado</span>
                    <span className="fs-22 fw-black text-coffee-800">
                      {calcPesoNetoFinalQQ.toFixed(2)} <span className="fs-14 fw-semibold">QQ</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-top">
          <Button 
            variant="light" 
            onClick={() => setLiquidarModal({ show: false, detalle: null })} 
            disabled={processing}
          >
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleLiquidar} 
            disabled={processing}
            className="d-flex align-items-center gap-2"
          >
            {processing ? (
              <>
                <Spinner animation="border" size="sm" />
                Liquidando...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Confirmar y Generar Nota
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL DE IMPRESIÓN (ESTILO @FormatoNotaPeso.png) */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" className="modal-print d-print-none">
        {selectedNota && (
          <>
            <Modal.Header closeButton className="d-print-none">
              <Modal.Title>Previsualización de Nota de Peso</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
              <NotaPesoDocumento nota={selectedNota} id="nota-peso-pdf-source" ref={pdfTargetRef} />
            </Modal.Body>
            <Modal.Footer className="d-print-none">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
              <Button
                variant="outline-primary"
                className="flex items-center gap-2"
                onClick={handleDescargarPdf}
                disabled={downloadingPdf}
              >
                {downloadingPdf ? (
                  <>
                    <Spinner animation="border" size="sm" /> Generando PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" /> Descargar PDF
                  </>
                )}
              </Button>
              <Button variant="primary" className="flex items-center gap-2" onClick={handlePrint}>
                <Printer className="w-4 h-4" /> Imprimir
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {(directPrintNota || (showModal && selectedNota)) &&
        createPortal(
          <div id="nota-peso-print-portal" className="d-none d-print-block">
            <style>{`
              @media print {
                @page {
                  size: letter portrait;
                  margin: 0.6cm;
                }
                html, body {
                  height: auto !important;
                  width: auto !important;
                  overflow: visible !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  background: #ffffff !important;
                }
                body > *:not(#nota-peso-print-portal) {
                  display: none !important;
                }
                #nota-peso-print-portal {
                  display: block !important;
                  position: static !important;
                  width: 100% !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  background: #ffffff !important;
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
              }
            `}</style>
            <NotaPesoDocumento nota={(directPrintNota || selectedNota)!} />
          </div>,
          document.body
        )}

      <style>{`
        .table-nota th, .table-nota td { border: 1px solid #dee2e6 !important; }
        .custom-tabs .nav-link { color: #666; font-weight: 500; }
        .custom-tabs .nav-link.active { color: #8b4513; border-bottom: 2px solid #8b4513; }
      `}</style>
    </div>
  );
}
