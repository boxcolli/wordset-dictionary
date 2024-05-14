/**
 *  Original data: WordSet -> WordData -> WordMeaning
 *  Custom schema: WordExtract
 */
export type WordSet = { [key: string]: WordData }

export interface WordData {
    word: string
    wordset_id: string
    meanings?: WordMeaning[]
}

export interface WordMeaning {
    id: string
    def: string
    example: string
    speech_part: string
    synonyms: string[]
}

export interface WordExtract {
    word: string
    pos: string
}
