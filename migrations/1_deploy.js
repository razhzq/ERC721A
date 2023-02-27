
const Flappy = artifacts.require("FlappySeals");

module.exports = async function(deployer) {
        await deployer.deploy(Flappy, "0x6E7aD7BC0Bf749c87F59E8995c158cDa08b7E657");
}