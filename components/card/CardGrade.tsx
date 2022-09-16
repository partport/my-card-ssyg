import { FC, FormEvent, useState } from "react";
import { TextInput } from "flowbite-react";
import classNames from "classnames";
import {
  CardGradeStatus,
  CARD_GRADE,
  CARD_GRADE_STATUS,
} from "@/constants/index";

export type Props = {
  grade: string;
  cardStatus: CardGradeStatus;
  onCardEdit?: (params: string) => any;
};

const CardGrade: FC<Props> = (props) => {
  const { grade, cardStatus } = props;
  const [cardGrade, setCardGrade] = useState(grade.toUpperCase());

  const handleOnBlurInput = (value: string) => {
    const card = value.toUpperCase();
    setCardGrade(card);
    props.onCardEdit?.(card);
  };

  return (
    <div
      className={classNames(
        "w-16 rounded-lg flex items-center justify-center shadow-lg uppercase text-center",
        {
          "p-4": cardStatus === CARD_GRADE_STATUS.SHOW,
          "p-2": cardStatus === CARD_GRADE_STATUS.EDIT,
          "bg-gradient-to-r from-purple-500 to-pink-500": cardGrade.startsWith(
            CARD_GRADE.R
          ),
          "bg-yellow-300": cardGrade.startsWith(CARD_GRADE.S),
          "bg-purple-800": cardGrade.startsWith(CARD_GRADE.A),
          "bg-red-600": cardGrade.startsWith(CARD_GRADE.B),
          "bg-gray-400": cardGrade.startsWith(CARD_GRADE.C),
          "bg-gray-300":
            cardGrade.startsWith(CARD_GRADE.NONE) || cardGrade === "",
        }
      )}
    >
      {cardStatus === CARD_GRADE_STATUS.EDIT ? (
        <TextInput
          id="small"
          type="text"
          sizing="sm"
          defaultValue={cardGrade}
          onKeyUp={(el: FormEvent<HTMLInputElement>) =>
            handleOnBlurInput(el.currentTarget.value)
          }
          maxLength={3}
        />
      ) : (
        cardGrade
      )}
    </div>
  );
};

export default CardGrade;
