import { useQuery, useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// Get all user roles
export default function getUserRoles() {
    return useQuery(["userRoles"], async () => {
        const data = await request(
            endpoint,
            gql`
                query {
                    userRoles {
                        id
                        name
                    }
                }
            `,
        );
        return data;
    });
}
