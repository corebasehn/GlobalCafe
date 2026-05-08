import { FC, Fragment } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Basicboxplot, Boxplothorizontal, Boxplotscatter } from '../../../common/Chartfunction';
import Pageheader from '../../../layout/layoutcomponent/pageheader';

interface ComponentProps { }

const Boxplotchart: FC<ComponentProps> = () => {
    return (
        <Fragment>
            <Pageheader title="Apex Boxplot Charts"  heading="Apex Charts"   active="Apex Boxplot Charts" />


            <Row>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Basic Boxplot Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="boxplot-basic">
                                <Basicboxplot />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Boxplot With Scatter Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="boxplot-scatter">
                                <Boxplotscatter />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Horizontal Boxplot Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="boxplot-horizontal">
                                <Boxplothorizontal />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Boxplotchart;