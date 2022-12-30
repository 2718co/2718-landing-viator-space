// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import { C2718AuctionHouse } from "../src/C2718AuctionHouse.sol";
import { IC2718AuctionHouse } from "../src/interfaces/IC2718AuctionHouse.sol";

contract C2718AuctionHouseTest is Test {
    C2718AuctionHouse public c2718AuctionHouse;

    function setUp() public {
        c2718AuctionHouse = new C2718AuctionHouse();
    }

    function testRevertSecondInitialization() public {
        vm.expectRevert();
    }

    function testAuctionHousePausesWhenSupplyDepleted() public {}

    function testOwnerCanUnpauseAndCreateFirstAuction() public {}

    function testRevertBidOnInactiveAuction() public {}

    function testRevertBidOnExpiredAuction() public {}

    function testRevertBidBelowReservePrice() public {}

    function testRevertBidLessThanIncrementValue() public {}

    function testRevertBidLessThanIncrementPercentage() public {}

    function testRefundPreviousBidderAfterBidCreation() public {}

    function testCapsMaximumBidGriefingCost() public {}

    function testEmitAuctionBidOnSuccessfulBid() public {}

    function testAuctionExtendWhenBidWithinTimebuffer() public {}

    function testEmitAuctionExtendedWhenAuctionExtends() public {}

    function testRevertSettlementWhileAuctionActive() public {}

    function testEmitAuctionSettledAndAuctionCreatedOnScheduleAndConditions() public {}

    function testAuctionCreationFailWhilePaused() public {} //FIXME

    function testCreateAuctionAfterSettlementAndPauseCycle() public {} //FIXME

    function testSettleCurrentAuctionAndPauseAuctionHouseIfMinterUpdatedWhileAuctionHouseUnpaused() public {}

    function testBurnPlanetOnNoAuctionBids() public {
        c2718AuctionHouse.unpause();
    }
}
