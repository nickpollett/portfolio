import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Auth/UserContext";

// import components
import Projects from "./Projects";
import Clients from "./Clients";

// developer user options, items to login as different users, commented out in dashboard component
function DevUserOptions() {
    const {
        user,
        loggedIn,
        userID,
        localUserRole,
        userRole,
        localUserID,
        userLoggedIn,
    } = useContext(AuthContext);

    const [userLog, setUserLog] = useState(false);
    const [localUser, setLocalUser] = useState(null);

    useEffect(() => {
        setUserLog(loggedIn);
    }, [loggedIn]);

    useEffect(() => {
        setLocalUser(userID);
    }, [userID]);

    useEffect(() => {
        userRole(localUserRole);
    }, [localUserRole]);

    return (
        <div className="mt-2">
            <>Click a button to login as a different user: </>
            <button
                className="border-2 px-2 mx-2"
                onClick={() => {
                    userLoggedIn(true);
                    localUserID(1);
                    userRole("Admin");
                }}
            >
                Admin
            </button>
            <button
                className="border-2 px-2 mx-2"
                onClick={() => {
                    userLoggedIn(true);
                    localUserID(2);
                    userRole("Accountant");
                }}
            >
                Accountant
            </button>
            <button
                className="border-2 px-2 mx-2"
                onClick={() => {
                    userLoggedIn(true);
                    localUserID(3);
                    userRole("User");
                }}
            >
                User
            </button>
        </div>
    )
}

// Dashboard component
export default function Dashboard() {
    const {
        user,
        loggedIn,
        userID,
        localUserRole,
        userRole,
        localUserID,
        userLoggedIn,
    } = useContext(AuthContext);

    const [userLog, setUserLog] = useState(false);
    const [localUser, setLocalUser] = useState(null);

    useEffect(() => {
        setUserLog(loggedIn);
    }, [loggedIn]);

    useEffect(() => {
        setLocalUser(userID);
    }, [userID]);

    useEffect(() => {
        userRole(localUserRole);
    }, [localUserRole]);

    if (userLog === true) {
        return (
            <>
                <div className="flex flex-col">
                    
                   {/* options to display development info */}
                    {/* <DevUserOptions /> */}

                    {/* <div>
                        You are logged in as {user?.name || "test user"} with
                        local account id: {localUser || ""}
                    </div> */}

                    <div>
                        {localUser != null ? (
                            <>
                                <Projects
                                    key={`project_user?.name`}
                                    userID={localUser}
                                />
                                <Clients
                                    key={`client_user?.name`}
                                    userID={localUser}
                                />
                            </>
                        ) : (
                            <div>Loading</div>
                        )}
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="flex flex-col"> 
                   
                    {/* <DevUserOptions /> */}

                    {localUserRole != null ? (
                        <div>You are logged in as {localUserRole}</div>
                    ) : (
                        <div>You are not logged in</div>
                    )}
                </div>
            </>
        );
    }
}
