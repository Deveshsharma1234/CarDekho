import { useDispatch } from "react-redux";
import apiClient from "../../utils/apiClient";
import { BASE_URL } from "../../utils/constants";
import { use, useEffect, useState } from "react";
import { addCities } from "../../redux/slice/LocationSlice";
import { useNavigate } from "react-router";

const useCityData = () => {
    const [cities , setCities] = useState([]);
    const [error, setError] = useState(null); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchCities = async ()=>{
            try {
                const response = await apiClient.get(`${BASE_URL}/citiesWithCarListed`);
                if(response.status !==200) navigate("/login");
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
