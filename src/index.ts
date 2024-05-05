import { sortByPos } from "./sort"
import { readData, readSet } from "./read"

async function runSingleFile(table: any, filePath: string) {
    const wordSet = await readData(filePath)

    const extract = readSet(wordSet)

    sortByPos(table, extract)
}

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
    }
} ()
