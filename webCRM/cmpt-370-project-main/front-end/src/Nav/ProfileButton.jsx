import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Auth/UserContext";

const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

// Profile button component
export default function ProfileButton({ open, userID, user }) {
    const { checkLoginState, clear } = useContext(AuthContext);
    const navigate = useNavigate();
    const [nav, setNav] = useState(false);

    const [time, setTime] = useState(new Date().toLocaleString());

    // logout function
    const handleLogout = async () => {
        try {
            await axios.post(`${serverUrl}/auth/logout`);
            // Check login state again
            checkLoginState();
            clear();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (nav) {
            navigate("/");
        }
    }, [nav]);

    useEffect(() => {
        const intervalId = setInterval(
            setTime(
                new Date().toLocaleString(undefined, {
                    dateStyle: "short",
                    timeStyle: "short",
                }),
            ),
            1000,
        );

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div className="fixed bottom-10 items-center justify-between dropdown dropdown-top">
                <div
                    tabIndex={0}
                    className="m-1 rounded-sm hover:bg-neutral-focus"
                >
                    <div className="grid grid-cols-[25px_auto] p-2 space-x-3 rounded-md items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {open ? null : (<span
                            className={` ${open ? "invisible" : "visible"
                                } text-gray-100 items-center`}
                        >
                            {user ? user?.name : "User"}
                        </span>)}
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li>
                        <Link to={`/user/` + userID}>Profile</Link>
                    </li>
                    <li onClick={() => { handleLogout(); setNav(true)}}>
                        <a>Log Out</a>
                    </li>
                </ul>
            </div>

            {open ? null : (
                <div className="fixed bottom-4 items-center justify-between text-white">
                    {time}
                </div>
            )}
        </>
    );
}
