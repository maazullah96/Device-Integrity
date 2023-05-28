import React, { useState } from "react"
import { ethers } from "ethers"
import { Button, Table } from "react-bootstrap"
import Form from "react-bootstrap/Form"

const DeviceTable = ({ state }) => {
  const [devices, setDevices] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const data = reader.result
      const parsedData = JSON.parse(data)
      setDevices(parsedData)
    }
    reader.readAsText(file)
  }

  const handleDelete = (deviceId) => {
    setDevices(devices.filter((device) => device.deviceId !== deviceId))
  }

  // const storeDevices = async () => {
  //   setIsLoading(true);
  //   for (const device of devices) {
  //     let device_id_byte = ethers.utils.formatBytes32String(device.deviceId);
  //     console.error(`Contract ==> ${state.contract}`);

  //     let static_device = {
  //       networkInterface: device.staticParams.networkInterface,
  //       hostname: device.staticParams.hostname,
  //     };

  //     if (state.contract && state.contract.storeDevice) {
  //       let transaction = await state.contract.storeDevice(device_id_byte, static_device);
  //       await transaction.wait();
  //       console.log("Transaction is done");
  //     } else {
  //       console.error("Contract or storeDevice function is not available");
  //     }
  //   }
  //   setIsLoading(false);
  // };

  const storeDevices = async () => {
    setIsLoading(true)

    const deviceIds = devices.map((device) =>
      ethers.utils.formatBytes32String(device.deviceId)
    )
    const staticParams = devices.map((device) => device.staticParams)
    const dynamicParams = devices.map((device) => device.dynamicParams)

    if (state.contract && state.contract.storeDevices) {
      let transaction = await state.contract.storeDevices(
        deviceIds,
        staticParams,
        dynamicParams
      )
      await transaction.wait()
      console.log("Transaction is done")
    } else {
      console.error("Contract or storeDevices function is not available")
    }

    setIsLoading(false)
  }

  const handleSubmit = () => {
    if (isLoading) return
    storeDevices()
  }

  return (
    <div>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" onChange={handleUpload} accept=".json" />
      </Form.Group>

      <div style={{ height: "720px", overflowY: "auto" }}>
        <Table striped bordered hover responsive height={500}>
          <thead>
            <tr>
              <th>Device ID</th>
              {/* <th>Network Interface</th> */}
              {/* <th>Hostname</th> */}
              <th>Static Parameters</th>
              <th>Dynamic Parameters</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, index) => (
              <tr key={device.deviceId}>
                <td>{device.deviceId}</td>
                {/* <td>{device.staticParams.networkInterface}</td> */}
                {/* <td>{device.staticParams.hostname}</td> */}
                <td>
                  <Table bordered>
                    <tbody>
                      {Object.entries(device.staticParams).map(
                        ([key, value]) => (
                          <tr key={key}>
                            <td>
                              <p className="font-weight-bold">{key}</p>
                            </td>
                            <td>{value}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </td>
                <td>
                  <Table bordered>
                    <tbody>
                      {Object.entries(device.dynamicParams).map(
                        ([key, value]) => (
                          <tr key={key}>
                            <td>
                              <p className="font-weight-bold">{key}</p>
                            </td>
                            <td>{value}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(device.deviceId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Button variant="primary" disabled={isLoading} onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  )
}

export default DeviceTable
