import Logo from './Logo';
import Navlinks from './Navlinks';
import WalletConnector from './WalletConnector';

const Navbar = (): JSX.Element => {
    return (
        <>
            <div className="relative mb-20">
                <div className="z-10 flex w-full flex-row-reverse items-center justify-between lg:flex-row">
                    <div className="flex-shrink flex-grow basis-0">
                        <Navlinks />
                    </div>
                    <div className="w-9 flex-grow-0 lg:w-[86px]">
                        <Logo />
                    </div>
                    <div className="flex w-1 flex-shrink flex-grow lg:hidden"></div>
                    <div className="hidden flex-shrink flex-grow basis-0 flex-row justify-start lg:flex lg:justify-end">
                        <WalletConnector />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
