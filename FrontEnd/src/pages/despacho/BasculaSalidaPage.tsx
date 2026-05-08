import { Weight, CheckCircle, AlertTriangle } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.despacho;
const mockPesajes = [
  { id: "PS-2024-0001", contenedor: "CONT-4521", esperado: 25010, real: 24980, diff: -30, estado: "ok" },
  { id: "PS-2024-0002", contenedor: "CONT-4522", esperado: 29646, real: 29500, diff: -146, estado: "error" },
];

export default function BasculaSalidaPage() {
  return (
    <div>
      <PageHeader title="Báscula de Salida" subtitle="Validación de peso" icon={Weight} iconBg={colors.bg} iconColor={colors.icon} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <Card.Header><Card.Title as="h5" className="mb-0">Pesaje Actual</Card.Title></Card.Header>
          <Card.Body>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-neutral-50 rounded-xl">
                <p className="text-4xl font-bold text-neutral-900">25,010</p>
                <p className="text-sm text-neutral-600 mt-1">Esperado (kg)</p>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl">
                <p className="text-4xl font-bold text-neutral-900">24,980</p>
                <p className="text-sm text-neutral-600 mt-1">Real (kg)</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <p className="text-4xl font-bold text-green-700">-30</p>
                <p className="text-sm text-green-600 mt-1">Diferencia (kg)</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-100 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">Dentro de tolerancia (±50 kg)</span>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header><Card.Title as="h5" className="mb-0">Resumen</Card.Title></Card.Header>
          <Card.Body className="space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-600">Validados</span>
              <span className="font-bold">5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Correctos</span>
              <span className="font-bold text-green-600">4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Con diferencia</span>
              <span className="font-bold text-red-600">1</span>
            </div>
          </Card.Body>
        </Card>
      </div>

      <Card>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Contenedor</th>
              <th className="text-end">Esperado</th>
              <th className="text-end">Real</th>
              <th className="text-end">Diferencia</th>
              <th className="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {mockPesajes.map((p) => (
              <tr key={p.id}>
                <td className="font-medium text-success">{p.id}</td>
                <td>{p.contenedor}</td>
                <td className="text-end">{p.esperado.toLocaleString()} kg</td>
                <td className="text-end">{p.real.toLocaleString()} kg</td>
                <td className={`text-end ${p.estado === "ok" ? "text-green-600" : "text-red-600"}`}>
                  {p.diff} kg
                </td>
                <td className="text-center">
                  {p.estado === "ok" ? (
                    <span className="flex items-center justify-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" /> OK
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1 text-red-600">
                      <AlertTriangle className="w-4 h-4" /> Revisar
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
