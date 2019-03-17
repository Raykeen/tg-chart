import { h } from "preact";
import mapValues from 'lodash/mapValues';
import { getOptimizeScale } from './helpers';

export const Chart = ({ chartViewData, width, height, viewport: vp }) => {
  const optimizeScaleX = getOptimizeScale(chartViewData.maxX);
  const optimizeScaleY = getOptimizeScale(chartViewData.maxY);

  const lines = mapValues(chartViewData.lines, ({color, points}) => ({
    color,
    points: points.map(({ x, y }) => ({ x: optimizeScaleX(x), y: -optimizeScaleY(y) }))
  }));

  return (
    <svg
      height={width.toString()} width={height.toString()}
      viewBox={[
        optimizeScaleX(vp.x),
        optimizeScaleY(2 * chartViewData.minY - chartViewData.maxY),
        optimizeScaleX(vp.width),
        optimizeScaleY(chartViewData.maxY - chartViewData.minY)
      ].join(" ")}
      preserveAspectRatio="none"
    >
      <Polylines lines={lines} />
    </svg>
  )
}

export const Polylines = ({ lines }) => {
  const polylines = Object.values(lines).map(({ points, color }) => {
    const pointsStr = points
      .map(({ x, y }) => `${x},${y}`)
      .join(" ");

    return <polyline
      points={pointsStr}
      fill="none"
      stroke={color}
      stroke-width={2}
      stroke-linecap="round"
      stroke-linejoin="round"
      vector-effect="non-scaling-stroke"
    />
  });

  return <g>{polylines}</g>;
};
