export const CARD_GRADE = {
  R: "R",
  S: "S",
  A: "A",
  B: "B",
  C: "C",
  NONE: "-",
};
export type CardGradeType = typeof CARD_GRADE[keyof typeof CARD_GRADE];

export const CARD_GRADE_STATUS = {
  EDIT: "EDIT",
  SHOW: "SHOW",
};
export type CardGradeStatus =
  typeof CARD_GRADE_STATUS[keyof typeof CARD_GRADE_STATUS];
