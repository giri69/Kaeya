import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const data = [
  {
    id: 'User Growth',
    data: [
      { x: '1 min', y: 100 },
      { x: '2 min', y: 220 },
      { x: '3 min', y: 450 },
      { x: '4 min', y: 680 },
      { x: '5 min', y: 820 },
      { x: '6 min', y: 1070 },
    ],
  },
];

const theme = {
  axis: {
    ticks: {
      text: {
        fill: '#9CA3AF',
      },
    },
    legend: {
      text: {
        fill: '#9CA3AF',
      },
    },
  },
  legends: {
    text: {
      fill: '#9CA3AF',
    },
  },
  grid: {
    line: {
      stroke: '#374151',
    },
  },
  crosshair: {
    line: {
      stroke: '#F472B6',
      strokeWidth: 1,
      strokeOpacity: 0.35,
    },
  },
};

export function LineChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveLine
        theme={theme}
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Time',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Logs',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        enableGridX={true}
        enableGridY={true}
        colors={['#818CF8']}
        pointSize={10}
        pointColor="#1F2937"
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(255, 255, 255, 0.5)',
          },
        ]}
      />
    </div>
  );
}