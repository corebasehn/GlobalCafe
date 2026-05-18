import { Edit, Loader2 } from "lucide-react";
import { Table, Badge } from 'react-bootstrap';

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
  
  const renderTableContent = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={10} className="text-center py-8 text-neutral-500">
            <Loader2 className="w-6 h-6 animate-spin inline-block mr-2" /> Cargando datos...
          </td>
        </tr>
      );
    }

    const term = searchTerm.toLowerCase();
    const filteredData = data.filter(item => {
      const mainText = (item.nombre || item.placa || item.cosecha || "").toLowerCase();
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
          <td colSpan={10} className="text-center py-8 text-neutral-500">
            No se encontraron registros
          </td>
        </tr>
      );
    }

    switch (activeTab) {
      case "proveedores":
        return filteredData.map((p) => (
          <tr key={p.id_proveedor}>
            <td className="font-medium">{p.nombre}</td>
            <td>{p.rtn || "N/A"}</td>
            <td>{p.telefono || "N/A"}</td>
            <td className="text-center"><Badge bg={p.estado ? "success" : "danger"}>{p.estado ? "Activo" : "Inactivo"}</Badge></td>
            <td className="text-center">
              <button onClick={() => onEdit(p, "id_proveedor")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar"><Edit className="w-4 h-4 text-neutral-600" /></button>
            </td>
          </tr>
        ));
      case "transportes":
        return filteredData.map((t) => (
          <tr key={t.id_transporte}>
            <td className="font-medium">{t.nombre}</td>
            <td>{t.rtn || "N/A"}</td>
            <td>{t.telefono || "N/A"}</td>
            <td className="text-center"><Badge bg={t.estado ? "success" : "danger"}>{t.estado ? "Activo" : "Inactivo"}</Badge></td>
            <td className="text-center">
              <button onClick={() => onEdit(t, "id_transporte")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar"><Edit className="w-4 h-4 text-neutral-600" /></button>
            </td>
          </tr>
        ));
      case "conductores":
        return filteredData.map((c) => (
          <tr key={c.id_conductor}>
            <td className="font-medium">{c.nombre}</td>
            <td>{c.dni || "N/A"}</td>
            <td>{c.licencia || "N/A"}</td>
            <td>{c.telefono || "N/A"}</td>
            <td className="text-center"><Badge bg={c.estado ? "success" : "danger"}>{c.estado ? "Activo" : "Inactivo"}</Badge></td>
            <td className="text-center">
              <button onClick={() => onEdit(c, "id_conductor")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar"><Edit className="w-4 h-4 text-neutral-600" /></button>
            </td>
          </tr>
        ));
      case "placas-cabezal":
        return filteredData.map((p) => (
          <tr key={p.id_placa_cabezal}>
            <td className="font-medium">{p.placa}</td>
            <td className="text-center"><Badge bg={p.estado ? "success" : "danger"}>{p.estado ? "Activo" : "Inactivo"}</Badge></td>
            <td className="text-center">
              <button onClick={() => onEdit(p, "id_placa_cabezal")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar"><Edit className="w-4 h-4 text-neutral-600" /></button>
            </td>
          </tr>
        ));
      case "placas-furgon":
        return filteredData.map((p) => (
          <tr key={p.id_placa_furgon}>
            <td className="font-medium">{p.placa}</td>
            <td className="text-center"><Badge bg={p.estado ? "success" : "danger"}>{p.estado ? "Activo" : "Inactivo"}</Badge></td>
            <td className="text-center">
              <button onClick={() => onEdit(p, "id_placa_furgon")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar"><Edit className="w-4 h-4 text-neutral-600" /></button>
            </td>
          </tr>
        ));
      case "cosechas":
        return filteredData.map((c) => (
          <tr key={c.id_cosecha}>
            <td className="font-medium">{c.cosecha}</td>
            <td className="text-center">{c.cosecha_actual ? <Badge bg="info">Cosecha Actual</Badge> : ""}</td>
            <td className="text-center"><Badge bg={c.estado ? "success" : "danger"}>{c.estado ? "Activo" : "Inactivo"}</Badge></td>
            <td className="text-center">
              <button onClick={() => onEdit(c, "id_cosecha")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar"><Edit className="w-4 h-4 text-neutral-600" /></button>
            </td>
          </tr>
        ));
      case "departamentos":
        return filteredData.map((d) => (
          <tr key={d.id_departamento}>
            <td className="font-medium">{d.nombre}</td>
            <td className="text-center"><Badge bg={d.estado ? "success" : "danger"}>{d.estado ? "Activo" : "Inactivo"}</Badge></td>
            <td className="text-center">
              <button onClick={() => onEdit(d, "id_departamento")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar"><Edit className="w-4 h-4 text-neutral-600" /></button>
            </td>
          </tr>
        ));
      case "municipios":
        return filteredData.map((m) => (
          <tr key={m.id_municipio}>
            <td className="font-medium">{m.nombre}</td>
            <td>{m.departamento?.nombre || "N/A"}</td>
            <td className="text-center"><Badge bg={m.estado ? "success" : "danger"}>{m.estado ? "Activo" : "Inactivo"}</Badge></td>
            <td className="text-center">
              <button onClick={() => onEdit(m, "id_municipio")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar"><Edit className="w-4 h-4 text-neutral-600" /></button>
            </td>
          </tr>
        ));
      case "bodegas":
        return filteredData.map((b) => (
          <tr key={b.id_bodega}>
            <td className="font-medium">{b.nombre}</td>
            <td className="text-center"><Badge bg={b.externa ? "warning" : "info"}>{b.externa ? "Externa" : "Interna"}</Badge></td>
            <td className="text-center"><Badge bg={b.estado ? "success" : "danger"}>{b.estado ? "Activo" : "Inactivo"}</Badge></td>
            <td className="text-center">
              <button onClick={() => onEdit(b, "id_bodega")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar"><Edit className="w-4 h-4 text-neutral-600" /></button>
            </td>
          </tr>
        ));
      case "estibas":
        return filteredData.map((e) => (
          <tr key={e.id_estibas}>
            <td className="font-medium">{e.nombre}</td>
            <td>{e.bodega?.nombre || "N/A"}</td>
            <td className="text-center"><Badge bg={e.estado ? "success" : "danger"}>{e.estado ? "Activo" : "Inactivo"}</Badge></td>
            <td className="text-center">
              <button onClick={() => onEdit(e, "id_estibas")} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar"><Edit className="w-4 h-4 text-neutral-600" /></button>
            </td>
          </tr>
        ));
      default: // Catálogos simples (Catadores, Calidades, Defectos, Zarandas, Tazas)
        return filteredData.map((item) => {
          const idField = Object.keys(item).find(key => key.startsWith('id_')) || 'id';
          return (
            <tr key={item[idField]}>
              <td className="font-medium">{item.nombre}</td>
              <td className="text-center"><Badge bg={item.estado ? "success" : "danger"}>{item.estado ? "Activo" : "Inactivo"}</Badge></td>
              <td className="text-center">
                <button onClick={() => onEdit(item, idField)} className="p-1.5 rounded-lg hover:bg-neutral-100" title="Editar"><Edit className="w-4 h-4 text-neutral-600" /></button>
              </td>
            </tr>
          );
        });
    }
  };

  return (
    <Table responsive hover className="mb-0">
      <thead>
        <tr>
          <th>Descripción principal</th>
          {(activeTab === "proveedores" || activeTab === "transportes") && <th>RTN</th>}
          {activeTab === "conductores" && <th>DNI</th>}
          {activeTab === "conductores" && <th>Licencia</th>}
          {["proveedores", "conductores", "transportes"].includes(activeTab) && <th>Teléfono</th>}
          {activeTab === "municipios" && <th>Departamento</th>}
          {activeTab === "cosechas" && <th className="text-center">Status</th>}
          {activeTab === "bodegas" && <th className="text-center">Tipo</th>}
          {activeTab === "estibas" && <th>Bodega</th>}
          <th className="text-center">Estado</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>{renderTableContent()}</tbody>
    </Table>
  );
}
