import { useState, useEffect } from "react";
import apiClient from "../../utils/apiClient"; 
import { BASE_URL } from "../../utils/constants";       
import { useSelector } from "react-redux";

const useListingData = () => {
  const [listing, setListing] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const filters = useSelector(store => store.listingFilter.listingFilter)
  console.log("Seletct filter from you in redux", filters);


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
