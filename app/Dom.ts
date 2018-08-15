export namespace Dom {
    type Attributes = {
        [name: string]: string | boolean;
    }

    export function createElement(
        tagName: string
        , attributes: Attributes | null
        , ...kids: any[]): HTMLElement {
        const e = document.createElement(tagName)

        if (attributes !== null) {
            Object.entries(attributes).forEach(([key, val]) => {
                e.setAttribute(key, String(val))
            })
        }

        kids
            .forEach(kid => {
                if (typeof kid === 'string') {
                    e.appendChild(document.createTextNode(kid))
                } else {
                    e.appendChild(kid)
                }
            })
        return e
    }
}