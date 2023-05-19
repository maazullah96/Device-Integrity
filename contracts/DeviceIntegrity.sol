// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract DeviceIntegrity {
    struct StaticDevice {
        string networkInterface;
        string hostname;
    }

    struct DynamicParameters {
        uint256 availableMemory;
        uint256 minAvailableMemory;
        uint256 maxAvailableMemory;
        uint256 cpuUsage;
        uint256 minCpuUsage;
        uint256 maxCpuUsage;
    }

    struct DeviceInfo {
        StaticDevice staticParams;
        DynamicParameters dynamicParams;
    }

    event Log(DeviceInfo device);

    mapping(bytes32 => DeviceInfo) public deviceInfo;
    mapping(bytes32 => bytes32) public deviceDNA;
    mapping(bytes32 => bool) public deviceExists;

    DeviceInfo[] devices;

    function generateDeviceDNA(
        bytes32 deviceId,
        StaticDevice memory staticParams,
        DynamicParameters memory dynamicParams
    ) public pure returns (bytes32) {
        bytes memory dna = abi.encodePacked(
            staticParams.networkInterface,
            staticParams.hostname,
            dynamicParams.availableMemory,
            dynamicParams.cpuUsage
        );

        require(
            dynamicParams.availableMemory >= dynamicParams.minAvailableMemory &&
                dynamicParams.availableMemory <=
                dynamicParams.maxAvailableMemory
        );
        require(
            dynamicParams.cpuUsage >= dynamicParams.minCpuUsage &&
                dynamicParams.cpuUsage <= dynamicParams.maxCpuUsage
        );

        return keccak256(abi.encodePacked(dna, deviceId));
    }

    function generateDeviceDNA2(
        bytes32 deviceId,
        StaticDevice memory staticParams,
        DynamicParameters memory dynamicParams
    ) public pure returns (bytes32) {
        bytes memory dna = abi.encodePacked(
            staticParams.networkInterface,
            staticParams.hostname
            // ,
            // dynamicParams.availableMemory,
            // dynamicParams.cpuUsage
        );

        require(
            dynamicParams.availableMemory >= dynamicParams.minAvailableMemory &&
                dynamicParams.availableMemory <=
                dynamicParams.maxAvailableMemory,
            "Available memory is out of range"
        );
        require(
            dynamicParams.cpuUsage >= dynamicParams.minCpuUsage &&
                dynamicParams.cpuUsage <= dynamicParams.maxCpuUsage,
            "CPU usage is out of range"
        );

        return keccak256(abi.encodePacked(dna, deviceId));
    }

    function storeDevices(
        bytes32[] memory deviceIds,
        StaticDevice[] memory staticParams,
        DynamicParameters[] memory dynamicParams
    ) public {
        require(
            deviceIds.length == staticParams.length &&
                deviceIds.length == dynamicParams.length,
            "Array length mismatch"
        );

        for (uint256 i = 0; i < deviceIds.length; i++) {
            storeDevice(deviceIds[i], staticParams[i], dynamicParams[i]);
        }
    }

    function storeDevice(
        bytes32 deviceId,
        StaticDevice memory staticParams,
        DynamicParameters memory dynamicParams
    ) public {
        require(!deviceExists[deviceId], "Device ID already exists");

        DeviceInfo memory info;
        info.staticParams = staticParams;
        info.dynamicParams = dynamicParams;
        deviceInfo[deviceId] = info;
        emit Log(info);
        devices.push(info);
        deviceDNA[deviceId] = generateDeviceDNA(
            deviceId,
            staticParams,
            dynamicParams
        );
        deviceExists[deviceId] = true;
    }

    function verifyDeviceDNA(
        bytes32 deviceId,
        bytes32 _deviceDNA
    ) public view returns (bool) {
        return _deviceDNA == deviceDNA[deviceId];
    }

    function checkDeviceIntegrity_old(
        bytes32 deviceId,
        StaticDevice memory staticParams,
        DynamicParameters memory dynamicParams
    ) public view returns (bool) {
        return
            verifyDeviceDNA(
                deviceId,
                generateDeviceDNA2(deviceId, staticParams, dynamicParams)
            );
    }

    function storeDevice_new(
        bytes32 deviceId,
        StaticDevice memory staticParams,
        DynamicParameters memory dynamicParams
    ) public {
        require(!deviceExists[deviceId], "Device ID already exists");

        DeviceInfo memory info;
        info.staticParams = staticParams;
        info.dynamicParams = dynamicParams;

        deviceInfo[deviceId] = info;
        emit Log(info);
        devices.push(info);
        deviceDNA[deviceId] = generateDeviceDNA2(
            deviceId,
            staticParams,
            dynamicParams
        );
        deviceExists[deviceId] = true;
    }

    function checkDeviceIntegrity_new(
        bytes32 deviceId,
        StaticDevice memory staticParams,
        DynamicParameters memory dynamicParams
    ) public view returns (bool) {
        require(deviceExists[deviceId], "Device ID does not exist");

        DeviceInfo memory stored_device_info = deviceInfo[deviceId];
        DynamicParameters memory dynamic_parameter;
        dynamic_parameter = DynamicParameters(
            dynamicParams.availableMemory,
            stored_device_info.dynamicParams.minAvailableMemory,
            stored_device_info.dynamicParams.maxAvailableMemory,
            dynamicParams.cpuUsage,
            stored_device_info.dynamicParams.minCpuUsage,
            stored_device_info.dynamicParams.maxCpuUsage
        );

        return
            verifyDeviceDNA(
                deviceId,
                generateDeviceDNA2(deviceId, staticParams, dynamic_parameter)
            );
    }

    function getDevices() public view returns (DeviceInfo[] memory) {
        return devices;
    }
}
