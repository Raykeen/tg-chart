import chartDataRaw from "./chart_data";
import { parseChartData } from "./components/Chart/helpers";
import { Chart } from "./components/Chart";

const chartViewData = parseChartData(chartDataRaw[0]);

document.body.appendChild(Chart({ chartViewData, width: 400, height: 400 }));
