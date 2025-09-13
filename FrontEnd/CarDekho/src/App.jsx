import { Outlet, useNavigate } from "react-router"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { useSelector } from "react-redux"
import { useLocation } from "react-router"
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import apiClient from "./utils/apiClient";
import { BASE_URL } from "./utils/constants"
import CustomCursor from "./components/shared/CustomCursor"
function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(store => store.user.isLoggedIn);//extracting from store
  const location = useLocation(); //for getting properties of browswer like window.location.pathname
  const navigate = useNavigate(); //react router dom 
  const hiddenPaths = ["/login", "/register"];
  const shouldHideHeaderFooter = hiddenPaths.includes(location.pathname); //on login and register hide header and footer
  const isCandleCursorOn = useSelector(store => store.candle.isOn)
  // useEffect(() => {
  //   apiClient.get(BASE_URL + "/ping/pingWithAuth");
  //   navigate('/login')
  // }, [navigate])

  return (
    <>
      {/* Add CustomCursor at root */}
     { isCandleCursorOn && <CustomCursor />}

      <div className="min-h-screen flex flex-col">
        {!shouldHideHeaderFooter && <Header />}
        <main className="flex-1 ">
          <Outlet />
        </main>
        {!shouldHideHeaderFooter && <Footer />}
      </div>



    </>
  )
}

export default App
