import {cookies} from 'next/headers';
import {IJWTResponse} from '../../services/auth/auth.model';
import {SERVER_URLS} from './endpoints.server';
import {SessionException} from './exceptions';
import {http} from './http';

export const tryRefreshSessionToken = async () => {
    const refreshTokenCookie = cookies().get('refresh_token');
    if (!refreshTokenCookie) {
        throw new SessionException();
    }
    const res = await requestRefreshSessionToken(refreshTokenCookie.value);
    cookies().set('token', res.token);
};

const requestRefreshSessionToken = async (refreshToken: string) => {
    try {
        const {data} = await http.post<IJWTResponse>(
            SERVER_URLS.LOGIN_REFRESH,
            {refreshToken},
        );
        return data;
    } catch (error) {
        throw new SessionException();
    }
};
