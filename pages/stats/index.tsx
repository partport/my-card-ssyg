import type { NextPage } from "next";
import axios from "axios";
import useSWR from "swr";
import { Alert, Spinner } from "flowbite-react";
import { API_PATH } from "@/constants/api";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);
const StatsPage: NextPage = () => {
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

  const songByArtist = data.reduce((acc: any, item: any) => {
    const key = item["artist"];

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);

    return acc;
  }, {});

  return <p></p>;
};
export default StatsPage;
