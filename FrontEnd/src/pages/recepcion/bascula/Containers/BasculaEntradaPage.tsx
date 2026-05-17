import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Card, Form, InputGroup } from "react-bootstrap";
import toast from "react-hot-toast";
import Pageheader from "../../../../layout/layoutcomponent/pageheader";

// APIs
import { getPendientesBasculaApi, registrarPesadaEntradaApi, registrarPesadaSalidaApi, registrarSalidaCabezalApi, registrarEntradaCabezalApi } from "../../../../api/reception.api";
import { getBodegasApi, Bodega, getPlacasCabezalApi, PlacaCabezal } from "../../../../api/catalogs.api";

// Components
import BasculaTable, { type ModalMode } from "../Components/BasculaTable";
import PesadaModal from "../Components/PesadaModal";

export default function BasculaEntradaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [recepciones, setRecepciones] = useState<any[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [bodegas, setBodegas] = useState<Bodega[]>([]);
  const [placasCabezal, setPlacasCabezal] = useState<PlacaCabezal[]>([]);

  // Estado del Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("ENTRADA");
  const [selectedRecepcion, setSelectedRecepcion] = useState<any | null>(null);
  const [selectedCarga, setSelectedCarga] = useState<any | null>(null);
  const [pesoInput, setPesoInput] = useState("");
  const [bodegaSearch, setBodegaSearch] = useState("");
  const [placaInput, setPlacaInput] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [data, bods, placas] = await Promise.all([
        getPendientesBasculaApi(),
        getBodegasApi(),
        getPlacasCabezalApi(),
      ]);
      setRecepciones(data);
      setBodegas(bods);
      setPlacasCabezal(placas);
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

    try {
      setSubmitting(true);
      if (modalMode === "ENTRADA") {
        if (!bodegaSearch) {
          toast.error("Por favor, seleccione una bodega válida de la lista.");
          setSubmitting(false);
          return;
        }
        await registrarPesadaEntradaApi(selectedCarga.id_detalle_recepcion, peso, Number(bodegaSearch));
        toast.success("Peso Bruto registrado. El vehículo puede ir a descargar a bodega.");
      } else if (modalMode === "SALIDA_CABEZAL") {
        await registrarSalidaCabezalApi(selectedCarga.id_detalle_recepcion, Number(placaInput), peso);
        toast.success("Destarse de cabezal registrado. La carga queda 'Sin Cabezal'.");
      } else if (modalMode === "ENTRADA_CABEZAL") {
        await registrarEntradaCabezalApi(selectedCarga.id_detalle_recepcion, Number(placaInput), peso);
        toast.success("Nuevo cabezal enganchado. Peso Bruto corregido automáticamente.");
      } else {
        await registrarPesadaSalidaApi(selectedCarga.id_detalle_recepcion, peso);
        toast.success("Tara registrada. Pesaje completado correctamente.");
      }
      setIsModalOpen(false);
      loadData();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error al registrar el peso en el sistema.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredRecepciones = recepciones.filter((r) => {
    const term = searchTerm.toLowerCase();
    return (
      r.numero_entrada?.toLowerCase().includes(term) ||
      r.placa_cabezal?.placa?.toLowerCase().includes(term) ||
      r.placa_furgon?.placa?.toLowerCase().includes(term) ||
      r.detalles?.some((d: any) => d.remision?.toLowerCase().includes(term)) ||
      r.detalles?.some((d: any) => d.proveedor?.nombre?.toLowerCase().includes(term))
    );
  });

  return (
    <div>
      <Pageheader title="Báscula de Entrada" heading="Recepción" active="Báscula de Entrada" />

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

      <BasculaTable
        recepciones={filteredRecepciones}
        loading={loading}
        expandedRows={expandedRows}
        onToggleRow={toggleRow}
        onOpenModal={handleOpenModal}
      />

      <PesadaModal
        show={isModalOpen}
        modalMode={modalMode}
        selectedRecepcion={selectedRecepcion}
        selectedCarga={selectedCarga}
        pesoInput={pesoInput}
        bodegaSearch={bodegaSearch}
        placaInput={placaInput}
        bodegas={bodegas}
        placasCabezal={placasCabezal}
        submitting={submitting}
        onClose={() => setIsModalOpen(false)}
        onPesoChange={setPesoInput}
        onBodegaChange={setBodegaSearch}
        onPlacaChange={setPlacaInput}
        onSubmit={handleSubmitPeso}
      />
    </div>
  );
}
