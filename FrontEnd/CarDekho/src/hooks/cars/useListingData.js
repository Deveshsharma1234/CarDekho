import { useState, useEffect } from "react";
import apiClient from "../../utils/apiClient"; 
import { BASE_URL } from "../../utils/constants";       

const useListingData = (filters = {}) => {
  const [listing, setListing] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`${BASE_URL}/getAllListings`, {
          params: filters, 
        });
       // API returns { listings: [...] }
        setListing(response.data.listings || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [JSON.stringify(filters)]); 

  return { listing, error, loading };
};

export default useListingData;
