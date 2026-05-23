import React, { useState } from "react";
import { Loader2, Weight, Save, Zap } from "lucide-react";
import { Modal, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import type { Bodega, PlacaCabezal } from "../../../../api/catalogs.api";
import type { ModalMode } from "./BasculaTable";

export interface PesadaModalProps {
  show: boolean;
  modalMode: ModalMode;
  selectedRecepcion: any | null;
  selectedCarga: any | null;
  pesoInput: string;
  bodegaSearch: string;
  placaInput: string;
  bodegas: Bodega[];
  placasCabezal: PlacaCabezal[];
  submitting: boolean;
  onClose: () => void;
  onPesoChange: (val: string) => void;
  onBodegaChange: (val: string) => void;
  onPlacaChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function PesadaModal({
  show, modalMode, selectedRecepcion, selectedCarga,
  pesoInput, bodegaSearch, placaInput,
  bodegas, placasCabezal, submitting,
  onClose, onPesoChange, onBodegaChange, onPlacaChange, onSubmit,
}: PesadaModalProps) {
  const [capturingScale, setCapturingScale] = useState(false);

  const handleCapturarBascula = async () => {
    setCapturingScale(true);
    try {
      // 1. Petición al agente local (localhost siempre funciona desde el navegador del usuario)
      const response = await fetch("http://127.0.0.1:4000/peso");
      const data = await response.json();
      
      if (data.estado === "exito") {
        onPesoChange(data.peso);
      } else {
        alert(`Error de la báscula: ${data.mensaje}`);
      }
    } catch (error) {
      alert("No se pudo conectar con el Agente de Báscula. Verifique que el .exe esté abierto en esta PC.");
    } finally {
      setCapturingScale(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      {selectedRecepcion && selectedCarga && (
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title className="fs-5">
              {modalMode === "ENTRADA" ? "Pesada de Entrada (Vehículo Lleno)" :
               modalMode === "SALIDA" ? "Pesada de Salida (Vehículo Vacío)" :
               modalMode === "SALIDA_CABEZAL" ? "Destarse - Registrar Salida de Cabezal" :
               "Reenganchar - Registrar Entrada de Cabezal"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">

            {/* Resumen de la carga */}
            <div className="bg-light rounded border p-3 mb-4">
              <Row className="g-2 text-sm">
                <Col xs={5} className="text-muted fw-medium">Ingreso / Remisión:</Col>
                <Col xs={7} className="fw-bold text-end">{selectedRecepcion.numero_entrada} / {selectedCarga.remision}</Col>
                <Col xs={5} className="text-muted fw-medium">Proveedor:</Col>
                <Col xs={7} className="fw-semibold text-end text-truncate">{selectedCarga.proveedor?.nombre}</Col>
                <Col xs={5} className="text-muted fw-medium">Sacos Declarados:</Col>
                <Col xs={7} className="fw-semibold text-end">{selectedCarga.cantidad_sacos}</Col>
              </Row>
              {modalMode !== "ENTRADA" && selectedCarga.pesada_entrada && (
                <Row className="mt-2 pt-2 border-top g-0 align-items-center text-primary">
                  <Col className="fw-semibold">Peso Bruto de Referencia:</Col>
                  <Col xs="auto" className="font-monospace fw-bold">
                    {Number(selectedCarga.pesada_entrada).toLocaleString("en-US", { minimumFractionDigits: 2 })} LB
                  </Col>
                </Row>
              )}
            </div>

            {/* Lectura de báscula */}
            <Form.Group className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Form.Label className="fw-bold mb-0">Lectura del Indicador de la Báscula</Form.Label>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="d-flex align-items-center gap-2"
                  onClick={handleCapturarBascula}
                  disabled={capturingScale || submitting}
                >
                  {capturingScale ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
                  Capturar de Báscula
                </Button>
              </div>
              <InputGroup size="lg">
                <InputGroup.Text>
                  <Weight size={20} />
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0.01"
                  autoFocus
                  required
                  value={pesoInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || Number(val) >= 0) onPesoChange(val);
                  }}
                  className="text-end font-monospace fw-bold fs-3"
                  placeholder="0.00"
                  style={{ MozAppearance: "textfield" } as React.CSSProperties}
                  onWheel={(e) => e.currentTarget.blur()}
                />
                <InputGroup.Text className="fw-bold">LB</InputGroup.Text>
              </InputGroup>
              <Form.Text className="text-muted">
                Presione el botón para capturar automáticamente o escriba el peso manualmente.
              </Form.Text>
            </Form.Group>

            {/* Selector de Bodega (Solo en ENTRADA) */}
            {modalMode === "ENTRADA" && (
              <Form.Group className="pt-3 border-top">
                <Form.Label className="fw-bold">Bodega de Descarga</Form.Label>
                <Form.Select value={bodegaSearch} onChange={(e) => onBodegaChange(e.target.value)} required>
                  <option value="">Seleccione a qué bodega física debe dirigirse...</option>
                  {bodegas.map((b) => (
                    <option key={b.id_bodega} value={b.id_bodega.toString()}>{b.nombre}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            {/* Selector de Placa (Solo en CAMBIOS DE CABEZAL) */}
            {(modalMode === "SALIDA_CABEZAL" || modalMode === "ENTRADA_CABEZAL") && (
              <Form.Group className="pt-3 border-top">
                <Form.Label className="fw-bold">
                  {modalMode === "SALIDA_CABEZAL" ? "Placa del Cabezal que SALE" : "Placa del Cabezal que ENTRA"}
                </Form.Label>
                <Form.Select
                  value={placaInput}
                  onChange={(e) => onPlacaChange(e.target.value)}
                  required
                  disabled={modalMode === "SALIDA_CABEZAL"}
                >
                  <option value="">Seleccione la placa...</option>
                  {placasCabezal.map((p) => (
                    <option key={p.id_placa_cabezal} value={p.id_placa_cabezal.toString()}>{p.placa}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose} disabled={submitting}>Cancelar</Button>
            <Button variant="primary" type="submit" disabled={submitting} className="flex items-center gap-2">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Capturar Peso
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Modal>
  );
}
