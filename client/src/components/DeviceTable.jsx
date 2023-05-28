import React, { useState } from "react"
import { ethers } from "ethers"
import { Button, Table, Spinner, Alert } from "react-bootstrap"
import Form from "react-bootstrap/Form"

const DeviceTable = ({ state }) => {
  const [devices, setDevices] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false) // New state for submit operation
  const [error, setError] = useState("") // New state for error message

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

  const storeDevices = async () => {
    setSubmitting(true)
    setIsLoading(true)
    setError("") // Clear previous error message

    const deviceIds = devices.map((device) =>
      ethers.utils.formatBytes32String(device.deviceId)
    )
    const staticParams = devices.map((device) => device.staticParams)
    const dynamicParams = devices.map((device) => device.dynamicParams)

    if (state.contract && state.contract.storeDevices) {
      try {
        let transaction = await state.contract.storeDevices(
          deviceIds,
          staticParams,
          dynamicParams
        )
        await transaction.wait()
        console.log("Transaction is done")
      } catch (err) {
        setError("Device ID already exists")
        setIsLoading(false)
        setSubmitting(false)
        return
      }
    } else {
      console.error("Contract or storeDevices function is not available")
    }

    setIsLoading(false)
    setSubmitting(false)
  }

  const handleSubmit = () => {
    if (isLoading || submitting) return
    storeDevices()
  }

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
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

      <Button
        variant="primary"
        disabled={isLoading || submitting}
        onClick={handleSubmit}
      >
        {submitting ? (
          <Spinner animation="border" size="sm" className="mr-2" />
        ) : null}
        Submit
      </Button>
    </div>
  )
}

export default DeviceTable
