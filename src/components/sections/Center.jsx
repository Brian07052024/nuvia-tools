import { useColor } from "../../hook/useColor";

function Center() {
    const { colors, format, angle } = useColor();

    const cantidadColores = () => {
        switch (colors.length) {
            case 1:
                return <div
                    className={`${format === "9/16" ? "w-1/3": "w-1/2"} rounded-2xl transition-all duration-700 ease-in-out`}
                    style={{
                        background: `linear-gradient(${angle}deg, ${colors[0]}, ${colors[0]}, ${colors[0]}, ${colors[0]})`,
                        aspectRatio: format
                    }}>

                </div>

            case 2:
                return <div
                    className={`${format === "9/16" ? "w-1/3": "w-1/2"} rounded-2xl transition-all duration-700 ease-in-out`}
                    style={{
                        background: `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]})`,
                        aspectRatio: format
                    }}>

                </div>

            case 3:
                return <div
                    className={`${format === "9/16" ? "w-1/3": "w-1/2"} rounded-2xl transition-all duration-700 ease-in-out`}
                    style={{
                        background: `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
                        aspectRatio: format
                    }}>

                </div>

            case 4:
                return <div
                    className={`${format === "9/16" ? "w-1/3": "w-1/2"} rounded-2xl transition-all duration-700 ease-in-out`}
                    style={{
                        background: `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]})`,
                        aspectRatio: format
                    }}>

                </div>


            default:
                return null;
        }
    }

    return (
        <div className="bg-white col-span-6 p-4 rounded-2xl flex justify-center items-center">

            {cantidadColores()}


        </div>
    );
}

export default Center;