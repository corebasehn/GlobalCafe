import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { imagesData } from '../../../common/commonimages';

interface ComponentProps { }

const Resetpassword: FC<ComponentProps> = () => {
  return (
    <Fragment>
      <div className="cover-image forgot-page">
        <div className="container">
          <div className="row justify-content-center align-items-center authentication authentication-basic h-100">
            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-8 col-xs-10 card-sigin-main py-4 justify-content-center mx-auto">
              <div className="card-sigin">

                <div className="main-card-signin d-md-flex">
                  <div className="wd-100p">
                    <div className="d-flex mb-3"><Link to={`${import.meta.env.BASE_URL}dashboard/dashboard/`}><img src={imagesData('togglelogo')} className="sign-favicon ht-40" alt="logo" /></Link></div>
                    <div className="  mb-1">
                      <div className="main-signin-header">
                        <div className="">
                          <h2>Welcome back!</h2>
                          <h4 className="text-start">Reset Your Password</h4>
                          <form>
                            <div className="form-group text-start">
                              <label>Email</label>
                              <input className="form-control" placeholder="Enter your email" type="text" />
                            </div>
                            <div className="form-group text-start">
                              <label>New Password</label>
                              <input className="form-control" placeholder="Enter your password" type="password" />
                            </div>
                            <div className="form-group text-start">
                              <label>Confirm Password</label>
                              <input className="form-control" placeholder="Enter your password" type="password" />
                            </div>
                            <Link to={`${import.meta.env.BASE_URL}dashboard/dashboard/`} className="btn ripple btn-primary btn-block">Reset Password</Link>
                          </form>
                          <div className="mt-4 d-flex text-center justify-content-center">
                            <Link to="#" className="btn btn-icon me-2">
                              <span className="btn-inner--icon"> <i className="bx bxl-facebook tx-18 tx-prime"></i> </span>
                            </Link>
                            <Link to="#" className="btn btn-icon me-2">
                              <span className="btn-inner--icon"> <i className="ri-twitter-x-line fs-15 tx-prime"></i> </span>
                            </Link>
                            <Link to="#" className="btn btn-icon me-2">
                              <span className="btn-inner--icon"> <i className="bx bxl-linkedin tx-18 tx-prime"></i> </span>
                            </Link>
                            <Link to="#" className="btn  btn-icon me-2">
                              <span className="btn-inner--icon"> <i className="bx bxl-instagram tx-18 tx-prime"></i> </span>
                            </Link>
                          </div>
                        </div>
                      </div>
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

export default Resetpassword;