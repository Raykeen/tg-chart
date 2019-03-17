import { parseChartData } from "./components/Chart/helpers";
import { ChartWidget } from "./components/ChartWidget";
import { render, h } from "preact";

import ("./chart_data").then((chartDataRaw) => {
  const chartViewData = parseChartData(chartDataRaw[0]);
  const chartWidget = document.querySelector("#ChartWidget");

  render(<ChartWidget chartViewData={chartViewData}/>, chartWidget);
});
