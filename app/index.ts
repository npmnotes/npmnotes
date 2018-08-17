import Fuse from 'fuse.js';
import { types } from "../cli/types";
import DomNotes from "./DomNotes";
import { debounce } from './util';

declare const data: types.Note[]

document.addEventListener('DOMContentLoaded', () => {
    const eLeftRoot = document.getElementById('left-root') as HTMLElement
    const eRightRoot = document.getElementById('right-root') as HTMLElement
    const eDummyInput = document.getElementById('dummy-input') as HTMLElement
    const eSearch = document.getElementById('search') as HTMLInputElement


    function scroll(preview: Element | undefined) {
        if (!preview) return
        function e(q: string) {
            return document.querySelector(q) as Element
        }

        preview.scrollIntoView({
            behavior: 'smooth'
        })

        setTimeout(() => {
            e(`.note-view[data-key='${preview.getAttribute('data-key')}']`)
                .scrollIntoView({
                    behavior: 'smooth'
                    , block: 'start'
                })
        }, 200)
    }

    document.body.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.keyCode !== 27) return
        e.preventDefault()
        clearSearch()
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
        const query = eSearch.value
        if (!query) updateDom(data)
        else doSearch(eSearch.value)
    }, 400))

    let i = 0
    let search = data
    let dom = new DomNotes(search, select)

    const fuse = new Fuse(Object.values(data), {
        keys: [
            { name: 'title', weight: 1 }
            , { name: 'author', weight: 1 }
            , { name: 'src', weight: 0.5 }
        ]
    })

    const clearSearch = () => {
        eSearch.value = ''
        eDummyInput.focus()
        updateDom(data)
    }

    function select(j: number, note?: types.Note) {
        dom.select(i, false)
        i = Math.max(0, Math.min(j, search.length - 1))
        scroll(dom.select(i, true))
    }

    const updateDom = (notes: types.Note[]) => {
        search = notes
        dom = new DomNotes(search, select)
        eLeftRoot.innerHTML = ''
        eRightRoot.innerHTML = ''
        eLeftRoot.appendChild(dom.ePreviews)
        eRightRoot.appendChild(dom.eViews)
        select(0)
    }

    const next = () => select(i + 1)
    const prev = () => select(i - 1)
    const doSearch = (query: string) => {
        updateDom(fuse.search(query))
    }

    document.body.addEventListener('keypress', (e: KeyboardEvent) => {
        if (e.target === eSearch) return
        const actions: { [key: string]: () => void } = {
            'j': next
            , 'k': prev
            , '/': () => eSearch.select()
        }
        if (!actions.hasOwnProperty(e.key)) return
        e.preventDefault()
        actions[e.key]()
    })

    updateDom(data)
})