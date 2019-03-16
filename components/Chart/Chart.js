import { getScaleValue } from "./helpers";
import { createElement } from "../../helpers/dom";

export const Chart = ({ chartViewData, width, height }) => {
  const { minX, maxX, minY, maxY, lines } = chartViewData;

  const scaleX = getScaleValue(minX, maxX, 0, width);
  const scaleY = getScaleValue(minY, maxY, 0, height);

  const polylines = Object.values(lines).map(({ points, color }) => {
    const pointsStr = points
      .map(({ x, y }) => `${scaleX(x)},${scaleY(y)}`)
      .join(" ");

    return createElement("polyline", {
      points: pointsStr,
      fill: "transparent",
      stroke: color,
      ["stroke-width"]: 2,
      ["stroke-linecap"]: "round",
      ["stroke-linejoin"]: "round"
    });
  });

  return createElement(
    "svg",
    {
      height: height.toString(),
      width: width.toString()
    },
    polylines
  );
};
