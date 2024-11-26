import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Counter Contract", function () {
    async function deployCounterFixture() {
        const Counter = await ethers.getContractFactory("Counter");
        const counter = await Counter.deploy();
        await counter.waitForDeployment();
        return { counter };
    }

    it("Should initialize count to zero", async function () {
        const { counter } = await loadFixture(deployCounterFixture);
        const count = await counter.count();
        expect(count).to.equal(0);
    });

    it("Should increment count by 1", async function () {
        const { counter } = await loadFixture(deployCounterFixture);
        await counter.inc();
        const count = await counter.count();
        expect(count).to.equal(1);
    });

    it("Should decrement count by 1", async function () {
        const { counter } = await loadFixture(deployCounterFixture);
        await counter.inc(); // Increment first to avoid underflow
        await counter.dec();
        const count = await counter.count();
        expect(count).to.equal(0);
    });

    it("Should revert when decrementing below zero", async function () {
        const { counter } = await loadFixture(deployCounterFixture);
        await expect(counter.dec()).to.be.revertedWith("SafeMath: subtraction overflow");
    });
});
