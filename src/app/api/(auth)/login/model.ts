export interface IJWTResponse {
    token: string;
    refreshToken: string;
}

export interface IJWTHeader {
    typ: string;
    alg: string;
}

export interface IJWTPayload {
    iat: number;
    exp: Date;
    roles: string[];
    username: string;
    now: Date;
    id: number;
    runningSubscription: boolean;
    fullAccess: boolean;
    isFullyAuthenticated: boolean;
    isChargebee: boolean;
}

export interface IToken {
    header: IJWTHeader;
    payload: IJWTPayload;
}
