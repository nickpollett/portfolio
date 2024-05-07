import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import Modal from "../Utility/Modal";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// Get all projects
function getProjects() {
    return useQuery(["projects"], async () => {
        const data = await request(
            endpoint,
            gql`
                query {
                    projects {
                        id
                        address
                        status
                        due_date
                        photographer {
                            assigned {
                                name
                            }
                        }
                        editor {
                            assigned {
                                name
                            }
                        }
                        sales_person {
                            name
                        }
                    }
                }
            `,
        );
        return data;
    });
}

// all projects view
export default function Projects() {
    const navigate = useNavigate();

    const { status, data, error, isFetching, refetch } = getProjects();
    const [showModal, setShowModal] = useState(false);

    // columns for data grid
    const columns = [
        {
            field: "address",
            headerName: "Address",
            width: 250,
            renderCell: ({ row }) => (
                <Link to={`/project/${row.id}`}>{row.address}</Link>
            ),
        },
        {
            field: "status",
            headerName: "Status",
            width: 150,
            renderCell: ({ row }) =>
                row.status == "null" || !row.status
                    ? "Not Started"
                    : row.status,
        },
        {
            field: "due_date",
            headerName: "Due Date",
            width: 190,
            renderCell: ({ row }) =>
                row.due_date
                    ? new Date(parseInt(row.due_date)).toDateString()
                    : "",
        },
        {
            field: "photographer",
            headerName: "Photographer",
            width: 150,
            renderCell: ({ row }) =>
                row.photographer?.assigned?.name
                    ? row.photographer.assigned.name
                    : "",
        },
        {
            field: "editor",
            headerName: "Editor",
            width: 150,
            renderCell: ({ row }) =>
                row.editor?.assigned?.name ? row.editor.assigned.name : "",
        },
        {
            field: "salesperson",
            headerName: "Sales Person",
            width: 150,
            renderCell: ({ row }) =>
                row.sales_person?.name ? row.sales_person.name : "",
        },
    ];

    // create project, then navigate to edit page
    const createProject = useMutation({
        mutationFn: (project) => {
            return request(
                endpoint,
                gql`
                    mutation{
                        createProject(address: "${project.address}"){
                            id
                            address
                        }
                    }`,
            ).then((e) => navigate(`/project/${e.createProject.id}/edit`));
        },
    });

    return (
        <>
            {showModal ? (
                <Modal>
                    <div className="fixed top-0 left-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none grid grid-cols-1 place-content-center place-items-center bg-gray-600 bg-opacity-70">
                        <div className="bg-neutral drop-shadow-2xl p-3 m-2 rounded-3xl place-content-center place-items-center grid grid-cols-1 shadow-lg">
                            <h1 className="text-2xl text-white m-4">
                                New Project
                            </h1>
                            <input
                                id="address"
                                className="input input-primary input-bordered w-80 m-1"
                                type="text"
                                placeholder="Address"
                            />
                            <div className="m-1">
                                <button
                                    type="submit"
                                    className="btn btn-alert m-1"
                                    onClick={() => {
                                        createProject.mutate({
                                            address:
                                                document.getElementById(
                                                    "address",
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
                        <h1 className="text-bold text-4xl my-4">Projects</h1>
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
                            rows={data?.projects ? data.projects : []}
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

