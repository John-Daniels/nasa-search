"use client";

import { RFC } from "@/utils//types";
import { theme } from "@/utils/theme";
import { ThemeProvider } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function AppProvider({ children }: RFC) {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      // delay: 200, // Delay between animations in milliseconds
      once: false, // Whether to animate elements only once
    });
    AOS.refresh();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {/* <Provider store={store}> */}
      {children}
      <Toaster />
      {/* </Provider> */}
    </ThemeProvider>
  );
}

export default AppProvider;
