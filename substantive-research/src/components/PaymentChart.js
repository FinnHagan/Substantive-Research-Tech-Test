import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Component displaying chart for payment trends
function PaymentChart({ data }) {
  // Group providers by colour
  const providerColors = {
    'Globex Brokers': 'red',
    'Tyrell Insights': 'blue',
    'Skynet Market Solutions Alpha': 'green',
    'Gringotts Research Gold Index': 'pink'
  };

  // Sort years in ascending order
  const labels = [...new Set(data.flatMap(product => Object.keys(product.yearlyPayments)))].sort();

  // Create datasets for each product
  const datasets = data.map((product) => {
    return {
      label: `${product.providerName} - ${product.productName}`, // Label for each product
      data: labels.map(year => product.yearlyPayments[year] || 0), // Payment data for each year
      fill: false,
      borderColor: providerColors[product.providerName],
      backgroundColor: providerColors[product.providerName],
      tension: 0.3, // Smooth curve for better readability
    };
  });

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Year-on-Year Product Payment Trends'
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Year'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Payment in €'
        }
      }
    }
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default PaymentChart;
