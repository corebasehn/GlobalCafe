import { FC, Fragment } from 'react';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { Link } from "react-router-dom";
import { imagesData } from '../../common/commonimages';

interface ComponentProps { }

const Notificationslist: FC<ComponentProps> = () => {
  return (
    <Fragment>
      <Pageheader title="NOTIFICATIONS LIST" heading="Pages" active="Notifications List" />
      <div className="container">
        <ul className="notification">
          <li>
            <div className="notification-time">
              <span className="date">Friday</span>
              <span className="time">02:31</span>
            </div>
            <div className="notification-icon">
              <Link to="#"></Link>
            </div>
            <div className="notification-body">
              <div className="media mt-0">
                <div className="avatar avatar-md avatar-rounded main-avatar online me-3 shadow">
                  <Link to={`${import.meta.env.BASE_URL}pages/profile/`}><img alt="avatar" className="rounded-circle" src={imagesData('face6')} /></Link>
                </div>
                <div className="media-body">
                  <div className="d-flex align-items-center">
                    <div className="mt-0">
                      <h5 className="mb-1 fs-15 fw-semibold text-dark">Emperio</h5>
                      <p className="mb-0 fs-13 mb-0 text-muted">Project assigned by the manager all<span className="badge bg-primary-transparent tx-12 fw-semibold text-primiary ms-1 me-1">files</span>and<span className="badge bg-primary-transparent text-primary tx-12 fw-semibold ms-1 me-1">folders</span>were included</p>
                    </div>
                    <div className="ms-auto">
                      <span className="float-end badge notification-badge">
                        <span className="tx-11 fw-semibold">24, oct 2021</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="notification-time">
              <span className="date">Monday</span>
              <span className="time">08:47</span>
            </div>
            <div className="notification-icon">
              <Link to="#"></Link>
            </div>
            <div className="notification-body">
              <div className="media mt-0">
                <div className="avatar avatar-md avatar-rounded main-avatar offline me-3 my-auto shadow">
                  <Link to={`${import.meta.env.BASE_URL}pages/profile/`}><img alt="avatar" className="rounded-circle" src={imagesData('face1')} /></Link>
                </div>
                <div className="media-body">
                  <div className="d-flex align-items-center">
                    <div className="mt-0">
                      <h5 className="mb-1 fs-15 fw-semibold text-dark">Anesthesia</h5>
                      <p className="mb-0 fs-13 mb-0 text-muted">Admin and other team accepted your work request</p>
                    </div>
                    <div className="ms-auto">
                      <span className="float-end badge notification-badge">
                        <span className="tx-11 fw-semibold">30,sep 2021</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="notification-time">
              <span className="date">Yesterday</span>
              <span className="time">18:43</span>
            </div>
            <div className="notification-icon">
              <Link to="#"></Link>
            </div>
            <div className="notification-body">
              <div className="media mt-0">
                <div className="avatar avatar-md avatar-rounded main-avatar online me-3 my-auto shadow">
                  <Link to={`${import.meta.env.BASE_URL}pages/profile/`}><img alt="avatar" className="rounded-circle" src={imagesData('face15')} /></Link>
                </div>
                <div className="media-body">
                  <div className="d-flex align-items-center">
                    <div className="mt-0">
                      <h5 className="mb-1 fs-15 fw-semibold text-dark">Hughes</h5>
                      <p className="mb-0 fs-13 mb-0 text-muted">Temporary data will be <span className="badge bg-danger-transparent tx-12 fw-semibold me-1 ms-1">deleted</span> once dedicated time complated</p>
                    </div>
                    <div className="ms-auto">
                      <span className="float-end badge notification-badge">
                        <span className="tx-11 fw-semibold">11,sep 2021</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="notification-time">
              <span className="date">Today</span>
              <span className="time">03:18</span>
            </div>
            <div className="notification-icon">
              <Link to="#"></Link>
            </div>
            <div className="notification-body">
              <div className="media mt-0">
                <div className="avatar avatar-md avatar-rounded main-avatar online me-3 my-auto shadow">
                  <Link to={`${import.meta.env.BASE_URL}pages/profile/`}><img alt="avatar" className="rounded-circle" src={imagesData('face2')} /></Link>
                </div>
                <div className="media-body">
                  <div className="d-flex align-items-center">
                    <div className="mt-0">
                      <h5 className="mb-1 fs-15 fw-semibold text-dark">Samantha Melon</h5>
                      <p className="mb-0 tx-12 mb-0 text-muted">Approved date for sanction of loan is verified <i className="fe fe-check text-success"></i></p>
                    </div>
                    <div className="ms-auto">
                      <span className="float-end badge notification-badge">
                        <span className="tx-11 fw-semibold">18, sep 2021</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="notification-time">
              <span className="date">Today</span>
              <span className="time">12:24</span>
            </div>
            <div className="notification-icon">
              <Link to="#"></Link>
            </div>
            <div className="notification-body">
              <div className="media mt-0">
                <div className="avatar avatar-md avatar-rounded main-avatar offline me-3 my-auto shadow">
                  <Link to={`${import.meta.env.BASE_URL}pages/profile/`}><img alt="avatar" className="rounded-circle" src={imagesData('face11')} /></Link>
                </div>
                <div className="media-body">
                  <div className="d-flex align-items-center">
                    <div className="mt-0">
                      <h5 className="mb-1 fs-15 fw-semibold text-dark">Nexus Ronaldo</h5>
                      <p className="mb-0 fs-13 mb-0 text-muted">Social network accounts are at risk check your <span className="badge bg-success-transparent fw-semibold tx-12 ms-1 me-1">login</span> details</p>
                    </div>
                    <div className="ms-auto">
                      <span className="float-end badge notification-badge">
                        <span className="tx-11 fw-semibold">18,sep 2021</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="notification-time">
              <span className="date">Today</span>
              <span className="time">04:11</span>
            </div>
            <div className="notification-icon">
              <Link to="#"></Link>
            </div>
            <div className="notification-body">
              <div className="media mt-0">
                <div className="avatar avatar-md avatar-rounded main-avatar online me-3 my-auto shadow">
                  <Link to={`${import.meta.env.BASE_URL}pages/profile/`}><img alt="avatar" className="rounded-circle" src={imagesData('face13')} /></Link>
                </div>
                <div className="media-body">
                  <div className="d-flex align-items-center">
                    <div className="mt-0">
                      <h5 className="mb-1 fs-15 fw-semibold text-dark">Hercules</h5>
                      <p className="mb-0 fs-13 mb-0 text-muted">Changed the password of gmail 4 hrs ago. <span className="badge bg-secondary">Update</span></p>
                    </div>
                    <div className="ms-auto">
                      <span className="float-end badge notification-badge">
                        <span className="tx-11 fw-semibold">18,sep 2021</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="notification-time">
              <span className="date">today</span>
              <span className="time">02:52</span>
            </div>
            <div className="notification-icon">
              <Link to="#"></Link>
            </div>
            <div className="notification-body">
              <div className="media mt-0">
                <div className="avatar avatar-md avatar-rounded main-avatar online me-3 my-auto shadow">
                  <Link to={`${import.meta.env.BASE_URL}pages/profile/`}><img alt="avatar" className="rounded-circle" src={imagesData('face4')} /></Link>
                </div>
                <div className="media-body">
                  <div className="d-flex align-items-center">
                    <div className="mt-0">
                      <h5 className="mb-1 fs-15 fw-semibold text-dark">Milinda</h5>
                      <p className="mb-0 fs-13 mb-0 text-muted">Completed target date to change data heirarchy</p>
                    </div>
                    <div className="ms-auto">
                      <span className="float-end badge notification-badge">
                        <span className="tx-11 fw-semibold">18,sep 2021</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div className="text-center mb-4">
          <button className="btn btn-primary">Load more</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Notificationslist;