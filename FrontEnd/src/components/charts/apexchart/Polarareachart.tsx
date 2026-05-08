import { FC, Fragment } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Basicpolararea, Monochromepolar } from '../../../common/Chartfunction';
import Pageheader from '../../../layout/layoutcomponent/pageheader';

interface ComponentProps { }

const Polarareachart: FC<ComponentProps> = () => {
    return (
        <Fragment>
            <Pageheader title="Apex Polar Area Charts"  heading="Apex Charts"   active="Apex Polar Area Charts" />


            <Row>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Basic Polar Area Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="polararea-basic">
                                <Basicpolararea />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Polar Area Monochrome Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="polararea-monochrome">
                                <Monochromepolar />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Polarareachart;