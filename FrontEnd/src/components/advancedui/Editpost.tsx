import { Fragment, useState } from 'react';
import { Card, Col, Form, FormGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SunEditor from 'suneditor-react';
import Select from 'react-select';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { Instructordata, Language } from '../../common/selectdata';

import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Editpost = () => {
  //filepond
  const [files, setFiles] = useState<any>([]);

  const [isChecked, setIsChecked] = useState<boolean>(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const targetId = event.target.id;
    setIsChecked(targetId === 'flexCheckChecked1');
  };

  const [isFreeChecked1, setIsFreeChecked1] = useState<boolean>(true);

  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const targetId = event.target.id;
    setIsFreeChecked1(targetId === 'flexCheckChecked1');
  };

  const [checkedOption, setCheckedOption] = useState<string>('');

  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const targetId = event.target.id;
    setCheckedOption(targetId);
  };
  return (
    <Fragment>

      <Pageheader title="EDIT POST" heading="Advanced UI" active="Edit-Post" />
      <Row>
        <Col lg={12} md={12} >
          <Card>
            <Card.Body>
              <FormGroup>
                <Form.Label className="form-label text-dark">Course Title</Form.Label>
                <Form.Control type="text" className="form-control" defaultValue="Advanced Web Develpment" />
              </FormGroup>

              <FormGroup>
                <Form.Label className="form-label text-dark my-2">Category</Form.Label>
                <Language />
              </FormGroup>

              <FormGroup>
                <Form.Label className="form-label text-dark my-2">Instructor</Form.Label>
                <Select options={Instructordata} className="multi-select" classNamePrefix='Select2' placeholder="" />
              </FormGroup>

              <FormGroup>
                <Form.Label className="form-label text-dark my-2">Type of mode</Form.Label>
                <div className="d-md-flex ad-post-details">
                  <label className="custom-control custom-radio mb-2 me-4">
                    <div className="form-check">
                      <input className="form-check-input mt-2" type="radio" id="flexCheckChecked1" checked={isChecked} onChange={handleInputChange} />
                      <span className="custom-control-label mt-1 text-dark ms-1">Online</span>
                    </div>
                  </label>
                  <label className="custom-control custom-radio mb-2">
                    <div className="form-check">
                      <input className="form-check-input mt-2" type="radio" id="flexCheckChecked2" checked={!isChecked} onChange={handleInputChange} />
                      <span className="custom-control-label mt-1 text-dark ms-1">Offline</span>
                    </div>
                  </label>
                </div>
              </FormGroup>
              <div className="ql-wrapper">
                <SunEditor />
              </div>

              <FormGroup>
                <Form.Label className="form-label text-dark my-2">Course Type</Form.Label>
                <div className="d-md-flex ad-post-details">
                  <Form.Label className="custom-control custom-radio mb-2 me-4">
                    <div className="form-check">
                      <input className="form-check-input mt-2" type="radio" id="flexCheckChecked1" checked={isFreeChecked1} onChange={handleInputChange1} />
                      <label htmlFor="flexCheckChecked1" className="custom-control-label mt-1 text-dark ms-1"> Free </label>
                    </div>
                  </Form.Label>
                  <Form.Label className="custom-control custom-radio mb-2">
                    <div className="form-check">
                      <input className="form-check-input mt-2" type="radio" id="flexCheckChecked2" checked={!isFreeChecked1} onChange={handleInputChange1} />
                      <label htmlFor="flexCheckChecked2" className="custom-control-label mt-1 text-dark ms-1"> Paid </label>
                    </div>
                  </Form.Label>
                </div>
              </FormGroup>

              <FormGroup className="p-4 border mb-4 form-group">
                <div>
                  <div>
                    <FilePond files={files} onupdatefiles={setFiles} allowMultiple={true} maxFiles={3} server="/api" name="files" labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>' />
                  </div>
                </div>
              </FormGroup>

              <FormGroup>
                <Form.Label className="form-label">Upload Video URL</Form.Label>
                <input type="text" className="form-control" placeholder="https://videos.com" defaultValue="https://www.youtube.com/embed/tMWkeBIohBs" />
              </FormGroup>
              <div className="control-group form-group  mb-0">
                <Form.Label className="form-label text-dark mt-2"> Course Post Package </Form.Label>
                <div className="border p-3 br-7">
                  <div className="d-md-flex ad-post-details">
                    <label className="custom-control custom-radio mb-0 me-5">
                      <div className="form-check">
                        <input className="form-check-input mt-2" type="radio" id="flexCheckChecked1" checked={checkedOption === 'flexCheckChecked1'} onChange={handleInputChange2} />
                        <label htmlFor="flexCheckChecked1" className="custom-control-label mt-1 text-dark ms-1">
                          30 days Free
                        </label>
                      </div>
                    </label>
                    <label className="custom-control custom-radio mb-0 me-4">
                      <div className="form-check">
                        <input className="form-check-input mt-2" type="radio" id="flexCheckChecked2" checked={checkedOption === 'flexCheckChecked2'} onChange={handleInputChange2} />
                        <label htmlFor="flexCheckChecked2" className="custom-control-label mt-1 text-dark ms-1">
                          60 days /<span className="fw-bold">$20</span>
                        </label>
                      </div>
                    </label>
                    <label className="custom-control custom-radio mb-0 me-4">
                      <div className="form-check">
                        <input className="form-check-input mt-2" type="radio" id="flexCheckChecked3" checked={checkedOption === 'flexCheckChecked3'} onChange={handleInputChange2} />
                        <label htmlFor="flexCheckChecked3" className="custom-control-label mt-1 text-dark ms-1">
                          6 months /<span className="fw-bold">$50</span>
                        </label>
                      </div>
                    </label>
                    <label className="custom-control custom-radio mb-0">
                      <div className="form-check">
                        <input className="form-check-input mt-2" type="radio" id="flexCheckChecked4" checked={checkedOption === 'flexCheckChecked4'} onChange={handleInputChange2} />
                        <label htmlFor="flexCheckChecked4" className="custom-control-label mt-1 text-dark ms-1">
                          1 year / <span className="fw-bold">$80</span>
                        </label>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </Card.Body>
            <div className="card-footer ">
              <Link to="#" className="btn btn-secondary"> Save to Draft </Link>
              <Link to="#" className="btn btn-primary float-end"> Publish Now </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Editpost;
