import { FC, Fragment, useState } from 'react';
import { Row, Col, Card, Button, Badge as Reactbadge } from "react-bootstrap";
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { imagesData } from '../../common/commonimages';

interface ComponentProps { }

const Badge: FC<ComponentProps> = () => {
  const [isHidden, setIsHidden] = useState<boolean[]>([false]);
  const toggleHidden = (index: number) => {
    const updatedHidden = [...isHidden];
    updatedHidden[index] = !updatedHidden[index];
    setIsHidden(updatedHidden);
  };
  return (
    <Fragment>

      <Pageheader title="BADGES" heading="Elements" active="BADGES" />

      <Row>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Badges
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(0)}>Show Code<i className={`${isHidden[0] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={` ${isHidden[0] ? 'd-none' : ''}`}>
              <div className="example d-flex flex-wrap gap-2">
              <Reactbadge bg='primary'>Primary</Reactbadge>
              <Reactbadge bg='secondary'>Secondary</Reactbadge>
              <Reactbadge bg='success'>Success</Reactbadge>
              <Reactbadge bg='danger'>Danger</Reactbadge>
              <Reactbadge bg='warning'>Warning</Reactbadge>
              <Reactbadge bg='info'>Info</Reactbadge>
              <Reactbadge bg='light' className="text-dark">Light</Reactbadge>
              <Reactbadge bg='dark' className="text-white">Dark</Reactbadge>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[0] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<Reactbadge bg='primary'>Primary</Reactbadge>
<Reactbadge bg='secondary'>Secondary</Reactbadge>
<Reactbadge bg='success'>Success</Reactbadge>
<Reactbadge bg='danger'>Danger</Reactbadge>
<Reactbadge bg='warning'>Warning</Reactbadge>
<Reactbadge bg='info'>Info</Reactbadge>
<Reactbadge bg='light' className="text-dark">Light</Reactbadge>
<Reactbadge bg='dark' className="text-white">Dark</Reactbadge>
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
                Light Badges
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(1)}>Show Code<i className={`${isHidden[1] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={` ${isHidden[1] ? 'd-none' : ''}`}>
              <div className="example d-flex flex-wrap gap-2">
              <Reactbadge bg='primary-transparent'>Primary</Reactbadge>
              <Reactbadge bg='secondary-transparent'>Secondary</Reactbadge>
              <Reactbadge bg='success-transparent'>Success</Reactbadge>
              <Reactbadge bg='danger-transparent'>Danger</Reactbadge>
              <Reactbadge bg='warning-transparent'>Warning</Reactbadge>
              <Reactbadge bg='info-transparent'>Info</Reactbadge>
              <Reactbadge bg='light-transparent' className='text-dark'>Light</Reactbadge>
              <Reactbadge bg='dark-transparent'>Dark</Reactbadge>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[1] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<Reactbadge bg='primary-transparent'>Primary</Reactbadge>
<Reactbadge bg='secondary-transparent'>Secondary</Reactbadge>
<Reactbadge bg='success-transparent'>Success</Reactbadge>
<Reactbadge bg='danger-transparent'>Danger</Reactbadge>
<Reactbadge bg='warning-transparent'>Warning</Reactbadge>
<Reactbadge bg='info-transparent'>Info</Reactbadge>
<Reactbadge bg='light-transparent' className='text-dark'>Light</Reactbadge>
<Reactbadge bg='dark-transparent'>Dark</Reactbadge>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Pill badges
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(2)}>Show Code<i className={`${isHidden[2] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={` ${isHidden[2] ? 'd-none' : ''}`}>
              <div className="example d-flex flex-wrap gap-2">
              <Reactbadge className='rounded-pill' bg='primary'>Primary</Reactbadge>
              <Reactbadge className='rounded-pill' bg='secondary'>Secondary</Reactbadge>
              <Reactbadge className='rounded-pill' bg='success'>Success</Reactbadge>
              <Reactbadge className='rounded-pill' bg='danger'>Danger</Reactbadge>
              <Reactbadge className='rounded-pill' bg='warning'>Warning</Reactbadge>
              <Reactbadge className='rounded-pill' bg='info'>Info</Reactbadge>
              <Reactbadge bg='light' className="rounded-pill text-dark">Light</Reactbadge>
              <Reactbadge bg='dark' className="rounded-pill text-white">Dark</Reactbadge>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[2] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<Reactbadge className='rounded-pill' bg='primary'>Primary</Reactbadge>
<Reactbadge className='rounded-pill' bg='secondary'>Secondary</Reactbadge>
<Reactbadge className='rounded-pill' bg='success'>Success</Reactbadge>
<Reactbadge className='rounded-pill' bg='danger'>Danger</Reactbadge>
<Reactbadge className='rounded-pill' bg='warning'>Warning</Reactbadge>
<Reactbadge className='rounded-pill' bg='info'>Info</Reactbadge>
<Reactbadge bg='light' className="rounded-pill text-dark">Light</Reactbadge>
<Reactbadge bg='dark' className="rounded-pill text-white">Dark</Reactbadge>
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
                Light Pill Badges
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(3)}>Show Code<i className={`${isHidden[3] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[3] ? 'd-none' : ''}`}>
              <div className="example d-flex flex-wrap gap-2 ">
              <Reactbadge className='rounded-pill' bg='primary-transparent'>Primary</Reactbadge>
              <Reactbadge className='rounded-pill' bg='secondary-transparent'>Secondary</Reactbadge>
              <Reactbadge className='rounded-pill' bg='success-transparent'>Success</Reactbadge>
              <Reactbadge className='rounded-pill' bg='danger-transparent'>Danger</Reactbadge>
              <Reactbadge className='rounded-pill' bg='warning-transparent'>Warning</Reactbadge>
              <Reactbadge className='rounded-pill' bg='info-transparent'>Info</Reactbadge>
              <Reactbadge bg='light-transparent' className="rounded-pill text-dark">Light</Reactbadge>
              <Reactbadge bg='dark-transparent' className="rounded-pill text-white">Dark</Reactbadge>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[3] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<Reactbadge className='rounded-pill' bg='primary-transparent'>Primary</Reactbadge>
<Reactbadge className='rounded-pill' bg='secondary-transparent'>Secondary</Reactbadge>
<Reactbadge className='rounded-pill' bg='success-transparent'>Success</Reactbadge>
<Reactbadge className='rounded-pill' bg='danger-transparent'>Danger</Reactbadge>
<Reactbadge className='rounded-pill' bg='warning-transparent'>Warning</Reactbadge>
<Reactbadge className='rounded-pill' bg='info-transparent'>Info</Reactbadge>
<Reactbadge bg='light-transparent' className="rounded-pill text-dark">Light</Reactbadge>
<Reactbadge bg='dark-transparent' className="rounded-pill text-white">Dark</Reactbadge>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Gradient Badges
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(4)}>Show Code<i className={`${isHidden[4] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={` ${isHidden[4] ? 'd-none' : ''}`}>
              <div className="example d-flex flex-wrap gap-2">
              <Reactbadge bg="primary-gradient">Primary</Reactbadge>
              <Reactbadge bg="secondary-gradient">Secondary</Reactbadge>
              <Reactbadge bg="success-gradient">Success</Reactbadge>
              <Reactbadge bg="danger-gradient">Danger</Reactbadge>
              <Reactbadge bg="warning-gradient">Warning</Reactbadge>
              <Reactbadge bg="info-gradient">Info</Reactbadge>
              <Reactbadge bg="orange-gradient">orange</Reactbadge>
              <Reactbadge bg="purple-gradient">purple</Reactbadge>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[4] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<Reactbadge bg="primary-gradient">Primary</Reactbadge>
<Reactbadge bg="secondary-gradient">Secondary</Reactbadge>
<Reactbadge bg="success-gradient">Success</Reactbadge>
<Reactbadge bg="danger-gradient">Danger</Reactbadge>
<Reactbadge bg="warning-gradient">Warning</Reactbadge>
<Reactbadge bg="info-gradient">Info</Reactbadge>
<Reactbadge bg="orange-gradient">orange</Reactbadge>
<Reactbadge bg="purple-gradient">purple</Reactbadge>
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
                Gradient Pill Badges
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(5)}>Show Code<i className={`${isHidden[5] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={` ${isHidden[0] ? 'd-none' : ''}`}>
              <div className="example d-flex flex-wrap gap-2">
              <Reactbadge className='rounded-pill' bg="primary-gradient">Primary</Reactbadge>
              <Reactbadge className='rounded-pill' bg="secondary-gradient">Secondary</Reactbadge>
              <Reactbadge className='rounded-pill' bg="success-gradient">Success</Reactbadge>
              <Reactbadge className='rounded-pill' bg="danger-gradient">Danger</Reactbadge>
              <Reactbadge className='rounded-pill' bg="warning-gradient">Warning</Reactbadge>
              <Reactbadge className='rounded-pill' bg="info-gradient">Info</Reactbadge>
              <Reactbadge className='rounded-pill' bg="orange-gradient">orange</Reactbadge>
              <Reactbadge className='rounded-pill' bg="purple-gradient">purple</Reactbadge>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[5] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<Reactbadge className='rounded-pill' bg="primary-gradient">Primary</Reactbadge>
<Reactbadge className='rounded-pill' bg="secondary-gradient">Secondary</Reactbadge>
<Reactbadge className='rounded-pill' bg="success-gradient">Success</Reactbadge>
<Reactbadge className='rounded-pill' bg="danger-gradient">Danger</Reactbadge>
<Reactbadge className='rounded-pill' bg="warning-gradient">Warning</Reactbadge>
<Reactbadge className='rounded-pill' bg="info-gradient">Info</Reactbadge>
<Reactbadge className='rounded-pill' bg="orange-gradient">orange</Reactbadge>
<Reactbadge className='rounded-pill' bg="purple-gradient">purple</Reactbadge>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Outline Badges
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(6)}>Show Code<i className={`${isHidden[6] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={` ${isHidden[6] ? 'd-none' : ''}`}>
              <div className="example d-flex flex-wrap gap-2">
              <Reactbadge bg="outline-primary">Primary</Reactbadge>
              <Reactbadge bg="outline-secondary">Secondary</Reactbadge>
              <Reactbadge bg="outline-success">Success</Reactbadge>
              <Reactbadge bg="outline-danger">Danger</Reactbadge>
              <Reactbadge bg="outline-warning">Warning</Reactbadge>
              <Reactbadge bg="outline-info">Info</Reactbadge>
              <Reactbadge bg="outline-light text-dark">Light</Reactbadge>
              <Reactbadge bg="outline-dark">Dark</Reactbadge>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[6] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<Reactbadge bg="outline-primary">Primary</Reactbadge>
<Reactbadge bg="outline-secondary">Secondary</Reactbadge>
<Reactbadge bg="outline-success">Success</Reactbadge>
<Reactbadge bg="outline-danger">Danger</Reactbadge>
<Reactbadge bg="outline-warning">Warning</Reactbadge>
<Reactbadge bg="outline-info">Info</Reactbadge>
<Reactbadge bg="outline-light text-dark">Light</Reactbadge>
<Reactbadge bg="outline-dark">Dark</Reactbadge>
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
                Outline Pill Badges
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(7)}>Show Code<i className={`${isHidden[7] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={` ${isHidden[7] ? 'd-none' : ''}`}>
              <div className="example d-flex flex-wrap gap-2">
              <Reactbadge className='rounded-pill' bg="outline-primary">Primary</Reactbadge>
              <Reactbadge className='rounded-pill' bg="outline-secondary">Secondary</Reactbadge>
              <Reactbadge className='rounded-pill' bg="outline-success">Success</Reactbadge>
              <Reactbadge className='rounded-pill' bg="outline-danger">Danger</Reactbadge>
              <Reactbadge className='rounded-pill' bg="outline-warning">Warning</Reactbadge>
              <Reactbadge className='rounded-pill' bg="outline-info">Info</Reactbadge>
              <Reactbadge className='rounded-pill' bg="outline-light text-dark">Light</Reactbadge>
              <Reactbadge className='rounded-pill' bg="outline-dark">Dark</Reactbadge>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[7] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<Reactbadge className='rounded-pill' bg="outline-primary">Primary</Reactbadge>
<Reactbadge className='rounded-pill' bg="outline-secondary">Secondary</Reactbadge>
<Reactbadge className='rounded-pill' bg="outline-success">Success</Reactbadge>
<Reactbadge className='rounded-pill' bg="outline-danger">Danger</Reactbadge>
<Reactbadge className='rounded-pill' bg="outline-warning">Warning</Reactbadge>
<Reactbadge className='rounded-pill' bg="outline-info">Info</Reactbadge>
<Reactbadge className='rounded-pill' bg="outline-light text-dark">Light</Reactbadge>
<Reactbadge className='rounded-pill' bg="outline-dark">Dark</Reactbadge>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Buttons With Badges
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(8)}>Show Code<i className={`${isHidden[8] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={` ${isHidden[8] ? 'd-none' : ''}`}>
              <div className="example d-flex flex-wrap gap-2">
              <Button variant='primary' className="my-1 me-2">
                Notifications <Reactbadge className='ms-2' bg="secondary">4</Reactbadge>
              </Button>
              <Button variant='secondary' className="my-1 me-2">
                Notifications <Reactbadge className='ms-2' bg="primary">7</Reactbadge>
              </Button>
              <Button variant='success' className="my-1 me-2">
                Notifications <Reactbadge className='ms-2' bg="danger">12</Reactbadge>
              </Button>
              <Button variant='info' className="my-1 me-2">
                Notifications <Reactbadge className='ms-2' bg="warning">32</Reactbadge>
              </Button>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[8] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<Button variant='primary' className="my-1 me-2">
Notifications <Reactbadge className='ms-2' bg="secondary">4</Reactbadge>
</Button>
<Button variant='secondary' className="my-1 me-2">
Notifications <Reactbadge className='ms-2' bg="primary">7</Reactbadge>
</Button>
<Button variant='success' className="my-1 me-2">
Notifications <Reactbadge className='ms-2' bg="danger">12</Reactbadge>
</Button>
<Button variant='info' className="my-1 me-2">
Notifications <Reactbadge className='ms-2' bg="warning">32</Reactbadge>
</Button>
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
                Outline Button Badges
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(9)}>Show Code<i className={`${isHidden[9] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[9] ? 'd-none' : ''}`}>
              <div className="example d-flex flex-wrap gap-2 ">
              <Button variant='outline-primary' className="my-1 me-2">
                Notifications <span className="badge ms-2">4</span>
              </Button>
              <Button variant='outline-secondary' className="my-1 me-2">
                Notifications <span className="badge ms-2">7</span>
              </Button>
              <Button variant='outline-success' className="my-1 me-2">
                Notifications <span className="badge ms-2">12</span>
              </Button>
              <Button variant='outline-info' className="my-1 me-2">
                Notifications <span className="badge ms-2">32</span>
              </Button>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[9] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<Button variant='outline-primary' className="my-1 me-2">
Notifications <span as="span" className="badge ms-2">4</span>
</Button>
<Button variant='outline-secondary' className="my-1 me-2">
Notifications <span as="span" className="badge ms-2">7</span>
</Button>
<Button variant='outline-success' className="my-1 me-2">
Notifications <span as="span" className="badge ms-2">12</span>
</Button>
<Button variant='outline-info' className="my-1 me-2">
Notifications <span as="span" className="badge ms-2">32</span>
</Button>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Headings
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(12)}>Show Code<i className={`${isHidden[12] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[12] ? 'd-none' : ''}`}>
              <div className="example">
              <h1>Example heading <Reactbadge bg="primary">New</Reactbadge></h1>
              <h2>Example heading <Reactbadge bg="primary">New</Reactbadge></h2>
              <h3>Example heading <Reactbadge bg="primary">New</Reactbadge></h3>
              <h4>Example heading <Reactbadge bg="primary">New</Reactbadge></h4>
              <h5>Example heading <Reactbadge bg="primary">New</Reactbadge></h5>
              <h6>Example heading <Reactbadge bg="primary">New</Reactbadge></h6>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[12] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<h1>Example heading <Reactbadge bg="primary">New</Reactbadge></h1>
<h2>Example heading <Reactbadge bg="primary">New</Reactbadge></h2>
<h3>Example heading <Reactbadge bg="primary">New</Reactbadge></h3>
<h4>Example heading <Reactbadge bg="primary">New</Reactbadge></h4>
<h5>Example heading <Reactbadge bg="primary">New</Reactbadge></h5>
<h6>Example heading <Reactbadge bg="primary">New</Reactbadge></h6>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Row>
            <Col xl={12}>
              <Card className="custom-card">
                <Card.Header className="justify-content-between">
                  <div className="card-title">Positioned Badges</div>
                  <div className="prism-toggle">
                    <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(10)}>Show Code<i className={`${isHidden[10] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                  </div>
                </Card.Header>
                <Card.Body className={` ${isHidden[10] ? 'd-none' : ''}`}>
                  <div className="example d-flex flex-wrap gap-4">
                  <Button variant='primary' className="position-relative me-4">
                    Inbox
                    <Reactbadge bg='danger' className="position-absolute top-0 start-100 translate-middle rounded-pill">
                      99+
                      <span className="visually-hidden">unread messages</span>
                    </Reactbadge>
                  </Button>
                  <Button variant='secondary' className="position-relative me-4">
                    Profile
                    <Reactbadge bg='success' className="position-absolute top-80 start-100 translate-middle p-2 border border-light rounded-circle">
                      <span className="visually-hidden">New alerts</span>
                    </Reactbadge>
                  </Button>
                  <span className="avatar me-4">
                    <img src={imagesData('face2')} alt="img" />
                    <Reactbadge bg='success' className="position-absolute top-0 start-100 translate-middle p-1 border border-light rounded-circle">
                      <span className="visually-hidden">New alerts</span>
                    </Reactbadge>
                  </span>
                  <span className="avatar avatar-rounded me-4">
                    <img src={imagesData('face15')} alt="img" />
                    <Reactbadge bg='success' className="position-absolute top-0 start-100 translate-middle p-1 border border-light rounded-circle">
                      <span className="visually-hidden">New alerts</span>
                    </Reactbadge>
                  </span>
                  <span className="avatar avatar-rounded">
                    <img src={imagesData('face10')} alt="img" />
                    <Reactbadge bg='secondary' className="position-absolute top-0 start-100 translate-middle rounded-pill shadow-lg">1000+
                      <span className="visually-hidden">New alerts</span>
                    </Reactbadge>
                  </span>
                  </div>
                </Card.Body>
                <div className={`card-footer border-top-0 ${isHidden[10] ? '' : 'd-none'}`}>
                  <pre><code className='language-javascript'>
                    {`
<Card.Body className={\`d-flex flex-wrap gap-4 \${isHidden[10] ? 'd-none' : ''}\`}>
<Button variant='primary' className="position-relative">
Inbox
<Reactbadge bg='danger' className="position-absolute top-0 start-100 translate-middle rounded-pill">
  99+
  <span className="visually-hidden">unread messages</span>
</Reactbadge>
</Button>
<Button variant='secondary' className="position-relative">
Profile
<Reactbadge bg='success' className="position-absolute top-80 start-100 translate-middle p-2 border border-light rounded-circle">
  <span className="visually-hidden">New alerts</span>
</Reactbadge>
</Button>
<span className="avatar">
<img src={imagesData('face2')} alt="img" />
<Reactbadge bg='success' className="position-absolute top-0 start-100 translate-middle p-1 border border-light rounded-circle">
  <span className="visually-hidden">New alerts</span>
</Reactbadge>
</span>
<span className="avatar avatar-rounded">
<img src={imagesData('face15')} alt="img" />
<Reactbadge bg='success' className="position-absolute top-80 start-100 translate-middle p-1 border border-light rounded-circle">
  <span className="visually-hidden">New alerts</span>
</Reactbadge>
</span>
<span className="avatar avatar-rounded">
<img src={imagesData('face10')} alt="img" />
<Reactbadge bg='secondary' className="position-absolute top-0 start-100 translate-middle rounded-pill shadow-lg">1000+
  <span className="visually-hidden">New alerts</span>
</Reactbadge>
</span>
</Card.Body>
`}
                  </code></pre>
                </div>
              </Card>
            </Col>

            <Col xl={12}>
              <Card className="custom-card">
                <Card.Header className="justify-content-between">
                  <div className="card-title">Custom Badges</div>
                  <div className="prism-toggle">
                    <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(11)}>Show Code<i className={`${isHidden[11] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                  </div>
                </Card.Header>
                <Card.Body className={`${isHidden[11] ? 'd-none' : ''}`}>
                  <div className="example">
                  <div className="d-flex align-items-center gap-5 flex-wrap">
                    <div>
                      <Reactbadge bg='outline-secondary' className="custom-badge fs-15 d-inline-flex align-items-center"><i className="ti ti-flame me-1"></i>Hot</Reactbadge>
                    </div>
                    <div>
                      <span className="icon-badge">
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" /></svg>
                        <Reactbadge bg='success' className="rounded-pill">14</Reactbadge>
                      </span>
                    </div>
                    <div>
                      <Reactbadge bg='light' className="border text-default custom-badge"><i className="fe fe-eye me-2 d-inline-block"></i>13.2k</Reactbadge>
                    </div>
                    <div>
                      <span className="text-badge">
                        <span className="text fs-18">Inbox</span>
                        <Reactbadge bg='success' className="rounded-pill">32</Reactbadge>
                      </span>
                    </div>
                  </div>
                  </div>
                </Card.Body>
                <div className={`card-footer border-top-0 ${isHidden[11] ? '' : 'd-none'}`}>
                  <pre><code className='language-javascript'>
                    {`
<Card.Body>
<div className="d-flex align-items-center gap-5 flex-wrap">
<div>
   <Reactbadge bg='outline-secondary' className="custom-badge fs-15 d-inline-flex align-items-center"><i className="ti ti-flame me-1"></i>Hot</Reactbadge>
</div>
<div>
   <span className="icon-badge">
       <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" /></svg>
       <Reactbadge bg='success' className="rounded-pill">14</Reactbadge>
   </span>
</div>
<div>
   <Reactbadge bg='light' className="border text-default custom-badge"><i className="fe fe-eye me-2 d-inline-block"></i>13.2k</Reactbadge>
</div>
<div>
   <span className="text-badge">
       <span className="text fs-18">Inbox</span>
       <Reactbadge bg='success' className="rounded-pill">32</Reactbadge>
   </span>
</div>
</div>
</Card.Body>
`}
                  </code></pre>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

    </Fragment>
  );
};

export default Badge;