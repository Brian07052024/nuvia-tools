import { useContext } from "react";
import ColorContext from "../contexts/ColorContext";

export const useColor = () => {
    const context = useContext(ColorContext);


    if (!context) {
        throw new Error('useColor debe usarse dentro de ColorProvider');
    }

    return context;
}