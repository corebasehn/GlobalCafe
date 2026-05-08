import { FC, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { imagesData } from '../../../common/commonimages';

interface ComponentProps { }

const Signup: FC<ComponentProps> = () => {
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
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-8 col-xs-10 card-sigin-main py-4 justify-content-center mx-auto">
            <div className="card-sigin ">

              <div className="main-card-signin d-md-flex">
                <div className="wd-100p"><div className="d-flex mb-4"><Link to={`${import.meta.env.BASE_URL}dashboard/dashboard/`}><img src={imagesData('togglelogo')} className="sign-favicon ht-40" alt="logo" /></Link></div>
                  <div className="">
                    <div className="main-signup-header">
                      <h2 className="text-dark">Get Started</h2>
                      <h6 className="fw-normal mb-4">It's free to signup and only takes a minute.</h6>
                      <form action="#">
                        <div className="form-group">
                          <label>Firstname &amp; Lastname</label> <input className="form-control" placeholder="Enter your firstname and lastname" type="text" />
                        </div>
                        <div className="form-group">
                          <label>Email</label> <input className="form-control" placeholder="Enter your email" type="text" />
                        </div>
                        <div className="form-group">
                          <label>Password</label> <input className="form-control" placeholder="Enter your password" type="password" />
                        </div><button className="btn btn-primary btn-block">Create Account</button>

                        <div className="mt-4 d-flex text-center justify-content-center">
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
                      <div className="main-signup-footer mt-3 text-center">
                        <p>Already have an account? <Link to={`${import.meta.env.BASE_URL}pages/authentication/signin`}>Sign In</Link></p>
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

export default Signup;