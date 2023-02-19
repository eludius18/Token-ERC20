//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

/// @title Lottery Smart Contract using block timestamp/difficulty as a source of randomness.
/// @author eludius18
/// @notice This Smart Contract allow to enter ETH and takes prizes
contract TokenERC20 is
    Initializable,
    ERC20Upgradeable,
    OwnableUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable
{
    //============== CONSTRUCTOR ==============
    constructor() {
        _disableInitializers();
    }

    //============== INITIALIZE ==============

    function initialize(string memory _tokenName, string memory _tokenSymbol) initializer public {
        __ERC20_init(_tokenName, _tokenSymbol);
        __Ownable_init();
        __Pausable_init();
    }

    //============== FUNCTIONS ==============

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}