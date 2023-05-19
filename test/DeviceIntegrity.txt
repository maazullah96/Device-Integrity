// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "hardhat/console.sol";
// import { ethers } from "hardhat";
const { expect } = require("chai");


describe("Token Contract", function () {
    let DeviceIntegrity;
    let deviceIntegrity;
    let deviceId;
    let staticDevice;

    // Deploy the contract before each test
    beforeEach(async () => {
        DeviceIntegrity = await ethers.getContractFactory("DeviceIntegrity");
        // const DeviceIntegrityContract = await ethers.getContractFactory("DeviceIntegrity");
        deviceIntegrity = await DeviceIntegrity.deploy();
        await deviceIntegrity.deployed();
    });

    it("should store a device and generate its DNA", async () => {
        deviceId = ethers.utils.formatBytes32String("mydevice");
        const networkInterface = "eth0";
        const hostname = "mydevice";

        await deviceIntegrity.storeDevice(
            deviceId,
            { networkInterface: networkInterface, hostname: hostname }
        );

        staticDevice = await deviceIntegrity.staticDevices(deviceId);
        const deviceDNA = await deviceIntegrity.deviceDNA(deviceId);
        

        expect(staticDevice.networkInterface).to.equal(networkInterface);
        expect(staticDevice.hostname).to.equal(hostname);
        expect(deviceDNA).to.equal(ethers.utils.solidityKeccak256(
            ["string", "string", "bytes32"],
            [networkInterface, hostname, deviceId]
        ));

        // // assert.equal(, );
        // // assert.equal(, );
        // assert.equal(
        //     ,
            
        // );
    });

    it("should verify device DNA", async () => {
        const deviceId = ethers.utils.formatBytes32String("mydevice");
        const networkInterface = "eth0";
        const hostname = "mydevice";

        await deviceIntegrity.storeDevice(
            deviceId,
            { networkInterface: networkInterface, hostname: hostname }
        );

        const deviceDNA = await deviceIntegrity.deviceDNA(deviceId);
        const result = await deviceIntegrity.verifyDeviceDNA(deviceId, deviceDNA);
        
        // assert.isTrue(result);
        expect(result).to.be.true;

    });

    it("should check device integrity", async () => {
        const deviceId = ethers.utils.formatBytes32String("mydevice");
        const networkInterface = "eth0";
        const hostname = "mydevice";

        await deviceIntegrity.storeDevice(
            deviceId,
            { networkInterface: networkInterface, hostname: hostname }
        );

        const result = await deviceIntegrity.checkDeviceIntegrity(
            deviceId,
            { networkInterface: networkInterface, hostname: hostname }
        );
        expect(result).to.be.true;
        // assert.isTrue(result);
    });
    it("should detect device data modification", async function () {
        await deviceIntegrity.storeDevice(deviceId, staticDevice);
        const newStaticDevice = {
          networkInterface: "eth1",
          hostname: "mydevice-modified",
        };
        const result = await deviceIntegrity.checkDeviceIntegrity(
          deviceId,
          newStaticDevice
        );
        expect(result).to.be.false;
      });
});