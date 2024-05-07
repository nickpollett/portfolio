import { useQuery, useMutation } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// Get project by id
export default function getProject(id) {
    return useQuery(["user", id], async () => {
        const data = await request(
            endpoint,
            gql`
              query{
                project(id: "${id}"){
                    id
                    address
                    status
                    completed_date
                    due_date
                    notes
                      project_type{
                          id
                          name
                          cost
                          notes
                      }
                      photographer{
                          id
                          due_date
                          completed_date
                          assigned{
                              id
                              name
                          }
                      }
                      editor{
                          id
                          due_date
                          completed_date
                          assigned{
                              id
                              name
                          }
                      }
                      invoice{
                            id
                            pdf
                            amount
                      }
                      client{
                            id
                            name
                            email
                      }
                      sales_person{
                        id
                        name
                      }
                }
              }`,
        );
        return data;
    });
}
