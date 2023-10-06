import {NextRequest} from 'next/server';
import {SERVER_URLS} from '../../../../core/http/endpoints.server';
import {httpAnonymous} from '../../../../core/http/http.server';
import {IJWTResponse} from './model';
import {parseJwtToken} from './util';

export const POST = async (req: NextRequest) => {
    const {username, password} = await req.json();

    const res = await httpAnonymous.post<IJWTResponse>(SERVER_URLS.LOGIN, {
        username,
        password,
    });

    const jwtData = parseJwtToken(res.data.token);

    const headers = new Headers();
    headers.append(
        'Set-Cookie',
        `token=${
            res.data.token
        }; HttpOnly; Secure; Path=/; Expires=${jwtData.payload.exp.toUTCString()}`,
    );
    headers.append(
        'Set-Cookie',
        `refresh_token=${
            res.data.refreshToken
        }; HttpOnly; Secure; Path=/; Expires=${jwtData.payload.exp.toUTCString()}`,
    );

    return new Response(JSON.stringify(jwtData), {
        status: 200,
        headers,
    });
};
