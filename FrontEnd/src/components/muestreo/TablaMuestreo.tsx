import { useEffect, useState } from "react";
import { Clock, FileSpreadsheet, Loader2 } from "lucide-react";
import { Badge, Button, Card, Pagination, Table } from "react-bootstrap";
import * as XLSX from "xlsx";
import { CargaPendiente } from "./types";

const PAGE_SIZE = 15;

type Props = {
  loading: boolean;
  filteredCargas: CargaPendiente[];
  hasRowActions: boolean;
  onMuestrear: (carga: CargaPendiente) => void;
};

export default function TablaMuestreo({
  loading,
  filteredCargas,
  hasRowActions,
  onMuestrear,
}: Readonly<Props>) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredCargas.length]);

  const exportarExcel = () => {
    const filas = filteredCargas.map(c => ({
      "No. Ingreso": c.numero_entrada,
      "Fecha Entrada": new Date(c.fecha_entrada).toLocaleString(),
      "Remisión Física": c.remision,
      "Proveedor / Finca": c.proveedor_nombre,
      "Sacos Declarados": c.cantidad_sacos,
      "Quintales (QQ)": Number(Number(c.cantidad_qq).toFixed(2)),
      "Estado": "Pendiente de Muestrear",
    }));
    const ws = XLSX.utils.json_to_sheet(filas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Muestreo Pendiente");
    XLSX.writeFile(wb, `Muestreo_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const totalPages = Math.max(1, Math.ceil(filteredCargas.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filteredCargas.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const colSpan = hasRowActions ? 6 : 5;

  type PageItem =
    | { type: "page"; value: number }
    | { type: "ellipsis"; key: string };

  const pageItems: PageItem[] = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(p => p === 1 || p === totalPages || Math.abs(p - safePage) <= 2)
    .reduce<PageItem[]>((acc, p, idx, arr) => {
      if (idx > 0 && p - arr[idx - 1] > 1) {
        acc.push({ type: "ellipsis", key: `ellipsis-${arr[idx - 1]}-${p}` });
      }
      acc.push({ type: "page", value: p });
      return acc;
    }, []);

  const renderBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={colSpan} className="text-center py-8">
            <Loader2 className="w-6 h-6 animate-spin inline-block text-neutral-400 mr-2" /> Cargando cola de trabajo...
          </td>
        </tr>
      );
    }
    if (filteredCargas.length === 0) {
      return (
        <tr>
          <td colSpan={colSpan} className="text-center py-8 text-neutral-500">
            Patio limpio. No hay camiones pendientes de muestreo.
          </td>
        </tr>
      );
    }
    return paginated.map((carga) => (
      <tr key={carga.id_detalle_recepcion}>
        {hasRowActions && (
          <td className="text-center">
            <Button variant="primary" size="sm" onClick={() => onMuestrear(carga)}>
              Muestrear
            </Button>
          </td>
        )}
        <td className="font-medium text-neutral-600">{carga.numero_entrada}</td>
        <td className="font-bold text-coffee-700">{carga.remision}</td>
        <td>{carga.proveedor_nombre}</td>
        <td className="text-center">{carga.cantidad_sacos}</td>
        <td className="text-center">
          <Badge
            pill
            bg="warning-transparent" className="rounded-pill"
            style={{ width: "fit-content" }}
          >
            <Clock className="w-3 h-3" /> ESPERANDO MUESTRA
          </Badge>
        </td>
      </tr>
    ));
  };

  return (
    <Card>
      {!loading && filteredCargas.length > 0 && (
        <Card.Header className="d-flex justify-content-end py-2 bg-white border-bottom">
          <Button variant="outline-success" size="sm" onClick={exportarExcel} className="d-flex align-items-center gap-1">
            <FileSpreadsheet className="w-4 h-4" /> Exportar Excel
          </Button>
        </Card.Header>
      )}
      <Table responsive hover className="mb-0">
        <thead>
          <tr>
            {hasRowActions && <th className="text-center" style={{ width: "120px" }}>Acción</th>}
            <th>No. Ingreso</th>
            <th>Remisión Física</th>
            <th>Proveedor / Finca</th>
            <th className="text-center">Sacos Declarados</th>
            <th className="text-center">Estado</th>
          </tr>
        </thead>
        <tbody>{renderBody()}</tbody>

        {!loading && filteredCargas.length > 0 && (
          <tfoot className="table-light border-top border-2">
            <tr>
              <td colSpan={hasRowActions ? 4 : 3} className="text-end fw-bold text-neutral-600 py-2">
                Total ({filteredCargas.length} {filteredCargas.length === 1 ? "carga" : "cargas"}):
              </td>
              <td className="text-center fw-bold">
                {filteredCargas.reduce((s, c) => s + c.cantidad_sacos, 0).toLocaleString()}
              </td>
              <td />
            </tr>
          </tfoot>
        )}
      </Table>

      {!loading && totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top">
          <span className="text-muted small">
            Página {safePage} de {totalPages} — {filteredCargas.length} registros
          </span>
          <Pagination size="sm" className="mb-0">
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={safePage === 1} />
            <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={safePage === 1} />
            {pageItems.map(item =>
              item.type === "ellipsis"
                ? <Pagination.Ellipsis key={item.key} disabled />
                : <Pagination.Item key={item.value} active={item.value === safePage} onClick={() => setCurrentPage(item.value)}>{item.value}</Pagination.Item>
            )}
            <Pagination.Next onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages} />
            <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={safePage === totalPages} />
          </Pagination>
        </div>
      )}
    </Card>
  );
}
