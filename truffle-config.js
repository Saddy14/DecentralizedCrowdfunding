module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost for Ganache
      port: 9545,        // Ganache's default port
      network_id: "*"    // Any network
    }
  },
  compilers: {
    solc: {
      version: "0.8.0"  // Specify Solidity compiler version
    }
  }
};
