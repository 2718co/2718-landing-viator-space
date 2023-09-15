/* eslint-disable no-unused-vars */

export enum RedeemPage {
    Form,
    Verification,
    Signing
}

export enum ClaimProcess {
    Claim,
    Save,
    SetAddr,
    SetName
}

export interface ClaimSubdomainProps {
    subdomain?: string;
    setSubdomain?: (value: string) => void;
    setCurrentClaimPage: (value: ClaimProcess) => void;
    setSelectedTabIndex?: (value: number) => void;
}
