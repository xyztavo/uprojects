import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton"

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Base64 } from 'js-base64';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import remarkRehype from 'remark-rehype'

export function Repo() {

    const params = useParams()
    const currentRepository = params['*']

    const githubUrl = `https://api.github.com/repos/${currentRepository}`;
    const readmeRepoUrl = `https://api.github.com/repos/${currentRepository}/contents/README.md`


    const { data: repo, isFetching } = useQuery({
        queryKey: ['todos'], queryFn: async () => {
            const response = await axios.get(githubUrl);
            return response.data;
        }, staleTime: 60000
    })

    const { data: readmeData, isFetching: isReadmeFetching } = useQuery({
        queryKey: ['readme'], queryFn: async () => {
            const response = await axios.get(readmeRepoUrl)
            return response.data;
        }, staleTime: 60000
    })

    return (
        <div>
            {isFetching ?
                <>
                    <div className='flex flex-col p-4 text-xl m-auto text-center'>
                        <div className='flex justify-center py-3'>
                            <Skeleton className="flex rounded-xl w-[200px] h-[20px] justify-center py-3" />
                        </div>
                        <div className='flex flex-row gap-4 m-auto'>
                            <Skeleton className="flex flex-row rounded-xl w-[200px] h-[20px] justify-center py-3" />
                            <Skeleton className="flex flex-row rounded-xl w-[200px] h-[20px] justify-center py-3" />
                        </div>
                    </div>
                    <div className='flex flex-col m-auto text-xl max-w-[50rem]'>
                    <Skeleton className='flex flex-row m-auto my-4 py-3 justify-center rounded-xl w-[200px] h-[20px] ' />
                    <Skeleton className="flex flex-row rounded-xl w-[50rem] h-[40vh] justify-center py-3" />
                    </div>
                </>
                :
                <>
                    <div className='flex flex-col p-4 text-xl m-auto text-center'>
                        <div className='py-3'>{repo.full_name}</div>
                        <div className='flex flex-row gap-4 m-auto'>
                            <a key={repo.html_url} href={repo.html_url} target='_blank'>
                                <Button size={'lg'}>Github</Button>
                            </a>
                            {repo.homepage &&
                                <a key={repo.homepage} href={repo.homepage} target='_blank'>
                                    <Button size={'lg'} variant={'outline'}>Live Site</Button>
                                </a>}

                        </div>
                    </div>
                    <div className='flex flex-col m-auto text-xl max-w-[50rem]'>
                        <h1 className='pt-4 text-center font-bold'>Readme.md :</h1>
                        {isReadmeFetching ? <p>Loading...</p> : <><Markdown className={"readme"} remarkPlugins={[remarkGfm, remarkRehype, rehypeRaw,]}>{Base64.decode(readmeData.content)}</Markdown></>}
                    </div>
                </>
            }
        </div>
    )
}