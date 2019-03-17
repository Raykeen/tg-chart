import { h, Component } from "preact";
import { Chart } from "../Chart";

export class ChartWidget extends Component {
  constructor (props) {
    super(props)

    this.state = {
      x: props.chartViewData.minViewX,
      width: (props.chartViewData.maxViewX - props.chartViewData.minViewX) / 6,
    }

    this._handleScroll = (evt) => {
      this.setState({
        x: evt.target.value
      })
    }
  }

  render({ chartViewData }, state, context) {
    return (
      <div>
        <input
          type="range"
          min={chartViewData.minViewX}
          max={chartViewData.maxViewX - state.width}
          value={state.x}
          onInput={this._handleScroll}
        />
        <Chart chartViewData={chartViewData} height={400} width={400} viewport={state}/>
      </div>
    );
  }
}
