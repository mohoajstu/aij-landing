/* eslint-disable no-plusplus */
class Wave {
  private waveLength: number[];
  private color: string;

  constructor(waveLength: number[], color?: string) {
    this.waveLength = waveLength;
    this.color = color || getComputedStyle(document.documentElement).getPropertyValue("--wave-color").trim();
  }

  public draw = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    frequency: number,
    amplitude: number = 200
  ): void => {
    context.beginPath();
    context.moveTo(0, height);

    if (this.waveLength.length < 3) return;

    for (let i = 0; i < width; i++) {
      const wave1 = Math.sin(i * (this.waveLength[0] ?? 0) - frequency);
      const wave2 = Math.sin(i * (this.waveLength[1] ?? 0) - frequency);
      const wave3 = Math.sin(i * (this.waveLength[2] ?? 0) - frequency);

      context.lineTo(i * 2.5, height - 100 + wave1 * wave2 * wave3 * amplitude);
    }

    context.lineTo(width, height);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  };
}

export default Wave; 