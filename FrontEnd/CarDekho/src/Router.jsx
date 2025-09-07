import { createBrowserRouter } from "react-router";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";


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
                element: <About /> // Open to all (assuming about us doesn't require login)
            },
            {
                // No specific 'allowedRoles' means only 'isLoggedIn' check applies
                path: "/", // Keep it at the root for common user-level protection
                element: <ProtectedRoute />, // Just check if logged in
                children: [
                    {
                        path: "/profile",
                        element: "<Profile />"
                    },
                    {
                        path: "/edit-profile",
                        element: "<EditProfile />"
                    },
                ]
            },
            // Admin routes that require specific roles (1, 2, 3)
            {
                path: "/admin",
                element: <ProtectedRoute allowedRoles={[1]} />, // Only roles 1, 2, 3
                children: [
                    {
                        // The Admin component will be the layout for all admin sub-routes
                        element: "<Admin />",
                        children: [
                            {
                                index: true,
                                element:" <AdminWelcome />"
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
                                element:" <Users/>"
                            },
                            {
                                path: "register", // Admin can register other admins/users
                                element: "<AdminRegister/>"
                            },
                           
                        ]
                    }
                ]
            }
        ]
    }
]);

export default appRouter;