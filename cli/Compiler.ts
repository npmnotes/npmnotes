import MarkDownIt from 'markdown-it';
import Prism from 'prismjs';
import { texDown } from 'texdown';
import { TexDown } from './TexDown';
import { types } from './types';

export class Compiler implements types.Compiler {

    loadLang(lang: string) {
        try {
            return Prism.languages[lang]
                || require('prismjs/components/prism-' + lang)
        } catch (e) {
            return require('prismjs/components/prism-bash')
        }

    }

    readonly markDownIt = new MarkDownIt({
        highlight: (code, lang) => {
            return `<pre class='language-${lang}'>${Prism.highlight(code, this.loadLang(lang || 'bash'))}</pre>`
        }
    })

    accept(ext: string): boolean {
        return ['.md', '.td'].includes(ext)
    }

    html(src: string, ext: string): string {
        if (ext === '.md')
            return this.markDownIt.render(src)
        const html = new TexDown()
        texDown(src, html)
        return html.html
    }
}

