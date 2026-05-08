import   { Fragment } from "react";
import {  Nav, Row, Col, Dropdown, Pagination,Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { imagesData } from "../../../common/commonimages";
import Pageheader from "../../../layout/layoutcomponent/pageheader";
import { maildata1 } from "../../../common/commondata";

const Mail = () =>{
  return(
  <Fragment>

    <Pageheader title="MAIL"  heading="Mail"   active="Mail" />

    <Row className=" row-sm main-content-mail">
      <Col lg={4} xl={3} md={12}>
        <Card className=" mg-b-20">
          <Card.Body className="main-content-left main-content-left-mail card-body">
            <Link to={`${import.meta.env.BASE_URL}pages/mail/mailcompose/`}
              className="btn btn-primary btn-compose"
              id="btnCompose"
            >
              Compose
            </Link>
            <div className="main-mail-menu">
              <Nav
                className="nav main-nav-column mg-b-20"
                defaultActiveKey="Inbox"
              >
                <Nav.Item>
                  <Nav.Link className="nav-link thumb " eventKey="Inbox">
                    <i className="far fa-envelope"></i> Inbox <span>20</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="nav-link thumb" eventKey="Important">
                    <i className="far fa-bookmark"></i> Important{" "}
                    <span>10</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="nav-link thumb" eventKey="Sent">
                    <i className="far fa-paper-plane"></i> Sent Mail{" "}
                    <span>8</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="nav-link thumb" eventKey="Drafts">
                    <i className="far fa-hourglass"></i> Drafts <span>15</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="nav-link thumb" eventKey="Trash">
                    <i className="fe fe-trash"></i> Trash <span>6</span>
                  </Nav.Link>
                </Nav.Item>

                <label className="main-content-label main-content-label-sm mailnav ms-3">
                  Label
                </label>

                <Nav.Item>
                  <Nav.Link className="nav-link thumb" eventKey="Social">
                    <i className="fab fa-instagram"></i> Social <span>10</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="nav-link thumb" eventKey="Promotions">
                    <i className="far fa-plus-square"></i> Promotions{" "}
                    <span>22</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="nav-link thumb" eventKey="Updates">
                    <i className="far fa-arrow-alt-circle-up"></i> Updates{" "}
                    <span>17</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
           
          </Card.Body>
        </Card>
        <Card className=" mt-3">
          <Card.Header>
              <label className="card-title">contacts</label>
          </Card.Header>
          <Card.Body className="card-body p-0">
            <nav className="nav main-nav-column">
              <div className="main-contact-item">
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
              </div>
              <div className="main-contact-item">
                <div className="main-img-user online">
                  <img
                    alt="avatar"
                    src={imagesData('face1')}
                  />
                </div>
                <div className="main-contact-body">
                  <h6>Cherry Blossom</h6>
                  <span className="phone">+1-644-767-890</span>
                </div>
              </div>
              <div className="main-contact-item">
                <div className="main-img-user online">
                  <img
                    alt="avatar"
                    src={imagesData('face12')}
                  />
                </div>
                <div className="main-contact-body">
                  <h6>Liz Erd</h6>
                  <span className="phone">+1-634-577-890</span>
                </div>
              </div>
              <div className="main-contact-item">
                <div className="main-img-user online">
                  <img
                    alt="avatar"
                    src={imagesData('face11')}
                  />
                </div>
                <div className="main-contact-body">
                  <h6>Colin Sik</h6>
                  <span className="phone">+1-834-367-890</span>
                </div>
              </div>
              <div className="main-contact-item">
                <div className="main-img-user online">
                  <img
                    alt="avatar"
                    src={imagesData('face4')}
                  />
                </div>
                <div className="main-contact-body">
                  <h6>Rita Book</h6>
                  <span className="phone">+1-233-867-830</span>
                </div>
              </div>
              <div className="main-contact-item">
                <div className="main-img-user online">
                  <img
                    alt="avatar"
                    src={imagesData('face5')}
                  />
                </div>
                <div className="main-contact-body">
                  <h6>Col Fays</h6>
                  <span className="phone">+1-144-577-690</span>
                </div>
              </div>
            </nav>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={8} xl={9} md={12}>
        <Card>
          <Card.Body className="main-content-body main-content-body-mail card-body">
            <div className="mail-option">
              <div className="chk-all border-0">
                <div className="btn-group">
                  <Dropdown>
                    <Dropdown.Toggle as='a'
                      variant=""
                      className="no-caret btn mini all border"
                      aria-expanded="false"
                    >
                      All
                      <i className="fe fe-chevron-down"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className="dropdown-menu"
                      style={{ margin: "0px" }}
                    >
                      <Dropdown.Item>None</Dropdown.Item>
                      <Dropdown.Item>Read</Dropdown.Item>
                      <Dropdown.Item>Unread</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className="btn-group me-2">
                <Link to="#" className="btn mini tooltips">
                  <i className="fe fe-repeat"></i>
                </Link>
              </div>
              <div className="btn-group hidden-phone">
                <Dropdown>
                  <Dropdown.Toggle as='a'
                    variant=""
                    data-bs-toggle="dropdown"
                    className="no-caret btn mini blue border"
                    aria-expanded="false"
                  >
                    More
                    <i className="fe fe-chevron-down"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    style={{ margin: "0px" }}
                    className="dropdown-menu"
                  >
                    <Dropdown.Item className="d-inline-flex align-items-center">
                      <i className="fe fe-edit me-2"></i> Mark as Read
                    </Dropdown.Item>
                    <Dropdown.Item className="d-inline-flex align-items-center">
                      <i className="fe fe fe-slash me-2"></i> Spam
                    </Dropdown.Item>
                    <li className="divider"></li>
                    <Dropdown.Item className="d-inline-flex align-items-center">
                      <i className="fe fe-trash me-2"></i> Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <ul className="unstyled inbox-pagination mb-0">
                <li>
                  <span>1-50 of 234</span>
                </li>

                <li className="mt-1">
                  <Link className="btn np-btn" to="#">
                    <i className="fe fe-chevron-right pagination-right"></i>
                  </Link>
                </li>
              </ul>
            </div>
          
          </Card.Body>
       
          <div className="main-mail-list bd-t-0">
            {maildata1.map((idx)=>(
            <div className="main-mail-item unread" key={Math.random()} >
              <div className="main-mail-checkbox">
                <label className="ckbox">
                  <input type="checkbox" /> <span></span>
                </label>
              </div>
              <div className={`main-mail-star ${idx.class1}`}>
                <i className="typcn typcn-star"></i>
              </div>
              <div className={idx.class2}>
                <img
                  alt=""
                  src={idx.src}
                />
                {idx.text4}
              </div>
              <div className="main-mail-body">
                <div className="main-mail-from">{idx.name}</div>
                <div className="main-mail-subject">
                  <strong>{idx.text1}</strong>{" "}
                  <span>
                    {idx.text2}
                  </span>
                </div>
              </div>
              <div className="main-mail-attachment"></div>
              <div className="main-mail-date">{idx.text3}</div>
            </div>
            ))}
          </div>
        </Card>
      </Col>
    </Row>
    <Row className="">
      <Pagination className="product-pagination justify-content-end">
        <Pagination.Item className="page-item page-prev disabled">
          Prev
        </Pagination.Item>
        <Pagination.Item className="page-item active">1</Pagination.Item>
        <Pagination.Item className="page-item">2</Pagination.Item>
        <Pagination.Item className="page-item">3</Pagination.Item>
        <Pagination.Item className="page-item">4</Pagination.Item>
        <Pagination.Item className="page-item page-next">Next</Pagination.Item>
      </Pagination>
    
    </Row>
  </Fragment>
);
};

export default Mail;
