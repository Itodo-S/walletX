// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import './interfaces/IERC20.sol';

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
    }

    struct WalletMember {
        address memberAddress;
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

    function registerWallet(string memory _walletName) external {
        require(walletAdmin[msg.sender].active != true, "Cannot create multiple wallets with one wallet address");
        WalletOrganisation memory walletOrganisation = WalletOrganisation({
            walletName: _walletName,
            active: true,
            walletId: walletIdTrack
        });

        walletAdmin[msg.sender] = walletOrganisation;

    }

    function onboardMembers(address _memberAddress, string memory _memberName, uint256 _fundAmount, uint256 _memberIdentifier) onlyAdmin external {
        WalletMember memory member = WalletMember({
            memberAddress: _memberAddress,
            name: _memberName,
            active: true,
            spendLimit: _fundAmount,
            memberIdentifier: _memberIdentifier
        });

        uint adminBalance = IERC20(tokenAddress).balanceOf(msg.sender);

        if (adminBalance > _fundAmount) {
            IERC20(tokenAddress).approve(_memberAddress, _fundAmount);
        }

        walletMember[_memberAddress] = member;
        walletOrganisationMembers[msg.sender].push(member);

    }

    function reimburseMember(uint256 _memberIdentifier, uint256 _amount) external onlyAdmin {

        WalletMember[] memory members = walletOrganisationMembers[msg.sender];

        for(uint256 i = 0; i <= walletOrganisationMembers[msg.sender].length; i++) {
            if (members[i].memberIdentifier == _memberIdentifier) {
                members[i].spendLimit += _amount;
                IERC20(tokenAddress).approve(members[i].memberAddress, _amount);
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
