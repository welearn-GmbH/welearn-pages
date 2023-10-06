import {FetchException} from './exceptions';
import {IFetchResponse} from './http.model';
import {
    addMethodsToFetch,
    checkThrowCancelException,
    checkThrowMaintenanceException,
    makeRequest,
} from './http.util';

const fetchClient = async <T>(
    url: string,
    params: RequestInit,
): Promise<IFetchResponse<T>> => {
    try {
        if (url.startsWith('/api')) {
            url = `http://localhost:3000${url}`;
        }
        const res = await makeRequest<T>(url, params);
        return res;
    } catch (error) {
        checkThrowCancelException(error as FetchException);
        checkThrowMaintenanceException(error as FetchException);
        throw error;
    }
};

export const http = addMethodsToFetch(fetchClient);
