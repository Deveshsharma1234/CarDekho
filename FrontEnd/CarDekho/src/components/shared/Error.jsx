import { useLocation, useRouteError } from "react-router-dom";
import CustomCursor from "./CustomCursor";
import { useSelector } from "react-redux";
import getBgClass from "../../utils/css/getBackground";
const Error = ()=>{
  const isCandleCursorOn = useSelector((state => state.candle.isOn))
    const error = useRouteError();
    const location = useLocation();
    console.log(error);
    return (
      <div className={`error flex flex-col items-center ${getBgClass(location.pathname)}  justify-center min-h-screen bg-gray-100 text-center p-6`}>
          <h1 className="text-8xl mb-4">😆</h1>
          <h1 className="text-4xl font-bold text-white mb-2">Opps!!!!</h1>
          <h2 className="text-2xl text-white mb-4">Something Went Wrong!😂</h2>
          <h2 className="text-xl text-white mb-2">{error.data}</h2>
          <p className="text-lg text-white mb-4">Status: {error.status}</p>
          { isCandleCursorOn && <CustomCursor />}
        </div>
      );
}
export default Error;