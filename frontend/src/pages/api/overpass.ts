import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';


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
        const { name, hash, preload } = req.body.cacheMeta;
        const filePath = path.join(process.cwd(), 'data', name + "_" + hash + '.json');

        if (fs.existsSync(filePath)) {
            const jsonData = fs.readFileSync(filePath, 'utf8');
            return res.status(200).json(JSON.parse(jsonData));
        }

        if (preload)return res.status(404);

        const apiUrl = `https://overpass-api.de/api/interpreter?data=${req.body.query}`;
        const response = await fetch(apiUrl);
        const jsonData: any = await response.json() as any;


        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
            }
        });

        res.status(200).json(jsonData);
    } catch (error: any) {
        console.log(error)
        res.status(500).json(error);
    }
}