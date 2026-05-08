import { useState, useEffect } from "react";
import { FlaskConical, Search, Clock, Loader2, HandCoins } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/useAuth";

// APIs
import { getReceptionsApi, cambiarEstadoDetalleApi, DetalleRecepcion } from "../../api/reception.api";
import { getProveedoresApi } from "../../api/catalogs.api";

const colors = moduleColors.recepcion;

// Interface extendida localmente para aplanar los datos en la tabla
interface CargaPendiente extends DetalleRecepcion {
  numero_entrada: string;
  fecha_entrada: string;
  proveedor_nombre: string;
}

export default function MuestreoPage() {
  const { hasPermission } = useAuth();
  const hasRowActions = hasPermission("VER_ACCIONES_MUESTREO");

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [cargasPendientes, setCargasPendientes] = useState<CargaPendiente[]>([]);
  const [selectedCarga, setSelectedCarga] = useState<CargaPendiente | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    tipo_analisis: "Muestra Previa",
    observaciones: ""
  });

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [recepciones, proveedores] = await Promise.all([
        getReceptionsApi(),
        getProveedoresApi()
      ]);

      // "Aplanamos" los datos: Extraemos todos los detalles de todos los viajes
      // Y filtramos SOLO los que están "Pendiente de Muestrear"
      const cargas: CargaPendiente[] = [];
      
      recepciones.forEach(rec => {
        if (!rec.estado) return; // Ignorar viajes anulados
        
        rec.detalles.forEach(det => {
          if (det.estado && det.estado_transaccion?.nombre === "Pendiente de Muestrear") {
            cargas.push({
              ...det,
              numero_entrada: rec.numero_entrada,
              fecha_entrada: rec.fecha_entrada,
              proveedor_nombre: proveedores.find(p => p.id_proveedor === det.id_proveedor)?.nombre || "N/A"
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
    setFormData({ tipo_analisis: "Muestra Previa", observaciones: "" });
    setIsModalOpen(true);
  };

  const handleConfirmarMuestra = async () => {
    if (!selectedCarga) return;
    
    try {
      setSubmitting(true);
      // 1. Imprimir la viñeta (Abre el diálogo de la impresora)
      // window.print(); // Omitido temporalmente por solicitud
      
      // 2. Cambiar el estado a "Muestreado" en el backend
      await cambiarEstadoDetalleApi(selectedCarga.id_detalle_recepcion, "Muestreado");
      
      toast.success("Muestra registrada. El Vehículo pasó a estado Muestreado.");
      setIsModalOpen(false);
      
      // 3. Recargar la tabla (esto hará que la fila desaparezca mágicamente)
      loadData();
    } catch (error: any) {
      console.error("Error confirmando muestra:", error);
      toast.error(error.response?.data?.message || "Error al registrar la muestra");
    } finally {
      setSubmitting(false);
    }
  };

  // Filtrado por buscador
  const filteredCargas = cargasPendientes.filter(c => 
    c.numero_entrada.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.remision.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.proveedor_nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Muestreo en Patio" subtitle="Cargas en espera de toma de muestra física" icon={FlaskConical} iconBg={colors.bg} iconColor={colors.icon} />

      <Card className="mb-6">
        <Card.Body className="p-4">
          <InputGroup>
            <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
            <Form.Control 
              placeholder="Buscar por remisión, ingreso o proveedor..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </InputGroup>
        </Card.Body>
      </Card>

      <Card>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              {hasRowActions && <th className="text-center" style={{ width: '120px' }}>Acción</th>}
              <th>No. Ingreso</th>
              <th>Remisión Física</th>
              <th>Proveedor / Finca</th>
              <th className="text-center">Sacos Declarados</th>
              <th className="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={hasRowActions ? 6 : 5} className="text-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin inline-block text-neutral-400 mr-2"/> Cargando cola de trabajo...
                </td>
              </tr>
            ) : filteredCargas.length === 0 ? (
              <tr>
                <td colSpan={hasRowActions ? 6 : 5} className="text-center py-8 text-neutral-500">
                  Patio limpio. No hay camiones pendientes de muestreo.
                </td>
              </tr>
            ) : (
              filteredCargas.map((carga) => (
                <tr key={carga.id_detalle_recepcion}>
                  {hasRowActions && (
                    <td className="text-center">
                      <Button variant="primary" size="sm" onClick={() => handleOpenModal(carga)}>
                        Muestrear
                      </Button>
                    </td>
                  )}
                  <td className="font-medium text-neutral-600">{carga.numero_entrada}</td>
                  <td className="font-bold text-coffee-700">{carga.remision}</td>
                  <td>{carga.proveedor_nombre}</td>
                  <td className="text-center">{carga.cantidad_sacos}</td>
                  <td className="text-center">
                    <Badge bg="warning" className="text-dark d-flex align-items-center gap-1 justify-content-center mx-auto" style={{ width: 'fit-content' }}>
                      <Clock className="w-3 h-3"/> ESPERANDO MUESTRA
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      {/* Modal para Confirmar e Imprimir Viñeta */}
      <Modal show={isModalOpen} onHide={handleCloseModal} size="lg">
        {selectedCarga && (
          <div className="space-y-6">
            
            {/* CSS Oculto para la viñeta térmica */}
            <style>{`
              @media print {
                @page { margin: 0; size: 10cm 5cm; } /* Tamaño etiqueta estándar térmica (4x2 pulgadas) */
                body * { visibility: hidden; }
                #print-label, #print-label * { visibility: visible; }
                #print-label {
                  position: absolute;
                  left: 0; top: 0;
                  width: 10cm; height: 5cm;
                  padding: 0.5cm;
                  font-family: sans-serif;
                  color: black;
                }
              }
            `}</style>

            <Modal.Header closeButton>
              <Modal.Title>Confirmar Toma de Muestra</Modal.Title>
            </Modal.Header>

            <Modal.Body className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm mb-4">
                <p className="text-blue-800 font-bold mb-2">Información de la Carga a Muestrear:</p>
                <div className="grid grid-cols-2 gap-2 text-blue-900">
                  <p className="mb-0"><strong>Ingreso:</strong> {selectedCarga.numero_entrada}</p>
                  <p className="mb-0"><strong>Remisión:</strong> {selectedCarga.remision}</p>
                  <p className="mb-0"><strong>Sacos:</strong> {selectedCarga.cantidad_sacos}</p>
                  <p className="col-span-2 mb-0"><strong>Proveedor:</strong> {selectedCarga.proveedor_nombre}</p>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Tipo de Análisis Solicitado</Form.Label>
                <Form.Select 
                  value={formData.tipo_analisis}
                  onChange={(e) => setFormData({...formData, tipo_analisis: e.target.value})}
                >
                  <option value="Muestra Previa">Muestra Previa (Camión sin descargar)</option>
                  <option value="Muestra General">Muestra General (Durante/Post descarga)</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label>Observaciones del Muestreador (Opcional)</Form.Label>
                <Form.Control 
                  placeholder="Ej. Sacos rotos, café mojado..." 
                  value={formData.observaciones}
                  onChange={(e) => setFormData({...formData, observaciones: e.target.value})}
                />
              </Form.Group>

              {/* Área de la Etiqueta (Se imprime en la térmica, pero no estorba en la pantalla normal) */}
              <div className="d-none">
                <div id="print-label" className="border border-2 border-dark rounded bg-white d-flex flex-column justify-content-between p-3" style={{ height: '5cm' }}>
                  <div className="text-center border-bottom border-2 border-dark pb-1 mb-1">
                    <h1 className="fw-bold fs-5 mb-0">GLOBAL COFFEE GROUP</h1>
                    <h2 className="fs-6 fw-bold text-uppercase mb-0">{formData.tipo_analisis}</h2>
                  </div>
                  <div className="fs-6 flex-grow-1 d-flex flex-column justify-content-center">
                    <p className="mb-1"><strong>ING:</strong> {selectedCarga.numero_entrada} | <strong>REM:</strong> {selectedCarga.remision}</p>
                    <p className="text-truncate mb-1"><strong>PROV:</strong> {selectedCarga.proveedor_nombre}</p>
                    <p className="mb-1"><strong>SACOS:</strong> {selectedCarga.cantidad_sacos} | <strong>QQ:</strong> {selectedCarga.cantidad_qq}</p>
                    <p className="mb-0"><strong>FECHA:</strong> {new Date().toLocaleString()}</p>
                  </div>
                  <div className="text-center border-top border-dashed border-dark pt-1" style={{ fontSize: '10px' }}>
                    Pegar esta etiqueta en la bolsa de muestra
                  </div>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal} disabled={submitting}>Cancelar</Button>
              <Button variant="primary" onClick={handleConfirmarMuestra} disabled={submitting} className="flex items-center gap-2">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin"/> : <HandCoins className="w-4 h-4"/>} Confirmar Muestra
              </Button>
            </Modal.Footer>
          </div>
        )}
      </Modal>
    </div>
  );
}
