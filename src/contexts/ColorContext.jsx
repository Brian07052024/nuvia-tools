import { createContext, useState } from "react";

const ColorContext = createContext();


export const ColorProvider = ({ children }) => {
    const [colors, setColors] = useState(["#e5e7eb"]);
    const [format, setFormat] = useState("16/9");
    const [angle, setAngle] = useState(180);

    const value = {
        colors,
        setColors,
        format,
        setFormat,
        angle,
        setAngle
    }

    return (
        <ColorContext.Provider value={value}>
            {children}
        </ColorContext.Provider>
    )
};

export default ColorContext;



