import { Search, Database, Plus } from "lucide-react";
import { Card, Form, InputGroup, Row, Col, Button } from 'react-bootstrap';
import Pageheader from "../../../../layout/layoutcomponent/pageheader";
import Select from 'react-select';

interface CatalogosHeaderProps {
  activeTab: string;
  tabs: { id: string; label: string }[];
  searchTerm: string;
  onTabChange: (tab: any) => void;
  onSearchChange: (term: string) => void;
  onAdd: () => void;
}

export default function CatalogosHeader({
  activeTab,
  tabs,
  searchTerm,
  onTabChange,
  onSearchChange,
  onAdd
}: CatalogosHeaderProps) {
  const currentTabLabel = tabs.find(t => t.id === activeTab)?.label || "";

  const options = tabs.map(t => ({ value: t.id, label: t.label }));
  const defaultValue = options.find(o => o.value === activeTab);

  return (
    <>
      <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
        <Pageheader title="Catálogos Operativos" heading="Administración" active="Catálogos" />
        <div className="ms-md-1 ms-0">
          <Button 
            variant="primary" 
            className="btn-wave"
            onClick={onAdd}
          >
            <Plus className="w-4 h-4 me-1 inline-block" /> Nuevo {currentTabLabel.replace("es", "").replace("as", "a")}
          </Button>
        </div>
      </div>

      <Card className="custom-card mb-4">
        <Card.Body>
          <Row className="gy-3 align-items-center">
            <Col md={4} xl={3}>
              <Select 
                options={options} 
                classNamePrefix='Select2'
                placeholder="Seleccionar catálogo..."
                value={defaultValue}
                onChange={(selected: any) => onTabChange(selected.value)}
                isSearchable={true}
              />
            </Col>
            <Col md={8} xl={9}>
              <InputGroup style={{ maxWidth: '400px' }}>
                <InputGroup.Text className="bg-light border-end-0 text-muted">
                  <Search className="w-4 h-4" />
                </InputGroup.Text>
                <Form.Control 
                  type="text" 
                  placeholder={`Buscar en ${currentTabLabel.toLowerCase()}...`} 
                  className="bg-light border-start-0 ps-0"
                  value={searchTerm} 
                  onChange={(e) => onSearchChange(e.target.value)} 
                />
              </InputGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}


