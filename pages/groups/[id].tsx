import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { Alert, Card, Spinner } from "flowbite-react";
import CardArtist from "@/components/card/CardArtist";
import ButtonAdd from "@/components/button/ButtonAdd";
import CardTheme from "@/components/card/CardTheme";
import NoticeModal from "@/components/modal/NoticeModal";
import { API_PATH } from "@/constants/api";
import {
  ThemeCreateType,
  ThemeType,
  ThemeUpdateType,
  THEME_CARD_TYPE,
} from "@/constants/theme";
import { currentThemePoint, totalThemePoint } from "@/lib/utils/fn";
import { putEntry } from "@/lib/fauna";

const fetcher = (id: string) => axios(id).then((res) => res.data);

type newTheme = Array<ThemeType & { isNew?: boolean }>;

const GroupDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    id ? `${API_PATH.THEME}?group=${id}` : null,
    fetcher
  );
  const [themes, setThemes] = useState<newTheme>([]);
  const [deleteId, setDeleteId] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setThemes(data.sort((a: ThemeType, b: ThemeType) => b.order - a.order));
      setThemes(data.sort((a: ThemeType, b: ThemeType) => b.order - a.order));
    }
  }, [data]);

  if (error) {
    return (
      <Alert color="failure">
        <span>
          <span className="font-medium">fail to load</span>
        </span>
      </Alert>
    );
  }

  if (!themes || themes.length === 0) {
    return (
      <div className="text-center">
        <Spinner color="purple" size="xl" aria-label="loading..." />
        <span className="pl-3">Loading...</span>
      </div>
    );
  }

  const ARTIST = themes[0].artist;

  const handleNewSong = () => {
    setThemes([
      {
        _id: `new${themes.length + 1}`,
        name: "",
        length: themes[0].length,
        cards: Array.from(themes[0].cards, () => "-"),
        type: THEME_CARD_TYPE.NORMAL,
        isNew: true,
        artist: ARTIST,
        order: themes.length + 1,
      },
      ...themes,
    ]);
  };

  const handleAddNewTheme = async (
    info: ThemeUpdateType | ThemeCreateType,
    _id: string
  ) => {
    const { status, data } = info;
    if (status === "UPDATE") {
      const { order, name, cards } = data;
      // local state
      setThemes((prev) => {
        return prev.map((v) => {
          if (v.order === order) {
            return {
              _id,
              order,
              name,
              type: v.type,
              cards,
              length,
              artist: v.artist,
            };
          } else {
            return v;
          }
        });
      });
      // upload to fauna

      const responseResult = await putEntry(API_PATH.THEME, {
        status,
        data: {
          _id,
          order,
          name,
          cards,
        },
      });
      console.log(responseResult);
      if (responseResult?.response?.errors) {
        console.log(JSON.stringify(responseResult.response?.errors));

        await mutate(`${API_PATH}?group=${id}`);
      } else {
        console.log(JSON.stringify(responseResult));
      }
    } else if (status === "CREATE") {
      const { order, name, type, cards, length, isNew } = info.data;
      // local state
      setThemes((prev) => {
        return prev.map((v) => {
          if (v.order === order) {
            return {
              _id: v._id,
              order,
              name,
              type,
              cards,
              length,
              artist: ARTIST,
              isNew,
            };
          } else {
            return v;
          }
        });
      });
      // upload to fauna
      const responseResult = await putEntry(API_PATH.THEME, {
        status,
        data: {
          order,
          name,
          type,
          cards,
          length,
          artist: { connect: id as string },
        },
      });
      console.log(responseResult);
      if (responseResult?.response?.errors) {
        console.log(JSON.stringify(responseResult.response?.errors));

        await mutate(`${API_PATH}?group=${id}`);
      } else {
        console.log(JSON.stringify(responseResult));
      }
    }
  };

  const handleOnDelete = (id: string) => {
    setModalOpen(true);
    setDeleteId(id);
    setThemes(themes.filter((v) => !v._id.startsWith("new")));
  };

  const onCloseModal = () => {
    setModalOpen(false);
    setDeleteId("undefined");
  };

  const onClickModal = async () => {
    setModalOpen(false);

    const responseResult = await putEntry(API_PATH.THEME, {
      status: "DELETE",
      data: { _id: deleteId },
    });
    console.log(responseResult);
    await mutate(`${API_PATH}?group=${id}`);
  };

  const progressThemePoint = Math.floor(
    (currentThemePoint(themes) / totalThemePoint(themes.length)) * 100
  );

  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-4">
          <div className="w-[24rem]">
            <CardArtist name={ARTIST} />
          </div>
          <div>
            <Card>
              <p>
                {currentThemePoint(themes)}/{totalThemePoint(themes.length)}
              </p>

              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: `${progressThemePoint}%` }}
                >
                  {progressThemePoint}%
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="flex justify-end gap-2 mb-2">
          <ButtonAdd onClick={handleNewSong} />
        </div>
        <div className="flex gap-2 flex-col">
          {themes.map((item) => (
            <CardTheme
              key={item._id}
              order={item.order || 0}
              name={item.name}
              type={item.type}
              grades={item.cards}
              isNew={item?.isNew || false}
              onSave={(data) => handleAddNewTheme(data, item._id)}
              onDelete={() => handleOnDelete(item._id)}
            />
          ))}
        </div>
      </div>

      <NoticeModal
        modalOpen={modalOpen}
        onCloseModal={onCloseModal}
        onClickModal={onClickModal}
      />
    </>
  );
};
export default GroupDetail;
