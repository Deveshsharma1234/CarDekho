import { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import { BASE_URL } from "../../utils/constants";

const useGetUserById = (userId) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient.get(`${BASE_URL}/user/${userId}`);
        if (res.status === 200) {
          setUser(res.data.user);
        }
      } catch (err) {
        setError(err);
      }
    };
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return { user, error };
};

export default useGetUserById;
