export default class FloatFormat {
    static #formatBase10 = '[\-]?([0-9]{1}|[1-9][0-9]+)'
    static #formatFloat = `${this.#formatBase10}?\\.[0-9]+`
    static #regexpFloat = new RegExp(`^${this.#formatFloat}$`);
    static isMatch(value) { // value:string
        if (value.match(this.#regexpFloat)) { return true; }
        return false;
    }
    static toType(value) { // value:string
        return parseFloat(value);
    }
}
