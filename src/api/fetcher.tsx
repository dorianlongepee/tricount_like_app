import { baseUrl } from "@/constants";
import axios from "axios";
import useSWR, { mutate } from "swr";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useData = (endPoint: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${baseUrl}/${endPoint}`,
    fetcher
  );
  return { data, error, isLoading, mutate };
};

export const revalidate = (endPoint: string) => {
  mutate(`${baseUrl}/${endPoint}`);
};
