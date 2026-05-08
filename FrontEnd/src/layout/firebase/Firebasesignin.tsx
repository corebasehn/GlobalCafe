import { FC, Fragment, useState } from 'react';
import { Alert, Form, Nav, OverlayTrigger, Tab, Tooltip } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { imagesData } from '../../common/commonimages';
import { auth } from './firebase';

interface ComponentProps { }

const Firebasesignin: FC<ComponentProps> = () => {

    // with react standard

    const [email1, setEmail1] = useState('adminreact@domain.com');
    const [password1, setPassword1] = useState('spruko@123');
    const [error1, setError1] = useState<string | null>(null);


    const handleSignIn = () => {
        // Form validation logic
        if (!email1.trim()) {
            setError1('Please enter your email or username.');
            return;
        }
    
        if (!/@/.test(email1.trim())) {
            setError1('Entered email address is badly formatted `example@domain.com`');
            return;
        }
    
        if (!/\.(com|in)$/.test(email1.trim())) {
            setError1('Please enter a valid email address.');
            return;
        }
    
        if (email1.trim()[0] !== email1.trim()[0].toLowerCase()) {
            setError1('Entered email address is badly formatted. Example: example@domain.com');
            return;
        }
    
        if (!password1.trim() || password1.trim().length < 8 || password1.trim().length > 10) {
            setError1('Password must be between 8 and 10 characters.');
            return;
        }
    
        // If all conditions are met, redirect to the Dashboard
        window.location.href = `${import.meta.env.BASE_URL}dashboard/dashboard/`;
    };

    // ******************************************************************************************************

    // with firebase standard

    const [err, setError] = useState<string>("");
    const [loading, setLoader] = useState<boolean>(false);
    const [data, setData] = useState<{ email: string; password: string }>({
        email: "adminreact@gmail.com",
        password: "1234567890",
    });

    const { email, password } = data;

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError("");
    }

    const Login = (e: React.FormEvent) => {
        e.preventDefault();
        setLoader(true);

        // Replace 'auth.signInWithEmailAndPassword' with the actual authentication method
        auth.signInWithEmailAndPassword(email, password).then(
            _user => {
                // Set loader to false only if authentication is successful
                setLoader(false);
                RouteChange();
            }
        ).catch(err => {
            setError(err.message);
            // Set loader to false if authentication fails
            setLoader(false);
        });
    }

    const navigate = useNavigate();

    const RouteChange = () => {
        let path = `${import.meta.env.BASE_URL}dashboard/dashboard/`;
        navigate(path);
    }
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
            <div className="container">
                <div className="row justify-content-center align-items-center authentication authentication-basic h-100">
                    <div className="col-xl-5 col-lg-6 col-md-8 col-sm-8 col-xs-10 card-sigin-main mx-auto my-auto py-4 justify-content-center">
                        <div className="card-sigin">
                            <div className="main-card-signin d-md-flex">
                                <div className="wd-100p">
                                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                        <div className="d-flex mb-4">
                                            <Link to={`${import.meta.env.BASE_URL}dashboard/dashboard/`} ><img src={imagesData('togglelogo')} className="sign-favicon ht-40" alt="logo" /></Link>

                                            <Nav variant="" className="align-item-center ms-auto">
                                                <OverlayTrigger overlay={<Tooltip>React</Tooltip>}><Nav.Item><Nav.Link className='border' eventKey="first"><img src={imagesData('react')} alt='react' /></Nav.Link></Nav.Item></OverlayTrigger>
                                                <OverlayTrigger overlay={<Tooltip>Firebase</Tooltip>}><Nav.Item><Nav.Link className='border' eventKey="second"><img src={imagesData('firebase')} alt='firebase' /></Nav.Link></Nav.Item></OverlayTrigger>
                                            </Nav>

                                        </div>
                                        <div className="">
                                            <Tab.Content>
                                                <Tab.Pane eventKey="first">
                                                    <div className="main-signup-header">
                                                        <h2>Welcome back!</h2>
                                                        <h6 className="fw-semibold mb-4">Please sign in to continue React.</h6>
                                                        {error1 && (<Alert variant="danger my-2" onClose={() => setError1(null)} dismissible>{error1}</Alert>)}
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
                                                                                    <Form.Label>Email</Form.Label>
                                                                                    <Form.Control type="text" // Use 'text' to allow both email and username
                                                                                        placeholder="Enter your Email"
                                                                                        value={email1}
                                                                                        onChange={(e) => setEmail1(e.target.value)} />
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <Form.Label>Password</Form.Label>
                                                                                    <Form.Control type="password"
                                                                                        id="input-password"
                                                                                        placeholder="Enter your Password"
                                                                                        value={password1}
                                                                                        onChange={(e) => setPassword1(e.target.value)} />
                                                                                </div>
                                                                                <Link to='#!' className="btn btn-primary btn-block" onClick={handleSignIn}>Sign In</Link>
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
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="second">
                                                    <div className="main-signup-header">
                                                        <h2>Welcome back!</h2>
                                                        <h6 className="fw-semibold mb-4">Please sign in to continue with firebase Authentication.</h6>
                                                        {err && <Alert className='mb-2' variant='danger'>{err}</Alert>}
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
                                                                                    <Form.Label>Email</Form.Label>
                                                                                    <Form.Control type="email" placeholder="Enter your Email" name="email" onChange={changeHandler} value={email} />
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <Form.Label>Password</Form.Label>
                                                                                    <Form.Control type="password" id="input-password" placeholder="Password" name="password" value={password} onChange={changeHandler} />
                                                                                </div>
                                                                                <Link to='#!' className="btn btn-primary btn-block" onClick={Login}>Sign In {loading ? <div className="spinner-border spinner-border-sm"></div> : ''}</Link>
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
                                                            <p><Link to={`${import.meta.env.BASE_URL}firebase/forgetpassword`} className="mb-3">Forgot password?</Link></p>
                                                            <p>Don't have an account? <Link to={`${import.meta.env.BASE_URL}firebase/firebasesignup`}>Create an Account</Link></p>
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </div>
                                    </Tab.Container>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Firebasesignin;