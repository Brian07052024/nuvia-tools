import { useEffect } from "react";

function Toast({ message, type = "success", onClose, duration = 3000 }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const bgColor = type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500";
    const icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";

    return (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 ${bgColor} text-white px-6 py-4 rounded-2xl shadow-sm flex items-center gap-3 animate-fade-down animate-duration-300 min-w-75`}>
            <span className="text-2xl font-bold">{icon}</span>
            <p className="flex-1 font-medium">{message}</p>
            <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors ml-2"
                aria-label="Cerrar notificación"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}

export default Toast;
