import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Slider } from './Slider';
const StoreDevice = ({state}) => {
  const [deviceId, setDeviceId] = useState('');
  const [ value, setValue ] = React.useState(25);
  const [staticParams, setStaticParams] = useState({
    networkInterface: '',
    hostname: '',
    osArchitecture: '',
    logicalCPU: '',
    osPlatform: '',
    osVersion: '',
    osRelease: '',
  });
  const [dynamicParams, setDynamicParams] = useState({
    availableMemory: 0,
    minAvailableMemory: 0,
    maxAvailableMemory: 0,
    cpuUsage: 0,
    minCpuUsage: 0,
    maxCpuUsage: 0,
  });

  const handleStaticParamChange = (event) => {
    const { name, value } = event.target;
    setStaticParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDynamicParamChange = (event) => {
    const { name, value } = event.target;
    setDynamicParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const storeDevice = (event) => {
    event.preventDefault();
    // Store device logic here
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-4">
        <Col xs={12} md={12}>
          <Form onSubmit={storeDevice}>
            <Card>
              <Card.Body>
                <Card.Title>Static Parameters</Card.Title>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="network_interface">
                      <Form.Label>Network Interface</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter network interface"
                        value={staticParams.networkInterface}
                        onChange={handleStaticParamChange}
                        name="networkInterface"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="host_name">
                      <Form.Label>Host Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter host name"
                        value={staticParams.hostname}
                        onChange={handleStaticParamChange}
                        name="hostname"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="os_architecture">
                      <Form.Label>OS Architecture</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter OS architecture"
                        value={staticParams.osArchitecture}
                        onChange={handleStaticParamChange}
                        name="osArchitecture"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="logical_cpu">
                      <Form.Label>Logical CPU</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter logical CPU"
                        value={staticParams.logicalCPU}
                        onChange={handleStaticParamChange}
                        name="logicalCPU"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="os_platform">
                      <Form.Label>OS Platform</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter OS platform"
                        value={staticParams.osPlatform}
                        onChange={handleStaticParamChange}
                        name="osPlatform"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="os_version">
                      <Form.Label>OS Version</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter OS version"
                        value={staticParams.osVersion}
                        onChange={handleStaticParamChange}
                        name="osVersion"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="os_release">
                      <Form.Label>OS Release</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter OS release"
                        value={staticParams.osRelease}
                        onChange={handleStaticParamChange}
                        name="osRelease"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                 
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Body>
                <Card.Title>Dynamic Parameters</Card.Title>

                <Row>
                  
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="available_memory">
                      <Form.Label>Available Memory</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter available memory"
                        value={dynamicParams.availableMemory}
                        onChange={handleDynamicParamChange}
                        name="availableMemory"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="available_memory">
                      <Form.Label>Available Memory</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter available memory"
                        value={dynamicParams.availableMemory}
                        onChange={handleDynamicParamChange}
                        name="availableMemory"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="min_available_memory">
                      <Form.Label>Minimum Available Memory</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter minimum available memory"
                        value={dynamicParams.minAvailableMemory}
                        onChange={handleDynamicParamChange}
                        name="minAvailableMemory"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="max_available_memory">
                      <Form.Label>Maximum Available Memory</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter maximum available memory"
                        value={dynamicParams.maxAvailableMemory}
                        onChange={handleDynamicParamChange}
                        name="maxAvailableMemory"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="cpu_usage">
                      <Form.Label>CPU Usage</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter CPU usage"
                        value={dynamicParams.cpuUsage}
                        onChange={handleDynamicParamChange}
                        name="cpuUsage"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="min_cpu_usage">
                      <Form.Label>Minimum CPU Usage</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter minimum CPU usage"
                        value={dynamicParams.minCpuUsage}
                        onChange={handleDynamicParamChange}
                        name="minCpuUsage"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="max_cpu_usage">
                      <Form.Label>Maximum CPU Usage</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter maximum CPU usage"
                        value={dynamicParams.maxCpuUsage}
                        onChange={handleDynamicParamChange}
                        name="maxCpuUsage"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>


            <Card className="mt-4">
              <Card.Body>
              <Row>
                  <Col md={12}>
                  <Form.Group as={Row}>
        {/* <Col xs="6">
          <Form.Range 
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </Col> */}
        <Col xs="3">
          <Form.Control value={value} onChange={e => setValue(e.target.value)}/>
        </Col>
        <Col xs="9">
          < Slider/>
        </Col>
      </Form.Group>
                  </Col>
                </Row>
                </Card.Body>
                </Card>


            <Button variant="primary" type="submit" disabled={!state.contract}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      
    </Container>
  );
};

export default StoreDevice;