import { Buffer } from 'buffer';
import { IToken } from './auth.model';

// seconds the token is considered to be expired if he would expire in this time
const SESSION_TOKEN_VALID_DELTA = 10 * 1000;

export const isSessionTokenValid = (sessionTokenExpireTime: string): boolean => {
    return Number.parseInt(sessionTokenExpireTime) - SESSION_TOKEN_VALID_DELTA > new Date().getTime();
};

/*
    A jwt token has 3 parts:
    1. the header -> json object
    2. the payload -> json object
    3. the signature -> no json object

    they are base64 strings separated by a dot
*/
export const parseSessionToken = (sessionToken: string): IToken => {
    const splittedSessionToken = sessionToken
        .split('.')
        .slice(0, 2)
        .map(x => Buffer.from(x, 'base64'));

    const headerObj = JSON.parse(splittedSessionToken[0].toString());
    const payload = JSON.parse(splittedSessionToken[1].toString());

    return {
        header: {
            typ: headerObj.typ,
            alg: headerObj.alg,
        },
        payload: {
            iat: payload.iat,
            exp: new Date(payload.exp * 1000),
            roles: payload.roles,
            username: payload.username,
            now: new Date(payload.now * 1000),
            id: payload.id,
            runningSubscription: payload.runningSubscription,
            fullAccess: payload.fullAccess,
            isFullyAuthenticated: payload.isFullyAuthenticated,
            isChargebee: payload.isChargebee,
        },
    } as IToken;
};
