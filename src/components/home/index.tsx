"use client";

import Assets from "@/constants/assets.constant";
import useNasaService from "@/services/nasa/nasa.service";
import usePadginationService from "@/services/padgination/padgination.service";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MediaCard, MediaSkeleton } from "../MediaCard/MediaCard";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedia, setSelectedMedia] = useState("image");

  const {
    results,
    search,
    requestState: { isLoading, isSuccess },
  } = useNasaService();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await search(searchQuery, selectedMedia);
  };

  const onMediaChange = async (media: string) => {
    setSelectedMedia(media);
    if (searchQuery) await search(searchQuery, media);
  };

  const { page, loadingMore, setLoadingMore } = usePadginationService();

  // keep track of the loading state
  useEffect(() => {
    if (page > 1 && !isLoading && isSuccess) setLoadingMore(false);
  }, [isSuccess]);

  const loadMore = async () => {
    setLoadingMore(true);
    await search(searchQuery, selectedMedia, page); // Increment page number
  };

  useEffect(() => {
    if (page > 1) {
      loadMore();
    }
  }, [page]);

  return (
    <div className={`relative h-[100vh] w-full`}>
      <Image
        className="fixed left-0 top-0 h-full w-full object-cover md:object-contain"
        src={Assets.spaceGalaxies}
        alt="space galaxies"
      />

      <div className="relative flex flex-col min-h-full w-full items-center justify-center fade-bg text-white pt-20">
        <div className="w-[80%] flex flex-col justify-center items-center">
          <Image
            src={Assets.logoText}
            alt="nasa"
            className="w-[300px] sm:w-[400px]"
          />

          <form
            className="h-[80px] w-[80%] sm:w-[60%] mt-5 relative"
            onSubmit={onSubmit}
          >
            <input
              type="text"
              placeholder="Search the universe..."
              className="text-lg placeholder:text-lg w-full h-full rounded-[40px] border-[3px] border-[#F7FAFF]/80 transition duration-500 hover:border-[#F7FAFF] bg-transparent outline-none pl-11 placeholder:text-white search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
              type="submit"
              className="absolute top-0 right-0 h-full flex justify-center items-center pr-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 50 50"
                className="fill-white w-[30px] h-[30px] "
              >
                <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
              </svg>
            </button>
          </form>

          <div className="mt-10 ">
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button
                onClick={() => onMediaChange("image")}
                style={{
                  backgroundColor: selectedMedia === "image" ? "#1976D266" : "",
                }}
              >
                Images
              </Button>
              <Button
                onClick={() => onMediaChange("video")}
                style={{
                  backgroundColor: selectedMedia === "video" ? "#1976D266" : "",
                }}
              >
                Videos
              </Button>
            </ButtonGroup>
          </div>

          <p className="mt-[20px] text-white/80 ">
            I'm Feeling Like an astronaut today
          </p>
        </div>

        {/* results */}

        <div className="w-full flex flex-wrap justify-center items-center gap-2 md:gap-10 my-10 px-1">
          {isLoading &&
            page == 1 &&
            Array(5)
              .fill("data")
              .map((d, i) => <MediaSkeleton key={i} />)}

          {results.map((media, index) => (
            <MediaCard media={media} key={index} />
          ))}

          {isLoading &&
            page > 1 &&
            Array(5)
              .fill("data")
              .map((d, i) => <MediaSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
