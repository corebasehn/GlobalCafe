import { useState } from "react";
import { FileText, Search, Printer, Download } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.recepcion;

const mockNotas = [
  { id: "NP-2024-0001", remision: "R-2024-0001", proveedor: "Finca El Paraíso", fecha: "2024-01-15", pesoNeto: 6700, precioQQ: 850, total: 126.65, estado: "liquidado" },
  { id: "NP-2024-0002", remision: "R-2024-0002", proveedor: "Cooperativa Café Alto", fecha: "2024-01-15", pesoNeto: 10300, precioQQ: 860, total: 196.83, estado: "pendiente" },
  { id: "NP-2024-0003", remision: "R-2024-0003", proveedor: "Hacienda Santa Rosa", fecha: "2024-01-14", pesoNeto: 8700, precioQQ: 855, total: 165.32, estado: "liquidado" },
];

export default function NotaPesoPage() {
  const [selectedNota, setSelectedNota] = useState<typeof mockNotas[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCloseModal = () => setSelectedNota(null);

  return (
    <div>
      <PageHeader title="Nota de Peso" subtitle="Liquidación de entregas de café" icon={FileText} iconBg={colors.bg} iconColor={colors.icon} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-amber-600 mb-0">8</p>
            <p className="text-sm text-neutral-600 mb-0">Pendientes de Liquidar</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-green-600 mb-0">$45,280</p>
            <p className="text-sm text-neutral-600 mb-0">Liquidado Hoy</p>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Body className="p-4">
            <p className="text-3xl font-bold text-coffee-700 mb-0">156</p>
            <p className="text-sm text-neutral-600 mb-0">Notas del Mes</p>
          </Card.Body>
        </Card>
      </div>

      <Card className="mb-6">
        <Card.Body className="p-4">
          <InputGroup>
            <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
            <Form.Control 
              placeholder="Buscar nota de peso..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </InputGroup>
        </Card.Body>
      </Card>

      <Card>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>No. Nota</th>
              <th>Remisión</th>
              <th>Proveedor</th>
              <th>Fecha</th>
              <th className="text-end">Peso Neto (kg)</th>
              <th className="text-end">Precio/QQ</th>
              <th className="text-end">Total (QQ)</th>
              <th className="text-center">Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockNotas
              .filter(n => n.proveedor.toLowerCase().includes(searchTerm.toLowerCase()) || n.id.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((nota) => (
                <tr key={nota.id}>
                  <td className="font-medium text-coffee-700">{nota.id}</td>
                  <td>{nota.remision}</td>
                  <td>{nota.proveedor}</td>
                  <td>{nota.fecha}</td>
                  <td className="text-end">{nota.pesoNeto.toLocaleString()}</td>
                  <td className="text-end">${nota.precioQQ}</td>
                  <td className="text-end font-semibold">{nota.total.toFixed(2)}</td>
                  <td className="text-center">
                    <Badge bg={nota.estado === "liquidado" ? "success" : "warning"}>
                      {nota.estado === "liquidado" ? "COMPLETADO" : "PENDIENTE"}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="link" size="sm" className="p-1 text-neutral-600" title="Ver detalle" onClick={() => setSelectedNota(nota)}>
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="link" size="sm" className="p-1 text-neutral-600" title="Imprimir">
                        <Printer className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card>

      <Modal show={!!selectedNota} onHide={handleCloseModal} size="lg">
        {selectedNota && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Nota de Peso</Modal.Title>
            </Modal.Header>
            <Modal.Body className="space-y-4">
              <div className="border-2 border-dashed border-neutral-200 rounded-xl p-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-neutral-900 mb-0">NOTA DE PESO</h3>
                  <p className="text-coffee-700 font-bold mb-0">{selectedNota.id}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-neutral-500">Proveedor:</span><br/><span className="font-medium">{selectedNota.proveedor}</span></div>
                  <div><span className="text-neutral-500">Fecha:</span><br/><span className="font-medium">{selectedNota.fecha}</span></div>
                  <div><span className="text-neutral-500">Remisión:</span><br/><span className="font-medium">{selectedNota.remision}</span></div>
                  <div><span className="text-neutral-500">Peso Neto:</span><br/><span className="font-medium">{selectedNota.pesoNeto.toLocaleString()} kg</span></div>
                </div>
                <div className="border-top border-neutral-200 mt-4 pt-4">
                  <div className="flex justify-between align-items-center mb-2">
                    <span className="text-neutral-600">Precio por Quintal:</span>
                    <span className="font-medium">${selectedNota.precioQQ}</span>
                  </div>
                  <div className="flex justify-between align-items-center text-lg">
                    <span className="fw-bold">Total Quintales:</span>
                    <span className="fw-bold text-coffee-700">{selectedNota.total.toFixed(2)} QQ</span>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
              <Button variant="outline-primary" className="flex items-center gap-2">
                <Download className="w-4 h-4" /> Descargar PDF
              </Button>
              <Button variant="primary" className="flex items-center gap-2">
                <Printer className="w-4 h-4" /> Imprimir
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
