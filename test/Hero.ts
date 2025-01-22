import _ from "@nomiclabs/hardhat-ethers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Hero, TestHero } from "../typechain-types";

describe("Hero", function () {
  async function createHero() {
    const Hero = await ethers.getContractFactory("TestHero");
    const hero = await Hero.deploy();
    await hero.waitForDeployment();

    return hero;
  }

  let hero: TestHero;

  before(async function () {
    hero = await createHero();
  });

  it("should get a zero hero array.", async function () {
    expect(await hero.getHeroes()).to.deep.equal([]);
  });

  it("Should fail at creating hero cause of payment", async function () {
    let e: Error | null = null;
    try {
      await hero.createHero(0, {
        value: ethers.parseEther("0.00499999"),
      });
    } catch (error) {
      e = error as Error;
    }
    expect(e?.message.includes("Please send more money") ?? false).to.equal(
      true
    );
  });

  it("should generate hero", async function () {
    hero = await createHero();
    hero.setRandom(69);
    await hero.createHero(0, {
      value: ethers.parseEther("0.01"),
    });
    const h = (await hero.getHeroes())[0];
    expect(await hero.getMagic(h)).to.equal(16);
    expect(await hero.getHealth(h)).to.equal(2);
  });
});
