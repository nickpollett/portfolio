import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

const serverUrl = import.meta.env.VITE_APP_SERVER_URL;
const endpoint = import.meta.env.VITE_API_ENDPOINT;

const AuthContext = createContext();

// get user by email from oauth login
function getLocalUser(user) {
    return useQuery(
        ["user"],
        async () => {
            const data = await request(
                endpoint,
                gql`
            query{
                userEmail(email: "${user.email}"){
                    id
                    name
                    email
                    user_role{
                        name
                    }
              }
            }`,
            );
            return data;
        },
        {
            enabled: user !== null,
        },
    );
}

// auth context provider
const AuthContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(null);
    const [user, setUser] = useState(null);
    const [userID, setUserID] = useState(null);
    const [localUserRole, setLocalUserRole] = useState(null);

    const local = getLocalUser(user);

    useEffect(() => {
        if (local.data != null) {
            setUserID(local.data?.userEmail.id);
            setLocalUserRole(local.data?.userEmail?.user_role?.name);
        }
    }, [local]);

    const userRole = (role) => setLocalUserRole(role);
    const localUserID = (user) => setUserID(user);
    const userLoggedIn = (log) => setLoggedIn(log);

    const clear = () => {
        setLoggedIn(null);
        setUser(null);
        setUserID(null);
        setLocalUserRole(null);
    };

    const checkLoginState = useCallback(async () => {
        try {
            const {
                data: { loggedIn: logged_in, user },
            } = await axios.get(`${serverUrl}/auth/logged_in`);

            setLoggedIn(logged_in);
            user && setUser(user);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        checkLoginState();
    }, [checkLoginState]);

    return (
        <AuthContext.Provider
            value={{
                loggedIn,
                checkLoginState,
                user,
                userID,
                localUserRole,
                userRole,
                localUserID,
                userLoggedIn,
                clear,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
