import { useState } from "react";
import { FileStack, Download, Printer, Plus } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.despacho;
const mockDocs = [
  { id: "DOC-2024-0001", contenedor: "CONT-4520", bl: "MAEU123456789", packing: "PL-0001", fecha: "2024-01-14", estado: "completo" },
  { id: "DOC-2024-0002", contenedor: "CONT-4521", bl: "Pendiente", packing: "PL-0002", fecha: "2024-01-16", estado: "parcial" },
];

export default function DocumentacionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <PageHeader title="Documentación Final" subtitle="BL, Packing List, Certificados" icon={FileStack} iconBg={colors.bg} iconColor={colors.icon} actions={[{ label: "Generar", onClick: () => setIsModalOpen(true), icon: Plus }]} />
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card><Card.Body className="p-4 text-center"><p className="text-3xl font-bold text-green-600">45</p><p className="text-sm text-neutral-600">BL Emitidos</p></Card.Body></Card>
        <Card><Card.Body className="p-4 text-center"><p className="text-3xl font-bold text-blue-600">45</p><p className="text-sm text-neutral-600">Packing List</p></Card.Body></Card>
        <Card><Card.Body className="p-4 text-center"><p className="text-3xl font-bold text-purple-600">45</p><p className="text-sm text-neutral-600">Certificados</p></Card.Body></Card>
        <Card><Card.Body className="p-4 text-center"><p className="text-3xl font-bold text-amber-600">2</p><p className="text-sm text-neutral-600">Pendientes</p></Card.Body></Card>
      </div>
      <Card>
        <Table responsive hover className="mb-0">
          <thead><tr><th>ID</th><th>Contenedor</th><th>BL</th><th>Packing</th><th>Fecha</th><th className="text-center">Estado</th><th className="text-center">Acciones</th></tr></thead>
          <tbody>
            {mockDocs.map((d) => (<tr key={d.id}><td className="font-medium text-green-700">{d.id}</td><td>{d.contenedor}</td><td>{d.bl === "Pendiente" ? <Badge bg="warning" text="dark">Pendiente</Badge> : d.bl}</td><td>{d.packing}</td><td>{d.fecha}</td><td className="text-center"><Badge bg={d.estado === "completo" ? "success" : "info"}>{d.estado === "completo" ? "Completado" : "En Proceso"}</Badge></td><td className="text-center"><div className="flex items-center justify-center gap-1"><button className="p-1.5 rounded-lg hover:bg-neutral-100"><Download className="w-4 h-4 text-neutral-600" /></button><button className="p-1.5 rounded-lg hover:bg-neutral-100"><Printer className="w-4 h-4 text-neutral-600" /></button></div></td></tr>))}
          </tbody>
        </Table>
      </Card>
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} size="sm">
        <Form>
          <Modal.Header closeButton><Modal.Title>Generar Documentación</Modal.Title></Modal.Header>
          <Modal.Body className="space-y-4">
            <Form.Group><Form.Label>Contenedor</Form.Label><Form.Select><option value="CONT-4521">CONT-4521</option></Form.Select></Form.Group>
            <Form.Group><Form.Label>Número de BL</Form.Label><Form.Control type="text" placeholder="MAEU..." /></Form.Group>
          </Modal.Body>
          <Modal.Footer><Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button><Button variant="primary" type="submit">Generar</Button></Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
