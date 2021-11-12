const config = {
    verbose: true,
    moduleNameMapper: {
        "\\.(css|png)$" : "identity-obj-proxy"
    },
    testEnvironment: "jsdom"
  };
  
  module.exports = config;