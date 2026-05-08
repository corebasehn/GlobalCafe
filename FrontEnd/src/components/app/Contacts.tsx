import { FC, Fragment, useState, ChangeEvent, useRef } from "react";
import { Button, Card, Col, Dropdown, Nav, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from "react-router-dom";
import { imagesData } from "../../common/commonimages";
import faces6 from '../../assets/images/faces/6.jpg';

interface ComponentProps { }

const Contacts: FC<ComponentProps> = () => {

  //Profile upload picture

  const [selectedImage, setSelectedImage] = useState<string | null>(faces6); // Set the default image URL here
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      // Read the selected image and set it in state
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (

    <Fragment>

      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">CONTACTS</span>
        </div>
        <div className="justify-content-center">
          <Button variant="" type="button" className="btn btn-primary">
            <i className="fe fe-plus me-1"></i> Add New Contact
          </Button>
        </div>
      </div>

      <Row className="row-sm">
        <Col sm={12} lg={5} xl={3}
          className="col-sm-12 col-lg-5 col-xl-3">
          <Card className="custom-card">
            <div className="">
              <div className="main-content-contacts pt-0">
                <div className="main-content-left main-content-left-contacts slid1">
                  <Nav
                    defaultActiveKey="link-1"
                    className="nav main-nav-line  border-bottom-0 main-nav-line-chat  p-3"
                  >
                    <Nav.Item>
                      <Nav.Link
                        eventKey="link-1"
                        className="nav-link"
                        data-bs-toggle="tab"
                      >
                        All Contacts
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="link-2"
                        className="nav-link"
                        data-bs-toggle="tab"
                      >
                        Favorites
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <PerfectScrollbar options={{ suppressScrollX: true, useBothWheelAxes: false }} style={{ height: 750 }}>
                    <div className="main-contacts-list" id="mainContactList">
                      <div className="main-contact-label">A</div>
                      <div className="main-contact-item selected">
                        <div className="main-img-user online">
                          <img
                            alt="avatar"
                            src={imagesData('face2')}
                          />
                        </div>
                        <div className="main-contact-body">
                          <h6>Abigail Johnson</h6>
                          <span className="phone">+1-234-567-890</span>
                        </div>
                        <Dropdown className="main-contact-star">
                          <Dropdown.Toggle as='a' className="no-caret" variant="">
                            <i className="fe fe-more-vertical fs-18"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align='end'>
                            <Dropdown.Item>
                              <i className="fe fe-star me-2 "></i>Add to Favorite
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-edit me-2"></i>Edit
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-trash-2 me-2"></i>Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="main-contact-item">
                        <div className="main-img-user flex-shrink-0">
                          <img
                            alt="avatar"
                            src={imagesData('face3')}
                          />
                        </div>
                        <div className="main-contact-body">
                          <h6>Archie Cantones</h6>
                          <span>+1-234-567-890</span>
                        </div>
                        <Dropdown className="main-contact-star">
                          <Dropdown.Toggle as='a' className="no-caret" variant="">
                            <i className="fe fe-more-vertical fs-18"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align='end'>
                            <Dropdown.Item>
                              <i className="fe fe-star me-2 "></i>Add to Favorite
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-edit me-2"></i>Edit
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-trash-2 me-2"></i>Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="main-contact-item">
                        <div className="main-avatar online">A</div>
                        <div className="main-contact-body">
                          <h6>Allan Rey Palban</h6>
                          <span>+1-234-567-890</span>
                        </div>
                        <Dropdown className="main-contact-star">
                          <Dropdown.Toggle as='a' className="no-caret" variant="">
                            <i className="fe fe-more-vertical fs-18"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align='end'>
                            <Dropdown.Item>
                              <i className="fe fe-star me-2 "></i>Add to Favorite
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-edit me-2"></i>Edit
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-trash-2 me-2"></i>Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="main-contact-item">
                        <div className="main-avatar bg-secondary">A</div>
                        <div className="main-contact-body">
                          <h6>Aileen Mante</h6>
                          <span>+1-234-567-890</span>
                        </div>
                        <Dropdown className="main-contact-star">
                          <Dropdown.Toggle as='a' className="no-caret" variant="">
                            <i className="fe fe-more-vertical fs-18"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align='end'>
                            <Dropdown.Item>
                              <i className="fe fe-star me-2 "></i>Add to Favorite
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-edit me-2"></i>Edit
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-trash-2 me-2"></i>Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="main-contact-label">B</div>
                      <div className="main-contact-item border-top">
                        <div className="main-img-user">
                          <img
                            alt="avatar"
                            src={imagesData('face4')}
                          />
                        </div>
                        <div className="main-contact-body">
                          <h6>Brandon Dilao</h6>
                          <span>+1-234-567-890</span>
                        </div>
                        <Dropdown className="main-contact-star">
                          <Dropdown.Toggle as='a' className="no-caret" variant="">
                            <i className="fe fe-more-vertical fs-18"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align='end'>
                            <Dropdown.Item>
                              <i className="fe fe-star me-2 "></i>Add to Favorite
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-edit me-2"></i>Edit
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-trash-2 me-2"></i>Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="main-contact-item">
                        <div className="main-img-user online">
                          <img
                            alt="avatar"
                            src={imagesData('face5')}
                          />
                        </div>
                        <div className="main-contact-body">
                          <h6>Britney Labares</h6>
                          <span>+1-234-567-890</span>
                        </div>
                        <Dropdown className="main-contact-star">
                          <Dropdown.Toggle as='a' className="no-caret" variant="">
                            <i className="fe fe-more-vertical fs-18"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align='end'>
                            <Dropdown.Item>
                              <i className="fe fe-star me-2 "></i>Add to Favorite
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-edit me-2"></i>Edit
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-trash-2 me-2"></i>Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="main-contact-item">
                        <div className="main-avatar bg-danger flex-shrink-0">B</div>
                        <div className="main-contact-body">
                          <h6>Brateyley Cruz</h6>
                          <span>+1-234-567-890</span>
                        </div>
                        <Dropdown className="main-contact-star">
                          <Dropdown.Toggle as='a' className="no-caret" variant="">
                            <i className="fe fe-more-vertical fs-18"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align='end'>
                            <Dropdown.Item>
                              <i className="fe fe-star me-2 "></i>Add to Favorite
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-edit me-2"></i>Edit
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-trash-2 me-2"></i>Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="main-contact-label">C</div>
                      <div className="main-contact-item border-top">
                        <div className="main-img-user">
                          <img
                            alt="avatar"
                            src={imagesData('face6')}
                          />
                        </div>
                        <div className="main-contact-body">
                          <h6>Camille Audrey</h6>
                          <span>+1-234-567-890</span>
                        </div>
                        <Dropdown className="main-contact-star">
                          <Dropdown.Toggle as='a' className="no-caret" variant="">
                            <i className="fe fe-more-vertical fs-18"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align='end'>
                            <Dropdown.Item>
                              <i className="fe fe-star me-2 "></i>Add to Favorite
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-edit me-2"></i>Edit
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-trash-2 me-2"></i>Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="main-contact-item">
                        <div className="main-img-user online flex-shrink-0">
                          <img
                            alt="avatar"
                            src={imagesData('face7')}
                          />
                        </div>
                        <div className="main-contact-body">
                          <h6>Christian Lerio</h6>
                          <span>+1-234-567-890</span>
                        </div>
                        <Dropdown className="main-contact-star">
                          <Dropdown.Toggle as='a' className="no-caret" variant="">
                            <i className="fe fe-more-vertical fs-18"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align='end'>
                            <Dropdown.Item>
                              <i className="fe fe-star me-2 "></i>Add to Favorite
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-edit me-2"></i>Edit
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-trash-2 me-2"></i>Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="main-contact-item">
                        <div className="main-img-user online">
                          <img
                            alt="avatar"
                            src={imagesData('face8')}
                          />
                        </div>
                        <div className="main-contact-body">
                          <h6>Chris topher</h6>
                          <span>+1-234-567-890</span>
                        </div>
                        <Dropdown className="main-contact-star">
                          <Dropdown.Toggle as='a' className="no-caret" variant="">
                            <i className="fe fe-more-vertical fs-18"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align='end'>
                            <Dropdown.Item>
                              <i className="fe fe-star me-2 "></i>Add to Favorite
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-edit me-2"></i>Edit
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-trash-2 me-2"></i>Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="main-contact-label">D</div>
                      <div className="main-contact-item border-top">
                        <div className="main-img-user online">
                          <img
                            alt="avatar"
                            src={imagesData('face9')}
                          />
                        </div>
                        <div className="main-contact-body">
                          <h6>Darius Clayton</h6>
                          <span>+1-234-567-890</span>
                        </div>
                        <Dropdown className="main-contact-star">
                          <Dropdown.Toggle as='a' className="no-caret" variant="">
                            <i className="fe fe-more-vertical fs-18"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align='end'>
                            <Dropdown.Item>
                              <i className="fe fe-star me-2 "></i>Add to Favorite
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-edit me-2"></i>Edit
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-trash-2 me-2"></i>Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="main-contact-item">
                        <div className="main-img-user">
                          <img
                            alt="avatar"
                            src={imagesData('face10')}
                          />
                        </div>
                        <div className="main-contact-body">
                          <h6>Dyanne Aceron</h6>
                          <span>+1-234-567-890</span>
                        </div>
                        <Dropdown className="main-contact-star">
                          <Dropdown.Toggle as='a' className="no-caret" variant="">
                            <i className="fe fe-more-vertical fs-18"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align='end'>
                            <Dropdown.Item>
                              <i className="fe fe-star me-2 "></i>Add to Favorite
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-edit me-2"></i>Edit
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-trash-2 me-2"></i>Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="main-contact-item">
                        <div className="main-img-user online">
                          <img
                            alt="avatar"
                            src={imagesData('face11')}
                          />
                        </div>
                        <div className="main-contact-body">
                          <h6>Divina Gracia</h6>
                          <span>+1-234-567-890</span>
                        </div>
                        <Dropdown className="main-contact-star">
                          <Dropdown.Toggle as='a' className="no-caret" variant="">
                            <i className="fe fe-more-vertical fs-18"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align='end'>
                            <Dropdown.Item>
                              <i className="fe fe-star me-2 "></i>Add to Favorite
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-edit me-2"></i>Edit
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="fe fe-trash-2 me-2"></i>Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>

                  </PerfectScrollbar>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col sm={12} lg={7} xl={9}>
          <div className="">
            <div className="main-content-body main-content-body-contacts card custom-card">
              <div className="main-contact-info-header pt-3">
                <div className="media">
                  <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} />
                  <div className="main-img-user">
                    <img alt="avatar" src={selectedImage || ''} /> <Link to='#' onClick={handleCameraClick}><i className="fe fe-camera"></i></Link>
                  </div>
                  <div className="media-body">
                    <h5>Teri Dactyl</h5>
                    <p>Web Designer</p>
                    <Nav className="contact-info">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Call</Tooltip>}
                      >
                        <Link
                          to="#"
                          className="contact-icon border fs-inverse"
                          data-bs-toggle="tooltip"
                          title="Call"
                        >
                          <i className="fe fe-phone"></i>
                        </Link>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Video</Tooltip>}
                      >
                        <Link
                          to="#"
                          className="contact-icon border fs-inverse"
                          data-bs-toggle="tooltip"
                          title="Video"
                        >
                          <i className="fe fe-video"></i>
                        </Link>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Message</Tooltip>}
                      >
                        <Link
                          to="#"
                          className="contact-icon border fs-inverse"
                          data-bs-toggle="tooltip"
                          title="message"
                        >
                          <i className="fe fe-message-square"></i>
                        </Link>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Add to Group</Tooltip>}
                      >
                        <Link
                          to="#"
                          className="contact-icon border fs-inverse"
                          data-bs-toggle="tooltip"
                          title="Add to Group"
                        >
                          <i className="fe fe-user-plus"></i>
                        </Link>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Block</Tooltip>}
                      >
                        <Link
                          to="#"
                          className="contact-icon border fs-inverse"
                          data-bs-toggle="tooltip"
                          title="Block"
                        >
                          <i className="fe fe-slash"></i>
                        </Link>
                      </OverlayTrigger>
                    </Nav>
                  </div>
                </div>
                <div className="main-contact-action btn-list pt-3 pe-0 me-sm-3">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Edit Profile</Tooltip>}
                  >
                    <Link
                      to="#"
                      className="btn ripple btn-primary btn-icon"
                      data-placement="top"
                      data-bs-toggle="tooltip"
                      title="Edit Profile"
                    >
                      <i className="fe fe-edit"></i>
                    </Link>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Delete Profile</Tooltip>}
                  >
                    <Link
                      to="#"
                      className="btn ripple btn-secondary btn-icon"
                      data-placement="top"
                      data-bs-toggle="tooltip"
                      title="Delete Profile"
                    >
                      <i className="fe fe-trash-2"></i>
                    </Link>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Add Favorite</Tooltip>}
                  >
                    <Link
                      to="#"
                      className="btn ripple btn-warning btn-icon"
                      data-placement="top"
                      data-bs-toggle="tooltip"
                      title="Add Favorite"
                    >
                      <i className="fe fe-star"></i>
                    </Link>
                  </OverlayTrigger>
                </div>
              </div>
              <div className="main-contact-info-body">
                <div className="px-4 pt-3">
                  <h6>Biography :</h6>
                  <p>
                    Ut enim ad minima veniam, quis nostrum exercitationem ullam
                    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
                    consequatur? Quis autem vel eum iure reprehenderit qui in ea
                    voluptate velit esse quam nihil molestiae consequatur, vel
                    illum qui dolorem eum fugiat quo voluptas nulla pariatur.
                  </p>
                  <p>
                    Ut enim ad minima veniam, quis nostrum exercitationem ullam
                    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
                    consequatur? Quis autem vel eum iure reprehenderit qui in ea
                    voluptate velit esse quam nihil molestiae consequatur, vel
                    illum qui dolorem eum fugiat quo voluptas nulla
                    pariaturexplicabo. Nemo enim ipsam voluptatem quia voluptas
                    sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                    dolores eos qui ratione voluptatem sequi nesciunt.
                  </p>
                </div>
                <div className="media-list">
                  <div className="media  px-4">
                    <div className="media-body">
                      <div>
                        <label>Work :</label>{" "}
                        <span className="fs-medium">+1 (234) 567 8901</span>
                      </div>
                      <div>
                        <label>Personal :</label>{" "}
                        <span className="fs-medium">+1 (498) 021 0090</span>
                      </div>
                    </div>
                  </div>
                  <div className="media  px-4">
                    <div className="media-body">
                      <div>
                        <label>Gmail Account :</label>{" "}
                        <span className="fs-medium">Dactyl.taylor@gmail.com</span>
                      </div>
                      <div>
                        <label>Other Account :</label>{" "}
                        <span className="fs-medium">me@bootstrapdash.me</span>
                      </div>
                    </div>
                  </div>
                  <div className="media  px-4">
                    <div className="media-body">
                      <div>
                        <label>Current Address :</label>{" "}
                        <span className="fs-medium">
                          012 Dashboard Apartments, Dayl Francisco, California
                          13245
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="media  px-4 mb-0">
                    <div className="media-body">
                      <div>
                        <label>Call History :</label>{" "}
                        <span className="fs-medium">
                          Duration of last call: 5m 25sec
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Card className="custom-card">
              <Card.Header className="card-title">Recent Contacts</Card.Header>
              <Card.Body className="card-body">
                <Row>
                  <Col xxl={4} md={12} lg={12} xl={6}>
                    <div className="border d-flex p-2 br-5 mb-2">
                      <div className="recent-contacts me-3">
                        <div className="main-img-user avatar-md">
                          <img
                            alt="avatar"
                            className="rounded-circle"
                            src={imagesData('face5')}
                          />
                        </div>
                      </div>
                      <div>
                        <h6 className="mt-1 mb-1">Abigali kelly</h6>
                        <p className="mb-0 text-muted">Front end</p>
                      </div>
                      <div className="my-auto ms-auto">
                        <nav className="contact-info d-flex">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Call</Tooltip>}
                          >
                            <Link
                              to="#"
                              className="contact-icon border fs-inverse rounded-pill"
                              data-bs-toggle="tooltip"
                              title="Call"
                            >
                              <i className="fe fe-phone fs-12"></i>
                            </Link>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Video</Tooltip>}
                          >
                            <Link
                              to="#"
                              className="contact-icon border fs-inverse rounded-pill"
                              data-bs-toggle="tooltip"
                              title="Video"
                            >
                              <i className="fe fe-video fs-12"></i>
                            </Link>
                          </OverlayTrigger>
                        </nav>
                      </div>
                    </div>
                  </Col>
                  <Col xxl={4} md={12} lg={12} xl={6}>
                    <div className="border d-flex p-2 br-5 mb-2">
                      <div className="recent-contacts me-3">
                        <div className="main-img-user avatar-md">
                          <img
                            alt="avatar"
                            className="rounded-circle"
                            src={imagesData('face2')}
                          />
                        </div>
                      </div>
                      <div>
                        <h6 className="mt-1 mb-1">Brenda Crux</h6>
                        <p className="mb-0 text-muted">Angular</p>
                      </div>
                      <div className="my-auto ms-auto">
                        <nav className="contact-info d-flex">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Call</Tooltip>}
                          >
                            <Link
                              to="#"
                              className="contact-icon border fs-inverse rounded-pill"
                              data-bs-toggle="tooltip"
                              title="Call"
                            >
                              <i className="fe fe-phone fs-12"></i>
                            </Link>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Video</Tooltip>}
                          >
                            <Link
                              to="#"
                              className="contact-icon border fs-inverse rounded-pill"
                              data-bs-toggle="tooltip"
                              title="Video"
                            >
                              <i className="fe fe-video fs-12"></i>
                            </Link>
                          </OverlayTrigger>
                        </nav>
                      </div>
                    </div>
                  </Col>
                  <Col xxl={4} md={12} lg={12} xl={6}>
                    <div className="border d-flex p-2 br-5 mb-2">
                      <div className="recent-contacts me-3">
                        <div className="main-img-user avatar-md">
                          <img
                            alt="avatar"
                            className="rounded-circle"
                            src={imagesData('face8')}
                          />
                        </div>
                      </div>
                      <div>
                        <h6 className="mt-1 mb-1">Rach Michelle</h6>
                        <p className="mb-0 text-muted">Php</p>
                      </div>
                      <div className="my-auto ms-auto">
                        <nav className="contact-info d-flex">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Call</Tooltip>}
                          >
                            <Link
                              to="#"
                              className="contact-icon border fs-inverse rounded-pill"
                              data-bs-toggle="tooltip"
                              title="Call"
                            >
                              <i className="fe fe-phone fs-12"></i>
                            </Link>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Video</Tooltip>}
                          >
                            <Link
                              to="#"
                              className="contact-icon border fs-inverse rounded-pill"
                              data-bs-toggle="tooltip"
                              title="Video"
                            >
                              <i className="fe fe-video fs-12"></i>
                            </Link>
                          </OverlayTrigger>
                        </nav>
                      </div>
                    </div>
                  </Col>
                  <Col xxl={4} md={12} lg={12} xl={6}>
                    <div className="border d-flex p-2 br-5 mb-2">
                      <div className="recent-contacts me-3">
                        <div className="main-img-user avatar-md">
                          <img
                            alt="avatar"
                            className="rounded-circle"
                            src={imagesData('face9')}
                          />
                        </div>
                      </div>
                      <div>
                        <h6 className="mt-1 mb-1">Matt Harder</h6>
                        <p className="mb-0 text-muted">Codeignitor</p>
                      </div>
                      <div className="my-auto ms-auto">
                        <nav className="contact-info d-flex">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Call</Tooltip>}
                          >
                            <Link
                              to="#"
                              className="contact-icon border fs-inverse rounded-pill"
                              data-bs-toggle="tooltip"
                              title="Call"
                            >
                              <i className="fe fe-phone fs-12"></i>
                            </Link>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Video</Tooltip>}
                          >
                            <Link
                              to="#"
                              className="contact-icon border fs-inverse rounded-pill"
                              data-bs-toggle="tooltip"
                              title="Video"
                            >
                              <i className="fe fe-video fs-12"></i>
                            </Link>
                          </OverlayTrigger>
                        </nav>
                      </div>
                    </div>
                  </Col>
                  <Col xxl={4} md={12} lg={12} xl={6}>
                    <div className="border d-flex p-2 br-5 mb-2">
                      <div className="recent-contacts me-3">
                        <div className="main-img-user avatar-md">
                          <img
                            alt="avatar"
                            className="rounded-circle"
                            src={imagesData('face1')}
                          />
                        </div>
                      </div>
                      <div>
                        <h6 className="mt-1 mb-1">Micheal Phelps</h6>
                        <p className="mb-0 text-muted">Web Testing</p>
                      </div>
                      <div className="my-auto ms-auto">
                        <nav className="contact-info d-flex">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Call</Tooltip>}
                          >
                            <Link
                              to="#"
                              className="contact-icon border fs-inverse rounded-pill"
                              data-bs-toggle="tooltip"
                              title="Call"
                            >
                              <i className="fe fe-phone fs-12"></i>
                            </Link>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Video</Tooltip>}
                          >
                            <Link
                              to="#"
                              className="contact-icon border fs-inverse rounded-pill"
                              data-bs-toggle="tooltip"
                              title="Video"
                            >
                              <i className="fe fe-video fs-12"></i>
                            </Link>
                          </OverlayTrigger>
                        </nav>
                      </div>
                    </div>
                  </Col>
                  <Col xxl={4} md={12} lg={12} xl={6}>
                    <div className="border d-flex p-2 br-5 mb-2">
                      <div className="recent-contacts me-3">
                        <div className="main-img-user avatar-md">
                          <img
                            alt="avatar"
                            className="rounded-circle"
                            src={imagesData('face7')}
                          />
                        </div>
                      </div>
                      <div>
                        <h6 className="mt-1 mb-1">Azenda Hills</h6>
                        <p className="mb-0 text-muted">Django</p>
                      </div>
                      <div className="my-auto ms-auto d-md-flex">
                        <nav className="contact-info d-flex">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Call</Tooltip>}
                          >
                            <Link
                              to="#"
                              className="contact-icon border fs-inverse rounded-pill"
                              data-bs-toggle="tooltip"
                              title="Call"
                            >
                              <i className="fe fe-phone fs-12"></i>
                            </Link>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Video</Tooltip>}
                          >
                            <Link
                              to="#"
                              className="contact-icon border fs-inverse rounded-pill"
                              data-bs-toggle="tooltip"
                              title="Video"
                            >
                              <i className="fe fe-video fs-12"></i>
                            </Link>
                          </OverlayTrigger>
                        </nav>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Contacts;