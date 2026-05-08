import { FC, Fragment, useState } from 'react';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { Card, Col, Dropdown, Nav, Row, Tab, FormGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { imagesData } from '../../common/commonimages';
import { Friendsdata } from '../../common/commondata';
import Select from 'react-select';
import { OptionTimezone } from '../../common/selectdata';


import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

interface ComponentProps { }

const Profile: FC<ComponentProps> = () => {

  const [Timezone, setTimezone] = useState<any>("");
  const handleOnchangeTimezone = () => {
    setTimezone(Timezone);
  };

  const [open, setOpen] = useState(false);
  const imageIDs = ['photo1', 'photo2', 'photo3', 'photo4', 'photo5', 'photo6', 'photo7', 'photo8', 'photo9', 'photo10', 'photo11', 'photo12'];
  return (
    <Fragment>
      <Pageheader title="PROFILE" heading="Pages" active="Profile" />
      <Row>
        <Col lg={12} md={12}>
          <Tab.Container id="left-tabs-example" defaultActiveKey="About">
            <Card className="custom-card customs-cards">
              <Card.Body className=" d-md-flex bg-white">

                <span className="profile-image pos-relative">
                  <img
                    className="br-5"
                    alt=""
                    src={imagesData('face22')}
                  />
                  <span className="bg-success text-white wd-1 ht-1 rounded-pill profile-online"></span>
                </span>
                <div className="my-md-auto mt-4 prof-details">

                  <h4 className="fw-semibold ms-md-4 ms-0 mb-1 pb-0">
                    Sonya Taylor
                  </h4>
                  <p className="fs-13 text-muted ms-md-4 ms-0 mb-2 pb-2 ">
                    <span className="me-3 d-inline-block">
                      <i className="far fa-address-card me-2"></i>Ui/Ux Developer
                    </span>
                    <span className="me-3 d-inline-block">
                      <i className="fa fa-taxi me-2"></i>West fransisco,Alabama
                    </span>
                    <span className="d-inline-block">
                      <i className="far fa-flag me-2"></i>New Jersey
                    </span>
                  </p>
                  <p className="text-muted ms-md-4 ms-0 mb-2">
                    <span>
                      <i className="fa fa-phone me-2"></i>
                    </span>
                    <span className="fw-semibold me-2">Phone:</span>
                    <span>+94 12345 6789</span>
                  </p>
                  <p className="text-muted ms-md-4 ms-0 mb-2">
                    <span>
                      <i className="fa fa-envelope me-2"></i>
                    </span>
                    <span className="fw-semibold me-2">Email:</span>
                    <span>spruko.space@gmail.com</span>
                  </p>
                  <p className="text-muted ms-md-4 ms-0 mb-2">
                    <span>
                      <i className="fa fa-globe me-2"></i>
                    </span>
                    <span className="fw-semibold me-2">Website</span>
                    <span>sprukotechnologies</span>
                  </p>



                </div>
              </Card.Body>
              <Card.Footer>

                <Nav
                  variant="pills"
                  className="nav profile-tabs main-nav-line tabs-menu profile-nav-line bg-white mb-0 border-0 br-5 mb-0	"
                >
                  <Nav.Item className="me-1">
                    <Nav.Link className=" mb-2 mt-2" eventKey="About">
                      About
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="me-1">
                    <Nav.Link className="mb-2 mt-2" eventKey="EditProfile">
                      Edit Profile
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="me-1">
                    <Nav.Link className="mb-2 mt-2" eventKey="Timeline">
                      Timeline
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="me-1">
                    <Nav.Link className="mb-2 mt-2" eventKey="Gallery">
                      Gallery
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="me-1">
                    <Nav.Link className="mb-2 mt-2" eventKey="Friends">
                      Friends
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="me-1">
                    <Nav.Link className="mb-2 mt-2" eventKey="AccountSettings">
                      Account Settings
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Footer>
            </Card>
            <span className=" py-0 ">
              <div className="profile-tab tab-menu-heading border-bottom-0 ">


                <Row className=" row-sm ">
                  <Col lg={12} md={12}>
                    <div className="custom-card main-content-body-profile">
                      <Tab.Content>
                        <Tab.Pane className='p-0 border-0' eventKey="About">
                          <div className="main-content-body p-0 border-0 tab-pane active"
                            id="about"
                          >
                            <Card>
                              <Card.Body className=" p-0 border-0 p-0 rounded-10">
                                <div className="p-4">
                                  <h4 className="fs-15 text-uppercase mb-3">
                                    BIOdata
                                  </h4>
                                  <p className="m-b-5">
                                    Hi I'm Teri Dactyl,has been the industry's
                                    standard dummy text ever since the 1500s, when
                                    an unknown printer took a galley of type.
                                    Donec pede justo, fringilla vel, aliquet nec,
                                    vulputate eget, arcu. In enim justo, rhoncus
                                    ut, imperdiet a, venenatis vitae, justo.
                                    Nullam dictum felis eu pede mollis pretium.
                                    Integer tincidunt.Cras dapibus. Vivamus
                                    elementum semper nisi. Aenean vulputate
                                    eleifend tellus. Aenean leo ligula, porttitor
                                    eu, consequat vitae, eleifend ac, enim.
                                  </p>
                                  <div className="m-t-30">
                                    <div className=" p-t-10">
                                      <h5 className="text-primary m-b-5 fs-14">
                                        Lead designer / Developer
                                      </h5>
                                      <p className="">websitename.com</p>
                                      <p>
                                        <b>2010-2015</b>
                                      </p>
                                      <p className="text-muted fs-13 m-b-0">
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an
                                        unknown printer took a galley of type and
                                        scrambled it to make a type specimen book.
                                      </p>
                                    </div>

                                    <div className="">
                                      <h5 className="text-primary m-b-5 fs-14">
                                        Senior Graphic Designer
                                      </h5>
                                      <p className="">coderthemes.com</p>
                                      <p>
                                        <b>2007-2009</b>
                                      </p>
                                      <p className="text-muted fs-13 mb-0">
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an
                                        unknown printer took a galley of type and
                                        scrambled it to make a type specimen book.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="border-top"></div>
                                <div className="p-4">
                                  <label className="main-content-label fs-13 mg-b-20">
                                    Statistics
                                  </label>
                                  <div className="profile-cover__info ms-4 ms-auto p-0">
                                    <ul className="nav p-0 border-bottom-0 mb-0">
                                      <li className="border p-2 br-5 bg-light wd-100 ht-70 text-center me-4">
                                        <span className="border-0 mb-0 pb-0">
                                          113
                                        </span>
                                        Projects
                                      </li>
                                      <li className="border p-2 br-5 bg-light wd-100 ht-70 text-center me-4">
                                        <span className="border-0 mb-0 pb-0">
                                          245
                                        </span>
                                        Followers
                                      </li>
                                      <li className="border p-2 br-5 bg-light wd-100 ht-70 text-center me-4">
                                        <span className="border-0 mb-0 pb-0">
                                          128
                                        </span>
                                        Following
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="border-top"></div>
                                <div className="p-4">
                                  <label className="main-content-label fs-13 mg-b-20">
                                    Contact
                                  </label>
                                  <div className="d-sm-flex">
                                    <div className="me-4 mb-2">
                                      <div className="main-profile-contact-list">
                                        <div className="media">
                                          <div className="media-icon bg-primary-transparent text-primary">
                                            <i className="icon ion-md-phone-portrait"></i>
                                          </div>
                                          <div className="media-body">
                                            {" "}
                                            <span>Mobile</span>
                                            <div> +245 354 654 </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="me-4 mb-2">
                                      <div className="main-profile-contact-list">
                                        <div className="media">
                                          <div className="media-icon bg-success-transparent text-success">
                                            <i className="icon ion-logo-slack"></i>
                                          </div>
                                          <div className="media-body">
                                            {" "}
                                            <span>Slack</span>
                                            <div> @spruko.w </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="">
                                      <div className="main-profile-contact-list">
                                        <div className="media">
                                          <div className="media-icon bg-info-transparent text-info">
                                            <i className="icon ion-md-locate"></i>
                                          </div>
                                          <div className="media-body">
                                            {" "}
                                            <span>Current Address</span>
                                            <div> San Francisco, CA </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="border-top"></div>
                                <div className="p-4">
                                  <label className="main-content-label fs-13 mg-b-20">
                                    Social
                                  </label>
                                  <div className="d-xl-flex">
                                    <div className="me-4">
                                      <div className="main-profile-social-list">
                                        <div className="media">
                                          <div className="media-icon bg-primary-transparent text-primary">
                                            <i className="icon ion-logo-github"></i>
                                          </div>
                                          <div className="media-body">
                                            {" "}
                                            <span>Github</span>{" "}
                                            <Link to="#">github.com/spruko</Link>{" "}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="me-4">
                                      <div className="main-profile-social-list">
                                        <div className="media">
                                          <div className="media-icon bg-success-transparent text-success">
                                            <i className="ri-twitter-x-line "></i>
                                          </div>
                                          <div className="media-body">
                                            {" "}
                                            <span>Twitter</span>{" "}
                                            <Link to="#">
                                              twitter.com/spruko.me
                                            </Link>{" "}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="me-4">
                                      <div className="main-profile-social-list">
                                        <div className="media">
                                          <div className="media-icon bg-info-transparent text-info">
                                            <i className="icon ion-logo-linkedin"></i>
                                          </div>
                                          <div className="media-body">
                                            {" "}
                                            <span>Linkedin</span>{" "}
                                            <Link to="#">
                                              linkedin.com/in/spruko
                                            </Link>{" "}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="me-4">
                                      <div className="main-profile-social-list">
                                        <div className="media">
                                          <div className="media-icon bg-danger-transparent text-danger">
                                            <i className="icon ion-md-link"></i>
                                          </div>
                                          <div className="media-body">
                                            {" "}
                                            <span>My Portfolio</span>{" "}
                                            <Link to="#">spruko.com/</Link>{" "}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane className='p-0 border-0' eventKey="EditProfile">
                          <div
                            className="main-content-body tab-pane  p-0 border-0"
                            id="edit"
                          >
                            <Card>
                              <Card.Body className=" border-0">
                                <div className="mb-4 main-content-label">
                                  Personal Information
                                </div>
                                <Form className="form-horizontal">
                                  <div className="mb-4 main-content-label">
                                    Name
                                  </div>
                                  <FormGroup>
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          User Name
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                          type="text"
                                          placeholder="User Name"
                                          defaultValue="Mack Adamia"
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup>
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          First Name
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                          type="text"
                                          placeholder="First Name"
                                          defaultValue="Mack Adamia"
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup>
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          last Name
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                          type="text"
                                          placeholder="Last Name"
                                          defaultValue="Mack Adamia"
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup>
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Nick Name
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                          type="text"
                                          placeholder="Nick Name"
                                          defaultValue="Spruha"
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup>
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Designation
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                          type="text"
                                          placeholder="Designation"
                                          defaultValue="Web Designer"
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <div className="mb-4 main-content-label">
                                    Contact Info
                                  </div>
                                  <FormGroup>
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Email<i>(required)</i>
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                          type="text"
                                          placeholder="Email"
                                          defaultValue="info@Spruha.in"
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup>
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Website
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                          type="text"
                                          placeholder="Website"
                                          defaultValue="@spruko.w"
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup>
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Phone
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                          type="text"
                                          placeholder="phone number"
                                          defaultValue="+245 354 654"
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup>
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Address
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                        as='textarea'
                                          name="example-textarea-input"
                                          rows={2}
                                          placeholder="Address"
                                          defaultValue="San Francisco, CA"
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <div className="mb-4 main-content-label">
                                    Social Info
                                  </div>
                                  <FormGroup>
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Twitter
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                          type="text"
                                          placeholder="twitter"
                                          defaultValue="twitter.com/spruko.me"
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup>
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Facebook
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                          type="text"
                                          placeholder="facebook"
                                          defaultValue="https://www.facebook.com/Spruha"
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup>
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Google+
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                          type="text"
                                          placeholder="google"
                                          defaultValue="spruko.com"
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup >
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Linked in
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                          type="text"
                                          placeholder="linkedin"
                                          defaultValue="linkedin.com/in/spruko"
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup >
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Github
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                          type="text"
                                          placeholder="github"
                                          defaultValue="github.com/sprukos"
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <div className="mb-4 main-content-label">
                                    About Yourself
                                  </div>
                                  <FormGroup >
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Biographical Info
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                        as='textarea'
                                          name="example-textarea-input"
                                          rows={4}
                                          defaultValue="pleasure rationally encounter but because pursue consequences that are extremely painful.occur in which toil and pain can procure him some great pleasure.."
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <div className="mb-4 main-content-label">
                                    Email Preferences
                                  </div>
                                  <FormGroup className="form-group mb-0">
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Verified User
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <div className="custom-controls-stacked">
                                          <div className="form-check"> <input className="form-check-input mt-2" type="checkbox" id="flexCheckChecked1" defaultChecked /> <label htmlFor="checkbox-2" className="custom-control-label mt-1 text-dark ms-1">Accept to receive post or page notification emails</label> </div>
                                          <div className="form-check"> <input className="form-check-input mt-2" type="checkbox" id="flexCheckChecked1" defaultChecked /> <label htmlFor="checkbox-2" className="custom-control-label mt-1 text-dark ms-1">Accept to receive email sent to multiple recipients</label> </div>
                                        </div>
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                </Form>
                              </Card.Body>
                            </Card>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane className='p-0 border-0' eventKey="Timeline">
                          <div className="main-content-body p-0 border-0 tab-pane" id="timeline" >
                            <div className="border-0">
                              <div className="main-content-body main-content-body-profile">
                                <div className="main-profile-body p-0">
                                  <Row className=" row-sm">
                                    <div className="col-12">
                                      <Card className="mg-b-20 border">
                                        <div className="p-4">
                                          <div className="media">
                                            <div className="media-user me-2">
                                              <div className="main-img-user avatar-md">
                                                <img
                                                  alt=""
                                                  className="rounded-circle"
                                                  src={imagesData('face6')}
                                                />
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <h6 className="mb-0 mg-t-2 ms-2">
                                                Mintrona Pechon Pechon
                                              </h6>
                                              <span className="text-primary ms-2">
                                                just now
                                              </span>
                                            </div>
                                            <div className="ms-auto">
                                              <Dropdown className=" show main-contact-star">
                                                <Dropdown.Toggle
                                                  as='a'
                                                  variant=""
                                                  className="new option-dots2 no-caret"
                                                  data-bs-toggle="dropdown"

                                                >
                                                  <i className="fe fe-more-vertical  fs-18"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu shadow">
                                                  {" "}
                                                  <Dropdown.Item >
                                                    Edit Post
                                                  </Dropdown.Item>{" "}
                                                  <Dropdown.Item >
                                                    Delete Post
                                                  </Dropdown.Item>{" "}
                                                  <Dropdown.Item >
                                                    Personal Settings
                                                  </Dropdown.Item>{" "}
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="card-body">
                                          <p className="mg-t-0">
                                            There are many variations of passages
                                            of Lorem Ipsum available, but the
                                            majority have suffered alteration in
                                            some form, by injected humour, or
                                            randomised words which don't look even
                                            slightly believable.
                                          </p>
                                          <Row className=" row-sm">
                                            <div className="col">
                                              <Link to={`${import.meta.env.BASE_URL}app/gallery/`}>
                                                <img
                                                  alt="img"
                                                  className="wd-200 br-5 mb-2 mt-2 me-4"
                                                  src={imagesData('media92')}
                                                />
                                              </Link>
                                              <Link to={`${import.meta.env.BASE_URL}app/gallery/`}>
                                                <img
                                                  alt="img"
                                                  className="wd-200 br-5"
                                                  src={imagesData('media93')}
                                                />
                                              </Link>
                                            </div>
                                          </Row>
                                          <div className="media mt-3 profile-footer">
                                            <div className="media-user me-2">
                                              <div className="demo-avatar-group">
                                                <div className="demo-avatar-group main-avatar-list-stacked">
                                                  <div className="main-img-user">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={imagesData('face12')}
                                                    />
                                                  </div>
                                                  <div className="main-img-user">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={imagesData('face12')}
                                                    />
                                                  </div>
                                                  <div className="main-img-user online">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={imagesData('face5')}
                                                    />
                                                  </div>
                                                  <div className="main-img-user">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={imagesData('face6')}
                                                    />
                                                  </div>
                                                  <div className="main-avatar">
                                                    {" "}
                                                    +23{" "}
                                                  </div>
                                                </div>

                                              </div>

                                            </div>
                                            <div className="media-body">
                                              <h6 className="mb-0 mg-t-10">
                                                28 people like your photo
                                              </h6>
                                            </div>
                                          </div>
                                        </div>
                                      </Card>
                                      <Card className=" mg-b-20 border">
                                        <div className="p-4">
                                          <div className="media">
                                            <div className="media-user me-2">
                                              <div className="main-img-user avatar-md">
                                                <img
                                                  alt=""
                                                  className="rounded-circle"
                                                  src={imagesData('face6')}
                                                />
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <h6 className="mb-0 ms-2 mg-t-3">
                                                Mintrona Pechon Pechon
                                              </h6>
                                              <span className="text-muted ms-2">
                                                Sep 26 2019, 10:14am
                                              </span>
                                            </div>
                                            <div className="ms-auto">
                                              <Dropdown className=" show main-contact-star">
                                                <Dropdown.Toggle
                                                  as='a'
                                                  variant=""
                                                  className="new option-dots2 no-caret"
                                                  data-bs-toggle="dropdown"

                                                >
                                                  <i className="fe fe-more-vertical  fs-18"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu shadow">
                                                  {" "}
                                                  <Dropdown.Item >
                                                    Edit Post
                                                  </Dropdown.Item>{" "}
                                                  <Dropdown.Item >
                                                    Delete Post
                                                  </Dropdown.Item>{" "}
                                                  <Dropdown.Item >
                                                    Personal Settings
                                                  </Dropdown.Item>{" "}
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </div>
                                          </div>
                                        </div>
                                        <Card.Body className=" h-100 pt-0">
                                          <p className="mg-t-0">
                                            There are many variations of passages
                                            of Lorem Ipsum available, but the
                                            majority have suffered alteration in
                                            some form, by injected humour, or
                                            randomised words which don't look even
                                            slightly believable.
                                          </p>
                                          <Row className=" row-sm">
                                            <div className="col">
                                              <Link to={`${import.meta.env.BASE_URL}app/gallery/`}>
                                                <img
                                                  alt="img"
                                                  className="wd-200 br-5 mb-2 mt-2 me-4"
                                                  src={imagesData('media95')}
                                                />
                                              </Link>
                                              <Link to={`${import.meta.env.BASE_URL}app/gallery/`}>
                                                <img
                                                  alt="img"
                                                  className="wd-200 br-5 mb-2 mt-2"
                                                  src={imagesData('media92')}
                                                />
                                              </Link>
                                            </div>
                                          </Row>
                                          <div className="media mt-3 profile-footer">
                                            <div className="media-user me-2">
                                              <div className="demo-avatar-group">
                                                <div className="demo-avatar-group main-avatar-list-stacked">
                                                  <div className="main-img-user">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={imagesData('face12')}
                                                    />
                                                  </div>
                                                  <div className="main-img-user online">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={imagesData('face7')}
                                                    />
                                                  </div>
                                                  <div className="main-img-user online">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={imagesData('face5')}
                                                    />
                                                  </div>
                                                  <div className="main-img-user">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={imagesData('face6')}
                                                    />
                                                  </div>
                                                  <div className="main-avatar">
                                                    {" "}
                                                    +23{" "}
                                                  </div>
                                                </div>

                                              </div>

                                            </div>
                                            <div className="media-body">
                                              <h6 className="mb-0 mg-t-10">
                                                28 people like your photo
                                              </h6>
                                            </div>
                                          </div>
                                        </Card.Body>
                                      </Card>
                                      <Card className=" mg-b-20 border">
                                        <div className="p-4">
                                          <div className="media">
                                            <div className="media-user me-2">
                                              <div className="main-img-user avatar-md">
                                                <img
                                                  alt=""
                                                  className="rounded-circle"
                                                  src={imagesData('face6')}
                                                />
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <h6 className="mb-0 ms-2 mg-t-3">
                                                Mintrona Pechon Pechon
                                              </h6>
                                              <span className="text-muted ms-2">
                                                Sep 26 2019, 10:14am
                                              </span>
                                            </div>
                                            <div className="ms-auto">
                                              <Dropdown className=" show main-contact-star">
                                                <Dropdown.Toggle
                                                  as='a'
                                                  variant=""
                                                  className="new option-dots2 no-caret"
                                                  data-bs-toggle="dropdown"

                                                >
                                                  <i className="fe fe-more-vertical  fs-18"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu shadow">
                                                  {" "}
                                                  <Dropdown.Item >
                                                    Edit Post
                                                  </Dropdown.Item>{" "}
                                                  <Dropdown.Item >
                                                    Delete Post
                                                  </Dropdown.Item>{" "}
                                                  <Dropdown.Item >
                                                    Personal Settings
                                                  </Dropdown.Item>{" "}
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </div>
                                          </div>
                                        </div>
                                        <Card.Body className=" h-100 pt-0">
                                          <p className="mg-t-0">
                                            There are many variations of passages
                                            of Lorem Ipsum available, but the
                                            majority have suffered alteration in
                                            some form, by injected humour, or
                                            randomised words which don't look even
                                            slightly believable.
                                          </p>
                                          <div className="media mt-3 profile-footer">
                                            <div className="media-user me-2">
                                              <div className="demo-avatar-group">
                                                <div className="demo-avatar-group main-avatar-list-stacked">
                                                  <div className="main-img-user online">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={imagesData('face12')}
                                                    />
                                                  </div>
                                                  <div className="main-img-user">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={imagesData('face3')}
                                                    />
                                                  </div>
                                                  <div className="main-img-user">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={imagesData('face4')}
                                                    />
                                                  </div>
                                                  <div className="main-img-user online">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={imagesData('face10')}
                                                    />
                                                  </div>
                                                  <div className="main-avatar">
                                                    {" "}
                                                    +23{" "}
                                                  </div>
                                                </div>

                                              </div>

                                            </div>
                                            <div className="media-body">
                                              <h6 className="mb-0 mg-t-10">
                                                28 people like your photo
                                              </h6>
                                            </div>
                                          </div>
                                        </Card.Body>
                                      </Card>
                                      <Card className=" border">
                                        <div className="p-4">
                                          <div className="media">
                                            <div className="media-user me-2">
                                              <div className="main-img-user avatar-md">
                                                <img
                                                  alt=""
                                                  className="rounded-circle"
                                                  src={imagesData('face2')}
                                                />
                                              </div>
                                            </div>
                                            <div className="media-body">
                                              <h6 className="mb-0 ms-2 mg-t-3">
                                                Mintrona Pechon Pechon
                                              </h6>
                                              <span className="text-muted ms-2">
                                                Sep 26 2019, 10:14am
                                              </span>
                                            </div>
                                            <div className="ms-auto">
                                              <Dropdown className=" show main-contact-star">
                                                <Dropdown.Toggle
                                                  as='a'
                                                  variant=""
                                                  className="new option-dots2 no-caret"
                                                  data-bs-toggle="dropdown"

                                                >
                                                  <i className="fe fe-more-vertical  fs-18"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu shadow">
                                                  {" "}
                                                  <Dropdown.Item >
                                                    Edit Post
                                                  </Dropdown.Item>{" "}
                                                  <Dropdown.Item >
                                                    Delete Post
                                                  </Dropdown.Item>{" "}
                                                  <Dropdown.Item >
                                                    Personal Settings
                                                  </Dropdown.Item>{" "}
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </div>
                                          </div>
                                        </div>
                                        <Card.Body className=" h-100 pt-0">
                                          <p className="mg-t-0">
                                            There are many variations of passages
                                            of Lorem Ipsum available, but the
                                            majority have suffered alteration in
                                            some form, by injected humour, or
                                            randomised words which don't look even
                                            slightly believable.
                                          </p>
                                          <Row className=" row-sm">
                                            <div className="col">
                                              <Link to={`${import.meta.env.BASE_URL}app/gallery/`}>
                                                <img
                                                  alt="img"
                                                  className="wd-200 br-5 mb-2 mt-2 me-3"
                                                  src={imagesData('media95')}
                                                />
                                              </Link>
                                              <Link to={`${import.meta.env.BASE_URL}app/gallery/`}>
                                                <img
                                                  alt="img"
                                                  className="wd-200 br-5 mb-2 mt-2"
                                                  src={imagesData('media94')}
                                                />
                                              </Link>
                                            </div>
                                          </Row>
                                          <div className="media mt-3 profile-footer">
                                            <div className="media-user me-2">
                                              <div className="demo-avatar-group">
                                                <div className="demo-avatar-group main-avatar-list-stacked">
                                                  <div className="main-img-user online">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={imagesData('face11')}
                                                    />
                                                  </div>
                                                  <div className="main-img-user">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={imagesData('face12')}
                                                    />
                                                  </div>
                                                  <div className="main-img-user">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={imagesData('face3')}
                                                    />
                                                  </div>
                                                  <div className="main-img-user online">
                                                    <img
                                                      alt=""
                                                      className="rounded-circle"
                                                      src={imagesData('face5')}
                                                    />
                                                  </div>
                                                  <div className="main-avatar">
                                                    {" "}
                                                    +23{" "}
                                                  </div>
                                                </div>

                                              </div>

                                            </div>
                                            <div className="media-body">
                                              <h6 className="mb-0 mg-t-10">
                                                28 people like your photo
                                              </h6>
                                            </div>
                                          </div>
                                        </Card.Body>
                                      </Card>
                                    </div>
                                  </Row>
                                </div>

                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane className='p-0 border-0' eventKey="Gallery">
                          <div className="main-content-body  border tab-pane p-0 border-0"
                            id="gallery"
                          >
                            <Card.Body className="">
                              <Row className="masonry">
                                {imageIDs.map((imageID, index) => (
                                  <Col key={index} lg={3} md={3} sm={6} col={12} className="brick">
                                    <img src={imagesData(imageID)} alt={`media${index + 1}`} onClick={() => setOpen(true)} className="br-5 my-2" />
                                  </Col>
                                ))}
                                <Lightbox
                                  open={open}
                                  close={() => setOpen(false)}
                                  plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                                  zoom={{
                                    maxZoomPixelRatio: 10,
                                    scrollToZoom: true
                                  }}
                                  slides={imageIDs.map(imageID => ({ src: imagesData(imageID) }))}
                                />
                              </Row>
                            </Card.Body>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane className='p-0 border-0' eventKey="Friends">
                          <div className="main-content-body tab-pane p-0 border-0"
                            id="friends"
                          >
                            <Card.Body className="">

                              <Row className=" row-sm">
                                {Friendsdata.map((idx) => (
                                  <Col sm={12} md={6} lg={6} xl={4} xxl={3} key={Math.random()}>
                                    <Card className="custom-card border">
                                      <Card.Body className="user-lock text-center">
                                        <Dropdown className="text-end">
                                          <Dropdown.Toggle
                                            as='a'
                                            variant=""

                                            className="option-dots no-caret"
                                            data-bs-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="true"
                                          >
                                            {" "}
                                            <i className="fe fe-more-vertical"></i>{" "}
                                          </Dropdown.Toggle>
                                          <Dropdown.Menu className="dropdown-menu dropdown-menu-end shadow">
                                            {" "}
                                            <Dropdown.Item
                                              className="dropdown-item d-inline-flex align-items-center" >
                                              <i className="fe fe-message-square me-2"></i>
                                              Message
                                            </Dropdown.Item>{" "}
                                            <Dropdown.Item
                                              className="dropdown-item d-inline-flex align-items-center" >
                                              <i className="fe fe-edit-2 me-2"></i>{" "}
                                              Edit
                                            </Dropdown.Item>{" "}
                                            <Dropdown.Item
                                              className="dropdown-item d-inline-flex align-items-center" >
                                              <i className="fe fe-eye me-2"></i>{" "}
                                              View
                                            </Dropdown.Item>{" "}
                                            <Dropdown.Item
                                              className="dropdown-item d-inline-flex align-items-center" >
                                              <i className="fe fe-trash-2 me-2"></i>{" "}
                                              Delete
                                            </Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                        <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                                          <img
                                            alt="avatar"
                                            className="rounded-circle"
                                            src={idx.src}
                                          />
                                          <h4 className="fs-16 mb-0 mt-3 text-dark fw-semibold">
                                            {idx.title}
                                          </h4>
                                          <span className="text-muted">
                                            {idx.text}
                                          </span>
                                          <div className="mt-3 d-flex text-center justify-content-center">
                                            <span className="btn btn-icon me-3">
                                              <span className="btn-inner--icon">
                                                {" "}
                                                <i className="bx bxl-facebook fs-18 tx-prime"></i>
                                              </span>
                                            </span>
                                            <span className="btn btn-icon me-3">
                                              <span className="btn-inner--icon">
                                                {" "}
                                                <i className="ri-twitter-x-line fs-15 tx-prime"></i>
                                              </span>
                                            </span>
                                            <span className="btn btn-icon me-3">
                                              <span className="btn-inner--icon">
                                                {" "}
                                                <i className="bx bxl-linkedin fs-18 tx-prime"></i>
                                              </span>
                                            </span>
                                          </div>
                                        </Link>
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                ))}

                              </Row>
                            </Card.Body>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane className='p-0 border-0' eventKey="AccountSettings">
                          <div className="main-content-body tab-pane  p-0 border-0"
                            id="settings"
                          >
                            <Card>
                              <Card.Body
                                className=" border-0"
                                data-select2-id="12"
                              >
                                <Form
                                  className="form-horizontal"
                                  data-select2-id="11"
                                >
                                  <div className="mb-4 main-content-label">
                                    Account
                                  </div>
                                  <FormGroup>
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          User Name
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                          type="text"
                                          placeholder="User Name"
                                          defaultValue="Sonia Taylor"
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup>
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Email
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Control
                                          type="text"
                                          placeholder="Email"
                                          defaultValue="info@SoniaTaylor.in"
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup
                                  
                                    data-select2-id="108"
                                  >
                                    <Row className="" data-select2-id="107">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Language
                                        </Form.Label>
                                      </Col>
                                      <Col
                                        md={9}
                                        data-select2-id="106"
                                      >
                                        <select
                                          className="form-control select2"
                                          tabIndex={-1}
                                          aria-hidden="true"
                                        >
                                          <option>Us English</option>
                                          <option>Arabic</option>
                                          <option>Korean</option>
                                        </select>
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup
                                  
                                    data-select2-id="10"
                                  >
                                    <Row className="" data-select2-id="9">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Timezone
                                        </Form.Label>
                                      </Col>
                                      <Col
                                        md={9}
                                        data-select2-id="8"
                                      >

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
                                  <FormGroup>
                                    <Row className=" row-sm">
                                      <Col md={3} className="col">
                                        <Form.Label className="form-label">
                                          Verification
                                        </Form.Label>
                                      </Col>
                                      <Col md={9} className="col">
                                        <Form.Label className="ckbox  mb-2">
                                          <input className="form-check-input" type="Checkbox" id="flexCheckChecked1" />
                                          <label htmlFor="checkbox-2" className="custom-control-label mt-1 text-dark ms-2">Email</label>
                                        </Form.Label>
                                        <Form.Label className="ckbox  mb-2">
                                          <input className="form-check-input" type="Checkbox" id="flexCheckChecked1" defaultChecked />
                                          <label htmlFor="checkbox-2" className="custom-control-label mt-1 text-dark ms-2">SMS</label>
                                        </Form.Label>
                                        <Form.Label className="ckbox  mb-2">
                                          <input className="form-check-input" type="Checkbox" id="flexCheckChecked1" />
                                          <label htmlFor="checkbox-2" className="custom-control-label mt-1 text-dark ms-2">Phone</label>
                                        </Form.Label>
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <div className="mb-4 main-content-label">
                                    SECURITYSettings
                                  </div>
                                  <FormGroup>
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Login Verification
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        {" "}
                                        <Link className="" to="#"> Settup Verification </Link>
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup>
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Password Verification
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Label className="ckbox  mb-2">
                                          <input className="form-check-input" type="Checkbox" id="flexCheckChecked1" />
                                          <label htmlFor="checkbox-2" className="custom-control-label mt-1 text-dark ms-2">Require Personal Details</label>
                                        </Form.Label>
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <div>
                                    <div className="mb-4 main-content-label">
                                      Notifications
                                    </div>
                                    <FormGroup className="form-group mb-0">
                                      <Row className=" row-sm">
                                        <Col md={3}>
                                          <Form.Label className="form-label">
                                            Configure Notifications
                                          </Form.Label>
                                        </Col>
                                        <Col md={9}>
                                          <Form.Label className="d-block mg-b-15-f">
                                            <input className="form-check-input mt-2" type="Checkbox" id="flexCheckChecked1" />
                                            <label htmlFor="checkbox-2" className="custom-control-label mt-1 text-dark ms-2">Allow all Notifications</label>
                                          </Form.Label>
                                          <Form.Label className="d-block mg-b-15-f">
                                            <input className="form-check-input mt-2" type="Checkbox" id="flexCheckChecked1" />
                                            <label htmlFor="checkbox-2" className="custom-control-label mt-1 text-dark ms-2">Disable all Notifications</label>
                                          </Form.Label>
                                          <Form.Label className="d-block mg-b-15-f">
                                            <input className="form-check-input mt-2" type="Checkbox" id="flexCheckChecked1" />
                                            <label htmlFor="checkbox-2" className="custom-control-label mt-1 text-dark ms-2">Notification Sounds</label>
                                          </Form.Label>
                                        </Col>
                                      </Row>
                                    </FormGroup>
                                  </div>
                                  <FormGroup className="form-group float-end">
                                    <Row className=" row-sm">
                                      <Col md={12}>
                                        {" "}
                                        <Link className="mg-r-10 btn btn-primary my-1" to="#" > Deactivate Account </Link>{" "}
                                        <Link className="btn btn-secondary" to="#" > Change Password </Link>{" "}
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                </Form>
                              </Card.Body>
                            </Card>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </div>
                  </Col>
                </Row>

              </div>
            </span>
          </Tab.Container>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Profile;