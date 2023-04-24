// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/Strings.sol";
// using Strings for uint256;

contract Complaint {
    // Model a complaint
    struct complaintEntry {
        uint id;
        string name;
        uint capa;
        uint entryType; // 0 = complaint, 1 = addition, 2 = closure
        uint product;
        address reporter;
        uint site;
        string description;
        uint impact; // 0 = observation, 1 = low, 2 = moderate, 3 = high, 4 = SAFETY
        int linkedComplaint;
    }
    // Store accounts that have logged complaints
    mapping(address => address) public authors;
    // Store entry
    mapping(uint => complaintEntry[]) public entries;
    mapping(uint => uint) private entriesIndex;
    // Store entry count
    uint public entriesCount;

    // submit event
    event submitEvent (
        address who
    );

    // Constructor, initialize with some faked complaint data
    constructor () public {
        addComplaintEntry("Complaint 1"
               , 0
               , 0
               , 3
               , 0xF0b16e178270FE7E0d42dA2151ef99ba5a50b6Cc
               , 12345
               , "Disposable kit lure failure"
               , 3
               , 0);
        addComplaintEntry("Complaint 2"
               , 123
               , 1
               , 3
               , 0xF0b16e178270FE7E0d42dA2151ef99ba5a50b6Cc
               , 12345
               , "patient negatively impacted"
               , 4
               , 1);
        addComplaintEntry("Complaint 3"
               , 456
               , 0
               , 6
               , 0xA6Eed187C878Bc44E88410367508E8Ba6Bcc246a
               , 78910
               , "broken pump door hinge"
               , 1
               , 0);
    }

    // Get the current count of all complaints
    function getEntriesCount () public view returns (uint) {
        return entriesCount;
    }

    // Add a complaint entry
    function addComplaintEntry (string memory _name
                     , uint _capa
                     , uint _entryType
                     , uint _product
                     , address _reporter
                     , uint _site
                     , string memory _description
                     , uint _impact
                     , int _linkedComplaint) private {
        entriesCount++;
        complaintEntry[] storage entryList = entries[entriesCount];
        authors[_reporter];
        // check _linkedComplaint is valid

        require(_linkedComplaint >= 0 && _linkedComplaint <= int(entriesCount), "Invalid Linked Complaint ID");
        // add to chain
        entryList.push(complaintEntry(entriesCount
                                    , _name
                                    , _capa
                                    , _entryType
                                    , _product
                                    , _reporter
                                    , _site
                                    , _description
                                    , _impact
                                    , _linkedComplaint));
        entriesIndex[entriesCount] = entryList.length - 1;
    }

    // Add a complaint entry with checks and trigger a submit event
    function submitComplaintEntry (string memory _name
                     , uint _capa
                     , uint _entryType
                     , uint _product
                     , address _reporter
                     , uint _site
                     , string memory _description
                     , uint _impact
                     , int _linkedComplaint) public {
        // check _entryType is valid
        // check _impactType is valid
        // add new complaint
        addComplaintEntry (_name
                     , _capa
                     , _entryType
                     , _product
                     , _reporter
                     , _site
                     , _description
                     , _impact
                     , _linkedComplaint);
        // trigger a submit event
        emit submitEvent(_reporter);
    }

    // Get a complaint entry with an index / id
    function getComplaint (uint complaintIndex) public view returns (complaintEntry memory) {
        uint entryIndex = entriesIndex[complaintIndex];        
        return entries[complaintIndex][entryIndex];
    }

    // Get the name of a complaint entry with an index / id
    function getName (uint complaintIndex) public view returns (string memory) {
        complaintEntry memory thisComplaint;
        thisComplaint  = getComplaint(complaintIndex);
        return thisComplaint.name;
    }
    
    // Get the id of a complaint entry with an index / id
    function getId (uint complaintIndex) public view returns (uint) {
        complaintEntry memory thisComplaint;
        uint returnId = 0;
        thisComplaint  = getComplaint(complaintIndex);
        returnId = thisComplaint.id;
        return thisComplaint.id;
    }

    // // TODO: complete function to print all linked Entries
    // function retrieveEntry () public  view returns (string[2][] memory) {
    //             complaintEntry memory thisComplaint;
    //     thisComplaint  = getComplaint(complaintIndex);
    //     return results;
    // }
}