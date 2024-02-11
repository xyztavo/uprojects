import { IRepositoryTypeQL } from "@/types/RepositoryTypeQL";
import axios from "axios";

const githubAuthBearer = import.meta.env.VITE_GITHUB_BEARER && import.meta.env.VITE_GITHUB_BEARER
const githubUser = import.meta.env.VITE_GITHUB_USER

const githubAxios = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${githubAuthBearer}`,
    }
})

export const getQlRepositories = async () => {
    
    const graphqlQuery = {
        "query": `query {
            user(login: "${githubUser}") {
              pinnedItems(first: 6) {
                totalCount
                edges {
                  node {
                    ... on Repository {
                      id
                      name
                      nameWithOwner
                      description
                    }
                  }
                }
              }
            }
          }`,
    }

    const response = await githubAxios.post<IRepositoryTypeQL>('graphql', graphqlQuery);

    return response.data;
}