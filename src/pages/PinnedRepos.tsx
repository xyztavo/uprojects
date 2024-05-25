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
import { getQlRepositories } from "@/services/githubService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export function PinnedRepos({ githubUser }: { githubUser: string }) {
  const { data: pinnedRepos, isLoading, error } = useQuery({
    queryKey: ["pinned"],
    queryFn: () => getQlRepositories(githubUser),
    staleTime: 60000,
    refetchOnMount: "always",
    retry: false
  });

  if (error) return <div className="text-3xl text-center my-4">Error: Something happened</div>

  if (isLoading) return <Loading />
  return (
    pinnedRepos && 
      <div className="p-4">
        <h1 className="text-2xl text-center py-10">
          <span className="text-2xl font-semibold">{githubUser}</span> Pinned Repositories:
        </h1>
        <div className="flex justify-center gap-10 flex-row min-w-54 flex-wrap">
          {pinnedRepos.data.user.pinnedItems.edges.map((e) => (
            <Card
              key={e.node.name}
              className="w-[15rem] h-[20rem] text-center flex flex-col justify-center"
            >
              <CardHeader>
                <CardTitle>{e.node.name}</CardTitle>
                <CardDescription>{e.node.nameWithOwner}</CardDescription>
              </CardHeader>
              <CardContent>{e.node.description}</CardContent>
              <CardFooter>
                <Link className="m-auto" to={`/repos/${e.node.nameWithOwner}`}>
                  <Button>Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
  );
}
