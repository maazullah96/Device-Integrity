// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const hre = require("hardhat");


// async function deployDeviceIntegrityContract() {
//   const DeviceIntegrityContract = await ethers.getContractFactory(
//       "DeviceIntegrity"
//   );
//   const deviceIntegrity = await DeviceIntegrityContract.deploy();
//   console.log(
//       "DeviceIntegrity contract deployed to:",
//       deviceIntegrity.address
//   );
//   return deviceIntegrity;
// }

// async function iterateStaticDevices(deviceIntegrity) {
//   console.log("Iterating over staticDevices...");
//   const staticDevicesCount = await deviceIntegrity.staticDevicesCount();
//   console.log("Total number of devices: ", staticDevicesCount.toString());
//   for (let i = 0; i < staticDevicesCount; i++) {
//       const deviceId = await deviceIntegrity.staticDeviceIds(i);
//       const device = await deviceIntegrity.staticDevices(deviceId);
//       console.log(
//           "Device Id: ",
//           deviceId.toString(),
//           "Device: ",
//           device.toString()
//       );
//   }
// }

// async function iterateDeviceDNA(deviceIntegrity) {
//   console.log("Iterating over deviceDNA...");
//   const staticDevicesCount = await deviceIntegrity.staticDevicesCount();
//   console.log("Total number of devices: ", staticDevicesCount.toString());
//   for (let i = 0; i < staticDevicesCount; i++) {
//       const deviceId = await deviceIntegrity.staticDeviceIds(i);
//       const deviceDna = await deviceIntegrity.deviceDNA(deviceId);
//       console.log(
//           "Device Id: ",
//           deviceId.toString(),
//           "Device DNA: ",
//           deviceDna.toString()
//       );
//   }
// }

// async function main() {
//   const deviceIntegrity = await deployDeviceIntegrityContract();
//   const deviceId1 = ethers.utils.formatBytes32String("deviceId1");
//   const device1 = {
//       networkInterface: "eth0",
//       hostname: "mydevice",
//   };
//   await deviceIntegrity.storeDevice(deviceId1, device1);
//   await iterateStaticDevices(deviceIntegrity);
//   await iterateDeviceDNA(deviceIntegrity);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//       console.error(error);
//       process.exit(1);
//   });


const { ethers } = require("hardhat");
async function consoleDevices(devices) {
  for (const device of devices) {
    const networkInterface = device.networkInterface;
    const hostname = device.hostname;
    // const from = memo.from;
    // const message = memo.message;
    console.log(
      `At ${networkInterface},name ${hostname}`
      // ,address ${from},message ${message}
    );
  }
}
async function main() {
  let staticDevice;
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const DeviceIntegrity = await ethers.getContractFactory("DeviceIntegrity");
  const deviceIntegrity = await DeviceIntegrity.deploy();
  // console.log("Token address:", deviceIntegrity);
  
  await deviceIntegrity.deployed();
  // console.log("Address of contract:", deviceIntegrity.address);
  await deviceIntegrity.storeDevice(
    ethers.utils.formatBytes32String("deviceId1"),
    {
      networkInterface: "eth0",
      hostname: "my-device-1"
    }
  );
  
   staticDevice = await deviceIntegrity.staticDevices(
    ethers.utils.formatBytes32String( "deviceId1")
  );
  // console.log("staticDevice:", staticDevice);



  await deviceIntegrity.storeDevice(
    ethers.utils.formatBytes32String("deviceId2"),
    {
      networkInterface: "eth0",
      hostname: "my-device-2"
    }
  );

  
   staticDevice = await deviceIntegrity.staticDevices(
    ethers.utils.formatBytes32String( "deviceId2")
  );
  // console.log("staticDevice:", staticDevice);

  const deviceDNA = await deviceIntegrity.deviceDNA(
    ethers.utils.formatBytes32String("deviceId2")
  );
  console.log("deviceDNA:", deviceDNA);

  const devices = await deviceIntegrity.getDevices();
  consoleDevices(devices);
}




main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });