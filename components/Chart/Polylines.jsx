import {h} from 'preact';

export const Polylines = ({lines}) => {
  const polylines = Object.values(lines).map(({points, color}) => {
    const pointsStr = points.map(({viewX, viewY}) => `${viewX},${viewY}`).
      join(' ')

    return (
      <polyline
        points={pointsStr}
        fill="none"
        stroke={color}
        stroke-width={2}
        stroke-linecap="round"
        stroke-linejoin="round"
        vector-effect="non-scaling-stroke"
      />
    )
  })

  return <g>{polylines}</g>
}
