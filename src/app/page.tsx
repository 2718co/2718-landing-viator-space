'use client';

import dynamic from 'next/dynamic';
import Logo from './components/Logo';
import Countdown from './components/landing/Countdown';
import GlowButton from './components/landing/GlowButton';
import LandingPageBackground from './components/landing/LandingPageBackground';
import Logo2718 from './components/landing/Logo2718';
import ViatorInline from './components/landing/ViatorInline';
import ViatorLogo from './components/landing/ViatorLogo';

const Scene = dynamic(() => import('./components/landing/Scene'), {
    ssr: true
});
// TODO: frh -> remove this once project is complete
// import Scene from "./components/landing/Scene";

// const Spacecraft = dynamic(() => import("./components/landing/Spacecraft"), {
//   ssr: false,
// });

const HomePage = () => {
    // const eventSourceRef = useRef<HTMLCanvasElement>();
    return (
        <main className="relative flex h-screen flex-col py-12">
            <LandingPageBackground />
            <div className="relative m-auto flex max-w-2xl flex-1 flex-col items-center justify-between">
                <Logo />
                <div className="relative h-72 w-full overflow-visible">
                    <div className="absolute -left-36 top-4 flex flex-col text-[6px] text-white">
                        <span>Location: TRAPPIST Solar System</span>
                        <span>Edl COORDINATES *ACQUIRED*</span>
                        <span>2718 OPERATED</span>
                        <span>VIATOR PROGRAM</span>
                    </div>
                    <div className=""></div>
                    <div className="h-full w-full overflow-visible">
                        <Scene className="w-screen"></Scene>
                    </div>
                    <div className="absolute -left-32 bottom-4 flex flex-col text-[6px] text-white">
                        <span>RA: 23h 06m 29.368s</span>
                        <span>DEC: -05° 02&apos; 29.04&quote;</span>
                        <span>m: 18.798 ± 0.082</span>
                        <span>12.47 ± 0.01 Parsec</span>
                        <span>MISSION TO EXPAND CREATIVITY</span>
                        <span>AND TO INSPIRE</span>
                    </div>
                </div>
                <ViatorLogo />
                <div className="flex flex-col items-center gap-8 text-xs uppercase text-white">
                    <span className="inline-flex items-baseline">
                        Welcome to the <ViatorInline /> Space program
                    </span>
                    <span className="flex flex-col items-center">
                        <span className="inline-flex items-baseline text-center">
                            The <ViatorInline /> program, also known as project <ViatorInline />, is the first human
                            spaceflight
                        </span>
                        <span className="inline-flex items-baseline text-center">
                            program carried out by the 2718 Collective. Working to reach the
                        </span>
                        <span className="inline-flex items-baseline text-center">
                            trappist solar system, our plan is to bring back inspiration to
                        </span>
                        <span className="inline-flex items-baseline text-center">
                            humankind, and to test the limits of what is possible.
                        </span>
                    </span>
                    <span>do not fear the unknown. Explore.</span>
                </div>
                <Logo2718 />
            </div>
            <div className="relative mt-28 flex flex-col items-end justify-between px-12 lg:flex-row">
                <div className="flex-1"></div>
                <div className="flex-shrink flex-grow-0">
                    <GlowButton />
                </div>
                <div className="flex flex-1 justify-end">
                    <Countdown />
                </div>
            </div>
        </main>
    );
};

export default HomePage;
