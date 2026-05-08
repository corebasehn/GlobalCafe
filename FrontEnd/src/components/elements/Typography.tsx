import { FC, Fragment, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pageheader from '../../layout/layoutcomponent/pageheader';

interface ComponentProps { }

const Typography: FC<ComponentProps> = () => {

  const [isHidden, setIsHidden] = useState<boolean[]>([false]);
  const toggleHidden = (index: number) => {
    const updatedHidden = [...isHidden];
    updatedHidden[index] = !updatedHidden[index];
    setIsHidden(updatedHidden);
  };

  return (
    <Fragment>
      <Pageheader title="TYPOGRAPHY" heading="Elements" active="TYPOGRAPHY" />
      <Row>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Headings H tags
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(0)}>Show Code<i className={`${isHidden[0] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[0] ? 'd-none' : ''}`}>
              <div className="example">
                <h1 className="mb-3">h1. Bootstrap heading</h1>
                <h2 className="mb-3">h2. Bootstrap heading</h2>
                <h3 className="mb-3">h3. Bootstrap heading</h3>
                <h4 className="mb-3">h4. Bootstrap heading</h4>
                <h5 className="mb-3">h5. Bootstrap heading</h5>
                <h6 className="mb-0">h6. Bootstrap heading</h6>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[0] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
    <h1 className="mb-3">h1. Bootstrap heading</h1>
    <h2 className="mb-3">h2. Bootstrap heading</h2>
    <h3 className="mb-3">h3. Bootstrap heading</h3>
    <h4 className="mb-3">h4. Bootstrap heading</h4>
    <h5 className="mb-3">h5. Bootstrap heading</h5>
    <h6 className="mb-0">h6. Bootstrap heading</h6>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Heading Class Names
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(1)}>Show Code<i className={`${isHidden[1] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[1] ? 'd-none' : ''}`}>
              <div className="example">
                <p className="h1 mb-3">h1. Bootstrap heading</p>
                <p className="h2 mb-3">h2. Bootstrap heading</p>
                <p className="h3 mb-3">h3. Bootstrap heading</p>
                <p className="h4 mb-3">h4. Bootstrap heading</p>
                <p className="h5 mb-3">h5. Bootstrap heading</p>
                <p className="h6 mb-0">h6. Bootstrap heading</p>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[1] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
    <p className="h1 mb-3">h1. Bootstrap heading</p>
    <p className="h2 mb-3">h2. Bootstrap heading</p>
    <p className="h3 mb-3">h3. Bootstrap heading</p>
    <p className="h4 mb-3">h4. Bootstrap heading</p>
    <p className="h5 mb-3">h5. Bootstrap heading</p>
    <p className="h6 mb-0">h6. Bootstrap heading</p>
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
                Display headings
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(2)}>Show Code<i className={`${isHidden[2] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[2] ? 'd-none' : ''}`}>
              <div className="example">
                <h1 className="display-1">Display 1</h1>
                <h1 className="display-2">Display 2</h1>
                <h1 className="display-3">Display 3</h1>
                <h1 className="display-4">Display 4</h1>
                <h1 className="display-5">Display 5</h1>
                <h1 className="display-6">Display 6</h1>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[2] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
    <h1 className="display-1">Display 1</h1>
    <h1 className="display-2">Display 2</h1>
    <h1 className="display-3">Display 3</h1>
    <h1 className="display-4">Display 4</h1>
    <h1 className="display-5">Display 5</h1>
    <h1 className="display-6">Display 6</h1>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Customizing headings
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(3)}>Show Code<i className={`${isHidden[3] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[3] ? 'd-none' : ''}`}>
              <div className="example">
                <h3>
                  Fancy display heading
                  <small className="text-muted">With faded secondary text</small>
                </h3>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[3] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
    <h3>
       Fancy display heading
       <small className="text-muted">With faded secondary text</small>
    </h3>
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
                Inline text elements
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(4)}>Show Code<i className={`${isHidden[4] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[4] ? 'd-none' : ''}`}>
              <div className="example">
                <p>You can use the mark tag to <mark>highlight</mark> text.</p>
                <p><del>This line of text is meant to be treated as deleted text.</del>
                </p>
                <p><s>This line of text is meant to be treated as no longer
                  accurate.</s>
                </p>
                <p><ins>This line of text is meant to be treated as an addition to the
                  document.</ins></p>
                <p><u>This line of text will render as underlined.</u></p>
                <p><small>This line of text is meant to be treated as fine
                  print.</small>
                </p>
                <p><strong>This line rendered as bold text.</strong></p>
                <p className="mb-0"><em>This line rendered as italicized text.</em></p>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[4] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
    <p>You can use the mark tag to <mark>highlight</mark> text.</p>
    <p><del>This line of text is meant to be treated as deleted text.</del>
    </p>
    <p><s>This line of text is meant to be treated as no longer
        accurate.</s>
    </p>
    <p><ins>This line of text is meant to be treated as an addition to the
        document.</ins></p>
    <p><u>This line of text will render as underlined.</u></p>
    <p><small>This line of text is meant to be treated as fine
        print.</small>
    </p>
    <p><strong>This line rendered as bold text.</strong></p>
    <p className="mb-0"><em>This line rendered as italicized text.</em></p>
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
                Font Sizes
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(5)}>Show Code<i className={`${isHidden[5] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[5] ? 'd-none' : ''}`}>
              <div className="example">
                <p className="fs-1 mb-2">.fs-1 text</p>
                <p className="fs-2 mb-2">.fs-2 text</p>
                <p className="fs-3 mb-2">.fs-3 text</p>
                <p className="fs-4 mb-2">.fs-4 text</p>
                <p className="fs-5 mb-2">.fs-5 text</p>
                <p className="fs-6 mb-0">.fs-6 text</p>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[5] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
    <p className="fs-1 mb-2">.fs-1 text</p>
    <p className="fs-2 mb-2">.fs-2 text</p>
    <p className="fs-3 mb-2">.fs-3 text</p>
    <p className="fs-4 mb-2">.fs-4 text</p>
    <p className="fs-5 mb-2">.fs-5 text</p>
    <p className="fs-6 mb-0">.fs-6 text</p>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Lead Paragraph
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(6)}>Show Code<i className={`${isHidden[6] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[6] ? 'd-none' : ''}`}>
              <div className="example">
                <p className="lead mb-0">
                  <b>This is a lead paragraph. It stands out from regular paragraphs</b>.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
                </p>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[6] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<p className="lead mb-0">
<b>This is a lead paragraph. It stands out from regular paragraphs</b>.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
</p>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
      </Row>
      <h6 className="mb-3">Blockquotes</h6>
      <Row>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Left Aligned
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(7)}>Show Code<i className={`${isHidden[7] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[7] ? 'd-none' : ''}`}>
              <div className="example">
                <figure className="blockquote-container">
                  <blockquote className="blockquote mb-2">
                    <h6>The greatest glory in living lies not in never falling, but in rising every time we fall.</h6>
                  </blockquote>
                  <figcaption className="blockquote-footer mt-0 mb-0 text-muted op-7"><cite title="Source Title">Nelson Mandela</cite>
                  </figcaption>
                </figure>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[7] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<figure className="blockquote-container">
    <blockquote className="blockquote mb-2">
        <h6>The greatest glory in living lies not in never falling, but in rising every time we fall.</h6>
    </blockquote>
    <figcaption className="blockquote-footer mt-0 mb-0 text-muted op-7"><cite title="Source Title">Nelson Mandela</cite>
    </figcaption>
</figure>
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
                Right Aligned
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(8)}>Show Code<i className={`${isHidden[8] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[8] ? 'd-none' : ''}`}>
              <div className="example">
                <figure className="blockquote-container text-end">
                  <blockquote className="blockquote mb-2">
                    <h6>The greatest glory in living lies not in never falling, but in rising every time we fall.</h6>
                  </blockquote>
                  <figcaption className="blockquote-footer mt-0 mb-0 text-muted op-7"><cite title="Source Title">Nelson Mandela</cite>
                  </figcaption>
                </figure>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[8] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<figure className="blockquote-container text-end">
<blockquote className="blockquote mb-2">
    <h6>The greatest glory in living lies not in never falling, but in rising every time we fall.</h6>
</blockquote>
<figcaption className="blockquote-footer mt-0 mb-0 text-muted op-7"><cite title="Source Title">Nelson Mandela</cite>
</figcaption>
</figure>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
      </Row>
      <h6 className="mb-3">Custom Blockquotes</h6>
      <Row>
        <Col xl={4}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Primary Blockquote
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(9)}>Show Code<i className={`${isHidden[9] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[9] ? 'd-none' : ''}`}>
              <div className="example">
                <blockquote className="blockquote custom-blockquote primary mb-0 text-center">
                  <h6>The future belongs to those who believe in the beauty of their dreams..</h6>
                  <footer className="blockquote-footer mt-3 fs-14 text-muted op-7 mb-0">Someone famous as <cite title="Source Title">-Eleanor Roosevelt</cite></footer>
                  <span className="quote-icon"><i className="ri-information-line"></i></span>
                </blockquote>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[9] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<blockquote className="blockquote custom-blockquote primary mb-0 text-center">
    <h6>The future belongs to those who believe in the beauty of their dreams..</h6>
    <footer className="blockquote-footer mt-3 fs-14 text-muted op-7 mb-0">Someone famous as <cite title="Source Title">-Eleanor Roosevelt</cite></footer>
    <span className="quote-icon"><i className="ri-information-line"></i></span>
</blockquote>
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
                Secondary Blockquote
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(10)}>Show Code<i className={`${isHidden[10] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[10] ? 'd-none' : ''}`}>
              <div className="example">
                <blockquote className="blockquote custom-blockquote secondary mb-0 text-center">
                  <h6>The future belongs to those who believe in the beauty of their dreams..</h6>
                  <footer className="blockquote-footer mt-3 fs-14 text-muted op-7 mb-0">Someone famous as <cite title="Source Title">-Eleanor Roosevelt</cite></footer>
                  <span className="quote-icon"><i className="ri-information-line"></i></span>
                </blockquote>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[10] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
<blockquote className="blockquote custom-blockquote secondary mb-0 text-center">
<h6>The future belongs to those who believe in the beauty of their dreams..</h6>
<footer className="blockquote-footer mt-3 fs-14 text-muted op-7 mb-0">Someone famous as <cite title="Source Title">-Eleanor Roosevelt</cite></footer>
<span className="quote-icon"><i className="ri-information-line"></i></span>
</blockquote>
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
                Warning Blockquote
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(11)}>Show Code<i className={`${isHidden[11] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[11] ? 'd-none' : ''}`}>
              <div className="example">
                <blockquote className="blockquote custom-blockquote warning mb-0 text-center">
                  <h6>The future belongs to those who believe in the beauty of their dreams..</h6>
                  <footer className="blockquote-footer mt-3 fs-14 text-muted op-7 mb-0">Someone famous as <cite title="Source Title">-Eleanor Roosevelt</cite></footer>
                  <span className="quote-icon"><i className="ri-information-line"></i></span>
                </blockquote>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[11] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
<blockquote className="blockquote custom-blockquote warning mb-0 text-center">
    <h6>The future belongs to those who believe in the beauty of their dreams..</h6>
    <footer className="blockquote-footer mt-3 fs-14 text-muted op-7 mb-0">Someone famous as <cite title="Source Title">-Eleanor Roosevelt</cite></footer>
    <span className="quote-icon"><i className="ri-information-line"></i></span>
</blockquote>
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
                Success Blockquote
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(12)}>Show Code<i className={`${isHidden[12] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[12] ? 'd-none' : ''}`}>
              <div className="example">
                <blockquote className="blockquote custom-blockquote success mb-0 text-center">
                  <h6>The future belongs to those who believe in the beauty of their dreams..</h6>
                  <footer className="blockquote-footer mt-3 fs-14 text-muted op-7 mb-0">Someone famous as <cite title="Source Title">-Eleanor Roosevelt</cite></footer>
                  <span className="quote-icon"><i className="ri-information-line"></i></span>
                </blockquote>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[12] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
<blockquote className="blockquote custom-blockquote success mb-0 text-center">
    <h6>The future belongs to those who believe in the beauty of their dreams..</h6>
    <footer className="blockquote-footer mt-3 fs-14 text-muted op-7 mb-0">Someone famous as <cite title="Source Title">-Eleanor Roosevelt</cite></footer>
    <span className="quote-icon"><i className="ri-information-line"></i></span>
</blockquote>
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
                Info Blockquote
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(13)}>Show Code<i className={`${isHidden[13] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[13] ? 'd-none' : ''}`}>
              <div className="example">
                <blockquote className="blockquote custom-blockquote info mb-0 text-center">
                  <h6>The future belongs to those who believe in the beauty of their dreams..</h6>
                  <footer className="blockquote-footer mt-3 fs-14 text-muted op-7 mb-0">Someone famous as <cite title="Source Title">-Eleanor Roosevelt</cite></footer>
                  <span className="quote-icon"><i className="ri-information-line"></i></span>
                </blockquote>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[13] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
<blockquote className="blockquote custom-blockquote info mb-0 text-center">
    <h6>The future belongs to those who believe in the beauty of their dreams..</h6>
    <footer className="blockquote-footer mt-3 fs-14 text-muted op-7 mb-0">Someone famous as <cite title="Source Title">-Eleanor Roosevelt</cite></footer>
    <span className="quote-icon"><i className="ri-information-line"></i></span>
</blockquote>
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
                Danger Blockquote
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(14)}>Show Code<i className={`${isHidden[14] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[14] ? 'd-none' : ''}`}>
              <div className="example">
                <blockquote className="blockquote custom-blockquote danger mb-0 text-center">
                  <h6>The future belongs to those who believe in the beauty of their dreams..</h6>
                  <footer className="blockquote-footer mt-3 fs-14 text-muted op-7 mb-0">Someone famous as <cite title="Source Title">-Eleanor Roosevelt</cite></footer>
                  <span className="quote-icon"><i className="ri-information-line"></i></span>
                </blockquote>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[14] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
<blockquote className="blockquote custom-blockquote danger mb-0 text-center">
    <h6>The future belongs to those who believe in the beauty of their dreams..</h6>
    <footer className="blockquote-footer mt-3 fs-14 text-muted op-7 mb-0">Someone famous as <cite title="Source Title">-Eleanor Roosevelt</cite></footer>
    <span className="quote-icon"><i className="ri-information-line"></i></span>
</blockquote>
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
                Description list alignment
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(15)}>Show Code<i className={`${isHidden[15] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[15] ? 'd-none' : ''}`}>
              <div className="example">
                <dl className="row mb-0">
                  <dt className="col-sm-3">Description lists</dt>
                  <dd className="col-sm-9">A description list is perfect for defining terms.</dd>

                  <dt className="col-sm-3">Term</dt>
                  <dd className="col-sm-9">
                    <p>Definition for the term.</p>
                    <p>And some more placeholder definition text.</p>
                  </dd>

                  <dt className="col-sm-3">Another term</dt>
                  <dd className="col-sm-9">This definition is short, so no extra paragraphs or
                    anything.</dd>

                  <dt className="col-sm-3 text-truncate">Truncated term is truncated</dt>
                  <dd className="col-sm-9">This can be useful when space is tight. Adds an
                    ellipsis at
                    the end.</dd>

                  <dt className="col-sm-3">Nesting</dt>
                  <dd className="col-sm-9 mb-0">
                    <dl className="row mb-0">
                      <dt className="col-sm-4">Nested definition list</dt>
                      <dd className="col-sm-8 mb-0">I heard you like definition lists. Let me put a
                        definition list inside your definition list.</dd>
                    </dl>
                  </dd>
                </dl>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[15] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
<dl className="row mb-0">
    <dt className="col-sm-3">Description lists</dt>
    <dd className="col-sm-9">A description list is perfect for defining terms.</dd>

    <dt className="col-sm-3">Term</dt>
    <dd className="col-sm-9">
        <p>Definition for the term.</p>
        <p>And some more placeholder definition text.</p>
    </dd>

    <dt className="col-sm-3">Another term</dt>
    <dd className="col-sm-9">This definition is short, so no extra paragraphs or
        anything.</dd>

    <dt className="col-sm-3 text-truncate">Truncated term is truncated</dt>
    <dd className="col-sm-9">This can be useful when space is tight. Adds an
        ellipsis at
        the end.</dd>

    <dt className="col-sm-3">Nesting</dt>
    <dd className="col-sm-9 mb-0">
        <dl className="row mb-0">
            <dt className="col-sm-4">Nested definition list</dt>
            <dd className="col-sm-8 mb-0">I heard you like definition lists. Let me put a
                definition list inside your definition list.</dd>
        </dl>
    </dd>
</dl>
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
                List Unstyled
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(16)}>Show Code<i className={`${isHidden[16] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[16] ? 'd-none' : ''}`}>
              <div className="example">
                <ul className="list-unstyled">
                  <li>This is a list.</li>
                  <li>It appears completely unstyled.</li>
                  <li>Structurally, it's still a list.</li>
                  <li>However, this style only applies to immediate child elements.</li>
                  <li className="mb-2">Nested lists:
                    <ul>
                      <li>are unaffected by this style</li>
                      <li>will still show a bullet</li>
                      <li>and have appropriate left margin</li>
                    </ul>
                  </li>
                  <li>This may still come in handy in some situations.</li>
                </ul>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[16] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
<ul className="list-unstyled">
    <li>This is a list.</li>
    <li>It appears completely unstyled.</li>
    <li>Structurally, it's still a list.</li>
    <li>However, this style only applies to immediate child elements.</li>
    <li className="mb-2">Nested lists:
        <ul>
            <li>are unaffected by this style</li>
            <li>will still show a bullet</li>
            <li>and have appropriate left margin</li>
        </ul>
    </li>
    <li>This may still come in handy in some situations.</li>
</ul>
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
                Abbreviations
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(17)}>Show Code<i className={`${isHidden[17] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[17] ? 'd-none' : ''}`}>
              <div className="example">
                <p><abbr title="attribute">attr</abbr></p>
                <p className="mb-0"><abbr title="HyperText Markup Language" className="initialism">HTML</abbr></p>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[17] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
<p><abbr title="attribute">attr</abbr></p>
<p className="mb-0"><abbr title="HyperText Markup Language" className="initialism">HTML</abbr></p>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                List inline
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(18)}>Show Code<i className={`${isHidden[18] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[18] ? 'd-none' : ''}`}>
              <div className="example">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">This is a list item.</li>
                  <li className="list-inline-item">And another one.</li>
                  <li className="list-inline-item">But they're displayed inline.</li>
                </ul>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[18] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
<ul className="list-inline mb-0">
    <li className="list-inline-item">This is a list item.</li>
    <li className="list-inline-item">And another one.</li>
    <li className="list-inline-item">But they're displayed inline.</li>
</ul>
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
                Horizontal rules
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(19)}>Show Code<i className={`${isHidden[19] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[19] ? 'd-none' : ''}`}>
              <div className="example">
                <p className="mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dolorem fuga iste obcaecati natus eos officiis adipisci voluptatibus ipsum, architecto veniam delectus vel dolor magni a vero sunt ut harum.</p>
                <div className="text-success">
                  <hr />
                </div>
                <p className=" mb-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto perspiciatis, magni numquam quos perferendis nulla magnam odit amet excepturi quisquam provident.</p>

                <hr className="text-danger border-2 opacity-50" />
                <p className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus aliquid consequatur aut doloremque assumenda voluptatem, id qui vero adipisci! Nostrum ipsam praesentium!</p>
                <hr className="border-primary border-3 opacity-75" />
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[19] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
<p className="mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dolorem fuga iste obcaecati natus eos officiis adipisci voluptatibus ipsum, architecto veniam delectus vel dolor magni a vero sunt ut harum.</p>
<div className="text-success">
    <hr />
</div>
<p className=" mb-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto perspiciatis, magni numquam quos perferendis nulla magnam odit amet excepturi quisquam provident.</p>

<hr className="text-danger border-2 opacity-50" />
<p className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus aliquid consequatur aut doloremque assumenda voluptatem, id qui vero adipisci! Nostrum ipsam praesentium!</p>
<hr className="border-primary border-3 opacity-75" />
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
                Text transform
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(20)}>Show Code<i className={`${isHidden[20] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[20] ? 'd-none' : ''}`}>
              <div className="example">
                <p className="text-lowercase">Lowercased text.</p>
                <p className="text-uppercase">Uppercased text.</p>
                <p className="text-capitalize mb-0">CapiTaliZed text.</p>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[20] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
<p className="text-lowercase">Lowercased text.</p>
<p className="text-uppercase">Uppercased text.</p>
<p className="text-capitalize mb-0">CapiTaliZed text.</p>
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
                Text decoration
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(21)}>Show Code<i className={`${isHidden[21] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[21] ? 'd-none' : ''}`}>
              <div className="example">
                <p className="text-decoration-underline">This text has a line underneath it.
                </p>
                <p className="text-decoration-line-through">This text has a line going
                  through
                  it.
                </p>
                <Link to="#" className="text-decoration-none">This link has its text
                  decoration
                  removed
                </Link>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[21] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
<p className="text-decoration-underline">This text has a line underneath it.
</p>
<p className="text-decoration-line-through">This text has a line going
through
it.
</p>
<Link to="#" className="text-decoration-none">This link has its text
decoration
removed
</Link>
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
                Font weight and italics
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(22)}>Show Code<i className={`${isHidden[22] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[22] ? 'd-none' : ''}`}>
              <div className="example">
                <p className="fw-bold">Bold text.</p>
                <p className="fw-bolder">Bolder weight text (relative to the parent element).</p>
                <p className="fw-medium">Semibold weight text.</p>
                <p className="fw-normal">Normal weight text.</p>
                <p className="fw-light">Light weight text.</p>
                <p className="fw-lighter">Lighter weight text (relative to the parent element).</p>
                <p className="fst-italic">Italic text.</p>
                <p className="fst-normal mb-0">Text with normal font style</p>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[22] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
<p className="fw-bold">Bold text.</p>
<p className="fw-bolder">Bolder weight text (relative to the parent element).</p>
<p className="fw-medium">Semibold weight text.</p>
<p className="fw-normal">Normal weight text.</p>
<p className="fw-light">Light weight text.</p>
<p className="fw-lighter">Lighter weight text (relative to the parent element).</p>
<p className="fst-italic">Italic text.</p>
<p className="fst-normal mb-0">Text with normal font style</p>
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
                Line height
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(23)}>Show Code<i className={`${isHidden[23] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[23] ? 'd-none' : ''}`}>
              <div className="example">
                <p className="lh-1">This is a long paragraph written to show how the line-height of
                  an
                  element is affected by our utilities. Classes are applied to the element
                  itself
                  or sometimes the parent element. These classes can be customized as needed
                  with
                  our utility API.
                </p>
                <p className="lh-sm">This is a long paragraph written to show how the line-height of
                  an
                  element is affected by our utilities. Classes are applied to the element
                  itself
                  or sometimes the parent element. These classes can be customized as needed
                  with
                  our utility API.
                </p>
                <p className="lh-base">This is a long paragraph written to show how the line-height
                  of
                  an element is affected by our utilities. Classes are applied to the element
                  itself or sometimes the parent element. These classes can be customized as
                  needed with our utility API.
                </p>
                <p className="lh-lg mb-0">This is a long paragraph written to show how the
                  line-height
                  of an
                  element is affected by our utilities. Classes are applied to the element
                  itself
                  or sometimes the parent element. These classes can be customized as needed
                  with
                  our utility API.
                </p>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[23] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
    <p className="lh-1">This is a long paragraph written to show how the line-height of
    an element is affected by our utilities. Classes are applied to the element
    itself or sometimes the parent element. These classes can be customized as needed
    with our utility API.
    </p>
    <p className="lh-sm">This is a long paragraph written to show how the line-height of
    an element is affected by our utilities. Classes are applied to the element
    itself or sometimes the parent element. These classes can be customized as needed
    with our utility API.
    </p>
    <p className="lh-base">This is a long paragraph written to show how the line-height
    of an element is affected by our utilities. Classes are applied to the element
    itself or sometimes the parent element. These classes can be customized as
    needed with our utility API.
    </p>
    <p className="lh-lg mb-0">This is a long paragraph written to show how the
    line-height of an element is affected by our utilities. Classes are applied to the element
    itself or sometimes the parent element. These classes can be customized as needed
    with our utility API.
    </p>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xl={3}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Monospace
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(24)}>Show Code<i className={`${isHidden[24] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[24] ? 'd-none' : ''}`}>
              <div className="example">
                <p className="font-monospace mb-0">This is in monospace</p>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[24] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
<p className="font-monospace mb-0">This is in monospace</p>
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
                Reset color
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(25)}>Show Code<i className={`${isHidden[25] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[25] ? 'd-none' : ''}`}>
              <div className="example">
                <p className="text-muted mb-0">
                  Muted text with a <Link to="#" className="text-reset text-decoration-underline text-dark">reset link</Link>.
                </p>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[25] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
    <p className="text-muted mb-0">
    Muted text with a <Link to="#" className="text-reset text-decoration-underline text-dark">reset link</Link>.
    </p>
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
                Visible text
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(26)}>Show Code<i className={`${isHidden[26] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[26] ? 'd-none' : ''}`}>
              <div className="example">
                <p className="visible mb-0">This is visible text</p>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[26] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
<p className="visible mb-0">This is visible text</p>
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
                Invisible text
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(27)}>Show Code<i className={`${isHidden[27] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[27] ? 'd-none' : ''}`}>
              <div className="example">
                <p className="invisible mb-0">This is invisible text</p>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[27] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
<p className="invisible mb-0">This is invisible text</p>
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
                Text alignment
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(28)}>Show Code<i className={`${isHidden[28] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[28] ? 'd-none' : ''}`}>
              <div className="example">
                <p className="text-start">Start aligned text on all viewport sizes.</p>
                <p className="text-center">Center aligned text on all viewport sizes.</p>
                <p className="text-end">End aligned text on all viewport sizes.</p>

                <p className="text-sm-start">Start aligned text on viewports sized SM (small) or
                  wider.
                </p>
                <p className="text-md-start">Start aligned text on viewports sized MD (medium) or
                  wider.
                </p>
                <p className="text-lg-start">Start aligned text on viewports sized LG (large) or
                  wider.
                </p>
                <p className="text-xl-start">Start aligned text on viewports sized XL (extra-large)
                  or
                  wider.</p>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[28] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
    <p className="text-start">Start aligned text on all viewport sizes.</p>
    <p className="text-center">Center aligned text on all viewport sizes.</p>
    <p className="text-end">End aligned text on all viewport sizes.</p>

    <p className="text-sm-start">Start aligned text on viewports sized SM (small) or
        wider.
    </p>
    <p className="text-md-start">Start aligned text on viewports sized MD (medium) or
        wider.
    </p>
    <p className="text-lg-start">Start aligned text on viewports sized LG (large) or
        wider.
    </p>
    <p className="text-xl-start">Start aligned text on viewports sized XL (extra-large)
        or wider.</p>
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
                Text wrapping and overflow
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(29)}>Show Code<i className={`${isHidden[29] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[29] ? 'd-none' : ''}`}>
              <div className="example">
                <div className="badge bg-primary text-wrap mb-3" style={{ width: '6rem' }}>
                  This text should wrap.
                </div>
                <p className="text-muted mb-2"> use class <code>.text-nowrap</code> to prevent text from wrapping</p>
                <div className="text-nowrap bg-light border" style={{ width: '8rem' }}>
                  This text should overflow the parent.
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[29] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
    <div className="badge bg-primary text-wrap mb-3" style={{ width: '6rem' }}>
        This text should wrap.
    </div>
    <p className="text-muted mb-2"> use class <code>.text-nowrap</code> to prevent text from wrapping</p>
    <div className="text-nowrap bg-light border" style={{ width: '8rem' }}>
        This text should overflow the parent.
    </div>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Word break
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(30)}>Show Code<i className={`${isHidden[30] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`btn-list ${isHidden[30] ? 'd-none' : ''}`}>
              <div className="example">
                <p className="text-break mb-0">
                  mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                </p>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[30] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='btn-list'>
<p className="text-break mb-0">
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
</p>
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

export default Typography;