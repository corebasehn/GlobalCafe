import { FC, Fragment } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { imagesData } from '../../../common/commonimages';

interface ComponentProps { }

const Signin: FC<ComponentProps> = () => {
  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <body className='error-1 bg-primary'></body>
        </Helmet>
      </HelmetProvider>
      <div className="square-box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="container">
        <div className="row justify-content-center align-items-center authentication authentication-basic h-100">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-8 col-xs-10 card-sigin-main mx-auto my-auto py-4 justify-content-center">
            <div className="card-sigin">
              <div className="main-card-signin d-md-flex">
                <div className="wd-100p">
                  <div className="d-flex mb-4">
                    <Link to={`${import.meta.env.BASE_URL}dashboard/dashboard/`} ><img src={imagesData('togglelogo')} className="sign-favicon ht-40" alt="logo" /></Link>
                  </div>
                  <div className="">
                    <div className="main-signup-header">
                      <h2>Welcome back!</h2>
                      <h6 className="fw-semibold mb-4">Please sign in to continue.</h6>
                      <div className="panel panel-primary">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                          <div className="tab-menu-heading mb-2 border-bottom-0">
                            <div className="tabs-menu1">
                              <Nav as='ul' variant="" className="panel-tabs">
                                <li> <Nav.Link eventKey="first">Email</Nav.Link> </li>
                                <li> <Nav.Link eventKey="second">Mobile no</Nav.Link> </li>
                              </Nav>
                            </div>
                          </div>
                          <div className="panel-body tabs-menu-body border-0 p-3">
                            <Tab.Content>
                              <Tab.Pane eventKey="first">
                                <form action="#">
                                  <div className="form-group">
                                    <label>Email</label> <input className="form-control" placeholder="Enter your email" type="text" />
                                  </div>
                                  <div className="form-group">
                                    <label>Password</label> <input className="form-control" placeholder="Enter your password" type="password" />
                                  </div><Link to={`${import.meta.env.BASE_URL}dashboard/dashboard/`} className="btn btn-primary btn-block">Sign In</Link>
                                  <div className="mt-4 d-flex text-center justify-content-center mb-2">
                                    <Link to="#" className="btn btn-icon me-3">
                                      <span className="btn-inner--icon"> <i className="bx bxl-facebook fs-18 tx-prime"></i> </span>
                                    </Link>
                                    <Link to="#" className="btn btn-icon me-3">
                                      <span className="btn-inner--icon"> <i className="ri-twitter-x-line fs-15 tx-prime"></i> </span>
                                    </Link>
                                    <Link to="#" className="btn btn-icon me-3">
                                      <span className="btn-inner--icon"> <i className="bx bxl-linkedin fs-18 tx-prime"></i> </span>
                                    </Link>
                                    <Link to="#" className="btn  btn-icon me-3">
                                      <span className="btn-inner--icon"> <i className="bx bxl-instagram fs-18 tx-prime"></i> </span>
                                    </Link>
                                  </div>
                                </form>
                              </Tab.Pane>
                              <Tab.Pane eventKey="second">
                                <div id="mobile-num" className="wrap-input100 validate-input input-group mb-2">
                                  <Link to="#" className="input-group-text bg-white text-muted">
                                    <span>+91</span>
                                  </Link>
                                  <input className="input100 form-control" type="number" placeholder="number" />
                                </div>
                                <span>Note : Login with registered mobile number to generate OTP.</span>
                                <div className="container-login100-form-btn mt-3">
                                  <Link to="#" className="btn login100-form-btn btn-primary" id="generate-otp">
                                    Proceed
                                  </Link>
                                </div>
                              </Tab.Pane>
                            </Tab.Content>
                          </div>
                        </Tab.Container>
                      </div>

                      <div className="main-signin-footer text-center mt-3">
                        <p><Link to={`${import.meta.env.BASE_URL}pages/authentication/forgotpassword`} className="mb-3">Forgot password?</Link></p>
                        <p>Don't have an account? <Link to={`${import.meta.env.BASE_URL}pages/authentication/signup`}>Create an Account</Link></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Signin;