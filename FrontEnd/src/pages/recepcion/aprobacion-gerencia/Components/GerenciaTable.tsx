import { useEffect, useState } from "react";
import { Loader2, FileSpreadsheet } from "lucide-react";
import { Card, Table, Badge, Button, OverlayTrigger, Tooltip, Pagination } from "react-bootstrap";
import * as XLSX from "xlsx";
import type { MuestraGerencia } from "../Containers/AprobacionGerenciaPage";

const PAGE_SIZE = 15;

export interface GerenciaTableProps {
  muestras: MuestraGerencia[];
  loading: boolean;
  hasRowActions: boolean;
  onOpenEvaluation: (m: MuestraGerencia) => void;
}

export default function GerenciaTable({ muestras, loading, hasRowActions, onOpenEvaluation }: GerenciaTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [muestras.length]);

  const totalPages = Math.max(1, Math.ceil(muestras.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = muestras.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const totalQq = muestras.reduce((sum, m) => sum + m.cantidad_qq, 0);

  const exportarExcel = () => {
    const filas = muestras.map(m => ({
      "N° Análisis": m.numero_analisis,
      "Fecha": new Date(m.fecha_analisis).toLocaleDateString(),
      "N° Ingreso": m.numero_entrada,
      "Remisión": m.remision,
      "Proveedor": m.proveedor_nombre,
      "Calidad": m.calidad_nombre,
      "Quintales (QQ)": Number(m.cantidad_qq.toFixed(2)),
    }));
    const ws = XLSX.utils.json_to_sheet(filas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Gerencia");
    XLSX.writeFile(wb, `Gerencia_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <Card>
      {!loading && muestras.length > 0 && (
        <Card.Header className="d-flex justify-content-end py-2 bg-white border-bottom">
          <Button variant="outline-success" size="sm" onClick={exportarExcel} className="d-flex align-items-center gap-1">
            <FileSpreadsheet className="w-4 h-4" /> Exportar Excel
          </Button>
        </Card.Header>
      )}
      <Table responsive hover className="mb-0">
        <thead>
          <tr>
            {hasRowActions && <th className="text-center">Acción</th>}
            <th>Identificador</th>
            <th>Ingreso / Remisión</th>
            <th>Proveedor</th>
            <th className="text-center">Calidad Sugerida</th>
            <th className="text-end">Volumen</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={hasRowActions ? 6 : 5} className="text-center py-8">
                <Loader2 className="w-6 h-6 animate-spin inline-block text-neutral-400 mr-2" /> Consultando pendientes...
              </td>
            </tr>
          ) : muestras.length === 0 ? (
            <tr>
              <td colSpan={hasRowActions ? 6 : 5} className="text-center py-8 text-neutral-500">
                Bandeja limpia. No hay muestras pendientes de autorización.
              </td>
            </tr>
          ) : (
            paginated.map((m) => (
              <tr key={m.id_analisis_calidad}>
                {hasRowActions && (
                  <td className="text-center">
                    <div className="d-flex justify-content-center">
                      <OverlayTrigger placement="top" overlay={<Tooltip>Evaluar Muestra</Tooltip>}>
                        <a
                          href="#!"
                          className="btn btn-icon btn-sm btn-info-light rounded-pill"
                          onClick={(e) => { e.preventDefault(); onOpenEvaluation(m); }}
                        >
                          <i className="fe fe-eye"></i>
                        </a>
                      </OverlayTrigger>
                    </div>
                  </td>
                )}
                <td>
                  <div className="flex flex-col">
                    <span className="font-bold text-coffee-700">{m.numero_analisis}</span>
                    <span className="text-xs text-neutral-500">{new Date(m.fecha_analisis).toLocaleDateString()}</span>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    <span className="font-medium text-neutral-700">{m.numero_entrada}</span>
                    <span className="text-xs text-neutral-500">Rem: {m.remision}</span>
                  </div>
                </td>
                <td>{m.proveedor_nombre}</td>
                <td className="text-center"><Badge bg="info-transparent">{m.calidad_nombre}</Badge></td>
                <td className="text-end font-medium">{m.cantidad_qq.toFixed(2)} QQ</td>
              </tr>
            ))
          )}
        </tbody>

        {!loading && muestras.length > 0 && (
          <tfoot className="table-light border-top border-2">
            <tr>
              <td colSpan={hasRowActions ? 5 : 4} className="text-end fw-bold text-neutral-600 py-2">
                Total ({muestras.length} {muestras.length === 1 ? "muestra" : "muestras"}):
              </td>
              <td className="text-end fw-bold">{totalQq.toFixed(2)} QQ</td>
            </tr>
          </tfoot>
        )}
      </Table>

      {!loading && muestras.length > 0 && (
        <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top">
          <span className="text-muted small">
            {totalPages > 1 ? `Página ${safePage} de ${totalPages} — ` : ""}{muestras.length} {muestras.length === 1 ? "registro" : "registros"}
          </span>

          {totalPages > 1 && (
            <Pagination size="sm" className="mb-0">
              <Pagination.First onClick={() => setCurrentPage(1)} disabled={safePage === 1} />
              <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={safePage === 1} />
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - safePage) <= 2)
                .reduce<(number | string)[]>((acc, p, idx, arr) => {
                  if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) =>
                  p === "..."
                    ? <Pagination.Ellipsis key={`e-${idx}`} disabled />
                    : <Pagination.Item key={p} active={p === safePage} onClick={() => setCurrentPage(p as number)}>{p}</Pagination.Item>
                )}
              <Pagination.Next onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages} />
              <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={safePage === totalPages} />
            </Pagination>
          )}
        </div>
      )}
    </Card>
  );
}
