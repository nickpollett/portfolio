import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

// import components
import NavItem from "./NavItem";
import ProfileButton from "./ProfileButton";

import { AuthContext } from "../Auth/UserContext";

const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

// Sidebar navigation component
export default function Sidebar() {
    const { checkLoginState, localUserRole, userID, user } =
        useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(`${serverUrl}/auth/logout`);
            // Check login state again
            checkLoginState();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            className={` ${
                open ? "w-16" : "w-44"
            } flex flex-col  p-3 shadow duration-300 bg-neutral`}
        >
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <NavLink
                        to="/"
                        className={`text-xl font-bold text-white ${
                            open ? "invisible" : "visible"
                        }`}
                    >
                        370 CRM
                    </NavLink>

                    <button onClick={() => setOpen(!open)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={`w-6 h-6 ${
                                open
                                    ? "fixed top-0 left-0 right-0 mx-5 my-4 z-10"
                                    : "z-0"
                            } `}
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-1 text-sm">
                        <NavItem
                            key={"dashboard"}
                            open={open}
                            nav={"/dashboard"}
                            title={"Dashboard"}
                            icon={
                                <>
                                    {" "}
                                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                                </>
                            }
                        />

                        <NavItem
                            key={"clients"}
                            open={open}
                            nav={"/clients"}
                            title={"Clients"}
                            icon={
                                <>
                                    {" "}
                                    <path
                                        fillRule="evenodd"
                                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                        clipRule="evenodd"
                                    />{" "}
                                </>
                            }
                        />

                        <NavItem
                            key={"projects"}
                            open={open}
                            nav={"/projects"}
                            title={"Projects"}
                            icon={
                                <>
                                    {" "}
                                    <path
                                        fillRule="evenodd"
                                        d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
                                        clipRule="evenodd"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
                                        clipRule="evenodd"
                                    />{" "}
                                </>
                            }
                        />

                        {localUserRole == "Admin" ||
                        localUserRole == "Accountant" ? (
                            <NavItem
                                key={"invoices"}
                                open={open}
                                nav={"/invoices"}
                                title={"Invoices"}
                                icon={
                                    <>
                                        {" "}
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                                        />{" "}
                                    </>
                                }
                            />
                        ) : null}

                        {localUserRole == "Admin" ? (
                            <NavItem
                                key={"admin"}
                                open={open}
                                nav={"/admin"}
                                title={"Admin"}
                                icon={
                                    <>
                                        {" "}
                                        <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                                    </>
                                }
                            />
                        ) : null}

                    </ul>
                    <div>
                        <ProfileButton
                            open={open}
                            userID={userID}
                            user={user}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

