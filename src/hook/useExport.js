import { useState } from 'react';
import { exportImage, exportVideo } from '../utils/exportUtils';
import { useToast } from '../contexts/ToastContext';

export const useExport = (gradientRef, format, mode, videoOptions) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingProgress, setRecordingProgress] = useState(0);
    const { showSuccess, showError, showInfo } = useToast();

    //para videos
    const handleExportVideo = async () => {

        //si no esta en modo animado detenmos al user
        if (mode !== "animated") {
            showError("El modo animado debe estar activado para exportar video");
            return;
        }

        try {

            setIsRecording(true);//esto es para la animacion
            showInfo("Generando video... Por favor espera", 5000);
            
            await exportVideo(gradientRef, format, (progress) => {
                setRecordingProgress(progress);
            }, videoOptions);

            showSuccess("Video exportado exitosamente");

        } catch (error) {

            console.error('Error al exportar video:', error);
            showError('Error al exportar el video. Intenta de nuevo.');

        } finally {
            setIsRecording(false);
            setRecordingProgress(0);
        }
    };



    //para imagenes:
    const handleExportImage = async () => {
        try {
            showInfo("Generando imagen...", 2000);
            await exportImage(gradientRef, format);
            showSuccess("Imagen exportada exitosamente");
        } catch (error) {
            console.error('Error al exportar imagen:', error);
            showError('Error al exportar la imagen. Intenta de nuevo.');
        }
    };

    return {
        handleExportImage,
        handleExportVideo,
        isRecording,
        recordingProgress
    };
};
