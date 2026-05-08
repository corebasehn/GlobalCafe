import { FC, Fragment } from 'react';
import { Button, Card, Col, Dropdown, ProgressBar, Row } from "react-bootstrap";
import { imagesData } from "../../common/commonimages";
import { Statistics3, Viewers3 } from "../../common/Chartfunction";
import Pageheader from "../../layout/layoutcomponent/pageheader";
import { Link } from 'react-router-dom';

interface ComponentProps { }

const Dashboard3: FC<ComponentProps> = () => {
  return (
    <Fragment>
      <Pageheader title="DASHBOARD" heading="Dashboard" active="Sales" />

      <Row>
        <Col sm={12} lg={12} md={12} xl={7}>
          <Card className=" primary-custom-card1">
            <Card.Body>
              <Row>
                <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12">
                  <div className="prime-card">
                    <img className="img-fluid" src={imagesData('png2')} alt="" />
                  </div>
                </div>
                <div className="col-xl-7 col-lg-6 col-md-12 col-sm-12">
                  <div className="text-justified align-items-center">
                    <h2 className="text-dark fw-semibold mb-3 mt-2">
                      Hi, Welcome Back{" "}
                      <span className="text-primary">Nick!</span>
                    </h2>
                    <p className="text-dark fs-17 mb-2 lh-3">
                      {" "}
                      You have used the 100% of free plan storage. Please
                      upgrade your plan to get unlimited storage.
                    </p>
                    <p className="fw-semibold fs-12 mb-4">
                      For billing related queries, contact us through support
                      chat or mail us at team@spruko.com{" "}
                    </p>
                    <Button className="btn btn-primary mb-3 shadow" variant="">
                      Upgrade to new Plan
                    </Button>
                  </div>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={5} lg={12} md={12} sm={12}>
          <Row>
            <Col xl={6} lg={6} sm={6} xs={12}>
              <div className="card sales-card circle-image1">
                <Row>
                  <div className="col-8">
                    <div className="ps-4 pt-4 pe-3 pb-4">
                      <div className="">
                        <h6 className="mb-2 fs-12 ">Today Orders</h6>
                      </div>
                      <div className="pb-0 mt-0">
                        <div className="d-flex">
                          <h4 className="fs-20 fw-semibold mb-2">5,472</h4>
                        </div>
                        <p className="mb-0 fs-12 text-muted">Last week<i className="bx bx-caret-up mx-2 text-success"></i>
                          <span className="text-success fw-semibold"> +427</span>
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
              </div>
            </Col>
            <Col xl={6} lg={6} sm={6} xs={12}>
              <div className="card sales-card circle-image2">
                <Row>
                  <div className="col-8">
                    <div className="ps-4 pt-4 pe-3 pb-4">
                      <div className="">
                        <h6 className="mb-2 fs-12">Today Earnings</h6>
                      </div>
                      <div className="pb-0 mt-0">
                        <div className="d-flex">
                          <h4 className="fs-20 fw-semibold mb-2">$47,589</h4>
                        </div>
                        <p className="mb-0 fs-12 text-muted">Last week<i className="bx bx-caret-down mx-2 text-danger"></i>
                          <span className="fw-semibold text-danger"> -453</span>
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
              </div>
            </Col>
            <Col xl={6} lg={6} sm={6} xs={12}>
              <div className="card sales-card circle-image3">
                <Row>
                  <div className="col-8">
                    <div className="ps-4 pt-4 pe-3 pb-4">
                      <div className="">
                        <h6 className="mb-2 fs-12">Profit Gain</h6>
                      </div>
                      <div className="pb-0 mt-0">
                        <div className="d-flex">
                          <h4 className="fs-20 fw-semibold mb-2">$8,943</h4>
                        </div>
                        <p className="mb-0 fs-12 text-muted">Last week<i className="bx bx-caret-up mx-2 text-success"></i>
                          <span className=" text-success fw-semibold"> +788</span>
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
              </div>
            </Col>
            <Col xl={6} lg={6} sm={6} xs={12}>
              <div className="card sales-card circle-image4">
                <Row>
                  <div className="col-8">
                    <div className="ps-4 pt-4 pe-3 pb-4">
                      <div className="">
                        <h6 className="mb-2 fs-12">Total Earnings</h6>
                      </div>
                      <div className="pb-0 mt-0">
                        <div className="d-flex">
                          <h4 className="fs-20 fw-semibold mb-2">$57.12M</h4>
                        </div>
                        <p className="mb-0 fs-12  text-muted">Last week<i className="bx bx-caret-down mx-2 text-danger"></i>
                          <span className="text-danger fw-semibold"> -693</span>
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
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col xxl={6} lg={12} md={12} sm={12}>
          <Card className=" custom-card overflow-hidden">
            <Card.Header className=" border-bottom-0">
              <div>
                <h3 className="card-title mb-2 ">Project Budget</h3>{" "}
                <span className="d-block fs-12 mb-0 text-muted"></span>
              </div>
            </Card.Header>
            <Card.Body>
              <Statistics3 />
            </Card.Body>
          </Card>
        </Col>
        <Col dm={12} lg={6} xxl={3}>
          <Card className=" overflow-hidden">
            <Card.Header className=" pb-1">
              <h3 className="card-title mb-2">Recent Customers</h3>
            </Card.Header>
            <Card.Body className="p-0 customers mt-1">
              <div className="list-group list-lg-group list-group-flush gap-1">
                <Link to="#" className="border-0">
                  <div className="list-group-item list-group-item-action border-0">
                    <div className="media mt-0">
                      <img className="avatar-lg rounded-circle me-3 my-auto shadow" src={imagesData('face2')} alt="Image description" />
                      <div className="media-body flex-fill">
                        <div className="d-flex align-items-center">
                          <div className="mt-0">
                            <h5 className="mb-1 fs-13 font-weight-sembold text-dark">Samantha Melon</h5>
                            <p className="mb-0 fs-12 text-muted">User ID: #1234</p>
                          </div>
                          <span className="ms-auto wd-45p tx-14">
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
                  <div className="list-group-item list-group-item-action border-0" >
                    <div className="media mt-0">
                      <img className="avatar-lg rounded-circle me-3 my-auto shadow" src={imagesData('face1')} alt="Image description" />
                      <div className="media-body flex-fill">
                        <div className="d-flex align-items-center">
                          <div className="mt-1">
                            <h5 className="mb-1 fs-13 font-weight-sembold text-dark">Allie Grater</h5>
                            <p className="mb-0 fs-12 text-muted">User ID: #1234</p>
                          </div>
                          <span className="ms-auto wd-45p tx-14">
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
                  <div className="list-group-item list-group-item-action border-0" >
                    <div className="media mt-0">
                      <img className="avatar-lg rounded-circle me-3 my-auto shadow" src={imagesData('face5')} alt="Image description" />
                      <div className="media-body flex-fill">
                        <div className="d-flex align-items-center">
                          <div className="mt-1">
                            <h5 className="mb-1 fs-13 font-weight-sembold text-dark">Gabe Lackmen</h5>
                            <p className="mb-0 fs-12 text-muted">User ID: #1234</p>
                          </div>
                          <span className="ms-auto wd-45p  tx-14">
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
                  <div className="list-group-item list-group-item-action border-0" >
                    <div className="media mt-0">
                      <img className="avatar-lg rounded-circle me-3 my-auto shadow" src={imagesData('face7')} alt="Image description" />
                      <div className="media-body flex-fill">
                        <div className="d-flex align-items-center">
                          <div className="mt-1">
                            <h5 className="mb-1 fs-13 font-weight-sembold text-dark">Manuel Labor</h5>
                            <p className="mb-0 fs-12 text-muted">User ID: #1234</p>
                          </div>
                          <span className="ms-auto wd-45p tx-14">
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
                  <div className="list-group-item list-group-item-action border-0" >
                    <div className="media mt-0">
                      <img className="avatar-lg rounded-circle me-3 my-auto shadow" src={imagesData('face9')} alt="Image description" />
                      <div className="media-body flex-fill">
                        <div className="d-flex align-items-center">
                          <div className="mt-1">
                            <h5 className="mb-1 fs-13 font-weight-sembold text-dark">Hercules Bing</h5>
                            <p className="mb-0 fs-12 text-muted">User ID: #1754</p>
                          </div>
                          <span className="ms-auto wd-45p tx-14">
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
                  <div className="list-group-item list-group-item-action border-0 pb-4" >
                    <div className="media mt-0">
                      <img className="avatar-lg rounded-circle me-3 my-auto shadow" src={imagesData('face11')} alt="Image description" />
                      <div className="media-body flex-fill">
                        <div className="d-flex align-items-center">
                          <div className="mt-1">
                            <h5 className="mb-1 fs-13 font-weight-sembold text-dark">Manuel Labor</h5>
                            <p className="mb-0 fs-12 text-muted">User ID: #1234</p>
                          </div>
                          <span className="ms-auto wd-45p tx-14">
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
        <Col lg={6} xxl={3}>
          <Card className=" overflow-hidden">
            <Card.Header className=" pb-1">
              <h3 className="card-title mb-2">Warehouse Operating Costs</h3>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="list-group projects-list border-0">
                <Link to="#" className="list-group-item list-group-item-action flex-column align-items-start border-0 rounded-0">
                  <div className="d-flex w-100 justify-content-between">
                    <p className="fs-13 mb-2 fw-semibold text-dark">Order Picking</p>
                    <h4 className="text-dark mb-0 fw-semibold text-dark fs-18">3,876</h4>
                  </div>
                  <div className="d-flex w-100 justify-content-between">
                    <span className="text-muted fs-12"><i className="bx bx-caret-up text-success me-1"></i> <span className="text-success">03%</span> last month</span>
                    <span className="text-muted  fs-11">5 days ago</span>
                  </div>
                </Link>
                <Link to="#" className="list-group-item list-group-item-action flex-column align-items-start border-top">
                  <div className="d-flex w-100 justify-content-between">
                    <p className="fs-13 mb-2 fw-semibold text-dark">Storage</p>
                    <h4 className="text-dark mb-0 fw-semibold text-dark fs-18">2,178</h4>
                  </div>
                  <div className="d-flex w-100 justify-content-between">
                    <span className="text-muted  fs-12"><i className="bx bx-caret-down text-danger me-1"></i><span className="text-danger"> 16%</span> last month</span>
                    <span className="text-muted  fs-11">2 days ago</span>
                  </div>
                </Link>
                <Link to="#" className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <p className="fs-13 mb-2 fw-semibold text-dark">Shipping</p>
                    <h4 className="text-dark mb-0 fw-semibold text-dark fs-18">1,367</h4>
                  </div>
                  <div className="d-flex w-100 justify-content-between">
                    <span className="text-muted  fs-12"><i className="bx bx-caret-up text-success me-1"></i><span className="text-success"> 06%</span> last month</span>
                    <span className="text-muted  fs-11">1 days ago</span>
                  </div>
                </Link>
                <Link to="#" className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <p className="fs-13 mb-2 fw-semibold text-dark">Receiving</p>
                    <h4 className="text-dark mb-0 fw-semibold text-dark fs-18">678</h4>
                  </div>
                  <div className="d-flex w-100 justify-content-between">
                    <span className="text-muted  fs-12"><i className="bx bx-caret-down text-danger me-1"></i><span className="text-danger"> 25%</span> last month</span>
                    <span className="text-muted  fs-11">10 days ago</span>
                  </div>
                </Link>
                <Link to="#" className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <p className="fs-13 mb-2 fw-semibold text-dark">Review</p>
                    <h4 className="text-dark mb-0 fw-semibold text-dark fs-18">578</h4>
                  </div>
                  <div className="d-flex w-100 justify-content-between">
                    <span className="text-muted  fs-12"><i className="bx bx-caret-up text-success me-1"></i><span className="text-success"> 55%</span> last month</span>
                    <span className="text-muted  fs-11">11 days ago</span>
                  </div>
                </Link>
                <Link to="#" className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <p className="fs-13 mb-2 fw-semibold text-dark">Profit</p>
                    <h4 className="text-dark mb-0 fw-semibold text-dark fs-18">$27,215</h4>
                  </div>
                  <div className="d-flex w-100 justify-content-between">
                    <span className="text-muted  fs-12"><i className="bx bx-caret-up text-success me-1"></i><span className="text-success"> 32%</span> last month</span>
                    <span className="text-muted  fs-11">11 days ago</span>
                  </div>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className=" row-sm">
        <Col md={6} lg={6} xxl={3}>
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
                    <div className="featured_icon1">
                    </div>
                  </li>
                  <li className="mt-0 activity border br-5 p-2">
                    <div><span className="fs-11 text-muted float-end">23 Sep, 2021</span></div>
                    <Link to="#" className="fs-12 text-dark">
                      <p className="mb-1 fw-semibold text-dark fs-13">Anita Letterback</p>
                    </Link>
                    <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt . </p>
                  </li>
                  <li>
                    <div className="featured_icon1">
                    </div>
                  </li>
                  <li className="mt-0 activity border br-5 p-2">
                    <div><span className="fs-11 text-muted float-end">16 Aug, 2021</span></div>
                    <Link to="#" className="fs-12 text-dark">
                      <p className="mb-1 fw-semibold text-dark fs-13">Paddy O'Furniture</p>
                    </Link>
                    <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt . </p>
                  </li>
                  <li>
                    <div className="featured_icon1">
                    </div>
                  </li>
                  <li className="mt-0 activity border br-5 p-2">
                    <div><span className="fs-11 text-muted float-end">23 Feb, 2021</span></div>
                    <Link to="#" className="fs-12 text-dark">
                      <p className="mb-1 fw-semibold text-dark">Olive Yew</p>
                    </Link>
                    <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt . </p>
                  </li>
                  <li>
                    <div className="featured_icon1">
                    </div>
                  </li>
                  <li className="mt-0 activity border br-5 p-2">
                    <div><span className="fs-11 text-muted float-end">21 june, 2021</span></div>
                    <Link to="#" className="fs-12 text-dark">
                      <p className="mb-1 fw-semibold text-dark fs-13">Maureen Biologist</p>
                    </Link>
                    <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt. </p>
                  </li>
                  <li>
                    <div className="featured_icon1">
                    </div>
                  </li>
                  <li className="mt-0 activity border br-5 p-2">
                    <div><span className="fs-11 text-muted float-end">04 Aug, 2021</span></div>
                    <Link to="#" className="fs-12 text-dark">
                      <p className="mb-1 fw-semibold text-dark fs-13">Peg Legge</p>
                    </Link>
                    <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt . </p>
                  </li>
                  <li>
                    <div className="featured_icon1">
                    </div>
                  </li>
                  <li className="mt-0 activity border br-5 p-2 mb-3">
                    <div><span className="fs-11 text-muted float-end">01 Jan, 2022</span></div>
                    <Link to="#" className="fs-12 text-dark">
                      <p className="mb-1 fw-semibold text-dark fs-13">Neetato</p>
                    </Link>
                    <p className="text-muted mt-0 mb-0 fs-12">Lorem ipsum dolor tempor incididunt . </p>
                  </li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={6} xxl={3}>
          <Card>
            <Card.Header className=" pb-2">
              <h3 className="card-title mb-2">MAIN TASKS</h3>
            </Card.Header>
            <Card.Body className="p-0 customers mt-1">
              <div className="">
                <label className="p-2 d-flex">
                  <span className="form-check mb-0 ms-2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked1" />
                  </span>
                  <span className="mx-3 my-auto text-truncate">
                    accurate information at any given point.
                  </span>
                  <span className="ms-auto"><span className="badge bg-primary-transparent fw-semibold px-2 py-1 fs-11 me-2">Today</span></span>
                </label>
                <label className="p-2 mt-2 d-flex">
                  <span className="form-check mb-0 ms-2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked2" />
                  </span>
                  <span className="mx-3 my-auto">
                    sharing the information with clients or stakeholders.
                  </span>
                  <span className="ms-auto"><span className="badge bg-primary-transparent fw-semibold px-2 py-1 fs-11 me-2">Today</span></span>
                </label>
                <label className="p-2 mt-2 d-flex">
                  <span className="form-check mb-0 ms-2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked3" />
                  </span>
                  <span className="mx-3 my-auto text-truncate">
                    Hearing the information and responding .
                  </span>
                  <span className="ms-auto"><span className="badge bg-primary-transparent fw-semibold px-2 py-1 fs-11 me-2 float-end">22 hrs</span></span>
                </label>
                <label className="p-2 mt-2 d-flex">
                  <span className="form-check mb-0 ms-2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked4" />
                  </span>
                  <span className="mx-3 my-auto">
                    Setting up and customizing your own sales.
                  </span>
                  <span className="ms-auto"> <span className="badge bg-light-transparent fw-semibold px-2 py-1 fs-11 me-2">1 Day</span></span>
                </label>
                <label className="p-2 mt-2 d-flex">
                  <span className="form-check mb-0 ms-2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked6" defaultChecked />
                  </span>
                  <span className="mx-3 my-auto">
                    To have a complete 360° overview of sales information, having.
                  </span>
                  <span className="ms-auto"> <span className="badge bg-light-transparent fw-semibold px-2 py-1 fs-11 me-2">2 Days</span></span>
                </label>
                <label className="p-2 mt-2 d-flex">
                  <span className="form-check mb-0 ms-2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked7" defaultChecked />
                  </span>
                  <span className="mx-3 my-auto">
                    New Admin Launched.
                  </span>
                </label>
                <label className="p-2 mt-2 d-flex">
                  <span className="form-check mb-0 ms-2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked8" defaultChecked />
                  </span>
                  <span className="mx-3 my-auto">
                    To maximize profits and improve productivity.
                  </span>
                </label>
                <label className="p-2 mt-2 d-flex">
                  <span className="form-check mb-0 ms-2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked9" defaultChecked />
                  </span>
                  <span className="mx-3 my-auto">
                    Increase work state.
                  </span>
                </label>
                <label className="p-2 mt-2 d-flex">
                  <span className="form-check mb-0 ms-2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked5" />
                  </span>
                  <span className="mx-3 my-auto">
                    Setting up and customizing your own sales.
                  </span>
                </label>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={6} xxl={3}>
          <Card>
            <Card.Header className=" pb-3">
              <h3 className="card-title mb-2">SALES ACTIVITY</h3>
            </Card.Header>
            <Card.Body className="p-0 customers mt-1">
              <div className="country-card pt-1">
                <div className="mb-4">
                  <div className="d-flex">
                    <span className="fs-13 fw-semibold">India</span>
                    <div className="ms-auto"><span className="text-danger mx-1"><i className="fe fe-trending-down"></i></span><span className="number-font">$32,879</span> (65%)</div>
                  </div>
                  <ProgressBar className="ht-5 br-5 mt-2" variant="primary" now={60} />
                </div>
                <div className="mb-4">
                  <div className="d-flex mb-1">
                    <span className="fs-13 fw-semibold">Russia</span>
                    <div className="ms-auto"><span className="text-info mx-1"><i className="fe fe-trending-up"></i></span><span className="number-font">$22,710</span> (55%)</div>
                  </div>
                  <ProgressBar className="ht-5 br-5 mt-2" variant="info" now={50} />
                </div>
                <div className="mb-4">
                  <div className="d-flex">
                    <span className="fs-13 fw-semibold">Canada</span>
                    <div className="ms-auto"><span className="text-danger mx-1"><i className="fe fe-trending-down"></i></span><span className="number-font">$56,291</span> (69%)</div>
                  </div>
                  <ProgressBar className="ht-5 br-5 mt-2" variant="secondary" now={80} />
                </div>
                <div className="mb-4">
                  <div className="d-flex">
                    <span className="fs-13 fw-semibold">Brazil</span>
                    <div className="ms-auto"><span className="text-success mx-1"><i className="fe fe-trending-up"></i></span><span className="number-font">$34,209</span> (60%)</div>
                  </div>
                  <ProgressBar className="ht-5 br-5 mt-2" variant="warning" now={60} />
                </div>
                <div className="mb-4">
                  <div className="d-flex">
                    <span className="fs-13 fw-semibold">United States</span>
                    <div className="ms-auto"><span className="text-success mx-1"><i className="fe fe-trending-up"></i></span><span className="number-font">$45,870</span> (86%)</div>
                  </div>
                  <ProgressBar className="ht-5 br-5 mt-2" variant="danger" now={80} />
                </div>
                <div className="mb-4">
                  <div className="d-flex">
                    <span className="fs-13 fw-semibold">Germany</span>
                    <div className="ms-auto"><span className="text-success mx-1"><i className="fe fe-trending-up"></i></span><span className="number-font">$67,357</span> (73%)</div>
                  </div>
                  <ProgressBar className="ht-5 br-5 mt-2" variant="success" now={70} />
                </div>
                <div className="mb-4">
                  <div className="d-flex">
                    <span className="fs-13 fw-semibold">Italy</span>
                    <div className="ms-auto"><span className="text-success mx-1"><i className="fe fe-trending-up"></i></span><span className="number-font">$43,537</span> (73%)</div>
                  </div>
                  <ProgressBar className="ht-5 br-5 mt-2" variant="orange" now={55} />
                </div>
                <div className="mb-3">
                  <div className="d-flex">
                    <span className="fs-13 fw-semibold">U.A.E</span>
                    <div className="ms-auto"><span className="text-danger mx-1"><i className="fe fe-trending-down"></i></span><span className="number-font">$56,291</span> (69%)</div>
                  </div>
                  <ProgressBar className="ht-5 br-5 mt-2" variant="purpple" now={80} />
                </div>
              </div>

            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={6} xxl={3}>
          <Card>
            <Card.Header className=" pb-0">
              <h3 className="card-title mb-2">Weekly Visitors</h3>
            </Card.Header>
            <Card.Body className=" pb-0">
              <Row className=" mb-5">
                <Col xxl={6} xl={12} className="col-6">
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
                </Col>
                <Col xxl={6} xl={12} className="col-6">
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
                </Col>
              </Row>
              <Viewers3 />
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

export default Dashboard3;
