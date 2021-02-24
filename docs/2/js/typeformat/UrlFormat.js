export default class UrlFormat {
    static #formatProtocol = '(file|http[s]?)'
    static #regexp = new RegExp(`^${this.#formatProtocol}://`);
    static isMatch(value) { // value:string
        if (value.match(UrlFormat.#regexp)) { return true; }
        return false;
    }
    static toType(value) { // value:string
        return new URL(value);
    }
}
