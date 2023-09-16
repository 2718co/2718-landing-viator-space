'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useAccount, useContractWrite, usePublicClient } from 'wagmi';
import { waitForTransaction } from 'wagmi/actions';
import * as Yup from 'yup';
import { AppContext } from '../../contexts';
import { useDomain, useNameWrapperContract, useNameWrapperProxyContract, usePublicResolverContract } from '../../hooks';
import NameWrapperABI from '../../shared/abi/NameWrapper.json';
import NameWrapperProxyABI from '../../shared/abi/NameWrapperProxy.json';
import { ClaimProcess, ClaimSubdomainProps } from '../../types';
import { getNode, getParentNode } from '../../utils';
import { Loading, WalletConnectButton } from '../components';

const validationSchema = Yup.object().shape({
    subdomain: Yup.string()
        .trim()
        .min(3, 'Subdomain must be at least 3 characters long')
        .required('Subdomain is required')
        .matches(/^\S*$/, 'Subdomain should not contain spaces')
});

export const ClaimSubdomain = ({ setSubdomain, setCurrentClaimPage }: ClaimSubdomainProps) => {
    const [subdomainExists, setSubdomainExists] = useState(false);
    const [loading, setLoading] = useState(false);
    const { address, isConnected } = useAccount();
    const domain = useDomain();
    const parentNode = getParentNode(domain) as `0x${string}`;
    const nameWrapperContract = useNameWrapperContract();
    const nameWrapperProxyContract = useNameWrapperProxyContract();
    const publicResolverContract = usePublicResolverContract();
    const publicClient = usePublicClient();
    const { setToast } = useContext(AppContext);

    const { writeAsync } = useContractWrite({
        address: nameWrapperProxyContract,
        abi: NameWrapperProxyABI,
        functionName: 'setSubnodeRecord'
    });

    const checkSubdomainExists = async (subdomain: string): Promise<boolean> => {
        const node = getNode(subdomain, parentNode);

        const data = await publicClient.readContract({
            address: nameWrapperContract as `0x${string}`,
            abi: NameWrapperABI,
            functionName: 'names',
            args: [node]
        });
        setSubdomainExists(!(data === '0x'));
        return !(data === '0x');
    };

    const handleSubmit = async (values: { subdomain: string }) => {
        // Note: we have to wait to check subdomain before submitting
        const _subdomainExists = await checkSubdomainExists(values?.subdomain);
        if (values?.subdomain && parentNode && address && publicResolverContract && !_subdomainExists) {
            const tx = await writeAsync({
                args: [parentNode, values.subdomain, address, publicResolverContract, 0, 0, 0]
            });
            setLoading(true);
            await waitForTransaction({ hash: tx.hash });
            setLoading(false);
            setToast({
                txHash: tx.hash,
                message: 'Your “Claim name” transaction was successful'
            });
            const node = getNode(values.subdomain, parentNode);
            setSubdomain?.({
                label: values.subdomain,
                name: `${values.subdomain}.${domain}.eth`,
                node,
                parentNode
            });
            setCurrentClaimPage(ClaimProcess.Save);
        }
    };

    const initialValues = {
        subdomain: ''
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ setFieldValue }) => (
                <Form>
                    <div className="flex flex-1 flex-col justify-between space-y-3">
                        <div className="">
                            <h1 className="text-title-1-size text-dark-text">
                                {!loading ? '1. Claim your custom address' : '2. Waiting for your transaction'}
                            </h1>
                            <span className="text-text-size text-light-text">
                                Claim your custom 2718 address for no costs except network fees. Follow the three steps
                                to own your own piece of the 2718 journey.
                            </span>
                        </div>
                        {loading ? (
                            <Loading width="w-16" />
                        ) : (
                            <>
                                <div className="input-wrapper">
                                    <div className="flex border rounded-xl">
                                        <Field
                                            type="text"
                                            name="subdomain"
                                            className="flex-1 w-full bg-white px-4 py-6 focus:outline-none focus:ring-0"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                setFieldValue('subdomain', e.target.value);
                                                checkSubdomainExists(e.target.value);
                                            }}
                                        />
                                        <span className="bg-gray-100 border-l px-4 py-6">.{domain}.eth</span>
                                    </div>
                                    {subdomainExists ? (
                                        <span className="text-red-500">This subdomain already exists</span>
                                    ) : (
                                        <ErrorMessage name="subdomain" component="div" className="text-red-500" />
                                    )}
                                </div>
                                <div>
                                    {isConnected ? (
                                        <button
                                            type="submit"
                                            className="mono h-full w-full rounded-2xl bg-highlight py-4 font-mono text-button-text-size font-semibold text-dark-text hover:bg-hover-button"
                                        >
                                            Claim
                                        </button>
                                    ) : (
                                        <WalletConnectButton className="bg-highlight text-dark-text w-full" />
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    );
};
