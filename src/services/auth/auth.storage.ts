import {IJWTResponse} from './auth.model';
import {parseSessionToken} from './auth.utils';

export const AUTH_STORAGE_TOKEN_KEY = '@AUTH_SECURE_STORE_TOKEN_KEY';
export const AUTH_STORAGE_REFRESH_TOKEN_KEY =
    'AUTH_SECURE_STORE_REFRESH_TOKEN_KEY';

export class AuthStorage {
    static sessionToken: string | null = null;

    static getSessionToken = () => {
        if (!this.sessionToken) {
            this.sessionToken = localStorage.getItem(AUTH_STORAGE_TOKEN_KEY);
        }
        return this.sessionToken;
    };

    static getRefreshToken = () => {
        return localStorage.getItem(AUTH_STORAGE_REFRESH_TOKEN_KEY);
    };

    static saveAuthData = async (jwtResponse: IJWTResponse) => {
        const tokenData = parseSessionToken(jwtResponse.token);

        // kept in memory in case storage is full to allow app to function on basic level
        this.sessionToken = jwtResponse.token;

        localStorage.setItem(AUTH_STORAGE_TOKEN_KEY, jwtResponse.token);
        localStorage.setItem(
            AUTH_STORAGE_REFRESH_TOKEN_KEY,
            jwtResponse.refreshToken,
        );
    };

    static removeAuthData = async () => {
        localStorage.removeItem(AUTH_STORAGE_TOKEN_KEY);
        localStorage.removeItem(AUTH_STORAGE_REFRESH_TOKEN_KEY);
    };
}
