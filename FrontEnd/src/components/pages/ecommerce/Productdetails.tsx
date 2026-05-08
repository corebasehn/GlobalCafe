import { useState, Fragment } from "react";
import { Tab, Nav } from "react-bootstrap";
import { imagesData } from "../../../common/commonimages";
import Pageheader from "../../../layout/layoutcomponent/pageheader";
import { Link } from "react-router-dom";
import { dropproduct } from "../../../common/selectdata";
import Select from 'react-select';

const ProductDetails = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Fragment>

      <Pageheader title="PRODUCT DETAILS" heading="Ecommerce" active="Product details" />
      <div className="row row-sm">
        <div className="col-xxl-12">
          <div className="card">
            <div className="card-body ">
              <div className="row row-sm ">
                <div className=" col-xxl-6 col-lg-12 col-md-12">
                  <div className="row">
                    <div className="col-xxl-2 col-xl-2 col-md-2 col-sm-3">
                      <div className="clearfix carousel-slider">
                        <div id="thumbcarousel" className="carousel slide" data-bs-interval="t">
                          <ul className="carousel-item active">
                            {[0, 1, 2, 3].map((index) => (
                              <li
                                key={index}
                                className={`thumb ${index === activeIndex ? 'active' : ''} my-sm-2 m-2 mx-sm-0`}
                                onClick={() => handleThumbnailClick(index)}
                              >
                                <img src={imagesData(`ecommerce2${index + 5}`)} alt="img" />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-10 col-xl-10 col-md-10 col-sm-9">
                      <div className="product-carousel  border br-5">
                        <div id="Slider" className="carousel slide">
                          <div className="carousel-inner">
                            {[0, 1, 2, 3].map((index) => (
                              <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`} style={{ transform: `translateX(${(index - activeIndex) * 100}%)`, transition: 'transform 0.5s ease' }}>
                                <img src={imagesData(`ecommerce2${index + 5}`)} alt="img" className="img-fluid mx-auto d-block" />
                                <div className="text-center mt-5 mb-5 btn-list">
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-center  mt-4 btn-list">
                        <Link to={`${import.meta.env.BASE_URL}pages/ecommerce/cart/`} className="btn ripple btn-primary me-2"><i
                          className="fe fe-shopping-cart"> </i> Add to cart</Link>
                        <Link to={`${import.meta.env.BASE_URL}pages/ecommerce/checkout/`} className="btn ripple btn-secondary"><i
                          className="fe fe-credit-card"> </i> Buy Now</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="details col-xxl-6 col-lg-12 col-md-12 mt-4">
                  <h4 className="product-title mb-1">Jyothi Fashion Women's Fit & Flare Knee Length
                    Western Frock</h4>
                  <p className="text-muted fs-13 mb-1">women red & Grey Checked Casual frock</p>
                  <div className="rating mb-1">
                    <div className="stars">
                      <span className="fa fa-star checked me-1"></span>
                      <span className="fa fa-star checked me-1"></span>
                      <span className="fa fa-star checked me-1"></span>
                      <span className="fa fa-star me-1  text-muted"></span>
                      <span className="fa fa-star text-muted"></span>
                    </div>
                    <span className="review-no">41 reviews</span>
                  </div>
                  <h6 className="price">current price: <span className="h3 ms-2">$253</span></h6>
                  <p className="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87
                    votes)</strong></p>
                  <div className="mb-3">
                    <div className="">
                      <p className="font-weight-normal"><span className="h4">Hurry Up!</span> Sold:
                        <span className="text-primary h5 "> 110/150</span> products in stock.
                      </p>
                    </div>
                    <div className="progress ht-10  mt-0">
                      <div className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                        style={{ width: '60%' }}></div>
                    </div>
                  </div>

                  <div className="sizes d-flex">sizes:
                    <span className="size d-flex"><label className="rdiobox mb-0">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked /> <span>s</span></label></span>
                    <span className="size d-flex"><label className="rdiobox mb-0">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" /> <span>m</span></label></span>
                    <span className="size d-flex"><label className="rdiobox mb-0">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" /> <span>l</span></label></span>
                    <span className="size d-flex"><label className="rdiobox mb-0">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" /> <span>xl</span></label></span>

                  </div>
                  <div className="d-flex  mt-2">
                    <div className="mt-2 product-title">Quantity:</div>
                    <div className="d-flex ms-2">
                      <ul className=" mb-0 Quantity-list">
                        <li>
                          <div className="form-group">
                            <Select options={dropproduct} classNamePrefix='Select2' defaultValue={dropproduct[0]} />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="colors d-flex me-3 mt-2">
                    <span className="mt-2">colors:</span>
                    <div className="d-sm-flex ms-4">
                      <div className="me-2">
                        <label className="colorinput">
                          <input name="color" type="radio" value="azure" className="colorinput-input" defaultChecked />
                          <span className="colorinput-color bg-primary"></span>
                        </label>
                      </div>
                      <div className="me-2">
                        <label className="colorinput">
                          <input name="color" type="radio" value="indigo" className="colorinput-input" />
                          <span className="colorinput-color bg-secondary"></span>
                        </label>
                      </div>
                      <div className="me-2">
                        <label className="colorinput">
                          <input name="color" type="radio" value="purple" className="colorinput-input" />
                          <span className="colorinput-color bg-danger"></span>
                        </label>
                      </div>
                      <div className="me-2">
                        <label className="colorinput">
                          <input name="color" type="radio" value="pink" className="colorinput-input" />
                          <span className="colorinput-color bg-pink"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row row-sm">
        <div className="col-lg-12 col-md-12">
          <div className="card productdesc">
            <div className="card-body">
              <div className="panel panel-primary">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <div className="tab-menu-heading">
                    <div className="tabs-menu1">
                      <Nav className="nav nav-pills justify-content-start nav-style-3" defaultActiveKey="first">
                        <Nav.Item> <Nav.Link eventKey="first" href="#home-right">Specifications</Nav.Link> </Nav.Item>
                        <Nav.Item> <Nav.Link eventKey="second" href="#about-right">Dimensions</Nav.Link> </Nav.Item>
                        <Nav.Item> <Nav.Link eventKey="third" href="#services-right">Features</Nav.Link></Nav.Item>
                      </Nav>
                    </div>
                  </div>
                  <div className="panel-body tabs-menu-body">
                    <Tab.Content id="myTabContent">
                      <Tab.Pane className="border-0" eventKey="first">
                        <h5 className="mb-2 mt-1 fw-semibold">Description :</h5>
                        <p className="mb-3 fs-13">At vero eos et accusamus et iusto odio dignissimos
                          ducimus qui blanditiis praesentium voluptatum deleniti atque
                          corrupti quos dolores et quas molestias excepturi sint occaecati
                          cupiditate non provident,
                          similique sunt in culpa qui officia deserunt mollitia animi, id est
                          laborum et dolorum fuga.</p>
                        <p className="mb-3 fs-13">odio dignissimos ducimus qui blanditiis
                          praesentium voluptatum deleniti atque corrupti quos dolores et quas
                          molestias excepturi sint occaecati cupiditate non provident,
                          similique sunt in culpa qui
                          officia.
                        </p>
                        <h5 className="my-3 fw-semibold">Specifications :</h5>
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <tbody>
                              <tr>
                                <td className="fw-semibold">Package Dimensions</td>
                                <td> 33 x 22 x 3 cm; 450 Grams</td>
                              </tr>
                              <tr>
                                <td className="fw-semibold">Manufacturer</td>
                                <td>gownu Production</td>
                              </tr>
                              <tr>
                                <td className="fw-semibold">Item part number </td>
                                <td>BNVRDMRHENFULL-Z14</td>
                              </tr>
                              <tr>
                                <td className="fw-semibold">Best Sellers Rank</td>
                                <td> #141 in Clothing & Accessories (See Top 100 in Clothing &
                                  Accessories)</td>
                              </tr>
                              <tr>
                                <td className="fw-semibold">Customer Reviews</td>
                                <td>
                                  <p className="text-muted float-start me-3">
                                    <span className="fa fa-star text-warning"></span>
                                    <span className="fa fa-star text-warning"></span>
                                    <span className="fa fa-star text-warning"></span>
                                    <span className="fa fa-star-half-o text-warning"></span>
                                    <span className="fa fa-star-o text-warning"></span>
                                    <span className="text-success fw-semibold ms-1">(2,076
                                      ratings)</span>
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane className="border-0" eventKey="second">
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <tbody>
                              <tr>
                                <td> Care Instructions</td>
                                <td>Hand Wash Only</td>
                              </tr>
                              <tr>
                                <td> Fit Type</td>
                                <td>Regular</td>
                              </tr>
                              <tr>
                                <td> Fabric</td>
                                <td>Soft Crepe || full stitched</td>
                              </tr>
                              <tr>
                                <td> Size</td>
                                <td>S(34''), M(36"), L(38"), XL(40"), XXL(42")</td>
                              </tr>
                              <tr>
                                <td> Length</td>
                                <td>Up to 44 inch</td>
                              </tr>
                              <tr>
                                <td> Manufacturer</td>
                                <td>Jyothi fashions</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane className="border-0" eventKey="third">
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <tbody>
                              <tr>
                                <td><i className="fa fa-check me-3 text-success"></i>Care
                                  Instructions: Hand Wash Only</td>
                              </tr>
                              <tr>
                                <td><i className="fa fa-check me-3 text-success"></i>Kurta
                                  Material:Poly Crepe</td>
                              </tr>
                              <tr>
                                <td><i className="fa fa-check me-3 text-success"></i>Style:
                                  A-line 48" length Kurta with 3/4 Bell Sleeve</td>
                              </tr>
                              <tr>
                                <td><i
                                  className="fa fa-check me-3 text-success"></i>Ocassion:Casual,
                                  Formal</td>
                              </tr>
                              <tr>
                                <td><i className="fa fa-check me-3 text-success"></i>Packet
                                  contains: 1 readymade Kurta.</td>
                              </tr>
                              <tr>
                                <td><i className="fa fa-check me-3 text-success"></i>Size
                                  Declaration: Please choose garment size that is two
                                  inches more than your body measurement.e.g:-For Bust
                                  size -36(S),Select garment size-38''(M).</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body p-0">
              <div className="d-flex p-3">
                <h5 className="float-start main-content-label mb-0 mt-2">All Ratings and Reviews</h5>
                <Link to="#"
                  className="btn btn-outline-primary btn-sm float-end ms-auto">Top Rated</Link>
              </div>
              <div className="media mt-0 p-3 border-bottom border-top">
                <div className="d-flex me-3">
                  <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                    <img className="media-image avatar avatar-md rounded-circle" alt="64x64" src={imagesData('face6')} /> </Link>
                </div>
                <div className="media-body">
                  <Link to={`${import.meta.env.BASE_URL}pages/profile/`}><p className="mt-0 mb-1 fw-semibold fs-16">Bruce Tran
                    <span className="fs-14 ms-0" data-bs-toggle="tooltip" data-placement="top"
                      title="" data-bs-original-title="verified"><i
                        className="fa fa-check-circle-o text-success"></i></span>
                  </p>
                  </Link>
                  <span className="text-muted fs-13 ms-1">Tue, 20 Mar 2020</span>
                  <div className="text-warning mt-1">
                    <i className="bx bxs-star active"></i>
                    <i className="bx bxs-star active"></i>
                    <i className="bx bxs-star active"></i>
                    <i className="bx bxs-star active"></i>
                    <i className="bx bxs-star"></i>
                  </div>
                  <p className="mb-2 mt-2">
                    Lorem Ipsum available, quis Neque porro quisquam est, qui dolorem ipsum quia
                    .
                  </p>
                  <p className="mb-1"> <Link to="#" className="me-2"><span
                    className="badge badge-primary">Helpful</span></Link>
                    <Link to="" className="me-2"><span className="">Comment</span></Link>
                    <Link to="" className="me-2"><span className="">Report</span></Link>
                    <span className="float-end"> <Link to="#" className="new ms-3"><i
                      className="text-success br-7 text-success fe fe-thumbs-up fs-16 text-icon "></i></Link>
                      <Link to="#" className="new ms-3 mt-6"><i
                        className="text-danger br-7 text-danger fe fe-thumbs-down  fs-16 text-icon"></i></Link>
                    </span>
                  </p>
                </div>
              </div>
              <div className="media mt-0  p-3 border-bottom">
                <div className="d-flex me-3">
                  <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                    <img className="media-image avatar avatar-md rounded-circle" alt="64x64" src={imagesData('face7')} /> </Link>
                </div>
                <div className="media-body">
                  <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                    <span className="mt-0 mb-1 fw-semibold fs-16">Mina Harpe</span>
                    <span className="fs-14 ms-0" data-bs-toggle="tooltip" data-placement="top" title="" data-bs-original-title="verified">
                      <i className="fa fa-check-circle-o text-success"></i>
                    </span>
                  </Link>
                  <span className="text-muted fs-13 ms-1">Tue, 20 Mar 2020</span>
                  <div className="text-warning mt-1">
                    <i className="bx bxs-star active"></i>
                    <i className="bx bxs-star active"></i>
                    <i className="bx bxs-star active"></i>
                    <i className="bx bxs-star active"></i>
                    <i className="bx bxs-star"></i>
                  </div>
                  <p className="mb-2 mt-2">
                    Lorem Ipsum available, quis Neque porro quisquam est, qui dolorem ipsum quia
                    dolor sit amet, et nostrud exercitation ullamco laboris commodo consequat.
                  </p>
                  <p className="mb-1">
                    <Link to="#" className="me-2"><span
                      className="badge badge-primary">Helpful</span></Link>
                    <Link to="" className="me-2"><span className="">Comment</span></Link>
                    <Link to="" className="me-2"><span className="">Report</span></Link>
                    <span className="float-end"> <Link to="#" className="new ms-3"><i
                      className="text-success br-7 text-success fe fe-thumbs-up fs-16 text-icon "></i></Link>
                      <Link to="#" className="new ms-3 mt-6"><i
                        className="text-danger br-7 text-danger fe fe-thumbs-down  fs-16 text-icon"></i></Link>
                    </span>
                  </p>
                </div>
              </div>
              <div className="media mt-0 p-3">
                <div className="d-flex me-3">
                  <Link to={`${import.meta.env.BASE_URL}pages/profile/`}>
                    <img className="media-image avatar avatar-md rounded-circle" alt="64x64" src={imagesData('face8')} /> </Link>
                </div>
                <div className="media-body">
                  <Link to={`${import.meta.env.BASE_URL}pages/profile/`}><h5 className="mt-0 mb-1 fw-semibold fs-16">Maria Quinn
                    <span className="fs-14 ms-0" data-bs-toggle="tooltip" data-placement="top"
                      title="" data-bs-original-title="verified"><i
                        className="fa fa-check-circle-o text-success"></i></span>
                  </h5></Link>
                  <span className="text-muted fs-13  ms-1">Tue, 20 Mar 2020</span>
                  <div className="text-warning mt-1">
                    <i className="bx bxs-star active"></i>
                    <i className="bx bxs-star active"></i>
                    <i className="bx bxs-star active"></i>
                    <i className="bx bxs-star active"></i>
                    <i className="bx bxs-star text-light"></i>
                  </div>
                  <p className="mb-2 mt-2">
                    Lorem Ipsum available, quis Neque porro quisquam est exercitation ullamco
                    laboris commodo consequat.
                  </p>
                  <p className="mb-1">
                    <Link to="#" className="me-2"><span
                      className="badge badge-primary">Helpful</span></Link>
                    <Link to="" className="me-2"><span className="">Comment</span></Link>
                    <Link to="" className="me-2"><span className="">Report</span></Link>
                    <span className="float-end"> <Link to="#" className="new ms-3"><i
                      className="text-success br-7 text-success fe fe-thumbs-up fs-16 text-icon "></i></Link>
                      <Link to="#" className="new ms-3 mt-6"><i
                        className="text-danger br-7 text-danger fe fe-thumbs-down  fs-16 text-icon"></i></Link>
                    </span>
                  </p>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-light">More Reviews</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card">
            <div className="ps-4 pe-4 pb-2 pt-4">
              <h5 className="mb-4">Write Review</h5>
              <div className="mb-1">
                <div className="row">
                  <div className="form-group col-md-6">
                    <div className="mb-3 fw-semibold">Your Name</div>
                    <input className="form-control" placeholder="Your Name" type="text" />
                  </div>
                  <div className="form-group col-md-6">
                    <div className="mb-3 fw-semibold">Email Address</div>
                    <input className="form-control" placeholder="Email Address" type="text" />
                  </div>
                </div>
              </div>
              <span className="star-rating">
                <Link to="#"><i className="icofont-ui-rating icofont-2x"></i></Link>
                <Link to="#"><i className="icofont-ui-rating icofont-2x"></i></Link>
                <Link to="#"><i className="icofont-ui-rating icofont-2x"></i></Link>
                <Link to="#"><i className="icofont-ui-rating icofont-2x"></i></Link>
                <Link to="#"><i className="icofont-ui-rating icofont-2x"></i></Link>
              </span>
              <form>
                <div className="form-group">
                  <div className="mb-3 fw-semibold">Your Comment</div>
                  <textarea className="form-control"></textarea>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary mt-3 mb-0" type="button">Post your
                    review</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-3 col-sm-6">
          <div className="card item-card">
            <div className="card-body pb-0 h-100  product-grid6">
              <div className="text-center product-image">
                <img src={imagesData('ecommerce2')} alt="img" className="img-fluid" />
              </div>
              <div className="card-body cardbody position-relative">
                <div className="cardtitle">
                  <span className="fs-12 mb-2 fw-bold text-uppercase">Fashion</span>
                  <a className="h6 mb-2 mt-4 fw-bold text-uppercase"> long slit</a>
                </div>
                <div className="cardprice">
                  <span className="type--strikethrough">$999</span>
                  <strong>$799</strong>
                </div>
              </div>
            </div>
            <div className="text-center border-top pt-3 pb-3 ps-2 pe-2 ">
              <Link to="#" className="btn btn-primary mb-0 mb-lg-2 me-2"> View More</Link>
              <Link to={`${import.meta.env.BASE_URL}pages/ecommerce/cart/`} className="btn btn-secondary mb-0 mb-lg-2"><i
                className="fa fa-shopping-cart"></i> Add to cart</Link>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card item-card">
            <div className="card-body pb-0 h-100  product-grid6">
              <div className="text-center product-image">
                <img src={imagesData('ecommerce22')} alt="img" className="img-fluid" />
              </div>
              <div className="card-body cardbody position-relative">
                <div className="cardtitle">
                  <span className="fs-12 mb-2 fw-bold text-uppercase">Items</span>
                  <a className="h6 mb-2 mt-4 fw-bold text-uppercase">Mens wear</a>
                </div>
                <div className="cardprice">
                  <span className="type--strikethrough">$999</span>
                  <strong>$799</strong>
                </div>
              </div>
            </div>
            <div className="text-center border-top pt-3 pb-3 ps-2 pe-2 ">
              <Link to="#" className="btn btn-primary mb-0 mb-lg-2 me-2"> View More</Link>
              <Link to={`${import.meta.env.BASE_URL}pages/ecommerce/cart/`} className="btn btn-secondary mb-0 mb-lg-2"><i
                className="fa fa-shopping-cart"></i> Add to cart</Link>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card item-card">
            <div className="card-body pb-0 h-100 product-grid6">
              <div className="text-center product-image">
                <img src={imagesData('ecommerce21')} alt="img" className="img-fluid" />
              </div>
              <div className="card-body cardbody position-relative ">
                <div className="cardtitle">
                  <span className="fs-12 mb-2 fw-bold text-uppercase">Fashion</span>
                  <a className="h6 mb-2 mt-4 fw-bold text-uppercase">kids wear</a>
                </div>
                <div className="cardprice">
                  <span className="type--strikethrough">$999</span>
                  <strong>$799</strong>
                </div>
              </div>
            </div>
            <div className="text-center border-top pt-3 pb-3 ps-2 pe-2 ">
              <Link to="#" className="btn btn-primary mb-0 mb-lg-2 me-2"> View More</Link>
              <Link to={`${import.meta.env.BASE_URL}pages/ecommerce/cart/`} className="btn btn-secondary mb-0 mb-lg-2"><i
                className="fa fa-shopping-cart"></i> Add to cart</Link>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card item-card">
            <div className="card-body pb-0 h-100  product-grid6">
              <div className="text-center product-image">
                <img src={imagesData('ecommerce5')} alt="img" className="img-fluid" />
              </div>
              <div className="card-body cardbody position-relative">
                <div className="cardtitle">
                  <span className="fs-12 mb-2 fw-bold text-uppercase">Accessories</span>
                  <a className="h6 mb-2 mt-4 fw-bold text-uppercase">camara</a>
                </div>
                <div className="cardprice">
                  <span className="type--strikethrough">$999</span>
                  <strong>$799</strong>
                </div>
              </div>
            </div>
            <div className="text-center border-top pt-3 pb-3 ps-2 pe-2 ">
              <Link to="#" className="btn btn-primary mb-0 mb-lg-2 me-2"> View More</Link>
              <Link to={`${import.meta.env.BASE_URL}pages/ecommerce/cart/`} className="btn btn-secondary mb-0 mb-lg-2"><i
                className="fa fa-shopping-cart"></i> Add to cart</Link>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
};

export default ProductDetails;
