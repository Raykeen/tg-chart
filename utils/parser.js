import min from "lodash/min";
import max from "lodash/max";
import mapValues from "lodash/mapValues";

export const parseChartData = chart => {
  let xValues = [];
  const yLines = {};

  chart.columns.forEach(column => {
    const [name, ...values] = column;

    if (chart.types[name] === "x") {
      xValues = values;
    }

    if (chart.types[name] === "line") {
      yLines[name] = values;
    }
  });

  const minX = min(xValues);
  const maxX = max(xValues);

  const { minY, maxY } = Object.values(yLines).reduce(
    (minimums, yLine) => {
      const lineMin = min(yLine);
      const lineMax = max(yLine);

      if (lineMin < minimums.minY) {
        minimums.minY = lineMin;
      }

      if (lineMax > minimums.maxY) {
        minimums.maxY = lineMax;
      }

      return minimums;
    },
    {
      minY: 0,
      maxY: 0
    }
  );

  const optimizeScaleX = getOptimizeScale(maxX - minX);
  const optimizeScaleY = getOptimizeScale(maxY - minY);

  const lines = mapValues(
    yLines,
    (yLine, yLineName) => {
      const points = yLine.map((y, index) => ({
        x: xValues[index],
        y: y,
        viewX: optimizeScaleX(xValues[index] - minX),
        viewY: optimizeScaleY(maxY - y)
      }));

      return {
        points,
        color: chart.colors[yLineName]
      };
    },
    {}
  );

  const minViewX = 0;
  const maxViewX = optimizeScaleX(maxX - minX);
  const minViewY = 0;
  const maxViewY = optimizeScaleY(maxY - minY);

  return {
    minX,
    maxX,
    minY,
    maxY,
    lines,
    minViewX,
    maxViewX,
    minViewY,
    maxViewY
  };
};

export const getOptimizeScale = valueRange => {
  const order = Math.ceil(Math.log10(valueRange));

  if (order <= 3) return value => value;

  const shiftOrder = order - 3;

  return value => value / Math.pow(10, shiftOrder);
};
