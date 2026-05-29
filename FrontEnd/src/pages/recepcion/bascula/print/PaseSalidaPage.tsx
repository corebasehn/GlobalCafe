import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBoletaPesadaApi } from "../../../../api/reception.api";

const PAGE_W = "24.13cm";
const PAGE_H = "13.97cm";

function fmtFechaHora(d: Date | null) {
  if (!d || isNaN(d.getTime())) return "—";
  return (
    d.toLocaleDateString("es-HN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) +
    " " +
    d.toLocaleTimeString("es-HN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );
}

export default function PaseSalidaPage() {
  const { idDetalle } = useParams<{ idDetalle: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idDetalle) return;
    getBoletaPesadaApi(Number(idDetalle))
      .then(setData)
      .catch(() => setError("Error al obtener los datos del pase de salida."))
      .finally(() => setLoading(false));
  }, [idDetalle]);

  useEffect(() => {
    if (!data || loading) return;
    const t = setTimeout(() => window.print(), 700);
    return () => clearTimeout(t);
  }, [data, loading]);

  if (loading) {
    return (
      <div style={{ padding: "2cm", textAlign: "center", fontFamily: "Arial" }}>
        Cargando pase de salida...
      </div>
    );
  }
  if (error) {
    return <div style={{ padding: "2cm", color: "red", fontFamily: "Arial" }}>{error}</div>;
  }
  if (!data) return null;

  const recepcion = data.detalle?.recepcion;
  const ahora = new Date();

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @page {
          size: ${PAGE_W} ${PAGE_H};
          margin: 3cm 1.5cm 2cm 1.5cm;
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 8.5pt;
          background: white;
        }

        @media screen {
          body {
            background: #888;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 16px;
            gap: 12px;
          }
          .pase-paper {
            width: ${PAGE_W};
            min-height: ${PAGE_H};
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.4);
            padding: 3cm 1.5cm 2cm 1.5cm;
          }
          .no-print {
            background: white;
            border-radius: 6px;
            padding: 8px 16px;
            display: flex;
            gap: 10px;
          }
          .no-print button {
            padding: 6px 16px;
            border: 1px solid #555;
            border-radius: 4px;
            cursor: pointer;
            font-size: 9pt;
          }
        }

        @media print {
          .pase-paper { padding: 0; }
          .no-print { display: none !important; }
        }

        /* ===== ESTILOS DEL PASE DE SALIDA ===== */
        .ps-header {
          text-align: center;
          margin-bottom: 8px;
          border-bottom: 2px solid #000;
          padding-bottom: 4px;
        }
        .ps-titulo  { font-size: 13pt; font-weight: bold; letter-spacing: 2px; }
        .ps-subtitulo { font-size: 8pt; color: #555; margin-top: 1px; }

        .ps-fecha-emision {
          text-align: right;
          font-size: 7.5pt;
          margin-bottom: 8px;
          font-style: italic;
        }

        .ps-body {
          border: 1.5px solid #000;
          padding: 6px 12px;
          margin-bottom: 8px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3px 10px;
        }

        .ps-row {
          display: flex;
          align-items: baseline;
          font-size: 8.5pt;
          border-bottom: 1px dotted #ccc;
          padding-bottom: 3px;
          gap: 6px;
        }
        .ps-row:last-child { border-bottom: none; padding-bottom: 0; }
        .ps-row .ps-lbl {
          font-weight: bold;
          white-space: nowrap;
          min-width: 110px;
          font-size: 8pt;
          color: #333;
        }
        .ps-row .ps-val {
          font-size: 8.5pt;
          font-weight: 600;
          flex: 1;
        }

        .ps-obs {
          border: 1.5px solid #000;
          padding: 5px 12px;
          min-height: 28px;
          font-size: 8.5pt;
          margin-bottom: 10px;
        }
        .ps-obs-lbl { font-weight: bold; font-size: 8pt; margin-bottom: 2px; }

        .ps-firmas {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          font-size: 8pt;
        }
        .ps-firma {
          text-align: center;
          width: 30%;
          border-top: 1px solid #000;
          padding-top: 4px;
        }
      `}</style>

      {/* Botones en pantalla */}
      <div className="no-print">
        <button onClick={() => window.print()}>🖨️ Imprimir</button>
        <button onClick={() => window.close()}>✕ Cerrar</button>
      </div>

      {/* Papel imprimible */}
      <div className="pase-paper">

        {/* ENCABEZADO */}
        <div className="ps-header">
          <div className="ps-titulo">PASE DE SALIDA</div>
          <div className="ps-subtitulo">Autorización de salida del recinto</div>
        </div>

        {/* Fecha de emisión */}
        <div className="ps-fecha-emision">
          Emitido el: <strong>{fmtFechaHora(ahora)}</strong>
        </div>

        {/* Datos del vehículo — 2 columnas */}
        <div className="ps-body">
          <div className="ps-row">
            <span className="ps-lbl">DESPACHO Nº:</span>
            <span className="ps-val">{recepcion?.numero_entrada ?? "—"}</span>
          </div>
          <div className="ps-row">
            <span className="ps-lbl">FECHA Y HORA:</span>
            <span className="ps-val">{fmtFechaHora(ahora)}</span>
          </div>
          <div className="ps-row">
            <span className="ps-lbl">PLACA CABEZAL:</span>
            <span className="ps-val">{recepcion?.placa_cabezal?.placa ?? "—"}</span>
          </div>
          <div className="ps-row">
            <span className="ps-lbl">PLACA FURGÓN:</span>
            <span className="ps-val">{recepcion?.placa_furgon?.placa ?? "—"}</span>
          </div>
          <div className="ps-row">
            <span className="ps-lbl">CONDUCTOR:</span>
            <span className="ps-val">{recepcion?.conductor?.nombre ?? "—"}</span>
          </div>
          <div className="ps-row">
            <span className="ps-lbl">TIPO VEHÍCULO:</span>
            <span className="ps-val">{recepcion?.tipo_vehiculo ?? "—"}</span>
          </div>
        </div>

        {/* Observaciones */}
        <div className="ps-obs">
          <div className="ps-obs-lbl">OBSERVACIONES:</div>
          <div>{recepcion?.observaciones || "Sin observaciones."}</div>
        </div>

        {/* Firmas */}
        <div className="ps-firmas">
          <div className="ps-firma">HECHO POR</div>
          <div className="ps-firma">AUTORIZADO POR</div>
          <div className="ps-firma">FIRMA DEL MOTORISTA</div>
        </div>

      </div>
    </>
  );
}
