import { Fragment, useEffect, useState } from "react";
import Pageheader from "../../../layout/layoutcomponent/pageheader";
import { Nav, Tab } from "react-bootstrap";
import { imagesData } from "../../../common/commonimages";
import Select from 'react-select'
import { Country, State } from "../../../common/selectdata";
import { Link } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  zip: string;
}

const Checkout = () => {

  const [activeTab, setActiveTab] = useState<string>("first");
  const [formValues, setFormValues] = useState<FormValues>({ email: '', password: '', firstName: '', lastName: '', address: '', zip: '', });
  const [isTabValid, setIsTabValid] = useState<any>({ first: false, second: false, third: false, fourth: false, fifth: false, });
  const [count, setCount] = useState(2);
  const [count1, setCount1] = useState(1);

  const handleNextClick = () => {
    switch (activeTab) {
      case "first":
        if (isTabValid[activeTab] === true) {
          setActiveTab("second");
        }
        break;
      case "second":
        if (isTabValid[activeTab] === true) {
          setActiveTab("third");
        }
        break;
      case "third":

        setActiveTab("fourth");
        break;
      case "fourth":

        setActiveTab("fifth");
        break;
      default:
        break;
    }
  };

  const handlePreviousClick = () => {
    switch (activeTab) {
      case "second":
        setActiveTab("first");
        break;
      case "third":
        setActiveTab("second");
        break;
      case "fourth":
        setActiveTab("third");
        break;
      case "fifth":
        setActiveTab("fourth");
        break;
      default:
        break;
    }
  };

  const handleInputChange = (field: keyof FormValues, value: string) => {
    setFormValues({ ...formValues, [field]: value });
  };

  useEffect(() => {
    const validateTab = () => {
      if (activeTab === "first") {
        const { email, password } = formValues;
        setIsTabValid({
          ...isTabValid,
          [activeTab]: email.trim() !== '' && password.trim() !== '',
        });
      } else if (activeTab === "second") {
        const { firstName, lastName, address, zip } = formValues;
        setIsTabValid({
          ...isTabValid,
          [activeTab]:
            firstName.trim() !== '' &&
            lastName.trim() !== '' &&
            address.trim() !== '' &&
            zip.trim() !== '',
        });
      } else {
        // Add validation for other tabs as needed
      }
    };

    validateTab();
  }, [activeTab, formValues]);

  const increment = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increment1 = () => {
    if (count1 < 10) {
      setCount1(count1 + 1);
    }
  };

  const decrement1 = () => {
    if (count1 > 1) {
      setCount1(count1 - 1);
    }
  };

  return (
    <Fragment>

      <Pageheader title="CHECKOUT" heading="Ecommerce" active="Checkout" />
      <div className="row justify-content-center">
        <div className="col-xl-9">
          <div className="card">
            <div className="card-body p-0 product-checkout">
              <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={(tab: any) => setActiveTab(tab)}>
                <Nav as='ul' variant="pills" className="tab-style-2 d-sm-flex d-block border-bottom border-block-end-dashed" id="myTab1">
                  <Nav.Item as='li'><Nav.Link eventKey="first"><i className="ri-number-1 me-2 align-middle"></i>Sign In</Nav.Link></Nav.Item>
                  <Nav.Item as='li'><Nav.Link eventKey="second"><i className="ri-number-2 me-2 align-middle"></i>Billing</Nav.Link></Nav.Item>
                  <Nav.Item as='li'><Nav.Link eventKey="third"><i className="ri-number-3 me-2 align-middle"></i>Order</Nav.Link></Nav.Item>
                  <Nav.Item as='li'><Nav.Link eventKey="fourth"><i className="ri-number-4 me-2 align-middle"></i>Payments</Nav.Link></Nav.Item>
                  <Nav.Item as='li'><Nav.Link eventKey="fifth"><i className="ri-number-5 me-2 align-middle"></i>Finished</Nav.Link></Nav.Item>
                </Nav>
                <div className="row">
                  <div className="col-xl-8 mx-auto">
                    <Tab.Content className="border m-4" id="myTabContent">
                      <Tab.Pane className="border-0 p-0" eventKey="first" id="order-tab-pane">
                        <div className="p-4">
                          <div className="fs-15 fw-semibold align-items-center justify-content-between mb-3 z">
                            <form>
                              <h5 className="text-start mb-2">Signin to Your Account</h5>
                              <p className="mb-4 text-muted tx-13 ms-0 text-start">Signin to create, discover and connect with the global community</p>
                              <div className="form-group text-start">
                                <label>Email</label>
                                <input className="form-control" placeholder="Enter your email" type="text" value={formValues.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                              </div>
                              <div className="form-group text-start">
                                <label>Password</label>
                                <input className="form-control" placeholder="Enter your password" type="password" value={formValues.password} onChange={(e) => handleInputChange('password', e.target.value)} />
                              </div>
                              <button className="btn ripple btn-primary btn-block" onClick={handleNextClick}>Sign In</button>
                            </form>
                          </div>
                        </div>
                        <div className="px-4 py-3 border-top border-block-start-dashed d-sm-flex justify-content-end">
                          <button type="button" className="btn btn-success" id="personal-details-trigger" onClick={handleNextClick} disabled={!isTabValid[activeTab]}>Next</button>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane className="border-0 p-0" eventKey="second" id="confirm-tab-pane">
                        <form className="p-4">
                          <h5 className="text-start mb-2">Billing Information</h5>
                          <p className="mb-4 text-muted tx-13 ms-0 text-start">Lorem Ipsum has been the industry's standard dummy text ever since</p>
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label htmlFor="firstName">First name</label>
                              <input type="text" className={`form-control ${formValues.firstName.trim() === '' ? 'is-invalid' : ''}`}
                                value={formValues.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} id="firstName" placeholder="" required />
                              {formValues.firstName.trim() === '' && (<div className="invalid-feedback">Valid first name is required.</div>)}
                            </div>
                            <div className="col-md-6 mb-3">
                              <label htmlFor="lastName">Last name</label>
                              <input type="text" className={`form-control ${formValues.lastName.trim() === '' ? 'is-invalid' : ''}`}
                                value={formValues.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} id="lastName" placeholder="" required />
                              {formValues.lastName.trim() === '' && (<div className="invalid-feedback">Valid last name is required.</div>)}
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="address">Address</label>
                            <input type="text" className={`form-control ${formValues.address.trim() === '' ? 'is-invalid' : ''}`}
                              value={formValues.address} onChange={(e) => handleInputChange('address', e.target.value)} id="address" placeholder="1234 Main St" required />
                            {formValues.address.trim() === '' && (<div className="invalid-feedback">Please enter your shipping address.</div>)}
                          </div>
                          <div className="mb-3">
                            <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span>
                            </label>
                            <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="mobile">Mobile Number</label>
                            <input type="text" className="form-control" id="mobile" />
                          </div>
                          <div className="row">
                            <div className="col-xxl-5 col-md-12 mb-3">
                              <label>Country</label>
                              <Select options={Country} classNamePrefix="Select2" placeholder="--Choose--" />
                            </div>
                            <div className="col-xxl-4 col-md-12 mb-3">
                              <label>State</label>
                              <Select options={State} classNamePrefix="Select2" placeholder="--Choose--" />
                            </div>
                            <div className="col-xxl-3 col-md-12 mb-3">
                              <label htmlFor="zip">Zip</label>
                              <input type="text" className={`form-control ${formValues.zip.trim() === '' ? 'is-invalid' : ''}`}
                                value={formValues.zip} onChange={(e) => handleInputChange('zip', e.target.value)} id="zip" placeholder="" required />
                              {formValues.zip.trim() === '' && (<div className="invalid-feedback">Zip code required.</div>)}
                            </div>
                          </div>
                          <hr className="mb-4" />
                          <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
                        </form>
                        <div className="px-4 py-3 border-top border-block-start-dashed d-sm-flex justify-content-between">
                          <button type="button" className="btn btn-light m-1" id="back-shipping-trigger" onClick={handlePreviousClick}>Previous</button>
                          <button type="button" className="btn btn-success m-1" id="payment-trigger" onClick={handleNextClick} disabled={!isTabValid[activeTab]}>Next</button>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane className="border-0 p-0" eventKey="third" >
                        <div id="shipped-tab-pane">
                        <Fragment>
                          <div className="px-4 pt-4">
                            <h5 className="text-start mb-2">Your Order</h5>
                            <p className="mb-4 text-muted tx-13 ms-0 text-start">Lorem Ipsum has been the industry's standard dummy text ever since</p>
                          </div>
                          <div className="product">
                            <div className="item flex-wrap px-4 py-3">
                              <div className="left flex-wrap gap-2"> <Link to="#" className="thumb rounded-3 mb-2"> <img src={imagesData('ecommerce23')} alt="" className="rounded-3" /> </Link>
                                <div className="purchase mb-2">
                                  <h6> <Link to="#">Flowerpot</Link> </h6>
                                  <div className="d-flex flex-wrap  mt-2">
                                    <div className="mt-2 product-title tx-12 me-2">Quantity:</div>
                                    <div className="handle-counter input-group border rounded flex-nowrap">
                                      <button className="btn btn-icon btn-light input-group-text product-quantity-minus" onClick={decrement}><i className="ri-subtract-line"></i></button>
                                      <span className="form-control form-control-sm border-0 text-center">{count}</span>
                                      <button className="btn btn-icon btn-light input-group-text product-quantity-plus" onClick={increment}><i className="ri-add-line"></i></button>
                                    </div>
                                  </div>
                                </div>
                              </div> <span className="price fs-20">$290</span>
                            </div>
                            <div className="item flex-wrap px-4 py-3">
                              <div className="left flex-wrap gap-2"> <Link to="#" className="thumb rounded-3 mb-2"> <img src={imagesData('ecommerce17')} alt="" className="rounded-3" /> </Link>
                                <div className="purchase mb-2">
                                  <h6> <Link to="#">white chair</Link> </h6>
                                  <div className="d-flex flex-wrap mt-2">
                                    <div className="mt-2 product-title tx-12 me-2">Quantity:</div>
                                    <div className="handle-counter input-group border rounded flex-nowrap">
                                      <button className="btn btn-icon btn-light input-group-text product-quantity-minus" onClick={decrement1}><i className="ri-subtract-line"></i></button>
                                      <span className="form-control form-control-sm border-0 text-center">{count1}</span>
                                      <button className="btn btn-icon btn-light input-group-text product-quantity-plus" onClick={increment1}><i className="ri-add-line"></i></button>
                                    </div>
                                  </div>
                                </div>
                              </div> <span className="price fs-20">$124</span>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between px-4 py-3">
                            <span>Subtotal</span>
                            <span className="fs-20 fw-bold text-primary">$364</span>
                          </div>
                        </Fragment>
                        <div className="px-4 py-3 border-top border-block-start-dashed d-sm-flex justify-content-between">
                          <button type="button" className="btn btn-light m-1" id="back-personal-trigger" onClick={handlePreviousClick}>Previous</button>
                          <button type="button" className="btn btn-success m-1" id="continue-payment-trigger" onClick={handleNextClick}>Next</button>
                        </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane className="border-0 p-0" eventKey="fourth" id="delivery-tab-pane">
                        <div className="">
                          <div className="p-4">
                            <h5 className="text-start mb-2">Payments</h5>
                            <p className="mb-4 text-muted tx-13 ms-0 text-start">Lorem Ipsum has been the industry's standard dummy text ever since</p>
                          </div>
                          <div className="card-pay p-4">
                            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                              <Nav as='ul' variant="" className="tabs-menu">
                                <li ><Nav.Link eventKey="first"><i className="fa fa-credit-card"></i> Credit Card</Nav.Link></li>
                                <li><Nav.Link eventKey="second"><i className="fab fa-paypal"></i> Paypal</Nav.Link></li>
                                <li><Nav.Link eventKey="third"><i className="fa fa-university"></i> Bank Transfer</Nav.Link></li>
                              </Nav>
                              <Tab.Content>
                                <Tab.Pane className="border-0" eventKey="first">
                                  <div className="form-group">
                                    <label className="form-label">CardHolder Name</label>
                                    <input type="text" className="form-control" placeholder="First Name" />
                                  </div>
                                  <div className="form-group">
                                    <label className="form-label">Card number</label>
                                    <div className="input-group">
                                      <input type="text" className="form-control" placeholder="Search for..." aria-label="Search for..." aria-describedby="button-addon2" />
                                      <button className="btn btn-primary" type="button" id="button-addon22">
                                        <i className="fab fa-cc-visa"></i> &nbsp;
                                        <i className="fab fa-cc-amex"></i> &nbsp;
                                        <i className="fab fa-cc-mastercard"></i>
                                      </button>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-8">
                                      <div className="form-group">
                                        <label className="form-label">Expiration</label>
                                        <div className="input-group">
                                          <input type="number" className="form-control" placeholder="MM" name="Month" />
                                          <input type="number" className="form-control" placeholder="YY" name="Year" />

                                        </div>
                                      </div>
                                    </div>
                                      <div className="col-sm-4">
                                        <div className="form-group">
                                          <label className="form-label">CVV <i className="fa fa-question-circle"></i></label>
                                          <input type="number" className="form-control" required />
                                        </div>
                                      </div>
                                  </div>
                                </Tab.Pane>
                                <Tab.Pane className="border-0" eventKey="second">
                                  <p className="mt-4">Paypal is easiest way to pay online</p>
                                  <p><Link to="#" className="btn btn-primary"><i className="fab fa-paypal"></i> Log in my Paypal</Link></p>
                                  <p className="mb-0"><strong>Note:</strong> Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. </p>
                                </Tab.Pane>
                                <Tab.Pane className="border-0" eventKey="third">
                                  <p className="mt-4">Bank account details</p>
                                  <dl className="card-text">
                                    <dt>BANK: </dt>
                                    <dd> THE UNION BANK 0456</dd>
                                  </dl>
                                  <dl className="card-text">
                                    <dt>Account number: </dt>
                                    <dd> 67542897653214</dd>
                                  </dl>
                                  <dl className="card-text">
                                    <dt>IBAN: </dt>
                                    <dd>543218769</dd>
                                  </dl>
                                  <p className="mb-0"><strong>Note:</strong> Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. </p>
                                </Tab.Pane>
                              </Tab.Content>
                            </Tab.Container>
                          </div>
                          <div className="px-4 py-3 border-top border-block-start-dashed d-sm-flex justify-content-between">
                            <button type="button" className="btn btn-light m-1" id="back-personal-trigger3" onClick={handlePreviousClick}>Previous</button>
                            <button type="button" className="btn btn-success m-1" id="continue-finished-tab" onClick={handleNextClick}>Next</button>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane className="border-0 p-0" eventKey="fifth" id="finished-tab-pane">
                        <div className="text-center p-4">
                          <div className="">
                            <h5 className="text-center mb-4">Your order Confirmed!</h5>
                          </div>
                          <svg className="wd-100 ht-100 mx-auto justify-content-center mb-3 text-center" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                            <circle className="path circle" fill="none" stroke="#22c03c" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                            <polyline className="path check" fill="none" stroke="#22c03c" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                          </svg>
                          <p className="success pl-5 pr-5">Order placed successfully. Your order will be dispacted soon. meanwhile you can track your order in my order section.</p>
                        </div>
                        <div className="px-4 py-3 border-top border-block-start-dashed d-sm-flex justify-content-between">
                          <button type="button" className="btn btn-light m-1" id="back-personal-trigger4" onClick={handlePreviousClick}>Previous</button>
                          <button type="button" className="btn btn-secondary m-1" id="continue-payment-trigger1" onClick={() => setActiveTab("first")}>Order Again</button>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </div>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </Fragment >
  );
};

export default Checkout;
