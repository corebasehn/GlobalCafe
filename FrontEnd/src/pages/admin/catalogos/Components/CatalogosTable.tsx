import { useEffect, useState } from "react";
import { Edit, Loader2, MoreVertical } from "lucide-react";
import { Table, Badge, Dropdown, Pagination } from 'react-bootstrap';

const PAGE_SIZE = 15;

interface CatalogosTableProps {
  activeTab: string;
  loading: boolean;
  data: any[];
  searchTerm: string;
  onEdit: (item: any, idField: string) => void;
}

export default function CatalogosTable({
  activeTab,
  loading,
  data,
  searchTerm,
  onEdit
}: CatalogosTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, data.length]);

  const term = searchTerm.toLowerCase();
  const filteredData = data.filter(item => {
    const mainText = (item.nombre || item.placa || item.cosecha || item.tipo_cafe || item.tipo_remision || item.tipo_empaque || item.codigo || "").toLowerCase();
    const secondaryText = (item.rtn || item.dni || item.licencia || item.descripcion || "").toLowerCase();
    const deptoText = (item.departamento?.nombre || "").toLowerCase();
    const bodegaText = (item.bodega?.nombre || "").toLowerCase();
    const sentidoText = (item.sentido_pesaje || "").toLowerCase();
    
    return mainText.includes(term) || 
           secondaryText.includes(term) || 
           deptoText.includes(term) || 
           bodegaText.includes(term) ||
           sentidoText.includes(term);
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedData = filteredData.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  
  const renderActions = (item: any, idField: string) => (
    <td className="text-center">
      <Dropdown className="dropdown-center">
        <Dropdown.Toggle 
          variant="" 
          className="btn btn-icon btn-sm btn-light btn-wave no-caret"
        >
          <MoreVertical className="w-4 h-4" />
        </Dropdown.Toggle>
        <Dropdown.Menu 
          className="dropdown-menu-end shadow-sm border-0"
          popperConfig={{ strategy: 'fixed' }}
        >
          <Dropdown.Item 
            onClick={() => onEdit(item, idField)}
            className="d-flex align-items-center gap-2 py-2"
          >
            <Edit className="w-4 h-4 text-info" /> 
            <span>Editar Registro</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </td>
  );

  const renderTableContent = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={10} className="text-center py-5 text-muted">
            <Loader2 className="w-6 h-6 animate-spin d-inline-block me-2" /> Cargando datos...
          </td>
        </tr>
      );
    }

    if (filteredData.length === 0) {
      return (
        <tr>
          <td colSpan={10} className="text-center py-5 text-muted">
            No se encontraron registros
          </td>
        </tr>
      );
    }

    switch (activeTab) {
      case "proveedores":
        return paginatedData.map((p) => (
          <tr key={p.id_proveedor}>
            {renderActions(p, "id_proveedor")}
            <td className="fw-semibold">{p.nombre}</td>
            <td className="text-muted">{p.rtn || "N/A"}</td>
            <td className="text-muted">{p.telefono || "N/A"}</td>
            <td className="text-center"><Badge bg={p.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{p.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "transportes":
        return paginatedData.map((t) => (
          <tr key={t.id_transporte}>
            {renderActions(t, "id_transporte")}
            <td className="fw-semibold">{t.nombre}</td>
            <td className="text-muted">{t.rtn || "N/A"}</td>
            <td className="text-muted">{t.telefono || "N/A"}</td>
            <td className="text-center"><Badge bg={t.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{t.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "conductores":
        return paginatedData.map((c) => (
          <tr key={c.id_conductor}>
            {renderActions(c, "id_conductor")}
            <td className="fw-semibold">{c.nombre}</td>
            <td className="text-muted">{c.dni || "N/A"}</td>
            <td className="text-muted">{c.licencia || "N/A"}</td>
            <td className="text-muted">{c.telefono || "N/A"}</td>
            <td className="text-center"><Badge bg={c.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{c.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "placas-cabezal":
        return paginatedData.map((p) => (
          <tr key={p.id_placa_cabezal}>
            {renderActions(p, "id_placa_cabezal")}
            <td className="fw-semibold">{p.placa}</td>
            <td className="text-center"><Badge bg={p.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{p.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "placas-furgon":
        return paginatedData.map((p) => (
          <tr key={p.id_placa_furgon}>
            {renderActions(p, "id_placa_furgon")}
            <td className="fw-semibold">{p.placa}</td>
            <td className="text-center"><Badge bg={p.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{p.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "cosechas":
        return paginatedData.map((c) => (
          <tr key={c.id_cosecha}>
            {renderActions(c, "id_cosecha")}
            <td className="fw-semibold">{c.cosecha}</td>
            <td className="text-center">{c.cosecha_actual ? <Badge bg="info-transparent" className="rounded-pill">Cosecha Actual</Badge> : ""}</td>
            <td className="text-center"><Badge bg={c.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{c.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "departamentos":
        return paginatedData.map((d) => (
          <tr key={d.id_departamento}>
            {renderActions(d, "id_departamento")}
            <td className="fw-semibold">{d.nombre}</td>
            <td className="text-center"><Badge bg={d.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{d.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "municipios":
        return paginatedData.map((m) => (
          <tr key={m.id_municipio}>
            {renderActions(m, "id_municipio")}
            <td className="fw-semibold">{m.nombre}</td>
            <td className="text-muted">{m.departamento?.nombre || "N/A"}</td>
            <td className="text-center"><Badge bg={m.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{m.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "bodegas":
        return paginatedData.map((b) => (
          <tr key={b.id_bodega}>
            {renderActions(b, "id_bodega")}
            <td className="fw-semibold">{b.nombre}</td>
            <td className="text-center"><Badge bg={b.externa ? "warning-transparent" : "info-transparent"} className="rounded-pill">{b.externa ? "Externa" : "Interna"}</Badge></td>
            <td className="text-center"><Badge bg={b.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{b.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "estibas":
        return paginatedData.map((e) => (
          <tr key={e.id_estibas}>
            {renderActions(e, "id_estibas")}
            <td className="fw-semibold">{e.nombre}</td>
            <td className="text-muted">{e.bodega?.nombre || "N/A"}</td>
            <td className="text-center"><Badge bg={e.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{e.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "tipos-cafe":
        return paginatedData.map((item) => (
          <tr key={item.id_tipo_cafe}>
            {renderActions(item, "id_tipo_cafe")}
            <td className="fw-semibold">{item.tipo_cafe}</td>
            <td className="text-center"><Badge bg={item.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{item.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "tipos-remision":
        return paginatedData.map((item) => (
          <tr key={item.id_tipo_remision}>
            {renderActions(item, "id_tipo_remision")}
            <td className="fw-semibold">{item.tipo_remision}</td>
            <td className="text-center"><Badge bg={item.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{item.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "tipos-empaque":
        return paginatedData.map((item) => (
          <tr key={item.id_tipo_empaque}>
            {renderActions(item, "id_tipo_empaque")}
            <td className="fw-semibold">{item.tipo_empaque}</td>
            <td className="text-muted">{item.tara} Lbs</td>
            <td className="text-center"><Badge bg={item.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{item.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "tipos-movimiento":
        return paginatedData.map((item) => {
          const isActivo = item.activo ?? item.estado ?? true;
          return (
            <tr key={item.id}>
              {renderActions(item, "id")}
              <td className="fw-bold text-primary font-monospace">{item.codigo}</td>
              <td className="fw-semibold">{item.nombre}</td>
              <td className="text-muted text-wrap" style={{ maxWidth: '300px' }}>{item.descripcion || "—"}</td>
              <td className="text-center">
                <Badge 
                  bg={item.sentido_pesaje === "BRUTO_PRIMERO" ? "primary-transparent" : "warning-transparent"} 
                  className={`rounded-pill px-2 py-1 ${item.sentido_pesaje === "BRUTO_PRIMERO" ? "text-primary border border-primary-subtle" : "text-warning border border-warning-subtle"}`}
                >
                  {item.sentido_pesaje === "BRUTO_PRIMERO" ? "Bruto Primero (Cargado → Vacío)" : "Tara Primero (Vacío → Cargado)"}
                </Badge>
              </td>
              <td className="text-center">
                <Badge bg={isActivo ? "success-transparent" : "danger-transparent"} className="rounded-pill">
                  {isActivo ? "Activo" : "Inactivo"}
                </Badge>
              </td>
            </tr>
          );
        });
      default: // Catálogos simples (Catadores, Calidades, Defectos, Zarandas, Tazas)
        return paginatedData.map((item) => {
          const idField = Object.keys(item).find(key => key.startsWith('id_')) || 'id';
          return (
            <tr key={item[idField]}>
              {renderActions(item, idField)}
              <td className="fw-semibold">{item.nombre}</td>
              <td className="text-center"><Badge bg={item.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{item.estado ? "Activo" : "Inactivo"}</Badge></td>
            </tr>
          );
        });
    }
  };

  return (
    <div>
      <div className="table-responsive">
        <Table hover className="table text-nowrap table-bordered mb-0">
          <thead>
            <tr>
              <th scope="col" className="text-center">Acciones</th>
              {activeTab === "tipos-movimiento" && <th scope="col">Código</th>}
              <th scope="col">{activeTab === "tipos-movimiento" ? "Nombre del Movimiento" : "Descripción principal"}</th>
              {(activeTab === "proveedores" || activeTab === "transportes") && <th scope="col">RTN</th>}
              {activeTab === "conductores" && <th scope="col">DNI</th>}
              {activeTab === "conductores" && <th scope="col">Licencia</th>}
              {["proveedores", "conductores", "transportes"].includes(activeTab) && <th scope="col">Teléfono</th>}
              {activeTab === "municipios" && <th scope="col">Departamento</th>}
              {activeTab === "cosechas" && <th scope="col" className="text-center">Status</th>}
              {activeTab === "bodegas" && <th scope="col" className="text-center">Tipo</th>}
              {activeTab === "estibas" && <th scope="col">Bodega</th>}
              {activeTab === "tipos-empaque" && <th scope="col">Tara</th>}
              {activeTab === "tipos-movimiento" && <th scope="col">Descripción</th>}
              {activeTab === "tipos-movimiento" && <th scope="col" className="text-center">Sentido de Pesaje</th>}
              <th scope="col" className="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>{renderTableContent()}</tbody>
        </Table>
      </div>

      {!loading && filteredData.length > 0 && (
        <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top">
          <span className="text-muted small">
            {totalPages > 1 ? `Página ${safePage} de ${totalPages} — ` : ""}{filteredData.length} {filteredData.length === 1 ? "registro" : "registros"}
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
    </div>
  );
}
