import { Fragment } from "react";
import SimpleBar from 'simplebar-react';
import {

  Dropdown,
  Nav,
  OverlayTrigger,
  Tab,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { imagesData } from "../../../common/commonimages";
import Pageheader from "../../../layout/layoutcomponent/pageheader";

const Chat = () => {
  return (
    <Fragment>

      <Pageheader title="CHAT" heading="Mail" active="Chat" />

      <div className="row row-sm mb-4">
        <div className="col-xl-12">
          <div className="row main-chart-wrapper">
            <div className="col-xxl-3 col-lg-12">
              <div className="card">
                <div className="main-content-app d-block">
                  <div className="main-content-left main-content-left-chat overflow-hidden">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                      <Nav variant="" className="main-nav-line main-nav-line-chat">
                        <Nav.Link eventKey="first">Recent Chat</Nav.Link>
                        <Nav.Link eventKey="second">Groups</Nav.Link>
                        <Nav.Link eventKey="third">Calls</Nav.Link>
                      </Nav>
                    </Tab.Container>
                    <SimpleBar className="main-chat-list chat-users-tab" id="chat-msg-scroll"	>
                      <div className="media new">
                        <div className="main-img-user online">
                          <img alt="" src={imagesData('face5')} /> <span>2</span>
                        </div>
                        <div className="media-body">
                          <div className="media-contact-name">
                            <span>Socrates Itumay</span> <span>2 hours</span>
                          </div>
                          <p>Nam quam nunc, blandit vel aecenas et ante tincid</p>
                        </div>
                      </div>
                      <div className="media new">
                        <div className="main-img-user">
                          <img alt="" src={imagesData('face6')} /> <span>1</span>
                        </div>
                        <div className="media-body">
                          <div className="media-contact-name">
                            <span>Dexter dela Cruz</span> <span>3 hours</span>
                          </div>
                          <p>Maec enas tempus, tellus eget con dime ntum rhoncus, sem quam</p>
                        </div>
                      </div>
                      <div className="media selected">
                        <div className="main-img-user online"><img alt="" src={imagesData('face9')} /></div>
                        <div className="media-body">
                          <div className="media-contact-name">
                            <span>Reynante Labares</span> <span>10 hours</span>
                          </div>
                          <p>Nam quam nunc, bl ndit vel aecenas et ante tincid</p>
                        </div>
                      </div>
                      <div className="media">
                        <div className="main-img-user"><img alt="" src={imagesData('face11')} /></div>
                        <div className="media-body">
                          <div className="media-contact-name">
                            <span>Joyce Chua</span> <span>2 days</span>
                          </div>
                          <p>Ma ecenas tempus, tellus eget con dimen tum rhoncus, sem quam</p>
                        </div>
                      </div>
                      <div className="media">
                        <div className="main-img-user"><img alt="" src={imagesData('face4')} /></div>
                        <div className="media-body">
                          <div className="media-contact-name">
                            <span>Rolando Paloso</span> <span>2 days</span>
                          </div>
                          <p>Nam quam nunc, blandit vel aecenas et ante tincid</p>
                        </div>
                      </div>
                      <div className="media new">
                        <div className="main-img-user">
                          <img alt="" src={imagesData('face7')} /> <span>1</span>
                        </div>
                        <div className="media-body">
                          <div className="media-contact-name">
                            <span>Ariana Monino</span> <span>3 days</span>
                          </div>
                          <p>Maece nas tempus, tellus eget cond imentum rhoncus, sem quam</p>
                        </div>
                      </div>
                      <div className="media">
                        <div className="main-img-user"><img alt="" src={imagesData('face8')} /></div>
                        <div className="media-body">
                          <div className="media-contact-name">
                            <span>Maricel Villalon</span> <span>4 days</span>
                          </div>
                          <p>Nam quam nunc, blandit vel aecenas et ante tincid</p>
                        </div>
                      </div>
                      <div className="media">
                        <div className="main-img-user"><img alt="" src={imagesData('face12')} /></div>
                        <div className="media-body">
                          <div className="media-contact-name">
                            <span>Maryjane Cruiser</span> <span>5 days</span>
                          </div>
                          <p>Mae cenas tempus, tellus eget co ndimen tum rhoncus, sem quam</p>
                        </div>
                      </div>
                      <div className="media">
                        <div className="main-img-user"><img alt="" src={imagesData('face15')} /></div>
                        <div className="media-body">
                          <div className="media-contact-name">
                            <span>Lovely Dela Cruz</span> <span>5 days</span>
                          </div>
                          <p>Mae cenas tempus, tellus eget co ndimen tum rhoncus, sem quam</p>
                        </div>
                      </div>
                      <div className="media">
                        <div className="main-img-user"><img alt="" src={imagesData('face10')} /></div>
                        <div className="media-body">
                          <div className="media-contact-name">
                            <span>Daniel Padilla</span> <span>5 days</span>
                          </div>
                          <p>Mae cenas tempus, tellus eget co ndimen tum rhoncus, sem quam</p>
                        </div>
                      </div>
                      <div className="media">
                        <div className="main-img-user"><img alt="" src={imagesData('face3')} /></div>
                        <div className="media-body">
                          <div className="media-contact-name">
                            <span>John Pratts</span> <span>6 days</span>
                          </div>
                          <p>Mae cenas tempus, tellus eget co ndimen tum rhoncus, sem quam</p>
                        </div>
                      </div>
                      <div className="media">
                        <div className="main-img-user"><img alt="" src={imagesData('face7')} /></div>
                        <div className="media-body">
                          <div className="media-contact-name">
                            <span>Raymart Santiago</span> <span>6 days</span>
                          </div>
                          <p>Nam quam nunc, blandit vel aecenas et ante tincid</p>
                        </div>
                      </div>
                      <div className="media border-bottom-0">
                        <div className="main-img-user"><img alt="" src={imagesData('face6')} /></div>
                        <div className="media-body">
                          <div className="media-contact-name">
                            <span>Samuel Lerin</span> <span>7 days</span>
                          </div>
                          <p>Nam quam nunc, blandit vel aecenas et ante tincid</p>
                        </div>
                      </div>
                      <div className="media">
                        <div className="main-img-user"><img alt="" src={imagesData('face15')} /></div>
                        <div className="media-body">
                          <div className="media-contact-name">
                            <span>Lovely Dela Cruz</span> <span>5 days</span>
                          </div>
                          <p>Mae cenas tempus, tellus eget co ndimen tum rhoncus, sem quam</p>
                        </div>
                      </div>
                      <div className="media">
                        <div className="main-img-user"><img alt="" src={imagesData('face10')} /></div>
                        <div className="media-body">
                          <div className="media-contact-name">
                            <span>Daniel Padilla</span> <span>5 days</span>
                          </div>
                          <p>Mae cenas tempus, tellus eget co ndimen tum rhoncus, sem quam</p>
                        </div>
                      </div>
                      <div className="media">
                        <div className="main-img-user"><img alt="" src={imagesData('face3')} /></div>
                        <div className="media-body">
                          <div className="media-contact-name">
                            <span>John Pratts</span> <span>6 days</span>
                          </div>
                          <p>Mae cenas tempus, tellus eget co ndimen tum rhoncus, sem quam</p>
                        </div>
                      </div>
                      <div className="media">
                        <div className="main-img-user"><img alt="" src={imagesData('face7')} /></div>
                        <div className="media-body">
                          <div className="media-contact-name">
                            <span>Raymart Santiago</span> <span>6 days</span>
                          </div>
                          <p>Nam quam nunc, blandit vel aecenas et ante tincid</p>
                        </div>
                      </div>
                      <div className="media border-bottom-0">
                        <div className="main-img-user"><img alt="" src={imagesData('face6')} /></div>
                        <div className="media-body">
                          <div className="media-contact-name">
                            <span>Samuel Lerin</span> <span>7 days</span>
                          </div>
                          <p>Nam quam nunc, blandit vel aecenas et ante tincid</p>
                        </div>
                      </div>
                    </SimpleBar>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-xxl-6">
              <div className="card overflow-hidden">
                <div className="main-content-app d-block">
                  <div className="main-content-body main-content-body-chat">
                    <div className="main-chat-header">
                      <div className="main-img-user"><img alt="" src={imagesData('face9')} /></div>
                      <div className="main-chat-msg-name">
                        <h6>Reynante Labares</h6><small>Last seen: 2 minutes ago</small>
                      </div>
                      <nav className="nav">
                        <Link className="nav-link" to="#"><i className="icon ion-md-more"></i></Link>
                        <OverlayTrigger overlay={<Tooltip>Call</Tooltip>}><Link className="nav-link" to="#!"><i className="fe fe-star"></i></Link></OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Trash</Tooltip>}><Link className="nav-link" to="#!" ><i className="fe fe-trash"></i></Link></OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>View Info</Tooltip>}><Link className="nav-link" to="#!"><i className="fe fe-alert-circle"></i></Link></OverlayTrigger>
                      </nav>
                    </div>
                    {/* <!-- main-chat-header --> */}
                    <div className="main-chat-body">
                      <SimpleBar className="content-inner chat-content" id="main-chat-content">
                        <label className="main-chat-time"><span>3 days ago</span></label>
                        <div className="media flex-row-reverse">
                          <div className="main-img-user online"><img alt="" src={imagesData('face9')} /></div>
                          <div className="media-body">
                            <div className="main-msg-wrapper right">
                              Nulla consequat massa quis enim. Donec pede justo, fringilla vel...
                            </div>
                            <div className="main-msg-wrapper right">
                              rhoncus ut, imperdiet a, venenatis vitae, justo...
                            </div>
                            <div className="main-msg-wrapper p-0"><img alt="" className="wd-100 ht-100 br-5" src={imagesData('ecommerce6')} /></div>
                            <div>
                              <span>9:48 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
                            </div>
                          </div>
                        </div>
                        <div className="media">
                          <div className="main-img-user online"><img alt="" src={imagesData('face6')} /></div>
                          <div className="media-body">
                            <div className="main-msg-wrapper left">
                              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                            </div>
                            <div>
                              <span>9:32 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
                            </div>
                          </div>
                        </div>
                        <div className="media flex-row-reverse">
                          <div className="main-img-user online"><img alt="" src={imagesData('face9')} /></div>
                          <div className="media-body">
                            <div className="main-msg-wrapper right">
                              Nullam dictum felis eu pede mollis pretium
                            </div>
                            <div>
                              <span>11:22 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
                            </div>
                          </div>
                        </div><label className="main-chat-time"><span>Yesterday</span></label>
                        <div className="media">
                          <div className="main-img-user online"><img alt="" src={imagesData('face6')} /></div>
                          <div className="media-body">
                            <div className="main-msg-wrapper left">
                              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                            </div>
                            <div>
                              <span>9:32 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
                            </div>
                          </div>
                        </div>
                        <div className="media flex-row-reverse">
                          <div className="main-img-user online"><img alt="" src={imagesData('face9')} /></div>
                          <div className="media-body">
                            <div className="main-msg-wrapper right">
                              Donec quam felis, ultricies nec, pellentesque euerdiet a, venenatis vitae, justo.
                            </div>
                            <div className="main-msg-wrapper right">
                              Nullam dictum felis eu pede mollis pretium
                            </div>
                            <div>
                              <span>9:48 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
                            </div>
                          </div>
                        </div><label className="main-chat-time"><span>Today</span></label>
                        <div className="media">
                          <div className="main-img-user online"><img alt="" src={imagesData('face6')} /></div>
                          <div className="media-body">
                            <div className="main-msg-wrapper left">
                              Maecenas tempus, tellus eget condimentum rhoncus
                            </div>
                            <div className="main-msg-wrapper left">
                              Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.
                            </div>
                            <div>
                              <span>10:12 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
                            </div>
                          </div>
                        </div>
                        <div className="media flex-row-reverse">
                          <div className="main-img-user online"><img alt="" src={imagesData('face9')} /></div>
                          <div className="media-body">
                            <div className="main-msg-wrapper right">
                              Maecenas tempus, tellus eget condimentum rhoncus
                            </div>
                            <div className="main-msg-wrapper right">
                              Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.
                            </div>
                            <div>
                              <span>09:40 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
                            </div>
                          </div>
                        </div>
                      </SimpleBar>
                    </div>
                    <div className="main-chat-footer">
                      <nav className="nav">
                      </nav>
                      <input className="form-control" placeholder="Type your message here..." type="text" />
                      <OverlayTrigger overlay={<Tooltip>Add Emoticons</Tooltip>}><Link className="nav-link me-2" to="#!"><i className="fe fe-paperclip"></i></Link></OverlayTrigger>
                      <Link className="main-msg-send" to="#"><i className="fe fe-send"></i></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-xxl-3">
              <div className="card overflow-hidden">
                <div className="main-content-app">
                  <div className="card-body p-0 chat-main">
                    <SimpleBar className="chat-user-details" id="chat-user-details">
                      <div className="float-end ms-auto m-4">
                        <Dropdown className="show main-contact-star">
                          <Dropdown.Toggle as='a' variant="" className="new no-caret option-dots" id="dropdown-basic">
                            <i className="fe fe-more-vertical  fs-18"></i>
                          </Dropdown.Toggle>

                          <Dropdown.Menu className="shadow">
                            <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Settings</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="text-center border-bottom chat-image p-4 pb-0 mb-4 br-5 mt-3">
                        <div className="main-img-user avatar-xl main-avatar online mb-3 mx-auto">
                          <Link to={`${import.meta.env.BASE_URL}pages/profile/`}><img alt="avatar" className="rounded-circle" src={imagesData('face2')} /></Link>
                        </div>
                        <Link to={`${import.meta.env.BASE_URL}pages/profile/`}><h5 className="mb-1">Ryan Gracie</h5></Link>
                        <p className="text-muted mt-0 mb-1 pt-0 fs-13">Senior Web Designer</p>
                        <p className="text-muted mt-0 pt-0 fs-13 mb-0">+123(45)-678-90</p>
                      </div>
                      <div>
                        <div className="px-4">
                          <h6 className="mb-3">Contact Details :</h6>
                          <div className="d-flex">
                            <div>
                              <Link className="nav-link border rounded-pill chat-profile me-2" to="#"><i className="fe fe-shield"></i></Link>
                            </div>
                            <div className="ms-2">
                              <p className="fs-13 fw-semibold mb-0">Id</p>
                              <p className="fs-12 text-muted">2E345D4.</p>
                            </div>
                          </div>
                          <div className="d-flex">
                            <div>
                              <Link className="nav-link border rounded-pill chat-profile me-2" to="#"><i className="fe fe-mail"></i></Link>
                            </div>
                            <div className="ms-2">
                              <p className="fs-13 fw-semibold mb-0">Email</p>
                              <p className="fs-12 text-muted">gracie435@gmail.com.</p>
                            </div>
                          </div>
                          <div className="d-flex mt-2">
                            <div>
                              <Link className="nav-link border rounded-pill chat-profile me-2" to="#"><i className="fe fe-map-pin"></i></Link>
                            </div>
                            <div className="ms-2">
                              <p className="fs-13 fw-semibold mb-0">Address</p>
                              <p className="fs-12 text-muted">2nd street,houston texas,united states.</p>
                            </div>
                          </div>
                        </div>
                        <div className="px-4">
                          <h6 className="mb-0">Shared Files :</h6>
                          <div className="card custom-card overflow-hidden border-0">
                            <div className="card-body pb-0 ps-0">
                              <div className="border-0 p-0 mb-4">
                                <div className="media mt-0">
                                  <div className="ps-0 me-3"><i className="fa fa-folder-open shared-files text-muted"></i></div>
                                  <div className="media-body">
                                    <div className="d-flex align-items-center">
                                      <div className="mt-0">
                                        <h5 className="mb-1 fs-13 font-weight-sembold text-dark"> Ex Document</h5>
                                        <p className="mb-0 fs-13 text-muted">ppt<span className="fs-11 ms-2">1.2 mb</span></p>
                                      </div>
                                      <span className="ms-auto wd-45p fs-16 ">
                                        <span id="spark1" className="wd-100p"></span>
                                        <span className="float-end badge">
                                          <span className="op-7 text-muted fw-semibold">4 hrs ago </span>
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="border-0 p-0 mb-4">
                                <div className="media mt-0">
                                  <div className="ps-0 me-3"><i className="fa fa-image shared-files text-muted"></i></div>
                                  <div className="media-body">
                                    <div className="d-flex align-items-center">
                                      <div className="mt-0">
                                        <h5 className="mb-1 fs-13 font-weight-sembold text-dark">Sam Photo</h5>
                                        <p className="mb-0 fs-13 text-muted">img<span className="fs-11 ms-2">12 mb</span></p>
                                      </div>
                                      <span className="ms-auto wd-45p fs-16 ">
                                        <span id="spark2" className="wd-100p"></span>
                                        <span className="float-end badge">
                                          <span className="op-7 text-muted fw-semibold">4 hrs ago </span>
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="border-0 p-0 mb-0">
                                <div className="media mt-0">
                                  <div className="ps-0 me-3"><i className="fa fa-envelope shared-files text-muted"></i></div>
                                  <div className="media-body">
                                    <div className="d-flex align-items-center">
                                      <div className="mt-0">
                                        <h5 className="mb-1 fs-13 font-weight-sembold text-dark"> video</h5>
                                        <p className="mb-0 fs-13 text-muted">Video<span className="fs-12 ms-2">16 mb</span></p>
                                      </div>
                                      <span className="ms-auto wd-45p fs-16 ">
                                        <span id="spark3" className="wd-100p"></span>
                                        <span className="float-end badge">
                                          <span className="op-7 text-muted fw-semibold text-wrap">22 mins ago </span>
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SimpleBar>
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

export default Chat;
