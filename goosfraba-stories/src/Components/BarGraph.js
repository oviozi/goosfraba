import React from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { Grid } from "@visx/grid";
import { AxisBottom } from "@visx/axis";
import { scaleBand, scaleLinear } from "@visx/scale";

export const purple3 = "#a44afe";
export const background = "#eaedff";

const defaultMargin = { top: 40, left: 0 };
const formatDate = (date) => date;

export default function BarGraph({
  width,
  height,
  margin = defaultMargin,
  yearList,
}) {
  if (width < 10) return null;
  const xMax = width;
  const yMax = height - margin.top - 100;

  const chartList = yearList.reduce((accumulator, item) => {
    const date = new Date(Number(item.createdAt));
    const month = new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(date);
    if (!accumulator[month]) {
      accumulator[month] = 0;
    }
    if (typeof accumulator[month] !== "undefined") {
      accumulator[month] = accumulator[month] + 1;
    }
    return accumulator;
  }, {});

  const monthsLabels = yearList.reduce((accumulator, item) => {
    const date = new Date(Number(item.createdAt));
    const month = new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(date);
    if (!accumulator[month]) {
      accumulator[month] = month;
    }
    return accumulator;
  }, {});

  const chartListValues = Object.values(monthsLabels);

  const dateScale = scaleBand({
    domain: chartListValues,
    padding: 0.2,
  });

  dateScale.rangeRound([0, xMax]);

  const monthScale = scaleLinear({
    domain: [0, Math.max(...chartListValues)],
    nice: true,
  });

  monthScale.range([yMax, 0]);

  return width < 10 ? null : (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={background}
          rx={14}
        />
        <Grid
          top={margin.top}
          left={margin.left}
          xScale={dateScale}
          yScale={monthScale}
          width={xMax}
          height={yMax}
          stroke="black"
          strokeOpacity={0.1}
          xOffset={dateScale.bandwidth() / 2}
        />
        <Group top={margin.top}>
          {Object.entries(chartList).map(([month, numberPost], index) => {
            const height = numberPost * 45;
            return (
              <Bar
                key={month}
                x={(index + 0.2) * 65}
                y={800 - height - margin.top - 100}
                width={55}
                height={height}
                fill="brown"
              />
            );
          })}
        </Group>
        <AxisBottom
          top={yMax + margin.top}
          scale={dateScale}
          tickFormat={formatDate}
          stroke={purple3}
          tickStroke={purple3}
          tickLabelProps={() => ({
            fill: purple3,
            fontSize: 11,
            textAnchor: "middle",
          })}
        />
      </svg>
    </div>
  );
}
