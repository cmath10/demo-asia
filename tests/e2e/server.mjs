import cors from 'cors'
import express from 'express'
import path from 'node:path'

import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

const render = (name, script) => {
    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Case: ${name}</title>
    <script type="module" src="${script}"></script>
</head>
<body><div id="app"></div></body>
</html>`
}

app.use(cors())
app.use('/cases', express.static(path.join(__dirname, '/cases')))

app.get('/', (_, response) => {
    response.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/case/:name', async (request, response) => {
    const name = request.params.name.toLowerCase()

    if (existsSync(path.join(__dirname, 'cases', name, 'dist/script.js'))) {
        response.send(render(name, path.join('/cases', name, 'dist/script.js')))
    } else {
        response.sendStatus(404)
    }
})

const server = app.listen(3000, () => {
    console.log('Serving on port 3000')
})

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server has been stopped')
        process.exit(0)
    })
})
