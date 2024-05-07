import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { useParams, useNavigate } from "react-router-dom";

import getUsers from "../User/getUsers";
import Selector from "../Utility/Selector";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// get all locations
function getLocationList() {
    return useQuery(["locationList"], async () => {
        const data = await request(
            endpoint,
            gql`
                query {
                    locationList {
                        id
                        name
                    }
                }
            `,
        );
        return data;
    });
}

// get client by id
function getClient(id) {
    return useQuery(["client", id], async () => {
        const data = await request(
            endpoint,
            gql`
              query{
                  client(id: "${id}"){
                      id
                      name
                      email
                      phone_number
                      notes
                      status
                      address
                      contact
                      location{
                        id
                        name
                      }
                      sales_person{
                        id
                        name
                      }
                  }
              }`,
        );
        return data;
    });
}

// edit client details
export default function EditClient() {
    const { id } = useParams();
    let navigate = useNavigate();

    const usersData = getUsers();
    const [users, setUsers] = useState([]);

    const locationListData = getLocationList();
    const [locationList, setLocationList] = useState([]);

    const { status, data, error, isFetching, refetch } = getClient(id);
    const [client, setClient] = useState("");
    const [clientStatus, setClientStatus] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [notes, setNotes] = useState("");
    const [contactDate, setContactDate] = useState("");
    const [salesPerson, setSalesPerson] = useState("");

    useEffect(() => {
        setClient(data?.client);
        setSalesPerson(data?.client?.sales_person?.id || "");
        setClientStatus(data?.client?.status || "");

        setName(data?.client.name);
        setEmail(data?.client.email);
        setPhone(data?.client.phone_number);
        setLocation(data?.client.location?.id || "");
        setNotes(data?.client.notes);

        let date = data?.client.contact
            ? new Date(parseInt(data?.client.contact)).toDateString()
            : "";
        setContactDate(date);
    }, [data?.client]);

    useEffect(() => {
        setLocationList(locationListData?.data?.locationList);
    }, [locationListData?.data?.locationList]);

    useEffect(() => {
        setUsers(usersData?.data?.users);
    }, [usersData?.data?.users]);

    // update client mutation
    const updateClient = useMutation({
        mutationFn: (client) => {
            return request(
                endpoint,
                gql`
                    mutation{
                        updateClient(id: ${client.id}, address: "${client.address}", name:"${client.name}", email:"${client.email}", 
                        phone_number:"${client.phone_number}", location:"${client.location}", notes:"${client.notes}", 
                        sales_person: "${client.salesPerson}", status: "${client.status}"){
                            id
                        }
                    }
                `,
            ).then(() => navigate(`/client/${id}`));
        },
    });

    return (
        <div className="w-full">
            <h1 className="my-4 py-4 text-bold text-4xl">
                Edit Client Details
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
                            <div className="grid md:grid-cols-3 md:gap-6">
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
                                        Email
                                    </label>
                                </div>
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
                            </div>
                            <div className="grid md:grid-cols-3 md:gap-6">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input
                                        type="tel"
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                        name="phone"
                                        id="floating_phone"
                                        className="block py-2.5 px-0 w-48 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        value={client?.address || ""}
                                        onChange={(e) =>
                                            setClient({
                                                ...client,
                                                address: e.target.value,
                                            })
                                        }
                                    />
                                    <label
                                        htmlFor="floating_phone"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Address
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <Selector
                                        data={[
                                            { id: "active", name: "Active" },
                                            {
                                                id: "inactive",
                                                name: "Inactive",
                                            },
                                            { id: "away", name: "Away" },
                                        ]}
                                        title={"Status"}
                                        value={clientStatus}
                                        setValue={setClientStatus}
                                    />
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <Selector
                                        data={users}
                                        title={"Sales Person"}
                                        value={salesPerson}
                                        setValue={setSalesPerson}
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 md:gap-6">
                                <div className="relative z-0 w-full mb-6 group">
                                    <div
                                        type="text"
                                        name="contact"
                                        id="floating_contact"
                                        className="block py-2.5 px-0 w-48 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    >
                                        {contactDate || ""}
                                    </div>
                                    <label
                                        htmlFor="floating_contact"
                                        className="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Last Contact Date
                                    </label>
                                </div>

                                <Selector
                                    data={locationList}
                                    title={"Location"}
                                    value={location}
                                    setValue={setLocation}
                                />

                                <div
                                    id="floating_email"
                                    className="relative z-0 mb-6 group col-span-2"
                                >
                                    <label
                                        htmlFor="floating_email"
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Notes
                                    </label>
                                    <textarea
                                        className="textarea resize-none textarea-bordered rounded-md mt-4 w-full"
                                        onChange={(e) =>
                                            setNotes(e.target.value)
                                        }
                                        defaultValue={notes || ""}
                                    ></textarea>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    updateClient.mutate({
                                        id: id,
                                        name: name,
                                        status: clientStatus,
                                        address: client.address,
                                        location: location,
                                        email: email,
                                        phone_number: phone_number,
                                        notes: notes,
                                        salesPerson: salesPerson,
                                    });
                                }}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => {
                                    navigate(`/client/${id}`);
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
