import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Alert, Card, Spinner } from "flowbite-react";
import axios from "axios";
import useSWR, { mutate } from "swr";
import {
  API_PATH,
  FaunaCreateThemeType,
  ThemeCreateType,
  ThemeType,
  ThemeUpdateType,
  THEME_CARD_TYPE,
} from "@/constants/index";

import ButtonAdd from "@/components/button/ButtonAdd";
import ButtonDelete from "@/components/button/ButtonDelete";
import { putEntry } from "@/lib/fauna";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ManagePage: NextPage = () => {
  const { data, error } = useSWR(API_PATH.THEME, fetcher);

  if (error) {
    return (
      <Alert color="failure">
        <span>
          <span className="font-medium">fail to load</span>
        </span>
      </Alert>
    );
  }

  if (!data) {
    return (
      <div className="text-center">
        <Spinner color="purple" size="xl" aria-label="loading..." />
        <span className="pl-3">Loading...</span>
      </div>
    );
  }

  const onClickAdd = async () => {
    data.map((item: ThemeType) => {
      setTimeout(() => {
        // putEntry({
        //   status: "UPDATE",
        //   data: {
        //     _id: item._id,
        //     order: item.order,
        //     name: item.name,
        //     cards: item.cards.map((card) => card.toUpperCase()),
        //   },
        // });
        // console.log(item._id);
      }, 800);
    });

    putEntry(API_PATH.THEME, {
      status: "CREATE",
      data: {
        order: 21,
        name: "new21",
        type: THEME_CARD_TYPE.NORMAL,
        cards: ["-", "-", "-", "-"],
        length: 4,
        artist: {
          connect: "339975178070000204",
        },
      },
    });

    await mutate(API_PATH.THEME);
  };

  const onClickDel = async (_id: string) => {
    putEntry(API_PATH.THEME, {
      status: "DELETE",
      data: { _id },
    });
    await mutate(API_PATH.THEME);
  };

  return (
    <>
      <ButtonAdd onClick={onClickAdd} />
      <div className="mx-auto grid grid-cols-4 gap-2">
        {data.map((item: ThemeType) => (
          <Card key={item._id}>
            <div className="break-words">
              <p>{item._id}</p>
              <p>cards#{JSON.stringify(item.cards)}</p>
              <ButtonDelete onClick={() => onClickDel(item._id)} />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ManagePage;
