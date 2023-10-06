import {QueryClient, dehydrate} from '@tanstack/react-query';
import getQueryClient from './getQueryClient';

const prefetchHydrateState = async <T>(
    prefetchQueryFn: (queryClient: QueryClient) => Promise<void>,
) => {
    const queryClient = getQueryClient();
    await prefetchQueryFn(queryClient);
    const dehydratedState = dehydrate(queryClient);

    return dehydratedState;
};

export default prefetchHydrateState;
