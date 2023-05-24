import { useState, useEffect } from "react";
import { Container, Table,Row,Col ,Card} from "react-bootstrap";
import { ethers } from "ethers";
import abi from "../contract/DeviceIntegrity.json";

const DisplayDevice = ({ state }) => {
  const [devices, setDevices] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const devicesMessage = async () => {
      const devices = await contract.getDevices();
      setDevices(devices);
    };
    contract && devicesMessage();
  }, [contract]);

  // Create the table headers once
  const tableHeaders = (
    <thead>
      <tr>
        <th>S.No</th>
        <th>Network Interface</th>
        <th>Hostname</th>
        <th>OS Architecture</th>
        <th>Logical CPU</th>
        <th>OS Platform</th>
        <th>OS Version</th>
        <th>OS Release</th>
        <th>Mac Address</th>
        <th>FirmWare Address</th>
        <th>UserPass Phrase</th>
        <th>Device UUID</th>
        {/* <th>Available Memory</th> */}
        <th>Min Available Memory</th>
        <th>Max Available Memory</th>
        {/* <th>CPU Usage</th> */}
        <th>Min CPU Usage</th>
        <th>Max CPU Usage</th>

        <th>Min CPU Percentage </th>
        <th>Max CPU Percentage </th>        

        <th>Min Network BandWidth</th>
        <th>Max Network BandWidth</th>

      </tr>
    </thead>
  );

  const tableBody = (
    <tbody>
      {devices.map((device, index) => {
      console.log(device); // Console log the device object
      return (
        <tr key={device.id}>
          <td>{index}</td>
          <td>{device.staticParams.networkInterface}</td>
          <td>{device.staticParams.hostname}</td>
          <td>{device.staticParams.osArchitecture}</td>
          <td>{device.staticParams.logicalCPU}</td>
          <td>{device.staticParams.osPlatform}</td>
          <td>{device.staticParams.osVersion}</td>
          <td>{device.staticParams.osRelease}</td>
          <td>{device.staticParams.macAddress}</td>
          <td>{device.staticParams.firmwareVersion}</td>
          <td>{device.staticParams.userPassPhrase}</td>
          <td>{device.staticParams.uuID}</td>
          {/* <td>{device.dynamicParams.availableMemory.toString()}</td> Convert BigNumber to string */}
        <td>{device.dynamicParams.minAvailableMemory.toString()}</td> {/* Convert BigNumber to string */}
        <td>{device.dynamicParams.maxAvailableMemory.toString()}</td> {/* Convert BigNumber to string */}
        {/* <td>{device.dynamicParams.cpuUsage.toString()}</td> Convert BigNumber to string */}
        <td>{device.dynamicParams.minCpuUsage.toString()}</td> {/* Convert BigNumber to string */}
        <td>{device.dynamicParams.maxCpuUsage.toString()}</td> {/* Convert BigNumber to string */}

        <td>{device.dynamicParams.minCpuPercentage.toString()}</td> {/* Convert BigNumber to string */}
        <td>{device.dynamicParams.maxCpuPercentage.toString()}</td> {/* Convert BigNumber to string */}

        <td>{device.dynamicParams.minNetworkBandwidth.toString()}</td> {/* Convert BigNumber to string */}
        <td>{device.dynamicParams.maxNetworkBandwidth.toString()}</td> {/* Convert BigNumber to string */}

        </tr>
      );
    })}
      
    </tbody>
  );

  return (
    <Container>

      
      <Row className="justify-content-md-center mt-4">


      <Card.Title>Devices</Card.Title>
      {/* <p style={{ textAlign: "center", marginTop: "20px" }}></p> */}
      </Row>
      <Row className="justify-content-md-center mt-4">
      {/* <div className="table-responsive">
      </div> */}
 <Col xs={12} md={12}>
        <Table striped bordered hover responsive 
        // style="display: flex;"
          // style={{ display: "inline-block" }}
          // size="sm"
        
        >
          {tableHeaders}
          {tableBody}
        </Table>
        </Col>
      </Row>

    </Container>
  );
};

export default DisplayDevice;