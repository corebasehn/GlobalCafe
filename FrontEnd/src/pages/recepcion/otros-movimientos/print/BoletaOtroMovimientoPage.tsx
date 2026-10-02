import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../../auth/useAuth";
import { getBoletaPesadaOtroMovimientoApi } from "../../../../api/reception.api";

const PAGE_W = "24.13cm";
const PAGE_H = "13.97cm";

function fmt(n: number) {
  return n.toLocaleString("es-HN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtFecha(d: Date | null) {
  if (!d || isNaN(d.getTime())) return "—";
  return (
    d.toLocaleDateString("es-HN", { day: "2-digit", month: "2-digit", year: "numeric" }) +
    " " +
    d.toLocaleTimeString("es-HN", { hour: "2-digit", minute: "2-digit" })
  );
}

export default function BoletaOtroMovimientoPage() {
  const { idDetalle, tipo } = useParams<{ idDetalle: string; tipo: string }>();
  const [searchParams] = useSearchParams();
  const esCopia = searchParams.get("copia") === "true";
  const { profile } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fontFamily, setFontFamily] = useState<string>("Courier New");
  const [fontSize, setFontSize] = useState<string>("9pt");

  const esPrimera = tipo === "primera";

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
    if (!idDetalle) return;
    getBoletaPesadaOtroMovimientoApi(Number(idDetalle))
      .then(setData)
      .catch(() => setError("Error al obtener los datos de impresion."))
      .finally(() => setLoading(false));
  }, [idDetalle]);

  useEffect(() => {
    if (!data || loading) return;
    const t = setTimeout(() => window.print(), 700);
    return () => clearTimeout(t);
  }, [data, loading]);

  if (loading) {
    return (
      <div style={{ padding: "2cm", textAlign: "center", fontFamily }}>
        Cargando boleta de pesaje...
      </div>
    );
  }
  if (error) {
    return <div style={{ padding: "2cm", color: "red", fontFamily }}>{error}</div>;
  }
  if (!data) return null;

  const recepcion = data?.recepcion;
  const hoy = new Date();

  const placaCabezal = recepcion?.placa_cabezal?.placa ?? "—";
  const placaFurgon = recepcion?.placa_furgon?.placa;
  const placaCompleta = placaFurgon ? `${placaCabezal} / ${placaFurgon}` : placaCabezal;

  const tara = data.pesada_entrada != null ? Number(data.pesada_entrada) : 0;
  const bruto = data.pesada_salida != null ? Number(data.pesada_salida) : 0;
  const neto = data.peso_neto != null ? Number(data.peso_neto) : (bruto > 0 && tara > 0 ? bruto - tara : 0);
  const qNeto = neto / 100;
  const qTara = tara / 100;
  const qBruto = bruto / 100;

  const tipoMovimientoNombre = recepcion?.tipo_movimiento?.nombre?.toUpperCase() || "SUBPRODUCTOS / CASULLA";

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
        .blt-info .lbl { font-weight: bold; white-space: nowrap; width: 80px; }
        .blt-info td:nth-child(2) { width: 40%; }

        .blt-mov-tipo {
          font-size: ${fontSize};
          font-weight: bold;
          text-align: left;
          margin: 2px 0 3px 0;
          letter-spacing: 1px;
        }

        .blt-section-title {
          font-size: ${fontSize};
          font-weight: bold;
          text-align: center;
          padding: 1px 0;
          margin-bottom: 2px;
        }

        .blt-peso-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 5px;
          font-size: ${getFontSize(0.9375)};
        }
        .blt-peso-table th {
          border-bottom: 1px solid #000000;
          padding: 2px 6px;
          font-size: ${getFontSize(0.875)};
          font-weight: bold;
        }
        .blt-peso-table th.tr,
        .blt-peso-table td.tr { text-align: right; }
        .blt-peso-table td { padding: 2px 6px; }

        .blt-totales {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 4px;
          font-size: ${getFontSize(0.9375)};
          border-top: 1px solid #000000;
        }
        .blt-totales td {
          padding: 2px 4px 2px 0;
          white-space: nowrap;
        }
        .blt-totales strong { font-weight: bold; }

        .blt-footer {
          border-top: 1px solid #000000;
          padding-top: 4px;
          font-size: ${getFontSize(0.9375)};
        }

        .blt-copia {
          position: absolute;
          top: 0;
          right: 0;
          background: #c00;
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
          <div className="blt-titulo">
            BOLETA DE {esPrimera ? "PRIMERA" : "SEGUNDA"} PESADA (OTROS MOVIMIENTOS)
          </div>
        </div>

        <table className="blt-info">
          <tbody>
            <tr>
              <td className="lbl">MOVIMIENTO:</td>
              <td>{recepcion?.numero_entrada ?? "—"}</td>
              <td className="lbl">COSECHA:</td>
              <td>{recepcion?.cosecha?.cosecha ?? "—"}</td>
            </tr>
            <tr>
              <td className="lbl">FECHA:</td>
              <td>{fmtFecha(hoy)}</td>
              <td className="lbl">CLIENTE:</td>
              <td>{data.proveedor?.nombre ?? "General"}</td>
            </tr>
            <tr>
              <td className="lbl">REFERENCIA:</td>
              <td>{data.remision ?? "—"}</td>
              <td className="lbl">PLACA:</td>
              <td>{placaCompleta}</td>
            </tr>
            <tr>
              <td className="lbl">CONDUCTOR:</td>
              <td>{recepcion?.conductor?.nombre ?? "—"}</td>
              <td className="lbl">TELEFONO:</td>
              <td>{recepcion?.conductor?.telefono ?? "—"}</td>
            </tr>
            <tr>
              <td className="lbl">TRANSPORTE:</td>
              <td>{recepcion?.conductor?.transporte?.nombre || "Particular"}</td>
              <td className="lbl">VEHÍCULO:</td>
              <td>{recepcion?.tipo_vehiculo || "—"}</td>
            </tr>
            <tr>
              <td className="lbl">OBSERVACION:</td>
              <td colSpan={3}>{data.observaciones || recepcion?.observaciones || "—"}</td>
            </tr>
          </tbody>
        </table>

        <div className="blt-mov-tipo">{tipoMovimientoNombre}</div>

        <div className="blt-section-title">PESO DETALLE DEL VEHICULO</div>

        <table className="blt-peso-table">
          <thead>
            <tr>
              <th style={{ width: "35%" }}>MEDICION</th>
              <th className="tr" style={{ width: "25%" }}>PESO (LB)</th>
              <th className="tr" style={{ width: "15%" }}>EQUIV (QQ)</th>
              <th>FECHA / HORA</th>
            </tr>
          </thead>
          <tbody>
            {/* 1ra Pesada: Tara (Vehículo Vacío) */}
            <tr>
              <td>1RA PESADA (TARA)</td>
              <td className="tr">
                {tara > 0 ? `-${fmt(tara)}` : "—"}
              </td>
              <td className="tr">
                {tara > 0 ? fmt(qTara) : "—"}
              </td>
              <td>{data.fecha_entrada_bascula ? fmtFecha(new Date(data.fecha_entrada_bascula)) : "—"}</td>
            </tr>

            {/* 2da Pesada: Peso Bruto (Vehículo Cargado) */}
            <tr>
              <td>2DA PESADA (BRUTO)</td>
              <td className="tr">
                {esPrimera
                  ? "******"
                  : (bruto > 0 ? `+${fmt(bruto)}` : "—")}
              </td>
              <td className="tr">
                {esPrimera
                  ? "******"
                  : (bruto > 0 ? fmt(qBruto) : "—")}
              </td>
              <td>
                {esPrimera
                  ? "—"
                  : (data.fecha_salida_bascula ? fmtFecha(new Date(data.fecha_salida_bascula)) : "—")}
              </td>
            </tr>
          </tbody>
        </table>

        <table className="blt-totales">
          <tbody>
            <tr>
              <td style={{ width: "35%" }}>
                <strong>PESO BRUTO:</strong>&nbsp;{esPrimera ? "****** LB" : (bruto > 0 ? `${fmt(bruto)} LB` : "—")}
              </td>
              <td style={{ width: "35%" }}>
                <strong>PESO TARA:</strong>&nbsp;{tara > 0 ? `${fmt(tara)} LB` : "—"}
              </td>
              <td style={{ width: "30%" }}>
                <strong>TARA (QQ):</strong>&nbsp;{tara > 0 ? `${fmt(qTara)} QQ` : "—"}
              </td>
            </tr>
            {!esPrimera && (
              <tr>
                <td>
                  <strong>PESO NETO:</strong>&nbsp;{neto > 0 ? `${fmt(neto)} LB` : "—"}
                </td>
                <td colSpan={2}>
                  <strong>QUINTALES NETO:</strong>&nbsp;{neto > 0 ? `${fmt(qNeto)} QQ` : "—"}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="blt-footer">
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "14px" }}>
            <div>
              <strong>Operador de Báscula:</strong>&nbsp;{profile?.nombre ?? "Báscula"}
            </div>
            <div>
              <strong>Conductor / Recibido Conforme:</strong> ______________________
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
