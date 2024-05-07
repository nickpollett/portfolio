import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { useParams, Form, useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";

import Modal from "../Utility/Modal";
import DisplayUnderline from "../Utility/DisplayLabelUnderline";

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

// get client projects by client id
function getClientProjects(id) {
    return useQuery(["clientProjects", id], async () => {
        const data = await request(
            endpoint,
            gql`
              query{
                  client_projects(id: "${id}"){
                      id
                      address
                      status
                  }
              }`,
        );
        return data;
    });
}

// client projects by client id, display item
function Projects(client) {
    const { status, data, error, isFetching, refetch } = getClientProjects(
        client.client.id,
    );

    return (
        <>
            <table className="table-zebra border border-slate-500 table-fixed">
                <thead>
                    <tr>
                        <th className="border border-slate-600 w-52">
                            Address
                        </th>
                        <th className="border border-slate-600 w-60">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.client_projects?.length === 0 ? (
                        <tr>
                            <td>No projects found</td>
                        </tr>
                    ) : (
                        data?.client_projects.map((project) => (
                            <tr key={project.id}>
                                <td className="border border-slate-600 text-center w-52 h-10">
                                    <Link to={`/project/${project.id}`}>
                                        {" "}
                                        {project.address}
                                    </Link>
                                </td>
                                <td className="border border-slate-600 w-60 text-center">
                                    {project.status}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}

// client page view
export default function Client() {
    const { id } = useParams();
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const { status, data, error, isFetching, refetch } = getClient(id);

    const [client, setClient] = useState({});

    const users = getUsers();
    const [user, setUser] = useState("");

    const [contactDate, setContactDate] = useState("");
    const [contactType, setContactType] = useState("");

    useEffect(() => {
        setClient(data?.client);
    }, [data?.client]);

    const deleteClient = useMutation({
        mutationFn: (client) => {
            return request(
                endpoint,
                gql`
                    mutation{
                        deleteClient(id: "${client.id}"){
                            id
                        }
                    }
                `,
            ).then(() => navigate(`/clients`));
        },
    });

    // create a new client contact item
    const createContact = useMutation({
        mutationFn: (newContact) => {
            return request(
                endpoint,
                gql`
                    mutation{
                        createContact(client: "${
                            newContact.id
                        }", date: "${new Date(
                            newContact.date,
                        ).toISOString()}", type: "${
                            newContact.type
                        }", user: "${user}"){
                            id
                            date
                        }
                    }
                `,
            ).then(() => refetch());
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
                                        deleteClient.mutate({ id: id })
                                    }
                                    className="mt-8 w-20 h-10 text-white bg-blue-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div>{isFetching ? "Background Updating..." : " "}</div>

                        {showModal ? (
                            <Modal>
                                <div className="fixed top-0 left-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none grid grid-cols-1 place-content-center place-items-center bg-gray-600 bg-opacity-70">
                                    <div className="bg-neutral drop-shadow-2xl p-3 m-2 rounded-3xl place-content-center place-items-center grid grid-cols-1 shadow-lg">
                                        <h1 className="text-2xl text-white m-4">
                                            New Contact Event
                                        </h1>
                                        <DatePicker
                                            selected={contactDate}
                                            onChange={(contactDate) =>
                                                setContactDate(contactDate)
                                            }
                                        />
                                        <select
                                            value={contactType || ""}
                                            className="select select-bordered w-48 mt-4"
                                            onChange={(e) =>
                                                setContactType(e.target.value)
                                            }
                                        >
                                            <option value="">Type</option>
                                            <option value="Phone">Phone</option>
                                            <option value="Email">Email</option>
                                            <option value="Text">Text</option>
                                            <option value="In Person">
                                                In Person
                                            </option>
                                            <option value="Other">Other</option>
                                        </select>

                                        <select
                                            defaultValue="Title"
                                            className="select select-bordered w-80 mt-4"
                                            onChange={(e) =>
                                                setUser(e.target.value)
                                            }
                                        >
                                            <option disabled value="Title">
                                                User
                                            </option>
                                            {users?.data?.users?.map((user) => (
                                                <option
                                                    value={user.id}
                                                    key={user.id}
                                                >
                                                    {user.name}
                                                </option>
                                            ))}
                                        </select>

                                        <div className="m-1">
                                            <button
                                                type="submit"
                                                className="btn btn-alert m-1"
                                                onClick={() => {
                                                    createContact.mutate({
                                                        id: id,
                                                        date: contactDate,
                                                        type: contactType,
                                                        user: user,
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

                        <div>
                            <div className="grid md:grid-cols-3 md:gap-6 max-w-max">
                                <DisplayUnderline
                                    value={client?.email}
                                    title={"Email"}
                                />

                                <DisplayUnderline
                                    value={client?.address}
                                    title={"Address"}
                                />

                                <DisplayUnderline
                                    value={client?.phone_number}
                                    title={"Phone Number"}
                                />
                            </div>

                            <div className="grid md:grid-cols-3 md:gap-6 max-w-max">
                                <DisplayUnderline
                                    value={client?.status}
                                    title={"Status"}
                                />
                                <DisplayUnderline
                                    value={
                                        <Link to={`/client/${id}/contacts`}>
                                            {client?.contact
                                                ? new Date(
                                                      parseInt(client?.contact),
                                                  ).toDateString()
                                                : ""}
                                        </Link>
                                    }
                                    title={"Last Contact Date"}
                                />

                                <div>
                                    <button
                                        onClick={() => {
                                            setShowModal(true);
                                        }}
                                        className="content-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-20 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6 max-w-max">
                                <DisplayUnderline
                                    value={client?.location?.name}
                                    title={"Location"}
                                />
                                <DisplayUnderline
                                    value={client?.sales_person?.name}
                                    title={"Sales Person"}
                                />
                            </div>
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
                                    defaultValue={client?.notes || ""}
                                ></textarea>
                            </div>
                        </div>
                        <div>
                            <h1 className="my-4 text-bold text-2xl">
                                Projects
                            </h1>

                            <Projects client={data.client} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
