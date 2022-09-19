import { ThemeUpdateType } from "./../constants/theme";
import { ThemeCardType } from "@/constants/theme";
import themes_db from "./json/themes.json";
// import fs from "fs";
import groups_db from "./json/groups.json";

const getAllThemes = () => {
  return themes_db.map(({ _id, order, name, type, cards, length, artist }) => {
    return {
      _id,
      name,
      order,
      type: type as ThemeCardType,
      cards,
      length,
      artist,
    };
  });
};

const findThemeByGroupId = (id: string) => {
  const group = groups_db.find((x) => x._id === id);
  return getAllThemes().filter(({ artist }) => artist === group?.name);
};

export const themesDB = {
  getAllThemes,
  findThemeByGroupId,
};

export const groupDB = {
  getAll: () => groups_db,
};
