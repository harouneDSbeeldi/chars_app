import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const DistributionAnalysis = ({ data20, dataAll }) => {
  const [view, setView] = useState('top20');

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
    '#82CA9D', '#F06292', '#9575CD', '#4DD0E1', '#81C784',
    '#FFB74D', '#A1887F', '#90A4AE', '#7CB342', '#FFA726',
    '#FF7043', '#BA68C8', '#4DB6AC', '#FF8A65', '#AED581',
    '#E0E0E0' // for Others
  ];

  // Custom label formatter for pie chart
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, type }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${type} (${(percent * 100).toFixed(1)}%)`}
      </text>
    );
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Equipment Types Distribution Analysis
      </h1>

      <div style={{ marginBottom: '20px' }}>
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        >
          <option value="top20">Top 20 + Others</option>
          <option value="all">All Types</option>
          <option value="bar">Bar Chart View</option>
        </select>
      </div>

      {view === 'top20' && (
        <div style={{ height: '600px' }}>
          <PieChart width={800} height={600}>
            <Pie
              data={data20}
              cx={400}
              cy={300}
              labelLine={true}
              label={renderCustomLabel}
              outerRadius={200}
              fill="#8884d8"
              dataKey="count"
            >
              {data20.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name, props) => [value, props.payload.type]} />
            <Legend
              formatter={(value, entry) => entry.payload.type}
              layout="vertical"
              align="right"
              verticalAlign="middle"
            />
          </PieChart>
        </div>
      )}

      {view === 'all' && (
        <div style={{ height: '600px', overflowY: 'auto' }}>
          <PieChart width={1200} height={1200}>
            <Pie
              data={dataAll}
              cx={600}
              cy={600}
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={500}
              fill="#8884d8"
              dataKey="count"
            >
              {dataAll.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name, props) => [value, props.payload.type]} />
            <Legend
              formatter={(value, entry) => entry.payload.type}
              layout="vertical"
              align="right"
              verticalAlign="middle"
            />
          </PieChart>
        </div>
      )}

      {view === 'bar' && (
        <div style={{ height: '600px', overflowX: 'auto' }}>
          <BarChart
            width={1200}
            height={600}
            data={dataAll.slice(0, 30)}
            margin={{
              top: 20,
              right: 30,
              left: 200,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" angle={-45} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip formatter={(value, name, props) => [value, props.payload.type]} />
            <Bar dataKey="count" fill="#8884d8">
              {dataAll.slice(0, 30).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </div>
      )}
    </div>
  );
};

export default DistributionAnalysis;