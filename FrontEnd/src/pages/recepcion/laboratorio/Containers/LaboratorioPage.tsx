import { useState, useEffect, KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { Badge, Card, Form, InputGroup } from "react-bootstrap";
import toast from "react-hot-toast";
import { useAuth } from "../../../../auth/useAuth";
import Pageheader from "../../../../layout/layoutcomponent/pageheader";

// APIs
import { getReceptionsApi, DetalleRecepcion } from "../../../../api/reception.api";
import { getProveedoresApi, getCatadoresApi, getCalidadesApi, getDefectosApi, getZarandasApi, getTazasApi, Catador, Calidad, Defecto, Zaranda, Taza } from "../../../../api/catalogs.api";
import { createAnalisisApi, getAnalisisPendientesApi, CreateAnalisisRequest, AnalisisResponse } from "../../../../api/analisis.api";

// Components
import LabTable from "../Components/LabTable";
import CatacionModal from "../Components/CatacionModal";
import BoletaModal from "../Components/BoletaModal";

export interface MuestraPendiente extends DetalleRecepcion {
  numero_entrada: string;
  proveedor_nombre: string;
  analisis?: AnalisisResponse;
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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [recepciones, provs, cat, cal, def, zar, taz, analisisPendientes] = await Promise.all([
        getReceptionsApi(), getProveedoresApi(), getCatadoresApi(), getCalidadesApi(), getDefectosApi(), getZarandasApi(), getTazasApi(), getAnalisisPendientesApi()
      ]);

      setCatadores(cat); setCalidades(cal); setDefectos(def); setZarandas(zar); setTazas(taz);

      const pendientes: MuestraPendiente[] = [];
      recepciones.forEach(rec => {
        if (!rec.estado) return;
        rec.detalles.forEach(det => {
          // Filtramos: 
          // 1. "Muestreado" (Muestra previa tomada en patio antes de descargar)
          // 2. "Muestra General Recibida" (Muestra general enviada después de la Nota de Patio / Descarga)
          const nombreEstado = det.estado_transaccion?.nombre || "";
          if (det.estado && (nombreEstado === "Muestreado" || nombreEstado === "Muestra General Recibida")) {
            pendientes.push({
              ...det,
              numero_entrada: rec.numero_entrada,
              proveedor_nombre: provs.find(p => p.id_proveedor === det.id_proveedor)?.nombre || "N/A"
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
        m.remision.toLowerCase().includes(trimmed)
      );

  const countByStatus = (name: string) =>
    muestras.filter(m => m.estado_transaccion?.nombre === name).length;
  const cntMuestreado       = countByStatus("Muestreado");
  const cntGeneralRecibida  = countByStatus("Muestra General Recibida");
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
                  placeholder="Buscar por No. Ingreso o Remisión Física..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  style={{ fontSize: "0.8rem" }}
                />
              </InputGroup>
            </div>

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
        submitting={submitting}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />

      <BoletaModal
        muestra={muestraToPrint}
        onClose={handleClosePrintModal}
      />
    </div>
  );
}
