import { createContext, useEffect, useRef, useState } from "react";

const ColorContext = createContext();


export const ColorProvider = ({ children }) => {
    const coloresEnLocalStorage = window.localStorage.getItem("paletaActual");

    const [colors, setColors] = useState(coloresEnLocalStorage ? JSON.parse(coloresEnLocalStorage) : ["#e5e7eb"]);
    const [format, setFormat] = useState("16/9");
    const [angle, setAngle] = useState(180);
    const [mode, setMode] = useState("static");
    
    // Opciones de gradiente estático
    const [gradientType, setGradientType] = useState("linear"); // linear, radial, conic
    const [gradientBlur, setGradientBlur] = useState(0); // 0-20px
    const [gradientOpacity, setGradientOpacity] = useState(100); // 0-100%
    
    // Opciones de video
    const [videoDuration, setVideoDuration] = useState(6); // segundos
    const [videoFps, setVideoFps] = useState(30); // frames por segundo
    const [videoBitrate, setVideoBitrate] = useState(8); // Mbps
    
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
        setMode,
        gradientType,
        setGradientType,
        gradientBlur,
        setGradientBlur,
        gradientOpacity,
        setGradientOpacity,
        videoDuration,
        setVideoDuration,
        videoFps,
        setVideoFps,
        videoBitrate,
        setVideoBitrate
    }

    return (
        <ColorContext.Provider value={value}>
            {children}
        </ColorContext.Provider>
    )
};

export default ColorContext;



