import axios from "axios";
import { GetStaticProps, NextPage } from "next";
import useSWR from "swr";
import { API_PATH } from "@/constants/api";
import { Alert, Spinner } from "flowbite-react";
import { listSongByArtist } from "@/lib/utils/fn";
import { GroupType } from "@/constants/group";
import { getAllGroups } from "@/lib/fauna";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const StatsPage: NextPage<{ groups: Array<GroupType> }> = (props) => {
  const { groups } = props;
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

  const list = listSongByArtist(data);

  const sortable = Object.keys(list)
    .map((i) => {
      return list[i];
    })
    .sort((a, b) => b.length - a.length);

  return (
    <div>
      {sortable.map((item, index) => {
        const artist = groups.find((x: GroupType) => x.name === item[0].artist);

        return (
          <div key={index} className="flex">
            <p>{item[0].artist}</p>
            <p>
              {item.length}/{artist?.cardPosition.length}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsPage;

export const getStaticProps: GetStaticProps = async () => {
  const groups = await getAllGroups();
  return {
    props: {
      groups,
    },
    revalidate: 10,
  };
};
