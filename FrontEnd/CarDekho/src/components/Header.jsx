import { Link, useLocation } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { PiInfoBold } from "react-icons/pi";
import { BiSolidLogIn } from "react-icons/bi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { IoLogOut } from "react-icons/io5";
import useLogout from "../hooks/users/useLogout";
import { ToastContainer } from "react-toastify";
import { ROLE_MAP } from '../utils/constants';
import logo from '../assets/logo.jpg';
import { toggleCandleCursor } from "../redux/slice/candleSlice";
import getBgClass from "../utils/css/getBackground";

const Header = () => {
    const isLoggedIn = useSelector(store => store.user.isLoggedIn);
    const user = useSelector(store => store.user.user);
    const candleEnabled = useSelector(store => store.candle.isOn)
    const dispatch = useDispatch();
    const logout = useLogout();
    const location = useLocation();
    const IconComponent = ROLE_MAP[user?.RoleId]?.icon;

    const handleLogout = () => {
        logout();
    };



    return (
        <div className={`navbar ${getBgClass(location.pathname)} shadow-md sticky top-0 z-10 flex items-center justify-between  px-4 py-2`}>
            <ToastContainer />
            <div className="flex-1 ">
                <Link to={"/"} className="inline-block">
                    <div className="avatar pl-10">
                        <div className="ring-primary ring-offset-base-100 w-20  rounded-full ring-2 ring-offset-2">
                            <img src={logo} alt="logo" />
                        </div>
                    </div>
                </Link>
            </div>
            <div className="flex gap-3 items-center justify-center pr-6 ">
                <div>
                    <input type="checkbox" onChange={() => dispatch(toggleCandleCursor())} checked={candleEnabled} className="toggle toggle-secondary" />
                </div>
                <Link to="/">
                    <MdHomeFilled className="size-11 text-indigo-600 hover:text-indigo-700 transition-colors" />
                </Link>

                <Link to="/about-us">
                    <div className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors">
                        {/* <SiAboutdotme className="size-5" /> */}
                        <PiInfoBold></PiInfoBold>
                        <span className="font-medium">About Us</span>
                    </div>
                </Link>

                <a
                    href="https://consumeraffairs.nic.in/latest-updates"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-xl hover:bg-pink-900 transition-colors"
                >
                    <span className="font-medium">Knowledge Base</span>
                </a>


                {isLoggedIn && ROLE_MAP[user?.RoleId] && (
                    <Link
                        className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700 transition-colors"
                        to={ROLE_MAP[user?.RoleId]?.path}
                    >
                        {IconComponent && <IconComponent />}
                        <span className="font-medium">
                            {user?.RoleId === 2
                                ? `Hello, ${user?.FirstName}`
                                : ROLE_MAP[user?.RoleId]?.text}
                        </span>
                    </Link>
                )}




                <div>
                    {isLoggedIn ? (
                        <Link
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-900 transition-colors"
                        >
                            <IoLogOut className="size-5" />
                            <span className="font-medium">Logout</span>
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            <BiSolidLogIn className="size-5" />
                            <span className="font-medium">Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;