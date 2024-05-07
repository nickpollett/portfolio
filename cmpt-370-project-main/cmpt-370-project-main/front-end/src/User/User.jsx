import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { useParams, Form, useNavigate } from "react-router-dom";

import getUser from "./getUser";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// User view component
export default function User() {
    const { id } = useParams();
    let navigate = useNavigate();

    const { status, data, error, isFetching, refetch } = getUser(id);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhone] = useState("");
    const [photo, setPhoto] = useState("");
    const [user_role, setUserRole] = useState("");

    useEffect(() => {
        setName(data?.user?.name);
        setEmail(data?.user?.email);
        setPhone(data?.user?.phone_number);
        setPhoto(data?.user?.photo);
        setUserRole(data?.user?.user_role?.name);
    }, [data]);

    // delete user, and navigate to admin page
    const deleteUser = useMutation({
        mutationFn: (user) => {
            return request(
                endpoint,
                gql`
                    mutation{
                        deleteUser(id: "${user.id}"){
                            id
                        }
                    }
                `,
            ).then(() => navigate(`/admin`));
        },
    });

    return (
        <div className="w-full h-fit">
            <div>
                {status === "loading" ? (
                    "Loading..."
                ) : status === "error" ? (
                    <span>Error: {error.message}</span>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <h1 className="my-4 py-4 text-bold text-4xl">
                                {name}
                            </h1>
                            <div className="flex justify-end">
                                <Form action="edit" className="m-4 p-4 w-20 ">
                                    <button
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-20 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Edit
                                    </button>
                                </Form>
                                <button
                                    onClick={() =>
                                        deleteUser.mutate({ id: id })
                                    }
                                    className="mt-8 w-20 h-10 text-white bg-blue-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div>{isFetching ? "Background Updating..." : " "}</div>

                        <div>
                            <div className="grid md:grid-cols-2 md:gap-6 max-w-max">
                                <div
                                    id="floating_email"
                                    className="relative z-0 w-48 mb-6 group border-b-2 border-black"
                                >
                                    <label
                                        htmlFor="floating_email"
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Email
                                    </label>
                                    <div className="my-2 w-48 h-6">
                                        {email || ""}
                                    </div>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 md:gap-6 max-w-max">
                                <div
                                    id="floating_phone_number"
                                    className="relative z-0 w-48 mb-6 group border-b-2 border-black"
                                >
                                    <label
                                        htmlFor="floating_phone_number"
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Phone Number
                                    </label>
                                    <div className="my-2 w-48 h-6">
                                        {phone_number || ""}
                                    </div>
                                </div>

                                <div
                                    id="floating_user_role"
                                    className="relative z-0 w-48 mb-6 group border-b-2 border-black"
                                >
                                    <label
                                        htmlFor="floating_user_role"
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        User Role
                                    </label>
                                    <div className="my-2 w-48 h-6">
                                        {user_role || ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

