import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { split } from 'postcss/lib/list';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {
        const dirPath = path.join(process.cwd(), 'data');
        const fileList = fs.readdirSync(dirPath)
        const output = fileList.map(path => {
            const splits = path.split('.')[0].split('_');
            const name = splits[0];
            const hash = splits[1];
            return {name, hash,path}
        })

        console.log(output)

        res.status(200).json(output);
    } catch (error: any) {
        console.log(error)
        res.status(500).json(error);
    }
}