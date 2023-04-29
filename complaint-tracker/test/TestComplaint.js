var Complaint = artifacts.require("./Complaint.sol")

contract("Complaint", function(accounts){
    var complaintInstance;
    var entryInstance;

    // Test complaint 6 - valid
    var complaintName6 = "Complaint 6"
    var testComplaint6 = [complaintName6
                        , '567'
                        , '2'
                        , '2'
                        , "0xddC6d27861b28ac06977E786dc17cfF7Ae963972"
                        , '6543'
                        , '"Machine caught on fire"'
                        , '4'
                        , '0'];

    // Test complaint 7 - invalid entry type
    var testEntryType = 3; // must be 0, 1, 2
    var testComplaint7 = ["Complaint 7"
                        , 567
                        , testEntryType
                        , 2
                        , "0xddC6d27861b28ac06977E786dc17cfF7Ae963972"
                        , 6543
                        , "Machine caught on fire"
                        , 4
                        , 0];

    // Test complaint 8 - invalid impact type
    var testImpactType = 5; // must be 0, 1, 2, 3, 4
    var testComplaint8 = ["Complaint 8"
                        , 567
                        , 2
                        , 2
                        , "0xddC6d27861b28ac06977E786dc17cfF7Ae963972"
                        , 6543
                        , "Machine caught on fire"
                        , testImpactType
                        , 0];

    // Test complaint 9 - invalid linked complaint
    var testLinkedComplaint = 8; // must be less than number of valid blocks
    var testComplaint9 = ["Complaint 8"
                        , 567
                        , 2
                        , 2
                        , "0xddC6d27861b28ac06977E786dc17cfF7Ae963972"
                        , 6543
                        , "Machine caught on fire"
                        , 4
                        , testLinkedComplaint];


    /*
    Check the correct number of test instances generated
    */
    it ("Initializes with 3 complaints", function() {
        return Complaint.deployed().then(function(instance) {
            return instance.entriesCount();
        }).then(function(count) {
            assert.equal(count,5);
        });
    });


    /*
    Check test instances have expected parameters
    */
    it("Initializes the candidates with the correct test values", function() {
        return Complaint.deployed().then(function(instance) {
            entryInstance = instance;
            return entryInstance.getComplaint(1);
        }).then(function(entry) {
            assert.equal(entry[0], 1, "Complaint 1 contains the correct id");
            assert.equal(entry[1], "Complaint 1", "Complaint 1 contains the correct name");
            assert.equal(entry[2], 0, "Complaint 1 contains the correct CAPA indicator");
            assert.equal(entry[3], 0, "Complaint 1 contains the correct entry type");
            assert.equal(entry[4], 3, "Complaint 1 contains the correct product");
            assert.equal(entry[5], 0xF0b16e178270FE7E0d42dA2151ef99ba5a50b6Cc, "Complaint 1 contains the correct reporter address");
            assert.equal(entry[6], 12345, "Complaint 1 contains the correct site");
            assert.equal(entry[7], "Disposable kit lure failure", "Complaint 1 contains the correct description");
            assert.equal(entry[8], 3, "Complaint 1 contains the correct impact");
            assert.equal(entry[9], 1, "Complaint 1 contains the correct linked complaint");
            return entryInstance.getComplaint(2);
        }).then(function(entry) {
            assert.equal(entry[0], 2, "Complaint 2 contains the correct id");
            assert.equal(entry[1], "Complaint 2", "Complaint 2 contains the correct name");
            assert.equal(entry[2], 123, "Complaint 2 contains the correct CAPA indicator");
            assert.equal(entry[3], 1, "Complaint 2 contains the correct entry type");
            assert.equal(entry[4], 3, "Complaint 2 contains the correct product");
            assert.equal(entry[5], 0xF0b16e178270FE7E0d42dA2151ef99ba5a50b6Cc, "Complaint 2 contains the correct reporter address");
            assert.equal(entry[6], 12345, "Complaint 2 contains the correct site");
            assert.equal(entry[7], "Patient negatively impacted", "Complaint 2 contains the correct description");
            assert.equal(entry[8], 4, "Complaint 2 contains the correct impact");
            assert.equal(entry[9], 2, "Complaint 2 contains the correct linked complaint");
            return entryInstance.getComplaint(3);
        }).then(function(entry) {
            assert.equal(entry[0], 3, "Complaint 3 contains the correct id");
            assert.equal(entry[1], "Complaint 3", "Complaint 3 contains the correct name");
            assert.equal(entry[2], 456, "Complaint 3 contains the correct CAPA indicator");
            assert.equal(entry[3], 0, "Complaint 3 contains the correct entry type");
            assert.equal(entry[4], 6, "Complaint 3 contains the correct product");
            assert.equal(entry[5], 0xA6Eed187C878Bc44E88410367508E8Ba6Bcc246a, "Complaint 3 contains the correct reporter address");
            assert.equal(entry[6], 78910, "Complaint 3 contains the correct site");
            assert.equal(entry[7], "Broken pump door hinge", "Complaint 3 contains the correct description");
            assert.equal(entry[8], 1, "Complaint 3 contains the correct impact");
            assert.equal(entry[9], 2, "Complaint 3 contains the correct linked complaint");
            return entryInstance.getComplaint(4);
        }).then(function(entry) {
            assert.equal(entry[0], 4, "Complaint 4 contains the correct id");
            assert.equal(entry[1], "Complaint 4", "Complaint 4 contains the correct name");
            assert.equal(entry[2], 456, "Complaint 4 contains the correct CAPA indicator");
            assert.equal(entry[3], 0, "Complaint 4 contains the correct entry type");
            assert.equal(entry[4], 6, "Complaint 4 contains the correct product");
            assert.equal(entry[5], 0xA6Eed187C878Bc44E88410367508E8Ba6Bcc246a, "Complaint 4 contains the correct reporter address");
            assert.equal(entry[6], 78910, "Complaint 4 contains the correct site");
            assert.equal(entry[7], "Pump door screws backed out", "Complaint 4 contains the correct description");
            assert.equal(entry[8], 2, "Complaint 4 contains the correct impact");
            assert.equal(entry[9], 2, "Complaint 4 contains the correct linked complaint");
            return entryInstance.getComplaint(5);
        }).then(function(entry) {
            assert.equal(entry[0], 5, "Complaint 5 contains the correct id");
            assert.equal(entry[1], "Complaint 5", "Complaint 5 contains the correct name");
            assert.equal(entry[2], 789, "Complaint 5 contains the correct CAPA indicator");
            assert.equal(entry[3], 1, "Complaint 5 contains the correct entry type");
            assert.equal(entry[4], 4, "Complaint 5 contains the correct product");
            assert.equal(entry[5], 0xf286071b12282868f18B744788FeF443D1Cb3F56, "Complaint 5 contains the correct reporter address");
            assert.equal(entry[6], 98754, "Complaint 5 contains the correct site");
            assert.equal(entry[7], "Crimped tubing", "Complaint 5 contains the correct description");
            assert.equal(entry[8], 2, "Complaint 5 contains the correct impact");
            assert.equal(entry[9], 0, "Complaint 5 contains the correct linked complaint");
        });
    });


    /*
    Emit events are paused during contract construction when test data is added
    */
    it ("Test event is emitted only for non-test data entry", function() {
        // addingTestData is initialized as true
        // After deployment it should flip to false
        return Complaint.deployed().then(function(instance) {
            return instance.getAddingTestData();
        }).then(function(testFlag) {
            assert.equal(testFlag, false);
        });
    });


    /*
    Check new complaints can be submitted
    */
    it("Allows a user to submit a complaint", function() {
        return Complaint.deployed().then(function(instance) {
            complaintInstance = instance;;
            return complaintInstance.submitComplaintEntry.apply(this, testComplaint6);
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "An event was triggered");
            assert.equal(receipt.logs[0].event, "submitEvent", "The event type is correct");
            assert.equal(receipt.logs[0].args._name, complaintName6, "The complaint id is correct");
        })
    });


    /*
    Check exceptions are thrown for invalid submissions - Entry Type, must be 0, 1, 2
    */
    it("Throws an exception for invalid complaint entries with entry type = 3", function() {
        // Submit a 7th complaint
        return Complaint.deployed().then(function(instance) {
            complaintInstance = instance;
          return complaintInstance.submitComplaintEntry.apply(this, testComplaint7);
        // Check the submission is invalid
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, "Error message must contain revert");
        });
    });
    
    
    /*
    Check exceptions are thrown for invalid submissions - Impact Type must be 0, 1, 2, 3, 4
    */
    it("Throws an exception for invalid complaint entries with impact type = 5", function() {
        // Submit a 8th complaint
        return Complaint.deployed().then(function(instance) {
            complaintInstance = instance;
          return complaintInstance.submitComplaintEntry.apply(this, testComplaint8);
        // Check the submission is invalid
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, "Error message must contain revert");
        });
    });


    /*
    Check exceptions are thrown for invalid submissions - Linked Complaint must exist
    */
    it("Throws an exception for invalid complaint entries with non-existent linked complaint", function() {
        // Submit a 9th complaint
        return Complaint.deployed().then(function(instance) {
            complaintInstance = instance;
          return complaintInstance.submitComplaintEntry.apply(this, testComplaint9);
        // Check the submission is invalid
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, "Error message must contain revert");
        });
    });


    /*
    Check a complaint name can be retrieved given a complaint index
    */
    it ("Test a complaint name can be retrived given an id", function() {
        var getComplaint1 = 1;
        var expectedComplaintName1 = "Complaint 1";
        return Complaint.deployed().then(function(instance) {
            return instance.getName(getComplaint1);
        }).then(function(thisName) {
            assert.equal(thisName, expectedComplaintName1, "The correct name was retrieved");
        });
    });


    /*
    Check a complaint id can be retrieved given a complaint index
    */
    it ("Test a complaint id can be retrieved given a complaint index", function() {
        var getComplaint1 = 1;
        var expectedComplaintId1 = 1;
        return Complaint.deployed().then(function(instance) {
            return instance.getId(getComplaint1);
        }).then(function(thisId) {
            assert.equal(thisId, expectedComplaintId1, "The correct id was retrieved");
        });
    });


    /*
    Check a linked complaint index can be retrieved given a complaint index
    */
    it ("Test a complaint's linkedComplaint can be retrieved given a complaint index", function() {
        var getComplaint3 = 3;
        var expectedComplaintLinked3 = 2;
        return Complaint.deployed().then(function(instance) {
            return instance.getLinkedComplaint(getComplaint3);
        }).then(function(thisLinkedComplaint) {
            assert.equal(thisLinkedComplaint, expectedComplaintLinked3, "The correct linked complaint id was retrieved");
        });
    });
});