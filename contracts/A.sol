// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Storage.sol";

contract A {
    function setA(uint _a) public {
        AppStorage storage s = Storage.get();
        s.a = _a;
    }

    function getA() public view returns (uint) {
        AppStorage storage s = Storage.get();
        return s.a;
    }
}

contract B {

    constructor(address _A) {
        AppStorage storage s = Storage.get();
        s.ContractA = _A;
        s.b = 4;
        s.c = 0x45;
        s.d = 0xF5;
    }

    function setB(uint _b) public {
        AppStorage storage s = Storage.get();
        s.b = _b;

        // A(ContractA).setA(_a + 1);

        s.ContractA.delegatecall(
            abi.encodeWithSignature("setA(uint256)", _b + 1)
        );
    }

    function getB() public view returns (uint) {
        AppStorage storage s = Storage.get();
        return s.b;
    }
}
