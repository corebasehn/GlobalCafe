import { FC, Fragment } from 'react';
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pageheader from '../layout/layoutcomponent/pageheader';

interface ComponentProps { }

const Icons: FC<ComponentProps> = () => {
    return (
        <Fragment>
            <Pageheader title="Icons" heading="Icons" active="Icons" />

            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Bootstrap Icons</div>
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-1">Simply beautiful open source icons. For more info <Link to="https://icons.getbootstrap.com/" target="_blank" className="text-primary">click here</Link>.</p>
                            <p className="mb-4"><code>&lt;i className="bi bi-ICON_NAME"&gt;&lt;/i&gt;</code></p>
                            <ul className="icons-list list-unstyled">
                                <OverlayTrigger overlay={<Tooltip>bi bi-arrow-left-circle</Tooltip>}><li className="icons-list-item"><i className="bi bi-arrow-left-circle"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bi bi-arrows-move</Tooltip>}><li className="icons-list-item"><i className="bi bi-arrows-move"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bi bi-bag</Tooltip>}><li className="icons-list-item"><i className="bi bi-bag"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bi bi-bar-chart-line</Tooltip>}><li className="icons-list-item"><i className="bi bi-bar-chart-line"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bi bi-basket</Tooltip>}><li className="icons-list-item"><i className="bi bi-basket"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bi bi-bell</Tooltip>}><li className="icons-list-item"><i className="bi bi-bell"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bi bi-book</Tooltip>}><li className="icons-list-item"><i className="bi bi-book"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bi bi-box</Tooltip>}><li className="icons-list-item"><i className="bi bi-box"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bi bi-briefcase</Tooltip>}><li className="icons-list-item"><i className="bi bi-briefcase"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bi bi-brightness-high</Tooltip>}><li className="icons-list-item"><i className="bi bi-brightness-high"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bi bi-calendar</Tooltip>}><li className="icons-list-item"><i className="bi bi-calendar"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bi bi-paint-bucket</Tooltip>}><li className="icons-list-item"><i className="bi bi-paint-bucket"></i></li></OverlayTrigger>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Remix Icons</div>
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-1">Simply beautiful open source icons. For more info <Link to="https://remixicon.com/" target="_blank" className="text-primary">click here</Link>.</p>
                            <p className="mb-4"><code>&lt;i className="ri-ICON_NAME"&gt;&lt;/i&gt;</code></p>
                            <ul className="icons-list list-unstyled">
                                <OverlayTrigger overlay={<Tooltip>ri-home-line</Tooltip>}><li className="icons-list-item"><i className="ri-home-line"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ri-mail-line</Tooltip>}><li className="icons-list-item"><i className="ri-mail-line"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ri-briefcase-line</Tooltip>}><li className="icons-list-item"><i className="ri-briefcase-line"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ri-window-line</Tooltip>}><li className="icons-list-item"><i className="ri-window-line"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ri-chat-2-line</Tooltip>}><li className="icons-list-item"><i className="ri-chat-2-line"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ri-chat-settings-line</Tooltip>}><li className="icons-list-item"><i className="ri-chat-settings-line"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ri-edit-line</Tooltip>}><li className="icons-list-item"><i className="ri-edit-line"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ri-layout-line</Tooltip>}><li className="icons-list-item"><i className="ri-layout-line"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ri-code-s-slash-line</Tooltip>}><li className="icons-list-item"><i className="ri-code-s-slash-line"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ri-airplay-line</Tooltip>}><li className="icons-list-item"><i className="ri-airplay-line"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ri-file-line</Tooltip>}><li className="icons-list-item"><i className="ri-file-line"></i></li></OverlayTrigger>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Feather Icons</div>
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-1">Simply beautiful open source icons. For more info <Link to="https://feathericons.com/" target="_blank" className="text-primary">click here</Link>.</p>
                            <p className="mb-4"><code>&lt;i className="fe fe-ICON_NAME"&gt;&lt;/i&gt;</code></p>
                            <ul className="icons-list list-unstyled">
                                <OverlayTrigger overlay={<Tooltip>fe fe-activity</Tooltip>}><li className="icons-list-item"><i className="fe fe-activity"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fe fe-airplay</Tooltip>}><li className="icons-list-item"><i className="fe fe-airplay"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fe fe-alert-circle</Tooltip>}><li className="icons-list-item"><i className="fe fe-alert-circle"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fe fe-alert-triangle</Tooltip>}><li className="icons-list-item"><i className="fe fe-alert-triangle"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fe fe-bar-chart-2</Tooltip>}><li className="icons-list-item"><i className="fe fe-bar-chart-2"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fe fe-bell</Tooltip>}><li className="icons-list-item"><i className="fe fe-bell"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fe fe-camera</Tooltip>}><li className="icons-list-item"><i className="fe fe-camera"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fe fe-copy</Tooltip>}><li className="icons-list-item"><i className="fe fe-copy"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fe fe-eye</Tooltip>}><li className="icons-list-item"><i className="fe fe-eye"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fe fe-file</Tooltip>}><li className="icons-list-item"><i className="fe fe-file"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fe fe-layout</Tooltip>}><li className="icons-list-item"><i className="fe fe-layout"></i></li></OverlayTrigger>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Tabler Icons</div>
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-1">Simply beautiful open source icons. For more info <Link to="https://tabler-icons.io/" target="_blank" className="text-primary">click here</Link>.</p>
                            <p className="mb-4"><code>&lt;i className="ti ti-ICON_NAME"&gt;&lt;/i&gt;</code></p>
                            <ul className="icons-list list-unstyled">
                                <OverlayTrigger overlay={<Tooltip>ti ti-brand-tabler</Tooltip>}><li className="icons-list-item"><i className="ti ti-brand-tabler"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti ti-activity-heartbeat</Tooltip>}><li className="icons-list-item"><i className="ti ti-activity-heartbeat"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti ti-alert-octagon</Tooltip>}><li className="icons-list-item"><i className="ti ti-alert-octagon"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti ti-album</Tooltip>}><li className="icons-list-item"><i className="ti ti-album"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti ti-accessible</Tooltip>}><li className="icons-list-item"><i className="ti ti-accessible"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti ti-antenna-bars-5</Tooltip>}><li className="icons-list-item"><i className="ti ti-antenna-bars-5"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti ti-armchair</Tooltip>}><li className="icons-list-item"><i className="ti ti-armchair"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti ti-arrow-big-right</Tooltip>}><li className="icons-list-item"><i className="ti ti-arrow-big-right"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti ti-arrows-shuffle-2</Tooltip>}><li className="icons-list-item"><i className="ti ti-arrows-shuffle-2"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti ti-backspace</Tooltip>}><li className="icons-list-item"><i className="ti ti-backspace"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti ti-alert-octagon</Tooltip>}><li className="icons-list-item"><i className="ti ti-alert-octagon"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti ti-color-picker</Tooltip>}><li className="icons-list-item"><i className="ti ti-color-picker"></i></li></OverlayTrigger>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Line Awesome Icons</div>
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-1">Simply beautiful open source icons. For more info <Link to="https://icons8.com/line-awesome" target="_blank" className="text-primary">click here</Link>.</p>
                            <p className="mb-4"><code>&lt;i className="las la-ICON_NAME"&gt;&lt;/i&gt;</code></p>
                            <ul className="icons-list list-unstyled">
                                <OverlayTrigger overlay={<Tooltip>las la-bell</Tooltip>}><li className="icons-list-item"><i className="las la-bell"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>las la-exclamation-circle</Tooltip>}><li className="icons-list-item"><i className="las la-exclamation-circle"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>las la-exclamation-triangle</Tooltip>}><li className="icons-list-item"><i className="las la-exclamation-triangle"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>las la-arrow-alt-circle-down</Tooltip>}><li className="icons-list-item"><i className="las la-arrow-alt-circle-down"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>las la-arrow-alt-circle-up</Tooltip>}><li className="icons-list-item"><i className="las la-arrow-alt-circle-up"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>las la-arrow-alt-circle-left</Tooltip>}><li className="icons-list-item"><i className="las la-arrow-alt-circle-left"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>las la-arrow-alt-circle-right</Tooltip>}><li className="icons-list-item"><i className="las la-arrow-alt-circle-right"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>las la-history</Tooltip>}><li className="icons-list-item"><i className="las la-history"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>las la-headphones</Tooltip>}><li className="icons-list-item"><i className="las la-headphones"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>las la-tv</Tooltip>}><li className="icons-list-item"><i className="las la-tv"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>las la-car-side</Tooltip>}><li className="icons-list-item"><i className="las la-car-side"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>las la-envelope</Tooltip>}><li className="icons-list-item"><i className="las la-envelope"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>las la-edit</Tooltip>}><li className="icons-list-item"><i className="las la-edit"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>las la-map</Tooltip>}><li className="icons-list-item"><i className="las la-map"></i></li></OverlayTrigger>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Boxicons</div>
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-1">Simply beautiful open source icons. For more info <Link to="https://boxicons.com/" target="_blank" className="text-primary">click here</Link>.</p>
                            <p className="mb-4"><code>&lt;i className="bx bx-ICON_NAME"&gt;&lt;/i&gt;</code></p>
                            <ul className="icons-list list-unstyled">
                                <OverlayTrigger overlay={<Tooltip>bx bx-home</Tooltip>}><li className="icons-list-item"><i className="bx bx-home"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bx bx-home-alt</Tooltip>}><li className="icons-list-item"><i className="bx bx-home-alt"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bx bx-box</Tooltip>}><li className="icons-list-item"><i className="bx bx-box"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bx bx-medal</Tooltip>}><li className="icons-list-item"><i className="bx bx-medal"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bx bx-file</Tooltip>}><li className="icons-list-item"><i className="bx bx-file"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bx bx-palette</Tooltip>}><li className="icons-list-item"><i className="bx bx-palette"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bx bx-receipt</Tooltip>}><li className="icons-list-item"><i className="bx bx-receipt"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bx bx-table</Tooltip>}><li className="icons-list-item"><i className="bx bx-table"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bx bx-bar-chart-alt</Tooltip>}><li className="icons-list-item"><i className="bx bx-bar-chart-alt"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bx bx-layer</Tooltip>}><li className="icons-list-item"><i className="bx bx-layer"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bx bx-map-alt</Tooltip>}><li className="icons-list-item"><i className="bx bx-map-alt"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bx bx-gift</Tooltip>}><li className="icons-list-item"><i className="bx bx-gift"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bx bx-file-blank</Tooltip>}><li className="icons-list-item"><i className="bx bx-file-blank"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bx bx-lock-alt</Tooltip>}><li className="icons-list-item"><i className="bx bx-lock-alt"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bx bx-error</Tooltip>}><li className="icons-list-item"><i className="bx bx-error"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>bx bx-error-circle</Tooltip>}><li className="icons-list-item"><i className="bx bx-error-circle"></i></li></OverlayTrigger>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Fontawesome Icons</div>
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-1">Simply beautiful open source icons. For more info <Link to="http://fontawesome.io" target="_blank" className="text-primary">click here</Link>.</p>
                            <p className="mb-4"><code>&lt;i className="fa fa-ICON_NAME"&gt;&lt;/i&gt;</code></p>
                            <ul className="icons-list list-unstyled">
                                <OverlayTrigger overlay={<Tooltip>fab fa-500px</Tooltip>}><li className="icons-list-item"><i className="fab fa-500px"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fa fa-address-book</Tooltip>}><li className="icons-list-item"><i className="fa fa-address-book"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>far fa-address-book</Tooltip>}><li className="icons-list-item"><i className="far fa-address-book"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fa fa-address-card</Tooltip>}><li className="icons-list-item"><i className="fa fa-address-card"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>far fa-address-card</Tooltip>}><li className="icons-list-item"><i className="far fa-address-card"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fa fa-adjust</Tooltip>}><li className="icons-list-item"><i className="fa fa-adjust"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fab fa-adn</Tooltip>}><li className="icons-list-item"><i className="fab fa-adn"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fa fa-align-center</Tooltip>}><li className="icons-list-item"><i className="fa fa-align-center"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fa fa-align-justify</Tooltip>}><li className="icons-list-item"><i className="fa fa-align-justify"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fa fa-align-left</Tooltip>}><li className="icons-list-item"><i className="fa fa-align-left"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fa fa-align-right</Tooltip>}><li className="icons-list-item"><i className="fa fa-align-right"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fab fa-amazon</Tooltip>}><li className="icons-list-item"><i className="fab fa-amazon"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fa fa-ambulance</Tooltip>}><li className="icons-list-item"><i className="fa fa-ambulance"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fa fa-american-sign-language-interpreting</Tooltip>}><li className="icons-list-item"><i className="fa fa-american-sign-language-interpreting"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fa fa-anchor</Tooltip>}><li className="icons-list-item"><i className="fa fa-anchor"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>fab fa-android</Tooltip>}><li className="icons-list-item"><i className="fab fa-android"> </i></li></OverlayTrigger>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Materialdesign Icons</div>
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-1">Simply beautiful open source icons. For more info <Link to="https://materialdesignicons.com" target="_blank" className="text-primary">click here</Link>.</p>
                            <p className="mb-4"><code>&lt;i className="mdi mdi-ICON_NAME"&gt;&lt;/i&gt;</code></p>
                            <ul className="icons-list list-unstyled">
                                <OverlayTrigger overlay={<Tooltip>mdi mdi-access-point</Tooltip>}><li className="icons-list-item"><i className="mdi mdi-access-point"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>mdi mdi-access-point-network</Tooltip>}><li className="icons-list-item"><i className="mdi mdi-access-point-network"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>mdi mdi-account</Tooltip>}><li className="icons-list-item"><i className="mdi mdi-account"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>mdi mdi-account-alert</Tooltip>}><li className="icons-list-item"><i className="mdi mdi-account-alert"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>mdi mdi-account-box</Tooltip>}><li className="icons-list-item"><i className="mdi mdi-account-box"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>mdi mdi-account-box-outline</Tooltip>}><li className="icons-list-item"><i className="mdi mdi-account-box-outline"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>mdi mdi-account-card-details</Tooltip>}><li className="icons-list-item"><i className="mdi mdi-account-card-details"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>mdi mdi-account-check</Tooltip>}><li className="icons-list-item"><i className="mdi mdi-account-check"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>mdi mdi-account-circle</Tooltip>}><li className="icons-list-item"><i className="mdi mdi-account-circle"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>mdi mdi-account-convert</Tooltip>}><li className="icons-list-item"><i className="mdi mdi-account-convert"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>mdi mdi-account-edit</Tooltip>}><li className="icons-list-item"><i className="mdi mdi-account-edit"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>mdi mdi-account-key</Tooltip>}><li className="icons-list-item"><i className="mdi mdi-account-key"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>mdi mdi-account-location</Tooltip>}><li className="icons-list-item"><i className="mdi mdi-account-location"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>mdi mdi-account-minus</Tooltip>}><li className="icons-list-item"><i className="mdi mdi-account-minus"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>mdi mdi-account-multiple</Tooltip>}><li className="icons-list-item"><i className="mdi mdi-account-multiple"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>mdi mdi-account-multiple-minus</Tooltip>}><li className="icons-list-item"><i className="mdi mdi-account-multiple-minus"> </i></li></OverlayTrigger>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Simpleline Icons</div>
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-1">Simply beautiful open source icons. For more info <Link to="https://simplelineicons.github.io/" target="_blank" className="text-primary">click here</Link>.</p>
                            <p className="mb-4"><code>&lt;i className="si si-ICON_NAME"&gt;&lt;/i&gt;</code></p>
                            <ul className="icons-list list-unstyled">
                                <OverlayTrigger overlay={<Tooltip>si si-user</Tooltip>}><li className="icons-list-item"><i className="si si-user"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>si si-people</Tooltip>}><li className="icons-list-item"><i className="si si-people"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>si si-user-female</Tooltip>}><li className="icons-list-item"><i className="si si-user-female"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>si si-user-follow</Tooltip>}><li className="icons-list-item"><i className="si si-user-follow"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>si si-user-following</Tooltip>}><li className="icons-list-item"><i className="si si-user-following"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>si si-user-unfollow</Tooltip>}><li className="icons-list-item"><i className="si si-user-unfollow"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>si si-login</Tooltip>}><li className="icons-list-item"><i className="si si-login"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>si si-logout</Tooltip>}><li className="icons-list-item"><i className="si si-logout"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>si si-emotsmile</Tooltip>}><li className="icons-list-item"><i className="si si-emotsmile"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>si si-phone</Tooltip>}><li className="icons-list-item"><i className="si si-phone"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>si si-call-end</Tooltip>}><li className="icons-list-item"><i className="si si-call-end"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>si si-call-in</Tooltip>}><li className="icons-list-item"><i className="si si-call-in"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>si si-call-out</Tooltip>}><li className="icons-list-item"><i className="si si-call-out"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>si si-map</Tooltip>}><li className="icons-list-item"><i className="si si-map"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>si si-location-pin</Tooltip>}><li className="icons-list-item"><i className="si si-location-pin"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>si si-direction</Tooltip>}><li className="icons-list-item"><i className="si si-direction"> </i></li></OverlayTrigger>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Ionic Icons</div>
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-1">Simply beautiful open source icons. For more info <Link to="https://ionicons.com" target="_blank" className="text-primary">click here</Link>.</p>
                            <p className="mb-4"><code>&lt;i className="ion ICON_NAME"&gt;&lt;/i&gt;</code></p>
                            <ul className="icons-list list-unstyled">
                                <OverlayTrigger overlay={<Tooltip>icon ion-md-alarm</Tooltip>}><li className="icons-list-item"><i className="icon ion-md-alarm"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>icon ion-md-chatboxes</Tooltip>}><li className="icons-list-item"><i className="icon ion-md-chatboxes"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>icon ion-md-copy</Tooltip>}><li className="icons-list-item"><i className="icon ion-md-copy"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>icon ion-md-cube</Tooltip>}><li className="icons-list-item"><i className="icon ion-md-cube"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>icon ion-md-filing</Tooltip>}><li className="icons-list-item"><i className="icon ion-md-filing"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>icon ion-md-eye</Tooltip>}><li className="icons-list-item"><i className="icon ion-md-eye"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>icon ion-md-globe</Tooltip>}><li className="icons-list-item"><i className="icon ion-md-globe"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>icon ion-md-images</Tooltip>}><li className="icons-list-item"><i className="icon ion-md-images"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>icon ion-md-laptop</Tooltip>}><li className="icons-list-item"><i className="icon ion-md-laptop"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>icon ion-md-paper</Tooltip>}><li className="icons-list-item"><i className="icon ion-md-paper"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>icon ion-md-paper-plane</Tooltip>}><li className="icons-list-item"><i className="icon ion-md-paper-plane"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>icon ion-md-pricetags</Tooltip>}><li className="icons-list-item"><i className="icon ion-md-pricetags"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>icon ion-ios-settings</Tooltip>}><li className="icons-list-item"><i className="icon ion-ios-settings"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>icon ion-ios-stats</Tooltip>}><li className="icons-list-item"><i className="icon ion-ios-stats"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>icon ion-ios-share-alt</Tooltip>}><li className="icons-list-item"><i className="icon ion-ios-share-alt"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>icon ion-ios-rocket</Tooltip>}><li className="icons-list-item"><i className="icon ion-ios-rocket"> </i></li></OverlayTrigger>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Pe7 Icons</div>
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-1">Simply beautiful open source icons. For more info <Link to="https://themes-pixeden.com/font-demos/7-stroke/" target="_blank" className="text-primary">click here</Link>.</p>
                            <p className="mb-4"><code>&lt;i className="pe-ICON_NAME"&gt;&lt;/i&gt;</code></p>
                            <ul className="icons-list list-unstyled">
                                <OverlayTrigger overlay={<Tooltip>pe-7s-arc</Tooltip>}><li className="icons-list-item"><i className="pe-7s-arc"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>pe-7s-back-2</Tooltip>}><li className="icons-list-item"><i className="pe-7s-back-2"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>pe-7s-bandaid</Tooltip>}><li className="icons-list-item"><i className="pe-7s-bandaid"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>pe-7s-car</Tooltip>}><li className="icons-list-item"><i className="pe-7s-car"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>pe-7s-diamond</Tooltip>}><li className="icons-list-item"><i className="pe-7s-diamond"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>pe-7s-door-lock</Tooltip>}><li className="icons-list-item"><i className="pe-7s-door-lock"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>pe-7s-eyedropper</Tooltip>}><li className="icons-list-item"><i className="pe-7s-eyedropper"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>pe-7s-female</Tooltip>}><li className="icons-list-item"><i className="pe-7s-female"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>pe-7s-gym</Tooltip>}><li className="icons-list-item"><i className="pe-7s-gym"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>pe-7s-hammer</Tooltip>}><li className="icons-list-item"><i className="pe-7s-hammer"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>pe-7s-headphones</Tooltip>}><li className="icons-list-item"><i className="pe-7s-headphones"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>pe-7s-helm</Tooltip>}><li className="icons-list-item"><i className="pe-7s-helm"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>pe-7s-hourglass</Tooltip>}><li className="icons-list-item"><i className="pe-7s-hourglass"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>pe-7s-leaf</Tooltip>}><li className="icons-list-item"><i className="pe-7s-leaf"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>pe-7s-magic-wand</Tooltip>}><li className="icons-list-item"><i className="pe-7s-magic-wand"> </i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>pe-7s-male</Tooltip>}><li className="icons-list-item"><i className="pe-7s-male"> </i></li></OverlayTrigger>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Themify Icons</div>
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-1">Simply beautiful open source icons. For more info <Link to="https://themify.me/themify-icons" target="_blank" className="text-primary">click here</Link>.</p>
                            <p className="mb-4"><code>&lt;i className="ti-ICON_NAME"&gt;&lt;/i&gt;</code></p>
                            <ul className="icons-list list-unstyled">
                                <OverlayTrigger overlay={<Tooltip>ti-arrow-up</Tooltip>}><li className="icons-list-item"><i className="ti-arrow-up"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti-arrow-right</Tooltip>}><li className="icons-list-item"><i className="ti-arrow-right"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti-arrow-left</Tooltip>}><li className="icons-list-item"><i className="ti-arrow-left"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti-arrow-down</Tooltip>}><li className="icons-list-item"><i className="ti-arrow-down"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti-arrows-vertical</Tooltip>}><li className="icons-list-item"><i className="ti-arrows-vertical"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti-arrows-horizontal</Tooltip>}><li className="icons-list-item"><i className="ti-arrows-horizontal"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti-angle-up</Tooltip>}><li className="icons-list-item"><i className="ti-angle-up"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti-angle-right</Tooltip>}><li className="icons-list-item"><i className="ti-angle-right"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti-angle-left</Tooltip>}><li className="icons-list-item"><i className="ti-angle-left"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti-angle-down</Tooltip>}><li className="icons-list-item"><i className="ti-angle-down"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti-angle-double-up</Tooltip>}><li className="icons-list-item"><i className="ti-angle-double-up"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti-angle-double-right</Tooltip>}><li className="icons-list-item"><i className="ti-angle-double-right"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti-angle-double-left</Tooltip>}><li className="icons-list-item"><i className="ti-angle-double-left"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti-angle-double-down</Tooltip>}><li className="icons-list-item"><i className="ti-angle-double-down"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti-move</Tooltip>}><li className="icons-list-item"><i className="ti-move"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>ti-fullscreen</Tooltip>}><li className="icons-list-item"><i className="ti-fullscreen"></i></li></OverlayTrigger>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Typicons Icons</div>
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-1">Simply beautiful open source icons. For more info <Link to="https://www.s-ings.com/typicons/" target="_blank" className="text-primary">click here</Link>.</p>
                            <p className="mb-4"><code>&lt;i className="typcn typcn-ICON_NAME"&gt;&lt;/i&gt;</code></p>
                            <ul className="icons-list list-unstyled">
                                <OverlayTrigger overlay={<Tooltip>typcn typcn-chart-pie-outline</Tooltip>}><li className="icons-list-item"><i className="typcn typcn-chart-pie-outline"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>typcn typcn-chart-pie</Tooltip>}><li className="icons-list-item"><i className="typcn typcn-chart-pie"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>typcn typcn-chevron-left-outline</Tooltip>}><li className="icons-list-item"><i className="typcn typcn-chevron-left-outline"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>typcn typcn-chevron-left</Tooltip>}><li className="icons-list-item"><i className="typcn typcn-chevron-left"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>typcn typcn-chevron-right-outline</Tooltip>}><li className="icons-list-item"><i className="typcn typcn-chevron-right-outline"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>typcn typcn-chevron-right</Tooltip>}><li className="icons-list-item"><i className="typcn typcn-chevron-right"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>typcn typcn-clipboard</Tooltip>}><li className="icons-list-item"><i className="typcn typcn-clipboard"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>typcn typcn-cloud-storage</Tooltip>}><li className="icons-list-item"><i className="typcn typcn-cloud-storage"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>typcn typcn-cloud-storage-outline</Tooltip>}><li className="icons-list-item"><i className="typcn typcn-cloud-storage-outline"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>typcn typcn-code-outline</Tooltip>}><li className="icons-list-item"><i className="typcn typcn-code-outline"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>typcn typcn-code</Tooltip>}><li className="icons-list-item"><i className="typcn typcn-code"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>typcn typcn-coffee</Tooltip>}><li className="icons-list-item"><i className="typcn typcn-coffee"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>typcn typcn-cog-outline</Tooltip>}><li className="icons-list-item"><i className="typcn typcn-cog-outline"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>typcn typcn-cog</Tooltip>}><li className="icons-list-item"><i className="typcn typcn-cog"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>typcn typcn-compass</Tooltip>}><li className="icons-list-item"><i className="typcn typcn-compass"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>typcn typcn-contacts</Tooltip>}><li className="icons-list-item"><i className="typcn typcn-contacts"></i></li></OverlayTrigger>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Weather Icons</div>
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-1">Simply beautiful open source icons. For more info <Link to="https://erikflowers.github.io/weather-icons/" target="_blank" className="text-primary">click here</Link>.</p>
                            <p className="mb-4"><code>&lt;i className="wi wi-ICON_NAME"&gt;&lt;/i&gt;</code></p>
                            <ul className="icons-list list-unstyled">
                                <OverlayTrigger overlay={<Tooltip>wi wi-day-cloudy-high</Tooltip>}><li className="icons-list-item"><i className="wi wi-day-cloudy-high"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>wi wi-moonrise</Tooltip>}><li className="icons-list-item"><i className="wi wi-moonrise"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>wi wi-na</Tooltip>}><li className="icons-list-item"><i className="wi wi-na"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>wi wi-volcano</Tooltip>}><li className="icons-list-item"><i className="wi wi-volcano"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>wi wi-day-light-wind</Tooltip>}><li className="icons-list-item"><i className="wi wi-day-light-wind"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>wi wi-moonset</Tooltip>}><li className="icons-list-item"><i className="wi wi-moonset"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>wi wi-flood</Tooltip>}><li className="icons-list-item"><i className="wi wi-flood"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>wi wi-train</Tooltip>}><li className="icons-list-item"><i className="wi wi-train"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>wi wi-day-sleet</Tooltip>}><li className="icons-list-item"><i className="wi wi-day-sleet"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>wi wi-night-sleet</Tooltip>}><li className="icons-list-item"><i className="wi wi-night-sleet"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>wi wi-sandstorm</Tooltip>}><li className="icons-list-item"><i className="wi wi-sandstorm"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>wi wi-small-craft-advisory</Tooltip>}><li className="icons-list-item"><i className="wi wi-small-craft-advisory"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>wi wi-day-haze</Tooltip>}><li className="icons-list-item"><i className="wi wi-day-haze"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>wi wi-night-alt-sleet</Tooltip>}><li className="icons-list-item"><i className="wi wi-night-alt-sleet"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>wi wi-tsunami</Tooltip>}><li className="icons-list-item"><i className="wi wi-tsunami"></i></li></OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>wi wi-gale-warning</Tooltip>}><li className="icons-list-item"><i className="wi wi-gale-warning"></i></li></OverlayTrigger>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Icons;