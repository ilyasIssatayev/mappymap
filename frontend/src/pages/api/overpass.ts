import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

type Data = {
    // Define the shape of the data you expect from the external API
    // For example, if you expect an object with `id` and `name` properties, you could do:
    id: number;
    name: string;
}[];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const apiUrl = `https://overpass-api.de/api/interpreter?data=${req.body.query}`;
        const response = await fetch(apiUrl);
        const jsonData: any = await response.json() as any;
        res.status(200).json(jsonData);
    } catch (error: any) {
        console.log(error)
        res.status(500).json(error);
    }
}
