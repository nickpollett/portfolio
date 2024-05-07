import { useQuery, useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// Get user by id
export default function getUser(id) {
    return useQuery(["user", id], async () => {
        const data = await request(
            endpoint,
            gql`
              query{
                  user(id: "${id}"){
                      id
                      name
                      email
                      phone_number
                      active
                      photo
                      user_role{
                        id
                        name
                      }
                  }
              }`,
        );
        return data;
    });
}
