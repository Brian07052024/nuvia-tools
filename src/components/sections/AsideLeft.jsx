import { useColor } from "../../hook/useColor";

function AsideLeft() {
    const { format, setFormat, angle, setAngle, mode, setMode } = useColor();

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

    return (

        <div className="bg-white col-span-2 p-4 rounded-2xl gap-5 flex flex-col overflow-y-scroll border border-gray-300">
            {/* modo */}
            <div className="flex flex-col gap-3">
                <span className="text-gray-800 font-medium">Tipo de gradiente</span>

                <div className="flex gap-2">
                    <button onClick={() => handleMode("static")} className={`w-full rounded-full border-2 py-2 cursor-pointer ${mode === "static" ? "text-gray-800 border-gray-400 bg-gray-200" : "text-gray-500 border-gray-300"}`}>
                        Estatico
                    </button>

                    <button onClick={() => handleMode("animated")} className={`w-full rounded-full border-2 py-2 cursor-pointer ${mode === "animated" ? "text-gray-800 border-gray-400 bg-gray-200" : "text-gray-500 border-gray-300"}`}>
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

            {/* ajustes del gradiente */}
            <div className="flex flex-col gap-3 transition-all duration-300 ease-in-out">

                <span className="text-gray-800 font-medium">Ajustes del gradiente</span>
                <p className="text-xs text-gray-400">Angulo: <span className="text-xs text-gray-400 font-medium">{angle}°</span></p>
                <div className="flex flex-col gap-2">
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
            </div>
        </div>
    );
}

export default AsideLeft;