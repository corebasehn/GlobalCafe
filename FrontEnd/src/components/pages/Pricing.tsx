import { Fragment } from 'react';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { Nav, Tab } from 'react-bootstrap';

const Pricing = () => {
  return (
    <Fragment>

      <Pageheader title="PRICING" heading="Pages" active="Pricing" />

      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-lg-6 col-xxl-3 col-xl-6 col-md-6 col-sm-12">
          <div className="card p-3 pricing-card">
            <div className="card-header pt-2 d-block">
              <p className="fs-18 fw-semibold mb-1">Basic</p>
              <p className="fw-semibold mb-1"> <span className="fs-30 me-2">$</span><span className="fs-30 me-1">0</span><span className="fs-24"><span className="op-5 text-muted tx-20">/</span> month</span></p>
              <p className="fs-13 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quos debitis aliquam .</p>
              <p className="fs-13 mb-1 text-primary font-weight-">Billed monthly on regular basis!</p>
            </div>
            <div className="card-body pt-2">
              <ul className="pricing-body text-muted ps-0">
                <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span>  <strong> 2 Free</strong> Domain Name</li>
                <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong>3 </strong> One-Click Apps</li>
                <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 1 </strong> Databases</li>
                <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> Money </strong> BackGuarantee</li>
                <li className="mb-6"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 24/7</strong> support</li>
              </ul>
            </div>
            <div className="card-footer text-center border-top-0 pt-1">
              <button className="btn btn-lg btn-primary text-fixed-white btn-block">
                <span className="ms-4 me-4">Select</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xxl-3 col-xl-6 col-md-6 col-sm-12">
          <div className="card p-3 pricing-card">
            <div className="card-header pt-2 d-block">
              <p className="fs-18 fw-semibold mb-1 pe-0">Advanced<span className=" tx-11 float-end badge bg-primary text-fixed-white px-2 py-1 rounded-pill mt-2">Most Popular</span></p>
              <p className="fw-semibold mb-1"> <span className="fs-30 me-2">$</span><span className="fs-30 me-1">1,299</span><span className="fs-24"><span className="op-5 text-muted tx-20">/</span> month</span></p>
              <p className="fs-13 mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quos debitis aliquam .</p>
              <p className="fs-13 mb-1 text-primary font-weight-">Billed monthly on regular basis!</p>
            </div>
            <div className="card-body pt-2">
              <ul className="pricing-body text-muted ps-0">
                <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span>  <strong> 5 Free</strong> Domain Name</li>
                <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong>5 </strong> One-Click Apps</li>
                <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 3 </strong> Databases</li>
                <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> Money </strong> BackGuarantee</li>
                <li className="mb-6"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 24/7</strong> support</li>
              </ul>
            </div>
            <div className="card-footer text-center border-top-0 pt-1">
              <button className="btn btn-lg btn-primary text-fixed-white btn-block">
                <span className="ms-4 me-4">Select</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xxl-3 col-xl-6 col-md-6 col-sm-12">
          <div className="card p-3 pricing-card">
            <div className="card-header pt-2 d-block">
              <p className="fs-18 fw-semibold mb-1">Regular</p>
              <p className="fw-semibold mb-1"> <span className="fs-30 me-2">$</span><span className="fs-30 me-1">79.9</span><span className="fs-24"><span className="op-5 text-muted tx-20">/</span> month</span></p>
              <p className="fs-13 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quos debitis aliquam .</p>
              <p className="fs-13 mb-1 text-primary font-weight-">Billed monthly on regular basis!</p>
            </div>
            <div className="card-body pt-2">
              <ul className="pricing-body text-muted ps-0">
                <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span>  <strong> 1 Free</strong> Domain Name</li>
                <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong>4 </strong> One-Click Apps</li>
                <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 2 </strong> Databases</li>
                <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> Money </strong> BackGuarantee</li>
                <li className="mb-6"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 24/7</strong> support</li>
              </ul>
            </div>
            <div className="card-footer text-center border-top-0 pt-1">
              <button className="btn btn-lg btn-primary text-fixed-white btn-block">
                <span className="ms-4 me-4">Select</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xxl-3 col-xl-6 col-md-6 col-sm-12">
          <div className="card p-3 pricing-card">
            <div className="card-header  pt-2 d-block">
              <p className="fs-18 fw-semibold mb-1">Premium</p>
              <p className="fw-semibold mb-1"> <span className="fs-30 me-2">$</span><span className="fs-30 me-1">579.9</span><span className="fs-24"><span className="op-5 text-muted tx-20">/</span> month</span></p>
              <p className="fs-13 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quos debitis aliquam .</p>
              <p className="fs-13 mb-1 text-primary font-weight-">Billed monthly on regular basis!</p>
            </div>
            <div className="card-body pt-2">
              <ul className="pricing-body text-muted ps-0">
                <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span>  <strong> 1 Free</strong> Domain Name</li>
                <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong>5 </strong> One-Click Apps</li>
                <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 3 </strong> Databases</li>
                <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> Money </strong> BackGuarantee</li>
                <li className="mb-6"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 24/7</strong> support</li>
              </ul>
            </div>
            <div className="card-footer text-center border-top-0 pt-1">
              <button className="btn btn-lg btn-primary text-fixed-white btn-block">
                <span className="ms-4 me-4">Select</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-lg-6 col-xxl-3 col-xl-6 col-md-6 col-sm-12">
          <div className="card p-3 pricing-card">
            <div className="card-header pt-2 d-block">
              <p className="fs-18 fw-semibold mb-1">Business</p>
              <p className="fs-13 mb-1 text-muted">For Basic Business purpose !</p>
              <p className="fs-13 mb-1 fw-semibold">Best price is $29</p>
            </div>
            <div className="card-body pt-2 pb-0">
              <ul className="pricing-body text-muted ps-0 mb-4">
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked1" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Storage Capacity<span className="tx-10 rounded-pill lh-1 badge bg-light-transparent text-dark fw-semibold ms-2">1Tb</span>
                    </span>
                    <strong className="ms-auto text-dark">$12</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked2" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Daily Updates<span className="tx-10 rounded-pill lh-1 badge bg-light-transparent text-dark fw-semibold ms-2">Unlimited</span>
                    </span>
                    <strong className="ms-auto text-dark">$9</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked3" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Visitors Monitoring
                    </span>
                    <strong className="ms-auto text-dark">Free</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked21" /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Online Support<span className="tx-10 rounded-pill lh-1 badge bg-light-transparent text-dark fw-semibold ms-2">24/7</span>
                    </span>
                    <strong className="ms-auto text-dark">24/7</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked22" /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Email Account<span className="tx-10 rounded-pill lh-1 badge bg-light-transparent text-dark fw-semibold ms-2">365 d</span>
                    </span>
                    <strong className="ms-auto text-dark">$10</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked04" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Ios & Android ready
                    </span>
                    <strong className="ms-auto text-dark">Free</strong>
                  </label>
                </li>
              </ul>
            </div>
            <div className="card-footer pt-1 d-block d-block">
              <p className="text-dark mb-2 pt-2">
                <span className="fs-13 fw-semibold">Vat Tax</span>
                <strong className="fs-16 float-end">$10</strong>
              </p>
              <p className="text-dark mb-4">
                <span className="fs-13 fw-semibold">Total</span>
                <strong className="fs-22 text-primary float-end">$29</strong>
              </p>
              <button className="btn btn-lg btn-primary text-fixed-white btn-block">
                <span className="ms-4 me-4">Select</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xxl-3 col-xl-6 col-md-6 col-sm-12">
          <div className="card p-3 pricing-card border border-primary">
            <div className="card-header pt-2 d-block">
              <p className="fs-18 fw-semibold mb-1">Advanced<span className=" tx-11 float-end badge bg-secondary text-fixed-white  mt-2">New</span></p>
              <p className="fs-13 mb-1 text-muted">For Advanced business purpose !</p>
              <p className="fs-13 mb-1 fw-semibold">Best price is $599</p>
            </div>
            <div className="card-body pt-2 pb-0">
              <ul className="pricing-body text-muted ps-0 mb-4">
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 bg-primary-transparent border border-primary">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked4" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto text-primary">
                      Storage Capacity<span className="tx-10 rounded-pill lh-1 badge bg-light-transparent text-dark fw-semibold ms-2">5 TB</span>
                    </span>
                    <strong className="ms-auto text-primary">$140</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked5" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Daily Updates<span className="tx-10 rounded-pill lh-1 badge bg-light-transparent text-dark fw-semibold ms-2">Unlimited</span>
                    </span>
                    <strong className="ms-auto text-dark">$100</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked6" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Visitors Monitoring
                    </span>
                    <strong className="ms-auto text-dark">Free</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 bg-primary-transparent border border-primary">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked7" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto text-primary">
                      Online Support<span className="tx-10 rounded-pill lh-1 badge bg-light-transparent text-dark fw-semibold ms-2">24/7</span>
                    </span>
                    <strong className="ms-auto text-primary br-5">$245</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked8" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Email Account<span className="tx-10 rounded-pill lh-1 badge bg-light-transparent text-dark fw-semibold ms-2">365 d</span>
                    </span>
                    <strong className="ms-auto text-dark">$154</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked9" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Ios & Android ready
                    </span>
                    <strong className="ms-auto text-dark">Free</strong>
                  </label>
                </li>
              </ul>
            </div>
            <div className="card-footer pt-1 d-block d-block">
              <p className="text-dark mb-2 pt-2">
                <span className="fs-13 fw-semibold">Vat Tax</span>
                <strong className="fs-16 float-end">$10</strong>
              </p>
              <p className="text-dark mb-4">
                <span className="fs-13 fw-semibold">Total</span>
                <strong className="fs-22 text-primary float-end">$599</strong>
              </p>
              <button className="btn btn-lg btn-primary text-fixed-white btn-block">
                <span className="ms-4 me-4">Select</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xxl-3 col-xl-6 col-md-6 col-sm-12">
          <div className="card p-3 pricing-card">
            <div className="card-header pt-2 d-block">
              <p className="fs-18 fw-semibold mb-1">Regular</p>
              <p className="fs-13 mb-1 text-muted">For Regular business purpose !</p>
              <p className="fs-13 mb-1 fw-semibold">Best price is $79</p>
            </div>
            <div className="card-body pt-2 pb-0">
              <ul className="pricing-body text-muted ps-0 mb-4">
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked10" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Storage Capacity<span className="tx-10 rounded-pill lh-1 badge bg-light-transparent text-dark fw-semibold ms-2">2 TB</span>
                    </span>
                    <strong className="ms-auto text-dark">$29</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked11" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Daily Updates<span className="tx-10 rounded-pill lh-1 badge bg-light-transparent text-dark fw-semibold ms-2">Unlimited</span>
                    </span>
                    <strong className="ms-auto text-dark">$10</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked12" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Visitors Monitoring
                    </span>
                    <strong className="ms-auto text-dark">Free</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked23" /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Online Support<span className="tx-10 rounded-pill lh-1 badge bg-light-transparent text-dark fw-semibold ms-2">24/7</span>
                    </span>
                    <strong className="ms-auto text-dark">$30</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked13" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Email Account<span className="tx-10 rounded-pill lh-1 badge bg-light-transparent text-dark fw-semibold ms-2">365 d</span>
                    </span>
                    <strong className="ms-auto text-dark">$10</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked14" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Ios & Android ready
                    </span>
                    <strong className="ms-auto text-dark">Free</strong>
                  </label>
                </li>
              </ul>
            </div>
            <div className="card-footer pt-1 d-block d-block">
              <p className="text-dark mb-2 pt-2">
                <span className="fs-13 fw-semibold">Vat Tax</span>
                <strong className="fs-16 float-end">$10</strong>
              </p>
              <p className="text-dark mb-4">
                <span className="fs-13 fw-semibold">Total</span>
                <strong className="fs-22 text-primary float-end">$79</strong>
              </p>
              <button className="btn btn-lg btn-primary text-fixed-white btn-block">
                <span className="ms-4 me-4">Purchase</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xxl-3 col-xl-6 col-md-6 col-sm-12">
          <div className="card p-3 pricing-card">
            <div className="card-header pt-2 d-block">
              <p className="fs-18 fw-semibold mb-1">Premium</p>
              <p className="fs-13 mb-1 text-muted">For Premium business purpose !</p>
              <p className="fs-13 mb-1 fw-semibold">Best price is $129</p>
            </div>
            <div className="card-body pt-2 pb-0">
              <ul className="pricing-body text-muted ps-0 mb-4">
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked15" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Storage Capacity<span className="tx-10 rounded-pill lh-1 badge bg-light-transparent text-dark fw-semibold ms-2">3 TB</span>
                    </span>
                    <strong className="ms-auto text-dark">$59</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked16" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Daily Updates<span className="tx-10 rounded-pill lh-1 badge bg-light-transparent text-dark fw-semibold ms-2">Unlimited</span>
                    </span>
                    <strong className="ms-auto text-dark">$20</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked17" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Visitors Monitoring
                    </span>
                    <strong className="ms-auto text-dark">Free</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked18" /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Online Support<span className="tx-10 rounded-pill lh-1 badge bg-light-transparent text-dark fw-semibold ms-2">24/7</span>
                    </span>
                    <strong className="ms-auto text-dark">$40</strong>
                  </label>
                </li>
                <li className="mb-1">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked19" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Email Account<span className="tx-10 rounded-pill lh-1 badge bg-light-transparent text-dark fw-semibold ms-2">365 d</span>
                    </span>
                    <strong className="ms-auto text-dark">$20</strong>
                  </label>
                </li>
                <li className="mb-2">
                  <label className="d-flex align-items-center p-2 br-5 border">
                    <span className="check-box mb-0">
                      <span className="ckbox"><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked20" defaultChecked /><span></span></span>
                    </span>
                    <span className="ms-3 tx-14 my-auto">
                      Ios & Android ready
                    </span>
                    <strong className="ms-auto text-dark">Free</strong>
                  </label>
                </li>
              </ul>
            </div>
            <div className="card-footer pt-1 d-block d-block">
              <p className="text-dark mb-2 pt-2">
                <span className="fs-13 fw-semibold">Vat Tax</span>
                <strong className="fs-16 float-end">$10</strong>
              </p>
              <p className="text-dark mb-4">
                <span className="fs-13 fw-semibold">Total</span>
                <strong className="fs-22 text-primary float-end">$129</strong>
              </p>
              <button className="btn btn-lg btn-primary text-fixed-white btn-block">
                <span className="ms-4 me-4">Purchase</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 pricing-tabs">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Nav as='ul' variant="" className="mb-4 tab-style-6 bg-primary-transparent" id="myTab" >
              <Nav.Item as='li'><Nav.Link eventKey="first">Yearly</Nav.Link></Nav.Item>
              <Nav.Item as='li'><Nav.Link eventKey="second">Monthly</Nav.Link></Nav.Item>
            </Nav>
          <div className="pri-tabs-heading d-flex justify-content-center mb-4">
            <Tab.Content id="myTabContent">
              <Tab.Pane className='p-0 border-0' eventKey="first">
                <div className="row d-flex align-items-center justify-content-center">
                  <div className="col-lg-6 col-xxl-3 col-xl-6 col-md-6 col-sm-12">
                    <div className="card p-3 pricing-card">
                      <div className="card-header pt-2 d-block">
                        <p className="fs-18 fw-semibold mb-1">Basic</p>
                        <p className="fw-semibold mb-1"> <span className="fs-30 me-2">$</span><span className="fs-30 me-1">0</span><span className="fs-24"><span className="op-5 text-muted tx-20">/</span> year</span></p>
                        <p className="fs-13 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quos debitis aliquam .</p>
                        <p className="fs-13 mb-1 text-primary font-weight-">Billed yearly on regular basis!</p>
                      </div>
                      <div className="card-body pt-2">
                        <ul className="pricing-body text-muted ps-0">
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span>  <strong> 2 Free</strong> Domain Name</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong>3 </strong> One-Click Apps</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 1 </strong> Databases</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> Money </strong> BackGuarantee</li>
                          <li className="mb-6"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 24/7</strong> support</li>
                        </ul>
                      </div>
                      <div className="card-footer text-center border-top-0 pt-1">
                        <button className="btn btn-lg btn-primary text-fixed-white btn-block">
                          <span className="ms-4 me-4">Select</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-xxl-3 col-xl-6 col-md-6 col-sm-12">
                    <div className="card p-3 pricing-card">
                      <div className="card-header pt-2 d-block">
                        <p className="fs-18 fw-semibold mb-1 pe-0">Advanced<span className=" tx-11 float-end badge bg-primary text-fixed-white px-2 py-1 rounded-pill mt-2">Most Popular</span></p>
                        <p className="fw-semibold mb-1"> <span className="fs-30 me-2">$</span><span className="fs-30 me-1">699</span><span className="fs-24"><span className="op-5 text-muted tx-20">/</span> year</span></p>
                        <p className="fs-13 mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quos debitis aliquam .</p>
                        <p className="fs-13 mb-1 text-primary font-weight-">Billed yearly on regular basis!</p>
                      </div>
                      <div className="card-body pt-2">
                        <ul className="pricing-body text-muted ps-0">
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span>  <strong> 5 Free</strong> Domain Name</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong>5 </strong> One-Click Apps</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 3 </strong> Databases</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> Money </strong> BackGuarantee</li>
                          <li className="mb-6"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 24/7</strong> support</li>
                        </ul>
                      </div>
                      <div className="card-footer text-center border-top-0 pt-1">
                        <button className="btn btn-lg btn-primary text-fixed-white btn-block">
                          <span className="ms-4 me-4">Select</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-xxl-3 col-xl-6 col-md-6 col-sm-12">
                    <div className="card p-3 pricing-card">
                      <div className="card-header pt-2 d-block">
                        <p className="fs-18 fw-semibold mb-1">Regular</p>
                        <p className="fw-semibold mb-1"> <span className="fs-30 me-2">$</span><span className="fs-30 me-1">899</span><span className="fs-24"><span className="op-5 text-muted tx-20">/</span> year</span></p>
                        <p className="fs-13 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quos debitis aliquam .</p>
                        <p className="fs-13 mb-1 text-primary font-weight-">Billed yearly on regular basis!</p>
                      </div>
                      <div className="card-body pt-2">
                        <ul className="pricing-body text-muted ps-0">
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span>  <strong> 1 Free</strong> Domain Name</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong>4 </strong> One-Click Apps</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 2 </strong> Databases</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> Money </strong> BackGuarantee</li>
                          <li className="mb-6"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 24/7</strong> support</li>
                        </ul>
                      </div>
                      <div className="card-footer text-center border-top-0 pt-1">
                        <button className="btn btn-lg btn-primary text-fixed-white btn-block">
                          <span className="ms-4 me-4">Select</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-xxl-3 col-xl-6 col-md-6 col-sm-12">
                    <div className="card p-3 pricing-card">
                      <div className="card-header pt-2 d-block">
                        <p className="fs-18 fw-semibold mb-1">Premium</p>
                        <p className="fw-semibold mb-1"> <span className="fs-30 me-2">$</span><span className="fs-30 me-1">1,299</span><span className="fs-24"><span className="op-5 text-muted tx-20">/</span> year</span></p>
                        <p className="fs-13 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quos debitis aliquam .</p>
                        <p className="fs-13 mb-1 text-primary font-weight-">Billed yearly on regular basis!</p>
                      </div>
                      <div className="card-body pt-2">
                        <ul className="pricing-body text-muted ps-0">
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span>  <strong> 1 Free</strong> Domain Name</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong>5 </strong> One-Click Apps</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 3 </strong> Databases</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> Money </strong> BackGuarantee</li>
                          <li className="mb-6"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 24/7</strong> support</li>
                        </ul>
                      </div>
                      <div className="card-footer text-center border-top-0 pt-1">
                        <button className="btn btn-lg btn-primary text-fixed-white btn-block">
                          <span className="ms-4 me-4">Select</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane className='p-0 border-0' eventKey="second">
                <div className="row d-flex align-items-center justify-content-center">
                  <div className="col-lg-6 col-xxl-3 col-xl-6 col-md-6 col-sm-12">
                    <div className="card p-3 pricing-card">
                      <div className="card-header pt-2 d-block">
                        <p className="fs-18 fw-semibold mb-1">Basic</p>
                        <p className="fw-semibold mb-1"> <span className="fs-30 me-2">$</span><span className="fs-30 me-1">0</span><span className="fs-24"><span className="op-5 text-muted tx-20">/</span> month</span></p>
                        <p className="fs-13 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quos debitis aliquam .</p>
                        <p className="fs-13 mb-1 text-primary font-weight-">Billed monthly on regular basis!</p>
                      </div>
                      <div className="card-body pt-2">
                        <ul className="pricing-body text-muted ps-0">
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span>  <strong> 2 Free</strong> Domain Name</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong>3 </strong> One-Click Apps</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 1 </strong> Databases</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> Money </strong> BackGuarantee</li>
                          <li className="mb-6"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 24/7</strong> support</li>
                        </ul>
                      </div>
                      <div className="card-footer text-center border-top-0 pt-1">
                        <button className="btn btn-lg btn-primary text-fixed-white btn-block">
                          <span className="ms-4 me-4">Select</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-xxl-3 col-xl-6 col-md-6 col-sm-12">
                    <div className="card p-3 pricing-card">
                      <div className="card-header pt-2 d-block">
                        <p className="fs-18 fw-semibold mb-1 pe-0">Advanced<span className=" tx-11 float-end badge bg-primary text-fixed-white px-2 py-1 rounded-pill mt-2">Most Popular</span></p>
                        <p className="fw-semibold mb-1"> <span className="fs-30 me-2">$</span><span className="fs-30 me-1">59</span><span className="fs-24"><span className="op-5 text-muted tx-20">/</span> month</span></p>
                        <p className="fs-13 mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quos debitis aliquam .</p>
                        <p className="fs-13 mb-1 text-primary font-weight-">Billed monthly on regular basis!</p>
                      </div>
                      <div className="card-body pt-2">
                        <ul className="pricing-body text-muted ps-0">
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span>  <strong> 5 Free</strong> Domain Name</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong>5 </strong> One-Click Apps</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 3 </strong> Databases</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> Money </strong> BackGuarantee</li>
                          <li className="mb-6"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 24/7</strong> support</li>
                        </ul>
                      </div>
                      <div className="card-footer text-center border-top-0 pt-1">
                        <button className="btn btn-lg btn-primary text-fixed-white btn-block">
                          <span className="ms-4 me-4">Select</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-xxl-3 col-xl-6 col-md-6 col-sm-12">
                    <div className="card p-3 pricing-card">
                      <div className="card-header pt-2 d-block">
                        <p className="fs-18 fw-semibold mb-1">Regular</p>
                        <p className="fw-semibold mb-1"> <span className="fs-30 me-2">$</span><span className="fs-30 me-1">79</span><span className="fs-24"><span className="op-5 text-muted tx-20">/</span> month</span></p>
                        <p className="fs-13 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quos debitis aliquam .</p>
                        <p className="fs-13 mb-1 text-primary font-weight-">Billed monthly on regular basis!</p>
                      </div>
                      <div className="card-body pt-2">
                        <ul className="pricing-body text-muted ps-0">
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span>  <strong> 1 Free</strong> Domain Name</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong>4 </strong> One-Click Apps</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 2 </strong> Databases</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> Money </strong> BackGuarantee</li>
                          <li className="mb-6"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 24/7</strong> support</li>
                        </ul>
                      </div>
                      <div className="card-footer text-center border-top-0 pt-1">
                        <button className="btn btn-lg btn-primary text-fixed-white btn-block">
                          <span className="ms-4 me-4">Select</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-xxl-3 col-xl-6 col-md-6 col-sm-12">
                    <div className="card p-3 pricing-card">
                      <div className="card-header pt-2 d-block">
                        <p className="fs-18 fw-semibold mb-1">Premium</p>
                        <p className="fw-semibold mb-1"> <span className="fs-30 me-2">$</span><span className="fs-30 me-1">129</span><span className="fs-24"><span className="op-5 text-muted tx-20">/</span> month</span></p>
                        <p className="fs-13 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quos debitis aliquam .</p>
                        <p className="fs-13 mb-1 text-primary font-weight-">Billed monthly on regular basis!</p>
                      </div>
                      <div className="card-body pt-2">
                        <ul className="pricing-body text-muted ps-0">
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span>  <strong> 1 Free</strong> Domain Name</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong>5 </strong> One-Click Apps</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 3 </strong> Databases</li>
                          <li className="mb-4"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> Money </strong> BackGuarantee</li>
                          <li className="mb-6"><span className="text-primary me-2"><i className="fa-regular fa-circle-check fs-12"></i></span> <strong> 24/7</strong> support</li>
                        </ul>
                      </div>
                      <div className="card-footer text-center border-top-0 pt-1">
                        <button className="btn btn-lg btn-primary text-fixed-white btn-block">
                          <span className="ms-4 me-4">Select</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>
    </Fragment>
  );
};

export default Pricing;
