const { v4 } = require("uuid")

export default class Stigma {

    constructor({
        id = v4(),
        name = "",
        hidden = false,
        important = false,
    } = {}) {
        this.id = id
        this.name = name
        this.hidden = hidden
        this.important = important
    }

    static sort(a, b) {
        if (a.important && !b.important) return -1
        if (!a.important && b.important) return 1
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
    }

    isValid() {
        if (!this.name) return false
        return true
    }

}