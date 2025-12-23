import { useState } from 'react';
import { exportImage, exportVideo } from '../utils/exportUtils';

export const useExport = (gradientRef, format, mode, videoOptions) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingProgress, setRecordingProgress] = useState(0);

    //para videos
    const handleExportVideo = async () => {

        //si no esta en modo animado detenmos al user
        if (mode !== "animated") {
            alert("El modo animado debe estar activado para exportar video");
            return;
        }

        try {

            setIsRecording(true);//esto es para la animacion
            
            await exportVideo(gradientRef, format, (progress) => {
                setRecordingProgress(progress);
            }, videoOptions);

        } catch (error) {

            console.error('Error al exportar video:', error);
            alert('Error al exportar el video. Intenta de nuevo.');

        } finally {
            setIsRecording(false);
            setRecordingProgress(0);
        }
    };



    //para imagenes:
    const handleExportImage = async () => {
        try {
            await exportImage(gradientRef, format);
        } catch (error) {
            console.error('Error al exportar imagen:', error);
            alert('Error al exportar la imagen. Intenta de nuevo.');
        }
    };

    return {
        handleExportImage,
        handleExportVideo,
        isRecording,
        recordingProgress
    };
};
