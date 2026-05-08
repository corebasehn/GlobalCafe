
import { Calculator, Save } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { Card, Table, Button, Form } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";

const colors = moduleColors.industrial;

const mockBalances = [
  { id: "BM-2024-0001", proceso: "TR-2024-0001", fecha: "2024-01-15", pesoEntrada: 6100, pesoOro: 5002, pesoCiscos: 854, pesoMerma: 244, rendimiento: 82.0 },
  { id: "BM-2024-0002", proceso: "TR-2024-0002", fecha: "2024-01-14", pesoEntrada: 9150, pesoOro: 7503, pesoCiscos: 1281, pesoMerma: 366, rendimiento: 82.0 },
];

export default function BalanceMasasPage() {


  return (
    <div>
      <PageHeader title="Balance de Masas" subtitle="Registro y control de resultados" icon={Calculator} iconBg={colors.bg} iconColor={colors.icon} />

      <Card className="mb-6">
        <Card.Header><Card.Title as="h5" className="mb-0">Registrar Balance</Card.Title></Card.Header>
        <Card.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <Form.Group>
                <Form.Label>Proceso de Trilla</Form.Label>
                <Form.Select>
                  <option value="">Seleccione</option>
                  <option value="TR-2024-0001">TR-2024-0001</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Peso Oro (kg)</Form.Label>
                <Form.Control type="number" placeholder="0" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Peso Ciscos (kg)</Form.Label>
                <Form.Control type="number" placeholder="0" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Peso Merma (kg)</Form.Label>
                <Form.Control type="number" placeholder="0" />
              </Form.Group>
              <Button variant="primary" type="submit" className="flex items-center gap-2 justify-center h-11">
                <Save className="w-4 h-4" /> Guardar Balance
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>ID Balance</th>
              <th>Proceso</th>
              <th>Fecha</th>
              <th className="text-end">Entrada (kg)</th>
              <th className="text-end">Oro (kg)</th>
              <th className="text-end">Ciscos (kg)</th>
              <th className="text-end">Merma (kg)</th>
              <th className="text-center">Rendimiento</th>
            </tr>
          </thead>
          <tbody>
            {mockBalances.map((b) => (
              <tr key={b.id}>
                <td className="font-medium text-orange-700">{b.id}</td>
                <td>{b.proceso}</td>
                <td>{b.fecha}</td>
                <td className="text-end">{b.pesoEntrada.toLocaleString()}</td>
                <td className="text-end text-success font-semibold">{b.pesoOro.toLocaleString()}</td>
                <td className="text-end">{b.pesoCiscos.toLocaleString()}</td>
                <td className="text-end text-warning">{b.pesoMerma.toLocaleString()}</td>
                <td className="text-center font-bold">{b.rendimiento}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
