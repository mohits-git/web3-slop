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

async function call() {
  const a = await deploy("A") as A;
  const b = await deploy("B", await a.getAddress()) as B;

  console.log("A", await a.getA());
  console.log("B", await b.getB());
  console.log("-----------------------")

  await a.setA(42);
  console.log("A", await a.getA());
  console.log("B", await b.getB());
  console.log("-----------------------")

  await b.setB(60);
  console.log("A", await a.getA());
  console.log("B", await b.getB());
  console.log("-----------------------")
}

call().then().catch(console.error);
