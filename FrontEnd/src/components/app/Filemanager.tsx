import { FC, Fragment, useState } from 'react';
import { Button, Card, Col, Dropdown, Form, InputGroup, Modal, Nav, Pagination, ProgressBar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { Filmanagerdata1, Filmanagerdata2, Filmanagerdata3 } from '../../common/commondata';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface ComponentProps { }

const Filemanager: FC<ComponentProps> = () => {

  const [show, setShow] = useState<any>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [files, setFiles] = useState<any>([]);
  return (
    <Fragment>
      <Pageheader title="FILE MANAGER" heading="Apps" active="File manager" />

      <Row>
        <Col lg={4} xl={3}>
          <Card>
            <Card.Body className="main-content-left main-content-left-mail card-body">
              <Button variant='primary' className="btn-compose" onClick={handleShow}> <i className="fa fa-plus me-2"></i> Create Folder </Button>
              <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title as='h6'>Add file</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <FilePond files={files} onupdatefiles={setFiles} allowMultiple={true} maxFiles={3} server="/api" name="files" labelIdle='Drag & Drop your file here or click ' />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary"> Add </Button>
                  <Button variant="secondary" onClick={handleClose}> Cancel </Button>
                </Modal.Footer>
              </Modal>
              <div className="main-mail-menu">
                <Nav className="main-nav-column" defaultActiveKey="Images">
                  {Filmanagerdata1.map((idx) => (
                    <Nav.Item key={Math.random()}>
                      <Nav.Link className="thumb" eventKey={idx.key}> <i className={`fe fe-${idx.icon}`}></i> {idx.title}{" "} </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>

                <Card className="custom-card mt-3 pb-0 mb-0">
                  <Card.Header className="fw-bold"> <i className="fe fe-hard-drive me-2"></i>Storage </Card.Header>
                  <Card.Body className="pt-0">
                    <ProgressBar now={15} className="fileprogress mg-b-10 progress-bar-xs ht-5" />
                    <div className="text-muted font-weight-semibold fs-13 mb-1"> 26.24 GB Used of 128GB </div>
                    <div className="fs-13 text-primary font-weight-semibold"> Upgrade Storage </div>
                  </Card.Body>
                </Card>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={9} lg={8}>
          <Row>
            <div className="col-6">
              <div className="fs-18 mb-4">FIle Manager</div>
            </div>
            <div className="col-6 col-auto">
              <InputGroup>
                <Form.Control placeholder="Search folder....." type="email" />
                <Button variant="" className="btn btn-primary br-ts-0 br-bs-0" type="button"> Search </Button>
              </InputGroup>
            </div>
          </Row>
          <div className="text-muted mb-2 fs-16">All Files</div>
          <Row>
            {Filmanagerdata2.map((idx) => (
              <Col xl={3} md={6} key={Math.random()}>
                <Card>
                  <Link to={`${import.meta.env.BASE_URL}app/filemanager1/`}>
                    <Card.Body>
                      <div className="fs-16 mb-1">
                        {idx.svg}
                        {idx.title}
                        <div className="float-end fs-13 text-muted mt-1">
                          {idx.text}
                        </div>
                      </div>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-muted mb-2 fs-16">Folders</div>
          <Row>
            {Filmanagerdata3.map((idx) => (
              <Col sm={6} md={4} lg={6} xl={3} key={Math.random()}>
                <Card className="p-0 ">
                  <div className="d-flex align-items-center px-3 pt-3">
                    <div className="form-check"> <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked1" /> </div>
                    <Dropdown className="float-end ms-auto optiondots">
                      <Dropdown.Toggle as='a' variant="" className="no-caret option-dots"><i className="fe fe-more-vertical"></i></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item><i className="fe fe-edit me-2"></i> Edit</Dropdown.Item>
                        <Dropdown.Item><i className="fe fe-share me-2"></i> Share</Dropdown.Item>
                        <Dropdown.Item><i className="fe fe-download me-2"></i> Download</Dropdown.Item>
                        <Dropdown.Item><i className="fe fe-trash me-2"></i> Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <Card.Body className="pt-0 text-center">
                    <div className="file-manger-icon">
                      <Link to={`${import.meta.env.BASE_URL}app/filedetails/`}><img src={idx.src} alt="" className="br-7" /></Link>
                    </div>
                    <h6 className="mb-1 font-weight-semibold">{idx.title}</h6>
                    <span className="text-muted fs-11">{idx.text}</span>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Pagination className='float-end mb-4'>
            <Pagination.Item disabled>Prev</Pagination.Item>
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Item>Next</Pagination.Item>
          </Pagination>
        </Col>

      </Row>
    </Fragment>
  );
};

export default Filemanager;