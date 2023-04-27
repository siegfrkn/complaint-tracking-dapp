module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "172.19.64.1", // IP of Ganache host
      port: 7545,
      network_id: "*" // Match any network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.19",
      optimizer:{ enabled: false, runs: 200 }
    }
  },
};
