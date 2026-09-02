import sharp from 'sharp';

async function processImage() {
  const inputPath = 'src/assets/images/user_floral_garland_1788267271423.jpg';
  const outputPath = 'public/floral_bouquet.png';

  const image = sharp(inputPath);
  const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Flood fill from all border pixels to make outer background transparent without eroding white rose petals
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isBackground(x, y) {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const minVal = Math.min(r, g, b);
    const maxVal = Math.max(r, g, b);
    // Background is near pure white
    return minVal > 228 && (maxVal - minVal) < 26;
  }

  // Push all perimeter border pixels that are background
  for (let x = 0; x < width; x++) {
    if (isBackground(x, 0)) { queue.push(x, 0); visited[0 * width + x] = 1; }
    if (isBackground(x, height - 1)) { queue.push(x, height - 1); visited[(height - 1) * width + x] = 1; }
  }
  for (let y = 0; y < height; y++) {
    if (isBackground(0, y)) { queue.push(0, y); visited[y * width + 0] = 1; }
    if (isBackground(width - 1, y)) { queue.push(width - 1, y); visited[y * width + (width - 1)] = 1; }
  }

  // BFS flood-fill from edges
  let head = 0;
  while (head < queue.length) {
    const x = queue[head++];
    const y = queue[head++];
    const idx = (y * width + x) * channels;
    
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const minVal = Math.min(r, g, b);
    
    if (minVal > 240) {
      data[idx + 3] = 0; // transparent
    } else {
      // Soft edge anti-aliasing
      const alpha = Math.max(0, Math.min(255, (240 - minVal) * 15));
      data[idx + 3] = alpha;
    }

    const neighbors = [
      [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nPos = ny * width + nx;
        if (!visited[nPos] && isBackground(nx, ny)) {
          visited[nPos] = 1;
          queue.push(nx, ny);
        }
      }
    }
  }

  await sharp(data, {
    raw: { width, height, channels }
  })
    .png()
    .toFile(outputPath);

  console.log(`Successfully updated transparent PNG at ${outputPath}`);
}

processImage().catch(console.error);
