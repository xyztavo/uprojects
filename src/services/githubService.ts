import { IRepositoryTypeQL } from "@/types/RepositoryTypeQL";

export const getPinnedRepositories = async (githubUser: string) => {
    const response = await fetch(`https://pinned.berrysauce.dev/get/${githubUser}`);

    if (response.ok) {
        throw new Error("Failed to get pinned repositories");
    }

    const body: IRepositoryTypeQL = await response.json();

    return body;
}