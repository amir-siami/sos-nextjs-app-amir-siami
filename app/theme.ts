"use client";

import { createTheme } from "@mui/material/styles";

// 👇 import local font
import localFont from "next/font/local";

//👇 Configure our local font object
const myFont = localFont({ src: "../public/fonts/IRANSansXV.woff2" });

// import { Rubik } from "next/font/google";

// const rubik = Rubik({
//   weight: ["300", "400", "500", "700"],
//   subsets: ["arabic"],
//   display: "swap",
// });

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: myFont.style.fontFamily,
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
