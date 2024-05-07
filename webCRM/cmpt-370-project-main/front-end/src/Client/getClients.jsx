import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// Get all clients
export default function getClients() {
    return useQuery(["clients"], async () => {
        const data = await request(
            endpoint,
            gql`
                query {
                    clients {
                        id
                        name
                        phone_number
                        contact
                    }
                }
            `,
        );
        return data;
    });
}
