import { useRef, useEffect } from "react";
import CodeHeader from "./CodeHeader";
import CodeRenderer from "./CodeRenderer";
import CodeInfo from "./CodeInfo";

/**
 * Componente visor de código con opciones de CSS y Tailwind
 */
function CodeViewer({ 
    isVisible, 
    code, 
    codeMode, 
    mode, 
    colors, 
    gradientType, 
    angle, 
    gradientBlur, 
    gradientOpacity,
    grainIntensity,
    onCodeModeChange, 
    onCopy, 
    copied,
    onClose
}) {
    const codeViewerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isVisible && codeViewerRef.current && !codeViewerRef.current.contains(event.target)) {
                onClose?.();
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, onClose]);

    return (
        <>
            {/* Overlay de fondo negro */}
            {isVisible && (
                <div
                    className="fixed inset-0 h-lvh w-screen bg-black/30 z-40"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}
            
            {/* Modal de código */}
            <div 
                ref={codeViewerRef}
                className={`${
                isVisible ? "max-h-[60vh] animate-fade-up animate-duration-300" : "h-0 opacity-0"
            } transition-all z-50 max-w-2xl w-[calc(100vw-2rem)] sm:w-[90vw] bg-neutral-800 absolute left-1/2 -translate-x-1/2 bottom-44 lg:bottom-24 rounded-lg flex flex-col ${
                isVisible ? "overflow-hidden" : "overflow-hidden"
            }`}>
                <CodeHeader
                    mode={mode}
                    codeMode={codeMode}
                    onCodeModeChange={onCodeModeChange}
                    onCopy={onCopy}
                    copied={copied}
                />

                <div className="flex-1 overflow-y-auto p-4">
                    <CodeRenderer code={code} codeMode={codeMode} />
                    
                    <CodeInfo
                        colors={colors}
                        gradientType={gradientType}
                        angle={angle}
                        gradientBlur={gradientBlur}
                        gradientOpacity={gradientOpacity}
                        grainIntensity={grainIntensity}
                    />
                </div>
            </div>
        </>
    );
}

export default CodeViewer;


