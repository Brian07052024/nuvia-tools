import { useState } from 'react';
import { exportImage, exportVideo } from '../utils/exportUtils';

export const useExport = (gradientRef, format, mode, videoOptions) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingProgress, setRecordingProgress] = useState(0);

    const handleExportImage = async () => {
        try {
            await exportImage(gradientRef, format);
        } catch (error) {
            console.error('Error al exportar imagen:', error);
            alert('Error al exportar la imagen. Intenta de nuevo.');
        }
    };

    const handleExportVideo = async () => {
        if (mode !== "animated") {
            alert("El modo animado debe estar activado para exportar video");
            return;
        }

        try {
            setIsRecording(true);
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

    return {
        handleExportImage,
        handleExportVideo,
        isRecording,
        recordingProgress
    };
};
