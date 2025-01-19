import _ from "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat"; // yes, from "hardhat" not "ethers"
import { expect } from "chai";

describe("hello world", function() {
  it("should say hi", async function() {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const hello = await HelloWorld.deploy();
    expect(await hello.hello()).to.equal("Hello, World!")
  });
});
