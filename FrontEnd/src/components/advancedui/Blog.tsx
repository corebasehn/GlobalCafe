import { FC, Fragment } from 'react';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { Card, Col, Pagination, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { imagesData } from '../../common/commonimages';

interface ComponentProps { }

const Blog: FC<ComponentProps> = () => {
  return (
    <Fragment>
      <Pageheader title="BLOG" heading="Advanced UI" active="Blog" />

      <Row>
        <Col xxl={6} xl={12} lg={12} md={12}>
          <Card className="card overflow-hidden">
            <Link to={`${import.meta.env.BASE_URL}advancedui/blogdetails/`} className="card custom-card card-img-top-1 background-image-blog mb-0" ></Link>
            <Card.Body>
              <Link to="#" className="mt-4">
                <h5 className="fw-semibold">
                  Best Place To visit For a Holiday idea of denouncing pleasure?
                </h5>
              </Link>
              <p className="mb-0 mt-3">
                I must explain to you how all this mistaken idea of denouncing
                pleasure and praising pain was born and I will give you a complete
                account of the system, and expound the actual teachings of the
                great explorer of the truth, the master-builder of human
                happiness. No one rejects, dislikes, or avoids pleasure itself,
                because it is pleasure.
              </p>
            </Card.Body>
            <Card.Footer>
              <div className="item7-card-desc d-sm-flex mt-0">
                <Link to={`${import.meta.env.BASE_URL}pages/profile/`} className="d-flex">
                  <span className="fe fe-user text-muted me-2 fs-17"></span>
                  <div className="mt-0 mt-0  fw-semibold text-muted">
                    Anna Ogden
                  </div>
                </Link>
                <div className="d-sm-flex ms-sm-auto">
                  <Link to="#" className="d-flex me-3">
                    <span className="fe fe-calendar text-muted me-2 fs-17"></span>
                    <div className="mt-0 mt-0  fw-semibold text-muted">
                      Jan-18-2020
                    </div>
                  </Link>
                  <Link className="me-0 d-flex" to="#">
                    <span className="fe fe-message-square text-muted me-2 fs-17"></span>
                    <div className="mt-0 mt-0  fw-semibold text-muted">
                      12 Comments
                    </div>
                  </Link>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} sm={6}>
          <Card className="card custom-card card-img-top-1">
            <Link to={`${import.meta.env.BASE_URL}advancedui/blogdetails/`}>
              <img
                className="card-img-top w-100 w-100"
                src={imagesData('photo11')}
                alt=""
              />
            </Link>
            <Card.Body className="pb-0">
              <Link to={`${import.meta.env.BASE_URL}advancedui/blogdetails/`}>
                <h4 className="card-title">
                  10 Ways To Immediately Start Selling Products !
                </h4>
              </Link>
              <p className="mb-2">
                Those who do not know how pursues or desires to occur in which
                toil and pain can procure him some great pleasure. To take a
                trivial example pain was born and I will give you a complete
                account of the system, and expound the actual teachings of the
                great explorer of the truth, the master-buil
              </p>
            </Card.Body>
            <div className="item7-card-desc d-flex p-3 pt-0 align-items-center justify-content-center border-top">
              <div className="main-img-user online">
                <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                  <img
                    alt="avatar"
                    src={imagesData('face9')}
                  />
                </Link>
              </div>
              <div className="main-contact-body">
                <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                  <h6>Jiggel mossin</h6>
                </Link>
              </div>
              <div className="ms-auto">
                <Link className="me-0 d-flex" to="#">
                  <span className="phone me-3 fw-semibold text-muted">
                    <span className="fe fe-calendar text-muted me-2 ms-2 fs-16"></span>
                    Aug 01,2021
                  </span>
                </Link>
              </div>
            </div>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} sm={6}>
          <Card>
            <Card.Header className=" pb-0">
              <h3 className="card-title">Latest Posts</h3>
            </Card.Header>
            <Card.Body>
              <div className="media d-flex mb-4">
                <img
                  alt=""
                  className="main-img-user avatar avatar-lg me-4 br-5"
                  src={imagesData('photo33')}
                />
                <div className="media-body">
                  <span className="d-block">Tourism</span>
                  <p className="mb-0 fw-semibold">
                    Explore tourism by visitinig places.
                  </p>
                  <small className="d-block text-muted">2 day ago</small>
                </div>
              </div>
              <div className="media d-flex mb-4">
                <img
                  alt=""
                  className="main-img-user avatar avatar-lg me-4 br-5"
                  src={imagesData('photo34')}
                />
                <div className="media-body">
                  <span className="d-block">Beautician</span>
                  <p className="mb-0 fw-semibold">
                    Beautification courses are available.
                  </p>
                  <small className="d-block text-muted">2 hrs ago</small>
                </div>
              </div>
              <div className="media d-flex mb-4">
                <img
                  alt=""
                  className="main-img-user avatar avatar-lg me-4 br-5"
                  src={imagesData('photo37')}
                />
                <div className="media-body">
                  <span className="d-block">Music</span>
                  <p className="mb-0 fw-semibold">
                    Music in a peaceful way.
                  </p>
                  <small className="d-block text-muted">1 day ago</small>
                </div>
              </div>
              <div className="media d-flex mb-4">
                <img
                  alt=""
                  className="main-img-user avatar avatar-lg me-4 br-5"
                  src={imagesData('photo36')}
                />
                <div className="media-body">
                  <span className="d-block">Literature</span>
                  <p className="mb-0 fw-semibold">
                    English and spanish classNamees in Your way
                  </p>
                  <small className="d-block text-muted">1 week ago</small>
                </div>
              </div>
              <div className="media d-flex mb-3">
                <img
                  alt=""
                  className="main-img-user avatar avatar-lg me-4 br-5"
                  src={imagesData('photo38')}
                />
                <div className="media-body">
                  <span className="d-block">Health</span>
                  <p className="mb-0 fw-semibold">
                    Health care and fitness awareness.
                  </p>
                  <small className="d-block text-muted">22 hrs ago</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xxl={3} xl={6} lg={6} sm={6}>
          <Card className="card custom-card card-img-top-1">
            <Link to={`${import.meta.env.BASE_URL}advancedui/blogdetails/`}>
              <img
                className="card-img-top w-100 w-100"
                src={imagesData('photo2')}
                alt=""
              />
            </Link>
            <Card.Body className="pb-0">
              <Link to={`${import.meta.env.BASE_URL}advancedui/blogdetails/`}>
                <h4 className="card-title">
                  How To Become Better With Building In 1 Month !
                </h4>
              </Link>
              <p className="card-text mb-2">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                officia deserunt mollit anim id est laborum.
              </p>
            </Card.Body>
            <div className="item7-card-desc d-flex p-3 pt-0 align-items-center justify-content-center border-top">
              <div className="main-img-user online">
                <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                  <img
                    alt="avatar"
                    src={imagesData('face2')}
                  />
                </Link>
              </div>
              <div className="main-contact-body">
                <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                  <h6>Abigail John</h6>
                </Link>
              </div>
              <div className="ms-auto">
                <Link className="me-0 d-flex" to="#">
                  <span className="phone me-3 fw-semibold text-muted">
                    <span className="fe fe-calendar text-muted me-1 fs-16"></span>{" "}
                    Aug 24,2021
                  </span>
                </Link>
              </div>
            </div>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} sm={6}>
          <Card className="card custom-card card-img-top-1">
            <Link to={`${import.meta.env.BASE_URL}advancedui/blogdetails/`}>
              <img
                className="card-img-top w-100 w-100"
                src={imagesData('photo1')}
                alt=""
              />
            </Link>
            <Card.Body className="pb-0">
              <Link to={`${import.meta.env.BASE_URL}advancedui/blogdetails/`}>
                <h4 className="card-title">
                  10 Ways To Immediately Start Selling Products !
                </h4>
              </Link>
              <p className="card-text mb-2">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                officia deserunt mollit anim id est laborum.
              </p>
            </Card.Body>
            <div className="item7-card-desc d-flex p-3 pt-0 align-items-center justify-content-center border-top">
              <div className="main-img-user online">
                <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                  <img
                    alt="avatar"
                    src={imagesData('face9')}
                  />
                </Link>
              </div>
              <div className="main-contact-body">
                <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                  <h6>Jiggel mossin</h6>
                </Link>
              </div>
              <div className="ms-auto">
                <Link className="me-0 d-flex" to="#">
                  <span className="phone me-3 fw-semibold text-muted">
                    <span className="fe fe-calendar text-muted me-1 fs-16"></span>{" "}
                    Aug 01,2021
                  </span>
                </Link>
              </div>
            </div>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} sm={6}>
          <Card className="card custom-card card-img-top-1">
            <Link to={`${import.meta.env.BASE_URL}advancedui/blogdetails/`}>
              <img
                className="card-img-top w-100 w-100"
                src={imagesData('photo9')}
                alt=""
              />
            </Link>
            <Card.Body className="pb-0">
              <Link to={`${import.meta.env.BASE_URL}advancedui/blogdetails/`}>
                <h4 className="card-title">
                  3 Easy Ways To Make Your mobile Faster & Even !
                </h4>
              </Link>
              <p className="card-text mb-2">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                officia deserunt mollit anim id est laborum.
              </p>
            </Card.Body>
            <div className="item7-card-desc d-flex p-3 pt-0 align-items-center justify-content-center border-top">
              <div className="main-img-user online">
                <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                  <img
                    alt="avatar"
                    src={imagesData('face7')}
                  />
                </Link>
              </div>
              <div className="main-contact-body">
                <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                  <h6>Raven Chanan</h6>
                </Link>
              </div>
              <div className="ms-auto">
                <Link className="me-0 d-flex" to="#">
                  <span className="phone me-3 fw-semibold text-muted">
                    <span className="fe fe-calendar text-muted me-1 fs-16"></span>{" "}
                    Feb 19,2021
                  </span>
                </Link>
              </div>
            </div>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} sm={6}>
          <Card className="card overflow-hidden">
            <Card.Header className=" pb-1">
              <h3 className="card-title mb-2">Blog AUthors</h3>
            </Card.Header>
            <Card.Body className="p-0 customers mt-1">
              <div className="list-group list-lg-group list-group-flush">
                <div className="">
                  <div className="list-group-item list-group-item-action border-0 border-top">
                    <div className="media mt-0">
                      <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                        <img
                          className="avatar-lg rounded-circle me-3 my-auto"
                          src={imagesData('face3')}
                          alt="description"
                        />
                      </Link>
                      <div className="media-body">
                        <div className="d-flex align-items-center">
                          <div className="mt-0">
                            <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                              <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                                Samantha Melon
                              </h5>
                            </Link>
                            <p className="mb-0 fs-13 text-muted">
                              User ID: #1234
                            </p>
                          </div>
                          <span className="ms-auto wd-45p fs-16 ">
                            <span id="spark1" className="wd-100p"></span>
                            <span className="float-end badge bg-success-transparent">
                              <span className="op-7 text-success fw-semibold">
                                8 hrs ago{" "}
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="list-group-item list-group-item-action  border-0 border-top">
                    <div className="media mt-0">
                      <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                        <img
                          className="avatar-lg rounded-circle me-3 my-auto"
                          src={imagesData('face11')}
                          alt="description"
                        />
                      </Link>
                      <div className="media-body">
                        <div className="d-flex align-items-center">
                          <div className="mt-1">
                            <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                              <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                                Allie Grater
                              </h5>
                            </Link>
                            <p className="mb-0 fs-13 text-muted">
                              User ID: #1234
                            </p>
                          </div>
                          <span className="ms-auto wd-45p fs-16 ">
                            <span id="spark2" className="wd-100p"></span>
                            <span className="float-end badge bg-danger-transparent ">
                              <span className="op-7 text-danger fw-semibold">
                                12 hrs ago
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="list-group-item list-group-item-action border-0 border-top">
                    <div className="media mt-0">
                      <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                        <img
                          className="avatar-lg rounded-circle me-3 my-auto"
                          src={imagesData('face17')}
                          alt="description"
                        />
                      </Link>
                      <div className="media-body">
                        <div className="d-flex align-items-center">
                          <div className="mt-1">
                            <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                              <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                                Gabe Lackmen
                              </h5>
                            </Link>
                            <p className="mb-0 fs-13 text-muted">
                              User ID: #1234
                            </p>
                          </div>
                          <span className="ms-auto wd-45p fs-16 ">
                            <span id="spark3" className="wd-100p"></span>
                            <span className="float-end badge bg-danger-transparent ">
                              <span className="op-7 text-danger fw-semibold">
                                1 hr ago
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="list-group-item list-group-item-action  border-0 border-top">
                    <div className="media mt-0">
                      <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                        <img
                          className="avatar-lg rounded-circle me-3 my-auto"
                          src={imagesData('face15')}
                          alt="description"
                        />
                      </Link>
                      <div className="media-body">
                        <div className="d-flex align-items-center">
                          <div className="mt-1">
                            <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                              <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                                Manuel Labor
                              </h5>
                            </Link>
                            <p className="mb-0 fs-13 text-muted">
                              User ID: #1234
                            </p>
                          </div>
                          <span className="ms-auto wd-45p fs-16">
                            <span id="spark6" className="wd-100p"></span>
                            <span className="float-end badge bg-success-transparent ">
                              <span className="op-7 text-success fw-semibold">
                                3 days ago
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="list-group-item list-group-item-action border-0 border-top">
                    <div className="media mt-0">
                      <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                        <img
                          className="avatar-lg rounded-circle me-3 my-auto"
                          src={imagesData('face13')}
                          alt="description"
                        />
                      </Link>
                      <div className="media-body">
                        <div className="d-flex align-items-center">
                          <div className="mt-1">
                            <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                              <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                              Cedric Kelly
                              </h5>
                            </Link>
                            <p className="mb-0 fs-13 text-muted">
                              User ID: #1234
                            </p>
                          </div>
                          <span className="ms-auto wd-45p fs-16">
                            <span id="spark4" className="wd-100p"></span>
                            <span className="float-end badge bg-danger-transparent ">
                              <span className="op-7 text-danger fw-semibold">
                                22 hrs ago
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="list-group-item list-group-item-action border-0 border-top">
                    <div className="media mt-0">
                      <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                        <img
                          className="avatar-lg rounded-circle me-3 my-auto"
                          src={imagesData('face13')}
                          alt="description"
                        />
                      </Link>
                      <div className="media-body">
                        <div className="d-flex align-items-center">
                          <div className="mt-1">
                            <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                              <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                              Julian Kerr
                              </h5>
                            </Link>
                            <p className="mb-0 fs-13 text-muted">
                              User ID: #1234
                            </p>
                          </div>
                          <span className="ms-auto wd-45p fs-16">
                            <span id="spark5" className="wd-100p"></span>
                            <span className="float-end badge bg-danger-transparent ">
                              <span className="op-7 text-danger fw-semibold">
                                1 day ago
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Pagination className="pagination product-pagination ms-auto float-sm-end">
        <Pagination.Item className="page-item page-prev disabled">
          Prev
        </Pagination.Item>
        <Pagination.Item className="page-item active">
          1
        </Pagination.Item>
        <Pagination.Item className="page-item">
          2
        </Pagination.Item>
        <Pagination.Item className="page-item">
          3
        </Pagination.Item>
        <Pagination.Item className="page-item">
          4
        </Pagination.Item>
        <Pagination.Item className="page-item page-next">
          Next
        </Pagination.Item>
      </Pagination>
    </Fragment>
  );
};

export default Blog;