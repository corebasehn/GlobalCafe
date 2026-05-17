import { useState, useEffect } from "react";
import { FlaskConical } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { moduleColors } from "../../config/colors.config";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/useAuth";

import { getReceptionsApi, cambiarEstadoDetalleApi } from "../../api/reception.api";
import { getProveedoresApi } from "../../api/catalogs.api";

import { CargaPendiente, MuestreoFormData, initialMuestreoForm } from "../../components/muestreo/types";
import BuscadorMuestreo from "../../components/muestreo/BuscadorMuestreo";
import TablaMuestreo from "../../components/muestreo/TablaMuestreo";
import ModalConfirmarMuestra from "../../components/muestreo/ModalConfirmarMuestra";

const colors = moduleColors.recepcion;

export default function MuestreoPage() {
  const { hasPermission } = useAuth();
  const hasRowActions = hasPermission("VER_ACCIONES_MUESTREO");

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [cargasPendientes, setCargasPendientes] = useState<CargaPendiente[]>([]);
  const [selectedCarga, setSelectedCarga] = useState<CargaPendiente | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<MuestreoFormData>(initialMuestreoForm);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [recepciones, proveedores] = await Promise.all([
        getReceptionsApi(),
        getProveedoresApi(),
      ]);

      const cargas: CargaPendiente[] = [];
      recepciones.forEach(rec => {
        if (!rec.estado) return;
        rec.detalles.forEach(det => {
          if (det.estado && det.estado_transaccion?.nombre === "Pendiente de Muestrear") {
            cargas.push({
              ...det,
              numero_entrada: rec.numero_entrada,
              fecha_entrada: rec.fecha_entrada,
              proveedor_nombre: proveedores.find(p => p.id_proveedor === det.id_proveedor)?.nombre || "N/A",
            });
          }
        });
      });

      setCargasPendientes(cargas);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar las muestras pendientes");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (carga: CargaPendiente) => {
    setSelectedCarga(carga);
    setFormData(initialMuestreoForm);
    setIsModalOpen(true);
  };

  const handleConfirmarMuestra = async () => {
    if (!selectedCarga) return;
    try {
      setSubmitting(true);
      await cambiarEstadoDetalleApi(selectedCarga.id_detalle_recepcion, "Muestreado");
      toast.success("Muestra registrada. El Vehículo pasó a estado Muestreado.");
      setIsModalOpen(false);
      loadData();
    } catch (error: any) {
      console.error("Error confirmando muestra:", error);
      toast.error(error.response?.data?.message || "Error al registrar la muestra");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredCargas = cargasPendientes.filter(c =>
    c.numero_entrada.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.remision.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.proveedor_nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Muestreo en Patio"
        subtitle="Cargas en espera de toma de muestra física"
        icon={FlaskConical}
        iconBg={colors.bg}
        iconColor={colors.icon}
      />

      <BuscadorMuestreo value={searchTerm} onChange={setSearchTerm} />

      <TablaMuestreo
        loading={loading}
        filteredCargas={filteredCargas}
        hasRowActions={hasRowActions}
        onMuestrear={handleOpenModal}
      />

      <ModalConfirmarMuestra
        show={isModalOpen}
        carga={selectedCarga}
        formData={formData}
        submitting={submitting}
        onHide={() => setIsModalOpen(false)}
        onFormChange={setFormData}
        onConfirmar={handleConfirmarMuestra}
      />
    </div>
  );
}
