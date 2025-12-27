import { useState } from "react";
import { useColor } from "../../hook/useColor";
import { generateRandomColors } from "../../utils/colorUtils";
import { generateCode } from "../../utils/codeGenerators";
import { clearLocalStorage } from "../../utils/storageUtils";
import FooterActions from "../sections/FooterActions";
import CodeViewer from "../sections/CodeViewer";

/**
 * Componente Footer - Maneja la barra de acciones y el visor de código
 */
function Footer() {
    const {
        setColors, colors,
        setFormat,
        setAngle, angle,
        setMode, mode,
        setGradientType, gradientType, 
        gradientBlur, gradientOpacity, 
        setGradientBlur, setGradientOpacity,
        setVideoDuration, setVideoFps, setVideoBitrate
    } = useColor();

    const [inView, setInView] = useState(false);
    const [copied, setCopied] = useState(false);
    const [codeMode, setCodeMode] = useState("css");

    // Randomizar colores
    const handleRandomColors = () => {
        const newColors = generateRandomColors();
        setColors(newColors);
    };

    // Copiar código al portapapeles
    const handleCopyCode = async () => {
        const code = generateCode(mode, codeMode, colors, gradientType, angle, gradientOpacity, gradientBlur);
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Error al copiar:", error);
        }
    };

    // Resetear todas las configuraciones
    const handleReset = () => {
        const confirmar = confirm(
            "Se perderán todas las configuraciones y cambios actuales. ¿Desea continuar?"
        );

        if (confirmar) {
            // Resetear valores
            setColors(["#e5e7eb"]);
            setFormat("16/9");
            setAngle(180);
            setMode("static");
            setGradientType("linear");
            setGradientBlur(0);
            setGradientOpacity(100);
            setVideoDuration(6);
            setVideoFps(30);
            setVideoBitrate(8);

            // Limpiar localStorage
            clearLocalStorage();
        }
    };

    // Generar código actual
    const currentCode = generateCode(mode, codeMode, colors, gradientType, angle, gradientOpacity, gradientBlur);

    return (
        <>
            <FooterActions
                onRandomize={handleRandomColors}
                onReset={handleReset}
                onToggleCode={() => setInView(prev => !prev)}
            />

            <CodeViewer
                isVisible={inView}
                code={currentCode}
                codeMode={codeMode}
                mode={mode}
                colors={colors}
                gradientType={gradientType}
                angle={angle}
                gradientBlur={gradientBlur}
                gradientOpacity={gradientOpacity}
                onCodeModeChange={setCodeMode}
                onCopy={handleCopyCode}
                copied={copied}
            />
        </>
    );
}

export default Footer;