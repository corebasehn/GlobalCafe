import { FC, Fragment, useState } from 'react';
import { Button, Row, Col, Card, ToggleButton } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Pageheader from '../../layout/layoutcomponent/pageheader';

interface ComponentProps { }

const Buttons: FC<ComponentProps> = () => {

  const [isHidden, setIsHidden] = useState<boolean[]>([false]);
  const toggleHidden = (index: number) => {
    const updatedHidden = [...isHidden];
    updatedHidden[index] = !updatedHidden[index];
    setIsHidden(updatedHidden);
  };

  return (
    <Fragment>
      <Pageheader title="BUTTONS" heading="Elements" active="BUTTONS" />
      <Row>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Default Buttons
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(0)}>Show Code<i className={`${isHidden[0] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[0] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <Button variant='primary' className="primary btn-wave">Primary</Button>
                  <Button variant='secondary' className="secondary btn-wave">Secondary</Button>
                  <Button variant='success' className="success btn-wave">Success</Button>
                  <Button variant='danger' className="danger btn-wave">Danger</Button>
                  <Button variant='warning' className="warning btn-wave">Warning</Button>
                  <Button variant='info' className="info btn-wave">Info</Button>
                  <Button variant='light' className="light btn-wave">Light</Button>
                  <Button variant='dark' className="dark btn-wave text-white">Dark</Button>
                  <Button variant='link' className="link btn-wave">Link</Button>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[0] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <Button variant='primary' className="primary btn-wave">Primary</Button>
    <Button variant='secondary' className="secondary btn-wave">Secondary</Button>
    <Button variant='success' className="success btn-wave">Success</Button>
    <Button variant='danger' className="danger btn-wave">Danger</Button>
    <Button variant='warning' className="warning btn-wave">Warning</Button>
    <Button variant='info' className="info btn-wave">Info</Button>
    <Button variant='light' className="light btn-wave">Light</Button>
    <Button variant='dark' className="dark btn-wave text-white">Dark</Button>
    <Button variant='link' className="link btn-wave">Link</Button>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Rounded Buttons
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(1)}>Show Code<i className={`${isHidden[1] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[1] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <Button variant='primary' className="rounded-pill btn-wave">Primary</Button>
                  <Button variant='secondary' className="rounded-pill btn-wave">Secondary</Button>
                  <Button variant='success' className="rounded-pill btn-wave">Success</Button>
                  <Button variant='danger' className="rounded-pill btn-wave">Danger</Button>
                  <Button variant='warning' className="rounded-pill btn-wave">Warning</Button>
                  <Button variant='info' className="rounded-pill btn-wave">Info</Button>
                  <Button variant='light' className="rounded-pill btn-wave">Light</Button>
                  <Button variant='dark' className="rounded-pill btn-wave text-white">Dark</Button>
                  <Button variant='link' className="rounded-pill btn-wave">Link</Button>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[1] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <Button variant='primary' className="rounded-pill btn-wave">Primary</Button>
    <Button variant='secondary' className="rounded-pill btn-wave">Secondary</Button>
    <Button variant='success' className="rounded-pill btn-wave">Success</Button>
    <Button variant='danger' className="rounded-pill btn-wave">Danger</Button>
    <Button variant='warning' className="rounded-pill btn-wave">Warning</Button>
    <Button variant='info' className="rounded-pill btn-wave">Info</Button>
    <Button variant='light' className="rounded-pill btn-wave">Light</Button>
    <Button variant='dark' className="rounded-pill btn-wave text-white">Dark</Button>
    <Button variant='link' className="rounded-pill btn-wave">Link</Button>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Light Buttons
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(2)}>Show Code<i className={`${isHidden[2] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[2] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <Button variant='primary-light' className="btn-wave">Primary</Button>
                  <Button variant='secondary-light' className="btn-wave">Secondary</Button>
                  <Button variant='success-light' className="btn-wave">Success</Button>
                  <Button variant='danger-light' className="btn-wave">Danger</Button>
                  <Button variant='warning-light' className="btn-wave">Warning</Button>
                  <Button variant='info-light' className="btn-wave">Info</Button>
                  <Button variant='purple-light' className="btn-wave">purple</Button>
                  <Button variant='teal-light' className="btn-wave">teal</Button>
                  <Button variant='orange-light' className="btn-wave">orange</Button>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[2] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <Button variant='primary-light' className="btn-wave">Primary</Button>
    <Button variant='secondary-light' className="btn-wave">Secondary</Button>
    <Button variant='success-light' className="btn-wave">Success</Button>
    <Button variant='danger-light' className="btn-wave">Danger</Button>
    <Button variant='warning-light' className="btn-wave">Warning</Button>
    <Button variant='info-light' className="btn-wave">Info</Button>
    <Button variant='purple-light' className="btn-wave">purple</Button>
    <Button variant='teal-light' className="btn-wave">teal</Button>
    <Button variant='orange-light' className="btn-wave">orange</Button>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Light Rounded Buttons
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(3)}>Show Code<i className={`${isHidden[3] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[3] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <Button variant='primary-light' className="rounded-pill btn-wave">Primary</Button>
                  <Button variant='secondary-light' className="rounded-pill btn-wave">Secondary</Button>
                  <Button variant='success-light' className="rounded-pill btn-wave">Success</Button>
                  <Button variant='danger-light' className="rounded-pill btn-wave">Danger</Button>
                  <Button variant='warning-light' className="rounded-pill btn-wave">Warning</Button>
                  <Button variant='info-light' className="rounded-pill btn-wave">Info</Button>
                  <Button variant='purple-light' className="rounded-pill btn-wave">purple</Button>
                  <Button variant='teal-light' className="rounded-pill btn-wave">teal</Button>
                  <Button variant='orange-light' className="rounded-pill btn-wave">orange</Button>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[3] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <Button variant='primary-light' className="rounded-pill btn-wave">Primary</Button>
    <Button variant='secondary-light' className="rounded-pill btn-wave">Secondary</Button>
    <Button variant='success-light' className="rounded-pill btn-wave">Success</Button>
    <Button variant='danger-light' className="rounded-pill btn-wave">Danger</Button>
    <Button variant='warning-light' className="rounded-pill btn-wave">Warning</Button>
    <Button variant='info-light' className="rounded-pill btn-wave">Info</Button>
    <Button variant='purple-light' className="rounded-pill btn-wave">purple</Button>
    <Button variant='teal-light' className="rounded-pill btn-wave">teal</Button>
    <Button variant='orange-light' className="rounded-pill btn-wave">orange</Button>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Outline Buttons
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(4)}>Show Code<i className={`${isHidden[4] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[4] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <Button variant='outline-primary' className="btn-wave">Primary</Button>
                  <Button variant='outline-secondary' className="btn-wave">Secondary</Button>
                  <Button variant='outline-success' className="btn-wave">Success</Button>
                  <Button variant='outline-danger' className="btn-wave">Danger</Button>
                  <Button variant='outline-warning' className="btn-wave">Warning</Button>
                  <Button variant='outline-info' className="btn-wave">Info</Button>
                  <Button variant='outline-light' className="btn-wave">Light</Button>
                  <Button variant='outline-dark' className="btn-wave">Dark</Button>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[4] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <Button variant='outline-primary' className="btn-wave">Primary</Button>
    <Button variant='outline-secondary' className="btn-wave">Secondary</Button>
    <Button variant='outline-success' className="btn-wave">Success</Button>
    <Button variant='outline-danger' className="btn-wave">Danger</Button>
    <Button variant='outline-warning' className="btn-wave">Warning</Button>
    <Button variant='outline-info' className="btn-wave">Info</Button>
    <Button variant='outline-light' className="btn-wave">Light</Button>
    <Button variant='outline-dark' className="btn-wave">Dark</Button>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Rounded Outline Buttons
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(5)}>Show Code<i className={`${isHidden[5] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[5] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <Button variant='outline-primary' className="rounded-pill btn-wave">Primary</Button>
                  <Button variant='outline-secondary' className="rounded-pill btn-wave">Secondary</Button>
                  <Button variant='outline-success' className="rounded-pill btn-wave">Success</Button>
                  <Button variant='outline-danger' className="rounded-pill btn-wave">Danger</Button>
                  <Button variant='outline-warning' className="rounded-pill btn-wave">Warning</Button>
                  <Button variant='outline-info' className="rounded-pill btn-wave">Info</Button>
                  <Button variant='outline-light' className="rounded-pill btn-wave">Light</Button>
                  <Button variant='outline-dark' className="rounded-pill btn-wave">Dark</Button>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[5] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <Button variant='outline-primary' className="rounded-pill btn-wave">Primary</Button>
    <Button variant='outline-secondary' className="rounded-pill btn-wave">Secondary</Button>
    <Button variant='outline-success' className="rounded-pill btn-wave">Success</Button>
    <Button variant='outline-danger' className="rounded-pill btn-wave">Danger</Button>
    <Button variant='outline-warning' className="rounded-pill btn-wave">Warning</Button>
    <Button variant='outline-info' className="rounded-pill btn-wave">Info</Button>
    <Button variant='outline-light' className="rounded-pill btn-wave">Light</Button>
    <Button variant='outline-dark' className="rounded-pill btn-wave">Dark</Button>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Gradient Buttons
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(6)}>Show Code<i className={`${isHidden[6] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[6] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <Button variant='primary-gradient' className="btn-wave">Primary</Button>
                  <Button variant='secondary-gradient' className="btn-wave">Secondary</Button>
                  <Button variant='success-gradient' className="btn-wave">Success</Button>
                  <Button variant='danger-gradient' className="btn-wave">Danger</Button>
                  <Button variant='warning-gradient' className="btn-wave">Warning</Button>
                  <Button variant='info-gradient' className="btn-wave">Info</Button>
                  <Button variant='orange-gradient' className="btn-wave">Orange</Button>
                  <Button variant='purple-gradient' className="btn-wave">Purple</Button>
                  <Button variant='teal-gradient' className="btn-wave">Teal</Button>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[6] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <Button variant='primary-gradient' className="btn-wave">Primary</Button>
    <Button variant='secondary-gradient' className="btn-wave">Secondary</Button>
    <Button variant='success-gradient' className="btn-wave">Success</Button>
    <Button variant='danger-gradient' className="btn-wave">Danger</Button>
    <Button variant='warning-gradient' className="btn-wave">Warning</Button>
    <Button variant='info-gradient' className="btn-wave">Info</Button>
    <Button variant='orange-gradient' className="btn-wave">Orange</Button>
    <Button variant='purple-gradient' className="btn-wave">Purple</Button>
    <Button variant='teal-gradient' className="btn-wave">Teal</Button>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Rounded Gradient Buttons
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(7)}>Show Code<i className={`${isHidden[7] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[7] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <Button variant='primary-gradient' className="rounded-pill btn-wave">Primary</Button>
                  <Button variant='secondary-gradient' className="rounded-pill btn-wave">Secondary</Button>
                  <Button variant='success-gradient' className="rounded-pill btn-wave">Success</Button>
                  <Button variant='danger-gradient' className="rounded-pill btn-wave">Danger</Button>
                  <Button variant='warning-gradient' className="rounded-pill btn-wave">Warning</Button>
                  <Button variant='info-gradient' className="rounded-pill btn-wave">Info</Button>
                  <Button variant='orange-gradient' className="rounded-pill btn-wave">Orange</Button>
                  <Button variant='purple-gradient' className="rounded-pill btn-wave">Purple</Button>
                  <Button variant='teal-gradient' className="rounded-pill btn-wave">Teal</Button>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[7] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <Button variant='primary-gradient' className="rounded-pill btn-wave">Primary</Button>
    <Button variant='secondary-gradient' className="rounded-pill btn-wave">Secondary</Button>
    <Button variant='success-gradient' className="rounded-pill btn-wave">Success</Button>
    <Button variant='danger-gradient' className="rounded-pill btn-wave">Danger</Button>
    <Button variant='warning-gradient' className="rounded-pill btn-wave">Warning</Button>
    <Button variant='info-gradient' className="rounded-pill btn-wave">Info</Button>
    <Button variant='orange-gradient' className="rounded-pill btn-wave">Orange</Button>
    <Button variant='purple-gradient' className="rounded-pill btn-wave">Purple</Button>
    <Button variant='teal-gradient' className="rounded-pill btn-wave">Teal</Button>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Ghost Buttons
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(8)}>Show Code<i className={`${isHidden[8] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[8] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <Button variant='primary-ghost' className="btn-wave">Primary</Button>
                  <Button variant='secondary-ghost' className="btn-wave">Secondary</Button>
                  <Button variant='success-ghost' className="btn-wave">Success</Button>
                  <Button variant='danger-ghost' className="btn-wave">Danger</Button>
                  <Button variant='warning-ghost' className="btn-wave">Warning</Button>
                  <Button variant='info-ghost' className="btn-wave">Info</Button>
                  <Button variant='orange-ghost' className="btn-wave">Orange</Button>
                  <Button variant='purple-ghost' className="btn-wave">Purple</Button>
                  <Button variant='teal-ghost' className="btn-wave">Teal</Button>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[8] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <Button variant='primary-ghost' className="btn-wave">Primary</Button>
    <Button variant='secondary-ghost' className="btn-wave">Secondary</Button>
    <Button variant='success-ghost' className="btn-wave">Success</Button>
    <Button variant='danger-ghost' className="btn-wave">Danger</Button>
    <Button variant='warning-ghost' className="btn-wave">Warning</Button>
    <Button variant='info-ghost' className="btn-wave">Info</Button>
    <Button variant='orange-ghost' className="btn-wave">Orange</Button>
    <Button variant='purple-ghost' className="btn-wave">Purple</Button>
    <Button variant='teal-ghost' className="btn-wave">Teal</Button>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Button tags
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(9)}>Show Code<i className={`${isHidden[9] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[9] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <Link className="btn btn-primary btn-wave" to="#" role="button">Link</Link>
                  <Button variant='secondary' className="btn-wave" type="submit">Button</Button>
                  <input className="btn btn-info" type="button" value="Input" />
                  <input className="btn btn-warning" type="submit" value="Submit" />
                  <input className="btn btn-success" type="reset" value="Reset" />
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[9] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <Link className="btn btn-primary btn-wave" to="#" role="button">Link</Link>
    <Button variant='secondary' className="btn-wave" type="submit">Button</Button>
    <input className="btn btn-info" type="button" value="Input" />
    <input className="btn btn-warning" type="submit" value="Submit" />
    <input className="btn btn-success" type="reset" value="Reset" />
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                disabled state with anchor tags
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(10)}>Show Code<i className={`${isHidden[10] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[10] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <div className="mb-4">
                    <Button variant='primary'>Primary button</Button>
                    <Button variant='secondary'>Button</Button>
                    <Button variant='outline-primary'>Primary button</Button>
                    <Button variant='outline-secondary'>Button</Button>
                  </div>
                  <div>
                    <a className="btn btn-primary disabled" role="button" aria-disabled="true">Primary link</a>
                    <a className="btn btn-secondary disabled" role="button" aria-disabled="true">Link</a>
                  </div>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[10] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <div className="mb-4">
        <Button variant='primary'>Primary button</Button>
        <Button variant='secondary'>Button</Button>
        <Button variant='outline-primary'>Primary button</Button>
        <Button variant='outline-secondary'>Button</Button>
    </div>
    <div>
        <a className="btn btn-primary disabled" role="button" aria-disabled="true">Primary link</a>
        <a className="btn btn-secondary disabled" role="button" aria-disabled="true">Link</a>
    </div>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                button plugin toggle states
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(11)}>Show Code<i className={`${isHidden[11] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[11] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <div className="mb-4">
                    <ToggleButton variant='primary' className="btn-wave me-1" id="tbg-btn-1" value={''}>Toggle button</ToggleButton>
                    <ToggleButton variant='secondary' active className="btn-wave me-1" id="tbg-btn-2" value={''}>Active toggle button</ToggleButton>
                    <ToggleButton variant='teal' className="btn-wave" disabled id="tbg-btn-3" value={''}>Disabled toggle button</ToggleButton>
                  </div>
                  <div>
                    <Link to="#" className="btn btn-primary btn-wave" role="button" data-bs-toggle="button">Toggle link</Link>
                    <Link to="#" className="btn btn-secondary active btn-wave" role="button" data-bs-toggle="button" aria-pressed="true">Active toggle link</Link>
                    <a className="btn btn-teal disabled btn-wave" aria-disabled="true" role="button" data-bs-toggle="button">Disabled toggle link</a>
                  </div>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[11] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <div className="mb-4">
        <ToggleButton variant='primary' className="btn-wave me-1" id="tbg-btn-1" value={''}>Toggle button</ToggleButton>
        <ToggleButton variant='secondary' active className="btn-wave me-1" id="tbg-btn-2" value={''}>Active toggle button</ToggleButton>
        <ToggleButton variant='teal' className="btn-wave" disabled id="tbg-btn-3" value={''}>Disabled toggle button</ToggleButton>
    </div>
    <div>
        <Link to="#" className="btn btn-primary btn-wave" role="button" data-bs-toggle="button">Toggle link</Link>
        <Link to="#" className="btn btn-secondary active btn-wave" role="button" data-bs-toggle="button" aria-pressed="true">Active toggle link</Link>
        <a className="btn btn-teal disabled btn-wave" aria-disabled="true" role="button" data-bs-toggle="button">Disabled toggle link</a>
    </div>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Link functionally caveat
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(12)}>Show Code<i className={`${isHidden[12] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[12] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <a className="btn btn-primary disabled" tabIndex={-1} role="button" aria-disabled="true">Primary link</a>
                  <a className="btn btn-secondary disabled" tabIndex={-1} role="button" aria-disabled="true">Link</a>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[12] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <a className="btn btn-primary disabled" tabIndex={-1} role="button" aria-disabled="true">Primary link</a>
    <a className="btn btn-secondary disabled" tabIndex={-1} role="button" aria-disabled="true">Link</a>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Loading Buttons
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(13)}>Show Code<i className={`${isHidden[13] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[13] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list d-md-flex flex-wrap">
                  <button className="btn btn-primary btn-loader">
                    <span className="me-2">Loading</span>
                    <span className="loading"><i className="ri-loader-2-fill fs-16"></i></span>
                  </button>
                  <button className="btn btn-outline-secondary btn-loader">
                    <span className="me-2">Loading</span>
                    <span className="loading"><i className="ri-loader-2-fill fs-16"></i></span>
                  </button>
                  <button className="btn btn-info-light btn-loader">
                    <span className="me-2">Loading</span>
                    <span className="loading"><i className="ri-loader-4-line fs-16"></i></span>
                  </button>
                  <button className="btn btn-warning-light btn-loader">
                    <span className="me-2">Loading</span>
                    <span className="loading"><i className="ri-loader-5-line fs-16"></i></span>
                  </button>
                  <button className="btn btn-success btn-loader disabled">
                    <span className="me-2">Disabled</span>
                    <span className="loading"><i className="ri-refresh-line fs-16"></i></span>
                  </button>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[13] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list d-md-flex flex-wrap">
    <button className="btn btn-primary btn-loader">
        <span className="me-2">Loading</span>
        <span className="loading"><i className="ri-loader-2-fill fs-16"></i></span>
    </button>
    <button className="btn btn-outline-secondary btn-loader">
        <span className="me-2">Loading</span>
        <span className="loading"><i className="ri-loader-2-fill fs-16"></i></span>
    </button>
    <button className="btn btn-info-light btn-loader">
        <span className="me-2">Loading</span>
        <span className="loading"><i className="ri-loader-4-line fs-16"></i></span>
    </button>
    <button className="btn btn-warning-light btn-loader">
        <span className="me-2">Loading</span>
        <span className="loading"><i className="ri-loader-5-line fs-16"></i></span>
    </button>
    <button className="btn btn-success btn-loader disabled">
        <span className="me-2">Disabled</span>
        <span className="loading"><i className="ri-refresh-line fs-16"></i></span>
    </button>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Icon Buttons</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(14)}>Show Code<i className={`${isHidden[14] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[14] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                    <button className="btn btn-icon waves-effect btn-primary btn-wave">
                      <i className="ri-bank-fill"></i>
                    </button>
                    <button className="btn btn-icon waves-effect btn-info btn-wave">
                      <i className="ri-medal-line"></i>
                    </button>
                    <button className="btn btn-icon waves-effect btn-danger btn-wave">
                      <i className="ri-archive-line"></i>
                    </button>
                    <button className="btn btn-icon waves-effect btn-warning btn-wave me-5">
                      <i className="ri-calendar-2-line"></i>
                    </button>
                    <button className="btn btn-icon waves-effect btn-primary-light rounded-pill btn-wave">
                      <i className="ri-home-smile-line"></i>
                    </button>
                    <button className="btn btn-icon waves-effect btn-secondary-light rounded-pill btn-wave">
                      <i className="ri-delete-bin-line"></i>
                    </button>
                    <button className="btn btn-icon waves-effect btn-success-light rounded-pill btn-wave">
                      <i className="ri-notification-3-line"></i>
                    </button>
                    <button className="btn btn-icon waves-effect btn-danger-light rounded-pill btn-wave me-5">
                      <i className="ri-chat-settings-line"></i>
                    </button>
                    <button className="btn btn-icon waves-effect btn-outline-primary rounded-pill btn-wave">
                      <i className="ri-phone-line"></i>
                    </button>
                    <button className="btn btn-icon waves-effect btn-outline-teal rounded-pill btn-wave">
                      <i className="ri-customer-service-2-line"></i>
                    </button>
                    <button className="btn btn-icon waves-effect btn-outline-success rounded-pill btn-wave">
                      <i className="ri-live-line"></i>
                    </button>
                    <button className="btn btn-icon waves-effect btn-outline-secondary rounded-pill btn-wave">
                      <i className="ri-save-line"></i>
                    </button>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[14] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list d-md-flex d-block">
        <button className="btn btn-icon waves-effect btn-primary btn-wave">
            <i className="ri-bank-fill"></i>
        </button>
        <button className="btn btn-icon waves-effect btn-info btn-wave">
            <i className="ri-medal-line"></i>
        </button>
        <button className="btn btn-icon waves-effect btn-danger btn-wave">
            <i className="ri-archive-line"></i>
        </button>
        <button className="btn btn-icon waves-effect btn-warning btn-wave me-5">
            <i className="ri-calendar-2-line"></i>
        </button>
        <button className="btn btn-icon waves-effect btn-primary-light rounded-pill btn-wave">
            <i className="ri-home-smile-line"></i>
        </button>
        <button className="btn btn-icon waves-effect btn-secondary-light rounded-pill btn-wave">
            <i className="ri-delete-bin-line"></i>
        </button>
        <button className="btn btn-icon waves-effect btn-success-light rounded-pill btn-wave">
            <i className="ri-notification-3-line"></i>
        </button>
        <button className="btn btn-icon waves-effect btn-danger-light rounded-pill btn-wave me-5">
            <i className="ri-chat-settings-line"></i>
        </button>
        <button className="btn btn-icon waves-effect btn-outline-primary rounded-pill btn-wave">
            <i className="ri-phone-line"></i>
        </button>
        <button className="btn btn-icon waves-effect btn-outline-teal rounded-pill btn-wave">
            <i className="ri-customer-service-2-line"></i>
        </button>
        <button className="btn btn-icon waves-effect btn-outline-success rounded-pill btn-wave">
            <i className="ri-live-line"></i>
        </button>
        <button className="btn btn-icon waves-effect btn-outline-secondary rounded-pill btn-wave">
            <i className="ri-save-line"></i>
        </button>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
  
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Social Buttons
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(16)}>Show Code<i className={`${isHidden[16] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[16] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <button className="btn btn-icon  waves-effect  btn-facebook btn-wave">
                    <i className="ri-facebook-line"></i>
                  </button>
                  <button className="btn btn-icon  waves-effect  btn-twitter btn-wave">
                    <i className="ri-twitter-x-line"></i>
                  </button>
                  <button className="btn btn-icon  waves-effect  btn-instagram btn-wave">
                    <i className="ri-instagram-line"></i>
                  </button>
                  <button className="btn btn-icon  waves-effect  btn-github btn-wave">
                    <i className="ri-github-line"></i>
                  </button>
                  <button className="btn btn-icon  waves-effect  btn-youtube btn-wave">
                    <i className="ri-youtube-line"></i>
                  </button>
                  <button className="btn btn-icon  waves-effect  btn-google btn-wave">
                    <i className="ri-google-line"></i>
                  </button>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[16] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <button className="btn btn-icon  waves-effect  btn-facebook btn-wave">
        <i className="ri-facebook-line"></i>
    </button>
    <button className="btn btn-icon  waves-effect  btn-twitter btn-wave">
        <i className="ri-twitter-x-line"></i>
    </button>
    <button className="btn btn-icon  waves-effect  btn-instagram btn-wave">
        <i className="ri-instagram-line"></i>
    </button>
    <button className="btn btn-icon  waves-effect  btn-github btn-wave">
        <i className="ri-github-line"></i>
    </button>
    <button className="btn btn-icon  waves-effect  btn-youtube btn-wave">
        <i className="ri-youtube-line"></i>
    </button>
    <button className="btn btn-icon  waves-effect  btn-google btn-wave">
        <i className="ri-google-line"></i>
    </button>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>

        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Sizes
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(17)}>Show Code<i className={`${isHidden[17] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[17] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <Button size='sm' variant='primary' className="btn-wave">Small button</Button>
                  <Button variant='secondary' className="btn-wave">Default button</Button>
                  <Button size='lg' variant='success' className="btn-wave">Large button</Button>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[17] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
 <Card.Body>
 <div className="btn-list">
     <Button size='sm' variant='primary' className="btn-wave">Small button</Button>
     <Button variant='secondary' className="btn-wave">Default button</Button>
     <Button size='lg' variant='success' className="btn-wave">Large button</Button>
 </div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>

  
            <Col xl={6}>
              <Card className="custom-card">
                <Card.Header className="justify-content-between">
                  <div className="card-title">
                    Button Widths
                  </div>
                  <div className="prism-toggle">
                    <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(18)}>Show Code<i className={`${isHidden[18] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                  </div>
                </Card.Header>
                <Card.Body className={`${isHidden[18] ? 'd-none' : ''}`}>
                  <div className='example'>
                    <div className="btn-list">
                      <Button variant='primary' className="btn-w-xs btn-wave">XS</Button>
                      <Button variant='secondary' className="btn-w-sm btn-wave">SM</Button>
                      <Button variant='warning' className="btn-w-md btn-wave">MD</Button>
                      <Button variant='info' className="btn-w-lg btn-wave">LG</Button>
                    </div>
                  </div>
                </Card.Body>
                <div className={`card-footer border-top-0 ${isHidden[18] ? '' : 'd-none'}`}>
                  <pre><code className='language-javascript'>
                    {`
<Card.Body>
<div className="btn-list">
    <Button variant='primary' className="btn-w-xs btn-wave">XS</Button>
    <Button variant='secondary' className="btn-w-sm btn-wave">SM</Button>
    <Button variant='warning' className="btn-w-md btn-wave">MD</Button>
    <Button variant='info' className="btn-w-lg btn-wave">LG</Button>
</div>
</Card.Body>
`}
                  </code></pre>
                </div>
              </Card>
            </Col>
         
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Buttons With Different Shadows
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(19)}>Show Code<i className={`${isHidden[19] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[19] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list d-flex">
                  <div className="me-5">
                    <Button variant='primary' className="shadow-sm btn-wave">Button</Button>
                    <Button variant='primary' className="shadow btn-wave">Button</Button>
                    <Button variant='primary' className="shadow-lg btn-wave">Button</Button>
                  </div>
                  <div>
                    <Button variant='secondary' size='sm' className="shadow-sm btn-wave">Button</Button>
                    <Button variant='info' className="shadow btn-wave">Button</Button>
                    <Button variant='success' size='lg' className="shadow-lg btn-wave">Button</Button>
                  </div>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[19] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
 <Card.Body>
 <div className="btn-list d-flex">
     <div className="me-5">
         <Button variant='primary' className="shadow-sm btn-wave">Button</Button>
         <Button variant='primary' className="shadow btn-wave">Button</Button>
         <Button variant='primary' className="shadow-lg btn-wave">Button</Button>
     </div>
     <div>
         <Button variant='secondary' size='sm' className="shadow-sm btn-wave">Button</Button>
         <Button variant='info' className="shadow btn-wave">Button</Button>
         <Button variant='success' size='lg' className="shadow-lg btn-wave">Button</Button>
     </div>
 </div>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Different Colored Buttons With Shadows
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(20)}>Show Code<i className={`${isHidden[20] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[20] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <Button variant='primary' className="primary shadow-primary btn-wave">Button</Button>
                  <Button variant='secondary' className="secondary shadow-secondary btn-wave">Button</Button>
                  <Button variant='success' className="success shadow-success btn-wave">Button</Button>
                  <Button variant='info' className="info shadow-info btn-wave">Button</Button>
                  <Button variant='warning' className="warning shadow-warning btn-wave">Button</Button>
                  <Button variant='danger' className="danger shadow-danger btn-wave">Button</Button>
                  <Button variant='purple' className="purple shadow-purple btn-wave">Button</Button>
                  <Button variant='orange' className="orange shadow-orange btn-wave">Button</Button>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[20] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <Button variant='primary' className="primary shadow-primary btn-wave">Button</Button>
    <Button variant='secondary' className="secondary shadow-secondary btn-wave">Button</Button>
    <Button variant='success' className="success shadow-success btn-wave">Button</Button>
    <Button variant='info' className="info shadow-info btn-wave">Button</Button>
    <Button variant='warning' className="warning shadow-warning btn-wave">Button</Button>
    <Button variant='danger' className="danger shadow-danger btn-wave">Button</Button>
    <Button variant='purple' className="purple shadow-purple btn-wave">Button</Button>
    <Button variant='orange' className="orange shadow-orange btn-wave">Button</Button>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>

        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Raised Buttons
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(21)}>Show Code<i className={`${isHidden[21] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[21] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <Button variant='primary ' className="btn-raised-shadow btn-wave">Button</Button>
                  <Button variant='secondary' className="btn-raised-shadow btn-wave">Button</Button>
                  <Button variant='success' className="btn-raised-shadow btn-wave">Button</Button>
                  <Button variant='info' className="btn-raised-shadow btn-wave">Button</Button>
                  <Button variant='warning' className="btn-raised-shadow btn-wave">Button</Button>
                  <Button variant='danger' className="btn-raised-shadow btn-wave">Button</Button>
                  <Button variant='purple' className="btn-raised-shadow btn-wave">Button</Button>
                  <Button variant='orange' className="btn-raised-shadow btn-wave">Button</Button>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[21] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <Button variant='primary ' className="btn-raised-shadow btn-wave">Button</Button>
    <Button variant='secondary' className="btn-raised-shadow btn-wave">Button</Button>
    <Button variant='success' className="btn-raised-shadow btn-wave">Button</Button>
    <Button variant='info' className="btn-raised-shadow btn-wave">Button</Button>
    <Button variant='warning' className="btn-raised-shadow btn-wave">Button</Button>
    <Button variant='danger' className="btn-raised-shadow btn-wave">Button</Button>
    <Button variant='purple' className="btn-raised-shadow btn-wave">Button</Button>
    <Button variant='orange' className="btn-raised-shadow btn-wave">Button</Button>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Label Buttons
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(22)}>Show Code<i className={`${isHidden[22] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[22] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <Button variant='primary' className="label-btn">
                    <i className="ri-chat-smile-line label-btn-icon me-2"></i>
                    Primary
                  </Button>
                  <Button variant='secondary' className="label-btn">
                    <i className="ri-settings-4-line label-btn-icon me-2"></i>
                    Secondary
                  </Button>
                  <Button variant='warning' className="label-btn rounded-pill">
                    <i className="ri-spam-2-line label-btn-icon me-2 rounded-pill"></i>
                    Warning
                  </Button>
                  <Button variant='info' className="label-btn rounded-pill">
                    <i className="ri-phone-line label-btn-icon me-2 rounded-pill"></i>
                    Info
                  </Button>
                  <Button variant='success' className="label-btn label-end">
                    Success
                    <i className="ri-thumb-up-line label-btn-icon ms-2"></i>
                  </Button>
                  <Button variant='danger' className="label-btn label-end rounded-pill">
                    Cancel
                    <i className="ri-close-line label-btn-icon ms-2 rounded-pill"></i>
                  </Button>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[22] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <Button variant='primary' className="label-btn">
        <i className="ri-chat-smile-line label-btn-icon me-2"></i>
        Primary
    </Button>
    <Button variant='secondary' className="label-btn">
        <i className="ri-settings-4-line label-btn-icon me-2"></i>
        Secondary
    </Button>
    <Button variant='warning' className="label-btn rounded-pill">
        <i className="ri-spam-2-line label-btn-icon me-2 rounded-pill"></i>
        Warning
    </Button>
    <Button variant='info' className="label-btn rounded-pill">
        <i className="ri-phone-line label-btn-icon me-2 rounded-pill"></i>
        Info
    </Button>
    <Button variant='success' className="label-btn label-end">
        Success
        <i className="ri-thumb-up-line label-btn-icon ms-2"></i>
    </Button>
    <Button variant='danger' className="label-btn label-end rounded-pill">
        Cancel
        <i className="ri-close-line label-btn-icon ms-2 rounded-pill"></i>
    </Button>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>

        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Custom Buttons
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(23)}>Show Code<i className={`${isHidden[23] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[23] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <button className="btn btn-info custom-button rounded-pill">
                    <span className="custom-btn-icons"><i className="ri-twitter-x-line text-info"></i></span>
                    Twitter
                  </button>
                  <Button variant='teal-light' className="teal-light btn-border-down">Border</Button>
                  <Button variant='secondary-light' className="secondary-light btn-border-start">Border</Button>
                  <Button variant='purple-light' className="purple-light btn-border-end">Border</Button>
                  <Button variant='warning-light' className="warning-light btn-border-top">Border</Button>
                  <Button variant='secondary' className="secondary btn-glare"><span>Glare Button</span></Button>
                  <Button variant='danger' className="danger btn-hover btn-hover-animate">Like</Button>
                  <Button variant='success' className="success btn-darken-hover">Hover</Button>
                  <Button variant='orange' className="orange btn-custom-border">Hover</Button>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[23] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <button className="btn btn-info custom-button rounded-pill">
        <span className="custom-btn-icons"><i className="ri-twitter-x-line text-info"></i></span>
        Twitter
    </button>
    <Button variant='teal-light' className="teal-light btn-border-down">Border</Button>
    <Button variant='secondary-light' className="secondary-light btn-border-start">Border</Button>
    <Button variant='purple-light' className="purple-light btn-border-end">Border</Button>
    <Button variant='warning-light' className="warning-light btn-border-top">Border</Button>
    <Button variant='secondary' className="secondary btn-glare"><span>Glare Button</span></Button>
    <Button variant='danger' className="danger btn-hover btn-hover-animate">Like</Button>
    <Button variant='success' className="success btn-darken-hover">Hover</Button>
    <Button variant='orange' className="orange btn-custom-border">Hover</Button>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Block buttons
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(24)}>Show Code<i className={`${isHidden[24] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[24] ? 'd-none' : ''}`}>
              <div className='example'>
                <div className="btn-list">
                  <div className="d-grid gap-2 mb-4">
                    <Button variant='primary' className="btn-wave" type="button">Button</Button>
                    <Button variant='secondary' className="btn-wave" type="button">Button</Button>
                  </div>
                  <div className="d-grid gap-2 d-md-block">
                    <Button variant='info' className="btn-wave" type="button">Button</Button>
                    <Button variant='success' className="btn-wave" type="button">Button</Button>
                  </div>
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <Button variant='danger' className="btn-wave" type="button">Button</Button>
                    <Button variant='warning' className="btn-wave" type="button">Button</Button>
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Button variant='teal' className="me-md-2 btn-wave" type="button">Button</Button>
                    <Button variant='purple' className="btn-wave" type="button">Button</Button>
                  </div>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[24] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="btn-list">
    <div className="d-grid gap-2 mb-4">
        <Button variant='primary' className="btn-wave" type="button">Button</Button>
        <Button variant='secondary' className="btn-wave" type="button">Button</Button>
    </div>
    <div className="d-grid gap-2 d-md-block">
        <Button variant='info' className="btn-wave" type="button">Button</Button>
        <Button variant='success' className="btn-wave" type="button">Button</Button>
    </div>
    <div className="d-grid gap-2 col-6 mx-auto">
        <Button variant='danger' className="btn-wave" type="button">Button</Button>
        <Button variant='warning' className="btn-wave" type="button">Button</Button>
    </div>
    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <Button variant='teal' className="me-md-2 btn-wave" type="button">Button</Button>
        <Button variant='purple' className="btn-wave" type="button">Button</Button>
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

export default Buttons;
