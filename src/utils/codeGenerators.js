/**
 * Genera código CSS para un gradiente estático
 */
export const generateStaticCSSCode = (colors, gradientType, angle, gradientOpacity, gradientBlur, grainIntensity) => {
    let cssCode = [];

    if (grainIntensity > 0) {
        
        cssCode.push('<div class="gradient-container">');
        cssCode.push('  <!-- Efecto de granulado (textura) -->');
        cssCode.push('  <div class="gradient-grain"></div>');
        cssCode.push('  ');
        cssCode.push('  <!-- Tu contenido aquí -->');
        cssCode.push('  <div style="position: relative; z-index: 1;">');
        cssCode.push('    <h1>Tu contenido</h1>');
        cssCode.push('  </div>');
        cssCode.push('</div>');
        cssCode.push("/* -------------------------------------------- */");
        cssCode.push("");
        cssCode.push("");
    } 

   
    cssCode.push(".gradient-container {");
    
    if (grainIntensity > 0) {
        cssCode.push("  /* Necesario para el efecto de granulado: */");
        cssCode.push("  position: relative;");
        cssCode.push("  overflow: hidden;");
        cssCode.push("");
    }

    //Background gradient
    if (colors.length === 1) {
        cssCode.push(`  background: ${colors[0]};`);
    } else {
        const colorStops = colors.join(", ");

        if (gradientType === "linear") {
            cssCode.push(`  background: linear-gradient(${angle}deg, ${colorStops});`);
        } else if (gradientType === "radial") {
            cssCode.push(`  background: radial-gradient(circle, ${colorStops});`);
        }
    }

    //Dimensions
    if (grainIntensity === 0) {
  
        cssCode.push("  width: 100%; /* Ajusta el tamaño según necesites: */");
        cssCode.push("  height: 400px; /* o 100vh, 100%, o lo que necesites */");
    }

    //Opacity
    if (gradientOpacity < 100) {
        cssCode.push(`  opacity: ${gradientOpacity / 100};`);
    }

    //Blur/Filter
    if (gradientBlur > 0) {
        cssCode.push(`  filter: blur(${gradientBlur}px);`);
    }

    cssCode.push("}");

    //Grain effect
    if (grainIntensity > 0) {
        cssCode.push("");
        cssCode.push("/* -------------------------------------------- */");
        cssCode.push("/* EFECTO DE GRANULADO */");
        cssCode.push("/* Este div se superpone sobre el gradiente */");
        cssCode.push("");
        cssCode.push(".gradient-grain {");
        cssCode.push("  position: absolute;");
        cssCode.push("  inset: 0; /* Cubre todo el contenedor */");
        cssCode.push("  pointer-events: none; /* No bloquea clics */");
        cssCode.push(`  opacity: ${grainIntensity / 100}; /* Intensidad del efecto */`);
        cssCode.push('  background-image: url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E");');
        cssCode.push("  background-size: 200px 200px;");
        cssCode.push("  background-repeat: repeat;");
        cssCode.push("  mix-blend-mode: overlay; /* Mezcla con el gradiente */");
        cssCode.push("  z-index: 0; /* Debajo del contenido */");
        cssCode.push("}");
    }

    return cssCode.join('\n');
};

/**
 * Genera código CSS para un gradiente animado
 */
export const generateAnimatedCSSCode = (colors, grainIntensity, backgroundColor = "#ffffff") => {
    let css = `/* HTML: */
<div class="gradient-animated-container">
${colors.map((_, index) => `  <div class="gradient-blob blob-${index + 1}"></div>`).join('\n')}${grainIntensity > 0 ? '\n  <div class="gradient-grain"></div>' : ''}
</div>

/* CSS: */
.gradient-animated-container {
  position: absolute; 
  overflow: hidden;
    background: ${backgroundColor}; 
  width: 100%;
  height: 100vh;
}

.gradient-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(64px);
  opacity: 1;
  mix-blend-mode: normal;
  aspect-ratio: 1 / 1;
  pointer-events: none;
  z-index: 0;
}
`;

    if (grainIntensity > 0) {
        css += `
.gradient-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: ${grainIntensity / 100};
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  background-repeat: repeat;
  mix-blend-mode: overlay;
  z-index: 0;
}
`;
    }

    //Agregar keyframes y estilos para cada blob
    colors.forEach((color, index) => {
        const blobNum = index + 1;
        const positions = [
            { width: '100%', top: '-10%', left: '-5%', animation: 'float1' },
            { width: '100%', top: '15%', right: '-10%', animation: 'float2', delay: '-1s' },
            { width: '100%', bottom: '-15%', left: '10%', animation: 'float3', delay: '-2s' },
            { width: '60%', bottom: '10%', right: '15%', animation: 'float4', delay: '-3s' },
            { width: '55%', top: '40%', left: '40%', animation: 'float5', delay: '-1.5s' },
            { width: '75%', top: '20%', left: '20%', animation: 'float6', delay: '-4s' }
        ];

        if (positions[index]) {
            const pos = positions[index];
            css += `
.blob-${blobNum} {
  background-color: ${color};
  ${pos.width ? `width: ${pos.width};` : ''}
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
};

/**
 * Genera código Tailwind para un gradiente estático
 */
export const generateStaticTailwindCode = (colors, gradientType, angle, gradientOpacity, gradientBlur, grainIntensity) => {
    let code = "";
    
    if (grainIntensity > 0) {
        code += "/* CSS: */\n";
        code += ".gradient-grain {\n";
        code += "  position: absolute;\n";
        code += "  inset: 0;\n";
        code += "  pointer-events: none;\n";
        code += `  opacity: ${grainIntensity / 100};\n`;
        code += '  background-image: url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E");\n';
        code += "  background-size: 200px 200px;\n";
        code += "  background-repeat: repeat;\n";
        code += "  mix-blend-mode: overlay;\n";
        code += "}\n\n";
    }
    
    let tailwindClasses = [];

    if (grainIntensity > 0) {
        tailwindClasses.push("relative");
        tailwindClasses.push("overflow-hidden");
    }

    if (colors.length === 1) {
        //Color sólido - usar color arbitrario
        tailwindClasses.push(`bg-[${colors[0]}]`);
    } else {
        //Gradiente
        if (gradientType === "linear") {
            //Dirección del gradiente
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

            //Colores del gradiente
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
            //Tailwind no tiene soporte nativo para radial, usar arbitrary
            const colorStops = colors.join(", ");
            tailwindClasses.push(`bg-[radial-gradient(circle,${colorStops})]`);
        }
    }

    //Opacity
    if (gradientOpacity < 100) {
        const opacityValue = Math.round((gradientOpacity / 100) * 100);
        tailwindClasses.push(`opacity-[${opacityValue}%]`);
    }

    //Blur
    if (gradientBlur > 0) {
        if (gradientBlur <= 1) tailwindClasses.push('blur-sm');
        else if (gradientBlur <= 4) tailwindClasses.push('blur');
        else if (gradientBlur <= 8) tailwindClasses.push('blur-md');
        else if (gradientBlur <= 12) tailwindClasses.push('blur-lg');
        else if (gradientBlur <= 16) tailwindClasses.push('blur-xl');
        else if (gradientBlur <= 24) tailwindClasses.push('blur-2xl');
        else tailwindClasses.push('blur-3xl');
    }

    return code + tailwindClasses.join(' ');
};

/**
 * Genera código Tailwind para un gradiente animado
 */
export const generateAnimatedTailwindCode = (colors, grainIntensity, backgroundColor = "#ffffff") => {
    return `/* Modo animado requiere CSS personalizado */
/* Ver el modo CSS para el código completo */

<div class="relative overflow-hidden bg-[${backgroundColor}] w-full h-screen">
${colors.map((_, index) => `  <div class="gradient-blob-${index + 1}"></div>`).join('\n')}${grainIntensity > 0 ? '\n  <div class="gradient-grain"></div>' : ''}
</div>`;
};

/**
 * Genera el código completo según el modo y el formato
 */
export const generateCode = (mode, codeMode, colors, gradientType, angle, gradientOpacity, gradientBlur, grainIntensity = 0, animatedBackgroundColor = "#ffffff") => {
    if (mode === "animated") {
        return codeMode === "css"
            ? generateAnimatedCSSCode(colors, grainIntensity, animatedBackgroundColor)
            : generateAnimatedTailwindCode(colors, grainIntensity, animatedBackgroundColor);
    } else {
        return codeMode === "css"
            ? generateStaticCSSCode(colors, gradientType, angle, gradientOpacity, gradientBlur, grainIntensity)
            : generateStaticTailwindCode(colors, gradientType, angle, gradientOpacity, gradientBlur, grainIntensity);
    }
};
