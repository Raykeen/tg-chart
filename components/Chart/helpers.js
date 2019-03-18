import mapValues from "lodash/mapValues";

export const getSvgCoords = (evt, svg) => {
  const helpfulPoint = svg.createSVGPoint();

  helpfulPoint.x = evt.clientX;
  helpfulPoint.y = evt.clientY;
  return helpfulPoint.matrixTransform(svg.getScreenCTM().inverse());
};

export const findNearestPoint = (points, x) => {
  const { viewX, viewY } =
    points.find(({ viewX }, index) => {
      // binary search will be better
      const prevX =
        points[index - 1] !== undefined ? points[index - 1].viewX : null;
      const nextX =
        points[index + 1] !== undefined ? points[index + 1].viewX : null;
      const boundStart = (viewX - (prevX || 2 * viewX - nextX)) / 2;
      const boundEnd = (viewX + (nextX || 2 * viewX + prevX)) / 2;

      return x > boundStart && x < boundEnd;
    }) || {};

  return viewX !== undefined ? { viewX, viewY } : null;
};

export const findNearestPoints = (lines, x) =>
  mapValues(lines, ({ points, color }) =>
    Object.assign({ color }, findNearestPoint(points, x))
  );
