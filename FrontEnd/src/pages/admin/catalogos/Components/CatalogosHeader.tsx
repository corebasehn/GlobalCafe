import { Search, Database, Plus } from "lucide-react";
import { Card, Form, InputGroup } from 'react-bootstrap';
import PageHeader from "../../../../components/layout/PageHeader";

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

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Catálogos Operativos" 
        subtitle="Mantenimiento general de catálogos del sistema" 
        icon={Database} 
        actions={[{ 
          label: `Nuevo ${currentTabLabel.replace("es", "")}`, 
          onClick: onAdd, 
          icon: Plus 
        }]} 
      />

      <Card className="mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:max-w-sm">
            <Form.Select 
              value={activeTab} 
              onChange={(e) => onTabChange(e.target.value)} 
            >
              {tabs.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </Form.Select>
          </div>
          <div className="w-full sm:max-w-md">
            <InputGroup>
              <InputGroup.Text><Search className="w-4 h-4 text-neutral-400" /></InputGroup.Text>
              <Form.Control 
                type="text" 
                placeholder={`Buscar en ${currentTabLabel.toLowerCase()}...`} 
                value={searchTerm} 
                onChange={(e) => onSearchChange(e.target.value)} 
              />
            </InputGroup>
          </div>
        </div>
      </Card>
    </div>
  );
}
