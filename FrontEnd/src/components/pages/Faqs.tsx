import { Fragment } from 'react';
import { Accordion, Card, Col, FormGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pageheader from '../../layout/layoutcomponent/pageheader';

const Faqs = () => {
  return (
    <Fragment>

      <Pageheader title="FAQ'S" heading="Pages" active="Faq's" />
      <Row className='faq'>
        <Col xl={12}>
          <div className="panel-group2" id="accordion11" role="tablist">

            <Accordion className='accordion-customicon1 accordions-items-seperate'>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  1. How To Insert All The Plugins?
                </Accordion.Header>
                <Accordion.Body className='fs-14'>
                    I must explain to you how all this mistaken idea of
                    denouncing pleasure and praising pain was born and I will
                    give you a complete account of the system, and expound the
                    actual teachings of the great explorer of the truth, the
                    master-builder of human happiness. No one rejects, dislikes,
                    or avoids pleasure itself, because it is pleasure, but
                    because those who do not know how to pursue pleasure
                    rationally encounter consequences
                
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className="accordion-customicon1 accordions-items-seperate my-2">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  2. How Can I contact?
                </Accordion.Header>
                <Accordion.Body>
                    I must explain to you how all this mistaken idea of
                    denouncing pleasure and praising pain was born and I will
                    give you a complete account of the system, and expound the
                    actual teachings of the great explorer of the truth, the
                    master-builder of human happiness. No one rejects, dislikes,
                    or avoids pleasure itself, because it is pleasure, but
                    because those who do not know how to pursue pleasure
                    rationally encounter consequences
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className="accordion-customicon1 accordions-items-seperate my-2">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  3. Can I use this Plugins in Another Template?
                </Accordion.Header>
                <Accordion.Body>
                    I must explain to you how all this mistaken idea of
                    denouncing pleasure and praising pain was born and I will
                    give you a complete account of the system, and expound the
                    actual teachings of the great explorer of the truth, the
                    master-builder of human happiness. No one rejects,
                    dislikes, or avoids pleasure itself, because it is
                    pleasure, but because those who do not know how to pursue
                    pleasure rationally encounter consequences
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className="accordion-customicon1 accordions-items-seperate my-2">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  4. It is Easy to Customizable?
                </Accordion.Header>
                <Accordion.Body>
                    I must explain to you how all this mistaken idea of
                    denouncing pleasure and praising pain was born and I will
                    give you a complete account of the system, and expound the
                    actual teachings of the great explorer of the truth, the
                    master-builder of human happiness. No one rejects,
                    dislikes, or avoids pleasure itself, because it is
                    pleasure, but because those who do not know how to pursue
                    pleasure rationally encounter consequences
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className="accordion-customicon1 accordions-items-seperate my-2">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  5. How Can I Add another page in Template?
                </Accordion.Header>
                <Accordion.Body>
                    I must explain to you how all this mistaken idea of
                    denouncing pleasure and praising pain was born and I will
                    give you a complete account of the system, and expound the
                    actual teachings of the great explorer of the truth, the
                    master-builder of human happiness. No one rejects,
                    dislikes, or avoids pleasure itself, because it is
                    pleasure, but because those who do not know how to pursue
                    pleasure rationally encounter consequences
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className="accordion-customicon1 accordions-items-seperate my-2">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  6. How can I download This template?
                </Accordion.Header>
                <Accordion.Body>
                    I must explain to you how all this mistaken idea of
                    denouncing pleasure and praising pain was born and I will
                    give you a complete account of the system, and expound the
                    actual teachings of the great explorer of the truth, the
                    master-builder of human happiness. No one rejects,
                    dislikes, or avoids pleasure itself, because it is
                    pleasure, but because those who do not know how to pursue
                    pleasure rationally encounter consequences
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className="accordion-customicon1 accordions-items-seperate my-2">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  7. How To Add additional plugins?
                </Accordion.Header>
                <Accordion.Body>
                    I must explain to you how all this mistaken idea of
                    denouncing pleasure and praising pain was born and I will
                    give you a complete account of the system, and expound the
                    actual teachings of the great explorer of the truth, the
                    master-builder of human happiness. No one rejects,
                    dislikes, or avoids pleasure itself, because it is
                    pleasure, but because those who do not know how to pursue
                    pleasure rationally encounter consequences
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

          </div>
        </Col>
      </Row>

      <Row>
        <Col xl={12}>
          <Card>
            <Card.Header>
              <h3 className="card-title">Ask Question</h3>
            </Card.Header>
            <Card.Body>
              <h6>
                If Your Query Not Clarified Post Your Question, My Customer
                Support will help You.
              </h6>
              <div className="pt-4">
                <FormGroup className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="name1"
                    placeholder="Your Name"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email Address"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <textarea
                    className="form-control"
                    name="example-textarea-input"
                    rows={6}
                    placeholder="Post Your Query"
                  ></textarea>
                </FormGroup>
                <Link to="#" className="btn btn-primary">
                  Send Question
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Faqs;
