import { useState, useEffect, KeyboardEvent } from "react";
import { Search, Printer, GitCompare } from "lucide-react";
import { Badge, Button, Card, Form, InputGroup } from "react-bootstrap";
import toast from "react-hot-toast";
import { useAuth } from "../../../../auth/useAuth";
import Pageheader from "../../../../layout/layoutcomponent/pageheader";

// APIs
import { getReceptionsApi, DetalleRecepcion } from "../../../../api/reception.api";
import { getProveedoresApi, getCatadoresApi, getCalidadesApi, getDefectosApi, getZarandasApi, getTazasApi, getTiposCafeApi, Catador, Calidad, Defecto, Zaranda, Taza, TipoCafe } from "../../../../api/catalogs.api";
import { createAnalisisApi, getAnalisisPendientesApi, CreateAnalisisRequest, AnalisisResponse } from "../../../../api/analisis.api";

// Components
import LabTable from "../Components/LabTable";
import CatacionModal from "../Components/CatacionModal";
import BoletaModal from "../Components/BoletaModal";
import ModalReimpresionAnalisis from "../Components/ModalReimpresionAnalisis";
import ModalComparativoAnalisis from "../Components/ModalComparativoAnalisis";

export interface MuestraPendiente extends DetalleRecepcion {
  numero_entrada: string;
  proveedor_nombre: string;
  analisis?: AnalisisResponse;
  esMuestraGeneralPendiente?: boolean;
}

export default function LaboratorioPage() {
  const { hasPermission } = useAuth();
  const hasRowActions = hasPermission("CREAR_MUESTRA") || hasPermission("IMPRIMIR_MUESTRA");

  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [muestras, setMuestras] = useState<MuestraPendiente[]>([]);
  const [selectedMuestra, setSelectedMuestra] = useState<MuestraPendiente | null>(null);
  const [muestraToPrint, setMuestraToPrint] = useState<MuestraPendiente | null>(null);

  // Catálogos
  const [catadores, setCatadores] = useState<Catador[]>([]);
  const [calidades, setCalidades] = useState<Calidad[]>([]);
  const [defectos, setDefectos] = useState<Defecto[]>([]);
  const [zarandas, setZarandas] = useState<Zaranda[]>([]);
  const [tazas, setTazas] = useState<Taza[]>([]);
  const [tiposCafe, setTiposCafe] = useState<TipoCafe[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [recepciones, provs, cat, cal, def, zar, taz, analisisPendientes, tc] = await Promise.all([
        getReceptionsApi(), getProveedoresApi(), getCatadoresApi(), getCalidadesApi(), getDefectosApi(), getZarandasApi(), getTazasApi(), getAnalisisPendientesApi(), getTiposCafeApi()
      ]);

      setCatadores(cat); setCalidades(cal); setDefectos(def); setZarandas(zar); setTazas(taz); setTiposCafe(tc);

      const pendientes: MuestraPendiente[] = [];
      recepciones.forEach(rec => {
        if (!rec.estado) return;
        rec.detalles.forEach(det => {
          // Filtramos: 
          // 1. "Muestreado" (Muestra previa tomada en patio antes de descargar)
          // 2. Muestra General Pendiente:
          //    - Está en "Muestra General Recibida"
          //    - O bien: ya tiene Nota de Patio (o pesada cerrada) y aún NO tiene el análisis general en analisis_calidad
          const nombreEstado = det.estado_transaccion?.nombre || "";
          const tieneNotaPatio = (det as any).notas_patio && (det as any).notas_patio.length > 0;
          const tieneGeneralHecha = (det as any).analisis_calidad?.some(
            (a: any) => (a.tipo_analisis || "").toLowerCase().includes("general")
          );

          const esPreviaPendiente = nombreEstado === "Muestreado";
          const esGeneralPendiente = (
            nombreEstado === "Muestra General Recibida" ||
            (tieneNotaPatio && (nombreEstado === "Pesada Cerrada" || nombreEstado === "Pesaje Completado"))
          ) && !tieneGeneralHecha;

          if (det.estado && (esPreviaPendiente || esGeneralPendiente)) {
            pendientes.push({
              ...det,
              numero_entrada: rec.numero_entrada,
              proveedor_nombre: provs.find(p => p.id_proveedor === det.id_proveedor)?.nombre || "N/A",
              esMuestraGeneralPendiente: esGeneralPendiente,
            });
          }
        });
      });

      // Añadimos las que están pendientes de aprobación de Gerencia (Previa y General)
      analisisPendientes.forEach(ana => {
        const det = ana.detalle_recepcion;
        const nombreEstado = det?.estado_transaccion?.nombre || "";
        if (det && (nombreEstado === "Muestra Previa Pendiente de Aprobacion" || nombreEstado === "Muestra General Pendiente de Aprobacion")) {
           pendientes.push({
             ...det,
             numero_entrada: det.recepcion?.numero_entrada || "N/A",
             proveedor_nombre: det.proveedor?.nombre || "N/A",
             analisis: ana
           });
        }
      });

      setMuestras(pendientes);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los datos del laboratorio");
    } finally {
      setLoading(false);
    }
  };

  const [showReimpresion, setShowReimpresion] = useState(false);
  const [showComparativo, setShowComparativo] = useState(false);
  const canReimprimir = hasPermission("REIMPRESION_ANALISIS_INGRESO");

  const handleOpenModal = (muestra: MuestraPendiente) => setSelectedMuestra(muestra);
  const handleCloseModal = () => setSelectedMuestra(null);
  const handlePrintClick = (muestra: MuestraPendiente) => setMuestraToPrint(muestra);
  const handleClosePrintModal = () => setMuestraToPrint(null);

  const handleSubmit = async (payload: CreateAnalisisRequest) => {
    try {
      setSubmitting(true);
      await createAnalisisApi(payload);
      toast.success("Análisis guardado exitosamente. Pasando a Gerencia.");
      setSelectedMuestra(null);
      loadData();
    } catch (error: any) {
      const serverMsg = error.response?.data?.message || error.response?.data?.prismaCode || error.message || 'Error al guardar el análisis';
      console.error('[handleSubmit error]', { status: error.response?.status, data: error.response?.data });
      toast.error(serverMsg, { duration: 10000 });
    } finally {
      setSubmitting(false);
    }
  };

  const trimmed = searchTerm.trim().toLowerCase();
  const filteredMuestras = trimmed.length === 0
    ? []
    : muestras.filter(m =>
        m.numero_entrada.toLowerCase().includes(trimmed) ||
        m.remision.toLowerCase().includes(trimmed) ||
        m.proveedor_nombre.toLowerCase().includes(trimmed) ||
        (m.tipo_cafe?.tipo_cafe || "").toLowerCase().includes(trimmed)
      );

  const countByStatus = (name: string) =>
    muestras.filter(m => m.estado_transaccion?.nombre === name).length;
  const cntMuestreado       = countByStatus("Muestreado");
  const cntGeneralRecibida  = muestras.filter(m => m.estado_transaccion?.nombre === "Muestra General Recibida" || m.esMuestraGeneralPendiente).length;
  const cntPendPrevia       = countByStatus("Muestra Previa Pendiente de Aprobacion");
  const cntPendGeneral      = countByStatus("Muestra General Pendiente de Aprobacion");

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setSearchTerm(inputValue);
  };

  return (
    <div>
      <Pageheader title="Laboratorio" heading="Recepción" active="Laboratorio" />

      <Card className="mb-6">
        <Card.Body className="p-3">
          <div className="d-flex align-items-center gap-4 flex-wrap">
            {/* Buscador */}
            <div style={{ flex: 1, minWidth: "240px" }}>
              <InputGroup size="sm">
                <InputGroup.Text><Search className="w-3 h-3 text-neutral-400" /></InputGroup.Text>
                <Form.Control
                  size="sm"
                  placeholder="Buscar por No. Ingreso, Remisión, Proveedor o Tipo de Café..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  style={{ fontSize: "0.8rem" }}
                />
              </InputGroup>
            </div>

            {canReimprimir && (
              <>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="d-flex align-items-center gap-1"
                  onClick={() => setShowReimpresion(true)}
                >
                  <Printer size={14} /> Reimpresiones
                </Button>

                <Button
                  variant="outline-primary"
                  size="sm"
                  className="d-flex align-items-center gap-1"
                  onClick={() => setShowComparativo(true)}
                >
                  <GitCompare size={14} /> Comparativo
                </Button>
              </>
            )}

            {/* Indicadores de estado */}
            {!loading && (
              <div className="d-flex gap-2 flex-wrap align-items-center">
                {cntMuestreado > 0 && (
                  <Badge bg="primary-transparent" className="rounded-pill">
                    Equi. Muestreado: {cntMuestreado}
                  </Badge>
                )}
                {cntGeneralRecibida > 0 && (
                  <Badge bg="success-transparent" className="rounded-pill">
                    General: {cntGeneralRecibida}
                  </Badge>
                )}
                {cntPendPrevia > 0 && (
                  <Badge bg="warning-transparent" className="rounded-pill">
                    Pend. Previa Aprobación: {cntPendPrevia}
                  </Badge>
                )}
                {cntPendGeneral > 0 && (
                  <Badge bg="danger-transparent" className="rounded-pill">
                    Pend. General Aprobación: {cntPendGeneral}
                  </Badge>
                )}
                {muestras.length === 0 && (
                  <span style={{ fontSize: "0.78rem", color: "#888" }}>Sin muestras en bandeja</span>
                )}
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      <LabTable
        muestras={filteredMuestras}
        loading={loading}
        hasRowActions={hasRowActions}
        hasPermission={hasPermission}
        onOpenModal={handleOpenModal}
        onPrintClick={handlePrintClick}
        searchTerm={searchTerm}
      />

      <CatacionModal
        key={selectedMuestra?.id_detalle_recepcion ?? "closed"}
        muestra={selectedMuestra}
        catadores={catadores}
        calidades={calidades}
        defectos={defectos}
        zarandas={zarandas}
        tazas={tazas}
        tiposCafe={tiposCafe}
        submitting={submitting}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />

      <BoletaModal
        muestra={muestraToPrint}
        onClose={handleClosePrintModal}
      />

      <ModalReimpresionAnalisis
        show={showReimpresion}
        onClose={() => setShowReimpresion(false)}
      />

      <ModalComparativoAnalisis
        show={showComparativo}
        onClose={() => setShowComparativo(false)}
      />
    </div>
  );
}
