import { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import { BASE_URL } from "../../utils/constants";

const useListingDataWithCarId = ({ listingId }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    const fetchListingDataWithCarId = async () => {
      try {
        const response = await apiClient.get(
          `${BASE_URL}/ListingById/${listingId}`
        );
        if (response.status === 200) setData(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchListingDataWithCarId();
  }, [listingId]);

  return {data, error}
};

export default useListingDataWithCarId;
