import { FC, Fragment } from 'react';
import { Card, Col, Dropdown, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { imagesData } from "../../common/commonimages";
import { Budget, Statistics2, Viewers1 } from "../../common/Chartfunction";
import Pageheader from "../../layout/layoutcomponent/pageheader";

interface ComponentProps { }

const Dashboard2: FC<ComponentProps> = () => {
  return (
    <Fragment>
      <Pageheader title="DASHBOARD" heading="Dashboard" active="Sales" />

      <Row>
        <Col xxl={9} xl={12} lg={12} md={12} sm={12}>
          <Col xl={12} lg={12} md={12} sm={12} className="px-0">
            <Card className=" px-3 ps-4">
              <Row className="index1">
                <Col xl={6} lg={6} md={6} sm={6} xxl={3}>
                  <Row className="border-end bd-sm-e-0 p-3">
                    <div className="col-2 d-flex align-items-center justify-content-center">
                      <div className="circle-icon bg-primary text-center align-self-center overflow-hidden shadow">
                        <i className="fe fe-shopping-bag fs-15 text-fixed-white"></i>
                      </div>
                    </div>
                    <div className="col-10 py-0">
                      <div className="pt-4 pb-3">
                        <div className="d-flex">
                          <span className="mb-2 fs-12 d-block">Today Orders</span>
                          <span className="badge bg-success-transparent text-success fw-semibold ms-auto rounded-pill lh-maincard px-2 my-auto"><i className="bx bx-caret-up me-1"></i>0.11%</span>
                        </div>
                        <div className="pb-0 mt-0">
                          <div className="d-flex">
                            <h4 className="fs-18 fw-semibold mb-0">5,472</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                </Col>
                <Col xl={6} lg={6} md={6} sm={6} xxl={3}>
                  <Row className="border-end bd-md-e-0 bd-xs-e-0 bd-lg-e-0 bd-xl-e-0 bd-xxl-e-0  p-3">
                    <div className="col-2 d-flex align-items-center justify-content-center">
                      <div className="circle-icon bg-warning text-center align-self-center overflow-hidden shadow">
                        <i className="fe fe-dollar-sign fs-15 text-fixed-white"></i>
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="pt-4 pb-3">
                        <div className="d-flex">
                          <span className="mb-2 fs-12 d-block">Today Earnings</span>
                          <span className="badge bg-danger-transparent text-danger fw-semibold ms-auto rounded-pill lh-maincard px-2 my-auto"><i className="bx bx-caret-up me-1"></i>0.23%</span>
                        </div>
                        <div className="pb-0 mt-0">
                          <div className="d-flex">
                            <h4 className="fs-18 fw-semibold mb-0">$47,589</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                </Col>
                <Col xl={6} lg={6} md={6} sm={6} xxl={3}>
                  <Row className="border-end bd-sm-e-0  p-3">
                    <div className="col-2 d-flex align-items-center justify-content-center">
                      <div className="circle-icon bg-secondary text-center align-self-center overflow-hidden shadow">
                        <i className="fe fe-external-link fs-15 text-fixed-white"></i>
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="pt-4 pb-3">
                        <div className="d-flex">
                          <span className="mb-2 fs-12 d-block">Total Profit Gain</span>
                          <span className="badge bg-success-transparent text-success fw-semibold ms-auto rounded-pill lh-maincard px-2 my-auto"><i className="bx bx-caret-up me-1"></i>1.57%</span>
                        </div>
                        <div className="pb-0 mt-0">
                          <div className="d-flex">
                            <h4 className="fs-18 fw-semibold mb-0">$8,943</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                </Col>
                <Col xl={6} lg={6} md={6} sm={6} xxl={3}>
                  <Row className=" p-3">
                    <div className="col-2 d-flex align-items-center justify-content-center">
                      <div className="circle-icon bg-info text-center align-self-center overflow-hidden shadow">
                        <i className="fe fe-credit-card fs-15 text-fixed-white"></i>
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="pt-4 pb-3">
                        <div className="d-flex	">
                          <span className="mb-2 fs-12 d-block">Total Earnings</span>
                          <span className="badge bg-success-transparent text-success fw-semibold ms-auto rounded-pill lh-maincard px-2 my-auto"><i className="bx bx-caret-up me-1"></i>0.45%</span>
                        </div>
                        <div className="pb-0 mt-0">
                          <div className="d-flex">
                            <h4 className="fs-18 fw-semibold mb-0">$57.12M</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} className="px-0">
            <Row>
              <Col sm={12} lg={12} xl={8}>
                <Card className="custom-card overflow-hidden">
                  <Card.Header className=" border-bottom-0 d-flex">
                    <h3 className="card-title mb-2 ">Sales Activity</h3>
                    <div className="card-options ms-auto">
                      <div className="btn-group p-0">
                        <button className="btn btn-outline-light btn-sm" type="button">Week</button>
                        <button className="btn btn-light btn-sm" type="button">Month</button>
                        <button className="btn btn-outline-light btn-sm" type="button">Year</button>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="row mb-2 ps-lg-5">
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                        <p className="mb-1">Total Sales</p>
                        <h5 className="mb-1">$52,618</h5>
                        <p className="fs-11 text-muted">This month<span className="text-success ms-2"><i className="bx bx-caret-up me-2"></i><span className="badge bg-success text-white fs-11">0.9%</span></span></p>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                        <p className=" mb-1">Total Sales</p>
                        <h5 className="mb-1">$11,197</h5>
                        <p className="fs-11 text-muted">This Week<span className="text-danger ms-2"><i className="bx bx-caret-down me-2"></i><span className="badge bg-danger text-white fs-11">0.15%</span></span></p>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                        <p className=" mb-1">Total Sales</p>
                        <h5 className="mb-1">$1,143</h5>
                        <p className="fs-11 text-muted">Today<span className="text-success ms-2"><i className="bx bx-caret-up me-2"></i><span className="badge bg-success text-white fs-11">0.11%</span></span></p>
                      </div>
                    </div>
                    <Statistics2 />
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12} lg={12} xl={4}>
                <Card>
                  <Card.Header className=" bg-transparent pb-0">
                    <div>
                      <h3 className="card-title mb-2">Timeline</h3>
                    </div>
                  </Card.Header>
                  <Card.Body className="mt-0">
                    <div className="latest-timelines mt-4">
                      <ul className="timelines mb-0">
                        <li>
                          <div className="featured_icon1 danger">
                          </div>
                        </li>
                        <li className="mt-0 activity">
                          <div><span className="fs-11 text-muted float-end">11.43 pm</span></div>
                          <Link to="#" className="fs-12 text-dark">
                            <p className="mb-1 fw-semibold text-dark fs-13">Anita Letterback</p>
                          </Link>
                          <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt . </p>
                        </li>
                        <li>
                          <div className="featured_icon1 success">
                          </div>
                        </li>
                        <li className="mt-0 activity">
                          <div><span className="fs-11 text-muted float-end">12.22 am</span></div>
                          <Link to="#" className="fs-12 text-dark">
                            <p className="mb-1 fw-semibold text-dark fs-13">Paddy O'Furniture</p>
                          </Link>
                          <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt . </p>
                        </li>
                        <li>
                          <div className="featured_icon1 primary">
                          </div>
                        </li>
                        <li className="mt-0 activity">
                          <div><span className="fs-11 text-muted float-end">08.11 pm</span></div>
                          <Link to="#" className="fs-12 text-dark">
                            <p className="mb-1 fw-semibold text-dark">Olive Yew</p>
                          </Link>
                          <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt . </p>
                        </li>
                        <li>
                          <div className="featured_icon1 warning">
                          </div>
                        </li>
                        <li className="mt-0 activity">
                          <div><span className="fs-11 text-muted float-end">9.45 pm</span></div>
                          <Link to="#" className="fs-12 text-dark">
                            <p className="mb-1 fw-semibold text-dark fs-13">Maureen Biologist</p>
                          </Link>
                          <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt. </p>
                        </li>
                        <li>
                          <div className="featured_icon1 teal">
                          </div>
                        </li>
                        <li className="mt-0 activity">
                          <div><span className="fs-11 text-muted float-end">12.09 am</span></div>
                          <Link to="#" className="fs-12 text-dark">
                            <p className="mb-1 fw-semibold text-dark fs-13">Peg Legge</p>
                          </Link>
                          <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt . </p>
                        </li>
                        <li>
                          <div className="featured_icon1 secondary">
                          </div>
                        </li>
                        <li className="mt-0 activity">
                          <div><span className="fs-11 text-muted float-end">05.28 pm</span></div>
                          <Link to="#" className="fs-12 text-dark">
                            <p className="mb-1 fw-semibold text-dark fs-13">Letterbac</p>
                          </Link>
                          <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt . </p>
                        </li>
                        <li>
                          <div className="featured_icon1 info">
                          </div>
                        </li>
                        <li className="mt-0 activity pb-4">
                          <div><span className="fs-11 text-muted float-end">9.10 pm</span></div>
                          <Link to="#" className="fs-12 text-dark">
                            <p className="mb-1 fw-semibold text-dark fs-13">Anita Letterback</p>
                          </Link>
                          <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt . </p>
                        </li>
                      </ul>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} className="px-0">
            <Row>
              <Col sm={12} lg={12} xl={4}>
                <Card>
                  <Card.Header className=" pb-3">
                    <h3 className="card-title mb-2">COUNTRY STATISTICS</h3>
                  </Card.Header>
                  <Card.Body className=" p-0 customers mt-1">
                    <div className="country-card pt-0">
                      <div className="mb-4">
                        <div className="d-flex">
                          <span className="fs-13 fw-semibold">
                            India
                          </span>
                          <div className="ms-auto">
                            <span className="text-danger mx-1">
                              <i className="fe fe-trending-down"></i>
                            </span>
                            <span className="number-font">$32,879</span> (65%)
                          </div>
                        </div>
                        <div className="progress progress-style ht-5 mt-2 mb-4">
                          <div
                            className="progress-bar bg-primary wd-60p"
                            role="progressbar"
                            aria-valuenow={60}
                            aria-valuemin={0}
                            aria-valuemax={60}
                          ></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="d-flex mb-1">
                          <span className="fs-13 fw-semibold">
                            Russia
                          </span>
                          <div className="ms-auto">
                            <span className="text-info mx-1">
                              <i className="fe fe-trending-up"></i>
                            </span>
                            <span className="number-font">$22,710</span> (55%)
                          </div>
                        </div>
                        <div className="progress progress-style ht-5 mt-2 mb-4">
                          <div
                            className="progress-bar bg-info wd-50p"
                            role="progressbar"
                            aria-valuenow={60}
                            aria-valuemin={0}
                            aria-valuemax={60}
                          ></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="d-flex">
                          <span className="fs-13 fw-semibold">
                            Canada
                          </span>
                          <div className="ms-auto">
                            <span className="text-danger mx-1">
                              <i className="fe fe-trending-down"></i>
                            </span>
                            <span className="number-font">$56,291</span> (69%)
                          </div>
                        </div>
                        <div className="progress progress-style ht-5 mt-2 mb-4">
                          <div
                            className="progress-bar bg-secondary wd-80p"
                            role="progressbar"
                            aria-valuenow={60}
                            aria-valuemin={0}
                            aria-valuemax={60}
                          ></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="d-flex">
                          <span className="fs-13 fw-semibold">
                            Brazil
                          </span>
                          <div className="ms-auto">
                            <span className="text-success mx-1">
                              <i className="fe fe-trending-up"></i>
                            </span>
                            <span className="number-font">$34,209</span> (60%)
                          </div>
                        </div>
                        <div className="progress progress-style ht-5 mt-2 mb-4">
                          <div
                            className="progress-bar bg-warning wd-60p"
                            role="progressbar"
                            aria-valuenow={60}
                            aria-valuemin={0}
                            aria-valuemax={60}
                          ></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="d-flex">
                          <span className="fs-13 fw-semibold">
                            United States
                          </span>
                          <div className="ms-auto">
                            <span className="text-success mx-1">
                              <i className="fe fe-trending-up"></i>
                            </span>
                            <span className="number-font">$45,870</span> (86%)
                          </div>
                        </div>
                        <div className="progress progress-style ht-5 mt-2 mb-4">
                          <div
                            className="progress-bar bg-teal wd-80p"
                            role="progressbar"
                            aria-valuenow={60}
                            aria-valuemin={0}
                            aria-valuemax={60}
                          ></div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex">
                          <span className="fs-13 fw-semibold">
                            Germany
                          </span>
                          <div className="ms-auto">
                            <span className="text-success mx-1">
                              <i className="fe fe-trending-up"></i>
                            </span>
                            <span className="number-font">$67,357</span> (73%)
                          </div>
                        </div>
                        <div className="progress progress-style ht-5 mt-2 mb-4">
                          <div
                            className="progress-bar bg-success wd-70p"
                            role="progressbar"
                            aria-valuenow={60}
                            aria-valuemin={0}
                            aria-valuemax={60}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={12} xl={4} md={12}>
                <Card>
                  <Card.Header className=" pb-0">
                    <h3 className="card-title mb-2">Weekly Visitors</h3>
                  </Card.Header>
                  <Card.Body className=" pb-0">
                    <Row className="mb-4">
                      <div className="col-6">
                        <div className="text-muted fs-12 text-center mb-2">
                          Average Male Visitors
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                          <span className="me-3 fs-26 fw-semibold">
                            2,132
                          </span>
                          <span className="text-success fw-semibold">
                            <i className="fa fa-caret-up me-2"></i>0.23%
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="text-muted fs-12 text-center mb-2">
                          Average Female Visitors
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                          <span className="me-3 fs-26 fw-semibold">
                            1,053
                          </span>
                          <span className="text-danger fw-semibold">
                            <i className="fa fa-caret-down me-2"></i>0.11%
                          </span>
                        </div>
                      </div>
                    </Row>
                   <Viewers1 />
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={12} xl={4} md={12}>
                <Card>
                  <Card.Header className=" pb-3">
                    <h3 className="card-title mb-2">MAIN TASKS</h3>
                  </Card.Header>
                  <Card.Body className=" p-0 customers mt-1">
                    <div className="">
                      <label className="p-2 d-flex">
                        <span className="form-check mb-0 ms-2"> <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked1"/> </span>
                        <span className="mx-3 my-auto">
                          accurate information at any given point.
                        </span>
                        <span className="ms-auto">
                          <span className="badge badge-primary fw-semibold px-2 py-1 fs-11 me-2">
                            Today
                          </span>
                        </span>
                      </label>
                      <label className="p-2 mt-2 d-flex">
                        <span className="form-check mb-0 ms-2"> <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked1"/> </span>
                        <span className="mx-3 my-auto">
                          sharing the information with clients or stakeholders.
                        </span>
                        <span className="ms-auto">
                          <span className="badge badge-primary fw-semibold px-2 py-1 fs-11 me-2">
                            Today
                          </span>
                        </span>
                      </label>
                      <label className="p-2 mt-2 d-flex">
                        <span className="form-check mb-0 ms-2"> <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked1"/> </span>
                        <span className="mx-3 my-auto">
                          Hearing the information and responding .
                        </span>
                        <span className="ms-auto">
                          <span className="badge badge-primary fw-semibold px-2 py-1 fs-11 me-2 float-end">
                            22 hrs
                          </span>
                        </span>
                      </label>
                      <label className="p-2 mt-2 d-flex">
                        <span className="form-check mb-0 ms-2"> <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked1"/> </span>
                        <span className="mx-3 my-auto">
                          Setting up and customizing your own sales.
                        </span>
                        <span className="ms-auto">
                          {" "}
                          <span className="badge bg-light-transparent fw-semibold px-2 py-1 fs-11 me-2">
                            1 Day
                          </span>
                        </span>
                      </label>
                      <label className="p-2 mt-2 d-flex">
                        <span className="form-check mb-0 ms-2"> <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked1" defaultChecked/> </span>
                        <span className="mx-3 my-auto">
                          To have a complete 360° overview of sales information,
                          having.
                        </span>
                        <span className="ms-auto">
                          {" "}
                          <span className="badge bg-light-transparent fw-semibold px-2 py-1 fs-11 me-2">
                            2 Days
                          </span>
                        </span>
                      </label>
                      <label className="p-2 mt-2 d-flex mb-1">
                        <span className="form-check mb-0 ms-2"> <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked1" defaultChecked/> </span>
                        <span className="mx-3 my-auto">New Admin Launched.</span>
                      </label>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Col>
        <Col xs={12} lg={12} md={12} xl={12} xxl={3}>
          <Card className="overflow-hidden">
            <Card.Header className=" pb-1">
              <h3 className="card-title mb-2">Recent Transactions</h3>
            </Card.Header>
            <Card.Body className="p-0 customers mt-1">
              <div className="list-group list-lg-group list-group-flush">
                <Link to="#" className="border-0">
                  <div className="list-group-item list-group-item-action border-0">
                    <div className="media mt-0 flex-wrap">
                      <span className="me-3 bg-primary-transparent text-primary transaction-icon"><i className="fe fe-chevrons-right"></i></span>
                      <div className="media-body flex-fill">
                        <div className="d-flex align-items-center">
                          <div className="mt-0">
                            <h5 className="mb-1 fs-13 font-weight-sembold text-dark"><span className="me-3">montha.K</span>

                            </h5>
                            <p className="mb-0 fs-12 text-muted">24-08-2021</p>
                          </div>
                          <span className="ms-auto wd-25p fs-12">
                            <span className="text-primary fs-11 text-end d-block">Processing</span>
                            <span className="float-end text-success fw-semibold">
                              $256,347
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="#" className="border-0">
                  <div className="list-group-item list-group-item-action border-0">
                    <div className="media mt-0 flex-wrap">
                      <span className="me-3 bg-secondary-transparent text-secondary transaction-icon"><i className="fe fe-bookmark"></i></span>
                      <div className="media-body flex-fill">
                        <div className="d-flex align-items-center">
                          <div className="mt-1">
                            <h5 className="mb-1 fs-13 font-weight-sembold text-dark">Allies Grater</h5>
                            <p className="mb-0 fs-12 text-muted">31-12-2021</p>
                          </div>
                          <span className="ms-auto wd-45p fs-12">
                            <span className="float-end text-danger fw-semibold">
                              $12,345
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="#" className="border-0">
                  <div className="list-group-item list-group-item-action border-0" >
                    <div className="media mt-0 flex-wrap">
                      <span className="me-3 bg-info-transparent text-info transaction-icon"><i className="fe fe-more-horizontal"></i></span>
                      <div className="media-body flex-fill">
                        <div className="d-flex align-items-center">
                          <div className="mt-1">
                            <h5 className="mb-1 fs-13 font-weight-sembold text-dark"><span className="me-3">Gabel</span></h5>
                            <p className="mb-0 fs-12 text-muted">15-09-2021</p>
                          </div>
                          <span className="ms-auto wd-45p  fs-12">
                            <span className="text-primary fs-11 text-end d-block">Processing</span>
                            <span className="float-end text-success fw-semibold">
                              $34,567
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="#" className="border-0">
                  <div className="list-group-item list-group-item-action border-0" >
                    <div className="media mt-0 flex-wrap">
                      <span className="me-3 bg-success-transparent text-success transaction-icon"><i className="fe fe-chevrons-right"></i></span>
                      <div className="media-body flex-fill">
                        <div className="d-flex align-items-center">
                          <div className="mt-1">
                            <h5 className="mb-1 fs-13 font-weight-sembold text-dark"><span className="me-3">Emmanuel</span></h5>
                            <p className="mb-0 fs-12 text-muted">30-11-2021</p>
                          </div>
                          <span className="ms-auto wd-45p fs-12">
                            <span className="text-primary fs-11 text-end d-block">Processing</span>
                            <span className="float-end text-danger fw-semibold">
                              $16,746
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="#" className="border-0">
                  <div className="list-group-item list-group-item-action border-0" >
                    <div className="media mt-0 flex-wrap">
                      <span className="me-3 bg-warning-transparent text-warning transaction-icon"><i className="fe fe-file-text"></i></span>
                      <div className="media-body flex-fill">
                        <div className="d-flex align-items-center">
                          <div className="mt-1">
                            <h5 className="mb-1 fs-13 font-weight-sembold text-dark">Manuel Labor</h5>
                            <p className="mb-0 fs-12 text-muted">20-10-2021</p>
                          </div>
                          <span className="ms-auto wd-45p fs-12">
                            <span className="float-end text-success fw-semibold">
                              $45,900
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </Card.Body>
          </Card>
          <Card className="custom-card overflow-hidden">
            <Card.Header className="border-bottom-0">
              <div>
                <h3 className="card-title mb-0">Weekly Budget</h3>{" "}
                <span className="d-block fs-12 mb-0 text-muted"></span>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <Budget />
            </Card.Body>
          </Card>
          <Card className="overflow-hidden">
            <Card.Header className=" pb-1">
              <h3 className="card-title mb-2">Recent Customers</h3>
            </Card.Header>
            <Card.Body className=" p-0 customers mt-1">
              <ListGroup className="list-lg-group list-group-flush">
                <Link to="#" className="border-0">
                  <ListGroupItem className=" list-group-item-action border-0">
                    <div className="media mt-0">
                      <img
                        className="avatar-lg rounded-circle me-3 my-auto shadow"
                        src={imagesData('face2')}
                        alt=""
                      />
                      <div className="media-body">
                        <div className="d-flex align-items-center">
                          <div className="mt-0">
                            <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                              Samantha Melon
                            </h5>
                            <p className="mb-0 fs-12 text-muted">
                              User ID: #1234
                            </p>
                          </div>
                          <span className="ms-auto wd-45p fs-14">
                            <span className="float-end badge bg-success">
                              <span className="fw-semibold">paid </span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </ListGroupItem>
                </Link>
                <Link to="#" className="border-0">
                  <ListGroupItem className=" list-group-item-action border-0">
                    <div className="media mt-0">
                      <img
                        className="avatar-lg rounded-circle me-3 my-auto shadow"
                        src={imagesData('face1')}
                        alt=""
                      />
                      <div className="media-body">
                        <div className="d-flex align-items-center">
                          <div className="mt-1">
                            <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                              Allie Grater
                            </h5>
                            <p className="mb-0 fs-12 text-muted">
                              User ID: #1234
                            </p>
                          </div>
                          <span className="ms-auto wd-45p fs-14">
                            <span className="float-end badge bg-danger">
                              <span className="fw-semibold">
                                Pending
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </ListGroupItem>
                </Link>
                <Link to="#" className="border-0">
                  <ListGroupItem className=" list-group-item-action border-0">
                    <div className="media mt-0">
                      <img
                        className="avatar-lg rounded-circle me-3 my-auto shadow"
                        src={imagesData('face5')}
                        alt=""
                      />
                      <div className="media-body">
                        <div className="d-flex align-items-center">
                          <div className="mt-1">
                            <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                              Gabe Lackmen
                            </h5>
                            <p className="mb-0 fs-12 text-muted">
                              User ID: #1234
                            </p>
                          </div>
                          <span className="ms-auto wd-45p  fs-14">
                            <span className="float-end badge bg-danger">
                              <span className="fw-semibold">
                                Pending
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </ListGroupItem>
                </Link>
                <Link to="#" className="border-0 mb-3">
                  <ListGroupItem className=" list-group-item-action border-0">
                    <div className="media mt-0">
                      <img
                        className="avatar-lg rounded-circle me-3 my-auto shadow"
                        src={imagesData('face7')}
                        alt=""
                      />
                      <div className="media-body">
                        <div className="d-flex align-items-center">
                          <div className="mt-1">
                            <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                              Manuel Labor
                            </h5>
                            <p className="mb-0 fs-12 text-muted">
                              User ID: #1234
                            </p>
                          </div>
                          <span className="ms-auto wd-45p fs-14">
                            <span className="float-end badge bg-success">
                              <span className="fw-semibold">Paid</span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </ListGroupItem>
                </Link>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col sm={12} className="col-12">
          <Card>
            <Card.Header>
              <h4 className="card-title">Product Summary</h4>
            </Card.Header>
            <Card.Body className="pt-0">
              <div className="d-flex justify-content-between flex-wrap gap-2 mb-3">
                <div>
                  <input className="form-control form-control-sm" type="text" placeholder="Search Here" aria-label=".form-control-sm example" />
                </div>
                <Dropdown>
                  <Dropdown.Toggle as='a' variant="" className="no-caret btn btn-primary btn-sm btn-wave waves-effect waves-light" id="dropdown-basic">
                    Sort By<i className="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">New</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Popular</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Relevant</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="table-responsive">
                <table className="table  table-bordered text-nowrap mb-0" id="example2">
                  <thead>
                    <tr>
                      <th className="text-center">Purchase Date</th>
                      <th>Client Name</th>
                      <th>Product ID</th>
                      <th>Product</th>
                      <th>Product Cost</th>
                      <th>Payment Mode</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">#01</td>
                      <td>Sean Black</td>
                      <td>PRO12345</td>
                      <td>Mi LED Smart TV 4A 80</td>
                      <td>$14,500</td>
                      <td>Online Payment</td>
                      <td><span className="badge bg-success-transparent">Delivered</span></td>
                      <td className="">
                        <Link className="btn btn-success btn-sm br-5 me-2" to="#">
                          <i>
                            <svg className="table-edit" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z"></path></svg>
                          </i>
                        </Link>
                        <Link className="btn btn-danger btn-sm br-5" to="#">
                          <i>
                            <svg className="table-delete" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"></path></svg>
                          </i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">#02</td>
                      <td>Evan Rees</td>
                      <td>PRO8765</td>
                      <td>Thomson R9 122cm (48 inch) Full HD LED TV </td>
                      <td>$30,000</td>
                      <td>Cash on delivered</td>
                      <td><span className="badge bg-primary-transparent">Add Cart</span></td>
                      <td className="">
                        <Link className="btn btn-success btn-sm br-5 me-2" to="#">
                          <i>
                            <svg className="table-edit" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z"></path></svg>
                          </i>
                        </Link>
                        <Link className="btn btn-danger btn-sm br-5" to="#">
                          <i>
                            <svg className="table-delete" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"></path></svg>
                          </i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">#03</td>
                      <td>David Wallace</td>
                      <td>PRO54321</td>
                      <td>Vu 80cm (32 inch) HD Ready LED TV</td>
                      <td>$13,200</td>
                      <td>Online Payment</td>
                      <td><span className="badge bg-danger-transparent">Pending</span></td>
                      <td className="">
                        <Link className="btn btn-success btn-sm br-5 me-2" to="#">
                          <i>
                            <svg className="table-edit" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z"></path></svg>
                          </i>
                        </Link>
                        <Link className="btn btn-danger btn-sm br-5" to="#">
                          <i>
                            <svg className="table-delete" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"></path></svg>
                          </i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">#04</td>
                      <td>Julia Bower</td>
                      <td>PRO97654</td>
                      <td>Micromax 81cm (32 inch) HD Ready LED TV</td>
                      <td>$15,100</td>
                      <td>Cash on delivered</td>
                      <td><span className="badge bg-warning-transparent">Delivering</span></td>
                      <td className="">
                        <Link className="btn btn-success btn-sm br-5 me-2" to="#">
                          <i>
                            <svg className="table-edit" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z"></path></svg>
                          </i>
                        </Link>
                        <Link className="btn btn-danger btn-sm br-5" to="#">
                          <i>
                            <svg className="table-delete" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"></path></svg>
                          </i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">#05</td>
                      <td>Kevin James</td>
                      <td>PRO4532</td>
                      <td>HP 200 Mouse &amp; Wireless Laptop Keyboard </td>
                      <td>$5,987</td>
                      <td>Online Payment</td>
                      <td><span className="badge bg-danger-transparent">Shipped</span></td>
                      <td className="">
                        <Link className="btn btn-success btn-sm br-5 me-2" to="#">
                          <i>
                            <svg className="table-edit" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z"></path></svg>
                          </i>
                        </Link>
                        <Link className="btn btn-danger btn-sm br-5" to="#">
                          <i>
                            <svg className="table-delete" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"></path></svg>
                          </i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">#06</td>
                      <td>Theresa	Wright</td>
                      <td>PRO6789</td>
                      <td>Digisol DG-HR3400 Router </td>
                      <td>$11,987</td>
                      <td>Cash on delivered</td>
                      <td><span className="badge bg-primary-transparent">Delivering</span></td>
                      <td className="">
                        <Link className="btn btn-success btn-sm br-5 me-2" to="#">
                          <i>
                            <svg className="table-edit" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z"></path></svg>
                          </i>
                        </Link>
                        <Link className="btn btn-danger btn-sm br-5" to="#">
                          <i>
                            <svg className="table-delete" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"></path></svg>
                          </i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">#07</td>
                      <td>Sebastian	Black</td>
                      <td>PRO4567</td>
                      <td>Dell WM118 Wireless Optical Mouse</td>
                      <td>$4,700</td>
                      <td>Online Payment</td>
                      <td><span className="badge bg-info-transparent">Add to Cart</span></td>
                      <td className="">
                        <Link className="btn btn-success btn-sm br-5 me-2" to="#">
                          <i>
                            <svg className="table-edit" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z"></path></svg>
                          </i>
                        </Link>
                        <Link className="btn btn-danger btn-sm br-5" to="#">
                          <i>
                            <svg className="table-delete" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"></path></svg>
                          </i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">#08</td>
                      <td>Kevin Glover</td>
                      <td>PRO32156</td>
                      <td>Dell 16 inch Laptop Backpack </td>
                      <td>$678</td>
                      <td>Cash On delivered</td>
                      <td><span className="badge bg-pink-transparent">Delivered</span></td>
                      <td className="">
                        <Link className="btn btn-success btn-sm br-5 me-2" to="#">
                          <i>
                            <svg className="table-edit" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z"></path></svg>
                          </i>
                        </Link>
                        <Link className="btn btn-danger btn-sm br-5" to="#">
                          <i>
                            <svg className="table-delete" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"></path></svg>
                          </i>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Dashboard2;