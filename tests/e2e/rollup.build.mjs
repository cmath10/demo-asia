import { rollup } from 'rollup'

import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import alias from '@rollup/plugin-alias'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'

import path from 'node:path'
import process from 'node:process'
import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { rm } from 'node:fs/promises'

import { Timer, formatMilliseconds } from './timer.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const timer = new Timer()
const plugins = [
    replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.SERVER': process.env.SERVER || 'localhost',
        __buildDate__: () => JSON.stringify(new Date()),
    }),
    alias({
        entries: [{
            find: '@',
            replacement: path.resolve(__dirname, '../..', 'src'),
        },
        {
            find: '~tests',
            replacement: path.resolve(__dirname, '../..', 'tests'),
        }],
    }),
    vue(),
    resolve({
        extensions: ['.js', '.ts', '.vue'],
    }),
    typescript(),
]

async function build({ output: outputOptionsList, ...inputOptions }) {
    let bundle

    try {
        bundle = await rollup(inputOptions)

        await Promise.all(outputOptionsList.map(bundle.write))
    } catch (e) {
        console.error(e)
    }

    if (bundle) {
        await bundle.close()
    }
}

try {
    const casesRoot = path.join(__dirname, 'cases')
    const casesDirectories = readdirSync(casesRoot, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    for (const name of casesDirectories) {
        if (!name) {
            continue
        }

        const directory = path.join(casesRoot, name)

        timer.start(name)

        const dist = path.join(directory, 'dist')
        const input = path.join(directory, 'script.ts')

        await rm(dist, { force: true, recursive: true })

        console.info(`removed ${dist}`)
        console.info(`building ${input}`)

        await build({
            input,
            output: [{
                dir: dist,
                entryFileNames: 'script.js',
                exports: 'named',
                format: 'esm',
            }],
            plugins,
        })

        console.info(`build was completed in ${formatMilliseconds(timer.end(name))}`)
    }
} catch (e) {
    console.log(e)
}