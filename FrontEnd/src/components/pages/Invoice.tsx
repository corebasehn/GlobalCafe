import { Fragment } from 'react';
import { imagesData } from '../../common/commonimages';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { Link } from 'react-router-dom';

const Invoice = () => {
  return (
    <Fragment>

      <Pageheader title="INVOICE" heading="Pages" active="Invoice" />

      <div className="row row-sm">
        <div className="col-lg-12 col-md-12">
          <div className="card custom-card">
            <div className="card-body">
              <div className="d-lg-flex">
                <h6 className="main-content-label mb-1"><span className="d-flex mb-4"><Link to={`${import.meta.env.BASE_URL}dashboard/dashboard/`}><img src={imagesData('togglelogo')} className="sign-favicon ht-40" alt="logo" /></Link></span></h6>
                <div className="ms-auto">
                  <p className="mb-1"><span className="fw-bold">Invoice No : #000321</span></p>
                </div>
              </div>
              <div className="row row-sm">
                <div className="col-lg-6">
                  <p className="h3">Invoice Form:</p>
                  <address>
                    Street Address<br />
                    State, City<br />
                    Region, Postal Code<br />
                    yourdomain@example.com
                  </address>
                </div>
                <div className="col-lg-6 text-end">
                  <p className="h3">Invoice To:</p>
                  <address>
                    Street Address<br />
                    State, City<br />
                    Region, Postal Code<br />
                    ypurdomain@example.com
                  </address>
                  <div className="">
                    <p className="mb-1"><span className="fw-bold">Invoice Date :</span></p>
                    <address>
                      01st November 2020
                    </address>
                  </div>
                </div>
              </div>
              <div className="table-responsive mg-t-40">
                <table className="table table-invoice table-bordered">
                  <thead>
                    <tr>
                      <th className="wd-20p">Product</th>
                      <th className="wd-40p">Description</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-end">Unit</th>
                      <th className="text-end">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Logo Creation</td>
                      <td className="fs-12">Logo and business cards design</td>
                      <td className="text-center">2</td>
                      <td className="text-end">$60.00</td>
                      <td className="text-end">$120.00</td>
                    </tr>
                    <tr>
                      <td>Online Store Design & Development</td>
                      <td className="fs-12">Design/Development for all popular modern browsers</td>
                      <td className="text-center">3</td>
                      <td className="text-end">$80.00</td>
                      <td className="text-end">$240.00</td>
                    </tr>
                    <tr>
                      <td>App Design</td>
                      <td className="fs-12">Promotional mobile application</td>
                      <td className="text-center">1</td>
                      <td className="text-end">$40.00</td>
                      <td className="text-end">$40.00</td>
                    </tr>
                    <tr>
                      <td className="valign-middle" colSpan={2} rowSpan={4}>
                        <div className="invoice-notes">
                          <label className="main-content-label fs-13">Notes</label>
                          <p className="text-dark">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                        </div>
                        {/* <!-- invoice-notes --> */}
                      </td>
                      <td className="text-end">Sub-Total</td>
                      <td className="text-end" colSpan={2}>$400.00</td>
                    </tr>
                    <tr>
                      <td className="text-end">Tax</td>
                      <td className="text-end" colSpan={2}>3%</td>
                    </tr>
                    <tr>
                      <td className="text-end">Discount</td>
                      <td className="text-end" colSpan={2}>10%</td>
                    </tr>
                    <tr>
                      <td className="text-end tx-uppercase tx-bold tx-inverse">TOTAL DUE</td>
                      <td className="text-end" colSpan={2}>
                        <h4 className="fw-bold">$450.00</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-end">
              <div className="btn-list">
                <button type="button" className="btn ripple btn-primary mb-1"><i className="fe fe-credit-card me-1"></i> Pay Invoice</button>
                <button type="button" className="btn ripple btn-secondary mb-1"><i className="fe fe-send me-1"></i> Send Invoice</button>
                <button type="button" className="btn ripple btn-info mb-1" onClick={() => window.print()}><i className="fe fe-printer me-1"></i> Print Invoice</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Invoice;
