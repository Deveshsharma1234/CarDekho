import { Link, useLocation } from "react-router-dom";
import { RiAdminFill, RiCloseCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../../redux/slice/toggleSideBarSlice";
import getBgClass from "../../utils/css/getBackground";
import { SIDEBAR_ITEMS } from "../../utils/constants";

const SideBar = ({ role = "admin" }) => {
  const isOpen = useSelector((store) => store.toggleSideBar.isOpen);
  const dispatch = useDispatch();
  const toggleSidebar = () => dispatch(toggleSideBar());
  const location = useLocation();
  role = useSelector((store) => store.user.user?.RoleId);
  const user = useSelector((store) => store.user.user);


  const menuItems = SIDEBAR_ITEMS[role] || [];

  return (
    <aside
      className={`bg-base-200 transition-all ${getBgClass(location.pathname)} 
      backdrop-blur-2xl duration-300 ${isOpen ? "w-80" : "w-7"}`}
    >
      {/* Handle when closed */}
      {!isOpen && (
        <div
          className={`h-full flex items-center justify-center cursor-pointer ${getBgClass(
            location.pathname
          )} text-white`}
          onClick={toggleSidebar}
        >
          ❯
        </div>
      )}

      {/* Sidebar content */}
      {isOpen && (
        <div className="flex flex-col h-full w-80">
          <div className="flex justify-between items-center px-4 py-4 border-b border-base-300">
            <div className="text-xl font-bold flex items-center gap-2">
              <RiAdminFill className="text-primary text-2xl" />
              {role === 1 ? "CAR DEKHO" : user.FirstName + " " +user.LastName}
            </div>
            <button className="btn btn-sm btn-ghost" onClick={toggleSidebar}>
              <RiCloseCircleFill className="text-2xl text-gray-500 hover:text-red-700 transition duration-300 cursor-pointer" />
            </button>
          </div>

          <ul className="menu p-4 text-base-content">
            {menuItems.map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <Link to={path} className="flex items-center gap-2 mb-4">
                  {Icon && <Icon className="text-2xl text-gray-50 hover:text-red-700 transition duration-300" />} 
                  <h1 className="font-semibold text-lg ">{label}</h1>
                </Link>
              </li>
            ))}
          </ul>

        </div>  
      )}
    </aside>
  );
};

export default SideBar;
