import React from 'react';
import { classNames } from '../../utils/classnames';

interface ILeftArrowIconProps {
    className?: string;
}

const LeftArrowIcon = ({ className = '' }: ILeftArrowIconProps): JSX.Element => {
    return (
        <svg
            width="62"
            height="101"
            viewBox="0 0 62 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={classNames(className, '')}
        >
            <line
                x1="7.96875"
                y1="-7.96875"
                x2="67.1613"
                y2="-7.96875"
                transform="matrix(-0.707107 0.707107 0.707107 0.707107 61.125 8)"
                stroke="#EAEAEA"
                strokeWidth="15.9375"
                strokeLinecap="round"
            />
            <line
                x1="49.8555"
                y1="93"
                x2="8"
                y2="51.1445"
                stroke="#EAEAEA"
                strokeWidth="15.9375"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default LeftArrowIcon;
