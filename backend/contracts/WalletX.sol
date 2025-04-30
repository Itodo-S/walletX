// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import './interfaces/IERC20.sol';
import './lib/Errors.sol';


contract WalletX {
    address tokenAddress;
    address owner;

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
        owner = msg.sender;
    }

    struct WalletOrganisation {
        string walletName;
        bool active;
        uint walletId;
        uint walletBalance;
    }

    struct WalletMember {
        address memberAddress;
        string organizationName;
        string name;
        bool active;
        uint256 spendLimit; 
        uint256 memberIdentifier;
    }

    mapping (address => WalletOrganisation) walletAdmin;
    mapping (address => WalletMember) walletMember;

    mapping (address => WalletMember[]) walletOrganisationMembers;

    uint256 walletIdTrack = 1;

    modifier onlyAdmin {
        require(walletAdmin[msg.sender].active == true, "Not a wallet admin account");
        _;
    }

    function registerWallet(string memory _walletName, uint256 _fundAmount) external {
        require(walletAdmin[msg.sender].active != true, "Cannot create multiple wallets with one wallet address");

        // fund escrow with funds
        uint256 allowance = IERC20(tokenAddress).allowance(msg.sender, address(this));
        require(allowance == _fundAmount, "No allowance to spend funds at the moment");
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), _fundAmount);


        WalletOrganisation memory walletOrganisation = WalletOrganisation({
            walletName: _walletName,
            active: true,
            walletId: walletIdTrack,
            walletBalance: _fundAmount
        });

        walletIdTrack += 1;

        walletAdmin[msg.sender] = walletOrganisation;

    }

    function onboardMembers(address _memberAddress, string memory _memberName, uint256 _fundAmount, uint256 _memberIdentifier) onlyAdmin external {
        string memory _organizationName = walletAdmin[msg.sender].walletName;
        uint walletBalance = walletAdmin[msg.sender].walletBalance;

        if (walletBalance < _fundAmount) {
            revert Error.InsufficientFunds();
        }

        
        WalletMember memory member = WalletMember({
            memberAddress: _memberAddress,
            organizationName: _organizationName,
            name: _memberName,
            active: true,
            spendLimit: _fundAmount,
            memberIdentifier: _memberIdentifier
        });

        walletMember[_memberAddress] = member;
        walletOrganisationMembers[msg.sender].push(member);

    }

    function reimburseOrganization(uint256 _amount) external onlyAdmin {
        // fund escrow with funds
        uint256 allowance = IERC20(tokenAddress).allowance(msg.sender, address(this));
        require(allowance == _amount, "No allowance to spend funds at the moment");
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), _amount);


        walletAdmin[msg.sender].walletBalance += _amount;

    }

    function reimburseMember(uint256 _memberIdentifier, uint256 _amount) external onlyAdmin {

        uint walletBalance = walletAdmin[msg.sender].walletBalance;

        if (walletBalance < _amount) {
            revert Error.InsufficientFunds();
        }

        WalletMember[] storage members = walletOrganisationMembers[msg.sender];

        for(uint256 i = 0; i < members.length; i++) {
            if (members[i].memberIdentifier == _memberIdentifier) {
                members[i].spendLimit += _amount;
            }
        }
    }


    // Read functions

    function getMembers() onlyAdmin() external view returns(WalletMember[] memory members) {
        members = walletOrganisationMembers[msg.sender];
    }

    function getMember() external view returns(WalletMember memory member) {
        member = walletMember[msg.sender];
    }


}
