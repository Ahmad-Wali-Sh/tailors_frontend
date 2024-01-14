import { useState, useEffect } from 'react';
import axios from 'axios';


  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  });

const useApi = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (method, endpoint, requestData = null) => {
    try {
      setLoading(true);
      const response = await instance[method](endpoint, requestData);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const get = (endpoint) => makeRequest('get', endpoint);
  const post = (endpoint, data) => makeRequest('post', endpoint, data);
  const put = (endpoint, data) => makeRequest('put', endpoint, data);
  const patch = (endpoint, data) => makeRequest('patch', endpoint, data);

  useEffect(() => {
    // You can add any cleanup logic here if needed
    return () => {
      // Cleanup logic
    };
  }, []); // Empty dependency array to run only once on mount

  return { data, loading, error, get, post, put, patch };
};

export default useApi;