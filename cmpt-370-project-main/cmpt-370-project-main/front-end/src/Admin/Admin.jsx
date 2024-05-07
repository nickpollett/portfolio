import { useEffect, useContext, useState } from "react";

import Users from "./Users";
import LocationList from "./LocationList";
import UserRoles from "./UserRoles";
import ProjectTypes from "./ProjectTypes";
import { AuthContext } from "../Auth/UserContext";

import DataImport from "./DataImport";
import AccordionItem from "./AccordionItem";

// admin page
export default function Admin() {
    const {
        user,
        loggedIn,
        userID,
        localUserRole,
        userRole,
        localUserID,
        userLoggedIn,
    } = useContext(AuthContext);

    const [role, setRole] = useState(null);

    useEffect(() => {
        setRole(localUserRole);
    }, [localUserRole]);

    if (role !== "Admin") {
        return <div>Not Authorized</div>;
    }

    return (
        <div className="flex flex-col">
            <div className="text-4xl text-bold mt-4 mb-4">Admin</div>

            <AccordionItem title={"User Roles"} value={<UserRoles />} />

            <AccordionItem title={"Users"} value={<Users />} />

            <AccordionItem title={"Locations"} value={<LocationList />} />

            <AccordionItem title={"Project Types"} value={<ProjectTypes />} />

            <AccordionItem title={"Data Import"} value={<DataImport />} />
        </div>
    );
}
