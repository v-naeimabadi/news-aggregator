import { BezierEasing } from "../utils/bezier-easing";

let requestAnimationFrame: typeof window.requestAnimationFrame;
if (typeof window !== "undefined") {
  requestAnimationFrame =
    window.requestAnimationFrame ||
    (window as unknown as Record<string, unknown>).mozRequestAnimationFrame ||
    (window as unknown as Record<string, unknown>)
      .webkitRequestAnimationFrame ||
    (window as unknown as Record<string, unknown>).msRequestAnimationFrame;
}

const TOTAL_ITERATIONS = 90;
const CIRCLES_INTERVAL = 8.8;
const EASING = BezierEasing(0.15, 0.5, 0.75, 0.5);
const BOUNDING = 16;
const GROWTH = 2.5;
const SHRINK = 3;

interface IAnimation {
  iteration: number;
  id: number;
}

const ids: number[] = [];
const animations: {
  [key: string]: number;
} = {};

function rotateCircle(this: IAnimation, circles: SVGCircleElement[]) {
  const len = circles.length;
  for (let i = 0; i < len; ++i) {
    if (this.iteration >= CIRCLES_INTERVAL * i) {
      let iteration = this.iteration - CIRCLES_INTERVAL * i;
      const revolution = Math.floor(iteration / TOTAL_ITERATIONS);
      iteration = iteration - revolution * TOTAL_ITERATIONS;
      if (iteration < 0) {
        iteration = TOTAL_ITERATIONS - iteration;
      } else if (iteration > TOTAL_ITERATIONS) {
        iteration = iteration - TOTAL_ITERATIONS;
      }
      const eased = EASING.get((1 / TOTAL_ITERATIONS) * iteration);
      const position = eased * 2 * Math.PI * -1;
      circles[i].setAttributeNS("", "fill-opacity", "1");
      circles[i].setAttributeNS(
        "",
        "cx",
        20 + BOUNDING * Math.sin(position) + "",
      );
      circles[i].setAttributeNS(
        "",
        "cy",
        20 + BOUNDING * Math.cos(position) + "",
      );
      let size: number;
      if (eased === 0.5) size = GROWTH;
      else if (eased > 0.5) size = GROWTH - (eased - 0.5) * SHRINK;
      else size = GROWTH - (0.5 - eased) * SHRINK;
      circles[i].setAttributeNS("", "r", size.toString());
    }
  }

  this.iteration++;
  animations[this.id] = requestAnimationFrame(rotateCircle.bind(this, circles));
}

export function startAnimation(...elements: SVGCircleElement[]): number {
  let id = 0;
  if (ids.length) id = ids[ids.length - 1] + 1;
  ids.push(id);
  rotateCircle.apply({ iteration: 0, id }, [elements]);
  return id;
}

export function stopAnimation(animation: number) {
  window.cancelAnimationFrame(animations[animation]);
}
