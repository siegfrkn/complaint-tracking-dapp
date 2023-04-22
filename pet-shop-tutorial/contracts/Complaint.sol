// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

contract Complaint {
    // Model a complaint
    struct Entry {
        uint id;
        string name;
        // uint capa;
        // string entryType; // TODO: Change to enum
        // string reporter;
        // string site;
        // string description;
        // string impact; // TODO Change to enum
    }
    // Store entry
    // Fetch entry
    mapping(uint => Entry) public entries;
    // Store entry count
    uint public entriesCount;
    // Constructor
    constructor () public {
        addEntry("Complaint 1");
        addEntry("Complaint 2");
    }

    function addEntry (string memory _name) public {
        entriesCount++;
        entries[entriesCount] = Entry(entriesCount, _name);
    }
}