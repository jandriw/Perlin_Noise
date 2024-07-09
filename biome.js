function drawBiomeMap(seed) {
  const canvas = document.getElementById('perlinCanvas');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  const perlin1 = new Perlin(seed);
  const perlin2 = new Perlin(seed + 1);
  const perlin3 = new Perlin(seed + 2);

  const imageData = ctx.createImageData(width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const ny = y / height;

      const elevation = perlin1.get(nx * 10, ny * 10);
      const moisture = perlin2.get(nx * 20, ny * 20);
      const temperature = perlin3.get(nx * 30, ny * 30);

      let color;
      
      if (elevation < -0.05) {
        // Mar
        color = { r: 0, g: 0, b: 128 };
      } else if (elevation < 0.2) {
        // Valle
        color = { r: 34, g: 139, b: 34 };
      } else if (moisture < 0) {
        // Desierto
        color = { r: 210, g: 180, b: 140 };
      } else {
        // Bosque
        color = { r: 0, g: 100, b: 0 };
      }

      const index = (y * width + x) * 4;
      imageData.data[index] = color.r;
      imageData.data[index + 1] = color.g;
      imageData.data[index + 2] = color.b;
      imageData.data[index + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

document.addEventListener('DOMContentLoaded', () => drawBiomeMap(1234));
