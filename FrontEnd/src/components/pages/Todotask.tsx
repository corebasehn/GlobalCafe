import { Fragment } from 'react';
import { Button, Card, Col, Row, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tododata } from '../../common/commondata';
import Pageheader from '../../layout/layoutcomponent/pageheader';

const Todotask = () => {

  return (
    <Fragment>

      <Pageheader title="TODO TASK" heading="Pages" active="Todotask" />
      <Row className="row-sm">

        <Col md={12} xl={3} lg={12}>
          <Card>
            <div className="list-group list-group-transparent mb-0 mail-inbox pb-3">
              <div className="mt-4 mb-4 mx-4 text-center">
                <Link to="#" className="btn btn-primary d-grid"> Add New Task </Link>
              </div>
              <Link to="#" className="list-group-item  d-flex align-items-center border-0" > <i className="fe fe-codepen fs-18 me-4 p-2 border-primary brround bg-primary-transparent text-primary rounded-circle"></i>{" "} All Tasks </Link>
              <Link to="#" className="list-group-item  d-flex align-items-center border-0 " > <i className="fe fe-alert-octagon fs-18 me-4 p-2 border-warning brround bg-warning-transparent text-warning rounded-circle"></i>{" "} Important <span className="ms-auto badge bg-danger">6</span> </Link>
              <Link to="#" className="list-group-item  d-flex align-items-center border-0  " > <i className="fe fe-star fs-18 me-4 p-2 border-secondary brround bg-secondary-transparent text-secondary rounded-circle"></i>{" "} Starred </Link>
              <Link to="#" className="list-group-item  d-flex align-items-center border-0 " > <i className="fe fe-briefcase fs-18 me-4 p-2 border-info brround bg-info-transparent text-info rounded-circle"></i>{" "} Spam </Link>
              <Link to="#" className="list-group-item  d-flex align-items-center border-0 " > <i className="fe fe-bell fs-18 me-4 p-2 border-success brround bg-success-transparent text-success rounded-circle"></i>{" "} Archive <span className="ms-auto badge bg-warning">4</span></Link>
              <Link to="#" className="list-group-item  d-flex align-items-center border-bottom-0 border-0 " > <i className="fe fe-trash-2 fs-18 me-4 p-2 border-danger brround bg-danger-transparent text-danger rounded-circle"></i>{" "} Trash </Link>
            </div>
          </Card>
        </Col>
        <Col xl={9} md={12}>
          <Row className=" row-sm">

            <Col lg={12}>
              <Card className=" mg-b-20">
                <Card.Body className=" d-flex p-3 align-items-center">
                  <div className="main-content-label mb-0 mg-t-8"> User Today Tasks </div>
                  <div className="ms-auto">
                    <Link className="d-block fs-20" title="Add New User" to="#"><OverlayTrigger placement="top" overlay={<Tooltip>Add New User</Tooltip>}><i className="si si-plus text-muted"></i></OverlayTrigger></Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {Tododata.map((playerData) => (
              <Col xxl={4} xl={6} key={Math.random()}>
                <Card className=" mg-b-20">
                  <Card.Body className=" p-0">
                    <div className="todo-widget-header d-flex align-items-center pb-3 pd-20 border-bottom">
                      <Dropdown >
                        <Dropdown.Toggle as="a" variant="" className="drop-down-profile">
                          <img alt="" className="rounded-circle avatar avatar-md" src={playerData.img} />
                          <span className={`assigned-task bg-${playerData.color}`}> {playerData.num} </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu fs-13">
                          <div className="main-header-profile">
                            <div className="fs-16 h5 mg-b-0">Teri Dactyl</div>
                            <span>Web Designer</span>
                          </div>
                          <Dropdown.Item className="dropdown-item"> View Total Tasks </Dropdown.Item>
                          <Dropdown.Item className="dropdown-item"> Completed Tasks </Dropdown.Item>
                          <Dropdown.Item className="dropdown-item"> Settings </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <div className="ms-auto">
                        <div className="card-options-task">
                          <OverlayTrigger placement="top" overlay={<Tooltip>Archive</Tooltip>} >
                            <i className="p-2 border br-5 text-primary me-1 fe fe-folder-plus align-middle"></i>
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={<Tooltip>Move to spam</Tooltip>}><i className="p-2 border br-5 text-primary me-1 fe fe-info align-middle"></i></OverlayTrigger>
                          <Dropdown as="span" className="me-1">
                            <Dropdown.Toggle variant="" as="a" className="p-2 no-caret border br-5 text-primary"> <i className="fe fe-more-vertical align-middle"></i> </Dropdown.Toggle>
                            <Dropdown.Menu className="fs-13 dropleft">
                              <Dropdown.Item>Mark As Unread</Dropdown.Item>
                              <Dropdown.Item>Mark As Important </Dropdown.Item>
                              <Dropdown.Item>Add to Tasks</Dropdown.Item>
                              <Dropdown.Item>Add Star</Dropdown.Item>
                              <Dropdown.Item>Move to</Dropdown.Item>
                              <Dropdown.Item>Mute</Dropdown.Item>
                              <Dropdown.Item>Move to Trash</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="fs-12 text-muted">{playerData.time}</span>
                      <span className={`badge bg-${playerData.bg} me-1 my-2  text-${playerData.bgcolor} ms-auto float-end`}> {playerData.bgtext} </span>
                      <h5 className="fs-14 mb-0 mg-t-5 text-capitalize"> {playerData.text} </h5>
                    </div>
                    <div className="p-4 border-top">
                      <span className="fs-12 text-muted">{playerData.time}</span>
                      <h5 className="fs-14 mb-0 mg-t-5 text-capitalize"> {playerData.text2} </h5>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <Link className="btn btn-primary" to="#" title="Assign Task"> Assign </Link>
                    <OverlayTrigger placement="top" overlay={<Tooltip>View Task</Tooltip>} >
                      <Button variant="" className="btn btn-outline-primary ms-auto float-end"> {" "} View All </Button>
                    </OverlayTrigger>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

      </Row>

    </Fragment>
  );
};

export default Todotask;
