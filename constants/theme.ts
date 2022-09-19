import { CARD_GRADE } from "./card";

export const THEME_CARD_TYPE = {
  NORMAL: "NORMAL",
  LIMITED: "LIMITED",
  EVENT: "EVENT",
} as const;

export type ThemeCardType =
  typeof THEME_CARD_TYPE[keyof typeof THEME_CARD_TYPE];

export const THEME_POINT = {
  [CARD_GRADE.R]: 40,
  [CARD_GRADE.S]: 25,
  [CARD_GRADE.A]: 15,
  [CARD_GRADE.B]: 8,
  [CARD_GRADE.C]: 3,
  [CARD_GRADE.NONE]: 0,
};

export type ThemeType = {
  _id: string;
  order: number;
  name: string;
  type: ThemeCardType;
  cards: Array<string>;
  length: number;
  artist: string;
};

export type ThemeUpdateType = {
  status: "UPDATE";
  data: Pick<ThemeType, "order" | "name" | "cards">;
};

export type ThemeCreateType = {
  status: "CREATE";
  data: Omit<ThemeType, "_id" | "artist"> & { isNew: boolean };
};

export type FaunaCreateThemeType = Omit<ThemeType, "_id" | "artist"> & {
  artist: { connect: string };
};
