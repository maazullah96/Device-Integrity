import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { ethers } from "ethers";
import abi from "../contract/DeviceIntegrity.json";
import Card from 'react-bootstrap/Card';
const StoreDevice = ({ state }) => {
  const [deviceId, setDeviceId] = useState("");
  const [networkInterface, setNetworkInterface] = useState("");
  const [hostName, setHostName] = useState("");

  const storeDevice = async (event) => {
    event.preventDefault();
    console.log(deviceId, hostName, networkInterface);
    const device_id_byte = ethers.utils.formatBytes32String(deviceId);

    const static_device = {
      networkInterface: networkInterface,
      hostname: hostName,
    };
    const transaction = await state.contract.storeDevice(device_id_byte, static_device);
    await transaction.wait();
    console.log("Transaction is done");
  };

  return (
    <Container>
      
      <Row className="justify-content-md-center mt-4">
        <Col xs={12} md={9} >
          <Form onSubmit={storeDevice}>
            <Form.Group className="mb-3" controlId="device_id">
              <Form.Label>Device ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter device ID"
                value={deviceId}
                onChange={(event) => setDeviceId(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="network_interface">
              <Form.Label>Network Interface</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter network interface"
                value={networkInterface}
                onChange={(event) => setNetworkInterface(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="host_name">
              <Form.Label>Host Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter host name"
                value={hostName}
                onChange={(event) => setHostName(event.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!state.contract}>
              Pay
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default StoreDevice;
// const StoreDevice = ({ state }) => {
//   const storeDevice = async (event) => {
//     event.preventDefault();
//     const { contract } = state;
//     const device_id = document.querySelector("#device_id").value;
//     const network_interface = document.querySelector("#network_interface").value;
//     const host_name = document.querySelector("#host_name").value;
//     console.log(device_id, host_name, network_interface);
//     // const amount = { value: ethers.utils.parseEther("0.0001") };
//     const device_id_byte=ethers.utils.formatBytes32String(device_id);

//     static_device ={
//       networkInterface: network_interface,
//       hostname: host_name
//     };
//     const transaction = await contract.storeDevice(device_id,static_device);
//     await transaction.wait();
//     console.log("Transaction is done");
//   };
//   return (
//     <>
//       <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
//         <form onSubmit={storeDevice}>
//           <div className="mb-3">
//             <label className="form-label">Device ID</label>
//             <input
//               type="text"
//               className="form-control"
//               id="device_id"
//               placeholder="Enter Your Device ID"
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">NetworkInterface :</label>
//             <input
//               type="text"
//               className="form-control"
//               id="network_interface"
//               placeholder="Enter Your NetworkInterface"
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">HostName:</label>
//             <input
//               type="text"
//               className="form-control"
//               id="host_name"
//               placeholder="Enter Your HostName"
//             />
//           </div>
//           <button
//             type="submit"
//             className="btn btn-primary"
//             disabled={!state.contract}
//           >
//             Pay
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };
// export default StoreDevice;