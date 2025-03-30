// services/deepseek.ts
import axios from 'axios';

const DEEPSEEK_API_KEY = 'sk-b7c8a81685f94362a991f2c0e7d8b7ef';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1'; // Replace with the actual API URL

const deepseekClient = axios.create({
  baseURL: DEEPSEEK_API_URL,
  headers: {
    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const deepseekService = {
  async getSomeData(params: any) {
    try {
      const response = await deepseekClient.get('/endpoint', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching data from DeepSeek API:', error);
      throw error;
    }
  },

  async postSomeData(data: any) {
    try {
      const response = await deepseekClient.post('/endpoint', data);
      return response.data;
    } catch (error) {
      console.error('Error posting data to DeepSeek API:', error);
      throw error;
    }
  },

  // Add more methods as needed
};