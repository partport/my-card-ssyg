// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GroupType } from '@/constants/group';
import type { NextApiRequest, NextApiResponse } from "next";
import { groupDB } from './../../database/index';

type Data = Array<GroupType>;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.json(groupDB.getAll());
};

export default handler;
