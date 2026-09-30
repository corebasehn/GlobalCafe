import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getBoletaDevolucionApi } from "../../../../api/reception.api";
import { Row, Col } from "react-bootstrap";

export default function BoletaDevolucionPage() {
  const { idDetalle } = useParams<{ idDetalle: string }>();
  const [searchParams] = useSearchParams();
  const esCopia = searchParams.get("copia") === "true";

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idDetalle) return;
    getBoletaDevolucionApi(Number(idDetalle))
      .then(setData)
      .catch(() => setError("Error al obtener los datos del reporte de devolución."))
      .finally(() => setLoading(false));
  }, [idDetalle]);

  useEffect(() => {
    if (!data || loading) return;
    const t = setTimeout(() => window.print(), 700);
    return () => clearTimeout(t);
  }, [data, loading]);

  if (loading) {
    return (
      <div style={{ padding: "3cm", textAlign: "center", fontFamily: "sans-serif" }}>
        Cargando reporte de devolución...
      </div>
    );
  }
  if (error) {
    return <div style={{ padding: "3cm", color: "red", fontFamily: "sans-serif" }}>{error}</div>;
  }
  if (!data) return null;

  const recepcion = data.recepcion;
  const analisis = data.analisis_calidad?.[0];
  const fechaRechazo = analisis?.fecha_analisis
    ? new Date(analisis.fecha_analisis).toLocaleString("es-HN")
    : data.fecha_modificacion
    ? new Date(data.fecha_modificacion).toLocaleString("es-HN")
    : new Date().toLocaleString("es-HN");

  // Extraer el motivo de gerencia (puede estar en analisis.observaciones o detalle.observaciones)
  let motivoDevolucion = "No se especificaron detalles adicionales.";
  if (analisis?.observaciones) {
    motivoDevolucion = analisis.observaciones;
  } else if (data.observaciones) {
    motivoDevolucion = data.observaciones;
  }

  const catadorNombre = analisis?.catador?.nombre ?? "Gerencia / Catador";
  const conductorNombre = recepcion?.conductor?.nombre ?? "Transportista / Productor";

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @page {
          size: letter portrait;
          margin: 1.5cm;
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
          background: white;
          color: #000;
        }

        @media screen {
          body {
            background: #888;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 24px;
            gap: 16px;
          }
          .devolucion-paper {
            width: 21.59cm;
            min-height: 27.94cm;
            background: white;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            padding: 2cm 2cm;
          }
          .no-print {
            background: white;
            border-radius: 6px;
            padding: 10px 20px;
            display: flex;
            gap: 12px;
          }
          .no-print button {
            padding: 8px 20px;
            border: 1px solid #555;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
          }
        }

        @media print {
          .devolucion-paper {
            width: 100%;
            padding: 0;
            border: none !important;
            box-shadow: none !important;
          }
          .no-print { display: none !important; }
        }

        .dev-header {
          text-align: center;
          border-bottom: 2px solid #000;
          padding-bottom: 14px;
          margin-bottom: 24px;
        }
        .dev-titulo-empresa {
          font-size: 22px;
          font-weight: bold;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }
        .dev-subtitulo {
          font-size: 15px;
          font-weight: bold;
          color: #c00000;
          letter-spacing: 1.5px;
        }

        .dev-grid-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 24px;
          font-size: 13px;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #ddd;
        }
        .dev-grid-info .full-row {
          grid-column: span 2;
        }
        .dev-lbl {
          font-weight: bold;
          margin-right: 6px;
        }

        .dev-seccion-motivo {
          margin-bottom: 40px;
        }
        .dev-seccion-titulo {
          font-size: 13px;
          font-weight: bold;
          text-transform: uppercase;
          border-bottom: 1px solid #000;
          padding-bottom: 6px;
          margin-bottom: 12px;
        }
        .dev-motivo-box {
          padding: 14px 16px;
          background: #fbfbfb;
          border: 1px solid #000;
          border-radius: 4px;
          font-size: 13px;
          line-height: 1.6;
          white-space: pre-wrap;
          min-height: 100px;
        }

        .dev-firmas {
          margin-top: 80px;
          display: flex;
          justify-content: space-around;
          text-align: center;
          font-size: 12px;
        }
        .dev-firma-col {
          width: 40%;
        }
        .dev-linea-firma {
          border-top: 1px solid #000;
          padding-top: 6px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .dev-nombre-firma {
          font-size: 11px;
          color: #555;
          margin-top: 4px;
        }

        .dev-copia {
          position: absolute;
          top: 1.5cm;
          right: 2cm;
          background: #c00000;
          color: white;
          font-size: 11px;
          font-weight: bold;
          letter-spacing: 2px;
          padding: 3px 12px;
          border-radius: 3px;
        }
      `}</style>

      <div className="no-print">
        <button onClick={() => window.print()}>Imprimir Reporte</button>
        <button onClick={() => window.close()}>Cerrar</button>
      </div>

      <div className="devolucion-paper" style={{ position: "relative" }}>
        {esCopia && <div className="dev-copia">COPIA</div>}

        <div className="dev-header">
          <div className="dev-titulo-empresa">GLOBAL COFFEE GROUP</div>
          <div className="dev-subtitulo">REPORTE DE DEVOLUCIÓN DE CAFÉ</div>
        </div>

        <div className="dev-grid-info">
          <div>
            <span className="dev-lbl">N° Ingreso:</span>
            <span>{recepcion?.numero_entrada ?? "—"}</span>
          </div>
          <div>
            <span className="dev-lbl">N° Remisión:</span>
            <span>{data.remision ?? "—"}</span>
          </div>
          <div className="full-row">
            <span className="dev-lbl">Proveedor / Finca:</span>
            <span>{data.proveedor?.nombre ?? "—"}</span>
          </div>
          <div>
            <span className="dev-lbl">Fecha/Hora Rechazo:</span>
            <span>{fechaRechazo}</span>
          </div>
          <div>
            <span className="dev-lbl">Volumen Devuelto:</span>
            <span>
              {Number(data.cantidad_qq).toFixed(2)} QQ
              {data.cantidad_sacos != null && ` (${data.cantidad_sacos} sacos)`}
            </span>
          </div>
          {recepcion?.placa_cabezal && (
            <div>
              <span className="dev-lbl">Placas:</span>
              <span>
                {recepcion.placa_cabezal.placa}
                {recepcion.placa_furgon ? ` / ${recepcion.placa_furgon.placa}` : ""}
              </span>
            </div>
          )}
          {data.tipo_cafe && (
            <div>
              <span className="dev-lbl">Tipo Café:</span>
              <span>{data.tipo_cafe.tipo_cafe}</span>
            </div>
          )}
        </div>

        <div className="dev-seccion-motivo">
          <div className="dev-seccion-titulo">Motivo de la Devolución (Veredicto de Gerencia)</div>
          <div className="dev-motivo-box">
            {motivoDevolucion}
          </div>
        </div>

        <div className="dev-firmas">
          <div className="dev-firma-col">
            <div className="dev-linea-firma">Firma Gerencia / Catador</div>
            <div className="dev-nombre-firma">{catadorNombre}</div>
          </div>
          <div className="dev-firma-col">
            <div className="dev-linea-firma">Firma Transportista / Productor</div>
            <div className="dev-nombre-firma">{conductorNombre}</div>
          </div>
        </div>
      </div>
    </>
  );
}
