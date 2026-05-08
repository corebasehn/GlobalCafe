import { FC, Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase';
import { Alert, Form } from 'react-bootstrap';
import { imagesData } from '../../common/commonimages';
import Swal from "sweetalert2";

interface ComponentProps { }

const Forgetpassword: FC<ComponentProps> = () => {

    const [err, setError] = useState("");
    const [email, setEmail] = useState('');

    let navigate = useNavigate();
    const RouteChange = () => {
        let path = `${import.meta.env.BASE_URL}firebase/firebasesignin`;
        navigate(path);
    }

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            Swal.fire({
                title: 'Hello User',
                text: "Password reset email sent. Please check your inbox.",
                showCancelButton: false,
                confirmButtonColor: '#5e76a6',
                confirmButtonText: 'Sign in'
              })
            RouteChange();
        } catch (error: any) {
            setError(error.message);
        }
    };

  return (
    <Fragment>
        <HelmetProvider>
        <Helmet
          htmlAttributes={{
            // lang: "en",
            // dir: "ltr",
            // "data-nav-layout": "vertical",
            // "data-theme-mode": "light",
            // "data-header-styles": "light",
            // "data-menu-styles": "light",
            // "data-vertical-style": "overlay",
          }}
        >
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
        <div className="cover-image forgot-page">
        <div className="container">
            <div className="row justify-content-center align-items-center authentication authentication-basic h-100">
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-8 col-xs-10 card-sigin-main py-4 justify-content-center mx-auto">
                    <div className="card-sigin">
                         <div className="main-card-signin d-md-flex">
                             <div className="wd-100p">
                                 <div className="mb-3 d-flex"> <Link to={`${import.meta.env.BASE_URL}dashboard/dashboard/`}><img src={imagesData('togglelogo')} className="sign-favicon ht-40" alt="logo"/></Link></div>
                                     <div className="main-card-signin d-md-flex bg-white">
                                         <div className="wd-100p">
                                             <div className="main-signin-header">
                                                 <h2>Forgot Password!</h2>
                                                 <h4>Please Enter Your Email</h4>
                                                 {err && <Alert variant='danger'>{err}</Alert>}
                                                 <form action="#">
                                                     <div className="form-group">
                                                         <Form.Label>Email</Form.Label> 
                                                         <Form.Control type="email" placeholder="Enter your email" name="mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                     </div>
                                                     <Link to='#' className="btn btn-primary btn-block" onClick={handleResetPassword}>Submit</Link>
                                                 </form>
                                             </div>
                                             <div className="main-signup-footer mt-2 text-center">
                                                 <p>Forget it, <Link to={`${import.meta.env.BASE_URL}firebase/firebasesignin`}> Send me back</Link> to the sign in screen.</p>
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

export default Forgetpassword;