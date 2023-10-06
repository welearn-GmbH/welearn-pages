import {FetchException} from './exceptions';
import {IFetchResponse} from './http.model';
import {
    addMethodsToFetch,
    checkIsSessionError,
    checkThrowCancelException,
    checkThrowMaintenanceException,
    makeRequest,
} from './http.util';
import {tryRefreshSessionToken} from './http.util.server';

const fetchAnonymous = async <T>(
    url: string,
    params: RequestInit,
): Promise<IFetchResponse<T>> => {
    try {
        const res = await makeRequest<T>(url, params);
        return res;
    } catch (error) {
        checkThrowCancelException(error as FetchException);
        checkThrowMaintenanceException(error as FetchException);
        throw error;
    }
};

const fetchAuthorized = async <T>(
    url: string,
    params: RequestInit,
): Promise<IFetchResponse<T>> => {
    try {
        const res = await makeRequest<T>(url, params);
        return res;
    } catch (error) {
        checkThrowCancelException(error as FetchException);
        checkThrowMaintenanceException(error as FetchException);
        if (checkIsSessionError(error as FetchException)) {
            await tryRefreshSessionToken();
            return fetchAuthorized<T>(url, params);
        }
        throw error;
    }
};

const fetchUBA = async <T>(
    url: string,
    params: RequestInit,
): Promise<IFetchResponse<T>> => {
    try {
        const res = await makeRequest<T>(url, params);
        return res;
    } catch (error) {
        checkThrowCancelException(error as FetchException);
        if (checkIsSessionError(error as FetchException)) {
            await tryRefreshSessionToken();
            return fetchUBA<T>(url, params);
        }
        throw error;
    }
};

export const httpAnonymous = addMethodsToFetch(fetchAnonymous);
export const httpAuthorized = addMethodsToFetch(fetchAuthorized);
export const httpUBA = addMethodsToFetch(fetchUBA);
