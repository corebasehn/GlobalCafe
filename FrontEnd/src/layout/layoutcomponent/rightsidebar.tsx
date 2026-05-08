import { FC, Fragment } from 'react';
import { ListGroup, Nav, Offcanvas, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { pane1, pane2, pane3 } from '../../common/commondata';

interface ComponentProps {
  show: boolean;
  handleClose: () => void;
}

const Rightsidebar: FC<ComponentProps> = ({ show, handleClose }) => {
  return (
    <Fragment>

      <Offcanvas className='sidebar' show={show} onHide={handleClose} placement='end' id="sidebar-canvas" aria-labelledby="offcanvasRightLabel">
        <Offcanvas.Header className='border-bottom bg-light' closeButton>
          <Offcanvas.Title as='h6' className='text-default'>NOTIFICATIONS</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='p-0'>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <div className="panel-body tabs-menu-body latest-tasks p-0 border-0">
              <div className="tabs-menu p-2 pt-3">
                <Nav as='ul' className="panel-tabs">
                  <Nav.Item as='li'><Nav.Link eventKey="first">
                    <svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" /></svg> Chat
                  </Nav.Link></Nav.Item>
                  <Nav.Item as='li'><Nav.Link eventKey="second">
                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" className="side-menu__icon" height="24" viewBox="0 0 24 24" width="24"><g><path d="M0,0h24v24H0V0z" fill="none" /></g><g><path d="M12,18.5c0.83,0,1.5-0.67,1.5-1.5h-3C10.5,17.83,11.17,18.5,12,18.5z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10 c5.52,0,10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8c4.41,0,8,3.59,8,8S16.41,20,12,20z M16,11.39 c0-2.11-1.03-3.92-3-4.39V6.5c0-0.57-0.43-1-1-1s-1,0.43-1,1V7c-1.97,0.47-3,2.27-3,4.39V14H7v2h10v-2h-1V11.39z M14,14h-4v-3 c0-1.1,0.9-2,2-2s2,0.9,2,2V14z" /></g></svg> Notifications
                  </Nav.Link></Nav.Item>
                  <Nav.Item as='li'><Nav.Link eventKey="third">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="side-menu__icon" height="24" version="1.1" width="24" viewBox="0 0 24 24">
                      <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11C11.17,11 10.5,10.33 10.5,9.5C10.5,8.67 11.17,8 12,8C12.83,8 13.5,8.67 13.5,9.5C13.5,10.33 12.83,11 12,11Z" />
                    </svg>Friends
                  </Nav.Link></Nav.Item>
                </Nav>
              </div>
              <Tab.Content>
                <Tab.Pane className='p-0 border-0' eventKey="first">
                  {pane1.map((item, index) => (
                    <div key={index} className={`list d-flex align-items-center ${item} p-3`}>
                      <div className="">
                        <span className={`avatar bg-${item.id == 1 ? 'primary' :
                          item.id == 2 ? 'danger' :
                            item.id == 3 ? 'info' :
                              item.id == 4 ? 'warning' :
                                item.id == 5 ? 'success' :
                                  item.id == 6 ? 'pink' :
                                    item.id == 7 ? 'purple' : 'secondary'} rounded-circle avatar-md`}>
                          {item.avatar} </span>
                      </div>
                      <Link className="wrapper w-100 ms-3" to="#">
                        <p className="mb-0 d-flex">
                          <b>{item.title}</b>
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <i className="mdi mdi-clock text-muted me-1 fs-11"></i>
                            <small className="text-muted ms-auto">{item.time}</small>
                            <p className="mb-0"></p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </Tab.Pane>
                <Tab.Pane className='p-0 border-0' eventKey="second">
                  <ListGroup variant="flush">
                    {pane2.map((message, index) => (
                      <ListGroup.Item key={index} className="d-flex align-items-center border-0">
                        <div className="me-3">
                          <img className="avatar avatar-md rounded-circle cover-image" src={message.image} alt="img" />
                        </div>
                        <div>
                          <strong>{message.name}</strong> {message.message}
                          <div className="small text-muted">
                            {message.time}
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Tab.Pane>
                <Tab.Pane className='p-0 border-0' eventKey="third">
                  <ListGroup variant="flush">
                      {pane3.map(item => (
                        <ListGroup.Item className="d-flex align-items-center border-0" key={item.id}>
                          <div className="me-2">
                            <img className="avatar avatar-md rounded-circle cover-image" src={item.imgSrc} alt="img" />
                          </div>
                          <div>
                            <div className="fw-semibold">{item.name}</div>
                          </div>
                          <div className="ms-auto">
                            <Link to="#" className="btn btn-sm btn-outline-light btn-rounded">
                              <i className="fe fe-message-square fs-16"></i>
                            </Link>
                          </div>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </Offcanvas.Body>
      </Offcanvas>
    </Fragment>
  );
};

export default Rightsidebar;