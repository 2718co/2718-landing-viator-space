// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IC2718AuctionHouse {
    struct Auction {
        // ID for the Planet (ERC721 token ID)
        uint256 planetId;
        // The current highest bid amount
        uint256 amount;
        // The time that the auction started
        uint256 startTime;
        // The time that the auction is scheduled to end
        uint256 endTime;
        // The address of the current highest bid
        address payable bidder;
        // Whether or not the auction has been settled
        bool settled;
    }

    event AuctionCreated(uint256 indexed planetId, uint256 startTime, uint256 endTime);

    event AuctionBid(uint256 indexed planetId, address sender, uint256 value, bool extended);

    event AuctionExtended(uint256 indexed planetId, uint256 endTime);

    event AuctionSettled(uint256 indexed planetId, address bidder, uint256 amount);

    event AuctionTimeBufferUpdated(uint256 timeBuffer);

    event AuctionReservePriceUpdated(uint256 reservePrice);

    event AuctionMinBidIncrementPercentageUpdated(uint8 minBidIncrementPercentage);

    function settleAuction() external;

    function settleCurrentAndCreateNewAuction() external;

    function createBid(uint256 planetId) external payable;

    function pause() external;

    function unpause() external;

    function setTimeBuffer(uint256 timeBuffer) external;

    function setReservePrice(uint256 reservePrice) external;

    function setMinBidIncrementPercentage(uint8 minBidIncrementPercentage) external;
}
