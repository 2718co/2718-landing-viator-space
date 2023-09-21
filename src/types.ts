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
    SetName,
    TwoSteps
}

export type subdomainObj = {
    label: string;
    name: string;
    node: string;
    parentNode: string;
};

export interface ClaimSubdomainProps {
    subdomain?: subdomainObj;
    setSubdomain?: (subdomain: subdomainObj) => void;
    setCurrentClaimPage: (value: ClaimProcess) => void;
    setSelectedTabIndex?: (value: number) => void;
}

export type Toast = {
    message: string;
    txHash: string;
};
