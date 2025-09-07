import { useEffect, useReducer, useState } from "react";
import apiClient from "../../utils/apiClient";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addBrands } from "../../redux/slice/carSlice";

const useBrandData = () => {
    const [brand , setBrand] = useState([]);
    const [error, setError] = useState(null); 
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchBrand = async ()=>{
            try {
                const response = await apiClient.get(`${BASE_URL}/brands`);
                setBrand(response.data)
                dispatch(addBrands(response.data))
            } catch (error) {
                setError(error) ;
            }
        }
        fetchBrand();
    },[])
    return {brand , error}  
};

export default useBrandData;
