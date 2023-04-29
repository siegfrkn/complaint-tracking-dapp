# Complaint Tracking DApp

This decentralized application, or DApp, creates an immutable ledger of complaint records. In industries where tracking of complaints, issues, or defects is required by regulations - such as medical devices, pharmaceuticals, or aerospace - it is critical to have a record which is easily audited. One of the challenges of tracking these types of complaints is that the data, while not permitted direct manipulation by the user, is not inherently protected in the way it is stored, e.g. it is stored on a server as a tradaitional database, subject to the risks of a locally-stored database. By creating an application that leverages the immutability and decentralized nature of the blockchain, the concerns around data alteration or mutability are no longer issues.

This DApp is designed specifically to serve as a proof-of-concept decentralized application for medical device complaint reporting.

# Dependencies
This DApp was built in the Ubuntu 22.04.2 LTS environment. This DApp depends on the following.

##### [Node Package Manager (NPM)](https://nodejs.org) v18.15.0
##### [Node Version Manager (NVM)](https://npm.github.io/) v0.39.1
##### [Truffle](https://github.com/trufflesuite/truffle) v5.8.2
##### [Ganache](http://truffleframework.com/ganache/) v7.7.7
##### [Solidity](https://soliditylang.org/) v0.8.19 (solc-js)
##### [Web3.js](https://web3js.readthedocs.io/en/v1.8.2/) v1.8.2
<br/>

# Additional Tools
## OpenZepplin
The openzeipplin contracts node package is needed which can be downloaded by running `npm install @openzeppelin/contracts`.
## MetaMask
The DApp has been tested with MetaMask v10.28.3 using the [MetaMask chrome browser extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) on chrome 64-bit v112.0.5615.138.
## Development Environment
Development was done using [VSCode](https://code.visualstudio.com/) v1.77.3, including the "solidity", "Markdown All in One", "WSL", and "Javascript (ES6) code snippets" extensions.
<br/><br/>

# Building / Running
## Clone the Repository
The [code repository for this app](https://github.com/siegfrkn/complaint-tracking-dapp) is stored as a public repo in Github. To pull locally, use <br/>
`git clone https://github.com/siegfrkn/complaint-tracking-dapp`
## Ensure Correct Node Version
To see your current node version use <br/>
`nvm list` <br/>
If not currently defaulting to use v18, toggle to change using <br/>
`nvm use 18` <br/>
## To Launch Ganache Instance
Ganache must be running to host the blockchain used in this demonstration. If running on WSL2 ensure Ganache is installed in the Windows environment. <br/>
`ganache --detach`
## Compile
While commands to run tests and migrate chains will compile any changed files, a forced recompile can be done with <br/>
`truffle compile --all`
## Migrate Contract to Ganache
The contract written and built in this project must be migrated to our blockchain, hosted on Ganache. <br/>
`truffle migrate` <br/>
Or, alternatively, if you need to migrate and reset the blockchain, run with <br/>
`truffle migrate --reset` <br/>
## Run the Application
To run the application, use the command <br/>
`npm run dev`
If you have issues with launching chrome from WSL2 use the following to point your WSL2 instance at the correct Windows browser. <br/>
`export BROWSER='/mnt/c/Windows/explorer.exe'` <br/>
OR <br/>
`sudo update-alternatives --install "/bin/host_chrome" "chrome" "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" 1` <br/>
`export BROWSER=host_chrome` <br/>
## Run Contract Tests
Tests were written to ensure the contract functions behaved as expected. The can be run using the command <br/>
`truffle test` <br/>
<br/>

# Helpful Resources

## Truffle and Ganache
[Linking Metamask and Ganache](https://medium.com/@girishkathirdy/my-set-up-guide-metamask-and-ganache-da11eaa3b4d5) <br/>
[Truffle Pet Shop Tutorial](https://trufflesuite.com/guides/pet-shop) <br/>
[DApp Tutorial](https://www.dappuniversity.com/articles/the-ultimate-ethereum-dapp-tutorial) <br/>

## WSL2
[Truffle and Ganache on WSL2](https://qiita.com/daei/items/84c55dbe03ebb81da162) <br/>
[Launching Browser in WSL2](https://superuser.com/questions/1262977/open-browser-in-host-system-from-windows-subsystem-for-linux) <br/>

## Solidity
[Solidity Storage Types](https://blog.yanbman.com/solidity-storage-vs-memory-vs-calldata-8c7e8c38bce)