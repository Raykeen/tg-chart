import { h, Component } from "preact";
import { Chart } from "../Chart";

export class ChartWidget extends Component {
  constructor (props) {
    super(props)

    this.state = {
      x: 0,
      y: 0,
      width: 400,
      height: 400
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
          min="1"
          max="1100"
          value={state.x}
          onInput={this._handleScroll}
        />
        <Chart chartViewData={chartViewData} height={400} width={1500} viewport={state}/>
      </div>
    );
  }
}
