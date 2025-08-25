import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RepositoryType from "@/types/Repository";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

export function FilteredRepos() {
  const [searchParams] = useSearchParams();
  const bearerToken = import.meta.env.VITE_GITHUB_BEARER;
  const query = searchParams.get("q") as string;

  const githubUser = import.meta.env.VITE_GITHUB_USER;
  const githubApiUrl = `https://api.github.com/users/${githubUser}/repos`;
  const {
    data: repos,
    isLoading,
    error,
  } = useQuery<RepositoryType[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get(
        githubApiUrl,
        { headers: { Authorization: `Bearer ${bearerToken}` } }
      );
      return response.data;
    },
    staleTime: 60000,
    refetchOnMount: "always",
  });

  if (isLoading) return <Loading />

  if (error){
    return (
      <div className="flex flex-row justify-center items-center gap-4">
        <X />
        no "{query}" was found on {githubUser} repository. Internal server error.
      </div>
    );
}
  return repos && 
    repos?.length > 1 && (
    <div>
      <div className="text-2xl text-center my-10">Results for: {query}</div>
      <div className="flex justify-center gap-10 flex-row min-w-54 flex-wrap">
        {repos
          ?.filter((repo: RepositoryType) =>
            repo.name.toLowerCase().includes(query?.toLowerCase())
          )
          .map((filteredRepo: RepositoryType) => (
            <Card
              key={filteredRepo.full_name}
              className="w-[15rem] h-[20rem] text-center flex flex-col justify-center"
            >
              <CardHeader>
                <CardTitle>{filteredRepo.name}</CardTitle>
                <CardDescription>{filteredRepo.full_name}</CardDescription>
              </CardHeader>
              <CardContent>{filteredRepo.description}</CardContent>
              <CardFooter>
                <Link
                  className="m-auto"
                  to={`/repos/${filteredRepo.full_name}`}
                >
                  <Button>Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  ) 
}
