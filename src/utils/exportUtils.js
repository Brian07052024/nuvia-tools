import { toPng } from 'html-to-image';
import { getFormatDimensions } from './formatDimensions';

//area de exportar imagenes
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
            borderRadius: `${format === "circle" ? '50%' : '0'}`,
            boxShadow: 'none',
            transform: 'none',
        }
    });

    const link = document.createElement('a');
    link.download = `gradient-${format.replace('/', 'x')}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
};


//funcionalidades para exportar los videos (mas complejo: )
export const exportVideo = async (gradientRef, format, onProgress, options = {}) => {
    if (!gradientRef.current) {
        throw new Error("No hay gradiente para exportar");
    }

    //Opciones configurables con valores por defecto
    const {
        duration = 6,
        fps = 30,
        bitrate = 8
    } = options;

    const { width, height } = getFormatDimensions(format);
    const element = gradientRef.current;
    const meshOverlay = element.querySelector('.mesh-pattern-overlay');
    const meshOriginalAnimation = meshOverlay ? meshOverlay.style.animation : '';
    const meshOriginalBackgroundPosition = meshOverlay ? meshOverlay.style.backgroundPosition : '';
    const meshSpeedValue = meshOverlay
        ? window.getComputedStyle(meshOverlay).getPropertyValue('--mesh-speed')
        : '';
    const meshSpeedSeconds = Number.parseFloat(meshSpeedValue) || 3;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });

    const stream = canvas.captureStream(fps);
    const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: bitrate * 1000000 //convertir de Mbps a bps
    });

    const chunks = [];

    return new Promise((resolve, reject) => {
        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                chunks.push(e.data);
            }
        };

        mediaRecorder.onerror = (error) => {
            reject(error);
        };

        const renderFrame = async (frameIndex) => {
            try {
                if (meshOverlay) {
                    const cycle = 80;
                    const t = frameIndex / fps;
                    const offset = ((t % meshSpeedSeconds) / meshSpeedSeconds) * cycle;
                    meshOverlay.style.animation = 'none';
                    meshOverlay.style.backgroundPosition = `${offset}px ${offset}px, ${offset}px ${offset}px`;
                }

                const dataUrl = await toPng(element, {
                    quality: 1,
                    pixelRatio: 1,
                    width: element.offsetWidth,
                    height: element.offsetHeight,
                    cacheBust: false,
                    style: {
                        borderRadius: '0',
                        boxShadow: 'none',
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

        const frameInterval = 1000 / fps;
        const totalFrames = duration * fps;

        const captureFrames = async () => {
            for (let warm = 0; warm < 2; warm++) {
                await renderFrame(0);
            }

            mediaRecorder.start();
            const startTime = performance.now();

            for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
                await renderFrame(frameIndex);

                const progress = Math.round(((frameIndex + 1) / totalFrames) * 100);
                if (onProgress) {
                    onProgress(progress);
                }

                const targetTime = startTime + (frameIndex + 1) * frameInterval;
                const delay = targetTime - performance.now();
                if (delay > 0) {
                    await new Promise((resolve) => setTimeout(resolve, delay));
                }
            }

            mediaRecorder.stop();
        };

        captureFrames();

        mediaRecorder.onstop = () => {
            if (meshOverlay) {
                meshOverlay.style.animation = meshOriginalAnimation;
                meshOverlay.style.backgroundPosition = meshOriginalBackgroundPosition;
            }
            const blob = new Blob(chunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `gradient-animated-${format.replace('/', 'x')}-${Date.now()}.webm`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
            resolve();
        };
    });
};
