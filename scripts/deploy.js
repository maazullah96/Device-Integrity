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