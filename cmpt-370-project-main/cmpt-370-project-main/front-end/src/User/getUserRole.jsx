import { useQuery, useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// Get user role by id
export default function getUserRole(id) {
    return useQuery(["userType", id], async () => {
        const data = await request(
            endpoint,
            gql`
              query{
                  userRole(id: "${id}"){
                    id
                    name
                    permissions
                }
              }`,
        );
        return data;
    });
}
