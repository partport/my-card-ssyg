import type { NextPage } from 'next';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { Alert, Card, Spinner } from 'flowbite-react';
import { API_PATH } from '@/constants/api';
import ButtonAdd from '@/components/button/ButtonAdd';
import {
  SongsNewType,
  SongStatusType,
  SongsType,
  SONG_STATUS_MANAGE,
} from '@/constants/songs';
import { GroupType } from '@/constants/group';
import { putEntry } from '@/lib/fauna';
import { listSongByArtist } from '@/lib/utils/fn';
import SongModal from '@/components/modal/SongModal';
import { useState } from 'react';
import Link from 'next/link';

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const ManagePage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalStatusType, setModalStatusType] = useState<SongStatusType>(
    SONG_STATUS_MANAGE.CREATE
  );
  const [updateSongData, setUpdateSongData] = useState<SongsType>();
  const { data, error } = useSWR(API_PATH.SONGS, fetcher);
  if (error) {
    return (
      <Alert color='failure'>
        <span>
          <span className='font-medium'>fail to load</span>
        </span>
      </Alert>
    );
  }
  if (!data) {
    return (
      <div className='grid grid-cols-1 gap-2'>
        {Array.from(Array(10).keys()).map((i) => (
          <Card key={i}>
            <div className='flex flex-wrap break-words flex-column animate-pulse'>
              <div className='flex items-center gap-4 w-full'>
                <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
              </div>
              {Array.from(Array(10).keys()).map((i) => (
                <div
                  className='flex items-center space-x-2 w-full mb-2'
                  key={i}
                >
                  <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-64'></div>
                  <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32'></div>
                  <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-16'></div>
                  <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-28'></div>
                  <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-16'></div>
                  <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-16'></div>
                  <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-16'></div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const SongByArtist = listSongByArtist(data);
  const ARTIST = Object.keys(SongByArtist);

  const handleOnClickAdd = async () => {
    setModalStatusType(SONG_STATUS_MANAGE.CREATE);
    setIsModalOpen(!isModalOpen);
    setUpdateSongData(undefined);
  };

  const handleOnCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOnSongAdd = async (type: string, newSong: SongsNewType) => {
    const { data } = await axios.get(API_PATH.GROUP);
    const { _id } = data.find((x: GroupType) => x.name === newSong.artist);
    if (type === SONG_STATUS_MANAGE.CREATE) {
      const res = await putEntry(API_PATH.SONGS, {
        status: 'CREATE',
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
    } else if (type === SONG_STATUS_MANAGE.EDIT) {
      const res = await putEntry(API_PATH.SONGS, {
        status: 'UPDATE',
        data: {
          _id: updateSongData?._id || '',
          title: newSong.title,
          album: newSong.album,
          track: newSong.track,
          release_date: newSong.releaseDate,
          length: newSong.length,
          notes: newSong.notes,
        },
      });
      if (res?.response?.errors) {
        console.log(res.response);
      } else {
        setIsModalOpen(false);
        await mutate(API_PATH.SONGS);
      }
    }
  };

  const handleOnEditSong = (item: SongsType) => {
    setIsModalOpen(true);
    setModalStatusType(SONG_STATUS_MANAGE.EDIT);
    setUpdateSongData(item);
  };

  return (
    <>
      <div className='grid grid-cols-1 gap-2'>
        <div className='flex justify-end'>
          <ButtonAdd onClick={() => handleOnClickAdd()} />
        </div>

        {ARTIST.map((name: string) => (
          <Card key={name}>
            <div className='flex flex-wrap break-words flex-column'>
              <div className='flex items-center gap-4 mb-4 w-full'>
                <p className='font-bold'>{name}</p>
              </div>
              {SongByArtist[name].map((item: any) => (
                <div
                  className='grid grid-cols-12 w-full'
                  key={item.title + item.artist}
                >
                  <p className='col-span-4'>{item.title}</p>
                  <p className='col-span-2'>{item.album}</p>
                  <p>{item.track}</p>
                  <p className='col-span-2'>{item.releaseDate}</p>
                  <p>{item.length}</p>
                  <p>{item.notes}</p>

                  <Link href='#'>
                    <a
                      className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                      onClick={() => handleOnEditSong(item)}
                    >
                      Edit
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <SongModal
        type={modalStatusType}
        modalOpen={isModalOpen}
        artist={ARTIST}
        onCloseModal={handleOnCloseModal}
        onSubmit={(type: string, data: SongsNewType) =>
          handleOnSongAdd(type, data)
        }
        item={updateSongData}
      />
    </>
  );
};

export default ManagePage;
