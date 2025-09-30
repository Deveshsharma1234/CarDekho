import { useCallback } from "react";
import apiClient from "../../utils/apiClient";
import { BASE_URL } from "../../utils/constants";

const useAddToWishList = () => {
  const addToWishList = useCallback(async (listingId) => {
    const response = await apiClient.post(`${BASE_URL}/addWish`, {
      ListingId: listingId,
    });
    return response.data;
  }, []);

  return addToWishList;
};
export default useAddToWishList;
