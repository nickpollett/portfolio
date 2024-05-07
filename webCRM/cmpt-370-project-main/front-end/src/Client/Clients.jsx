import React, { useState, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { Link, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { AuthContext } from "../Auth/UserContext";
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

// get all clients
function getClients() {
    return useQuery(["clients"], async () => {
        const data = await request(
            endpoint,
            gql`
                query {
                    clients {
                        id
                        name
                        status
                        phone_number
                        contact
                    }
                }
            `,
        );
        return data;
    });
}

// all clients list view
export default function Clients() {

    // navigate item to get around warning about using hooks
    const navigate = useNavigate();

    // get all users
    const users = getUsers();

    // get all clients
    const { status, data, error, isFetching, refetch } = getClients();

    const [showModal, setShowModal] = useState(false);

    // create a new client
    const createClient = useMutation({
        mutationFn: (client) => {
            return request(
                endpoint,
                gql`
                    mutation{
                        createClient(name: "${client.name}", email:"${client.email}", phone_number:"${client.phone_number}"){
                            id
                        }
                    }
                `,
            ).then((e) => navigate(`/client/${e.createClient.id}/edit`));
        },
    });

    // columns for the data grid
    const columns = [
        {
            field: "name",
            headerName: "Name",
            width: 130,
            renderCell: ({ row }) => (
                <Link to={`/client/${row.id}`}>{row.name}</Link>
            ),
        },
        {
            field: "phone_number",
            headerName: "Phone Number",
            width: 190,
        },
        {
            field: "contact",
            headerName: "Last Contacted",
            width: 190,
            renderCell: ({ row }) =>
                row.contact
                    ? new Date(parseInt(row.contact)).toDateString()
                    : "",
        },
        {
            field: "status",
            headerName: "Status",
            width: 130,
            renderCell: ({ row }) => row.status,
        },
    ];

    return (
        <>
            {showModal ? (
                <Modal>
                    <div className="fixed top-0 left-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none grid grid-cols-1 place-content-center place-items-center bg-gray-600 bg-opacity-70">
                        <div className="bg-neutral drop-shadow-2xl p-3 m-2 rounded-3xl place-content-center place-items-center grid grid-cols-1 shadow-lg">
                            <h1 className="text-2xl text-white m-4">
                                Create new Client
                            </h1>

                            <input
                                id="clientName"
                                className="input input-primary input-bordered w-80 m-1"
                                type="text"
                                placeholder="Name"
                            />
                            <input
                                id="clientEmail"
                                className="input input-primary input-bordered w-80 m-1"
                                type="text"
                                placeholder="Email"
                            />
                            <input
                                id="clientPhoneNumber"
                                className="input input-primary input-bordered w-80 m-1"
                                type="text"
                                placeholder="Phone Number"
                            />

                            <div className="m-1">
                                <button
                                    type="submit"
                                    className="btn btn-alert m-1"
                                    onClick={() => {
                                        createClient.mutate({
                                            name: document.getElementById(
                                                "clientName",
                                            ).value,
                                            email: document.getElementById(
                                                "clientEmail",
                                            ).value,
                                            phone_number:
                                                document.getElementById(
                                                    "clientPhoneNumber",
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

            <div className="flex flex-col">
                <div>
                    <div className="flex flex-col-2">
                        <h1 className="text-bold text-4xl my-4">Clients</h1>
                        <div action="edit" className="m-6 p-1">
                            <button
                                onClick={() => setShowModal(true)}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                    <Box sx={{ height: 600, width: 1 }}>
                        <DataGrid
                            rows={data?.clients ? data.clients : []}
                            disableDensitySelector
                            columns={columns}
                            slots={{ toolbar: GridToolbar }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                },
                            }}
                        />
                    </Box>
                </div>
            </div>
        </>
    );
}
