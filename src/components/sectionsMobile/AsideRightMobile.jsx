import { useState } from "react";
import { createPortal } from "react-dom";
import { defaultPalettes } from "../../constants/palettes";
import ConfirmModal from "../common/ConfirmModal";

function AsideRightMobile({ 
    colors, 
    handleColorChange, 
    handleClick, 
    handleDelete, 
    handleSave, 
    handleSetPalette,
    savedPalettes,
    handleDeleteSavedPalette,
    handleExportImage,
    handleExportVideo,
    isRecording,
    recordingProgress,
    mode
}) {
    // Estado para controlar que modal esta abierto en moviles
    const [mobileModalOpen, setMobileModalOpen] = useState(null); // 'colors', 'saved', 'preloaded', null
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [paletteToDelete, setPaletteToDelete] = useState(null);

    return (
        <>
            {/* Barra horizontal compacta para moviles */}
            <div className="flex gap-2 w-full lg:hidden">
                {/* Boton Paleta de colores */}
                <button
                    onClick={() => setMobileModalOpen('colors')}
                    className="flex flex-1 flex-col justify-center items-center cursor-pointer border-2 border-gray-300 bg-white px-2 py-2 rounded-xl hover:bg-gray-100 transition-all"
                    aria-label="Abrir paleta de colores"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6b7280" className="bi bi-palette-fill" viewBox="0 0 16 16">
                        <path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07M8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                    </svg>
                    <span className="text-[10px] mt-1 text-gray-600 font-medium leading-tight">Colores</span>
                </button>

                {/* boton Mis Paletas */}
                {savedPalettes.length > 0 && (
                    <button
                        onClick={() => setMobileModalOpen('saved')}
                        className="flex flex-1 flex-col justify-center items-center cursor-pointer border-2 border-gray-300 bg-white px-2 py-2 rounded-xl hover:bg-gray-100 transition-all relative"
                        aria-label="Abrir mis paletas"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6b7280" className="bi bi-box2-heart-fill" viewBox="0 0 16 16">
                            <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zM8.5 4h6l.5.667V5H1v-.333L1.5 4h6V1h1zM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                        </svg>
                        <span className="absolute -top-1 -right-1 bg-nuviaFrom text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{savedPalettes.length}</span>
                        <span className="text-[10px] mt-1 text-gray-600 font-medium leading-tight">Mis paletas</span>
                    </button>
                )}

                {/* boton Paletas pre-cargadas */}
                <button
                    onClick={() => setMobileModalOpen('preloaded')}
                    className="flex flex-1 flex-col justify-center items-center cursor-pointer border-2 border-gray-300 bg-white px-2 py-2 rounded-xl hover:bg-gray-100 transition-all"
                    aria-label="Abrir paletas pre-cargadas"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6b7280" className="bi bi-bookmark-star-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5M8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.18.18 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.18.18 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.18.18 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.18.18 0 0 1-.134-.098z" />
                    </svg>
                    <span className="text-[10px] mt-1 text-gray-600 font-medium leading-tight">Presets</span>
                </button>

                {/* boton Exportar */}
                {mode === "static" && (
                    <button
                        onClick={handleExportImage}
                        aria-label="Exportar imagen PNG"
                        className="flex flex-col gap-1 justify-center items-center cursor-pointer bg-neutral-800 px-3 py-2 text-white rounded-xl text-center font-medium hover:brightness-110 transition-all duration-200 text-sm flex-1"
                    >
                        <img src="/svg/download.svg" alt="icon" className="w-4 h-4" />
                        <span className="text-xs">Exportar</span>
                    </button>
                )}
                {mode === "animated" && (
                    <button
                        onClick={handleExportVideo}
                        disabled={isRecording}
                        aria-label="Exportar video WebM"
                        className={`relative flex gap-1 justify-center items-center cursor-pointer bg-neutral-800 px-3 py-2 text-white rounded-xl text-center font-medium hover:brightness-110 transition-all duration-200 text-sm flex-1 ${isRecording ? 'opacity-75 cursor-not-allowed' : ''}`}
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

            {/* Modal movil - Paleta de colores */}
            {mobileModalOpen === 'colors' && createPortal(
                <>
                    <div
                        className="fixed inset-0 h-lvh w-screen bg-black/30 backdrop-blur-xs z-50 lg:hidden"
                        onClick={() => setMobileModalOpen(null)}
                        aria-hidden="true"
                    />
                    <div
                        role="dialog"
                        aria-labelledby="modal-colors-title"
                        aria-modal="true"
                        className="fixed inset-x-4 top-20 max-h-[70vh] bg-white rounded-2xl shadow-2xl z-60 flex flex-col lg:hidden animate-fade-down animate-duration-300"
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
                            <div className="flex flex-col gap-2 mb-4 ">
                                {colors.map((colorValue, index) => (
                                    <div key={index} className="flex gap-2 items-center ">
                                        <input
                                            type="color"
                                            value={colorValue}
                                            onChange={(e) => handleColorChange(index, e.target.value)}
                                            aria-label={`Selector de color ${index + 1}`}
                                            className="w-full h-12 cursor-pointer rounded-full border-2! border-black!"
                                        />
                                        <button
                                            onClick={() => handleDelete(index)}
                                            aria-label={`Eliminar color ${index + 1}`}
                                            className="rounded-xl w-12 h-12 flex justify-center items-center hover:bg-red-100 transition-colors "
                                        >
                                            <img src="/svg/x.svg" alt="delete" className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleClick}
                                className={`${colors.length === 4 ? "bg-gray-300 border-gray-300 text-gray-400" : "border-gray-300 text-gray-600"} w-full flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 py-3  hover:bg-gray-100 transition-all`}
                            >
                                <img src="/svg/plus.svg" alt="" className={`${colors.length === 4 ? "hidden" : ""}`} />
                                <span className="font-medium">Agregar color</span>
                            </button>
                            <button
                                onClick={() => {
                                    handleSave();
                                    setMobileModalOpen(null);
                                }}
                                className="w-full mt-3 flex items-center bg-neutral-800 justify-center gap-2 rounded-xl border-2  py-3 text-white hover:bg-gray-100 transition-all"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z" />
                                </svg>
                                <span className="font-medium">Guardar paleta actual</span>
                            </button>
                        </div>
                    </div>
                </>,
                document.body
            )}

            {/* Modal movil - Mis Paletas */}
            {mobileModalOpen === 'saved' && savedPalettes.length > 0 && createPortal(
                <>
                    <div
                        className="fixed inset-0 h-lvh w-screen bg-black/30 backdrop-blur-xs z-50 lg:hidden"
                        onClick={() => setMobileModalOpen(null)}
                        aria-hidden="true"
                    />
                    <div
                        role="dialog"
                        aria-labelledby="modal-saved-title"
                        aria-modal="true"
                        className="fixed inset-x-4 top-20 max-h-[70vh] bg-white rounded-2xl shadow-2xl z-60 flex flex-col lg:hidden animate-fade-down animate-duration-300"
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
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fb2c36" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                </svg>
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
                </>,
                document.body
            )}

            {/* Modal movil - Paletas pre-cargadas */}
            {mobileModalOpen === 'preloaded' && createPortal(
                <>
                    <div
                        className="fixed inset-0 h-lvh w-screen bg-black/30 backdrop-blur-xs z-50 lg:hidden"
                        onClick={() => setMobileModalOpen(null)}
                        aria-hidden="true"
                    />
                    <div
                        role="dialog"
                        aria-labelledby="modal-preloaded-title"
                        aria-modal="true"
                        className="fixed inset-x-4 top-20 max-h-[70vh] bg-white rounded-2xl shadow-2xl z-60 flex flex-col lg:hidden animate-fade-down animate-duration-300"
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
                </>,
                document.body
            )}

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

export default AsideRightMobile;
