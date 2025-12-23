import { useColor } from "../../hook/useColor";

function Center() {
    const { colors, format, angle, gradientRef, mode } = useColor();

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

    const cantidadColores = () => {
        switch (colors.length) {
            case 1:
                return <div
                    ref={gradientRef}
                    className={`${format === "9/16" ? "w-1/3" : "w-1/2"} rounded-2xl transition-all duration-400 ease-in-out shadow-lg hover:scale-105 ${mode === "animated" ? "gradient-animated-container" : ""}`}
                    style={{
                        background: mode === "animated" ? colors[0] : `linear-gradient(${angle}deg, ${colors[0]}, ${colors[0]}, ${colors[0]}, ${colors[0]})`,
                        aspectRatio: format
                    }}>
                    {mode === "animated" && renderAnimatedGradient()}
                </div>

            case 2:
                return <div
                    ref={gradientRef}
                    className={`${format === "9/16" ? "w-1/3" : "w-1/2"} rounded-2xl transition-all duration-400 ease-in-out shadow-lg hover:scale-105 ${mode === "animated" ? "gradient-animated-container" : ""}`}
                    style={{
                        background: mode === "animated" ? colors[0] : `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]})`,
                        aspectRatio: format
                    }}>
                    {mode === "animated" && renderAnimatedGradient()}
                </div>

            case 3:
                return <div
                    ref={gradientRef}
                    className={`${format === "9/16" ? "w-1/3" : "w-1/2"} rounded-2xl transition-all duration-400 ease-in-out shadow-lg hover:scale-105 ${mode === "animated" ? "gradient-animated-container" : ""}`}
                    style={{
                        background: mode === "animated" ? colors[0] : `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
                        aspectRatio: format
                    }}>
                    {mode === "animated" && renderAnimatedGradient()}
                </div>

            case 4:
                return <div
                    ref={gradientRef}
                    className={`${format === "9/16" ? "w-1/3" : "w-1/2"} rounded-2xl transition-all duration-400 ease-in-out shadow-lg hover:scale-105 ${mode === "animated" ? "gradient-animated-container" : ""}`}
                    style={{
                        background: mode === "animated" ? colors[0] : `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]})`,
                        aspectRatio: format
                    }}>
                    {mode === "animated" && renderAnimatedGradient()}
                </div>


            default:
                return null;
        }
    }

    return (
        <div className="bg-white col-span-6 p-4 rounded-2xl flex justify-center items-center border border-gray-300">

            {cantidadColores()}


        </div>
    );
}

export default Center;