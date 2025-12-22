import { createContext, useState, useEffect } from "react";

const ColorContext = createContext();


export const ColorProvider = ({ children }) => {
    const [colors, setColors] = useState({
        colorGradientOne: "#ede9fe",
        colorGradientTwo: "#ddd6fe",
        colorGradientThree: "#d8b4fe",
        colorGradientFour: "#a78bfa"
    });

    const value = {
        colors,
        setColors
    }

    return (
        <ColorContext.Provider value={value}>
            {children}
        </ColorContext.Provider>
    )
};

export default ColorContext;



