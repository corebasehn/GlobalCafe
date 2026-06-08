import { Fragment } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { ZoomableGroup, ComposableMap, Geographies, Geography, Marker, Graticule, Line } from "react-simple-maps";
import worldTopo from './world-topo.json';

const Simplemaps = () => {

  const geoUrl = worldTopo;

  function MapChart() {
    return (
      <ComposableMap
        projectionConfig={{ 
          scale: 4000,
          center: [-86.5, 15]
        }}
        className="ht-300 ht-lg-400 mx-auto w-100"
        id="vmap"
      >
        <ZoomableGroup>
          <Graticule stroke="#eee" />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "#6f42c1",
                      outline: "none",
                    },
                    hover: {
                      fill: "#FF5533",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    );
  };

  // Basic markers - Honduras Cities
  const geoUrlBasicmarkers = worldTopo;

  const Basicmarkersdata = [
    { markerOffset: -15, name: "Tegucigalpa", coordinates: [-87.2067, 14.0723] },
    { markerOffset: -15, name: "San Pedro Sula", coordinates: [-88.0250, 15.5042] },
    { markerOffset: 25, name: "La Ceiba", coordinates: [-86.7892, 15.7597] },
    { markerOffset: 25, name: "Choluteca", coordinates: [-87.1833, 13.3000] },
    { markerOffset: 25, name: "Santa Rosa de Copán", coordinates: [-88.7792, 14.7672] },
    { markerOffset: 25, name: "Roatán", coordinates: [-86.5333, 16.3167] }
  ];

  // Custom Markers - Honduras Cities
  const geoUrlCustommarkers = worldTopo;

  const Custommarkersdata = [
    { markerOffset: -30, name: "Tegucigalpa", coordinates: [-87.2067, 14.0723] },
    { markerOffset: 15, name: "San Pedro Sula", coordinates: [-88.0250, 15.5042] },
    { markerOffset: 15, name: "La Ceiba", coordinates: [-86.7892, 15.7597] },
    { markerOffset: 15, name: "Choluteca", coordinates: [-87.1833, 13.3000] }
  ];

  const geoUrl5 = worldTopo;

  return (
    <Fragment>

      <Pageheader title="SIMPLE MAPS" heading="Maps" active="Simple maps" />
      <Row>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header>
              <div className="card-title">Honduras Departments</div>
            </Card.Header>
            <Card.Body>
              <div className="ht-300 ht-lg-400" id="vmap">
                <MapChart />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header>
              <div className="card-title">Honduras: Line Map</div>
            </Card.Header>
            <Card.Body>
              <div className="ht-400 text-center" id="vmap3 ">
                <ComposableMap
                  className="ht-300 text-center w-100"
                  projectionConfig={{
                    scale: 4000,
                    center: [-86.5, 15]
                  }}
                >
                  <Graticule stroke="#DDD" />
                  <Geographies geography={geoUrl5} fill="#6f42c1" stroke="#FFFFFF">
                    {({ geographies }) => geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: {
                            fill: "#6f42c1",
                            outline: "none",
                          },
                          hover: {
                            fill: "#e8e8f7",
                            outline: "none",
                          },
                          pressed: {
                            fill: "#E42",
                            outline: "none",
                          },
                        }}
                      />
                    ))
                    }
                  </Geographies>
                  <Line
                    from={[-87.2067, 14.0723]} // Tegucigalpa
                    to={[-88.0250, 15.5042]} // San Pedro Sula
                    stroke="#FF5533"
                    strokeWidth={4}
                    strokeLinecap="round"
                  />
                </ComposableMap>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header>
              <div className="card-title">Honduras: Basic markers</div>
            </Card.Header>
            <Card.Body>
              <div className="ht-300" id="vmap3 ">
                <ComposableMap
                  className="ht-300 mx-auto w-100"
                  projectionConfig={{
                    scale: 4000,
                    center: [-86.5, 15]
                  }}
                >
                  <Geographies geography={geoUrlBasicmarkers}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="#EAEAEC"
                          stroke="#D6D6DA"
                        />
                      ))
                    }
                  </Geographies>
                  {Basicmarkersdata.map(({ name, coordinates, markerOffset }: any) => (
                    <Marker key={name} coordinates={coordinates}>
                      <circle r={10} fill="#6f42c1" stroke="#fff" strokeWidth={2} />
                      <text
                        textAnchor="middle"
                        y={markerOffset}
                        style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: "10px" }}
                      >
                        {name}
                      </text>
                    </Marker>
                  ))}
                </ComposableMap>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header>
              <div className="card-title">Honduras: Custom markers</div>
            </Card.Header>
            <Card.Body>
              <div className="ht-300" id="vmap2">
                <ComposableMap
                  className="ht-300 mx-auto w-100"
                  projectionConfig={{
                    scale: 4000,
                    center: [-86.5, 15]
                  }}
                >
                  <Geographies geography={geoUrlCustommarkers}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="#EAEAEC"
                          stroke="#D6D6DA"
                        />
                      ))
                    }
                  </Geographies>
                  {Custommarkersdata.map(({ name, coordinates, markerOffset }: any) => (
                    <Marker key={name} coordinates={coordinates}>
                      <g
                        fill="none"
                        stroke="#6f42c1"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="translate(-12, -24)"
                      >
                        <circle cx="12" cy="10" r="3" />
                        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                      </g>
                      <text
                        textAnchor="middle"
                        y={markerOffset}
                        style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: "10px" }}
                      >
                        {name}
                      </text>
                    </Marker>
                  ))}
                </ComposableMap>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header>
              <div className="card-title">Honduras: Graticule</div>
            </Card.Header>
            <Card.Body>
              <div className="ht-300" id="vmap2">
                <ComposableMap
                  projectionConfig={{ 
                    scale: 4000,
                    center: [-86.5, 15]
                  }}
                  className="ht-300 mx-auto w-100"
                  id="vmap2"
                >
                  <Graticule stroke="#ccc" />
                  <Geographies geography={geoUrl} style={{ stroke: "none" }}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          style={{
                            default: {
                              fill: "#6f42c1",
                              outline: "none",
                            },
                            hover: {
                              fill: "#e8e8f7",
                              outline: "none",
                            },
                            pressed: {
                              fill: "#E42",
                              outline: "none",
                            },
                          }}
                        />
                      ))
                    }
                  </Geographies>
                </ComposableMap>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Fragment>
  );
};

export default Simplemaps;
