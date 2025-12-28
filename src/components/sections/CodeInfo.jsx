/**
 * Componente para información adicional del código
 */
function CodeInfo({ colors, gradientType, angle, gradientBlur, gradientOpacity }) {
    return (
        <div className="mt-3 text-neutral-400 text-xs space-y-1">
            <p>Colores: {colors.length}</p>
            <p>Tipo: {gradientType}</p>
            {gradientType === "linear" && <p>Ángulo: {angle}°</p>}
            {gradientBlur > 0 && <p>Blur: {gradientBlur}px</p>}
            {gradientOpacity < 100 && <p>Opacidad: {gradientOpacity}%</p>}
        </div>
    );
}

export default CodeInfo;


