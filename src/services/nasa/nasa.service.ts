"use client";
import API from "@/constants/api.constant";
import { IMedia } from "@/models/media.model";
import { useState } from "react";
import toast from "react-hot-toast";
import useRequest from "../request/request.service";

const useNasaService = () => {
  const { makeRequest, ...requestState } = useRequest();
  const [results, setResults] = useState<IMedia[]>([]);

  const search = async (search: string, media_type: string) => {
    try {
      const res = await makeRequest({
        method: "GET",
        url: API.search,
        params: {
          q: search,
          media_type,
        },
      });

      const { collection } = res.data;
      setResults(collection.items);
    } catch (error) {
      toast.error("Something went wrong, Please try again");
    }
  };

  const getMediaByID = async (nasa_id: string) => {
    try {
      const res = await makeRequest({
        method: "GET",
        url: API.search,
        params: {
          nasa_id,
        },
      });

      const { collection } = res.data;

      return collection.items[0] as IMedia;
    } catch (error) {
      toast.error("Something went wrong, Please try again");
    }
  };

  return { search, results, requestState, getMediaByID };
};

export default useNasaService;
