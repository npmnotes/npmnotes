import { types } from "./types";
import Fuse from 'fuse.js';

export class Notes {
    private cb: (notes: types.Note[]) => void;
    private notes: types.Note[] = []
    private searchResult: types.Note[] = []
    private fuse: Fuse = new Fuse([], { keys: [] })
    private selectedNote: types.Note | undefined
    private i = 0

    constructor(cb: (notes: types.Note[]) => void) {
        this.cb = cb
    }

    private ii(i: number) {
        return Math.max(0, Math.min(i, this.searchResult.length - 1))
    }

    set(notes: types.Note[]) {
        this.notes = notes
        this.searchResult = notes
        this.fuse = new Fuse(Object.values(notes), {
            keys: [
                { name: 'title', weight: 1 }
                , { name: 'author', weight: 1 }
                , { name: 'src', weight: 0.5 }
            ]
        })
        this.select(0)
    }

    select(i: number) {
        if (this.selectedNote)
            this.selectedNote.selected = false

        this.i = this.ii(i)
        this.selectedNote = this.searchResult[this.i]

        if (this.selectedNote)
            this.selectedNote.selected = true

        this.cb(this.searchResult)
        return this.selectedNote
    }

    selectNext = () => this.select(this.i + 1)
    selectPrev = () => this.select(this.i - 1)

    search(query: string) {
        this.searchResult = query
            ? this.fuse.search(query)
            : this.notes

        this.select(0)
    }
}