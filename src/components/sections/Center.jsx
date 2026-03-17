import { useState, memo } from "react";
import { useColor } from "../../hook/useColor";

function Center() {
    const {
        colors, format, angle, gradientRef, mode,
        gradientType, gradientBlur, gradientOpacity, grainIntensity, meshPattern,
        meshColor, meshSpeed, animatedBackgroundColor
    } = useColor();

    const [showTip, setShowTip] = useState(true);

    const renderAnimatedGradient = () => {
        return (
            <>
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className="gradient-blob"
                        style={{ backgroundColor: color }}
                    />
                ))}
            </>
        );
    };

    const getGradientBackground = () => {
        if (mode === "animated") {
            return animatedBackgroundColor;
        }

        const gradientColors = colors.join(', ');

        switch (gradientType) {
            case "radial":
                return `radial-gradient(circle, ${gradientColors})`;
            case "linear":
            default:
                return `linear-gradient(${angle}deg, ${gradientColors})`;
        }
    };

    const getContainerClassName = () => {
        const widthClass = format === "9/16" ? "w-2/3 lg:w-1/3" : "w-3/4 lg:w-1/2";
        const baseClasses = `relative overflow-hidden ${format === "circle" ? "rounded-[50%]" : "rounded-2xl"} transition-all  duration-400 ease-in-out shadow-lg hover:scale-105`;
        const modeClass = mode === "animated" ? "gradient-animated-container" : "";

        return `${widthClass} ${baseClasses} ${modeClass}`;
    };

    return (

        //el abuelito ->
        <div className="lg:bg-white lg:border lg:border-gray-300 h-full animate-fade col-span-6 p-4 rounded-2xl flex justify-center items-center relative">
            
            {/* Mensaje de advertencia para modo animado */}
            {mode === "animated" && showTip && (
                <div className="absolute top-20 lg:top-8 inset-x-4 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-2.5 rounded-xl flex items-start gap-2 lg:max-w-md shadow-lg animate-fade-down z-10">
                    <svg className="w-4 h-4 lg:w-5 lg:h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs lg:text-sm">
                        <span className="font-semibold">Tip:</span> Para mejores resultados en modo animado, no sobrepases 15% de granulado, y elige un color inicial claro en tu paleta.
                    </p>
                    <button
                        onClick={() => setShowTip(false)}
                        className="shrink-0 text-amber-600 hover:text-amber-800 transition-colors"
                        aria-label="Cerrar mensaje"
                    >
                        <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            <div
                ref={gradientRef}
                className={getContainerClassName()}
                style={{
                    background: getGradientBackground(),
                    aspectRatio: `${format === "circle" ? "1/1" : format}`,
                    filter: mode === "static" ? `blur(${gradientBlur}px)` : 'none',
                    opacity: mode === "static" ? gradientOpacity / 100 : 1
                }}
            >
                {mode === "animated" ? (
                    <>
                        {renderAnimatedGradient()}
                        {grainIntensity > 0 && (
                            <div
                                className="gradient-grain"
                                style={{
                                    opacity: grainIntensity / 100,
                                    width: '100%',
                                    height: '100%'
                                }}
                            />
                        )}
                        {meshPattern && (
                            <div
                                className="mesh-pattern-overlay"
                                style={{
                                    "--mesh-color": meshColor,
                                    "--mesh-speed": `${meshSpeed}s`
                                }}
                            />
                        )}
                    </>
                ) : (
                    grainIntensity > 0 && (
                        <div 
                            className="gradient-grain" 
                            style={{ 
                                opacity: grainIntensity / 100,
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    )
                )}
            </div>
        </div>
        
    );
}

export default memo(Center);

