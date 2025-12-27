/**
 * Genera código CSS para un gradiente estático
 */
export const generateStaticCSSCode = (colors, gradientType, angle, gradientOpacity, gradientBlur) => {
    let cssCode = [];

    cssCode.push("/* Aplica estos estilos al elemento que quieres usar como fondo */");
    cssCode.push("");

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

/**
 * Genera código CSS para un gradiente animado
 */
export const generateAnimatedCSSCode = (colors) => {
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
};

/**
 * Genera código Tailwind para un gradiente estático
 */
export const generateStaticTailwindCode = (colors, gradientType, angle, gradientOpacity, gradientBlur) => {
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

/**
 * Genera código Tailwind para un gradiente animado
 */
export const generateAnimatedTailwindCode = (colors) => {
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
};

/**
 * Genera el código completo según el modo y el formato
 */
export const generateCode = (mode, codeMode, colors, gradientType, angle, gradientOpacity, gradientBlur) => {
    if (mode === "animated") {
        return codeMode === "css"
            ? generateAnimatedCSSCode(colors)
            : generateAnimatedTailwindCode(colors);
    } else {
        return codeMode === "css"
            ? generateStaticCSSCode(colors, gradientType, angle, gradientOpacity, gradientBlur)
            : generateStaticTailwindCode(colors, gradientType, angle, gradientOpacity, gradientBlur);
    }
};
