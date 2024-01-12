import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiCircularProgress: {
      defaultProps: {
        size: 20,
        thickness: 9,
      },
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          color: "black",
          "&.Mui-selected": {
            backgroundColor: "black",
            color: "white",
          },
          "&:hover": {
            backgroundColor: "black",
            color: "white",
          },
        },
        previousNext: {
          backgroundColor: "black",
          color: "white",
          "&:hover": {
            backgroundColor: "black",
          },
        },
        // next: {
        //   backgroundColor: "black",
        //   color: "white",
        //   "&:hover": {
        //     backgroundColor: "black",
        //   },
        // },
      },
    },
  },
});
