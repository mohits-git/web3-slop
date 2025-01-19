import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat"
import { HelloWorld } from "../typechain-types";

async function deploy() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const hello = await HelloWorld.deploy();
  await hello.waitForDeployment();

  return hello;
}

async function sayHello(hello: HelloWorld) {
  console.log("Say Hello: ", await hello.hello())
}

deploy().then(sayHello).catch(console.error);
