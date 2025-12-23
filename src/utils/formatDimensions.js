export const getFormatDimensions = (format) => {
    switch (format) {
        case "16/9":
            return { width: 1920, height: 1080 };
        case "9/16":
            return { width: 1080, height: 1920 };
        case "1/1":
            return { width: 1080, height: 1080 };
        case "4/3":
            return { width: 1600, height: 1200 };
        default:
            return { width: 1920, height: 1080 };
    }
};
