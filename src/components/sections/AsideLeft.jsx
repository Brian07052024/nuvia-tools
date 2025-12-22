import { useColor } from "../../hook/useColor";

function AsideLeft() {
    const { format, setFormat, angle, setAngle } = useColor();
    const formats = ["16/9", "1/1", "9/16", "4/3"];

    const handleClick = (formato) => {
        setFormat(formato)
    }

    const handleAngleChange = (e) => {
        setAngle(Number(e.target.value))
    }

    return (

        <div className="bg-white col-span-2 p-4 rounded-2xl gap-5 flex flex-col overflow-y-scroll">
            <div className="flex flex-col gap-3 transition-all duration-300 ease-in-out">

                <span className="text-gray-800 font-medium">Formato</span>

                <div className="grid grid-cols-2 gap-1 gap-y-1">
                    {
                        formats.map((formato, idx) => {
                            return (
                                <div key={idx} className={`
                                    cursor-pointer w-full h-8 rounded-full border text-center flex items-center justify-center hover:bg-gray-100 transition-colors 
                                    ${formato === format ? "text-gray-800 border-gray-400 bg-gray-200" : "text-gray-500 border-gray-300"}
                                `} onClick={() => handleClick(formato)}>
                                    {formato}
                                </div>
                            )

                        })
                    }
                </div>
            </div>

            <div className="flex flex-col gap-3 transition-all duration-300 ease-in-out">
                <span className="text-gray-800 font-medium">Ángulo del gradiente</span>
                
                <div className="flex flex-col gap-2">
                    <input 
                        type="range" 
                        min="0" 
                        max="360" 
                        value={angle}
                        onChange={handleAngleChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-800"
                    />
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">0°</span>
                        <span className="text-sm font-medium text-gray-800">{angle}°</span>
                        <span className="text-xs text-gray-500">360°</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AsideLeft;