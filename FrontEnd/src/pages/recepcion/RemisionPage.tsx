import React, { useState, useEffect } from "react";
import { ClipboardList, Plus, Loader2 } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { moduleColors } from "../../config/colors.config";
import { useAuth } from "../../auth/useAuth";
import toast from "react-hot-toast";

import {
  getCosechasApi, getPlacasCabezalApi, getPlacasFurgonApi, getTransportesApi,
  getConductoresApi, getMunicipiosApi, getProveedoresApi,
  Cosecha, PlacaCabezal, PlacaFurgon, Conductor, Municipio, Proveedor, Transporte,
} from "../../api/catalogs.api";
import {
  getReceptionsApi, createReceptionApi, updateReceptionApi, deleteReceptionApi,
  registrarImpresionApi, Recepcion, CreateReceptionRequest,
} from "../../api/reception.api";

import { RemisionFormData, initialState } from "../../components/remision/types";
import BuscadorRemision from "../../components/remision/BuscadorRemision";
import TablaRemision from "../../components/remision/TablaRemision";
import ModalRemision from "../../components/remision/ModalRemision";
import ModalImprimirBoleta from "../../components/remision/ModalImprimirBoleta";

// Anular modal (small, stays here as it's trivial)
import { Button, Modal } from "react-bootstrap";

const colors = moduleColors.recepcion;

export default function RemisionPage() {
  const { hasPermission } = useAuth();
  const hasRowActions =
    hasPermission("EDITAR_RECEPCION") ||
    hasPermission("IMPRIMIR_RECEPCION") ||
    hasPermission("ANULAR_RECEPCION");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [cosechas, setCosechas] = useState<Cosecha[]>([]);
  const [placasCabezal, setPlacasCabezal] = useState<PlacaCabezal[]>([]);
  const [placasFurgon, setPlacasFurgon] = useState<PlacaFurgon[]>([]);
  const [conductores, setConductores] = useState<Conductor[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [transportes, setTransportes] = useState<Transporte[]>([]);
  const [recepciones, setRecepciones] = useState<Recepcion[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<RemisionFormData>(initialState);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [receptionToDelete, setReceptionToDelete] = useState<Recepcion | null>(null);

  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [receptionToPrint, setReceptionToPrint] = useState<Recepcion | null>(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [cos, pc, pf, cond, mun, prov, trans, recs] = await Promise.all([
        getCosechasApi(), getPlacasCabezalApi(), getPlacasFurgonApi(),
        getConductoresApi(), getMunicipiosApi(), getProveedoresApi(),
        getTransportesApi(), getReceptionsApi(),
      ]);
      setCosechas(cos);
      setPlacasCabezal(pc);
      setPlacasFurgon(pf);
      setConductores(cond);
      setMunicipios(mun);
      setProveedores(prov);
      setTransportes(trans);
      setRecepciones(recs);

      const cosechaActual = cos.find(c => c.cosecha_actual);
      if (cosechaActual) {
        setFormData(prev => ({ ...prev, id_cosecha: cosechaActual.id_cosecha.toString() }));
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los datos del servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setEditingId(null);
    const cosechaActual = cosechas.find(c => c.cosecha_actual);
    setFormData({
      ...initialState,
      id_cosecha: cosechaActual ? cosechaActual.id_cosecha.toString() : "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (recepcion: Recepcion) => {
    setEditingId(recepcion.id_recepcion);
    const conductorInfo = conductores.find(c => c.id_conductor === recepcion.id_conductor);
    setFormData({
      id_cosecha: recepcion.id_cosecha.toString(),
      tipo_vehiculo: recepcion.tipo_vehiculo,
      id_placa_cabezal: recepcion.id_placa_cabezal.toString(),
      id_placa_furgon: recepcion.id_placa_furgon ? recepcion.id_placa_furgon.toString() : "",
      id_transporte: conductorInfo ? conductorInfo.id_transporte.toString() : "",
      id_conductor: recepcion.id_conductor.toString(),
      id_municipio: recepcion.id_municipio.toString(),
      marchamo: recepcion.marchamo || "",
      observaciones: recepcion.observaciones || "",
      detalles: recepcion.detalles.filter(d => d.estado).map(d => ({
        id_detalle_recepcion: d.id_detalle_recepcion,
        id_proveedor: d.id_proveedor.toString(),
        cantidad_sacos: d.cantidad_sacos.toString(),
        cantidad_qq: d.cantidad_qq.toString(),
        remision: d.remision,
        observaciones: d.observaciones || "",
        is_editable: d.estado_transaccion?.nombre === "Pendiente de Muestrear",
      })),
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload: CreateReceptionRequest = {
        id_cosecha: Number(formData.id_cosecha),
        tipo_vehiculo: formData.tipo_vehiculo,
        id_placa_cabezal: Number(formData.id_placa_cabezal),
        id_placa_furgon: formData.id_placa_furgon ? Number(formData.id_placa_furgon) : undefined,
        id_conductor: Number(formData.id_conductor),
        id_municipio: Number(formData.id_municipio),
        marchamo: formData.marchamo || undefined,
        observaciones: formData.observaciones || undefined,
        detalles: formData.detalles.map(d => ({
          id_detalle_recepcion: d.id_detalle_recepcion,
          id_proveedor: Number(d.id_proveedor),
          cantidad_sacos: Number(d.cantidad_sacos),
          cantidad_qq: Number(d.cantidad_qq),
          remision: d.remision,
          observaciones: d.observaciones || undefined,
        })),
      };

      if (editingId) {
        await updateReceptionApi(editingId, payload);
        toast.success("Remisión actualizada correctamente");
      } else {
        await createReceptionApi(payload);
        toast.success("Remisión registrada en portería correctamente");
      }

      setIsModalOpen(false);
      loadData();
    } catch (error: any) {
      console.error(error.response?.data?.message);
      toast.error(error.response?.data?.message || "Error al registrar la remisión");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDetalleChange = (index: number, field: string, value: string) => {
    const updated = [...formData.detalles];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, detalles: updated });
  };

  const addDetalle = () => {
    setFormData({
      ...formData,
      detalles: [...formData.detalles, {
        id_proveedor: "", cantidad_sacos: "", cantidad_qq: "",
        remision: "", observaciones: "", is_editable: true,
      }],
    });
  };

  const removeDetalle = (index: number) => {
    setFormData({ ...formData, detalles: formData.detalles.filter((_, i) => i !== index) });
  };

  const handleDeleteClick = (recepcion: Recepcion) => {
    setReceptionToDelete(recepcion);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!receptionToDelete) return;
    try {
      setSubmitting(true);
      await deleteReceptionApi(receptionToDelete.id_recepcion);
      toast.success("Ingreso anulado exitosamente");
      setIsDeleteModalOpen(false);
      loadData();
    } catch (error: any) {
      console.error(error.response?.data?.message);
      toast.error(error.response?.data?.message || "Error al anular el ingreso");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrintClick = (recepcion: Recepcion) => {
    setReceptionToPrint(recepcion);
    setIsPrintModalOpen(true);
  };

  const confirmPrint = async () => {
    globalThis.print();
    if (receptionToPrint) {
      try {
        await registrarImpresionApi(receptionToPrint.id_recepcion);
        loadData();
      } catch (error) {
        console.error("Error al registrar impresión:", error);
      }
    }
  };

  const recepcionesActivas = recepciones.filter(r =>
    r.detalles?.some(d => d.estado && d.estado_transaccion?.nombre === "Pendiente de Muestrear")
  );

  const filteredRecepciones = recepcionesActivas.filter(r => {
    const detallesActivos = r.detalles?.filter(d => d.estado) || [];
    const provNames = detallesActivos.map(
      d => proveedores.find(p => p.id_proveedor === d.id_proveedor)?.nombre || ""
    );
    const conductorObj = conductores.find(c => c.id_conductor === r.id_conductor);
    const transporteName = transportes.find(t => t.id_transporte === conductorObj?.id_transporte)?.nombre || "";
    const term = searchTerm.toLowerCase();
    return (
      r.numero_entrada.toLowerCase().includes(term) ||
      transporteName.toLowerCase().includes(term) ||
      provNames.some(name => name.toLowerCase().includes(term))
    );
  });

  return (
    <div>
      <PageHeader
        title="Ingreso de Remisión"
        subtitle="Registro de vehículos y carga en portería"
        icon={ClipboardList}
        iconBg={colors.bg}
        iconColor={colors.icon}
        actions={
          hasPermission("CREAR_RECEPCION")
            ? [{ label: "Nueva Remisión", onClick: handleOpenModal, icon: Plus }]
            : []
        }
      />

      <BuscadorRemision value={searchTerm} onChange={setSearchTerm} />

      <TablaRemision
        loading={loading}
        filteredRecepciones={filteredRecepciones}
        hasRowActions={hasRowActions}
        hasPermission={hasPermission}
        placasCabezal={placasCabezal}
        placasFurgon={placasFurgon}
        conductores={conductores}
        transportes={transportes}
        proveedores={proveedores}
        onEdit={handleEdit}
        onPrint={handlePrintClick}
        onDelete={handleDeleteClick}
      />

      <ModalRemision
        show={isModalOpen}
        editingId={editingId}
        formData={formData}
        submitting={submitting}
        cosechas={cosechas}
        municipios={municipios}
        transportes={transportes}
        conductores={conductores}
        placasCabezal={placasCabezal}
        placasFurgon={placasFurgon}
        proveedores={proveedores}
        onHide={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        onFormChange={setFormData}
        onDetalleChange={handleDetalleChange}
        onAddDetalle={addDetalle}
        onRemoveDetalle={removeDetalle}
      />

      <Modal show={isDeleteModalOpen} onHide={() => setIsDeleteModalOpen(false)} size="sm">
        <Modal.Header closeButton>
          <Modal.Title className="fs-6">Anular Ingreso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-neutral-600 mb-0">
            ¿Está seguro que desea anular el ingreso{" "}
            <span className="fw-bold text-dark">{receptionToDelete?.numero_entrada}</span>?
            Esta acción cancelará permanentemente todas las cargas asociadas a este viaje.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)} disabled={submitting}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete} disabled={submitting}>
            {submitting && <Loader2 className="w-3 h-3 animate-spin me-2" />} Sí, Anular
          </Button>
        </Modal.Footer>
      </Modal>

      <ModalImprimirBoleta
        show={isPrintModalOpen}
        recepcion={receptionToPrint}
        conductores={conductores}
        transportes={transportes}
        placasCabezal={placasCabezal}
        placasFurgon={placasFurgon}
        proveedores={proveedores}
        municipios={municipios}
        onHide={() => setIsPrintModalOpen(false)}
        onConfirmPrint={confirmPrint}
      />
    </div>
  );
}
