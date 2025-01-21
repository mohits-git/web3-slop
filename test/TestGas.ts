import _ from "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat"; // yes, from "hardhat" not "ethers"

describe("test gas", function() {
  it("Test", async function() {
    const TestGas = await ethers.getContractFactory("TestGas");
    const gas = await TestGas.deploy();
    await gas.waitForDeployment();

    for (let i = 0; i < 10; i++) {
      await gas.test1();
      await gas.test2();
      await gas.test3();
      await gas.test4();
      await gas.test5();
    }
  });
});
