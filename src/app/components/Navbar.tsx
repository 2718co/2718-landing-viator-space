import Logo from './Logo';
import Navlinks from './Navlinks';
import Wallet from './Wallet';

const Navbar = (): JSX.Element => {
    return (
        <>
            <div className="relative mb-20">
                <div className="z-10 flex w-full flex-row items-center justify-between lg:flex-row">
                    <div className="w-2/5 flex-shrink flex-grow basis-0">
                        <Navlinks />
                    </div>
                    <div className="w-1/5 flex-grow-0 lg:w-[86px]">
                        <Logo />
                    </div>
                    <div className="w-2/5 flex-shrink flex-grow basis-0 flex-row justify-start lg:flex lg:justify-end">
                        <div className="lg:hidden flex justify-end">
                            <Wallet
                                connectText="Connect"
                                className="text-base mr-0 ml-auto"
                                overrideStyles="px-4 py-2"
                            />
                        </div>
                        <div className="hidden lg:block">
                            <Wallet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
