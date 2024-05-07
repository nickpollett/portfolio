import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { useParams, useNavigate } from "react-router-dom";

// import components
import getUserRoles from "./getUserRoles";
import getUser from "./getUser";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// edit user component
export default function EditUser() {
    const { id } = useParams();
    let navigate = useNavigate();

    const types = getUserRoles(id);

    const { status, data, error, isFetching, refetch } = getUser(id);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhone] = useState("");
    const [photo, setPhoto] = useState("");
    const [user_role, setUserRole] = useState("");

    const [userRoles, setUserRoles] = useState([]);

    useEffect(() => {
        setName(data?.user.name);
        setEmail(data?.user.email);
        setPhone(data?.user.phone_number);
        setPhoto(data?.user.photo);
        setUserRole(data?.user.user_role?.id);
    }, [data]);

    useEffect(() => {
        setUserRoles(types.data?.userRoles);
    }, [types.data]);

    // update user mutation
    const updateUser = useMutation({
        mutationFn: (user) => {
            return request(
                endpoint,
                gql`
                    mutation{
                        updateUser(id: "${user.id}", name:"${user.name}", email:"${user.email}", phone_number:"${user.phone_number}", userRole:"${user.userRole}"){
                            id
                        }
                    }
                `,
            ).then(() => navigate(`/user/${id}`));
        },
    });

    return (
        <div className="w-full">
            <h1 className="my-4 py-4 text-bold text-4xl">Edit User Details</h1>
            <div>
                {status === "loading" ? (
                    "Loading..."
                ) : status === "error" ? (
                    <span>Error: {error.message}</span>
                ) : (
                    <>
                        <div>{isFetching ? "Background Updating..." : " "}</div>
                        <div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input
                                        type="text"
                                        name="Name"
                                        id="floating_first_name"
                                        className="block w-48 py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        value={name || ""}
                                        required
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor="floating_first_name"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Name
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input
                                        type="email"
                                        name="email"
                                        id="floating_email"
                                        className="block py-2.5 px-0 w-48 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        value={email || ""}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor="floating_email"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Email address
                                    </label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input
                                        type="tel"
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                        name="phone"
                                        id="floating_phone"
                                        className="block py-2.5 px-0 w-48 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        value={phone_number || ""}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor="floating_phone"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Phone (123-456-7890)
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input
                                        type="text"
                                        name="photo"
                                        id="floating_photo"
                                        className="block py-2.5 px-0 w-48 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        value={photo || ""}
                                        onChange={(e) =>
                                            setPhoto(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor="floating_photo"
                                        className="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Photo
                                    </label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-6 group">
                                    <label
                                        htmlFor="floating_user_role"
                                        className="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        User Role
                                    </label>

                                    <select
                                        value={user_role}
                                        className="select select-bordered w-48 mt-4"
                                        onChange={(e) =>
                                            setUserRole(e.target.value)
                                        }
                                    >
                                        <option value="">User Role</option>
                                        {userRoles?.map((userRole) => (
                                            <option
                                                value={userRole.id}
                                                key={userRole.id}
                                            >
                                                {userRole.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    updateUser.mutate({
                                        id: id,
                                        name: name,
                                        email: email,
                                        phone_number: phone_number,
                                        userRole: user_role,
                                    });
                                }}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => {
                                    navigate(`/user/${id}`);
                                }}
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

