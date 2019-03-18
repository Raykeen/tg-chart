import { h, Component } from "preact";
import { getSvgCoords, findNearestPoints } from "./helpers";
import { Polylines } from "./Polylines";
import { SelectedPoints } from "./SelectedPoints";
import styles from "./Chart.css";
import { pointDateFormat } from "./helpers";
import { getScreenCoords } from './helpers'

export class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPoints: {},
      pointScreenX: null
    };

    this.svg = null;
    this.setSvg = el => (this.svg = el);

    this._handleMouseMove = evt => {
      const {
        chartViewData: { lines }
      } = this.props;

      const { x: mouseX } = getSvgCoords(evt.clientX, evt.clientY, this.svg);
      const selectedPoints = findNearestPoints(lines, mouseX);

      let pointScreenX = null;

      const selectedViewX = Object.values(selectedPoints)[0] ? Object.values(selectedPoints)[0].viewX : null;

      if (selectedViewX) {
        pointScreenX = Math.ceil(getScreenCoords(selectedViewX, 0, this.svg).x);
      }

      console.log(selectedViewX, pointScreenX)

      this.setState({ selectedPoints, pointScreenX });
    };

    this._handleMouseLeave = () => {
      this.setState({ selectedPoints: {}, pointScreenX: null });
    };
  }

  render(
    { chartViewData, width, height, viewport: vp },
    { selectedPoints, pointScreenX },
    context
  ) {
    const { minViewY, maxViewY } = chartViewData;
    const selectedX = Object.values(selectedPoints)[0] ? Object.values(selectedPoints)[0].x : null;

    return (
      <div className={styles.container}>
        <svg
          ref={this.setSvg}
          height={width.toString()}
          width={height.toString()}
          viewBox={[vp.x, minViewY, vp.width, maxViewY - minViewY].join(" ")}
          preserveAspectRatio="none"
          onMouseMove={this._handleMouseMove}
          onMouseLeave={this._handleMouseLeave}
        >
          <Polylines lines={chartViewData.lines} />
          <SelectedPoints
            points={selectedPoints}
            minViewY={minViewY}
            maxViewY={maxViewY}
          />
        </svg>
        {selectedX && (
          <div className={styles.pointsTip} style={`transform: translateX(${pointScreenX}px)`}>
            <p className={styles.date}>{pointDateFormat(selectedX)}</p>
            <div className={styles.points}>
              {Object.keys(selectedPoints).map((lineName) => (
                <div className={styles.point} style={`color:${selectedPoints[lineName].color}`}>
                  <p className={styles.value}>{selectedPoints[lineName].y}</p>
                  <p className={styles.name}>{lineName}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
