import { FC, Fragment, useState } from 'react';
import { Alert, Button, Card, Col, Row } from 'react-bootstrap';
import {
    AdditionalContent, AlertCard, AlertdiffersizeImage, AlertwithIcon, AlertwithImage, CustomisedAlertwithSVG, DefaultAlert, DefaultAlertsShadow,
    LinkInAlert, OtherContent, OutlineAlert, Outlinetype, RoundedCustomAlert, RoundedDefaultAlert, RoundedOutlinedAlert, RoundedSolidAlert, SolidAlertsShadow, SolidColorAlert
} from '../../common/commondata';
import { Link } from 'react-router-dom';
import Pageheader from '../../layout/layoutcomponent/pageheader';

interface ComponentProps { }

interface AlertItemprops {
    id: number;
}

const Alerts: FC<ComponentProps> = () => {

    //Basic Alert

    const [basicshow, setbasicShow] = useState(true);
    const basichandleClose = () => setbasicShow(false);

    //live alerts

    const [livealerts, setliveAlerts] = useState<AlertItemprops[]>([]);

    const handleShowAlert = () => {
        const newAlert: AlertItemprops = {
            id: new Date().getTime(), // Unique ID for each alert
        };

        setliveAlerts((prevAlerts) => [...prevAlerts, newAlert]);

        // Automatically remove the alert after 5 seconds
        setTimeout(() => {
            setliveAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== newAlert.id));
        }, 5000);
    };

    const handleCloseAlert = (id: number) => {
        setliveAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    };

    //Close alert

    const [closedAlerts, setClosedAlerts] = useState<number[]>([]);

    const closeAlert = (id: number): void => {
        if (!closedAlerts.includes(id)) {
            setClosedAlerts((prevClosedAlerts) => [...prevClosedAlerts, id]);
        }
    };

    const [outline, setOutline] = useState<Outlinetype[]>(OutlineAlert);
    const [solidshadow, setSolidshadow] = useState<Outlinetype[]>(SolidAlertsShadow);
    const [solidalert, setSolidalert] = useState<Outlinetype[]>(SolidColorAlert);
    const [roundedalert, setRoundedalert] = useState<Outlinetype[]>(RoundedSolidAlert);
    const [roundedoutline, setRoundedoutline] = useState<Outlinetype[]>(RoundedOutlinedAlert);
    const [defaultround, setDefaultround] = useState<Outlinetype[]>(RoundedDefaultAlert);
    const [customround, setCustomround] = useState<Outlinetype[]>(RoundedCustomAlert);
    const [customSvg, setCustomSvg] = useState<Outlinetype[]>(CustomisedAlertwithSVG);
    const [alertimg, setAlertimg] = useState<Outlinetype[]>(AlertwithImage);
    const [imgsize, setImgsize] = useState<Outlinetype[]>(AlertdiffersizeImage);
    const [aditional, setAditional] = useState<Outlinetype[]>(AdditionalContent);
    const [otherontent, setOtherContent] = useState<Outlinetype[]>(OtherContent);
    const [otherontent1, setOtherContent1] = useState<Outlinetype[]>(OtherContent);

    const handleClose = (id: number | undefined, arrayType: 'outline' | 'solidshadow' | 'solidcolour' | 'rounded' | 'roundedOutline' | 'defaultrounded' | 'customrounded' | 'customsvg' | 'alertImg' | 'imgdiffer' | 'aditionalcontent' | 'Other' | 'Other1') => {

        let updatedArray: any[];

        if (arrayType === 'outline') {
            updatedArray = outline.filter((alert) => alert.id !== id);
            setOutline(updatedArray);
        } else if (arrayType === 'solidshadow') {
            updatedArray = solidshadow.filter((alert) => alert.id !== id);
            setSolidshadow(updatedArray);
        } else if (arrayType === 'solidcolour') {
            updatedArray = solidalert.filter((alert) => alert.id !== id);
            setSolidalert(updatedArray);
        } else if (arrayType === 'rounded') {
            updatedArray = roundedalert.filter((alert) => alert.id !== id);
            setRoundedalert(updatedArray);
        } else if (arrayType === 'roundedOutline') {
            updatedArray = roundedoutline.filter((alert) => alert.id !== id);
            setRoundedoutline(updatedArray);
        } else if (arrayType === 'defaultrounded') {
            updatedArray = defaultround.filter((alert) => alert.id !== id);
            setDefaultround(updatedArray);
        } else if (arrayType === 'customrounded') {
            updatedArray = customround.filter((alert) => alert.id !== id);
            setCustomround(updatedArray);
        } else if (arrayType === 'customsvg') {
            updatedArray = customSvg.filter((alert) => alert.id !== id);
            setCustomSvg(updatedArray);
        } else if (arrayType === 'alertImg') {
            updatedArray = alertimg.filter((alert) => alert.id !== id);
            setAlertimg(updatedArray);
        } else if (arrayType === 'imgdiffer') {
            updatedArray = imgsize.filter((alert) => alert.id !== id);
            setImgsize(updatedArray);
        } else if (arrayType === 'aditionalcontent') {
            updatedArray = aditional.filter((alert) => alert.id !== id);
            setAditional(updatedArray);
        } else if (arrayType === 'Other') {
            updatedArray = otherontent.filter((alert) => alert.id !== id);
            setOtherContent(updatedArray);
        } else if (arrayType === 'Other1') {
            updatedArray = otherontent1.filter((alert) => alert.id !== id);
            setOtherContent1(updatedArray);
        }
    };

    //Show code

    const [isHidden, setIsHidden] = useState<boolean[]>([false]);
    const toggleHidden = (index: number) => {
        const updatedHidden = [...isHidden];
        updatedHidden[index] = !updatedHidden[index];
        setIsHidden(updatedHidden);
    };

    return (
        <Fragment>
            <Pageheader title="ALERTS" heading="Elements" active="ALERTS" />


            <Row>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header className="justify-content-between">
                            <div className="card-title">
                                Basic Alert
                            </div>
                            <div className="prism-toggle">
                                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(0)}>Show Code<i className={`${isHidden[0] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>

                            </div>
                        </Card.Header>
                        <Card.Body className={`${isHidden[0] ? 'd-none' : ''}`}>
                            <div className='example'>
                                {basicshow && (<Alert variant='warning' className="alert alert-warning alert-dismissible fade show" role="alert" onClick={basichandleClose}>
                                    <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                                    <Button variant='' type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"><i className="bi bi-x"></i></Button>
                                </Alert>)}
                            </div>
                        </Card.Body>
                        <div className={`card-footer ${isHidden[0] ? '' : 'd-none'} border-top-0`}>
                            <pre><code className='language-javascript'>
                                {`
<Card.Body>
{basicshow && (<Alert variant='warning' className="alert alert-warning alert-dismissible fade show" role="alert" onClick={basichandleClose}>
    <strong>Holy guacamole!</strong> You should check in on some of those fields below.
    <Button variant='' type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"><i className="bi bi-x"></i></Button>
</Alert>)}
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
                                Live example
                            </div>
                            <div className="prism-toggle">
                                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(1)}>Show Code<i className={`${isHidden[1] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                            </div>
                        </Card.Header>
                        <Card.Body className={`${isHidden[1] ? 'd-none' : ''}`}>
                            <div className='example'>
                                {livealerts.map((alert) => (
                                    <Alert key={alert.id} variant="success" className="alert alert-primary alert-dismissible fade show" role="alert">
                                        <strong>Nice, </strong> You triggered this alert message!
                                        <Button variant='' type="button" className="btn-close" onClick={() => handleCloseAlert(alert.id)}><i className="bi bi-x"></i></Button>
                                    </Alert>
                                ))}
                                <Button type="button" className='mt-2' onClick={handleShowAlert}> Show live alert </Button>
                            </div>
                        </Card.Body>
                        <div className={`card-footer ${isHidden[1] ? '' : 'd-none'} border-top-0`}>
                            <pre><code className='language-javascript'>
                                {`
 <Card.Body>
 {livealerts.map((alert) => (
     <Alert key={alert.id} variant="success" className="alert alert-primary alert-dismissible fade show" role="alert">
         <strong>Nice, </strong> You triggered this alert message!
         <Button variant='' type="button" className="btn-close" onClick={() => handleCloseAlert(alert.id)}><i className="bi bi-x"></i></Button>
     </Alert>
 ))}
 <Button type="button" className='mt-2' onClick={handleShowAlert}> Show live alert </Button>
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
                                Outline Alerts
                            </div>
                            <div className="prism-toggle">
                                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(2)}>Show Code<i className={`${isHidden[2] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                            </div>
                        </Card.Header>
                        <Card.Body className={`${isHidden[2] ? 'd-none' : ''}`}>
                            <div className='example'>
                                {outline.map((alert, index) => (
                                    <div key={index} className={`alert alert-outline-${alert.type} alert-dismissible fade show`}>
                                        {alert.message}
                                        <button type="button" className={`btn-close ${alert.id == 7 ? 'text-default' : ''}`} onClick={() => handleClose(alert.id ?? -1, 'outline')}>
                                            <i className="bi bi-x"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                        <div className={`card-footer ${isHidden[2] ? '' : 'd-none'} border-top-0`}>
                            <pre><code className='language-javascript'>
                                {`
<Card.Body>
    {outline.map((alert, index) => (
        <div key={index} className={\`alert alert-outline-\${alert.type} alert-dismissible fade show\`}>
            {alert.message}
            <button type="button" className={\`btn-close \${alert.id === 7 ? 'text-default' : ''}\`} onClick={() => handleClose(alert.id ?? -1, 'outline')}>
                <i className="bi bi-x"></i>
            </button>
        </div>
    ))}
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
                                Default alerts
                            </div>
                            <div className="prism-toggle">
                                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(5)}>Show Code<i className={`${isHidden[5] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                            </div>
                        </Card.Header>
                        <Card.Body className={`${isHidden[5] ? 'd-none' : ''}`}>
                            <div className='example'>
                                {DefaultAlert.map((alert, index) => (
                                    <div key={index} className={alert.className} role="alert">
                                        {alert.message}
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                        <div className={`card-footer ${isHidden[5] ? '' : 'd-none'} border-top-0`}>
                            <pre><code className='language-javascript'>
                                {`
<Card.Body>
{DefaultAlertsShadow.map((alert, index) => (
    <div key={index} className={alert.className}>
        {alert.text}
    </div>
))}
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
                                Solid Alerts With Different Shadows
                            </div>
                            <div className="prism-toggle">
                                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(3)}>Show Code<i className={`${isHidden[3] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                            </div>
                        </Card.Header>
                        <Card.Body className={`${isHidden[3] ? 'd-none' : ''}`}>
                            <div className='example'>
                                {solidshadow.map((alert, index) => (
                                    <div key={index} className={alert.className}>
                                        {alert.text}
                                        <button type="button" className="btn-close" onClick={() => handleClose(alert.id ?? -1, 'solidshadow')}>
                                            <i className="bi bi-x"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                        <div className={`card-footer ${isHidden[3] ? '' : 'd-none'} border-top-0`}>
                            <pre><code className='language-javascript'>
                                {`
<Card.Body >
{solidshadow.map((alert, index) => (
    <div key={index} className={alert.className}>
        {alert.text}
        <button type="button" className="btn-close" onClick={() => handleClose(alert.id ?? -1, 'solidshadow')}>
            <i className="bi bi-x"></i>
        </button>
    </div>
))}
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
                                Default Alerts With Different Shadows
                            </div>
                            <div className="prism-toggle">
                                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(4)}>Show Code<i className={`${isHidden[4] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                            </div>
                        </Card.Header>
                        <Card.Body className={`${isHidden[4] ? 'd-none' : ''}`}>
                            <div className='example'>
                                {DefaultAlertsShadow.map((alert, index) => (
                                    <div key={index} className={alert.className}>
                                        {alert.text}
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                        <div className={`card-footer ${isHidden[4] ? '' : 'd-none'} border-top-0`}>
                            <pre><code className='language-javascript'>
                                {`
<Card.Body>
{DefaultAlertsShadow.map((alert, index) => (
    <div key={index} className={alert.className}>
        {alert.text}
    </div>
))}
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
                                Links in alerts
                            </div>
                            <div className="prism-toggle">
                                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(6)}>Show Code<i className={`${isHidden[6] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                            </div>
                        </Card.Header>
                        <Card.Body className={`${isHidden[6] ? 'd-none' : ''}`}>
                            <div className='example'>
                                {LinkInAlert.map((alert, index) => (
                                    <div key={index} className={alert.className} role="alert">
                                        {alert.text} <Link to="#" className="alert-link">{alert.linkText}</Link>. Give it a click if you like.
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                        <div className={`card-footer ${isHidden[6] ? '' : 'd-none'} border-top-0`}>
                            <pre><code className='language-javascript'>
                                {`
 {LinkInAlert.map((alert, index) => (
    <div key={index} className={alert.className} role="alert">
        {alert.text} <Link to="#" className="alert-link">{alert.linkText}</Link>. Give it a click if you like.
    </div>
))}
                `}
                            </code></pre>
                        </div>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header className="justify-content-between">
                            <div className="card-title">
                                Solid Colored Alerts
                            </div>
                            <div className="prism-toggle">
                                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(7)}>Show Code<i className={`${isHidden[7] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                            </div>
                        </Card.Header>
                        <Card.Body className={`${isHidden[7] ? 'd-none' : ''}`}>
                            <div className='example'>

                                {solidalert.map((alert, index) => (
                                    <div key={index} className={`alert alert-solid-${alert.type} alert-dismissible fade show ${alert.className}`}>
                                        {alert.message}
                                        <button type="button" className={`btn-close ${alert.id == 7 ? 'text-default' : ''} ${alert.className}`} onClick={() => handleClose(alert.id ?? -1, 'solidcolour')}>
                                            <i className="bi bi-x"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                        <div className={`card-footer ${isHidden[7] ? '' : 'd-none'} border-top-0`}>
                            <pre><code className='language-javascript'>
                                {`
{solidalert.map((alert, index) => (
    <div key={index} className={\`alert alert-solid-\${alert.type} alert-dismissible fade show \${alert.className}\`}>
        {alert.message}
        <button type="button" className={\`btn-close \${alert.id == 7 ? 'text-default' : ''} \${alert.className}\`} onClick={() => handleClose(alert.id ?? -1, 'solidcolour')}>
            <i className="bi bi-x"></i>
        </button>
    </div>
))}
                `}
                            </code></pre>
                        </div>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header className="justify-content-between">
                            <div className="card-title">
                                Rounded Solid Alerts
                            </div>
                            <div className="prism-toggle">
                                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(8)}>Show Code<i className={`${isHidden[8] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                            </div>
                        </Card.Header>
                        <Card.Body className={`${isHidden[8] ? 'd-none' : ''}`}>
                            <div className='example'>
                                {roundedalert.map((alert, index) => (
                                    <div key={index} className={`alert alert-solid-${alert.type} rounded-pill alert-dismissible fade show`}>
                                        {alert.message}
                                        <button type="button" className="btn-close" onClick={() => handleClose(alert.id ?? -1, 'rounded')}>
                                            <i className="bi bi-x"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                        <div className={`card-footer ${isHidden[8] ? '' : 'd-none'} border-top-0`}>
                            <pre><code className='language-javascript'>
                                {`
{roundedalert.map((alert, index) => (
    <div key={index} className={\`alert alert-solid-\${alert.type} rounded-pill alert-dismissible fade show\`}>
        {alert.message}
        <button type="button" className="btn-close" onClick={() => handleClose(alert.id ?? -1, 'rounded')}>
            <i className="bi bi-x"></i>
        </button>
    </div>
))}
                `}
                            </code></pre>
                        </div>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header className="justify-content-between">
                            <div className="card-title">
                                Rounded Outline Alerts
                            </div>
                            <div className="prism-toggle">
                                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(9)}>Show Code<i className={`${isHidden[9] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                            </div>
                        </Card.Header>
                        <Card.Body className={`${isHidden[9] ? 'd-none' : ''}`}>
                            <div className='example'>
                                {roundedoutline.map((alert, index) => (
                                    <div key={index} className={`alert alert-outline-${alert.type} rounded-pill alert-dismissible fade show`}>
                                        {alert.message}
                                        <button type="button" className="btn-close" onClick={() => handleClose(alert.id ?? -1, 'roundedOutline')}>
                                            <i className="bi bi-x"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                        <div className={`card-footer ${isHidden[9] ? '' : 'd-none'} border-top-0`}>
                            <pre><code className='language-javascript'>
                                {`
{roundedoutline.map((alert, index) => (
    <div key={index} className={\`alert alert-outline-\${alert.type} rounded-pill alert-dismissible fade show\`}>
        {alert.message}
        <button type="button" className="btn-close" onClick={() => handleClose(alert.id ?? -1, 'roundedOutline')}>
            <i className="bi bi-x"></i>
        </button>
    </div>
))}
                `}
                            </code></pre>
                        </div>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header className="justify-content-between">
                            <div className="card-title">
                                Rounded Default Alerts
                            </div>
                            <div className="prism-toggle">
                                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(10)}>Show Code<i className={`${isHidden[10] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                            </div>
                        </Card.Header>
                        <Card.Body className={`${isHidden[10] ? 'd-none' : ''}`}>
                            <div className='example'>
                                {defaultround.map((alert, index) => (
                                    <div key={index} className={`alert alert-${alert.type} rounded-pill alert-dismissible fade show`}>
                                        {alert.message}
                                        <button type="button" className="btn-close" onClick={() => handleClose(alert.id ?? -1, 'defaultrounded')}><i className="bi bi-x"></i></button>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                        <div className={`card-footer ${isHidden[10] ? '' : 'd-none'} border-top-0`}>
                            <pre><code className='language-javascript'>
                                {`
{defaultround.map((alert, index) => (
    <div key={index} className={\`alert alert-\${alert.type} rounded-pill alert-dismissible fade show\`}>
        {alert.message}
        <button type="button" className="btn-close" onClick={() => handleClose(alert.id ?? -1, 'defaultrounded')}><i className="bi bi-x"></i></button>
    </div>
))}
                `}
                            </code></pre>
                        </div>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header className="justify-content-between">
                            <div className="card-title">
                                Rounded Alerts With Custom Close Button
                            </div>
                            <div className="prism-toggle">
                                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(11)}>Show Code<i className={`${isHidden[11] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                            </div>
                        </Card.Header>
                        <Card.Body className={`${isHidden[11] ? 'd-none' : ''}`}>
                            <div className='example'>
                                {customround.map((alert, index) => (
                                    <div key={index} className={alert.className}>
                                        {alert.message}
                                        <button type="button" className="btn-close custom-close" onClick={() => handleClose(alert.id ?? -1, 'customrounded')}>
                                            <i className="bi bi-x"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                        <div className={`card-footer ${isHidden[11] ? '' : 'd-none'} border-top-0`}>
                            <pre><code className='language-javascript'>
                                {`
{customround.map((alert, index) => (
    <div key={index} className={alert.className}>
        {alert.message}
        <button type="button" className="btn-close custom-close" onClick={() => handleClose(alert.id ?? -1, 'customrounded')}>
            <i className="bi bi-x"></i>
        </button>
    </div>
))}
                `}
                            </code></pre>
                        </div>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header className="justify-content-between">
                            <div className="card-title">
                                Customized Alerts With SVG's
                            </div>
                            <div className="prism-toggle">
                                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(12)}>Show Code<i className={`${isHidden[12] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                            </div>
                        </Card.Header>
                        <Card.Body className={`${isHidden[12] ? 'd-none' : ''}`}>
                            <div className='example'>
                                {customSvg.map((alert, index) => (
                                    <div key={index} className={`alert svg-${alert.type} alert-${alert.type} alert-dismissible fade show custom-alert-icon shadow-sm`} role="alert">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 24 24" width="1.5rem" fill="#000000">
                                            <path d={alert.icon} />
                                        </svg>
                                        {alert.text}
                                        <button type="button" className="btn-close" onClick={() => handleClose(alert.id ?? -1, 'customsvg')}><i className="bi bi-x"></i></button>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                        <div className={`card-footer ${isHidden[12] ? '' : 'd-none'} border-top-0`}>
                            <pre><code className='language-javascript'>
                                {`
{customSvg.map((alert, index) => (
    <div key={index} className={\`alert svg-\${alert.type} alert-\${alert.type} alert-dismissible fade show custom-alert-icon shadow-sm\`} role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 24 24" width="1.5rem" fill="#000000">
            <path d={alert.icon} />
        </svg>
        {alert.text}
        <button type="button" className="btn-close" onClick={() => handleClose(alert.id ?? -1, 'customsvg')}><i className="bi bi-x"></i></button>
    </div>
))}
                `}
                            </code></pre>
                        </div>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header className="justify-content-between">
                            <div className="card-title">
                                Alerts with icons
                            </div>
                            <div className="prism-toggle">
                                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(13)}>Show Code<i className={`${isHidden[13] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                            </div>
                        </Card.Header>
                        <Card.Body className={`${isHidden[13] ? 'd-none' : ''}`}>
                            <div className='example'>
                                {AlertwithIcon.map((alert, index) => (
                                    <div key={index} className={`alert alert-${alert.type} svg-${alert.type} d-flex align-items-center`} role="alert">
                                        {alert.icon}
                                        <div>{alert.message}</div>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                        <div className={`card-footer ${isHidden[13] ? '' : 'd-none'} border-top-0`}>
                            <pre><code className='language-javascript'>
                                {`
{AlertwithIcon.map((alert, index) => (
    <div key={index} className={\`alert alert-\${alert.type} svg-\${alert.type} d-flex align-items-center\`} role="alert">
        {alert.icon}
        <div>{alert.message}</div>
    </div>
))}
                `}
                            </code></pre>
                        </div>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header className="justify-content-between">
                            <div className="card-title">
                                Alerts With Images
                            </div>
                            <div className="prism-toggle">
                                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(14)}>Show Code<i className={`${isHidden[14] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                            </div>
                        </Card.Header>
                        <Card.Body className={`${isHidden[14] ? 'd-none' : ''}`}>
                            <div className='example'>
                                {alertimg.map((alert, index) => (
                                    <div key={index} className={`alert alert-img alert-${alert.type} alert-dismissible fase show rounded-pill flex-wrap`} role="alert">
                                        <div className="avatar avatar-sm me-3 avatar-rounded">
                                            <img src={alert.imgSrc} alt="img" />
                                        </div>
                                        <div>{alert.message}</div>
                                        <button type="button" className="btn-close" onClick={() => handleClose(alert.id ?? -1, 'alertImg')}><i className={`bi bi-x${alert.type === 'dark' ? ' text-muted' : ''}`}></i></button>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                        <div className={`card-footer ${isHidden[14] ? '' : 'd-none'} border-top-0`}>
                            <pre><code className='language-javascript'>
                                {`
{alertimg.map((alert, index) => (
    <div key={index} className={\`alert alert-img alert-\${alert.type} alert-dismissible fase show rounded-pill flex-wrap\`} role="alert">
        <div className="avatar avatar-sm me-3 avatar-rounded">
            <img src={alert.imgSrc} alt="img" />
        </div>
        <div>{alert.message}</div>
        <button type="button" className="btn-close" onClick={() => handleClose(alert.id ?? -1, 'alertImg')}><i className={\`bi bi-x\${alert.type === 'dark' ? ' text-muted' : ''}\`}></i></button>
    </div>
))}
                `}
                            </code></pre>
                        </div>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header className="justify-content-between">
                            <div className="card-title">
                                Alerts With Different size Images
                            </div>
                            <div className="prism-toggle">
                                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(15)}>Show Code<i className={`${isHidden[15] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                            </div>
                        </Card.Header>
                        <Card.Body className={`${isHidden[15] ? 'd-none' : ''}`}>
                            <div className='example'>
                                {imgsize.map((alert, index) => (
                                    <div key={index} className={alert.className} role="alert">
                                        <div className={alert.avatarClass}>
                                            <img src={alert.imgSrc} alt="img" />
                                        </div>
                                        <div>{alert.message}</div>
                                        <button type="button" className="btn-close" onClick={() => handleClose(alert.id ?? -1, 'imgdiffer')}>
                                            <i className={index === imgsize.length - 1 ? "bi bi-x text-muted" : "bi bi-x"}></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                        <div className={`card-footer ${isHidden[15] ? '' : 'd-none'} border-top-0`}>
                            <pre><code className='language-javascript'>
                                {`
 {imgsize.map((alert, index) => (
    <div key={index} className={alert.className} role="alert">
        <div className={alert.avatarClass}>
            <img src={alert.imgSrc} alt="img" />
        </div>
        <div>{alert.message}</div>
        <button type="button" className="btn-close" onClick={() => handleClose(alert.id ?? -1, 'imgdiffer')}>
            <i className={index === imgsize.length - 1 ? "bi bi-x text-muted" : "bi bi-x"}></i>
        </button>
    </div>
))}
                `}
                            </code></pre>
                        </div>
                    </Card>
                </Col>

                <Col xl={12}>
                    <Row>
                        {AlertCard.map((idx) => (
                            <Col xxl={3} xl={6} lg={6} md={6} sm={6} key={idx.id}>
                                {!closedAlerts.includes(idx.id) && (
                                    <Card className="bg-white border-0">
                                        <Alert className={`custom-alert1`} variant={idx.color}>
                                            <button type="button" className="btn-close ms-auto" onClick={() => closeAlert(idx.id)} data-bs-dismiss="alert" aria-label="Close">
                                                <i className="bi bi-x"></i>
                                            </button>
                                            <div className={`text-center px-5 pb-0 svg-${idx.color}`}>
                                                {idx.icon}
                                                <h5>{idx.heading}</h5>
                                                <p className="">
                                                    {idx.id === 1 ? 'This alert is created to just show the related information.' :
                                                        idx.id === 2 ? 'This alert is created to just show the confirmation message.' :
                                                            idx.id === 3 ? 'This alert is created to just show the warning message.' :
                                                                idx.id === 4 ? 'This alert is created to just show the danger message.' :
                                                                    'Unknown message'
                                                    }
                                                </p>
                                                {idx.Element}
                                            </div>
                                        </Alert>
                                    </Card>
                                )}
                            </Col>
                        ))}
                    </Row>
                </Col>

                <Col xl={12}>
                    <Row>
                        {otherontent1.map((alert, index) => (
                            <Col key={index} xl={3}>
                                <Card className='border-0'>
                                    <Alert variant={alert.type} className={`border border-${alert.type} mb-0 p-2`}>
                                        <div className='d-flex align-items-start'>
                                            <div className={`me-2 svg-${alert.type}`}>
                                                {alert.icon}
                                            </div>
                                            <div className={`text-${alert.type} w-100`}>
                                                <div className="fw-medium d-flex justify-content-between">{alert.title}
                                                    <button type="button" className="btn-close p-0" onClick={() => handleClose(alert.id ?? -1, 'Other1')}><i className="bi bi-x"></i></button></div>
                                                <div className="fs-12 op-8 mb-1">{alert.message}</div>
                                                <div className="fs-12 d-inline-flex">
                                                    <Link to="#" className={`text-${alert.title === 'Information Alert' ? 'success' : alert.title === 'Success Alert' ? 'danger' : alert.title === 'Warning Alert' ? 'dark' : alert.title === 'Danger Alert' ? 'info' : 'secondary'} fw-medium me-2 d-inline-block`}>cancel</Link>
                                                    <Link to="#" className={`text-${alert.type} fw-medium`}>open</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Alert>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>

                <Col xl={12}>
                    <Row>
                        {otherontent.map((alert, index) => (
                            <Col key={index} xl={3}>
                                <Card className='border-0'>
                                    <Alert className={`alert-solid-${alert.type} border border-${alert.type} mb-0 p-2`}>
                                        <div className='d-flex align-items-start'>
                                            <div className="me-2 svg-white">
                                                {alert.icon}
                                            </div>
                                            <div className="text-fixed-white w-100">
                                                <div className="fw-medium d-flex justify-content-between">{alert.title}
                                                    <button type="button" className="btn-close p-0" onClick={() => handleClose(alert.id ?? -1, 'Other')}><i className="bi bi-x"></i></button></div>
                                                <div className="fs-12 op-8 mb-1">{alert.message}</div>
                                                <div className="fs-12 d-inline-flex">
                                                    {alert.buttons && alert.buttons.map((button, buttonIndex) => (
                                                        <Link key={buttonIndex} to={button.action} className="text-fixed-white fw-medium me-2">{button.label}</Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Alert>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>

                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header className="justify-content-between">
                            <div className="card-title">
                                Additional content
                            </div>
                            <div className="prism-toggle">
                                <button className="btn btn-sm btn-primary-light" onClick={() => toggleHidden(16)}>Show Code<i className={`${isHidden[16] ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 d-inline-block align-middle fs-14 `}></i></button>
                            </div>
                        </Card.Header>
                        <Card.Body className={`${isHidden[16] ? 'd-none' : ''}`}>
                            <div className='example'>
                                <Row className="gy-3">
                                    {aditional.map((alert, index) => (
                                        <Col xl={6} key={index}>
                                            <div className={`alert alert-${alert.type} overflow-hidden p-0`} role="alert">
                                                <div className={`p-3 ${alert.color} text-fixed-white d-flex justify-content-between`}>
                                                    <h6 className="alert-heading mb-0 text-fixed-white">{alert.message}</h6>
                                                    <button type="button" className="btn-close p-0 text-fixed-white" onClick={() => handleClose(alert.id ?? -1, 'aditionalcontent')}>
                                                        <i className="bi bi-x"></i>
                                                    </button>
                                                </div>
                                                <hr className="my-0" />
                                                <div className="p-3">
                                                    <p className="mb-0">We appreciate you to let us know the bug in the template and for warning us about future consequences <Link to="#" className="fw-medium text-decoration-underline">Visit for support for queries ?</Link></p>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </Card.Body>
                        <div className={`card-footer ${isHidden[16] ? '' : 'd-none'} border-top-0`}>
                            <pre><code className='language-javascript'>
                                {`
  {aditional.map((alert, index) => (
    <Col xl={6} key={index}>
        <div className={\`alert alert-\${alert.type} overflow-hidden p-0\`} role="alert">
            <div className={\`p-3 \${alert.color} text-fixed-white d-flex justify-content-between\`}>
                <h6 className="alert-heading mb-0 text-fixed-white">{alert.message}</h6>
                <button type="button" className="btn-close p-0 text-fixed-white" onClick={() => handleClose(alert.id ?? -1, 'aditionalcontent')}>
                    <i className="bi bi-x"></i>
                </button>
            </div>
            <hr className="my-0" />
            <div className="p-3">
                <p className="mb-0">We appreciate you to let us know the bug in the template and for warning us about future consequences <Link to="#" className="fw-medium text-decoration-underline">Visit for support for queries ?</Link></p>
            </div>
        </div>
    </Col>
))}
                `}
                            </code></pre>
                        </div>
                    </Card>
                </Col>

            </Row>
        </Fragment >
    );
};

export default Alerts;