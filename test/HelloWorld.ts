import _ from "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("hello world", function() {
    it("Should say hi", async function() {
        // 1. setup 
        // 2. deploy our contract
        // 3. call our functions to test
        
        // 2. 
        const HelloWorld = await ethers.getContractFactory("HelloWorld");
        const hello = await HelloWorld.deploy();
        await hello.waitForDeployment();

        expect(await hello.hello()).to.equal("Hello, World");
    });
});

