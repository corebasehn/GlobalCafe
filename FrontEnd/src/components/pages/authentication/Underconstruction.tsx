import { FC, Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ComponentProps { }

const Underconstruction: FC<ComponentProps> = () => {

  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const futureDate = new Date("Dec 31, 2024 11:30:00");
      const now = new Date();
      const diff = futureDate.getTime() - now.getTime();

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <Fragment>
      <div className="cover-image forgot-page">
        <div className="container">
          <div className="row justify-content-center align-items-center authentication authentication-basic h-100">
            <div className="col mx-auto">
              <div className="row py-4 justify-content-center">
                <div className="col-xl-5 card-sigin-main ">
                  <div className="card-sigin">
                    <div className="">
                      <div>
                        <h2 className="tx-30 text-center">Under Maintenance</h2>
                        <p className="tx-12 text-muted text-center">Our website is currently undergoing scheduled maintenance. We Should be back shortly. Thank you for your patience!</p>
                        <div className="row row-sm mx-auto" id="timer">
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6 mb-3 mb-sm-1">
                            <div className="p-2 under-maintenance-time rounded">
                              <p className="mb-1 fs-12 op-9">DAYS</p>
                              <h4 className="fw-semibold mb-0 text-fixed-white">{days}</h4>
                            </div>
                          </div>
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6 mb-3 mb-sm-1">
                            <div className="p-2 under-maintenance-time rounded">
                              <p className="mb-1 fs-12 op-9">HOURS</p>
                              <h4 className="fw-semibold mb-0 text-fixed-white">{hours}</h4>
                            </div>
                          </div>
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6 mb-3 mb-sm-1">
                            <div className="p-2 under-maintenance-time rounded">
                              <p className="mb-1 fs-12 op-9">MINUTES</p>
                              <h4 className="fw-semibold mb-0 text-fixed-white">{minutes}</h4>
                            </div>
                          </div>
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6 mb-3 mb-sm-1">
                            <div className="p-2 under-maintenance-time rounded">
                              <p className="mb-1 fs-12 op-9">SECONDS</p>
                              <h4 className="fw-semibold mb-0 text-fixed-white">{seconds}</h4>
                            </div>
                          </div>
                        </div>
                        <div className="input-group mb-3 mt-5 text-center">
                          <input type="text" className="form-control" placeholder="Enter your Email" aria-label="Enter your Email" aria-describedby="button-addon2" />
                          <button className="btn btn-primary" type="button" id="button-addon2">Subscribe</button>
                        </div>
                        <div className="mt-4 d-flex text-center justify-content-center">
                          <Link to="#" className="btn btn-icon me-3">
                            <span className="btn-inner--icon"> <i className="bx bxl-facebook tx-18 tx-prime"></i> </span>
                          </Link>
                          <Link to="#" className="btn btn-icon me-3">
                            <span className="btn-inner--icon"> <i className="ri-twitter-x-line fs-15 tx-prime"></i> </span>
                          </Link>
                          <Link to="#" className="btn btn-icon me-3">
                            <span className="btn-inner--icon"> <i className="bx bxl-linkedin tx-18 tx-prime"></i> </span>
                          </Link>
                          <Link to="#" className="btn  btn-icon me-3">
                            <span className="btn-inner--icon"> <i className="bx bxl-instagram tx-18 tx-prime"></i> </span>
                          </Link>
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

export default Underconstruction;