import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import apiClient from "../../utils/apiClient";
import { addFilter } from "../../redux/slice/filterSlice";

const useFilterData = () => {
  const [filter, setFilter] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const fetchFilter = async () => {
    try {
      const response = await apiClient.get(`${BASE_URL}/getFilter`);
      setFilter(response.data);
      dispatch(addFilter(response.data));
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    fetchFilter();
  }, []);
  return { filter, error };
};

export default useFilterData;

