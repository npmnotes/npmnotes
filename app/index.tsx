import { h, render } from "preact";
import { debounce } from './util';
import { Notes } from './Notes';
import { types } from "../cli/types";

declare const data: types.Note[]

document.addEventListener('DOMContentLoaded', () => {
    const leftRoot = document.getElementById('left-root') as HTMLElement
    const rightRoot = document.getElementById('right-root') as HTMLElement
    const dummyInput = document.getElementById('dummy-input') as HTMLElement
    const search = document.getElementById('search') as HTMLInputElement

    let lastSeen: number = Date.now()

    window.onfocus = () => {
        lastSeen = Date.now()
    }

    const notes = new Notes(notes => {
        render(
            <div>
                {notes.map(note => (
                    <div
                        key={note.path}
                        data-key={note.path}
                        className='note-preview'
                        data-selected={note.selected}
                        data-seen={note.time < lastSeen}
                    >
                        <div className='note-title flex-grow'>{note.title}</div>
                        <div className='note-date flex-align-bottom'>
                            {new Date(note.time).toLocaleString()}
                        </div>
                        <div className='note-author'>{note.author}</div>
                    </div>
                ))}
            </div>
            , leftRoot, leftRoot.lastChild as Element)

        render(
            <div>
                {notes.map(note => (
                    <div
                        key={note.path}
                        data-key={note.path}
                        className='note-view'
                        dangerouslySetInnerHTML={{ __html: note.html }}
                    />
                ))}
            </div>
            , rightRoot, rightRoot.lastChild as Element)

        if (notes.length) scroll(notes[0].path)
    })

    function scroll(path: string) {
        function e(q: string) {
            return document.querySelector(q) as Element
        }

        const top = e(`.note-preview[data-key='${path}']`).clientTop
        console.log(top)
        leftRoot.scrollTo({
            behavior: 'smooth'
            , top: top
        })
        // e(`.note-preview[data-key='${path}']`).scrollIntoView({
        //     behavior: 'smooth'
        //     , block: 'start'
        // })

        // setTimeout(() => {
        //     e(`.note-view[data-key='${path}']`).scrollIntoView({
        //         behavior: 'smooth'
        //         , block: 'start'
        //     })
        // }, 200)
    }

    function clearSearch() {
        search.value = ''
        notes.search('')
        dummyInput.focus()
    }

    document.body.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.keyCode !== 27) return
        e.preventDefault()
        clearSearch()
    })

    document.body.addEventListener('keypress', (e: KeyboardEvent) => {
        if (e.target === search) return
        const actions: { [key: string]: () => void } = {
            'j': () => {
                scroll(notes.selectNext().path)
            }
            , 'k': () => {
                scroll(notes.selectPrev().path)
            }
            , '/': () => search.select()
        }
        if (!actions.hasOwnProperty(e.key)) return
        e.preventDefault()
        actions[e.key]()
    })

    search.addEventListener('keydown', e => {
        const actions: { [keyCode: number]: () => void } = {
            13: () => {
                dummyInput.focus()
            }
            , 27: clearSearch
        }
        if (!actions.hasOwnProperty(e.keyCode)) return
        e.preventDefault()
        actions[e.keyCode]()
    })

    search.addEventListener('input', debounce(e => {
        notes.search(search.value)
    }, 400))

    notes.set(data)
})