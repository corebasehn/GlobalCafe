import { FC, Fragment } from 'react';
import { Button, Card, Col, Row } from "react-bootstrap";
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { Link } from 'react-router-dom';
import { Widgetsdata1, Widgetsdata2, Widgetsdata3, Widgetsdata4, Widgetsdata5 } from '../../common/commondata';

interface ComponentProps { }

const WidgetNotification: FC<ComponentProps> = () => {
  return (
    <Fragment>

      <Pageheader title="WIDGET NOTIFICATION" heading="Apps" active="Widget notification" />

      <Row className="row-sm">
        {Widgetsdata1.map((idx) => (
          <Col lg={6} md={12} xl={3} key={Math.random()}>
            <Card className="bd-0 mb-2">
              <Card.Body className={`text-${idx.class1} bg-${idx.class1}-transparent br-5 border border-${idx.color} bd bd-${idx.class1}`}>
                <div className="main-error-wrapper">
                  <i className={`si si-${idx.class2} mb-2 fs-50`}></i>
                  <h4 className={`mb-2 text-${idx.color}`}>{idx.title}</h4>
                  <Link className={`btn btn-outline-${idx.class1} btn-sm`} to="#">
                    {idx.text}
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="row-sm">
        {Widgetsdata2.map((idx) => (
          <Col lg={6} md={12} xl={3} key={Math.random()}>

            <Card className="bd-0 mb-2  alert p-0">
              <Card.Header className={`text-${idx.class} fw-bold py-0 d-flex align-items-center`}>
                <i className={`si si-${idx.class1} fs-13 me-1`}></i> {idx.title}
                <Button
                  variant=""
                  aria-label="Close"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  type="button"
                ></Button>
              </Card.Header>
              <Card.Body className={`text-${idx.class} bg-${idx.class}-transparent`}>
                <strong>{idx.text1}</strong> {idx.text2}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="row-sm">
        {Widgetsdata3.map((idx) => (
          <Col lg={6} md={12} xl={3} key={Math.random()}>
            <Card className="bd-0 mb-2">
              <Card.Body className={`border border-${idx.class} text-center rounded`}>
                <div className={`${idx.class}-widget`}>
                  <i className={`si si-${idx.class1} mb-2 fs-50 text-${idx.class}`}></i>
                  <h4 className={`mt-3 text-${idx.class}`}>{idx.title.charAt(0).toUpperCase() + idx.title.slice(1)}</h4>
                  <p className="mt-3 mb-0">
                    {idx.text}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="row-sm">
        {Widgetsdata3.map((idx) => (
          <Col lg={6} md={12} xl={3} key={Math.random()}>

            <Card className="bd-0 mb-2">
              <Card.Body className={`border border-${idx.class} text-center rounded`}>
                <div className={`${idx.class}-widget`}>
                  <h4 className={`text-${idx.title}`}>{idx.title.charAt(0).toUpperCase() + idx.title.slice(1)}</h4>
                  <p className="mt-3 mb-0">
                    {idx.text}
                  </p>
                </div>
              </Card.Body>
            </Card>

          </Col>
        ))}

      </Row>

      <Row className="row-sm">
        {Widgetsdata4.map((idx) => (
          <Col lg={6} md={12} xl={3} key={Math.random()}>
            <Card className={`bd-0 mb-2 bg-${idx.class1}`}>
              <Card.Body className={`text-${idx.class2}`}>
                <div className="main-error-wrapper">
                  <i className={`bi bi-${idx.class}-circle  ${[1, 2, 3, 4].includes(idx.id) ? 'text-fixed-white' : (idx.class2)} mb-2 fs-50`}></i>
                  <h4 className={idx.id === 1 || idx.id === 2 || idx.id === 3 || idx.id === 4 ? 'text-fixed-white' : `text-${idx.class2}` }>{idx.title}</h4>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="row-sm">
        {Widgetsdata5.map((idx) => (
          <Col xl={4} md={6} lg={6} key={Math.random()}>
            <Card className="mb-2 text-center">
              <Card.Body className="h-100">
                <img src={idx.src} alt="" className="wd-35p" />
                <h4 className="mg-b-10 mg-t-15 fs-18">{idx.title}</h4>
                <Link to="#" className="text-muted">
                  {idx.text}
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}

      </Row>
    </Fragment>
  );
};

export default WidgetNotification;
