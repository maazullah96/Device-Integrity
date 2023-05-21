import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card,Alert,Spinner   } from 'react-bootstrap';
import { ethers } from "ethers";

const VerifyDevice = ({ state }) => {
  const [verificationResult, setVerificationResult] = useState(null);
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
  const [deviceId, setDeviceId] = useState('');

  // const [hostname, setHostname] = useState("");

  const handleDynamicParamChange = (event) => {
    const { name, value } = event.target;
    setDynamicParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStaticParamChange = (event) => {
    const { name, value } = event.target;
    setStaticParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // const [deviceId, setDeviceId] = useState("");
  // const [networkInterface, setNetworkInterface] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const isVerified = await state.contract.checkDeviceIntegrity(
        ethers.utils.formatBytes32String(deviceId),
        staticParams,
        dynamicParams
      );
  
      setVerificationResult(isVerified);
    } catch (error) {
      console.error(error);
      setVerificationResult(null);
    }
    // const staticDevice = {
    //   networkInterface,
    //   hostname,
    // };

    // try {
    //   const deviceDNA = await state.contract.generateDeviceDNA(
    //     ethers.utils.formatBytes32String(deviceId),
    //     staticDevice
    //   );

    //   const isVerified = await state.contract.verifyDeviceDNA(
    //     ethers.utils.formatBytes32String(deviceId),
    //     deviceDNA
    //   );

    //   setVerificationResult(isVerified);
    // } catch (error) {
    //   console.error(error);
    //   setVerificationResult(null);
    // }
  };

  const renderAlert = () => {
    if (verificationResult === true) {
      return (
        <Alert variant="success">Verification successful! Device is verified.</Alert>
      );
    } else if (verificationResult === false) {
      return (
        <Alert variant="danger">Verification failed! Device is not verified.</Alert>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      {renderAlert()}
      <Form onSubmit={handleVerify}>
      <Card>
              <Card.Body>
                <Row>
                <Form.Group className="mb-3" controlId="device_id">
              <Form.Label>Device ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter device ID"
                value={deviceId}
                onChange={(event) => setDeviceId(event.target.value)}
              />
            </Form.Group>
                </Row>
              </Card.Body>
            </Card>

            <Card  className="mt-4">
              <Card.Body>
                <Card.Title>Static Parameters</Card.Title>
                <Row>
                  <Col md={4}>
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
                  <Col md={4}>
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
                  <Col md={4}>
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
                <Col md={3}>
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
                  <Col md={3}>
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
                  <Col md={3}>
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
                  <Col md={3}>
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
                </Row>

              </Card.Body>
            </Card>
        <Button variant="primary" type="submit">
          Verify
        </Button>
      </Form>

      
    </div>
  );
};

export default VerifyDevice;