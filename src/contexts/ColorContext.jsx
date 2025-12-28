import { createContext, useEffect, useRef, useState } from "react";

const ColorContext = createContext();


export const ColorProvider = ({ children }) => {

    const coloresEnLocalStorage = (() => {
        try {
            const item = window.localStorage.getItem("paletaActual");
            return item ? JSON.parse(item) : ["#e5e7eb"];
        } catch (error) {
            console.error("Error al leer localStorage:", error);
            return ["#e5e7eb"];
        }
        
    })();
 

    const formatoEnLocalStorage = (() => {
        try {
            const item = window.localStorage.getItem("formatoActual");
            return item ? JSON.parse(item) : ["16/9"];
        } catch (error) {
            console.error("Error al leer localStorage:", error);
            return ["16/9"];
        }

    })();

    const anguloEnLocalStorage = (() => {
        try {
            const item = window.localStorage.getItem("anguloActual");
            return item ? JSON.parse(item) : 180;
        } catch (error) {
            console.error("Error al leer localStorage:", error);
            return 180;
        }
    })();

    const modoEnLocalStorage = (() => {
        try {
            const item = window.localStorage.getItem("modoActual");
            return item ? JSON.parse(item) : "static";
        } catch (error) {
            console.error("Error al leer localStorage:", error);
            return "static";
        }
    })();

    const tipoGradienteEnLocalStorage = (() => {
        try {
            const item = window.localStorage.getItem("tipoGradiente");
            return item ? JSON.parse(item) : "linear";
        } catch (error) {
            console.error("Error al leer localStorage:", error);
            return "linear";
        }
    })();

    const desenfoquenEnLocalStorage = (() => {
        try {
            const item = window.localStorage.getItem("desenfoque");
            return item ? JSON.parse(item) : 0;
        } catch (error) {
            console.error("Error al leer localStorage:", error);
            return 0;
        }
    })();

    const opacidadEnLocalStorage = (() => {
        try {
            const item = window.localStorage.getItem("opacidad");
            return item ? JSON.parse(item) : 100;
        } catch (error) {
            console.error("Error al leer localStorage:", error);
            return 100;
        }
    })();

    const duracionVideoEnLocalStorage = (() => {
        try {
            const item = window.localStorage.getItem("duracionVideo");
            return item ? JSON.parse(item) : 6;
        } catch (error) {
            console.error("Error al leer localStorage:", error);
            return 6;
        }
    })();

    const fpsVideoEnLocalStorage = (() => {
        try {
            const item = window.localStorage.getItem("fpsVideo");
            return item ? JSON.parse(item) : 30;
        } catch (error) {
            console.error("Error al leer localStorage:", error);
            return 30;
        }
    })();

    const bitrateVideoEnLocalStorage = (() => {
        try {
            const item = window.localStorage.getItem("bitrateVideo");
            return item ? JSON.parse(item) : 8;
        } catch (error) {
            console.error("Error al leer localStorage:", error);
            return 8;
        }
    })();

    const granuladoEnLocalStorage = (() => {
        try {
            const item = window.localStorage.getItem("granulado");
            return item ? JSON.parse(item) : 0;
        } catch (error) {
            console.error("Error al leer localStorage:", error);
            return 0;
        }
    })();

    const [colors, setColors] = useState(coloresEnLocalStorage);
    const [format, setFormat] = useState(formatoEnLocalStorage);
    const [angle, setAngle] = useState(anguloEnLocalStorage);
    const [mode, setMode] = useState(modoEnLocalStorage);

    //opciones de gradiente estático
    const [gradientType, setGradientType] = useState(tipoGradienteEnLocalStorage); // linear, radial
    const [gradientBlur, setGradientBlur] = useState(desenfoquenEnLocalStorage); // 0-20px
    const [gradientOpacity, setGradientOpacity] = useState(opacidadEnLocalStorage); // 0-100%
    const [grainIntensity, setGrainIntensity] = useState(granuladoEnLocalStorage); // 0-50%

    //opciones de video
    const [videoDuration, setVideoDuration] = useState(duracionVideoEnLocalStorage); // segundos
    const [videoFps, setVideoFps] = useState(fpsVideoEnLocalStorage); // frames por segundo
    const [videoBitrate, setVideoBitrate] = useState(bitrateVideoEnLocalStorage); // Mbps

    const gradientRef = useRef(null);

    //guardar colores en localStorage cuando cambien
    useEffect(() => {
        try {
            window.localStorage.setItem("paletaActual", JSON.stringify(colors));
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
        }
    }, [colors])

    

    useEffect(() => {
        try {
            window.localStorage.setItem("formatoActual", JSON.stringify(format));
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
        }
    }, [format])

    useEffect(() => {
        try {
            window.localStorage.setItem("anguloActual", JSON.stringify(angle));
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
        }
    }, [angle])

    useEffect(() => {
        try {
            window.localStorage.setItem("modoActual", JSON.stringify(mode));
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
        }
    }, [mode])

    useEffect(() => {
        try {
            window.localStorage.setItem("tipoGradiente", JSON.stringify(gradientType));
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
        }
    }, [gradientType])

    useEffect(() => {
        try {
            window.localStorage.setItem("desenfoque", JSON.stringify(gradientBlur));
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
        }
    }, [gradientBlur])

    useEffect(() => {
        try {
            window.localStorage.setItem("opacidad", JSON.stringify(gradientOpacity));
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
        }
    }, [gradientOpacity])

    useEffect(() => {
        try {
            window.localStorage.setItem("duracionVideo", JSON.stringify(videoDuration));
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
        }
    }, [videoDuration])

    useEffect(() => {
        try {
            window.localStorage.setItem("fpsVideo", JSON.stringify(videoFps));
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
        }
    }, [videoFps])

    useEffect(() => {
        try {
            window.localStorage.setItem("bitrateVideo", JSON.stringify(videoBitrate));
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
        }
    }, [videoBitrate])

    useEffect(() => {
        try {
            window.localStorage.setItem("granulado", JSON.stringify(grainIntensity));
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
        }
    }, [grainIntensity])

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





