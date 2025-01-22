import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { A, B } from "../typechain-types";

async function deploy(name: "A" | "B", ...args: any) {
  const Fallback = await ethers.getContractFactory(name);
  const fallback = await Fallback.deploy(...args);
  await fallback.waitForDeployment();
  console.log(await fallback.getAddress()); // This will print the contract address and other details
  return fallback;
}

async function printStorage(contract: B, name: string, count: number) {
  for (let i = 0; i < count; i++) {
    console.log(
      name,
      i,
      await ethers.provider.getStorage(await contract.getAddress(), i)
    );
  }
}

async function call() {
  const a = (await deploy("A")) as A;
  const b = (await deploy("B", await a.getAddress())) as B;

  await printStorage(b, "B", 5);
  await b.setB(45);
  console.log("=========================")
  await printStorage(b, "B", 5);
}

call().then().catch(console.error);
