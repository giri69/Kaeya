import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const data = [
  { month: '5 min', Tracked: 120, Safe: 90 },
  { month: '10 min', Tracked: 140, Safe: 85 },
  { month: '15 min', Tracked: 160, Safe: 95 },
  { month: '20 min', Tracked: 180, Safe: 100 },
  { month: '25 min', Tracked: 200, Safe: 110 },
  { month: '30 min', Tracked: 220, Safe: 115 },
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
};

export function BarChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveBar
        theme={theme}
        data={data}
        keys={['Tracked', 'Safe']}
        indexBy="month"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        colors={['#818CF8', '#F472B6']}
        borderRadius={4}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          // legend: 'Month',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          // legend: 'Amount ($)',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        enableGridY={true}
        gridYValues={5}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
          },
        ]}
      />
    </div>
  );
}