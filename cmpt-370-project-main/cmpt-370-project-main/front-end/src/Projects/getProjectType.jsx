import { useQuery, useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// Get project type by id
export default function getProjectType(id) {
    return useQuery(["projectType", id], async () => {
        const data = await request(
            endpoint,
            gql`
              query{
                  projectType(id: "${id}"){
                      id
                      name
                      cost
                  }
              }`,
        );
        return data;
    });
}
