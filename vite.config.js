import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    port: 5174,
    strictPort: true,
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "PlacesAutocomplete.js"),
      //formats: ["es", "umd", "iife"],
      name: "PlacesAutocomplete", // Global variable name for UMD/IIFE builds
      // the proper extensions will be added
      fileName: (format) =>
        `places-autocomplete.${
          format === "es" ? "js" : format === "umd" ? "umd.cjs" : format + ".js"
        }`,
    },
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true, // Clean the output directory before building
    sourcemap: true, // Generate source maps for easier debugging
    // minify: 'terser', // Default is 'esbuild' which is faster. 'terser' can be smaller.
    // rename file places-autocomplete-js.css to places-autocomplete.css
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "places-autocomplete-js.css") {
            return "places-autocomplete.css";
          }
          return assetInfo.name;
        },
      },
    },
  },
  plugins: [tailwindcss()],
  root: __dirname,
  //root: resolve(__dirname, "lib"),
  test: {
    globals: true,
    environment: "jsdom",
    include: ["./tests/**/*.test.js"],
    //exclude: ['./lib/_tests_/**'],
  },
});
