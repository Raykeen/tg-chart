import { h, Component } from "preact";
import { Chart } from "../Chart";

export class ChartWidget extends Component {
  constructor (props) {
    super(props)

    this.state = {
      x: props.chartViewData.minX,
      width: (props.chartViewData.maxX - props.chartViewData.minX) / 6,
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
          min={chartViewData.minX}
          max={chartViewData.maxX - state.width}
          value={state.x}
          onInput={this._handleScroll}
        />
        <Chart chartViewData={chartViewData} height={400} width={400} viewport={state}/>
      </div>
    );
  }
}
