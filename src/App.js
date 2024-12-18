import React, { useState } from 'react';
import DistributionAnalysis from './components/DistributionAnalysis';
import SamplingAnalysis from './components/SamplingAnalysis';
import SamplingComparison from './components/SamplingComparison';
// Import JSON data
import all_types_data from './all_types_data.json';
import top20_data from './top20_data.json';
import samplingComparisonData from './sampling_comparison.json';

function App() {
  const [currentPage, setCurrentPage] = useState('distribution');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg mb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center space-x-4 py-4">
            <button
              className={`px-4 py-2 rounded ${
                currentPage === 'distribution' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setCurrentPage('distribution')}
            >
              Distribution Analysis
            </button>
            <button
              className={`px-4 py-2 rounded ${
                currentPage === 'sampling' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setCurrentPage('sampling')}
            >
              Sampling Analysis
            </button>
            <button
              className={`px-4 py-2 rounded ${
                currentPage === 'comparison' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setCurrentPage('comparison')}
            >
              Sampling Comparison
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4">
        {currentPage === 'distribution' ? (
          <DistributionAnalysis data20={top20_data} dataAll={all_types_data} />
        ) : currentPage === 'sampling' ? (
          <SamplingAnalysis data20={top20_data} dataAll={all_types_data} />
        ) : (
          <SamplingComparison comparisonData={samplingComparisonData} />
        )}
      </main>
    </div>
  );
}

export default App;