const { expect } = require("chai");

describe("DeviceIntegrity", function () {
  let DeviceIntegrity;
  let deviceIntegrity;

  beforeEach(async function () {
    DeviceIntegrity = await ethers.getContractFactory("DeviceIntegrity");
    deviceIntegrity = await DeviceIntegrity.deploy();
    await deviceIntegrity.deployed();
  });

  it("should store and retrieve devices", async function () {
    const device1 = {
      deviceId: ethers.utils.formatBytes32String("0x01") ,
      staticParams: {
        networkInterface: "eth0",
        hostname: "device1",
      },
      dynamicParams: {
        availableMemory: 8,
        minAvailableMemory: 4,
        maxAvailableMemory: 16,
        cpuUsage: 80,
        minCpuUsage: 0,
        maxCpuUsage: 100,
      },
    };
  
    const device2 = {
      deviceId:ethers.utils.formatBytes32String("0x02") ,
      staticParams: {
        networkInterface: "eth0",
        hostname: "device2",
      },
      dynamicParams: {
        availableMemory: 12,
        minAvailableMemory: 8,
        maxAvailableMemory: 32,
        cpuUsage: 60,
        minCpuUsage: 0,
        maxCpuUsage: 100,
      },
    };
  
    await deviceIntegrity.storeDevice_new(
      device1.deviceId,
      device1.staticParams,
      device1.dynamicParams
    );
  
    await deviceIntegrity.storeDevice_new(
      device2.deviceId,
      device2.staticParams,
      device2.dynamicParams
    );
  
    const devices = await deviceIntegrity.getDevices();
  
    expect(devices.length).to.equal(2);
    expect(devices[0].staticParams.hostname).to.equal(device1.staticParams.hostname);
    expect(devices[1].staticParams.hostname).to.equal(device2.staticParams.hostname);
  });

  it("should check device integrity", async function () {
    const deviceId =  ethers.utils.formatBytes32String("mydevice");
    const staticParams = {
      networkInterface: "eth0",
      hostname: "device1",
    };
    const dynamicParams = {
      availableMemory: 8,
      minAvailableMemory: 4,
      maxAvailableMemory: 16,
      cpuUsage: 80,
      minCpuUsage: 0,
      maxCpuUsage: 100,
    };
  
    const dynamicParams_1= {
        availableMemory: 8,
        minAvailableMemory: 4,
        maxAvailableMemory: 16,
        cpuUsage: 101,
        minCpuUsage: 0,
        maxCpuUsage: 100,
      };
    await deviceIntegrity.storeDevice_new(deviceId, staticParams, dynamicParams)
    // .send({ from: accounts[0] });
  
    // const isValid = await deviceIntegrity.checkDeviceIntegrity_new(deviceId, staticParams, dynamicParams)
    // .call();
  
  // Check device integrity
  const isValid1 = await deviceIntegrity.checkDeviceIntegrity_new(
    deviceId,
    staticParams,
    dynamicParams
  );

//   const isValid2 = await deviceIntegrity.checkDeviceIntegrity_new(
//     deviceId,
//     staticParams,
//     dynamicParams_1
//   );

  expect(isValid1).to.equal(true);
//   expect(isValid2).to.equal(false);
});
//   it("should check device integrity", async function () {
//     const deviceId = "0x01";
//     const staticParams = {
//       networkInterface: "eth0",
//       hostname: "device1",
//     };
//     const dynamicParams = {
//       availableMemory: 8,
//       minAvailableMemory: 4,
//       maxAvailableMemory: 16,
//       cpuUsage: 80,
//       minCpuUsage: 0,
//       maxCpuUsage: 100,
//     };

//     await deviceIntegrity.storeDevice_new(deviceId, staticParams, dynamicParams);

//     const isValid = await deviceIntegrity.checkDeviceIntegrity_new(deviceId, staticParams, dynamicParams);

//     expect(isValid).to.equal(true);
//   });
});