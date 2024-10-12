import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DdsToPngService {
  constructor() {}

  parseHeaders(arrayBuffer: ArrayBuffer) {
    const header = new DataView(arrayBuffer, 0, 128);
    const height = header.getUint32(12, true);
    const width = header.getUint32(16, true);
    const fourCC = header.getUint32(84, true);
    return { width, height, fourCC };
  }

  decodeDXT1(src: Uint8Array, width: number, height: number): Uint8Array {
    const rgba = new Uint8Array(width * height * 4);
    let srcIndex = 0;

    for (let y = 0; y < height; y += 4) {
      for (let x = 0; x < width; x += 4) {
        const c0 = src[srcIndex] | (src[srcIndex + 1] << 8);
        const c1 = src[srcIndex + 2] | (src[srcIndex + 3] << 8);
        const code = src[srcIndex + 4] | (src[srcIndex + 5] << 8) | (src[srcIndex + 6] << 16) | (src[srcIndex + 7] << 24);
        srcIndex += 8;

        const colors = new Uint8Array(16);
        this.decodeColors(c0, c1, colors);

        for (let blockY = 0; blockY < 4; blockY++) {
          for (let blockX = 0; blockX < 4; blockX++) {
            const pixelIndex = ((code >> (2 * (blockY * 4 + blockX))) & 0x03) * 4;
            const dstPixelIndex = ((y + blockY) * width + (x + blockX)) * 4;
            rgba[dstPixelIndex] = colors[pixelIndex];
            rgba[dstPixelIndex + 1] = colors[pixelIndex + 1];
            rgba[dstPixelIndex + 2] = colors[pixelIndex + 2];
            rgba[dstPixelIndex + 3] = colors[pixelIndex + 3];
          }
        }
      }
    }

    return rgba;
  }

  decodeDXT3(src: Uint8Array, width: number, height: number): Uint8Array {
    const rgba = new Uint8Array(width * height * 4);
    let srcIndex = 0;

    for (let y = 0; y < height; y += 4) {
      for (let x = 0; x < width; x += 4) {
        const alpha = new Uint8Array(16);
        for (let i = 0; i < 8; i++) {
          const byte = src[srcIndex++];
          alpha[i * 2] = (byte & 0x0F) * 17;
          alpha[i * 2 + 1] = (byte >> 4) * 17;
        }

        const c0 = src[srcIndex] | (src[srcIndex + 1] << 8);
        const c1 = src[srcIndex + 2] | (src[srcIndex + 3] << 8);
        const code = src[srcIndex + 4] | (src[srcIndex + 5] << 8) | (src[srcIndex + 6] << 16) | (src[srcIndex + 7] << 24);
        srcIndex += 8;

        const colors = new Uint8Array(16);
        this.decodeColors(c0, c1, colors);

        for (let blockY = 0; blockY < 4; blockY++) {
          for (let blockX = 0; blockX < 4; blockX++) {
            const pixelIndex = ((code >> (2 * (blockY * 4 + blockX))) & 0x03) * 4;
            const dstPixelIndex = ((y + blockY) * width + (x + blockX)) * 4;
            rgba[dstPixelIndex] = colors[pixelIndex];
            rgba[dstPixelIndex + 1] = colors[pixelIndex + 1];
            rgba[dstPixelIndex + 2] = colors[pixelIndex + 2];
            rgba[dstPixelIndex + 3] = alpha[blockY * 4 + blockX];
          }
        }
      }
    }

    return rgba;
  }

  decodeDXT5(src: Uint8Array, width: number, height: number): Uint8Array {
    const rgba = new Uint8Array(width * height * 4);
    let srcIndex = 0;

    for (let y = 0; y < height; y += 4) {
      for (let x = 0; x < width; x += 4) {
        const alpha0 = src[srcIndex++];
        const alpha1 = src[srcIndex++];
        const alphaCode = src[srcIndex] | (src[srcIndex + 1] << 8) | (src[srcIndex + 2] << 16) | (src[srcIndex + 3] << 24) | (src[srcIndex + 4] << 32) | (src[srcIndex + 5] << 40);
        srcIndex += 6;

        const alphas = new Uint8Array(8);
        alphas[0] = alpha0;
        alphas[1] = alpha1;
        if (alpha0 > alpha1) {
          for (let i = 1; i < 7; i++) {
            alphas[i + 1] = ((7 - i) * alpha0 + i * alpha1) / 7;
          }
        } else {
          for (let i = 1; i < 5; i++) {
            alphas[i + 1] = ((5 - i) * alpha0 + i * alpha1) / 5;
          }
          alphas[6] = 0;
          alphas[7] = 255;
        }

        const c0 = src[srcIndex] | (src[srcIndex + 1] << 8);
        const c1 = src[srcIndex + 2] | (src[srcIndex + 3] << 8);
        const code = src[srcIndex + 4] | (src[srcIndex + 5] << 8) | (src[srcIndex + 6] << 16) | (src[srcIndex + 7] << 24);
        srcIndex += 8;

        const colors = new Uint8Array(16);
        this.decodeColors(c0, c1, colors);

        for (let blockY = 0; blockY < 4; blockY++) {
          for (let blockX = 0; blockX < 4; blockX++) {
            const pixelIndex = ((code >> (2 * (blockY * 4 + blockX))) & 0x03) * 4;
            const alphaIndex = (alphaCode >> (3 * (blockY * 4 + blockX))) & 0x07;
            const dstPixelIndex = ((y + blockY) * width + (x + blockX)) * 4;
            rgba[dstPixelIndex] = colors[pixelIndex];
            rgba[dstPixelIndex + 1] = colors[pixelIndex + 1];
            rgba[dstPixelIndex + 2] = colors[pixelIndex + 2];
            rgba[dstPixelIndex + 3] = alphas[alphaIndex];
          }
        }
      }
    }

    return rgba;
  }

  decodeColors(c0: number, c1: number, colors: Uint8Array) {
    const r0 = (c0 >> 11) & 0x1F;
    const g0 = (c0 >> 5) & 0x3F;
    const b0 = c0 & 0x1F;
    const r1 = (c1 >> 11) & 0x1F;
    const g1 = (c1 >> 5) & 0x3F;
    const b1 = c1 & 0x1F;

    colors[0] = (r0 << 3) | (r0 >> 2);
    colors[1] = (g0 << 2) | (g0 >> 4);
    colors[2] = (b0 << 3) | (b0 >> 2);
    colors[3] = 255;

    colors[4] = (r1 << 3) | (r1 >> 2);
    colors[5] = (g1 << 2) | (g1 >> 4);
    colors[6] = (b1 << 3) | (b1 >> 2);
    colors[7] = 255;

    if (c0 > c1) {
      for (let i = 0; i < 3; i++) {
        colors[8 + i] = (2 * colors[i] + colors[4 + i]) / 3;
        colors[12 + i] = (colors[i] + 2 * colors[4 + i]) / 3;
      }
      colors[11] = colors[15] = 255;
    } else {
      for (let i = 0; i < 3; i++) {
        colors[8 + i] = (colors[i] + colors[4 + i]) / 2;
        colors[12 + i] = 0;
      }
      colors[11] = 255;
      colors[15] = 0;
    }
  }

  ddsToPng(arrayBuffer: ArrayBuffer): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const { width, height, fourCC } = this.parseHeaders(arrayBuffer);

        let rgbaData: Uint8Array;
        const src = new Uint8Array(arrayBuffer, 128);

        switch (fourCC) {
          case 0x31545844: // 'DXT1' in ASCII
            rgbaData = this.decodeDXT1(src, width, height);
            break;
          case 0x33545844: // 'DXT3' in ASCII
            rgbaData = this.decodeDXT3(src, width, height);
            break;
          case 0x35545844: // 'DXT5' in ASCII
            rgbaData = this.decodeDXT5(src, width, height);
            break;
          default:
            throw new Error('Unsupported DDS format');
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');

        if (!context) {
          reject('Failed to get canvas context');
          return;
        }

        const imageData = context.createImageData(width, height);
        imageData.data.set(rgbaData);
        context.putImageData(imageData, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            const reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          } else {
            reject('Failed to create blob');
          }
        }, 'image/png');
      } catch (error) {
        reject(`Error converting DDS to PNG: ${error}`);
      }
    });
  }
}