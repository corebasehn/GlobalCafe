import React, { useState, useEffect } from "react";
import { Search, ShieldCheck, Beaker, ClipboardCheck } from "lucide-react";
import PageHeader from "../../../../components/layout/PageHeader";
import { moduleColors } from "../../../../config/colors.config";
import { Card, Form, InputGroup, Tabs, Tab, Badge } from "react-bootstrap";
import toast from "react-hot-toast";
import { useAuth } from "../../../../auth/useAuth";

// APIs
import { getAnalisisPendientesApi, veredictoGerenciaApi, VeredictoGerenciaRequest } from "../../../../api/analisis.api";
import { getPendientesAprobacionGerenciaApi, decidirFaltosApi } from "../../../../api/patio.api";

// Components
import GerenciaTable from "../Components/GerenciaTable";
import EvaluacionModal from "../Components/EvaluacionModal";
import DevolucionModal from "../Components/DevolucionModal";
import FaltosTable from "../../patio/Components/FaltosTable";
import DevolucionFaltosModal from "../../patio/Components/DevolucionFaltosModal";

const colors = moduleColors.recepcion;

export interface MuestraGerencia {
  id_analisis_calidad: number;
  numero_analisis: string;
  fecha_analisis: string;
  catador_nombre: string;
  calidad_nombre: string;
  humedad: number;
  dano: number;
  primer_rendimiento: number;
  segundo_rendimiento: number;
  observaciones_laboratorio: string;
  analisis_defectos: any[];
  analisis_zarandas: any[];
  analisis_tazas: any[];
  numero_entrada: string;
  remision: string;
  proveedor_nombre: string;
  cantidad_qq: number;
}

export default function AprobacionGerenciaPage() {
  const { hasPermission } = useAuth();
  const hasRowActions = hasPermission("APROBAR_MUESTRA");

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Calidad State
  const [muestras, setMuestras] = useState<MuestraGerencia[]>([]);
  const [selectedMuestra, setSelectedMuestra] = useState<MuestraGerencia | null>(null);
  const [printData, setPrintData] = useState<{ muestra: MuestraGerencia; motivo: string } | null>(null);
  
  // Faltos State
  const [pendientesFaltos, setPendientesFaltos] = useState<any[]>([]);
  const [selectedFalto, setSelectedFalto] = useState<any | null>(null);
  const [showFaltoModal, setShowFaltoModal] = useState(false);

  const [formData, setFormData] = useState<VeredictoGerenciaRequest>({
    veredicto: "APROBAR",
    observaciones: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [data, faltos] = await Promise.all([
        getAnalisisPendientesApi(),
        getPendientesAprobacionGerenciaApi()
      ]);

      const mapeadas: MuestraGerencia[] = data.map((ana: any) => ({
        id_analisis_calidad: ana.id_analisis_calidad,
        numero_analisis: ana.numero_analisis,
        fecha_analisis: ana.fecha_analisis,
        catador_nombre: ana.catador?.nombre || "N/A",
        calidad_nombre: ana.calidad?.nombre || "N/A",
        humedad: ana.humedad,
        dano: ana.dano,
        primer_rendimiento: ana.primer_rendimiento,
        segundo_rendimiento: ana.segundo_rendimiento,
        observaciones_laboratorio: ana.observaciones || "Ninguna",
        analisis_defectos: ana.analisis_defectos || [],
        analisis_zarandas: ana.analisis_zarandas || [],
        analisis_tazas: ana.analisis_tazas || [],
        numero_entrada: ana.detalle_recepcion?.recepcion?.numero_entrada || "N/A",
        remision: ana.detalle_recepcion?.remision || "N/A",
        proveedor_nombre: ana.detalle_recepcion?.proveedor?.nombre || "N/A",
        cantidad_qq: Number(ana.detalle_recepcion?.cantidad_qq || 0),
      }));

      setMuestras(mapeadas);
      setPendientesFaltos(faltos);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar la bandeja de aprobaciones");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEvaluation = (muestra: MuestraGerencia) => {
    setSelectedMuestra(muestra);
    setFormData({ veredicto: "APROBAR", observaciones: "" });
  };

  const handleDecidirFalto = (falto: any) => {
    setSelectedFalto(falto);
    setShowFaltoModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMuestra) return;

    if (formData.veredicto === "DEVOLUCION" && !formData.observaciones?.trim()) {
      toast.error("Debe especificar detalladamente el motivo de la devolución de la carga.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await veredictoGerenciaApi(selectedMuestra.id_analisis_calidad, formData);

      toast.success(`Muestra evaluada correctamente. Nuevo estado: ${res.estado}`);

      if (formData.veredicto === "DEVOLUCION") {
        setPrintData({ muestra: selectedMuestra, motivo: formData.observaciones?.trim() || "N/A" });
      }

      setSelectedMuestra(null);
      loadData();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error al registrar el veredicto");
    } finally {
      setSubmitting(false);
    }
  };

  const onConfirmFalto = async (decision: "APROBAR" | "DEVOLVER", obs: string) => {
    try {
      setSubmitting(true);
      await decidirFaltosApi(selectedFalto.id_detalle_recepcion, decision, obs);
      toast.success(decision === "APROBAR" ? "Carga aprobada correctamente" : "Carga devuelta");
      if (decision === "APROBAR") {
        setShowFaltoModal(false);
        loadData();
      }
    } catch (error: any) {
      console.error("Error al procesar decisión:", error);
      toast.error(error.response?.data?.message || "Error al registrar veredicto");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredMuestras = muestras.filter((m) =>
    m.numero_entrada.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.remision.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.proveedor_nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Aprobaciones de Gerencia" 
        subtitle="Veredicto final sobre calidad de laboratorio y segregación en patio" 
        icon={ClipboardCheck} 
        iconBg={colors.bg} 
        iconColor={colors.icon} 
      />

      <Card className="mb-6">
        <Card.Body className="p-4">
          <InputGroup>
            <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
            <Form.Control
              placeholder="Buscar por ingreso, remisión o proveedor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body className="p-0">
          <Tabs defaultActiveKey="calidad" className="px-4 pt-3 border-bottom-0">
            <Tab 
              eventKey="calidad" 
              title={
                <div className="flex items-center gap-2">
                  <Beaker size={16}/> Calidad (Laboratorio)
                  {muestras.length > 0 && <Badge bg="danger" pill>{muestras.length}</Badge>}
                </div>
              }
            >
              <div className="p-4 border-top">
                <GerenciaTable
                  muestras={filteredMuestras}
                  loading={loading}
                  hasRowActions={hasRowActions}
                  onOpenEvaluation={handleOpenEvaluation}
                />
              </div>
            </Tab>

            <Tab 
              eventKey="faltos" 
              title={
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16}/> Segregación (Faltos de Patio)
                  {pendientesFaltos.length > 0 && <Badge bg="warning" text="dark" pill>{pendientesFaltos.length}</Badge>}
                </div>
              }
            >
              <div className="p-4 border-top">
                <FaltosTable 
                  data={pendientesFaltos} 
                  onDecide={handleDecidirFalto} 
                />
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      <EvaluacionModal
        muestra={selectedMuestra}
        formData={formData}
        submitting={submitting}
        onClose={() => setSelectedMuestra(null)}
        onFormChange={setFormData}
        onSubmit={handleSubmit}
      />

      <DevolucionModal
        printData={printData}
        onClose={() => setPrintData(null)}
      />

      <DevolucionFaltosModal 
        show={showFaltoModal}
        item={selectedFalto}
        submitting={submitting}
        onClose={() => { setShowFaltoModal(false); loadData(); }}
        onConfirm={onConfirmFalto}
      />
    </div>
  );
}

