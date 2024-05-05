import * as fs from 'fs'
import { resolve } from 'path'

import { WordData, WordExtract, WordSet } from "./schema";

export function readSet(wordSet: WordSet): WordExtract[] {
    const extract: WordExtract[] = []

    for (const wordName in wordSet) {
        const wordData = wordSet[wordName]

        if (wordData.meanings == undefined) {
            extract.push({ word: wordName, pos: 'noun' })
            continue
        }
      
        for (const meaning of wordData.meanings) {
          extract.push({ word: wordName, pos: meaning.speech_part })
        }
    }

    return extract
}

export async function readData(filePath: string): Promise<WordSet> {
    try {
        const fileData = await fs.promises.readFile(filePath, 'utf-8')
        return JSON.parse(fileData) as WordSet
    } catch (e) {
        console.error("Error reading JSON file:", e);
        throw e
    }
}
