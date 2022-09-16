import { NextPage } from "next";
import axios from "axios";
import { Alert, Button, Card, Modal, Spinner } from "flowbite-react";
import CardArtist from "@/components/card/CardArtist";
import { currentThemePoint, totalThemePoint } from "@/lib/utils/fn";
import ButtonAdd from "@/components/button/ButtonAdd";
import CardTheme from "@/components/card/CardTheme";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { API_PATH } from "@/constants/api";
import { ThemeCreateType, ThemeType, ThemeUpdateType } from "@/constants/theme";
import { THEME_CARD_TYPE } from "@/constants/theme";

const fetcher = (id: string) => axios(id).then((res) => res.data);

const putEntry = async (payload: ThemeUpdateType | ThemeCreateType) => {
  return fetch(API_PATH.THEME, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
};

const GroupDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    id ? `${API_PATH.THEME}?group=${id}` : null,
    fetcher
  );
  const [themes, setThemes] = useState<Array<ThemeType>>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // useEffect(() => {
  //   if (id) {
  //     setThemes(
  //       themesDB
  //         .findThemeByGroupId(id as string)
  //         .sort((a: ThemeType, b: ThemeType) => b.order - a.order)
  //     );
  //   }
  // }, [id]);

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

  const ARTIST = themes[0].artist.name;

  const handleNewSong = () => {
    setThemes([
      {
        _id: `new${themes.length + 1}`,
        name: "",
        length: themes[0].length,
        cards: Array.from(themes[0].cards, () => "-"),
        type: THEME_CARD_TYPE.NORMAL,
        isNew: true,
        artist: { name: ARTIST },
        order: themes.length + 1,
      },
      ...themes,
    ]);
  };

  const handleOnCancel = () => {
    setModalOpen(true);
    // setThemes(themes.filter((v) => !v._id.startsWith("new")));
  };

  const handleAddNewTheme = async (
    info: ThemeUpdateType | ThemeCreateType,
    _id: string
  ) => {
    const { status, data } = info;
    // upload to fauna
    let songData = {};
    if (status === "UPDATE") {
      const { order, name, cards } = data;
      songData = {
        id: _id,
        updateValue: data,
      };
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
    } else if (status === "CREATE") {
      const { order, name, type, cards, length, isNew } = info.data;
      songData = { name, type, cards, length, order, artist: { connect: id } };
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
              artist: { name: ARTIST },
              isNew,
            };
          } else {
            return v;
          }
        });
      });
    }
    console.log(songData);
    // const responseResult = await putEntry(songData);
    // console.log(responseResult);
    // if (responseResult.response?.errors) {
    //   console.log(
    //     responseResult.response.errors.map(({ message }) => message).join("\n")
    //   );
    //   await mutate(`${API_PATH}?group=${id}`);
    // } else {
    //   console.log(JSON.stringify(responseResult));
    // }
  };

  const onClickModal = () => {
    setModalOpen(!modalOpen);
    console.log(modalOpen);
  };

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
              onCancel={handleOnCancel}
            />
          ))}
        </div>
      </div>

      <Modal show={modalOpen} size="md" popup={true} onClose={onClickModal}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={onClickModal}>
                Yes, Im sure
              </Button>
              <Button color="gray" onClick={onClickModal}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default GroupDetail;
