// import { useState, useEffect } from "react";
// const DisplayDevice = ({ state }) => {
//   const [devices, setDevices] = useState([]);
//   const { contract } = state;

//   useEffect(() => {
//     const devicesMessage = async () => {
//       const devices = await contract.getDevices();
//       setDevices(devices);
//     };
//     contract && devicesMessage();
//   }, [contract]);

//   return (
//     <>
//       <p style={{ textAlign: "center", marginTop: "20px" }}>Devices</p>
//       {devices.map((device) => {
//         return (
//           <div
//             className="container-fluid"
//             style={{ width: "100%" }}
//             key={Math.random()}
//           >
//             <table
//               style={{
//                 marginBottom: "10px",
//               }}
//             >
//               <tbody>
//                 <tr>
//                   <td
//                     style={{
//                       backgroundColor: "#96D4D4",
//                       border: "1px solid white",
//                       borderCollapse: "collapse",
//                       padding: "7px",
//                       width: "100px",
//                     }}
//                   >
//                     {device.networkInterface}
//                   </td>
                 
//                   <td
//                     style={{
//                       backgroundColor: "#96D4D4",
//                       border: "1px solid white",
//                       borderCollapse: "collapse",
//                       padding: "7px",
//                       width: "300px",
//                     }}
//                   >
//                     {device.hostname}
//                   </td>
//                   {/* <td
//                     style={{
//                       backgroundColor: "#96D4D4",
//                       border: "1px solid white",
//                       borderCollapse: "collapse",
//                       padding: "7px",
//                       width: "400px",
//                     }}
//                   >
//                     {memo.from}
//                   </td> */}
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         );
//       })}
//     </>
//   );
// };
// export default DisplayDevice;



// import { useState, useEffect } from "react";
// // import { Grid, Table, TableBody,  TableContainer, TableHead,  Paper } from "@mui/material";
// import { Grid, Table, TableBody} from "@mui/material";

// const DisplayDevice = ({ state }) => {
//   const [devices, setDevices] = useState([]);
//   const { contract } = state;

//   useEffect(() => {
//     const devicesMessage = async () => {
//       const devices = await contract.getDevices();
//       setDevices(devices);
//     };
//     contract && devicesMessage();
//   }, [contract]);

  

  
  


//   return (
//     <>
//       <p style={{ textAlign: "center", marginTop: "20px" }}>Devices</p>
//       <Grid container spacing={1}>
//         {devices.map((device) => {
//           return (
//             <Grid item xs={12} md={6} lg={4}>
//               <TableContainer >
//                 <Table  aria-label="simple table">
//                   <TableHead>
//                     <StyledTableRow>
//                       <StyledTableCell>Network Interface</StyledTableCell>
//                       <StyledTableCell align="right">Hostname</StyledTableCell>
//                     </StyledTableRow>
//                   </TableHead>
//                   <TableBody>
//                     <StyledTableRow
//                       key={device.id}
//                       sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                     >
//                       <StyledTableCell component="th" scope="row">
//                         {device.networkInterface}
//                       </StyledTableCell>
//                       <StyledTableCell align="right">{device.hostname}</StyledTableCell>
//                     </StyledTableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </>
//   );
// };

// export default DisplayDevice;

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
        <th>Available Memory</th>
        <th>Min Available Memory</th>
        <th>Max Available Memory</th>
        <th>CPU Usage</th>
        <th>Min CPU Usage</th>
        <th>Max CPU Usage</th>
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
          <td>{device.dynamicParams.availableMemory.toString()}</td> {/* Convert BigNumber to string */}
        <td>{device.dynamicParams.minAvailableMemory.toString()}</td> {/* Convert BigNumber to string */}
        <td>{device.dynamicParams.maxAvailableMemory.toString()}</td> {/* Convert BigNumber to string */}
        <td>{device.dynamicParams.cpuUsage.toString()}</td> {/* Convert BigNumber to string */}
        <td>{device.dynamicParams.minCpuUsage.toString()}</td> {/* Convert BigNumber to string */}
        <td>{device.dynamicParams.maxCpuUsage.toString()}</td> {/* Convert BigNumber to string */}
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