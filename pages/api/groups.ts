import { getAllGroups } from '@/lib/fauna/index';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GroupType } from '@/constants/group';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = Array<GroupType>;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const groups = await getAllGroups();
  res.json(groups);
};

export default handler;
