import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { Link } from "react-router-dom";

import Modal from "../Utility/Modal";
import getProjectTypes from "../Projects/getProjectTypes";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// project types item
export default function ProjectTypes() {
    // get all project types
    const { status, data, error, isFetching, refetch } = getProjectTypes();
    const [showModal, setShowModal] = useState(false);

    // create a new project type
    const createProjectType = useMutation({
        mutationFn: (type) => {
            return request(
                endpoint,
                gql`
                    mutation{
                        createProjectType(name: "${type.name}", cost: "${type.cost}", notes: "${type.notes}"){
                            id
                            name
                        }
                    }`,
            ).then(() => refetch());
        },
    });

    return (
        <>
            {showModal ? (
                <Modal>
                    <div className="fixed top-0 left-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none grid grid-cols-1 place-content-center place-items-center bg-gray-600 bg-opacity-70">
                        <div className="bg-neutral drop-shadow-2xl p-3 m-2 rounded-3xl place-content-center place-items-center grid grid-cols-1 shadow-lg">
                            <h1 className="text-2xl text-white m-4">
                                New Project Type
                            </h1>
                            <input
                                id="name"
                                className="input input-primary input-bordered w-80 m-1"
                                type="text"
                                placeholder="Name"
                            />
                            <input
                                id="cost"
                                className="input input-primary input-bordered w-80 m-1"
                                type="text"
                                placeholder="Default Cost"
                            />
                            <div className="m-1">
                                <button
                                    type="submit"
                                    className="btn btn-alert m-1"
                                    onClick={() => {
                                        createProjectType.mutate({
                                            name: document.getElementById(
                                                "name",
                                            ).value,
                                            cost: document.getElementById(
                                                "cost",
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

            <div className="grid grid-cols-2">
                <div action="edit" className="m-1 p-1">
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Create
                    </button>
                </div>
            </div>
            <table className="border border-slate-500 table-fixed">
                <thead>
                    <tr>
                        <th className="border border-slate-600 w-52">Name</th>
                        <th className="border border-slate-600 w-60">
                            Default Cost
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.projectTypes.length === 0 ? (
                        <tr>
                            <td>Project Types found</td>
                        </tr>
                    ) : (
                        data?.projectTypes.map((type) => (
                            <tr key={type.id}>
                                <td className="border border-slate-600 w-52">
                                    <Link to={`/project/type/${type.id}`}>
                                        <button className="font-bold py-2 px-4 rounded">
                                            {type.name}
                                        </button>
                                    </Link>
                                </td>
                                <td className="text-center">
                                    $ {type.cost}.00
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}
