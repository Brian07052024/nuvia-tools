import { useColor } from "../../hook/useColor";



function AsideRight() {
    const { colors, setColors } = useColor();
    const { colorGradientOne, colorGradientTwo, colorGradientThree, colorGradientFour } = colors;

    const handleColorChange = (colorKey, newColor) => {
        setColors(prevColors => ({
            ...prevColors, [colorKey]: newColor
        }));
    };

    return (
        <div className="bg-white col-span-2 my-4  p-4 rounded-2xl gap-5 flex flex-col">
            <p className="bg-black px-4 py-3 text-white rounded-full text-center">Generar</p>

            <div className="flex flex-col gap-3">
                <span className="text-gray-400">Paleta de colores</span>

                <div className="flex flex-col gap-2">
                    <input
                        type="color"
                        value={colorGradientOne}
                        onChange={(e) => handleColorChange('colorGradientOne', e.target.value)}
                        className="w-full h-8 rounded-full cursor-pointer"
                    />
                    <input
                        type="color"
                        value={colorGradientTwo}
                        onChange={(e) => handleColorChange('colorGradientTwo', e.target.value)}
                        className="w-full h-8 rounded-full cursor-pointer"
                    />
                    <input
                        type="color"
                        value={colorGradientThree}
                        onChange={(e) => handleColorChange('colorGradientThree', e.target.value)}
                        className="w-full h-8 rounded-full cursor-pointer"
                    />
                    <input
                        type="color"
                        value={colorGradientFour}
                        onChange={(e) => handleColorChange('colorGradientFour', e.target.value)}
                        className="w-full h-8 rounded-full cursor-pointer"
                    />
                </div>
            </div>

        </div>
    );
}

export default AsideRight;