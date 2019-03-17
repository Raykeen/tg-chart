import { getScaleValue } from "./helpers";
import { h, Fragment } from "preact";

export const Chart = ({ chartViewData, width, height, viewport: vp }) => (
  <svg
    height={vp.width.toString()} width={vp.height.toString()}
    viewBox={[vp.x, vp.y, vp.width, vp.height].join(" ")}
  >
    <Polylines chartViewData={chartViewData} width={width} height={height}/>
  </svg>
)

export const Polylines = ({ chartViewData, width, height }) => {
  const { minX, maxX, minY, maxY, lines } = chartViewData;

  const scaleX = getScaleValue(minX, maxX, 0, width);
  const scaleY = getScaleValue(minY, maxY, 0, height);

  const polylines = Object.values(lines).map(({ points, color }) => {
    const pointsStr = points
      .map(({ x, y }) => `${scaleX(x)},${scaleY(y)}`)
      .join(" ");

    return <polyline
      points={pointsStr}
      fill="transparent"
      stroke={color}
      stroke-width={2}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  });

  return <g>{polylines}</g>;
};
