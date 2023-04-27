App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    complaintSubmitted: false,



    /*
    Initialize the application
    */
    init: function() {
        return App.initWeb3();
    },



    /*
    Initialize the web3 object
    */
    initWeb3: async function() {
        // Modern dapp browsers...
        if (window.ethereum) {
            console.log("MODERN DAPP BROWSER");
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            console.log("LEGACY DAPP BROWSER");
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            console.log("GANACHE");
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);
        // Once the browser is connected, initalize the contract
        return App.initContract();
    },



  /*
  Initialize the contract object
  */
    initContract: function() {
        $.getJSON("Complaint.json", function(complaint) {
            // Instantiate a new truffle contract from the artifact
            App.contracts.Complaint = TruffleContract(complaint);
            // Connect provider to interact with contract
            App.contracts.Complaint.setProvider(App.web3Provider);
            // Subscribe to the function to detect emmitted events
            App.listenForEvents();
            // Render the application
            return App.render();
        });
    },



    /*
    Listen for events emitted from the contract
    */
    listenForEvents: function() {
        console.log("Contract event detected, rendering...");
        App.contracts.Complaint.deployed().then(function(instance) {
            // Restart Chrome if you are unable to receive this event
            // This is a known issue with Metamask
            // https://github.com/MetaMask/metamask-extension/issues/2393
            instance.submitEvent({}, {
                fromBlock: 0,
                toBlock: 'latest'
            }).watch(function(error, event) {
                console.log("event triggered", event)
                // Reload when a new complaint is recorded
                App.render();
            });
        });
    },


    /*
    Render the application
    */
    render: function() {
        // Don't show content until it has all be fetched
        var loader = $("#loader");
        var content = $("#content");
        loader.show();
        content.hide();
        // Load account data
        web3.eth.getCoinbase(function(err, account) {
            if (err === null) {
                App.account = account;
                $("#accountAddress").html("Your Account: " + account);
            }
        });
        // Load contract data
        var complaintInstance;
        App.contracts.Complaint.deployed().then(function(instance) {
            complaintInstance = instance;
            return complaintInstance.getEntriesCount();
        // Once loaded, then clear the forms and use data to populate
        }).then(function(entriesCount) {
            // Clear the current complaints
            var entriesResults = $("#entriesResults");
            entriesResults.empty();
            // Clear the new complaint submission 
            var entriesSelect = $('#entriesSelect');
            entriesSelect.empty();
            // Hide the print linked complaints
            var printTable = $("#printTable");
            printTable.hide();
            // Get the current count of entries
            currentCount = entriesCount.toNumber();
            // For all entries, populate field for current complaints
            for (var i = 1; i <= currentCount; i++)
            {
                // Create promises so the data can be retrieved all at once
                const promise1 = complaintInstance.getName(i).then(function(name)
                {
                    var thisName = name;
                    return thisName;
                });
                const promise2 = complaintInstance.getId(i).then(function(id)
                {
                    var thisId = id.toNumber();
                    return thisId;
                });
                const promise3 = complaintInstance.getLinkedComplaint(i).then(function(linkedComplaint)
                {
                    var thisLinkedComplaint = linkedComplaint.toNumber();
                    return thisLinkedComplaint;
                });
                // Retrieve all promises at the same time
                Promise.all([promise1, promise2, promise3]).then((results) => {
                    // Populate the current complaints line by line
                    var retrievedId = results[0];
                    var retrievedName = results[1];
                    var retrievedLinkedComplaint = results[2];
                    var entryTemplate = "<tr><th>" + retrievedId + "</th><td>" + retrievedName + "</td><td>" + retrievedLinkedComplaint + "</td><td>"
                    entriesResults.append(entryTemplate);
                });
            }
            // Once the data has loaded show the content
            loader.hide();
            content.show();
            // If the data hasn't loaded pass a warning
        }).catch(function(error) {
        console.warn(error);
        });
    },



    /*
    Function to call to contract function to add complaint to the blockchain
    */
    submitComplaint: function() {
        console.log("Calling submitComplaint");
        // Get the user's ethereum address
        var userAddress = web3.currentProvider.selectedAddress;
        // Get all user input
        var nameInput = $('#name').val();
        var capaInput = $('#capa').val();
        var entryTypeInput = $('#entryType').val();
        var productInput = $('#product').val();
        var siteInput = $('#site').val();
        var descriptionInput = $('#description').val();
        var impactInput = $('#impact').val();
        var linkInput = $('#link').val();
        // Pass this information to the solidity function to add to the contract
        App.contracts.Complaint.deployed().then(function(instance) {
        return instance.submitComplaintEntry(nameInput
                                            , capaInput
                                            , entryTypeInput
                                            , productInput
                                            , userAddress
                                            , siteInput
                                            , descriptionInput
                                            , impactInput
                                            , linkInput
                                            , {from: App.account})
        }).then(function() {
            // Wait for complaints to update
            $("#content").hide();
            $("#loader").show();
        }).catch(function(err) {
            console.error(err);
        });
    },



    /*
    Function to print all complaints linked to a given ID
    */
    printComplaint: function() {
        var complaintInstance;
        console.log("Calling printComplaint");
        // get the complaint of interest
        var idInput = $('#printId').val();
        var printTable = $("#printTable");
        // If value is 0 or blank hide table and return false
        if (idInput = null || idInput == "" || idInput == "0") {
            console.log("blank idInput or zero");
            printTable.hide();
            return false;
        }
        // Otherwise show the table
        else {
            printTable.show();
        }
        // Get the number of entries on the blockchain currently
        App.contracts.Complaint.deployed().then(function(instance) {
        complaintInstance = instance;
        return complaintInstance.getEntriesCount();
        }).then(function(entriesCount) {
            // Empty the current print results
            var printResults = $("#printResults");
            printResults.empty();
            var printSelect = $('#printSelect');
            printSelect.empty();
            // Check each block to see if it is linked to the requested ID
            for (var i = 1; i <= currentCount; i++)
            {
                // Use promises to get all of the data at once
                const promise1 = complaintInstance.getName(i).then(function(printName) {
                    var thisName = printName;
                    return thisName;
                });
                    const promise2 = complaintInstance.getId(i).then(function(printId) {
                    var thisId = printId.toNumber();
                    return thisId;
                });
                    const promise3 = complaintInstance.getLinkedComplaint(i).then(function(printLinkedComplaint) {
                    var thisLinkedComplaint = printLinkedComplaint.toNumber();
                    return thisLinkedComplaint;
                });
                const promise4 = $('#printId').val();
                const promise5 = complaintInstance.getEntriesCount().then(function(count) {
                    var thisCount = count;
                    return thisCount;
                });
                // Call all promises at once
                Promise.all([promise1, promise2, promise3, promise4, promise5]).then((results) => {
                    var compareId = results[3];
                    var currentName = results[0];      
                    var currentId = results[1];
                    var currentLinkedComplaint = results[2];
                    var currentCount = entriesCount;
                    // Sanitzie input to search
                    if (compareId > currentCount) {
                        console.log("Linked complaint id does not exist.")
                        printTable.hide();
                        return false;
                    }
                    // Print if the current block is linked to the search block, or the current block is the search block
                    if (compareId == currentLinkedComplaint || compareId == currentId) {
                        var printTemplate = "<tr><th>" + currentId + "</th><td>" + currentName + "</td><td>" + currentLinkedComplaint + "</td><td>"
                        console.log(printTemplate);
                        printResults.append(printTemplate);
                    }
                    // Otherwise indicate not found
                    else{
                        console.log("not found");
                    }
                });
            }
            // Show print results
            printTable.show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};



/*
Initialize the app once the window loads
*/
$(function() {
  $(window).load(function() {
    App.init();
  });
});