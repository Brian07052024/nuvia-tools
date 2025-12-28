import { useState, useEffect } from "react";
import { useColor } from "../../hook/useColor";
import { useExport } from "../../hook/useExport";
import { useToast } from "../../contexts/ToastContext";
import { defaultPalettes } from "../../constants/palettes";
import ConfirmModal from "../common/ConfirmModal";

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
    const { showSuccess, showError, showInfo } = useToast();

    // Estado para paletas guardadas
    const [savedPalettes, setSavedPalettes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [paletteToDelete, setPaletteToDelete] = useState(null);

    // Estados para secciones colapsables en móvil
    const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(true);
    const [isSavedPalettesOpen, setIsSavedPalettesOpen] = useState(false);
    const [isPreloadedPalettesOpen, setIsPreloadedPalettesOpen] = useState(false);

    // Estado para controlar qué modal está abierto en móviles
    const [mobileModalOpen, setMobileModalOpen] = useState(null); // 'colors', 'saved', 'preloaded', null

    // Cargar paletas guardadas al iniciar
    useEffect(() => {
        try {
            const stored = window.localStorage.getItem("paletasUsuario");
            if (stored) {
                setSavedPalettes(JSON.parse(stored));
            }
        } catch (error) {
            console.error("Error al cargar paletas guardadas:", error);
        }
    }, []);

    // Handlers de colores
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
            showError("Solo puedes agregar 4 colores al gradiente");
            return;
        }

        setColors(prevColors => [...prevColors, "#e5e7eb"]);
    }

    const handleDelete = (index) => {
        if (colors.length > 1) {
            setColors(prevColors => prevColors.filter((_, i) => i !== index));
        }
        else {
            showError("Necesita haber al menos un color en pantalla");
        }
    }

    const handleSetPalette = (paleta) => {
        setColors(paleta.colors);
        setIsModalOpen(false);
    }

    const handleSave = () => {
        try {
            // Obtener paletas existentes
            const stored = window.localStorage.getItem("paletasUsuario");
            const existingPalettes = stored ? JSON.parse(stored) : [];

            // Crear nueva paleta con metadatos
            const newPalette = {
                id: Date.now(),
                name: `Paleta ${existingPalettes.length + 1}`,
                colors: [...colors],
                createdAt: new Date().toISOString()
            };

            // Agregar nueva paleta al array
            const updatedPalettes = [...existingPalettes, newPalette];

            // Guardar todas las paletas
            window.localStorage.setItem("paletasUsuario", JSON.stringify(updatedPalettes));
            setSavedPalettes(updatedPalettes);

            showSuccess("Paleta guardada exitosamente");
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
            showError("Error al guardar la paleta");
        }
    }

    const handleDeleteSavedPalette = (paletaId) => {
        try {
            const updatedPalettes = savedPalettes.filter(p => p.id !== paletaId);
            window.localStorage.setItem("paletasUsuario", JSON.stringify(updatedPalettes));
            setSavedPalettes(updatedPalettes);
            showSuccess("Paleta eliminada");
        } catch (error) {
            console.error("Error al eliminar paleta:", error);
            showError("Error al eliminar la paleta");
        }
    }



    return (

        // el abuelito -> 
        <>
            <div className="bg-white absolute top-0 left-0 right-0 flex flex-row justify-between gap-2 px-4 py-3 w-full border border-gray-300 rounded-b-2xl animate-fade-down z-10 md:relative md:z-auto md:col-span-2 md:p-4 md:gap-5 md:w-auto md:flex-col md:rounded-2xl md:overflow-y-scroll md:animate-fade-left">

                {/* Barra horizontal compacta para móviles */}
                <div className="flex gap-2 w-full md:hidden">
                    {/* Botón Paleta de colores */}
                    <button
                        onClick={() => setMobileModalOpen('colors')}
                        className="flex flex-1 flex-col justify-center items-center cursor-pointer border-2 border-gray-300 bg-white px-2 py-2 rounded-xl hover:bg-gray-100 transition-all"
                        aria-label="Abrir paleta de colores"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6b7280" class="bi bi-palette-fill" viewBox="0 0 16 16">
                            <path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07M8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                        </svg>
                        <span className="text-xs mt-1 text-gray-600 font-medium">Colores</span>
                    </button>

                    {/* Botón Mis Paletas */}
                    {savedPalettes.length > 0 && (
                        <button
                            onClick={() => setMobileModalOpen('saved')}
                            className="flex flex-1 flex-col justify-center items-center cursor-pointer border-2 border-gray-300 bg-white px-2 py-2 rounded-xl hover:bg-gray-100 transition-all relative"
                            aria-label="Abrir mis paletas"
                        >

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6b7280" class="bi bi-grid-3x3-gap-fill" viewBox="0 0 16 16">
                                <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                            </svg>
                            <span className="absolute -top-1 -right-1 bg-nuviaFrom text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{savedPalettes.length}</span>
                            <span className="text-xs mt-1 text-gray-600 font-medium">Guardadas</span>
                        </button>
                    )}

                    {/* Botón Paletas pre-cargadas */}
                    <button
                        onClick={() => setMobileModalOpen('preloaded')}
                        className="flex flex-1 flex-col justify-center items-center cursor-pointer border-2 border-gray-300 bg-white px-2 py-2 rounded-xl hover:bg-gray-100 transition-all"
                        aria-label="Abrir paletas pre-cargadas"
                    >
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6b7280" class="bi bi-bookmark-star-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5M8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.18.18 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.18.18 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.18.18 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.18.18 0 0 1-.134-.098z" />
                        </svg>
                        <span className="text-xs mt-1 text-gray-600 font-medium">Presets</span>
                    </button>

                    {/* Botón Exportar */}
                    {mode === "static" && (
                        <button
                            onClick={handleExportImage}
                            aria-label="Exportar imagen PNG"
                            className="flex gap-1 justify-center items-center cursor-pointer bg-linear-to-r from-nuviaFrom to-nuviaTo px-3 py-2 text-white rounded-xl text-center font-medium hover:brightness-110 transition-all duration-200 text-sm flex-1"
                        >
                            <img src="/svg/download.svg" alt="icon" className="w-4 h-4" />
                            <span>Exportar</span>
                        </button>
                    )}
                    {mode === "animated" && (
                        <button
                            onClick={handleExportVideo}
                            disabled={isRecording}
                            aria-label="Exportar video WebM"
                            className={`relative flex gap-1 justify-center items-center cursor-pointer bg-linear-to-r from-nuviaFrom to-nuviaTo px-3 py-2 text-white rounded-xl text-center font-medium hover:brightness-110 transition-all duration-200 text-sm flex-1 ${isRecording ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {isRecording && (
                                <div
                                    className="absolute left-0 top-0 h-full bg-white/20 transition-all duration-300 pointer-events-none rounded-xl"
                                    style={{ width: `${recordingProgress}%` }}
                                />
                            )}
                            <span className="relative z-10">{isRecording ? `${recordingProgress}%` : 'Exportar'}</span>
                        </button>
                    )}
                </div>

                {/* Contenido completo para desktop */}
                <div className="hidden md:flex md:flex-col md:gap-5 md:w-full">

                    {/* Botón exportar imagen */}
                    {mode === "static" && (
                        <button
                            onClick={handleExportImage}
                            aria-label="Exportar imagen PNG"
                            className="flex gap-2 justify-center items-center cursor-pointer bg-linear-to-r from-nuviaFrom to-nuviaTo px-4 py-2 md:py-3 text-white rounded-2xl text-center font-medium hover:brightness-110 transition-all duration-200 text-sm md:text-base"
                        >
                            <span className="hidden md:inline">Exportar Imagen</span>
                            <span className="md:hidden">Exportar</span>
                            <img src="/svg/download.svg" alt="icon" />
                        </button>
                    )}

                    {/* Botón exportar video */}
                    {mode === "animated" && (
                        <button
                            onClick={handleExportVideo}
                            disabled={isRecording}
                            aria-label="Exportar video WebM"
                            className={`relative flex gap-2 justify-center items-center cursor-pointer bg-linear-to-r from-nuviaFrom to-nuviaTo px-4 py-2 md:py-3 text-white rounded-2xl text-center font-medium hover:brightness-110 transition-all duration-200 text-sm md:text-base ${isRecording ? 'bg-gray-400! cursor-not-allowed' : ''}`}
                        >
                            {isRecording && (
                                <div
                                    className="absolute left-0 top-0 h-full bg-white/20 transition-all duration-300 pointer-events-none"
                                    style={{ width: `${recordingProgress}%` }}
                                />
                            )}
                            <span className="hidden md:inline">{isRecording ? `Grabando... ${recordingProgress}%` : 'Exportar Video'}</span>
                            <span className="md:hidden">{isRecording ? `${recordingProgress}%` : 'Exportar'}</span>
                            <img src="/svg/download.svg" alt="icon" className="hidden md:inline" />
                        </button>
                    )}

                    {/* Paleta de colores */}
                    <div className="flex flex-col gap-3 md:flex">
                        <div className="flex gap-2 items-center justify-between">
                            <h2 className="text-gray-800 font-medium whitespace-nowrap">Paleta de colores</h2>
                            <button
                                onClick={() => setIsColorPaletteOpen(!isColorPaletteOpen)}
                                className="md:hidden p-1 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <svg
                                    className={`w-5 h-5 transition-transform ${isColorPaletteOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="md:hidden w-full h-px bg-gray-200"></div>
                            <button
                                onClick={() => handleSave()}
                                className="cursor-pointer gap-1.5 text-gray-500 border-gray-300 hover:bg-gray-100 hover:border-gray-400 border-2 flex items-center px-3 py-1.5 justify-center rounded-full transition-all shadow-sm hover:shadow flex-1"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 16 16"
                                    fill="#6b7280"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z" />
                                </svg>
                                <span className="text-xs font-medium">Guardar</span>
                            </button>
                        </div>

                        <div className={`${isColorPaletteOpen ? 'flex' : 'hidden'} md:flex flex-col gap-2`}>
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
                                        aria-label={`Selector de color ${index + 1}`}
                                        className="w-full h-8 rounded-full cursor-pointer transition-all duration-200 shadow"
                                    />
                                    <button
                                        onClick={() => handleDelete(index)}
                                        aria-label={`Eliminar color ${index + 1}`}
                                        className="rounded-full w-8 h-8 flex justify-center items-center p-1 hover:bg-red-200 transition-colors cursor-pointer"
                                    >
                                        <img src="/svg/x.svg" alt="delete" />
                                    </button>
                                </div>
                            ))}

                            <button
                                onClick={handleClick}
                                aria-label="Agregar nuevo color"
                                className="shadow transition-colors w-full flex items-center justify-center gap-2 rounded-2xl border-2 py-2 cursor-pointer text-gray-500 border-gray-300 hover:bg-gray-100"
                            >
                                <img src="/svg/plus.svg" alt="" />
                                <span className="text-sm font-medium">Agregar color</span>
                            </button>
                        </div>
                    </div>

                    {/* Botón para abrir modal de paletas guardadas */}
                    {savedPalettes.length > 0 && (
                        <div className="relative">
                            {/* Header con toggle para móvil */}
                            <div className="flex items-center justify-between md:hidden mb-2">
                                <h2 className="text-gray-800 font-medium">Mis Paletas ({savedPalettes.length})</h2>
                                <button
                                    onClick={() => setIsSavedPalettesOpen(!isSavedPalettesOpen)}
                                    className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    <svg
                                        className={`w-5 h-5 transition-transform ${isSavedPalettesOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Botón para desktop */}
                            <button
                                onClick={() => setIsModalOpen(!isModalOpen)}
                                className={`shadow transition-colors w-full items-center justify-center gap-2 rounded-2xl border-2 py-2 px-4 cursor-pointer relative hidden md:flex ${isModalOpen ? "text-gray-800 border-gray-400 bg-gray-200" : "text-gray-500 border-gray-300 hover:bg-gray-100"}`}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="#6b7280"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5zM1.5 1a.5.5 0 0 0-.5.5V5h4V1zM5 6H1v4h4zm1 4h4V6H6zm-1 1H1v3.5a.5.5 0 0 0 .5.5H5zm1 0v4h4v-4zm5 0v4h3.5a.5.5 0 0 0 .5-.5V11zm0-1h4V6h-4zm0-5h4V1.5a.5.5 0 0 0-.5-.5H11zm-1 0V1H6v4z" />
                                </svg>
                                <span className="text-sm font-medium">Mis Paletas ({savedPalettes.length})</span>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 absolute right-4 ${isModalOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Vista colapsable móvil */}
                            {isSavedPalettesOpen && (
                                <div className="md:hidden flex flex-col gap-3 animate-fade-down">
                                    {savedPalettes.map((paleta) => (
                                        <div key={paleta.id} className="group">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="text-xs text-gray-500 font-medium">{paleta.name}</h4>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPaletteToDelete(paleta.id);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="text-red-500 hover:text-red-700 text-xs px-2 py-1 hover:bg-red-50 rounded transition-all"
                                                    title="Eliminar paleta"
                                                >
                                                    🗑️
                                                </button>
                                            </div>

                                            <div
                                                className="flex shadow-md rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 h-14"
                                                onClick={() => handleSetPalette(paleta)}
                                            >
                                                {paleta.colors.map((color, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="w-full h-full"
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Modal de paletas guardadas (desktop) */}
                            {isModalOpen && (
                                <>
                                    {/* Overlay para cerrar modal al hacer clic afuera */}
                                    <div
                                        className="fixed inset-0 z-40 animate-fade-down"
                                        onClick={() => setIsModalOpen(false)}
                                    />

                                    {/* Panel modal */}
                                    <div className="absolute animate-duration-400 animate-fade-down left-0 top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto hidden md:block">
                                        <div className="p-4">
                                            <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-2 border-b border-gray-200">
                                                <h3 className="text-gray-800 font-semibold">Mis Paletas</h3>
                                                <button
                                                    onClick={() => setIsModalOpen(false)}
                                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <div className="flex flex-col gap-3">
                                                {savedPalettes.map((paleta) => (
                                                    <div key={paleta.id} className="group">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <h4 className="text-xs text-gray-500 font-medium">{paleta.name}</h4>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setPaletteToDelete(paleta.id);
                                                                    setShowDeleteModal(true);
                                                                }}
                                                                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs px-2 py-1 hover:bg-red-50 rounded transition-all"
                                                                title="Eliminar paleta"
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>

                                                        <div
                                                            className="flex shadow-md rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 h-14"
                                                            onClick={() => handleSetPalette(paleta)}
                                                        >
                                                            {paleta.colors.map((color, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="w-full h-full"
                                                                    style={{ backgroundColor: color }}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* Paletas pre-cargadas */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-gray-800 font-medium">Paletas pre-cargadas</h2>
                            <button
                                onClick={() => setIsPreloadedPalettesOpen(!isPreloadedPalettesOpen)}
                                className="md:hidden p-1 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <svg
                                    className={`w-5 h-5 transition-transform ${isPreloadedPalettesOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        <div className={`${isPreloadedPalettesOpen ? 'flex' : 'hidden'} md:flex flex-col gap-2`}>
                            {defaultPalettes.map((paleta, idx) => (
                                <div key={idx} className="flex flex-col gap-1">
                                    <h3 className="text-xs text-gray-400">{paleta.name}</h3>

                                    <div
                                        className="flex shadow rounded-2xl max-h-14 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => handleSetPalette(paleta)}
                                    >
                                        <span className="w-full h-16" style={{ backgroundColor: paleta.colors[0] }}></span>
                                        <span className="w-full h-16" style={{ backgroundColor: paleta.colors[1] }}></span>
                                        <span className="w-full h-16" style={{ backgroundColor: paleta.colors[2] }}></span>
                                        <span className="w-full h-16" style={{ backgroundColor: paleta.colors[3] }}></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Modal móvil - Paleta de colores */}
                {mobileModalOpen === 'colors' && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/30 z-50 md:hidden"
                            onClick={() => setMobileModalOpen(null)}
                            aria-hidden="true"
                        />
                        <div
                            role="dialog"
                            aria-labelledby="modal-colors-title"
                            aria-modal="true"
                            className="fixed inset-x-4 top-20 max-h-[70vh] bg-white rounded-2xl shadow-2xl z-60 flex flex-col md:hidden animate-fade-down animate-duration-300"
                            onKeyDown={(e) => e.key === 'Escape' && setMobileModalOpen(null)}
                        >
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <h2 id="modal-colors-title" className="text-gray-800 font-semibold">Paleta de colores</h2>
                                <button
                                    onClick={() => setMobileModalOpen(null)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label="Cerrar modal"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="overflow-y-auto p-4 flex-1">
                                <div className="flex flex-col gap-2 mb-4">
                                    {colors.map((colorValue, index) => (
                                        <div key={index} className="flex gap-2 items-center">
                                            <input
                                                type="color"
                                                value={colorValue}
                                                onChange={(e) => handleColorChange(index, e.target.value)}
                                                aria-label={`Selector de color ${index + 1}`}
                                                className="w-full h-12 rounded-xl cursor-pointer shadow-md"
                                            />
                                            <button
                                                onClick={() => handleDelete(index)}
                                                aria-label={`Eliminar color ${index + 1}`}
                                                className="rounded-xl w-12 h-12 flex justify-center items-center hover:bg-red-100 transition-colors"
                                            >
                                                <img src="/svg/x.svg" alt="delete" className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={handleClick}
                                    className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 py-3 text-gray-600 hover:bg-gray-100 transition-all"
                                >
                                    <img src="/svg/plus.svg" alt="" />
                                    <span className="font-medium">Agregar color</span>
                                </button>
                                <button
                                    onClick={() => {
                                        handleSave();
                                        setMobileModalOpen(null);
                                    }}
                                    className="w-full mt-3 flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 py-3 text-gray-600 hover:bg-gray-100 transition-all"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="#6b7280" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z" />
                                    </svg>
                                    <span className="font-medium">Guardar paleta</span>
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* Modal móvil - Mis Paletas */}
                {mobileModalOpen === 'saved' && savedPalettes.length > 0 && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/30 z-50 md:hidden"
                            onClick={() => setMobileModalOpen(null)}
                            aria-hidden="true"
                        />
                        <div
                            role="dialog"
                            aria-labelledby="modal-saved-title"
                            aria-modal="true"
                            className="fixed inset-x-4 top-20 max-h-[70vh] bg-white rounded-2xl shadow-2xl z-60 flex flex-col md:hidden animate-fade-down animate-duration-300"
                            onKeyDown={(e) => e.key === 'Escape' && setMobileModalOpen(null)}
                        >
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <h2 id="modal-saved-title" className="text-gray-800 font-semibold">Mis Paletas ({savedPalettes.length})</h2>
                                <button
                                    onClick={() => setMobileModalOpen(null)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label="Cerrar modal"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="overflow-y-auto p-4 flex-1">
                                <div className="flex flex-col gap-4">
                                    {savedPalettes.map((paleta) => (
                                        <div key={paleta.id}>
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="text-sm text-gray-600 font-medium">{paleta.name}</h4>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPaletteToDelete(paleta.id);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 hover:bg-red-50 rounded transition-all"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                            <div
                                                className="flex shadow-lg rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-200 h-16"
                                                onClick={() => {
                                                    handleSetPalette(paleta);
                                                    setMobileModalOpen(null);
                                                }}
                                            >
                                                {paleta.colors.map((color, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="w-full h-full"
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Modal móvil - Paletas pre-cargadas */}
                {mobileModalOpen === 'preloaded' && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/30 z-50 md:hidden"
                            onClick={() => setMobileModalOpen(null)}
                            aria-hidden="true"
                        />
                        <div
                            role="dialog"
                            aria-labelledby="modal-preloaded-title"
                            aria-modal="true"
                            className="fixed inset-x-4 top-20 max-h-[70vh] bg-white rounded-2xl shadow-2xl z-60 flex flex-col md:hidden animate-fade-down animate-duration-300"
                            onKeyDown={(e) => e.key === 'Escape' && setMobileModalOpen(null)}
                        >
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <h2 id="modal-preloaded-title" className="text-gray-800 font-semibold">Paletas pre-cargadas</h2>
                                <button
                                    onClick={() => setMobileModalOpen(null)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label="Cerrar modal"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="overflow-y-auto p-4 flex-1">
                                <div className="flex flex-col gap-4">
                                    {defaultPalettes.map((paleta, idx) => (
                                        <div key={idx}>
                                            <h3 className="text-sm text-gray-500 mb-2">{paleta.name}</h3>
                                            <div
                                                className="flex shadow-lg rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all h-16"
                                                onClick={() => {
                                                    handleSetPalette(paleta);
                                                    setMobileModalOpen(null);
                                                }}
                                            >
                                                <span className="w-full h-full" style={{ backgroundColor: paleta.colors[0] }}></span>
                                                <span className="w-full h-full" style={{ backgroundColor: paleta.colors[1] }}></span>
                                                <span className="w-full h-full" style={{ backgroundColor: paleta.colors[2] }}></span>
                                                <span className="w-full h-full" style={{ backgroundColor: paleta.colors[3] }}></span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}


            </div>

            <ConfirmModal
                isOpen={showDeleteModal}
                title="¿Eliminar paleta?"
                message="Esta paleta será eliminada permanentemente. Esta acción no se puede deshacer."
                confirmText="Sí, eliminar"
                cancelText="Cancelar"
                type="danger"
                onConfirm={() => {
                    handleDeleteSavedPalette(paletteToDelete);
                    setShowDeleteModal(false);
                    setPaletteToDelete(null);
                }}
                onCancel={() => {
                    setShowDeleteModal(false);
                    setPaletteToDelete(null);
                }}
            />
        </>
    );
}

export default AsideRight;
