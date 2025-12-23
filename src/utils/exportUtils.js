import { toPng } from 'html-to-image';
import { getFormatDimensions } from './formatDimensions';

export const exportImage = async (gradientRef, format) => {
    if (!gradientRef.current) {
        throw new Error("No hay gradiente para exportar");
    }

    const { width, height } = getFormatDimensions(format);

    const dataUrl = await toPng(gradientRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        width: width,
        height: height,
        style: {
            borderRadius: '0',
            boxShadow: 'none',
            transform: 'none',
        }
    });

    const link = document.createElement('a');
    link.download = `gradient-${format.replace('/', 'x')}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
};

export const exportVideo = async (gradientRef, format, onProgress, options = {}) => {
    if (!gradientRef.current) {
        throw new Error("No hay gradiente para exportar");
    }

    // Opciones configurables con valores por defecto
    const {
        duration = 6,
        fps = 30,
        bitrate = 8
    } = options;

    const { width, height } = getFormatDimensions(format);
    const element = gradientRef.current;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });

    const stream = canvas.captureStream(fps);
    const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: bitrate * 1000000 // convertir de Mbps a bps
    });

    const chunks = [];

    return new Promise((resolve, reject) => {
        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                chunks.push(e.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `gradient-animated-${format.replace('/', 'x')}-${Date.now()}.webm`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
            resolve();
        };

        mediaRecorder.onerror = (error) => {
            reject(error);
        };

        const renderFrame = async () => {
            try {
                const dataUrl = await toPng(element, {
                    quality: 1,
                    pixelRatio: 1,
                    width: element.offsetWidth,
                    height: element.offsetHeight,
                    cacheBust: false,
                    style: {
                        transform: 'none',
                    }
                });

                const img = new Image();
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = dataUrl;
                });

                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(img, 0, 0, width, height);
            } catch (err) {
                console.error('Error capturing frame:', err);
            }
        };

        mediaRecorder.start();

        const durationMs = duration * 1000;
        const frameInterval = 1000 / fps;
        let frameCount = 0;
        const totalFrames = duration * fps;

        const captureInterval = setInterval(async () => {
            await renderFrame();
            frameCount++;

            const progress = Math.round((frameCount / totalFrames) * 100);
            if (onProgress) {
                onProgress(progress);
            }

            if (frameCount >= totalFrames) {
                clearInterval(captureInterval);
                mediaRecorder.stop();
            }
        }, frameInterval);
    });
};
