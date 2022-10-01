import { GetStaticProps, NextPage } from 'next';
import { listItemByArtist } from '@/lib/utils/fn';
import { getAllGroups, getAllSongs, getAllThemes } from '@/lib/fauna';
import { GroupType } from '@/constants/group';
import { SongsType } from '@/constants/songs';
import { ThemeCardType } from '@/constants/themes';
import Head from 'next/head';
import {
  getDate,
  getDay,
  getMonth,
  getYear,
  intervalToDuration,
} from 'date-fns';
import axios from 'axios';
import useSWR from 'swr';
const fetcher = (url: any) => axios.get(url).then((res) => res.data);

type Props = {
  groups: Array<GroupType>;
  songs: Array<SongsType>;
  themes: Array<ThemeCardType>;
};
const StatsPage: NextPage<Props> = (props) => {
  const { groups, songs, themes } = props;
  const songList = listItemByArtist(songs);
  const sortSongByEfficient = Object.keys(songList)
    .map((i) => songList[i])
    .sort((a, b) => {
      const [artistA] = groups.filter((x: GroupType) => x.name === a[0].artist);
      const efficientA = a.length / artistA.cardPosition.length;
      const [artistB] = groups.filter((x: GroupType) => x.name === b[0].artist);
      const efficientB = b.length / artistB.cardPosition.length;
      return efficientB - efficientA;
    });

  const { data, error } = useSWR('/api/bonus', fetcher);
  if (!data) return null;

  const date = new Date();
  const thisYear = getYear(date);

  const bonus = data.filter((item: any) => {
    const startDate = new Date(`${item.startDate}-${thisYear}`);
    const endDate = new Date(`${item.endDate}-${thisYear}`);
    return date >= startDate && date <= endDate;
  });

  // console.log(songs.filter(x => x.album === 'THE ALBUM'));

  return (
    <>
      <Head>
        <title>stats</title>
      </Head>
      <div>
        {sortSongByEfficient.map((item, index) => {
          const [artist] = groups.filter(
            (x: GroupType) => x.name === item[0].artist
          );

          return (
            <div key={index} className='flex'>
              <p>{item[0].artist}</p>
              <p>
                ({item.length}/{artist?.cardPosition.length})
              </p>
              <p className='font-bold'>
                {(item.length / (artist?.cardPosition.length ?? 1)).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
      <div>
        {bonus.map((item: any) => {
          if (item.name.match('Birthday')) {
            return <p key={item.name}>{item.name}</p>;
          } else {
            const bonusSong = songs.filter((x) => x.album === item.name);
            console.log(bonusSong);
            return bonusSong.map((song) => {
              return <p key={song.title}>{song.title}</p>;
            });
          }
        })}
      </div>
    </>
  );
};

export default StatsPage;

export const getStaticProps: GetStaticProps = async () => {
  const groups = await getAllGroups();
  const songs = await getAllSongs();
  const themes = await getAllThemes();
  return {
    props: {
      groups,
      songs,
      themes,
    },
    revalidate: 10,
  };
};
