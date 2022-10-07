import { FC } from "react";
import classNames from "classnames";
import CardGrade from "@/components/card/CardGrade";
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
        `md:w-[26.5rem]`,
        { ["w-[13.5rem]"]: grades.length === 3 },
        { ["w-[18rem]"]: grades.length === 4 },
        { ["w-[22.5rem]"]: grades.length === 5 },
        { ["w-[26.5rem]"]: grades.length >= 6 }
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
