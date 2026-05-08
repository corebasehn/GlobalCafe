import  { Fragment } from 'react';
import {  Card, Col, Dropdown, Form, FormGroup, Nav, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pageheader from '../../../layout/layoutcomponent/pageheader';
import { Mailcomposedata } from '../../../common/commondata';

const MailCompose = () =>{ 
  return(
  <Fragment>
    
 <Pageheader title="MAIL COMPOSE"  heading="Mail"   active="Mail Compose" />

    <Row className=" row-sm">
     
      <Col lg={4} xl={3} md={12} sm={12}>
        <Card className="mg-b-20">
          <Card.Body className="main-content-left main-content-left-mail card-body">
            <Link to={`${import.meta.env.BASE_URL}pages/mail/mailcompose/`} className="btn btn-primary btn-compose">
              Compose
            </Link>
            <div className="main-mail-menu">
              <Nav
                className="nav main-nav-column mg-b-20"
                defaultActiveKey="Inbox"
              >
                {Mailcomposedata.map((idx)=>(
                <Nav.Item key={Math.random()}>
                  <Nav.Link className="nav-link thumb " eventKey={idx.key}>
                    <i className={idx.icon}></i> {idx.text1} <span>{idx.text2}</span>
                  </Nav.Link>
                </Nav.Item>
                ))}

              </Nav>
              <Form.Label className="main-content-label main-content-label-sm">
                Settings
              </Form.Label>
              <Nav className="nav main-nav-column" defaultActiveKey="Email">
                <Nav.Item>
                  <Nav.Link className="nav-link " eventKey="Email">
                    Email Settings
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>

          </Card.Body>
        </Card>
      </Col>
   
      <Col lg={8} xl={9} md={12} sm={12}>
        <Card>
          <Card.Header>
            <h3 className="card-title">Compose new message</h3>
          </Card.Header>
          <Card.Body>
            <Form>
              <FormGroup className="form-group">
                <Row className=" align-items-center">
                  <Col as="label" sm={2}>
                    To
                  </Col>
                  <Col sm={10}>
                    <Form.Control type="text" className="form-control" />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup className="form-group">
                <Row className=" align-items-center">
                  <Col as="label" sm={2}>
                    Subject
                  </Col>
                  <Col sm={10}>
                    <Form.Control type="text" className="form-control" />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup className="form-group">
                <Row className=" ">
                  <Col as="label" sm={2}>
                    Message
                  </Col>
                  <Col sm={10}>
                    <textarea rows={10} className="form-control"></textarea>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </Card.Body>
          <div className="main-chat-footer d-sm-flex">
            <Nav className="nav">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="button-tooltip-2">Attach</Tooltip>}
              >
                <i className="nav-link bx bx-paperclip text-muted fs-18"></i>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="button-tooltip-2">Link</Tooltip>}
              >
                <i className="nav-link bx bx-link text-muted fs-18"></i>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="button-tooltip-2">Photos</Tooltip>}
              >
                <i className="nav-link bx bx-image text-muted fs-18"></i>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}
              >
                <i className="nav-link bx bx-trash text-muted fs-18"></i>
              </OverlayTrigger>
            </Nav>
            <div className="btn-list ms-auto">
            <Link className="main-msg-send bg-primary text-white" to="#">
              <OverlayTrigger placement="top" overlay={<Tooltip  id="button-tooltip-2">Send</Tooltip>}>
               <i className="far fa-paper-plane"></i>
              </OverlayTrigger>
              </Link>
              <Dropdown as="span">
                <Dropdown.Toggle as='a'
                variant=''
                  className="no-caret ms-2 br-5 p-2 border"
                >
                  <i className="fe fe-more-vertical align-middle"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className=" fs-13" style={{margin:"0px"}}>
                  <Dropdown.Item>
                    Schedule send
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Mark As Important
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Discard
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Help and feedback
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
 
  </Fragment>
);
};

export default MailCompose;
