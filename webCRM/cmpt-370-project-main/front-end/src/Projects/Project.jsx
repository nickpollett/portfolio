import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { useParams, Form, useNavigate, Link } from "react-router-dom";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// import components
import getProject from "./getProject";
import DisplayUnderline from "../Utility/DisplayLabelUnderline";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// Project component
export default function Project() {
    const { id } = useParams();
    let navigate = useNavigate();

    const { status, data, error, isFetching, refetch } = getProject(id);

    const [project, setProject] = useState(null);
    const [invoiceStatus, setInvoiceStatus] = useState(null);

    useEffect(() => {
        setProject(data?.project);
    }, [data]);

    useEffect(() => {
        setInvoiceStatus(project?.invoice?.status);
    }, [project?.invoice]);

    const deleteProject = useMutation({
        mutationFn: (project) => {
            return request(
                endpoint,
                gql`
                    mutation{
                        deleteProject(id: "${project.id}")
                    }
                `,
            ).then(() => navigate(`/projects`));
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
                                {project?.address}
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
                                        deleteProject.mutate({ id: id })
                                    }
                                    className="mt-8 w-20 h-10 text-white bg-blue-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div>{isFetching ? "Background Updating..." : " "}</div>

                        <div>
                            <div className="grid md:grid-cols-3 md:gap-6">
                                <DisplayUnderline
                                    value={project?.address}
                                    title={"Address"}
                                />

                                <DisplayUnderline
                                    value={project?.status}
                                    title={"Status"}
                                />

                                <DisplayUnderline
                                    value={project?.project_type?.name}
                                    title={"Project Type"}
                                />
                            </div>
                            <div className="grid md:grid-cols-3 md:gap-6">
                                <DisplayUnderline
                                    value={
                                        project?.due_date
                                            ? new Date(
                                                  parseInt(project?.due_date),
                                              ).toDateString()
                                            : ""
                                    }
                                    title={"Due Date"}
                                />

                                <DisplayUnderline
                                    value={
                                        project?.completed_date
                                            ? new Date(
                                                  parseInt(
                                                      project?.completed_date,
                                                  ),
                                              ).toDateString()
                                            : ""
                                    }
                                    title={"Completed Date"}
                                />

                                <DisplayUnderline
                                    value={
                                        <Link
                                            to={
                                                project?.client
                                                    ? `/client/${project?.client?.id}`
                                                    : `#`
                                            }
                                        >
                                            {project?.client?.name || "-"}{" "}
                                        </Link>
                                    }
                                    title={"Client"}
                                />
                            </div>

                            <div className="grid md:grid-cols-3 md:gap-6">
                                <DisplayUnderline
                                    value={
                                        project?.photographer?.assigned?.name
                                    }
                                    title={"Photographer"}
                                />

                                <DisplayUnderline
                                    value={
                                        project?.photographer?.due_date
                                            ? new Date(
                                                  parseInt(
                                                      project?.photographer
                                                          ?.due_date,
                                                  ),
                                              ).toDateString()
                                            : ""
                                    }
                                    title={"Photo Due Date"}
                                />

                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    project?.photographer
                                                        ?.completed_date
                                                        ? true
                                                        : false
                                                }
                                            />
                                        }
                                        label="Photos Complete"
                                    />
                                </FormGroup>
                            </div>

                            <div className="grid md:grid-cols-3 md:gap-6">
                                <DisplayUnderline
                                    value={project?.editor?.assigned?.name}
                                    title={"Editor"}
                                />

                                <DisplayUnderline
                                    value={
                                        project?.editor?.due_date
                                            ? new Date(
                                                  parseInt(
                                                      project?.editor?.due_date,
                                                  ),
                                              ).toDateString()
                                            : ""
                                    }
                                    title={"Edit Date"}
                                />

                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    project?.editor
                                                        ?.completed_date
                                                        ? true
                                                        : false
                                                }
                                            />
                                        }
                                        label="Edit Complete"
                                    />
                                </FormGroup>
                            </div>

                            <div className="grid md:grid-cols-3 md:gap-6">
                                <DisplayUnderline
                                    value={project?.sales_person?.name}
                                    title={"Sales Person"}
                                />

                                <DisplayUnderline
                                    value={
                                        project?.invoice?.pdf ? (
                                            <button
                                                onClick={() => {
                                                    navigate(
                                                        `/invoice/${project?.invoice?.id}`,
                                                    );
                                                }}
                                                className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                View
                                            </button>
                                        ) : (
                                            "Not Generated"
                                        )
                                    }
                                    title={"Invoice"}
                                />

                                <DisplayUnderline
                                    value={project?.invoice?.amount}
                                    title={"Custom Invoice Amount"}
                                />
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
                                        disabled={true}
                                        className="textarea resize-none textarea-bordered rounded-md mt-4 w-full"
                                        onChange={(e) =>
                                            setProject({
                                                ...project,
                                                notes: e.target.value,
                                            })
                                        }
                                        defaultValue={
                                            project?.notes ? project?.notes : ""
                                        }
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

