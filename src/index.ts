import * as fs from 'fs'
import { readData, readSet } from "./read"

void async function run() {
    const alphas = 'abcdefghijklmnopqrstuvwxyz'.split('')
    let table: { [key: string]: string[] } = {}

    // Extract
    for (const alpha of alphas) {
        const fileName = `./data/${alpha}.json`
        console.log('running', fileName)

        const wordSet = await readData(fileName)
        const extract = readSet(wordSet)

        for (const e of extract) {
            const word = e.word
            const pos = e.pos

            if (table[pos] == undefined) {
                table[pos] = [word]
            } else {
                table[pos].push(word)
            }
        }
    }

    // Result
    for (const pos in table) {
        console.log({ pos: pos, count: table[pos].length })

        const fileName = `./pos/${pos}.json`

        fs.writeFile(fileName, JSON.stringify({ words: table[pos] }), { flag: 'w' }, (err) => {
            if (err) {
                console.error({ fileName: fileName, error: err})
            } else {
                console.log({ success: fileName})
            }
        })
    }
} ()
