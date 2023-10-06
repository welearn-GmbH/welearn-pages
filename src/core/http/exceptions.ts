import {IFetchResponse} from './http.model';

export class SessionException extends Error {
    static type = 'SESSION_EXCEPTION';
    static message = 'Session failure';
}

export class MaintenanceException extends Error {
    static type = 'MAINTENANCE_EXCEPTION';
    static message = 'Maintenance in progress';
}

export class CancelException extends Error {
    static type = 'CANCEL_EXCEPTION';
    static message = 'Request was cancelled';
}

export class FetchException extends Error {
    constructor(message: string, response?: IFetchResponse) {
        super(message);
        this.response = response;
    }

    response?: IFetchResponse;
}
