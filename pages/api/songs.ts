import { SongsType } from '@/constants/songs';
import { getAllSongs, createSongs, updateSong } from './../../lib/fauna/index';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = Array<SongsType>;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'GET':
      return res.json(await getAllSongs());
    case 'POST':
      const {
        body: { status, data },
      } = req;
      if (status === 'CREATE') {
        const created = await createSongs(data);
        res.json(created);
      } else if (status === 'UPDATE') {
        const { _id, ...rest } = data;
        const updateSongs = await updateSong(_id, { ...rest });
        return res.json(updateSongs);
      }

    default:
      return res.status(405).end();
  }
};
export default handler;
