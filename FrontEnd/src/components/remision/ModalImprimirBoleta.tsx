import { Printer } from "lucide-react";
import { Button, Modal } from "react-bootstrap";
import { Recepcion } from "../../api/reception.api";
import { Conductor, PlacaCabezal, PlacaFurgon, Proveedor, Transporte, Municipio } from "../../api/catalogs.api";

type Props = {
  show: boolean;
  recepcion: Recepcion | null;
  conductores: Conductor[];
  transportes: Transporte[];
  placasCabezal: PlacaCabezal[];
  placasFurgon: PlacaFurgon[];
  proveedores: Proveedor[];
  municipios: Municipio[];
  onHide: () => void;
  onConfirmPrint: () => void;
};

export default function ModalImprimirBoleta({
  show, recepcion,
  conductores, transportes, placasCabezal, placasFurgon, proveedores, municipios,
  onHide, onConfirmPrint,
}: Readonly<Props>) {
  if (!recepcion) return null;

  const cond = conductores.find(c => c.id_conductor === recepcion.id_conductor);
  const transp = transportes.find(t => t.id_transporte === cond?.id_transporte);
  const cab = placasCabezal.find(p => p.id_placa_cabezal === recepcion.id_placa_cabezal)?.placa;
  const fur = recepcion.id_placa_furgon
    ? placasFurgon.find(p => p.id_placa_furgon === recepcion.id_placa_furgon)?.placa
    : "";
  const muni = municipios.find(m => m.id_municipio === recepcion.id_municipio);
  const depto = muni ? (muni as any).departamento?.nombre : "";
  const origen = muni ? (depto ? `${muni.nombre}, ${depto}` : muni.nombre) : "N/A";

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Imprimir Boleta de Ingreso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <style>{`
          @media print {
            @page { margin: 0; size: 9.5in 11in; }
            html, body {
              width: 9.5in !important;
              height: 5.5in !important;
              overflow: hidden !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            body * { visibility: hidden; }
            #print-area, #print-area * { visibility: visible; }
            #print-area {
              position: absolute;
              left: 0; top: 0;
              width: 9.5in; height: 11in;
              font-family: 'Courier New', Courier, monospace;
              font-size: 11pt;
              font-weight: bold;
              color: black;
            }
            .print-field { position: absolute; }
            .coord-numero    { top: 1.0cm; left: 14.5cm; }
            .coord-fecha     { top: 1.5cm; left: 14.5cm; }
            .coord-reimpresion { top: 2.0cm; left: 14.5cm; font-size: 14pt; border: 2px solid black; padding: 2px; }
            .coord-transp    { top: 3.0cm; left: 1.5cm; }
            .coord-conduc    { top: 3.5cm; left: 1.5cm; }
            .coord-placas    { top: 4.0cm; left: 1.5cm; }
            .coord-origen    { top: 3.0cm; left: 11.5cm; }
            .coord-marchamo  { top: 3.5cm; left: 11.5cm; }
            .coord-tabla     { top: 5.5cm; left: 1.5cm; width: 18cm; }
          }
        `}</style>

        <div className="bg-warning-subtle border border-2 border-warning rounded-3 p-4 mb-4">
          <p className="text-warning-emphasis mb-0 fw-medium d-flex align-items-center gap-2 small">
            <Printer className="w-4 h-4" />
            Revise los datos. Al imprimir, el sistema usará las coordenadas para el formato preimpreso.
          </p>
        </div>

        <div id="print-area">
          <div className="print-field coord-numero">N° Ingreso: {recepcion.numero_entrada}</div>
          <div className="print-field coord-fecha">Fecha: {new Date(recepcion.fecha_entrada).toLocaleString()}</div>
          {recepcion.cantidad_impresiones > 0 && (
            <div className="print-field coord-reimpresion">*** REIMPRESIÓN ***</div>
          )}
          <div className="print-field coord-transp">Transporte: {transp?.nombre || "N/A"}</div>
          <div className="print-field coord-conduc">Conductor: {cond?.nombre || "N/A"}</div>
          <div className="print-field coord-placas">Placas: {cab} {fur ? ` / ${fur}` : ""}</div>
          <div className="print-field coord-origen">Origen del café: {origen}</div>
          <div className="print-field coord-marchamo">Marchamos: {recepcion.marchamo || "N/A"}</div>

          <table className="print-field coord-tabla w-100 text-start">
            <thead className="border-bottom border-dark">
              <tr>
                <th className="pb-1">Remisión</th>
                <th className="pb-1">Proveedor</th>
                <th className="pb-1 text-center">Sacos</th>
                <th className="pb-1 text-end">QQ</th>
              </tr>
            </thead>
            <tbody>
              {recepcion.detalles.map(d => (
                <tr key={d.id_detalle_recepcion}>
                  <td>{d.remision}</td>
                  <td>{proveedores.find(p => p.id_proveedor === d.id_proveedor)?.nombre}</td>
                  <td className="text-center">{d.cantidad_sacos}</td>
                  <td className="text-end">{Number(d.cantidad_qq).toFixed(2)} QQ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" onClick={onConfirmPrint} className="d-flex align-items-center gap-2">
          <Printer className="w-4 h-4" /> Imprimir Formato
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
