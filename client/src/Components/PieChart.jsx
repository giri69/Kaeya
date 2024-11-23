import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';

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

export function PieChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user_id from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;

    if (!userId) {
      setError('User ID not found in local storage');
      setLoading(false);
      return;
    }

    // Fetch application logs
    const fetchLogs = async () => {
      try {
        const response = await fetch(`http://localhost:8000/logs/logs/${userId}/count`);
        if (!response.ok) {
          throw new Error('Failed to fetch logs');
        }
        const logs = await response.json();

        // Map response to pie chart format
        const chartData = Object.entries(logs).map(([key, value]) => ({
          id: key,
          value,
        }));

        setData(chartData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

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

export default PieChart;
