import { useQuery, useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// Get all users
export default function getUsers() {
    return useQuery(["users"], async () => {
        const data = await request(
            endpoint,
            gql`
                query {
                    users {
                        id
                        name
                        user_role {
                            id
                            name
                        }
                    }
                }
            `,
        );
        return data;
    });
}
