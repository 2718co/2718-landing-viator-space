// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
// import { ERC721 } from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {ERC721} from "./base/ERC721.sol";
import {ERC721Checkpointable} from "./base/ERC721Checkpointable.sol";
import {IC2718Planet} from "./interfaces/IC2718Planet.sol";

contract C2718Planet is IC2718Planet, Ownable, ERC721Checkpointable {
    // The address with permissions to mint Planets
    address public minter;

    // Whether the minter can be updated
    bool public isMinterLocked;

    // The internal planet ID tracker
    uint256 private _currentPlanetId;

    // IPFS content hash of contract-level metadata
    string private _contractURIHash =
        "QmZi1n79FqWt2tTLwCqiy6nLM6xLGRsEPQ5JmReJQKNNzX";

    /**
     * @notice Require that the minter has not been locked.
     */
    modifier whenMinterNotLocked() {
        require(!isMinterLocked, "Minter is locked");
        _;
    }

    /**
     * @notice Require that the sender is the minter.
     */
    modifier onlyMinter() {
        require(msg.sender == minter, "Sender is not the minter");
        _;
    }

    constructor(address _minter) ERC721("Planet", "PLNT") {
        minter = _minter;
    }

    /**
     * @notice The IPFS URI of contract-level metadata.
     */
    function contractURI() public view returns (string memory) {
        return string(abi.encodePacked("ipfs://", _contractURIHash));
    }

    /**
     * @notice Set the _contractURIHash.
     * @dev Only callable by the owner.
     */
    function setContractURIHash(string memory newContractURIHash)
        external
        onlyOwner
    {
        _contractURIHash = newContractURIHash;
    }

    /**
     * @notice Mint a Planet to the minter, along with a possible 2718 Collective reward
     * Planet. 2718 Collective reward Planet are minted every 10 Planets, starting at 0,
     * until TODO 2718 Collective Planets have been minted  TODO(5 years w/ 24 hour auctions).
     * @dev Call _mintTo with the to address(es).
     */
    function mint() public override onlyMinter returns (uint256) {
        return _mintTo(minter, _currentPlanetId++);
    }

    /**
     * @notice Burn a Planet.
     */
    function burn(uint256 planetId) public override onlyMinter {
        _burn(planetId);
        emit PlanetBurned(planetId);
    }

    /**
     * @notice Set the token minter.
     * @dev Only callable by the owner when not locked.
     */
    function setMinter(address _minter) external onlyOwner whenMinterNotLocked {
        minter = _minter;

        emit MinterUpdated(_minter);
    }

    /**
     * @notice Lock the minter.
     * @dev This cannot be reversed and is only callable by the owner when not locked.
     */
    function lockMinter() external onlyOwner whenMinterNotLocked {
        isMinterLocked = true;

        emit MinterLocked();
    }

    /**
     * @notice Mint a Token with `tokenId` to the provided `to` address.
     */
    function _mintTo(address to, uint256 planetId) internal returns (uint256) {
        // IC2718Seeder.Seed memory seed = seeds[planetId] = seeder.generateSeed(planetId);

        _mint(owner(), to, planetId);
        emit PlanetCreated(planetId);

        return planetId;
    }
}
