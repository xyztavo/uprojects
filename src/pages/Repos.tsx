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
import { SkeletonGroup } from '@/components/ui/skeleton-group';



export function Repos({githubUser, isBearerAuth}: { githubUser: string, isBearerAuth: boolean}) {
    const bearerToken = import.meta.env.VITE_GITHUB_BEARER;
    
    const { data: repos, isFetching, error } = useQuery({
        queryKey: ['repos'], queryFn: async () => {
            const response = await axios.get(`https://api.github.com/users/${githubUser}/repos`, isBearerAuth ? { headers: { Authorization: `Bearer ${bearerToken}`}} : {});
            return response.data;
        }, staleTime: 60000, refetchOnMount: 'always', retry: false
    })

    if (error) return <div className='flex flex-col justify-center items-center'> <h1 className='text-2xl my-4'>User not found or rate limit. </h1> <h1 className='text-muted-foreground'>(you can fix this by cloning this project and providing a github auth token.)</h1></div>

    return (
        <div className='p-4'>
            <div className='flex  justify-center gap-10 flex-row min-w-54 flex-wrap'>
                {isFetching ?
                    <div className='flex justify-center gap-10 flex-row min-w-54 flex-wrap'>
                       <SkeletonGroup />
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