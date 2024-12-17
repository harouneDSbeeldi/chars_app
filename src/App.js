import React from 'react';
import DistributionAnalysis from './components/DistributionAnalysis';
import top20Data from './top20_data.json';
import allTypesData from './all_types_data.json';

function App() {
  return (
    <div className="App">
      <DistributionAnalysis data20={top20Data} dataAll={allTypesData} />
    </div>
  );
}

export default App;