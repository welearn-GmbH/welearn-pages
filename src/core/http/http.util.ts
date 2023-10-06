import queryString from 'query-string';
import wait from '../../utils/wait';
import {
    CancelException,
    FetchException,
    MaintenanceException,
    SessionException,
} from './exceptions';
import {IFetchResponse, MaintenanceMode} from './http.model';

export const addMethodsToFetch = (
    fetchMethod: <T>(
        url: string,
        params: RequestInit,
    ) => Promise<IFetchResponse<T>>,
) => {
    return {
        get: <T = any>(
            url: string,
            options?: RequestInit & {params?: object},
        ) =>
            fetchMethod<T>(
                url +
                    (options?.params
                        ? '?' +
                          queryString.stringify(options?.params, {
                              arrayFormat: 'bracket',
                          })
                        : ''),
                {
                    method: 'GET',
                    headers: {Accept: 'application/json'},
                    ...options,
                },
            ),
        delete: <T = any>(
            url: string,
            options?: RequestInit & {params?: object},
        ) =>
            fetchMethod<T>(
                url +
                    (options?.params
                        ? '?' +
                          queryString.stringify(options?.params, {
                              arrayFormat: 'bracket',
                          })
                        : ''),
                {
                    method: 'DELETE',
                    headers: {Accept: 'application/json'},
                    ...options,
                },
            ),
        post: <T = any>(url: string, body?: any, options?: RequestInit) =>
            fetchMethod<T>(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(body),
                ...options,
            }),
        patch: <T = any>(url: string, body?: any, options?: RequestInit) =>
            fetchMethod<T>(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(body),
                ...options,
            }),
    };
};

export const makeRequest = async <T>(
    url: string,
    params: RequestInit,
): Promise<IFetchResponse<T>> => {
    const res = await fetch(url, params)
        .catch(async error => {
            checkThrowCancelException(error);
            // Network error, retrying...
            await wait(2000);
            return fetch(url, params);
        })
        .catch(async error => {
            checkThrowCancelException(error);
            // Network error, retrying...
            await wait(2000);
            return fetch(url, params);
        })
        .catch(error => {
            checkThrowCancelException(error);
            // Network error again, oh well...
            throw new FetchException('Request failed: ' + error.message);
        });

    let data: T;
    try {
        data = await res.json();
    } catch (error) {
        data = null as T;
    }

    const response: IFetchResponse = {
        headers: res.headers,
        status: res.status,
        data: data,
        url: url,
    };

    if (!(res.status >= 200 && res.status < 300)) {
        console.log(res.status);
        throw new FetchException(
            typeof data === 'string' ? data : 'API response error',
            response,
        );
    }

    return response;
};

export const checkThrowCancelException = (error: FetchException) => {
    if (error.name === 'AbortError' || error instanceof CancelException) {
        throw new CancelException();
    }
};

export const checkThrowMaintenanceException = (error: FetchException) => {
    const {maintenanceMode} = getMaintenanceMode(error.response);
    if (maintenanceMode) {
        throw new MaintenanceException();
    }
};

const assumeMaintenanceStatusCodes = [500, 501, 502, 503, 504];

export const getMaintenanceMode = (response?: IFetchResponse) => {
    let maintenanceMode = response?.headers.get('x-maintenance-mode') as
        | MaintenanceMode
        | undefined;
    const maintenanceUntil = response?.headers.get('x-maintenance-until') as
        | string
        | undefined;
    const maintenanceFrom = response?.headers.get('x-maintenance-from') as
        | string
        | undefined;

    if (
        !maintenanceMode &&
        response &&
        assumeMaintenanceStatusCodes.includes(response.status)
    ) {
        maintenanceMode = MaintenanceMode.FULL;
    }

    console.log(maintenanceMode);

    return {maintenanceMode, maintenanceFrom, maintenanceUntil};
};

export const checkIsSessionError = (error: FetchException) => {
    const badAuthCodes = [401, 403];
    return (
        badAuthCodes.includes(error?.response?.status as number) ||
        error instanceof SessionException
    );
};
