import React, { useState } from "react";
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Wizard, WizardStep } from "react-wizard-primitive";
import { imagesData } from "../../../common/commonimages";
import Select from "react-select";

// import "./styles.css";
function dec(el:any) {
  const unit = el.currentTarget.parentElement.querySelector("input").value;

if (Number(unit) === 0) {
    return false;
  } else {
    el.currentTarget.parentElement.querySelector("input").value--;
  }
}
function inc(el:any) {
  el.currentTarget.parentElement.querySelector("input").value++;
}

const MyCustomWizard = (Props:any) => {

  const stepCount = React.Children.count(Props.children);

  return (
    <Wizard>
      {({ activeStepIndex, previousStep, nextStep }) => (
        <div className="wizard-wrapper">
          <h2>
            Step {activeStepIndex + 1} of {stepCount}
          </h2>
          <div>{Props.children}</div>

          <div className="checkout-btns">
            <button
              className="previous btn"
              disabled={activeStepIndex === 0}
              onClick={previousStep}
            >
            
              Previous
            </button>
            <button
              className="next btn btn-primary"
              disabled={activeStepIndex === stepCount - 1}
              onClick={nextStep}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Wizard>
  );
};

MyCustomWizard.Step = (Props:any) => (
  <WizardStep>
    {({ isActive }) => isActive && <div className="step">{Props.children}</div>}
  </WizardStep>
);

const TextFields = () => (

  <section>
  <Form>
    <h5 className="text-start mb-2">Signin to Your Account</h5>
    <p className="mb-4 text-muted fs-13 ms-0 text-start">
      Signin to create, discover and connect with the global
      community
    </p>
    <Form.Group className="form-group text-start">
      <label>Email</label>
      <input
        className="form-control"
        placeholder="Enter your email"
        type="text"
      />
    </Form.Group>
    <Form.Group className="form-group text-start">
      <label>Password</label>
      <input
        className="form-control"
        placeholder="Enter your password"
        type="password"
      />
    </Form.Group>
    <Button
      variant=""
      className="btn ripple btn-primary btn-block"
    >
      Sign In
    </Button>
  </Form>
</section>
);

export function Appdata() {
  const [selected1, setSelected1] = useState<any>([]);
  const [selected, setSelected] = useState<any>([]);

  interface options {
    id:number,
    value:string,
  }
    const option: options[] = [
      {id:1, value:'Choose'},
      {id:2, value:'United States'},
    ];
    interface options1 {
      id:number,
      value:string,
    }
      const option1: options1[] = [
        {id:1, value:'Choose'},
        {id:2, value:'California'},
      ];
  return (
    <MyCustomWizard>
      <MyCustomWizard.Step>
        <TextFields />
      </MyCustomWizard.Step>
      <MyCustomWizard.Step>
      <h4>Billing</h4>
                <section>
                  <Form className="needs-validation" noValidate>
                    <h5 className="text-start mb-2">Billing Information</h5>
                    <p className="mb-4 text-muted fs-13 ms-0 text-start">
                      Lorem Ipsum has been the industry's standard dummy text
                      ever since
                    </p>
                    <Row>
                      <Col md={6} className=" mb-3">
                        <label htmlFor="firstName">First name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder=""
                          defaultValue=""
                          required
                        />
                        <div className="invalid-feedback">
                          Valid first name is required.
                        </div>
                      </Col>
                      <Col md={6} className=" mb-3">
                        <label htmlFor="lastName">Last name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder=""
                          defaultValue=""
                          required
                        />
                        <div className="invalid-feedback">
                          Valid last name is required.
                        </div>
                      </Col>
                    </Row>
                    <div className="mb-3">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="1234 Main St"
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter your shipping address.
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address2">
                        Address 2 <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address2"
                        placeholder="Apartment or suite"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mobile">Mobile Number</label>
                      <input type="text" className="form-control" id="mobile" />
                    </div>
                    <Row>
                      <Col md={5} className="mb-3">
                        <label htmlFor="country">Country</label>
                        {/* <select
                          className="custom-select d-block w-100"
                          id="country"
                          required
                        >
                          <option defaultValue="">Choose...</option>
                          <option>United States</option>
                        </select> */}
                         <Select
                    defaultValue={selected1}
                    onChange={setSelected1}
                    options={option1}
                    placeholder="country" 
                    classNamePrefix='Select2' className="multi-select"
                    
                  />
                        <div className="invalid-feedback">
                          Please select a valid country.
                        </div>
                      </Col>
                      <div className="col-md-4 mb-3">
                        <label htmlFor="state">State</label>
                        {/* <select
                          className="custom-select d-block w-100"
                          id="state"
                          required
                        >
                          <option defaultValue="">Choose...</option>
                          <option>California</option>
                        </select> */}
                        <Select  
                    defaultValue={selected}
                    onChange={setSelected}
                    options={option}
                    placeholder="state"
                    classNamePrefix='Select2' className="multi-select"
                    
                  />
                        <div className="invalid-feedback">
                          Please provide a valid state.
                        </div>
                      </div>
                      <div className="col-md-3 mb-3 zip-number">
                        <label htmlFor="zip">Zip</label>
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Zip code required.
                        </div>
                      </div>
                    </Row>
                    <hr className="mb-4" />
                    <Button
                      variant=""
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Continue to checkout
                    </Button>
                  </Form>
                </section>
      </MyCustomWizard.Step>
      <MyCustomWizard.Step>
                <div className="order-details">
                    <h4>Order</h4>
                    <section>
                      <h5 className="text-start mb-2">Your Order</h5>
                      <p className="mb-4 text-muted fs-13 ms-0 text-start">
                        Lorem Ipsum has been the industry's standard dummy text ever
                        since
                      </p>
                      <div className="product checkoutstepss">
                        <div className="item flex-wrap">
                          <div className="left">
                            {" "}
                            <Link to="#" className="thumb radius">
                              {" "}
                              <img
                                src={imagesData('product09')}
                                alt=""
                                className="radius"
                              />{" "}
                            </Link>
                            <div className="purchase">
                              <h6>
                                {" "}
                                <Link to="#">Flowerpot</Link>{" "}
                              </h6>
                              <div className="d-flex flex-wrap  mt-2">
                                <div className="mt-2 product-title fs-12 me-2">
                                  Quantity:
                                </div>
                                <div className="handle-counter" id="handleCounter1">
                                  <Button
                                    variant=""
                                    className="counter-minus btn btn-outline-light border"
                                    onClick={dec}
                                  >
                                    <i className="fe fe-minus"></i>
                                  </Button>
                                  <input
                                    type="text"
                                    defaultValue="2"
                                    className="qty"
                                  />
                                  <Button
                                    variant=""
                                    className="counter-plus btn btn-outline-light border" 
                                    onClick={inc}
                                  >
                                    <i className="fe fe-plus"></i>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>{" "}
                          <span className="price fs-20">$290</span>
                        </div>
                        <div className="item flex-wrap">
                          <div className="left">
                            {" "}
                            <Link to="#" className="thumb radius">
                              {" "}
                              <img
                                src={imagesData('product03')}
                                alt=""
                                className="radius"
                              />{" "}
                            </Link>
                            <div className="purchase">
                              <h6>
                                {" "}
                                <Link to="#">white chair</Link>{" "}
                              </h6>
                              <div className="d-flex flex-wrap mt-2">
                                <div className="mt-2 product-title fs-12 me-2">
                                  Quantity:
                                </div>
                                <div className="handle-counter" id="handleCounter2">
                                  <Button
                                    variant=""
                                    className="counter-minus btn btn-outline-light border"
                                    onClick={dec}
                                  >
                                    <i className="fe fe-minus"></i>
                                  </Button>
                                  <input
                                    type="text"
                                    defaultValue="2"
                                    className="qty"
                                  />
                                  <Button
                                    variant=""
                                    className="counter-plus btn btn-outline-light border"  
                                    onClick={inc}
                                  >
                                    <i className="fe fe-plus"></i>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>{" "}
                          <span className="price fs-20">$124</span>
                        </div>
                      </div>
                      <div className="checkout">
                        <div className="subtotal">
                          {" "}
                          <span className="heading">Subtotal</span>{" "}
                          <span className="total fs-20 fw-bold">$364</span>{" "}
                        </div>
                      </div>
                    </section>
                </div>
      </MyCustomWizard.Step>
      <MyCustomWizard.Step>
       
        <h4>Payments</h4>
                <section>
                  <div className="">
                    <h5 className="text-start mb-2">Payments</h5>
                    <p className="mb-4 text-muted fs-13 ms-0 text-start">
                      Lorem Ipsum has been the industry's standard dummy text
                      ever since
                    </p>
                  </div>
                  <div className="card-pay">
                    <Tabs
                      defaultActiveKey="CreditCard"
                      id="uncontrolled-tab-example"
                      className="tabs-menu"
                    >
                      <Tab eventKey="CreditCard" title="Credit Card">
                        
                        <div className="tab-pane show" id="tab20">
                          <div
                            className="bg-danger-transparent-2 text-danger py-3 br-3 mb-4"
                            role="alert"
                          >
                            Please Enter Valid Details
                          </div>
                          <div className="form-group">
                            <label className="form-label">
                              CardHolder Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="First Name"
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Card number</label>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search for..."
                              />
                              <span className="input-group-append">
                                <Button
                                  variant=""
                                  className="btn btn-primary box-shadow-0"
                                  type="button"
                                >
                                  <i className="fab fa-cc-visa"></i> &nbsp;{" "}
                                  <i className="fab fa-cc-amex"></i> &nbsp;
                                  <i className="fab fa-cc-mastercard"></i>
                                </Button>
                              </span>
                            </div>
                          </div>
                          <Row>
                            <div className="col-sm-8">
                              <div className="form-group">
                                <label className="form-label">Expiration</label>
                                <div className="input-group">
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="MM"
                                    name="Month"
                                  />
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="YY"
                                    name="Year"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="form-group">
                                <label className="form-label">
                                  CVV <i className="fa fa-question-circle"></i>
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </Row>
                        </div>
                      </Tab>
                      <Tab eventKey="Paypal" title="Paypal">
                      <div className="tab-pane" id="tab21">
                          <p className="mt-4">
                            Paypal is easiest way to pay online
                          </p>
                          <p>
                            <Link to="#" className="btn btn-primary">
                              <i className="fab fa-paypal"></i> Log in my Paypal
                            </Link>
                          </p>
                          <p className="mb-0 wd-sm-500">
                            <strong>Note:</strong> Nemo enim ipsam voluptatem
                            quia voluptas sit aspernatur aut odit aut fugit, sed
                            quia consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt.{" "}
                          </p>
                        </div>
                      </Tab>
                      <Tab eventKey="BankTransfer" title="Bank Transfer">
                        <div className="tab-pane" id="tab22">
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
                          <p className="mb-0 wd-sm-500">
                            <strong>Note:</strong> Nemo enim ipsam voluptatem
                            quia voluptas sit aspernatur aut odit aut fugit, sed
                            quia consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt.{" "}
                          </p>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </section>
      </MyCustomWizard.Step>
      <MyCustomWizard.Step>
      <h4>Finished</h4>
                <section className="text-center">
                  <div className="">
                    <h5 className="text-center mb-4">Your order Confirmed!</h5>
                  </div>
                  <svg
                    className="wd-100 ht-100 mx-auto justify-content-center mb-3 text-center"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 130.2 130.2"
                  >
                    <circle
                      className="path circle"
                      fill="none"
                      stroke="#22c03c"
                      strokeWidth="6"
                      strokeMiterlimit="10"
                      cx="65.1"
                      cy="65.1"
                      r="62.1"
                    />
                    <polyline
                      className="path check"
                      fill="none"
                      stroke="#22c03c"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      points="100.2,40.2 51.5,88.8 29.8,67.5 "
                    />
                  </svg>
                  <p className="success pl-5 pr-5 wd-sm-500">
                    Order placed successfully. Your order will be dispacted
                    soon. meanwhile you can track your order in my order
                    section.
                  </p>
                </section>
      </MyCustomWizard.Step>
    </MyCustomWizard>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Appdata />, rootElement);
