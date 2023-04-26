# TITLE HERE

## Dependencies

`npm install @openzeppelin/contracts`

## Building / Running

`nvm list`
`nvm use 18`

`truffle compile --all`
`ganache --detach`
`truffle migrate`

If you have issues with launching chrome from WSL2 use
`export BROWSER='/mnt/c/Windows/explorer.exe'`
OR
`sudo update-alternatives --install "/bin/host_chrome" "chrome" "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" 1`
`export BROWSER=host_chrome`



`npm run dev`

`app.submitComplaintEntry("Complaint 4", 456, 0 , 6, "0xA6Eed187C878Bc44E88410367508E8Ba6Bcc246a", 78910, "broken pump door hinge", 1, 0);`

`Complaint.deployed().then(function(i) { app=i; })`



TODO
`npm audit`