import { Fragment } from 'react';
import {  Card, Col, Row } from 'react-bootstrap';
import Pageheader from '../../layout/layoutcomponent/pageheader';


//react tabuelater 

import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import { BasicTable, ResponsiveDataTable, Savetable } from '../../common/Tablefunctionality';

const DataTables = () => {
  return(
  <Fragment>
    
      <Pageheader title="DATA TABLES"  heading="Tables"   active="Data tables" />

      <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Basic Datatable
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-responsive">
                                <BasicTable />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header className='pb-0'>
                            <div className="card-title">
                                Responsive Datatable
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <ResponsiveDataTable />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Delete Row Datatable</div>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-responsive">
                                <Savetable />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

  </Fragment>
); 
};

export default DataTables;
