import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SamplingComparison = ({ comparisonData }) => {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Sampling Strategies Comparison</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {comparisonData.strategies.map((strategy) => (
          <div key={strategy.name} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">{strategy.name}</h3>
            <ul className="space-y-2">
              <li>Total Samples: {strategy.totalSamples}</li>
              <li>Unique Types: {strategy.uniqueTypes}</li>
            </ul>
          </div>
        ))}
      </div>

      {/* Distribution Comparison */}
      <div className="bg-white p-4 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Top 10 Types Distribution by Strategy</h2>
        <div className="overflow-x-auto">
          <BarChart
            width={1000}
            height={500}
            data={comparisonData.strategies[0].distribution.map((item) => ({
              type: item.type,
              'Frequency Based': comparisonData.strategies[0].distribution.find(d => d.type === item.type)?.count || 0,
              'Top 20 Balanced': comparisonData.strategies[1].distribution.find(d => d.type === item.type)?.count || 0,
              'Proportional': comparisonData.strategies[2].distribution.find(d => d.type === item.type)?.count || 0,
            }))}
            margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Frequency Based" fill="#8884d8" />
            <Bar dataKey="Top 20 Balanced" fill="#82ca9d" />
            <Bar dataKey="Proportional" fill="#ffc658" />
          </BarChart>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Strategy Recommendations</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Frequency-Based Strategy</h3>
            <p>Best for: Comprehensive coverage with emphasis on common equipment types</p>
            <p>Total samples: {comparisonData.strategies[0].totalSamples}</p>
          </div>
          <div>
            <h3 className="font-semibold">Top 20 Balanced Strategy</h3>
            <p>Best for: Focus on most common equipment types with equal representation</p>
            <p>Total samples: {comparisonData.strategies[1].totalSamples}</p>
          </div>
          <div>
            <h3 className="font-semibold">Proportional Strategy</h3>
            <p>Best for: Maintaining original distribution ratios while ensuring minimum representation</p>
            <p>Total samples: {comparisonData.strategies[2].totalSamples}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamplingComparison;