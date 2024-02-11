import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getQlRepositories } from "@/services/githubService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";



export function PinnedRepos() {

    const { data: pinnedRepos, isFetching: isPinnedFetching } = useQuery({
        queryKey: ['pinned'], queryFn: getQlRepositories, staleTime: 60000, refetchOnMount: 'always',
    })

    return (
        <>
            {pinnedRepos && pinnedRepos.data.user.pinnedItems.totalCount > 0 && <h1 className='text-2xl text-center py-10'>Pinned Repositories:</h1>}
            <div className='flex  justify-center gap-10 flex-row min-w-54 flex-wrap'>
                {isPinnedFetching ?
                    <div className='flex justify-center gap-10 flex-row min-w-54 flex-wrap'>
                        <Skeleton className='w-[15rem] h-[20rem] ' />
                        <Skeleton className='w-[15rem] h-[20rem]' />
                        <Skeleton className='w-[15rem] h-[20rem] ' />
                        <Skeleton className='w-[15rem] h-[20rem] ' />
                    </div>
                    :
                    pinnedRepos && pinnedRepos.data.user.pinnedItems.edges.map(e => {
                        return (
                            <Card key={e.node.name} className='w-[15rem] h-[20rem] text-center flex flex-col justify-center'>
                                <CardHeader>
                                    <CardTitle >{e.node.name}</CardTitle>
                                    <CardDescription>{e.node.nameWithOwner}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {e.node.description}
                                </CardContent>
                                <CardFooter>
                                    <Link className='m-auto' to={`/repos/${e.node.nameWithOwner}`}><Button>Details</Button></Link>
                                </CardFooter>
                            </Card>
                        )
                    })
                }
            </div>
        </>
    )
}