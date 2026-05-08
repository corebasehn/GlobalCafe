import { FC, Fragment, useState } from 'react';
import { Card, Col, Row, Carousel as ReactCarousel } from 'react-bootstrap';
import { imagesData } from '../../common/commonimages';
import Pageheader from '../../layout/layoutcomponent/pageheader';

interface ComponentProps { }

const Carousel: FC<ComponentProps> = () => {

  //Show code

  const [isHidden, setIsHidden] = useState<boolean[]>([false]);
  const toggleHidden = (index: number) => {
    const updatedHidden = [...isHidden];
    updatedHidden[index] = !updatedHidden[index];
    setIsHidden(updatedHidden);
  };
  return (
    <Fragment>
      <Pageheader title="CAROUSEL" heading="Advanced UI" active="Carousel" />
      <Row className="row-sm">
        <Col xl={4} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Basic Carousel</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(0)}>Show Code<i className={`${isHidden[0] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[0] ? 'd-none' : ''}`}>
              <ReactCarousel indicators={false} controls={false}>
                <ReactCarousel.Item>
                  <img src={imagesData('media26')} className="d-block w-100" alt="..." />
                </ReactCarousel.Item>
                <ReactCarousel.Item>
                  <img src={imagesData('media27')} className="d-block w-100" alt="..." />
                </ReactCarousel.Item>
                <ReactCarousel.Item>
                  <img src={imagesData('media33')} className="d-block w-100" alt="..." />
                </ReactCarousel.Item>
              </ReactCarousel>
            </Card.Body>
            <div className={`card-footer ${isHidden[0] ? '' : 'd-none'} border-top-0`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<ReactCarousel indicators={false} controls={false}>
    <ReactCarousel.Item>
        <img src={imagesData('media26')} className="d-block w-100" alt="..." />
    </ReactCarousel.Item>
    <ReactCarousel.Item>
        <img src={imagesData('media27')} className="d-block w-100" alt="..." />
    </ReactCarousel.Item>
    <ReactCarousel.Item>
        <img src={imagesData('media33')} className="d-block w-100" alt="..." />
    </ReactCarousel.Item>
</ReactCarousel>
</Card.Body>
                `}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={4} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">With controls</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(1)}>Show Code<i className={`${isHidden[1] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[1] ? 'd-none' : ''}`}>
              <ReactCarousel indicators={false} controls={true}>
                <ReactCarousel.Item>
                  <img src={imagesData('media28')} className="d-block w-100" alt="..." />
                </ReactCarousel.Item>
                <ReactCarousel.Item>
                  <img src={imagesData('media31')} className="d-block w-100" alt="..." />
                </ReactCarousel.Item>
                <ReactCarousel.Item>
                  <img src={imagesData('media32')} className="d-block w-100" alt="..." />
                </ReactCarousel.Item>
              </ReactCarousel>
            </Card.Body>
            <div className={`card-footer ${isHidden[1] ? '' : 'd-none'} border-top-0`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<ReactCarousel indicators={false} controls={true}>
    <ReactCarousel.Item>
        <img src={imagesData('media28')} className="d-block w-100" alt="..." />
    </ReactCarousel.Item>
    <ReactCarousel.Item>
        <img src={imagesData('media31')} className="d-block w-100" alt="..." />
    </ReactCarousel.Item>
    <ReactCarousel.Item>
        <img src={imagesData('media32')} className="d-block w-100" alt="..." />
    </ReactCarousel.Item>
</ReactCarousel>
</Card.Body>
                `}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={4} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">With indicators</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(2)}>Show Code<i className={`${isHidden[2] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[2] ? 'd-none' : ''}`}>
              <ReactCarousel indicators={true} controls={false}>

                <ReactCarousel.Item >
                  <img src={imagesData('media25')} className="d-block w-100" alt="..." />
                </ReactCarousel.Item>
                <ReactCarousel.Item>
                  <img src={imagesData('media29')} className="d-block w-100" alt="..." />
                </ReactCarousel.Item>
                <ReactCarousel.Item>
                  <img src={imagesData('media30')} className="d-block w-100" alt="..." />
                </ReactCarousel.Item>

              </ReactCarousel>
            </Card.Body>
            <div className={`card-footer ${isHidden[2] ? '' : 'd-none'} border-top-0`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<ReactCarousel indicators={true} controls={false}>

    <ReactCarousel.Item >
        <img src={imagesData('media25')} className="d-block w-100" alt="..." />
    </ReactCarousel.Item>
    <ReactCarousel.Item>
        <img src={imagesData('media29')} className="d-block w-100" alt="..." />
    </ReactCarousel.Item>
    <ReactCarousel.Item>
        <img src={imagesData('media30')} className="d-block w-100" alt="..." />
    </ReactCarousel.Item>

</ReactCarousel>
</Card.Body>
                `}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={4} lg={6} md={6} sm={12}>
          <Card className="custom-card carousel-with-caption">
            <Card.Header className="justify-content-between">
              <div className="card-title">With captions</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(3)}>Show Code<i className={`${isHidden[3] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[3] ? 'd-none' : ''}`}>
              <ReactCarousel>
                <ReactCarousel.Item>
                  <img src={imagesData('media59')} className="d-block w-100" alt="..." />
                  <ReactCarousel.Caption>
                    <h3 className='text-fixed-white'>First slide label</h3>
                    <p>Some representative placeholder content for the first slide.</p>
                  </ReactCarousel.Caption>
                </ReactCarousel.Item>
                <ReactCarousel.Item>
                  <img src={imagesData('media60')} className="d-block w-100" alt="..." />
                  <ReactCarousel.Caption>
                    <h3 className='text-fixed-white'>Second slide label</h3>
                    <p>Some representative placeholder content for the second slide.</p>
                  </ReactCarousel.Caption>
                </ReactCarousel.Item>
                <ReactCarousel.Item>
                  <img src={imagesData('media61')} className="d-block w-100" alt="..." />
                  <ReactCarousel.Caption>
                    <h3 className='text-fixed-white'>Third slide label</h3>
                    <p>Some representative placeholder content for the third slide.</p>
                  </ReactCarousel.Caption>
                </ReactCarousel.Item>
              </ReactCarousel>
            </Card.Body>
            <div className={`card-footer ${isHidden[3] ? '' : 'd-none'} border-top-0`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<ReactCarousel>
    <ReactCarousel.Item>
        <img src={imagesData('media59')} className="d-block w-100" alt="..." />
        <ReactCarousel.Caption>
            <h3 className='text-fixed-white'>First slide label</h3>
            <p>Some representative placeholder content for the first slide.</p>
        </ReactCarousel.Caption>
    </ReactCarousel.Item>
    <ReactCarousel.Item>
        <img src={imagesData('media60')} className="d-block w-100" alt="..." />
        <ReactCarousel.Caption>
            <h3 className='text-fixed-white'>Second slide label</h3>
            <p>Some representative placeholder content for the second slide.</p>
        </ReactCarousel.Caption>
    </ReactCarousel.Item>
    <ReactCarousel.Item>
        <img src={imagesData('media61')} className="d-block w-100" alt="..." />
        <ReactCarousel.Caption>
            <h3 className='text-fixed-white'>Third slide label</h3>
            <p>Some representative placeholder content for the third slide.</p>
        </ReactCarousel.Caption>
    </ReactCarousel.Item>
</ReactCarousel>
</Card.Body>
                `}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={4} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Crossfade</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(4)}>Show Code<i className={`${isHidden[4] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[4] ? 'd-none' : ''}`}>
              <ReactCarousel indicators={false} controls={true} fade>
                <ReactCarousel.Item>
                  <img src={imagesData('media43')} className="d-block w-100" alt="..." />
                </ReactCarousel.Item>
                <ReactCarousel.Item>
                  <img src={imagesData('media44')} className="d-block w-100" alt="..." />
                </ReactCarousel.Item>
                <ReactCarousel.Item>
                  <img src={imagesData('media45')} className="d-block w-100" alt="..." />
                </ReactCarousel.Item>
              </ReactCarousel>
            </Card.Body>
            <div className={`card-footer ${isHidden[4] ? '' : 'd-none'} border-top-0`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<ReactCarousel indicators={false} controls={true} fade>
    <ReactCarousel.Item>
        <img src={imagesData('media43')} className="d-block w-100" alt="..." />
    </ReactCarousel.Item>
    <ReactCarousel.Item>
        <img src={imagesData('media44')} className="d-block w-100" alt="..." />
    </ReactCarousel.Item>
    <ReactCarousel.Item>
        <img src={imagesData('media45')} className="d-block w-100" alt="..." />
    </ReactCarousel.Item>
</ReactCarousel>
</Card.Body>
                `}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col xl={4} lg={6} md={6} sm={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Individual .carousel-item interval</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(5)}>Show Code<i className={`${isHidden[5] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[5] ? 'd-none' : ''}`}>
              <ReactCarousel indicators={false} controls={false}>
                <ReactCarousel.Item interval={10000}>
                  <img src={imagesData('media40')} className="d-block w-100" alt="..." />
                </ReactCarousel.Item>
                <ReactCarousel.Item interval={2000}>
                  <img src={imagesData("media41")} className="d-block w-100" alt="..." />
                </ReactCarousel.Item>
                <ReactCarousel.Item interval={200}>
                  <img src={imagesData('media42')} className="d-block w-100" alt="..." />
                </ReactCarousel.Item>
              </ReactCarousel>
            </Card.Body>
            <div className={`card-footer ${isHidden[5] ? '' : 'd-none'} border-top-0`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<ReactCarousel indicators={false} controls={false}>
    <ReactCarousel.Item interval={10000}>
        <img src={imagesData('media40')} className="d-block w-100" alt="..." />
    </ReactCarousel.Item>
    <ReactCarousel.Item interval={2000}>
        <img src={imagesData("media41")} className="d-block w-100" alt="..." />
    </ReactCarousel.Item>
    <ReactCarousel.Item interval={200}>
        <img src={imagesData('media42')} className="d-block w-100" alt="..." />
    </ReactCarousel.Item>
</ReactCarousel>
</Card.Body>
                `}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Disable touch swiping</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(6)}>Show Code<i className={`${isHidden[6] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[6] ? 'd-none' : ''}`}>
              <ReactCarousel touch={false} wrap={false} indicators={false} controls={true}>
                <ReactCarousel.Item>
                  <img src={imagesData('media13')} className="d-block w-100" alt="..." />
                </ReactCarousel.Item>
                <ReactCarousel.Item>
                  <img src={imagesData("media14")} className="d-block w-100" alt="..." />
                </ReactCarousel.Item>
                <ReactCarousel.Item>
                  <img src={imagesData('media18')} className="d-block w-100" alt="..." />
                </ReactCarousel.Item>
              </ReactCarousel>
            </Card.Body>
            <div className={`card-footer ${isHidden[6] ? '' : 'd-none'} border-top-0`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<ReactCarousel touch={false} wrap={false} indicators={false} controls={true}>
    <ReactCarousel.Item>
        <img src={imagesData('media13')} className="d-block w-100" alt="..." />
    </ReactCarousel.Item>
    <ReactCarousel.Item>
        <img src={imagesData("media14")} className="d-block w-100" alt="..." />
    </ReactCarousel.Item>
    <ReactCarousel.Item>
        <img src={imagesData('media18')} className="d-block w-100" alt="..." />
    </ReactCarousel.Item>
</ReactCarousel>
</Card.Body>
                `}
              </code></pre>
            </div>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="custom-card dark-variant-carousel">
            <Card.Header className="justify-content-between">
              <div className="card-title">Dark variant</div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(7)}>Show Code<i className={`${isHidden[7] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[7] ? 'd-none' : ''}`}>
              <ReactCarousel>
                <ReactCarousel.Item interval={10000}>
                  <img src={imagesData('media63')} className="d-block w-100" alt="..." />
                  <ReactCarousel.Caption>
                    <h3 className='text-fixed-white'>First slide label</h3>
                    <p className='text-fixed-white'>Some representative placeholder content for the first slide.</p>
                  </ReactCarousel.Caption>
                </ReactCarousel.Item>
                <ReactCarousel.Item interval={2000}>
                  <img src={imagesData("media64")} className="d-block w-100" alt="..." />
                  <ReactCarousel.Caption>
                    <h3 className='text-fixed-white'>Second slide label</h3>
                    <p className='text-fixed-white'>Some representative placeholder content for the second slide.</p>
                  </ReactCarousel.Caption>
                </ReactCarousel.Item>
                <ReactCarousel.Item interval={200}>
                  <img src={imagesData('media62')} className="d-block w-100" alt="..." />
                  <ReactCarousel.Caption>
                    <h3 className='text-fixed-white'>Third slide label</h3>
                    <p className='text-fixed-white'>Some representative placeholder content for the third slide.</p>
                  </ReactCarousel.Caption>
                </ReactCarousel.Item>
              </ReactCarousel>
            </Card.Body>
            <div className={`card-footer ${isHidden[7] ? '' : 'd-none'} border-top-0`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<ReactCarousel data-bs-theme='dark'>
    <ReactCarousel.Item interval={10000}>
        <img src={imagesData('media63')} className="d-block w-100" alt="..." />
        <ReactCarousel.Caption>
            <h3 className='text-fixed-white'>First slide label</h3>
            <p className='text-fixed-white'>Some representative placeholder content for the first slide.</p>
        </ReactCarousel.Caption>
    </ReactCarousel.Item>
    <ReactCarousel.Item interval={2000}>
        <img src={imagesData("media64")} className="d-block w-100" alt="..." />
        <ReactCarousel.Caption>
            <h3 className='text-fixed-white'>Second slide label</h3>
            <p className='text-fixed-white'>Some representative placeholder content for the second slide.</p>
        </ReactCarousel.Caption>
    </ReactCarousel.Item>
    <ReactCarousel.Item interval={200}>
        <img src={imagesData('media62')} className="d-block w-100" alt="..." />
        <ReactCarousel.Caption>
            <h3 className='text-fixed-white'>Third slide label</h3>
            <p className='text-fixed-white'>Some representative placeholder content for the third slide.</p>
        </ReactCarousel.Caption>
    </ReactCarousel.Item>
</ReactCarousel>
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

export default Carousel;
