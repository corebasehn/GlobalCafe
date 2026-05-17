import { Printer } from "lucide-react";
import { Modal, Button } from "react-bootstrap";
import type { MuestraGerencia } from "../Containers/AprobacionGerenciaPage";

export interface DevolucionModalProps {
  printData: { muestra: MuestraGerencia; motivo: string } | null;
  onClose: () => void;
}

export default function DevolucionModal({ printData, onClose }: DevolucionModalProps) {
  return (
    <Modal show={!!printData} onHide={onClose} size="lg">
      {printData && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Reporte de Devolución Generado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <style>{`
              @media print {
                @page { margin: 0; size: letter portrait; }
                html, body {
                  height: 100vh !important;
                  overflow: hidden !important;
                  margin: 0 !important;
                  padding: 0 !important;
                }
                body * { visibility: hidden; }
                * { transform: none !important; }
                #print-devolucion {
                  position: fixed !important;
                  left: 0.5cm !important;
                  top: 0.5cm !important;
                  margin: 0 !important;
                  padding: 1cm !important;
                  width: calc(100% - 1cm) !important;
                  visibility: visible !important;
                  font-family: sans-serif;
                  border: none !important;
                  border: 2px solid black !important;
                  box-sizing: border-box !important;
                }
                #print-devolucion * { visibility: visible !important; }
              }
            `}</style>

            <div className="bg-red-50 p-4 rounded-xl border-2 border-dashed border-red-200 text-neutral-800 mb-4">
              <p className="text-sm text-red-700 mb-0 font-medium flex items-center gap-2">
                <Printer className="w-4 h-4" />
                Se ha generado el reporte de rechazo. Imprímalo como respaldo para el transportista.
              </p>
            </div>

            <div id="print-devolucion" className="p-8 border-2 border-black rounded-lg bg-white text-black">
              <div className="text-center border-b-2 border-black pb-4 mb-4">
                <h1 className="text-2xl font-bold">GLOBAL COFFEE GROUP</h1>
                <h2 className="text-lg uppercase mt-1 font-semibold text-red-600">REPORTE DE DEVOLUCIÓN DE CAFÉ</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <p className="mb-0"><strong>N° Ingreso:</strong> {printData.muestra.numero_entrada}</p>
                <p className="mb-0"><strong>N° Remisión:</strong> {printData.muestra.remision}</p>
                <p className="col-span-2 mb-0"><strong>Proveedor / Finca:</strong> {printData.muestra.proveedor_nombre}</p>
                <p className="mb-0"><strong>Fecha/Hora Rechazo:</strong> {new Date().toLocaleString()}</p>
                <p className="mb-0"><strong>Volumen Aprox:</strong> {printData.muestra.cantidad_qq.toFixed(2)} QQ</p>
              </div>

              <div className="mb-8">
                <h3 className="font-bold border-b border-black mb-2 text-sm">Motivo de la Devolución (Veredicto de Gerencia)</h3>
                <p className="text-sm mt-2 whitespace-pre-wrap">{printData.motivo}</p>
              </div>

              <div className="mt-16 grid grid-cols-2 gap-8 text-center text-sm">
                <div><div className="border-t border-black pt-2">Firma Gerencia / Catador</div></div>
                <div><div className="border-t border-black pt-2">Firma Transportista / Productor</div></div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Cerrar</Button>
            <Button variant="primary" onClick={() => window.print()} className="flex items-center gap-2">
              <Printer className="w-4 h-4" /> Imprimir Reporte
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}
