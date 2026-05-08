import { FC, Fragment, useState } from 'react';
import { Card, Col, Row } from "react-bootstrap";
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { imagesData } from '../../common/commonimages';

interface ComponentProps { }

const Mediaobject: FC<ComponentProps> = () => {
  const [isHidden, setIsHidden] = useState<boolean[]>([false]);
  const toggleHidden = (index: number) => {
    const updatedHidden = [...isHidden];
    updatedHidden[index] = !updatedHidden[index];
    setIsHidden(updatedHidden);
  };
  return (
    <Fragment>
      <Pageheader title="MEDIA OBJECT" heading="Elements" active="MEDIA OBJECT" />
      <Row>
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Object Fit Contain</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(0)}>Show Code<i className={`${isHidden[0] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`object-fit-container ${isHidden[0] ? 'd-none'  : ''}`}>
              <div className="example justify-content-center d-flex">
              <img src={imagesData('media28')} className="object-fit-contain border rounded" alt="..." />
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[0] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='object-fit-container'>
<img src={imagesData('media28')} className="object-fit-contain border rounded" alt="..." />
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Object Fit Cover</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(1)}>Show Code<i className={`${isHidden[1] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`object-fit-container ${isHidden[1] ? 'd-none' : ''}`}>
              <div className="example justify-content-center d-flex">
              <img src={imagesData('media28')} className="object-fit-cover border rounded" alt="..." />
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[1] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='object-fit-container'>
<img src={imagesData('media28')} className="object-fit-cover border rounded" alt="..." />
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Object Fit Fill</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(2)}>Show Code<i className={`${isHidden[2] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`object-fit-container ${isHidden[2] ? 'd-none' : ''}`}>
              <div className="example justify-content-center d-flex">
              <img src={imagesData('media28')} className="object-fit-fill border rounded" alt="..." />
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[2] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='object-fit-container'>
<img src={imagesData('media28')} className="object-fit-fill border rounded" alt="..." />
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Object Fit Scale Down</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(3)}>Show Code<i className={`${isHidden[3] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`object-fit-container ${isHidden[3] ? 'd-none' : ''}`}>
              <div className="example justify-content-center d-flex">
              <img src={imagesData('media28')} className="object-fit-scale border rounded" alt="..." />
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[3] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='object-fit-container'>
<img src={imagesData('media28')} className="object-fit-scale border rounded" alt="..." />
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Object Fit None</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(4)}>Show Code<i className={`${isHidden[4] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`object-fit-container ${isHidden[4] ? 'd-none' : ''}`}>
              <div className="example justify-content-center d-flex">
              <img src={imagesData('media28')} className="object-fit-none border rounded" alt="..." />
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[4] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='object-fit-container'>
<img src={imagesData('media28')} className="object-fit-none border rounded" alt="..." />
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Object Fit Contain (SM - responsive)</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(5)}>Show Code<i className={`${isHidden[5] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`object-fit-container ${isHidden[5] ? 'd-none' : ''}`}>
              <div className="example justify-content-center d-flex">
              <img src={imagesData('media28')} className="object-fit-sm-contain border rounded" alt="..." />
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[5] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='object-fit-container'>
<img src={imagesData('media28')} className="object-fit-sm-contain border rounded" alt="..." />
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Object Fit Contain (MD - responsive)</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(6)}>Show Code<i className={`${isHidden[6] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`object-fit-container ${isHidden[6] ? 'd-none' : ''}`}>
              <div className="example justify-content-center d-flex">
              <img src={imagesData('media28')} className="object-fit-md-contain border rounded" alt="..." />
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[6] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='object-fit-container'>
<img src={imagesData('media28')} className="object-fit-md-contain border rounded" alt="..." />
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Object Fit Contain (LG - responsive)</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(7)}>Show Code<i className={`${isHidden[7] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`object-fit-container ${isHidden[7] ? 'd-none' : ''}`}>
              <div className="example justify-content-center d-flex">
              <img src={imagesData('media28')} className="object-fit-lg-contain border rounded" alt="..." />
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[7] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='object-fit-container'>
<img src={imagesData('media28')} className="object-fit-lg-contain border rounded" alt="..." />
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Object Fit Contain (XL - responsive)</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(8)}>Show Code<i className={`${isHidden[8] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`object-fit-container ${isHidden[8] ? 'd-none' : ''}`}>
              <div className="example justify-content-center d-flex">
              <img src={imagesData('media28')} className="object-fit-xl-contain border rounded" alt="..." />
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[8] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='object-fit-container'>
<img src={imagesData('media28')} className="object-fit-xl-contain border rounded" alt="..." />
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Object Fit Contain (XXL - responsive)</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(9)}>Show Code<i className={`${isHidden[9] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`object-fit-container ${isHidden[9] ? 'd-none' : ''}`}>
              <div className="example justify-content-center d-flex">
              <img src={imagesData('media28')} className="object-fit-xxl-contain border rounded" alt="..." />
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[9] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='object-fit-container'>
<img src={imagesData('media28')} className="object-fit-xxl-contain border rounded" alt="..." />
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Object Fit Contain Video
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(10)}>Show Code<i className={`${isHidden[10] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`object-fit-container ${isHidden[10] ? 'd-none' : ''}`}>
              <div className="example justify-content-center d-flex">
              <video src={imagesData('video')} className="object-fit-contain rounded border" autoPlay loop muted></video>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[10] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='object-fit-container'>
<video src={imagesData('video')} className="object-fit-contain rounded border" autoPlay loop muted></video>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Object Fit Cover Video
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(11)}>Show Code<i className={`${isHidden[11] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`object-fit-container ${isHidden[11] ? 'd-none' : ''}`}>
              <div className="example justify-content-center d-flex">
              <video src={imagesData('video')} className="object-fit-cover rounded border" autoPlay loop muted></video>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[11] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='object-fit-container'>
<video src={imagesData('video')} className="object-fit-cover rounded border" autoPlay loop muted></video>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Object Fit Fill Video
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(12)}>Show Code<i className={`${isHidden[12] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`object-fit-container ${isHidden[12] ? 'd-none' : ''}`}>
              <div className="example justify-content-center d-flex">
              <video src={imagesData('video')} className="object-fit-fill rounded border" autoPlay loop muted></video>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[12] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='object-fit-container'>
<video src={imagesData('video')} className="object-fit-fill rounded border" autoPlay loop muted></video>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Object Fit Scale Video
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(13)}>Show Code<i className={`${isHidden[13] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`object-fit-container ${isHidden[13] ? 'd-none' : ''}`}>
              <div className="example justify-content-center d-flex">
              <video src={imagesData('video')} className="object-fit-scale rounded border" autoPlay loop muted></video>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[13] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='object-fit-container'>
<video src={imagesData('video')} className="object-fit-scale rounded border" autoPlay loop muted></video>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Object Fit None Video
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(14)}>Show Code<i className={`${isHidden[14] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`object-fit-container ${isHidden[14] ? 'd-none' : ''}`}>
              <div className="example justify-content-center d-flex">
              <video src={imagesData('video')} className="object-fit-none rounded border" autoPlay loop muted></video>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[14] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='object-fit-container'>
<video src={imagesData('video')} className="object-fit-none rounded border" autoPlay loop muted></video>
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

export default Mediaobject;