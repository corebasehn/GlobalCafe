

import { FC, Fragment, useState } from 'react';

import { Row, Col, Card } from "react-bootstrap";
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { Link } from 'react-router-dom';

interface ComponentProps { }

const Breadcrumbs: FC<ComponentProps> = () => {

  const breadcrumbStyle: any = {
    "--bs-breadcrumb-divider": "'~'"
  };

  const breadcrumbStyle1: any = {
    "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E")`
  }


  const [isHidden, setIsHidden] = useState<boolean[]>([false]);
  const toggleHidden = (index: number) => {
    const updatedHidden = [...isHidden];
    updatedHidden[index] = !updatedHidden[index];
    setIsHidden(updatedHidden);
  };

  return (
    <Fragment>
      <Pageheader title="BREADCRUMBS" heading="Elements" active="BREADCRUMBS" />
      <Row>
        <Col xl={6}>
          <Card className="custom-card">
            <div className="card-header justify-content-between">
              <div className="card-title">
                Example
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(0)}>Show Code<i className={`${isHidden[0] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </div>
            <Card.Body className={`${isHidden[0] ? 'd-none' : ''}`}>
              <div className="example">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Home</li>
                  </ol>
                </nav>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Library</li>
                  </ol>
                </nav>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="#">Library</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Data</li>
                  </ol>
                </nav>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[0] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<nav aria-label="breadcrumb">
    <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page">Home</li>
    </ol>
</nav>

<nav aria-label="breadcrumb">
    <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="#">Home</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Library</li>
    </ol>
</nav>

<nav aria-label="breadcrumb">
    <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item"><Link to="#">Home</Link></li>
        <li className="breadcrumb-item"><Link to="#">Library</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Data</li>
    </ol>
</nav>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <div className="card-header justify-content-between">
              <div className="card-title">
                Example1
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(1)}>Show Code<i className={`${isHidden[1] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </div>
            <Card.Body className={`${isHidden[1] ? 'd-none' : ''}`}>
              <div className="example">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb breadcrumb-example1">
                    <li className="breadcrumb-item active" aria-current="page">Home</li>
                  </ol>
                </nav>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb breadcrumb-example1">
                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Library</li>
                  </ol>
                </nav>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb breadcrumb-example1 mb-0">
                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="#">Library</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Data</li>
                  </ol>
                </nav>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[1] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
 <Card.Body>
 <nav aria-label="breadcrumb">
     <ol className="breadcrumb breadcrumb-example1">
         <li className="breadcrumb-item active" aria-current="page">Home</li>
     </ol>
 </nav>

 <nav aria-label="breadcrumb">
     <ol className="breadcrumb breadcrumb-example1">
         <li className="breadcrumb-item"><Link to="#">Home</Link></li>
         <li className="breadcrumb-item active" aria-current="page">Library</li>
     </ol>
 </nav>

 <nav aria-label="breadcrumb">
     <ol className="breadcrumb breadcrumb-example1 mb-0">
         <li className="breadcrumb-item"><Link to="#">Home</Link></li>
         <li className="breadcrumb-item"><Link to="#">Library</Link></li>
         <li className="breadcrumb-item active" aria-current="page">Data</li>
     </ol>
 </nav>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <div className="card-header justify-content-between">
              <div className="card-title">
                Dividers
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(2)}>Show Code<i className={`${isHidden[2] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </div>
            <Card.Body className={`${isHidden[2] ? 'd-none' : ''}`}>
              <div className="example">
              <nav style={breadcrumbStyle} aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Library</li>
                </ol>
              </nav>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[2] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<nav style={breadcrumbStyle} aria-label="breadcrumb">
    <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item"><Link to="#">Home</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Library</li>
    </ol>
</nav>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <div className="card-header justify-content-between">
              <div className="card-title">
                Embedded SVG icon
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(3)}>Show Code<i className={`${isHidden[3] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </div>
            <Card.Body className={`${isHidden[3] ? 'd-none' : ''}`}>
              <div className="example">
              <nav aria-label="breadcrumb" style={breadcrumbStyle1}>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                  <li className="breadcrumb-item active embedded-breadcrumb" aria-current="page">Library</li>
                </ol>
              </nav>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[3] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<nav aria-label="breadcrumb" style={breadcrumbStyle1}>
    <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item"><Link to="#">Home</Link></li>
        <li className="breadcrumb-item active embedded-breadcrumb" aria-current="page">Library</li>
    </ol>
</nav>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <div className="card-header justify-content-between">
              <div className="card-title">
                Breadcrumb Style-1
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(4)}>Show Code<i className={`${isHidden[4] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </div>
            <Card.Body className={`${isHidden[4] ? 'd-none' : ''}`}>
              <div className="example">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-style1 mb-0">
                  <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                  <li className="breadcrumb-item"><Link to="#">Library</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Data</li>
                </ol>
              </nav>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[4] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<nav aria-label="breadcrumb">
    <ol className="breadcrumb breadcrumb-style1 mb-0">
        <li className="breadcrumb-item"><Link to="#">Home</Link></li>
        <li className="breadcrumb-item"><Link to="#">Library</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Data</li>
    </ol>
</nav>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <div className="card-header justify-content-between">
              <div className="card-title">
                Breadcrumb Style-2
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(5)}>Show Code<i className={`${isHidden[5] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </div>
            <Card.Body className={`${isHidden[5] ? 'd-none' : ''}`}>
              <div className="example">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-style2 mb-0">
                  <li className="breadcrumb-item"><Link to="#"><i className="ti ti-home-2 me-1 fs-15 d-inline-block"></i>Home</Link></li>
                  <li className="breadcrumb-item"><Link to="#"><i className="ti ti-apps me-1 fs-15 d-inline-block"></i>About</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Services</li>
                </ol>
              </nav>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[5] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<nav aria-label="breadcrumb">
    <ol className="breadcrumb breadcrumb-style2 mb-0">
        <li className="breadcrumb-item"><Link to="#"><i className="ti ti-home-2 me-1 fs-15 d-inline-block"></i>Home</Link></li>
        <li className="breadcrumb-item"><Link to="#"><i className="ti ti-apps me-1 fs-15 d-inline-block"></i>About</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Services</li>
    </ol>
</nav>
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
                Background colors
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(6)}>Show Code<i className={`${isHidden[6] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`pt-0 ${isHidden[6] ? 'd-none' : ''}`}>
              <div className="example">
                <nav style={breadcrumbStyle} aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Library</li>
                  </ol>
                </nav>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[6] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<div className="example">
<nav style={breadcrumbStyle} aria-label="breadcrumb">
  <ol className="breadcrumb mb-0">
    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
    <li className="breadcrumb-item active" aria-current="page">Library</li>
  </ol>
</nav>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
      </Row>
    </Fragment >
  );
};

export default Breadcrumbs;