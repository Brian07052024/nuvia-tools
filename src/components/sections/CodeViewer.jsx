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
    onCodeModeChange, 
    onCopy, 
    copied 
}) {
    return (
        <div className={`${
            isVisible ? "max-h-[70vh] animate-fade-up animate-duration-300" : "h-0 opacity-0"
        } transition-all z-0 max-w-2xl w-[90vw] bg-neutral-800 absolute left-1/2 -translate-x-1/2 bottom-44 md:bottom-24 rounded-lg ${
            isVisible ? "overflow-y-auto" : "overflow-hidden"
        }`}>
            <CodeHeader
                mode={mode}
                codeMode={codeMode}
                onCodeModeChange={onCodeModeChange}
                onCopy={onCopy}
                copied={copied}
            />

            <div className="p-4">
                <CodeRenderer code={code} codeMode={codeMode} />
                
                <CodeInfo
                    colors={colors}
                    gradientType={gradientType}
                    angle={angle}
                    gradientBlur={gradientBlur}
                    gradientOpacity={gradientOpacity}
                />
            </div>
        </div>
    );
}

export default CodeViewer;
