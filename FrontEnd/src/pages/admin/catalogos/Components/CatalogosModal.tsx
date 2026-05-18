import { Modal, Form, Button } from 'react-bootstrap';

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

    switch (activeTab) {
      case "proveedores":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Group><Form.Label>Nombre del Proveedor</Form.Label><Form.Control type="text" value={formData.nombre || ""} onChange={(e) => onChange({...formData, nombre: e.target.value})} required /></Form.Group>
            <Form.Group><Form.Label>RTN (Opcional)</Form.Label><Form.Control type="text" value={formData.rtn || ""} onChange={(e) => onChange({...formData, rtn: e.target.value})} /></Form.Group>
            <Form.Group><Form.Label>Municipio</Form.Label><Form.Select value={formData.id_municipio || ""} onChange={(e) => onChange({...formData, id_municipio: e.target.value})} required><option value="">Seleccione un municipio</option>{municipios.map(m => <option key={m.id_municipio} value={m.id_municipio}>{`${m.nombre}${((m as any).departamento?.nombre) ? `- ${(m as any).departamento.nombre}` : ''}`}</option>)}</Form.Select></Form.Group>
            <Form.Group><Form.Label>Teléfono (Opcional)</Form.Label><Form.Control type="text" value={formData.telefono || ""} onChange={(e) => onChange({...formData, telefono: e.target.value})} /></Form.Group>
            <div className="md:col-span-2">
              <Form.Group><Form.Label>Dirección (Opcional)</Form.Label><Form.Control type="text" value={formData.direccion || ""} onChange={(e) => onChange({...formData, direccion: e.target.value})} /></Form.Group>
            </div>
          </div>
        );
      case "transportes":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Group><Form.Label>Nombre de la Empresa</Form.Label><Form.Control type="text" value={formData.nombre || ""} onChange={(e) => onChange({...formData, nombre: e.target.value})} required /></Form.Group>
            <Form.Group><Form.Label>RTN (Opcional)</Form.Label><Form.Control type="text" value={formData.rtn || ""} onChange={(e) => onChange({...formData, rtn: e.target.value})} /></Form.Group>
            <Form.Group><Form.Label>Municipio</Form.Label><Form.Select value={formData.id_municipio || ""} onChange={(e) => onChange({...formData, id_municipio: e.target.value})} required><option value="">Seleccione un municipio</option>{municipios.map(m => <option key={m.id_municipio} value={m.id_municipio}>{m.nombre}</option>)}</Form.Select></Form.Group>
            <Form.Group><Form.Label>Contacto Principal</Form.Label><Form.Control type="text" value={formData.contacto || ""} onChange={(e) => onChange({...formData, contacto: e.target.value})} /></Form.Group>
            <Form.Group><Form.Label>Teléfono (Opcional)</Form.Label><Form.Control type="text" value={formData.telefono || ""} onChange={(e) => onChange({...formData, telefono: e.target.value})} /></Form.Group>
            <div className="md:col-span-2">
              <Form.Group><Form.Label>Dirección (Opcional)</Form.Label><Form.Control type="text" value={formData.direccion || ""} onChange={(e) => onChange({...formData, direccion: e.target.value})} /></Form.Group>
            </div>
          </div>
        );
      case "conductores":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Group><Form.Label>Nombre del Conductor</Form.Label><Form.Control type="text" value={formData.nombre || ""} onChange={(e) => onChange({...formData, nombre: e.target.value})} required /></Form.Group>
            <Form.Group><Form.Label>DNI (Opcional)</Form.Label><Form.Control type="text" value={formData.dni || ""} onChange={(e) => onChange({...formData, dni: e.target.value})} /></Form.Group>
            <Form.Group><Form.Label>Licencia (Opcional)</Form.Label><Form.Control type="text" value={formData.licencia || ""} onChange={(e) => onChange({...formData, licencia: e.target.value})} /></Form.Group>
            <Form.Group><Form.Label>Empresa de Transporte</Form.Label><Form.Select value={formData.id_transporte || ""} onChange={(e) => onChange({...formData, id_transporte: e.target.value})} required><option value="">Seleccione transporte</option>{transportes.map(t => <option key={t.id_transporte} value={t.id_transporte}>{t.nombre}</option>)}</Form.Select></Form.Group>
            <Form.Group><Form.Label>Municipio</Form.Label><Form.Select value={formData.id_municipio || ""} onChange={(e) => onChange({...formData, id_municipio: e.target.value})} required><option value="">Seleccione municipio</option>{municipios.map(m => <option key={m.id_municipio} value={m.id_municipio}>{m.nombre}</option>)}</Form.Select></Form.Group>
            <Form.Group><Form.Label>Teléfono (Opcional)</Form.Label><Form.Control type="text" value={formData.telefono || ""} onChange={(e) => onChange({...formData, telefono: e.target.value})} /></Form.Group>
          </div>
        );
      case "placas-cabezal":
      case "placas-furgon":
        return (
          <div className="space-y-4">
            <Form.Group><Form.Label>Número de Placa</Form.Label><Form.Control type="text" value={formData.placa || ""} onChange={(e) => onChange({...formData, placa: e.target.value})} required /></Form.Group>
          </div>
        );
      case "cosechas":
        return (
          <div className="space-y-4">
            <Form.Group><Form.Label>Periodo de Cosecha</Form.Label><Form.Control type="text" placeholder="Ej: 2024-2025" value={formData.cosecha || ""} onChange={(e) => onChange({...formData, cosecha: e.target.value})} required /></Form.Group>
            <Form.Check type="checkbox" label="Establecer como Cosecha Actual" checked={formData.cosecha_actual ?? false} onChange={(e) => onChange({...formData, cosecha_actual: e.target.checked})} className="mt-4" />
          </div>
        );
      case "departamentos":
        return (
          <div className="space-y-4">
            <Form.Group><Form.Label>Nombre del Departamento</Form.Label><Form.Control type="text" value={formData.nombre || ""} onChange={(e) => onChange({...formData, nombre: e.target.value})} required /></Form.Group>
          </div>
        );
      case "municipios":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Group><Form.Label>Nombre del Municipio</Form.Label><Form.Control type="text" value={formData.nombre || ""} onChange={(e) => onChange({...formData, nombre: e.target.value})} required /></Form.Group>
            <Form.Group><Form.Label>Departamento</Form.Label><Form.Select value={formData.id_departamento || ""} onChange={(e) => onChange({...formData, id_departamento: e.target.value})} required><option value="">Seleccione departamento</option>{departamentos.map(d => <option key={d.id_departamento} value={d.id_departamento}>{d.nombre}</option>)}</Form.Select></Form.Group>
          </div>
        );
      case "bodegas":
        return (
          <div className="space-y-4">
            <Form.Group><Form.Label>Nombre de la Bodega</Form.Label><Form.Control type="text" placeholder="Ej: Bodega Principal" value={formData.nombre || ""} onChange={(e) => onChange({...formData, nombre: e.target.value})} required /></Form.Group>
            <Form.Check type="checkbox" label="Es Bodega Externa (Alquilada/Fuera del beneficio)" checked={formData.externa ?? false} onChange={(e) => onChange({...formData, externa: e.target.checked})} className="mt-4" />
          </div>
        );
      case "estibas":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Group><Form.Label>Nombre de la Estiba / Lote Físico</Form.Label><Form.Control type="text" placeholder="Ej: Estiba A-1" value={formData.nombre || ""} onChange={(e) => onChange({...formData, nombre: e.target.value})} required /></Form.Group>
            <Form.Group><Form.Label>Bodega a la que pertenece</Form.Label><Form.Select value={formData.id_bodega || ""} onChange={(e) => onChange({...formData, id_bodega: e.target.value})} required><option value="">Seleccione una bodega</option>{bodegas.map(b => <option key={b.id_bodega} value={b.id_bodega}>{b.nombre}</option>)}</Form.Select></Form.Group>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <Form.Group><Form.Label>Descripción / Nombre</Form.Label><Form.Control type="text" value={formData.nombre || ""} onChange={(e) => onChange({...formData, nombre: e.target.value})} required /></Form.Group>
          </div>
        );
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Editar Registro" : "Nuevo Registro"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="space-y-4">
          {renderModalForm()}
          {editingId && (
            <Form.Check 
              type="checkbox" 
              label="Registro Activo" 
              checked={formData.estado ?? true} 
              onChange={(e) => onChange({...formData, estado: e.target.checked})} 
              className="mt-4" 
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" type="submit">
            {editingId ? "Guardar Cambios" : "Crear Registro"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
