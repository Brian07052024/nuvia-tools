import { useColor } from "../../hook/useColor";

function Center() {
    const { 
        colors, format, angle, gradientRef, mode,
        gradientType, gradientBlur, gradientOpacity
    } = useColor();

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
            return colors[0];
        }

        const gradientColors = colors.join(', ');
        
        switch(gradientType) {
            case "radial":
                return `radial-gradient(circle, ${gradientColors})`;
            case "conic":
                return `conic-gradient(from ${angle}deg, ${gradientColors})`;
            case "linear":
            default:
                return `linear-gradient(${angle}deg, ${gradientColors})`;
        }
    };

    const getContainerClassName = () => {
        const widthClass = format === "9/16" ? "w-1/3" : "w-1/2";
        const baseClasses = "rounded-2xl transition-all duration-400 ease-in-out shadow-lg hover:scale-105";
        const modeClass = mode === "animated" ? "gradient-animated-container" : "";
        
        return `${widthClass} ${baseClasses} ${modeClass}`;
    };

    return (
        <div className="bg-white col-span-6 p-4 rounded-2xl flex justify-center items-center border border-gray-300">
            <div
                ref={gradientRef}
                className={getContainerClassName()}
                style={{
                    background: getGradientBackground(),
                    aspectRatio: format,
                    filter: mode === "static" ? `blur(${gradientBlur}px)` : 'none',
                    opacity: mode === "static" ? gradientOpacity / 100 : 1
                }}
            >
                {mode === "animated" && renderAnimatedGradient()}
            </div>
        </div>
    );
}

export default Center;