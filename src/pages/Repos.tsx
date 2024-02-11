import RepositoryType from '@/types/Repository';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton';

const githubUser = import.meta.env.VITE_GITHUB_USER

const githubApiUrl = `https://api.github.com/users/${githubUser}/repos`


export function Repos() {
    const { data: repos, isFetching } = useQuery({
        queryKey: ['todos'], queryFn: async () => {
            const response = await axios.get(githubApiUrl);
            return response.data;
        }, staleTime: 60000, refetchOnMount: 'always',
    })

   

    return (
        <div>
            <h1 className='text-2xl text-center py-10'>All Repositories:</h1>
            <div className='flex  justify-center gap-10 flex-row min-w-54 flex-wrap'>
                {isFetching ?
                    <div className='flex justify-center gap-10 flex-row min-w-54 flex-wrap'>
                        <Skeleton className='w-[15rem] h-[20rem] ' />
                        <Skeleton className='w-[15rem] h-[20rem]' />
                        <Skeleton className='w-[15rem] h-[20rem] ' />
                        <Skeleton className='w-[15rem] h-[20rem] ' />
                        <Skeleton className='w-[15rem] h-[20rem] ' />
                        <Skeleton className='w-[15rem] h-[20rem] ' />
                    </div>
                    :
                    repos?.map((repo: RepositoryType) => {
                        return (
                            <Card key={repo.full_name} className='w-[15rem] h-[20rem] text-center flex flex-col justify-center'>
                                <CardHeader>
                                    <CardTitle >{repo.name}</CardTitle>
                                    <CardDescription>{repo.full_name}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {repo.description}
                                </CardContent>
                                <CardFooter>
                                    <Link className='m-auto' to={`/repos/${repo.full_name}`}><Button>Details</Button></Link>
                                </CardFooter>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}