import { FC, Fragment, useState } from 'react';
import { Button, Card, Col, Row, Toast as Reacttoast, ToastContainer } from 'react-bootstrap';
import { imagesData } from '../../common/commonimages';
import Pageheader from '../../layout/layoutcomponent/pageheader';

interface ComponentProps { }

const Toast: FC<ComponentProps> = () => {

  // **************************************************************************************************************************************************************************

  const toastVariants = ['primary-light', 'secondary-light', 'warning-light', 'info-light', 'success-light', 'danger-light'];

  const [showToast, setShowToast] = useState<any>({});
  const handleClose = (variant: any) => setShowToast({ ...showToast, [variant]: false });
  const handleShow = (variant: any) => setShowToast({ ...showToast, [variant]: true });

  // **************************************************************************************************************************************************************************
  const positions: any = ['top-start', 'top-center', 'top-end', 'middle-start', 'middle-center', 'middle-end', 'bottom-start', 'bottom-center', 'bottom-end'];

  const [showToast1, setShowToast1] = useState<any>({});

  const handleClose1 = (variant: string) => {
    setShowToast1((prevState: any) => ({ ...prevState, [variant]: false }));
  };
  // **************************************************************************************************************************************************************************

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const [show3, setShow3] = useState(true);
  const [show4, setShow4] = useState(true);
  const [show5, setShow5] = useState(true);
  const [show6, setShow6] = useState(true);
  const [show7, setShow7] = useState(true);

  // ***********************************************************************************************************************************************************************************

  const [show8, setShow8] = useState(Array(4).fill(true));

  const handleClose2 = (index: any) => {
    const updatedShow = [...show8];
    updatedShow[index] = !updatedShow[index];
    setShow8(updatedShow);
  };


  const [isHidden, setIsHidden] = useState<boolean[]>([false]);
  const toggleHidden = (index: number) => {
    const updatedHidden = [...isHidden];
    updatedHidden[index] = !updatedHidden[index];
    setIsHidden(updatedHidden);
  };

  return (
    <Fragment>
      <Pageheader title="TOASTS" heading="Elements" active="TOASTS" />

      <Row className="row-sm">
        <Col xl={4}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title"> Live example </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(0)}>Show Code<i className={`${isHidden[0] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[0] ? 'd-none' : ''}`}>
              <div className="example">
                <Button className="btn-wave" onClick={() => setShow(true)}>Show live toast</Button>
                <Reacttoast className='toast-container position-fixed top-0 end-0 me-4 mt-4' onClose={() => setShow(false)} show={show} delay={3000} autohide >
                  <Reacttoast.Header className="text-default mb-0">
                    <img className="bd-placeholder-img rounded me-2" src={imagesData('favicon')} alt="..." />
                    <strong className="me-auto">Nowa</strong>
                    <small>11 mins ago</small>
                  </Reacttoast.Header>
                  <Reacttoast.Body> Hello, world! This is a toast message. </Reacttoast.Body>
                </Reacttoast>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[0] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>

<Button className="btn-wave" onClick={() => setShow(true)}>Show live toast</Button>
<Reacttoast className='toast-container position-fixed top-0 end-0 me-4 mt-4' onClose={() => setShow(false)} show={show} delay={3000} autohide >
    <Reacttoast.Header className="text-default mb-0">
      <img className="bd-placeholder-img rounded me-2" src={imagesData('favicon')} alt="..." />
      <strong className="me-auto">Nowa</strong>
      <small>11 mins ago</small>
    </Reacttoast.Header>
    <Reacttoast.Body> Hello, world! This is a toast message. </Reacttoast.Body>
</Reacttoast>

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
                Basic example
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(2)}>Show Code<i className={`${isHidden[2] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[2] ? 'd-none' : ''}`}>
              <div className="example">
                <Reacttoast show={show1}>
                  <Reacttoast.Header closeButton={false}>
                    <img src={imagesData('favicon')} className="rounded me-2" alt="" />
                    <strong className="me-auto text-dark">Nowa</strong>
                    <small className='text-muted'>11 mins ago</small>
                    <button type="button" className="btn-close" onClick={() => setShow1(!show1)}></button>
                  </Reacttoast.Header>
                  <Reacttoast.Body>Hello, world! This is a toast message.</Reacttoast.Body>
                </Reacttoast>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[2] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>

<Reacttoast show={show1}>
    <Reacttoast.Header onClick={() => setShow1(!show1)}>
      <img src={imagesData('favicon')} className="rounded me-2" alt="" />
      <strong className="me-auto text-dark">Nowa</strong>
      <small className='text-muted'>11 mins ago</small>
    </Reacttoast.Header>
    <Reacttoast.Body>Hello, world! This is a toast message.</Reacttoast.Body>
  </Reacttoast>

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
                Translucent
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(5)}>Show Code<i className={`${isHidden[5] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[5] ? 'd-none' : ''}`}>
              <div className="example">
                <Reacttoast show={show4}>
                  <Reacttoast.Header closeButton={false}>
                    <img src={imagesData('favicon')} className="rounded me-2" alt="" />
                    <strong className="me-auto text-dark">Nowa</strong>
                    <small className="text-muted">11 mins ago</small>
                    <button type="button" className="btn-close" onClick={() => setShow4(!show4)}></button>
                  </Reacttoast.Header>
                  <Reacttoast.Body>Hello, world! This is a toast message.</Reacttoast.Body>
                </Reacttoast>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[5] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`

<Card.Body>

<Reacttoast show={show4}>
  <Reacttoast.Header onClick={() => setShow4(!show4)}>
    <img src={imagesData('favicon')} className="rounded me-2" alt="" />
    <strong className="me-auto text-dark">Nowa</strong>
    <small className="text-muted">11 mins ago</small>
  </Reacttoast.Header>
  <Reacttoast.Body>Hello, world! This is a toast message.</Reacttoast.Body>
</Reacttoast>

</Card.Body>
`}
              </code></pre>
            </div>
          </Card>
        </Col>

      </Row>

      <Row className="row-sm">

        <Col xl={4}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">
                Color schemes
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(1)}>Show Code<i className={`${isHidden[1] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[1] ? 'd-none' : ''}`}>
              <div className="example">
                {['primary', 'secondary', 'success', 'info'].map((color, index) => (
                  <Reacttoast key={index} className={`d-flex text-bg-${color} border-0 fade mb-2`} show={show8[index]}>
                    <Reacttoast.Body>Hello, world! This is a toast message.</Reacttoast.Body>
                    <Button className="btn-close btn-close-white text-white me-2 m-auto" variant="" onClick={() => handleClose2(index)}></Button>
                  </Reacttoast>
                ))}
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[1] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`
<Card.Body>

{['primary', 'secondary', 'success', 'info'].map((color, index) => (
  <Reacttoast key={index} className={\`d-flex text-bg-\${color} border-0 fade mb-4\`} show={show8[index]}>
    <Reacttoast.Body>Hello, world! This is a toast message.</Reacttoast.Body>
    <Button className="btn-close btn-close-white text-white me-2 m-auto" variant="" onClick={() => handleClose2(index)}></Button>
  </Reacttoast>
))}

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
                Stacking
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(3)}>Show Code<i className={`${isHidden[3] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[3] ? 'd-none' : ''}`}>
              <div className="example">
                <ToastContainer className="position-static">
                  <Reacttoast show={show2}>
                    <Reacttoast.Header closeButton={false}>
                      <img src={imagesData('favicon')} className="rounded me-2" alt="" />
                      <strong className="me-auto text-dark">Nowa</strong>
                      <small className="text-muted">just now</small>
                      <button type="button" className="btn-close" onClick={() => setShow2(!show2)}></button>
                    </Reacttoast.Header>
                    <Reacttoast.Body>See? Just like this.</Reacttoast.Body>
                  </Reacttoast>
                  <Reacttoast show={show3}>
                    <Reacttoast.Header closeButton={false}>
                      <img src={imagesData('favicon')} className="rounded me-2" alt="" />
                      <strong className="me-auto text-dark">Nowa</strong>
                      <small className="text-muted">2 seconds ago</small>
                      <button type="button" className="btn-close" onClick={() => setShow3(!show3)}></button>
                    </Reacttoast.Header>
                    <Reacttoast.Body>Heads up, toasts will stack automatically</Reacttoast.Body>
                  </Reacttoast>
                </ToastContainer>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[3] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`

<Card.Body>

<ToastContainer className="position-static">
          <Reacttoast show={show2}>
            <Reacttoast.Header onClick={() => setShow2(!show2)}>
              <img src={imagesData('favicon')} className="rounded me-2" alt="" />
              <strong className="me-auto text-dark">Nowa</strong>
              <small className="text-muted">just now</small>
            </Reacttoast.Header>
            <Reacttoast.Body>See? Just like this.</Reacttoast.Body>
          </Reacttoast>
          <Reacttoast show={show3}>
            <Reacttoast.Header onClick={() => setShow3(!show3)}>
              <img src={imagesData('favicon')} className="rounded me-2" alt="" />
              <strong className="me-auto text-dark">Nowa</strong>
              <small className="text-muted">2 seconds ago</small>
            </Reacttoast.Header>
            <Reacttoast.Body>Heads up, toasts will stack automatically</Reacttoast.Body>
          </Reacttoast>
        </ToastContainer>

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
                Custom content
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(6)}>Show Code<i className={`${isHidden[6] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[6] ? 'd-none' : ''}`}>
              <div className="example">
                <Reacttoast show={show5} className='d-flex fade mb-3'>
                  <Reacttoast.Body>Hello, world! This is a toast message.</Reacttoast.Body>
                  <Button className="btn-close me-2 m-auto" variant='' onClick={() => setShow5(!show5)}> </Button>
                </Reacttoast>
                <div className="my-2"> <span className="text-muted"> Alternatively, you can also add additional controls and components to toasts. </span> </div>
                <Reacttoast show={show6}>
                  <Reacttoast.Body>Hello, world! This is a toast message.
                    <div className="mt-2 pt-2 border-top">
                      <Button size='sm' className="btn-wave me-2">Take action</Button>
                      <Button size='sm' variant='secondary' className="btn-wave" onClick={() => setShow6(!show6)}>Close</Button>
                    </div>
                  </Reacttoast.Body>
                </Reacttoast>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[6] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`

<Card.Body>
<Reacttoast show={show5} className='d-flex fade mb-3'>
    <Reacttoast.Body>Hello, world! This is a toast message.</Reacttoast.Body>
    <Button className="btn-close me-2 m-auto" variant='' onClick={() => setShow5(!show5)}> </Button>
  </Reacttoast>
  <div className="my-2"> <span className="text-muted"> Alternatively, you can also add additional controls and components to toasts. </span> </div>
  <Reacttoast show={show6}>
    <Reacttoast.Body>Hello, world! This is a toast message.
      <div className="mt-2 pt-2 border-top">
        <Button size='sm' className="btn-wave me-2">Take action</Button>
        <Button size='sm' variant='secondary' className="btn-wave" onClick={() => setShow6(!show6)}>Close</Button>
      </div>
    </Toast.Body>
  </Reacttoast>

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
                Color Variants Live
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(7)}>Show Code<i className={`${isHidden[7] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[7] ? 'd-none' : ''}`}>
              <div className="example">
                <div className="btn-list">
                  {toastVariants.map((variant, index) => (
                    <Button key={index} variant={variant} className="me-2 btn-wave" onClick={() => handleShow(variant)}>{variant.replace('-light', '')}</Button>
                  ))}
                  <ToastContainer className='top-0 end-0 p-3' position='top-end' style={{ position: 'fixed' }}>
                    {toastVariants.map((variant, index) => (
                      <Reacttoast key={index} className='colored-toast' bg={`${variant.replace('-light', '')}-transparent`}
                        onClose={() => handleClose(variant)} show={showToast[variant] || false} delay={10000} autohide >
                        <Reacttoast.Header className={`bg-${variant.replace('-light', '')} text-fixed-white`} closeButton={true}>
                          <img src={imagesData('toggledark')} className="rounded me-2" alt="bvcb" />
                          <strong className="me-auto">Nowa</strong>

                        </Reacttoast.Header>
                        <Reacttoast.Body>This is a toast message.</Reacttoast.Body>
                      </Reacttoast>
                    ))}
                  </ToastContainer>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[7] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`

<Card.Body>
<div className="btn-list">
{toastVariants.map((variant, index) => (
  <Button key={index} variant={variant} className="me-2 btn-wave" onClick={() => handleShow(variant)}>{variant.replace('-light', '')}</Button>
))}
<ToastContainer className='top-0 end-0 p-3' position='top-end' style={{ position: 'fixed' }}>
  {toastVariants.map((variant, index) => (
    <Reacttoast key={index} className='colored-toast' bg={\`\${variant.replace('-light', '')}-transparent\`}
      onClose={() => handleClose(variant)} show={showToast[variant] || false} delay={10000} autohide >
      <Reacttoast.Header className={\`bg-\${variant.replace('-light', '')} text-fixed-white\`} closeButton={true}>
        <img src={imagesData('toggledark')} className="rounded me-2" alt="bvcb" />
        <strong className="me-auto">Nowa</strong>

      </Reacttoast.Header>
      <Reacttoast.Body>This is a toast message.</Reacttoast.Body>
    </Reacttoast>
  ))}
</ToastContainer>
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
                Solid Background Toasts
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(8)}>Show Code<i className={`${isHidden[8] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[8] ? 'd-none' : ''}`}>
              <div className="example">
                <div className="btn-list">
                  {toastVariants.map((variant, index) => (
                    <Button key={index} variant={variant.replace('-light', '')} className="me-2 btn-wave" onClick={() => handleShow(variant)}>{variant.replace('-light', '')}</Button>
                  ))}
                  <ToastContainer className='top-0 end-0 p-3' position='top-end' style={{ position: 'fixed' }}>
                    {toastVariants.map((variant, index) => (
                      <Reacttoast key={index} className='colored-toast' bg={`${variant.replace('-light', '')}`}
                        onClose={() => handleClose(variant)} show={showToast[variant] || false} delay={10000} autohide >
                        <Reacttoast.Header className={`bg-${variant.replace('-light', '')} text-fixed-white`} closeButton={true}>
                          <img src={imagesData('toggledark')} className="rounded me-2" alt="toastjhjk" />
                          <strong className="me-auto">Nowa</strong>

                        </Reacttoast.Header>
                        <Reacttoast.Body>This is a toast message.</Reacttoast.Body>
                      </Reacttoast>
                    ))}
                  </ToastContainer>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[8] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`

<Card.Body>
<div className="btn-list">
{toastVariants.map((variant, index) => (
  <Button key={index} variant={variant.replace('-light', '')} className="me-2 btn-wave" onClick={() => handleShow(variant)}>{variant.replace('-light', '')}</Button>
))}
<ToastContainer className='top-0 end-0 p-3' position='top-end' style={{ position: 'fixed' }}>
  {toastVariants.map((variant, index) => (
    <Reacttoast key={index} className='colored-toast' bg={\`\${variant.replace('-light', '')}\`}
      onClose={() => handleClose(variant)} show={showToast[variant] || false} delay={10000} autohide >
      <Reacttoast.Header className={\`bg-\${variant.replace('-light', '')} text-fixed-white\`} closeButton={true}>
        <img src={imagesData('favicon')} className="rounded me-2" alt="toastjhjk" />
        <strong className="me-auto">Nowa</strong>

      </Reacttoast.Header>
      <Reacttoast.Body>This is a toast message.</Reacttoast.Body>
    </Reacttoast>
  ))}
</ToastContainer>
</div>
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
                Toast Placements
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(9)}>Show Code<i className={`${isHidden[9] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[9] ? 'd-none' : ''}`}>
              <div className="example">
                {positions.map((position: any, index: any) => (
                  <Fragment key={index}>
                    <Button variant='outline-primary' className="me-2 my-2 btn-wave" onClick={() => setShowToast1((prevState: any) => ({ ...prevState, [position]: true }))}>
                      {position.includes('start') ? position.replace('start', 'Left').charAt(0).toUpperCase() + position.replace('start', 'Left').slice(1) : position.includes('end') ? position.replace('end', 'Right').charAt(0).toUpperCase() + position.replace('end', 'Right').slice(1) : position.includes('center') ? position.replace('center', 'Center').charAt(0).toUpperCase() + position.replace('center', 'Center').slice(1) : position.charAt(0).toUpperCase() + position.slice(1)}
                    </Button>
                    <ToastContainer key={index} className={`position-${position.replace('-', ' ')} p-3`} position={position} style={{ position: 'fixed' }} >
                      <Reacttoast className="colored-toast" bg='primary-transparent' onClose={() => handleClose1(position)} show={showToast1[position] || false} delay={10000} autohide >
                        <Reacttoast.Header className="bg-primary text-fixed-white" closeButton={true}>
                          <img src={imagesData('toggledark')} className="rounded me-2" alt="bvcb" />
                          <strong className="me-auto">Nowa</strong>

                        </Reacttoast.Header>
                        <Reacttoast.Body>This is a toast message.</Reacttoast.Body>
                      </Reacttoast>
                    </ToastContainer>
                  </Fragment>
                ))}
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[9] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`

<Card.Body>
{positions.map((position: any, index: any) => (
  <Fragment key={index}>
    <Button variant='outline-primary' className="me-2 my-2 btn-wave" onClick={() => setShowToast1((prevState: any) => ({ ...prevState, [position]: true }))}>{position.charAt(0).toUpperCase() + position.slice(1)}</Button>
    <ToastContainer key={index} className={\`position-\${position.replace('-', ' ')}\`} position={position} style={{ position: 'fixed' }} >
      <Reacttoast className="colored-toast" bg='primary-transparent' onClose={() => handleClose1(position)} show={showToast1[position] || false} delay={10000} autohide >
        <Reacttoast.Header className="bg-primary text-fixed-white" closeButton={true}>
          <img src={imagesData('logo4')} className="rounded me-2" alt="bvcb" />
          <strong className="me-auto">Nowa</strong>

        </Reacttoast.Header>
        <Reacttoast.Body>This is a toast message.</Reacttoast.Body>
      </Reacttoast>
    </ToastContainer>
  </Fragment>
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
                Aligning Toast Using Flexbox
              </div>
              <div className="prism-toggle">
                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(10)}>Show Code<i className={`${isHidden[10] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
              </div>
            </Card.Header>
            <Card.Body className={`${isHidden[10] ? 'd-none' : ''}`}>
              <div className="example">
                <div className="bd-example bg-light bd-example-toasts d-flex p-0 px-1">
                  <div aria-live="polite" aria-atomic="true"
                    className="d-flex justify-content-center align-items-center w-100">
                    <Reacttoast show={show7} className=" fade">
                      <Reacttoast.Header className='text-default' closeButton={false}>
                        <img src={imagesData('favicon')} className="rounded me-2" alt="" />
                        <strong className="me-auto">Nowa</strong>
                        <small className="text-muted">11 mins ago</small>
                        <button type="button" className="btn-close" onClick={() => setShow7(!show7)}></button>
                      </Reacttoast.Header>
                      <Reacttoast.Body> Hello, world! This is a toast message.</Reacttoast.Body>
                    </Reacttoast>
                  </div>
                </div>
              </div>
            </Card.Body>
            <div className={`card-footer border-top-0 ${isHidden[10] ? '' : 'd-none'}`}>
              <pre><code className='language-javascript'>
                {`

<Card.Body>
<div className="bd-example bg-dark-transparent bd-example-toasts d-flex p-0 px-1">
    <div aria-live="polite" aria-atomic="true"
      className="d-flex justify-content-center align-items-center w-100">
      <Reacttoast show={show7} className=" fade">
        <Reacttoast.Header className='text-default' onClick={() => setShow7(!show7)} closeButton={true}>
          <img src={imagesData('favicon')} className="rounded me-2" alt="" />
          <strong className="me-auto">Nowa</strong>
          <small className="text-muted">11 mins ago</small>
        </Reacttoast.Header>
        <Reacttoast.Body> Hello, world! This is a toast message.</Reacttoast.Body>
      </Reacttoast>
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

export default Toast;