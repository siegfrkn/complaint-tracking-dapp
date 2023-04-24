var Complaint = artifacts.require("Complaint.sol")

contract("Complaint", function(accounts){
    it ("initializes with X complaints", function() {
        return Complaint.deployed().then(function(instance) {
            return instance.entriesCount();
        }).then(function(count) {
            assert.equal(count,2);
        });
    });

    // TODO: Check all additional parameters
    it("initializes the candidates with the correct values", function() {
        return Complaint.deployed().then(function(instance) {
            entryInstance = instance;
            return entryInstance.entries(1);
        }).then(function(entry) {
            assert.equal(entry[0], 1, "contains the correct id");
            assert.equal(entry[1], "Complaint 1", "contains the correct name");
            assert.equal(entry[2], 0, "contains the correct CAPA indicator");
            return entryInstance.entries(2);
        }).then(function(entry) {
            assert.equal(entry[0], 2, "contains the correct id");
            assert.equal(entry[1], "Complaint 2", "contains the correct name");
            assert.equal(entry[2], 1, "contains the correct CAPA indicator");
            return entryInstance.entries(2);
        });
    });
});