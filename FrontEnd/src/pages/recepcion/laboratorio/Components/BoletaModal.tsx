import { Printer } from "lucide-react";
import { Modal, Button } from "react-bootstrap";
import type { MuestraPendiente } from "../Containers/LaboratorioPage";

interface BoletaModalProps {
  muestra: MuestraPendiente | null;
  onClose: () => void;
}

export default function BoletaModal({ muestra, onClose }: BoletaModalProps) {
  return (
    <Modal show={!!muestra} onHide={onClose} size="lg">
      {muestra && muestra.analisis && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Imprimir Boleta</Modal.Title>
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
                #print-boleta {
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
                #print-boleta * { visibility: visible !important; }
              }
            `}</style>

            <div className="bg-amber-50 p-4 rounded-xl border-2 border-dashed border-amber-200 text-neutral-800 mb-4">
              <p className="text-sm text-amber-700 mb-0 font-medium flex items-center gap-2">
                <Printer className="w-4 h-4" />
                Vista previa de la boleta a imprimir.
              </p>
            </div>

            <div
              id="print-boleta"
              style={{ fontFamily: "Arial, sans-serif", padding: "28px", border: "2px solid black", backgroundColor: "white", color: "black", fontSize: "13px" }}
            >
              {/* Encabezado */}
              <div style={{ textAlign: "center", borderBottom: "2px solid black", paddingBottom: "12px", marginBottom: "16px" }}>
                <p style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 2px" }}>GLOBAL COFFEE GROUP</p>
                <p style={{ fontSize: "13px", fontWeight: "600", margin: 0, letterSpacing: "0.05em" }}>BOLETA DE MUESTRA PREVIA</p>
              </div>

              {/* Datos — cuadrícula 2 columnas */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: "6px", columnGap: "24px", marginBottom: "16px" }}>
                <p style={{ margin: 0 }}><strong>N° Entrada:</strong> {muestra.numero_entrada}</p>
                <p style={{ margin: 0 }}><strong>N° Remisión:</strong> {muestra.remision}</p>
                <p style={{ margin: 0, gridColumn: "span 2" }}><strong>Proveedor:</strong> {muestra.proveedor_nombre}</p>
                <p style={{ margin: 0 }}><strong>Fecha/Hora:</strong> {new Date(muestra.analisis.fecha_analisis).toLocaleString()}</p>
                <p style={{ margin: 0 }}><strong>Catador:</strong> {muestra.analisis.catador?.nombre || "—"}</p>
                <p style={{ margin: 0 }}><strong>Humedad:</strong> {muestra.analisis.humedad}%</p>
                <p style={{ margin: 0 }}><strong>Daño:</strong> {muestra.analisis.dano}%</p>
                <p style={{ margin: 0 }}><strong>Calidad:</strong> {muestra.analisis.calidad?.nombre || "N/A"}</p>
                <p style={{ margin: 0 }}><strong>Rendimiento 1:</strong> {muestra.analisis.primer_rendimiento ?? "N/A"}</p>
                <p style={{ margin: 0 }}><strong>Rendimiento 2:</strong> {muestra.analisis.segundo_rendimiento ?? "N/A"}</p>
              </div>

              {/* 3 columnas: Defectos / Zarandas / Taza */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 16px", marginBottom: "16px" }}>
                {/* Defectos */}
                <div>
                  <p style={{ fontWeight: "bold", borderBottom: "1px solid black", paddingBottom: "4px", textAlign: "center", margin: "0 0 6px" }}>Defectos Físicos</p>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      {muestra.analisis.analisis_defectos?.map((d) => (
                            <tr key={d.id_analisis_defectos}>
                              <td style={{ padding: "2px 0" }}>{d.defecto?.nombre}</td>
                              <td style={{ padding: "2px 0", textAlign: "right" }}>{d.cantidad}</td>
                            </tr>
                          )) ?? <tr><td colSpan={2} style={{ textAlign: "center", fontStyle: "italic", color: "#666", padding: "4px 0" }}>Sin defectos</td></tr>
                      }
                    </tbody>
                  </table>
                </div>

                {/* Zarandas */}
                <div>
                  <p style={{ fontWeight: "bold", borderBottom: "1px solid black", paddingBottom: "4px", textAlign: "center", margin: "0 0 6px" }}>Zarandas / Mallas</p>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      {muestra.analisis.analisis_zarandas?.map((z) => (
                            <tr key={z.id_analisis_zarandas}>
                              <td style={{ padding: "2px 0" }}>{z.zaranda?.nombre}</td>
                              <td style={{ padding: "2px 0", textAlign: "right" }}>{z.cantidad}</td>
                            </tr>
                          )) ?? <tr><td colSpan={2} style={{ textAlign: "center", fontStyle: "italic", color: "#666", padding: "4px 0" }}>Sin zarandas</td></tr>
                      }
                    </tbody>
                  </table>
                </div>

                {/* Atributos de Taza */}
                <div>
                  <p style={{ fontWeight: "bold", borderBottom: "1px solid black", paddingBottom: "4px", textAlign: "center", margin: "0 0 6px" }}>Atributos de Taza</p>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      {muestra.analisis.analisis_tazas?.map((t) => (
                            <tr key={t.id_analisis_tazas}>
                              <td style={{ padding: "2px 0" }}>{t.taza?.nombre}</td>
                              <td style={{ padding: "2px 0", textAlign: "right" }}>{t.cantidad}</td>
                            </tr>
                          )) ?? <tr><td colSpan={2} style={{ textAlign: "center", fontStyle: "italic", color: "#666", padding: "4px 0" }}>Sin atributos</td></tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Observaciones */}
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontWeight: "bold", margin: "0 0 4px" }}>Observaciones:</p>
                <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{muestra.analisis.observaciones || "Ninguna."}</p>
              </div>

              {/* Pie */}
              <div style={{ borderTop: "2px dashed black", paddingTop: "12px", textAlign: "center" }}>
                <p style={{ fontWeight: "bold", fontSize: "15px", margin: 0, letterSpacing: "0.02em" }}>PENDIENTE DE APROBACIÓN DE GERENCIA</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Cerrar</Button>
            <Button variant="primary" onClick={() => window.print()} className="flex items-center gap-2">
              <Printer className="w-4 h-4" /> Imprimir Boleta
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}
