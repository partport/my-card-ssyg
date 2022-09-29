import type { GetStaticProps, NextPage } from "next";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { Alert, Card, Spinner } from "flowbite-react";
import { API_PATH } from "@/constants/api";
import ButtonAdd from "@/components/button/ButtonAdd";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import XCircleIcon from "@/components/icons/XCircleIcon";
import { songDB } from "database";
import { SongsNewType, SongsType } from "@/constants/songs";
import { GroupType } from "@/constants/group";
import { putEntry } from "@/lib/fauna";
import { listSongByArtist } from "@/lib/utils/fn";
import CreateSongModal from "@/components/modal/CreateSongModal";
import { useState } from "react";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const ManagePage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, error } = useSWR(API_PATH.SONGS, fetcher);
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

  const SongByArtist = listSongByArtist(data);
  const ARTIST = Object.keys(SongByArtist);

  const handleOnClickAdd = async () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOnCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOnSongAdd = async (newSong: SongsNewType) => {
    const { data } = await axios.get(API_PATH.GROUP);
    const { _id } = data.find((x: GroupType) => x.name === newSong.artist);

    const res = await putEntry(API_PATH.SONGS, {
      status: "CREATE",
      data: {
        title: newSong.title,
        album: newSong.album,
        track: newSong.track,
        release_date: newSong.releaseDate,
        length: newSong.length,
        notes: newSong.notes,
        artist: {
          connect: _id,
        },
      },
    });
    if (res?.response?.errors) {
      console.log(res.response);
    } else {
      setIsModalOpen(false);
      await mutate(API_PATH.SONGS);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-2">
        <ButtonAdd onClick={() => handleOnClickAdd()} />

        {ARTIST.map((name: string) => (
          <Card key={name}>
            <div className="flex flex-wrap break-words flex-column">
              <div className="flex items-center gap-4 mb-4 w-full">
                <p className="font-bold">{name}</p>
              </div>
              {SongByArtist[name].map((item: any) => (
                <div
                  className="grid grid-cols-12 w-full"
                  key={item.title + item.artist}
                >
                  <div>
                    {data.findIndex(
                      (x: SongsType) =>
                        x.title === item.title && x.artist === item.artist
                    ) !== -1 ? (
                      <p className="text-green-600">
                        <CheckCircleIcon />
                      </p>
                    ) : (
                      <p className="text-red-600">
                        <XCircleIcon />
                      </p>
                    )}
                  </div>
                  <p className="col-span-4">{item.title}</p>
                  <p className="col-span-2">{item.album}</p>
                  <p>{item.track}</p>
                  <p className="col-span-2">{item.releaseDate}</p>
                  <p>{item.length}</p>
                  <p>{item.notes}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <CreateSongModal
        modalOpen={isModalOpen}
        artist={ARTIST}
        onCloseModal={handleOnCloseModal}
        onSubmit={(data: SongsNewType) => handleOnSongAdd(data)}
      />
    </>
  );
};

export default ManagePage;
