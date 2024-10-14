import React from 'react';
import './ProviderSummary.css';

// Component displaying summary table for providers
const ProviderSummary = ({ data }) => {
  return (
    <div>
      <h2>Provider Benchmark Summary</h2>
      <table className="provider-summary-table">
        <thead>
          <tr>
            <th>Provider</th>
            <th>Total Payment (€)</th>
            <th>Total Benchmark (€)</th>
            <th>Difference (€)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((provider, index) => (
            <tr key={index} className={provider.difference < 0 ? 'negative' : 'positive'}>
              <td>{provider.name}</td>
              <td>{provider.totalPayment.toFixed(2)}</td>
              <td>{provider.totalBenchmark.toFixed(2)}</td>
              <td>{provider.difference.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProviderSummary;