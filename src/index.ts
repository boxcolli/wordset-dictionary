import * as fs from 'fs'
import { readData, readSet } from "./read"

const saveToFolder = 'filter'

function isUnwanted(word: string, pos: string): boolean {
    if (word[0] == word[0].toUpperCase()) {
        return true
    }

    // if (pos == 'noun' && word.length > 6) {
    //     return true
    // }

    if (word.length > 5) {
        return true
    }

    if (containsNonAlphabetic(word)) {
        return true
    }

    return false
}

void async function run() {
    const alphas = 'abcdefghijklmnopqrstuvwxyz'.split('')

    // Dict: { pos: { word: true } }
    let dict: { [key: string]: { [key: string]: boolean } } = {}
    {
        // Drop unwanted & duplicate words
        for (const alpha of alphas) {
            const fileName = `./data/${alpha}.json`
            console.log('running', fileName)
    
            const wordSet = await readData(fileName)
            const extract = readSet(wordSet)
    
            for (const e of extract) {
                const word = e.word
                const pos = e.pos
    
                // Drop unwanted words
                if (isUnwanted(word, pos)) {
                    continue
                }
    
                if (dict[pos] == undefined) {
                    dict[pos] = {}
                } else if (dict[pos][word] == true) {
                    continue    // Avoid duplicate entry
                }

                dict[pos][word] = true
            }
        }
    }

    // Table: { pos: { word: word[], count: number } }
    let table: { [key: string]: { word: string[], count: number } } = {}
    {
        for (const pos in dict) {
            let list: string[] = []

            for (const word in dict[pos]) {
                list.push(word)
            }

            table[pos] = {
                word: list,
                count: list.length,
            }
        }
    }

    // Result
    for (const pos in table) {
        console.log({ pos: pos, count: table[pos].count })

        const fileName = `./${saveToFolder}/${pos}.json`

        fs.writeFile(fileName, JSON.stringify(table[pos]), { flag: 'w' }, (err) => {
            if (err) {
                console.error({ fileName: fileName, error: err})
            } else {
                console.log({ success: fileName})
            }
        })
    }
} ()

// Define the regular expression once at the top level
const nonAlphabeticRegex = /[^a-zA-Z]/;

function containsNonAlphabetic(str: string): boolean {
    return nonAlphabeticRegex.test(str);
}
