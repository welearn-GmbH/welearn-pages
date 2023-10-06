import {CLIENT_URLS} from '../../core/http/endpoints.client';
import {http} from '../../core/http/http';

export class AuthService {
    static login = async ({
        username,
        password,
    }: {
        username: string;
        password: string;
    }) => {
        await http.post(CLIENT_URLS.LOGIN, {
            username,
            password,
        });
    };

    static logout = async () => {
        await http.post(CLIENT_URLS.LOGOUT);
    };

    static checkUserExists = async (username: string) => {
        const formData = new FormData();
        formData.append('identifier', username);

        const res = await http.post(CLIENT_URLS.CHECK_USER_EXISTS, {
            body: formData,
            headers: {'Content-Type': 'multipart/form-data'},
        });

        if (res.status !== 200) {
            throw res.status;
        }
    };
}
