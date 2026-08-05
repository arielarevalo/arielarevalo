const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'assets', 'dazzle.png');

// Keep the full width; trim a quarter of the height off the top and off the
// bottom, leaving the middle band.
const KEEP_HEIGHT = 0.5;

// Frame thickness, in pixels of the cropped image.
const BORDER = 32;
const BORDER_COLOR = '#000';

async function render() {
  const src = await loadImage(SRC);

  const cw = src.width;
  const ch = Math.round(src.height * KEEP_HEIGHT);
  const cx = 0;
  const cy = Math.round((src.height - ch) / 2);

  const canvas = createCanvas(cw + BORDER * 2, ch + BORDER * 2);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = BORDER_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(src, cx, cy, cw, ch, BORDER, BORDER, cw, ch);

  return canvas;
}

(async () => {
  console.log('Generating cover...');
  const canvas = await render();
  const outPath = path.join(__dirname, '..', 'assets', 'cover.png');
  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(outPath, buf);
  console.log(`Saved ${outPath} (${canvas.width}x${canvas.height}, ${(buf.length / 1024).toFixed(0)} KB)`);
})();
