function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirmar", cancelText = "Cancelar", type = "danger" }) {
    if (!isOpen) return null;

    const confirmBtnColor = type === "danger" 
        ? "bg-red-500 hover:bg-red-600" 
        : "bg-blue-500 hover:bg-blue-600";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade animate-duration-200">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onCancel}
            />
            
            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 animate-fade-up animate-duration-300">
                {/* Icono */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    type === "danger" ? "bg-red-100" : "bg-blue-100"
                }`}>
                    {type === "danger" ? (
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                </div>

                {/* Contenido */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-600 mb-6">{message}</p>

                {/* Botones */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-4 py-2.5 ${confirmBtnColor} text-white rounded-xl font-medium transition-colors`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;


