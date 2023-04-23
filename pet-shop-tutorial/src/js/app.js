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
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      // instance.votedEvent({}, {
      //   fromBlock: 0,
      //   toBlock: 'latest'
      // }).watch(function(error, event) {
      //   console.log("event triggered", event)
      //   // Reload when a new vote is recorded
      //   App.render();
      // });
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

      console.log(entriesCount);
      currentCount = entriesCount.toNumber();
      console.log(currentCount);
      for (var i = 1; i <= currentCount; i++) {
        complaintInstance.entries(i).then(function(entry) {
          var id = entry[0];
          var name = entry[1];

          // Render candidate Result
          var entryTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>"
          entriesResults.append(entryTemplate);

          // Render candidate ballot option
          var entryOption = "<option value='" + id + "' >" + name + "</ option>"
          entriesSelect.append(entryOption);
        });
      }
      return complaintInstance.authors(App.account);
    }).then(function(complaintSubmitted) {
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  submitComplaint: function() {
    // const nameInput = document.getElementById("name").value
    // alert(nameInput)
    // console.log(nameInput)
    // App.contracts.Complaint.addComplaintEntry(nameInput
    // , 0
    // , 0
    // , 3
    // , "0xF0b16e178270FE7E0d42dA2151ef99ba5a50b6Cc"
    // , 12345
    // , "Disposable kit lure failure"
    // , 3);

    var nameInput = $('#name').val();
    App.contracts.Complaint.deployed().then(function(instance) {
      return instance.addComplaintEntry(nameInput
                              , 0
                              , 0
                              , 3
                              , "0xF0b16e178270FE7E0d42dA2151ef99ba5a50b6Cc" // TODO: use msg.sender
                              , 12345
                              , "Disposable kit lure failure"
                              , 3);
    }).then(function(result) {
      // Wait for votes to update
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