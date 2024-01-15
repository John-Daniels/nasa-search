"use client";
import { ShowHideView } from "@/components/Transitions/Transitions";
import { IMedia } from "@/models/media.model";
import useNasaService from "@/services/nasa/nasa.service";
import { formatDDMMYYY } from "@/utils";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const {
    getMediaByID,
    getMediaCollection,
    requestState: { isLoading, isSuccess },
  } = useNasaService();

  const [media, setMedia] = useState<IMedia>({} as any);
  const [collection, setCollection] = useState<string[]>([]);

  const fetchData = async () => {
    const data = await getMediaByID(id);
    setMedia(data as any);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    (async () => {
      if (media_type === "video") {
        const collection = await getMediaCollection(media.href, "video");
        setCollection(collection);
      }
    })();
  }, [media]);

  const { media_type } = media.data?.[0] || {};
  const isVideo = media_type === "video";
  return (
    <ShowHideView
      show={isSuccess && !!media?.data}
      fallback={
        <div className="h-[100vh] flex justify-center items-center">
          {!isSuccess ? <CircularProgress /> : <span>404</span>}
        </div>
      }
      className=""
    >
      {!!media?.data && (
        <div className="w-full min-h-[100vh] flex flex-col text-white/80">
          <div className="relative h-[500px] mx-4 mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
            {isVideo ? (
              <video
                src={collection[0]}
                autoPlay
                controls
                className="w-full h-full bg-black"
              />
            ) : (
              <img
                src={media.links[0].href}
                className="w-full object-cover"
                alt="card-image"
              />
            )}
          </div>

          <div className="p-6">
            <h5 className="block mb-2 font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
              {media.data[0].title}
            </h5>

            <div className="flex gap-1">
              <span className="font-thin text-sm">Tags - </span>
              {media.data[0].keywords.slice(0, 3).map((keywords) => (
                <span className="flex justify-center items-center text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-blue-900 text-blue-300 hover:bg-blue-900/80 cursor-pointer">
                  {keywords}
                </span>
              ))}
            </div>
            <span className="font-thin text-sm">
              {formatDDMMYYY(media.data[0].date_created)}
            </span>

            <h4 className="text-2xl font-semibold mt-6">Description</h4>
            <p className="font-sans text-base antialiased font-light leading-relaxed text-inherit mt-2">
              {media.data[0].description}
            </p>
          </div>
        </div>
      )}
    </ShowHideView>
  );
};

// IDK / Wizkid

export default page;
