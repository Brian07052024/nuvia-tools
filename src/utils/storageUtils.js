/**
 * Limpia el localStorage removiendo las configuraciones guardadas
 */
export const clearLocalStorage = () => {
    const keys = [
        "paletaActual",
        "formatoActual",
        "anguloActual",
        "modoActual",
        "tipoGradiente",
        "desenfoque",
        "opacidad",
        "duracionVideo",
        "fpsVideo",
        "bitrateVideo",
        "granulado",
        "animatedBackgroundColor"
    ];

    try {
        keys.forEach(key => window.localStorage.removeItem(key));
        return true;
    } catch (error) {
        console.error("Error al limpiar localStorage:", error);
        return false;
    }
};
