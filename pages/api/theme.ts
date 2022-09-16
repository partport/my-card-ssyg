// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ThemeType } from "@/constants/theme";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createThemes,
  deleteThemeCard,
  getAllThemes,
  listThemeByGroup,
  updateThemeCard,
} from "@/lib/fauna/index";

type Data = Array<ThemeType>;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "GET":
      const { group } = req.query;
      if (group) {
        const data = await listThemeByGroup(group as string);
        return res.json(data);
      } else {
        const data = await getAllThemes();
        return res.json(data);
      }
    case "POST":
      const {
        body: { status, data },
      } = req;
      if (status === "UPDATE") {
        const { _id, order, name, cards } = data;

        const updateCard = await updateThemeCard(_id, {
          order,
          name,
          cards,
        });
        return res.json(updateCard);
      } else if (status === "CREATE") {
        const { order, name, type, cards, length, artist } = data;
        const created = await createThemes({
          order,
          name,
          type,
          cards,
          length,
          artist,
        });
        res.json(created);
      } else if (status === "DELETE") {
        const { _id } = data;
        const deleted = await deleteThemeCard(_id);
        res.json(deleted);
      }

    default:
      return res.status(405).end();
  }
};

export default handler;
