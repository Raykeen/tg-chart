import mapValues from "lodash/mapValues";

const PointDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric"
});

export const pointDateFormat = value => PointDateFormatter.format(value);

export const getSvgCoords = (x, y, svg) => {
  const helpfulPoint = svg.createSVGPoint();

  helpfulPoint.x = x;
  helpfulPoint.y = y;
  return helpfulPoint.matrixTransform(svg.getScreenCTM().inverse());
};

export const getScreenCoords = (x, y, svg) => {
  const helpfulPoint = svg.createSVGPoint();
  helpfulPoint.x = x;
  helpfulPoint.y = y;

  return helpfulPoint.matrixTransform(svg.getScreenCTM());
};

export const findNearestPoint = (points, x) => {
  const point =
    // binary search will be better
    points.find(({ viewX }, index) => {
      const prevX =
        points[index - 1] !== undefined ? points[index - 1].viewX : null;
      const nextX =
        points[index + 1] !== undefined ? points[index + 1].viewX : null;
      const boundStart = prevX !== null ? (prevX + viewX) / 2 : viewX;
      const boundEnd = nextX !== null ? (nextX + viewX) / 2 : viewX;

      return x > boundStart && x < boundEnd;
    }) || {};

  return point.viewX !== undefined ? point : null;
};

export const findNearestPoints = (lines, x) =>
  Object.keys(lines).reduce((nearest, lineName) => {
    const { points, color } = lines[lineName];
    const point = findNearestPoint(points, x);
    if (point) nearest[lineName] = Object.assign({ color }, point);
    return nearest;
  }, {});
