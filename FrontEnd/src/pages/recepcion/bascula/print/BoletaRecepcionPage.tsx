import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../../auth/useAuth";
import { getBoletaRecepcionApi } from "../../../../api/reception.api";

const PAGE_W = "24.13cm";
const PAGE_H = "13.97cm";

export default function BoletaRecepcionPage() {
  const { idRecepcion } = useParams<{ idRecepcion: string }>();
  const [searchParams] = useSearchParams();
  const esCopia = searchParams.get("copia") === "true";
  const { profile } = useAuth();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fontFamily, setFontFamily] = useState<string>("Courier New");
  const [fontSize, setFontSize] = useState<string>("9pt");

  const getFontSize = (multiplier: number) => {
    const baseSize = parseFloat(fontSize);
    const unit = fontSize.replace(/[0-9.]/g, "");
    return `${(baseSize * multiplier).toFixed(2)}${unit}`;
  };

  useEffect(() => {
    fetch("/settings.json")
      .then((res) => res.json())
      .then((settings) => {
        if (settings?.printSettings?.fontFamily) {
          setFontFamily(settings.printSettings.fontFamily);
        }
        if (settings?.printSettings?.fontSize) {
          setFontSize(settings.printSettings.fontSize);
        }
      })
      .catch(() => console.warn("No se pudo cargar settings.json"));
  }, []);

  useEffect(() => {
    if (!idRecepcion) return;
    getBoletaRecepcionApi(Number(idRecepcion))
      .then(setData)
      .catch(() => setError("Error al obtener los datos de la boleta de recepción."))
      .finally(() => setLoading(false));
  }, [idRecepcion]);

  useEffect(() => {
    if (!data || loading) return;
    const t = setTimeout(() => window.print(), 700);
    return () => clearTimeout(t);
  }, [data, loading]);

  if (loading) {
    return (
      <div style={{ padding: "2cm", textAlign: "center", fontFamily }}>
        Cargando boleta de recepción...
      </div>
    );
  }
  if (error) {
    return <div style={{ padding: "2cm", color: "red", fontFamily }}>{error}</div>;
  }
  if (!data) return null;

  const cabezal = data.placa_cabezal?.placa ?? "—";
  const furgon = data.placa_furgon?.placa;
  const placas = furgon ? `${cabezal} / ${furgon}` : cabezal;
  const transporte = data.conductor?.transporte?.nombre ?? "—";
  const conductor = data.conductor?.nombre ?? "—";
  const depto = data.municipio?.departamento?.nombre;
  const origen = data.municipio ? (depto ? `${data.municipio.nombre}, ${depto}` : data.municipio.nombre) : "—";
  const detalles: any[] = data.detalles || [];

  const totalSacos = detalles.reduce((acc, d) => acc + (Number(d.cantidad_sacos) || 0), 0);
  const totalQq = detalles.reduce((acc, d) => acc + (Number(d.cantidad_qq) || 0), 0);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @page {
          size: ${PAGE_W} ${PAGE_H};
          margin: 3cm 1.5cm 2cm 1.5cm;
        }

        body {
          font-family: ${fontFamily}, "Courier New", Courier, monospace;
          font-size: ${fontSize};
          background: white;
          color: #000000;
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
          .boleta-paper {
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
            font-size: ${getFontSize(1.125)};
          }
        }

        @media print {
          * {
            -webkit-font-smoothing: none !important;
            font-smooth: never !important;
            text-rendering: geometricPrecision !important;
            color: #000000 !important;
          }
          body {
            color: #000000 !important;
          }
          .boleta-paper { padding: 0; }
          .no-print { display: none !important; }
        }

        .blt-header { text-align: center; margin-bottom: 4px; }
        .blt-titulo { font-size: ${getFontSize(1.1875)}; font-weight: bold; text-transform: uppercase; }

        .blt-info {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 4px;
          font-size: ${getFontSize(0.9375)};
        }
        .blt-info td { padding: 1px 4px; }
        .blt-info .lbl { font-weight: bold; white-space: nowrap; width: 85px; }

        .blt-tabla {
          width: 100%;
          border-collapse: collapse;
          margin-top: 4px;
          margin-bottom: 5px;
          font-size: ${getFontSize(0.9375)};
        }
        .blt-tabla th {
          border-bottom: 1px solid #000000;
          padding: 2px 6px;
          font-size: ${getFontSize(0.875)};
          font-weight: bold;
        }
        .blt-tabla th.tr, .blt-tabla td.tr { text-align: right; }
        .blt-tabla td { padding: 2px 6px; }

        .blt-totales {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 4px;
          font-size: ${getFontSize(0.9375)};
          border-top: 1px solid #000000;
        }
        .blt-totales td { padding: 2px 0; white-space: nowrap; width: 50%; }

        .blt-footer {
          border-top: 1px solid #000000;
          padding-top: 4px;
          font-size: ${getFontSize(0.9375)};
        }

        .blt-copia {
          position: absolute;
          top: 0;
          right: 0;
          background: #000000;
          color: white;
          font-size: ${getFontSize(0.875)};
          font-weight: bold;
          letter-spacing: 2px;
          padding: 2px 10px;
        }
      `}</style>

      <div className="no-print">
        <button onClick={() => window.print()}>Imprimir</button>
        <button onClick={() => window.close()}>Cerrar</button>
      </div>

      <div className="boleta-paper" style={{ position: "relative" }}>
        {esCopia && <div className="blt-copia">COPIA</div>}

        <div className="blt-header">
          <div className="blt-titulo">BOLETA DE INGRESO / RECEPCIÓN</div>
        </div>

        <table className="blt-info">
          <tbody>
            <tr>
              <td className="lbl">N° INGRESO:</td>
              <td style={{ width: "40%" }}>{data.numero_entrada}</td>
              <td className="lbl">FECHA:</td>
              <td>{new Date(data.fecha_entrada).toLocaleString("es-HN")}</td>
            </tr>
            <tr>
              <td className="lbl">TRANSPORTE:</td>
              <td>{transporte}</td>
              <td className="lbl">PLACAS:</td>
              <td>{placas}</td>
            </tr>
            <tr>
              <td className="lbl">CONDUCTOR:</td>
              <td>{conductor}</td>
              <td className="lbl">ORIGEN:</td>
              <td>{origen}</td>
            </tr>
            <tr>
              <td className="lbl">MARCHAMOS:</td>
              <td>{data.marchamo || "—"}</td>
              <td className="lbl">COSECHA:</td>
              <td>{data.cosecha?.cosecha || "—"}</td>
            </tr>
            {data.observaciones && (
              <tr>
                <td className="lbl">OBSERVACIÓN:</td>
                <td colSpan={3}>{data.observaciones}</td>
              </tr>
            )}
          </tbody>
        </table>

        <table className="blt-tabla">
          <thead>
            <tr>
              <th style={{ width: "22%" }}>REMISIÓN</th>
              <th style={{ width: "38%" }}>PROVEEDOR</th>
              <th style={{ width: "20%" }}>TIPO CAFÉ</th>
              <th className="tr" style={{ width: "10%" }}>SACOS</th>
              <th className="tr" style={{ width: "10%" }}>QQ</th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((d: any) => (
              <tr key={d.id_detalle_recepcion}>
                <td>{d.remision}</td>
                <td>{d.proveedor?.nombre ?? "—"}</td>
                <td>{d.tipo_cafe?.tipo_cafe ?? "—"}</td>
                <td className="tr">{d.cantidad_sacos}</td>
                <td className="tr">{Number(d.cantidad_qq).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="blt-totales">
          <tbody>
            <tr>
              <td><strong>TOTAL SACOS:</strong>&nbsp;{totalSacos}</td>
              <td><strong>TOTAL QUINTALES:</strong>&nbsp;{totalQq.toFixed(2)} QQ</td>
            </tr>
          </tbody>
        </table>

        <div className="blt-footer">
          <strong>Recibido por:</strong>&nbsp;{profile?.nombre ?? "—"}
        </div>
      </div>
    </>
  );
}
