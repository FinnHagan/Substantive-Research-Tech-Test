import React, { useEffect, useState } from 'react';
import './App.css';
import { getProductBenchmarks, getExchangeRates } from './services/apiService';

function App() {
  const [benchmarks, setBenchmarks] = useState([]);
  const [exchangeRates, setExchangeRates] = useState([]);
  
  // Verify data is being fetched successfully from API
  useEffect(() => {
    const fetchData = async () => {
      const productBenchmarks = await getProductBenchmarks();
      const exchangeRates = await getExchangeRates();

      console.log('Product Benchmarks:', productBenchmarks);
      console.log('Exchange Rates:', exchangeRates);

      // Set state with fetched data
      setBenchmarks(productBenchmarks);
      setExchangeRates(exchangeRates);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Substantive Research</h1>
        <p>Fetching product benchmarks and exchange rates...</p>
      </header>
    </div>
  );
}

export default App;