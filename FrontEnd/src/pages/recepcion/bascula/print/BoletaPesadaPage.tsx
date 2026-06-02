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

  const esPrimera = tipo === "primera";

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
      <div style={{ padding: "2cm", textAlign: "center", fontFamily: "Arial" }}>
        Cargando boleta...
      </div>
    );
  }
  if (error) {
    return <div style={{ padding: "2cm", color: "red", fontFamily: "Arial" }}>{error}</div>;
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
          margin: 0;
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 8pt;
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
            font-size: 9pt;
          }
        }

        @media print {
          .boleta-paper { padding: 1.5cm 1.5cm 1.5cm 1.5cm; }
          .no-print { display: none !important; }
        }

        .blt-header { text-align: center; margin-bottom: 4px; }
        .blt-titulo  { font-size: 9.5pt; font-weight: bold; text-transform: uppercase; }

        .blt-info {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 4px;
          font-size: 7.5pt;
        }
        .blt-info td { padding: 1px 4px; }
        .blt-info .lbl { font-weight: bold; white-space: nowrap; width: 68px; }
        .blt-info td:nth-child(2) { width: 40%; }

        .blt-pergamino {
          font-size: 8pt;
          font-weight: bold;
          text-align: left;
          margin: 2px 0 3px 0;
          letter-spacing: 1px;
        }

        .blt-section-title {
          font-size: 8pt;
          font-weight: bold;
          text-align: center;
          padding: 1px 0;
          margin-bottom: 2px;
        }

        .blt-peso-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 5px;
          font-size: 7.5pt;
        }
        .blt-peso-table th {
          border-bottom: 1px solid #333;
          padding: 2px 6px;
          font-size: 7pt;
          font-weight: bold;
        }
        .blt-peso-table th.tr,
        .blt-peso-table td.tr { text-align: right; }
        .blt-peso-table td { padding: 2px 6px; }

        .blt-totales {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 4px;
          font-size: 7.5pt;
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
          font-size: 7.5pt;
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
              <td className="lbl">OBSERVACION:</td>
              <td colSpan={3}>{detalle.observaciones || "—"}</td>
            </tr>
          </tbody>
        </table>

        <div className="blt-pergamino">PERGAMINO SECO</div>

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
            <tr>
              <td><strong>TARA (0.5 × sacos):</strong>&nbsp;{fmt(tara)} LB</td>
              <td><strong>QUINTALES NETO TOTAL:</strong>&nbsp;{fmt(qNeto)} QQ</td>
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
