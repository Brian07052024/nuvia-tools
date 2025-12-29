import { createContext, useEffect, useRef, useState } from "react";

const ColorContext = createContext();

// Función reutilizable para leer del localStorage
const getLocalStorageItem = (key, defaultValue) => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error al leer ${key}:`, error);
        return defaultValue;
    }
};

export const ColorProvider = ({ children }) => {

    const [colors, setColors] = useState(() => getLocalStorageItem("paletaActual", ["#e5e7eb"]));
    const [format, setFormat] = useState(() => getLocalStorageItem("formatoActual", "16/9"));
    const [angle, setAngle] = useState(() => getLocalStorageItem("anguloActual", 180));
    const [mode, setMode] = useState(() => getLocalStorageItem("modoActual", "static"));

    //opciones de gradiente estático
    const [gradientType, setGradientType] = useState(() => getLocalStorageItem("tipoGradiente", "linear"));
    const [gradientBlur, setGradientBlur] = useState(() => getLocalStorageItem("desenfoque", 0));
    const [gradientOpacity, setGradientOpacity] = useState(() => getLocalStorageItem("opacidad", 100));
    const [grainIntensity, setGrainIntensity] = useState(() => getLocalStorageItem("granulado", 0));

    //opciones de video
    const [videoDuration, setVideoDuration] = useState(() => getLocalStorageItem("duracionVideo", 6));
    const [videoFps, setVideoFps] = useState(() => getLocalStorageItem("fpsVideo", 30));
    const [videoBitrate, setVideoBitrate] = useState(() => getLocalStorageItem("bitrateVideo", 8));

    const gradientRef = useRef(null);

    // Consolidar todos los guardados en un solo useEffect con debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            try {
                window.localStorage.setItem("paletaActual", JSON.stringify(colors));
                window.localStorage.setItem("formatoActual", JSON.stringify(format));
                window.localStorage.setItem("anguloActual", JSON.stringify(angle));
                window.localStorage.setItem("modoActual", JSON.stringify(mode));
                window.localStorage.setItem("tipoGradiente", JSON.stringify(gradientType));
                window.localStorage.setItem("desenfoque", JSON.stringify(gradientBlur));
                window.localStorage.setItem("opacidad", JSON.stringify(gradientOpacity));
                window.localStorage.setItem("duracionVideo", JSON.stringify(videoDuration));
                window.localStorage.setItem("fpsVideo", JSON.stringify(videoFps));
                window.localStorage.setItem("bitrateVideo", JSON.stringify(videoBitrate));
                window.localStorage.setItem("granulado", JSON.stringify(grainIntensity));
            } catch (error) {
                console.error("Error al guardar en localStorage:", error);
            }
        }, 300); // Debounce de 300ms para evitar guardados excesivos

        return () => clearTimeout(timeoutId);
    }, [colors, format, angle, mode, gradientType, gradientBlur, gradientOpacity, videoDuration, videoFps, videoBitrate, grainIntensity])


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
        setVideoBitrate,
        grainIntensity,
        setGrainIntensity
    }

    return (
        <ColorContext.Provider value={value}>
            {children}
        </ColorContext.Provider>
    )
};

export default ColorContext;





