import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { ethers } from "ethers";

const VerifyDevice = ({ state }) => {
  const [deviceId, setDeviceId] = useState("");
  const [networkInterface, setNetworkInterface] = useState("");
  const [hostname, setHostname] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    const staticDevice = {
      networkInterface,
      hostname,
    };

    try {
      const deviceDNA = await state.contract.generateDeviceDNA(
        ethers.utils.formatBytes32String(deviceId),
        staticDevice
      );

      const isVerified = await state.contract.verifyDeviceDNA(
        ethers.utils.formatBytes32String(deviceId),
        deviceDNA
      );

      setVerificationResult(isVerified);
    } catch (error) {
      console.error(error);
      setVerificationResult(null);
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
    } else {
      return null;
    }
  };

  return (
    <div>
      {renderAlert()}
      <Form onSubmit={handleVerify}>
        <Form.Group className="mb-3">
          <Form.Label>Device ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Device ID"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Network Interface</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Network Interface"
            value={networkInterface}
            onChange={(e) => setNetworkInterface(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Hostname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Hostname"
            value={hostname}
            onChange={(e) => setHostname(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Verify
        </Button>
      </Form>

      
    </div>
  );
};

export default VerifyDevice;
