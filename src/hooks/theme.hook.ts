import { useMediaQuery } from "@mui/material";
// import { ThemeState } from '../store/theme.slice';

const useAppTheme = (): {
  isMobile: boolean;
  isTab: boolean;
  isMiniDesktop: boolean;
  // themeMode: ThemeState;
} => {
  const isMobile = useMediaQuery("(max-width:550px)");
  const isTab = useMediaQuery("(max-width: 800px)");
  const isMiniDesktop = useMediaQuery("(max-width: 1000px)");
  // const themeMode = useAppSelector((state) => state.theme) as ThemeState;

  return {
    isMobile,
    isTab,
    isMiniDesktop,
    // themeMode,
  };
};

export default useAppTheme;
