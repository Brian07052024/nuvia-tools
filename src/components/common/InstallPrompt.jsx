import { useState, useEffect } from 'react';

const InstallPrompt = ({ onDismiss }) => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isIOS, setIsIOS] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);

    useEffect(() => {
        //Detectar iOS
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(iOS);

        //Capturar el evento beforeinstallprompt
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstall = async () => {
        if (isIOS) {
            //En iOS, mostrar las instrucciones
            setShowInstructions(true);
            return;
        }

        if (!deferredPrompt) {
            //Si no hay prompt nativo disponible, mostrar instrucciones manuales
            setShowInstructions(true);
            return;
        }

        //Android/Chrome: usar el prompt nativo
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            onDismiss();
        }
    };

    return (
        <div className="fixed inset-0 bg-neutral-800 flex items-center justify-center z-50 overflow-hidden">
            {/*gradiente de fondo animado con múltiples capas */}
            <div className="absolute inset-0 overflow-hidden">
                {/*capa 1: Gradiente principal superior */}
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 bg-linear-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full blur-3xl opacity-40 animate-gradient-xy"></div>

                {/*capa 2: Gradiente secundario */}
                <div className="absolute top-0 left-0 w-full h-2/3 bg-linear-to-b from-purple-600/30 via-pink-500/20 to-transparent"></div>

                {/*capa 3: Vignette oscuro en los bordes */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#1a1625]"></div>
            </div>

            <div className="max-w-md w-full h-full flex flex-col items-center justify-between text-center relative px-6 py-8 z-10">
                {/*btn cerrar */}
                <button
                    onClick={onDismiss}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"
                    aria-label="Cerrar"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Sección superior: Logo y Título */}
                <div className="flex-1 flex flex-col items-center justify-center relative w-full">
                    {/* Logo o icono centrado */}
                    <div className="relative mb-6">
                        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl shadow-pink-500/50 backdrop-blur-sm">
                            <img src="/img/logo-nuvia-new.webp" alt="icon" className='max-h-16 object-contain animate-fade' />
                        </div>
                    </div>

                    <div className="text-white text-base font-medium mb-6">
                        Nuvia Gradient Generator
                    </div>

                    {/* Título principal */}
                    <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 leading-tight">
                        Crea<br /><span className="bg-linear-to-r from-violet-200  to-cyan-200 bg-clip-text text-transparent">
                            Gradientes Increíbles
                        </span>

                    </h1>

                    {/* Descripción */}
                    <p className="text-gray-300 text-xs md:text-md max-w-sm leading-relaxed mb-4">
                        Asombrosos gradientes estáticos y animados para web, backgrounds de reels/tiktoks, y más.
                    </p>

                    {/* Beneficios */}
                    <div className="flex flex-nowrap justify-center gap-2 text-xs overflow-x-auto">
                        <span className="bg-white/10 text-gray-300 px-3 py-1.5 rounded-full backdrop-blur-sm whitespace-nowrap">Instantáneo</span>
                        <span className="bg-white/10 text-gray-300 px-3 py-1.5 rounded-full backdrop-blur-sm whitespace-nowrap">Ilimitado</span>
                        <span className="bg-white/10 text-gray-300 px-3 py-1.5 rounded-full backdrop-blur-sm whitespace-nowrap">Rápido</span>
                    </div>
                </div>

                {/* Sección inferior: Botón y detalles */}
                <div className="w-full space-y-4">
                    {/* Botón de instalación */}
                    <button
                        onClick={handleInstall}
                        className="bg-linear-to-r mt-2 from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-lg py-3 px-8 rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
                    >
                        Install Web App
                    </button>

                    {/* Instrucciones de instalación */}
                    {showInstructions && (
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-left animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <p className="text-sm text-gray-300 mb-2 font-semibold">
                                {isIOS ? '📱 Para instalar en iOS:' : '💻 Para instalar la app:'}
                            </p>
                            {isIOS ? (
                                <ol className="text-xs text-gray-400 space-y-1 pl-4">
                                    <li>1. Toca el botón de compartir <span className="inline-block">⎙</span> en Safari</li>
                                    <li>2. Selecciona "Añadir a pantalla de inicio"</li>
                                    <li>3. Confirma la instalación</li>
                                </ol>
                            ) : (
                                <ol className="text-xs text-gray-400 space-y-1 pl-4">
                                    <li>1. Abre el menú de tu navegador (⋮ o •••)</li>
                                    <li>2. Selecciona "Instalar app" o "Añadir a pantalla de inicio"</li>
                                    <li>3. Confirma la instalación</li>
                                </ol>
                            )}
                        </div>
                    )}



                    {/* Footer */}
                    <div className="text-xs text-gray-600 flex justify-center">

                        <p className="text-gray-700 flex gap-2">
                            Creado con cariño por

                            <a href='https://www.instagram.com/nuviajs.web?igsh=bng2b2NiZ2x2dmd6' className="text-gray-500 flex gap-0.5">

                                <img src="/svg/instagram.svg" alt="" />
                                nuviajs.web
                            </a>
                        </p>
                    </div>

                    {/* Botón secundario para continuar sin instalar */}
                    <button
                        onClick={onDismiss}
                        className="text-gray-500 hover:text-gray-400 text-sm underline transition-colors"
                    >
                        Continue without installing
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstallPrompt;
