import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles/createMixins" {
  interface Mixins {
    pxToRem: (pxSize: number) => string;
    flexRow: CSSProperties;
    flexColumn: CSSProperties;
    avenirLight: CSSProperties;
    capitalizeFirstLetter: CSSProperties;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    ikea: {
      darkBlack: string;
      ikeaBlue: string;
      greyLight:string;
      greyMedium:string;
      lightWheat:string;
    };
  }
  interface PaletteOptions {
    ikea?: {
      darkBlack: "#111111";
      ikeaBlue: "#0058A3";
      greyLight: "#e9ecef";
      greyMedium: "#67748e";
      lightWheat: "#fafafa";
    };
  }
}

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#46a543",
      contrastText: "#4a4a4a",
    },
    ikea: {
      darkBlack: "#111111",
      ikeaBlue: "#0058A3",
      greyLight: "#e9ecef",
      greyMedium: "#67748e",
      lightWheat: "#fafafa",
    },
  },
  mixins: {
    pxToRem: (pxSize: number): string => {
      const CURRENT_HTML_FONT_SIZE = 15;

      return `${pxSize / CURRENT_HTML_FONT_SIZE}rem`;
    },
    flexRow: {
      display: "flex",
      flexDirection: "row",
    },
    flexColumn: {
      display: "flex",
      flexDirection: "column",
    },
    avenirLight: {
      fontFamily: "AvenirLight, Helvetica, Arial, sans-serif",
    },
    capitalizeFirstLetter: {
      textTransform: "lowercase",
      "&:first-letter": {
        textTransform: "capitalize",
      },
    },
  },
});

export default customTheme;
