import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Base64 } from "js-base64";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkRehype from "remark-rehype";
import { Loading } from "@/components/Loading";

export function Repo() {
  const params = useParams();
  const currentRepository = params["*"];

  const githubUrl = `https://api.github.com/repos/${currentRepository}`;
  const readmeRepoUrl = `https://api.github.com/repos/${currentRepository}/contents/README.md`;

  const {
    data: repo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get(githubUrl);
      return response.data;
    },
    staleTime: 60000,
    refetchOnMount: "always",
    retry: false,
  });

  const {
    data: readmeData,
    isFetching: isReadmeFetching,
    error: isErrorReadme,
  } = useQuery({
    queryKey: ["readme"],
    queryFn: async () => {
      const response = await axios.get(readmeRepoUrl);
      return response.data;
    },
    staleTime: 60000,
    refetchOnMount: "always",
    retry: false,
  });

  if (error) return <div className="my-4 ">no repo found</div>

  if (isLoading || isReadmeFetching) return <Loading />;

  return (
    <div>
      <div
        key={repo.full_name}
        className="flex flex-col p-4 text-xl m-auto text-center"
      >
        <div className="py-3">{repo.full_name}</div>
        <div className="flex flex-row gap-4 m-auto">
          <a href={repo.html_url} target="_blank">
            <Button size={"lg"}>Github</Button>
          </a>
          {repo.homepage && (
            <a href={repo.homepage} target="_blank">
              <Button size={"lg"} variant={"outline"}>
                Live Site
              </Button>
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col m-auto text-xl max-w-[50rem] gap-4">
        <h1 className="pt-4 text-center font-bold">Readme.md :</h1>
        {isErrorReadme ? (
          <div className="text-center">No README.md found.</div>
        ) : (
          <>
            <Markdown
              className={"readme"}
              remarkPlugins={[remarkGfm, remarkRehype, rehypeRaw]}
            >
              {Base64.decode(readmeData.content)}
            </Markdown>
          </>
        )}
      </div>
    </div>
  );
}
