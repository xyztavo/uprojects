import { Skeleton } from "./skeleton";

export function SkeletonGroup() {
    return (
        <>
            <Skeleton className='w-[15rem] h-[20rem] ' />
            <Skeleton className='w-[15rem] h-[20rem]' />
            <Skeleton className='w-[15rem] h-[20rem] ' />
            <Skeleton className='w-[15rem] h-[20rem] ' />
            <Skeleton className='w-[15rem] h-[20rem] ' />
            <Skeleton className='w-[15rem] h-[20rem] ' />
        </>
    )
}