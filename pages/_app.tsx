import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";
import useSWR from "swr";
import axios from "axios";
import type { AppProps } from "next/app";
import { API_PATH } from "../constants";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

function MyApp({ Component, pageProps }: AppProps) {
  const { data, error } = useSWR(API_PATH.GROUP, fetcher);

  return (
    <Layout groups={data}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
