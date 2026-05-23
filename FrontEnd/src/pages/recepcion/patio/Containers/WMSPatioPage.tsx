import { useState, useEffect } from "react";
import { Warehouse, Search, MapPin, RefreshCcw } from "lucide-react";
import PageHeader from "../../../../components/layout/PageHeader";
import { Card, Form, InputGroup } from 'react-bootstrap';
import { moduleColors } from "../../../../config/colors.config";
import toast from "react-hot-toast";

// APIs
import { 
  getRecepcionesParaPatioApi, 
  crearNotaPatioApi, 
  RecepcionPatio, 
  NotaPatioRequest 
} from "../../../../api/patio.api";
import { getEstibasApi, Estiba } from "../../../../api/catalogs.api";

// Components
import PatioPendingTable from "../Components/PatioPendingTable";
import NotaPatioModal from "../Components/NotaPatioModal";

const colors = moduleColors.recepcion;

export default function WMSPatioPage() {
  const [loading, setLoading] = useState(true);
  const [pendientes, setPendientes] = useState<RecepcionPatio[]>([]);
  const [estibas, setEstibas] = useState<Estiba[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modals
  const [selectedItem, setSelectedItem] = useState<RecepcionPatio | null>(null);
  const [showNotaModal, setShowNotaModal] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [pend, ests] = await Promise.all([
        getRecepcionesParaPatioApi(),
        getEstibasApi()
      ]);
      setPendientes(pend);
      setEstibas(ests.filter(e => e.estado));
    } catch (error) {
      console.error("Error al cargar datos de patio:", error);
      toast.error("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleCrearNota = (item: RecepcionPatio) => {
    setSelectedItem(item);
    setShowNotaModal(true);
  };

  const onSubmitNota = async (payload: NotaPatioRequest) => {
    try {
      await crearNotaPatioApi(payload);
      toast.success("Nota de Patio generada exitosamente");
      setShowNotaModal(false);
      loadInitialData(); // Recargar lista
    } catch (error: any) {
      console.error("Error al crear nota de patio:", error);
      toast.error(error.response?.data?.message || "Error al procesar la transacción");
    }
  };

  const filteredPendientes = pendientes.filter(p => 
    p.recepcion.numero_entrada.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.remision.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="WMS & Patio" 
        subtitle="Control de descarga, pesaje bruto y gestión de faltos" 
        icon={Warehouse} 
        iconBg={colors.bg} 
        iconColor={colors.icon} 
        actions={[
          { label: "Actualizar", onClick: loadInitialData, icon: RefreshCcw }
        ]} 
      />

      <Card>
        <Card.Body className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h5 className="mb-0 font-bold text-coffee-800">Camiones en Proceso de Descarga</h5>
            <div className="w-full max-w-sm">
              <InputGroup>
                <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
                <Form.Control 
                  placeholder="Buscar por ingreso, proveedor o remisión..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </div>
          </div>

          <PatioPendingTable 
            data={filteredPendientes} 
            onAction={handleCrearNota} 
          />
        </Card.Body>
      </Card>

      <NotaPatioModal 
        show={showNotaModal}
        item={selectedItem}
        estibas={estibas}
        onClose={() => setShowNotaModal(false)}
        onSubmit={onSubmitNota}
      />
    </div>
  );
}
