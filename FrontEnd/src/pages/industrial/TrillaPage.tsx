
import { Factory, Play, Pause } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Badge, Button } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.industrial;

const mockProcesos = [
  { id: "TR-2024-0001", orden: "OS-2024-0001", maquina: "Trilladora 1", inicio: "08:00", sacosEntrada: 100, sacosOro: 82, merma: 18, estado: "en_proceso" },
  { id: "TR-2024-0002", orden: "OS-2024-0002", maquina: "Trilladora 2", inicio: "07:30", sacosEntrada: 150, sacosOro: 123, merma: 27, estado: "completado" },
];

export default function TrillaPage() {


  return (
    <div>
      <PageHeader title="Proceso de Trilla" subtitle="Operación de maquinaria" icon={Factory} iconBg={colors.bg} iconColor={colors.icon} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <Card.Header><Card.Title as="h5" className="mb-0">Control de Máquinas</Card.Title></Card.Header>
          <Card.Body>
            <div className="grid grid-cols-2 gap-4">
              {["Trilladora 1", "Trilladora 2"].map((maq, idx) => (
                <div key={maq} className="p-4 border rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">{maq}</span>
                    <Badge bg={idx === 0 ? "success" : "secondary"}>
                      {idx === 0 ? "Activa" : "Inactiva"}
                    </Badge>
                  </div>
                  <div className="text-sm text-neutral-600 mb-3">
                    <div>Orden: {idx === 0 ? "OS-2024-0001" : "-"}</div>
                    <div>Avance: {idx === 0 ? "82 sacos" : "-"}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant={idx === 0 ? "outline-danger" : "outline-success"} className="flex items-center gap-1">
                      {idx === 0 ? <><Pause className="w-3 h-3" /> Pausar</> : <><Play className="w-3 h-3" /> Iniciar</>}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header><Card.Title as="h5" className="mb-0">Resumen del Día</Card.Title></Card.Header>
          <Card.Body className="space-y-3">
            <div className="flex justify-between"><span className="text-neutral-600">Sacos procesados</span><span className="font-bold">250</span></div>
            <div className="flex justify-between"><span className="text-neutral-600">Sacos de oro</span><span className="font-bold text-success">205</span></div>
            <div className="flex justify-between"><span className="text-neutral-600">Merma total</span><span className="font-bold text-warning">45</span></div>
            <div className="flex justify-between"><span className="text-neutral-600">Rendimiento</span><span className="font-bold text-coffee-700">82%</span></div>
          </Card.Body>
        </Card>
      </div>

      <Card>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>ID Proceso</th>
              <th>Orden</th>
              <th>Máquina</th>
              <th>Inicio</th>
              <th className="text-center">Entrada</th>
              <th className="text-center">Oro</th>
              <th className="text-center">Merma</th>
              <th className="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {mockProcesos.map((p) => (
              <tr key={p.id}>
                <td className="font-medium text-orange-700">{p.id}</td>
                <td>{p.orden}</td>
                <td>{p.maquina}</td>
                <td>{p.inicio}</td>
                <td className="text-center">{p.sacosEntrada}</td>
                <td className="text-center text-success font-semibold">{p.sacosOro}</td>
                <td className="text-center text-warning">{p.merma}</td>
                <td className="text-center">
                  <Badge bg={p.estado === "completado" ? "success" : "info"}>
                    {p.estado.replace('_', ' ').toUpperCase()}
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
