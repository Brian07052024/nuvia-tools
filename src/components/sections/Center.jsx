import { useColor } from "../../hook/useColor";

function Center() {
    const { colors } = useColor();
    const { colorGradientOne, colorGradientTwo, colorGradientThree, colorGradientFour } = colors;

    return (
        <div className="bg-white col-span-6 my-4  p-4 rounded-2xl flex justify-center items-center">
            <div 
                className="size-96 rounded-2xl"
                style={{
                    background: `linear-gradient(to bottom, ${colorGradientOne}, ${colorGradientTwo}, ${colorGradientThree}, ${colorGradientFour})`
                }}
            >

            </div>



        </div>
    );
}

export default Center;