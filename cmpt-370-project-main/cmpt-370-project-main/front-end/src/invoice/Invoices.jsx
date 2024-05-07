import { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AuthContext } from "../Auth/UserContext";
import fileDownload from "js-file-download";
import Axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Modal from "../Utility/Modal";
import Invoice from "./Invoice";

import DisplayUnderline from "../Utility/DisplayLabelUnderline";

const endpoint = import.meta.env.VITE_API_ENDPOINT;
const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

// Get all invoices
function getInvoices() {
    return useQuery(["invoices"], async () => {
        const data = await request(
            endpoint,
            gql`
                query {
                    invoices {
                        id
                        amount
                        pdf
                        status
                        project {
                            id
                            address
                        }
                    }
                }
            `,
        );
        return data;
    });
}

// list of all invoices component 
export default function Invoices() {
    const {
        user,
        loggedIn,
        userID,
        localUserRole,
        userRole,
        localUserID,
        userLoggedIn,
    } = useContext(AuthContext);

    const [role, setRole] = useState(null);

    const { status, data, error, isFetching, refetch } = getInvoices();

    const [showModal, setShowModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    // columns for the invoices table
    const columns = [
        {
            field: "pdf",
            headerName: "Project Invoice",
            width: 250,
            renderCell: ({ row }) => (
                <button
                    onClick={() => {
                        setSelectedInvoice(row);
                        setShowModal(true);
                    }}
                >
                    {row.project.address}
                </button>
            ),
        },
        {
            field: "amount",
            headerName: "Amount",
            width: 250,
            renderCell: ({ row }) => "$ " + row.amount,
        },
        {
            field: "status",
            headerName: "Status",
            width: 250,
        },
    ];

    // get invoices between dates
    const getInvoicesByDates = useMutation({
        mutationFn: (dates) => {
            return request(
                endpoint,
                gql`
                    mutation{
                      invoices_dates(start_date: "${dates.startDate}", end_date: "${dates.endDate}")
                    }
                `,
            ).then((e) =>
                download(
                    serverUrl + "/invoice_pdf/" + e.invoices_dates,
                    "invoices.zip",
                ),
            );
        },
    });

    // download invoice
    function download(url, filename) {
        Axios.get(url, {
            responseType: "blob",
        }).then((res) => {
            fileDownload(res.data, filename);
        });
    }

    useEffect(() => {
        setRole(localUserRole);
    }, [localUserRole]);

    if (role === "Admin" || role === "Accountant") {
        return (
            <>
                {showModal ? (
                    <Modal>
                        <div className="fixed top-0 left-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none grid grid-cols-1 place-content-center place-items-center bg-gray-600 bg-opacity-70">
                            <div className="bg-neutral drop-shadow-2xl p-3 m-2 rounded-3xl place-content-center place-items-center grid grid-cols-1 shadow-lg">
                                <Invoice ID={selectedInvoice.id} />

                                <div className="m-1">
                                    <button
                                        onClick={() =>
                                            download(
                                                serverUrl +
                                                    selectedInvoice.pdf.replace(".", ""),
                                                "invoice.pdf",
                                            )
                                        }
                                        className="btn btn-alert m-1"
                                    >
                                        Download
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-accent m-1"
                                        onClick={() => {
                                            setShowModal(false);
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                ) : null}

                <div className="grid grid-cols-1 h-fit">
                    <h1 className="mt-2 text-bold text-4xl my-4">Invoices</h1>
                    <div>
                        <Box sx={{ height: 600, width: 1 }}>
                            <DataGrid
                                rows={data?.invoices ? data.invoices : []}
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
                    <div className="my-4">
                        <h1 className="text-bold text-xl my-2">
                            Invoices between dates
                        </h1>
                        <div className="grid grid-cols-3">
                            <DisplayUnderline
                                value={
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                    />
                                }
                                title={"Start Date"}
                            />

                            <DisplayUnderline
                                value={
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                    />
                                }
                                title={"End Date"}
                            />

                            <div>
                                <button
                                    onClick={() =>
                                        getInvoicesByDates.mutate({
                                            startDate: startDate,
                                            endDate: endDate,
                                        })
                                    }
                                    className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Get
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return <div>Not Authorized</div>;
    }
}
