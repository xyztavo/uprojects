import RepositoryType from "@/types/Repository";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SkeletonGroup } from "@/components/ui/skeleton-group";

export function Repos({
  githubUser,
  isBearerAuth,
}: {
  githubUser: string;
  isBearerAuth: boolean;
}) {
  const bearerToken = import.meta.env.VITE_GITHUB_BEARER;

  const {
    data: repos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["repos"],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.github.com/users/${githubUser}/repos`,
        isBearerAuth
          ? { headers: { Authorization: `Bearer ${bearerToken}` } }
          : {}
      );
      return response.data;
    },
    staleTime: 60000,
    refetchOnMount: "always",
    retry: false,
  });

  if (error)
    return (
      <div className="flex flex-col justify-center items-center">
        {" "}
        <h1 className="text-2xl my-4">User not found or rate limit. </h1>{" "}
        <h1 className="text-muted-foreground">
          (you can fix this by cloning this project and providing a github auth
          token.)
        </h1>
      </div>
    );

  if (isLoading) return <SkeletonGroup />;

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl"><span className="font-semibold">{githubUser}</span> Repositories:</h1>
      <div className="flex justify-center flex-row flex-wrap gap-4 ">
        {repos?.map((repo: RepositoryType) => {
          return (
            <div
              key={repo.full_name}
              className="w-[12rem] h-[15rem] border rounded-md flex flex-col items-center justify-between p-4 text-s overflow-y-auto overflow-x-hidden"
            >
              <div className="flex flex-col justify-center items-center my-2">
                <div className="text-xl font-semibold text-center">
                  {repo.name}
                </div>
                <div className="text-muted-foreground text-xs font-semibold text-center">
                  {repo.full_name}
                </div>
              </div>
              <div className="flex justify-center items-center text-[13px] text-center">
                {repo.description}
              </div>
              <div>
                <Link className="m-auto" to={`/repos/${repo.full_name}`}>
                  <Button variant={"secondary"}>Details</Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
