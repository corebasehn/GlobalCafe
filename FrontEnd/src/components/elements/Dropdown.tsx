

import { FC, Fragment, useState } from 'react';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { Button, ButtonGroup, Col, Dropdown as Reactdropdown, DropdownDivider, SplitButton, Row, Card } from 'react-bootstrap';
import { imagesData } from '../../common/commonimages';
import { buttonsData } from '../../common/commondata';


const NewArray = <T extends any>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_v, i) =>
    arr.slice(i * size, i * size + size)
  );
};

const Dropdown: FC = () => {
  const updatedArray = NewArray(buttonsData, 3);

  const [isHidden, setIsHidden] = useState<boolean[]>([false]);
  const toggleHidden = (index: number) => {
    const updatedHidden = [...isHidden];
    updatedHidden[index] = !updatedHidden[index];
    setIsHidden(updatedHidden);
  };
  return (
    <Fragment>
      <Pageheader title="DROPDOWNS" heading="Elements" active="DROPDOWNS" />

  

        <Row>
          <Col md={12}>
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Dropdowns</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(0)}>Show Code<i className={`${isHidden[0] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[0] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      <div className="btn-group mt-2 mb-2">
                        <Reactdropdown className='me-2'>
                          <Reactdropdown.Toggle variant="primary" id="dropdown-basic">
                            Dropdown Button
                          </Reactdropdown.Toggle>
                          <Reactdropdown.Menu>
                            <Reactdropdown.Item href="#/action-1">Action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-2">Another action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-3">Something else</Reactdropdown.Item>
                          </Reactdropdown.Menu>
                        </Reactdropdown>
                      </div>
                      <div className="btn-group mt-2 mb-2">
                        <Reactdropdown className='me-2'>
                          <Reactdropdown.Toggle variant="secondary" id="dropdown-basic">
                            Dropdown Link
                          </Reactdropdown.Toggle>
                          <Reactdropdown.Menu>
                            <Reactdropdown.Item href="#/action-1">Action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-2">Another action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-3">Something else</Reactdropdown.Item>
                          </Reactdropdown.Menu>
                        </Reactdropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[0] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      <div className="btn-group mt-2 mb-2">
                        <Reactdropdown className='me-2'>
                          <Reactdropdown.Toggle variant="primary" id="dropdown-basic">
                            Dropdown Button
                          </Reactdropdown.Toggle>
                          <Reactdropdown.Menu>
                            <Reactdropdown.Item href="#/action-1">Action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-2">Another action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-3">Something else</Reactdropdown.Item>
                          </Reactdropdown.Menu>
                        </Reactdropdown>
                      </div>
                      <div className="btn-group mt-2 mb-2">
                        <Reactdropdown className='me-2'>
                          <Reactdropdown.Toggle variant="secondary" id="dropdown-basic">
                            Dropdown Link
                          </Reactdropdown.Toggle>
                          <Reactdropdown.Menu>
                            <Reactdropdown.Item href="#/action-1">Action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-2">Another action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-3">Something else</Reactdropdown.Item>
                          </Reactdropdown.Menu>
                        </Reactdropdown>
                      </div>
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12} xl={6}>
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Single button dropdowns</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(1)}>Show Code<i className={`${isHidden[1] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[1] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { variant: 'primary', text: 'Action' },
                        { variant: 'secondary', text: 'Action' },
                        { variant: 'warning', text: 'Action' },
                        { variant: 'info', text: 'Action' },
                        { variant: 'success', text: 'Action' },
                        { variant: 'danger', text: 'Action' },
                      ].map((group, index) => (
                        <ButtonGroup key={index} className="my-2 me-2">
                          <Reactdropdown>
                            <Reactdropdown.Toggle variant={group.variant} >
                              {group.text}
                            </Reactdropdown.Toggle>
                            <Reactdropdown.Menu>
                              <Reactdropdown.Item>Action</Reactdropdown.Item>
                              <Reactdropdown.Item>Another action</Reactdropdown.Item>
                              <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                              <Reactdropdown.Divider className='my-0' />
                              <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                            </Reactdropdown.Menu>
                          </Reactdropdown>
                        </ButtonGroup>
                      ))}
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[1] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { variant: 'primary', text: 'Action' },
                        { variant: 'secondary', text: 'Action' },
                        { variant: 'warning', text: 'Action' },
                        { variant: 'info', text: 'Action' },
                        { variant: 'success', text: 'Action' },
                        { variant: 'danger', text: 'Action' },
                      ].map((group, index) => (
                        <ButtonGroup key={index} className="my-2 me-2">
                          <Reactdropdown>
                            <Reactdropdown.Toggle variant={group.variant} >
                              {group.text}
                            </Reactdropdown.Toggle>
                            <Reactdropdown.Menu>
                              <Reactdropdown.Item>Action</Reactdropdown.Item>
                              <Reactdropdown.Item>Another action</Reactdropdown.Item>
                              <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                              <Reactdropdown.Divider className='my-0' />
                              <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                            </Reactdropdown.Menu>
                          </Reactdropdown>
                        </ButtonGroup>
                      ))}
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>

          <Col md={12} xl={6}>
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Rounded Button Dropdowns</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(2)}>Show Code<i className={`${isHidden[2] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[2] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { variant: 'primary', text: 'Action' },
                        { variant: 'secondary', text: 'Action' },
                        { variant: 'warning', text: 'Action' },
                        { variant: 'info', text: 'Action' },
                        { variant: 'success', text: 'Action' },
                        { variant: 'danger', text: 'Action' },
                      ].map((group, index) => (
                        <ButtonGroup key={index} className="my-2 me-2">
                          <Reactdropdown>
                            <Reactdropdown.Toggle variant={group.variant} className='rounded-pill'>
                              {group.text}
                            </Reactdropdown.Toggle>
                            <Reactdropdown.Menu>
                              <Reactdropdown.Item>Action</Reactdropdown.Item>
                              <Reactdropdown.Item>Another action</Reactdropdown.Item>
                              <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                              <Reactdropdown.Divider className='my-0' />
                              <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                            </Reactdropdown.Menu>
                          </Reactdropdown>
                        </ButtonGroup>
                      ))}

                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[2] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { variant: 'primary', text: 'Action' },
                        { variant: 'secondary', text: 'Action' },
                        { variant: 'warning', text: 'Action' },
                        { variant: 'info', text: 'Action' },
                        { variant: 'success', text: 'Action' },
                        { variant: 'danger', text: 'Action' },
                      ].map((group, index) => (
                        <ButtonGroup key={index} className="my-2 me-2">
                          <Reactdropdown>
                            <Reactdropdown.Toggle variant={group.variant} className='rounded-pill'>
                              {group.text}
                            </Reactdropdown.Toggle>
                            <Reactdropdown.Menu>
                              <Reactdropdown.Item>Action</Reactdropdown.Item>
                              <Reactdropdown.Item>Another action</Reactdropdown.Item>
                              <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                              <Reactdropdown.Divider className='my-0' />
                              <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                            </Reactdropdown.Menu>
                          </Reactdropdown>
                        </ButtonGroup>
                      ))}

                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>

        </Row>

        <Row>
          <Col md={12} xl={6}>
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Outline Button Dropdowns</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(3)}>Show Code<i className={`${isHidden[3] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[3] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { variant: 'primary', text: 'Action' },
                        { variant: 'secondary', text: 'Action' },
                        { variant: 'warning', text: 'Action' },
                        { variant: 'info', text: 'Action' },
                        { variant: 'success', text: 'Action' },
                        { variant: 'danger', text: 'Action' },
                      ].map((group, index) => (
                        <ButtonGroup key={index} className="my-2 me-2">
                          <Reactdropdown>
                            <Reactdropdown.Toggle variant={`outline-${group.variant}`}>
                              {group.text}
                            </Reactdropdown.Toggle>
                            <Reactdropdown.Menu>
                              <Reactdropdown.Item>Action</Reactdropdown.Item>
                              <Reactdropdown.Item>Another action</Reactdropdown.Item>
                              <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                              <Reactdropdown.Divider className='my-0' />
                              <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                            </Reactdropdown.Menu>
                          </Reactdropdown>
                        </ButtonGroup>
                      ))}
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[3] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { variant: 'primary', text: 'Action' },
                        { variant: 'secondary', text: 'Action' },
                        { variant: 'warning', text: 'Action' },
                        { variant: 'info', text: 'Action' },
                        { variant: 'success', text: 'Action' },
                        { variant: 'danger', text: 'Action' },
                      ].map((group, index) => (
                        <ButtonGroup key={index} className="my-2 me-2">
                          <Reactdropdown>
                            <Reactdropdown.Toggle variant={\`outline-\${group.variant}\`}>
                              {group.text}
                            </Reactdropdown.Toggle>
                            <Reactdropdown.Menu>
                              <Reactdropdown.Item>Action</Reactdropdown.Item>
                              <Reactdropdown.Item>Another action</Reactdropdown.Item>
                              <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                              <Reactdropdown.Divider className='my-0' />
                              <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                            </Reactdropdown.Menu>
                          </Reactdropdown>
                        </ButtonGroup>
                      ))}
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>

          <Col md={12} xl={6}>
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Rounded Outline Button Dropdowns</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(4)}>Show Code<i className={`${isHidden[4] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[4] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { variant: 'primary', text: 'Action' },
                        { variant: 'secondary', text: 'Action' },
                        { variant: 'warning', text: 'Action' },
                        { variant: 'info', text: 'Action' },
                        { variant: 'success', text: 'Action' },
                        { variant: 'danger', text: 'Action' },
                      ].map((group, index) => (
                        <ButtonGroup key={index} className="my-2 me-2">
                          <Reactdropdown>
                            <Reactdropdown.Toggle variant={`outline-${group.variant}`} className='rounded-pill'>
                              {group.text}
                            </Reactdropdown.Toggle>
                            <Reactdropdown.Menu>
                              <Reactdropdown.Item>Action</Reactdropdown.Item>
                              <Reactdropdown.Item>Another action</Reactdropdown.Item>
                              <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                              <Reactdropdown.Divider className='my-0' />
                              <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                            </Reactdropdown.Menu>
                          </Reactdropdown>
                        </ButtonGroup>
                      ))}
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[4] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { variant: 'primary', text: 'Action' },
                        { variant: 'secondary', text: 'Action' },
                        { variant: 'warning', text: 'Action' },
                        { variant: 'info', text: 'Action' },
                        { variant: 'success', text: 'Action' },
                        { variant: 'danger', text: 'Action' },
                      ].map((group, index) => (
                        <ButtonGroup key={index} className="my-2 me-2">
                          <Reactdropdown>
                            <Reactdropdown.Toggle variant={\`outline-\${group.variant}\`} className='rounded-pill'>
                              {group.text}
                            </Reactdropdown.Toggle>
                            <Reactdropdown.Menu>
                              <Reactdropdown.Item>Action</Reactdropdown.Item>
                              <Reactdropdown.Item>Another action</Reactdropdown.Item>
                              <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                              <Reactdropdown.Divider className='my-0' />
                              <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                            </Reactdropdown.Menu>
                          </Reactdropdown>
                        </ButtonGroup>
                      ))}
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>

        </Row>

        <Row>
          <Col md={12} xl={6}>
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Light Button Dropdowns</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(5)}>Show Code<i className={`${isHidden[5] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[5] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { variant: 'primary', text: 'Action' },
                        { variant: 'secondary', text: 'Action' },
                        { variant: 'warning', text: 'Action' },
                        { variant: 'info', text: 'Action' },
                        { variant: 'success', text: 'Action' },
                        { variant: 'danger', text: 'Action' },
                      ].map((group, index) => (
                        <ButtonGroup key={index} className="my-2 me-2">
                          <Reactdropdown>
                            <Reactdropdown.Toggle variant={`${group.variant}-light`}>
                              {group.text}
                            </Reactdropdown.Toggle>
                            <Reactdropdown.Menu>
                              <Reactdropdown.Item>Action</Reactdropdown.Item>
                              <Reactdropdown.Item>Another action</Reactdropdown.Item>
                              <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                              <Reactdropdown.Divider />
                              <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                            </Reactdropdown.Menu>
                          </Reactdropdown>
                        </ButtonGroup>
                      ))}
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[5] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { variant: 'primary', text: 'Action' },
                        { variant: 'secondary', text: 'Action' },
                        { variant: 'warning', text: 'Action' },
                        { variant: 'info', text: 'Action' },
                        { variant: 'success', text: 'Action' },
                        { variant: 'danger', text: 'Action' },
                      ].map((group, index) => (
                        <ButtonGroup key={index} className="my-2 me-2">
                          <Reactdropdown>
                            <Reactdropdown.Toggle variant={\`\${group.variant}-light\`}>
                              {group.text}
                            </Reactdropdown.Toggle>
                            <Reactdropdown.Menu>
                              <Reactdropdown.Item>Action</Reactdropdown.Item>
                              <Reactdropdown.Item>Another action</Reactdropdown.Item>
                              <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                              <Reactdropdown.Divider />
                              <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                            </Reactdropdown.Menu>
                          </Reactdropdown>
                        </ButtonGroup>
                      ))}
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>

          <Col md={12} xl={6}>
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Rounded Light Button Dropdowns</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(6)}>Show Code<i className={`${isHidden[6] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[6] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { variant: 'primary', text: 'Action' },
                        { variant: 'secondary', text: 'Action' },
                        { variant: 'warning', text: 'Action' },
                        { variant: 'info', text: 'Action' },
                        { variant: 'success', text: 'Action' },
                        { variant: 'danger', text: 'Action' },
                      ].map((group, index) => (
                        <ButtonGroup key={index} className="my-2 me-2">
                          <Reactdropdown>
                            <Reactdropdown.Toggle variant={`${group.variant}-light`} className='rounded-pill'>
                              {group.text}
                            </Reactdropdown.Toggle>
                            <Reactdropdown.Menu>
                              <Reactdropdown.Item>Action</Reactdropdown.Item>
                              <Reactdropdown.Item>Another action</Reactdropdown.Item>
                              <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                              <Reactdropdown.Divider />
                              <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                            </Reactdropdown.Menu>
                          </Reactdropdown>
                        </ButtonGroup>
                      ))}
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[6] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { variant: 'primary', text: 'Action' },
                        { variant: 'secondary', text: 'Action' },
                        { variant: 'warning', text: 'Action' },
                        { variant: 'info', text: 'Action' },
                        { variant: 'success', text: 'Action' },
                        { variant: 'danger', text: 'Action' },
                      ].map((group, index) => (
                        <ButtonGroup key={index} className="my-2 me-2">
                          <Reactdropdown>
                            <Reactdropdown.Toggle variant={\`\${group.variant}-light\`} className='rounded-pill'>
                              {group.text}
                            </Reactdropdown.Toggle>
                            <Reactdropdown.Menu>
                              <Reactdropdown.Item>Action</Reactdropdown.Item>
                              <Reactdropdown.Item>Another action</Reactdropdown.Item>
                              <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                              <Reactdropdown.Divider />
                              <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                            </Reactdropdown.Menu>
                          </Reactdropdown>
                        </ButtonGroup>
                      ))}
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>

        </Row>

        <Row>
          <Col md={12} xl={6}>
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Split Button Dropdowns</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(7)}>Show Code<i className={`${isHidden[7] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[7] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { variant: 'primary', text: 'Action' },
                        { variant: 'secondary', text: 'Action' },
                        { variant: 'warning', text: 'Action' },
                        { variant: 'info', text: 'Action' },
                        { variant: 'success', text: 'Action' },
                        { variant: 'danger', text: 'Action' },
                      ].map((btnGroup, index) => (
                        <ButtonGroup key={index} className="my-2 me-2">
                          <Reactdropdown as={ButtonGroup}>
                            <Button variant={btnGroup.variant}>{btnGroup.text}</Button>
                            <Reactdropdown.Toggle split variant={btnGroup.variant} id={`dropdown-split-${index}`} />
                            <Reactdropdown.Menu>
                              <Reactdropdown.Item>Action</Reactdropdown.Item>
                              <Reactdropdown.Item>Another action</Reactdropdown.Item>
                              <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                              <Reactdropdown.Divider />
                              <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                            </Reactdropdown.Menu>
                          </Reactdropdown>
                        </ButtonGroup>
                      ))}
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[7] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { variant: 'primary', text: 'Action' },
                        { variant: 'secondary', text: 'Action' },
                        { variant: 'warning', text: 'Action' },
                        { variant: 'info', text: 'Action' },
                        { variant: 'success', text: 'Action' },
                        { variant: 'danger', text: 'Action' },
                      ].map((btnGroup, index) => (
                        <ButtonGroup key={index} className="my-2 me-2">
                          <Reactdropdown as={ButtonGroup}>
                            <Button variant={btnGroup.variant}>{btnGroup.text}</Button>
                            <Reactdropdown.Toggle split variant={btnGroup.variant} id={\`dropdown-split-\${index}\`} />
                            <Reactdropdown.Menu>
                              <Reactdropdown.Item>Action</Reactdropdown.Item>
                              <Reactdropdown.Item>Another action</Reactdropdown.Item>
                              <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                              <Reactdropdown.Divider />
                              <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                            </Reactdropdown.Menu>
                          </Reactdropdown>
                        </ButtonGroup>
                      ))}
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>

          <Col md={12} xl={6}>
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Rounded Split Button Dropdowns</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(8)}>Show Code<i className={`${isHidden[8] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[8] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { variant: 'primary', text: 'Action' },
                        { variant: 'secondary', text: 'Action' },
                        { variant: 'warning', text: 'Action' },
                        { variant: 'info', text: 'Action' },
                        { variant: 'success', text: 'Action' },
                        { variant: 'danger', text: 'Action' },
                      ].map((btnGroup, index) => (
                        <ButtonGroup key={index} className="my-2 me-2 split-rounded">
                          <Reactdropdown as={ButtonGroup}>
                            <Button variant={btnGroup.variant}>{btnGroup.text}</Button>
                            <Reactdropdown.Toggle split variant={btnGroup.variant} id={`dropdown-split-${index}`} />
                            <Reactdropdown.Menu>
                              <Reactdropdown.Item>Action</Reactdropdown.Item>
                              <Reactdropdown.Item>Another action</Reactdropdown.Item>
                              <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                              <Reactdropdown.Divider />
                              <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                            </Reactdropdown.Menu>
                          </Reactdropdown>
                        </ButtonGroup>
                      ))}
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[8] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { variant: 'primary', text: 'Action' },
                        { variant: 'secondary', text: 'Action' },
                        { variant: 'warning', text: 'Action' },
                        { variant: 'info', text: 'Action' },
                        { variant: 'success', text: 'Action' },
                        { variant: 'danger', text: 'Action' },
                      ].map((btnGroup, index) => (
                        <ButtonGroup key={index} className="my-2 me-2 split-rounded">
                          <Reactdropdown as={ButtonGroup}>
                            <Button variant={btnGroup.variant}>{btnGroup.text}</Button>
                            <Reactdropdown.Toggle split variant={btnGroup.variant} id={\`dropdown-split-\${index}\`} />
                            <Reactdropdown.Menu>
                              <Reactdropdown.Item>Action</Reactdropdown.Item>
                              <Reactdropdown.Item>Another action</Reactdropdown.Item>
                              <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                              <Reactdropdown.Divider />
                              <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                            </Reactdropdown.Menu>
                          </Reactdropdown>
                        </ButtonGroup>
                      ))}
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>

        </Row>

        <Row>
          <Col md={12} xl={6}>
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Ghost button dropdowns</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(9)}>Show Code<i className={`${isHidden[9] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[9] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { variant: 'primary', text: 'Action' },
                        { variant: 'secondary', text: 'Action' },
                        { variant: 'warning', text: 'Action' },
                        { variant: 'info', text: 'Action' },
                        { variant: 'success', text: 'Action' },
                        { variant: 'danger', text: 'Action' },
                      ].map((btnGroup, index) => (
                        <ButtonGroup key={index} className="my-2 me-2">
                          <Reactdropdown as={ButtonGroup}>
                            <Reactdropdown.Toggle variant={`${btnGroup.variant}-ghost`} id={`dropdown-split-${index}`}>
                              {btnGroup.text}
                            </Reactdropdown.Toggle>
                            <Reactdropdown.Menu>
                              <Reactdropdown.Item>Action</Reactdropdown.Item>
                              <Reactdropdown.Item>Another action</Reactdropdown.Item>
                              <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                              <Reactdropdown.Divider />
                              <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                            </Reactdropdown.Menu>
                          </Reactdropdown>
                        </ButtonGroup>
                      ))}
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[9] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { variant: 'primary', text: 'Action' },
                        { variant: 'secondary', text: 'Action' },
                        { variant: 'warning', text: 'Action' },
                        { variant: 'info', text: 'Action' },
                        { variant: 'success', text: 'Action' },
                        { variant: 'danger', text: 'Action' },
                      ].map((btnGroup, index) => (
                        <ButtonGroup key={index} className="my-2 me-2">
                          <Reactdropdown as={ButtonGroup}>
                            <Reactdropdown.Toggle variant={\`\${btnGroup.variant}-ghost\`} id={\`dropdown-split-\${index}\`}>
                              {btnGroup.text}
                            </Reactdropdown.Toggle>
                            <Reactdropdown.Menu>
                              <Reactdropdown.Item>Action</Reactdropdown.Item>
                              <Reactdropdown.Item>Another action</Reactdropdown.Item>
                              <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                              <Reactdropdown.Divider />
                              <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                            </Reactdropdown.Menu>
                          </Reactdropdown>
                        </ButtonGroup>
                      ))}
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>

          <Col md={12} xl={6}>
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Profile Button Dropdowns</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(10)}>Show Code<i className={`${isHidden[10] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[10] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle variant='primary' className="btn-avatar">
                          <img src={imagesData('face20')} alt="img" width="25" height="25" className="rounded-circle me-1" />
                          Primary
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>
                            <img src={imagesData('face2')} alt="img" width="25" height="25" className="rounded-circle me-2" />Raymart Santiago
                          </Reactdropdown.Item>
                          <Reactdropdown.Item active>
                            <img src={imagesData('face20')} alt="img" width="25" height="25" className="rounded-circle me-2" />Ariana Monino
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face3')} alt="img" width="25" height="25" className="rounded-circle me-2" />Dexter dela Cruz
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face4')} alt="img" width="25" height="25" className="rounded-circle me-2" />Maricel Villalon
                          </Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle variant='outline-secondary' className="btn-avatar">
                          <img src={imagesData('face10')} alt="img" width="25" height="25" className="rounded-circle me-1" />
                          Primary
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>
                            <img src={imagesData('face2')} alt="img" width="25" height="25" className="rounded-circle me-2" />Raymart Santiago
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face20')} alt="img" width="25" height="25" className="rounded-circle me-2" />Ariana Monino
                          </Reactdropdown.Item>
                          <Reactdropdown.Item active>
                            <img src={imagesData('face10')} alt="img" width="25" height="25" className="rounded-circle me-2" />Dexter dela Cruz
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face4')} alt="img" width="25" height="25" className="rounded-circle me-2" />Maricel Villalon
                          </Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle variant='success-light' className="btn-avatar">
                          <img src={imagesData('face11')} alt="img" width="25" height="25" className="rounded-circle me-1" />
                          Primary
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item active>
                            <img src={imagesData('face11')} alt="img" width="25" height="25" className="rounded-circle me-2" />Raymart Santiago
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face20')} alt="img" width="25" height="25" className="rounded-circle me-2" />Ariana Monino
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face3')} alt="img" width="25" height="25" className="rounded-circle me-2" />Dexter dela Cruz
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face4')} alt="img" width="25" height="25" className="rounded-circle me-2" />Maricel Villalon
                          </Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>

                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle variant='info' className="btn-avatar rounded-pill">
                          <img src={imagesData('face12')} alt="img" width="25" height="25" className="rounded-circle me-1" />
                          Primary
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>
                            <img src={imagesData('face2')} alt="img" width="25" height="25" className="rounded-circle me-2" />Raymart Santiago
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face20')} alt="img" width="25" height="25" className="rounded-circle me-2" />Ariana Monino
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face3')} alt="img" width="25" height="25" className="rounded-circle me-2" />Dexter dela Cruz
                          </Reactdropdown.Item>
                          <Reactdropdown.Item active>
                            <img src={imagesData('face12')} alt="img" width="25" height="25" className="rounded-circle me-2" />Maricel Villalon
                          </Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle variant='outline-warning' className="btn-avatar rounded-pill">
                          <img src={imagesData('face13')} alt="img" width="25" height="25" className="rounded-circle me-1" />
                          Primary
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>
                            <img src={imagesData('face2')} alt="img" width="25" height="25" className="rounded-circle me-2" />Raymart Santiago
                          </Reactdropdown.Item>
                          <Reactdropdown.Item active>
                            <img src={imagesData('face13')} alt="img" width="25" height="25" className="rounded-circle me-2" />Ariana Monino
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face3')} alt="img" width="25" height="25" className="rounded-circle me-2" />Dexter dela Cruz
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face4')} alt="img" width="25" height="25" className="rounded-circle me-2" />Maricel Villalon
                          </Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2">
                        <Reactdropdown.Toggle variant='default' className="btn-avatar rounded-pill">
                          <img src={imagesData('face14')} alt="img" width="25" height="25" className="rounded-circle me-1" />
                          Primary
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item active>
                            <img src={imagesData('face14')} alt="img" width="25" height="25" className="rounded-circle me-2" />Raymart Santiago
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face20')} alt="img" width="25" height="25" className="rounded-circle me-2" />Ariana Monino
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face3')} alt="img" width="25" height="25" className="rounded-circle me-2" />Dexter dela Cruz
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face4')} alt="img" width="25" height="25" className="rounded-circle me-2" />Maricel Villalon
                          </Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[10] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle variant='primary' className="btn-avatar">
                          <img src={imagesData('face20')} alt="img" width="25" height="25" className="rounded-circle me-1" />
                          Primary
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>
                            <img src={imagesData('face2')} alt="img" width="25" height="25" className="rounded-circle me-2" />Raymart Santiago
                          </Reactdropdown.Item>
                          <Reactdropdown.Item active>
                            <img src={imagesData('face20')} alt="img" width="25" height="25" className="rounded-circle me-2" />Ariana Monino
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face3')} alt="img" width="25" height="25" className="rounded-circle me-2" />Dexter dela Cruz
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face4')} alt="img" width="25" height="25" className="rounded-circle me-2" />Maricel Villalon
                          </Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle variant='outline-secondary' className="btn-avatar">
                          <img src={imagesData('face10')} alt="img" width="25" height="25" className="rounded-circle me-1" />
                          Primary
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>
                            <img src={imagesData('face2')} alt="img" width="25" height="25" className="rounded-circle me-2" />Raymart Santiago
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face20')} alt="img" width="25" height="25" className="rounded-circle me-2" />Ariana Monino
                          </Reactdropdown.Item>
                          <Reactdropdown.Item active>
                            <img src={imagesData('face10')} alt="img" width="25" height="25" className="rounded-circle me-2" />Dexter dela Cruz
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face4')} alt="img" width="25" height="25" className="rounded-circle me-2" />Maricel Villalon
                          </Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle variant='success-light' className="btn-avatar">
                          <img src={imagesData('face11')} alt="img" width="25" height="25" className="rounded-circle me-1" />
                          Primary
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item active>
                            <img src={imagesData('face11')} alt="img" width="25" height="25" className="rounded-circle me-2" />Raymart Santiago
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face20')} alt="img" width="25" height="25" className="rounded-circle me-2" />Ariana Monino
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face3')} alt="img" width="25" height="25" className="rounded-circle me-2" />Dexter dela Cruz
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face4')} alt="img" width="25" height="25" className="rounded-circle me-2" />Maricel Villalon
                          </Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>

                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle variant='info' className="btn-avatar rounded-pill">
                          <img src={imagesData('face12')} alt="img" width="25" height="25" className="rounded-circle me-1" />
                          Primary
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>
                            <img src={imagesData('face2')} alt="img" width="25" height="25" className="rounded-circle me-2" />Raymart Santiago
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face20')} alt="img" width="25" height="25" className="rounded-circle me-2" />Ariana Monino
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face3')} alt="img" width="25" height="25" className="rounded-circle me-2" />Dexter dela Cruz
                          </Reactdropdown.Item>
                          <Reactdropdown.Item active>
                            <img src={imagesData('face12')} alt="img" width="25" height="25" className="rounded-circle me-2" />Maricel Villalon
                          </Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle variant='outline-warning' className="btn-avatar rounded-pill">
                          <img src={imagesData('face13')} alt="img" width="25" height="25" className="rounded-circle me-1" />
                          Primary
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>
                            <img src={imagesData('face2')} alt="img" width="25" height="25" className="rounded-circle me-2" />Raymart Santiago
                          </Reactdropdown.Item>
                          <Reactdropdown.Item active>
                            <img src={imagesData('face13')} alt="img" width="25" height="25" className="rounded-circle me-2" />Ariana Monino
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face3')} alt="img" width="25" height="25" className="rounded-circle me-2" />Dexter dela Cruz
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face4')} alt="img" width="25" height="25" className="rounded-circle me-2" />Maricel Villalon
                          </Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2">
                        <Reactdropdown.Toggle variant='default' className="btn-avatar rounded-pill">
                          <img src={imagesData('face14')} alt="img" width="25" height="25" className="rounded-circle me-1" />
                          Primary
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item active>
                            <img src={imagesData('face14')} alt="img" width="25" height="25" className="rounded-circle me-2" />Raymart Santiago
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face20')} alt="img" width="25" height="25" className="rounded-circle me-2" />Ariana Monino
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face3')} alt="img" width="25" height="25" className="rounded-circle me-2" />Dexter dela Cruz
                          </Reactdropdown.Item>
                          <Reactdropdown.Item>
                            <img src={imagesData('face4')} alt="img" width="25" height="25" className="rounded-circle me-2" />Maricel Villalon
                          </Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>

        </Row>

        <Row>
          <Col md={12} xl={6}>
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Dropdown Sizing</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(11)}>Show Code<i className={`${isHidden[11] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[11] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle size='sm' variant='secondary'>
                          Small button
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Button variant='success' size='sm'>Small split button</Button>
                        <Reactdropdown.Toggle split size='sm' variant="success" type="button" />
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle size='lg' variant='info'>
                          Small button
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2">
                        <Button variant='warning' size='lg'>Small split button</Button>
                        <Reactdropdown.Toggle split size='sm' variant="warning" type="button" />
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[11] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle size='sm' variant='secondary'>
                          Small button
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Button variant='success' size='sm'>Small split button</Button>
                        <Reactdropdown.Toggle split size='sm' variant="success" type="button" />
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle size='lg' variant='info'>
                          Small button
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2">
                        <Button variant='warning' size='lg'>Small split button</Button>
                        <Reactdropdown.Toggle split size='sm' variant="warning" type="button" />
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>

          <Col md={12} xl={6}>
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Header Dropdowns</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(12)}>Show Code<i className={`${isHidden[12] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[12] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {['primary', 'secondary', 'success', 'info', 'warning', 'danger'].map((idx, index) => (
                        <Reactdropdown as={ButtonGroup} key={index} className="mt-2 mb-2 me-2">
                          <Reactdropdown.Toggle variant={idx} className="btn btn-pill"> Action </Reactdropdown.Toggle>
                          <Reactdropdown.Menu className="dropdown-plus-title">
                            <Reactdropdown.Header>Dropdown</Reactdropdown.Header>
                            <Reactdropdown.Item href="#/action-1">Action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-1">Another action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-1">Something else here</Reactdropdown.Item>
                            <DropdownDivider />
                            <Reactdropdown.Item href="#/action-1">Separated link</Reactdropdown.Item>
                          </Reactdropdown.Menu>
                        </Reactdropdown>
                      ))}
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[12] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {['primary', 'secondary', 'success', 'info', 'warning', 'danger'].map((idx, index) => (
                        <Reactdropdown as={ButtonGroup} key={index} className="mt-2 mb-2 me-2">
                          <Reactdropdown.Toggle variant={idx} className="btn btn-pill"> Action </Reactdropdown.Toggle>
                          <Reactdropdown.Menu className="dropdown-plus-title">
                            <Reactdropdown.Header>Dropdown</Reactdropdown.Header>
                            <Reactdropdown.Item href="#/action-1">Action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-1">Another action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-1">Something else here</Reactdropdown.Item>
                            <DropdownDivider />
                            <Reactdropdown.Item href="#/action-1">Separated link</Reactdropdown.Item>
                          </Reactdropdown.Menu>
                        </Reactdropdown>
                      ))}
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>

        </Row>

        <Row>
          <div className="col-md-6 col-xxl-3 col-xl-6">
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Dropup</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(13)}>Show Code<i className={`${isHidden[13] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[13] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2" drop='up'>
                        <Reactdropdown.Toggle variant='primary'>
                          Dropup
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2" drop='up'>
                        <Button variant='secondary' size='sm'>Split dropup</Button>
                        <Reactdropdown.Toggle split variant="secondary" type="button" />
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item >Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[13] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2" drop='up'>
                        <Reactdropdown.Toggle variant='primary'>
                          Dropup
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2" drop='up'>
                        <Button variant='secondary' size='sm'>Split dropup</Button>
                        <Reactdropdown.Toggle split variant="secondary" type="button" />
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item >Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </div>
          <div className="col-md-6 col-xxl-3 col-xl-6">
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Dropend</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(14)}>Show Code<i className={`${isHidden[14] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[14] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">

                      <Reactdropdown as={ButtonGroup} className="my-2 me-2" drop='end'>
                        <Reactdropdown.Toggle variant='primary'>
                          Dropend
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2" drop='end'>
                        <Button variant='secondary' size='sm'>Split dropend</Button>
                        <Reactdropdown.Toggle split variant="secondary" type="button" />
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[14] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">

                      <Reactdropdown as={ButtonGroup} className="my-2 me-2" drop='end'>
                        <Reactdropdown.Toggle variant='primary'>
                          Dropend
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2" drop='end'>
                        <Button variant='secondary' size='sm'>Split dropend</Button>
                        <Reactdropdown.Toggle split variant="secondary" type="button" />
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </div>

          <div className="col-md-6 col-xxl-3 col-xl-6">
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Dropstart</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(15)}>Show Code<i className={`${isHidden[15] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[15] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">

                      <Reactdropdown as={ButtonGroup} className="my-2 me-2" drop='start'>
                        <Reactdropdown.Toggle variant='primary'>
                          Dropstart
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2" drop='start'>
                        <Button variant='secondary' size='sm'>Split dropstart</Button>
                        <Reactdropdown.Toggle split variant="secondary" type="button" />
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[15] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">

                      <Reactdropdown as={ButtonGroup} className="my-2 me-2" drop='start'>
                        <Reactdropdown.Toggle variant='primary'>
                          Dropstart
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2" drop='start'>
                        <Button variant='secondary' size='sm'>Split dropstart</Button>
                        <Reactdropdown.Toggle split variant="secondary" type="button" />
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </div>

          <div className="col-md-6 col-xxl-3 col-xl-6">
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Dark Dropdown</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(16)}>Show Code<i className={`${isHidden[16] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[16] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle variant='dark'>
                          Dropdown button
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[16] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle variant='dark'>
                          Dropdown button
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </div>

        </Row>

        <Row>
          <div className="col-md-4">
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Centered Dropdown</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(17)}>Show Code<i className={`${isHidden[17] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[17] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2" drop='down-centered'>
                        <Reactdropdown.Toggle variant='teal' className='text-wrap'>
                          Centered dropdown
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider className='mb-0' />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2" drop='up-centered'>
                        <Reactdropdown.Toggle variant='purple' className='text-wrap'>
                          Centered dropup
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider className='mb-0' />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[17] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2" drop='down-centered'>
                        <Reactdropdown.Toggle variant='teal' className='text-wrap'>
                          Centered dropdown
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider className='mb-0' />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2" drop='up-centered'>
                        <Reactdropdown.Toggle variant='purple' className='text-wrap'>
                          Centered dropup
                        </Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                          <DropdownDivider className='mb-0' />
                          <Reactdropdown.Item>Separated link</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </div>

          <div className="col-md-4">
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Menu Items Dropdown</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(18)}>Show Code<i className={`${isHidden[18] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[18] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle variant='info'>Dropdown</Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[18] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle variant='info'>Dropdown</Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </div>

          <div className="col-md-4">
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Active & Disabled Menu Dropdowns</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(19)}>Show Code<i className={`${isHidden[19] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[19] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">

                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle variant='success'>Dropdown</Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item active>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle variant='warning'>Disabled Menu</Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item disabled>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[19] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">

                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle variant='success'>Dropdown</Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item active>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                      <Reactdropdown as={ButtonGroup} className="my-2 me-2">
                        <Reactdropdown.Toggle variant='warning'>Disabled Menu</Reactdropdown.Toggle>
                        <Reactdropdown.Menu>
                          <Reactdropdown.Item>Action</Reactdropdown.Item>
                          <Reactdropdown.Item disabled>Another action</Reactdropdown.Item>
                          <Reactdropdown.Item>Something else here</Reactdropdown.Item>
                        </Reactdropdown.Menu>
                      </Reactdropdown>
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </div>

        </Row>

        <Row>
          <Col md={12}>
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Alignment options</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(20)}>Show Code<i className={`${isHidden[20] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[20] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { vari: 'primary', align: '', drop: '', text: 'Dropdown' },
                        { vari: 'secondary', align: 'end', drop: '', text: 'Right-aligned-menu' },
                        { vari: 'success', align: 'lg-end', drop: '', text: 'Right-aligned-menu-lg' },
                        { vari: 'info', align: 'lg-start', drop: '', text: 'left-aligned-menu-lg' },
                        { vari: 'info', align: '', drop: 'start', text: 'DropStart' },
                        { vari: 'info', align: '', drop: 'end', text: 'DropEnd' },
                        { vari: 'info', align: '', drop: 'up', text: 'DropUp' },
                      ].map((item, index) => (
                        <Reactdropdown as={ButtonGroup} className="my-2 me-2" drop={item.drop as any} key={index}>
                          <Reactdropdown.Toggle variant={item.vari}>
                            {item.text}
                          </Reactdropdown.Toggle>
                          <Reactdropdown.Menu align={item.align as any}>
                            <Reactdropdown.Item>Menu item</Reactdropdown.Item>
                            <Reactdropdown.Item>Menu item</Reactdropdown.Item>
                            <Reactdropdown.Item>Menu item</Reactdropdown.Item>
                          </Reactdropdown.Menu>
                        </Reactdropdown>
                      ))}
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[20] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[
                        { vari: 'primary', align: '', drop: '', text: 'Dropdown' },
                        { vari: 'secondary', align: 'end', drop: '', text: 'Right-aligned-menu' },
                        { vari: 'success', align: 'lg-end', drop: '', text: 'Right-aligned-menu-lg' },
                        { vari: 'info', align: 'lg-start', drop: '', text: 'left-aligned-menu-lg' },
                        { vari: 'info', align: '', drop: 'start', text: 'DropStart' },
                        { vari: 'info', align: '', drop: 'end', text: 'DropEnd' },
                        { vari: 'info', align: '', drop: 'up', text: 'DropUp' },
                      ].map((item, index) => (
                        <Reactdropdown as={ButtonGroup} className="my-2 me-2" drop={item.drop as any} key={index}>
                          <Reactdropdown.Toggle variant={item.vari}>
                            {item.text}
                          </Reactdropdown.Toggle>
                          <Reactdropdown.Menu align={item.align as any}>
                            <Reactdropdown.Item>Menu item</Reactdropdown.Item>
                            <Reactdropdown.Item>Menu item</Reactdropdown.Item>
                            <Reactdropdown.Item>Menu item</Reactdropdown.Item>
                          </Reactdropdown.Menu>
                        </Reactdropdown>
                      ))}
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>

        </Row>

        <Row>
          <Col md={6}>
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Auto close behavior</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(21)}>Show Code<i className={`${isHidden[21] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[21] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[{ id: 'dropdown-autoclose-true', vari: 'info', label: 'Default Dropdown', items: ['Menu Item', 'Menu Item', 'Menu Item'], },
                      { id: 'dropdown-autoclose-inside', vari: 'success', label: 'Clickable Outside', items: ['Menu Item', 'Menu Item', 'Menu Item'], autoClose: 'inside', },
                      { id: 'dropdown-autoclose-outside', vari: 'teal', label: 'Clickable Inside', items: ['Menu Item', 'Menu Item', 'Menu Item'], autoClose: 'outside', },
                      { id: 'dropdown-autoclose-false', vari: 'warning', label: 'Manual Close', items: ['Menu Item', 'Menu Item', 'Menu Item'], autoClose: false, },
                      ].map((dropdown) => (
                        <Reactdropdown key={dropdown.id} className="mx-2" autoClose={dropdown.autoClose as any}>
                          <Reactdropdown.Toggle className='my-1' variant={dropdown.vari} id={dropdown.id}>{dropdown.label}</Reactdropdown.Toggle>

                          <Reactdropdown.Menu>
                            {dropdown.items.map((item, index) => (
                              <Reactdropdown.Item key={index}>
                                {item}
                              </Reactdropdown.Item>
                            ))}
                          </Reactdropdown.Menu>
                        </Reactdropdown>
                      ))}
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[21] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      {[{ id: 'dropdown-autoclose-true', vari: 'info', label: 'Default Dropdown', items: ['Menu Item', 'Menu Item', 'Menu Item'], },
                      { id: 'dropdown-autoclose-inside', vari: 'success', label: 'Clickable Outside', items: ['Menu Item', 'Menu Item', 'Menu Item'], autoClose: 'inside', },
                      { id: 'dropdown-autoclose-outside', vari: 'teal', label: 'Clickable Inside', items: ['Menu Item', 'Menu Item', 'Menu Item'], autoClose: 'outside', },
                      { id: 'dropdown-autoclose-false', vari: 'warning', label: 'Manual Close', items: ['Menu Item', 'Menu Item', 'Menu Item'], autoClose: false, },
                      ].map((dropdown) => (
                        <Reactdropdown key={dropdown.id} className="mx-2" autoClose={dropdown.autoClose as any}>
                          <Reactdropdown.Toggle className='my-1' variant={dropdown.vari} id={dropdown.id}>{dropdown.label}</Reactdropdown.Toggle>

                          <Reactdropdown.Menu>
                            {dropdown.items.map((item, index) => (
                              <Reactdropdown.Item key={index}>
                                {item}
                              </Reactdropdown.Item>
                            ))}
                          </Reactdropdown.Menu>
                        </Reactdropdown>
                      ))}
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>

          <Col md={6}>
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Dropdown options</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(22)}>Show Code<i className={`${isHidden[22] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[22] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      <div className="d-flex">
                        <Reactdropdown className="me-1">
                          <Reactdropdown.Toggle variant="success"> Offset </Reactdropdown.Toggle>
                          <Reactdropdown.Menu>
                            <Reactdropdown.Item href="#/action-1">Action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-2">Another action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-3">Something else</Reactdropdown.Item>
                          </Reactdropdown.Menu>
                        </Reactdropdown>

                        <Reactdropdown as={ButtonGroup}>
                          <Button variant="info">Reference</Button>
                          <Reactdropdown.Toggle split variant="info" id="dropdown-split-basic" />
                          <Reactdropdown.Menu>
                            <Reactdropdown.Item href="#/action-1">Action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-2">Another action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-3">Something else</Reactdropdown.Item>
                            <DropdownDivider />
                            <Reactdropdown.Item href="#/action-4">Separated link</Reactdropdown.Item>
                          </Reactdropdown.Menu>
                        </Reactdropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[22] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      <div className="d-flex">
                        <Reactdropdown className="me-1">
                          <Reactdropdown.Toggle variant="success"> Offset </Reactdropdown.Toggle>
                          <Reactdropdown.Menu>
                            <Reactdropdown.Item href="#/action-1">Action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-2">Another action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-3">Something else</Reactdropdown.Item>
                          </Reactdropdown.Menu>
                        </Reactdropdown>

                        <Reactdropdown as={ButtonGroup}>
                          <Button variant="info">Reference</Button>
                          <Reactdropdown.Toggle split variant="info" id="dropdown-split-basic" />
                          <Reactdropdown.Menu>
                            <Reactdropdown.Item href="#/action-1">Action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-2">Another action</Reactdropdown.Item>
                            <Reactdropdown.Item href="#/action-3">Something else</Reactdropdown.Item>
                            <DropdownDivider />
                            <Reactdropdown.Item href="#/action-4">Separated link</Reactdropdown.Item>
                          </Reactdropdown.Menu>
                        </Reactdropdown>
                      </div>
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>

        </Row>

        <Row>
          <Col md={6}>
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Dropdown options</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(23)}>Show Code<i className={`${isHidden[23] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[23] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      <div className="my-2">
                        <Reactdropdown as={ButtonGroup} align={{ lg: 'end' }}>
                          <Reactdropdown.Toggle className='text-wrap ' variant="secondary" id="dropdown-split-basic">Left-aligned but right aligned when large screen</Reactdropdown.Toggle>
                          <Reactdropdown.Menu>
                            <Reactdropdown.Item eventKey="1">Action</Reactdropdown.Item>
                            <Reactdropdown.Item eventKey="2">Another action</Reactdropdown.Item>
                          </Reactdropdown.Menu>
                        </Reactdropdown>
                      </div>
                      <div className="my-2">
                        <SplitButton className='text-wrap' variant='success' align={{ lg: 'start' }} title="Right-aligned but left aligned when large screen" id="dropdown-menu-align-responsive-2" >
                          <Reactdropdown.Item eventKey="1">Action</Reactdropdown.Item>
                          <Reactdropdown.Item eventKey="2">Another action</Reactdropdown.Item>
                          <Reactdropdown.Item eventKey="2">Something else here</Reactdropdown.Item>
                        </SplitButton>
                      </div>

                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[23] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="text-wrap">
                    <div className="card-content">
                      <div className="my-2">
                        <Reactdropdown as={ButtonGroup} align={{ lg: 'end' }}>
                          <Reactdropdown.Toggle className='text-wrap ' variant="secondary" id="dropdown-split-basic">Left-aligned but right aligned when large screen</Reactdropdown.Toggle>
                          <Reactdropdown.Menu>
                            <Reactdropdown.Item eventKey="1">Action</Reactdropdown.Item>
                            <Reactdropdown.Item eventKey="2">Another action</Reactdropdown.Item>
                          </Reactdropdown.Menu>
                        </Reactdropdown>
                      </div>
                      <div className="my-2">
                        <SplitButton className='text-wrap' variant='success' align={{ lg: 'start' }} title="Right-aligned but left aligned when large screen" id="dropdown-menu-align-responsive-2" >
                          <Reactdropdown.Item eventKey="1">Action</Reactdropdown.Item>
                          <Reactdropdown.Item eventKey="2">Another action</Reactdropdown.Item>
                          <Reactdropdown.Item eventKey="2">Something else here</Reactdropdown.Item>
                        </SplitButton>
                      </div>

                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>

          <Col md={12} xl={6}>
            <Card>
              <Card.Header className="justify-content-between">
                <h3 className="card-title">Icon Drop Downs dropdowns</h3>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(24)}>Show Code<i className={`${isHidden[24] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[24] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="card-content">
                    <div className="switch-content">
                      <Row>
                        {updatedArray.map((idx, index) => (
                          <Col lg={4} key={index}>
                            {idx.map((button, buttonIndex) => (
                              <ButtonGroup key={buttonIndex} className="my-2 me-2">
                                <Reactdropdown>
                                  <Reactdropdown.Toggle variant={button.variant} id={`dropdown-button-${index}-${buttonIndex}`}>
                                    <i className={`fe ${button.icon}`}></i>
                                  </Reactdropdown.Toggle>
                                  <Reactdropdown.Menu>
                                    {button.items.map((item, itemIndex) => (
                                      <Reactdropdown.Item key={itemIndex}>{item}</Reactdropdown.Item>
                                    ))}
                                  </Reactdropdown.Menu>
                                </Reactdropdown>
                              </ButtonGroup>
                            ))}
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[24] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="card-content">
                    <div className="switch-content">
                      <Row>
                        {updatedArray.map((idx, index) => (
                          <Col lg={4} key={index}>
                            {idx.map((button, buttonIndex) => (
                              <ButtonGroup key={buttonIndex} className="my-2 me-2">
                                <Reactdropdown>
                                  <Reactdropdown.Toggle variant={button.variant} id={\`dropdown-button-\${index}-\${buttonIndex}\`}>
                                    <i className={\`fe \${button.icon}\`}></i>
                                  </Reactdropdown.Toggle>
                                  <Reactdropdown.Menu>
                                    {button.items.map((item, itemIndex) => (
                                      <Reactdropdown.Item key={itemIndex}>{item}</Reactdropdown.Item>
                                    ))}
                                  </Reactdropdown.Menu>
                                </Reactdropdown>
                              </ButtonGroup>
                            ))}
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>

        </Row>


        <Row>
          <Col xxl={3} xl={6} >
            <Card className="custom-card">
              <Card.Header className="justify-content-between">
                <div className="card-title">
                  non-interactive dropdown items
                </div>

                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(25)}>Show Code<i className={`${isHidden[25] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[25] ? 'd-none' : ''}`}>
                <div className="example">
                  <p className="card-title mb-3">Use <code>.dropdown-item-text.</code> to create non-interactive dropdown items.</p>
                  <div className="bd-example">
                    <ul className="dropdown-menu">
                      <li><span className="dropdown-item-text">Dropdown item text</span>
                      </li>
                      <li><a className="dropdown-item">Action</a></li>
                      <li><a className="dropdown-item">Another action</a></li>
                      <li><a className="dropdown-item">Something else here</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[25] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <p className="card-title mb-3">Use <code>.dropdown-item-text.</code> to create non-interactive dropdown items.</p>
                  <div className="bd-example">
                    <ul className="dropdown-menu">
                      <li><span className="dropdown-item-text">Dropdown item text</span>
                      </li>
                      <li><a className="dropdown-item">Action</a></li>
                      <li><a className="dropdown-item">Another action</a></li>
                      <li><a className="dropdown-item">Something else here</a>
                      </li>
                    </ul>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>
          <Col xxl={3} xl={6} >
            <Card className="custom-card">
              <Card.Header className="justify-content-between">
                <div className="card-title">
                  Dropdown Headers
                </div>

                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(26)}>Show Code<i className={`${isHidden[26] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[26] ? 'd-none' : ''}`}>
                <div className="example">
                  <p className="card-titlte mb-3">Add a <code>.dropdown-header</code> to label sections of actions in any dropdown menu.</p>
                  <div className="bd-example">
                    <ul className="dropdown-menu">
                      <li>
                        <h6 className="dropdown-header">Dropdown header</h6>
                      </li>
                      <li><a className="dropdown-item">Action</a></li>
                      <li><a className="dropdown-item">Another action</a></li>
                      <li><a className="dropdown-item">Something else here</a></li>
                    </ul>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[26] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <p className="card-titlte mb-3">Add a <code>.dropdown-header</code> to label sections of actions in any dropdown menu.</p>
                  <div className="bd-example">
                    <ul className="dropdown-menu">
                      <li>
                        <h6 className="dropdown-header">Dropdown header</h6>
                      </li>
                      <li><a className="dropdown-item">Action</a></li>
                      <li><a className="dropdown-item">Another action</a></li>
                      <li><a className="dropdown-item">Something else here</a></li>
                    </ul>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>
          <Col xxl={3} xl={6} >
            <Card className="custom-card">
              <Card.Header className="justify-content-between">
                <div className="card-title">
                  Dropdown Dividers
                </div>
                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(27)}>Show Code<i className={`${isHidden[27] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[27] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="bd-example">
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-header">Heading</a></li>
                      <li><a className="dropdown-item">Action</a></li>
                      <li><a className="dropdown-item">Another action</a></li>
                      <li><a className="dropdown-item">Something else here</a></li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li><a className="dropdown-item">Separated link</a></li>
                    </ul>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[27] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
                  <div className="bd-example">
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-header">Heading</a></li>
                      <li><a className="dropdown-item">Action</a></li>
                      <li><a className="dropdown-item">Another action</a></li>
                      <li><a className="dropdown-item">Something else here</a></li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li><a className="dropdown-item">Separated link</a></li>
                    </ul>
                  </div>
                </div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>
          <Col xxl={3} xl={6} >
            <Card className="custom-card">
              <Card.Header className="justify-content-between">
                <div className="card-title">
                  Dropdown Menu Text
                </div>

                <div className="prism-toggle">
                  <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(28)}>Show Code<i className={`${isHidden[28] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                </div>
              </Card.Header>
              <Card.Body className={`${isHidden[28] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className="bd-example">
                    <div className="dropdown-menu p-4 text-muted" style={{ maxWidth: "200px" }}>
                      <p>
                        Some example text that's free-flowing within the dropdown menu.
                      </p>
                      <p className="mb-0">
                        And this is more example text.
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className={`card-footer border-top-0 ${isHidden[28] ? '' : 'd-none'}`}>
                <pre><code className='language-javascript'>
                  {`
<Card.Body>
<div className="example">
<div className="bd-example">
  <div className="dropdown-menu p-4 text-muted" style={{ maxWidth: "200px" }}>
    <p>
      Some example text that's free-flowing within the dropdown menu.
    </p>
    <p className="mb-0">
      And this is more example text.
    </p>
  </div>
</div>
</div>
</Card.Body>
`}
                </code></pre>
              </div>
            </Card>
          </Col>
        </Row>
    </Fragment>
  );
};

export default Dropdown;