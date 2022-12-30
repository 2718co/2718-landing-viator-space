// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { IERC721 } from '@openzeppelin/contracts/token/ERC721/IERC721.sol';

interface IC2718Planet is IERC721 {
    event PlanetCreated(uint256 indexed planetId);

    event PlanetBurned(uint256 indexed planetId);

    event MinterUpdated(address minter);

    event MinterLocked();

    function mint() external returns (uint256);

    function burn(uint256 tokenId) external;
}
