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

<link rel="shortcut icon"type="image/x-icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFq0lEQVRYR62Xa1BVVRTH/3sdQd6UYhg+CkZUFCTNqYZp+uAHmwpQmczHTGmZOs3UpImmjWNZU2lGYzaNVjqND7TyhaQQFBM2yoiIeuFeIBGBvDwvb7wP4N69m3Mu98p9eU8N++PZa+31O/+11j7rMKhcovaFCJgDU7kQCwSJZMYRBxLhijtHnyBWzzjTkCSKMNZ6gcXn96k5mvkzEpr0GVxiW2ETy4kQ5M/ezsPNAE6QhF1s1vnaB/n4BBDX0kJ4EPsEgr9LIElNYHcbDljB2V4yBu5gKSdlKI/lFUDcXDKd0+BZYtKs/xPYE0RUEmMZLDH3tvueB4DQpM3jxAoIiBqN4I4zOGAgooVsds7Nkee6AChvLtkuj3ZwFwiGlJFKOAGEZmEoZwFXR8pu7rbi+hE9rBaOhsZ2rPpD899FEVZAvxcw22uRQ1RSf9DTjppwAti06Vkk8J4jQrc5BNpbYbhUaUVvUydidUVYf93oAWAZGER2Tj7iY6fiuafmegdsOwIYTjv3OLBHSsrdIj9QAJRWI64bWe363kjcaIjG3U6Bxto2xF0+4xWg+Eo5du8/jIjwMPz0zadgzEtdewJYiSFBToVibdMu+pGEWO2O31rRj6tHWwAm0NJ61yvAjqwDeGzyozhxrgD7dmZiVnycpwpuAEoqOA5JyblvMnFtaSQPGGh1v2SMg4HQVQejqHQQxpZOTKkr8QAwmS1YvDYT333+AQ4cO40pMdF4e9Ur6gAAEwVgIhMVi1aCiWx3r8buh1HWOAnGAYZqnR6xxSc9AH6/VIqjZ/JwOOsjFPx1BQdP5OCX/btA7mnwooA9HlvObJr0g0RY46165BRcPNIKAtDV3ugBsG33t5geNxWvL02D0WRW1Phy+wYkJ8S7HucDgDN8z6yVaWUS2Hx3AIt1DGp0gSgoNsPa0YWoxnIXgH6jCUvWZmLcQxEICQ5W3Jta2/HSgmexYc0KVQA2wUuZTZPWScTGuQPUdY5H2d0pyuMqbTMmFR53AcgvLsGhn89h745NcChedLkMZwv+xKn9X0CSZN2Gly8FAAOzVaYOEijAWwqaKowozO4AWa2wGOpdADZ/tg9TY6LxzuplTtfO7l68/Nb7yNq+AfMSZ/oH4HzQJ4CVE25rGfIu9EP09iGsWesE6OnrR8b6Lfj6w01ImjnNhX3jx18hJnoCNq9/VSWAJrWDiMa7K1DbEYVy/WR7CqpbMCk/2wlgNFugb2lTbj/3ijd0dsNoNuPxyTH+AeQU+CpCAYaGiiHkn+4BmYxgbbUKQIO+GbLUalbCtFiEBAcBPmpguAi9t6ET4FQ3JJMJaLcDVNbcVqpdzUqZn4yIsFCfAEobCm3aCgh23CMFhiiUN3mm4FzhRWiqb6mJj3UrMzBxwnifAIBYxuRhk1ukVgLZm3l4yUVYq2XIz7sH0duDsCadosCt+n/Q3tGlCmDu7BkIDQn2CsDlq5jGRts/RpWphwj0hvupzXIbHm2HxDlMw21YU9eANoM6gCeTZiIsNMQ7gMAP0pzcdfbPcVVqPLdRFQFjHBAju6C6qgUxv9m7YDRSwMGHCGMSWFJO3f2BRLNoD5HIdACYhwLwd1WAchUPdvXgkfoyr59jVblwnweY2CUl/rpN9r0/kslj+FgqJYhEJ0TPEG4ca4bVbENDgwGvFZariudiJIaApn2AuU55zG3QUGTfMyy22OICoKRCmz6NC5QQMOG/R/LvwYE2ErYUNufCHYe151iuW/wE57xwtCGU4Iw/zxLPu0y23n9MFCXEGQJL8v9e/i0U2cmWMfLNfSrg2BAlS4N5+MBOABtHdof/cPct5GoHY1kU2r/TkXN3f/8/p7IaNmwFYQUBIWoA5EsGAtnEaLfcag/y8QvgVKQmPRxD7EXOxALBeTJjFAfOI5V9ol4h+B1GpCEhikBBeWz2yXtqYP8FRaXc/QF06YsAAAAASUVORK5CYII=" />

<title>${data.title}</title>
<meta name="description" content="${data.title} - built with npmnotes" />

<meta property="og:title" content="${data.title}" />
<meta property="og:image" content="og-img.png">
<meta property="og:description" content="${data.title} - built with npmnotes" />

<style>${data.css}</style>
<script>var data = ${JSON.stringify(data.notes)}</script>
</head>

<body>
<script type="module">${data.js}</script>
<input id='dummy-input' type="text">


<div id='grid'>
    <div id='search'>
        <div id='search-box' class='row'>
            <i class='fa fa-search flex-align-center'></i>
            <input id='search-input' type="search" class='flex-grow' />
        </div>
    </div>
    <div id='preview' class='scroll'></div>
    <div id='view' class='scroll'></div>
</div>

</body>
</html>`
    )
}
