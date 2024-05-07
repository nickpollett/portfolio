import { NavLink } from "react-router-dom";

// Nav item component, for sidebar navigation
export default function NavItem({ open, nav, icon, title }) {
    return (
        <li className="rounded-sm hover:bg-neutral-focus">
            <NavLink
                to={nav}
                className={({ isActive }) =>
                    isActive
                        ? "grid grid-cols-[25px_auto] p-2 space-x-3 rounded-md items-center text-white"
                        : "grid grid-cols-[25px_auto] p-2 space-x-3 rounded-md items-center"
                }
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={title === "Invoices" ? "none" : "currentColor"}
                    strokeWidth={1.5}
                    stroke={title === "Invoices" ? "currentColor" : ""}
                    className="w-6 h-6 grid-auto"
                >
                    {icon}{" "}
                </svg>

                <span
                    className={` ${
                        open ? "invisible" : "visible"
                    } text-gray-100 items-center`}
                >
                    {title}
                </span>
            </NavLink>
        </li>
    );
}
