// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

struct AppStorage {
    uint a;
    uint b;
    uint8 c;
    uint8 d;
    address ContractA;
}

library Storage {
    bytes32 constant KEY = keccak256("my-storage-string");

    // create a dummy key for testing that stores at slot 2 in storage
    // bytes32 constant KEY = bytes32(uint256(2));

    function get() internal pure returns (AppStorage storage s) {
        bytes32 storageSlot = KEY;
        assembly {
            s.slot := storageSlot
        }
    }
}
