import  { Fragment ,useState } from "react";
import Select from 'react-select';
import {Button,Card,Col,Form,FormGroup,Nav,Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pageheader from "../../../layout/layoutcomponent/pageheader";
import { Mailcomposedata } from "../../../common/commondata";
import { OptionLanguage, OptionTimezone } from "../../../common/selectdata";
const Mailsettings = () => {

  const [Timezone, setTimezone] = useState<any>("");
  const [Language, setLanguage] = useState<any>("");

  const handleOnchangeTimezone = () => {
    setTimezone(Timezone);
  };

  const handleOnchangeLanguage = () => {
    setLanguage(Language);
  };
  return (
    <Fragment>

        <Pageheader title="MAIL SETTINGS"  heading="Mail"   active="Mail-settings" />
        <Row className="row-sm">
          
          <Col lg={4} xl={3} md={12} sm={12}>
            <Card className=" mg-b-20">
              <Card.Body className="main-content-left main-content-left-mail ">
                <Button className="btn btn-primary btn-compose" id="btnCompose">
                  Email Settings
                </Button>
                <div className="main-mail-menu">
                  <Nav
                    className="nav main-nav-column mg-b-20"
                    defaultActiveKey="Inbox"
                  >
                    {Mailcomposedata.map((idx)=>(
                    <Nav.Item key={Math.random()}>
                      <Nav.Link className="nav-link thumb" eventKey={idx.key}>
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
                      <Nav.Link className="nav-link" eventKey="Email">
                        Email Settings
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
               
              </Card.Body>
            </Card>
          </Col>
         
          <Col lg={8} xl={9}>
            <Card>
              <Card.Body>
                <Form className="form-horizontal">
                  <div className="mb-4 main-content-label">Account</div>
                  <FormGroup className="form-group ">
                    <Row>
                      <Col md={3} className="">
                        <Form.Label className="form-label">User Name</Form.Label>
                      </Col>
                      <Col md={9}>
                        <Form.Control
                          type="text"
                          placeholder="User Name"
                          defaultValue="Petey"
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className="form-group ">
                    <Row>
                      <Col md={3} className="">
                        <Form.Label className="form-label">Email</Form.Label>
                      </Col>
                      <Col md={9}>
                        <Form.Control
                          type="text"
                          placeholder="Email"
                          defaultValue="info@Nowa.in"
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className="form-group ">
                    <Row>
                      <Col md={3} className="">
                        <Form.Label className="form-label">Language</Form.Label>
                      </Col>
                      <Col md={9}>
                        <Select
                          onChange={handleOnchangeLanguage}
                          options={OptionLanguage}
                          placeholder="Us English"
                          // classNamePrefix="selectproduct"
                          classNamePrefix="Select2"
                          isSearchable

                        />

                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className="form-group ">
                    <Row>
                      <Col md={3} className="">
                        <Form.Label className="form-label">Timezone</Form.Label>
                      </Col>
                      <Col md={9}>
                        <Select
                          onChange={handleOnchangeTimezone}
                          options={OptionTimezone}
                          // classNamePrefix="selectproduct"
                          classNamePrefix="Select2"
                          isSearchable
                          placeholder="(GMT-11:00) Midway Island, Samoa"
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className="form-group ">
                    <Row>
                      <Col md={3} className=" col">
                        <Form.Label className="form-label">Verification</Form.Label>
                      </Col>
                      <Col md={9} className="col">
                        <Form.Label className="ckbox mg-b-10 d-inline-flex form-label col-12">
                          <input type="checkbox" />
                          <span>Email</span>
                        </Form.Label>
                        <Form.Label className="ckbox  d-inline-flex form-label col-12 my-0">
                          <input defaultChecked type="checkbox" />
                          <span>SMS</span>
                        </Form.Label>
                        <Form.Label className="ckbox mg-b-10 d-inline-flex form-label col-6 mt-1">
                          <input type="checkbox" />
                          <span>Phone</span>
                        </Form.Label>
                      </Col>
                    </Row>
                  </FormGroup>
                  <div className="mb-4 main-content-label">
                  Security Settings
                  </div>
                  <FormGroup className="form-group ">
                    <Row>
                      <Col md={3} className="">
                        <Form.Label className="form-label">Login Verification</Form.Label>
                      </Col>
                      <Col md={9}>
                        <Link className="" to="#">
                          Settup Verification
                        </Link>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className="form-group ">
                    <Row>
                      <Col md={3} className="">
                        <Form.Label className="form-label">
                          Password Verification
                        </Form.Label>
                      </Col>
                      <Col md={9}>
                        <Form.Label className="ckbox mg-b-10">
                          <input type="checkbox" />
                          <span>Require Personal Details</span>
                        </Form.Label>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className="form-group ">
                    <Row>
                      <Col md={3} className=""></Col>
                      <Col md={9}>
                        <Link className="ms-2" to="#">
                          Deactivate Account
                        </Link>
                        <Link className="ms-2" to="#">
                           Change Password
                        </Link>
                      </Col>
                    </Row>
                  </FormGroup>
                </Form>
              </Card.Body>
              <Card.Footer>
                <div className="float-end">
                  <Link to="#" className="btn btn-success">
                    Save Changes
                  </Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
         
        </Row>
    </Fragment>
  );
};

export default Mailsettings;
