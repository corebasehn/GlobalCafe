import { Fragment, useState } from "react";
import Pageheader from "../../../layout/layoutcomponent/pageheader";
import { imagesData } from "../../../common/commonimages";
import { CartItem, cartData } from "../../../common/commondata";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Swal from "sweetalert2";

const Cart = () => {

  const [cartItems, setCartItems] = useState<CartItem[]>(cartData);

  const handleIncrement = (index: number) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity < 9) {
      updatedCartItems[index].quantity++;
      setCartItems(updatedCartItems);
    }
  };

  const handleDecrement = (index: number) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 0) {
      updatedCartItems[index].quantity--;
      setCartItems(updatedCartItems);
    }
  };

  const handleDelete = (index: number) => {
    // Display Sweet Alert confirmation dialog
    Swal.fire({
      title: 'Are you sure you want to delete this item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms deletion, remove the item
        const updatedCartItems = cartItems.filter((_item, i) => i !== index);
        setCartItems(updatedCartItems);
        
        Swal.fire({
          title: 'Item deleted!',
          icon: 'success',
        });
      }
    });
  };

  return (
    <Fragment>

      <Pageheader title="CART" heading="Ecommerce" active="Cart" />
      <div className="row">
        <div className="col-lg-12 col-xl-9 col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="product-details table-responsive text-nowrap">
                <table className="table table-bordered table-hover mb-0 text-nowrap">
                  <thead>
                    <tr>
                      <th className="text-start">Product</th>
                      <th className="w-150">Quantity</th>
                      <th>Prize</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="media">
                            <div className="card-aside-img">
                              <img src={imagesData(item.image)} alt="img" className="h-60 w-60" />
                            </div>
                            <div className="media-body">
                              <div className="card-item-desc mt-0">
                                <h6 className="fw-semibold mt-0 text-uppercase">{item.name}</h6>
                                <dl className="card-item-desc-1">
                                <dt>Size&nbsp;:&nbsp;</dt>
                                  <dd>{item.size}</dd>
                                </dl>
                                <dl className="card-item-desc-1">
                                  <dt>Color&nbsp;:&nbsp;</dt>
                                  <dd>{item.color}</dd>
                                </dl>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="handle-counter input-group border rounded flex-nowrap">
                            <button onClick={() => handleDecrement(index)} className="btn btn-icon btn-light input-group-text product-quantity-minus"><i className="ri-subtract-line"></i></button>
                            <span className="border-0 text-center my-2 w-100" aria-label="quantity">{item.quantity}</span>
                            <button onClick={() => handleIncrement(index)} className="btn btn-icon btn-light input-group-text product-quantity-plus"><i className="ri-add-line"></i></button>
                          </div>
                        </td>
                        <td className="text-center text-lg text-medium fw-bold fs-15">${item.price.toFixed(2)}</td>
                        <td className="text-center"><span className={`badge ${item.status === 'In stock' ? 'bg-success' : 'bg-danger'} p-1`}>{item.status}</span></td>
                        <td className="text-center">
                          <OverlayTrigger overlay={<Tooltip>Remove item</Tooltip>}><Link className="btn btn-sm btn-danger-light" to="#!" onClick={() => handleDelete(index)}><i className="fe fe-trash"></i></Link></OverlayTrigger>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between flex-wrap gap-2">
              <div>
                <Link className="btn btn-secondary" to={`${import.meta.env.BASE_URL}pages/ecommerce/shop/`}><i className="fe fe-corner-up-left  mx-2"></i>Back to Shopping</Link>
              </div>
              <div className="btn-list">
                <Link className="btn btn-primary" to={`${import.meta.env.BASE_URL}pages/ecommerce/cart/`}><i className="fe fe-refresh-cw mx-2"></i>Update Cart</Link>
                <Link className="btn btn-outline-primary" to={`${import.meta.env.BASE_URL}pages/ecommerce/checkout/`}><i className="fe fe-log-in mx-2"></i>Checkout</Link>
              </div>

            </div>
          </div>
        </div>
        <div className="col-lg-12 col-xl-3 col-md-12">
          <div className="card custom-card">
            <div className="card-body">
              <form>
                <div className="form-group mb-0"> <label>Have coupon?</label>
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Coupon code" aria-label="Coupon code" aria-describedby="button-addon2" />
                    <button className="btn btn-primary" type="button" >Apply</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="card custom-card cart-details">
            <div className="card-body p-0">
              <div className="p-4">
                <p className="mb-3 fw-bold fs-14">PRICE DETAIL</p>
                <dl className="dlist-align">
                  <dt className="">ITEMS 3</dt>
                  <dd className="text-end ms-auto">$ 262.00</dd>
                </dl>
                <dl className="dlist-align">
                  <dt>Discount:</dt>
                  <dd className="text-end text-danger ms-auto">- $20.00</dd>
                </dl>
                <dl className="dlist-align">
                  <dt>Total price:</dt>
                  <dd className="text-end ms-auto">$252.97</dd>
                </dl>
                <dl className="dlist-align mb-0">
                  <dt>Delivery:</dt>
                  <dd className="text-end text-success ms-auto">Free</dd>
                </dl>
              </div>
              <hr className="mt-0" />
              <div className="px-4">
                <dl className="dlist-align mb-0">
                  <dt>Total:</dt>
                  <dd className="text-end  ms-auto fs-20"><strong>$252.97</strong></dd>
                </dl>
              </div>
            </div>
            <div className="card-footer">
              <div className="column"><Link className="btn btn-primary" to={`${import.meta.env.BASE_URL}pages/ecommerce/shop/`}>Continue Shopping</Link></div>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
};

export default Cart;
