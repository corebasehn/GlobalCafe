import { Modal, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Package, AlertTriangle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import Select from "react-select";
import { RecepcionPatio, NotaPatioRequest } from "../../../../api/patio.api";
import { Estiba, TipoEmpaque } from "../../../../api/catalogs.api";

interface NotaPatioModalProps {
  show: boolean;
  item: RecepcionPatio | null;
  estibas: Estiba[];
  tiposEmpaque: TipoEmpaque[];
  onClose: () => void;
  onSubmit: (payload: NotaPatioRequest) => void;
}

export default function NotaPatioModal({ show, item, estibas, tiposEmpaque, onClose, onSubmit }: NotaPatioModalProps) {
  const [sacosBuenos, setSacosBuenos] = useState<number>(0);
  const [sacosFaltos, setSacosFaltos] = useState<number>(0);
  const [idEstiba, setIdEstiba] = useState<number>(0);
  const [idTipoEmpaque, setIdTipoEmpaque] = useState<number>(0);
  const [observaciones, setObservaciones] = useState<string>("");

  useEffect(() => {
    if (item) {
      setSacosBuenos(item.cantidad_sacos);
      setSacosFaltos(0);
      setObservaciones("");
      setIdEstiba(0);
      setIdTipoEmpaque(item.id_tipo_empaque || item.tipo_empaque?.id_tipo_empaque || 0);
    }
  }, [item, show]);

  if (!item) return null;

  const tipoEmpaqueOptions = tiposEmpaque.map(t => ({
    value: t.id_tipo_empaque.toString(),
    label: `${t.tipo_empaque} (${Number(t.tara)} LB/saco)`
  }));

  const selectedEmpaqueOption = tipoEmpaqueOptions.find(o => o.value === idTipoEmpaque.toString()) || null;

  const totalSacos = sacosBuenos + sacosFaltos;
  const dif = totalSacos - item.cantidad_sacos;

  const handleSacosBuenosChange = (val: number) => {
    setSacosBuenos(val);
    // Auto-ajustar faltos si se desea, pero mejor dejar que el usuario lo haga
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idEstiba === 0) return;
    
    onSubmit({
      id_detalle_recepcion: item.id_detalle_recepcion,
      id_estiba: idEstiba,
      cantidad_sacos_buenos: sacosBuenos,
      cantidad_sacos_faltos: sacosFaltos,
      observaciones_faltos: observaciones,
      id_tipo_empaque: idTipoEmpaque > 0 ? idTipoEmpaque : undefined
    });
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" backdrop="static">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton className="bg-coffee-50">
          <Modal.Title className="flex items-center gap-2 text-coffee-800">
            <Package /> Generar Nota de Patio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="bg-neutral-50 p-3 rounded-lg mb-4 border border-neutral-200">
            <Row>
              <Col md={4}>
                <p className="mb-1 text-xs text-neutral-500 uppercase font-bold">Proveedor</p>
                <p className="font-medium text-truncate">{item.proveedor.nombre}</p>
              </Col>
              <Col md={3}>
                <p className="mb-1 text-xs text-neutral-500 uppercase font-bold">Remisión</p>
                <p className="font-medium">{item.remision}</p>
              </Col>
              <Col md={3}>
                <p className="mb-1 text-xs text-neutral-500 uppercase font-bold">Empaque Remisión</p>
                <p className="font-medium text-coffee-800">{item.tipo_empaque?.tipo_empaque || "N/A"}</p>
              </Col>
              <Col md={2}>
                <p className="mb-1 text-xs text-neutral-500 uppercase font-bold">Sacos Remitidos</p>
                <p className="font-bold text-lg text-coffee-700">{item.cantidad_sacos}</p>
              </Col>
            </Row>
          </div>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="font-bold text-success-700 flex items-center gap-2">
                  <CheckCircle size={18}/> Sacos Buenos (Descargados)
                </Form.Label>
                <Form.Control
                  type="number"
                  size="lg"
                  value={sacosBuenos}
                  onChange={(e) => handleSacosBuenosChange(Number(e.target.value))}
                  onWheel={(e) => e.currentTarget.blur()}
                  min={0}
                  required
                />
                <Form.Text className="text-muted">Cantidad de sacos que ingresarán al inventario normal.</Form.Text>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="font-bold text-danger-700 flex items-center gap-2">
                  <AlertTriangle size={18}/> Sacos Faltos / Problemas
                </Form.Label>
                <Form.Control
                  type="number"
                  size="lg"
                  value={sacosFaltos}
                  onChange={(e) => setSacosFaltos(Number(e.target.value))}
                  onWheel={(e) => e.currentTarget.blur()}
                  min={0}
                />
                <Form.Text className="text-muted">Sacos con humedad, olor o daños (Requiere aprobación).</Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="font-bold">Ubicación (Estiba de Bodega)</Form.Label>
                <Form.Select 
                  value={idEstiba} 
                  onChange={(e) => setIdEstiba(Number(e.target.value))}
                  required
                >
                  <option value="">Seleccione la estiba donde se bajó el café</option>
                  {estibas.map(est => (
                    <option key={est.id_estibas} value={est.id_estibas}>
                      {est.bodega?.nombre} - {est.nombre}
                    </option>
                  ))}
                </Form.Select>
                <Form.Text className="text-muted">Estiba física donde se almacena el lote.</Form.Text>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="font-bold">Tipo de Empaque (Verificado en Patio)</Form.Label>
                <Select
                  options={tipoEmpaqueOptions}
                  value={selectedEmpaqueOption}
                  onChange={(opt) => setIdTipoEmpaque(opt ? Number(opt.value) : 0)}
                  placeholder="Seleccione tipo de empaque..."
                  isClearable={false}
                />
                <Form.Text className="text-muted">
                  Por defecto viene el de remisión. Cámbielo si físicamente llegó en otro empaque.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          {sacosFaltos > 0 && (
            <Alert variant="warning" className="border-2 border-warning-200">
              <Alert.Heading className="text-sm font-bold flex items-center gap-2">
                <AlertTriangle size={16}/> Justificación de Sacos Faltos
              </Alert.Heading>
              <Form.Control 
                as="textarea" 
                rows={2}
                placeholder="Explique por qué estos sacos son faltos (humedad, olor, etc.)"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                required={sacosFaltos > 0}
              />
              <p className="mt-2 mb-0 text-xs">
                * Este registro se enviará a gerencia para su aprobación antes de poder pesarse.
              </p>
            </Alert>
          )}

          {dif !== 0 && (
            <Alert variant={dif > 0 ? "info" : "danger"} className="py-2 text-center">
              La suma total ({totalSacos}) {dif > 0 ? "excede" : "es menor"} a la remisión por {Math.abs(dif)} sacos.
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-neutral-50">
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button 
            variant="primary" 
            type="submit" 
            disabled={idEstiba === 0 || (sacosFaltos > 0 && !observaciones)}
          >
            Confirmar Nota de Patio
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
