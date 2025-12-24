import { useColor } from "../../hook/useColor";

function Footer() {
    const {
        setColors,
        setFormat,
        setAngle,
        setMode,
        setGradientType,
        setGradientBlur,
        setGradientOpacity,
        setVideoDuration,
        setVideoFps,
        setVideoBitrate
    } = useColor();

    const handleReset = () => {
        const confirmar = confirm(
            "Se perderán todas las configuraciones y cambios actuales. ¿Desea continuar?"
        );


        if (confirmar) {
            // Resetear valores
            setColors(["#e5e7eb"]);
            setFormat("16/9");
            setAngle(180);
            setMode("static");
            setGradientType("linear");
            setGradientBlur(0);
            setGradientOpacity(100);
            setVideoDuration(6);
            setVideoFps(30);
            setVideoBitrate(8);

            // Limpiar localStorage
            try {
                window.localStorage.removeItem("paletaActual");
                window.localStorage.removeItem("formatoActual");
                window.localStorage.removeItem("anguloActual");
                window.localStorage.removeItem("modoActual");
                window.localStorage.removeItem("tipoGradiente");
                window.localStorage.removeItem("desenfoque");
                window.localStorage.removeItem("opacidad");
                window.localStorage.removeItem("duracionVideo");
                window.localStorage.removeItem("fpsVideo");
                window.localStorage.removeItem("bitrateVideo");
            } catch (error) {
                console.error("Error al limpiar localStorage:", error);
            }
        }
    }
    return (
        <div className="w-lvw absolute bottom-1 animate-fade-up ">
            <div className="bg-neutral-800 flex gap-2 w-fit px-3 py-2  shadow-2xl rounded-full mx-auto ">

                <div className="flex flex-col justify-center items-center px-5 py-0.5 cursor-pointer rounded-full transition-colors hover:bg-white/15">
                    <img src="/svg/random.svg" alt="icon" className="size-6 object-contain" />
                    <p className="text-xs text-white/50 m-0 p-0">Random</p>
                </div>

                <div onClick={() => handleReset()} className="flex flex-col justify-center items-center px-5 py-0.5 cursor-pointer rounded-full transition-colors hover:bg-white/15" >
                    <img src="/svg/restart.svg" alt="icon" className="size-6 object-contain" />
                    <p className="text-xs text-white/50 m-0 p-0">Reset</p>
                </div>

                <div className="flex flex-col justify-center items-center px-5 py-0.5 cursor-pointer rounded-full transition-colors hover:bg-white/15">
                    <img src="/svg/codeMode.svg" alt="icon" className="size-6 object-contain" />
                    <p className="text-xs text-white/50 m-0 p-0">Code</p>
                </div>


            </div>
        </div>
    );
}

export default Footer;