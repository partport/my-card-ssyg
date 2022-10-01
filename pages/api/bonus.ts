import type { NextApiRequest, NextApiResponse } from 'next';
import tt from '../../backup/json/bonus.json'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.json(tt);
};

export default handler;
