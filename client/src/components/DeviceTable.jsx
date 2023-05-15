import React, { useState } from "react";
import { ethers } from "ethers";
import { Button, Table } from "react-bootstrap";
import Form from 'react-bootstrap/Form';    
const DeviceTable = ({ state }) => {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      const parsedData = JSON.parse(data);
      setDevices(parsedData);
    };
    reader.readAsText(file);
  };

  const handleDelete = (deviceId) => {
    setDevices(devices.filter((device) => device.deviceId !== deviceId));
  };

  const storeDevices = async () => {
    setIsLoading(true);
    for (const device of devices) {
      let device_id_byte = ethers.utils.formatBytes32String(device.deviceId);
      console.error(`Contract ==> ${state.contract}`);
  
      let static_device = {
        networkInterface: device.networkInterface,
        hostname: device.hostname,
      };
  
      if (state.contract && state.contract.storeDevice) {
        let transaction = await state.contract.storeDevice(device_id_byte, static_device);
        await transaction.wait();
        console.log("Transaction is done");
      } else {
        console.error("Contract or storeDevice function is not available");
      }
    }
    setIsLoading(false);
  };
  

  const handleSubmit = () => {
    if (isLoading) return;
    storeDevices();

  };

  return (
    <div>
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" onChange={handleUpload} accept=".json" />
      </Form.Group>
      {/* <input type="file"  /> */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Device ID</th>
            <th>Network Interface</th>
            <th>Hostname</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.deviceId}>
              <td>{device.deviceId}</td>
              <td>{device.networkInterface}</td>
              <td>{device.hostname}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(device.deviceId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" disabled={isLoading} onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default DeviceTable;