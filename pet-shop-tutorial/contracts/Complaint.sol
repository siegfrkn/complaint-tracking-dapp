// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

contract Complaint {
    // Model a complaint
    struct Entry {
        uint id;
        string name;
        uint capa;
        uint entryType; // 0 = complaint, 1 = addition, 2 = closure
        uint product;
        string reporter; // TODO: Change to address
        uint site;
        string description;
        uint impact; // 0 = observation, 1 = low, 2 = moderate, 3 = high, 4 = SAFETY
    }
    // Store entry
    // Fetch entry
    mapping(uint => Entry) public entries;
    // Store entry count
    uint public entriesCount;
    // Constructor
    constructor () public {
        addEntry("Complaint 1"
               , 0
               , 0
               , 3
               , "0xF0b16e178270FE7E0d42dA2151ef99ba5a50b6Cc"
               , 12345
               , "Disposable kit lure failure"
               , 3);
        addEntry("Complaint 2"
               , 1
               , 1
               , 3
               , "0xF0b16e178270FE7E0d42dA2151ef99ba5a50b6Cc"
               , 12345
               , "patient negatively impacted"
               , 4);
    }

    function addEntry (string memory _name
                     , uint _capa
                     , uint _entryType
                     , uint _product
                     , string memory _reporter
                     , uint _site
                     , string memory _description
                     , uint _impact) public {
        entriesCount++;
        entries[entriesCount] = Entry(entriesCount
                                    , _name
                                    , _capa
                                    , _entryType
                                    , _product
                                    , _reporter
                                    , _site
                                    , _description
                                    , _impact);
    }
}