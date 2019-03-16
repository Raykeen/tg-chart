import min from "lodash/min";
import max from "lodash/max";

export const parseChartData = chart => {
  let xValues = [];
  const yLines = {};
  const result = {
    lines: {},
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0
  };

  chart.columns.forEach(column => {
    const [name, ...values] = column;

    if (chart.types[name] === "x") {
      xValues = values;
    }

    if (chart.types[name] === "line") {
      yLines[name] = values;
    }
  });

  result.minX = min(xValues);
  result.maxX = max(xValues);

  Object.keys(yLines).forEach(yLineName => {
    const yLine = yLines[yLineName];

    const lineMin = min(yLine);
    const lineMax = max(yLine);

    if (lineMin < result.minY) {
      result.minY = lineMin;
    }

    if (lineMax > result.maxY) {
      result.maxY = lineMax;
    }

    const points = yLine.map((yValue, index) => ({
      x: xValues[index],
      y: yValue
    }));

    result.lines[yLineName] = {
      points,
      color: chart.colors[yLineName]
    };
  });

  return result;
};

export const getScaleValue = (
  actualMin,
  actualMax,
  targetMin,
  targetMax
) => value => {
  const actualRange = actualMax - actualMin;
  const targetRange = targetMax - targetMin;

  const scale = targetRange / actualRange;

  return (value - actualMin) * scale + targetMin;
};
