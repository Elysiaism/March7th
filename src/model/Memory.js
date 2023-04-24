import Piece from "./Piece"
import Stigma from "./Stigma"

export default class Memory {

    EIDOLON = [
        "Memory of You.",
        "Memory of It.",
        "Memory of Everything.",
        "Don't Want to Lose.",
        "Don't Want to Forget.",
        "Just Like This. Always……"
    ].join('\n')

    constructor({
                    name = "",
                    pieces = [],
                    stigmata = [],
                    preference = {}
                } = {}) {
        this.name = name
        this.pieces = pieces.map(piece => new Piece(piece))
        this.stigmata = stigmata.map(stigma => new Stigma(stigma))
        this.preference = {
            themeColor: preference.themeColor ?? 'blue',
            displayLanguage: preference.displayLanguage ?? 'en'
        }
    }

    interpret(data, key, onSucceed = console.log, onFail = console.error) {
        try {
            const key1 = binary16(key)
            const key2 = binary16(key.split('').reverse().join(''))
            data = binary16(data)
            data = binary16(data.map((char, i) => xor(char, key1[i % key1.length])))
            data = binary16(data)
            data = binary16(data.map((char, i) => xor(char, this.EIDOLON[i % this.EIDOLON.length])))
            data = binary16(data)
            data = binary16(data.map((char, i) => xor(char, key2[i % key2.length])))
            const newMemory = new Memory(JSON.parse(data))
            Object.assign(this, newMemory)
            onSucceed(newMemory)
        } catch (error) {
            onFail(error)
        }
    }

    transcribe(key) {
        try {
            const key1 = binary16(key)
            const key2 = binary16(key.split('').reverse().join(''))
            let data = binary16(JSON.stringify(this))
            data = binary16(data.map((char, i) => xor(char, key2[i % key2.length])))
            data = binary16(data)
            data = binary16(data.map((char, i) => xor(char, this.EIDOLON[i % this.EIDOLON.length])))
            data = binary16(data)
            data = binary16(data.map((char, i) => xor(char, key1[i % key1.length])))
            return data
        } catch (error) {

        }
    }

    addOrUpdatePiece(id, title, content, stigmata) {
        const i = this.pieces.findIndex(piece => piece.id === id)
        if (i === -1) {
            const piece = new Piece({title, content, stigmata})
            this.pieces.push(piece)
        } else {
            const piece = this.pieces[i]
            piece.title = title
            piece.content = content
            piece.stigmata = stigmata
        }
    }

    deletePiece(id) {
        const i = this.pieces.findIndex(piece => piece.id === id)
        if (i !== -1) {
            this.pieces.splice(i, 1)
        }
    }

    findPieces(keyword = "", stigmata = [], matchAll = false) {
        if (stigmata === null) {
            return this.pieces.filter(piece => piece.stigmata.length === 0)
        }
        const pieces = this.pieces.filter(piece => {
            if (matchAll) {
                if (stigmata.length === 0 || stigmata.every(stigma => piece.stigmata.includes(stigma))) {
                    return piece.titleMatch(keyword) || piece.contentMatch(keyword)
                }
            } else {
                if (stigmata.length === 0 || stigmata.some(stigma => piece.stigmata.includes(stigma))) {
                    return piece.titleMatch(keyword) || piece.contentMatch(keyword)
                }
            }
            return false
        })
        return pieces
    }

    addOrUpdateStigma(id, name, hidden, important) {
        const i = this.stigmata.findIndex(stigma => stigma.id === id)
        if (i === -1) {
            const stigma = new Stigma({name, hidden, important})
            this.stigmata.push(stigma)
        } else {
            const stigma = this.stigmata[i]
            stigma.name = name
            stigma.hidden = hidden
            stigma.important = important
            this.pieces.forEach(piece => {
                const i = piece.stigmata.indexOf(stigma.name)
                if (i !== -1) {
                    piece.stigmata[i] = name
                }
            })
        }
    }

    deleteStigma(id) {
        const i = this.stigmata.findIndex(stigma => stigma.id === id)
        if (i !== -1) {
            const stigma = this.stigmata[i]
            this.stigmata = this.stigmata.filter(stigma => stigma.id !== id)
            this.stigmata.sort(Stigma.sort)
            this.pieces.forEach(piece => {
                piece.stigmata = piece.stigmata.filter(name => name != stigma.name)
            })
        }
    }

    updatePreferences(preference) {
        preference.forEach(({key, value}) => {
            if (this.preference.hasOwnProperty(key)) {
                this.preference[key] = value
            }
        })
    }

}

function binary16(obj) {
    if (obj.constructor.name === 'Array') {
        return obj.map(char => String.fromCharCode(parseInt(char, 2))).join('')
    } else {
        let padding = '0000000000000000'
        return obj.split('').map(char => {
            let binary = char.charCodeAt(0).toString(2)
            return padding.slice(binary.length) + binary
        })
    }
}

function xor(a, b = '') {
    let ans = ''
    if (a.length === b.length) {
        for (let i = 0; i < a.length; i++) {
            if (a[i] === b[i]) {
                ans = ans + '0'
            } else {
                ans = ans + '1'
            }
        }
        return ans
    }
    return a
}