import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { Counter } from "../typechain-types";

async function deploy() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.waitForDeployment();
  console.log(await counter.getAddress()); // This will print the contract address and other details
  return counter;
}

async function count(counter: Counter) {
  await counter.count();
  const c = await counter.getCounter();
  console.log("Counter", c.toString());
}

deploy().then(count).catch(console.error);
