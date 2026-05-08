import { Fragment } from 'react';
import Pageheader from '../layout/layoutcomponent/pageheader';
import { imagesData } from '../common/commonimages';
import { Carousel, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Widgets = () => {
  return (
    <Fragment>
      <Pageheader title="WIDGETS" active="Widgets" />

      {/* <!-- row --> */}
      <div className="row row-sm">
        <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
          <div className="card sales-card circle-image1">
            <div className="row">
              <div className="col-8">
                <div className="ps-4 pt-4 pe-3 pb-4 pt-0">
                  <div className="">
                    <p className="mb-2 fs-12 fw-semibold">TODAY ORDERS</p>
                  </div>
                  <div className="pb-0 mt-0">
                    <div className="d-flex">
                      <h4 className="fs-26 fw-semibold mb-2">5,74,12</h4>
                    </div>
                    <p className="mb-0 fs-12 text-muted">Last week<i className="fas fa-arrow-circle-up mx-2 text-success"></i>
                      <span className=" text-primary"> +427</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="circle-icon widget bg-primary-gradient text-center align-self-center shadow-primary overflow-hidden box-shadow-primary">
                  <i className="fe fe-shopping-bag fs-20 lh-lg text-fixed-white"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
          <div className="card sales-card circle-image2">
            <div className="row">
              <div className="col-8">
                <div className="ps-4 pt-4 pe-3 pb-4 pt-0">
                  <div className="">
                    <p className="mb-2 fs-12 fw-semibold">TODAY EARNINGS</p>
                  </div>
                  <div className="pb-0 mt-0">
                    <div className="d-flex">
                      <h4 className="fs-26 fw-semibold mb-2">$47,589</h4>
                    </div>
                    <p className="mb-0 fs-12 text-muted">Last week<i className="fas fa-arrow-circle-down mx-2 text-danger"></i>
                      <span className=" text-success"> -453</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="circle-icon widget bg-info-gradient text-center align-self-center shadow-info overflow-hidden box-shadow-info">
                  <i className="fe fe-dollar-sign fs-20 lh-lg text-fixed-white"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
          <div className="card sales-card circle-image3">
            <div className="row">
              <div className="col-8">
                <div className="ps-4 pt-4 pe-3 pb-4 pt-0">
                  <div className="">
                    <p className="mb-2 fs-12 fw-semibold">PROFIT GAIN</p>
                  </div>
                  <div className="pb-0 mt-0">
                    <div className="d-flex">
                      <h4 className="fs-26 fw-semibold mb-2">$8,943</h4>
                    </div>
                    <p className="mb-0 fs-12 text-muted">Last week<i className="fas fa-arrow-circle-up mx-2 text-success"></i>
                      <span className=" text-primary"> +788</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="circle-icon widget bg-success-gradient text-center align-self-center shadow-success overflow-hidden box-shadow-success">
                  <i className="fe fe-external-link fs-20 lh-lg text-fixed-white"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
          <div className="card sales-card circle-image4">
            <div className="row">
              <div className="col-8">
                <div className="ps-4 pt-4 pe-3 pb-4 pt-0">
                  <div className="">
                    <p className="mb-2 fs-12 fw-semibold">Total Earnings</p>
                  </div>
                  <div className="pb-0 mt-0">
                    <div className="d-flex">
                      <h4 className="fs-26 fw-semibold mb-2">5,74.12</h4>
                    </div>
                    <p className="mb-0 fs-12  text-muted">Last week<i className="fas fa-arrow-circle-down mx-2 text-danger"></i>
                      <span className=" text-success"> -693</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="circle-icon widget bg-warning-gradient text-center align-self-center warning-success overflow-hidden box-shadow-warning">
                  <i className="fe fe-credit-card fs-20 lh-lg text-fixed-white"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- row closed --> */}

      {/* <!-- row --> */}
      <div className="row row-sm">
        <div className="col-xl-3 col-md-6 col-lg-6 col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="plan-card text-center">
                <i className="fe fe-share text-primary plan-icon"></i>
                <h6 className="text-drak text-uppercase mt-2">Total Shares</h6>
                <h2 className="mb-2">678</h2>
                <span className="badge bg-success"> +89% </span>
                <span className="text-muted ms-1">From previous month</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 col-lg-6 col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="plan-card text-center">
                <i className="fe fe-message-square plan-icon text-primary"></i>
                <h6 className="text-drak text-uppercase mt-2">Total Comments</h6>
                <h2 className="mb-2">493</h2>
                <span className="badge bg-danger"> +76% </span>
                <span className="text-muted ms-1">From previous month</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 col-lg-6 col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="plan-card text-center">
                <i className="fe fe-thumbs-up plan-icon text-primary"></i>
                <h6 className="text-drak text-uppercase mt-2">Total Likes</h6>
                <h2 className="mb-2">3,287</h2>
                <span className="badge bg-success"> +18% </span>
                <span className="text-muted ms-1">From previous month</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 col-lg-6 col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="plan-card text-center">
                <i className="fe fe-eye plan-icon text-primary"></i>
                <h6 className="text-drak text-uppercase mt-2">Total Views</h6>
                <h2 className="mb-2">279</h2>
                <span className="badge bg-danger"> +5% </span>
                <span className="text-muted ms-1">From previous month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /row --> */}

      {/* <!-- row --> */}
      <div className="row row-sm">
        <div className="col-sm-6 col-lg-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <div className="">App Views</div>
                  <div className="h3 mt-2 mb-2"><b>19.89K</b><span className="text-success fs-13 ms-2 d-inline-block">(+25%)</span></div>
                </div>
                <div className="col-auto align-self-center ">
                  <div className="feature mt-0 mb-0">
                    <i className="fe fe-eye project bg-primary-transparent text-primary "></i>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="mb-1">Overview of Last month</p>
                <div className="progress progress-sm h-1 mb-1">
                  <div className="progress-bar bg-primary wd-80 " role="progressbar"></div>
                </div>
                <small className="mb-0 text-muted">Monthly<span className="float-end text-muted">60%</span></small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <div className="">New Users</div>
                  <div className="h3 mt-2 mb-2"><b>692</b><span className="text-success fs-13 ms-2 d-inline-block">(+15%)</span></div>
                </div>
                <div className="col-auto align-self-center ">
                  <div className="feature mt-0 mb-0">
                    <i className="fe fe-users project bg-pink-transparent text-pink "></i>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="mb-1">Overview of Last month</p>
                <div className="progress progress-sm h-1 mb-1">
                  <div className="progress-bar bg-secondary wd-50 " role="progressbar"></div>
                </div>
                <small className="mb-0 text-muted">Monthly<span className="float-end text-muted">50%</span></small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <div className="">Churned Users</div>
                  <div className="h3 mt-2 mb-2"><b>286</b><span className="text-success fs-13 ms-2 d-inline-block">(+08%)</span></div>
                </div>
                <div className="col-auto align-self-center ">
                  <div className="feature mt-0 mb-0">
                    <i className="ti-pulse project bg-warning-transparent text-warning "></i>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="mb-1">Overview of Last month</p>
                <div className="progress progress-sm h-1 mb-1">
                  <div className="progress-bar bg-danger wd-30 " role="progressbar"></div>
                </div>
                <small className="mb-0 text-muted">Monthly<span className="float-end text-muted">30%</span></small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <div className="">Total Revenue</div>
                  <div className="h3 mt-2 mb-2"><b>$2.98M</b><span className="text-success fs-13 ms-2 d-inline-block">(+35%)</span></div>
                </div>
                <div className="col-auto align-self-center ">
                  <div className="feature mt-0 mb-0">
                    <i className="ti-bar-chart-alt project bg-success-transparent text-success "></i>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="mb-1">Overview of Last month</p>
                <div className="progress progress-sm h-1 mb-1">
                  <div className="progress-bar bg-success wd-25 " role="progressbar"></div>
                </div>
                <small className="mb-0 text-muted">Monthly<span className="float-end text-muted">25%</span></small>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /row --> */}

      <div className="row row-sm">
        <div className="col-lg-6 col-xl-3 col-md-6 col-12">
          <div className="card bg-primary-gradient">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="icon1 mt-2 text-center text-fixed-white">
                    <i className="fe fe-users fs-40"></i>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mt-0 text-center text-fixed-white">
                    <span>Members</span>
                    <h2 className="mb-0 text-fixed-white">600</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xl-3 col-md-6 col-12">
          <div className="card bg-danger-gradient">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="icon1 mt-2 text-center text-fixed-white">
                    <i className="fe fe-shopping-cart fs-40"></i>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mt-0 text-center text-fixed-white">
                    <span>Sales</span>
                    <h2 className="mb-0 text-fixed-white">854</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xl-3 col-md-6 col-12">
          <div className="card bg-success-gradient">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="icon1 mt-2 text-center text-fixed-white">
                    <i className="fe fe-bar-chart-2 fs-40"></i>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mt-0 text-center text-fixed-white">
                    <span>Profits</span>
                    <h2 className="mb-0 text-fixed-white">98K</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xl-3 col-md-6 col-12">
          <div className="card bg-warning-gradient">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="icon1 mt-2 text-center text-fixed-white">
                    <i className="fe fe-pie-chart fs-40"></i>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mt-0 text-center text-fixed-white">
                    <span>Taxes</span>
                    <h2 className="mb-0 text-fixed-white">876</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-6 col-xl-3">
          <div className="card card-img-holder">
            <div className="card-body list-icons">
              <div className="clearfix">
                <div className="float-end  mt-2">
                  <span className="text-primary ">
                    <i className="si si-basket-loaded fs-30"></i>
                  </span>
                </div>
                <div className="float-start text-end">
                  <p className="card-text text-muted mb-1">Services</p>
                  <h3>$124</h3>
                </div>
              </div>
              <div className="card-footer p-0">
                <p className="text-muted mb-0 pt-4">
                  <i className="si si-arrow-down-circle text-warning mx-2" aria-hidden="true"></i> Daily Orders
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-6 col-xl-3">
          <div className="card card-img-holder">
            <div className="card-body list-icons">
              <div className="clearfix">
                <div className="float-end  mt-2">
                  <span className="text-primary ">
                    <i className="si si-credit-card fs-30"></i>
                  </span>
                </div>
                <div className="float-start">
                  <p className="card-text text-muted mb-1">Sources</p>
                  <h3>$124</h3>
                </div>
              </div>
              <div className="card-footer p-0">
                <p className="text-muted mb-0 pt-4">
                  <i className="si si-arrow-up-circle text-success mx-2"></i> Less Sales
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-6 col-xl-3">
          <div className="card card-img-holder">
            <div className="card-body list-icons">
              <div className="clearfix">
                <div className="float-end  mt-2">
                  <span className="text-primary">
                    <i className="si si-chart fs-30"></i>
                  </span>
                </div>
                <div className="float-start">
                  <p className="card-text text-muted mb-1">Income</p>
                  <h3>21%</h3>
                </div>
              </div>
              <div className="card-footer p-0">
                <p className="text-muted mb-0 pt-4">
                  <i className="si si-exclamation text-info mx-2"></i> From Last Month
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-6 col-xl-3">
          <div className="card card-img-holder">
            <div className="card-body list-icons">
              <div className="clearfix">
                <div className="float-end  mt-2">
                  <span className="text-primary">
                    <i className="si si-social-facebook fs-30"></i>
                  </span>
                </div>
                <div className="float-start">
                  <p className="card-text text-muted mb-1">Followers</p>
                  <h3>24K</h3>
                </div>
              </div>
              <div className="card-footer p-0">
                <p className="text-muted mb-0 pt-4">
                  <i className="si si-check text-primary mx-2"></i> Recent History
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-xl-4 col-lg-12">
          <div className="card user-wideget user-wideget-widget widget-user">
            <div className="widget-user-header br-te-5  br-ts-5  bg-primary">
              <h3 className="widget-user-username">Frost Williams</h3>
              <h5 className="widget-user-desc">Founder &amp; CEO</h5>
            </div>
            <div className="widget-user-image">
              <img src={imagesData('face17')} className="rounded-circle" alt="User Avatar" />
            </div>
            <div className="user-wideget-footer">
              <div className="row">
                <div className="col-sm-4 border-end">
                  <div className="description-block">
                    <h5 className="description-header">3,200</h5>
                    <span className="description-text">SALES</span>
                  </div>
                </div>
                <div className="col-sm-4 border-end">
                  <div className="description-block">
                    <h5 className="description-header">13,000</h5>
                    <span className="description-text">FOLLOWERS</span>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="description-block">
                    <h5 className="description-header">35</h5>
                    <span className="description-text">PRODUCTS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-xl-4 col-lg-12">
          <div className="card user-wideget user-wideget-widget widget-user">
            <div className="widget-user-header  br-te-5  br-ts-5 bg-danger">
              <h3 className="widget-user-username">Kennedy trox</h3>
              <h5 className="widget-user-desc">Founder &amp; CEO</h5>
            </div>
            <div className="widget-user-image">
              <img src={imagesData('face12')} className="rounded-circle" alt="User Avatar" />
            </div>
            <div className="user-wideget-footer">
              <div className="row">
                <div className="col-sm-4 border-end">
                  <div className="description-block">
                    <h5 className="description-header">3,200</h5>
                    <span className="description-text">SALES</span>
                  </div>
                </div>
                <div className="col-sm-4 border-end">
                  <div className="description-block">
                    <h5 className="description-header">13,000</h5>
                    <span className="description-text">FOLLOWERS</span>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="description-block">
                    <h5 className="description-header">35</h5>
                    <span className="description-text">PRODUCTS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-xl-4 col-lg-12">
          <div className="card user-wideget user-wideget-widget widget-user">
            <div className="widget-user-header  br-te-5  br-ts-5 bg-success">
              <h3 className="widget-user-username">Alexander Pierce</h3>
              <h5 className="widget-user-desc">Founder &amp; CEO</h5>
            </div>
            <div className="widget-user-image">
              <img src={imagesData('face5')} className="rounded-circle" alt="User Avatar" />
            </div>
            <div className="user-wideget-footer">
              <div className="row">
                <div className="col-sm-4 border-end">
                  <div className="description-block">
                    <h5 className="description-header">3,200</h5>
                    <span className="description-text">SALES</span>
                  </div>
                </div>
                <div className="col-sm-4 border-end">
                  <div className="description-block">
                    <h5 className="description-header">13,000</h5>
                    <span className="description-text">FOLLOWERS</span>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="description-block">
                    <h5 className="description-header">35</h5>
                    <span className="description-text">PRODUCTS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row row-cards row-deck">
        <div className="col-sm-12 col-lg-6">
          <div className="card">
            <div className="card-header pb-0 d-block">
              <div className="card-title pb-0  mb-2">Sales</div>
              <p className="fs-12 tx-gray-500 mb-3">On the other hand, we denounce with right indignation and dislike imagesralized <Link to="#">Learn more</Link></p>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col text-center">
                  <label className="fs-12">Today</label>
                  <p className="fw-bold fs-20">3,256</p>
                </div>
                {/* <!-- col --> */}
                <div className="col border-start text-center">
                  <label className="fs-12">This Week</label>
                  <p className="fw-bold fs-20">25,321</p>
                </div>
                {/* <!-- col --> */}
                <div className="col border-start text-center">
                  <label className="fs-12">This Month</label>
                  <p className="fw-bold fs-20">53,625</p>
                </div>
                {/* <!-- col --> */}
              </div>
              {/* <!-- row --> */}
              <div className="progress ht-20 mt-4">
                <div className="progress-bar progress-bar-striped progress-bar-animated bg-primary ht-20 w-50">50%</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-6">
          <div className="card">
            <div className="card-header pb-0 d-block">
              <div className="card-title pb-0 mb-2">Profit</div>
              <p className="fs-12 tx-gray-500 mb-3">On the other hand, we denounce with right indignation and dislike imagesralized <Link to="#">Learn more</Link></p>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col text-center">
                  <label className="fs-12">Today</label>
                  <p className="fw-bold fs-20">236 $</p>
                </div>
                {/* <!-- col --> */}
                <div className="col border-start text-center ">
                  <label className="fs-12">This Week</label>
                  <p className="fw-bold fs-20">1,365 $</p>
                </div>
                {/* <!-- col --> */}
                <div className="col border-start text-center">
                  <label className="fs-12">This Month</label>
                  <p className="fw-bold fs-20">36,254 $</p>
                </div>
                {/* <!-- col --> */}
              </div>
              {/* <!-- row --> */}
              <div className="progress mt-4 ht-20">
                <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning wd-60p ht-20">36%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- row --> */}
      <div className="row row-sm">
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
          <div className="card">
            <div className="card-body iconfont text-start">
              <div className="d-flex justify-content-between">
                <h4 className="card-title mb-3">Real time users</h4>
              </div>
              <div className="d-flex mb-0">
                <div className="">
                  <h4 className="mb-1 fw-bold">154<span className="text-success fs-13 ms-2">(+0.98%)</span></h4>
                  <p className="mb-2 fs-12 text-muted">Overview of Last month</p>
                </div>
                <div className="card-chart bg-primary-transparent rounded-circle ms-auto mt-0">
                  <i className="typcn typcn-group-outline text-primary"></i>
                </div>
              </div>

              <div className="progress progress-sm mt-2">
                <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={70} className="progress-bar bg-primary wd-70p" role="progressbar"></div>
              </div>
              <small className="mb-0  text-muted">Monthly<span className="float-end text-muted">70%</span></small>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
          <div className="card">
            <div className="card-body iconfont text-start">
              <div className="d-flex justify-content-between">
                <h4 className="card-title mb-3">Total visits</h4>
              </div>
              <div className="d-flex mb-0">
                <div className="">
                  <h4 className="mb-1 fw-bold">5274<span className="text-danger fs-13 ms-2">(-12.45%)</span></h4>
                  <p className="mb-2 fs-12 text-muted">Overview of Last month</p>
                </div>
                <div className="card-chart bg-pink-transparent rounded-circle ms-auto mt-0">
                  <i className="typcn typcn-chart-line-outline text-pink"></i>
                </div>
              </div>

              <div className="progress progress-sm mt-2">
                <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={70} className="progress-bar bg-pink wd-50p" role="progressbar"></div>
              </div>
              <small className="mb-0  text-muted">Monthly<span className="float-end text-muted">50%</span></small>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
          <div className="card">
            <div className="card-body iconfont text-start">
              <div className="d-flex justify-content-between">
                <h4 className="card-title mb-3">Bounce Rate</h4>
              </div>
              <div className="d-flex mb-0">
                <div className="">
                  <h4 className="mb-1   fw-bold">76.3%<span className="text-success fs-13 ms-2">(+13.52%)</span></h4>
                  <p className="mb-2 fs-12 text-muted">Overview of Last month</p>
                </div>
                <div className="card-chart bg-teal-transparent rounded-circle ms-auto mt-0">
                  <i className="typcn typcn-chart-bar-outline text-teal"></i>
                </div>
              </div>

              <div className="progress progress-sm mt-2">
                <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={70} className="progress-bar bg-teal wd-60p" role="progressbar"></div>
              </div>
              <small className="mb-0  text-muted">Monthly<span className="float-end text-muted">60%</span></small>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
          <div className="card">
            <div className="card-body iconfont text-start">
              <div className="d-flex justify-content-between">
                <h4 className="card-title mb-3">Visits Duration</h4>
              </div>
              <div className="d-flex mb-0">
                <div className="">
                  <h4 className="mb-1 fw-bold">5m 24s<span className="text-success fs-13 ms-2">(+19.5%)</span></h4>
                  <p className="mb-2 fs-12 text-muted">Overview of Last month</p>
                </div>
                <div className="card-chart bg-purple-transparent rounded-circle ms-auto mt-0">
                  <i className="typcn typcn-time  text-purple"></i>
                </div>
              </div>

              <div className="progress progress-sm mt-2">
                <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={70} className="progress-bar bg-purple wd-40p" role="progressbar"></div>
              </div>
              <small className="mb-0  text-muted">Monthly<span className="float-end text-muted">40%</span></small>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /row --> */}

      {/* <!-- row --> */}
      <div className="row row-sm">
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="card-order">
                <h6 className="mb-2">New users</h6>
                <h2 className="text-end "><i className="mdi mdi-account-multiple icon-size float-start text-primary text-primary-shadow"></i><span>3,672</span></h2>
                <p className="mb-0">Monthly users<span className="float-end">50%</span></p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- COL END --> */}
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
          <div className="card ">
            <div className="card-body">
              <div className="card-widget">
                <h6 className="mb-2">Total Tax</h6>
                <h2 className="text-end"><i className="mdi mdi-cube icon-size float-start text-success text-success-shadow"></i><span>$89,265</span></h2>
                <p className="mb-0">Monthly Income<span className="float-end">$7,893</span></p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- COL END --> */}
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="card-widget">
                <h6 className="mb-2">Total Profit</h6>
                <h2 className="text-end"><i className="icon-size mdi mdi-poll-box   float-start text-warning text-warning-shadow"></i><span>$23,987</span></h2>
                <p className="mb-0">Monthly Profit<span className="float-end">$4,678</span></p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- COL END --> */}
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
          <div className="card ">
            <div className="card-body">
              <div className="card-widget">
                <h6 className="mb-2">Total Sales</h6>
                <h2 className="text-end"><i className="mdi mdi-cart-outline icon-size float-start text-danger text-danger-shadow"></i><span>46,486</span></h2>
                <p className="mb-0">Monthly Sales<span className="float-end">3,756</span></p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- COL END --> */}
      </div>
      {/* <!-- /row --> */}

      {/* <!-- row --> */}
      <div className="row row-sm">
        <div className="col-xl-3 col-lg-6 col-sm-6 col-md-6">
          <div className="card text-center">
            <div className="card-body ">
              <div className="feature widget-2 text-center mt-0 mb-3">
                <i className="ti-bar-chart project bg-primary-transparent mx-auto text-primary "></i>
              </div>
              <h6 className="mb-1 text-muted">Total Revenue</h6>
              <h3 className="fw-semibold">$125.465</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-sm-6 col-md-6">
          <div className="card text-center">
            <div className="card-body ">
              <div className="feature widget-2 text-center mt-0 mb-3">
                <i className="ti-pie-chart project bg-pink-transparent mx-auto text-pink "></i>
              </div>
              <h6 className="mb-1 text-muted">Marketing Spend</h6>
              <h3 className="fw-semibold">$75.045</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-sm-6 col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <div className="feature widget-2 text-center mt-0 mb-3">
                <i className="ti-pulse  project bg-teal-transparent mx-auto text-teal "></i>
              </div>
              <h6 className="mb-1 text-muted">Total Profit</h6>
              <h3 className="fw-semibold">$46.352</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-sm-6 col-md-6">
          <div className="card text-center">
            <div className="card-body ">
              <div className="feature widget-2 text-center mt-0 mb-3">
                <i className="ti-stats-up project bg-success-transparent mx-auto text-success "></i>
              </div>
              <h6 className="mb-1 text-muted">Total Investiment</h6>
              <h3 className="fw-semibold">62%</h3>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /row --> */}

      <div className="row">
        {/* <!-- col --> */}
        <div className="col-lg-4 col-md-4">
          <div className="card bg-primary-gradient">
            <div className="card-body">
              <Carousel controls={false} indicators={false}>
                <Carousel.Item className='flex-column'>
                  <i className="si si-social-facebook fs-30 mb-2 text-fixed-white"></i>
                  <p className="text-fixed-white mt-2">12th June</p>
                  <h3 className="text-fixed-white font-light">Now Get <span className="font-bold me-2">20% Off</span>on buy</h3>
                  <div className="text-fixed-white m-t-20">
                    <i>- Trevor	Hart</i>
                  </div>

                </Carousel.Item>
                <Carousel.Item className='flex-column'>
                  <i className="si si-social-google fs-30 text-fixed-white mb-2"></i>
                  <p className="text-fixed-white mt-2">24th July</p>
                  <h3 className="text-fixed-white font-light">Now Get <span className="font-bold me-2">60% Off</span> on buy</h3>
                  <div className="text-fixed-white m-t-20">
                    <i>- Joseph	Vaughan</i>
                  </div>

                </Carousel.Item>
                <Carousel.Item className='flex-column'>
                  <i className="ri-twitter-x-line fs-30 text-fixed-white mb-2"></i>
                  <p className="text-fixed-white mt-2">9th Aug</p>
                  <h3 className="text-fixed-white font-light">Now Get <span className="font-bold me-2">90% Off</span> on buy</h3>
                  <div className="text-fixed-white m-t-20">
                    <i>- Alan	Hemmings</i>
                  </div>

                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
        {/* <!-- col --> */}
        <div className="col-lg-4 col-md-4">
          <div className="card bg-danger-gradient">
            <div className="card-body">
              <Carousel controls={false} indicators={false}>
                <Carousel.Item className='flex-column'>
                  <i className="si si-social-facebook fs-30 text-fixed-white mb-2"></i>
                  <p className="text-fixed-white mt-2">11th June</p>
                  <h3 className="text-fixed-white font-light">Now Get <span className="font-bold me-2">30% Off</span>on buy</h3>
                  <div className="text-fixed-white m-t-20">
                    <i>- Alan Hemmings</i>
                  </div>

                </Carousel.Item>
                <Carousel.Item className='flex-column'>
                  <i className="si si-social-google fs-30 text-fixed-white mb-2"></i>
                  <p className="text-fixed-white mt-2">21st July</p>
                  <h3 className="text-fixed-white font-light">Now Get <span className="font-bold me-2">70% Off</span> on buy</h3>
                  <div className="text-fixed-white m-t-20">
                    <i>- Eric Lee</i>
                  </div>
                </Carousel.Item>
                <Carousel.Item className='flex-column'>
                  <i className="ri-twitter-x-line fs-30 text-fixed-white mb-2"></i>
                  <p className="text-fixed-white mt-2">12th Aug</p>
                  <h3 className="text-fixed-white font-light">Now Get <span className="font-bold me-2">80% Off</span> on buy</h3>
                  <div className="text-fixed-white m-t-20">
                    <i>- Eric Lee</i>
                  </div>

                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
        {/* <!-- col --> */}
        <div className="col-lg-4 col-md-4">
          <div className="card bg-purple-gradient">
            <div className="card-body">
              <Carousel controls={false} indicators={false}>
                <Carousel.Item className='flex-column'>
                  <i className="si si-social-facebook fs-30 text-fixed-white mb-2"></i>
                  <p className="text-fixed-white mt-2">25th June</p>
                  <h3 className="text-fixed-white font-light">Now Get <span className="font-bold me-2">30% Off</span>on buy</h3>
                  <div className="text-fixed-white m-t-20">
                    <i>- Eric Lee</i>
                  </div>

                </Carousel.Item>
                <Carousel.Item className='flex-column'>
                  <i className="si si-social-google fs-30 text-fixed-white mb-2"></i>
                  <p className="text-fixed-white mt-2">6th July</p>
                  <h3 className="text-fixed-white font-light">Now Get <span className="font-bold">70% Off</span> on buy</h3>
                  <div className="text-fixed-white m-t-20">
                    <i>- Eric Lee</i>
                  </div>
                </Carousel.Item>
                <Carousel.Item className='flex-column'>
                  <i className="ri-twitter-x-line fs-30 text-fixed-white mb-2"></i>
                  <p className="text-fixed-white mt-2">7th Aug</p>
                  <h3 className="text-fixed-white font-light">Now Get <span className="font-bold">80% Off</span> on buy</h3>
                  <div className="text-fixed-white m-t-20">
                    <i>- Eric Lee</i>
                  </div>

                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end row --> */}
      {/* <!-- row opened --> */}
      <div className="row row-sm">
        <div className="col-xl-4 col-lg-12 col-xl-4">
          <div className="card">
            <div className="card-header bg-transparent pd-b-0 pd-t-20 bd-b-0">
              <div>
                <h3 className="card-title">Timeline</h3>
              </div>
            </div>
            <div className="card-body">
              <div className="latest-timelines">
                <ul className="timelines mb-0">
                  <li>
                    <div className="featured_icon danger">
                      <i className="fas fa-circle"></i>
                    </div>
                  </li>
                  <li className="mt-0 pb-3">
                    <div><small className="text-muted float-end">23 Sep, 2021</small></div>
                    <Link target="_blank" to="#" className="fw-bold text-dark">Anita Letterback</Link>
                    <p className="text-muted mt-0">Lorem ipsum dolor tempor incididunt ut labore et dolore magna aliqua. </p>
                  </li>
                  <li>
                    <div className="featured_icon success">
                      <i className="fas fa-circle"></i>
                    </div>
                  </li>
                  <li className="mt-0 pb-3">
                    <div><small className="text-muted float-end">16 Aug, 2021</small></div>
                    <Link target="_blank" to="#" className="fw-bold text-dark">Paddy O'Furniture</Link>
                    <p className="text-muted mt-0">Lorem ipsum dolor tempor incididunt ut labore et dolore magna aliqua. </p>
                  </li>
                  <li>
                    <div className="featured_icon primary">
                      <i className="fas fa-circle"></i>
                    </div>
                  </li>
                  <li className="mt-0 pb-3">
                    <div><small className="text-muted float-end">23 Feb, 2021</small></div>
                    <Link target="_blank" to="#" className="fw-bold text-dark">Olive Yew</Link>
                    <p className="text-muted mt-0">Lorem ipsum dolor tempor incididunt ut labore et dolore magna aliqua. </p>
                  </li>
                  <li>
                    <div className="featured_icon warning">
                      <i className="fas fa-circle"></i>
                    </div>
                  </li>
                  <li className="mt-0 pb-3">
                    <div><small className="text-muted float-end">21 june, 2021</small></div>
                    <Link target="_blank" to="#" className="fw-bold text-dark">Maureen Biologist.</Link>
                    <p className="text-muted mt-0">Lorem ipsum dolor tempor incididunt ut labore et dolore magna aliqua. </p>
                  </li>
                  <li>
                    <div className="featured_icon teal">
                      <i className="fas fa-circle"></i>
                    </div>
                  </li>
                  <li className="mt-0 pb-3">
                    <div><small className="text-muted float-end">04 Aug, 2021</small></div>
                    <Link target="_blank" to="#" className="fw-bold text-dark">Peg Legge</Link>
                    <p className="text-muted mt-0">Lorem ipsum dolor tempor incididunt ut labore et dolore magna aliqua. </p>
                  </li>
                  <li>
                    <div className="featured_icon info">
                      <i className="fas fa-circle"></i>
                    </div>
                  </li>
                  <li className="mt-0">
                    <div><small className="text-muted float-end">24 sep, 2021</small></div>
                    <Link target="_blank" to="#" className="fw-bold text-dark">Ivana B. Withew</Link>
                    <p className="text-muted mt-0">Lorem ipsum dolor tempor incididunt ut labore et dolore magna aliqua. </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-xl-4">
          <div className="card">
            <div className="card-body widget-activeprojects">
              <div className="d-flex justify-content-between">
                <h4 className="card-title">Active Projects</h4>
              </div>
              <p className="card-description mb-1">What're people doing right now</p>
              <div className="list d-flex align-items-center border-bottom py-3">
                <div className="avatar d-block cover-image">
                  <img src={imagesData('face5')} className="rounded-circle" alt="img" />
                  <span className="avatar-status bg-green"></span>
                </div>
                <div className="wrapper w-100 ms-3">
                  <p className="mb-0">
                    <b>Lilly </b>posted in Website</p>
                  <div className="d-sm-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="mdi mdi-clock text-muted me-1 fs-11"></i>
                      <p className="mb-0">Awesome websites!</p>
                    </div>
                    <small className="text-muted ms-auto">2 hours ago</small>
                  </div>
                </div>
              </div>
              <div className="list d-flex align-items-center border-bottom py-3">
                <div className="avatar d-block cover-image">
                  <img src={imagesData('face1')} className="rounded-circle" alt="img" />
                  <span className="avatar-status bg-green"></span>
                </div>
                <div className="wrapper w-100 ms-3">
                  <p className="mb-0">
                    <b>Thomos</b>posted in Material</p>
                  <div className="d-sm-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="mdi mdi-clock text-muted me-1 fs-11"></i>
                      <p className="mb-0">Awesome websites!</p>
                    </div>
                    <small className="text-muted ms-auto">3 hours ago</small>
                  </div>
                </div>
              </div>
              <div className="list d-flex align-items-center border-bottom py-3">
                <div className="avatar d-block cover-image">
                  <img src={imagesData('face14')} className="rounded-circle" alt="img" />
                  <span className="avatar-status bg-green"></span>
                </div>
                <div className="wrapper w-100 ms-3">
                  <p className="mb-0">
                    <b>Marry cott </b>posted in photo</p>
                  <div className="d-sm-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="mdi mdi-clock text-muted me-1 fs-11"></i>
                      <p className="mb-0">That's Great!</p>
                    </div>
                    <small className="text-muted ms-auto">1 hours ago</small>
                  </div>
                </div>
              </div>
              <div className="list d-flex align-items-center border-bottom py-3">
                <div className="avatar d-block cover-image">
                  <img src={imagesData('face1')} className="rounded-circle" alt="img" />
                  <span className="avatar-status bg-green"></span>
                </div>
                <div className="wrapper w-100 ms-3">
                  <p className="mb-0">
                    <b>Thomos</b>posted in Material</p>
                  <div className="d-sm-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="mdi mdi-clock text-muted me-1 fs-11"></i>
                      <p className="mb-0">Awesome websites!</p>
                    </div>
                    <small className="text-muted ms-auto">3 hours ago</small>
                  </div>
                </div>
              </div>
              <div className="list d-flex align-items-center pt-3">
                <div className="avatar d-block cover-image">
                  <img src={imagesData('face4')} className="rounded-circle" alt="img" />
                  <span className="avatar-status bg-green"></span>
                </div>
                <div className="wrapper w-100 ms-3">
                  <p className="mb-0">
                    <b>John </b>posted in Status</p>
                  <div className="d-sm-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="mdi mdi-clock text-muted me-1 fs-11"></i>
                      <p className="mb-0">Awesome websites!</p>
                    </div>
                    <small className="text-muted ms-auto">1 hours ago</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="">
                  <h6>All Visitors</h6>
                  <h1 className="mt-2 mb-3 display-6 fw-semibold text-dark fs-30">31,648</h1>
                  <div className="progress progress-style progress-xs">
                    <div className="progress-bar bg-primary-gradient wd-90p" role="progressbar" aria-valuenow={78} aria-valuemin={0} aria-valuemax={78}></div>
                  </div>
                </div>
                <div className="feature d-flex flex-column align-items-cente">
                  <div className="d-inline-flex align-items-center">
                    <i className="icon icon-user me-2"></i>
                    <b className="me-1">32,730</b> Male
                  </div>
                  <div className="d-inline-flex align-items-center mt-3">
                    <i className="icon icon-user-female me-2"></i>
                    <b className="me-1"> 42,948 </b> Female
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="">
                  <h6>New Visitors</h6>
                  <h1 className="mt-2 mb-3 display-6 fw-semibold text-dark fs-30">64,858</h1>
                  <div className="progress progress-style progress-xs">
                    <div className="progress-bar bg-danger-gradient wd-75p" role="progressbar" aria-valuenow={78} aria-valuemin={0} aria-valuemax={78}></div>
                  </div>
                </div>
                <div className="feature d-flex flex-column align-items-cente">
                  <div className="d-inline-flex align-items-center">
                    <i className="icon icon-user me-2"></i>
                    <b className="me-1">20,818 </b> Male
                  </div>
                  <div className="d-inline-flex align-items-center mt-3">
                    <i className="icon icon-user-female me-2"></i>
                    <b className="me-1"> 17,350</b> Female
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="">
                  <h6>Returning Visitors</h6>
                  <h1 className="mt-2 mb-3 display-6 fw-semibold text-dark fs-30">80,115</h1>
                  <div className="progress progress-style progress-xs">
                    <div className="progress-bar bg-warning-gradient wd-85" role="progressbar" aria-valuenow={45} aria-valuemin={0} aria-valuemax={45}></div>
                  </div>
                </div>
                <div className="feature d-flex flex-column align-items-cente">
                  <div className="d-inline-flex align-items-center">
                    <i className="icon icon-user me-2"></i>
                    <b className="me-1"> 29,350</b> Male
                  </div>
                  <div className="d-inline-flex align-items-center mt-3">
                    <i className="icon icon-user-female me-2"></i>
                    <b className="me-1"> 10,718</b> Female
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- row close --> */}

      {/* <!-- row --> */}
      <div className="row row-sm">
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
          <div className="card">
            <div className="card-header bg-transparent pd-b-0 pd-t-20 bd-b-0 d-block">
              <div className="d-flex justify-content-between">
                <h4 className="card-title mg-b-10">Overall Rating</h4>
              </div>
              <p className="fs-12 tx-gray-500 mb-0">Opinion of a customer on the product in the form of ratings 5-star rating. <Link to="#">Learn more</Link></p>
            </div>
            {/* <!-- card-header --> */}
            <div className="card-body py-2">
              <div className="d-flex align-items-baseline">
                <h1 className="fs-30 me-2">4.8</h1>
                <p className="fs-11  mg-b-0"><span className="tx-medium tx-success">1.6% <i className="icon ion-md-arrow-up"></i></span></p>
              </div>
              <p className="text-uppercase fw-semibold fs-12 mb-2">Overall product rating by the customers.</p>
              <table className="table table-borderless mt-3  border-0 rating-table">
                <tbody>
                  <tr>
                    <td className="text-gray"><small className="me-1">1</small></td>
                    <td className="text-gray"><span><i className="ion ion-md-star fs-18 text-warning"></i></span></td>
                    <td className="w-100">
                      <div className="progress mt-2 ht-5">
                        <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={80} className="progress-bar wd-20p bg-danger" role="progressbar"></div>
                      </div>
                    </td>
                    <td className=""><small className="text-gray">7</small></td>
                  </tr>
                  <tr>
                    <td className="text-gray"><small className="me-1">2</small></td>
                    <td className="text-gray"><span><i className="ion ion-md-star fs-18 text-warning"></i></span></td>
                    <td className="w-100">
                      <div className="progress mt-2 ht-5">
                        <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={80} className="progress-bar wd-30p bg-primary" role="progressbar"></div>
                      </div>
                    </td>
                    <td className=""><small className="text-gray">27</small></td>
                  </tr>
                  <tr>
                    <td className="text-gray"><small className="me-1">3</small></td>
                    <td className="text-gray"><span><i className="ion ion-md-star fs-18 text-warning"></i></span></td>
                    <td className="w-100">
                      <div className="progress mt-2 ht-5">
                        <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={80} className="progress-bar wd-60p bg-warning" role="progressbar"></div>
                      </div>
                    </td>
                    <td className=""><small className="text-gray">64</small></td>
                  </tr>
                  <tr>
                    <td className="text-gray"><small className="me-1">4</small></td>
                    <td className="text-gray"><span><i className="ion ion-md-star fs-18 text-warning"></i></span></td>
                    <td className="w-100">
                      <div className="progress mt-2 ht-5">
                        <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={80} className="progress-bar wd-70p bg-teal" role="progressbar"></div>
                      </div>
                    </td>
                    <td className=""><small className="text-gray">93</small></td>
                  </tr>
                  <tr>
                    <td className="text-gray"><small className="me-1">5</small></td>
                    <td className="text-gray"><span><i className="ion ion-md-star fs-18 text-warning"></i></span></td>
                    <td className="w-100">
                      <div className="progress mt-2 ht-5">
                        <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={80} className="progress-bar wd-80p bg-success" role="progressbar"></div>
                      </div>
                    </td>
                    <td className=""><small className="text-gray">82</small></td>
                  </tr>
                </tbody>
              </table>
              <div className="wrapper d-flex justify-content-center image-group pb-3">
                <img src={imagesData('face1')} alt="profile" className="img-xs rounded-circle" />
                <img src={imagesData('face2')} alt="profile" className="img-xs rounded-circle" />
                <img src={imagesData('face13')} alt="profile" className="img-xs rounded-circle" />
                <img src={imagesData('face14')} alt="profile" className="img-xs rounded-circle" />
                <img src={imagesData('face5')} alt="profile" className="img-xs rounded-circle" />
                <img src={imagesData('face16')} alt="profile" className="img-xs rounded-circle" />
              </div>
            </div>
            {/* <!-- card-body --> */}
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
          <div className="card order-list">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4 className="card-title mg-b-10">Order Activity</h4>
              </div>
              <p className="fs-12 tx-gray-500 mb-3">Order Activity is ecommerce platforms to track the orders placed on their stores <Link to="#">Learn more</Link></p>
              <ul className="list list-noborders pb-0 mb-0 ps-0">
                <li className="list-item">
                  <img className="img-sm rounded-circle bg-warning d-flex align-items-center justify-content-center text-white" src={imagesData('face3')} alt="Profile Image" />
                  <div className=" ms-3">
                    <h6 className="mb-1 font-weight-medium">Lottie Arnold</h6>
                    <p className="mb-0 text-muted fs-13">#PRD-10250</p>
                  </div>
                  <div className="ms-auto d-flex">
                    <img className="img-sm me-1" src={imagesData('ecommerce17')} alt="thumb images" />
                    <img className="img-sm" src={imagesData('ecommerce22')} alt="thumb images" />
                  </div>
                </li>
                <li className="list-item">
                  <img className="img-sm rounded-circle bg-warning d-flex align-items-center justify-content-center text-white" src={imagesData('face9')} alt="Profile Image" />
                  <div className=" ms-3">
                    <h6 className="mb-1 font-weight-medium">Alan Macedo</h6>
                    <p className="mb-0 fs-13 text-muted">#PRD-10251</p>
                  </div>
                  <div className="ms-auto d-flex">
                    <img className="img-sm me-1" src={imagesData('ecommerce18')} alt="thumb images" />
                    <img className="img-sm" src={imagesData('ecommerce19')} alt="thumb images" />
                  </div>
                </li>
                <li className="list-item">
                  <img className="img-sm rounded-circle bg-warning d-flex align-items-center justify-content-center text-white" src={imagesData('face5')} alt="Profile Image" />
                  <div className=" ms-3">
                    <h6 className="mb-1 font-weight-medium">Bruce Tran</h6>
                    <p className="mb-0 text-muted fs-13">#PRD-10252</p>
                  </div>
                  <div className="ms-auto d-flex">
                    <img className="img-sm me-1" src={imagesData('ecommerce20')} alt="thumb images" />
                    <img className="img-sm" src={imagesData('ecommerce21')} alt="thumb images" />
                  </div>
                </li>
                <li className="list-item">
                  <img className="img-sm rounded-circle bg-warning d-flex align-items-center justify-content-center text-white" src={imagesData('face9')} alt="Profile Image" />
                  <div className=" ms-3">
                    <h6 className="mb-1 font-weight-medium">Alan Macedo</h6>
                    <p className="mb-0 fs-13 text-muted">#PRD-10251</p>
                  </div>
                  <div className="ms-auto d-flex">
                    <img className="img-sm me-1" src={imagesData('ecommerce18')} alt="thumb images" />
                    <img className="img-sm" src={imagesData('ecommerce19')} alt="thumb images" />
                  </div>
                </li>
                <li className="list-item">
                  <img className="img-sm rounded-circle bg-warning d-flex align-items-center justify-content-center text-white" src={imagesData('face12')} alt="Profile Image" />
                  <div className=" ms-3">
                    <h6 className="mb-1 font-weight-medium">Mina Harper</h6>
                    <p className="mb-0 text-muted fs-13">#PRD-10253</p>
                  </div>
                  <div className="ms-auto d-flex">
                    <img className="img-sm me-1" src={imagesData('ecommerce22')} alt="thumb images" />
                    <img className="img-sm" src={imagesData('ecommerce23')} alt="thumb images" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xl-4 col-md-6 col-sm-12">
          <div className="card overflow-hidden widget-tasks latest-tasks">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <div className="">
                <div className="d-flex justify-content-between ps-4 pt-4 pe-4">
                  <h4 className="card-title mg-b-10">Latest Task</h4>
                </div>
                <div className="">
                  <Nav as='ul' variant="pills" className="nav-tabs-line nav-tabs-line-brand nav-tabs-bold border-0">
                    <Nav.Item as='li'><Nav.Link eventKey="first">Today</Nav.Link></Nav.Item>
                    <Nav.Item as='li'><Nav.Link eventKey="second">Week</Nav.Link></Nav.Item>
                    <Nav.Item as='li'><Nav.Link eventKey="third">Month</Nav.Link></Nav.Item>
                  </Nav>
                </div>
              </div>
              <div className="card-body pt-3 p-0">
                <Tab.Content>
                  <Tab.Pane className='border-0 fade' eventKey="first">
                    <div className="">
                      <div className="tasks">
                        <div className=" task-line primary">
                          <Link to="#" className="span">
                            XML Import & Export
                          </Link>
                          <div className="time">
                            12:00 PM
                          </div>
                        </div>
                        <label className="checkbox">
                          <span className="check-box">
                            <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked1" defaultChecked /><span></span></span>
                          </span>
                        </label>
                      </div>
                      <div className="tasks">
                        <div className="task-line pink">
                          <Link to="#" className="span">
                            Database Optimization
                          </Link>
                          <div className="time">
                            02:13 PM
                          </div>
                        </div>
                        <label className="checkbox">
                          <span className="check-box">
                            <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked2" /><span></span></span>
                          </span>
                        </label>
                      </div>
                      <div className="tasks">
                        <div className="task-line success">
                          <Link to="#" className="span">
                            Create Wireframes
                          </Link>
                          <div className="time">
                            06:20 PM
                          </div>
                        </div>
                        <label className="checkbox">
                          <span className="check-box">
                            <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked3" /><span></span></span>
                          </span>
                        </label>
                      </div>
                      <div className="tasks">
                        <div className="task-line warning">
                          <Link to="#" className="span">
                            Develop MVP
                          </Link>
                          <div className="time">
                            10: 00 PM
                          </div>
                        </div>
                        <label className="checkbox">
                          <span className="check-box">
                            <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked4" /><span></span></span>
                          </span>
                        </label>
                      </div>
                      <div className="tasks mb-0">
                        <div className="task-line teal">
                          <Link to="#" className="span">
                            Design Evommerce
                          </Link>
                          <div className="time">
                            10: 00 PM
                          </div>
                        </div>
                        <label className="checkbox">
                          <span className="check-box">
                            <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked5" /><span></span></span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane className='border-0 fade' eventKey="second">
                    <div className="">
                      <div className="tasks">
                        <div className=" task-line teal">
                          <Link to="#" className="span">
                            Management meeting
                          </Link>
                          <div className="time">
                            06:30 AM
                          </div>
                        </div>
                        <label className="checkbox">
                          <span className="check-box">
                            <span className="ckbox"><input type="checkbox" /><span></span></span>
                          </span>
                        </label>
                      </div>
                      <div className="tasks">
                        <div className="task-line danger">
                          <Link to="#" className="span">
                            Connect API to pages
                          </Link>
                          <div className="time">
                            08:00 AM
                          </div>
                        </div>
                        <label className="checkbox">
                          <span className="check-box">
                            <span className="ckbox"><input type="checkbox" /><span></span></span>
                          </span>
                        </label>
                      </div>
                      <div className="tasks">
                        <div className="task-line purple">
                          <Link to="#" className="span">
                            Icon change in Redesign App
                          </Link>
                          <div className="time">
                            11:20 AM
                          </div>
                        </div>
                        <label className="checkbox">
                          <span className="check-box">
                            <span className="ckbox"><input type="checkbox" /><span></span></span>
                          </span>
                        </label>
                      </div>
                      <div className="tasks">
                        <div className="task-line warning">
                          <Link to="#" className="span">
                            Test new features in tablets
                          </Link>
                          <div className="time">
                            02: 00 PM
                          </div>
                        </div>
                        <label className="checkbox">
                          <span className="check-box">
                            <span className="ckbox"><input type="checkbox" /><span></span></span>
                          </span>
                        </label>
                      </div>
                      <div className="tasks">
                        <div className="task-line success">
                          <Link to="#" className="span">
                            Design Logo
                          </Link>
                          <div className="time">
                            04: 00 PM
                          </div>
                        </div>
                        <label className="checkbox">
                          <span className="check-box">
                            <span className="ckbox"><input type="checkbox" /><span></span></span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane className='border-0 fade' eventKey="third">
                    <div className="">
                      <div className="tasks">
                        <div className=" task-line info">
                          <Link to="#" className="span">
                            Design a Landing Page
                          </Link>
                          <div className="time">
                            06:12 AM
                          </div>
                        </div>
                        <label className="checkbox">
                          <span className="check-box">
                            <span className="ckbox"><input type="checkbox" /><span></span></span>
                          </span>
                        </label>
                      </div>
                      <div className="tasks">
                        <div className="task-line danger">
                          <Link to="#" className="span">
                            Food Delivery Application
                          </Link>
                          <div className="time">
                            3:00 PM
                          </div>
                        </div>
                        <label className="checkbox">
                          <span className="check-box">
                            <span className="ckbox"><input type="checkbox" /><span></span></span>
                          </span>
                        </label>
                      </div>
                      <div className="tasks">
                        <div className="task-line warning">
                          <Link to="#" className="span">
                            Export Database values
                          </Link>
                          <div className="time">
                            03:20 PM
                          </div>
                        </div>
                        <label className="checkbox">
                          <span className="check-box">
                            <span className="ckbox"><input type="checkbox" /><span></span></span>
                          </span>
                        </label>
                      </div>
                      <div className="tasks">
                        <div className="task-line pink">
                          <Link to="#" className="span">
                            Write Simple Python Script
                          </Link>
                          <div className="time">
                            04: 00 PM
                          </div>
                        </div>
                        <label className="checkbox">
                          <span className="check-box">
                            <span className="ckbox"><input type="checkbox" /><span></span></span>
                          </span>
                        </label>
                      </div>
                      <div className="tasks">
                        <div className="task-line success">
                          <Link to="#" className="span">
                            Write Simple Program
                          </Link>
                          <div className="time">
                            05: 00 PM
                          </div>
                        </div>
                        <label className="checkbox">
                          <span className="check-box">
                            <span className="ckbox"><input type="checkbox" /><span></span></span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>

              </div>
            </Tab.Container>
          </div>
        </div>

        <div className="col-md-6 col-lg-6 col-xl-4 col-sm-12">
          <div className="card">
            <div className="card-header pb-0">
              <div className="d-flex justify-content-between">
                <h4 className="card-title">Latest Ratings and Reviews</h4>
              </div>
            </div>
            <p className="fs-12 tx-gray-500 mb-0 ps-3 pe-3 mb-2">A review is an evaluation of a publication, service, or company .<Link to="#">Learn more</Link></p>
            <div className="rating-scroll overflow-auto">
              <div className="ps-3 pe-3 py-3 border-bottom">
                <div className="media mt-0">
                  <div className="d-flex me-3">
                    <Link to="#">
                      <img className="media-object avatar rounded-circle w-7 h-7" alt="64x64" src={imagesData('face5')} />
                    </Link>
                  </div>
                  <div className="media-body">
                    <div className="d-flex">
                      <h6 className="mt-0 mb-0 fw-semibold ">Joanne Scott</h6>
                      <span className="fs-12 ms-auto">
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star-half text-warning"></i>
                      </span>
                    </div>
                    <div className="d-flex">
                      <p className="fs-12 text-muted mb-0">long established fact..</p>
                      <small className="ms-auto text-end">5 reviews</small>
                    </div>

                  </div>
                </div>
              </div>
              <div className="ps-3 pe-3 py-3 border-bottom">
                <div className="media mt-0">
                  <div className="d-flex me-3">
                    <Link to="#">
                      <img className="media-object avatar rounded-circle w-7 h-7" alt="64x64" src={imagesData('face9')} />
                    </Link>
                  </div>
                  <div className="media-body">
                    <div className="d-flex">
                      <h6 className="mt-0 mb-0 fw-semibold ">Cristobal Sharp</h6>
                      <span className="fs-12 ms-auto">
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star-half text-warning"></i>
                        <i className="ion ion-md-star-outline text-warning"></i>
                      </span>
                    </div>
                    <div className="d-flex">
                      <p className="fs-12 text-muted mb-0">The point of using Lorem..</p>
                      <small className="ms-auto text-end">5 reviews</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ps-3 pe-3 py-3 border-bottom">
                <div className="media mt-0">
                  <div className="d-flex me-3">
                    <Link to="#">
                      <img className="media-object avatar rounded-circle w-7 h-7" alt="64x64" src={imagesData('face4')} />
                    </Link>
                  </div>
                  <div className="media-body">
                    <div className="d-flex">
                      <h6 className="mt-0 mb-0 fw-semibold ">Velma Wellons </h6>
                      <span className="fs-12 ms-auto">
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star-half text-warning"></i>
                      </span>
                    </div>
                    <div className="d-flex">
                      <p className="fs-12 text-muted mb-0">Various versions have..</p>
                      <small className="ms-auto text-end">5 reviews</small>
                    </div>

                  </div>
                </div>
              </div>
              <div className="ps-3 pe-3 py-3 border-bottom">
                <div className="media mt-0">
                  <div className="d-flex me-3">
                    <Link to="#">
                      <img className="media-object avatar rounded-circle w-7 h-7" alt="64x64" src={imagesData('face7')} />
                    </Link>
                  </div>
                  <div className="media-body">
                    <div className="d-flex">
                      <h6 className="mt-0 mb-0 fw-semibold ">Cathie Madonna </h6>
                      <span className="fs-12 ms-auto">
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star-half text-warning"></i>
                        <i className="ion ion-md-star-outline text-warning"></i>
                      </span>
                    </div>
                    <div className="d-flex">
                      <p className="fs-12 text-muted mb-0">long established fact..</p>
                      <small className="ms-auto text-end">5 reviews</small>
                    </div>

                  </div>
                </div>
              </div>
              <div className="ps-3 pe-3 py-3 border-bottom">
                <div className="media mt-0">
                  <div className="d-flex me-3">
                    <Link to="#">
                      <img className="media-object avatar rounded-circle w-7 h-7" alt="64x64" src={imagesData('face12')} />
                    </Link>
                  </div>
                  <div className="media-body">
                    <div className="d-flex">
                      <h6 className="mt-0 mb-0 fw-semibold ">Aurelio Dahmer </h6>
                      <span className="fs-12 ms-auto">
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star-half text-warning"></i>
                      </span>
                    </div>
                    <div className="d-flex">
                      <p className="fs-12 text-muted mb-0">Ut enim ad minim veniam..</p>
                      <small className="ms-auto text-end">5 reviews</small>
                    </div>

                  </div>
                </div>
              </div>
              <div className="ps-3 pe-3 py-3 border-bottom">
                <div className="media mt-0">
                  <div className="d-flex me-3">
                    <Link to="#">
                      <img className="media-object avatar rounded-circle w-7 h-7" alt="64x64" src={imagesData('face13')} />
                    </Link>
                  </div>
                  <div className="media-body">
                    <div className="d-flex">
                      <h6 className="mt-0 mb-1 fw-semibold ">Cyrus Macarthur </h6>
                      <span className="fs-12 ms-auto">
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star-half text-warning"></i>
                        <i className="ion ion-md-star-outline text-warning"></i>
                      </span>
                    </div>
                    <div className="d-flex">
                      <p className="fs-12 text-muted mb-0">variations of passages..</p>
                      <small className="ms-auto text-end">5 reviews</small>
                    </div>

                  </div>
                </div>
              </div>
              <div className="ps-3 pe-3 py-3 border-bottom">
                <div className="media mt-0">
                  <div className="d-flex me-3">
                    <Link to="#">
                      <img className="media-object avatar rounded-circle w-7 h-7" alt="64x64" src={imagesData('face2')} />
                    </Link>
                  </div>
                  <div className="media-body">
                    <div className="d-flex">
                      <h6 className="mt-0 mb-1 fw-semibold ">Bernardo Sykes </h6>
                      <span className="fs-12 ms-auto">
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star-half text-warning"></i>
                        <i className="ion ion-md-star-outline text-warning"></i>
                      </span>
                    </div>
                    <div className="d-flex">
                      <p className="fs-12 text-muted mb-0">you are going to use..</p>
                      <small className="ms-auto text-end">5 reviews</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-4">
          <div className="card">
            <div className="card-header bg-transparent pd-b-0 pd-t-20 bd-b-0 d-block">
              <div className="d-flex justify-content-between">
                <h4 className="card-title mg-b-10">Sessions by Countries</h4>
              </div>
              <p className="fs-12 tx-gray-500 mb-0">session by country mean that the user is from the stated country or that the session is originating in the stated country. <Link to="#">Learn more</Link></p>
            </div>
            <div className="card-body">
              <ul className="sales-session mb-0">
                <li>
                  <div className="d-flex justify-content-between">
                    <h6>1. United States </h6>
                    <p className="fw-semibold mb-2">$273.12 <span className="text-muted font-weight-normal">(2.17%)</span></p>
                  </div>
                  <div className="progress  ht-5">
                    <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={50} className="progress-bar wd-60p bg-primary" role="progressbar"></div>
                  </div>
                </li>
                <li>
                  <div className="d-flex justify-content-between">
                    <h6>2. United kingdom</h6>
                    <p className="fw-semibold mb-2">$423.10 <span className="text-muted font-weight-normal">(12.43%)</span></p>
                  </div>
                  <div className="progress  ht-5">
                    <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={50} className="progress-bar wd-70p bg-info" role="progressbar"></div>
                  </div>
                </li>
                <li>
                  <div className="d-flex justify-content-between">
                    <h6>3. Australia</h6>
                    <p className="fw-semibold mb-2">$547.18 <span className="text-muted font-weight-normal">(3.14%)</span></p>
                  </div>
                  <div className="progress  ht-5">
                    <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={60} className="progress-bar wd-60p bg-danger" role="progressbar"></div>
                  </div>
                </li>
                <li>
                  <div className="d-flex justify-content-between">
                    <h6>4. Canada</h6>
                    <p className="fw-semibold mb-2">$728.32 <span className="text-muted font-weight-normal">(7.23%)</span></p>
                  </div>
                  <div className="progress  ht-5">
                    <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={50} className="progress-bar wd-50p bg-warning" role="progressbar"></div>
                  </div>
                </li>
                <li>
                  <div className="d-flex justify-content-between">
                    <h6>5. Russia</h6>
                    <p className="fw-semibold mb-2">$843.19 <span className="text-muted font-weight-normal">(1.83%)</span></p>
                  </div>
                  <div className="progress mb-0 ht-5">
                    <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={50} className="progress-bar wd-40p bg-success" role="progressbar"></div>
                  </div>
                </li>
                <li className="mb-0 pb-1">
                  <div className="d-flex justify-content-between">
                    <h6>6. Japan</h6>
                    <p className="fw-semibold mb-2">$562.19 <span className="text-muted font-weight-normal">(1.35%)</span></p>
                  </div>
                  <div className="progress mb-0 ht-5">
                    <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={50} className="progress-bar wd-60p bg-purple" role="progressbar"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-6  col-xl-4 col-sm-12">
          <div className="card">
            <div className="card-header d-block">
              <div className="d-flex justify-content-between">
                <h4 className="card-title">Browser Usage</h4>
              </div>
              <p className="fs-12 tx-gray-500 mb-0">Tells you where your visitors originated from, such as search engines, social networks or website referrals. <Link to="#">Learn more</Link></p>
            </div>
            {/* <!-- card-header --> */}
            <div className="card-body p-0">
              <div className="browser-stats">
                <div className="d-flex align-items-center item  border-bottom">
                  <div className="d-flex">
                    <img src={imagesData('svg7')} alt="img" className="ht-30 wd-30 me-2" />
                    <div className="">
                      <h6 className="">Chrome</h6>
                      <span className="sub-text">Mozilla Foundation, Inc.</span>
                    </div>
                  </div>
                  <div className="ms-auto my-auto">
                    <div className="d-flex">
                      <span className="me-4 my-auto">35,502</span>
                      <span className="text-success fs-15"><i className="fe fe-arrow-up"></i>12.75%</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center item  border-bottom">
                  <div className="d-flex">
                    <img src={imagesData('svg20')} alt="img" className="ht-30 wd-30 me-2" />
                    <div className="">
                      <h6 className="">Opera</h6>
                      <span className="sub-text">Mozilla Foundation, Inc.</span>
                    </div>
                  </div>
                  <div className="ms-auto my-auto">
                    <div className="d-flex">
                      <span className="me-4 my-auto">12,563</span>
                      <span className="text-danger"><i className="fe fe-arrow-down"></i>15.12%</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center item  border-bottom">
                  <div className="d-flex">
                    <img src={imagesData('svg8')} alt="img" className="ht-30 wd-30 me-2" />
                    <div className="">
                      <h6 className="">Edge</h6>
                      <span className="sub-text">Mozilla Foundation, Inc.</span>
                    </div>
                  </div>
                  <div className="ms-auto my-auto">
                    <div className="d-flex">
                      <span className="me-4 mt-1">25,364</span>
                      <span className="text-success"><i className="fe fe-arrow-up"></i>24.37%</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center item  border-bottom">
                  <div className="d-flex">
                    <img src={imagesData('svg10')} alt="img" className="ht-30 wd-30 me-2" />
                    <div className="">
                      <h6 className="">Firefox</h6>
                      <span className="sub-text">Mozilla Foundation, Inc.</span>
                    </div>
                  </div>
                  <div className="ms-auto my-auto">
                    <div className="d-flex">
                      <span className="me-4 mt-1">14,635</span>
                      <span className="text-success"><i className="fe fe-arrow-up"></i>15,63%</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center item border-bottom">
                  <div className="d-flex">
                    <img src={imagesData('svg33')} alt="img" className="ht-30 wd-30 me-2" />
                    <div className="">
                      <h6 className="">Ucbrowser</h6>
                      <span className="sub-text">Mozilla Foundation, Inc.</span>
                    </div>
                  </div>
                  <div className="ms-auto my-auto">
                    <div className="d-flex">
                      <span className="me-4 mt-1">15,453</span>
                      <span className="text-danger"><i className="fe fe-arrow-down"></i>23.70%</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center item">
                  <div className="d-flex">
                    <img src={imagesData('svg28')} alt="img" className="ht-30 wd-30 me-2" />
                    <div className="">
                      <h6 className="">Safari</h6>
                      <span className="sub-text">Mozilla Foundation, Inc.</span>
                    </div>
                  </div>
                  <div className="ms-auto my-auto">
                    <div className="d-flex">
                      <span className="me-4 mt-1">35,657</span>
                      <span className="text-danger"><i className="fe fe-arrow-down"></i>12.54%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- card --> */}
        </div>
      </div>
      {/* <!-- /row --> */}

    </Fragment>
  );

};

export default Widgets;
