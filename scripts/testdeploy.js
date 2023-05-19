
// const Web3 = require('web3');
// const fs = require('fs');

// async function deployContract() {
//   // Connect to the local Ethereum node using Web3
//   const web3 = new Web3('HTTP://127.0.0.1:7545');

//   // Get the contract ABI and bytecode from the compiled JSON file
//   const compiledData = fs.readFileSync('artifacts\contracts\DeviceIntegrity.sol\DeviceIntegrity.json');
//   const { abi, bytecode } = JSON.parse(compiledData);

//   // Create a new contract instance
//   const contract = new web3.eth.Contract(abi);

//   // Deploy the contract
//   const deployedContract = await contract.deploy({
//     data: bytecode,
//   }).send({
//     from: '0xYourAddress',
//     gas: 3000000,
//   });

//   // Get the deployed contract address
//   const contractAddress = deployedContract.options.address;

//   // Save the contract address for later use
//   fs.writeFileSync('contractAddress.txt', contractAddress);

//   console.log('Contract deployed at address:', contractAddress);

//   // Return the deployed contract instance
//   return deployedContract;
// }

// async function main() {
//   // Deploy the contract
//   const contract = await deployContract();

//   // Load the contract ABI
//   const compiledData = fs.readFileSync('compiledContract.json');
//   const { abi } = JSON.parse(compiledData);

//   // Load the contract address
//   const contractAddress = fs.readFileSync('contractAddress.txt', 'utf-8').trim();

//   // Create a new contract instance using the ABI and address
//   const contractInstance = new web3.eth.Contract(abi, contractAddress);

//   // Test the contract functions

//   // Store devices
//   const device1 = {
//     deviceId: web3.utils.hexToBytes("0x01"),
//     staticParams: {
//       networkInterface: "eth0",
//       hostname: "device1",
//     },
//     dynamicParams: {
//       availableMemory: 8,
//       minAvailableMemory: 4,
//       maxAvailableMemory: 16,
//       cpuUsage: 80,
//       minCpuUsage: 0,
//       maxCpuUsage: 100,
//     },
//   };

//   const device2 = {
//     deviceId: web3.utils.hexToBytes("0x02"),
//     staticParams: {
//       networkInterface: "eth0",
//       hostname: "device2",
//     },
//     dynamicParams: {
//       availableMemory: 12,
//       minAvailableMemory: 8,
//       maxAvailableMemory: 32,
//       cpuUsage: 60,
//       minCpuUsage: 0,
//       maxCpuUsage: 100,
//     },
//   };

//   await contractInstance.methods.storeDevice_new(
//     device1.deviceId,
//     device1.staticParams,
//     device1.dynamicParams
//   ).send({ from: '0xYourAddress', gas: 3000000 });

//   await contractInstance.methods.storeDevice_new(
//     device2.deviceId,
//     device2.staticParams,
//     device2.dynamicParams
//   ).send({ from: '0xYourAddress', gas: 3000000 });

//   // Check device integrity
//   const isValid1 = await contractInstance.methods.checkDeviceIntegrity_new(
//     device1.deviceId,
//     device1.staticParams,
//     device1.dynamicParams
//   ).call();

//   const isValid2 = await contractInstance.methods.checkDeviceIntegrity_new(
//     device2.deviceId,
//     device2.staticParams,
//     device2.dynamicParams
//   ).call();

//   console.log('Device 1 integrity:', isValid1);
//   console.log('Device 2 integrity:', isValid2);

//   // Get devices
//   const devices = await contractInstance.methods.getDevices().call();
//   console.log('Devices:', devices);
// }


// main()
//   .then(() => process.exit(0))
//   .catch(error => {
//     console.error(error);
//     process.exit(1);
//   });











  const { ethers } = require('hardhat');
const fs = require('fs');


async function deployDeviceIntegrityContract() {
    const DeviceIntegrityContract = await ethers.getContractFactory(
        "DeviceIntegrity"
    );
    const deviceIntegrity = await DeviceIntegrityContract.deploy();
    console.log(
        "DeviceIntegrity contract deployed to:",
        deviceIntegrity.address
    );
    return deviceIntegrity;
  }
  

async function main() {
  // Load the contract address

  const deviceIntegrity = await deployDeviceIntegrityContract();
  const deviceId = ethers.utils.formatBytes32String("deviceId");


    const staticParams = {
      networkInterface: "eth0",
      hostname: "device1",
    };
    const dynamicParams = {
      availableMemory: 8,
      minAvailableMemory: 4,
      maxAvailableMemory: 16,
      cpuUsage: 180,
      minCpuUsage: 0,
      maxCpuUsage: 100,
    };
  
    await deviceIntegrity.storeDevice_new(deviceId, staticParams, dynamicParams)

    // await deviceIntegrity.storeDevice_new(deviceId, staticParams, dynamicParams)
    const isValid1 = await deviceIntegrity.checkDeviceIntegrity_new(
        deviceId,
        staticParams,
        dynamicParams
      );
      console.log(isValid1)
}




main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });