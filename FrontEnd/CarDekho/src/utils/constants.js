import { MdOutlineAdminPanelSettings, MdOutlineSubscriptions, MdSubscriptions } from "react-icons/md";
import { FaCarSide, FaDollarSign, FaHistory, FaRegUser, FaSalesforce, FaSellcast, FaStore } from "react-icons/fa";
import { RiChatPrivateLine, RiCustomerService2Line } from "react-icons/ri";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { BsGrid1X2Fill, BsBookHalf, BsPeopleFill, BsMenuButtonWideFill, BsFillGearFill } from "react-icons/bs";
import { FaUserCircle, FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { IoScaleSharp } from "react-icons/io5";
import { PiSecurityCamera } from "react-icons/pi";
import { BiCar } from "react-icons/bi";


export const BASE_URL = "http://localhost:4001/app";

export const ROLE_MAP = {
  1: { text: "Admin", path: "/admin", icon: MdOutlineAdminPanelSettings },
  2: { text: "Citizen", path: "/profile", icon: FaRegUser },
  3: { text: "Dealer", path: "/dealer", icon: FaStore },
  4: { text: "Support Staff", path: "/support", icon: RiCustomerService2Line },
  5: { text: "Verifier", path: "/verifier", icon: HiOutlineBadgeCheck },
};


// Sidebar items by role
export const SIDEBAR_ITEMS = {
  1: [
    { path: "/admin/dashboard", label: "Dashboard", icon: BsGrid1X2Fill },
    { path: "/admin/complaints", label: "Complaints", icon: BsBookHalf },
    { path: "/admin/users", label: "Users", icon: BsPeopleFill },
    { path: "/admin/reviews", label: "Reviews", icon: BsMenuButtonWideFill },
    { path: "/admin/settings", label: "Settings", icon: BsFillGearFill },
  ],
  2: [
    { path: "/profile", label: "My Profile", icon: FaUserCircle },
    { path: "/wishlist", label: "Wishlist", icon: FaHeart },
    { path: "/purchases", label: "My Purchases", icon: FaShoppingCart },
    { path: "/edit", label: "Edit Profile", icon: FaEdit },
    { path: "/my-Listing", label: "My Listings", icon: FaCarSide },
    { path: "/list-car", label: "Add Listing", icon: BiCar },
    { path: "/my-Sales", label: "My Sales", icon: FaSellcast },
    { path: "/my-earning", label: "My Earnings", icon: FaDollarSign },
    { path: "/subscription", label: "Subscription Plans", icon: MdOutlineSubscriptions },
    { path: "/history", label: "Order History", icon: FaHistory },
    { path: "/privacy", label: "Privacy & Security", icon: PiSecurityCamera },
  ],
  

};
