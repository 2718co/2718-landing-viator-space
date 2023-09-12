/* eslint-disable no-unused-vars */

export enum RedeemPage {
    Form,
    Verification,
    Signing
}

export enum ClaimProcess {
    Claim,
    Save
}

export interface ClaimSubdomainProps {
    setClaimedSubdomain: (value: string) => void;
    setCurrentClaimPage: (value: ClaimProcess) => void;
}