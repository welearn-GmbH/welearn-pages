export interface IFetchResponse<T = any> {
    data: T;
    headers: Headers;
    status: number;
    url: string;
}

export enum MaintenanceMode {
    FULL = 'full',
    READ_ONLY = 'read-only',
}

export interface MaintenanceInfo {
    mode?: MaintenanceMode;
    dateUntil?: string;
    dateFrom?: string;
}
