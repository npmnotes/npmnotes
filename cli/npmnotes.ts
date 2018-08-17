#!/usr/bin/env node

import cp from 'child_process';
import colors from 'colors';
import prog from 'commander';
import fs from 'fs-extra';
import nodeWatch from 'node-watch';
import path from 'path';
import { Compiler } from "./Compiler";
import html from './html';
import { types } from './types';

function log(msg: string) {
    console.log(`[${new Date().toLocaleTimeString()}]`, colors.yellow(msg))
}

function logNote(path: string) {
    console.log(`[${new Date().toLocaleTimeString()}]`, colors.green(path))
}

function logAsset(path: string) {
    console.log(`[${new Date().toLocaleTimeString()}]`, colors.blue(path))
}

type to<T> = (file: types.File) => T | undefined

const toAsset: (compiler: types.Compiler) => to<types.Asset> = compiler => file => {
    if (
        file.stat.isDirectory()
        || compiler.accept(path.extname(file.path))
    ) return undefined

    return {
        path: file.path
    }
}

const toNote = (compiler: types.Compiler) => (file: types.File) => {
    if (!compiler.accept(path.extname(file.path))) return undefined

    logNote(file.path)
    const src = fs.readFileSync(file.path).toString()
    const ext = path.extname(file.path)

    return {
        title: path.basename(file.path, ext)
        , author: author(file.path)
        , path: file.path
        , src: src
        , html: compiler.html(src, ext)
        , time: file.stat.mtime.getTime()
    }
}

function filter<T>(root: types.File | undefined, to: to<T>): T[] {
    if (!root) return []
    const t = to(root)
    const res = t ? [t] : []
    root.kids.forEach(
        kid =>
            Array.prototype.push.apply(
                res
                , filter(kid, to)
            )
    )
    return res
}


function fsTree(root: string): types.File {
    const file: types.File = {
        path: root
        , stat: fs.statSync(root)
        , kids: []
    }

    if (file.stat.isDirectory()) {
        file.kids =
            fs.readdirSync(file.path)
                .map(f => fsTree(path.join(file.path, f)))
    }

    return file
}



function author(file: string) {
    try {
        return (
            cp.execSync(`git log -n1 --format="%an" -- ${file}`)
                .toString()
        )
    } catch (error) {
        return 'John Doe'
    }
}

interface Options {
    inDir: string
    outDir: string
    compiler: types.Compiler
    title: string
}

function compile(options: Options) {
    function read(file: string) {
        return fs.readFileSync(
            path.join(__dirname, '..', 'dist', file)
        ).toString()
    }

    fs.mkdirp(options.outDir)
    const theTree = fsTree(options.inDir)

    log('Copying assets...')

    filter(
        theTree
        , toAsset(options.compiler)
    ).forEach(
        asset => {
            logAsset(asset.path)
            fs.copyFile(
                asset.path
                , path.join(options.outDir, path.basename(asset.path))
                , (err) => {
                    if (err)
                        console.error(colors.red(err.message))
                }
            )
        }
    )

    log('Compiling notes...')

    const notes = filter(theTree, toNote(options.compiler))
        .sort((n1, n2) => n2.time - n1.time)

    fs.writeFileSync(
        path.join(options.outDir, 'index.html')
        , html({
            css: read('index.css')
            , js: read('index.js')
            , title: options.title || 'npmnotes.org'
            , notes: notes
        })
    )
}

function watch(options: Options) {
    nodeWatch(
        options.inDir
        , {
            recursive: true
        }
        , () => {

            compile(options)
        }
    )
}

prog
    .version(require(path.join(__dirname, '..', 'package.json')).version)
    .usage('[options] <source folder> <output folder>')
    .option('-w --watch', 'watch mode - live update every time you write or edit a note')
    .option('-t --title [title]', 'the title of the generated page')
    .arguments('<source folder> <output folder>')
    .action((inDir, outDir) => {
        const options = {
            inDir: inDir
            , outDir: outDir
            , title: prog.title
            , compiler: new Compiler()
        }

        compile(options)

        if (prog.watch) {
            watch(options)
        }
    })
    .parse(process.argv)

