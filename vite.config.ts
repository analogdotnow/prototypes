import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";
import Unfonts from "unplugin-fonts/vite";
import { defineConfig } from "vite";
import ogPlugin, { type Options } from "vite-plugin-open-graph";
import svgr from "vite-plugin-svgr";

const ogOptions: Options = {
  basic: {
    url: "https://proto.analog.now",
    title: "Analog Prototypes",
    type: "website",
    image: "https://proto.analog.now/og-image.png",
    description: "A collection of UI prototypes for the Analog Calendar.",
    locale: "en_US",
    siteName: "Analog Prototypes",
  },
  twitter: {
    image: "https://proto.analog.now/og-image.png",
    imageAlt: "Analog Prototypes",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [jotaiDebugLabel, jotaiReactRefresh],
      },
    }),
    tailwindcss(),
    svgr(),
    Unfonts({
      google: {
        families: [
          {
            name: "Geist",
            styles: "wght@400;500;600;700",
          },
          {
            name: "Geist Mono",
            styles: "wght@400;500;600;700",
          },
        ],
      },
      custom: {
        families: [
          {
            name: "Satoshi",
            local: "Satoshi",
            src: "./src/global/assets/fonts/Satoshi-*.woff2",
            transform(font) {
              font.style = "normal";
              if (font.basename === "Satoshi-Bold") {
                font.weight = 700;
              } else if (font.basename === "Satoshi-Medium") {
                font.weight = 500;
              }
              font.weight = 400;
              return font;
            },
          },
        ],
        display: "swap",
        preload: true,
      },
    }),
    ogPlugin(ogOptions),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/global"),
      "~": path.resolve(__dirname, "./src/prototypes"),
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
