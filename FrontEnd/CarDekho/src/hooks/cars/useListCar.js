import { useState } from "react";
import apiClient from "../../utils/apiClient";
import { BASE_URL } from "../../utils/constants";

const useListCar = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const listCar = async (carData, images) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Step 1: Create the listing
      const res = await apiClient.post(`${BASE_URL}/listCar`, carData);
      const listingId = res.data.ListingId; // check backend response key

      // Step 2: Upload images if provided
      if (images && images.length > 0) {
        const formData = new FormData();
        images.forEach((file) => formData.append("images", file));

        await apiClient.post(`${BASE_URL}/listCar/${listingId}/images`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setSuccess("Listing created successfully!");
      return { listingId, success: true };
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { listCar, loading, error, success };
};

export default useListCar;
