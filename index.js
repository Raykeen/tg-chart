import chartDataRaw from "./chart_data";
import { parseChartData } from "./components/Chart/helpers";
import { Chart } from "./components/Chart";
import { render } from "./helpers/dom";

const chartViewData = parseChartData(chartDataRaw[4]);
const chartWidget = document.querySelector("#ChartWidget");
const slider = document.querySelector("#slider");

const defaultChartAttrs = {
  chartViewData,
  width: 1500,
  height: 400,
  viewport: {
    x: 0,
    y: 0,
    width: 400,
    height: 400
  }
};

slider.oninput = function() {
  render(
    Chart({
      ...defaultChartAttrs,
      viewport: {
        ...defaultChartAttrs.viewport,
        x: this.value
      }
    }),
    chartWidget
  );
};

render(Chart(defaultChartAttrs), chartWidget);
