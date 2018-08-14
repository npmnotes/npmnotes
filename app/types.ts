import { Stats } from "fs";

export namespace types {
    export interface File {
        path: string
        stat: Stats
        kids: File[]
    }

    export interface Compiler {
        accept(ext: string): boolean
        html(src: string, ext: string): string
    }


    export interface Asset {
        path: string
    }

    export interface Note {
        path: string
        title: string
        author: string
        time: number
        src: string
        html: string
        selected: boolean
        tags?: string[]
    }
}