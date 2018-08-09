import MarkDownIt from 'markdown-it';
import path from 'path';
import Prism from 'prismjs';
import { types } from './types';

export class CompilerMd implements types.Compiler {

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

    accept(file: string): boolean {
        return path.extname(file) === '.md'
    }

    html(src: string): string {
        return this.markDownIt.render(src)
    }
}

