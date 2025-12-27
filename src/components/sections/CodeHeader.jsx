/**
 * Componente para el encabezado del visor de código
 */
function CodeHeader({ mode, codeMode, onCodeModeChange, onCopy, copied }) {
    return (
        <div className="sticky top-0 bg-neutral-800 z-10 p-4 pb-3 border-b border-neutral-700">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <h3 className="text-white font-semibold">
                            {codeMode === "css" ? "CSS Code" : "Tailwind Classes"}
                        </h3>
                        {/* Badge de modo */}
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                            mode === "animated"
                                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        }`}>
                            {mode === "animated" ? "Animado" : "Estático"}
                        </span>
                    </div>
                    {/* Toggle CSS/Tailwind */}
                    <div className="flex bg-neutral-700 rounded-lg p-1">
                        <button
                            onClick={() => onCodeModeChange("css")}
                            className={`px-3 py-1 text-xs rounded transition-colors ${
                                codeMode === "css"
                                    ? "bg-neutral-600 text-white"
                                    : "text-neutral-400 hover:text-white"
                            }`}
                        >
                            CSS
                        </button>
                        <button
                            onClick={() => onCodeModeChange("tailwind")}
                            className={`px-3 py-1 text-xs rounded transition-colors ${
                                codeMode === "tailwind"
                                    ? "bg-neutral-600 text-white"
                                    : "text-neutral-400 hover:text-white"
                            }`}
                        >
                            Tailwind
                        </button>
                    </div>
                </div>

                <button
                    onClick={onCopy}
                    className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors text-sm flex items-center gap-2"
                >
                    {copied ? "✓ Copiado" : "Copiar"}
                </button>
            </div>
        </div>
    );
}

export default CodeHeader;
