import { useState } from "react";
import { Receipt, Search, Printer, Download } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.ventas;
const mockSalidas = [
  { id: "SVL-2024-0001", orden: "OVL-2024-0001", cliente: "Distribuidora Local SA", producto: "Cisco", peso: 502, total: 7530, fecha: "2024-01-16", estado: "completado" },
  { id: "SVL-2024-0002", orden: "OVL-2024-0002", cliente: "Café Regional", producto: "Pasilla", peso: 198, total: 3960, fecha: "2024-01-15", estado: "completado" },
];

export default function SalidaVentaPage() {
  const [selectedSalida, setSelectedSalida] = useState<typeof mockSalidas[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <PageHeader title="Salida Venta Local" subtitle="Registro de despachos locales" icon={Receipt} iconBg={colors.bg} iconColor={colors.icon} />
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card><Card.Body className="p-4 text-center"><p className="text-3xl font-bold text-green-600">156</p><p className="text-sm text-neutral-600">Salidas (Mes)</p></Card.Body></Card>
        <Card><Card.Body className="p-4 text-center"><p className="text-3xl font-bold text-coffee-700">12,450</p><p className="text-sm text-neutral-600">Kg Despachados</p></Card.Body></Card>
        <Card><Card.Body className="p-4 text-center"><p className="text-3xl font-bold text-green-600">$186,750</p><p className="text-sm text-neutral-600">Valor Total</p></Card.Body></Card>
        <Card><Card.Body className="p-4 text-center"><p className="text-3xl font-bold text-amber-600">45</p><p className="text-sm text-neutral-600">Clientes</p></Card.Body></Card>
      </div>
      <Card className="mb-6">
        <Card.Body className="p-4">
          <InputGroup>
            <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
            <Form.Control type="text" placeholder="Buscar salida..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </InputGroup>
        </Card.Body>
      </Card>
      <Card>
        <Table responsive hover className="mb-0">
          <thead><tr><th>No. Salida</th><th>Orden</th><th>Cliente</th><th>Producto</th><th className="text-right">Peso (kg)</th><th className="text-right">Total ($)</th><th>Fecha</th><th className="text-center">Estado</th><th className="text-center">Acciones</th></tr></thead>
          <tbody>
            {mockSalidas.map((s) => (<tr key={s.id}><td className="font-medium text-red-700">{s.id}</td><td>{s.orden}</td><td>{s.cliente}</td><td>{s.producto}</td><td className="text-right">{s.peso}</td><td className="text-right font-semibold">${s.total.toLocaleString()}</td><td>{s.fecha}</td><td className="text-center"><Badge bg="success">Completado</Badge></td><td className="text-center"><div className="flex items-center justify-center gap-1"><button className="p-1.5 rounded-lg hover:bg-neutral-100" onClick={() => setSelectedSalida(s)}><Receipt className="w-4 h-4 text-neutral-600" /></button><button className="p-1.5 rounded-lg hover:bg-neutral-100"><Printer className="w-4 h-4 text-neutral-600" /></button></div></td></tr>))}
          </tbody>
        </Table>
      </Card>
      <Modal show={!!selectedSalida} onHide={() => setSelectedSalida(null)} size="sm">
        {selectedSalida && (
          <>
            <Modal.Header closeButton><Modal.Title>Comprobante de Salida</Modal.Title></Modal.Header>
            <Modal.Body className="space-y-4">
              <div className="border-2 border-dashed border-neutral-200 rounded-xl p-6">
                <div className="text-center mb-4"><h3 className="text-xl font-bold">COMPROBANTE DE SALIDA</h3><p className="text-red-700 font-semibold">{selectedSalida.id}</p></div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-neutral-500">Cliente:</span><br/><span className="font-medium">{selectedSalida.cliente}</span></div>
                  <div><span className="text-neutral-500">Fecha:</span><br/><span className="font-medium">{selectedSalida.fecha}</span></div>
                  <div><span className="text-neutral-500">Producto:</span><br/><span className="font-medium">{selectedSalida.producto}</span></div>
                  <div><span className="text-neutral-500">Peso:</span><br/><span className="font-medium">{selectedSalida.peso} kg</span></div>
                </div>
                <div className="border-t border-neutral-200 mt-4 pt-4 text-lg flex justify-between"><span className="font-semibold">TOTAL:</span><span className="font-bold text-red-700">${selectedSalida.total.toLocaleString()}</span></div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setSelectedSalida(null)}>Cerrar</Button>
              <Button variant="outline-primary" className="flex items-center gap-2"><Download className="w-4 h-4" /> PDF</Button>
              <Button variant="primary" className="flex items-center gap-2"><Printer className="w-4 h-4" /> Imprimir</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
