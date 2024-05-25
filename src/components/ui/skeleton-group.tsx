import { Skeleton } from "./skeleton";

export function SkeletonGroup() {
    return (
        <div className='flex justify-center gap-10 flex-row min-w-54 flex-wrap'>
            <Skeleton className='w-[15rem] h-[20rem] ' />
            <Skeleton className='w-[15rem] h-[20rem]' />
            <Skeleton className='w-[15rem] h-[20rem] ' />
            <Skeleton className='w-[15rem] h-[20rem] ' />
            <Skeleton className='w-[15rem] h-[20rem] ' />
            <Skeleton className='w-[15rem] h-[20rem] ' />
        </div>
    )
}