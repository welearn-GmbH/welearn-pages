import {NextRequest} from 'next/server';

export const POST = (req: NextRequest) => {
    const headers = new Headers();
    headers.delete('Set-Cookie');

    return new Response('ok', {
        status: 200,
        headers,
    });
};
