import hre from "hardhat";

async function main() {
    const Counter = await hre.ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();

    await counter.waitForDeployment();

    console.log("Counter deployed to:", await counter.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
