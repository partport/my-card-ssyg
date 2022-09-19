import { songDB } from './../../database/index';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return res.json(songDB.getAll());

    default:
      return res.status(405).end();
  }
};
export default handler;
