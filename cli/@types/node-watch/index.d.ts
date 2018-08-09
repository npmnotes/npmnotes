declare module "node-watch" {
    import { FSWatcher } from "fs";
    type options = {
        persistent?: boolean
        recursive?: boolean
        encoding?: string
        filter?: (name: string) => boolean | boolean
    }

    export default function watch(
        fileOrDir: string
        , options: options
        , callback: (evt: 'update' | 'remove', name: string) => void
    ): FSWatcher
}