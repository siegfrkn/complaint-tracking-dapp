App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  complaintSubmitted: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
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
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

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
    App.contracts.Complaint.deployed().then(function(instance) {
      console.log("contract event detected, rendering");
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

  render: function() {
    var complaintInstance;
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
          // console.log("Retrieve the name");
          // console.log(retrievedName);
        });
        const promise2 = complaintInstance.getId(i).then(function(id)
        {
          retrievedId = id.toNumber();
          // console.log("Retrieve the id");
          // console.log(retrievedId);
        });
        Promise.all([promise1, promise2]).then((results) => {
          // now fetch the data
          // console.log(promise1);
          // console.log(promise2);
          // console.log("Fetch the id");
          // console.log(retrievedId);
          // console.log("Fetch the name");
          // console.log(retrievedName);
          // Render candidate Result
          var entryTemplate = "<tr><th>" + retrievedId + "</th><td>" + retrievedName + "</td><td>"
          // console.log(entryTemplate);
          entriesResults.append(entryTemplate);

          // Render candidate ballot option
          // var entryOption = "<option value='" + retrievedId + "' >" + retrievedName + "</ option>"
          // entriesSelect.append(entryOption);
        });
          // console.log('Results: ${results}');
      }
      return complaintInstance.authors(App.account); // TODO Remove this logic
    }).then(function(complaintSubmitted) {
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  submitComplaint: function() {
    console.log("Calling submitComplaint");
    console.log(web3.currentProvider.selectedAddress);
    address = userAddress = web3.currentProvider.selectedAddress;
    console.log(address);
    var nameInput = $('#name').val();
    console.log('Metadata for user: ', App.account)
    App.contracts.Complaint.deployed().then(function(instance) {
      return instance.addComplaintEntry(nameInput
                              , 2468
                              , 0
                              , 3
                              , address
                              , 87654
                              , "Loop break"
                              , 3
                              , {from: App.account });
    }).then(function(result) {
      // Wait for complaints to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});