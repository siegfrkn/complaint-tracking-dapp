var Complaint = artifacts.require("Complaint.sol");

module.exports = function(deployer) {
  deployer.deploy(Complaint);
};