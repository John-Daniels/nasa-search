"use client";
import { IMedia } from "@/models/media.model";
import useNasaService from "@/services/nasa/nasa.service";
import Link from "next/link";
import { useEffect, useState } from "react";
import FadeImage from "../FadeImage";

export const MediaCard = ({ media }: { media: IMedia }) => {
  const { media_type } = media.data[0];
  const { getMediaCollection } = useNasaService();
  const [collection, setCollection] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      if (media_type === "video") {
        const collection = await getMediaCollection(media.href, "video");
        setCollection(collection);
      }
    })();
  }, []);

  const isVideo = media_type === "video";

  return (
    <div
      role="media-card"
      className="relative flex flex-col mt-6 text-gray-300 glass-morphism shadow-md bg-clip-border rounded-xl w-96 "
    >
      <div className="relative h-56 mx-4 mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        {isVideo ? (
          <video
            src={collection[0]}
            muted
            autoPlay
            className="h-full bg-black"
          />
        ) : (
          <FadeImage
            src={media.links[0].href + `?cache=${media.data[0].nasa_id}`}
            width={1000}
            height={1000}
            className="object-cover w-full h-full"
            alt={media.data[0].title + " picture"}
          />
        )}
      </div>

      <div className="p-6">
        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-white line-clamp-2">
          {media.data[0].title}
        </h5>
        <p className="font-sans text-base antialiased font-light leading-relaxed text-inherit line-clamp-2">
          {media.data[0].description}
        </p>
      </div>
      <div className="p-6 pt-0">
        <Link href={`assets/${media.data[0].nasa_id}`}>
          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
          >
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

export const MediaSkeleton = () => {
  return (
    <div
      role="status"
      className="flex items-center justify-center w-96 h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
    >
      <svg
        className="w-10 h-10 text-gray-200 dark:text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 20"
      >
        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
