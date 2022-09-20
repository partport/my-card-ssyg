import type { GetStaticProps, NextPage } from 'next';
import axios from 'axios';
import useSWR from 'swr';
import { Alert, Card, Spinner } from 'flowbite-react';
import { API_PATH } from '@/constants/api';
import ButtonAdd from '@/components/button/ButtonAdd';
import CheckCircleIcon from '@/components/icons/CheckCircleIcon';
import XCircleIcon from '@/components/icons/XCircleIcon';
import { songDB } from 'database';

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const StatsPage: NextPage<{ songs: Array<any> }> = (props) => {
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
      <div className='text-center'>
        <Spinner color='purple' size='xl' aria-label='loading...' />
        <span className='pl-3'>Loading...</span>
      </div>
    );
  }
  let artist: Array<string> = [];
  const SongByArtist = props.songs.reduce((acc: any, item: any) => {
    const key = item['artist'];

    if (!acc[key]) {
      acc[key] = [];
      artist.push(key);
    }
    acc[key].push(item);

    return acc;
  }, {});

  const handleAdd = (name: string) => {
    console.log(SongByArtist[name]);
  };

  return (
    <div className='grid grid-cols-1 gap-2'>
      {artist.map((name: string) => (
        <Card key={name}>
          <div className='flex flex-wrap break-words flex-column'>
            <div className='flex items-center gap-4 mb-4 w-full'>
              <p className='font-bold'>{name}</p>
              <ButtonAdd onClick={() => handleAdd(name)} />
            </div>
            {SongByArtist[name].map((item: any) => (
              <div className='grid grid-cols-7 w-full' key={item.title}>
                <div>
                  <p className='text-green-600'>
                    <CheckCircleIcon />
                  </p>
                  <p className='text-red-600'>{/* <XCircleIcon /> */}</p>
                </div>
                <p>{item.title}</p>
                <p>{item.album}</p>
                <p>{item.track}</p>
                <p>{item.release_date}</p>
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
export default StatsPage;

export const getStaticProps: GetStaticProps = async () => {
  const songs = songDB.getAll();
  return {
    props: {
      songs,
    },
  };
};
