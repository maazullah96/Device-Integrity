import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { ethers } from "ethers";

const VerifyDevice = ({ state }) => {
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [staticParams, setStaticParams] = useState({
    networkInterface: '',
    hostname: '',
    osArchitecture: '',
    logicalCPU: '',
    osPlatform: '',
    osVersion: '',
    osRelease: '',
    macAddress : '' ,
    firmwareVersion : '' ,
    userPassPhrase : '',
    uuID: ''
  });
  const [dynamicParams, setDynamicParams] = useState({
    availableMemory: 0,
    cpuUsage: 0,
    cpuPercentage: 0,
    networkBandwidth: 0,
  });
  const [deviceId, setDeviceId] = useState('');
  const [error, setError] = useState(null);

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

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setVerificationResult(null);
    setError(null);
  
    try {
      if (!deviceId) {
        setError("Please enter a valid device ID.");
        setIsLoading(false);
        return;
      }
  
      const isVerified = await state.contract.checkDeviceIntegrity(
        ethers.utils.formatBytes32String(deviceId),
        staticParams,
        dynamicParams
      );
  
      setVerificationResult(isVerified);
    }
    catch (error) {
      if (error.reason) {
        // Handle the specific require error reason
        setError(error.reason);
      } else {
        // Handle general error
        setError("An error occurred during verification.");
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
    } else if (error) {
      return (
        <Alert variant="danger">{error}</Alert>
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
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="macAddress">
                      <Form.Label>Mac Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Mac Address"
                        value={staticParams.macAddress}
                        onChange={handleStaticParamChange}
                        name="macAddress"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="uuID">
                      <Form.Label>Device UUID</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter UUID"
                        value={staticParams.uuID}
                        onChange={handleStaticParamChange}
                        name="uuID"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="firmwareVersion">
                      <Form.Label>FirmWare Version</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Firmware Version"
                        value={staticParams.firmwareVersion}
                        onChange={handleStaticParamChange}
                        name="firmwareVersion"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="userPassPhrase">
                      <Form.Label>UserPass Phrase</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter UserPass Phrase"
                        value={staticParams.userPassPhrase}
                        onChange={handleStaticParamChange}
                        name="userPassPhrase"
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


                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="cpu_percentage">
                      <Form.Label>CPU Percentage</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter CPU Percentage"
                        value={dynamicParams.CpuPercentage}
                        onChange={handleDynamicParamChange}
                        name="cpuPercentage"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="network_bandwidth">
                      <Form.Label>Network BandWidth</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Network Bandwidth"
                        value={dynamicParams.networkBandwidth}
                        onChange={handleDynamicParamChange}
                        name="networkBandwidth"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? (
            <div>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="ms-2">Verifying...</span>
            </div>
          ) : (
            "Verify"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default VerifyDevice;