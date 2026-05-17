import { Search } from "lucide-react";
import { Card, Form, InputGroup } from "react-bootstrap";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function BuscadorRemision({ value, onChange }: Readonly<Props>) {
  return (
    <Card className="mb-6">
      <Card.Body className="p-4">
        <InputGroup>
          <InputGroup.Text>
            <Search className="w-4 h-4 text-neutral-400" />
          </InputGroup.Text>
          <Form.Control
            placeholder="Buscar por número de entrada o proveedor..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </InputGroup>
      </Card.Body>
    </Card>
  );
}
