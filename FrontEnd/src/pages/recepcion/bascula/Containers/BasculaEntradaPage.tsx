import React, { useState, useEffect, KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { Badge, Card, Form, InputGroup } from "react-bootstrap";
import toast from "react-hot-toast";
import Pageheader from "../../../../layout/layoutcomponent/pageheader";

// APIs
import { getPendientesBasculaApi, registrarPesadaEntradaApi, registrarPesadaSalidaApi, registrarSalidaCabezalApi, registrarEntradaCabezalApi, updateReceptionApi } from "../../../../api/reception.api";
import { getBodegasApi, Bodega, getPlacasCabezalApi, PlacaCabezal, getConductoresApi, Conductor } from "../../../../api/catalogs.api";

// Estado IDs (según catálogo de base de datos)
const ESTADO_PESADA_ABIERTA = 7;  // "Pesada Abierta"
const ESTADO_PESADA_CERRADA = 8;  // "Pesada Cerrada"

// Components
import BasculaTable, { type ModalMode } from "../Components/BasculaTable";
import PesadaModal from "../Components/PesadaModal";

export default function BasculaEntradaPage() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [recepciones, setRecepciones] = useState<any[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [bodegas, setBodegas] = useState<Bodega[]>([]);
  const [placasCabezal, setPlacasCabezal] = useState<PlacaCabezal[]>([]);
  const [conductores, setConductores] = useState<Conductor[]>([]);

  // Estado del Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("ENTRADA");
  const [selectedRecepcion, setSelectedRecepcion] = useState<any | null>(null);
  const [selectedCarga, setSelectedCarga] = useState<any | null>(null);
  const [pesoInput, setPesoInput] = useState("");
  const [bodegaSearch, setBodegaSearch] = useState("");
  const [placaInput, setPlacaInput] = useState("");
  const [conductorInput, setConductorInput] = useState("");
  const [observacionesInput, setObservacionesInput] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [data, bods, placas, conds] = await Promise.all([
        getPendientesBasculaApi(),
        getBodegasApi(),
        getPlacasCabezalApi(),
        getConductoresApi(),
      ]);
      setRecepciones(data);
      setBodegas(bods);
      setPlacasCabezal(placas);
      setConductores(conds);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los vehículos en báscula");
    } finally {
      setLoading(false);
    }
  };

  const toggleRow = (id: number) => {
    setExpandedRows((prev) => prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]);
  };

  const handleOpenModal = (recepcion: any, carga: any, mode: ModalMode) => {
    setSelectedRecepcion(recepcion);
    setSelectedCarga(carga);
    setModalMode(mode);
    setPesoInput("");
    setBodegaSearch("");
    setConductorInput("");
    setObservacionesInput("");
    if (mode === "SALIDA_CABEZAL") {
      let currentCabezal = recepcion.id_placa_cabezal?.toString() || "";
      if (carga?.cambios_cabezal && carga.cambios_cabezal.length > 0) {
        const completedChanges = carga.cambios_cabezal.filter((c: any) => c.id_placa_cabezal_entrante != null);
        if (completedChanges.length > 0) {
          currentCabezal = completedChanges[completedChanges.length - 1].id_placa_cabezal_entrante.toString();
        }
      }
      setPlacaInput(currentCabezal);
    } else {
      setPlacaInput("");
    }
    setIsModalOpen(true);
  };

  const handleSubmitPeso = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCarga) return;

    const peso = Number(pesoInput);
    if (isNaN(peso) || peso <= 0) {
      toast.error("Por favor ingrese un peso válido mayor a cero.");
      return;
    }

    if (modalMode !== "ENTRADA" && selectedCarga.pesada_entrada && peso >= Number(selectedCarga.pesada_entrada)) {
      toast.error("El peso capturado no puede ser mayor o igual al Peso Bruto de la carga completa.");
      return;
    }

    if ((modalMode === "SALIDA_CABEZAL" || modalMode === "ENTRADA_CABEZAL") && !placaInput) {
      toast.error("Por favor, seleccione la placa del cabezal a registrar.");
      return;
    }

    if (modalMode === "ENTRADA_CABEZAL" && !conductorInput) {
      toast.error("Por favor, seleccione el conductor del nuevo cabezal.");
      return;
    }

    try {
      setSubmitting(true);
      let resultado: any = null;

      if (modalMode === "ENTRADA") {
        if (!bodegaSearch) {
          toast.error("Por favor, seleccione una bodega válida de la lista.");
          setSubmitting(false);
          return;
        }
        resultado = await registrarPesadaEntradaApi(selectedCarga.id_detalle_recepcion, peso, Number(bodegaSearch));
        toast.success("Peso Bruto registrado. El vehículo puede ir a descargar a bodega.");
      } else if (modalMode === "SALIDA_CABEZAL") {
        await registrarSalidaCabezalApi(selectedCarga.id_detalle_recepcion, Number(placaInput), peso);
        // Actualizar observaciones al desacoplar el furgón
        await updateReceptionApi(selectedRecepcion.id_recepcion, {
          observaciones: "SALE POR DESACOPLO DEL FURGON",
        });
        toast.success("Destarse de cabezal registrado. La carga queda 'Sin Cabezal'.");
        // Imprimir Pase de Salida para el cabezal que sale
        const base = import.meta.env.BASE_URL;
        window.open(`${base}print/pase-salida/${selectedCarga.id_detalle_recepcion}`, "_blank");
      } else if (modalMode === "ENTRADA_CABEZAL") {
        resultado = await registrarEntradaCabezalApi(selectedCarga.id_detalle_recepcion, Number(placaInput), peso);
        // Actualizar cabezal y conductor en la recepción
        await updateReceptionApi(selectedRecepcion.id_recepcion, {
          id_placa_cabezal: Number(placaInput),
          id_conductor: Number(conductorInput),
        });
        toast.success("Nuevo cabezal enganchado. Peso Bruto corregido automáticamente.");
      } else {
        resultado = await registrarPesadaSalidaApi(selectedCarga.id_detalle_recepcion, peso);
        if (observacionesInput.trim()) {
          await updateReceptionApi(selectedRecepcion.id_recepcion, {
            observaciones: observacionesInput.trim(),
          });
        }
        toast.success("Tara registrada. Pesaje completado correctamente.");
      }

      setIsModalOpen(false);
      loadData();

      // ===== Lógica de impresión según estado resultante =====
      if (resultado?.id_estado_transaccion) {
        const base = import.meta.env.BASE_URL;
        const idDet = selectedCarga.id_detalle_recepcion;

        if (resultado.id_estado_transaccion === ESTADO_PESADA_ABIERTA) {
          // Primera Pesada
          window.open(`${base}print/boleta-pesada/${idDet}/primera`, "_blank");
        } else if (resultado.id_estado_transaccion === ESTADO_PESADA_CERRADA) {
          // Segunda Pesada
          window.open(`${base}print/boleta-pesada/${idDet}/segunda`, "_blank");
          // Si todos los detalles del viaje cerraron → Pase de Salida
          if (resultado.allClosed) {
            window.open(`${base}print/pase-salida/${idDet}`, "_blank");
          }
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error al registrar el peso en el sistema.");
    } finally {
      setSubmitting(false);
    }
  };

  const trimmed = searchTerm.trim().toLowerCase();
  const filteredRecepciones = trimmed.length === 0
    ? []
    : recepciones.filter((r) =>
        r.numero_entrada?.toLowerCase().includes(trimmed) ||
        r.placa_cabezal?.placa?.toLowerCase().includes(trimmed) ||
        r.placa_furgon?.placa?.toLowerCase().includes(trimmed) ||
        r.detalles?.some((d: any) => d.remision?.toLowerCase().includes(trimmed))
      );

  // Indicadores: contar detalles por estado en TODOS los registros cargados
  const allDetalles: any[] = recepciones.flatMap((r) => r.detalles || []);
  const countEstado = (nombre: string) =>
    allDetalles.filter((d) => d.estado_transaccion?.nombre === nombre).length;
  const cntPesadaAbierta  = countEstado("Pesada Abierta");
  const cntSinCabezal     = countEstado("Sin Cabezal");
  const cntCompletado     = countEstado("Pesaje Completado");
  const cntEnBodega       = countEstado("En Bodega");

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setSearchTerm(inputValue);
  };

  return (
    <div>
      <Pageheader title="Báscula de Entrada" heading="Recepción" active="Báscula de Entrada" />

      <Card className="mb-6">
        <Card.Body className="p-3">
          <div className="d-flex align-items-center gap-4 flex-wrap">
            {/* Buscador */}
            <div style={{ flex: 1, minWidth: "260px" }}>
              <InputGroup size="sm">
                <InputGroup.Text><Search className="w-3 h-3 text-neutral-400" /></InputGroup.Text>
                <Form.Control
                  size="sm"
                  placeholder="Buscar por No. Ingreso, Remisión, Placa Cabezal o Furgón..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  style={{ fontSize: "0.8rem" }}
                />
              </InputGroup>
            </div>

            {/* Indicadores por estado */}
            {!loading && (
              <div className="d-flex gap-2 flex-wrap align-items-center">
                {cntPesadaAbierta > 0 && (
                  <Badge bg="info-transparent" className="rounded-pill">
                    Pesada Abierta: {cntPesadaAbierta}
                  </Badge>
                )}
                {cntSinCabezal > 0 && (
                  <Badge bg="warning-transparent" className="rounded-pill">
                    Sin Cabezal: {cntSinCabezal}
                  </Badge>
                )}
                {cntCompletado > 0 && (
                  <Badge bg="success-transparent" className="rounded-pill">
                    Completado: {cntCompletado}
                  </Badge>
                )}
                {cntEnBodega > 0 && (
                  <Badge bg="secondary-transparent" className="rounded-pill">
                    En Bodega: {cntEnBodega}
                  </Badge>
                )}
                {allDetalles.length === 0 && (
                  <span style={{ fontSize: "0.78rem", color: "#888" }}>Sin vehículos en báscula</span>
                )}
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      <BasculaTable
        recepciones={filteredRecepciones}
        loading={loading}
        expandedRows={expandedRows}
        onToggleRow={toggleRow}
        onOpenModal={handleOpenModal}
        searchTerm={searchTerm}
      />

      <PesadaModal
        show={isModalOpen}
        modalMode={modalMode}
        selectedRecepcion={selectedRecepcion}
        selectedCarga={selectedCarga}
        pesoInput={pesoInput}
        bodegaSearch={bodegaSearch}
        placaInput={placaInput}
        conductorInput={conductorInput}
        observaciones={observacionesInput}
        bodegas={bodegas}
        placasCabezal={placasCabezal}
        conductores={conductores}
        submitting={submitting}
        onClose={() => setIsModalOpen(false)}
        onPesoChange={setPesoInput}
        onBodegaChange={setBodegaSearch}
        onPlacaChange={setPlacaInput}
        onConductorChange={setConductorInput}
        onObservacionesChange={setObservacionesInput}
        onSubmit={handleSubmitPeso}
      />
    </div>
  );
}
