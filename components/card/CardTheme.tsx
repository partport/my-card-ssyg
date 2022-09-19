import { FC, MutableRefObject } from "react";
import { useRef, useState } from "react";
import { Card, Badge, TextInput, Select } from "flowbite-react";
import ListGrades from "@/components/list/ListGrades";
import ButtonEdit from "@/components/button/ButtonEdit";
import ButtonSave from "@/components/button/ButtonSave";
import ButtonDelete from "@/components/button/ButtonDelete";
import {
  CARD_GRADE_STATUS,
  ThemeCardType,
  ThemeCreateType,
  ThemeUpdateType,
  THEME_CARD_TYPE,
} from "@/constants/index";

export type Props = {
  name: string;
  order: number;
  type: string;
  grades: Array<string>;
  isNew: boolean;
  onSave: (params: any) => any;
  onDelete: () => any;
};

const CardTheme: FC<Props> = ({
  name,
  order,
  type,
  grades,
  isNew = false,
  onSave,
  onDelete,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [themeName, setThemeName] = useState<string>(name);
  const [cards, setCards] = useState<Array<string>>(grades);
  const refName = useRef() as MutableRefObject<HTMLInputElement>;
  const refOrder = useRef() as MutableRefObject<HTMLInputElement>;
  const refType = useRef() as MutableRefObject<HTMLSelectElement>;

  const handleOnEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleOnSave = () => {
    const name = refName.current.value;
    const order = parseInt(refOrder.current.value);
    setIsEdit(false);
    setThemeName(name);

    if (!isNew) {
      const data: ThemeUpdateType = {
        status: "UPDATE",
        data: {
          order,
          name,
          cards,
        },
      };
      onSave(data);
    } else {
      const type = refType.current.value as ThemeCardType;
      const data: ThemeCreateType = {
        status: "CREATE",
        data: {
          order,
          name,
          type,
          cards,
          length: cards.length,
          isNew: !isNew,
        },
      };
      onSave(data);
    }
  };

  const handleOnDelete = () => {
    setIsEdit(false);
    onDelete();
  };

  const handleCardChange = (card: string, index: number) => {
    setCards((prev) => {
      prev.splice(index, 1, card);
      return [...prev];
    });
  };

  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-2 overflow-auto">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            {isEdit || isNew ? (
              <>
                <div className="w-14">
                  <TextInput
                    id="order"
                    defaultValue={order}
                    type="number"
                    ref={refOrder}
                  />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  defaultValue={themeName}
                  ref={refName}
                />
              </>
            ) : (
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                {themeName}
              </h3>
            )}
            {(type === THEME_CARD_TYPE.LIMITED ||
              type === THEME_CARD_TYPE.EVENT) && (
              <Badge
                color={type === THEME_CARD_TYPE.LIMITED ? "warning" : "pink"}
              >
                {type}
              </Badge>
            )}
            {isNew && (
              <div className="w-24">
                <Select id="songType" ref={refType}>
                  {Object.keys(THEME_CARD_TYPE).map((item, index) => (
                    <option key={item}>{item}</option>
                  ))}
                </Select>
              </div>
            )}
          </div>
          <div className="flex gap-2 p-2">
            {!isNew && <ButtonEdit onClick={handleOnEdit} />}
            {(isEdit || isNew) && (
              <>
                <ButtonSave onClick={handleOnSave} />
                <ButtonDelete onClick={handleOnDelete} />
              </>
            )}
          </div>
        </div>
        <ListGrades
          grades={grades}
          cardStatus={
            isEdit || isNew ? CARD_GRADE_STATUS.EDIT : CARD_GRADE_STATUS.SHOW
          }
          onCardEdit={(data, index) => handleCardChange(data, index)}
        />
      </div>
    </Card>
  );
};

export default CardTheme;
