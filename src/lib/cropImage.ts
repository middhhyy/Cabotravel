export interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Creates an HTMLImageElement from an image URL.
 */
export function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // avoid CORS issues if needed
    image.src = url;
  });
}

/**
 * Given an image URL and cropped area pixel coordinates, crops and compresses the image to a WebP/JPEG Blob matching the 4:3 target ratio.
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: PixelCrop,
  maxWidth = 1200,
  maxHeight = 900,
  quality = 0.85
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context found on canvas");
  }

  // Calculate target output width & height adhering to pixelCrop aspect ratio, capped at max limits
  let outputWidth = pixelCrop.width;
  let outputHeight = pixelCrop.height;

  if (outputWidth > maxWidth || outputHeight > maxHeight) {
    if (outputWidth / outputHeight > maxWidth / maxHeight) {
      outputHeight = Math.round((outputHeight * maxWidth) / outputWidth);
      outputWidth = maxWidth;
    } else {
      outputWidth = Math.round((outputWidth * maxHeight) / outputHeight);
      outputHeight = maxHeight;
    }
  }

  canvas.width = outputWidth;
  canvas.height = outputHeight;

  // Draw the cropped portion onto canvas
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputWidth,
    outputHeight
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Canvas crop export failed"));
        }
      },
      "image/jpeg",
      quality
    );
  });
}
