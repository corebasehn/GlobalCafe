import  { Fragment } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { imagesData } from "../../common/commonimages";
import Pageheader from "../../layout/layoutcomponent/pageheader";
import { Fileattachmentdata } from "../../common/commondata";

const Attachments = () =>{
  return(
  <Fragment>

      <Pageheader title="FILE ATTACHMENT TAGS"  heading="Advanced UI"   active="File attachment tags" />

      <Row className="sidemenu-height">
        <Col lg={6}>
          <Card className="custom-card">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Coloured Square File Attachment
                </h6>
                <p className="text-muted card-sub-title">
                  Predefined button styles, each serving its own semantic
                  purpose.
                </p>
              </div>
              <div className="tags">
                {Fileattachmentdata.map((idx)=>(
                <ButtonGroup key={Math.random()}
                  className="file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant={idx.color}
                    type="button"
                    className="btn-text1 text-white"
                  >
                    <i className="mdi mdi-file-image me-2"></i> Image_file.jpg{" "}
                  </Button>
                  <Button
                    variant={idx.color}
                    type="button"
                    className="btn-close text-white"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="custom-card">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Coloured Rounded File Attachment
                </h6>
                <p className="text-muted card-sub-title">
                  Predefined button styles, each serving its own semantic
                  purpose.
                </p>
              </div>
              <div className="tags">
                {Fileattachmentdata.map((idx)=>(
                <ButtonGroup key={Math.random()}
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant={idx.color}
                    type="button"
                    className="rounded-pill text-white btn-text"
                  >
                    <i className="mdi mdi-file-image me-2"></i> Image_file.jpg{" "}
                  </Button>
                  <Button
                    variant=""
                    type="button"
                    className={`btn rounded-pill btn-close btn-${idx.color} text-white`}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>
                ))}

              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="custom-card">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Outline Square File Attachment
                </h6>
                <p className="text-muted card-sub-title">
                  Predefined button styles, each serving its own semantic
                  purpose.
                </p>
              </div>
              <div className="tags">
                {Fileattachmentdata.map((idx)=>(
                <ButtonGroup key={Math.random()}
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    type="button"
                    className={`btn-text1 btn-outline-${idx.color}`}
                  >
                    <i className="mdi mdi-file-image me-2"></i> Image_file.jpg{" "}
                  </Button>
                  <Button
                    variant=""
                    type="button"
                    className={`btn btn-close btn-outline-${idx.color}`}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="custom-card">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Outline Rounded File Attachment
                </h6>
                <p className="text-muted card-sub-title">
                  Predefined button styles, each serving its own semantic
                  purpose.
                </p>
              </div>
              <div className="tags">
                {Fileattachmentdata.map((idx)=>(
                <ButtonGroup key={Math.random()}
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    type="button"
                    className={`btn-text rounded-pill btn-outline-${idx.color}` }
                  >
                    <i className="mdi mdi-file-image me-2"></i> Image_file.jpg{" "}
                  </Button>
                  <Button
                    variant=""
                    type="button"
                    className={`btn rounded-pill btn-close btn-outline-${idx.color}`}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>
                ))}
                
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="custom-card">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Transparent Square File Attachment
                </h6>
                <p className="text-muted card-sub-title">
                  Predefined button styles, each serving its own semantic
                  purpose.
                </p>
              </div>
              <div className="tags">
                {Fileattachmentdata.map((idx)=>(
                <ButtonGroup key={Math.random()}
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    type="button"
                    className={`btn-text1 btn-${idx.color}-light`}
                  >
                    <i className="mdi mdi-file-image me-2"></i> Image_file.jpg{" "}
                  </Button>
                  <Button
                    variant=""
                    type="button"
                    className={`btn btn-close btn-${idx.color}-light`}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="custom-card">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Transparent Rounded File Attachment
                </h6>
                <p className="text-muted card-sub-title">
                  Predefined button styles, each serving its own semantic
                  purpose.
                </p>
              </div>
              <div className="tags">
                {Fileattachmentdata.map((idx)=>(
                <ButtonGroup key={Math.random()}
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    type="button"
                    className={`btn-text btn-${idx.color}-light rounded-pill`}
                  >
                    <i className="mdi mdi-file-image me-2"></i> Image_file.jpg{" "}
                  </Button>
                  <Button
                    variant=""
                    type="button"
                    className={`btn btn-close btn-${idx.color}-light rounded-pill`}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="custom-card">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Square File Attachment with Link
                </h6>
                <p className="text-muted card-sub-title">
                  Square File Attachment with{" "}
                  <code className="highlighter-rouge">&lt;a&gt;</code> tag.
                </p>
              </div>
              <div className="tags">
                <ButtonGroup
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    type="button"
                    className="btn-text1 btn-primary text-white"
                  >
                    <i className="mdi mdi-file-image mx-2"></i>Image01..._jpg
                  </Button>
                  <Button
                    variant=""
                    type="button"
                    className="btn btn-close btn-primary text-white"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>

                <ButtonGroup
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    type="button"
                    className="btn-text1 btn-outline-secondary"
                  >
                    <i className="mdi mdi-file-image me-2"></i> Image_file.jpg{" "}
                  </Button>
                  <Button
                    variant=""
                    type="button"
                    className="btn btn-close btn-outline-secondary"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>

                <ButtonGroup
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    type="button"
                    className="btn-text1 btn-success-light"
                  >
                    <i className="mdi mdi-file-image me-2"></i> Image_file.jpg{" "}
                  </Button>
                  <Button
                    variant=""
                    type="button"
                    className="btn btn-close btn-success-light"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="custom-card">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Rounded File Attachment with link
                </h6>
                <p className="text-muted card-sub-title">
                  Rounded File_Attachment with{" "}
                  <code className="highlighter-rouge">&lt;a&gt;</code> tag.
                </p>
              </div>
              <div className="tags">
                <ButtonGroup
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    type="button"
                    className="btn-text rounded-pill btn-info text-white"
                  >
                    <i className="mdi mdi-file-image mx-2"></i>Image01..._jpg
                  </Button>
                  <Button
                    variant=""
                    type="button"
                    className="btn rounded-pill btn-close btn-info text-white"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>

                <ButtonGroup
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    type="button"
                    className="btn-text rounded-pill btn-outline-warning"
                  >
                    <i className="mdi mdi-file-image me-2"></i> Image_file.jpg{" "}
                  </Button>
                  <Button
                    variant=""
                    type="button"
                    className="btn rounded-pill btn-close btn-outline-warning"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>

                <ButtonGroup
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    type="button"
                    className="btn-text rounded-pill btn-danger-light"
                  >
                    <i className="mdi mdi-file-image me-2"></i> Image_file.jpg{" "}
                  </Button>
                  <Button
                    variant=""
                    type="button"
                    className="btn rounded-pill btn-close btn-danger-light"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="custom-card">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Square File Attachment Sizes
                </h6>
                <p className="text-muted card-sub-title">
                  Predefined button styles, each serving its own semantic
                  purpose.
                </p>
              </div>
              <div className="tags">
                <ButtonGroup
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    type="button"
                    className="btn-text1 btn-sm btn-primary text-white"
                  >
                    <i className="mdi mdi-file-image mx-2"></i>Image01..._jpg
                  </Button>
                  <Button
                    variant=""
                    type="button"
                    className="btn btn-close btn-sm btn-primary text-white"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>

                <ButtonGroup
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button variant="" className="btn-text1 btn-secondary text-white">
                    <i className="mdi mdi-file-excel me-2"></i>Document.exl
                  </Button>
                  <Button
                    variant=""
                    className="btn btn-close btn-secondary text-white"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>

                <ButtonGroup
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    type="button"
                    className="btn-text1 btn-lg btn-info"
                  >
                    <i className="mdi mdi-file-pdf fs-20 me-2"></i>AMN0012.pdf
                  </Button>
                  <Button
                    variant=""
                    type="button"
                    className="btn btn-close btn-lg btn-info"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="custom-card">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Rounded File Attachment Sizes
                </h6>
                <p className="text-muted card-sub-title">
                  Predefined button styles, each serving its own semantic
                  purpose.
                </p>
              </div>
              <div className="tags">
                <ButtonGroup
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    type="button"
                    className="btn-text rounded-pill btn-sm btn-primary text-white"
                  >
                    <i className="mdi mdi-file-image me-2"></i>Image01..._jpg
                  </Button>
                  <Button
                    variant=""
                    type="button"
                    className="btn rounded-pill btn-close btn-sm btn-primary text-white"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>

                <ButtonGroup
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    type="button"
                    className="btn-text rounded-pill btn-secondary"
                  >
                    <i className="mdi mdi-file-excel me-2"></i>Document.exl
                  </Button>
                  <Button
                    variant=""
                    type="button"
                    className="btn rounded-pill btn-close btn-secondary text-white"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>

                <ButtonGroup
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    type="button"
                    className="btn-text rounded-pill btn-lg btn-info"
                  >
                    <i className="mdi mdi-file-pdf fs-20 me-2"></i>AMN0012.pdf
                  </Button>
                  <Button
                    variant=""
                    type="button"
                    className="btn rounded-pill btn-close btn-lg btn-info"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="custom-card">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Square File Attachment Sizes with link
                </h6>
                <p className="text-muted card-sub-title">
                  Square File_Attachment Sizes with{" "}
                  <code className="highlighter-rouge">&lt;a&gt;</code> tag.
                </p>
              </div>
              <div className="tags">
                <ButtonGroup
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    className="btn-text1 btn-sm btn-primary text-white"
                  >
                    <i className="mdi mdi-file-image mx-2"></i>Image01..._jpg
                  </Button>
                  <Button
                    variant=""
                    className="btn btn-close btn-sm btn-primary text-white"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>

                <ButtonGroup
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button variant="" className="btn-text1 btn-secondary text-white">
                    <i className="mdi mdi-file-excel me-2"></i>Document.exl
                  </Button>
                  <Button
                    variant=""
                    className="btn btn-close btn-secondary text-white"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>

                <ButtonGroup
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button variant="" className="btn-text1 btn-lg btn-info">
                    <i className="mdi mdi-file-pdf fs-20 me-2"></i>AMN0012.pdf
                  </Button>
                  <Button
                    variant=""
                    className="btn btn-close btn-lg btn-info"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="custom-card">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Rounded File Attachment Sizes with link
                </h6>
                <p className="text-muted card-sub-title">
                  Rounded File_Attachment Sizes with{" "}
                  <code className="highlighter-rouge">&lt;a&gt;</code> tag.
                </p>
              </div>
              <div className="tags">
                <ButtonGroup
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    className="btn-text rounded-pill btn-sm btn-primary text-white"
                  >
                    <i className="mdi mdi-file-image me-2"></i>Image01..._jpg
                  </Button>
                  <Button
                    variant=""
                    className="btn rounded-pill btn-close btn-sm btn-primary text-white"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>

                <ButtonGroup
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    className="btn-text rounded-pill btn-secondary text-white"
                  >
                    <i className="mdi mdi-file-excel me-2"></i>Document.exl
                  </Button>
                  <Button
                    variant=""
                    className="btn rounded-pill btn-close btn-secondary text-white"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>

                <ButtonGroup
                  className="btn-group file-attach m-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant=""
                    className="btn-text rounded-pill btn-lg btn-info"
                  >
                    <i className="mdi mdi-file-pdf fs-20 me-2"></i>AMN0012.pdf
                  </Button>
                  <Button
                    variant=""
                    className="btn rounded-pill btn-close btn-lg btn-info"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </ButtonGroup>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl={3}lg={6}sm={12}md={6}>
          <Card className="custom-card">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1 card-sub-title">
                  Image-attachment
                </h6>
                <p className="text-muted card-sub-title"></p>
              </div>
              <div className="h-100  attached-file-grid6">
                <div className="pro-img-box attached-file-image">
                  <Link to="#">
                    <img
                      className=" pic-1 pos-relative br-5 w-100"
                      src={imagesData('media1')}
                      alt="attached-file"
                    />
                    <span className="image-pic">123image.jpg</span>
                  </Link>
                  <ul className="icons">
                    <li className="me-1">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip className="btn">download</Tooltip>}
                      >
                        <i className="fe fe-download"></i>
                      </OverlayTrigger>
                    </li>
                    <li className="me-1">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip className="btn">deldete</Tooltip>}
                      >
                        <i className="fe fe-trash"></i>
                      </OverlayTrigger>
                    </li>
                    <li className="me-1">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip className="btn">share</Tooltip>}
                      >
                        <i className="fe fe-share"></i>
                      </OverlayTrigger>
                    </li>
                  </ul>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3}lg={6}sm={12}md={6}>
          <Card className="custom-card">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">Image-attachment</h6>
                <p className="text-muted card-sub-title"></p>
              </div>
              <div className="h-100  attached-file-grid6">
                <div className="pro-img-box attached-file-image">
                  <Link to="#">
                    <img
                      className=" pic-1 pos-relative br-5 w-100"
                      src={imagesData('media2')}
                      alt="attached-file"
                    />
                    <span className="image-pic">123image.jpg</span>
                  </Link>
                  <ul className="icons">
                    <li className="me-1">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip className="btn">download</Tooltip>}
                      >
                        <i className="fe fe-download"></i>
                      </OverlayTrigger>
                    </li>
                    <li className="me-1">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip className="btn">deldete</Tooltip>}
                      >
                        <i className="fe fe-trash"></i>
                      </OverlayTrigger>
                    </li>
                    <li className="me-1">
                       <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip className="btn">share</Tooltip>}
                      >
                        <i className="fe fe-share"></i>
                      </OverlayTrigger>
                    </li>
                  </ul>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3}lg={6}sm={12}md={6}>
          <Card className="custom-card">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">Image-attachment</h6>
                <p className="text-muted card-sub-title"></p>
              </div>
              <div className="h-100  attached-file-grid6">
                <div className="pro-img-box attached-file-image">
                  <Link to="#">
                    <img
                      className=" pic-1 pos-relative br-5 w-100"
                      src={imagesData('media3')}
                      alt="attached-file"
                    />
                    <span className="image-pic">123image.jpg</span>
                  </Link>
                  <ul className="icons">
                    <li className="me-1">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip className="btn">download</Tooltip>}
                      >
                        <i className="fe fe-download"></i>
                      </OverlayTrigger>
                    </li>
                    <li className="me-1">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip className="btn">deldete</Tooltip>}
                      >
                        <i className="fe fe-trash"></i>
                      </OverlayTrigger>
                    </li>
                    <li className="me-1">
                       <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip className="btn">share</Tooltip>}
                      >
                        <i className="fe fe-share"></i>
                      </OverlayTrigger>
                    </li>
                  </ul>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3}lg={6}sm={12}md={6}>
          <Card className="custom-card">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">Image-attachment</h6>
                <p className="text-muted card-sub-title"></p>
              </div>
              <div className="h-100  attached-file-grid6">
                <div className="pro-img-box attached-file-image">
                  <Link to="#">
                    <img
                      className=" pic-1 pos-relative br-5 w-100"
                      src={imagesData('media4')}
                      alt="attached-file"
                    />
                    <span className="image-pic">123image.jpg</span>
                  </Link>
                  <ul className="icons">
                    <li className="me-1">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip className="btn">download</Tooltip>}
                      >
                        <i className="fe fe-download"></i>
                      </OverlayTrigger>
                    </li>
                    <li className="me-1">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip className="btn">deldete</Tooltip>}
                      >
                        <i className="fe fe-trash"></i>
                      </OverlayTrigger>
                    </li>
                    <li className="me-1">
                       <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip className="btn">share</Tooltip>}
                      >
                        <i className="fe fe-share"></i>
                      </OverlayTrigger>
                    </li>
                  </ul>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <h3 className="card-title">Image File_Attachment Small Size</h3>
            </Card.Header>
            <Card.Body>
              <div className="text-wrap pb-3">
                <div className="file-image-1">
                  <div className="product-image">
                    <Link to={`${import.meta.env.BASE_URL}app/filedetails/`}>
                      <img
                        src={imagesData('image')}
                        className="br-5"
                        alt=""
                      />
                    </Link>
                    <ul className="icons">
                      <li>
                        <Link to="#" className="btn bg-danger">
                          <i className="fe fe-trash"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-secondary">
                          <i className="fe fe-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-primary">
                          <i className="fe fe-eye"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <span className="file-name-1">Image01.jpg</span>
                </div>
                <div className="file-image-1">
                  <div className="product-image">
                    <Link to={`${import.meta.env.BASE_URL}app/filedetails/`}>
                      <img
                        src={imagesData('doc')}
                        alt=""
                      />
                    </Link>
                    <ul className="icons">
                      <li>
                        <Link to="#" className="btn bg-danger">
                          <i className="fe fe-trash"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-secondary">
                          <i className="fe fe-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-primary">
                          <i className="fe fe-eye"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <span className="file-name-1">Word.doc</span>
                </div>
                <div className="file-image-1">
                  <div className="product-image">
                    <Link to={`${import.meta.env.BASE_URL}app/filedetails/`}>
                      <img
                        src={imagesData('file2')}
                        alt=""
                      />
                    </Link>
                    <ul className="icons">
                      <li>
                        <Link to="#" className="btn bg-danger">
                          <i className="fe fe-trash"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-secondary">
                          <i className="fe fe-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-primary">
                          <i className="fe fe-eye"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <span className="file-name-1">Excel.xls</span>
                </div>
                <div className="file-image-1">
                  <div className="product-image">
                    <Link to={`${import.meta.env.BASE_URL}app/filedetails/`}>
                      <img
                        src={imagesData('file')}
                        alt=""
                      />
                    </Link>
                    <ul className="icons">
                      <li>
                        <Link to="#" className="btn bg-danger">
                          <i className="fe fe-trash"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-secondary">
                          <i className="fe fe-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-primary">
                          <i className="fe fe-eye"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <span className="file-name-1">Document.pdf</span>
                </div>
                <div className="file-image-1">
                  <div className="product-image">
                    <Link to={`${import.meta.env.BASE_URL}app/filedetails/`}>
                      <img
                        src={imagesData('climate')}
                        className="br-5"
                        alt=""
                      />
                    </Link>
                    <ul className="icons">
                      <li>
                        <Link to="#" className="btn bg-danger">
                          <i className="fe fe-trash"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-secondary">
                          <i className="fe fe-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-primary">
                          <i className="fe fe-eye"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <span className="file-name-1">Image02.jpg</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <h3 className="card-title">Image File_Attachment Medium Size</h3>
            </Card.Header>
            <Card.Body>
              <div className="text-wrap pb-3">
                <div className="file-image-1 file-image-md">
                  <div className="product-image">
                    <Link to={`${import.meta.env.BASE_URL}app/filedetails/`}>
                      <img
                        src={imagesData('image')}
                        className="br-5"
                        alt=""
                      />
                    </Link>
                    <ul className="icons">
                      <li>
                        <Link to="#" className="btn bg-danger">
                          <i className="fe fe-trash"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-secondary">
                          <i className="fe fe-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-primary">
                          <i className="fe fe-eye"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <span className="file-name-1">Image01.jpg</span>
                </div>
                <div className="file-image-1 file-image-md">
                  <div className="product-image">
                    <Link to={`${import.meta.env.BASE_URL}app/filedetails/`}>
                      <img
                        src={imagesData('doc')}
                        alt=""
                      />
                    </Link>
                    <ul className="icons">
                      <li>
                        <Link to="#" className="btn bg-danger">
                          <i className="fe fe-trash"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-secondary">
                          <i className="fe fe-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-primary">
                          <i className="fe fe-eye"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <span className="file-name-1">Word.doc</span>
                </div>
                <div className="file-image-1 file-image-md">
                  <div className="product-image">
                    <Link to={`${import.meta.env.BASE_URL}app/filedetails/`}>
                      <img
                        src={imagesData('file2')}
                        alt=""
                      />
                    </Link>
                    <ul className="icons">
                      <li>
                        <Link to="#" className="btn bg-danger">
                          <i className="fe fe-trash"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-secondary">
                          <i className="fe fe-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-primary">
                          <i className="fe fe-eye"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <span className="file-name-1">Excel.xls</span>
                </div>
                <div className="file-image-1 file-image-md">
                  <div className="product-image">
                    <Link to={`${import.meta.env.BASE_URL}app/filedetails/`}>
                      <img
                        src={imagesData('file')}
                        alt=""
                      />
                    </Link>
                    <ul className="icons">
                      <li>
                        <Link to="#" className="btn bg-danger">
                          <i className="fe fe-trash"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-secondary">
                          <i className="fe fe-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-primary">
                          <i className="fe fe-eye"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <span className="file-name-1">Document.pdf</span>
                </div>
                <div className="file-image-1 file-image-md">
                  <div className="product-image">
                    <Link to={`${import.meta.env.BASE_URL}app/filedetails/`}>
                      <img
                        src={imagesData('climate')}
                        className="br-5"
                        alt=""
                      />
                    </Link>
                    <ul className="icons">
                      <li>
                        <Link to="#" className="btn bg-danger">
                          <i className="fe fe-trash"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-secondary">
                          <i className="fe fe-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-primary">
                          <i className="fe fe-eye"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <span className="file-name-1">Image02.jpg</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <h3 className="card-title">Image File_Attachment Large Size</h3>
            </Card.Header>
            <Card.Body>
              <div className="text-wrap pb-3">
                <div className="file-image-1 file-image-lg">
                  <div className="product-image">
                    <Link to={`${import.meta.env.BASE_URL}app/filedetails/`}>
                      <img
                        src={imagesData('image')}
                        className="br-5"
                        alt=""
                      />
                    </Link>
                    <ul className="icons">
                      <li>
                        <Link to="#" className="btn bg-danger">
                          <i className="fe fe-trash"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-secondary">
                          <i className="fe fe-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-primary">
                          <i className="fe fe-eye"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <span className="file-name-1">Image01.jpg</span>
                </div>
                <div className="file-image-1 file-image-lg">
                  <div className="product-image">
                    <Link to={`${import.meta.env.BASE_URL}app/filedetails/`}>
                      <img
                        src={imagesData('doc')}
                        alt=""
                      />
                    </Link>
                    <ul className="icons">
                      <li>
                        <Link to="#" className="btn bg-danger">
                          <i className="fe fe-trash"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-secondary">
                          <i className="fe fe-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-primary">
                          <i className="fe fe-eye"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <span className="file-name-1">Word.doc</span>
                </div>
                <div className="file-image-1 file-image-lg">
                  <div className="product-image">
                    <Link to={`${import.meta.env.BASE_URL}app/filedetails/`}>
                      <img
                        src={imagesData('file2')}
                        alt=""
                      />
                    </Link>
                    <ul className="icons">
                      <li>
                        <Link to="#" className="btn bg-danger">
                          <i className="fe fe-trash"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-secondary">
                          <i className="fe fe-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-primary">
                          <i className="fe fe-eye"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <span className="file-name-1">Excel.xls</span>
                </div>
                <div className="file-image-1 file-image-lg">
                  <div className="product-image">
                    <Link to={`${import.meta.env.BASE_URL}app/filedetails/`}>
                      <img
                        src={imagesData('file')}
                        alt=""
                      />
                    </Link>
                    <ul className="icons">
                      <li>
                        <Link to="#" className="btn bg-danger">
                          <i className="fe fe-trash"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-secondary">
                          <i className="fe fe-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-primary">
                          <i className="fe fe-eye"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <span className="file-name-1">Document.pdf</span>
                </div>
                <div className="file-image-1 file-image-lg">
                  <div className="product-image">
                    <Link to={`${import.meta.env.BASE_URL}app/filedetails/`}>
                      <img
                        src={imagesData('climate')}
                        className="br-5"
                        alt=""
                      />
                    </Link>
                    <ul className="icons">
                      <li>
                        <Link to="#" className="btn bg-danger">
                          <i className="fe fe-trash"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-secondary">
                          <i className="fe fe-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn bg-primary">
                          <i className="fe fe-eye"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <span className="file-name-1">Image02.jpg</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Fragment>
);
};

export default Attachments;
