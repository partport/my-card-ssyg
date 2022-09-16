import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Alert, Spinner } from "flowbite-react";
import axios from "axios";
import useSWR from "swr";
import {
  API_PATH,
  ThemeCreateType,
  ThemeType,
  ThemeUpdateType,
} from "@/constants/index";
import { getAllThemes } from "@/lib/fauna";
import { findTopFiveTheme } from "@/lib/utils/fn";
import CardThemeTopFive from "@/components/card/CardThemeTopFive";
import CardArtist from "@/components/card/CardArtist";
import { GroupType } from "@/constants/group";
import { themesDB } from "database";
// import { themes_db } from "database";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Home: NextPage<{ themes: Array<ThemeType> }> = (props) => {
  const { themes } = props;
  const router = useRouter();
  const { data: groupList, error } = useSWR(API_PATH.GROUP, fetcher);

  if (error) {
    return (
      <Alert color="failure">
        <span>
          <span className="font-medium">fail to load</span>
        </span>
      </Alert>
    );
  }
  if (!groupList) {
    return (
      <div className="text-center">
        <Spinner color="purple" size="xl" aria-label="loading..." />
        <span className="pl-3">Loading...</span>
      </div>
    );
  }

  const handleGroup = (_id: string) => {
    router.push(`/groups/${_id}`);
  };

  const TOP_FIVE_THEME = findTopFiveTheme(themes);
  return (
    <>
      <CardThemeTopFive topFive={TOP_FIVE_THEME} />
      <div className="mx-auto grid grid-cols-4 gap-4 mt-4">
        {groupList.map((item: GroupType) => (
          <CardArtist
            name={item.name}
            onClick={() => handleGroup(item._id)}
            key={item._id}
          />
        ))}
      </div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllThemes();

  return {
    props: {
      themes: data,
    },
  };
};
