import { resolve } from 'path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';
import environmentPlugin from 'vite-plugin-environment';
::ESLINT_IMPORT::
::LARAVEL_IMPORT::
::TAILWIND_IMPORT::
import { viteStaticCopy } from 'vite-plugin-static-copy';
::SPRITE_IMPORT::

import feConfig from './frontend.config.json';

let breakpoints = [];
if (feConfig.structure && feConfig.structure.breakpoints) {
    for (const [key, value] of Object.entries(feConfig.structure.breakpoints)) {
        breakpoints.push({ name: key, start: value });
    }
    breakpoints = breakpoints.sort(
        (a, b) => parseInt(a.start) - parseInt(b.start)
    );
    breakpoints = breakpoints.map((a) => a.name);
}

const structure = feConfig.structure;

export default ({ mode }) => defineConfig({
    plugins: [
        dynamicImport(),
        ::ESLINT_PLUGINS::
        environmentPlugin({
            MODE: mode,
            BREAKPOINTS: JSON.stringify(breakpoints),
            STRUCTURE: JSON.stringify(structure),
        }),
        viteStaticCopy({
            targets: [
                {
                    src: resolve(__dirname, './::FOLDER_PREFIX::frontend/fonts/*.*'),
                    dest: 'fonts'
                },
                {
                    src: resolve(__dirname, './::FOLDER_PREFIX::frontend/img/*.*'),
                    dest: 'img'
                }
            ]
        }),
        ::SPRITE_PLUGINS::
        ::LARAVEL_PLUGINS::
    ],
    ::TAILWIND_CSS::
    root: resolve(__dirname, './::FOLDER_PREFIX::frontend/'),
    build: {
        minify: mode === 'production',
        manifest: 'manifest.json',
    }
});
