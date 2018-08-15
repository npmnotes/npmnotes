import { types } from "./types";

export default function html(data: {
    title: string
    js: string
    css: string
    notes: types.Note[]
}) {
    return (
        `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<link rel="shortcut icon"type="image/x-icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAA9GAAAPRgFoUyCCAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAFpQTFRF////2FlKykY4wDorykg4zsmuz8qv11pK2dS92nFh23dn29fB3YNz46iY46ub4+DM5ODN5eLP5r+v58Ky5+PR6OTS6ebU6ebV6ufW6+fX6+jX7ObW7OnZ7erabqlTygAAAAN0Uk5TAEh8m2U8xAAAAGlJREFUWIXt0LcNwDAMBVE655zT/mu6sBsCBCw1tIp/A7ziiJ784C1MzPKIBwCAo0B/yFWmwHDJ1arAmPJWW6CJeLMtMBW8Xf3B1vFO9QdtzFvUH/wL5KVcZgp8BQAAAAAAAAAAAMBl4AYolF9xk2tqiAAAAABJRU5ErkJggg==" />
<style>${data.css}</style>
<script>const data = ${JSON.stringify(data.notes)}</script>
<title>${data.title}</title>
</head>

<body>
<script type="module">${data.js}</script>
<input id='dummy-input' type="text">


<div id='main' class='row'>
    <div id='left' class='column'>
        <div id='search-box' class='row'>
            <i class='fa fa-search flex-align-center'></i>
            <input id='search' type="search" class='flex-grow' />
        </div>
        <div id='left-root' class='flex-grow scroll'></div>
    </div>
    <div id='right-root' class='flex-grow scroll'></div>
</div>

</body>
</html>`
    )
}