import { Fragment, useEffect, useRef, useState } from 'react';
import { Card, Col, Row } from "react-bootstrap";
import { MapContainer, TileLayer, LayersControl, Popup, LayerGroup, Circle, Rectangle, FeatureGroup, Polygon, Pane, SVGOverlay } from "react-leaflet";
import Pageheader from "../../layout/layoutcomponent/pageheader";

const LeafletMaps = () => {

    // pane
    const outer: any = [
      [50.505, -29.09],
      [52.505, 29.09],
  ];
  const inner: any = [
      [49.505, -2.09],
      [53.505, 2.09],
  ];

  function BlinkingPane() {
      const [render, setRender] = useState(true);
      const timerRef: any = useRef();
      useEffect(() => {
          timerRef.current = setInterval(() => {
              setRender((r) => !r);
          }, 5000);
          return () => {
              clearInterval(timerRef.current);
          };
      }, []);

      return render ? (
          <Pane name="cyan-rectangle" style={{ zIndex: 500 }}>
              <Rectangle bounds={outer} pathOptions={{ color: "cyan" }} />
          </Pane>
      ) : null;
  }
  // pane-end
  const position: any = [51.505, -0.09];
  const bounds: any = [
      [51.49, -0.08],
      [51.5, -0.06],
  ];
  const center: any = [51.505, -0.09];
  const rectangle: any = [
      [51.49, -0.08],
      [51.5, -0.06],
  ];
  const multiPolygon: any = [
      [
          [51.51, -0.05],
          [51.53, -0.07],
          [51.51, -0.07],
      ],
  ];

  const fillBlueOptions: any = { fillColor: "blue" };
  const fillRedOptions: any = { fillColor: "red" };
  const greenOptions: any = { color: "black", fillColor: "red" };
  const purpleOptions: any = { color: "black", fillColor: "red" };
  const purpleOptions1: any = { color: "black", fillColor: "black" };

  function MapPlaceholder() {
      return (
          <p>
              Map of London.
              <noscript>You need to enable JavaScript to see this map.</noscript>
          </p>
      );
  }

  return (
    <Fragment>

      <Pageheader title="LEAFLET MAPS" heading="Maps" active="Leaflet maps" />
      <Row>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Leaflet Map</div>
                        </Card.Header>
                        <Card.Body>
                            <MapContainer id="map"
                                center={[51.505, -0.09]}
                                zoom={13}
                                scrollWheelZoom={false}
                                placeholder={<MapPlaceholder />}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </MapContainer>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Map with layers group</div>
                        </Card.Header>
                        <Card.Body>
                            <div className="mapcontainer1">

                                <MapContainer id="map-popup"
                                    center={center}
                                    zoom={13}
                                    scrollWheelZoom={true}
                                >
                                    <LayersControl position="topright">
                                        <LayersControl.BaseLayer
                                            checked
                                            name="OpenStreetMap.Mapnik"
                                        >
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                        </LayersControl.BaseLayer>

                                        <LayersControl.Overlay
                                            checked
                                            name="Layer group with circles"
                                        >
                                            <LayerGroup>
                                                <Circle
                                                    center={center}
                                                    pathOptions={{ fillColor: "blue" }}
                                                    radius={200}
                                                />
                                            </LayerGroup>
                                        </LayersControl.Overlay>
                                        <LayersControl.Overlay name="Feature group">
                                            <FeatureGroup pathOptions={{ color: "black" }}>
                                                <Popup>Popup in FeatureGroup</Popup>
                                                <Rectangle bounds={rectangle} />
                                                <Polygon
                                                    pathOptions={purpleOptions1}
                                                    positions={multiPolygon}
                                                />
                                            </FeatureGroup>
                                        </LayersControl.Overlay>
                                    </LayersControl>
                                </MapContainer>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Map With Popup</div>
                        </Card.Header>
                        <Card.Body>
                            <div className="mapcontainer">
                                <MapContainer id="map"
                                    center={center}
                                    zoom={13}
                                    scrollWheelZoom={true}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <LayerGroup>
                                        <Circle
                                            center={center}
                                            pathOptions={fillBlueOptions}
                                            radius={200}
                                        />
                                        <Circle
                                            center={center}
                                            pathOptions={fillRedOptions}
                                            radius={100}
                                            stroke={false}
                                        />
                                        <LayerGroup>
                                            <Circle
                                                center={[51.51, -0.08]}
                                                pathOptions={greenOptions}
                                                radius={100}
                                            />
                                        </LayerGroup>
                                    </LayerGroup>
                                    <FeatureGroup pathOptions={purpleOptions}>
                                        <Popup>Popup in FeatureGroup</Popup>
                                        <Circle center={[51.51, -0.06]} radius={200} />
                                        <Rectangle bounds={rectangle} />
                                    </FeatureGroup>
                                </MapContainer>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Map with Panes</div>
                        </Card.Header>
                        <Card.Body>
                            <div className="mapcontainer">

                                <MapContainer id="map"
                                    bounds={outer}
                                    scrollWheelZoom={false}
                                    className="panemap"
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <BlinkingPane />
                                    <Pane name="yellow-rectangle" style={{ zIndex: 499 }}>
                                        <Rectangle
                                            bounds={inner}
                                            pathOptions={{ color: "black" }}
                                        />
                                        <Pane name="purple-rectangle">
                                            <Rectangle
                                                bounds={outer}
                                                pathOptions={{ color: "white" }}
                                            />
                                        </Pane>
                                    </Pane>
                                </MapContainer>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Map with Map with SVG Overlay</div>
                        </Card.Header>
                        <Card.Body>
                            <div className="mapcontainer mx-auto">
                                <div>
                                    <MapContainer id="map"
                                        center={position}
                                        zoom={13}
                                        scrollWheelZoom={false}
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <SVGOverlay attributes={{ stroke: "red" }} bounds={bounds}>
                                            <rect
                                                x="0"
                                                y="0"
                                                width="100%"
                                                height="100%"
                                                fill="black"
                                            />
                                            <circle r="10" cx="10" cy="10" fill="white" />
                                            <text x="20%" y="50%" stroke="white">
                                                Selected place
                                            </text>
                                        </SVGOverlay>
                                    </MapContainer>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

    </Fragment>
  );
};

export default LeafletMaps;
