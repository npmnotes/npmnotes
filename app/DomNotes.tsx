import { Dom } from './Dom'
import { types } from "../cli/types";


export default class DomNotes {
    readonly ePreviews: HTMLElement = <div />
    readonly eViews: HTMLElement = <div />

    private ePreview(note: types.Note): HTMLElement {
        return (
            <div
                data-key={note.path}
                class='note-preview'
                data-selected={false}
            >
                <div class='note-title'>{note.title}</div>
                <div class='note-date'>
                    {new Date(note.time).toLocaleString()}
                </div>
                <div class='note-author'>{note.author}</div>
            </div>
        )
    }

    private eView(note: types.Note): HTMLElement {
        const view = <div class='note-view' data-key={note.path} />
        view.innerHTML = note.html
        return view
    }

    constructor(
        notes: types.Note[]
        , onClickPreview: (i: number, note: types.Note) => void
    ) {
        notes.forEach((note, i) => {
            const ePreview = this.ePreview(note)
            ePreview.addEventListener('click', () => {
                onClickPreview(i, note)
            })
            this.ePreviews.appendChild(ePreview)
            this.eViews.appendChild(this.eView(note))
        })
    }

    select(i: number, b: boolean) {
        const kid = this.ePreviews.childNodes[i] as HTMLElement
        if (!kid) return undefined
        kid.setAttribute('data-selected', String(b))
        return kid
    }

}