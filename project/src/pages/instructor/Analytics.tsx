import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { ResponsiveAreaBump } from '@nivo/bump';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { ResponsiveSankey } from '@nivo/sankey';
import { ResponsiveRadar } from '@nivo/radar';

// Mock data for different chart types
const mockData = {
  bar: [
    { month: 'Jan', assignments: 20, submissions: 18, attendance: 90 },
    { month: 'Feb', assignments: 25, submissions: 22, attendance: 88 },
    { month: 'Mar', assignments: 30, submissions: 28, attendance: 92 },
    { month: 'Apr', assignments: 28, submissions: 25, attendance: 85 },
  ],
  pie: [
    { id: 'A Grade', value: 35, color: 'hsl(120, 70%, 50%)' },
    { id: 'B Grade', value: 25, color: 'hsl(80, 70%, 50%)' },
    { id: 'C Grade', value: 20, color: 'hsl(40, 70%, 50%)' },
    { id: 'D Grade', value: 15, color: 'hsl(0, 70%, 50%)' },
    { id: 'F Grade', value: 5, color: 'hsl(0, 70%, 30%)' },
  ],
  line: [
    {
      id: 'Average Score',
      data: [
        { x: 'Week 1', y: 75 },
        { x: 'Week 2', y: 78 },
        { x: 'Week 3', y: 82 },
        { x: 'Week 4', y: 80 },
        { x: 'Week 5', y: 85 },
      ],
    },
    {
      id: 'Class Average',
      data: [
        { x: 'Week 1', y: 72 },
        { x: 'Week 2', y: 75 },
        { x: 'Week 3', y: 78 },
        { x: 'Week 4', y: 77 },
        { x: 'Week 5', y: 80 },
      ],
    },
  ],
  radar: [
    { skill: 'Participation', student: 80, average: 70 },
    { skill: 'Assignments', student: 90, average: 75 },
    { skill: 'Quizzes', student: 85, average: 80 },
    { skill: 'Projects', student: 95, average: 85 },
    { skill: 'Attendance', student: 88, average: 82 },
  ],
};

const Analytics: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState('overview');

  const renderChart = () => {
    switch (selectedChart) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="bg-white rounded-lg shadow-lg p-4" style={{ height: '400px' }}>
              <h3 className="text-lg font-semibold mb-4">Monthly Performance</h3>
              <ResponsiveBar
                data={mockData.bar}
                keys={['assignments', 'submissions', 'attendance']}
                indexBy="month"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                colors={{ scheme: 'nivo' }}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                legends={[
                  {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: 120,
                    itemWidth: 100,
                    itemHeight: 20,
                  },
                ]}
              />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4" style={{ height: '400px' }}>
              <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
              <ResponsivePie
                data={mockData.pie}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                legends={[
                  {
                    anchor: 'bottom',
                    direction: 'row',
                    translateY: 56,
                    itemWidth: 60,
                    itemHeight: 18,
                  },
                ]}
              />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4" style={{ height: '400px' }}>
              <h3 className="text-lg font-semibold mb-4">Progress Tracking</h3>
              <ResponsiveLine
                data={mockData.line}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                axisTop={null}
                axisRight={null}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: 100,
                    itemWidth: 80,
                    itemHeight: 20,
                  },
                ]}
              />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4" style={{ height: '400px' }}>
              <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
              <ResponsiveRadar
                data={mockData.radar}
                keys={['student', 'average']}
                indexBy="skill"
                maxValue="auto"
                margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                curve="linearClosed"
                borderWidth={2}
                borderColor={{ from: 'color' }}
                gridLevels={5}
                gridShape="circular"
                dotSize={10}
                dotColor={{ theme: 'background' }}
                dotBorderWidth={2}
                dotBorderColor={{ from: 'color' }}
                enableDotLabel={true}
                dotLabel="value"
                dotLabelYOffset={-12}
                colors={{ scheme: 'nivo' }}
                fillOpacity={0.25}
                blendMode="multiply"
                legends={[
                  {
                    anchor: 'top-left',
                    direction: 'column',
                    translateX: -50,
                    translateY: -40,
                    itemWidth: 80,
                    itemHeight: 20,
                  },
                ]}
              />
            </div>
          </div>
        );
      default:
        return <div>Select a chart type to view analytics</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Course Analytics Dashboard</h2>
          <div className="space-x-4">
            <select
              value={selectedChart}
              onChange={(e) => setSelectedChart(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="overview">Overview Dashboard</option>
              <option value="performance">Performance Analysis</option>
              <option value="engagement">Engagement Metrics</option>
            </select>
          </div>
        </div>
        {renderChart()}
      </div>
    </div>
  );
};

export default Analytics;
