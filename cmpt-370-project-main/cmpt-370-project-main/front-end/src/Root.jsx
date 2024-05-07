import { Outlet } from "react-router-dom";

// import components
import Sidebar from "./Nav/Sidebar";

// root component, sidebar nav and outlet
export default function Root() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-cols-1 mx-4">
                <Outlet />
            </div>
        </div>
    );
}
