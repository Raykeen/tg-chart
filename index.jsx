import { parseChartData } from "./utils/parser";
import { ChartWidget } from "./components/ChartWidget";
import { render, h } from "preact";

import ("./chart_data").then((chartDataRaw) => {
  const chartViewData = parseChartData(chartDataRaw[4]);
  const chartWidget = document.querySelector("#ChartWidget");

  render(<ChartWidget chartViewData={chartViewData}/>, chartWidget);
});
