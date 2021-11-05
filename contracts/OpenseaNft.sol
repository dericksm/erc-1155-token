pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NTFContract is ERC1155, Ownable {

    uint256 public constant ARTWORK=0;
    uint256 public constant PHOTO=1;

    constructor() ERC1155("https://1m9swv2knfm2.usemoralis.com/{id}.json"){
        _mint(msg.sender, ARTWORK, 1, "");
        _mint(msg.sender, PHOTO, 2, "");
    }

    function mint(address account, uint256 id, uint256 amount) public onlyOwner{

    }

    function burn(address account, uint256 id, uint256 amount) public{
        require(msg.sender == account);
        _burn(account, id, amount);
    }

}