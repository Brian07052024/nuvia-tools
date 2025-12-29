import { useState, useEffect, useCallback, memo } from "react";
import { useColor } from "../../hook/useColor";
import { useExport } from "../../hook/useExport";
import { useToast } from "../../contexts/ToastContext";
import { defaultPalettes } from "../../constants/palettes";
import ConfirmModal from "../common/ConfirmModal";
import AsideRightMobile from "../sectionsMobile/AsideRightMobile";

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

    // Estados para secciones colapsables en desktop
    const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(true);
    const [isSavedPalettesOpen, setIsSavedPalettesOpen] = useState(false);
    const [isPreloadedPalettesOpen, setIsPreloadedPalettesOpen] = useState(false);

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
            showError("Es necesario almenos 1 color");
        }
    }
    //checkpoint
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

            showSuccess("Paleta guardada");
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
            <div className="bg-white absolute top-0 left-0 right-0 flex flex-row justify-between gap-2 px-4 py-3 w-full border border-gray-300 rounded-b-2xl animate-fade-down z-20 lg:relative lg:z-auto lg:col-span-2 lg:p-4 lg:gap-5 lg:w-auto lg:flex-col lg:rounded-2xl lg:overflow-y-scroll lg:animate-fade-left">

                {/* Componente móvil */}
                <AsideRightMobile 
                    colors={colors}
                    handleColorChange={handleColorChange}
                    handleClick={handleClick}
                    handleDelete={handleDelete}
                    handleSave={handleSave}
                    handleSetPalette={handleSetPalette}
                    savedPalettes={savedPalettes}
                    handleDeleteSavedPalette={handleDeleteSavedPalette}
                    handleExportImage={handleExportImage}
                    handleExportVideo={handleExportVideo}
                    isRecording={isRecording}
                    recordingProgress={recordingProgress}
                    mode={mode}
                />

                {/* Contenido completo para desktop */}
                <div className="hidden lg:flex lg:flex-col lg:gap-5 lg:w-full">

                    {/* boton exportar imagen */}
                    {mode === "static" && (
                        <button
                            onClick={handleExportImage}
                            aria-label="Exportar imagen PNG"
                            className="flex gap-2 justify-center items-center cursor-pointer bg-neutral-800 px-4 py-2 lg:py-3 text-white rounded-2xl text-center font-medium hover:brightness-110 transition-all duration-200 text-sm lg:text-base"
                        >
                            <span className="hidden lg:inline">Exportar Imagen</span>
                            <span className="lg:hidden">Exportar</span>
                            <img src="/svg/download.svg" alt="icon" />
                        </button>
                    )}

                    {/* boton exportar video */}
                    {mode === "animated" && (
                        <button
                            onClick={handleExportVideo}
                            disabled={isRecording}
                            aria-label="Exportar video WebM"
                            className={`relative flex gap-2 justify-center items-center cursor-pointer bg-neutral-800 px-4 py-2 lg:py-3 text-white rounded-2xl text-center font-medium hover:brightness-110 transition-all duration-200 text-sm lg:text-base ${isRecording ? 'bg-gray-400! cursor-not-allowed' : ''}`}
                        >
                            {isRecording && (
                                <div
                                    className="absolute left-0 top-0 h-full bg-white/20 transition-all duration-300 pointer-events-none"
                                    style={{ width: `${recordingProgress}%` }}
                                />
                            )}
                            <span className="hidden lg:inline">{isRecording ? `Grabando... ${recordingProgress}%` : 'Exportar Video'}</span>
                            <span className="lg:hidden">{isRecording ? `${recordingProgress}%` : 'Exportar'}</span>
                            <img src="/svg/download.svg" alt="icon" className="hidden lg:inline" />
                        </button>
                    )}

                    {/* Paleta de colores */}
                    <div className="flex flex-col gap-3 lg:flex">
                        <div className="flex gap-2 items-center justify-between">
                            <h2 className="text-sm lg:text-base text-gray-800 font-medium whitespace-nowrap">Paleta de colores</h2>
                            <button
                                onClick={() => setIsColorPaletteOpen(!isColorPaletteOpen)}
                                className="lg:hidden p-1 text-gray-600 hover:text-gray-800 transition-colors"
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
                            <div className="lg:hidden w-full h-px bg-gray-200"></div>
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
                                <span className="text-[11px] lg:text-xs font-medium">Guardar Paleta actual</span>
                            </button>
                        </div>

                        <div className={`${isColorPaletteOpen ? 'flex' : 'hidden'} lg:flex flex-col gap-2`}>
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
                                <span className="text-xs lg:text-sm font-medium">Agregar color</span>
                            </button>
                        </div>
                    </div>

                    {/* boton para abrir modal de paletas guardadas */}
                    {savedPalettes.length > 0 && (
                        <div className="relative">
                            {/* Header con toggle para movil */}
                            <div className="flex items-center justify-between lg:hidden mb-2">
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

                            {/* boton para desktop */}
                            <button
                                onClick={() => setIsModalOpen(!isModalOpen)}
                                className={`shadow transition-colors w-full items-center justify-center gap-2 rounded-2xl border-2 py-2 px-4 cursor-pointer relative hidden lg:flex ${isModalOpen ? "text-gray-800 border-gray-400 bg-gray-200" : "text-gray-500 border-gray-300 hover:bg-gray-100"}`}
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

                            {/* Vista colapsable movil */}
                            {isSavedPalettesOpen && (
                                <div className="lg:hidden flex flex-col gap-3 animate-fade-down">
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
                                                    className="text-red-500 hover:text-red-700 text-xs p-1 hover:bg-red-50 rounded transition-all"
                                                    title="Eliminar paleta"
                                                >
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                    </svg>
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
                                        className="fixed inset-0 h-lvh w-screen z-40 animate-fade-down"
                                        onClick={() => setIsModalOpen(false)}
                                    />

                                    {/* Panel modal */}
                                    <div className="absolute animate-duration-400 animate-fade-down left-0 top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto hidden lg:block">
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
                                                                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs p-1 hover:bg-red-50 rounded transition-all"
                                                                title="Eliminar paleta"
                                                            >
                                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                                </svg>
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
                                className="lg:hidden p-1 text-gray-600 hover:text-gray-800 transition-colors"
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

                        <div className={`${isPreloadedPalettesOpen ? 'flex' : 'hidden'} lg:flex flex-col gap-2`}>
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

export default memo(AsideRight);


