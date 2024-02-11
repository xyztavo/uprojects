import { PinnedRepos } from "./PinnedRepos";
import { Repos } from "./Repos";

export function Home() {
    return (
        <>
            <PinnedRepos />
            <Repos />
        </>
    )
}