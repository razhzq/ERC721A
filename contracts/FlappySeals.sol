// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract FlappySeals is ERC721A, Ownable {

    using Strings for uint256;

    uint public maxSupply;
    uint public mintPerAddress;
    uint public pricePerNFT;
    string private _baseTokenURI;

    mapping(address => uint) private _addressMintCount;
    mapping(address => uint) private isAdmin;

    modifier onlyAdmin() {
        require(isAdmin[msg.sender] == 1);
        _;
    }

    constructor(address _admin) ERC721A("Flappy Seals" ,"SEALS") {
        maxSupply = 1000;
        mintPerAddress = 3;
        pricePerNFT = 0.015 ether;
        isAdmin[_admin] = 1;
    }

    function mint(uint256 _amount) external payable {
        require(totalSupply() < maxSupply, "Max supply reached");
        require(_addressMintCount[msg.sender] < mintPerAddress, "Exceeded max mint per address");
        require(msg.value >= pricePerNFT * _amount, "Not enough balance");
        _addressMintCount[msg.sender] += _amount;
        _mint(msg.sender, _amount);
    }

    function setPrice(uint _amount) public onlyOwner {
         pricePerNFT = _amount;
    }

    function setMaxMintPerAddress(uint _amount) public onlyOwner {
        mintPerAddress = _amount;
    }


    function withdraw() public onlyAdmin {
        payable(msg.sender).transfer(address(this).balance);
    }
    
      function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : "";
    }

}