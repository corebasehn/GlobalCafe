import { FC, Fragment } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Pageheader from '../../../layout/layoutcomponent/pageheader';
import SunEditor from 'suneditor-react';

interface ComponentProps { }

const Editor: FC<ComponentProps> = () => {
    return (
        <Fragment>
            <Pageheader title="Sun Editor"  heading="Forms"  active="Sun Editor" />


            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>
                                Sun Editor
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <SunEditor />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

           
        </Fragment>
    );
};

export default Editor;