import { IPinnedRepository } from "@/types/IPinnedRepository";

type IGetPinnedRepository = Omit<IPinnedRepository, "nameWithOwner">;

export const getPinnedRepositories = async (githubUser: string) => {
    const response = await fetch(`https://pinned.berrysauce.dev/get/${githubUser}`);

    if (response.ok) {
        throw new Error("Failed to get pinned repositories");
    }

    const body: IGetPinnedRepository[] = await response.json();
    const data = body.map((pinnedRepo) => ({
        ...pinnedRepo,
        nameWithOwner: `${pinnedRepo.author}/${pinnedRepo.name}`
    }));

    return data;
}