const CountdownIpad = () => {
    return (
        <div className="hidden sm:flex lg:hidden mt-4 h-min flex-row justify-center items-center gap-2 rounded-xl bg-highlight px-4 py-3">
            <div className="m-2 h-2 w-2 rounded-full bg-green-500" />
            {/* <div className="m-2 h-2 w-2 rounded-full bg-[#E0A32D]" /> */}
            <span className="uppercase text-base text-white font-medium">Systems preparing</span>
            {/* <span className="uppercase text-white">06D 21H 39MIN until launch</span> */}
        </div>
    );
};

export default CountdownIpad;
