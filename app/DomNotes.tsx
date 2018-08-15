import { Dom } from './Dom'
import { types } from "../cli/types";


export default class DomNotes {
    readonly ePreviews: HTMLElement = <div />
    readonly eViews: HTMLElement = <div />

    private ePreview(note: types.Note): HTMLElement {
        return (
            <div
                data-key={note.path}
                className='note-preview'
                data-selected={false}
            >
                <div className='note-title'>{note.title}</div>
                <div className='note-date'>
                    {new Date(note.time).toLocaleString()}
                </div>
                <div className='note-author'>{note.author}</div>
            </div>
        )
    }

    private eView(note: types.Note): HTMLElement {
        return (
            <div></div>
        )

    }

    constructor(notes: types.Note[]) {
        notes.forEach(note => this.ePreviews.appendChild(this.ePreview(note)))
    }

    select(i: number, b: boolean) {
        const kid = this.ePreviews.childNodes[i] as HTMLElement
        kid.setAttribute('data-selected', String(b))
        return kid
    }

}