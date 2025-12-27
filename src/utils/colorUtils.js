/**
 * Genera un color hexadecimal aleatorio
 */
export const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

/**
 * Genera un array de colores aleatorios
 */
export const generateRandomColors = () => {
    const numColors = Math.floor(Math.random() * 3) + 2; // Entre 2 y 4 colores
    return Array.from({ length: numColors }, () => generateRandomColor());
};

/**
 * Convierte un color hexadecimal a RGB
 */
export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};
