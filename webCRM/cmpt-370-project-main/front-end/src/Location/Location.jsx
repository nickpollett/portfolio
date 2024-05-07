import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { useParams, Form, useNavigate, Link } from "react-router-dom";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// Get location by id
function getLocation(id) {
    return useQuery(["user", id], async () => {
        const data = await request(
            endpoint,
            gql`
              query{
                  location(id: "${id}"){
                      id
                      name
                      notes
                      Clients{
                        id
                        name
                      }
                }
              }`,
        );
        return data;
    });
}

// location component 
export default function Location() {
    const { id } = useParams();
    let navigate = useNavigate();

    const { status, data, error, isFetching, refetch } = getLocation(id);

    const [name, setName] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        setName(data?.location?.name);
        setNotes(data?.location?.notes);
    }, [data]);

    // delete location
    const mutationDelete = useMutation({
        mutationFn: (location) => {
            return request(
                endpoint,
                gql`
                    mutation{
                        deleteLocation(id: "${location.id}"){
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
                                        mutationDelete.mutate({ id: id })
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
                                        Name
                                    </label>
                                    <div className="my-2 w-48 h-6">
                                        {name || ""}
                                    </div>
                                </div>
                                <div
                                    id="floating_notes"
                                    className="relative z-0 mb-6 group col-span-2"
                                >
                                    <label
                                        htmlFor="floating_notes"
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Notes
                                    </label>
                                    <textarea
                                        disabled={true}
                                        className="textarea resize-none textarea-bordered rounded-md mt-4 w-full"
                                        defaultValue={notes || ""}
                                    ></textarea>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-bold text-2xl p-2">
                                    Clients
                                </h1>
                                <table className="table-zebra border border-slate-500 table-fixed">
                                    <thead>
                                        <tr>
                                            <th className="border border-slate-600 w-52">
                                                Name
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.location?.Clients?.length ===
                                        0 ? (
                                            <tr>
                                                <td>No Clients</td>
                                            </tr>
                                        ) : (
                                            data?.location?.Clients?.map(
                                                (client) => (
                                                    <tr
                                                        key={client.id}
                                                        className="hover"
                                                    >
                                                        <td className="border border-slate-600 text-left">
                                                            <Link
                                                                to={`/client/${client.id}`}
                                                            >
                                                                <button className="font-bold py-2 px-4 rounded">
                                                                    {
                                                                        client.name
                                                                    }
                                                                </button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ),
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
