import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { imagesData } from '../../../common/commonimages';
import { Form } from 'react-bootstrap';

interface ComponentProps { }

const Lockscreen: FC<ComponentProps> = () => {
  return (
    <Fragment>
      <div className="cover-image forgot-page">
        <div className="container">
            <div className="row justify-content-center align-items-center authentication authentication-basic h-100">
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-8 col-xs-10 card-sigin-main py-4 justify-content-center mx-auto">
                    <div className="card-sigin">

                         <div className="main-card-signin d-md-flex">
                             <div className="wd-100p">
                                 <div className="d-flex mx-auto"> <Link to={`${import.meta.env.BASE_URL}dashboard/dashboard/`} className="mx-auto d-flex"><img src={imagesData('togglelogo')} className="sign-favicon ht-40 mx-auto" alt="logo"/><h1 className="main-logo1 ms-1 me-0 my-auto fs-28 text-dark ms-2">no<span>w</span>a</h1></Link></div>
                                 <div className="main-card-signin d-md-flex bg-white">
                                     <div className="p-4 wd-100p">
                                         <div className="main-signin-header">
                                             <div className="text-center mb-2"><img alt="" className="avatar avatar-xxl rounded-circle  mt-2 mb-2 " src={imagesData('face6')}/></div>
                                             <div className="mx-auto text-center mt-4 mg-b-20">
                                                 <h5 className="mg-b-10 tx-16">Teri Dactyl</h5>
                                                 <p className="tx-13 text-muted">Enter Your Password to View your Screen</p>
                                             </div>
                                             <form action="#">
                                                 <div className="form-group">
                                                     <Form.Control placeholder="Enter your password" type="password"/>
                                                 </div>
                                                 <Link to={`${import.meta.env.BASE_URL}dashboard/dashboard/`} className="btn btn-primary btn-block">Unlock</Link>
                                             </form>
                                         </div>
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

export default Lockscreen;