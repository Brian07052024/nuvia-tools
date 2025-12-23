import { useColor } from "../../hook/useColor";
import { toPng } from 'html-to-image';

function AsideRight() {
    const { colors, setColors, format, gradientRef, mode } = useColor();

    const handleColorChange = (index, newColor) => {
        setColors(prevColors => {
            const newColors = [...prevColors];
            newColors[index] = newColor;
            return newColors;
        });
    };

    const handleExportImage = async () => {
        if (!gradientRef.current) {
            alert("No hay gradiente para exportar");
            return;
        }

        try {
            //determinar dimensiones según el formato
            let width, height;
            switch (format) {
                case "16/9": //full HD landscape
                    width = 1920;
                    height = 1080;
                    break;
                case "9/16": //full HD portrait (stories)
                    width = 1080;
                    height = 1920;
                    break;
                case "1/1": // Square
                    width = 1080;
                    height = 1080;
                    break;
                case "4/3": // Standard
                    width = 1600;
                    height = 1200;
                    break;
                default:
                    width = 1920;
                    height = 1080;
            }

            //capturar con alta calidad
            const dataUrl = await toPng(gradientRef.current, {
                cacheBust: true,
                pixelRatio: 2, // Mayor resolución
                width: width,
                height: height,
                style: {
                    borderRadius: '0', //quitar bordes redondeados en la exportación
                    boxShadow: 'none', //quitar sombra
                    transform: 'none', //quitar transformaciones
                }
            });

            //descargar imagen
            const link = document.createElement('a');
            link.download = `gradient-${format.replace('/', 'x')}-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();

        } catch (error) {
            console.error('Error al exportar imagen:', error);
            alert('Error al exportar la imagen. Intenta de nuevo.');
        }
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

    const paletasDefault = [
        { name: "Gold Experience", colors: ["#FFD700", "#FFC300", "#FF1493", "#8B4789"] },
        { name: "Nuvia", colors: ["#FFB7C5", "#E1A1C5", "#C4B5FD", "#67E8F9"] },
        { name: "Gojo Satoru", colors: ["#27254C", "#564A94", "#9B8AB4", "#F2ECF8"] },
        { name: "Sakura Dreams", colors: ["#FFB7C5", "#ffc7e3", "#FFF0F5", "#E6E6FA"] },
        { name: "Instagram", colors: ["#833AB4", "#FD1D1D", "#F77737", "#FCAF45"] },
        { name: "Océano Fresco", colors: ["#B4E7CE", "#A8DADC", "#457B9D", "#1D3557"] },
        { name: "Atardecer Cálido", colors: ["#FFF4E6", "#FFD4A3", "#FF9A76", "#F87060"] },
        { name: "Azul Profesional", colors: ["#E3F2FD", "#90CAF9", "#42A5F5", "#1976D2"] },
        { name: "Verde Natural", colors: ["#F0F4C3", "#DCE775", "#AED581", "#66BB6A"] },
        { name: "Todoroki Fire & Ice", colors: ["#FF4500", "#FF6347", "#87CEEB", "#4682B4"] },

    ]

    const handleSetPalette = (paleta) => {
        setColors(paleta.colors);
    }

    return (
        <div className="bg-white col-span-2 p-4 rounded-2xl gap-5 flex flex-col overflow-y-scroll border border-gray-300">
            <button 
                onClick={handleExportImage}
                className="flex gap-2 justify-center items-center cursor-pointer bg-linear-to-r from-nuviaFrom to-nuviaTo px-4 py-3 text-white rounded-2xl text-center font-medium hover:brightness-110 transition-all duration-200"
            >
                Exportar Imagen <img src="/svg/download.svg" alt="icon" />
            </button>

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

                    {paletasDefault.map((paleta, idx) => (
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