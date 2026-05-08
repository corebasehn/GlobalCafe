import { FC, Fragment, useState } from 'react';
import { Card, Col, Row, Pagination as Reactpagination } from 'react-bootstrap';
import Pageheader from '../../layout/layoutcomponent/pageheader';

interface ComponentProps { }

const Pagination: FC<ComponentProps> = () => {

  const [isHidden, setIsHidden] = useState<boolean[]>([false]);
  const toggleHidden = (index: number) => {
    const updatedHidden = [...isHidden];
    updatedHidden[index] = !updatedHidden[index];
    setIsHidden(updatedHidden);
  };
  return (
    <Fragment>
      <Pageheader title="PAGINATION" heading="Elements" active="PAGINATION" />
      <Row className="row-sm">
        <Col xxl={6} xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Basic Pagination
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(0)}>Show Code<i className={`${isHidden[0] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[0] ? 'd-none' : ''}`}>
              <div className="example">
              <Reactpagination>
                <Reactpagination.Item disabled>Previous</Reactpagination.Item>
                <Reactpagination.Item>{1}</Reactpagination.Item>
                <Reactpagination.Item>{2}</Reactpagination.Item>
                <Reactpagination.Item>Next</Reactpagination.Item>
              </Reactpagination>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[0] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<Reactpagination>
<Reactpagination.Item disabled>Previous</Reactpagination.Item>
<Reactpagination.Item>{1}</Reactpagination.Item>
<Reactpagination.Item>{2}</Reactpagination.Item>
<Reactpagination.Item>Next</Reactpagination.Item>
</Reactpagination>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>

        <Col xxl={6} xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Pagination With Icons
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(1)}>Show Code<i className={`${isHidden[1] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[1] ? 'd-none' : ''}`}>
              <div className="example">
              <Reactpagination>
                <Reactpagination.Item><i className="bi bi-caret-left"></i></Reactpagination.Item>
                <Reactpagination.Item>{1}</Reactpagination.Item>
                <Reactpagination.Item>{2}</Reactpagination.Item>
                <Reactpagination.Item>{3}</Reactpagination.Item>
                <Reactpagination.Item><i className="bi bi-caret-right"></i></Reactpagination.Item>
              </Reactpagination>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[1] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<Reactpagination>
<Reactpagination.Item><i className="bi bi-caret-left"></i></Reactpagination.Item>
<Reactpagination.Item>{1}</Reactpagination.Item>
<Reactpagination.Item>{2}</Reactpagination.Item>
<Reactpagination.Item>{3}</Reactpagination.Item>
<Reactpagination.Item><i className="bi bi-caret-right"></i></Reactpagination.Item>
</Reactpagination>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="row-sm">
        <Col xxl={12} xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Pagination Sizing
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(2)}>Show Code<i className={`${isHidden[2] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`d-flex flex-wrap justify-content-between gap-2 ${isHidden[2] ? 'd-none' : ''}`}>
              <div className="example">
              <Reactpagination size="sm">
                <Reactpagination.Item active>{1}</Reactpagination.Item>
                <Reactpagination.Item>{2}</Reactpagination.Item>
                <Reactpagination.Item>{3}</Reactpagination.Item>
              </Reactpagination>
              <Reactpagination>
                <Reactpagination.Item active>{1}</Reactpagination.Item>
                <Reactpagination.Item>{2}</Reactpagination.Item>
                <Reactpagination.Item>{3}</Reactpagination.Item>
              </Reactpagination>
              <Reactpagination size="lg">
                <Reactpagination.Item active>{1}</Reactpagination.Item>
                <Reactpagination.Item>{2}</Reactpagination.Item>
                <Reactpagination.Item>{3}</Reactpagination.Item>
              </Reactpagination>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[2] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='d-flex flex-wrap justify-content-between gap-2'>
<Reactpagination size="sm">
<Reactpagination.Item active>{1}</Reactpagination.Item>
<Reactpagination.Item>{2}</Reactpagination.Item>
<Reactpagination.Item>{3}</Reactpagination.Item>
</Reactpagination>
<Reactpagination>
<Reactpagination.Item active>{1}</Reactpagination.Item>
<Reactpagination.Item>{2}</Reactpagination.Item>
<Reactpagination.Item>{3}</Reactpagination.Item>
</Reactpagination>
<Reactpagination size="lg">
<Reactpagination.Item active>{1}</Reactpagination.Item>
<Reactpagination.Item>{2}</Reactpagination.Item>
<Reactpagination.Item>{3}</Reactpagination.Item>
</Reactpagination>
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
                Center & Right Aligned Pagination
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(3)}>Show Code<i className={`${isHidden[3] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[3] ? 'd-none' : ''}`}>
              <div className="example">
              <Reactpagination className="justify-content-sm-center">
                <Reactpagination.Item disabled>Previous</Reactpagination.Item>
                <Reactpagination.Item>{1}</Reactpagination.Item>
                <Reactpagination.Item>{2}</Reactpagination.Item>
                <Reactpagination.Item className="d-sm-block d-none">{3}</Reactpagination.Item>
                <Reactpagination.Item>Next</Reactpagination.Item>
              </Reactpagination>
              <Reactpagination className="justify-content-sm-end mb-0">
                <Reactpagination.Item disabled>Previous</Reactpagination.Item>
                <Reactpagination.Item>{1}</Reactpagination.Item>
                <Reactpagination.Item>{2}</Reactpagination.Item>
                <Reactpagination.Item className="d-sm-block d-none">{3}</Reactpagination.Item>
                <Reactpagination.Item>Next</Reactpagination.Item>
              </Reactpagination>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[3] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<Reactpagination className="justify-content-center">
<Reactpagination.Item disabled>Previous</Reactpagination.Item>
<Reactpagination.Item>{1}</Reactpagination.Item>
<Reactpagination.Item>{2}</Reactpagination.Item>
<Reactpagination.Item>{3}</Reactpagination.Item>
<Reactpagination.Item>Next</Reactpagination.Item>
</Reactpagination>
<Reactpagination className="justify-content-end mb-0">
<Reactpagination.Item disabled>Previous</Reactpagination.Item>
<Reactpagination.Item>{1}</Reactpagination.Item>
<Reactpagination.Item>{2}</Reactpagination.Item>
<Reactpagination.Item>{3}</Reactpagination.Item>
<Reactpagination.Item>Next</Reactpagination.Item>
</Reactpagination>
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
                Active and disabled states
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(4)}>Show Code<i className={`${isHidden[4] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`d-flex flex-wrap ${isHidden[4] ? 'd-none' : ''}`}>
              <div className="example">
              <Reactpagination className="me-3">
                <Reactpagination.Item disabled>Previous</Reactpagination.Item>
                <Reactpagination.Item>{1}</Reactpagination.Item>
                <Reactpagination.Item active>{2}</Reactpagination.Item>
                <Reactpagination.Item>Next</Reactpagination.Item>
              </Reactpagination>
              <Reactpagination>
                <Reactpagination.Item disabled>Previous</Reactpagination.Item>
                <Reactpagination.Item>{1}</Reactpagination.Item>
                <Reactpagination.Item active>{2}</Reactpagination.Item>
                <Reactpagination.Item>Next</Reactpagination.Item>
              </Reactpagination>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[4] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body className='d-flex flex-wrap'>
<Reactpagination className="me-3">
<Reactpagination.Item disabled>Previous</Reactpagination.Item>
<Reactpagination.Item>{1}</Reactpagination.Item>
<Reactpagination.Item active>{2}</Reactpagination.Item>
<Reactpagination.Item>Next</Reactpagination.Item>
</Reactpagination>
<Reactpagination>
<Reactpagination.Item disabled>Previous</Reactpagination.Item>
<Reactpagination.Item>{1}</Reactpagination.Item>
<Reactpagination.Item active>{2}</Reactpagination.Item>
<Reactpagination.Item>Next</Reactpagination.Item>
</Reactpagination>
</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="row-sm">
        <Col xl={3}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Pagination Style-1
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(5)}>Show Code<i className={`${isHidden[5] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[5] ? 'd-none' : ''}`}>
              <div className="example">
              <nav aria-label="Page navigation" className="pagination-style-1">
                <Reactpagination className="mb-0 flex-wrap">
                  <Reactpagination.Item disabled><i className="ri-arrow-left-s-line align-middle"></i></Reactpagination.Item>
                  <Reactpagination.Item>{1}</Reactpagination.Item>
                  <Reactpagination.Item active>{2}</Reactpagination.Item>
                  <Reactpagination.Item><i className="bi bi-three-dots"></i></Reactpagination.Item>
                  <Reactpagination.Item>{21}</Reactpagination.Item>
                  <Reactpagination.Item><i className="ri-arrow-right-s-line align-middle"></i></Reactpagination.Item>
                </Reactpagination>
              </nav>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[5] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<nav aria-label="Page navigation" className="pagination-style-1">
<Reactpagination className="mb-0 flex-wrap">
<Reactpagination.Item disabled><i className="ri-arrow-left-s-line align-middle"></i></Reactpagination.Item>
<Reactpagination.Item>{1}</Reactpagination.Item>
<Reactpagination.Item active>{2}</Reactpagination.Item>
<Reactpagination.Item><i className="bi bi-three-dots"></i></Reactpagination.Item>
<Reactpagination.Item>{21}</Reactpagination.Item>
<Reactpagination.Item><i className="ri-arrow-right-s-line align-middle"></i></Reactpagination.Item>
</Reactpagination>
</nav>
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
                Pagination Style-2
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(6)}>Show Code<i className={`${isHidden[6] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[6] ? 'd-none' : ''}`}>
              <div className="example">
              <nav aria-label="Page navigation" className="pagination-style-2">
                <Reactpagination className="pagination-style-2 mb-0 flex-wrap">
                  <Reactpagination.Item disabled>Prev</Reactpagination.Item>
                  <Reactpagination.Item active>{1}</Reactpagination.Item>
                  <Reactpagination.Item>{2}</Reactpagination.Item>
                  <Reactpagination.Item><i className="bi bi-three-dots"></i></Reactpagination.Item>
                  <Reactpagination.Item>{17}</Reactpagination.Item>
                  <Reactpagination.Item className='text-primary'>next</Reactpagination.Item>
                </Reactpagination>
              </nav>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[6] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<nav aria-label="Page navigation" className="pagination-style-2">
<Reactpagination className="pagination-style-2 mb-0 flex-wrap">
<Reactpagination.Item disabled>Prev</Reactpagination.Item>
<Reactpagination.Item active>{1}</Reactpagination.Item>
<Reactpagination.Item>{2}</Reactpagination.Item>
<Reactpagination.Item><i className="bi bi-three-dots"></i></Reactpagination.Item>
<Reactpagination.Item>{17}</Reactpagination.Item>
<Reactpagination.Item>next</Reactpagination.Item>
</Reactpagination>
</nav>
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
                Pagination Style-3
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(7)}>Show Code<i className={`${isHidden[7] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[7] ? 'd-none' : ''}`}>
              <div className="example">
              <nav aria-label="Page navigation" className="pagination-style-3">
                <Reactpagination className="pagination-style-3 mb-0 flex-wrap">
                  <Reactpagination.Item disabled>Prev</Reactpagination.Item>
                  <Reactpagination.Item active>{1}</Reactpagination.Item>
                  <Reactpagination.Item>{2}</Reactpagination.Item>
                  <Reactpagination.Item><i className="bi bi-three-dots"></i></Reactpagination.Item>
                  <Reactpagination.Item>{16}</Reactpagination.Item>
                  <Reactpagination.Item className="text-primary">next</Reactpagination.Item>
                </Reactpagination>
              </nav>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[7] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<nav aria-label="Page navigation" className="pagination-style-3">
<Reactpagination className="pagination-style-3 mb-0 flex-wrap">
    <Reactpagination.Item disabled>Prev</Reactpagination.Item>
    <Reactpagination.Item active>{1}</Reactpagination.Item>
    <Reactpagination.Item>{2}</Reactpagination.Item>
    <Reactpagination.Item><i className="bi bi-three-dots"></i></Reactpagination.Item>
    <Reactpagination.Item>{16}</Reactpagination.Item>
    <Reactpagination.Item className="text-primary">next</Reactpagination.Item>
</Reactpagination>
</nav>
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
                Pagination Style-4
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(8)}>Show Code<i className={`${isHidden[8] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[8] ? 'd-none' : ''}`}>
              <div className="example">
              <nav aria-label="Page navigation" className="pagination-style-4">
                <Reactpagination className="pagination-style-4 mb-0 flex-wrap">
                  <Reactpagination.Item disabled>Prev</Reactpagination.Item>
                  <Reactpagination.Item active>{1}</Reactpagination.Item>
                  <Reactpagination.Item>{2}</Reactpagination.Item>
                  <Reactpagination.Item><i className="bi bi-three-dots"></i></Reactpagination.Item>
                  <Reactpagination.Item>{16}</Reactpagination.Item>
                  <Reactpagination.Item>{17}</Reactpagination.Item>
                  <Reactpagination.Item className="text-primary">next</Reactpagination.Item>
                </Reactpagination>
              </nav>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[8] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>
<nav aria-label="Page navigation" className="pagination-style-4">
<Reactpagination className="pagination-style-4 mb-0 flex-wrap">
    <Reactpagination.Item disabled>Prev</Reactpagination.Item>
    <Reactpagination.Item active>{1}</Reactpagination.Item>
    <Reactpagination.Item>{2}</Reactpagination.Item>
    <Reactpagination.Item><i className="bi bi-three-dots"></i></Reactpagination.Item>
    <Reactpagination.Item>{16}</Reactpagination.Item>
    <Reactpagination.Item>{17}</Reactpagination.Item>
    <Reactpagination.Item className="text-primary">next</Reactpagination.Item>
</Reactpagination>
</nav>
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

export default Pagination;