import { useDispatch } from "react-redux";
import apiClient from "../../utils/apiClient";
import { BASE_URL } from "../../utils/constants";
import { useEffect, useState } from "react";
import { addCities } from "../../redux/slice/LocationSlice";

const useCityData = () => {
    const [cities , setCities] = useState([]);
    const [error, setError] = useState(null); 
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchCities = async ()=>{
            try {
                const response = await apiClient.get(`${BASE_URL}/citiesWithCarListed`);
                setCities(response.data)
                dispatch(addCities(response.data))
            } catch (error) {
                setError(error) ;
            }
        }
        fetchCities();
    },[])
    return { cities , error}  
};

export default useCityData;
