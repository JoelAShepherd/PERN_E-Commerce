const config = {
verbose: true,
moduleNameMapper: {
    "\\.(css|png)$" : "identity-obj-proxy"
},
testEnvironment: "jsdom"
};
  
export default config;