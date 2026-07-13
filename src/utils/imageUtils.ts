/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const transparentImageCache: Record<string, string> = {};

/**
 * Loads a black-background image, removes the black background, and returns a transparent PNG Data URL.
 * Includes in-memory caching to prevent redundant processing.
 */
export function removeBlackBackground(imgUrl: string, threshold: number = 30): Promise<string> {
  if (transparentImageCache[imgUrl]) {
    return Promise.resolve(transparentImageCache[imgUrl]);
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(imgUrl);
        return;
      }
      ctx.drawImage(img, 0, 0);
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Calculate perceived brightness
          const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

          if (brightness < threshold) {
            data[i + 3] = 0; // Completely transparent
          } else if (brightness < threshold * 2.2) {
            // Smooth edge feathering
            const ratio = (brightness - threshold) / (threshold * 1.2);
            data[i + 3] = Math.round(Math.min(1, Math.max(0, ratio)) * 255);
          }
        }
        ctx.putImageData(imgData, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");
        transparentImageCache[imgUrl] = dataUrl;
        resolve(dataUrl);
      } catch (e) {
        // Fallback for CORS or canvas taint issues
        console.warn("Canvas background removal failed:", e);
        resolve(imgUrl);
      }
    };
    img.onerror = () => {
      resolve(imgUrl);
    };
  });
}
