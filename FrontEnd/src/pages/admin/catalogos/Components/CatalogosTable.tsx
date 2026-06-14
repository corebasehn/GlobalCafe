import { Edit, Loader2, MoreVertical } from "lucide-react";
import { Table, Badge, Dropdown } from 'react-bootstrap';

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

    const term = searchTerm.toLowerCase();
    const filteredData = data.filter(item => {
      const mainText = (item.nombre || item.placa || item.cosecha || item.tipo_cafe || item.tipo_remision || item.tipo_empaque || "").toLowerCase();
      const secondaryText = (item.rtn || item.dni || item.licencia || "").toLowerCase();
      const deptoText = (item.departamento?.nombre || "").toLowerCase();
      const bodegaText = (item.bodega?.nombre || "").toLowerCase();
      
      return mainText.includes(term) || 
             secondaryText.includes(term) || 
             deptoText.includes(term) || 
             bodegaText.includes(term);
    });

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
        return filteredData.map((p) => (
          <tr key={p.id_proveedor}>
            {renderActions(p, "id_proveedor")}
            <td className="fw-semibold">{p.nombre}</td>
            <td className="text-muted">{p.rtn || "N/A"}</td>
            <td className="text-muted">{p.telefono || "N/A"}</td>
            <td className="text-center"><Badge bg={p.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{p.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "transportes":
        return filteredData.map((t) => (
          <tr key={t.id_transporte}>
            {renderActions(t, "id_transporte")}
            <td className="fw-semibold">{t.nombre}</td>
            <td className="text-muted">{t.rtn || "N/A"}</td>
            <td className="text-muted">{t.telefono || "N/A"}</td>
            <td className="text-center"><Badge bg={t.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{t.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "conductores":
        return filteredData.map((c) => (
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
        return filteredData.map((p) => (
          <tr key={p.id_placa_cabezal}>
            {renderActions(p, "id_placa_cabezal")}
            <td className="fw-semibold">{p.placa}</td>
            <td className="text-center"><Badge bg={p.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{p.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "placas-furgon":
        return filteredData.map((p) => (
          <tr key={p.id_placa_furgon}>
            {renderActions(p, "id_placa_furgon")}
            <td className="fw-semibold">{p.placa}</td>
            <td className="text-center"><Badge bg={p.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{p.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "cosechas":
        return filteredData.map((c) => (
          <tr key={c.id_cosecha}>
            {renderActions(c, "id_cosecha")}
            <td className="fw-semibold">{c.cosecha}</td>
            <td className="text-center">{c.cosecha_actual ? <Badge bg="info-transparent" className="rounded-pill">Cosecha Actual</Badge> : ""}</td>
            <td className="text-center"><Badge bg={c.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{c.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "departamentos":
        return filteredData.map((d) => (
          <tr key={d.id_departamento}>
            {renderActions(d, "id_departamento")}
            <td className="fw-semibold">{d.nombre}</td>
            <td className="text-center"><Badge bg={d.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{d.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "municipios":
        return filteredData.map((m) => (
          <tr key={m.id_municipio}>
            {renderActions(m, "id_municipio")}
            <td className="fw-semibold">{m.nombre}</td>
            <td className="text-muted">{m.departamento?.nombre || "N/A"}</td>
            <td className="text-center"><Badge bg={m.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{m.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "bodegas":
        return filteredData.map((b) => (
          <tr key={b.id_bodega}>
            {renderActions(b, "id_bodega")}
            <td className="fw-semibold">{b.nombre}</td>
            <td className="text-center"><Badge bg={b.externa ? "warning-transparent" : "info-transparent"} className="rounded-pill">{b.externa ? "Externa" : "Interna"}</Badge></td>
            <td className="text-center"><Badge bg={b.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{b.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "estibas":
        return filteredData.map((e) => (
          <tr key={e.id_estibas}>
            {renderActions(e, "id_estibas")}
            <td className="fw-semibold">{e.nombre}</td>
            <td className="text-muted">{e.bodega?.nombre || "N/A"}</td>
            <td className="text-center"><Badge bg={e.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{e.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "tipos-cafe":
        return filteredData.map((item) => (
          <tr key={item.id_tipo_cafe}>
            {renderActions(item, "id_tipo_cafe")}
            <td className="fw-semibold">{item.tipo_cafe}</td>
            <td className="text-center"><Badge bg={item.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{item.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "tipos-remision":
        return filteredData.map((item) => (
          <tr key={item.id_tipo_remision}>
            {renderActions(item, "id_tipo_remision")}
            <td className="fw-semibold">{item.tipo_remision}</td>
            <td className="text-center"><Badge bg={item.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{item.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      case "tipos-empaque":
        return filteredData.map((item) => (
          <tr key={item.id_tipo_empaque}>
            {renderActions(item, "id_tipo_empaque")}
            <td className="fw-semibold">{item.tipo_empaque}</td>
            <td className="text-muted">{item.tara} Lbs</td>
            <td className="text-center"><Badge bg={item.estado ? "success-transparent" : "danger-transparent"} className="rounded-pill">{item.estado ? "Activo" : "Inactivo"}</Badge></td>
          </tr>
        ));
      default: // Catálogos simples (Catadores, Calidades, Defectos, Zarandas, Tazas)
        return filteredData.map((item) => {
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
    <div className="table-responsive">
      <Table hover className="table text-nowrap table-bordered mb-0">
        <thead>
          <tr>
            <th scope="col" className="text-center">Acciones</th>
            <th scope="col">Descripción principal</th>
            {(activeTab === "proveedores" || activeTab === "transportes") && <th>RTN</th>}
            {activeTab === "conductores" && <th>DNI</th>}
            {activeTab === "conductores" && <th>Licencia</th>}
            {["proveedores", "conductores", "transportes"].includes(activeTab) && <th>Teléfono</th>}
            {activeTab === "municipios" && <th>Departamento</th>}
            {activeTab === "cosechas" && <th className="text-center">Status</th>}
            {activeTab === "bodegas" && <th className="text-center">Tipo</th>}
            {activeTab === "estibas" && <th>Bodega</th>}
            {activeTab === "tipos-empaque" && <th>Tara</th>}
            <th scope="col" className="text-center">Estado</th>
          </tr>
        </thead>
        <tbody>{renderTableContent()}</tbody>
      </Table>
    </div>
  );
}

