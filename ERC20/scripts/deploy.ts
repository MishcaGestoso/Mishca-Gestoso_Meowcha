import { ethers } from "hardhat";

async function main() {
  const meow = await ethers.deployContract("Meowcha", ["0x93F034f79EDBf2Ddd8764AdFcE8Cd801Ea1fEba7"]);

  await meow.waitForDeployment();

  console.log(
    `Token deployed to ${meow.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});