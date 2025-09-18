import { useState, useEffect } from "react";
import apiClient from "../../utils/apiClient";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeListingFilter } from "../../redux/slice/listingFliterSlice";

const useListingData = () => {
  const [listing, setListing] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const filters = useSelector((store) => store.listingFilter.listingFilter);
  console.log("Seletct filter from you in redux", filters);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`${BASE_URL}/getAllListings`, {
          params: filters,
        });
        // API returns { listings: [...] }
        setListing(response.data.listings || []);
        setError(null);
      } catch (err) {
        setError(err);
        // if API gave 404, clear all filters
        if (err.response?.status === 404) {
          dispatch(removeListingFilter());
          setListing([]); // clear old listings
        }
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [JSON.stringify(filters)]);

  return { listing, error, loading };
};

export default useListingData;
