"use client";
import API from "@/constants/api.constant";
import { IMedia } from "@/models/media.model";
import { isImage, isVideo } from "@/utils";
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
          nasa_id: nasa_id.split(" ").join(""),
        },
      });

      const { collection } = res.data;
      return collection.items?.[0] as IMedia | null;
    } catch (error) {
      toast.error("Something went wrong, Please try again");
    }
  };

  const getMediaCollection = async (url: string, type: "video" | "image") => {
    try {
      const { data } = await makeRequest({
        url,
        method: "GET",
      });

      return (data as string[]).filter((media) =>
        type === "video" ? isVideo(media) : isImage(media)
      );
    } catch (error) {
      throw error;
    }
  };

  return { search, results, requestState, getMediaByID, getMediaCollection };
};

export default useNasaService;
