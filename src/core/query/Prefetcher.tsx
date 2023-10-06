import {Hydrate, QueryClient} from '@tanstack/react-query';
import {FC, ReactNode} from 'react';
import prefetchHydrateState from './usePrefetch';

interface ICoursesPrefetcherProps {
    children: ReactNode;
    prefetchQueryFn: (queryClient: QueryClient) => Promise<void>;
}

const Prefetcher: FC<ICoursesPrefetcherProps> = async ({
    children,
    prefetchQueryFn,
}) => {
    const state = await prefetchHydrateState(prefetchQueryFn);
    return <Hydrate state={state}>{children}</Hydrate>;
};

export default Prefetcher;
