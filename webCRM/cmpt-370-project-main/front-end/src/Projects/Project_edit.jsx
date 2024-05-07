import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { useParams, useNavigate } from "react-router-dom";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import components
import Selector from "../Utility/Selector";
import getProjectTypes from "./getProjectTypes";
import getProject from "./getProject";
import getUsers from "../User/getUsers";
import getClients from "../Client/getClients";
import SearchSelector from "../Utility/SearchSelector";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// Edit project component
export default function EditProject() {
    const { id } = useParams();
    let navigate = useNavigate();

    const usersList = getUsers(id);
    const projectTypesData = getProjectTypes();
    const clientList = getClients();

    const { status, data, error, isFetching, refetch } = getProject(id);

    const [dueDate, setDueDate] = useState(new Date());
    const [completeDate, setCompleteDate] = useState(new Date());

    const [project, setProject] = useState("");

    const [photographer, setPhotographer] = useState("");
    const [photoDueDate, setPhotoDueDate] = useState(new Date());
    const [photoComplete, setPhotoComplete] = useState(false);

    const [projectType, setProjectType] = useState("");
    const [invoiceAmount, setInvoiceAmount] = useState("");

    const [editor, setEditor] = useState("");
    const [editDueDate, setEditDueDate] = useState(new Date());
    const [editComplete, setEditComplete] = useState(false);

    const [salesperson, setSalesperson] = useState("");

    const [client, setClient] = useState("");

    const [users, setUsers] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        setProject(data?.project);
        setInvoiceAmount(data?.project?.invoice?.amount);
        setProjectType(data?.project?.project_type?.id);
        setEditor(data?.project?.editor?.assigned?.id);
        setPhotographer(data?.project?.photographer?.assigned?.id);
        setSalesperson(data?.project?.sales_person?.id);
        setPhotoComplete(
            data?.project?.photographer?.completed_date ? true : false,
        );
        setEditComplete(data?.project?.editor?.completed_date ? true : false);
        //setDueDate(new Date(parseInt(data?.project?.due_date)).toLocaleDateString())
    }, [data]);

    useEffect(() => {
        setUsers(usersList.data?.users);
    }, [usersList.data]);

    useEffect(() => {
        setProjectTypes(projectTypesData?.data?.projectTypes);
    }, [projectTypesData?.data?.projectTypes]);

    useEffect(() => {
        setClients(clientList.data?.clients);
    }, [clientList?.data?.clients]);

    const updateProject = useMutation({
        mutationFn: (project) => {
            return request(
                endpoint,
                gql`
                    mutation{
                        updateProject(id: ${project.id}, address: "${
                            project.address
                        }", status: "${project.status}", 
                        project_type: "${project.type}", notes: "${
                            project.notes
                        }", due_date: "${new Date(
                            project.due_date,
                        ).toISOString()}", 
                        completed_date: "${new Date(
                            project.completed_date,
                        ).toISOString()}", photographer: "${
                            project.photographer
                        }", 
                        editor: "${project.editor}", photo_due: "${new Date(
                            project.photo_due,
                        ).toISOString()}", photo_complete: "${
                            project.photo_complete
                        }",
                        edit_due: "${new Date(
                            project.edit_due,
                        ).toISOString()}", edit_complete: "${
                            project.edit_complete
                        }",
                        salesperson: "${project.salesperson}", client: "${
                            project.client
                        }"){
                            id
                        }
                    }
                `,
            ).then(() => navigate(`/project/${id}`));
        },
    });

    const createInvoice = useMutation({
        mutationFn: (project) => {
            return request(
                endpoint,
                gql`
                    mutation{
                        createInvoice(project: "${project.project}", amount: "${project.amount}"){
                            id
                        }
                    }
                `,
            ).then(() => refetch());
        },
    });

    const updateInvoice = useMutation({
        mutationFn: (invoice) => {
            return request(
                endpoint,
                gql`
                    mutation{
                        updateInvoice(project: "${invoice.project}", amount: "${invoice.amount}", id: "${invoice.id}"){
                            id
                        }
                    }
                `,
            ).then(() => refetch());
        },
    });

    return (
        <div className="w-full">
            <h1 className="my-4 py-4 text-bold text-4xl">
                Edit Project Details
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
                                        name="Address"
                                        id="floating_address"
                                        className="block w-48 py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        value={project?.address || ""}
                                        required
                                        onChange={(e) =>
                                            setProject({
                                                ...project,
                                                address: e.target.value,
                                            })
                                        }
                                    />
                                    <label
                                        htmlFor="floating_address"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Address
                                    </label>
                                </div>
                                <div className="relative w-full mb-6 group">
                                    <label
                                        htmlFor="floating_status"
                                        className="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Status
                                    </label>

                                    <select
                                        value={project?.status || ""}
                                        className="select select-bordered w-48 mt-4"
                                        onChange={(e) =>
                                            setProject({
                                                ...project,
                                                status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Status</option>
                                        <option value="Created">Created</option>
                                        <option value="To Be assigned">
                                            To Be Assigned
                                        </option>
                                        <option value="In Progress">
                                            In Progress
                                        </option>
                                        <option value="Completed">
                                            Completed
                                        </option>
                                        <option value="Delivered">
                                            Delivered
                                        </option>
                                        <option value="Cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </div>
                                <div className="relative w-full mb-6 group">
                                    <Selector
                                        data={projectTypes}
                                        title={"Project Type"}
                                        setValue={setProjectType}
                                        value={projectType}
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 md:gap-6">
                                <div className="relative z-50 w-full mb-6 group">
                                    <div
                                        name="phone"
                                        id="floating_phone"
                                        className="block py-2.5 px-0 w-48 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    >
                                        <DatePicker
                                            selected={dueDate}
                                            onChange={(date) =>
                                                setDueDate(date)
                                            }
                                        />
                                    </div>
                                    <label
                                        htmlFor="floating_phone"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Due Date
                                    </label>
                                </div>
                                <div className="relative z-50 w-full mb-6 group">
                                    <div
                                        name="phone"
                                        id="floating_phone"
                                        disabled={true}
                                        className="block py-2.5 px-0 w-48 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    >
                                        <DatePicker
                                            selected={completeDate}
                                            onChange={(date) =>
                                                setCompleteDate(date)
                                            }
                                        />
                                    </div>
                                    <label
                                        htmlFor="floating_phone"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Completed Date
                                    </label>
                                </div>
                                <div className="relative z-50 w-full mb-6 group">
                                    <SearchSelector
                                        data={clients}
                                        title={"Client"}
                                        value={data?.project?.client}
                                        setValue={setClient}
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 md:gap-6">
                                <div className="relative  w-full mb-6 group">
                                    <Selector
                                        data={users}
                                        title={"Photographer"}
                                        setValue={setPhotographer}
                                        value={photographer}
                                    />
                                </div>

                                <div className="relative z-45 w-full mb-6 group">
                                    <div className="block py-2.5 px-0 w-48 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                        <DatePicker
                                            selected={photoDueDate}
                                            onChange={(date) =>
                                                setPhotoDueDate(date)
                                            }
                                        />
                                    </div>
                                    <label
                                        htmlFor="floating_phone"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Photo Due Date
                                    </label>
                                </div>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={photoComplete}
                                                onChange={(e) =>
                                                    setPhotoComplete(
                                                        e.target.checked,
                                                    )
                                                }
                                            />
                                        }
                                        label="Photos Complete"
                                    />
                                </FormGroup>
                            </div>
                            <div className="grid md:grid-cols-3 md:gap-6">
                                <div className="relative w-full mb-6 group">
                                    <Selector
                                        data={users}
                                        title="Editor"
                                        setValue={setEditor}
                                        value={editor}
                                    />
                                </div>
                                <div className="relative z-35 w-full mb-6 group">
                                    <div
                                        name="phone"
                                        id="floating_edit_due"
                                        className="block py-2.5 px-0 w-48 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        value={editDueDate || ""}
                                        onChange={(e) =>
                                            setProject(e.target.value)
                                        }
                                    >
                                        <DatePicker
                                            selected={editDueDate}
                                            onChange={(date) =>
                                                setEditDueDate(date)
                                            }
                                        />
                                    </div>
                                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Edit Due Date
                                    </label>
                                </div>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={editComplete}
                                                onChange={(e) =>
                                                    setEditComplete(
                                                        e.target.checked,
                                                    )
                                                }
                                            />
                                        }
                                        label="Edit Complete"
                                    />
                                </FormGroup>
                            </div>

                            <div className="grid md:grid-cols-3 md:gap-6">
                                <div className="relative  w-full mb-6 group">
                                    <Selector
                                        data={users}
                                        title="Sales Person"
                                        setValue={setSalesperson}
                                        value={salesperson}
                                    />
                                </div>
                                <div
                                    id="floating_phone_number"
                                    className="relative z-0 w-48 mb-6 group"
                                >
                                    <label
                                        htmlFor="floating_phone_number"
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Invoice
                                    </label>
                                    <div className="my-2 w-48 h-6">
                                        {project?.invoice?.pdf ? (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        navigate(
                                                            `/invoice/${project.invoice.id}`,
                                                        );
                                                    }}
                                                    className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        updateInvoice.mutate({
                                                            project: id,
                                                            amount: invoiceAmount,
                                                            id: project?.invoice
                                                                .id,
                                                        });
                                                    }}
                                                    className="text-white mx-2 bg-yellow-500 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-blue-800"
                                                >
                                                    Update
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        createInvoice.mutate({
                                                            project: id,
                                                            amount: invoiceAmount,
                                                        })
                                                    }
                                                    className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                >
                                                    Generate
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input
                                        type="text"
                                        name="Address"
                                        id="floating_address"
                                        className="block w-48 py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        value={invoiceAmount || ""}
                                        required
                                        onChange={(e) =>
                                            setInvoiceAmount(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor="floating_address"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Custom Invoice Amount
                                    </label>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-1 md:gap-6">
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
                                            setProject({
                                                ...project,
                                                notes: e.target.value,
                                            })
                                        }
                                        defaultValue={project?.notes || ""}
                                    ></textarea>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    updateProject.mutate({
                                        id: id,
                                        address: project.address,
                                        status: project.status,
                                        type: projectType,
                                        notes: project.notes,
                                        due_date: dueDate,
                                        completed_date: completeDate,
                                        photographer: photographer,
                                        editor: editor,
                                        photo_due: photoDueDate,
                                        photo_complete: photoComplete,
                                        edit_due: editDueDate,
                                        edit_complete: editComplete,
                                        salesperson: salesperson,
                                        client: client.id,
                                    });
                                }}
                                className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => {
                                    navigate(`/project/${id}`);
                                }}
                                className="text-white mx-2 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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


