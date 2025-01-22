import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { Fallback } from "../typechain-types";

async function deploy() {
  const Fallback = await ethers.getContractFactory("Fallback");
  const fallback = await Fallback.deploy();
  await fallback.waitForDeployment();
  console.log(await fallback.getAddress()); // This will print the contract address and other details
  return fallback;
}

async function fallback(fb: Fallback) {
  const f = await ethers.getContractAt("IFallback", await fb.getAddress());
  await f.count();
}

deploy().then(fallback).catch(console.error);
