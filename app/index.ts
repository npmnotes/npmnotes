import { types } from "../cli/types";
import { debounce } from './util';
import DomNotes from "./DomNotes";

declare const data: types.Note[]

document.addEventListener('DOMContentLoaded', () => {
    const eLeftRoot = document.getElementById('left-root') as HTMLElement
    const eRightRoot = document.getElementById('right-root') as HTMLElement
    const eDummyInput = document.getElementById('dummy-input') as HTMLElement
    const eSearch = document.getElementById('search') as HTMLInputElement
    const domNotes = new DomNotes(data)

    const select = function () {
        let i = 0

        const set = (j: number) => {
            domNotes.select(i, false)
            i = Math.max(0, Math.min(j, data.length - 1))
            scroll(domNotes.select(i, true))
        }

        return {
            next: () => set(i + 1)
            , prev: () => set(i - 1)
        }
    }()

    function scroll(preview: Element) {
        preview.scrollIntoView({
            behavior: 'smooth'
        })
        // function e(q: string) {
        //     return document.querySelector(q) as Element
        // }

        // const top = e(`.note-preview[data-key='${path}']`).clientTop
        // console.log(top)
        // eLeftRoot.scrollTo({
        //     behavior: 'smooth'
        //     , top: top
        // })
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
        eSearch.value = ''
        eDummyInput.focus()
    }

    document.body.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.keyCode !== 27) return
        e.preventDefault()
        clearSearch()
    })

    document.body.addEventListener('keypress', (e: KeyboardEvent) => {
        if (e.target === eSearch) return
        const actions: { [key: string]: () => void } = {
            'j': () => {
                select.next()
            }
            , 'k': () => {
                select.prev()
            }
            , '/': () => eSearch.select()
        }
        if (!actions.hasOwnProperty(e.key)) return
        e.preventDefault()
        actions[e.key]()
    })

    eSearch.addEventListener('keydown', e => {
        const actions: { [keyCode: number]: () => void } = {
            13: () => {
                eDummyInput.focus()
            }
            , 27: clearSearch
        }
        if (!actions.hasOwnProperty(e.keyCode)) return
        e.preventDefault()
        actions[e.keyCode]()
    })

    eSearch.addEventListener('input', debounce(e => {
        console.log('TODO search')
    }, 400))

    eLeftRoot.appendChild(domNotes.ePreviews)
    eRightRoot.appendChild(domNotes.eViews)
    domNotes.select(0, true)

})