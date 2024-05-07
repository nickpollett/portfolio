import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { Link } from "react-router-dom";

import Modal from "../Utility/Modal";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// get all user roles
function getUserRoles() {
    return useQuery(["userRoles"], async () => {
        const data = await request(
            endpoint,
            gql`
                query {
                    userRoles {
                        id
                        name
                        permissions
                    }
                }
            `,
        );
        return data;
    });
}

// user roles item
export default function UserRoles() {
    const { status, data, error, isFetching, refetch } = getUserRoles();
    const [showModal, setShowModal] = useState(false);

    // create a new user role
    const createUserRole = useMutation({
        mutationFn: (type) => {
            return request(
                endpoint,
                gql`
                    mutation{
                        createUserRole(name: "${type.name}", permissions: "${type.permissions}"){
                            id
                            name
                        }
                    }`,
            ).then(() => refetch());
        },
    });

    return (
        <>
            {showModal ? (
                <Modal>
                    <div className="fixed top-0 left-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none grid grid-cols-1 place-content-center place-items-center bg-gray-600 bg-opacity-70">
                        <div className="bg-neutral drop-shadow-2xl p-3 m-2 rounded-3xl place-content-center place-items-center grid grid-cols-1 shadow-lg">
                            <h1 className="text-2xl text-white m-4">
                                New User Role
                            </h1>
                            <input
                                id="name"
                                className="input input-primary input-bordered w-80 m-1"
                                type="text"
                                placeholder="Name"
                            />
                            <input
                                id="permissions"
                                className="input input-primary input-bordered w-80 m-1"
                                type="text"
                                placeholder="Permissions"
                            />
                            <div className="m-1">
                                <button
                                    type="submit"
                                    className="btn btn-alert m-1"
                                    onClick={() => {
                                        createUserRole.mutate({
                                            name: document.getElementById(
                                                "name",
                                            ).value,
                                            permissions:
                                                document.getElementById(
                                                    "permissions",
                                                ).value,
                                        });
                                        setShowModal(false);
                                    }}
                                >
                                    Create
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-accent m-1"
                                    onClick={() => {
                                        setShowModal(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            ) : null}

            <div className="grid grid-cols-2">
                <div action="edit" className="m-1 p-1">
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Create
                    </button>
                </div>
            </div>
            <table className="border border-slate-500 table-fixed">
                <thead>
                    <tr>
                        <th className="border border-slate-600 w-52">Name</th>
                        <th className="border border-slate-600 w-60">
                            Permissions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.userRoles.length === 0 ? (
                        <tr>
                            <td>No User Roles found</td>
                        </tr>
                    ) : (
                        data?.userRoles.map((role) => (
                            <tr key={role.id}>
                                <td className="border border-slate-600 w-52">
                                    <Link to={`/user/role/${role.id}`}>
                                        <button className="font-bold py-2 px-4 rounded">
                                            {role.name}
                                        </button>
                                    </Link>
                                </td>
                                <td className="border border-slate-600 w-60 text-center">
                                    {role.permissions == ""
                                        ? "Not Set"
                                        : role.permissions}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}

