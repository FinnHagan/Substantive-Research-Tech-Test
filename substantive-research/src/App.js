import React, { useEffect, useState } from 'react';
import './App.css';
import { getProductBenchmarks, getExchangeRates } from './services/apiService';
import PaymentChart from './components/PaymentChart.js';
import ProviderSummary from './components/ProviderSummary.js';

function App() {
  // State variables to store provider and product data
  const [providerData, setProviderData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    // Fetch data from API and process it on component mount
    const fetchData = async () => {
      const productBenchmarks = await getProductBenchmarks();
      const exchangeRates = await getExchangeRates();

      // Map of exchange rates for easy lookup
      const ratesMap = createRatesMap(exchangeRates);

      // Process provider and product data
      setProviderData(processProviderData(productBenchmarks, ratesMap));
      setProductData(processProductData(productBenchmarks, ratesMap));
    };

    fetchData();
  }, []);

  // Rates map to avoid redundant lookups
  const createRatesMap = (rates) => {
    const ratesMap = {};
    rates.forEach(rate => {
      const key = `${rate.from_currency_id}_${rate.to_currency_id}_${rate.year}`;
      ratesMap[key] = rate.exchange_rate;
    });
    return ratesMap;
  };

  // Aggregate payment and benchmark information
  const processProviderData = (benchmarks, ratesMap) => {
    const providerMap = {};

    benchmarks.forEach(benchmark => {
      const year = new Date(benchmark.start_date).getFullYear();
      const currencyKey = `${benchmark.currency.id}_3_${year}`; // Currency ID 3 represents Euro
      const exchangeRate = ratesMap[currencyKey] || 1; // Use exchange rate if available, else default to 1
      const paymentInEuro = benchmark.payment * exchangeRate;
      const benchmarkInEuro = benchmark.benchmark * exchangeRate;

      // Initialise provider data
      if (!providerMap[benchmark.provider_name]) {
        providerMap[benchmark.provider_name] = {
          name: benchmark.provider_name,
          totalPayment: 0,
          totalBenchmark: 0,
          yearlyPayments: {},
        };
      }

      // Update provider's total payment and benchmark
      providerMap[benchmark.provider_name].totalPayment += paymentInEuro;
      providerMap[benchmark.provider_name].totalBenchmark += benchmarkInEuro;

      // Update provider yearly payments
      providerMap[benchmark.provider_name].yearlyPayments[year] =
        (providerMap[benchmark.provider_name].yearlyPayments[year] || 0) + paymentInEuro;
    });

    // Calculate difference between benchmark and payment for each provider
    return Object.values(providerMap).map(provider => ({
      ...provider,
      difference: provider.totalBenchmark - provider.totalPayment,
    }));
  };

  // Process product data to show yearly trends
  const processProductData = (benchmarks, ratesMap) => {
    const productMap = {};

    benchmarks.forEach(benchmark => {
      const year = new Date(benchmark.start_date).getFullYear();
      const currencyKey = `${benchmark.currency.id}_3_${year}`; // Currency ID 3 represents Euro
      const exchangeRate = ratesMap[currencyKey] || 1; // Use exchange rate if available, else default to 1
      const paymentInEuro = benchmark.payment * exchangeRate;
      const benchmarkInEuro = benchmark.benchmark * exchangeRate;

      const productKey = `${benchmark.provider_name}-${benchmark.product_name}`;

      // Initialise product data
      if (!productMap[productKey]) {
        productMap[productKey] = {
          providerName: benchmark.provider_name,
          productName: benchmark.product_name,
          totalPayment: 0,
          totalBenchmark: 0,
          yearlyPayments: {},
        };
      }

      // Update product's total payment and benchmark
      productMap[productKey].totalPayment += paymentInEuro;
      productMap[productKey].totalBenchmark += benchmarkInEuro;

      // Update product yearly payments
      productMap[productKey].yearlyPayments[year] =
        (productMap[productKey].yearlyPayments[year] || 0) + paymentInEuro;
    });

    // Calculate difference between benchmark and payment for each product
    return Object.values(productMap).map(product => ({
      ...product,
      difference: product.totalBenchmark - product.totalPayment,
    }));
  };

  return (
    <div className="App">
        <h1>Substantive Research</h1>
      <ProviderSummary data={providerData} />
      <PaymentChart data={productData} />
    </div>
  );
}

export default App;