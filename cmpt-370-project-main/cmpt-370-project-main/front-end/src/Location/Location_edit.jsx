import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { useParams, useNavigate } from "react-router-dom";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// Get location by id
function getLocation(id) {
    return useQuery(["company", id], async () => {
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

// Edit location component
export default function EditLocation() {
    const { id } = useParams();
    let navigate = useNavigate();

    const { status, data, error, isFetching, refetch } = getLocation(id);
    const [name, setName] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        setName(data?.location?.name);
        setNotes(data?.location?.notes);
    }, [data]);

    const mutation = useMutation({
        mutationFn: (location) => {
            return request(
                endpoint,
                gql`
                    mutation{
                        updateLocation(id: "${location.id}", name:"${location.name}", notes:"${location.notes}"){
                            id
                        }
                    }
                `,
            ).then(() => navigate(`/location/${id}`));
        },
    });

    return (
        <div className="w-full">
            <h1 className="my-4 py-4 text-bold text-4xl">
                Edit Location Details
            </h1>
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
                                        name="name"
                                        id="floating_name"
                                        className="block w-48 py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        value={name || ""}
                                        required
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor="floating_name"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Name
                                    </label>
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
                                        value={notes || ""}
                                        className="textarea resize-none textarea-bordered rounded-md mt-4 w-full"
                                        onChange={(e) =>
                                            setNotes(e.target.value)
                                        }
                                    ></textarea>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    mutation.mutate({
                                        id: id,
                                        name: name,
                                        notes: notes,
                                    });
                                }}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => {
                                    navigate(`/location/${id}`);
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
