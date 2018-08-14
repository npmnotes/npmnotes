import * as katex from "katex";
import { Element, Renderer } from 'texdown';

export class TexDown implements Renderer {

    html = '<div>'
    private excludeDirAuto = ['b', 'u', 'i', 'li']

    cmd(name: string, arg: string): void {
    }

    startEnv(name: string): void {
        this.html += "<div align='center'>"
    }

    endEnv(name: string): void {
        this.html += '</div>'
    }

    hr(): void {
        this.html += '<hr/>'
    }

    startElement(el: Element) {
        this.html += `<${el.type}>`
    }

    endElement(el: Element) {
        this.html += `</${el.type}>`
    }

    esc(val: string) {
        this.txt(val[0])
    }

    txt(val: string) {
        this.html += `<span>${val}</span>`
    }

    eol() { }

    blank() { }

    a(title: string, href: string) {
        this.html += `<a href='${href}'>${title || href}</a>`
    }

    img(title: string, src: string) {
        this.html += `<img alt='${title}' title='${title}' src='${src}'/>`
    }


    $(tex: string) {
        this.html += `<span dir='auto'>${katex.renderToString(tex)}</span>`
    }

    $$(tex: string) {
        this.html += `<span dir='auto'>${katex.renderToString(tex, {
            displayMode: true
        })}</span>`
    }

    tikz(val: string) {
        this.html += `<img alt='tikz' src='https://tikz.men/${encodeURIComponent(val)}'/>`
    }

    done() {
        this.html += '</div>'
    }
}