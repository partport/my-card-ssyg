import { FC } from "react";
import CardGrade from "../card/CardGrade";
import classNames from "classnames";
import { CardGradeStatus } from "@/constants/index";

export type Props = {
  grades: Array<string>;
  cardStatus: CardGradeStatus;
  onCardEdit?: (data: string, index: number) => any;
};

const ListGrades: FC<Props> = (props) => {
  const { grades, cardStatus } = props;
  const handleOnCardEdit = (data: string, index: number) => {
    props.onCardEdit?.(data, index);
  };

  return (
    <div
      className={classNames(
        "flex gap-2 flex-wrap text-white font-bold font-mono",
        "w-[26.5rem]"
      )}
    >
      {grades.map((card, index) => (
        <CardGrade
          key={index}
          grade={card}
          cardStatus={cardStatus}
          onCardEdit={(data: string) => handleOnCardEdit(data, index)}
        />
      ))}
    </div>
  );
};

export default ListGrades;
