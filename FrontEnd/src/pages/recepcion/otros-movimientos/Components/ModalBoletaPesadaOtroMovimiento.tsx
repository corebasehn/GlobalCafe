import { useEffect, useState } from "react";
import { Modal, Button, Spinner, Table, Row, Col } from "react-bootstrap";
import { Printer } from "lucide-react";
import toast from "react-hot-toast";
import { getBoletaPesadaOtroMovimientoApi } from "../../../../api/reception.api";

interface Props {
  show: boolean;
  onHide: () => void;
  idDetalle: number | null;
}

export default function ModalBoletaPesadaOtroMovimiento({
  show,
  onHide,
  idDetalle,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    if (show && idDetalle) {
      loadBoleta(idDetalle);
    } else {
      setData(null);
    }
  }, [show, idDetalle]);

  const loadBoleta = async (id: number) => {
    try {
      setLoading(true);
      const res = await getBoletaPesadaOtroMovimientoApi(id);
      setData(res);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los datos del comprobante de pesada");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!show) return null;

  const recepcion = data?.recepcion;
  const tara = data?.pesada_entrada ? Number(data.pesada_entrada) : 0;
  const bruto = data?.pesada_salida ? Number(data.pesada_salida) : 0;
  const neto = data?.peso_neto ? Number(data.peso_neto) : bruto - tara;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="d-print-none bg-primary text-white">
        <Modal.Title className="d-flex align-items-center gap-2 fs-6">
          <Printer size={20} />
          Ticket de Báscula - Pesada de Casulla
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4 print-container">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Cargando comprobante...</p>
          </div>
        ) : data ? (
          <div className="border p-4 rounded bg-white shadow-sm font-monospace text-dark">
            {/* Encabezado */}
            <div className="text-center border-bottom pb-3 mb-3">
              <h4 className="fw-bold mb-1">GLOBAL CAFÉ</h4>
              <h6 className="text-muted mb-1">COMPROBANTE DE PESAJE DE SUBPRODUCTOS / CASULLA</h6>
              <div className="small text-muted">
                {recepcion?.sucursal?.nombre || "Planta Principal"} - {recepcion?.municipio?.nombre || "Danlí, El Paraíso"}
              </div>
            </div>

            {/* Datos Generales */}
            <Row className="mb-3 g-2 small">
              <Col xs={6}>
                <strong>N° Movimiento:</strong> {recepcion?.numero_entrada}
              </Col>
              <Col xs={6} className="text-end">
                <strong>Fecha Emisión:</strong> {new Date().toLocaleString()}
              </Col>
              <Col xs={6}>
                <strong>Vehículo:</strong> {recepcion?.tipo_vehiculo}
              </Col>
              <Col xs={6} className="text-end">
                <strong>Placa Cabezal:</strong> {recepcion?.placa_cabezal?.placa}
              </Col>
              {recepcion?.placa_furgon && (
                <Col xs={12} className="text-end">
                  <strong>Placa Furgón:</strong> {recepcion?.placa_furgon?.placa}
                </Col>
              )}
              <Col xs={6}>
                <strong>Conductor:</strong> {recepcion?.conductor?.nombre}
              </Col>
              <Col xs={6} className="text-end">
                <strong>Transporte:</strong> {recepcion?.conductor?.transporte?.nombre || "Particular"}
              </Col>
              <Col xs={6}>
                <strong>Cliente / Destino:</strong> {data?.proveedor?.nombre || "General"}
              </Col>
              <Col xs={6} className="text-end">
                <strong>Ref / Remisión:</strong> {data?.remision || "N/A"}
              </Col>
            </Row>

            {/* Tabla de Pesajes */}
            <Table bordered className="text-center my-3">
              <thead className="table-light">
                <tr>
                  <th>Concepto</th>
                  <th>Fecha y Hora</th>
                  <th>Peso (Libras)</th>
                  <th>Equivalente (QQ)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-start">
                    <strong>1ra Pesada:</strong> Tara (Vehículo Vacío)
                  </td>
                  <td>{data?.fecha_entrada_bascula ? new Date(data.fecha_entrada_bascula).toLocaleString() : "Pendiente"}</td>
                  <td className="fw-semibold">{tara.toLocaleString()} LB</td>
                  <td>{(tara / 100).toFixed(2)} QQ</td>
                </tr>
                <tr>
                  <td className="text-start">
                    <strong>2da Pesada:</strong> Peso Bruto (Vehículo Cargado)
                  </td>
                  <td>{data?.fecha_salida_bascula ? new Date(data.fecha_salida_bascula).toLocaleString() : "Pendiente"}</td>
                  <td className="fw-semibold">{bruto ? `${bruto.toLocaleString()} LB` : "--"}</td>
                  <td>{bruto ? `${(bruto / 100).toFixed(2)} QQ` : "--"}</td>
                </tr>
                <tr className="table-success fs-6">
                  <td className="text-start fw-bold">PESO NETO (CASULLA):</td>
                  <td>--</td>
                  <td className="fw-bold">{neto > 0 ? `${neto.toLocaleString()} LB` : "--"}</td>
                  <td className="fw-bold">{neto > 0 ? `${(neto / 100).toFixed(2)} QQ` : "--"}</td>
                </tr>
              </tbody>
            </Table>

            {data?.observaciones && (
              <div className="small border p-2 rounded mb-4 bg-light">
                <strong>Observaciones:</strong> {data.observaciones}
              </div>
            )}

            {/* Firmas */}
            <Row className="mt-5 pt-4 text-center small">
              <Col xs={6}>
                <div className="border-top mx-3 pt-2">
                  <strong>Operador de Báscula</strong>
                </div>
              </Col>
              <Col xs={6}>
                <div className="border-top mx-3 pt-2">
                  <strong>Conductor / Recibido Conforme</strong>
                </div>
              </Col>
            </Row>
          </div>
        ) : null}
      </Modal.Body>
      <Modal.Footer className="d-print-none bg-light">
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handlePrint} disabled={!data || loading}>
          <Printer size={16} className="me-1" /> Imprimir Ticket
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
