import { FC, Fragment } from 'react';
import { Col, Row, Card, Button, ProgressBar, Dropdown } from "react-bootstrap";
import { imagesData } from "../../common/commonimages";
import { Radialbar, Statistics1, Viewers } from "../../common/chartdata";
import Pageheader from "../../layout/layoutcomponent/pageheader";
import { Link } from 'react-router-dom';

interface ComponentProps { }

const Dashboard: FC<ComponentProps> = () => {
  return (
    <Fragment>
      <Pageheader title="DASHBOARD" heading="Dashboard" active="Sales" />
      <Row>
        <Col xxl={5} xl={12} lg={12} md={12} sm={12}>
          <Row>
            <Col xl={12} lg={12} md={12} xs={12}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col xl={9} lg={7} md={6} sm={12}>
                      <div className="text-justified align-items-center">
                        <h3 className="text-dark fw-semibold mb-2 mt-0">
                          Hi, Welcome Back{" "}
                          <span className="text-primary">Nick!</span>
                        </h3>
                        <p className="text-dark fs-14 mb-3 lh-3">
                          You have used the 85% of free plan storage. Please
                          upgrade your plan to get unlimited storage.
                        </p>
                        <Button variant="" className="btn btn-primary shadow">
                          Upgrade Now
                        </Button>
                      </div>
                    </Col>
                    <Col
                      xl={3}
                      lg={5}
                      md={6}
                      sm={12}
                      className="d-flex align-items-center justify-content-center upgrade-chart-circle p-0"
                    >
                      <div className="chart-circle float-md-end mt-4 mt-md-0">
                        
                        <Radialbar/>
                        <div className="chart-circle-value circle-style">
                          <div className="fs-18 fw-semibold">85%</div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={6} lg={12} md={12} xs={12}>
              <Card className=" sales-card">
                <Row>
                  <div className="col-8">
                    <div className="ps-4 pt-4 pe-3 pb-4">
                      <div className="">
                        <h6 className="mb-2 fs-12 ">Today Orders</h6>
                      </div>
                      <div className="pb-0 mt-0">
                        <div className="d-flex">
                          <h4 className="fs-20 fw-semibold mb-2">
                            5,472
                          </h4>
                        </div>
                        <p className="mb-0 fs-12 text-muted">
                          Last week
                          <i className="fa fa-caret-up mx-2 text-success"></i>
                          <span className="text-success fw-semibold">
                            +427
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="circle-icon bg-primary-transparent text-center align-self-center overflow-hidden">
                      <i className="fe fe-shopping-bag fs-16 text-primary"></i>
                    </div>
                  </div>
                </Row>
              </Card>
            </Col>
            <Col xl={6} lg={12} md={12} xs={12}>
              <Card className="sales-card">
                <Row>
                  <div className="col-8">
                    <div className="ps-4 pt-4 pe-3 pb-4">
                      <div className="">
                        <h6 className="mb-2 fs-12">Today Earnings</h6>
                      </div>
                      <div className="pb-0 mt-0">
                        <div className="d-flex">
                          <h4 className="fs-20 fw-semibold mb-2">
                            $47,589
                          </h4>
                        </div>
                        <p className="mb-0 fs-12 text-muted">
                          Last week
                          <i className="fa fa-caret-down mx-2 text-danger"></i>
                          <span className="fw-semibold text-danger">
                            -453
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="circle-icon bg-info-transparent text-center align-self-center overflow-hidden">
                      <i className="fe fe-dollar-sign fs-16 text-info"></i>
                    </div>
                  </div>
                </Row>
              </Card>
            </Col>
            <Col xl={6} lg={12} md={12} xs={12}>
              <Card className=" sales-card">
                <Row>
                  <div className="col-8">
                    <div className="ps-4 pt-4 pe-3 pb-4">
                      <div className="">
                        <h6 className="mb-2 fs-12">Profit Gain</h6>
                      </div>
                      <div className="pb-0 mt-0">
                        <div className="d-flex">
                          <h4 className="fs-20 fw-semibold mb-2">
                            $8,943
                          </h4>
                        </div>
                        <p className="mb-0 fs-12 text-muted">
                          Last week
                          <i className="fa fa-caret-up mx-2 text-success"></i>
                          <span className=" text-success fw-semibold">
                            +788
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="circle-icon bg-secondary-transparent text-center align-self-center overflow-hidden">
                      <i className="fe fe-external-link fs-16 text-secondary"></i>
                    </div>
                  </div>
                </Row>
              </Card>
            </Col>
            <Col xl={6} lg={12} md={12} xs={12}>
              <Card className="sales-card">
                <Row>
                  <div className="col-8">
                    <div className="ps-4 pt-4 pe-3 pb-4">
                      <div className="">
                        <h6 className="mb-2 fs-12">Total Earnings</h6>
                      </div>
                      <div className="pb-0 mt-0">
                        <div className="d-flex">
                          <h4 className="fs-22 fw-semibold mb-2">
                            $57.12M
                          </h4>
                        </div>
                        <p className="mb-0 fs-12  text-muted">
                          Last week
                          <i className="fa fa-caret-down mx-2 text-danger"></i>
                          <span className="text-danger fw-semibold">
                            -693
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="circle-icon bg-warning-transparent text-center align-self-center overflow-hidden">
                      <i className="fe fe-credit-card fs-16 text-warning"></i>
                    </div>
                  </div>
                </Row>
              </Card>
            </Col>
            <Col xl={12} lg={12} md={12} xs={12}>
              <Card>
                <Card.Header className="pb-1">
                  <h3 className="card-title mb-2">Browser Usage</h3>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="browser-stats">
                    <div className="d-flex align-items-center item  border-bottom my-2">
                      <div className="d-flex">
                        <img src={imagesData('svg7')} alt="img" className="ht-30 wd-30 me-2" />
                        <div className="truncate">
                          <h6 className="">Chrome</h6>
                          <span className="text-muted fs-12">Google, Inc.</span>
                        </div>
                      </div>
                      <div className="ms-auto my-auto">
                        <div className="d-flex">
                          <span className="me-4 mt-1 fw-semibold fs-16">35,502</span>
                          <span className="text-success fs-13 my-auto"><i className="fe fe-trending-up text-success mx-2 my-auto"></i>12.75%</span>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center item  border-bottom my-2">
                      <div className="d-flex">
                        <img src={imagesData('svg8')} alt="img" className="ht-30 wd-30 me-2" />
                        <div className="truncate">
                          <h6 className="">Edge</h6>
                          <span className="text-muted fs-12">Microsoft Corporation, Inc.</span>
                        </div>
                      </div>
                      <div className="ms-auto my-auto">
                        <div className="d-flex">
                          <span className="me-4 mt-1 fw-semibold fs-16">25,364</span>
                          <span className="text-success"><i className="fe fe-trending-down text-danger mx-2 my-auto"></i>24.37%</span>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center item  border-bottom my-2">
                      <div className="d-flex">
                        <img src={imagesData('svg10')} alt="img" className="ht-30 wd-30 me-2" />
                        <div className="truncate">
                          <h6 className="">Firefox</h6>
                          <span className="text-muted fs-12">Mozilla Foundation, Inc.</span>
                        </div>
                      </div>
                      <div className="ms-auto my-auto">
                        <div className="d-flex">
                          <span className="me-4 mt-1 fw-semibold fs-16">14,635</span>
                          <span className="text-success"><i className="fe fe-trending-up text-success mx-2 my-auto"></i>15,63%</span>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center item  border-bottom my-2">
                      <div className="d-flex">
                        <img src={imagesData('svg28')} alt="img" className="ht-30 wd-30 me-2" />
                        <div className="truncate">
                          <h6 className="">Safari</h6>
                          <span className="text-muted fs-12">Apple Corporation, Inc.</span>
                        </div>
                      </div>
                      <div className="ms-auto my-auto">
                        <div className="d-flex">
                          <span className="me-4 mt-1 fw-semibold fs-16">35,657</span>
                          <span className="text-danger"><i className="fe fe-trending-up text-success mx-2 my-auto"></i>12.54%</span>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center item my-2 pb-3">
                      <div className="d-flex">
                        <img src={imagesData('svg20')} alt="img" className="ht-30 wd-30 me-2" />
                        <div className="truncate">
                          <h6 className="">Opera</h6>
                          <span className="text-muted fs-12">Opera, Inc.</span>
                        </div>
                      </div>
                      <div className="ms-auto my-auto">
                        <div className="d-flex">
                          <span className="me-4 mt-1 fw-semibold fs-16">12,563</span>
                          <span className="text-danger"><i className="fe fe-trending-down text-danger mx-2 my-auto"></i>15.12%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xxl={7} xl={12} lg={12} md={12} sm={12}>
          <Card className=" custom-card overflow-hidden">
            <Card.Header className=" border-bottom-0">
              <div>
                <h3 className="card-title mb-2 ">Project Budget</h3>
                <span className="d-block fs-12 mb-0 text-muted"></span>
              </div>
            </Card.Header>
            <Card.Body>

              <Statistics1 />

            </Card.Body>
          </Card>
          <Row>
            <Col sm={12} lg={12} xl={6}>
              <Card className="card overflow-hidden">
                <Card.Header className=" pb-1">
                  <h3 className="card-title mb-2">Recent Customers</h3>
                </Card.Header>
                <Card.Body className="p-0 customers mt-1">
                  <div className="list-group list-lg-group list-group-flush">
                    <Link to="#" className="border-0">
                      <div className="list-group-item list-group-item-action p-3 border-0">
                        <div className="media mt-0">
                          <img className="avatar-lg rounded-circle me-3 my-auto shadow" src={imagesData('face2')} alt="Image description" />
                          <div className="media-body flex-fill">
                            <div className="d-flex align-items-center">
                              <div className="mt-0">
                                <h5 className="mb-1 fs-13 font-weight-sembold text-dark">Samantha Melon</h5>
                                <p className="mb-0 fs-12 text-muted">User ID: #1234</p>
                              </div>
                              <span className="ms-auto wd-45p fs-14">
                                <span className="float-end badge bg-success-transparent">
                                  <span className="op-7 text-success fw-semibold">paid </span>
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Link to="#" className="border-0">
                      <div className="list-group-item list-group-item-action p-3 border-0" >
                        <div className="media mt-0">
                          <img className="avatar-lg rounded-circle me-3 my-auto shadow" src={imagesData('face1')} alt="Image description" />
                          <div className="media-body flex-fill">
                            <div className="d-flex align-items-center">
                              <div className="mt-1">
                                <h5 className="mb-1 fs-13 font-weight-sembold text-dark">Allie Grater</h5>
                                <p className="mb-0 fs-12 text-muted">User ID: #1234</p>
                              </div>
                              <span className="ms-auto wd-45p fs-14">
                                <span className="float-end badge bg-danger-transparent ">
                                  <span className="op-7 text-danger fw-semibold">Pending</span>
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Link to="#" className="border-0">
                      <div className="list-group-item list-group-item-action p-3 border-0" >
                        <div className="media mt-0">
                          <img className="avatar-lg rounded-circle me-3 my-auto shadow" src={imagesData('face5')} alt="Image description" />
                          <div className="media-body flex-fill">
                            <div className="d-flex align-items-center">
                              <div className="mt-1">
                                <h5 className="mb-1 fs-13 font-weight-sembold text-dark">Gabe Lackmen</h5>
                                <p className="mb-0 fs-12 text-muted">User ID: #1234</p>
                              </div>
                              <span className="ms-auto wd-45p  fs-14">
                                <span className="float-end badge bg-danger-transparent ">
                                  <span className="op-7 text-danger fw-semibold">Pending</span>
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Link to="#" className="border-0">
                      <div className="list-group-item list-group-item-action p-3 border-0" >
                        <div className="media mt-0">
                          <img className="avatar-lg rounded-circle me-3 my-auto shadow" src={imagesData('face7')} alt="Image description" />
                          <div className="media-body flex-fill">
                            <div className="d-flex align-items-center">
                              <div className="mt-1">
                                <h5 className="mb-1 fs-13 font-weight-sembold text-dark">Manuel Labor</h5>
                                <p className="mb-0 fs-12 text-muted">User ID: #1234</p>
                              </div>
                              <span className="ms-auto wd-45p fs-14">
                                <span className="float-end badge bg-success-transparent ">
                                  <span className="op-7 text-success fw-semibold">Paid</span>
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Link to="#" className="border-0">
                      <div className="list-group-item list-group-item-action p-3 border-0" >
                        <div className="media mt-0">
                          <img className="avatar-lg rounded-circle me-3 my-auto shadow" src={imagesData('face9')} alt="Image description" />
                          <div className="media-body flex-fill">
                            <div className="d-flex align-items-center">
                              <div className="mt-1">
                                <h5 className="mb-1 fs-13 font-weight-sembold text-dark">Hercules Bing</h5>
                                <p className="mb-0 fs-12 text-muted">User ID: #1754</p>
                              </div>
                              <span className="ms-auto wd-45p fs-14">
                                <span className="float-end badge bg-success-transparent ">
                                  <span className="op-7 text-success fw-semibold">Paid</span>
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Link to="#" className="border-0">
                      <div className="list-group-item list-group-item-action p-3 border-0" >
                        <div className="media mt-0">
                          <img className="avatar-lg rounded-circle me-3 my-auto shadow" src={imagesData('face11')} alt="Image description" />
                          <div className="media-body flex-fill">
                            <div className="d-flex align-items-center">
                              <div className="mt-1">
                                <h5 className="mb-1 fs-13 font-weight-sembold text-dark">Manuel Labor</h5>
                                <p className="mb-0 fs-12 text-muted">User ID: #1234</p>
                              </div>
                              <span className="ms-auto wd-45p fs-14">
                                <span className="float-end badge bg-danger-transparent ">
                                  <span className="op-7 text-danger fw-semibold">Pending</span>
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
            </Col>
            <Col lg={12} xl={6}>
              <Card>
                <Card.Header className="pb-3">
                  <h3 className="card-title mb-2">MAIN TASKS</h3>
                </Card.Header>
                <div className="card-body p-0 customers mt-1">
                  <div className="">
                    <label className="p-2 d-flex">
                      <span className="form-check mb-0 ms-2">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked1" />
                      </span>
                      <span className="mx-3 my-auto">
                        accurate information at any given point.
                      </span>
                      <span className="ms-auto"><span className="badge bg-primary-transparent fw-semibold px-2 py-1 fs-11 me-2">Today</span></span>
                    </label>
                    <label className="p-2 mt-1 d-flex">
                      <span className="form-check mb-0 ms-2">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked01" />
                      </span>
                      <span className="mx-3 my-auto">
                        sharing the information with clients or stakeholders.
                      </span>
                      <span className="ms-auto"><span className="badge bg-primary-transparent fw-semibold px-2 py-1 fs-11 me-2">Today</span></span>
                    </label>
                    <label className="p-2 mt-1 d-flex">
                      <span className="form-check mb-0 ms-2">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked2" />
                      </span>
                      <span className="mx-3 my-auto">
                        Hearing the information and responding .
                      </span>
                      <span className="ms-auto"><span className="badge bg-primary-transparent fw-semibold px-2 py-1 fs-11 me-2 float-end">22 hrs</span></span>
                    </label>
                    <label className="p-2 mt-1 d-flex">
                      <span className="form-check mb-0 ms-2">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked3" />
                      </span>
                      <span className="mx-3 my-auto">
                        Setting up and customizing your own sales.
                      </span>
                      <span className="ms-auto"> <span className="badge bg-light-transparent fw-semibold px-2 py-1 fs-11 me-2">1 Day</span></span>
                    </label>
                    <label className="p-2 mt-1 d-flex">
                      <span className="form-check mb-0 ms-2">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked05" defaultChecked />
                      </span>
                      <span className="mx-3 my-auto">
                        To have a complete 360° overview of sales information, having.
                      </span>
                      <span className="ms-auto"> <span className="badge bg-light-transparent fw-semibold px-2 py-1 fs-11 me-2">2 Days</span></span>
                    </label>
                    <label className="p-2 mt-1 d-flex">
                      <span className="form-check mb-0 ms-2">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked07" />
                      </span>
                      <span className="mx-3 my-auto">
                        sharing the information with clients or stakeholders.
                      </span>
                      <span className="ms-auto"><span className="badge bg-primary-transparent fw-semibold px-2 py-1 fs-11 me-2">Today</span></span>
                    </label>
                    <label className="p-2 mt-1 d-flex">
                      <span className="form-check mb-0 ms-2">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked06" defaultChecked />
                      </span>
                      <span className="mx-3 my-auto">
                        New Admin Launched.
                      </span>
                    </label>
                    <label className="p-2 mt-1 d-flex">
                      <span className="form-check mb-0 ms-2">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked08" defaultChecked />
                      </span>
                      <span className="mx-3 my-auto">
                        To maximize profits and improve productivity.
                      </span>
                    </label>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>

      </Row>

      <Row className=" row-sm">
        <Col sm={12} lg={12} xl={6} xxl={3}>
          <Card>
            <Card.Header className=" pb-3">
              <h3 className="card-title mb-2">SALES ACTIVITY</h3>
            </Card.Header>
            <Card.Body className="p-0 customers mt-1">
              <div className="country-card pt-0">
                <div className="mb-4">
                  <div className="d-flex">
                    <span className="fs-13 fw-semibold">India</span>
                    <div className="ms-auto">
                      <span className="text-danger mx-1">
                        <i className="fe fe-trending-down"></i>
                      </span>
                      <span className="number-font">$32,879</span> (65%)
                    </div>
                  </div>
                  <ProgressBar className="ht-8 br-5 mt-2" now={65} animated variant="primary" />
                </div>
                <div className="mb-4">
                  <div className="d-flex mb-1">
                    <span className="fs-13 fw-semibold">Russia</span>
                    <div className="ms-auto">
                      <span className="text-info mx-1">
                        <i className="fe fe-trending-up"></i>
                      </span>
                      <span className="number-font">$22,710</span> (55%)
                    </div>
                  </div>
                  <ProgressBar className="ht-8 br-5 mt-2" now={55} animated variant="info" />
                </div>
                <div className="mb-4">
                  <div className="d-flex">
                    <span className="fs-13 fw-semibold">Canada</span>
                    <div className="ms-auto">
                      <span className="text-danger mx-1">
                        <i className="fe fe-trending-down"></i>
                      </span>
                      <span className="number-font">$56,291</span> (69%)
                    </div>
                  </div>
                  <ProgressBar className="ht-8 br-5 mt-2" now={69} animated variant="secondary" />
                </div>
                <div className="mb-4">
                  <div className="d-flex">
                    <span className="fs-13 fw-semibold">Brazil</span>
                    <div className="ms-auto">
                      <span className="text-success mx-1">
                        <i className="fe fe-trending-up"></i>
                      </span>
                      <span className="number-font">$34,209</span> (60%)
                    </div>
                  </div>
                  <ProgressBar className="ht-8 br-5 mt-2" now={60} animated variant="warning" />
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
                  <ProgressBar className="ht-8 br-5 mt-2" now={80} animated variant="danger" />
                </div>
                <div className="mb-4">
                  <div className="d-flex">
                    <span className="fs-13 fw-semibold">Germany</span>
                    <div className="ms-auto">
                      <span className="text-success mx-1">
                        <i className="fe fe-trending-up"></i>
                      </span>
                      <span className="number-font">$67,357</span> (73%)
                    </div>
                  </div>
                  <ProgressBar className="ht-8 br-5 mt-2" animated variant="success" now={73} />
                </div>
                <div className="mb-0">
                  <div className="d-flex">
                    <span className="fs-13 fw-semibold">U.A.E</span>
                    <div className="ms-auto">
                      <span className="text-danger mx-1">
                        <i className="fe fe-trending-down"></i>
                      </span>
                      <span className="number-font">$56,291</span> (69%)
                    </div>
                  </div>
                  <ProgressBar className="ht-8 br-5 mt-2" animated variant="purpple" now={69} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} xxl={3} md={12} lg={12}>
          <Card className="overflow-hidden">
            <Card.Header className="pb-1">
              <div className="card-title mb-2">Warehouse Operating Costs</div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="list-group projects-list border-0">
                <div className="list-group-item list-group-item-action flex-column align-items-start border-0">
                  <div className="d-flex w-100 justify-content-between">
                    <p className="fs-13 mb-2 fw-semibold text-dark">Order Picking</p>
                    <h4 className="text-dark mb-0 fw-semibold text-dark fs-18">3,876</h4>
                  </div>
                  <div className="d-flex w-100 justify-content-between">
                    <span className="text-muted fs-12"><i className="bx bx-caret-up text-success me-1"></i> <span className="text-success">03%</span> last month</span>
                    <span className="text-muted  fs-11">5 days ago</span>
                  </div>
                </div>
                <div className="list-group-item list-group-item-action flex-column align-items-start border-top">
                  <div className="d-flex w-100 justify-content-between">
                    <p className="fs-13 mb-2 fw-semibold text-dark">Storage</p>
                    <h4 className="text-dark mb-0 fw-semibold text-dark fs-18">2,178</h4>
                  </div>
                  <div className="d-flex w-100 justify-content-between">
                    <span className="text-muted  fs-12"><i className="bx bx-caret-down text-danger me-1"></i><span className="text-danger"> 16%</span> last month</span>
                    <span className="text-muted  fs-11">2 days ago</span>
                  </div>
                </div>
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <p className="fs-13 mb-2 fw-semibold text-dark">Shipping</p>
                    <h4 className="text-dark mb-0 fw-semibold text-dark fs-18">1,367</h4>
                  </div>
                  <div className="d-flex w-100 justify-content-between">
                    <span className="text-muted  fs-12"><i className="bx bx-caret-up text-success me-1"></i><span className="text-success"> 06%</span> last month</span>
                    <span className="text-muted  fs-11">1 days ago</span>
                  </div>
                </div>
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <p className="fs-13 mb-2 fw-semibold text-dark">Receiving</p>
                    <h4 className="text-dark mb-0 fw-semibold text-dark fs-18">678</h4>
                  </div>
                  <div className="d-flex w-100 justify-content-between">
                    <span className="text-muted  fs-12"><i className="bx bx-caret-down text-danger me-1"></i><span className="text-danger"> 25%</span> last month</span>
                    <span className="text-muted  fs-11">10 days ago</span>
                  </div>
                </div>
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <p className="fs-13 mb-2 fw-semibold text-dark">Review</p>
                    <h4 className="text-dark mb-0 fw-semibold text-dark fs-18">578</h4>
                  </div>
                  <div className="d-flex w-100 justify-content-between">
                    <span className="text-muted  fs-12"><i className="bx bx-caret-up text-success me-1"></i><span className="text-success"> 55%</span> last month</span>
                    <span className="text-muted  fs-11">11 days ago</span>
                  </div>
                </div>
                <div className="list-group-item list-group-item-action flex-column align-items-start pb-3">
                  <div className="d-flex w-100 justify-content-between">
                    <p className="fs-13 mb-2 fw-semibold text-dark">Profit</p>
                    <h4 className="text-dark mb-0 fw-semibold text-dark fs-18">$27,215</h4>
                  </div>
                  <div className="d-flex w-100 justify-content-between">
                    <span className="text-muted  fs-12"><i className="bx bx-caret-up text-success me-1"></i><span className="text-success"> 32%</span> last month</span>
                    <span className="text-muted  fs-11">11 days ago</span>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={12} xl={6} xxl={3}>
          <Card>
            <Card.Header className="bg-transparent pb-0">
              <div>
                <h3 className="card-title mb-2">Timeline</h3>
              </div>
            </Card.Header>
            <Card.Body className="card-body mt-0">
              <div className="latest-timelines mt-4">
                <ul className="timelines mb-0">
                  <li>
                    <div className="featured_icon danger">
                      <i className="fas fa-circle"></i>
                    </div>
                  </li>
                  <li className="mt-0 activity">
                    <div><span className="fs-11 text-muted float-end">23 Sep, 2021</span></div>
                    <Link to="#" className="fs-12 text-dark">
                      <p className="mb-1 fw-semibold text-dark fs-13">Anita Letterback</p>
                    </Link>
                    <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt . </p>
                  </li>
                  <li>
                    <div className="featured_icon success">
                      <i className="fas fa-circle"></i>
                    </div>
                  </li>
                  <li className="mt-0 activity">
                    <div><span className="fs-11 text-muted float-end">16 Aug, 2021</span></div>
                    <Link to="#" className="fs-12 text-dark">
                      <p className="mb-1 fw-semibold text-dark fs-13">Paddy O'Furniture</p>
                    </Link>
                    <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt . </p>
                  </li>
                  <li>
                    <div className="featured_icon primary">
                      <i className="fas fa-circle"></i>
                    </div>
                  </li>
                  <li className="mt-0 activity">
                    <div><span className="fs-11 text-muted float-end">23 Feb, 2021</span></div>
                    <Link to="#" className="fs-12 text-dark">
                      <p className="mb-1 fw-semibold text-dark fs-13">Olive Yew</p>
                    </Link>
                    <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt . </p>
                  </li>
                  <li>
                    <div className="featured_icon warning">
                      <i className="fas fa-circle"></i>
                    </div>
                  </li>
                  <li className="mt-0 activity">
                    <div><span className="fs-11 text-muted float-end">21 june, 2021</span></div>
                    <Link to="#" className="fs-12 text-dark">
                      <p className="mb-1 fw-semibold text-dark fs-13">Maureen Biologist</p>
                    </Link>
                    <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt. </p>
                  </li>
                  <li>
                    <div className="featured_icon teal">
                      <i className="fas fa-circle"></i>
                    </div>
                  </li>
                  <li className="mt-0 activity">
                    <div><span className="fs-11 text-muted float-end">04 Aug, 2021</span></div>
                    <Link to="#" className="fs-12 text-dark">
                      <p className="mb-1 fw-semibold text-dark fs-13">Peg Legge</p>
                    </Link>
                    <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt . </p>
                  </li>
                  <li>
                    <div className="featured_icon info">
                      <i className="fas fa-circle"></i>
                    </div>
                  </li>
                  <li className="mt-0 activity">
                    <div><span className="fs-11 text-muted float-end">04 Aug, 2021</span></div>
                    <Link to="#" className="fs-12 text-dark">
                      <p className="mb-1 fw-semibold text-dark fs-13">Letterbac</p>
                    </Link>
                    <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt . </p>
                  </li>
                  <li>
                    <div className="featured_icon danger">
                      <i className="fas fa-circle"></i>
                    </div>
                  </li>
                  <li className="mt-0 activity mb-0">
                    <div><span className="fs-11 text-muted float-end">23 Sep, 2021</span></div>
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
        <Col xl={6} xxl={3} md={12} lg={12}>
          <Card>
            <Card.Header className="pb-0">
              <h3 className="card-title mb-2">Weekly Visitors</h3>
            </Card.Header>
            <Card.Body className="pb-0">
              <Row className="mb-4">
                <div className="col-6">
                  <div className="text-muted fs-12 text-center mb-2">Average Male Visitors</div>
                  <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <span className="me-3 fs-26 fw-semibold">2,132</span>
                    <span className="text-success fw-semibold"><i className="fa fa-caret-up me-2"></i>0.23%</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-muted fs-12 text-center mb-2">Average Female Visitors</div>
                  <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <span className="me-3 fs-26 fw-semibold">1,053</span>
                    <span className="text-danger fw-semibold"><i className="fa fa-caret-down me-2"></i>0.11%</span>
                  </div>
                </div>
              </Row>
              <Viewers />
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
            <Card.Body className="pt-0 example1-table">
              <div className="d-flex justify-content-between flex-wrap gap-2 mb-3">
                <div>
                  <input className="form-control form-control-sm" type="text" placeholder="Search Here" aria-label=".form-control-sm example" />
                </div>
                <Dropdown>
                  <Dropdown.Toggle as='a' variant="" className="no-caret btn btn-primary btn-sm btn-wave waves-effect waves-light" id="dropdown-basic">
                    Sort By<i className="ri-arrow-down-s-line align-middle d-inline-block"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">New</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Popular</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Relevant</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="table-responsive">
                <table className="table  table-bordered text-nowrap mb-0" id="example1">
                  <thead>
                    <tr>
                      <th className="text-center">Purchase Date</th>
                      <th>Client Name</th>
                      <th>Product ID</th>
                      <th>Product</th>
                      <th>Product Cost</th>
                      <th>Payment Mode</th>
                      <th>Status</th>
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
                      <td><span className="badge bg-success">Delivered</span></td>
                    </tr>
                    <tr>
                      <td className="text-center">#02</td>
                      <td>Evan Rees</td>
                      <td>PRO8765</td>
                      <td>Thomson R9 122cm (48 inch) Full HD LED TV </td>
                      <td>$30,000</td>
                      <td>Cash on delivered</td>
                      <td><span className="badge bg-primary">Add Cart</span></td>
                    </tr>
                    <tr>
                      <td className="text-center">#03</td>
                      <td>David Wallace</td>
                      <td>PRO54321</td>
                      <td>Vu 80cm (32 inch) HD Ready LED TV</td>
                      <td>$13,200</td>
                      <td>Online Payment</td>
                      <td><span className="badge bg-orange">Pending</span></td>
                    </tr>
                    <tr>
                      <td className="text-center">#04</td>
                      <td>Julia Bower</td>
                      <td>PRO97654</td>
                      <td>Micromax 81cm (32 inch) HD Ready LED TV</td>
                      <td>$15,100</td>
                      <td>Cash on delivered</td>
                      <td><span className="badge bg-secondary">Delivering</span></td>
                    </tr>
                    <tr>
                      <td className="text-center">#05</td>
                      <td>Kevin James</td>
                      <td>PRO4532</td>
                      <td>HP 200 Mouse &amp; Wireless Laptop Keyboard </td>
                      <td>$5,987</td>
                      <td>Online Payment</td>
                      <td><span className="badge bg-danger">Shipped</span></td>
                    </tr>
                    <tr>
                      <td className="text-center">#06</td>
                      <td>Theresa	Wright</td>
                      <td>PRO6789</td>
                      <td>Digisol DG-HR3400 Router </td>
                      <td>$11,987</td>
                      <td>Cash on delivered</td>
                      <td><span className="badge bg-secondary">Delivering</span></td>
                    </tr>
                    <tr>
                      <td className="text-center">#07</td>
                      <td>Sebastian	Black</td>
                      <td>PRO4567</td>
                      <td>Dell WM118 Wireless Optical Mouse</td>
                      <td>$4,700</td>
                      <td>Online Payment</td>
                      <td><span className="badge bg-info">Add to Cart</span></td>
                    </tr>
                    <tr>
                      <td className="text-center">#08</td>
                      <td>Kevin Glover</td>
                      <td>PRO32156</td>
                      <td>Dell 16 inch Laptop Backpack </td>
                      <td>$678</td>
                      <td>Cash On delivered</td>
                      <td><span className="badge bg-pink">Delivered</span></td>
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

export default Dashboard;
