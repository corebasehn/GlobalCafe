import { Fragment } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import { OverlayTrigger, Pagination, Tooltip, } from "react-bootstrap";
import Pageheader from "../../../layout/layoutcomponent/pageheader";
import { OptionBabyKids, OptionElectronics, OptionMens, OptionSportBooksMore, OptionType, OptionWomen, Optioncategory2 } from "../../../common/selectdata";
import { shoppingData } from "../../../common/commondata";

const Shop = () => {

  return (
    <Fragment>

      <Pageheader title="SHOP" heading="Ecommerce" active="Products" />

      <div className="row row-sm">
        <div className="col-xl-9 col-lg-8 col-md-12">
          <div className="row row-sm">

            {shoppingData.map(product => (
              <div key={product.id} className="col-md-4 col-lg-6 col-xl-4 col-xxl-3 col-sm-6">
                <div className="card">
                  <div className="card-body h-100 product-grid6">
                    <div className="pro-img-box product-image">
                      <Link to={`${import.meta.env.BASE_URL}pages/ecommerce/productdetails/`}>
                        <img className="pic-1" src={product.image1} alt="product-image" />
                        <img className="pic-2" src={product.image2} alt="product-image-1" />
                      </Link>
                      <ul className="icons list-unstyled">
                        <li>
                          <OverlayTrigger overlay={<Tooltip>Add to Wishlist</Tooltip>}><Link to={`${import.meta.env.BASE_URL}pages/ecommerce/wishlist/`} className="primary-gradient me-2"><i className="fa fa-heart"></i> </Link></OverlayTrigger>
                        </li>
                        <li>
                          <OverlayTrigger overlay={<Tooltip>Add to Cart</Tooltip>}><Link to={`${import.meta.env.BASE_URL}pages/ecommerce/cart/`} className="secondary-gradient me-2"><i className="fa fa-shopping-cart"></i> </Link></OverlayTrigger>
                        </li>
                        <li>
                          <OverlayTrigger overlay={<Tooltip>Quick View</Tooltip>}><Link to={`${import.meta.env.BASE_URL}pages/ecommerce/productdetails/`} className="info-gradient"><i className="fas fa-eye"></i> </Link></OverlayTrigger>
                        </li>
                      </ul>
                    </div>
                    <div className="text-center pt-2">
                      <h3 className="h6 mb-2 mt-4 fw-bold text-uppercase">{product.name}</h3>

                      <span className="fs-15 ms-auto">
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star text-warning"></i>
                        <i className="ion ion-md-star-half text-warning"></i>
                        <i className="ion ion-md-star-outline text-warning"></i>
                      </span>
                      <h4 className="h5 mb-0 mt-1 text-center fw-bold fs-22">${product.price} <span className="text-secondary fw-normal fs-13 ms-1 prev-price text-decoration-line-through">${product.prevPrice}</span></h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Pagination className="product-pagination justify-content-end list-unstyled">
              <Pagination.Item disabled>Prev</Pagination.Item>
              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Item>{4}</Pagination.Item>
              <Pagination.Item>Next</Pagination.Item>
            </Pagination>
          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-12 mb-3 mb-md-0">
          <div className="card">
            <div className="card-body p-2">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search..." aria-label="Search..." aria-describedby="button-addon2" />
                <button className="btn btn-primary" type="button">Search</button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                Colors
              </h3>
            </div>
            <div className="card-body py-2">
              <div className="row gutters-xs">
                <div className="col-auto">
                  <label className="colorinput">
                    <input name="color" type="radio" value="azure" className="colorinput-input" defaultChecked />
                    <span className="colorinput-color bg-azure"></span>
                  </label>
                </div>
                <div className="col-auto">
                  <label className="colorinput">
                    <input name="color" type="radio" value="indigo" className="colorinput-input" />
                    <span className="colorinput-color bg-indigo"></span>
                  </label>
                </div>
                <div className="col-auto">
                  <label className="colorinput">
                    <input name="color" type="radio" value="purple" className="colorinput-input" />
                    <span className="colorinput-color bg-purple"></span>
                  </label>
                </div>
                <div className="col-auto">
                  <label className="colorinput">
                    <input name="color" type="radio" value="pink" className="colorinput-input" />
                    <span className="colorinput-color bg-pink"></span>
                  </label>
                </div>
                <div className="col-auto">
                  <label className="colorinput">
                    <input name="color" type="radio" value="red" className="colorinput-input" />
                    <span className="colorinput-color bg-red"></span>
                  </label>
                </div>
                <div className="col-auto">
                  <label className="colorinput">
                    <input name="color" type="radio" value="orange" className="colorinput-input" />
                    <span className="colorinput-color bg-orange"></span>
                  </label>
                </div>
                <div className="col-auto">
                  <label className="colorinput">
                    <input name="color" type="radio" value="yellow" className="colorinput-input" />
                    <span className="colorinput-color bg-yellow"></span>
                  </label>
                </div>
                <div className="col-auto">
                  <label className="colorinput">
                    <input name="color" type="radio" value="lime" className="colorinput-input" />
                    <span className="colorinput-color bg-lime"></span>
                  </label>
                </div>
                <div className="col-auto">
                  <label className="colorinput">
                    <input name="color" type="radio" value="green" className="colorinput-input" />
                    <span className="colorinput-color bg-green"></span>
                  </label>
                </div>
                <div className="col-auto">
                  <label className="colorinput">
                    <input name="color" type="radio" value="teal" className="colorinput-input" />
                    <span className="colorinput-color bg-teal"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="card border-0 rounded-0">
              <div className="card-header border-bottom pt-3 pb-3 mb-0 fw-bold text-uppercase">Category</div>
              <div className="card-body pb-0">
                <div className="form-group">
                  <label className="form-label">Mens</label>

                  <Select options={OptionMens} classNamePrefix="Select2" placeholder='Selection 1' />
                </div>
                <div className="form-group mt-2">
                  <label className="form-label">Women</label>

                  <Select options={OptionWomen} classNamePrefix="Select2" placeholder='Selection 1' />

                </div>
                <div className="form-group mt-2">
                  <label className="form-label">Baby & Kids</label>

                  <Select options={OptionBabyKids} classNamePrefix="Select2" placeholder='Selection 1' />
                </div>
                <div className="form-group mt-2">
                  <label className="form-label">Electronics</label>

                  <Select options={OptionElectronics} classNamePrefix="Select2" placeholder='Selection 1' />
                </div>
                <div className="form-group mt-2">
                  <label className="form-label">Sport,Books & More </label>

                  <Select options={OptionSportBooksMore} classNamePrefix="Select2" placeholder='Selection 1' />
                </div>
              </div>
              <div className="card-header border-bottom border-top pt-3 pb-3 mb-0 fw-bold text-uppercase rounded-0">Rating</div>
              <div className="card-body">
                <form >
                  <div className="form-group">
                    <label className="form-label">Brand </label>

                    <Select options={Optioncategory2} classNamePrefix="Select2" placeholder='Selection 1' />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Type </label>

                    <Select options={OptionType} classNamePrefix="Select2" placeholder='Selection 1' />
                  </div>
                </form>
              </div>
              <div className="card-header border-bottom border-top pt-3 pb-3 mb-0 fw-bold text-uppercase rounded-0">Rating</div>
              <div className="py-2 px-3">
                <label className="p-1 mt-2 d-flex align-items-center">
                  <span className="form-check mb-0">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked1" defaultChecked />
                  </span>
                  <span className="ms-2 fs-16 my-auto">
                    <i className="ion ion-md-star  text-warning"></i>
                    <i className="ion ion-md-star  text-warning"></i>
                    <i className="ion ion-md-star  text-warning"></i>
                    <i className="ion ion-md-star  text-warning"></i>
                    <i className="ion ion-md-star  text-warning"></i>
                  </span>
                </label>
                <label className="p-1 mt-2 d-flex align-items-center">
                  <span className="form-check mb-0">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked2" defaultChecked />
                  </span>
                  <span className="ms-2 fs-16 my-auto">
                    <i className="ion ion-md-star  text-warning"></i>
                    <i className="ion ion-md-star  text-warning"></i>
                    <i className="ion ion-md-star  text-warning"></i>
                    <i className="ion ion-md-star  text-warning"></i>
                  </span>
                </label>
                <label className="p-1 mt-2 d-flex align-items-center">
                  <span className="form-check mb-0">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked3" defaultChecked />
                  </span>
                  <span className="ms-2 fs-16 my-auto">
                    <i className="ion ion-md-star  text-warning"></i>
                    <i className="ion ion-md-star  text-warning"></i>
                    <i className="ion ion-md-star  text-warning"></i>
                  </span>
                </label>
                <label className="p-1 mt-2 d-flex align-items-center">
                  <span className="form-check mb-0">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked4" />
                  </span>
                  <span className="ms-2 fs-16 my-auto">
                    <i className="ion ion-md-star  text-warning"></i>
                    <i className="ion ion-md-star  text-warning"></i>
                  </span>
                </label>
                <label className="p-1 mt-2 d-flex align-items-center">
                  <span className="form-check mb-0">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked5" />
                  </span>
                  <span className="ms-2 fs-16 my-auto">
                    <i className="ion ion-md-star  text-warning"></i>
                  </span>
                </label>
                <button className="btn btn-primary mt-2 mb-2 pb-2" type="submit">Filter</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Shop;
