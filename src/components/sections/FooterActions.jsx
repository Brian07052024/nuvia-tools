/**
 * Componente para la barra de acciones del footer
 */
function FooterActions({ onRandomize, onReset, onToggleCode }) {
    return (
        <div className="w-full flex justify-center items-center absolute bottom-24 md:bottom-4 left-0 right-0 animate-fade-up z-0 pointer-events-none">
            <div className="bg-neutral-800 flex gap-2 w-fit px-3 py-2 shadow-2xl rounded-full pointer-events-auto">
                <div
                    onClick={onRandomize}
                    className="flex flex-col justify-center items-center px-5 py-0.5 cursor-pointer rounded-full transition-colors hover:bg-white/15"
                >
                    <img src="/svg/random.svg" alt="icon" className="size-6 object-contain" />
                    <p className="text-xs text-white/50 m-0 p-0">Random</p>
                </div>

                <div
                    onClick={onReset}
                    className="flex flex-col justify-center items-center px-5 py-0.5 cursor-pointer rounded-full transition-colors hover:bg-white/15"
                >
                    <img src="/svg/restart.svg" alt="icon" className="size-6 object-contain" />
                    <p className="text-xs text-white/50 m-0 p-0">Reset</p>
                </div>

                <div
                    onClick={onToggleCode}
                    className="flex flex-col justify-center items-center px-5 py-0.5 cursor-pointer rounded-full transition-colors hover:bg-white/15"
                >
                    <img src="/svg/codeMode.svg" alt="icon" className="size-6 object-contain" />
                    <p className="text-xs text-white/50 m-0 p-0">Code</p>
                </div>
            </div>
        </div>
    );
}

export default FooterActions;
