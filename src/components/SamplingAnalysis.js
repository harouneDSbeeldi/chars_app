import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SamplingAnalysis = ({ data20, dataAll }) => {
  // Calculate sampling statistics
  const totalCount = dataAll.reduce((sum, item) => sum + item.count, 0);
  const highFreqTypes = dataAll.filter(item => (item.count / totalCount * 100) > 1);
  const medFreqTypes = dataAll.filter(item => {
    const percent = (item.count / totalCount * 100);
    return percent <= 1 && percent > 0.1;
  });
  const lowFreqTypes = dataAll.filter(item => (item.count / totalCount * 100) <= 0.1);

  // Prepare comparison data for visualization
  const sampleComparison = [
    {
      category: 'High Frequency Types (>1%)',
      count: highFreqTypes.length,
      percentage: (highFreqTypes.reduce((sum, item) => sum + item.count, 0) / totalCount * 100).toFixed(1),
      samplesPerType: '7 samples each'
    },
    {
      category: 'Medium Frequency Types (0.1-1%)',
      count: medFreqTypes.length,
      percentage: (medFreqTypes.reduce((sum, item) => sum + item.count, 0) / totalCount * 100).toFixed(1),
      samplesPerType: '3 samples each'
    },
    {
      category: 'Low Frequency Types (<0.1%)',
      count: lowFreqTypes.length,
      percentage: (lowFreqTypes.reduce((sum, item) => sum + item.count, 0) / totalCount * 100).toFixed(1),
      samplesPerType: '1 sample each'
    }
  ];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Sampling Analysis</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Sampling Strategy Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Distribution Statistics</h3>
            <ul className="list-disc pl-4">
              <li>Total unique types: {dataAll.length}</li>
              <li>Top 20 types represent: {(data20.slice(0, -1).reduce((sum, item) => sum + item.count, 0) / totalCount * 100).toFixed(1)}% of equipment</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Suggested Sample Sizes</h3>
            <ul className="list-disc pl-4">
              {sampleComparison.map(item => (
                <li key={item.category}>
                  {item.category}: {item.count} types ({item.percentage}% of total) - {item.samplesPerType}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Sampling Distribution</h2>
        <div className="bg-white p-4 rounded shadow">
          <BarChart
            width={800}
            height={400}
            data={sampleComparison}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="Number of Types" />
          </BarChart>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Sample Strategy Recommendations</h2>
        <div className="bg-white p-4 rounded shadow">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Strategy 1: Frequency-Based Sample</h3>
              <p>Total estimated sample size: {
                highFreqTypes.length * 7 +
                medFreqTypes.length * 3 +
                lowFreqTypes.length * 1
              } items</p>
            </div>

            <div>
              <h3 className="font-semibold">Strategy 2: Top 20 Balanced Sample</h3>
              <p>Total estimated sample size: {20 * 5} items</p>
            </div>

            <div>
              <h3 className="font-semibold">Strategy 3: Proportional Sample</h3>
              <p>Target sample size: 300 items</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamplingAnalysis;