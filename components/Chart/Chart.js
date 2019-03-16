import { getScaleValue } from "./helpers";
import { createElement } from "../../helpers/dom";

export const Chart = ({ chartViewData, width, height, viewport: vp }) => {
  return createElement(
    "svg",
    {
      height: vp.width.toString(),
      width: vp.height.toString(),
      viewBox: [vp.x, vp.y, vp.width, vp.height].join(" ")
    },
    Polylines({ chartViewData, width, height })
  );
};

export const Polylines = ({ chartViewData, width, height }) => {
  const { minX, maxX, minY, maxY, lines } = chartViewData;

  const scaleX = getScaleValue(minX, maxX, 0, width);
  const scaleY = getScaleValue(minY, maxY, 0, height);

  return Object.values(lines).map(({ points, color }) => {
    const pointsStr = points
      .map(({ x, y }) => `${scaleX(x)},${scaleY(y)}`)
      .join(" ");

    return createElement("polyline", {
      points: pointsStr,
      fill: "transparent",
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    });
  });
};
