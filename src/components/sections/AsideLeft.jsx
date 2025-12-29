import { useColor } from "../../hook/useColor";
import { formats } from "../../constants/formats.js";
import { useState, useCallback, memo } from "react";

function AsideLeft() {
    const {
        format, setFormat,
        angle, setAngle,
        mode, setMode,
        gradientType, setGradientType, gradientBlur, setGradientBlur, gradientOpacity, setGradientOpacity,
        videoDuration, setVideoDuration, videoFps, setVideoFps, videoBitrate, setVideoBitrate,
        grainIntensity, setGrainIntensity
    } = useColor();

    // Estado para el dropdown de formatos (móvil)
    const [isFormatDropdownOpen, setIsFormatDropdownOpen] = useState(false);

    // Estado para el dropdown de ajustes del gradiente (móvil)
    const [isGradientSettingsOpen, setIsGradientSettingsOpen] = useState(false);

    // Estado para el dropdown de ajustes del video (móvil)
    const [isVideoSettingsOpen, setIsVideoSettingsOpen] = useState(false);

    // Estado para controlar qué modal está abierto en móviles
    const [mobileModalOpen, setMobileModalOpen] = useState(null); // 'mode', 'format', 'settings', null

    // Handlers de formato
    const handleClick = (aspect) => {
        setFormat(aspect);
        setIsFormatDropdownOpen(false); // Cerrar dropdown al seleccionar
    }

    const handleMode = (modo) => {
        setMode(modo);
    }

    // Handlers de gradiente
    const handleAngleChange = (e) => {
        setAngle(Number(e.target.value));
    }

    const handleGradientTypeChange = (type) => {
        setGradientType(type);
    }

    const handleBlurChange = (e) => {
        setGradientBlur(Number(e.target.value));
    }

    const handleOpacityChange = (e) => {
        setGradientOpacity(Number(e.target.value));
    }

    // Handlers de video
    const handleDurationChange = (e) => {
        setVideoDuration(Number(e.target.value));
    }

    const handleFpsChange = (e) => {
        setVideoFps(Number(e.target.value));
    }

    const handleBitrateChange = (e) => {
        setVideoBitrate(Number(e.target.value));
    }

    const handleGrainChange = (e) => {
        setGrainIntensity(Number(e.target.value));
    }

    return (
        // el abuelito->
        <>
            <div className="bg-white absolute bottom-0 left-0 right-0 flex flex-row justify-between gap-2 px-4 py-3 w-full border border-gray-300 rounded-t-2xl animate-fade-up z-10 lg:relative lg:z-auto lg:col-span-2 lg:p-4 lg:gap-5 lg:w-auto lg:flex-col lg:rounded-2xl lg:overflow-y-scroll lg:animate-fade-right">

            {/* Barra horizontal compacta para móviles */}
            <div className="flex gap-2 w-full lg:hidden">
                {/* Botón Tipo de gradiente */}
                <button
                    onClick={() => setMobileModalOpen('mode')}
                    className="flex flex-1 flex-col justify-center items-center cursor-pointer border-2 border-gray-300 bg-white px-2 py-2 rounded-xl hover:bg-gray-100 transition-all"
                    aria-label="Tipo de gradiente"
                >
                    {mode === "static" ? (
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="#6b7280" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_176_7)">
                                <path d="M0.00195312 3C0.00195312 2.46957 0.212667 1.96086 0.58774 1.58579C0.962812 1.21071 1.47152 1 2.00195 1H14.002C14.5324 1 15.0411 1.21071 15.4162 1.58579C15.7912 1.96086 16.002 2.46957 16.002 3V13C16.002 13.5304 15.7912 14.0391 15.4162 14.4142C15.0411 14.7893 14.5324 15 14.002 15H2.00195C1.47152 15 0.962812 14.7893 0.58774 14.4142C0.212667 14.0391 0.00195313 13.5304 0.00195312 13V3ZM1.00195 12V13C1.00195 13.2652 1.10731 13.5196 1.29485 13.7071C1.48238 13.8946 1.73674 14 2.00195 14H14.002C14.2672 14 14.5215 13.8946 14.7091 13.7071C14.8966 13.5196 15.002 13.2652 15.002 13V9.5L11.225 7.553C11.1312 7.50602 11.025 7.48973 10.9215 7.50642C10.8179 7.52311 10.7222 7.57194 10.648 7.646L6.93795 11.356L4.27795 9.584C4.18191 9.52006 4.06672 9.4913 3.95189 9.5026C3.83707 9.5139 3.72969 9.56456 3.64795 9.646L1.00195 12ZM6.00195 5.5C6.00195 5.10218 5.84392 4.72064 5.56261 4.43934C5.28131 4.15804 4.89978 4 4.50195 4C4.10413 4 3.7226 4.15804 3.44129 4.43934C3.15999 4.72064 3.00195 5.10218 3.00195 5.5C3.00195 5.89782 3.15999 6.27936 3.44129 6.56066C3.7226 6.84196 4.10413 7 4.50195 7C4.89978 7 5.28131 6.84196 5.56261 6.56066C5.84392 6.27936 6.00195 5.89782 6.00195 5.5Z" />
                            </g>
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="#6b7280" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.55553 10.5645C1.14095 11.1277 0.948021 11.8237 1.01349 12.52C1.07897 13.2163 1.39826 13.8641 1.91057 14.3402C2.42287 14.8163 3.09239 15.0873 3.7916 15.1016C4.4908 15.1159 5.17084 14.8725 5.70219 14.4178C4.71158 14.2473 3.792 13.7922 3.05566 13.1079C2.31933 12.4237 1.79808 11.5399 1.55553 10.5645Z" />
                            <path d="M3.41311 6.45776C2.68468 7.26355 2.291 8.31683 2.31235 9.40286C2.33369 10.4889 2.76845 11.5259 3.52799 12.3024C4.28753 13.079 5.31464 13.5366 6.39993 13.582C7.48522 13.6273 8.54696 13.2571 9.36867 12.5467C7.79177 12.4678 6.30264 11.7971 5.19864 10.6684C4.09464 9.53963 3.45702 8.03602 3.41311 6.45776Z" />
                            <path d="M9.67965 0.888916C10.7445 0.888919 11.7854 1.20451 12.6709 1.79582C13.5565 2.38712 14.2469 3.22762 14.655 4.21113C15.0631 5.19463 15.1705 6.27703 14.9638 7.32157C14.757 8.36612 14.2453 9.32595 13.4933 10.0798C12.7413 10.8337 11.7827 11.3478 10.7387 11.5571C9.69466 11.7665 8.612 11.6617 7.62749 11.256C6.64297 10.8504 5.80077 10.162 5.20728 9.27795C4.61378 8.39387 4.29562 7.35373 4.29299 6.28892C4.29123 5.58041 4.42927 4.87851 4.69919 4.22343C4.96911 3.56835 5.36561 2.97296 5.86598 2.47135C6.36635 1.96973 6.96077 1.57176 7.61518 1.30022C8.26959 1.02868 8.97114 0.888914 9.67965 0.888916Z" />
                        </svg>
                    )}
                    <span className="text-[10px] mt-1 text-gray-600 font-medium leading-tight">Modo</span>
                </button>

                {/* Botón Formato */}
                <button
                    onClick={() => setMobileModalOpen('format')}
                    className="flex flex-1 flex-col justify-center items-center cursor-pointer border-2 border-gray-300 bg-white px-2 py-2 rounded-xl hover:bg-gray-100 transition-all"
                    aria-label="Formato"
                >
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="#6b7280" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    </svg>
                    <span className="text-[10px] mt-1 text-gray-600 font-medium leading-tight">Formato</span>
                </button>

                {/* Botón Ajustes */}
                <button
                    onClick={() => setMobileModalOpen('settings')}
                    className="flex flex-1 flex-col justify-center items-center cursor-pointer border-2 border-gray-300 bg-white px-2 py-2 rounded-xl hover:bg-gray-100 transition-all"
                    aria-label="Ajustes del gradiente"
                >
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="#6b7280" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                    </svg>
                    <span className="text-[10px] mt-1 text-gray-600 font-medium leading-tight">Ajustes</span>
                </button>
            </div>

            {/* Contenido completo para desktop */}
            <div className="hidden lg:flex lg:flex-col lg:gap-5 lg:w-full">

                {/* Tipo de gradiente */}
                <div className="flex flex-col gap-3">
                    <h2 className="text-sm lg:text-base text-gray-800 font-medium">Tipo de gradiente</h2>

                    <div className="flex gap-2">
                        <button
                            onClick={() => handleMode("static")}
                            aria-label="Modo estático - Exportar como imagen"
                            className={`shadow transition-colors w-full flex items-center justify-center gap-1 rounded-full border-2 py-2 cursor-pointer ${mode === "static" ? "text-gray-800 border-gray-400 bg-gray-200" : "text-gray-500 border-gray-300 hover:bg-gray-100"}`}
                        >

                            <svg width="16" height="16" viewBox="0 0 16 16" fill={mode === "static" ? "#1f2937" : "#6b7280"} xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_176_7)">
                                    <path d="M0.00195312 3C0.00195312 2.46957 0.212667 1.96086 0.58774 1.58579C0.962812 1.21071 1.47152 1 2.00195 1H14.002C14.5324 1 15.0411 1.21071 15.4162 1.58579C15.7912 1.96086 16.002 2.46957 16.002 3V13C16.002 13.5304 15.7912 14.0391 15.4162 14.4142C15.0411 14.7893 14.5324 15 14.002 15H2.00195C1.47152 15 0.962812 14.7893 0.58774 14.4142C0.212667 14.0391 0.00195313 13.5304 0.00195312 13V3ZM1.00195 12V13C1.00195 13.2652 1.10731 13.5196 1.29485 13.7071C1.48238 13.8946 1.73674 14 2.00195 14H14.002C14.2672 14 14.5215 13.8946 14.7091 13.7071C14.8966 13.5196 15.002 13.2652 15.002 13V9.5L11.225 7.553C11.1312 7.50602 11.025 7.48973 10.9215 7.50642C10.8179 7.52311 10.7222 7.57194 10.648 7.646L6.93795 11.356L4.27795 9.584C4.18191 9.52006 4.06672 9.4913 3.95189 9.5026C3.83707 9.5139 3.72969 9.56456 3.64795 9.646L1.00195 12ZM6.00195 5.5C6.00195 5.10218 5.84392 4.72064 5.56261 4.43934C5.28131 4.15804 4.89978 4 4.50195 4C4.10413 4 3.7226 4.15804 3.44129 4.43934C3.15999 4.72064 3.00195 5.10218 3.00195 5.5C3.00195 5.89782 3.15999 6.27936 3.44129 6.56066C3.7226 6.84196 4.10413 7 4.50195 7C4.89978 7 5.28131 6.84196 5.56261 6.56066C5.84392 6.27936 6.00195 5.89782 6.00195 5.5Z" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_176_7">
                                        <rect width="16" height="16" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <p className="invisible lg:visible text-xs xl:text-base">Imagen</p>
                        </button>

                        <button
                            onClick={() => handleMode("animated")}
                            aria-label="Modo animado - Exportar como video"
                            className={`shadow transition-colors w-full flex items-center justify-center gap-1 rounded-full border-2 py-2 cursor-pointer ${mode === "animated" ? "text-gray-800 border-gray-400 bg-gray-200" : "text-gray-500 border-gray-300 hover:bg-gray-100"}`}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill={mode === "animated" ? "#1f2937" : "#6b7280"} xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.55553 10.5645C1.14095 11.1277 0.948021 11.8237 1.01349 12.52C1.07897 13.2163 1.39826 13.8641 1.91057 14.3402C2.42287 14.8163 3.09239 15.0873 3.7916 15.1016C4.4908 15.1159 5.17084 14.8725 5.70219 14.4178C4.71158 14.2473 3.792 13.7922 3.05566 13.1079C2.31933 12.4237 1.79808 11.5399 1.55553 10.5645Z" />
                                <path d="M3.41311 6.45776C2.68468 7.26355 2.291 8.31683 2.31235 9.40286C2.33369 10.4889 2.76845 11.5259 3.52799 12.3024C4.28753 13.079 5.31464 13.5366 6.39993 13.582C7.48522 13.6273 8.54696 13.2571 9.36867 12.5467C7.79177 12.4678 6.30264 11.7971 5.19864 10.6684C4.09464 9.53963 3.45702 8.03602 3.41311 6.45776Z" />
                                <path d="M9.67965 0.888916C10.7445 0.888919 11.7854 1.20451 12.6709 1.79582C13.5565 2.38712 14.2469 3.22762 14.655 4.21113C15.0631 5.19463 15.1705 6.27703 14.9638 7.32157C14.757 8.36612 14.2453 9.32595 13.4933 10.0798C12.7413 10.8337 11.7827 11.3478 10.7387 11.5571C9.69466 11.7665 8.612 11.6617 7.62749 11.256C6.64297 10.8504 5.80077 10.162 5.20728 9.27795C4.61378 8.39387 4.29562 7.35373 4.29299 6.28892C4.29123 5.58041 4.42927 4.87851 4.69919 4.22343C4.96911 3.56835 5.36561 2.97296 5.86598 2.47135C6.36635 1.96973 6.96077 1.57176 7.61518 1.30022C8.26959 1.02868 8.97114 0.888914 9.67965 0.888916Z" />
                            </svg>
                            <p className="invisible lg:visible text-xs xl:text-base">Animado</p>
                        </button>
                    </div>
                </div>

                {/* Formatos disponibles */}
                <div className="flex flex-col gap-3">
                    <h2 className="text-sm lg:text-base text-gray-800 font-medium">Formato</h2>

                    {/* Vista móvil - Dropdown */}
                    <div className="lg:hidden relative">
                        <button
                            onClick={() => setIsFormatDropdownOpen(!isFormatDropdownOpen)}
                            className="shadow w-full flex items-center justify-between p-3 rounded-2xl border-2 border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-medium">
                                {formats.find(f => f.aspect === format)?.nombre || "Landscape"}
                            </span>
                            <svg
                                className={`w-4 h-4 transition-transform ${isFormatDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Opciones del dropdown */}
                        {isFormatDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-2xl shadow-lg z-50 overflow-hidden">
                                {formats.map((formato, idx) => {
                                    const isSelected = formato.aspect === format;
                                    const fillColor = isSelected ? "#1f2937" : "#6b7280";

                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => handleClick(formato.aspect)}
                                            className={`flex items-center gap-3 p-3 cursor-pointer transition-all border-b border-gray-200 last:border-b-0 ${isSelected
                                                ? "bg-gray-200 text-gray-800"
                                                : "text-gray-500 hover:bg-gray-100"
                                                }`}
                                        >
                                            <div className="shrink-0">
                                                {formato.aspect === "16/9" && (
                                                    <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-auto">
                                                        <path d="M28 1C28.5304 1 29.0391 1.10536 29.4142 1.29289C29.7893 1.48043 30 1.73478 30 2V14C30 14.2652 29.7893 14.5196 29.4142 14.7071C29.0391 14.8946 28.5304 15 28 15H4C3.46957 15 2.96086 14.8946 2.58579 14.7071C2.21071 14.5196 2 14.2652 2 14V2C2 1.73478 2.21071 1.48043 2.58579 1.29289C2.96086 1.10536 3.46957 1 4 1H28ZM4 0C2.93913 0 1.92172 0.210714 1.17157 0.585786C0.421427 0.960859 0 1.46957 0 2L0 14C0 14.5304 0.421427 15.0391 1.17157 15.4142C1.92172 15.7893 2.93913 16 4 16H28C29.0609 16 30.0783 15.7893 30.8284 15.4142C31.5786 15.0391 32 14.5304 32 14V2C32 1.46957 31.5786 0.960859 30.8284 0.585786C30.0783 0.210714 29.0609 0 28 0L4 0Z" fill={fillColor} />
                                                    </svg>
                                                )}
                                                {formato.aspect === "1/1" && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="h-4 w-auto">
                                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" fill={fillColor} />
                                                    </svg>
                                                )}
                                                {formato.aspect === "9/16" && (
                                                    <div className="flex gap-1 items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="h-3.5 w-auto">
                                                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" fill={fillColor} />
                                                        </svg>
                                                        <div className={`w-1 h-1 rounded-full ${isSelected ? "bg-gray-400" : "bg-gray-300"}`}></div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 455 512.098" className="h-3.5 w-auto">
                                                            <path fill={fillColor} fillRule="nonzero" d="M321.331.011h-81.882v347.887c0 45.59-32.751 74.918-72.582 74.918-39.832 0-75.238-29.327-75.238-74.918 0-52.673 41.165-80.485 96.044-74.727v-88.153c-7.966-1.333-15.932-1.77-22.576-1.77C75.249 183.248 0 255.393 0 344.794c0 94.722 74.353 167.304 165.534 167.304 80.112 0 165.097-58.868 165.097-169.96V161.109c35.406 35.406 78.341 46.476 124.369 46.476V126.14C398.35 122.151 335.494 84.975 321.331 0v.011z" />
                                                        </svg>
                                                    </div>
                                                )}
                                                {formato.aspect === "4/3" && (
                                                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-auto">
                                                        <path d="M20 1.5C20.3978 1.5 20.7794 1.65804 21.0607 1.93934C21.342 2.22064 21.5 2.60218 21.5 3V15C21.5 15.3978 21.342 15.7794 21.0607 16.0607C20.7794 16.342 20.3978 16.5 20 16.5H4C3.60218 16.5 3.22064 16.342 2.93934 16.0607C2.65804 15.7794 2.5 15.3978 2.5 15V3C2.5 2.60218 2.65804 2.22064 2.93934 1.93934C3.22064 1.65804 3.60218 1.5 4 1.5H20ZM4 0C2.93913 0 1.92172 0.315893 1.17157 0.87868C0.421427 1.44147 0 2.20435 0 3V15C0 15.7956 0.421427 16.5585 1.17157 17.1213C1.92172 17.6841 2.93913 18 4 18H20C21.0609 18 22.0783 17.6841 22.8284 17.1213C23.5786 16.5585 24 15.7956 24 15V3C24 2.20435 23.5786 1.44147 22.8284 0.87868C22.0783 0.315893 21.0609 0 20 0H4Z" fill={fillColor} />
                                                    </svg>
                                                )}
                                                {formato.aspect === "circle" && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={fillColor} className="bi bi-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="text-xs lg:text-sm">{formato.nombre}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Vista desktop - Grid original */}
                    <div className="hidden lg:grid grid-cols-2 gap-2">
                        {formats.map((formato, idx) => {
                            const isSelected = formato.aspect === format;
                            const fillColor = isSelected ? "#1f2937" : "#6b7280";

                            return (
                                <div
                                    key={idx}
                                    onClick={() => handleClick(formato.aspect)}
                                    className=
                                    {
                                        `
                                        shadow cursor-pointer transition-all w-full h-auto p-2 rounded-2xl border-2 text-center flex flex-col gap-1 items-center justify-center hover:bg-gray-100 
                                        ${formato.aspect === "16/9" ? "col-span-2" : ""}
                                        ${isSelected ? "text-gray-800 border-gray-400 bg-gray-200" : "text-gray-500 border-gray-300"}
                                    `
                                    }
                                >
                                    {formato.aspect === "16/9" && (

                                        <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-auto">
                                            <path d="M28 1C28.5304 1 29.0391 1.10536 29.4142 1.29289C29.7893 1.48043 30 1.73478 30 2V14C30 14.2652 29.7893 14.5196 29.4142 14.7071C29.0391 14.8946 28.5304 15 28 15H4C3.46957 15 2.96086 14.8946 2.58579 14.7071C2.21071 14.5196 2 14.2652 2 14V2C2 1.73478 2.21071 1.48043 2.58579 1.29289C2.96086 1.10536 3.46957 1 4 1H28ZM4 0C2.93913 0 1.92172 0.210714 1.17157 0.585786C0.421427 0.960859 0 1.46957 0 2L0 14C0 14.5304 0.421427 15.0391 1.17157 15.4142C1.92172 15.7893 2.93913 16 4 16H28C29.0609 16 30.0783 15.7893 30.8284 15.4142C31.5786 15.0391 32 14.5304 32 14V2C32 1.46957 31.5786 0.960859 30.8284 0.585786C30.0783 0.210714 29.0609 0 28 0L4 0Z" fill={fillColor} />
                                        </svg>

                                    )}
                                    {formato.aspect === "1/1" && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="h-4 w-auto">
                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" fill={fillColor} />
                                        </svg>
                                    )}
                                    {formato.aspect === "9/16" && (
                                        <div className="flex gap-1 items-center">

                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="h-3.5 w-auto">
                                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" fill={fillColor} />
                                            </svg>

                                            <div className={`w-1 h-1 rounded-full ${isSelected ? "bg-gray-400" : "bg-gray-300"}`}></div>

                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 455 512.098" className="h-3.5 w-auto">
                                                <path fill={fillColor} fillRule="nonzero" d="M321.331.011h-81.882v347.887c0 45.59-32.751 74.918-72.582 74.918-39.832 0-75.238-29.327-75.238-74.918 0-52.673 41.165-80.485 96.044-74.727v-88.153c-7.966-1.333-15.932-1.77-22.576-1.77C75.249 183.248 0 255.393 0 344.794c0 94.722 74.353 167.304 165.534 167.304 80.112 0 165.097-58.868 165.097-169.96V161.109c35.406 35.406 78.341 46.476 124.369 46.476V126.14C398.35 122.151 335.494 84.975 321.331 0v.011z" />
                                            </svg>

                                        </div>
                                    )}
                                    {formato.aspect === "4/3" && (

                                        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-auto">
                                            <path d="M20 1.5C20.3978 1.5 20.7794 1.65804 21.0607 1.93934C21.342 2.22064 21.5 2.60218 21.5 3V15C21.5 15.3978 21.342 15.7794 21.0607 16.0607C20.7794 16.342 20.3978 16.5 20 16.5H4C3.60218 16.5 3.22064 16.342 2.93934 16.0607C2.65804 15.7794 2.5 15.3978 2.5 15V3C2.5 2.60218 2.65804 2.22064 2.93934 1.93934C3.22064 1.65804 3.60218 1.5 4 1.5H20ZM4 0C2.93913 0 1.92172 0.315893 1.17157 0.87868C0.421427 1.44147 0 2.20435 0 3V15C0 15.7956 0.421427 16.5585 1.17157 17.1213C1.92172 17.6841 2.93913 18 4 18H20C21.0609 18 22.0783 17.6841 22.8284 17.1213C23.5786 16.5585 24 15.7956 24 15V3C24 2.20435 23.5786 1.44147 22.8284 0.87868C22.0783 0.315893 21.0609 0 20 0H4Z" fill={fillColor} />
                                        </svg>

                                    )}
                                    {formato.aspect === "circle" && (

                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={fillColor} className="bi bi-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        </svg>

                                    )}
                                    <p className="text-[10px] lg:text-xs">{formato.nombre}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Ajustes del gradiente */}
                {mode === "static" && (
                    <div className="flex flex-col gap-3">
                        {/* Header con toggle para móvil */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm lg:text-base text-gray-800 font-medium">Ajustes del gradiente</h2>
                            <button
                                onClick={() => setIsGradientSettingsOpen(!isGradientSettingsOpen)}
                                className="lg:hidden p-1 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <svg
                                    className={`w-5 h-5 transition-transform ${isGradientSettingsOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        {/* Contenido colapsable en móvil, siempre visible en desktop */}
                        <div className={`${isGradientSettingsOpen ? 'flex' : 'hidden'} lg:flex flex-col gap-3`}>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-xs text-gray-400">Tipo de gradiente</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => handleGradientTypeChange("linear")}
                                        className={`shadow py-1 cursor-pointer rounded-full w-full border-2 transition-all ${gradientType === "linear"
                                            ? "text-gray-800 border-gray-400 bg-gray-200"
                                            : "text-gray-500 border-gray-300 hover:bg-gray-100"
                                            }`}
                                    >
                                        Lineal
                                    </button>
                                    <button
                                        onClick={() => handleGradientTypeChange("radial")}
                                        className={`shadow py-1 cursor-pointer rounded-full w-full border-2 transition-all ${gradientType === "radial"
                                            ? "text-gray-800 border-gray-400 bg-gray-200"
                                            : "text-gray-500 border-gray-300 hover:bg-gray-100"
                                            }`}
                                    >
                                        Radial
                                    </button>
                                </div>
                            </div>

                            {gradientType === "linear" && (
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs text-gray-400">
                                        Ángulo: <span className="font-medium">{angle}°</span>
                                    </label>

                                    <input
                                        type="range"
                                        min="0"
                                        max="360"
                                        value={angle}
                                        onChange={handleAngleChange}
                                        aria-label="Controlar ángulo del gradiente"
                                        className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                                    />

                                    <div className="flex justify-between items-center pointer-events-none">
                                        <span className="text-xs text-gray-500">0°</span>
                                        <span className="text-xs text-gray-500">360°</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                <label className="text-xs text-gray-400">
                                    Desenfoque: <span className="font-medium">{gradientBlur}px</span>
                                </label>

                                <input
                                    type="range"
                                    min="0"
                                    max="20"
                                    step="1"
                                    value={gradientBlur}
                                    onChange={handleBlurChange}
                                    aria-label="Controlar desenfoque del gradiente"
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                                />

                                <div className="flex justify-between items-center pointer-events-none">
                                    <span className="text-xs text-gray-500">0px</span>
                                    <span className="text-xs text-gray-500">20px</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs text-gray-400">
                                    Granulado: <span className="font-medium">{grainIntensity}%</span>
                                </label>

                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    step="5"
                                    value={grainIntensity}
                                    onChange={handleGrainChange}
                                    aria-label="Controlar intensidad del granulado"
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                                />

                                <div className="flex justify-between items-center pointer-events-none">
                                    <span className="text-xs text-gray-500">0%</span>
                                    <span className="text-xs text-gray-500">50%</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs text-gray-400">
                                    Opacidad: <span className="font-medium">{gradientOpacity}%</span>
                                </label>

                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="5"
                                    value={gradientOpacity}
                                    onChange={handleOpacityChange}
                                    aria-label="Controlar opacidad del gradiente"
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                                />

                                <div className="flex justify-between items-center pointer-events-none">
                                    <span className="text-xs text-gray-500">0%</span>
                                    <span className="text-xs text-gray-500">100%</span>
                                </div>
                            </div>


                        </div>
                    </div>
                )}

                {/* Ajustes del video */}
                {mode === "animated" && (
                    <div className="flex flex-col gap-3">
                        {/* Header con toggle para móvil */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm lg:text-base text-gray-800 font-medium">Ajustes del video</h2>
                            <button
                                onClick={() => setIsVideoSettingsOpen(!isVideoSettingsOpen)}
                                className="lg:hidden p-1 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <svg
                                    className={`w-5 h-5 transition-transform ${isVideoSettingsOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        {/* Contenido colapsable en móvil, siempre visible en desktop */}
                        <div className={`${isVideoSettingsOpen ? 'flex' : 'hidden'} lg:flex flex-col gap-3`}>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs text-gray-400">
                                    Duración: <span className="font-medium">{videoDuration}s</span>
                                </label>

                                <input
                                    type="range"
                                    min="3"
                                    max="30"
                                    step="1"
                                    value={videoDuration}
                                    onChange={handleDurationChange}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                                />

                                <div className="flex justify-between items-center pointer-events-none">
                                    <span className="text-xs text-gray-500">3s</span>
                                    <span className="text-xs text-gray-500">30s</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs text-gray-400">
                                    FPS: <span className="font-medium">{videoFps}</span>
                                </label>

                                <input
                                    type="range"
                                    min="24"
                                    max="60"
                                    step="6"
                                    value={videoFps}
                                    onChange={handleFpsChange}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                                />

                                <div className="flex justify-between items-center pointer-events-none">
                                    <span className="text-xs text-gray-500">24</span>
                                    <span className="text-xs text-gray-500">60</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs text-gray-400">
                                    Calidad: <span className="font-medium">{videoBitrate} Mbps</span>
                                </label>

                                <input
                                    type="range"
                                    min="2"
                                    max="20"
                                    step="2"
                                    value={videoBitrate}
                                    onChange={handleBitrateChange}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                                />

                                <div className="flex justify-between items-center pointer-events-none">
                                    <span className="text-xs text-gray-500">2 Mbps</span>
                                    <span className="text-xs text-gray-500">20 Mbps</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs text-gray-400">
                                    Granulado: <span className="font-medium">{grainIntensity}%</span>
                                </label>

                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    step="5"
                                    value={grainIntensity}
                                    onChange={handleGrainChange}
                                    aria-label="Controlar intensidad del granulado"
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                                />

                                <div className="flex justify-between items-center pointer-events-none">
                                    <span className="text-xs text-gray-500">0%</span>
                                    <span className="text-xs text-gray-500">50%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

            {/* Modal móvil - Tipo de gradiente */}
            {mobileModalOpen === 'mode' && (
                <>
                    <div
                        className="fixed inset-0 h-lvh w-screen bg-black/30 z-50 lg:hidden"
                        onClick={() => setMobileModalOpen(null)}
                        aria-hidden="true"
                    />
                    <div
                        role="dialog"
                        aria-labelledby="modal-mode-title"
                        aria-modal="true"
                        className="fixed inset-x-4 bottom-24 max-h-[50vh] bg-white rounded-2xl shadow-2xl z-60 flex flex-col lg:hidden animate-fade-up animate-duration-300"
                        onKeyDown={(e) => e.key === 'Escape' && setMobileModalOpen(null)}
                    >
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h2 id="modal-mode-title" className="text-gray-800 font-semibold">Tipo de gradiente</h2>
                            <button
                                onClick={() => setMobileModalOpen(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Cerrar modal"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        handleMode("static");
                                        setMobileModalOpen(null);
                                    }}
                                    className={`shadow transition-colors w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 py-4 cursor-pointer ${mode === "static" ? "text-gray-800 border-gray-400 bg-gray-200" : "text-gray-500 border-gray-300 hover:bg-gray-100"}`}
                                >
                                    <svg width="24" height="24" viewBox="0 0 16 16" fill={mode === "static" ? "#1f2937" : "#6b7280"} xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_176_7)">
                                            <path d="M0.00195312 3C0.00195312 2.46957 0.212667 1.96086 0.58774 1.58579C0.962812 1.21071 1.47152 1 2.00195 1H14.002C14.5324 1 15.0411 1.21071 15.4162 1.58579C15.7912 1.96086 16.002 2.46957 16.002 3V13C16.002 13.5304 15.7912 14.0391 15.4162 14.4142C15.0411 14.7893 14.5324 15 14.002 15H2.00195C1.47152 15 0.962812 14.7893 0.58774 14.4142C0.212667 14.0391 0.00195313 13.5304 0.00195312 13V3ZM1.00195 12V13C1.00195 13.2652 1.10731 13.5196 1.29485 13.7071C1.48238 13.8946 1.73674 14 2.00195 14H14.002C14.2672 14 14.5215 13.8946 14.7091 13.7071C14.8966 13.5196 15.002 13.2652 15.002 13V9.5L11.225 7.553C11.1312 7.50602 11.025 7.48973 10.9215 7.50642C10.8179 7.52311 10.7222 7.57194 10.648 7.646L6.93795 11.356L4.27795 9.584C4.18191 9.52006 4.06672 9.4913 3.95189 9.5026C3.83707 9.5139 3.72969 9.56456 3.64795 9.646L1.00195 12ZM6.00195 5.5C6.00195 5.10218 5.84392 4.72064 5.56261 4.43934C5.28131 4.15804 4.89978 4 4.50195 4C4.10413 4 3.7226 4.15804 3.44129 4.43934C3.15999 4.72064 3.00195 5.10218 3.00195 5.5C3.00195 5.89782 3.15999 6.27936 3.44129 6.56066C3.7226 6.84196 4.10413 7 4.50195 7C4.89978 7 5.28131 6.84196 5.56261 6.56066C5.84392 6.27936 6.00195 5.89782 6.00195 5.5Z" />
                                        </g>
                                    </svg>
                                    <p className="font-medium">Imagen</p>
                                </button>

                                <button
                                    onClick={() => {
                                        handleMode("animated");
                                        setMobileModalOpen(null);
                                    }}
                                    className={`shadow transition-colors w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 py-4 cursor-pointer ${mode === "animated" ? "text-gray-800 border-gray-400 bg-gray-200" : "text-gray-500 border-gray-300 hover:bg-gray-100"}`}
                                >
                                    <svg width="24" height="24" viewBox="0 0 16 16" fill={mode === "animated" ? "#1f2937" : "#6b7280"} xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.55553 10.5645C1.14095 11.1277 0.948021 11.8237 1.01349 12.52C1.07897 13.2163 1.39826 13.8641 1.91057 14.3402C2.42287 14.8163 3.09239 15.0873 3.7916 15.1016C4.4908 15.1159 5.17084 14.8725 5.70219 14.4178C4.71158 14.2473 3.792 13.7922 3.05566 13.1079C2.31933 12.4237 1.79808 11.5399 1.55553 10.5645Z" />
                                        <path d="M3.41311 6.45776C2.68468 7.26355 2.291 8.31683 2.31235 9.40286C2.33369 10.4889 2.76845 11.5259 3.52799 12.3024C4.28753 13.079 5.31464 13.5366 6.39993 13.582C7.48522 13.6273 8.54696 13.2571 9.36867 12.5467C7.79177 12.4678 6.30264 11.7971 5.19864 10.6684C4.09464 9.53963 3.45702 8.03602 3.41311 6.45776Z" />
                                        <path d="M9.67965 0.888916C10.7445 0.888919 11.7854 1.20451 12.6709 1.79582C13.5565 2.38712 14.2469 3.22762 14.655 4.21113C15.0631 5.19463 15.1705 6.27703 14.9638 7.32157C14.757 8.36612 14.2453 9.32595 13.4933 10.0798C12.7413 10.8337 11.7827 11.3478 10.7387 11.5571C9.69466 11.7665 8.612 11.6617 7.62749 11.256C6.64297 10.8504 5.80077 10.162 5.20728 9.27795C4.61378 8.39387 4.29562 7.35373 4.29299 6.28892C4.29123 5.58041 4.42927 4.87851 4.69919 4.22343C4.96911 3.56835 5.36561 2.97296 5.86598 2.47135C6.36635 1.96973 6.96077 1.57176 7.61518 1.30022C8.26959 1.02868 8.97114 0.888914 9.67965 0.888916Z" />
                                    </svg>
                                    <p className="font-medium">Animado</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Modal móvil - Formato */}
            {mobileModalOpen === 'format' && (
                <>
                    <div
                        className="fixed inset-0 h-lvh w-screen  bg-black/30 z-50 lg:hidden"
                        onClick={() => setMobileModalOpen(null)}
                        aria-hidden="true"
                    />
                    <div
                        role="dialog"
                        aria-labelledby="modal-format-title"
                        aria-modal="true"
                        className="fixed inset-x-4 bottom-24 max-h-[60vh] bg-white rounded-2xl shadow-2xl z-60 flex flex-col lg:hidden animate-fade-up animate-duration-300"
                        onKeyDown={(e) => e.key === 'Escape' && setMobileModalOpen(null)}
                    >
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h2 id="modal-format-title" className="text-gray-800 font-semibold">Formato</h2>
                            <button
                                onClick={() => setMobileModalOpen(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Cerrar modal"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="overflow-y-auto p-4 flex-1">
                            <div className="grid grid-cols-2 gap-3">
                                {formats.map((formato, idx) => {
                                    const isSelected = formato.aspect === format;
                                    const fillColor = isSelected ? "#1f2937" : "#6b7280";

                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => {
                                                handleClick(formato.aspect);
                                                setMobileModalOpen(null);
                                            }}
                                            className={`shadow cursor-pointer transition-all w-full p-4 rounded-xl border-2 text-center flex flex-col gap-2 items-center justify-center hover:bg-gray-100 ${formato.aspect === "16/9" ? "col-span-2" : ""
                                                } ${isSelected ? "text-gray-800 border-gray-400 bg-gray-200" : "text-gray-500 border-gray-300"}`}
                                        >
                                            {formato.aspect === "16/9" && (
                                                <svg width="40" height="20" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M28 1C28.5304 1 29.0391 1.10536 29.4142 1.29289C29.7893 1.48043 30 1.73478 30 2V14C30 14.2652 29.7893 14.5196 29.4142 14.7071C29.0391 14.8946 28.5304 15 28 15H4C3.46957 15 2.96086 14.8946 2.58579 14.7071C2.21071 14.5196 2 14.2652 2 14V2C2 1.73478 2.21071 1.48043 2.58579 1.29289C2.96086 1.10536 3.46957 1 4 1H28ZM4 0C2.93913 0 1.92172 0.210714 1.17157 0.585786C0.421427 0.960859 0 1.46957 0 2L0 14C0 14.5304 0.421427 15.0391 1.17157 15.4142C1.92172 15.7893 2.93913 16 4 16H28C29.0609 16 30.0783 15.7893 30.8284 15.4142C31.5786 15.0391 32 14.5304 32 14V2C32 1.46957 31.5786 0.960859 30.8284 0.585786C30.0783 0.210714 29.0609 0 28 0L4 0Z" fill={fillColor} />
                                                </svg>
                                            )}
                                            {formato.aspect === "1/1" && (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" fill={fillColor} />
                                                </svg>
                                            )}
                                            {formato.aspect === "9/16" && (
                                                <div className="flex gap-2 items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                                                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" fill={fillColor} />
                                                    </svg>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-gray-400" : "bg-gray-300"}`}></div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 455 512.098" className="h-5 w-auto">
                                                        <path fill={fillColor} fillRule="nonzero" d="M321.331.011h-81.882v347.887c0 45.59-32.751 74.918-72.582 74.918-39.832 0-75.238-29.327-75.238-74.918 0-52.673 41.165-80.485 96.044-74.727v-88.153c-7.966-1.333-15.932-1.77-22.576-1.77C75.249 183.248 0 255.393 0 344.794c0 94.722 74.353 167.304 165.534 167.304 80.112 0 165.097-58.868 165.097-169.96V161.109c35.406 35.406 78.341 46.476 124.369 46.476V126.14C398.35 122.151 335.494 84.975 321.331 0v.011z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {formato.aspect === "4/3" && (
                                                <svg width="32" height="24" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20 1.5C20.3978 1.5 20.7794 1.65804 21.0607 1.93934C21.342 2.22064 21.5 2.60218 21.5 3V15C21.5 15.3978 21.342 15.7794 21.0607 16.0607C20.7794 16.342 20.3978 16.5 20 16.5H4C3.60218 16.5 3.22064 16.342 2.93934 16.0607C2.65804 15.7794 2.5 15.3978 2.5 15V3C2.5 2.60218 2.65804 2.22064 2.93934 1.93934C3.22064 1.65804 3.60218 1.5 4 1.5H20ZM4 0C2.93913 0 1.92172 0.315893 1.17157 0.87868C0.421427 1.44147 0 2.20435 0 3V15C0 15.7956 0.421427 16.5585 1.17157 17.1213C1.92172 17.6841 2.93913 18 4 18H20C21.0609 18 22.0783 17.6841 22.8284 17.1213C23.5786 16.5585 24 15.7956 24 15V3C24 2.20435 23.5786 1.44147 22.8284 0.87868C22.0783 0.315893 21.0609 0 20 0H4Z" fill={fillColor} />
                                                </svg>
                                            )}
                                            {formato.aspect === "circle" && (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={fillColor} viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                </svg>
                                            )}
                                            <p className="text-sm font-medium">{formato.nombre}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Modal móvil - Ajustes */}
            {mobileModalOpen === 'settings' && (
                <>
                    <div
                        className="fixed inset-0 h-lvh w-screen  bg-black/30 z-50 lg:hidden"
                        onClick={() => setMobileModalOpen(null)}
                        aria-hidden="true"
                    />
                    <div
                        role="dialog"
                        aria-labelledby="modal-settings-title"
                        aria-modal="true"
                        className="fixed inset-x-4 bottom-24 max-h-[65vh] bg-white rounded-2xl shadow-2xl z-60 flex flex-col lg:hidden animate-fade-up animate-duration-300"
                        onKeyDown={(e) => e.key === 'Escape' && setMobileModalOpen(null)}
                    >
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h2 id="modal-settings-title" className="text-gray-800 font-semibold">{mode === "static" ? "Ajustes del gradiente" : "Ajustes del video"}</h2>
                            <button
                                onClick={() => setMobileModalOpen(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Cerrar modal"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="overflow-y-auto p-4 flex-1">
                            {mode === "static" ? (
                                <div className="flex flex-col gap-4">
                                    {/* Tipo de gradiente */}
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-2">Tipo de gradiente</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                onClick={() => handleGradientTypeChange("linear")}
                                                className={`py-2 rounded-xl border-2 transition-all text-sm ${gradientType === "linear" ? "text-gray-800 border-gray-400 bg-gray-200" : "text-gray-500 border-gray-300 hover:bg-gray-100"}`}
                                            >
                                                <p className="">Lineal</p>
                                            </button>
                                            <button
                                                onClick={() => handleGradientTypeChange("radial")}
                                                className={`py-2 rounded-xl border-2 transition-all text-sm ${gradientType === "radial" ? "text-gray-800 border-gray-400 bg-gray-200" : "text-gray-500 border-gray-300 hover:bg-gray-100"}`}
                                            >
                                                <p className="">Radial</p>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Ángulo */}
                                    {gradientType === "linear" && (
                                        <div>
                                            <label className="text-sm text-gray-500 mb-2 block">
                                                Ángulo: <span className="font-semibold text-gray-800">{angle}°</span>
                                            </label>
                                            <input
                                                type="range"
                                                min="0"
                                                max="360"
                                                value={angle}
                                                onChange={handleAngleChange}
                                                className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                                            />
                                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                                <span>0°</span>
                                                <span>360°</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Desenfoque */}
                                    <div>
                                        <label className="text-sm text-gray-500 mb-2 block">
                                            Desenfoque: <span className="font-semibold text-gray-800">{gradientBlur}px</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="20"
                                            step="1"
                                            value={gradientBlur}
                                            onChange={handleBlurChange}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                                        />
                                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                                            <span>0px</span>
                                            <span>20px</span>
                                        </div>
                                    </div>

                                    {/* Opacidad */}
                                    <div>
                                        <label className="text-sm text-gray-500 mb-2 block">
                                            Opacidad: <span className="font-semibold text-gray-800">{gradientOpacity}%</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="5"
                                            value={gradientOpacity}
                                            onChange={handleOpacityChange}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                                        />
                                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                                            <span>0%</span>
                                            <span>100%</span>
                                        </div>
                                    </div>

                                    {/* Granulado */}
                                    <div>
                                        <label className="text-sm text-gray-500 mb-2 block">
                                            Granulado: <span className="font-semibold text-gray-800">{grainIntensity}%</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="50"
                                            step="5"
                                            value={grainIntensity}
                                            onChange={handleGrainChange}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                                        />
                                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                                            <span>0%</span>
                                            <span>50%</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {/* Duración */}
                                    <div>
                                        <label className="text-sm text-gray-500 mb-2 block">
                                            Duración: <span className="font-semibold text-gray-800">{videoDuration}s</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="3"
                                            max="30"
                                            step="1"
                                            value={videoDuration}
                                            onChange={handleDurationChange}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                                        />
                                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                                            <span>3s</span>
                                            <span>30s</span>
                                        </div>
                                    </div>

                                    {/* FPS */}
                                    <div>
                                        <label className="text-sm text-gray-500 mb-2 block">
                                            FPS: <span className="font-semibold text-gray-800">{videoFps}</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="24"
                                            max="60"
                                            step="6"
                                            value={videoFps}
                                            onChange={handleFpsChange}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                                        />
                                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                                            <span>24</span>
                                            <span>60</span>
                                        </div>
                                    </div>

                                    {/* Calidad */}
                                    <div>
                                        <label className="text-sm text-gray-500 mb-2 block">
                                            Calidad: <span className="font-semibold text-gray-800">{videoBitrate} Mbps</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="2"
                                            max="20"
                                            step="2"
                                            value={videoBitrate}
                                            onChange={handleBitrateChange}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                                        />
                                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                                            <span>2 Mbps</span>
                                            <span>20 Mbps</span>
                                        </div>
                                    </div>

                                    {/* Granulado */}
                                    <div>
                                        <label className="text-sm text-gray-500 mb-2 block">
                                            Granulado: <span className="font-semibold text-gray-800">{grainIntensity}%</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="50"
                                            step="5"
                                            value={grainIntensity}
                                            onChange={handleGrainChange}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-range"
                                        />
                                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                                            <span>0%</span>
                                            <span>50%</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default memo(AsideLeft);


