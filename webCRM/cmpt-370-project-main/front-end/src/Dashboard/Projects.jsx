import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { Link } from "react-router-dom";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// Get all projects by user id
function getProjects(userID) {
    let userProjects = [];
    userProjects.length = 0;

    return useQuery(["projects", userID], async () => {
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
                            id
                            assigned {
                                id
                                name
                            }
                        }
                        editor {
                            id
                            assigned {
                                id
                                name
                            }
                        }
                        sales_person {
                            id
                            name
                        }
                    }
                }
            `,
        );
        
        // Filter projects by user id
        data?.projects.forEach((project) => {
            if (
                project.editor?.assigned?.id == userID &&
                !userProjects.includes(project)
            )
                userProjects.push(project);
            else if (
                project.sales_person?.id == userID &&
                !userProjects.includes(project)
            )
                userProjects.push(project);
            else if (
                project.photographer?.assigned?.id == userID &&
                !userProjects.includes(project)
            )
                userProjects.push(project);
        });
        return userProjects;
    });
}

// Display all projects assigned to user
export default function Projects(userID) {
    const { status, data, error, isFetching, refetch } = getProjects(
        userID.userID,
    );

    return (
        <>
            <div className="flex flex-col">
                <h1 className="text-bold text-2xl my-4">Your Projects</h1>
            </div>
            <table className="table-zebra border border-slate-500 table-fixed">
                <thead>
                    <tr>
                        <th className="border border-slate-600 w-48">
                            Address
                        </th>
                        <th className="border border-slate-600 w-32">Status</th>
                        <th className="border border-slate-600 w-32">
                            Assigned As
                        </th>
                        <th className="border border-slate-600 w-32">
                            Due date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.length === 0 ? (
                        <tr>
                            <td>No Projects Assigned</td>
                        </tr>
                    ) : (
                        data?.map((project) => (
                            <tr key={project.id}>
                                <td className="border border-slate-600 text-left">
                                    <Link to={`/project/${project.id}`}>
                                        <button className="font-bold py-2 px-4 rounded">
                                            {project.address}
                                        </button>
                                    </Link>
                                </td>
                                <td className="border border-slate-600 text-center">
                                    {project.status}
                                </td>
                                <td className="border border-slate-600 text-center">
                                    {project.editor?.assigned?.id ==
                                    userID.userID
                                        ? "Editor"
                                        : ""}
                                    {project.sales_person?.id == userID.userID
                                        ? "Sales"
                                        : ""}
                                    {project.photographer?.assigned?.id ==
                                    userID.userID
                                        ? "Photographer"
                                        : ""}
                                </td>
                                <td className="border border-slate-600 text-center">
                                    {new Date(
                                        parseInt(project.due_date),
                                    ).toDateString()}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}
