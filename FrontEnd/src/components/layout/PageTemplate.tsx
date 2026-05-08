import React, { useState } from "react";
import { Plus, Search, Filter, Download, RefreshCw } from "lucide-react";
import { Card, Table, Badge, Button, Modal, Form, InputGroup } from 'react-bootstrap';

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
};

type FormField = {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "textarea";
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  span?: 1 | 2; // col-span
};

type PageTemplateProps<T> = {
  title: string;
  subtitle?: string;
  moduleColor: string;
  columns: Column<T>[];
  data: T[];
  formFields: FormField[];
  entityName: string; // "Remisión", "Contrato", etc.
  showFilters?: boolean;
};

export default function PageTemplate<T extends { id: number | string; status?: string }>({
  title,
  subtitle,
  moduleColor,
  columns,
  data,
  formFields,
  entityName,
  showFilters = true,
}: PageTemplateProps<T>) {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleCloseModal = () => setIsModalOpen(false);

  const filteredData = data.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusVariant = (status?: string) => {
    switch (status) {
      case "aprobado":
      case "completado":
        return "success";
      case "pendiente":
      case "en_proceso":
        return "warning";
      case "rechazado":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-1.5 h-8 rounded-full"
            style={{ backgroundColor: moduleColor }}
          />
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-0">{title}</h1>
            {subtitle && <p className="text-neutral-600 mb-0">{subtitle}</p>}
          </div>
        </div>
        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" /> Nuevo {entityName}
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card>
          <Card.Body className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <InputGroup>
                  <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
                  <Form.Control
                    placeholder="Buscar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className="flex gap-2">
                <Button variant="outline-secondary" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Filtros
                </Button>
                <Button variant="outline-secondary" className="flex items-center gap-2">
                  <Download className="w-4 h-4" /> Exportar
                </Button>
                <Button variant="ghost" className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" /> Actualizar
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Table */}
      <Card>
        <Table responsive hover className="mb-0">
          <thead className="bg-light">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className={col.align === "right" ? "text-end" : col.align === "center" ? "text-center" : ""}>
                  {col.label}
                </th>
              ))}
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-5 text-neutral-500">
                  No hay {entityName.toLowerCase()}s registrados
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td key={String(col.key)} className={col.align === "right" ? "text-end" : col.align === "center" ? "text-center" : ""}>
                      {col.render
                        ? col.render(row)
                        : col.key === "status"
                        ? <Badge bg={getStatusVariant(row.status)}>
                            {String(row.status).replace('_', ' ').toUpperCase()}
                          </Badge>
                        : String((row as Record<string, unknown>)[col.key as string] ?? "")}
                    </td>
                  ))}
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="link" size="sm" className="p-1 text-neutral-600">
                        Ver
                      </Button>
                      <Button variant="link" size="sm" className="p-1 text-neutral-600">
                        Editar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        {totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center p-3 border-top">
             <div className="text-sm text-neutral-600">
                Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredData.length)} de {filteredData.length} registros
             </div>
             <div className="d-flex gap-2">
                <Button 
                  variant="outline-secondary" 
                  size="sm" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  Anterior
                </Button>
                <Button 
                  variant="outline-secondary" 
                  size="sm" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Siguiente
                </Button>
             </div>
          </div>
        )}
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        show={isModalOpen}
        onHide={handleCloseModal}
        size="lg"
      >
        <Form onSubmit={(e) => { e.preventDefault(); handleCloseModal(); }}>
          <Modal.Header closeButton>
            <Modal.Title>Nuevo {entityName}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formFields.map((field) => (
                <div
                  key={field.name}
                  className={field.span === 2 ? "sm:col-span-2" : ""}
                >
                  <Form.Group>
                    <Form.Label>
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Form.Label>
                    {field.type === "select" ? (
                      <Form.Select required={field.required}>
                        <option value="">Seleccione...</option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </Form.Select>
                    ) : field.type === "textarea" ? (
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    ) : (
                      <Form.Control
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    )}
                  </Form.Group>
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar {entityName}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
