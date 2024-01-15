import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (method, endpoint, requestData = null, successCallback = null) => {
    try {
      setLoading(true);
      const response = await instance[method](endpoint, requestData);
      setData(response.data);
      if (successCallback) {
        successCallback(response.data);
      }
    } catch (error) {
      setError(error);
      throw error; // Explicitly throw the error to propagate it to the calling function
    } finally {
      setLoading(false);
    }
  };

  // Function to manually set data
  const dataSeter = (newData) => {
    setData(newData);
  };

  const get = (endpoint) => makeRequest("get", endpoint);
  const post = (endpoint, data, successCallback) =>
    makeRequest("post", endpoint, data, successCallback)
      .then(() => {
        toast.success("موفقانه بود");
      })
      .catch(() => {
        toast.error("دوباره امتحان کنید");
      });
  const put = (endpoint, data) =>
    makeRequest("put", endpoint, data)
      .then(() => {
        toast.info("موفقانه بود");
      })
      .catch(() => {
        toast.error("دوباره امتحان کنید");
      });
      const patch = (endpoint, data, successCallback) =>
      makeRequest("patch", endpoint, data, successCallback)
        .then(() => {
          toast.info("موفقانه بود");
        })
        .catch(() => {
          toast.error("دوباره امتحان کنید");
        });
  const deleter = (endpoint) =>
    makeRequest("delete", endpoint)
      .then(() => {
        toast.danger("موفقانه حذف شد بود");
      })
      .catch(() => {
        toast.error("دوباره امتحان کنید");
      });

  useEffect(() => {
    // You can add any cleanup logic here if needed
    return () => {
      // Cleanup logic
    };
  }, []); // Empty dependency array to run only once on mount

  return { data, loading, error, get, post, put, patch, deleter, dataSeter };
};

export default useApi;