import { useColor } from "../../hook/useColor";
import { useExport } from "../../hook/useExport";
import { defaultPalettes } from "../../constants/palettes";

function AsideRight() {
    const { 
        colors, setColors, format, gradientRef, mode,
        videoDuration, videoFps, videoBitrate
    } = useColor();
    
    const videoOptions = {
        duration: videoDuration,
        fps: videoFps,
        bitrate: videoBitrate
    };
    
    const { handleExportImage, handleExportVideo, isRecording, recordingProgress } = useExport(gradientRef, format, mode, videoOptions);

    const handleColorChange = (index, newColor) => {
        setColors(prevColors => {
            const newColors = [...prevColors];
            newColors[index] = newColor;
            return newColors;
        });
    };

    const handleClick = () => {
        const limite = colors.filter(valor => valor !== "");

        if (limite.length >= 4) {
            alert("Solo puedes agregar 4 colores al gradiente");
            return;
        }

        setColors(prevColors => [...prevColors, "#e5e7eb"]);
    }

    const handleDelete = (index) => {
        if (colors.length > 1) {
            setColors(prevColors => prevColors.filter((_, i) => i !== index));
        }
        else {
            alert("Necesita haber almenos un color en pantalla...")
        }
    }

    const handleSetPalette = (paleta) => {
        setColors(paleta.colors);
    }

    return (
        <div className="bg-white col-span-2 p-4 rounded-2xl gap-5 flex flex-col overflow-y-scroll border border-gray-300">

            {mode === "static" && (
                <button
                    onClick={handleExportImage}
                    className="flex gap-2 justify-center items-center cursor-pointer bg-linear-to-r from-nuviaFrom to-nuviaTo px-4 py-3 text-white rounded-2xl text-center font-medium hover:brightness-110 transition-all duration-200"
                >
                    Exportar Imagen <img src="/svg/download.svg" alt="icon" />
                </button>
            )}

            {mode === "animated" && (
                <button
                    onClick={handleExportVideo}
                    disabled={isRecording}
                    className={`relative flex gap-2 justify-center items-center cursor-pointer bg-linear-to-r from-nuviaFrom to-nuviaTo px-4 py-3 text-white rounded-2xl text-center font-medium hover:brightness-110 transition-all duration-200 ${isRecording ? 'bg-gray-400! cursor-not-allowed' : ''}`}
                >
                    {isRecording && (
                        <div
                            className="absolute left-0 top-0 h-full bg-white/20 transition-all duration-300 pointer-events-none"
                            style={{ width: `${recordingProgress}%` }}
                        />
                    )}
                    {isRecording ? `Grabando... ${recordingProgress}%` : 'Exportar Video'} <img src="/svg/download.svg" alt="icon" />
                </button>
            )}
            <div className="flex flex-col gap-3 transition-all duration-300 ease-in-out  ">

                <span className="text-gray-800 font-medium">Paleta de colores</span>

                {/* colores elegidos por el usuario */}
                <div className="flex flex-col gap-2 transition-all duration-300 ease-in-out ">

                    {colors.map((colorValue, index) => (
                        <div
                            key={index}
                            className="flex gap-1 transition-all duration-300 ease-in-out animate-slideIn"
                            style={{
                                animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
                            }}
                        >
                            <input
                                type="color"
                                value={colorValue}
                                onChange={(e) => handleColorChange(index, e.target.value)}
                                className="w-full h-8 rounded-full cursor-pointer transition-all duration-200 shadow"
                            />
                            <button
                                onClick={() => handleDelete(index)}
                                className=" rounded-full w-8 h-8 flex justify-center items-center p-1 hover:bg-red-200 transition-colors cursor-pointer"
                            >
                                <img src="/svg/x.svg" alt="delete" />
                            </button>
                        </div>
                    ))}



                </div>
                {/* fin colores del usuario */}

                <button onClick={handleClick} className="w-full shadow border-gray-400 h-8 rounded-full cursor-pointer border-2 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <img src="/svg/plus.svg" alt="icon" />
                </button>

            </div>

            {/* colores default */}
            <div className="flex flex-col gap-3 transition-all duration-300 ease-in-out ">

                <span className="text-gray-800 font-medium">Paletas pre-cargadas</span>

                <div className="flex flex-col gap-2">

                    {defaultPalettes.map((paleta, idx) => (
                        <div key={idx} className="flex flex-col gap-1">
                            <span className="text-xs text-gray-400 px-2">{paleta.name}</span>
                            <div className="flex shadow rounded-2xl max-h-14 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleSetPalette(paleta)}>
                                <span className="w-full h-16" style={{ backgroundColor: paleta.colors[0] }}></span>
                                <span className="w-full h-16" style={{ backgroundColor: paleta.colors[1] }}></span>
                                <span className="w-full h-16" style={{ backgroundColor: paleta.colors[2] }}></span>
                                <span className="w-full h-16" style={{ backgroundColor: paleta.colors[3] }}></span>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
            {/* fin colores default */}

        </div>
    );
}

export default AsideRight;