import { Settings } from "lucide-react";
import PageHeader from "../../../../components/layout/PageHeader";

// Components
import EmpresaConfig from "../Components/EmpresaConfig";
import OperacionConfig from "../Components/OperacionConfig";
import NotificacionesConfig from "../Components/NotificacionesConfig";
import ConsecutivosConfig from "../Components/ConsecutivosConfig";

export default function ConfiguracionPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Configuración" subtitle="Parámetros del sistema" icon={Settings} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmpresaConfig />
        <OperacionConfig />
        <NotificacionesConfig />
        <ConsecutivosConfig />
      </div>
    </div>
  );
}
