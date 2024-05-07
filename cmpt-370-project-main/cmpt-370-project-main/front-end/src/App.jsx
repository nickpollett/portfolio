import { useEffect, useRef, useContext } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    useNavigate,
    Link,
} from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import axios from "axios";

import Root from "./Root";
import ErrorPage from "./ErrorPages/Error-Page";

import Clients from "./Client/Clients";
import Client from "./Client/Client";
import EditClient from "./Client/Client_edit";
import Contacts from "./Client/Contacted";

import Admin from "./Admin/Admin";
import Dashboard from "./Dashboard/Dashboard";

import User from "./User/User";
import EditUser from "./User/User_edit";

import UserRole from "./User/UserRole";
import EditUserRole from "./User/UserRole_edit";

import Location from "./Location/Location";
import EditLocation from "./Location/Location_edit";

import Invoices from "./invoice/Invoices";
import Invoice from "./invoice/Invoice";

import Projects from "./Projects/Projects";
import Project from "./Projects/Project";
import EditProject from "./Projects/Project_edit";

import ProjectType from "./Projects/ProjectType";
import EditProjectType from "./Projects/ProjectType_edit";

import { AuthContext, AuthContextProvider } from "./Auth/UserContext";

const queryClient = new QueryClient();

axios.defaults.withCredentials = true;

const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

// Home page, either dashboard or login page
const Home = () => {
    const navagate = useNavigate();
    const { loggedIn } = useContext(AuthContext);

    if (loggedIn === true) navagate("/dashboard");
    if (loggedIn === false) return <Login />;
    return <></>;
};

// Dev login button, can be uncommented on login page to navigate to dashboard without login
function DevLoginButton() {
    return (
        <div className="p-4">
            <Link
                to="/dashboard"
                className="border border-black p-2"
            >
                Dev - no login
            </Link>
        </div>
    )
}

// Login page
const Login = () => {
    const handleLogin = async () => {
        try {
            // Gets authentication url from backend server
            const {
                data: { url },
            } = await axios.get(`${serverUrl}/auth/url`);
            // Navigate to consent screen
            window.location.assign(url);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="navbar bg-base-100">
                <a className="btn btn-ghost normal-case text-xl">370 CRM</a>
            </div>
            <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
                <div className="md:w-1/3 max-w-sm">
                    <img
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        alt="Sample image"
                    />
                </div>
                <div className="md:w-1/3 max-w-sm">
                    <div className="text-center md:text-left">
                        <label className="mr-1">Sign in with</label>
                        <button
                            onClick={handleLogin}
                            type="button"
                            className="mx-1 h-9 w-20 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
                        >
                            <div>Google</div>
                        </button>

                        {/* <DevLoginButton /> */}
                    </div>
                </div>
            </section>
        </>
    );
};

// Callback page, handles login
const Callback = () => {
    const called = useRef(false);
    const { checkLoginState, loggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (loggedIn === false) {
                try {
                    if (called.current) return; // prevent rerender caused by StrictMode
                    called.current = true;
                    const res = await axios.get(
                        `${serverUrl}/auth/token${window.location.search}`,
                    );
                    console.log("response: ", res);
                    checkLoginState();

                    navigate("/dashboard");
                } catch (err) {
                    console.error(err);
                    navigate("/");
                }
            } else if (loggedIn === true) {
                navigate("/");
            }
        })();
    }, [checkLoginState, loggedIn, navigate]);

    return <></>;
};

// create app router
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />}></Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="clients"
                    element={<Clients />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="projects"
                    element={<Projects />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="project/:id"
                    element={<Project />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="project/:id/edit"
                    element={<EditProject />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="admin"
                    element={<Admin />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="dashboard"
                    element={<Dashboard />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="auth/callback"
                    element={<Callback />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="/client/:id"
                    element={<Client />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="/client/:id/edit"
                    element={<EditClient />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="/client/:id/contacts"
                    element={<Contacts />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="/user/:id"
                    element={<User />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="/user/:id/edit"
                    element={<EditUser />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="/user/role/:id"
                    element={<UserRole />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="/user/role/:id/edit"
                    element={<EditUserRole />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="/project/type/:id"
                    element={<ProjectType />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="/project/type/:id/edit"
                    element={<EditProjectType />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="/location/:id"
                    element={<Location />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="/location/:id/edit"
                    element={<EditLocation />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="/invoices"
                    element={<Invoices />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="/invoice/:id"
                    element={<Invoice />}
                    errorElement={<ErrorPage />}
                />
            </Route>
            <Route path="/" element={<Root />}>
                <Route
                    path="/invoice/:id/edit"
                    element={<Invoice />}
                    errorElement={<ErrorPage />}
                />
            </Route>
        </>,
    ),
);

// App component
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <RouterProvider router={router} />
            </AuthContextProvider>
        </QueryClientProvider>
    );
}

// render app
createRoot(document.getElementById("root")).render(<App />);
