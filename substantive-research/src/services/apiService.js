import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const AUTH_KEY = process.env.REACT_APP_API_KEY;

// Fetch product benchmarks
export const getProductBenchmarks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product_benchmarks`, {
      headers: { 'auth-key': AUTH_KEY },
    });
    return response.data.product_benchmarks;
  } catch (error) {
    console.error('Error fetching product benchmarks:', error);
    return [];
  }
};

// Fetch exchange rates
export const getExchangeRates = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/exchange_rates`, {
      headers: { 'auth-key': AUTH_KEY },
    });
    return response.data.exchange_rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return [];
  }
};
