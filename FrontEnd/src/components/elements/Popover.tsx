import { FC, Fragment, useState } from 'react';
import { Button, Card, Col, OverlayTrigger, Popover as Reactpopover, Row } from 'react-bootstrap';
import { ColoredpopoverData, DismispopoverData, popoverData } from '../../common/commondata';
import { Link } from 'react-router-dom';
import Pageheader from '../../layout/layoutcomponent/pageheader';

interface ComponentProps { }

const Popover: FC<ComponentProps> = () => {

  const [isHidden, setIsHidden] = useState<boolean[]>([false]);
  const toggleHidden = (index: number) => {
    const updatedHidden = [...isHidden];
    updatedHidden[index] = !updatedHidden[index];
    setIsHidden(updatedHidden);
  };

  return (
    <Fragment>
      <Pageheader title="POPOVERS" heading="Elements" active="POPOVERS" />
      <Row className="row-sm">
        <Col xl={5}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Default Popovers
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(0)}>Show Code<i className={`${isHidden[0] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[0] ? 'd-none' : ''}`}>
              <div className="example">
              {['top', 'right', 'bottom', 'left'].map((placement: any) => (
                <OverlayTrigger trigger="click" key={placement} placement={placement}
                  overlay={
                    <Reactpopover id={`popover-positioned-${placement}`}>
                      <Reactpopover.Header as="h3">{`Popover ${placement}`}</Reactpopover.Header>
                      <Reactpopover.Body>
                        <strong>Holy guacamole!</strong> Check this info.
                      </Reactpopover.Body>
                    </Reactpopover>
                  }>
                  <Button variant="" className="me-2 my-2 btn-outline-primary">Popover {placement.charAt(0).toUpperCase() + placement.slice(1)}</Button>
                </OverlayTrigger>
              ))}
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[0] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
{['top', 'right', 'bottom', 'left'].map((placement: any) => (
<OverlayTrigger trigger="click" key={placement} placement={placement}
overlay={
<Reactpopover id={\`popover-positioned-\${placement}\`}>
<Reactpopover.Header as="h3">{\`Popover \${placement}\`}</Reactpopover.Header>
<Reactpopover.Body>
<strong>Holy guacamole!</strong> Check this info.
</Reactpopover.Body>
</Reactpopover>
}>
<Button variant="" className="me-2 my-2 btn-outline-primary">Popover {placement}</Button>
</OverlayTrigger>
))}
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>

        <Col xl={7}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Colored Headers
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(1)}>Show Code<i className={`${isHidden[1] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[1] ? 'd-none' : ''}`}>
              <div className="example">
              {popoverData.map((idx: any) => (
                <OverlayTrigger trigger="click" key={idx.id} placement={idx.place}
                  overlay={
                    <Reactpopover id={`popover-positioned-${idx.place}`} className={`${idx.id === 3 ? 'header-info bs-popover-auto' : 'header-primary'}`}>
                      <Reactpopover.Header className={`bg-${idx.color}`} as="h3">{`${idx.place.charAt(0).toUpperCase() + idx.place.slice(1)} Popover`}</Reactpopover.Header>
                      <Reactpopover.Body>
                        <strong>Holy guacamole!</strong> Check this info.
                      </Reactpopover.Body>
                    </Reactpopover>
                  }>
                  <Button variant={`outline-${idx.color}`} className="me-2 my-2">Popover {idx.color.charAt(0).toUpperCase() + idx.color.slice(1)}</Button>
                </OverlayTrigger>
              ))}
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[1] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
{popoverData.map((idx: any) => (
  <OverlayTrigger trigger="click" key={idx.id} placement={idx.place}
    overlay={
      <Reactpopover id={\`popover-positioned-\${idx.place}\`} className={\`\${idx.id === 3 ? 'header-info bs-popover-auto' : ''}\`}>
        <Reactpopover.Header className={\`bg-\${idx.color}\`} as="h3">{\`\${idx.place} Popover\`}</Reactpopover.Header>
        <Reactpopover.Body>
          <strong>Holy guacamole!</strong> Check this info.
        </Reactpopover.Body>
      </Reactpopover>
    }>
    <Button variant={\`outline-\${idx.color}\`} className="me-2 my-2">Popover {idx.color}</Button>
  </OverlayTrigger>
))}
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="row-sm">
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Colored Popovers
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(2)}>Show Code<i className={`${isHidden[2] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[2] ? 'd-none' : ''}`}>
              <div className="example">
              {ColoredpopoverData.map((idx: any) => (
                <OverlayTrigger trigger="click" key={idx.id} placement={idx.place}
                  overlay={
                    <Reactpopover className={`popover-${idx.color}`} id={`popover-positioned-${idx.place}`}>
                      <Reactpopover.Header as="h3">{`${idx.place.charAt(0).toUpperCase() + idx.place.slice(1)} Popover`}</Reactpopover.Header>
                      <Reactpopover.Body >
                        <strong>Holy guacamole!</strong> Check this info.
                      </Reactpopover.Body>
                    </Reactpopover>
                  }>
                 <Button variant={idx.color} className="me-2 my-2">{idx.color.charAt(0).toUpperCase() + idx.color.slice(1)}</Button>
                </OverlayTrigger>
              ))}
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[2] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
{ColoredpopoverData.map((idx: any) => (
  <OverlayTrigger trigger="click" key={idx.id} placement={idx.place}
    overlay={
      <Reactpopover className={\`popover-\${idx.color}\`} id={\`popover-positioned-\${idx.place}\`}>
        <Reactpopover.Header as="h3">{\`\${idx.place} Popover\`}</Reactpopover.Header>
        <Reactpopover.Body >
          <strong>Holy guacamole!</strong> Check this info.
        </Reactpopover.Body>
      </Reactpopover>
    }>
    <Button variant={idx.color} className="me-2 my-2">{idx.color}</Button>
  </OverlayTrigger>
))}
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="row-sm">
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Light Popovers
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(3)}>Show Code<i className={`${isHidden[3] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[3] ? 'd-none' : ''}`}>
              <div className="example">
              {ColoredpopoverData.map((idx: any) => (
                <OverlayTrigger trigger="click" key={idx.id} placement={idx.place}
                  overlay={
                    <Reactpopover className={`popover-${idx.color}-light`} id={`popover-positioned-${idx.place}`}>
                      <Reactpopover.Header as="h3">{`${idx.place.charAt(0).toUpperCase() + idx.place.slice(1)} Popover`}</Reactpopover.Header>
                      <Reactpopover.Body >
                        <strong>Holy guacamole!</strong> Check this info.
                      </Reactpopover.Body>
                    </Reactpopover>
                  }>
                  <Button variant={`${idx.color}-light`} className="me-2 my-2">{idx.color.charAt(0).toUpperCase() + idx.color.slice(1)}</Button>
                </OverlayTrigger>
              ))}
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[3] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
{ColoredpopoverData.map((idx: any) => (
  <OverlayTrigger trigger="click" key={idx.id} placement={idx.place}
    overlay={
      <Reactpopover className={\`popover-\${idx.color}-light\`} id={\`popover-positioned-\${idx.place}\`}>
        <Reactpopover.Header as="h3">{\`\${idx.place} Popover\`}</Reactpopover.Header>
        <Reactpopover.Body >
          <strong>Holy guacamole!</strong> Check this info.
        </Reactpopover.Body>
      </Reactpopover>
    }>
    <Button variant={\`\${idx.color}-light\`} className="me-2 my-2">{idx.color}</Button>
  </OverlayTrigger>
))}
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="row-sm">
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Dismissible Popovers
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(4)}>Show Code<i className={`${isHidden[4] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`d-flex flex-wrap justify-content-between ${isHidden[4] ? 'd-none' : ''}`}>
              <div className="example">
              {DismispopoverData.map((idx: any) => (
                <OverlayTrigger trigger="click" key={idx.id} placement={idx.place}
                  overlay={
                    <Reactpopover id={`popover-positioned-${idx.place}`}>
                      <Reactpopover.Header as="h3">Popover Dismiss</Reactpopover.Header>
                      <Reactpopover.Body> And here's some amazing content. It's very engaging. Right? </Reactpopover.Body>
                    </Reactpopover>
                  }>
                  <Button variant={idx.color} className="me-2 my-2">Popover Dismiss</Button>
                </OverlayTrigger>
              ))}
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[4] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='d-flex flex-wrap justify-content-between'>
{DismispopoverData.map((idx: any) => (
  <OverlayTrigger trigger="click" key={idx.id} placement={idx.place}
    overlay={
      <Reactpopover id={\`popover-positioned-\${idx.place}\`}>
        <Reactpopover.Header as="h3">Popover Dismiss</Reactpopover.Header>
        <Reactpopover.Body> And here's some amazing content. It's very engaging. Right? </Reactpopover.Body>
      </Reactpopover>
    }>
    <Button variant={idx.color} className="me-2 my-2">Popover Dismiss</Button>
  </OverlayTrigger>
))}
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={3}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Disabled Popover
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(5)}>Show Code<i className={`${isHidden[5] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[5] ? 'd-none' : ''}`}>
              <div className="example">
              <OverlayTrigger placement='right' overlay={<Reactpopover id="popover-basic"><Reactpopover.Body>Disabled popover</Reactpopover.Body></Reactpopover>}>
                <span className="d-inline-block">
                  <Button disabled style={{ pointerEvents: 'none' }}>
                    Disabled button
                  </Button>
                </span>
              </OverlayTrigger>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[5] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='d-flex flex-wrap justify-content-between'>
<OverlayTrigger placement='right' overlay={<Reactpopover id="popover-basic"><Reactpopover.Body>Disabled popover</Reactpopover.Body></Reactpopover>}>
    <span className="d-inline-block">
      <Button disabled style={{ pointerEvents: 'none' }}>
        Disabled button
      </Button>
    </span>
  </OverlayTrigger>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={3}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Icon Popovers
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(6)}>Show Code<i className={`${isHidden[6] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[6] ? 'd-none' : ''}`}>
              <div className="example">
              <OverlayTrigger trigger="click" placement="top" overlay={<Reactpopover className="popover-primary only-body" id="popover-basic">
                <Reactpopover.Body> And here's some <strong>amazing</strong> content. It's very engaging. right? </Reactpopover.Body>
              </Reactpopover>}>
                <Link to='#' className='me-4 svg-primary'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" /></svg></Link>
              </OverlayTrigger>
              <OverlayTrigger trigger="click" placement="left" overlay={<Reactpopover className="popover-secondary only-body" id="popover-basic">
                <Reactpopover.Body> And here's some <strong>amazing</strong> content. It's very engaging. right? </Reactpopover.Body>
              </Reactpopover>}>
                <Link to='#' className='me-4 svg-secondary'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg></Link>
              </OverlayTrigger>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[6] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='d-flex flex-wrap justify-content-between'>
<OverlayTrigger trigger="click" placement="top" overlay={<Reactpopover className="popover-primary only-body" id="popover-basic">
    <Reactpopover.Body> And here's some <strong>amazing</strong> content. It's very engaging. right? </Reactpopover.Body>
  </Reactpopover>}>
    <Link to='#' className='me-4 svg-primary'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" /></svg></Link>
  </OverlayTrigger>
  <OverlayTrigger trigger="click" placement="left" overlay={<Reactpopover className="popover-secondary only-body" id="popover-basic">
    <Reactpopover.Body> And here's some <strong>amazing</strong> content. It's very engaging. right? </Reactpopover.Body>
  </Reactpopover>}>
    <Link to='#' className='me-4 svg-secondary'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg></Link>
  </OverlayTrigger>
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

export default Popover;
