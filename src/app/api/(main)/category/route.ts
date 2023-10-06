import {NextRequest} from 'next/server';
import {SERVER_URLS} from '../../../../core/http/endpoints.server';
import {httpAuthorized} from '../../../../core/http/http.server';

export const GET = async (req: NextRequest) => {
    const params = req.nextUrl.searchParams;
    const {data} = await httpAuthorized.get(SERVER_URLS.CATEGORIES, {
        params,
    });

    return new Response(JSON.stringify(data), {
        status: 200,
    });
};
