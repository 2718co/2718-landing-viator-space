import Image from 'next/image';

const ManifestoPage = () => {
    return (
        <div className="flex flex-col space-y-12 text-center text-white">
            <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                    {/* Styles on this image are done with tailwind, forget about width and height values */}
                    <Image
                        width="431"
                        height="28"
                        src="/funky_dark.gif"
                        alt="Decorative animated banner"
                        className="h-7 w-2/6 select-none hidden lg:block"
                    />
                    <h1 className="text-highlight-size text-center w-2/6 font-bold mx-4">Manifesto</h1>
                    {/* Styles on this image are done with tailwind, forget about width and height values */}
                    <Image
                        width="431"
                        height="28"
                        src="/funky_dark.gif"
                        alt="Decorative animated banner"
                        className="h-7 w-2/6 select-none hidden lg:block"
                    />
                </div>
                <span className="text-text-size">Version 1.0</span>
            </div>
            <div className="flex flex-col text-left space-y-4">
                <h2 className="text-xl font-bold">Introduction</h2>
                <p className="text-text-size">
                    2718 is a native web3 culture brand at the intersection of fashion, technology, and art. We are
                    individuals with clear values and motivations to achieve great things.
                </p>
            </div>
            <div className="flex flex-col text-left space-y-4">
                <h2 className="text-xl font-bold text-highlight">1 - Positive Sum</h2>
                <p className="text-text-size">
                    Our purpose is to create products that offer the world something of significant value. Keeping all
                    stakeholders in mind, we endeavor to develop products that contribute sustainable value to the
                    world.
                </p>
            </div>
            <div className="flex flex-col text-left space-y-4">
                <h2 className="text-xl font-bold text-highlight">2 - Vision</h2>
                <p className="text-text-size">
                    We have a clear vision of what our future should look like, and we take proactive actions to attain
                    the desired end state.
                </p>
            </div>
            <div className="flex flex-col text-left space-y-4">
                <h2 className="text-xl font-bold text-highlight">3 - Hustler&apos;s Ambition</h2>
                <p className="text-text-size">
                    Step on grapes, put it in water, and tell you it&apos;s wine” We combine the resources at our
                    disposal in a creative and innovative manner.
                </p>
            </div>
            <div className="flex flex-col text-left space-y-4">
                <h2 className="text-xl font-bold text-highlight">4 - Vitamin Pills</h2>
                <p className="text-text-size">
                    We create things that improve people&apos;s well-being. Our goal is to inspire individuals to
                    create, in turn, inspiring others to do the same.
                </p>
            </div>
            <div className="flex flex-col text-left space-y-4">
                <h2 className="text-xl font-bold text-highlight">5 - Controlled fighters</h2>
                <p className="text-text-size">
                    To obtain the things you desire, which others also seek, you may need to engage in competition. We
                    compete in a collected and ethical manner, while adhering to moral principles.
                </p>
            </div>
        </div>
    );
};

export default ManifestoPage;
