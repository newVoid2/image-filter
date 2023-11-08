import { ref } from "vue";

export default function useCanvas() {
    const canvasE1 = ref<HTMLCanvasElement | null>(null);
    let canvasCtx: CanvasRenderingContext2D | null = null;
    const imgE1 = new Image();

    function calculateAspectRatio(srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) {
        const ratio = Math.min(maxWidth / srcWidth, maxHeight, srcHeight);
        return {
            width: srcWidth * ratio, height: srcHeight * ratio
        };
    }

    function loadImage(url: string) {
        if(!canvasE1.value) return;

        canvasCtx = canvasE1.value.getContext("2d");

        imgE1.addEventListener("load", drawOriginalImage);

        imgE1.src = url;
    }

    function drawOriginalImage() {
        if(!canvasCtx || !canvasE1.value) return;

        const newImgDimension = calculateAspectRatio(imgE1.naturalWidth, imgE1.naturalHeight, 448, 448);
        canvasE1.value.width = newImgDimension.width;
        canvasE1.value.height = newImgDimension.height;
        canvasCtx.drawImage(imgE1, 0, 0, newImgDimension.width, newImgDimension.height);
    }

    return {
        canvasE1,
        loadImage,
    }
}