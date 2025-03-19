// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
// import dts from "vite-plugin-dts";
// import { fileURLToPath } from "url";
// import fs from "fs";

// // Get __dirname equivalent in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export default defineConfig({
//   plugins: [
//     react({
//       jsxImportSource: "@emotion/react",
//     }),
//     cssInjectedByJsPlugin(),
//     dts({
//       insertTypesEntry: true,
//       afterBuild() {
//         // After the build process, manually modify the `index.d.ts` file
//         const dtsPath = path.resolve(__dirname, "dist/index.d.ts");
//         if (fs.existsSync(dtsPath)) {
//           // Overwrite the file to export Calendar as default
//           fs.writeFileSync(dtsPath, "export default OrgChart;");
//         }
//       },
//     }),
//   ],
//   build: {
//     lib: {
//       entry: path.resolve(__dirname, "src/OrgChart.jsx"),
//       name: "OrgChart", // Name for the export
//       fileName: (format) => `hubino-hierarchy.${format}.js`,
//     },
//     rollupOptions: {
//       external: ["react", "react-dom"],
//       output: {
//         globals: {
//           react: "React",
//           "react-dom": "ReactDOM",
//         },
//         assetFileNames: "assets/[name][extname]",
//         exports: "default", // Ensure the module is treated as having a default export
//       },
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "url";
import fs from "fs";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    dts({
      insertTypesEntry: true,
      afterBuild() {
        // After the build process, manually modify the `index.d.ts` file
        const dtsPath = path.resolve(__dirname, "dist/index.d.ts");
        if (fs.existsSync(dtsPath)) {
          fs.writeFileSync(dtsPath, "export { default } from './OrgChart';");
        }
      },
    }),
  ],
  // optimizeDeps: {
  //   exclude: ["react", "react-dom"], // 👈 This prevents Vite from bundling React
  // },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/OrgChart.jsx"), // Corrected entry file path
      name: "OrgChart",
      fileName: (format) => `hubino-hierarchy.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"], // 👈 Ensures React is NOT bundled
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: "assets/[name][extname]",
        exports: "default",
      },
    },
  },
});
