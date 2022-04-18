//SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

contract Airdrop is Ownable {
    address public signer;
    mapping(uint256 => bool) public orders;

    event Claim(address indexed user, uint256 id, uint256 amount);
    event SetSigner(address signer);
    event Deposit(address indexed sender, uint256 amount);
    event Withdraw(address indexed sender, uint256 amount);

    constructor(address _signer) {
        setSigner(_signer);
    }

    function setSigner(address _signer) public onlyOwner {
        require(_signer != address(0), "!address");
        signer = _signer;
        emit SetSigner(_signer);
    }

    function claim(
        uint256 id,
        uint256 amount,
        uint256 deadline,
        bytes memory signature
    ) external {
        require(block.timestamp < deadline, "too late");
        require(!orders[id], "already claim");
        require(valid(msg.sender, id, amount, deadline, signature), "!sig");

        orders[id] = true;
        payable(msg.sender).transfer(amount);
        emit Claim(msg.sender, id, amount);
    }

    function valid(
        address user,
        uint256 id,
        uint256 amount,
        uint256 deadline,
        bytes memory signature
    ) public view returns (bool) {
        bytes32 h = hash(user, id, amount, deadline);
        return SignatureChecker.isValidSignatureNow(signer, h, signature);
    }

    function hash(
        address user,
        uint256 id,
        uint256 amount,
        uint256 deadline
    ) public pure returns (bytes32) {
        return ECDSA.toEthSignedMessageHash(keccak256(abi.encodePacked(user, id, amount, deadline)));
    }

    function adminWithdraw(uint256 amount) external onlyOwner {
        if (amount == 0) {
            amount = address(this).balance;
        }
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount);
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }
}
