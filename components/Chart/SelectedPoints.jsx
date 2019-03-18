import { h } from "preact";
import styles from "./SelectedPoints.css";

export const SelectedPoints = ({ points, minViewY, maxViewY }) => {
  const point = Object.values(points)[0];

  if (!point) return null;

  const { viewX } = point;

  return (
    <g>
      <line
        x1={0}
        y1={minViewY}
        x2={0}
        y2={maxViewY}
        class={styles.transition}
        style={`transform: translateX(${viewX}px)`}
        stroke="#003860"
        stroke-opacity="0.11"
        vector-effect="non-scaling-stroke"
      />
      {Object.values(points).map(({ viewX, viewY, color }) => [
        <rect
          x={0}
          y={0}
          class={styles.transition}
          style={`transform: translate(${viewX}px, ${viewY}px)`}
          width="0.001"
          height="0.001"
          stroke={color}
          stroke-width={9}
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />,
        <rect
          x={0}
          y={0}
          className={styles.transition}
          style={`transform: translate(${viewX}px, ${viewY}px)`}
          width="0.001"
          height="0.001"
          stroke="white"
          stroke-width={5}
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      ])}
    </g>
  );
};
