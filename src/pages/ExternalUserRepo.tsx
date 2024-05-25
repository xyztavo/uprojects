import { useParams } from "react-router-dom";
import { Repos } from "./Repos";

export function ExternalUser() {
  const { githubname } = useParams();

  if (!githubname) return <div>No name was provided.</div>;

  return (
    <div className="flex flex-col justify-center items-center my-4">
      <h1 className="text-2xl">{githubname} Repositories: </h1>
      <Repos githubUser={githubname} isBearerAuth={false} />
    </div>
  );
}
