class Perlin {
  constructor(seed) {
    this.seed = seed;
    this.gradients = {};
    this.memory = {};
  }

  randomGradient(ix, iy) {
    const random = 2920 * Math.sin(ix * 21942 + iy * 171324 + 8912 + this.seed) * Math.cos(ix * 23157 * iy * 217832 + 9758 + this.seed);
    return { x: Math.cos(random), y: Math.sin(random) };
  }

  dotGridGradient(ix, iy, x, y) {
    let gradient;
    const dx = x - ix;
    const dy = y - iy;

    if (this.gradients[[ix, iy]]) {
      gradient = this.gradients[[ix, iy]];
    } else {
      gradient = this.randomGradient(ix, iy);
      this.gradients[[ix, iy]] = gradient;
    }

    return (dx * gradient.x + dy * gradient.y);
  }

  lerp(a0, a1, w) {
    return (1.0 - w) * a0 + w * a1;
  }

  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  get(x, y) {
    const x0 = Math.floor(x);
    const x1 = x0 + 1;
    const y0 = Math.floor(y);
    const y1 = y0 + 1;

    const sx = this.fade(x - x0);
    const sy = this.fade(y - y0);

    const n0_y0 = this.dotGridGradient(x0, y0, x, y);
    const n1_y0 = this.dotGridGradient(x1, y0, x, y);
    const ix0 = this.lerp(n0_y0, n1_y0, sx);

    const n0_y1 = this.dotGridGradient(x0, y1, x, y);
    const n1_y1 = this.dotGridGradient(x1, y1, x, y);
    const ix1 = this.lerp(n0_y1, n1_y1, sx);

    return this.lerp(ix0, ix1, sy);
  }
}
