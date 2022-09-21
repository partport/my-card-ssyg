import type { GetStaticProps, NextPage } from "next";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { Alert, Card, Spinner } from "flowbite-react";
import { API_PATH } from "@/constants/api";
import ButtonAdd from "@/components/button/ButtonAdd";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import XCircleIcon from "@/components/icons/XCircleIcon";
import { songDB } from "database";
import { SongsType } from "@/constants/songs";
import { putEntry } from "@/lib/fauna";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const ManagePage: NextPage<{ songs: Array<any> }> = (props) => {
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
  let artist: Array<string> = [];
  const SongByArtist = props.songs.reduce((acc: any, item: any) => {
    const key = item["artist"];

    if (!acc[key]) {
      acc[key] = [];
      artist.push(key);
    }
    acc[key].push(item);

    return acc;
  }, {});

  const handleAdd = async (name: string) => {
    SongByArtist[name].map(async (item: any) => {
      const res = await putEntry(API_PATH.SONGS, {
        status: "CREATE",
        data: {
          title: item.title,
          album: item.album,
          track: item.track,
          release_date: item.release_date,
          length: item.length,
          notes: item.notes,
          artist: {
            connect: item.artist_connect,
          },
        },
      });
      console.log(res);
      await mutate(API_PATH.SONGS);
    });
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      {artist.map((name: string) => (
        <Card key={name}>
          <div className="flex flex-wrap break-words flex-column">
            <div className="flex items-center gap-4 mb-4 w-full">
              <p className="font-bold">{name}</p>
              <ButtonAdd onClick={() => handleAdd(name)} />
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
                <p className="col-span-2">{item.release_date}</p>
                <p>{item.length}</p>
                <p>{item.notes}</p>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};
export default ManagePage;

export const getStaticProps: GetStaticProps = async () => {
  const songs = songDB.getAll();
  return {
    props: {
      songs,
    },
    revalidate: 10,
  };
};
