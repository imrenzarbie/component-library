/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
import path, { resolve } from "path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
const dirname =
    typeof __dirname !== "undefined"
        ? __dirname
        : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
    plugins: [
        react(),
        dts({
            // Configuration for vite-plugin-dts
            insertTypesEntry: true, // Inserts `export * from './src'` into the main d.ts file
        }),
    ],
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, "src/index.ts"),
            name: "ComponentLibrary", // This is the global variable name for IIFE format
            formats: ["es", "cjs"], // Output both ES Module and CommonJS formats
            fileName: (format) =>
                `benco-component-library.${format === "es" ? "mjs" : "cjs"}`,
        },
        rollupOptions: {
            // Make sure to exclude dependencies from your bundle, otherwise they'll be part of the build
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
        // For CSS: Vite by default will extract CSS into a separate file for library builds.
        // If you need specific CSS handling (e.g., inlining smaller CSS files), you might
        // explore `build.cssCodeSplit` or other Vite CSS options.
    },
    test: {
        projects: [
            {
                extends: true,
                plugins: [
                    // The plugin will run tests for the stories defined in your Storybook config
                    // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
                    storybookTest({
                        configDir: path.join(dirname, ".storybook"),
                    }),
                ],
                test: {
                    name: "storybook",
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: "playwright",
                        instances: [
                            {
                                browser: "chromium",
                            },
                        ],
                    },
                    setupFiles: [".storybook/vitest.setup.ts"],
                },
            },
        ],
    },
});
