import { useState } from "react";
import { useColor } from "../../hook/useColor";

function Footer() {
    
    const {
        setColors, colors,
        setFormat, format,
        setAngle, angle,
        setMode, mode,
        setGradientType, gradientType, gradientBlur, gradientOpacity, setGradientBlur, setGradientOpacity,
        setVideoDuration, setVideoFps, setVideoBitrate

    } = useColor();

    const [inView, setInView] = useState(false);
    const [copied, setCopied] = useState(false);
    const [codeMode, setCodeMode] = useState("css"); // "css" o "tailwind"

    // Generar color aleatorio
    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Randomizar colores
    const handleRandomColors = () => {
        const numColors = Math.floor(Math.random() * 3) + 2; // Entre 2 y 4 colores
        const newColors = Array.from({ length: numColors }, () => generateRandomColor());
        setColors(newColors);
    };

    // Convertir hex a rgb
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    // Generar código CSS del gradiente
    const generateCSSCode = () => {
        if (mode === "animated") {
            // Generar CSS para gradiente animado
            let css = `/* HTML Structure:
<div class="gradient-animated-container">
${colors.map((_, index) => `  <div class="gradient-blob blob-${index + 1}"></div>`).join('\n')}
  <!-- Tu contenido aquí (estará por encima de las blobs) -->
  <div style="position: relative; z-index: 1;">
    <!-- Contenido -->
  </div>
</div>
*/

/* CSS Styles: */
.gradient-animated-container {
  position: relative;
  overflow: hidden;
  background: white;
  width: 100%;
  height: 100vh; /* o 100% si está dentro de un contenedor con altura definida */
  /* Opcional: border-radius: 1rem; */
}

.gradient-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(64px);
  opacity: 0.8;
  mix-blend-mode: multiply;
  pointer-events: none; /* No interfiere con clics o interacciones */
  z-index: -1; /* Mantiene las blobs detrás del contenido */
}
`;

            // Agregar keyframes y estilos para cada blob
            colors.forEach((color, index) => {
                const blobNum = index + 1;
                const positions = [
                    { width: '100%', height: '100%', top: '-10%', left: '-5%', animation: 'float1' },
                    { width: '100%', height: '100%', top: '15%', right: '-10%', animation: 'float2', delay: '-1s' },
                    { width: '100%', height: '100%', bottom: '-15%', left: '10%', animation: 'float3', delay: '-2s' },
                    { width: '100%', height: '60%', bottom: '10%', right: '15%', animation: 'float4', delay: '-3s' },
                    { width: '100%', height: '100%', top: '40%', left: '40%', animation: 'float5', delay: '-1.5s' },
                    { width: '100%', height: '100%', top: '20%', left: '20%', animation: 'float6', delay: '-4s' }
                ];

                if (positions[index]) {
                    const pos = positions[index];
                    css += `
.blob-${blobNum} {
  background-color: ${color};
  ${pos.width ? `width: ${pos.width};` : ''}
  ${pos.height ? `height: ${pos.height};` : ''}
  ${pos.top ? `top: ${pos.top};` : ''}
  ${pos.bottom ? `bottom: ${pos.bottom};` : ''}
  ${pos.left ? `left: ${pos.left};` : ''}
  ${pos.right ? `right: ${pos.right};` : ''}
  animation: ${pos.animation} 6s ease-in-out infinite;
  ${pos.delay ? `animation-delay: ${pos.delay};` : ''}
}

@keyframes ${pos.animation} {
  0%, 100% { transform: translate(0%, 0%) scale(1); }
  50% { transform: translate(${index % 2 === 0 ? '30%' : '-40%'}, ${index % 3 === 0 ? '-50%' : '45%'}) scale(${1 + (index * 0.1)}); }
}
`;
                }
            });

            return css;
        }

        // Código estático
        let cssCode = [];

        cssCode.push("/* Aplica estos estilos al elemento que quieres usar como fondo */")
        cssCode.push("")

        // Background gradient
        if (colors.length === 1) {
            cssCode.push(`background: ${colors[0]};`);
        } else {
            const colorStops = colors.join(", ");

            if (gradientType === "linear") {
                cssCode.push(`background: linear-gradient(${angle}deg, ${colorStops});`);
            } else if (gradientType === "radial") {
                cssCode.push(`background: radial-gradient(circle, ${colorStops});`);
            }
        }

        // Opacity
        if (gradientOpacity < 100) {
            cssCode.push(`opacity: ${gradientOpacity / 100};`);
        }

        // Blur/Filter
        if (gradientBlur > 0) {
            cssCode.push(`filter: blur(${gradientBlur}px);`);
        }

        return cssCode.join('\n');
    };

    // Generar código Tailwind
    const generateTailwindCode = () => {
        if (mode === "animated") {
            // Para modo animado, no hay equivalente directo en Tailwind
            // Mostrar nota explicativa
            return `/* Modo animado requiere CSS personalizado */
/* HTML: */
<div class="relative overflow-hidden bg-white w-full h-screen">
  <!-- o usa h-full si está dentro de un contenedor con altura definida -->
${colors.map((_, index) => `  <div class="gradient-blob-${index + 1}"></div>`).join('\n')}
</div>

/* CSS necesario: */
/* Ver modo CSS para las animaciones completas */

/* Nota: Tailwind no tiene soporte nativo para animaciones */
/* de blobs complejas. Usar CSS personalizado. */`;
        }

        let tailwindClasses = [];

        if (colors.length === 1) {
            // Color sólido - usar color arbitrario
            tailwindClasses.push(`bg-[${colors[0]}]`);
        } else {
            // Gradiente
            if (gradientType === "linear") {
                // Dirección del gradiente
                const directions = {
                    0: "to-t",
                    45: "to-tr",
                    90: "to-r",
                    135: "to-br",
                    180: "to-b",
                    225: "to-bl",
                    270: "to-l",
                    315: "to-tl"
                };

                const direction = directions[angle] || `to-b`;
                tailwindClasses.push(`bg-gradient-to-${direction.replace('to-', '')}`);

                // Colores del gradiente
                colors.forEach((color, index) => {
                    if (index === 0) {
                        tailwindClasses.push(`from-[${color}]`);
                    } else if (index === colors.length - 1) {
                        tailwindClasses.push(`to-[${color}]`);
                    } else {
                        tailwindClasses.push(`via-[${color}]`);
                    }
                });
            } else if (gradientType === "radial") {
                // Tailwind no tiene soporte nativo para radial, usar arbitrary
                const colorStops = colors.join(", ");
                tailwindClasses.push(`bg-[radial-gradient(circle,${colorStops})]`);
            }
        }

        // Opacity
        if (gradientOpacity < 100) {
            const opacityValue = Math.round((gradientOpacity / 100) * 100);
            tailwindClasses.push(`opacity-[${opacityValue}%]`);
        }

        // Blur
        if (gradientBlur > 0) {
            if (gradientBlur <= 1) tailwindClasses.push('blur-sm');
            else if (gradientBlur <= 4) tailwindClasses.push('blur');
            else if (gradientBlur <= 8) tailwindClasses.push('blur-md');
            else if (gradientBlur <= 12) tailwindClasses.push('blur-lg');
            else if (gradientBlur <= 16) tailwindClasses.push('blur-xl');
            else if (gradientBlur <= 24) tailwindClasses.push('blur-2xl');
            else tailwindClasses.push('blur-3xl');
        }

        return tailwindClasses.join(' ');
    };

    // Renderizar código con colores
    const renderColoredCode = () => {
        const code = codeMode === "css" ? generateCSSCode() : generateTailwindCode();
        const lines = code.split('\n');

        return lines.map((line, index) => {
            // Comentarios
            if (line.trim().startsWith('/*') || line.trim().startsWith('<!--') || line.trim().includes('*/') || line.trim().includes('-->')) {
                return <div key={index} className="text-gray-500">{line}</div>;
            }
            // HTML tags
            if (line.includes('<') || line.includes('>') || line.includes('</')) {
                return <div key={index} className="text-yellow-400">{line}</div>;
            }
            // Selectores CSS
            if (line.includes('{') || line.match(/^\.[a-zA-Z-]+/) || line.match(/^@keyframes/)) {
                return <div key={index} className="text-pink-400">{line}</div>;
            }
            // Propiedades CSS
            if (line.includes(':') && !line.includes('//')) {
                const parts = line.split(':');
                return (
                    <div key={index}>
                        <span className="text-cyan-400">{parts[0]}</span>
                        <span className="text-white">:</span>
                        <span className="text-orange-300">{parts.slice(1).join(':')}</span>
                    </div>
                );
            }
            // Clases Tailwind
            if (codeMode === "tailwind" && line.trim() && !line.includes('/*') && !line.includes('<')) {
                // Detectar diferentes tipos de clases
                if (line.includes('bg-gradient') || line.includes('from-') || line.includes('to-') || line.includes('via-')) {
                    return <div key={index} className="text-purple-400">{line}</div>;
                }
                if (line.includes('bg-[')) {
                    return <div key={index} className="text-pink-400">{line}</div>;
                }
                if (line.includes('opacity-') || line.includes('blur-')) {
                    return <div key={index} className="text-cyan-400">{line}</div>;
                }
                return <div key={index} className="text-green-400">{line}</div>;
            }
            // Otros (llaves, etc)
            return <div key={index} className="text-gray-300">{line}</div>;
        });
    };

    const handleCopyCode = async () => {
        const code = codeMode === "css" ? generateCSSCode() : generateTailwindCode();
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Error al copiar:", error);
        }
    };

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
            try {
                window.localStorage.removeItem("paletaActual");
                window.localStorage.removeItem("formatoActual");
                window.localStorage.removeItem("anguloActual");
                window.localStorage.removeItem("modoActual");
                window.localStorage.removeItem("tipoGradiente");
                window.localStorage.removeItem("desenfoque");
                window.localStorage.removeItem("opacidad");
                window.localStorage.removeItem("duracionVideo");
                window.localStorage.removeItem("fpsVideo");
                window.localStorage.removeItem("bitrateVideo");
            } catch (error) {
                console.error("Error al limpiar localStorage:", error);
            }
        }
    }

    return (
        <>
            <div className="w-lvw absolute bottom-1 animate-fade-up z-50">
                <div className="bg-neutral-800 flex gap-2 w-fit px-3 py-2  shadow-2xl rounded-full mx-auto ">

                    <div onClick={handleRandomColors} className="flex flex-col justify-center items-center px-5 py-0.5 cursor-pointer rounded-full transition-colors hover:bg-white/15">
                        <img src="/svg/random.svg" alt="icon" className="size-6 object-contain" />
                        <p className="text-xs text-white/50 m-0 p-0">Random</p>
                    </div>

                    <div onClick={() => handleReset()} className="flex flex-col justify-center items-center px-5 py-0.5 cursor-pointer rounded-full transition-colors hover:bg-white/15" >
                        <img src="/svg/restart.svg" alt="icon" className="size-6 object-contain" />
                        <p className="text-xs text-white/50 m-0 p-0">Reset</p>
                    </div>

                    <div onClick={() => setInView(prev => !prev)} className="flex flex-col justify-center items-center px-5 py-0.5 cursor-pointer rounded-full transition-colors hover:bg-white/15">
                        <img src="/svg/codeMode.svg" alt="icon" className="size-6 object-contain" />
                        <p className="text-xs text-white/50 m-0 p-0">Code</p>
                    </div>


                </div>
            </div>

            <div className={`${inView ? "max-h-[70vh] animate-fade-up animate-duration-300" : "h-0 opacity-0"} transition-all z-0 max-w-2xl w-[90vw] bg-neutral-800 absolute left-1/2 -translate-x-1/2 bottom-24 rounded-lg ${inView ? "overflow-y-auto" : "overflow-hidden"}`}>
                <div className="sticky top-0 bg-neutral-800 z-10 p-4 pb-3 border-b border-neutral-700">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <h3 className="text-white font-semibold">
                                    {codeMode === "css" ? "CSS Code" : "Tailwind Classes"}
                                </h3>
                                {/* Badge de modo */}
                                <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${mode === "animated"
                                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                        : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                    }`}>
                                    {mode === "animated" ? "Animado" : "Estático"}
                                </span>
                            </div>
                            {/* Toggle CSS/Tailwind */}
                            <div className="flex bg-neutral-700 rounded-lg p-1">
                                <button
                                    onClick={() => setCodeMode("css")}
                                    className={`px-3 py-1 text-xs rounded transition-colors ${codeMode === "css"
                                        ? "bg-neutral-600 text-white"
                                        : "text-neutral-400 hover:text-white"
                                        }`}
                                >
                                    CSS
                                </button>
                                <button
                                    onClick={() => setCodeMode("tailwind")}
                                    className={`px-3 py-1 text-xs rounded transition-colors ${codeMode === "tailwind"
                                        ? "bg-neutral-600 text-white"
                                        : "text-neutral-400 hover:text-white"
                                        }`}
                                >
                                    Tailwind
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleCopyCode}
                            className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors text-sm flex items-center gap-2"
                        >
                            {copied ? "✓ Copiado" : "Copiar"}
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    <div className="bg-neutral-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm font-mono">
                            <code>
                                {renderColoredCode()}
                            </code>
                        </pre>
                    </div>

                    {/* Información adicional */}
                    <div className="mt-3 text-neutral-400 text-xs space-y-1">
                        <p>Colores: {colors.length}</p>
                        <p>Tipo: {gradientType}</p>
                        {gradientType === "linear" && <p>Ángulo: {angle}°</p>}
                        {gradientBlur > 0 && <p>Blur: {gradientBlur}px</p>}
                        {gradientOpacity < 100 && <p>Opacidad: {gradientOpacity}%</p>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;