interface IPillCounterProps {
    index: number;
    total: number;
}

const PillCounter = ({ index, total }: IPillCounterProps): JSX.Element => {
    return (
        <span className="w-min rounded-lg bg-hover-button-20 px-5 py-1 font-mono text-highlight">
            {index}/{total}
        </span>
    );
};
export default PillCounter;
