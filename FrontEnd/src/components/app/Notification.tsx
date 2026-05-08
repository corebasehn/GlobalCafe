import { FC, Fragment } from 'react';
import { SnackbarProvider, closeSnackbar, enqueueSnackbar } from 'notistack';
import { ToastContainer, toast } from 'react-toastify';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { Button, Card, Col, Row } from 'react-bootstrap';

interface ComponentProps { }

const Notification: FC<ComponentProps> = () => {

  const action = (i: any) => (
    <Fragment>
      <Button variant='warning' className='me-2' onClick={() => { alert(`I belong to snackbar with id ${i}`); }}>
        Undo
      </Button>
      <Button variant='danger' onClick={() => { closeSnackbar(i) }}>
        Dismiss
      </Button>
    </Fragment>
  );
  const handleSuccessClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.success('⭐ Hello i am success notification !!', { position: "top-left", theme: "light" });
  };

  const handleErrorClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.error('⭐ Hello i am error notification !!', { position: "top-left", theme: "dark" });
  };

  const handleWarningClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.warning('⭐ Hello i am warning notification !!', { position: "top-left", theme: "colored" });
  };

  const handleAutoCloseClick = () => {
    toast.success('⭐ Hello i will close in 1Sec !!', { position: "top-left", theme: "light", autoClose: 1000 });
  };

  const handleDraggableClick = () => {
    toast.success('⭐ Hello i am dark notification !!', { position: "top-left", theme: "light", draggable: true });
  };

  const handlePromiseClick = () => {
    const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
    toast.promise(resolveAfter3Sec, { pending: 'Promise is pending', success: 'Promise resolved 👌', error: 'Promise rejected 🤯' });
  };


  const handleDefaultClick = () => {
    toast('⭐ Hello i am default notification !!', { position: "top-left" });
  };

  const handleInfoClick = () => {
    toast.info('Hello i am info notification !!', { position: "top-left" });
  };

  const handlesuccessClick = () => {
    toast.success('Hello i am success notification !!', { position: "top-left" });
  };

  const handlewarningClick = () => {
    toast.warning('Hello i am warning notification !!', { position: "top-left" });
  };

  const handleerrorClick = () => {
    toast.error('Hello i am error notification !!', { position: "top-left" });
  };

  return (
    <Fragment>
      <Pageheader title="NOTIFICATIONS" heading="Apps" active="Notifications" />
      <SnackbarProvider maxSnack={3} />
      <ToastContainer />
        <Row>
          <Col xl={6}>
            <Card>
              <Card.Header className='border-bottom'>
                <Card.Title as='h6'>Notistack Notification</Card.Title>
              </Card.Header>
              <Card.Body className='text-center'>
                <div className="btn-list">
                  <Button onClick={() => enqueueSnackbar('Welcome to Nowa !')}>Default Notification</Button>
                  <Button onClick={() => enqueueSnackbar('I can only available for Three times!')}>Maximum 3 of notification</Button>
                  <Button onClick={() => enqueueSnackbar('Your post has been archived', { action, })}>Notistack Action</Button>

                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={6}>
            <Card>
              <Card.Header className='border-bottom'>
                <Card.Title as='h6'>Notistack variant Notification</Card.Title>
              </Card.Header>
              <Card.Body className='text-center'>
                <div className="btn-list">
                  <Button variant='primary' onClick={() => enqueueSnackbar('Hi.. I am default variant', { variant: 'default' })}>Default</Button>
                  <Button variant='danger' onClick={() => enqueueSnackbar('Hi.. I am error variant', { variant: 'error' })}>error </Button>
                  <Button variant='info' onClick={() => enqueueSnackbar('Hi.. I am info variant', { variant: 'info' })}>info</Button>
                  <Button variant='success' onClick={() => enqueueSnackbar('Hi.. I am success variant', { variant: 'success' })}>success</Button>
                  <Button variant='warning' onClick={() => enqueueSnackbar('Hi.. I am warning variant', { variant: 'warning' })}>warning</Button>

                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={12}>
            <Card>
              <Card.Header className='border-bottom'>
                <Card.Title as='h6'>Notistack Positioning Notification</Card.Title>
              </Card.Header>
              <Card.Body className='text-center'>
                <div className="btn-list">
                  <Button variant='primary' onClick={() => enqueueSnackbar('Hi.. I am at top and right corner', { anchorOrigin: { vertical: 'top', horizontal: 'right' } })}>Top</Button>
                  <Button variant='danger' onClick={() => enqueueSnackbar('Hi.. I am at bottom and right corner', { anchorOrigin: { vertical: 'bottom', horizontal: 'right' } })}>Bottom</Button>
                  <Button variant='info' onClick={() => enqueueSnackbar('Hi.. I am at top and left corner', { anchorOrigin: { vertical: 'top', horizontal: 'left' } })}>Left</Button>
                  <Button variant='success' onClick={() => enqueueSnackbar('Hi.. I am at top and right corner', { anchorOrigin: { vertical: 'top', horizontal: 'right' } })}>Right</Button>
                  <Button variant='warning' onClick={() => enqueueSnackbar('Hi.. I am at top and center corner', { anchorOrigin: { vertical: 'top', horizontal: 'center' } })}>Center</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          {/* <Col xl={4}>
            <Card>
              <Card.Header className='border-bottom'>
                <Card.Title as='h6'>React Tostify Positioning Notification</Card.Title>
              </Card.Header>
              <Card.Body className='text-center'>
                <div className="card-content">
                  <div className="btn-list">
                    <Button variant='primary' onClick={(e) => { e.preventDefault(); enqueueSnackbar('Hi.. I am at top and right corner', { anchorOrigin: { vertical: 'top', horizontal: 'right' } }) }}>Top</Button>
                    <Button variant='danger' onClick={(e) => { e.preventDefault(); enqueueSnackbar('Hi.. I am at bottom and right corner', { anchorOrigin: { vertical: 'bottom', horizontal: 'right' } }) }}>Bottom</Button>
                    <Button variant='info' onClick={(e) => { e.preventDefault(); enqueueSnackbar('Hi.. I am at top and left corner', { anchorOrigin: { vertical: 'top', horizontal: 'left' } }) }}>Left</Button>
                    <Button variant='success' onClick={(e) => { e.preventDefault(); enqueueSnackbar('Hi.. I am at top and right corner', { anchorOrigin: { vertical: 'top', horizontal: 'right' } }) }}>Right</Button>
                    <Button variant='warning' onClick={(e) => { e.preventDefault(); enqueueSnackbar('Hi.. I am at top and center corner', { anchorOrigin: { vertical: 'top', horizontal: 'center' } }) }}>Center</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col> */}
          <Col xl={6}>
            <Card>
              <Card.Header className='border-bottom'>
                <Card.Title as='h6'>React Tostify Type Notification</Card.Title>
              </Card.Header>
              <Card.Body className='text-center'>
                <div className="card-content">
                  <div className="btn-list">
                    <Button variant='light' onClick={handleDefaultClick}>Default</Button>
                    <Button variant='info' onClick={handleInfoClick}>Info</Button>
                    <Button variant='success' onClick={handlesuccessClick}>Success</Button>
                    <Button variant='warning' onClick={handlewarningClick}>Warning</Button>
                    <Button variant='danger' onClick={handleerrorClick}>Error</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={6}>
            <Card>
              <Card.Header className='border-bottom'>
                <Card.Title as='h6'>React Tostify Theme Notification</Card.Title>
              </Card.Header>
              <Card.Body className='text-center'>
                <div className="card-content">
                  <div className="btn-list">
                    <Button variant='primary' onClick={handleSuccessClick}>success</Button>
                    <Button variant='primary' onClick={handleErrorClick}>error</Button>
                    <Button variant='primary' onClick={handleWarningClick}>warning</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={12}>
            <Card>
              <Card.Header className='border-bottom'>
                <Card.Title as='h6'>React Tostify Other featured style</Card.Title>
              </Card.Header>
              <Card.Body className='text-center'>
                <div className="card-content">
                  <div className="btn-list">
                    <Button variant='primary' onClick={handleAutoCloseClick}>Auto closed notification</Button>
                    <Button variant='primary' onClick={handleDraggableClick}>Draggable</Button>
                    <Button variant='primary' onClick={handlePromiseClick}>Promises</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </Fragment>
  );
};

export default Notification;