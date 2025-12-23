import { useColor } from "../../hook/useColor";

function AsideLeft() {
    const { 
        format, setFormat, 
        angle, setAngle, 
        mode, setMode,
        gradientType, setGradientType,
        gradientBlur, setGradientBlur,
        gradientOpacity, setGradientOpacity,
        videoDuration, setVideoDuration,
        videoFps, setVideoFps,
        videoBitrate, setVideoBitrate
    } = useColor();

    const formats = [
        {
            nombre: "16:9",
            aspect: "16/9",
            icon: "/svg/horizontalNew.svg"
        },
        {
            nombre: "1:1",
            aspect: "1/1",
            icon: "/svg/square.svg"
        },
        {
            nombre: "9:16",
            aspect: "9/16",
            icon: "/svg/tiktokNew.svg"
        },
        {
            nombre: "4:3",
            aspect: "4/3",
            icon: "/svg/picture.svg"
        }
    ];

    const handleClick = (aspect) => {
        setFormat(aspect)
    }

    const handleAngleChange = (e) => {
        setAngle(Number(e.target.value))
    }

    const handleMode = (modo) => {
        setMode(modo);
        console.log(modo);
    }

    const handleDurationChange = (e) => {
        setVideoDuration(Number(e.target.value))
    }

    const handleFpsChange = (e) => {
        setVideoFps(Number(e.target.value))
    }

    const handleBitrateChange = (e) => {
        setVideoBitrate(Number(e.target.value))
    }

    const handleGradientTypeChange = (type) => {
        setGradientType(type)
    }

    const handleBlurChange = (e) => {
        setGradientBlur(Number(e.target.value))
    }

    const handleOpacityChange = (e) => {
        setGradientOpacity(Number(e.target.value))
    }

    return (

        <div className="bg-white col-span-2 p-4 rounded-2xl gap-5 flex flex-col overflow-y-scroll border border-gray-300">
            {/* modo */}
            <div className="flex flex-col gap-3">
                <span className="text-gray-800 font-medium">Tipo de gradiente</span>

                <div className="flex gap-2">
                    <button onClick={() => handleMode("static")} className={`w-full rounded-full border-2 py-2 cursor-pointer  ${mode === "static" ? "text-gray-800 border-gray-400 bg-gray-200" : "text-gray-500 border-gray-300 hover:bg-gray-100"}`}>
                        Estatico
                    </button>

                    <button onClick={() => handleMode("animated")} className={`w-full rounded-full border-2 py-2 cursor-pointer  ${mode === "animated" ? "text-gray-800 border-gray-400 bg-gray-200" : "text-gray-500 border-gray-300 hover:bg-gray-100"}`}>
                        Animado
                    </button>
                </div>

            </div>

            {/* formatos disponibles */}
            <div className="flex flex-col gap-3 transition-all duration-300 ease-in-out">
                <span className="text-gray-800 font-medium">Formato</span>
                <div className="grid grid-cols-2 gap-2">
                    {
                        formats.map((formato, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className={`
                                    cursor-pointer transition-all w-full h-auto p-2 rounded-2xl border-2 text-center flex flex-col gap-1 items-center justify-center hover:bg-gray-100  
                                        ${formato.aspect === format ? "text-gray-800 border-gray-400 bg-gray-200" : "text-gray-500 border-gray-300"}

                                `} onClick={() => handleClick(formato.aspect)}>                                     {/* icono del formato */}

                                    <img className="max-h-4 w-auto object-contain" src={formato.icon} alt="ico" /> {/* icono del formato */}

                                    <p className="text-xs">{formato.nombre}</p> {/* nombre del formato */}

                                </div>
                            )

                        })
                    }
                </div>
            </div>

            {/* ajustes del gradiente (solo cuando mode es static) */}
            {mode === "static" && (
                <div className="flex flex-col gap-3 transition-all duration-300 ease-in-out">
                    <span className="text-gray-800 font-medium">Ajustes del gradiente</span>
                    
                    {/* Tipo de gradiente */}
                    <div className="flex flex-col gap-2">
                        <p className="text-xs text-gray-400">Tipo de gradiente</p>
                        <div className="grid grid-cols-3 gap-2">
                            <button 
                                onClick={() => handleGradientTypeChange("linear")}
                                className={`py-2 px-3 cursor-pointer rounded-lg border-2 transition-all ${
                                    gradientType === "linear" 
                                        ? "text-gray-800 border-gray-400 bg-gray-200" 
                                        : "text-gray-500 border-gray-300 hover:bg-gray-100"
                                }`}
                            >
                                Linear
                            </button>
                            <button 
                                onClick={() => handleGradientTypeChange("radial")}
                                className={`py-2 px-3 cursor-pointer rounded-lg border-2 transition-all ${
                                    gradientType === "radial" 
                                        ? "text-gray-800 border-gray-400 bg-gray-200" 
                                        : "text-gray-500 border-gray-300 hover:bg-gray-100"
                                }`}
                            >
                                Radial
                            </button>
                            <button 
                                onClick={() => handleGradientTypeChange("conic")}
                                className={`py-2 px-3 cursor-pointer rounded-lg border-2 transition-all ${
                                    gradientType === "conic" 
                                        ? "text-gray-800 border-gray-400 bg-gray-200" 
                                        : "text-gray-500 border-gray-300 hover:bg-gray-100"
                                }`}
                            >
                                Conic
                            </button>
                        </div>
                    </div>

                    {/* Ángulo (solo para linear y conic) */}
                    {(gradientType === "linear" || gradientType === "conic") && (
                        <div className="flex flex-col gap-2">
                            <p className="text-xs text-gray-400">Ángulo: <span className="text-xs text-gray-400 font-medium">{angle}°</span></p>
                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={angle}
                                onChange={handleAngleChange}
                                className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                            />
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">0°</span>
                                <span className="text-xs text-gray-500">360°</span>
                            </div>
                        </div>
                    )}

                    {/* Blur */}
                    <div className="flex flex-col gap-2">
                        <p className="text-xs text-gray-400">Desenfoque: <span className="text-xs text-gray-400 font-medium">{gradientBlur}px</span></p>
                        <input
                            type="range"
                            min="0"
                            max="20"
                            step="1"
                            value={gradientBlur}
                            onChange={handleBlurChange}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                        />
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">0px</span>
                            <span className="text-xs text-gray-500">20px</span>
                        </div>
                    </div>

                    {/* Opacidad */}
                    <div className="flex flex-col gap-2">
                        <p className="text-xs text-gray-400">Opacidad: <span className="text-xs text-gray-400 font-medium">{gradientOpacity}%</span></p>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={gradientOpacity}
                            onChange={handleOpacityChange}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                        />
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">0%</span>
                            <span className="text-xs text-gray-500">100%</span>
                        </div>
                    </div>
                </div>
            )}

            {/* ajustes del video (solo cuando mode es animated) */}
            {mode === "animated" && (
                <div className="flex flex-col gap-3 transition-all duration-300 ease-in-out">
                    <span className="text-gray-800 font-medium">Ajustes del video</span>
                    
                    {/* Duración */}
                    <div className="flex flex-col gap-2">
                        <p className="text-xs text-gray-400">Duración: <span className="text-xs text-gray-400 font-medium">{videoDuration}s</span></p>
                        <input
                            type="range"
                            min="3"
                            max="30"
                            step="1"
                            value={videoDuration}
                            onChange={handleDurationChange}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                        />
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">3s</span>
                            <span className="text-xs text-gray-500">30s</span>
                        </div>
                    </div>

                    {/* FPS */}
                    <div className="flex flex-col gap-2">
                        <p className="text-xs text-gray-400">FPS: <span className="text-xs text-gray-400 font-medium">{videoFps}</span></p>
                        <input
                            type="range"
                            min="24"
                            max="60"
                            step="6"
                            value={videoFps}
                            onChange={handleFpsChange}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                        />
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">24</span>
                            <span className="text-xs text-gray-500">60</span>
                        </div>
                    </div>

                    {/* Calidad (Bitrate) */}
                    <div className="flex flex-col gap-2">
                        <p className="text-xs text-gray-400">Calidad: <span className="text-xs text-gray-400 font-medium">{videoBitrate} Mbps</span></p>
                        <input
                            type="range"
                            min="2"
                            max="20"
                            step="2"
                            value={videoBitrate}
                            onChange={handleBitrateChange}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                        />
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">2 Mbps</span>
                            <span className="text-xs text-gray-500">20 Mbps</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AsideLeft;