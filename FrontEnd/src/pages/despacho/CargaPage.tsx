import { Truck, CheckCircle } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button, ProgressBar } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.despacho;
const mockCargas = [
  { id: "CG-2024-0001", orden: "OC-2024-0001", contenedor: "CONT-4521", sacosTotal: 410, sacosCargados: 280, estado: "en_proceso" },
  { id: "CG-2024-0002", orden: "OC-2024-0002", contenedor: "CONT-4522", sacosTotal: 486, sacosCargados: 486, estado: "completado" },
];

export default function CargaPage() {
  return (
    <div>
      <PageHeader title="Carga de Contenedor" subtitle="Proceso de carga" icon={Truck} iconBg={colors.bg} iconColor={colors.icon} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <Card.Header><Card.Title as="h5" className="mb-0">Carga en Proceso</Card.Title></Card.Header>
          <Card.Body>
            <div className="p-4 border-2 border-success border-opacity-25 bg-success bg-opacity-10 rounded-xl">
              <div className="flex justify-between mb-4">
                <div>
                  <span className="text-lg font-bold text-success">CONT-4521</span>
                  <p className="text-sm text-success mb-0">Orden: OC-2024-0001</p>
                </div>
                <Badge bg="success">En Carga</Badge>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>280 / 410 sacos</span>
                  <span className="font-semibold">68%</span>
                </div>
                <ProgressBar variant="success" now={68} style={{ height: '12px' }} className="rounded-pill" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline-secondary" size="sm">Pausar</Button>
                <Button variant="success" size="sm" className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Finalizar
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header><Card.Title as="h5" className="mb-0">Estadísticas</Card.Title></Card.Header>
          <Card.Body className="space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-600">Contenedores hoy</span>
              <span className="font-bold">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Sacos cargados</span>
              <span className="font-bold">766</span>
            </div>
          </Card.Body>
        </Card>
      </div>
      
      <Card>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Orden</th>
              <th>Contenedor</th>
              <th className="text-center">Total</th>
              <th className="text-center">Cargados</th>
              <th className="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {mockCargas.map((c) => (
              <tr key={c.id}>
                <td className="font-medium text-success">{c.id}</td>
                <td>{c.orden}</td>
                <td>{c.contenedor}</td>
                <td className="text-center">{c.sacosTotal}</td>
                <td className="text-center">{c.sacosCargados}</td>
                <td className="text-center">
                  <Badge bg={c.estado === "completado" ? "success" : "info"}>
                    {c.estado === "en_proceso" ? "En Proceso" : "Completado"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
