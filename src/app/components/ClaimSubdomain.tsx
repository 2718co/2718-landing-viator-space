import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

interface ClaimSubdomainProps {
    setCurrentClaimPage: (step: ClaimProcess) => void;
}

enum ClaimProcess {
    Claim,
    Wait,
    Register,
    Save
}

const validationSchema = Yup.object().shape({
    subdomain: Yup.string()
        .trim()
        .min(3, 'Subdomain must be at least 3 characters long')
        .required('Subdomain is required')
        .matches(/^\S*$/, 'Subdomain should not contain spaces')
});

export const ClaimSubdomain = ({ setCurrentClaimPage }: ClaimSubdomainProps) => {
    const initialValues = {
        subdomain: ''
    };

    const handleSubmit = (values: { subdomain: string }) => {
        if (values.subdomain) {
            setCurrentClaimPage(ClaimProcess.Wait);
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
                <div className="flex flex-1 flex-col justify-between space-y-3">
                    <div className="">
                        <h1 className="text-title-1-size text-dark-text">1. Claim your custom address</h1>
                        <span className="text-text-size text-light-text">
                            Claim your custom 2718 address for no costs except network fees. Follow the three steps to
                            own your own piece of the 2718 journey.
                        </span>
                    </div>
                    <div className="input-wrapper">
                        <Field type="text" name="subdomain" className="rounded-xl bg-white px-4 py-6 w-full" />
                        <ErrorMessage name="subdomain" component="div" className="text-red-500" />
                    </div>
                    <div className="">
                        <button
                            type="submit"
                            className="mono h-full w-full rounded-2xl bg-highlight py-4 font-mono text-button-text-size font-semibold text-dark-text hover:bg-hover-button"
                        >
                            Claim
                        </button>
                    </div>
                </div>
            </Form>
        </Formik>
    );
};
