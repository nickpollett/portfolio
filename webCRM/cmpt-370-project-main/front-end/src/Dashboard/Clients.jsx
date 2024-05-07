import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { Link } from "react-router-dom";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// Get all clients by salesperson assigned id
function getClients(userID) {
    return useQuery(["clients", userID], async () => {
        const data = await request(
            endpoint,
            gql`
                query {
                    clientsBySalesPerson(id: ${userID}) {
                        id
                        name
                        status
                        contact
                    }
                }
            `,
        );
        return data;
    });
}

// Display all clients assigned to a salesperson
export default function Clients(userID) {
    
    const { status, data, error, isFetching, refetch } = getClients(
        userID.userID,
    );

    return (
        <>
            <div className="flex flex-col">
                <h1 className="text-bold text-2xl my-4">Your Clients</h1>
            </div>
            <table className="table-zebra border border-slate-500 table-fixed">
                <thead>
                    <tr>
                        <th className="border border-slate-600 w-48">Name</th>
                        <th className="border border-slate-600 w-40">Status</th>
                        <th className="border border-slate-600 w-40">
                            Last Contact
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.clientsBySalesPerson?.length === 0 ? (
                        <tr>
                            <td>No Clients Assigned</td>
                        </tr>
                    ) : (
                        data?.clientsBySalesPerson?.map((client) => (
                            <tr key={client.id}>
                                <td className="border border-slate-600 text-left">
                                    <Link to={`/client/${client.id}`}>
                                        <button className="font-bold py-2 px-4 rounded">
                                            {client.name}
                                        </button>
                                    </Link>
                                </td>
                                <td className="border border-slate-600 text-center">
                                    {client.status}
                                </td>
                                <td className="border border-slate-600 text-center">
                                    {client.contact ? new Date(
                                        parseInt(client.contact),
                                    ).toDateString() : "No Contact Found"}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}
