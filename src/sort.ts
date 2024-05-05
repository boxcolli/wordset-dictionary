import { WordExtract } from "./schema"

export function sortByPos(table: { [key: string]: string[] }, extract: WordExtract[]) {
    for (const e of extract) {
        const word = e.word
        const pos = e.pos
        if (table[pos] == undefined) {
            table[pos] = [ word ]
        } else {
            table[pos].push(word)
        }
    }
}
