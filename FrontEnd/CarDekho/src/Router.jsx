import { createBrowserRouter } from "react-router";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./components/shared/Error";
import Admin from "./pages/Admin/Admin";
import AdminWelcome from "./components/Admin/AdminWelcome";
import Listing from "./pages/Cars/Listing";
import ViewCarDetails from "./pages/Cars/ViewCarDetails";
import Profile from "./pages/User/Profile";
import UserProfile from "./components/User/UserProfile";
import AddListing from "./components/Cars/AddListing";


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home /> // Open to all
            },
            {
                path: "/register",
                element: <Register /> // Open to all
            },
            {
                path: "/login",
                element: <Login /> // Open to all
            },
            {
                path: "/about-us",
                element: <About />
            },
            {
                path: "/cars-by-brand/:BrandId",
                element: <Listing />
            },
            {
                path: "/cars-by-city/:CityId",
                element: <Listing />
            },
            {
                path: "/ViewCarDetails/:listingId",
                element: <ViewCarDetails />

            },
            {
                // No specific 'allowedRoles' means only 'isLoggedIn' check applies
                path: "/profile", // Keep it at the root for common user-level protection
                element: (
                    <ProtectedRoute>
                        <Profile />  {/* ✅ this is the layout with sidebar + outlet */}
                    </ProtectedRoute>
                ), // Just check if logged in
                children: [
                    {
                        element: <Profile />,     // ✅ layout with sidebar + <Outlet />
                        children: [
                            {
                                index: true,
                                element: <UserProfile />  // ✅ this goes inside Profile’s <Outlet />
                            },
                            {
                                path: "me",
                                element: <UserProfile />
                            },
                            {
                                path: "list-car",
                                element:<AddListing/>
                            }
                        ]
                    },
                ],
            },

            // Admin routes that require specific roles (1, 2, 3)
            {
                path: "/admin",
                element: <ProtectedRoute allowedRoles={[1]} />, // Only roles 1, 2, 3
                children: [
                    {
                        // The Admin component will be the layout for all admin sub-routes
                        element: <Admin />,
                        children: [
                            {
                                index: true,
                                element: <AdminWelcome />
                            },
                            {
                                path: "dashboard",
                                element: "<AdminDashboardOverview/>"
                            },
                            {
                                path: "settings", // Admin specific settings or their profile, still protected by admin route
                                element: "<Profile/>"
                            },
                            {
                                path: "users",
                                element: " <Users/>"
                            },
                            {
                                path: "register", // Admin can register other admins/users
                                element: "<AdminRegister/>"
                            },

                        ]
                    }
                ]
            }
        ],
        errorElement: <Error />

    }
]);

export default appRouter;