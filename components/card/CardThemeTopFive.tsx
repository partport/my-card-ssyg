import { ThemeType } from "@/constants/theme";
import { FC } from "react";
import ListGrades from "@/components/list/ListGrades";

type Props = {
  topFive: Array<
    Pick<ThemeType, "_id" | "name" | "cards"> & {
      point: number;
    }
  >;
};
const CardThemeTopFive: FC<Props> = ({ topFive }) => {
  return (
    <div className="flex p-4 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col overflow-auto">
      <div className="flex h-full flex-col justify-center gap-2">
        {topFive.map(({ _id, name, cards }) => {
          return (
            <div className="grid grid-cols-1 items-center md:grid-cols-2 auto-cols-max" key={_id}>
              <p className="font-bold text-gray-700 dark:text-gray-400">
                {name}
              </p>
              <ListGrades grades={cards} cardStatus="SHOW" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardThemeTopFive;
