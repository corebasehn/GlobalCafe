import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../auth/useAuth";
import { getBoletaPesadaApi } from "../../../../api/reception.api";

const PAGE_W = "24.13cm";
const PAGE_H = "13.97cm";

type FilaPeso = {
  concepto: string;
  signo: "+" | "-";
  sacos: number;
  peso: number | null;
  fecha: Date | null;
};

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

export default function BoletaPesadaPage() {
  const { idDetalle, tipo } = useParams<{ idDetalle: string; tipo: string }>();
  const { profile } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [fontSize, setFontSize] = useState<string>("8pt");
  const [leyendaCafeExterno, setLeyendaCafeExterno] = useState<string>("CAFÉ EXTERNO (SERVICIO DE MAQUILADO)");

  const esPrimera = tipo === "primera";

  // Función para calcular tamaños de fuente relativos
  const getFontSize = (multiplier: number) => {
    const baseSize = parseFloat(fontSize);
    const unit = fontSize.replace(/[0-9.]/g, '');
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
        if (settings?.printSettings?.leyendaCafeExterno) {
          setLeyendaCafeExterno(settings.printSettings.leyendaCafeExterno);
        }
      })
      .catch(() => console.warn("No se pudo cargar settings.json"));
  }, []);

  useEffect(() => {
    if (!idDetalle) return;
    getBoletaPesadaApi(Number(idDetalle))
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
        Cargando boleta...
      </div>
    );
  }
  if (error) {
    return <div style={{ padding: "2cm", color: "red", fontFamily }}>{error}</div>;
  }
  if (!data) return null;

  const { detalle, devolucion } = data;
  const recepcion = detalle?.recepcion;
  const hoy = new Date();

  const placaCabezal = recepcion?.placa_cabezal?.placa ?? "—";
  const placaFurgon  = recepcion?.placa_furgon?.placa;
  const placaCompleta = placaFurgon ? `${placaCabezal} / ${placaFurgon}` : placaCabezal;

  const filas: FilaPeso[] = [];

  // Si hay sacos faltos (-F), el total original es la suma de ambos registros
  const sacosIniciales = (detalle.cantidad_sacos ?? 0) + (devolucion?.cantidad_sacos ?? 0);

  filas.push({
    concepto: "PESO INICIAL",
    signo: "+",
    sacos: sacosIniciales,
    peso: detalle.pesada_entrada != null ? Number(detalle.pesada_entrada) : null,
    fecha: detalle.fecha_entrada_bascula ? new Date(detalle.fecha_entrada_bascula) : null,
  });

  // Siempre mostrar cambios de cabezal completos (aplica tanto a primera como segunda pesada)
  const cambiosCompletos = (detalle.cambios_cabezal ?? []).filter(
    (c: any) => c.peso_cabezal_entrante != null
  );
  for (const cambio of cambiosCompletos) {
    filas.push({
      concepto: "CABEZAL INICIAL",
      signo: "-",
      sacos: 0,
      peso: Number(cambio.peso_cabezal_saliente),
      fecha: cambio.fecha_creacion ? new Date(cambio.fecha_creacion) : null,
    });
    filas.push({
      concepto: "CABEZAL FINAL",
      signo: "+",
      sacos: 0,
      peso: Number(cambio.peso_cabezal_entrante),
      fecha: cambio.fecha_modificacion ? new Date(cambio.fecha_modificacion) : null,
    });
  }

  if (!esPrimera) {
    filas.push({
      concepto: "PESO FINAL",
      signo: "-",
      sacos: devolucion ? devolucion.cantidad_sacos ?? 0 : 0,
      peso: detalle.pesada_salida != null ? Number(detalle.pesada_salida) : null,
      fecha: detalle.fecha_salida_bascula ? new Date(detalle.fecha_salida_bascula) : null,
    });
  }

  filas.sort((a, b) => {
    if (!a.fecha) return -1;
    if (!b.fecha) return 1;
    return a.fecha.getTime() - b.fecha.getTime();
  });

  let pesoBruto = 0;
  let totalSacos = 0;
  for (const f of filas) {
    if (f.peso != null) pesoBruto += f.signo === "+" ? f.peso : -f.peso;
    totalSacos += f.signo === "+" ? f.sacos : -f.sacos;
  }
  const tara = 0.5 * totalSacos;
  const qNeto = (pesoBruto - tara)/100;

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @page {
          size: ${PAGE_W} ${PAGE_H};
          margin: 3cm 1.5cm 2cm 1.5cm;
        }

        body {
          font-family: ${fontFamily}, Helvetica, sans-serif;
          font-size: ${fontSize};
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
          .boleta-paper { padding: 0; }
          .no-print { display: none !important; }
        }

        .blt-header { text-align: center; margin-bottom: 4px; }
        .blt-titulo  { font-size: ${getFontSize(1.1875)}; font-weight: bold; text-transform: uppercase; }

        .blt-info {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 4px;
          font-size: ${getFontSize(0.9375)};
        }
        .blt-info td { padding: 1px 4px; }
        .blt-info .lbl { font-weight: bold; white-space: nowrap; width: 68px; }
        .blt-info td:nth-child(2) { width: 40%; }

        .blt-pergamino {
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
          border-bottom: 1px solid #333;
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
          border-top: 1px solid #333;
        }
        .blt-totales td {
          padding: 2px 0;
          white-space: nowrap;
          width: 50%;
        }
        .blt-totales strong { font-weight: bold; }

        .blt-footer {
          border-top: 1px solid #333;
          padding-top: 4px;
          font-size: ${getFontSize(0.9375)};
        }

        .blt-leyenda-externa {
          background: #ffffff;
          border: 2px solid #333;
          padding: 3px;
          text-align: center;
          font-weight: bold;
          font-size: ${getFontSize(1.0)};
          margin: 3px 0;
          letter-spacing: 1px;
        }
      `}</style>

      <div className="no-print">
        <button onClick={() => window.print()}>Imprimir</button>
        <button onClick={() => window.close()}>Cerrar</button>
      </div>

      <div className="boleta-paper">

        <div className="blt-header">
          <div className="blt-titulo">
            BOLETA DE {esPrimera ? "PRIMERA" : "SEGUNDA"} PESADA
          </div>
        </div>

        <table className="blt-info">
          <tbody>
            <tr>
              <td className="lbl">DESPACHO:</td>
              <td>{recepcion?.numero_entrada ?? "—"}</td>
              <td className="lbl">COSECHA:</td>
              <td>{recepcion?.cosecha?.cosecha ?? "—"}</td>
            </tr>
            <tr>
              <td className="lbl">FECHA:</td>
              <td>{fmtFecha(hoy)}</td>
              <td className="lbl">CLIENTE:</td>
              <td>{detalle.proveedor?.nombre ?? "—"}</td>
            </tr>
            <tr>
              <td className="lbl">REMISION:</td>
              <td>{detalle.remision ?? "—"}</td>
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
              <td className="lbl">OBSERVACION:</td>
              <td colSpan={3}>{detalle.observaciones || "—"}</td>
            </tr>
          </tbody>
        </table>

        {!esPrimera && detalle.id_tipo_remision === 2 && (
          <div className="blt-leyenda-externa">
            {leyendaCafeExterno}
          </div>
        )}

        <div className="blt-pergamino">{detalle.tipo_cafe?.tipo_cafe?.toUpperCase() ?? "N/A"}</div>

        <div className="blt-section-title">NOTA DE PESO DEL CAMION</div>

        <table className="blt-peso-table">
          <thead>
            <tr>
              <th style={{ width: "28%" }}>MEDICION</th>
              <th className="tr" style={{ width: "22%" }}>PESO (LB)</th>
              <th className="tr" style={{ width: "12%" }}>SACOS</th>
              <th>FECHA / HORA</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((fila, i) => (
              <tr key={i}>
                <td>{fila.concepto}</td>
                <td className="tr">
                  {fila.peso != null ? `${fila.signo}${fmt(fila.peso)}` : "—"}
                </td>
                <td className="tr">{fila.sacos === 0 ? "0" : `${fila.signo}${fila.sacos}`}</td>
                <td>{fmtFecha(fila.fecha)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="blt-totales">
          <tbody>
            <tr>
              <td><strong>PESO BRUTO:</strong>&nbsp;{fmt(pesoBruto)} LB</td>
              <td><strong>TOTAL SACOS:</strong>&nbsp;{totalSacos}</td>
            </tr>
            {!esPrimera && (
              <tr>
                <td><strong>TARA (0.5 × sacos):</strong>&nbsp;{fmt(tara)} LB</td>
                <td><strong>QUINTALES NETO TOTAL:</strong>&nbsp;{fmt(qNeto)} QQ</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="blt-footer">
          <strong>Recibido por:</strong>&nbsp;{profile?.nombre ?? "—"}
        </div>

      </div>
    </>
  );
}
