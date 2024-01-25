import _debounce from "lodash/debounce";
import { useEffect, useState } from "react";

const usePadginationService = () => {
  const [page, setPage] = useState(1); // Track page number
  const [loadingMore, setLoadingMore] = useState(false); // Track loading state

  // us debounce to limit calls per scroll when we get to 90% of the screen
  const handleScroll = _debounce(() => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollPosition / documentHeight) * 100;

    if (scrollPercentage > 90 && !loadingMore) {
      setPage((page) => page + 1);
    }
  }, 1000);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    page,
    loadingMore,
    setPage,
    setLoadingMore,
  };
};

export default usePadginationService;
