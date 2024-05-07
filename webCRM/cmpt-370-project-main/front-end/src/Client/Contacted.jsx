import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { useParams, useNavigate } from "react-router-dom";

import Modal from "../Utility/Modal";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

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
                  }
              }`,
        );
        return data;
    });
}

// get all client contacts, by client id
function getContacts(id) {
    return useQuery(["client_contacts", id], async () => {
        const data = await request(
            endpoint,
            gql`
              query{
                client_contacts(id: "${id}"){
                      id
                      date
                      type
                        contactor{
                            name
                        }
                  }
              }`,
        );
        return data;
    });
}

// client contacts list view
export default function Contacts() {
    const { id } = useParams();
    let navigate = useNavigate();

    const { status, data, error, isFetching, refetch } = getContacts(id);

    const clientData = getClient(id);

    const [contacts, setContacts] = useState([]);
    const [client, setClient] = useState([]);

    const [edit, setEdit] = useState(false);

    useEffect(() => {
        setContacts(data?.client_contacts);
    }, [data]);

    useEffect(() => {
        setClient(clientData?.data?.client);
    }, [clientData.data]);

    // To Do:
    //      1. finish edit contact functionality
    //      2. add delete contact functionality
    const deleteContact = useMutation({
        mutationFn: (contact) => {
            console.log(contact);
            return request(
                endpoint,
                gql`
                    mutation{
                        deleteContact(id: "${contact.id}"){
                            id
                        }
                    }
                `
            ).then(() => navigate(`/clients`))
        },
    });

    const updateContact = useMutation({
        mutationFn: (contact) => {
            console.log(contact);
            return request(
                endpoint,
                gql`
                    mutation{
                        updateContact(client: "${newContact.id}", date: "${newContact.date}", type: "${newContact.type}", user: "${user}"){
                            id
                            date
                        }
                    }
                `
            ).then(() => navigate(`/client/${newContact.id}`))
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
                                {client?.name}
                            </h1>
                            <div className="flex py-8 justify-end">
                                <button
                                    onClick={() => setEdit(!edit)}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-20 sm:w-auto px-5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div>{isFetching ? "Background Updating..." : " "}</div>

                        <div>
                            <table className="table-fixed w-full">
                                <thead className="">
                                    <tr>
                                        <th className="border px-4 py-2">
                                            Date
                                        </th>
                                        <th className="border px-4 py-2">
                                            Type
                                        </th>
                                        <th className="border px-4 py-2">
                                            User
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts?.map((contact) => (
                                        <tr key={contact.id}>
                                            <td className="border px-4 py-2">
                                                {new Date(
                                                    parseInt(contact.date),
                                                ).toDateString()}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {contact.type}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {contact.contactor.name}
                                            </td>
                                            <td className=" px-4 py-2">
                                                {edit ? (
                                                    <div className="flex flex-cols-2">
                                                        <button
                                                            className="px-2"
                                                            onClick={(e) =>
                                                                deleteContact.mutate(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="red"
                                                                className="w-6 h-6"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                />
                                                            </svg>
                                                        </button>

                                                        <button
                                                            className="px-2"
                                                            onClick={() =>
                                                                updateContact.mutate()
                                                            }
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="currentColor"
                                                                className="w-6 h-6"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

