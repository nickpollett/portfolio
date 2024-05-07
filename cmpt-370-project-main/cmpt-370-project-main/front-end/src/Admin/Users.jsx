import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { Link } from "react-router-dom";

import Modal from "../Utility/Modal";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// get all users
function getUsers() {
    return useQuery(["users"], async () => {
        const data = await request(
            endpoint,
            gql`
                query {
                    users {
                        id
                        name
                        active
                        user_role {
                            id
                            name
                        }
                    }
                }
            `,
        );
        return data;
    });
}
// user list item
export default function Users() {
    const { status, data, error, isFetching, refetch } = getUsers();
    const [showModal, setShowModal] = useState(false);

    // create a new user
    const createUser = useMutation({
        mutationFn: (user) => {
            return request(
                endpoint,
                gql`
                    mutation{
                        createUser(name: "${user.name}", email: "${user.email}", phone_number: "${user.phone_number}"){
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
                                New User
                            </h1>
                            <input
                                id="name"
                                className="input input-primary input-bordered w-80 m-1"
                                type="text"
                                placeholder="Name"
                            />
                            <input
                                id="email"
                                className="input input-primary input-bordered w-80 m-1"
                                type="text"
                                placeholder="Email"
                            />
                            <input
                                id="phone_number"
                                className="input input-primary input-bordered w-80 m-1"
                                type="text"
                                placeholder="Phone Number"
                            />
                            <div className="m-1">
                                <button
                                    type="submit"
                                    className="btn btn-alert m-1"
                                    onClick={() => {
                                        createUser.mutate({
                                            name: document.getElementById(
                                                "name",
                                            ).value,
                                            email: document.getElementById(
                                                "email",
                                            ).value,
                                            phone_number:
                                                document.getElementById(
                                                    "phone_number",
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
                        <th className="border border-slate-600 w-48">Name</th>
                        <th className="border border-slate-600 w-32">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.users?.length === 0 ? (
                        <tr>
                            <td>No Users</td>
                        </tr>
                    ) : (
                        data?.users.map((user) => (
                            <tr key={user.id}>
                                <td className="border border-slate-600 text-left">
                                    <Link to={`/user/${user.id}`}>
                                        <button className="font-bold py-2 px-4 rounded">
                                            {user.name}
                                        </button>
                                    </Link>
                                </td>
                                <td className="border border-slate-600 text-center">
                                    {user.user_role?.name
                                        ? user.user_role.name
                                        : "Not Set"}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}

