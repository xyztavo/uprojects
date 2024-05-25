import { PinnedRepos } from "./PinnedRepos";
import { Repos } from "./Repos";

export function Home() {
  const githubUser = import.meta.env.VITE_GITHUB_USER;

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <PinnedRepos githubUser={githubUser} />
      <Repos githubUser={githubUser} isBearerAuth />
    </div>
  );
}
