import { Fragment } from "react";
import Pageheader from "../../../../layout/layoutcomponent/pageheader";
import { Row, Col } from 'react-bootstrap';

// Components
import EmpresaConfig from "../Components/EmpresaConfig";
import OperacionConfig from "../Components/OperacionConfig";
import NotificacionesConfig from "../Components/NotificacionesConfig";
import ConsecutivosConfig from "../Components/ConsecutivosConfig";

export default function ConfiguracionPage() {
  return (
    <Fragment>
      <Pageheader title="CONFIGURACIÓN" heading="Administración" active="Parámetros del sistema" />
      
      <Row>
        <Col xl={12}>
          <EmpresaConfig />
        </Col>
        {/* El resto de configuraciones se habilitarán cuando las tablas de DB estén listas
        <Col xl={6}>
          <OperacionConfig />
        </Col>
        <Col xl={6}>
          <NotificacionesConfig />
        </Col>
        <Col xl={6}>
          <ConsecutivosConfig />
        </Col>
        */}
      </Row>
    </Fragment>
  );
}


