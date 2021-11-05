const NTFContract = artifacts.require("NTFContract");

module.exports = function(deployer) {
  deployer.deploy(NTFContract);
};
