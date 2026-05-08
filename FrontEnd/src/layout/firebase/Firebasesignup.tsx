import { FC, Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { imagesData } from '../../common/commonimages';
import { auth } from './firebase';
import { Alert, Form } from 'react-bootstrap';

interface ComponentProps { }

interface IData {
    fullname: string;
    email: string;
    password: string;
}

const Firebasesignup: FC<ComponentProps> = () => {
    const [err, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<IData>({
        fullname: "",
        email: "",
        password: "",
    });

    const { fullname, email, password } = data;

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };



    const Signup = (e: React.FormEvent) => {
        e.preventDefault();

        if (!fullname || !email || !password) {
            setError("All fields are required");
            return;
        }

        setLoading(true);

        auth.createUserWithEmailAndPassword(email, password).then(
            (_user) => {
                RouteChange();
                setLoading(false);
            }
        ).catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    };

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
                    <div className="col-xl-5 col-lg-6 col-md-8 col-sm-8 col-xs-10 card-sigin-main py-4 justify-content-center mx-auto">
                        <div className="card-sigin ">

                            <div className="main-card-signin d-md-flex">
                                <div className="wd-100p"><div className="d-flex mb-4"><Link to={`${import.meta.env.BASE_URL}dashboard/dashboard/`}><img src={imagesData('togglelogo')} className="sign-favicon ht-40" alt="logo" /></Link></div>
                                    <div className="">
                                        <div className="main-signup-header">
                                            <h2 className="text-dark">Get Started</h2>
                                            <h6 className="fw-normal mb-4">It's free to signup and only takes a minute.</h6>
                                            {err && <Alert variant='danger'>{err}</Alert>}
                                            <form action="#">
                                                <div className="form-group">
                                                    <Form.Label>Firstname &amp; Lastname</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter First Name" name="fullname" value={fullname} onChange={changeHandler} />
                                                </div>
                                                <div className="form-group">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="email" placeholder="Enter your Email" name="email" value={email} onChange={changeHandler} />
                                                </div>
                                                <div className="form-group">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type='password' className="ms-0 border-end-0" placeholder="Create a Password" name='password' value={password} onChange={changeHandler} required />
                                                </div>
                                                <button className="btn btn-primary btn-block" onClick={Signup}>{loading ? 'Signing Up...' : 'Create an Account'}</button>

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
                                                <p>Already have an account? <Link to={`${import.meta.env.BASE_URL}firebase/firebasesignin`}>Sign In</Link></p>
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

export default Firebasesignup;