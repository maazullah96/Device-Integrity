// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract DeviceIntegrity {
    struct StaticDevice {
        string networkInterface;
        string hostname;
    }
    event Log(StaticDevice device);
    mapping(bytes32 => StaticDevice) public staticDevices;
    mapping(bytes32 => bytes32) public deviceDNA;
    StaticDevice[] devices;

    function generateDeviceDNA(
        bytes32 deviceId,
        StaticDevice memory staticDevice
    ) public pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    staticDevice.networkInterface,
                    staticDevice.hostname,
                    deviceId
                )
            );
    }

    function storeDevices(StaticDevice[] memory devices) public {
        for (uint i = 0; i < devices.length; i++) {
            storeDevice(devices[i].deviceId, devices[i]);
        }
    }

    function storeDevice(
        bytes32 deviceId,
        StaticDevice memory staticDevice
    ) public {
        staticDevices[deviceId] = staticDevice;
        emit Log(staticDevice);
        devices.push(staticDevice);
        deviceDNA[deviceId] = generateDeviceDNA(deviceId, staticDevice);
    }

    function verifyDeviceDNA(
        bytes32 deviceId,
        bytes32 _deviceDNA
    ) public view returns (bool) {
        return _deviceDNA == deviceDNA[deviceId];
    }

    function checkDeviceIntegrity(
        bytes32 deviceId,
        StaticDevice memory staticDevice
    ) public view returns (bool) {
        return
            verifyDeviceDNA(
                deviceId,
                generateDeviceDNA(deviceId, staticDevice)
            );
    }

    function getDevices() public view returns (StaticDevice[] memory) {
        return devices;
    }
}
