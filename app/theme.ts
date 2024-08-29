"use client";
import { Rubik } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const rubik = Rubik({
  weight: ["300", "400", "500", "700"],
  subsets: ["arabic"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: rubik.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
});

export default theme;
