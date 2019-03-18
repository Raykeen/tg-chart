import { h, Component } from 'preact'
import mapValues from 'lodash/mapValues'
import { getSvgCoords } from './helpers'
import { Polylines } from './Polylines'
import { findNearestPoints } from './helpers'

export class Chart extends Component {
  constructor (props) {
    super(props)

    this.noSelectedPoints = mapValues(props.chartViewData.lines, () => null)

    this.state = {
      selectedPoints: this.noSelectedPoints,
    }

    this.svg = null
    this.setSvg = el => (this.svg = el)

    this._handleMouseMove = evt => {
      const {
        chartViewData: {lines},
      } = this.props

      const {x: mouseX} = getSvgCoords(evt, this.svg)
      const selectedPoints = findNearestPoints(lines, mouseX)

      this.setState({selectedPoints})
    }

    this._handleMouseLeave = () => {
      this.setState({selectedPoints: this.noSelectedPoints})
    }
  }

  render (
    {chartViewData, width, height, viewport: vp},
    {selectedPoints},
    context,
  ) {
    const {minViewY, maxViewY} = chartViewData

    return (
      <svg
        ref={this.setSvg}
        height={width.toString()}
        width={height.toString()}
        viewBox={[vp.x, minViewY, vp.width, maxViewY - minViewY].join(' ')}
        preserveAspectRatio="none"
        onMouseMove={this._handleMouseMove}
        onMouseLeave={this._handleMouseLeave}
      >
        <Polylines lines={chartViewData.lines}/>
        {Object.values(selectedPoints).
          filter(p => p).
          map(({viewX}) => (
            <line
              x1={viewX}
              y1={minViewY}
              x2={viewX}
              y2={maxViewY}
              stroke="#003860"
              stroke-opacity="0.055"
              vector-effect="non-scaling-stroke"
            />
          ))}
        {Object.values(selectedPoints).
          filter(p => p).
          map(({viewX, viewY, color}) => [
            <rect
              x={viewX}
              y={viewY}
              width="0.001"
              height="0.001"
              stroke={color}
              stroke-width={9}
              stroke-linejoin="round"
              vector-effect="non-scaling-stroke"
            />,
            <rect
              x={viewX}
              y={viewY}
              width="0.001"
              height="0.001"
              stroke="white"
              stroke-width={5}
              stroke-linejoin="round"
              vector-effect="non-scaling-stroke"
            />,
          ])}
      </svg>
    )
  }
}
