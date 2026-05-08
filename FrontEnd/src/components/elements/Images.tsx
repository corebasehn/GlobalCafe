import { FC, Fragment, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { imagesData } from '../../common/commonimages';
import Pageheader from '../../layout/layoutcomponent/pageheader';

interface ComponentProps { }

const Images: FC<ComponentProps> = () => {

  const [isHidden, setIsHidden] = useState<boolean[]>([false]);
  const toggleHidden = (index: number) => {
    const updatedHidden = [...isHidden];
    updatedHidden[index] = !updatedHidden[index];
    setIsHidden(updatedHidden);
  };
  return (
    <Fragment>
      <Pageheader title="IMAGES & FIGURES" heading="Elements" active="IMAGES & FIGURES" />
      <Row>
        <Col xl={4}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Responsive image
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(0)}>Show Code<i className={`${isHidden[0] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[0] ? 'd-none' : ''}`}>
              <div className="example">
                <p className="card-title mb-3">Use <code> .img-fluid </code>class to the img tag to get responsive image.</p>
                <div className="text-center">
                  <img src={imagesData('media48')} className="img-fluid" alt="..." />
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[0] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className={\`\${isHidden[0] ? 'd-none' : ''}\`}>
<p className="card-title mb-3">Use <code> .img-fluid </code>class to the img tag to get responsive image.</p>
<div className="text-center">
<img src={imagesData('media48')} className="img-fluid" alt="..."/>
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={4}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Image With Radius
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(1)}>Show Code<i className={`${isHidden[1] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[1] ? 'd-none' : ''}`}>
              <div className="example">
                <p className="card-title mb-3">Use <code>.rounded</code> class along with <code>.img-fluid</code> to get border radius.</p>
                <div className="text-center">
                  <img src={imagesData('media49')} className="img-fluid rounded" alt="..." />
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[1] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<p className="card-title mb-3">Use <code>.rounded</code> class along with <code>.img-fluid</code> to get border radius.</p>
<div className="text-center">
    <img src={imagesData('media49')} className="img-fluid rounded" alt="..." />
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={4}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Rounded Image
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(2)}>Show Code<i className={`${isHidden[2] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[2] ? 'd-none' : ''}`}>
              <div className="example">
                <p className="card-title mb-3">Use <code>.rounded-pill</code> class to <code>img</code> tag to get rounded image.</p>
                <div className="text-center">
                  <img src={imagesData('media50')} className="img-fluid rounded-pill" alt="..." />
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[2] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<p className="card-title mb-3">Use <code>.rounded-pill</code> class to <code>img</code> tag to get rounded image.</p>
<div className="text-center">
    <img src={imagesData('media50')} className="img-fluid rounded-pill" alt="..." />
</div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={4}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Image Left Align</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(3)}>Show Code<i className={`${isHidden[3] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[3] ? 'd-none' : ''}`}>
                <div className="example">
              <div className='d-inline-block'>
                  <img className="rounded float-start" src={imagesData('media53')} alt="..." />
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[3] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<img className="rounded float-start" src={imagesData('media53')} alt="..." />
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={4}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Image Center Align</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(4)}>Show Code<i className={`${isHidden[4] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[4] ? 'd-none' : ''}`}>
              <div className="example">
              <img className="rounded mx-auto d-block" src={imagesData('media55')} alt="..." />
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[4] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<img className="rounded mx-auto d-block" src={imagesData('media55')} alt="..." />
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={4}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Image Right Align</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(5)}>Show Code<i className={`${isHidden[5] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[5] ? 'd-none' : ''}`}>
                <div className="example">
                  <div className='d-inline-block'>
                <img className="rounded float-end" src={imagesData('media54')} alt="..." />
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[5] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<img className="rounded float-end" src={imagesData('media54')} alt="..." />
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
                Figures
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(6)}>Show Code<i className={`${isHidden[6] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`d-flex justify-content-between gap-2 ${isHidden[6] ? 'd-none' : ''}`}>
              <div className="example">
              <figure className="figure">
                <img className="bd-placeholder-img figure-img img-fluid rounded card-img" src={imagesData('media56')} alt="..." />
                <figcaption className="figure-caption mt-2">A caption for the above image.
                </figcaption>
              </figure>
              <figure className="figure float-end">
                <img className="bd-placeholder-img figure-img img-fluid rounded card-img" src={imagesData('media57')} alt="..." />
                <figcaption className="figure-caption text-end mt-2">A caption for the above image.
                </figcaption>
              </figure>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[6] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='d-flex justify-content-between gap-2'>
<figure className="figure">
    <img className="bd-placeholder-img figure-img img-fluid rounded card-img" src={imagesData('media56')} alt="..." />
    <figcaption className="figure-caption mt-2">A caption for the above image.
    </figcaption>
</figure>
<figure className="figure float-end">
    <img className="bd-placeholder-img figure-img img-fluid rounded card-img" src={imagesData('media57')} alt="..." />
    <figcaption className="figure-caption text-end mt-2">A caption for the above image.
    </figcaption>
</figure>
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
                Image Thumbnail
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(7)}>Show Code<i className={`${isHidden[7] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[7] ? 'd-none' : ''}`}>
              <div className="example">
              <p className="card-title mb-3">Use <code> .img-thumbnail </code>to give an image a rounded 1px border.</p>
              <div className="text-center">
                <img src={imagesData('media51')} className="img-thumbnail" alt="..." />
              </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[7] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
 <Card.Body>
 <p className="card-title mb-3">Use <code> .img-thumbnail </code>to give an image a rounded 1px border.</p>
 <div className="text-center">
     <img src={imagesData('media51')} className="img-thumbnail" alt="..." />
 </div>
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
                Rounded Thumbnail
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(8)}>Show Code<i className={`${isHidden[8] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[8] ? 'd-none' : ''}`}>
              <div className="example">
              <p className="card-title mb-3">Use <code> .rounded-pill </code>along with <code> .img-thummbnail </code> to get radius.</p>
              <div className="text-center">
                <img src={imagesData('media52')} className="img-thumbnail rounded-pill" alt="..." />
              </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[8] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<p className="card-title mb-3">Use <code> .rounded-pill </code>along with <code> .img-thummbnail </code> to get radius.</p>
<div className="text-center">
    <img src={imagesData('media52')} className="img-thumbnail rounded-pill" alt="..." />
</div>
</Card.Body
`}
              </code></pre>
            </div>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Images;