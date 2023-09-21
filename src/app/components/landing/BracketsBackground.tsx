const BracketsBackground = () => (
    <div className="relative flex h-screen w-screen flex-col justify-between p-12">
        {/* Top Left */}
        <div className="flex w-full justify-between">
            <svg xmlns="http://www.w3.org/2000/svg" width="43" height="62" fill="none" viewBox="0 0 43 62">
                <path
                    fill="#fff"
                    d="M2 61.98V21.91L21.9 2H43V0H9.67L0 9.67v52.31h2zM10.5 2h8.58L2 19.08V10.5L10.5 2z"
                ></path>
            </svg>

            {/* Top Right */}
            <svg xmlns="http://www.w3.org/2000/svg" width="43" height="62" fill="none" viewBox="0 0 43 62">
                <path
                    fill="#fff"
                    d="M41 61.98V21.91L21.1 2H0V0h33.33L43 9.67v52.31h-2zM32.5 2h-8.58L41 19.08V10.5L32.5 2z"
                ></path>
            </svg>
        </div>

        <div className="w-full justify-start"></div>
        {/* Bottom Left */}
        <svg
            className="hidden lg:block"
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="62"
            fill="none"
            viewBox="0 0 44 62"
        >
            <path
                fill="#fff"
                d="M0 .01v52.31l9.67 9.67h33.34v-2h-21.1L2.01 40.08V0h-2L0 .01zM2 51.5v-8.58L19.08 60H10.5L2 51.5z"
            ></path>
        </svg>

        {/* Bottom Right */}
        <svg
            className="hidden md:block lg:hidden"
            xmlns="http://www.w3.org/2000/svg"
            width="43"
            height="62"
            fill="none"
            viewBox="0 0 43 62"
        >
            <path
                fill="#fff"
                d="M41 0v40.07L21.1 59.98H0v2h33.33L43 52.31V0h-2zm-8.5 59.98h-8.58L41 42.9v8.58l-8.5 8.5z"
            ></path>
        </svg>
    </div>
);

export default BracketsBackground;
