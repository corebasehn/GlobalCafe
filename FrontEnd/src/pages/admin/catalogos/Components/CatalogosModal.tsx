import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

interface CatalogosModalProps {
  show: boolean;
  activeTab: string;
  editingId: number | null;
  formData: any;
  catalogs: {
    municipios: any[];
    departamentos: any[];
    transportes: any[];
    bodegas: any[];
  };
  onClose: () => void;
  onChange: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function CatalogosModal({
  show,
  activeTab,
  editingId,
  formData,
  catalogs,
  onClose,
  onChange,
  onSubmit
}: CatalogosModalProps) {
  
  const renderModalForm = () => {
    const { municipios, departamentos, transportes, bodegas } = catalogs;

    // Helper to find current value for react-select
    const findOption = (options: any[], value: any) => options.find(o => String(o.value) === String(value)) || null;

    const municipioOptions = municipios.map(m => ({
      value: m.id_municipio,
      label: `${m.nombre}${((m as any).departamento?.nombre) ? ` - ${(m as any).departamento.nombre}` : ''}`
    }));

    const departamentoOptions = departamentos.map(d => ({
      value: d.id_departamento,
      label: d.nombre
    }));

    const transporteOptions = transportes.map(t => ({
      value: t.id_transporte,
      label: t.nombre
    }));

    const bodegaOptions = bodegas.map(b => ({
      value: b.id_bodega,
      label: b.nombre
    }));

    switch (activeTab) {
      case "proveedores":
        return (
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Nombre del Proveedor</Form.Label>
                <Form.Control type="text" value={formData.nombre || ""} onChange={(e) => onChange({...formData, nombre: e.target.value})} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">RTN (Opcional)</Form.Label>
                <Form.Control type="text" value={formData.rtn || ""} onChange={(e) => onChange({...formData, rtn: e.target.value})} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Municipio</Form.Label>
                <Select
                  options={municipioOptions}
                  classNamePrefix='Select2'
                  placeholder="Seleccione municipio..."
                  value={findOption(municipioOptions, formData.id_municipio)}
                  onChange={(sel: any) => onChange({...formData, id_municipio: sel?.value})}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Teléfono (Opcional)</Form.Label>
                <Form.Control type="text" value={formData.telefono || ""} onChange={(e) => onChange({...formData, telefono: e.target.value})} />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Dirección (Opcional)</Form.Label>
                <Form.Control type="text" value={formData.direccion || ""} onChange={(e) => onChange({...formData, direccion: e.target.value})} />
              </Form.Group>
            </Col>
          </Row>
        );
      case "transportes":
        return (
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Nombre de la Empresa</Form.Label>
                <Form.Control type="text" value={formData.nombre || ""} onChange={(e) => onChange({...formData, nombre: e.target.value})} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">RTN (Opcional)</Form.Label>
                <Form.Control type="text" value={formData.rtn || ""} onChange={(e) => onChange({...formData, rtn: e.target.value})} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Municipio</Form.Label>
                <Select
                  options={municipioOptions}
                  classNamePrefix='Select2'
                  placeholder="Seleccione municipio..."
                  value={findOption(municipioOptions, formData.id_municipio)}
                  onChange={(sel: any) => onChange({...formData, id_municipio: sel?.value})}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Contacto Principal</Form.Label>
                <Form.Control type="text" value={formData.contacto || ""} onChange={(e) => onChange({...formData, contacto: e.target.value})} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Teléfono (Opcional)</Form.Label>
                <Form.Control type="text" value={formData.telefono || ""} onChange={(e) => onChange({...formData, telefono: e.target.value})} />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Dirección (Opcional)</Form.Label>
                <Form.Control type="text" value={formData.direccion || ""} onChange={(e) => onChange({...formData, direccion: e.target.value})} />
              </Form.Group>
            </Col>
          </Row>
        );
      case "conductores":
        return (
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Nombre del Conductor</Form.Label>
                <Form.Control type="text" value={formData.nombre || ""} onChange={(e) => onChange({...formData, nombre: e.target.value})} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">DNI (Opcional)</Form.Label>
                <Form.Control type="text" value={formData.dni || ""} onChange={(e) => onChange({...formData, dni: e.target.value})} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Licencia (Opcional)</Form.Label>
                <Form.Control type="text" value={formData.licencia || ""} onChange={(e) => onChange({...formData, licencia: e.target.value})} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Empresa de Transporte</Form.Label>
                <Select
                  options={transporteOptions}
                  classNamePrefix='Select2'
                  placeholder="Seleccione transporte..."
                  value={findOption(transporteOptions, formData.id_transporte)}
                  onChange={(sel: any) => onChange({...formData, id_transporte: sel?.value})}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Municipio</Form.Label>
                <Select
                  options={municipioOptions}
                  classNamePrefix='Select2'
                  placeholder="Seleccione municipio..."
                  value={findOption(municipioOptions, formData.id_municipio)}
                  onChange={(sel: any) => onChange({...formData, id_municipio: sel?.value})}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Teléfono (Opcional)</Form.Label>
                <Form.Control type="text" value={formData.telefono || ""} onChange={(e) => onChange({...formData, telefono: e.target.value})} />
              </Form.Group>
            </Col>
          </Row>
        );
      case "placas-cabezal":
      case "placas-furgon":
        return (
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Número de Placa</Form.Label>
                <Form.Control type="text" value={formData.placa || ""} onChange={(e) => onChange({...formData, placa: e.target.value})} required />
              </Form.Group>
            </Col>
          </Row>
        );
      case "cosechas":
        return (
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Periodo de Cosecha</Form.Label>
                <Form.Control type="text" placeholder="Ej: 2024-2025" value={formData.cosecha || ""} onChange={(e) => onChange({...formData, cosecha: e.target.value})} required />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Check type="checkbox" label="Establecer como Cosecha Actual" checked={formData.cosecha_actual ?? false} onChange={(e) => onChange({...formData, cosecha_actual: e.target.checked})} className="mt-2 mb-3" />
            </Col>
          </Row>
        );
      case "departamentos":
        return (
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Nombre del Departamento</Form.Label>
                <Form.Control type="text" value={formData.nombre || ""} onChange={(e) => onChange({...formData, nombre: e.target.value})} required />
              </Form.Group>
            </Col>
          </Row>
        );
      case "municipios":
        return (
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Nombre del Municipio</Form.Label>
                <Form.Control type="text" value={formData.nombre || ""} onChange={(e) => onChange({...formData, nombre: e.target.value})} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Departamento</Form.Label>
                <Select
                  options={departamentoOptions}
                  classNamePrefix='Select2'
                  placeholder="Seleccione departamento..."
                  value={findOption(departamentoOptions, formData.id_departamento)}
                  onChange={(sel: any) => onChange({...formData, id_departamento: sel?.value})}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        );
      case "bodegas":
        return (
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Nombre de la Bodega</Form.Label>
                <Form.Control type="text" placeholder="Ej: Bodega Principal" value={formData.nombre || ""} onChange={(e) => onChange({...formData, nombre: e.target.value})} required />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Check type="checkbox" label="Es Bodega Externa (Alquilada/Fuera del beneficio)" checked={formData.externa ?? false} onChange={(e) => onChange({...formData, externa: e.target.checked})} className="mt-2 mb-3" />
            </Col>
          </Row>
        );
      case "estibas":
        return (
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Nombre de la Estiba / Lote Físico</Form.Label>
                <Form.Control type="text" placeholder="Ej: Estiba A-1" value={formData.nombre || ""} onChange={(e) => onChange({...formData, nombre: e.target.value})} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Bodega a la que pertenece</Form.Label>
                <Select
                  options={bodegaOptions}
                  classNamePrefix='Select2'
                  placeholder="Seleccione bodega..."
                  value={findOption(bodegaOptions, formData.id_bodega)}
                  onChange={(sel: any) => onChange({...formData, id_bodega: sel?.value})}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        );
      case "tipos-cafe":
        return (
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Descripción del Tipo de Café</Form.Label>
                <Form.Control type="text" placeholder="Ej: Café Pergamino Seco" value={formData.tipo_cafe || ""} onChange={(e) => onChange({...formData, tipo_cafe: e.target.value})} required />
              </Form.Group>
            </Col>
          </Row>
        );
      case "tipos-remision":
        return (
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Descripción del Tipo de Remisión</Form.Label>
                <Form.Control type="text" placeholder="Ej: Remisión de Compra" value={formData.tipo_remision || ""} onChange={(e) => onChange({...formData, tipo_remision: e.target.value})} required />
              </Form.Group>
            </Col>
          </Row>
        );
      case "tipos-empaque":
        return (
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Descripción del Tipo de Empaque</Form.Label>
                <Form.Control type="text" placeholder="Ej: Saco de Yute" value={formData.tipo_empaque || ""} onChange={(e) => onChange({...formData, tipo_empaque: e.target.value})} required />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Tara (Libras)</Form.Label>
                <Form.Control type="number" step="0.01" value={formData.tara || 0} onChange={(e) => onChange({...formData, tara: e.target.value})} required />
              </Form.Group>
            </Col>
          </Row>
        );
      default:
        return (
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Descripción / Nombre</Form.Label>
                <Form.Control type="text" value={formData.nombre || ""} onChange={(e) => onChange({...formData, nombre: e.target.value})} required />
              </Form.Group>
            </Col>
          </Row>
        );
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="fs-18">{editingId ? "Editar Registro" : "Nuevo Registro"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {renderModalForm()}
          {editingId && (
            <Row>
              <Col md={12}>
                <Form.Check 
                  type="checkbox" 
                  label="Registro Activo" 
                  checked={formData.estado ?? true} 
                  onChange={(e) => onChange({...formData, estado: e.target.checked})} 
                  className="mt-2" 
                />
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn-wave" type="button" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" className="btn-wave" type="submit">
            {editingId ? "Guardar Cambios" : "Crear Registro"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}


