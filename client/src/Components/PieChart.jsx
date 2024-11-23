import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const data = [
  { id: 'Product A', value: 35 },
  { id: 'Product B', value: 25 },
  { id: 'Product C', value: 20 },
  { id: 'Product D', value: 15 },
  { id: 'Product E', value: 5 },
];

const theme = {
  labels: {
    text: {
      fill: '#E5E7EB',
    },
  },
  legends: {
    text: {
      fill: '#9CA3AF',
    },
  },
};

export  function PieChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsivePie
        theme={theme}
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={['#818CF8', '#F472B6', '#34D399', '#60A5FA', '#A78BFA']}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#E5E7EB"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
          },
        ]}
      />
    </div>
  );
}