import { useEffect } from "react";

function Toast({ message, type = "success", onClose, duration = 3000 }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const bgColor = type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500";

    return (
        <div className={`fixed bottom-48 max-h-fit py-3 md:top-4 left-1/2 -translate-x-1/2 z-50 bg-white text-neutral-700 px-4 rounded-2xl border-2 border-gray-200 flex items-center gap-3 animate-fade-down animate-duration-300 w-fit`}>

            <div className={`h-4 w-1 rounded-t-full rounded-b-full ${bgColor}`}></div>

            <p className="flex-1 font-medium shrink-0 whitespace-nowrap">{message}</p>
            <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors ml-2"
                aria-label="Cerrar notificación"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#171717" className="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
            </button>
        </div>
    );
}

export default Toast;


