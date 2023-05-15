const hre = require("hardhat");

async function main() {
  const DeviceIntegrity = await hre.ethers.getContractFactory("DeviceIntegrity");
  const contract = await DeviceIntegrity.deploy(); //instance of contract

  await contract.deployed();
  console.log("Address of contract:", contract.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});