import { Fragment, useState } from "react";
import Pageheader from "../../../layout/layoutcomponent/pageheader";
import { wishlistitem } from "../../../common/commondata";
import { Link } from "react-router-dom";
import { Col, Pagination } from "react-bootstrap";

const Wishlist = () => {

  const [wishlistData, setWishlistData] = useState(wishlistitem);

  const removeItem = (idx: any) => {
    const updatedWishlist = wishlistData.filter((item) => item !== idx);
    setWishlistData(updatedWishlist);
  };

  return (
    <Fragment>

      <Pageheader title="WISH LIST" heading="Ecommerce" active="Wish-list" />

      <div className="col-lg-12 col-xl-12 p-0">
        <div className="row">
          {wishlistData.map((idx, index) => (
            <Col xl={3} lg={6} md={4} className="alert" key={index}>
              <div className="card item-card ">
                <div className="card-body pb-0">
                  <div className="text-center zoom">
                    <Link to={`${import.meta.env.BASE_URL}pages/ecommerce/shop/`}><img className="w-100 br-5" src={idx.imageUrl} alt="img" /></Link>
                  </div>
                  <div className="card-body px-0 pb-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="cardtitle">
                          <div>
                            <Link to="#"><i className="fa fa-star text-warning"></i></Link>
                            <Link to="#"><i className="fa fa-star text-warning"></i></Link>
                            <Link to="#"><i className="fa fa-star text-warning"></i></Link>
                            <Link to="#"><i className="fa fa-star-half text-warning"></i></Link>
                            <Link to="#"><i className="fa fa-star-o text-warning"></i></Link>
                            <Link to="#"> ({idx.reviews})</Link>
                          </div>
                          <a className="shop-title">{idx.title}</a>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="cardprice-2">
                          <span className="type--strikethrough number-font">${idx.oldPrice}</span>
                          <span className="number-font">${idx.newPrice}</span>
                        </div>
                      </div>
                      <div>
                        <p className="shop-description text-muted mt-2 mb-0">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ipsum quia saepe esse.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer justify-content-center">
                  <div className="ps-2 pe-2">
                    <Link to={`${import.meta.env.BASE_URL}pages/ecommerce/cart/`} className="btn btn-md btn-primary mb-2 ms-2 w-45"><i className="fe fe-shopping-cart me-2 d-inline-block"></i>Add to Cart</Link>
                    <Link to="#!" className="btn btn-md btn-light mb-2 ms-2 w-45" onClick={() => removeItem(idx)}>
                      <span className="me-2 fs-14">Remove</span>
                      <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#495057"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          ))}

        </div>
        <div className="d-flex justify-content-end">
          <Pagination className='mb-5'>
            <Pagination.Prev disabled />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Item>{4}</Pagination.Item>
            <Pagination.Item>{5}</Pagination.Item>
            <Pagination.Next />
          </Pagination>
        </div>
      </div>

    </Fragment>
  );
};

export default Wishlist;
