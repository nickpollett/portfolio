import { useQuery, useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// Get all project types
export default function getProjectTypes() {
    return useQuery(["types"], async () => {
        const data = await request(
            endpoint,
            gql`
                query {
                    projectTypes {
                        id
                        name
                        cost
                    }
                }
            `,
        );
        return data;
    });
}
