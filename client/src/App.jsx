// import abi from "./contract/DeviceIntegrity.json";
// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import StoreDevice from "./components/StoreDevice";
// import DisplayDevice from "./components/DisplayDevice";
// import "./App.css";


// function App() {
//   const [state, setState] = useState({
//     provider: null,
//     signer: null,
//     contract: null,
//   });
//   const [account, setAccount] = useState("None");
//   const [connected, setConnected] = useState(false);

//   const connectWallet = async (connect) => {
//     const contractAddress = "0x52Fe98A8b20CCB1f7cc1003cdeC3b36D2b2F306D";
//     const contractABI = abi.abi;
//     try {
//       const { ethereum } = window;

//       if (connect) {
//         if (ethereum) {
//           const account = await ethereum.request({
//             method: "eth_requestAccounts",
//           });

//           window.ethereum.on("chainChanged", () => {
//             window.location.reload();
//           });

//           window.ethereum.on("accountsChanged", () => {
//             window.location.reload();
//           });

//           const provider = new ethers.providers.Web3Provider(ethereum);
//           const signer = provider.getSigner();
//           const contract = new ethers.Contract(
//             contractAddress,
//             contractABI,
//             signer
//           );
//           setAccount(account);
//           setState({ provider, signer, contract });
//         } else {
//           alert("Please install metamask");
//         }
//       } else {
//         setState({ provider: null, signer: null, contract: null });
//         setAccount("None");
//         setConnected(false);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   console.log(state);
//   return (
//     <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
//       <p
//         className="text-muted lead "
//         style={{ marginTop: "10px", marginLeft: "5px" }}
//       >
//         <small>Connected Account - {account}</small>
//       </p>
//       <button onClick={() => {
//         setConnected(!connected);
//         connectWallet(!connected);
//       }}>
//         {connected ? "Disconnect" : "Connect with MetaMask"}
//       </button>
//       <div className="container">
//         <StoreDevice state={state} />
//         <DisplayDevice state={state} />
//       </div>
//     </div>
//   );
// }

// export default App;

// import abi from "./contract/DeviceIntegrity.json";
// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import StoreDevice from "./components/StoreDevice";
// import DisplayDevice from "./components/DisplayDevice";
// import { Container, Grid, AppBar, Toolbar, Typography, Button } from "@mui/material";
// import "./App.css";

// function App() {
//   const [state, setState] = useState({
//     provider: null,
//     signer: null,
//     contract: null,
//   });
//   const [account, setAccount] = useState("None");
//   const [connected, setConnected] = useState(false);
  
//   const connectWallet = async (connect) => {
//     const contractAddress = "0x52Fe98A8b20CCB1f7cc1003cdeC3b36D2b2F306D";
//     const contractABI = abi.abi;
//     try {
//       const { ethereum } = window;

//       if (connect) {
//         if (ethereum) {
//           const account = await ethereum.request({
//             method: "eth_requestAccounts",
//           });

//           window.ethereum.on("chainChanged", () => {
//             window.location.reload();
//           });

//           window.ethereum.on("accountsChanged", () => {
//             window.location.reload();
//           });

//           const provider = new ethers.providers.Web3Provider(ethereum);
//           const signer = provider.getSigner();
//           const contract = new ethers.Contract(
//             contractAddress,
//             contractABI,
//             signer
//           );
//           setAccount(account);
//           setState({ provider, signer, contract });
//         } else {
//           alert("Please install metamask");
//         }
//       } else {
//         setState({ provider: null, signer: null, contract: null });
//         setAccount("None");
//         setConnected(false);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     const storedConnected = localStorage.getItem("connected");
//     if (storedConnected === "true") {
//       setConnected(true);
//       connectWallet(true);
//     }
//   }, []);
//   console.log(state);
//   return (
//     <div >
//       <AppBar position="static">
//         <Toolbar>
//           <Grid container justify="flex-start" alignItems="center">
//             <Typography variant="h6" style={{ flexGrow: 1 }}>
//               My App
//             </Typography>
//             <Button color="inherit" onClick={() => {
//               setConnected(!connected);
//               connectWallet(!connected);
//             }}>
//               {connected ? "Disconnect" : "Connect with MetaMask"}
//             </Button>
//           </Grid>
//         </Toolbar>
//       </AppBar>
//       <Container>
//         <StoreDevice state={state} />
//       </Container>
//       <Container>
//         <DisplayDevice state={state} />
//       </Container>
//     </div>
//   );
// }

// export default App;




import abi from "./contract/DeviceIntegrity.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import StoreDevice from "./components/StoreDevice";
import DisplayDevice from "./components/DisplayDevice";
import DeviceTable from "./components/DeviceTable";

import { Navbar, Container, Nav, Button, Row, Col, Alert,Card,NavItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import VerifyDevice from "./components/VerifyDevice";
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  const [connected, setConnected] = useState(false);
  const [activeTab, setActiveTab] = useState("display");

  const handleTabSelect = (eventKey) => {
    setActiveTab(eventKey);
  };
  
  const connectWallet = async (connect) => {
    const contractAddress = "0x52Fe98A8b20CCB1f7cc1003cdeC3b36D2b2F306D";
    const contractAddress_Ganache = "0x7eB91E7CBf7B70DCbe6b7829AEb57ce9976750FB";
    const contractABI = abi.abi;
    try {
      const { ethereum } = window;

      if (connect) {
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
          localStorage.setItem("connected", "true");
        } else {
          alert("Please install metamask");
        }
      } else {

        
        setState({ provider: null, signer: null, contract: null });
        setAccount("None");
        setConnected(false);
        localStorage.removeItem("connected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedConnected = localStorage.getItem("connected");
    if (storedConnected === "true") {
      setConnected(true);
      connectWallet(true);
    }else{
      const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "contractAddress",
        abi.abi,
        signer
      );
      setState({ provider, signer, contract });
      console.log({contract,signer,provider})
    }
  }, []);

  console.log(state);
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>My App</Navbar.Brand>
          <Nav className="me-auto">
            <Button variant="outline-light" onClick={() => {
              setConnected(!connected);
              connectWallet(!connected);
            }}>
              {connected ? "Disconnect" : "Connect with MetaMask"}
            </Button>
          </Nav>
        </Container>
      </Navbar> 

      <Container className="my-5">
      <Card>
        <Card.Header>
          <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabSelect}>
            <NavItem>
              <Nav.Link eventKey="store">Store Device</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link eventKey="display">Display Devices</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link eventKey="upload">Device Data Upload</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link eventKey="verify">Verify Device Data</Nav.Link>
            </NavItem>
          </Nav>
        </Card.Header>
        <Card.Body>
          {activeTab === "store" && <StoreDevice state={state} show={true} />}
          {activeTab === "display" && <DisplayDevice state={state} />}
          {activeTab === "upload" && <DeviceTable state={state} />}
          {activeTab === "verify" && <VerifyDevice state={state} />}
        </Card.Body>
      </Card>
    </Container>
      
    </div>
  );
}

export default App;