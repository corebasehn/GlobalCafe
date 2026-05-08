import { Fragment } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Pageheader from '../../layout/layoutcomponent/pageheader';

const EmptyPage = () => {
  return(
  <Fragment>
 
      <Pageheader title="EMPTY PAGE"  heading="Pages"   active="Empty Page" />
      <Row>
        <Col md={12} xl={12} xs={12} sm={12} >
          <Card>
            <Card.Body>
              <div>
                <h6>Type text here.....</h6>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
);
};

export default EmptyPage;
