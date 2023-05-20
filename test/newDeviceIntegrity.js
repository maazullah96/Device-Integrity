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
      osArchitecture: "x64",
      logicalCPU: "Intel i7",
      osPlatform: "Windows",
      osVersion: "10.0.19041",
      osRelease: "21H1"
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
        osArchitecture: "x64",
        logicalCPU: "Intel i7",
        osPlatform: "Windows",
        osVersion: "10.0.19041",
        osRelease: "21H1"
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
  
    await deviceIntegrity.storeDevice(
      device1.deviceId,
      device1.staticParams,
      device1.dynamicParams
    );
  
    await deviceIntegrity.storeDevice(
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
      osArchitecture: "x64",
      logicalCPU: "Intel i7",
      osPlatform: "Windows",
      osVersion: "10.0.19041",
      osRelease: "21H1"
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
    await deviceIntegrity.storeDevice(deviceId, staticParams, dynamicParams);
  
    const isValid = await deviceIntegrity.checkDeviceIntegrity(deviceId, staticParams, dynamicParams);
    expect(isValid).to.equal(true);
  
    // const isInvalid = await deviceIntegrity.checkDeviceIntegrity_new(deviceId, staticParams, dynamicParams_1);
    // expect(isInvalid).to.equal(false);
  });
});