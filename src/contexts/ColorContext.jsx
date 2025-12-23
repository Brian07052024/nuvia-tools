import { createContext, useEffect, useRef, useState } from "react";

const ColorContext = createContext();


export const ColorProvider = ({ children }) => {
    const coloresEnLocalStorage = window.localStorage.getItem("paletaActual");

    const [colors, setColors] = useState(coloresEnLocalStorage ? JSON.parse(coloresEnLocalStorage) : ["#e5e7eb"]);
    const [format, setFormat] = useState("16/9");
    const [angle, setAngle] = useState(180);
    const [mode, setMode] = useState("static");
    const gradientRef = useRef(null);

    //guardar colores en localStorage cuando cambien
    useEffect(() => {
        window.localStorage.setItem("paletaActual", JSON.stringify(colors));
    }, [colors])

    const value = {
        colors,
        setColors,
        format,
        setFormat,
        angle,
        setAngle,
        gradientRef,
        mode,
        setMode
    }

    return (
        <ColorContext.Provider value={value}>
            {children}
        </ColorContext.Provider>
    )
};

export default ColorContext;



