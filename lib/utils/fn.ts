import { ThemeType, THEME_POINT } from "@/constants/index";

export const convertGradeToPoint = (cards: Array<string>) => {
  return cards.map((card) => {
    return THEME_POINT[card.toUpperCase().slice(0, 1)];
  });
};

export const convertGradeLvToPoint = (cards: Array<string>) => {
  return cards.map((card) => {
    const lv = card.slice(1, cards.length);
    return parseInt(lv) || 0;
  });
};

export const themePointCalculate = (cards: Array<string>) => {
  return Math.min(...convertGradeToPoint(cards));
};

export const currentThemePoint = (theme: Array<ThemeType>) => {
  return theme
    .map(({ cards }) => themePointCalculate(cards))
    .reduce((prev, curr) => prev + curr, 0);
};

export const totalThemePoint = (quantity: number) => {
  return quantity * THEME_POINT.R;
};

export const findTopFiveTheme = (themes: Array<ThemeType>) => {
  const gradeList = themes.map(({ _id, cards, name, length }) => {
    return {
      _id,
      point:
        themePointCalculate(cards) +
        convertGradeLvToPoint(cards).reduce((a, b) => a + b, 0) / length,
      name,
      cards,
    };
  });
  return gradeList.sort((a, b) => b.point - a.point).slice(0, 5);
};

export const listItemByArtist = (songs: any) => {
  return songs.reduce((acc: any, item: any) => {
    const key = item["artist"];

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);

    return acc;
  }, {});
};
