import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Pageheader from "../../../../layout/layoutcomponent/pageheader";
import { Card, Form, InputGroup } from "react-bootstrap";
import toast from "react-hot-toast";
import { useAuth } from "../../../../auth/useAuth";

// APIs
import { getAnalisisPendientesApi, veredictoGerenciaApi, VeredictoGerenciaRequest } from "../../../../api/analisis.api";

// Components
import GerenciaTable from "../Components/GerenciaTable";
import EvaluacionModal from "../Components/EvaluacionModal";
import DevolucionModal from "../Components/DevolucionModal";

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

  const [muestras, setMuestras] = useState<MuestraGerencia[]>([]);
  const [selectedMuestra, setSelectedMuestra] = useState<MuestraGerencia | null>(null);
  const [printData, setPrintData] = useState<{ muestra: MuestraGerencia; motivo: string } | null>(null);

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
      const data = await getAnalisisPendientesApi();

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

  const filteredMuestras = muestras.filter((m) =>
    m.numero_entrada.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.remision.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.proveedor_nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Pageheader title="Aprobación de Gerencia" heading="Recepción" active="Aprobación de Gerencia" />

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

      <GerenciaTable
        muestras={filteredMuestras}
        loading={loading}
        hasRowActions={hasRowActions}
        onOpenEvaluation={handleOpenEvaluation}
      />

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
    </div>
  );
}
