import { FC, Fragment } from 'react';
import { Button, Card, Col, Dropdown, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { Filmanager1data } from '../../common/commondata';

interface ComponentProps { }

const Filemanager1: FC<ComponentProps> = () => {

  return (
    <Fragment>

      <Pageheader title="FILE MANAGER 1" heading="Apps" active="File manager1" />

      <Row>
        <Col lg={12} xl={12}>
          <Row>
            <div className="col-6">
              <div className="fs-18 mb-4">Files</div>
            </div>
            <div className="col-6 col-auto">
            <div className="input-group">
                    <input
                      className="form-control"
                      placeholder="Search folder....."
                      type="email"
                    />
                    <Button variant=""
                      className="btn btn-primary br-ts-0 br-bs-0"
                      type="button"
                    >
                     Search
                    </Button>
                </div>
            </div>
          </Row>
          <Row>
            {Filmanager1data.map((idx) => (
              <Col sm={6} xl={2} md={4} key={Math.random()}>
                <Card className=" p-0 ">
                  <div className="d-flex align-items-center px-3 pt-3">
                    <Dropdown className="float-end optiondots ms-auto">
                      <Dropdown.Toggle as='a' variant='' className="no-caret option-dots">
                        <i className="fe fe-more-vertical"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item className='d-inline-flex align-items-center'>
                          <i className="fe fe-edit me-2"></i> Edit
                        </Dropdown.Item>
                        <Dropdown.Item className='d-inline-flex align-items-center'>
                          <i className="fe fe-share me-2"></i> Share
                        </Dropdown.Item>
                        <Dropdown.Item className='d-inline-flex align-items-center'>
                          <i className="fe fe-trash me-2"></i> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <Card.Body className="pt-0 text-center">
                    <div className="file-manger-icon">
                      <Link to={`${import.meta.env.BASE_URL}app/filedetails/`}>
                        <img
                          src={idx.src}
                          alt=""
                          className="br-7"
                        />
                      </Link>
                    </div>
                    <h6 className="mb-1 fw-semibold">{idx.title}</h6>
                    <span className="text-muted">{idx.text}</span>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <ul className="pagination float-end mb-4">
            <li className="page-item page-prev disabled">
              <Link className="page-link" to="#" tabIndex={-1}>
                Prev
              </Link>
            </li>
            <li className="page-item active">
              <Link className="page-link" to="#">
                1
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="#">
                2
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="#">
                3
              </Link>
            </li>
            <li className="page-item page-next">
              <Link className="page-link" to="#">
                Next
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Filemanager1;