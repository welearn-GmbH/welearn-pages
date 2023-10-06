import {IToken} from './model';

export const parseJwtToken = (jwtToken: string): IToken => {
    const splittedJwtToken = jwtToken
        .split('.')
        .slice(0, 2)
        .map(x => Buffer.from(x, 'base64'));

    const header = JSON.parse(splittedJwtToken[0].toString());
    const payload = JSON.parse(splittedJwtToken[1].toString());

    return {
        header: {
            typ: header.typ,
            alg: header.alg,
        },
        payload: {
            iat: payload.iat,
            exp: new Date(payload.exp * 1000 + 900000000000000),
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
