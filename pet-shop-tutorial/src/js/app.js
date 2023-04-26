App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  complaintSubmitted: false,

  // initialize the app
  init: function() {
    return App.initWeb3();
  },

  // Initialize the web3 object
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

    return App.initContract();
  },

  // Initialize the contract object
  initContract: function() {
    $.getJSON("Complaint.json", function(complaint) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Complaint = TruffleContract(complaint);
      // Connect provider to interact with contract
      App.contracts.Complaint.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    console.log("contract event detected, rendering");
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

  // Render the application
  render: function() {
    var complaintInstance;
    var loader = $("#loader");
    var content = $("#content");

    // don't show content until it has all be fetched
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
    App.contracts.Complaint.deployed().then(function(instance) {
      complaintInstance = instance;
      return complaintInstance.getEntriesCount();
    }).then(function(entriesCount) {

      var entriesResults = $("#entriesResults");
      entriesResults.empty();

      var entriesSelect = $('#entriesSelect');
      entriesSelect.empty();

      currentCount = entriesCount.toNumber();
      for (var i = 1; i <= currentCount; i++)
      {
        var retrievedId;
        var retrievedName;
        const promise1 = complaintInstance.getName(i).then(function(name)
        {
          retrievedName = name;
        });
        const promise2 = complaintInstance.getId(i).then(function(id)
        {
          retrievedId = id.toNumber();
        });
        Promise.all([promise1, promise2]).then((results) => {
          var entryTemplate = "<tr><th>" + retrievedId + "</th><td>" + retrievedName + "</td><td>"
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

  // Submit complaint data to the contract
  submitComplaint: function() {
    console.log("Calling submitComplaint");
    var userAddress = web3.currentProvider.selectedAddress;
    console.log(userAddress);
    var nameInput = $('#name').val();
    
    App.contracts.Complaint.deployed().then(function(instance) {
      return instance.submitComplaintEntry(nameInput
                              , 2468
                              , 0
                              , 3
                              , userAddress
                              , 87654
                              , "Loop break"
                              , 3
                              , 0
                              , {from: App.account})
    }).then(function() {
      // Wait for complaints to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  // Submit complaint data to the contract
  printComplaint: function() {
    console.log("Calling printComplaint");
    
    App.contracts.Complaint.deployed().then(function(instance) {
      return instance.getName(printId, {from: App.account})
  }).then(function(entriesCount) {
    var printResults = $("#printResults");
    printResults.empty();

    var printSelect = $('#entriesSelect');
    printSelect.empty();

    currentCount = entriesCount.toNumber();
    for (var i = 1; i <= currentCount; i++)
    {
      var retrievedId;
      var retrievedName;
      const promise1 = complaintInstance.getName(i).then(function(name)
      {
        retrievedName = name;
      });
      const promise2 = complaintInstance.getId(i).then(function(id)
      {
        retrievedId = id.toNumber();
      });
      Promise.all([promise1, promise2]).then((results) => {
        var entryTemplate = "<tr><th>" + retrievedId + "</th><td>" + retrievedName + "</td><td>"
        entriesResults.append(entryTemplate);
      });
    }
    // Once the data has loaded show the content
    loader.hide();
    content.show();
  // If the data hasn't loaded pass a warning      
    }) .then(function() {
      // Wait for complaints to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};

// Initialize the app once the window loads
$(function() {
  $(window).load(function() {
    App.init();
  });
});